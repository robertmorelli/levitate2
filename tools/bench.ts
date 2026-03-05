#!/usr/bin/env tsx
/**
 * Benchmarks lift algorithm throughput in isolation.
 * Loads vectors and builds the hnswlib index ONCE, then times only the
 * algorithm execution across all kernels in examples/.
 *
 * Usage: npm run bench [iterations=1000] [nearest_metric=cosine]
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";

import "../utils/convolutions.js";
import "../algorithms/global_residual.js";
import "../algorithms/per_token.js";
import "../algorithms/arithmetic.js";
import "../algorithms/arithmetic_opt.js";
import "../algorithms/momentum.js";
import "../algorithms/dominant_prefix.js";
import "../algorithms/delta_decode.js";
import "../algorithms/amplitude_sort.js";
import "../algorithms/conv_residual.js";
import "../algorithms/dynamic_stack_healing.js";
import "../algorithms/dynamic_stack_healing_v2.js";
import "../algorithms/arithmetic_stack_block_healing.js";

import { load_lift_vectors } from "../utils/load_lift_vectors.js";
import { parse_ptx_source } from "../utils/parse_ptx_source.js";
import { get_vector_dimension } from "../utils/get_vector_dimension.js";
import { registry, conv_registry, type LiftContext } from "../utils/registry.js";
import { parse_nearest_metric } from "../utils/find_nearest_token.js";

// ── Setup ─────────────────────────────────────────────────────────────────────

process.env["PTX_VECTORS"]  = "utils/ptx_vectors_gemini_described.json";
process.env["LLVM_VECTORS"] = "utils/llvm_vectors_gemini_described.json";

const N = parseInt(process.argv[2] ?? "1000", 10);
const NEAREST_METRIC = parse_nearest_metric(process.argv[3] ?? process.env["NEAREST_METRIC"]);
const CONV = "identity";
process.env["NEAREST_METRIC"] = NEAREST_METRIC;

// ── Load once ─────────────────────────────────────────────────────────────────

process.stdout.write("Loading vectors + building index... ");
const t_load = performance.now();
const { ptx_vectors, llvm_vectors, find_nearest_llvm, nearest_metric } = load_lift_vectors();
const dim = get_vector_dimension(ptx_vectors);
const conv_fn = conv_registry.get(CONV)!;
console.log(`${(performance.now() - t_load).toFixed(0)}ms`);

// ── Pre-build contexts for each kernel ────────────────────────────────────────

const ptx_files = readdirSync("examples")
  .filter(f => f.endsWith(".ptx"))
  .sort()
  .map(f => {
    const source = readFileSync(`examples/${f}`, "utf8");
    const tokens = parse_ptx_source(source, ptx_vectors);
    const context_vectors = conv_fn(tokens, ptx_vectors, dim);
    const ctx: LiftContext = { ptx_vectors, llvm_vectors, find_nearest_llvm, dim, context_vectors };
    return { name: f.replace(".ptx", ""), tokens, ctx };
  });

console.log(`Contexts built for ${ptx_files.length} kernels. Running ${N} iterations each.\n`);
console.log(`Nearest metric: ${nearest_metric}\n`);

// ── Helpers ───────────────────────────────────────────────────────────────────

function stats(samples: number[]) {
  const s = [...samples].sort((a, b) => a - b);
  const mean   = samples.reduce((a, b) => a + b, 0) / samples.length;
  const median = s[Math.floor(s.length / 2)]!;
  const p95    = s[Math.floor(s.length * 0.95)]!;
  const min    = s[0]!;
  return { mean, median, p95, min };
}

function fmt(us: number) {
  return us < 1000 ? `${us.toFixed(0)}µs` : `${(us / 1000).toFixed(2)}ms`;
}

// ── Per-kernel × per-algorithm timing ────────────────────────────────────────

const alg_names = [...registry.keys()];
const COL = 22;
const ACOL = 16;

process.stdout.write("kernel".padEnd(COL));
for (const alg of alg_names) process.stdout.write(alg.substring(0, ACOL - 1).padEnd(ACOL));
console.log();
console.log("─".repeat(COL + alg_names.length * ACOL));

// global per-alg samples across all kernels
const global: Record<string, number[]> = Object.fromEntries(alg_names.map(a => [a, []]));

for (const { name, tokens, ctx } of ptx_files) {
  process.stdout.write(name.substring(0, COL - 1).padEnd(COL));

  for (const alg_name of alg_names) {
    const alg = registry.get(alg_name)!;
    const samples: number[] = [];

    // warmup
    for (let i = 0; i < 10; i++) alg(ctx, tokens);

    for (let i = 0; i < N; i++) {
      const t0 = performance.now();
      alg(ctx, tokens);
      samples.push((performance.now() - t0) * 1000); // µs
    }

    const { median } = stats(samples);
    global[alg_name]!.push(...samples);
    process.stdout.write(fmt(median).padEnd(ACOL));
  }
  console.log(`  (${tokens.length} tokens)`);
}

// ── Aggregate ─────────────────────────────────────────────────────────────────

console.log("─".repeat(COL + alg_names.length * ACOL));
process.stdout.write("median (all kernels)".padEnd(COL));
for (const alg of alg_names) process.stdout.write(fmt(stats(global[alg]!).median).padEnd(ACOL));
console.log();

process.stdout.write("p95    (all kernels)".padEnd(COL));
for (const alg of alg_names) process.stdout.write(fmt(stats(global[alg]!).p95).padEnd(ACOL));
console.log();

const index_ms = (performance.now() - t_load).toFixed(0);
console.log(`\nIndex load: ${index_ms}ms total (one-time cost, not included above)`);
console.log(`(${N} iterations × ${ptx_files.length} kernels per algorithm)`);

// ── Write BENCH_RESULTS.md ─────────────────────────────────────────────────

const md: string[] = [];
md.push(`# Bench results`);
md.push(``);
md.push(`**Vectors:** \`gemini_described\`  `);
md.push(`**Convolution:** \`${CONV}\`  `);
md.push(`**Iterations:** ${N} per kernel  `);
md.push(`**Nearest Metric:** \`${nearest_metric}\`  `);
md.push(`**Index load:** ${index_ms}ms (one-time, not included in algorithm times)  `);
md.push(``);
md.push(`All times are median wall-clock for a single algorithm call (index already built).`);
md.push(``);

// per-kernel table
const header = ["kernel (tokens)", ...alg_names];
md.push(`| ${header.join(" | ")} |`);
md.push(`| ${header.map(() => "---").join(" | ")} |`);

const per_kernel_stats: Record<string, Record<string, ReturnType<typeof stats>>> = {};
for (const { name, tokens, ctx } of ptx_files) {
  per_kernel_stats[name] = {};
  const cells: string[] = [`${name} (${tokens.length})`];
  for (const alg_name of alg_names) {
    const s = stats(global[alg_name]!.slice(
      ptx_files.indexOf(ptx_files.find(p => p.name === name)!) * N,
      (ptx_files.indexOf(ptx_files.find(p => p.name === name)!) + 1) * N,
    ));
    per_kernel_stats[name]![alg_name] = s;
    cells.push(fmt(s.median));
  }
  md.push(`| ${cells.join(" | ")} |`);
}

md.push(``);
md.push(`## aggregate`);
md.push(``);

const agg_header = ["stat", ...alg_names];
md.push(`| ${agg_header.join(" | ")} |`);
md.push(`| ${agg_header.map(() => "---").join(" | ")} |`);

const median_row = ["**median**", ...alg_names.map(a => `**${fmt(stats(global[a]!).median)}**`)];
const p95_row    = ["p95",        ...alg_names.map(a => fmt(stats(global[a]!).p95))];
md.push(`| ${median_row.join(" | ")} |`);
md.push(`| ${p95_row.join(" | ")} |`);
md.push(``);

writeFileSync("BENCH_RESULTS.md", md.join("\n"));
console.log("Wrote BENCH_RESULTS.md");

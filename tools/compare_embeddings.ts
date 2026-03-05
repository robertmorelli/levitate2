#!/usr/bin/env tsx
/**
 * Runs the full conv×alg roundtrip matrix for every vector set found in utils/,
 * then writes README.md. Never calls any embedding API.
 *
 * Usage: tsx tools/compare_embeddings.ts <input.ptx>
 *
 * To get fresh vectors first: npm run refresh
 */

import { writeFileSync, readFileSync, mkdtempSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import "../utils/convolutions.js";
import "../algorithms/global_residual.js";
import "../algorithms/per_token.js";
import "../algorithms/arithmetic.js";
import "../algorithms/momentum.js";
import "../algorithms/dominant_prefix.js";
import "../algorithms/delta_decode.js";
import "../algorithms/amplitude_sort.js";
import "../algorithms/conv_residual.js";

import { lift_all_matrix } from "../lift.js";
import { tokens_to_ll } from "../utils/tokens_to_ll.js";
import { registry, conv_registry } from "../utils/registry.js";

// ── Types ─────────────────────────────────────────────────────────────────────

type Scores    = Record<string, Record<string, number>>;
type VectorSet = { provider: string; mode: string; ptx_path: string; llvm_path: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

function ops_of(ptx: string): string[] {
  return ptx.split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith("//") && !l.startsWith(".") && !l.startsWith("@") && l !== "{" && l !== "}")
    .map(l => (l.match(/^([a-z][a-z0-9_.]*)/i) ?? [])[1] ?? "")
    .filter(Boolean);
}

function jaccard(a: string[], b: string[]): number {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 1 : inter / union;
}

function find_vector_sets(): VectorSet[] {
  const files = readdirSync("utils").filter(f => f.startsWith("ptx_vectors_") && f.endsWith(".json"));
  const sets: VectorSet[] = [];
  for (const f of files.sort()) {
    // ptx_vectors_{provider}_{mode}.json
    const slug = f.replace("ptx_vectors_", "").replace(".json", "");
    const last_underscore = slug.lastIndexOf("_");
    const provider = slug.slice(0, last_underscore);
    const mode     = slug.slice(last_underscore + 1);
    const ptx_path  = `utils/ptx_vectors_${slug}.json`;
    const llvm_path = `utils/llvm_vectors_${slug}.json`;
    sets.push({ provider, mode, ptx_path, llvm_path });
  }
  return sets;
}

function run_matrix(vs: VectorSet, source: string, tmp: string, alg_names: string[], conv_names: string[]): Scores {
  process.env["PTX_VECTORS"]  = vs.ptx_path;
  process.env["LLVM_VECTORS"] = vs.llvm_path;

  const matrix_tokens = lift_all_matrix(source);
  const src_ops = ops_of(source);
  const scores: Scores = {};
  let best = -1, best_cell = "";

  for (const conv of conv_names) {
    scores[conv] = {};
    for (const alg of alg_names) {
      const tokens = matrix_tokens[conv]?.[alg] ?? [];
      if (tokens.length === 0) { scores[conv]![alg] = 0; continue; }

      const ll      = tokens_to_ll(tokens);
      const slug    = `${vs.provider}_${vs.mode}_${conv}_${alg}`;
      const ll_file = join(tmp, `${slug}.ll`);
      const ptx_out = join(tmp, `${slug}.ptx`);
      writeFileSync(ll_file, ll);

      const r = spawnSync("node", [resolve("llc.mjs"), ll_file, ptx_out], { encoding: "utf8" });
      if (r.status !== 0) { scores[conv]![alg] = 0; continue; }

      const score = jaccard(src_ops, ops_of(readFileSync(ptx_out, "utf8")));
      scores[conv]![alg] = score;
      if (score > best) { best = score; best_cell = `${conv} × ${alg}`; }
    }
  }

  print_matrix(`${vs.provider}/${vs.mode}`, scores, alg_names, conv_names, best, best_cell);
  return scores;
}

function print_matrix(label: string, scores: Scores, alg_names: string[], conv_names: string[], best_score: number, best_cell: string) {
  const COL = 14, ROW = 16;
  console.log(`\n${"═".repeat(ROW + alg_names.length * COL)}`);
  console.log(`  ${label}`);
  console.log(`${"═".repeat(ROW + alg_names.length * COL)}`);
  process.stdout.write(" ".repeat(ROW));
  for (const alg of alg_names) process.stdout.write(alg.substring(0, COL - 1).padEnd(COL));
  console.log();
  console.log("─".repeat(ROW + alg_names.length * COL));
  for (const conv of conv_names) {
    process.stdout.write(conv.padEnd(ROW));
    for (const alg of alg_names) {
      const s = scores[conv]?.[alg] ?? 0;
      const pct = `${(s * 100).toFixed(0)}%`;
      const cell = s === best_score ? `[${pct}]` : ` ${pct} `;
      process.stdout.write(cell.padEnd(COL));
    }
    console.log();
  }
  console.log("─".repeat(ROW + alg_names.length * COL));
  console.log(`best: ${best_cell}  (${(best_score * 100).toFixed(0)}% jaccard)\n`);
}

function best_of(scores: Scores, alg_names: string[], conv_names: string[]): { conv: string; alg: string; score: number } {
  let best = { conv: "", alg: "", score: -1 };
  for (const conv of conv_names)
    for (const alg of alg_names) {
      const s = scores[conv]?.[alg] ?? 0;
      if (s > best.score) best = { conv, alg, score: s };
    }
  return best;
}

function scores_table_md(scores: Scores, alg_names: string[], conv_names: string[]): string[] {
  const top = best_of(scores, alg_names, conv_names).score;
  const header = ["conv \\ alg", ...alg_names];
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
  ];
  for (const conv of conv_names) {
    const cells = alg_names.map(alg => {
      const s = scores[conv]?.[alg] ?? 0;
      const pct = `${(s * 100).toFixed(0)}%`;
      return s === top ? `**${pct}**` : pct;
    });
    lines.push(`| ${conv} | ${cells.join(" | ")} |`);
  }
  return lines;
}

function delta_table_md(bare: Scores, desc: Scores, alg_names: string[], conv_names: string[]): string[] {
  const header = ["conv \\ alg", ...alg_names];
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
  ];
  for (const conv of conv_names) {
    const cells = alg_names.map(alg => {
      const delta = Math.round(((desc[conv]?.[alg] ?? 0) - (bare[conv]?.[alg] ?? 0)) * 100);
      return delta === 0 ? `0%` : delta > 0 ? `**+${delta}%**` : `${delta}%`;
    });
    lines.push(`| ${conv} | ${cells.join(" | ")} |`);
  }
  return lines;
}

function write_results_md(
  ptx_file: string,
  src_ops: string[],
  all_scores: Map<string, { bare?: Scores; described?: Scores }>,
  alg_names: string[],
  conv_names: string[],
) {
  const lines: string[] = [];
  lines.push(`# Levitate roundtrip results`);
  lines.push(``);
  lines.push(`**Input:** \`${ptx_file}\`  `);
  lines.push(`**Source ops:** \`${src_ops.join(" ")}\`  `);
  lines.push(`**Metric:** Jaccard similarity on PTX opcode sets  `);
  lines.push(``);

  const providers = [...all_scores.keys()];

  for (const provider of providers) {
    const { bare, described } = all_scores.get(provider)!;
    lines.push(`## ${provider}`);
    lines.push(``);

    if (bare) {
      const b = best_of(bare, alg_names, conv_names);
      lines.push(`### bare`);
      lines.push(``);
      lines.push(`> **Best:** \`${b.conv} × ${b.alg}\` — **${(b.score * 100).toFixed(0)}%**`);
      lines.push(``);
      lines.push(...scores_table_md(bare, alg_names, conv_names));
      lines.push(``);
    }

    if (described) {
      const d = best_of(described, alg_names, conv_names);
      lines.push(`### described`);
      lines.push(``);
      lines.push(`> **Best:** \`${d.conv} × ${d.alg}\` — **${(d.score * 100).toFixed(0)}%**`);
      lines.push(``);
      lines.push(...scores_table_md(described, alg_names, conv_names));
      lines.push(``);
    }

    if (bare && described) {
      lines.push(`### bare → described delta`);
      lines.push(``);
      lines.push(`Positive = described beat bare.`);
      lines.push(``);
      lines.push(...delta_table_md(bare, described, alg_names, conv_names));
      lines.push(``);
    }
  }

  // cross-provider summary
  lines.push(`## summary`);
  lines.push(``);
  lines.push(`| provider | bare best | described best |`);
  lines.push(`| --- | --- | --- |`);
  for (const provider of providers) {
    const { bare, described } = all_scores.get(provider)!;
    const b = bare      ? best_of(bare,      alg_names, conv_names) : null;
    const d = described ? best_of(described, alg_names, conv_names) : null;
    const b_str = b ? `${(b.score * 100).toFixed(0)}% (\`${b.conv} × ${b.alg}\`)` : "n/a";
    const d_str = d ? `${(d.score * 100).toFixed(0)}% (\`${d.conv} × ${d.alg}\`)` : "n/a";
    lines.push(`| ${provider} | ${b_str} | ${d_str} |`);
  }
  lines.push(``);

  writeFileSync("README.md", lines.join("\n"));
  console.log("Wrote README.md");
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const ptx_file = process.argv[2];
  if (!ptx_file) { console.error("Usage: compare_embeddings.ts <input.ptx>"); process.exit(1); }

  const vector_sets = find_vector_sets();
  if (vector_sets.length === 0) {
    console.error("No vector files found in utils/. Run: npm run refresh");
    process.exit(1);
  }

  const source     = readFileSync(ptx_file, "utf8");
  const src_ops    = ops_of(source);
  const tmp        = mkdtempSync(join(tmpdir(), "levitate-"));
  const alg_names  = [...registry.keys()];
  const conv_names = [...conv_registry.keys()];

  console.log(`\nsource: ${src_ops.join(" ")}`);
  console.log(`\nFound ${vector_sets.length} vector sets: ${vector_sets.map(v => `${v.provider}/${v.mode}`).join(", ")}\n`);

  const all_scores = new Map<string, { bare?: Scores; described?: Scores }>();

  for (const vs of vector_sets) {
    const scores = run_matrix(vs, source, tmp, alg_names, conv_names);
    const entry = all_scores.get(vs.provider) ?? {};
    if (vs.mode === "bare") entry.bare = scores;
    else if (vs.mode === "described") entry.described = scores;
    all_scores.set(vs.provider, entry);
  }

  write_results_md(ptx_file, src_ops, all_scores, alg_names, conv_names);
})();

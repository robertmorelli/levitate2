#!/usr/bin/env tsx
/**
 * Runs the full conv×alg roundtrip matrix across every PTX file in examples/
 * and every vector set in utils/, then writes:
 *   FULL_RESULTS.md  — per-kernel breakdown for every provider × mode
 *   README.md        — averaged summary across all kernels
 *
 * Never calls any embedding API. Run `npm run refresh` first if needed.
 *
 * Usage: tsx tools/compare_embeddings.ts
 */

import { writeFileSync, readFileSync, mkdtempSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

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
import "../algorithms/arithmetic_stack_block_healing.js";

import { lift_all_matrix } from "../lift.js";
import { tokens_to_ll } from "../utils/tokens_to_ll.js";
import { registry, conv_registry } from "../utils/registry.js";
import { compare_ptx } from "../utils/ptx_similarity.js";

// ── Types ─────────────────────────────────────────────────────────────────────

type Scores    = Record<string, Record<string, number>>;
type VectorSet = { provider: string; mode: string; ptx_path: string; llvm_path: string };

// ── Helpers ───────────────────────────────────────────────────────────────────

function find_vector_sets(): VectorSet[] {
  return readdirSync("utils")
    .filter(f => f.startsWith("ptx_vectors_") && f.endsWith(".json"))
    .sort()
    .map(f => {
      const slug = f.replace("ptx_vectors_", "").replace(".json", "");
      const last = slug.lastIndexOf("_");
      return {
        provider: slug.slice(0, last),
        mode:     slug.slice(last + 1),
        ptx_path:  `utils/ptx_vectors_${slug}.json`,
        llvm_path: `utils/llvm_vectors_${slug}.json`,
      };
    });
}

function find_ptx_files(): string[] {
  return readdirSync("examples")
    .filter(f => f.endsWith(".ptx"))
    .sort()
    .map(f => `examples/${f}`);
}

function run_matrix(vs: VectorSet, source: string, tmp: string, slug: string, alg_names: string[], conv_names: string[]): Scores {
  process.env["PTX_VECTORS"]  = vs.ptx_path;
  process.env["LLVM_VECTORS"] = vs.llvm_path;

  const matrix_tokens = lift_all_matrix(source);
  const scores: Scores = {};
  let best = -1, best_cell = "";

  for (const conv of conv_names) {
    scores[conv] = {};
    for (const alg of alg_names) {
      const tokens = matrix_tokens[conv]?.[alg] ?? [];
      if (tokens.length === 0) { scores[conv]![alg] = 0; continue; }

      const ll      = tokens_to_ll(tokens);
      const id      = `${slug}_${conv}_${alg}`.replace(/[^a-z0-9_]/gi, "_");
      const ll_file = join(tmp, `${id}.ll`);
      const ptx_out = join(tmp, `${id}.ptx`);
      writeFileSync(ll_file, ll);

      const r = spawnSync("node", [resolve("llc.mjs"), ll_file, ptx_out], { encoding: "utf8" });
      if (r.status !== 0) { scores[conv]![alg] = 0; continue; }

      const score = compare_ptx(source, readFileSync(ptx_out, "utf8")).score;
      scores[conv]![alg] = score;
      if (score > best) { best = score; best_cell = `${conv} × ${alg}`; }
    }
  }

  console.log(`    best: ${best_cell}  (${(best * 100).toFixed(0)}%)`);
  return scores;
}

// ── Markdown helpers ──────────────────────────────────────────────────────────

function best_of(scores: Scores, alg_names: string[], conv_names: string[]) {
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
  const lines = [`| ${header.join(" | ")} |`, `| ${header.map(() => "---").join(" | ")} |`];
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
  const lines = [`| ${header.join(" | ")} |`, `| ${header.map(() => "---").join(" | ")} |`];
  for (const conv of conv_names) {
    const cells = alg_names.map(alg => {
      const delta = Math.round(((desc[conv]?.[alg] ?? 0) - (bare[conv]?.[alg] ?? 0)) * 100);
      return delta === 0 ? `0%` : delta > 0 ? `**+${delta}%**` : `${delta}%`;
    });
    lines.push(`| ${conv} | ${cells.join(" | ")} |`);
  }
  return lines;
}

// average scores across a list of score matrices
function avg_scores(all: Scores[], alg_names: string[], conv_names: string[]): Scores {
  const out: Scores = {};
  for (const conv of conv_names) {
    out[conv] = {};
    for (const alg of alg_names) {
      const vals = all.map(s => s[conv]?.[alg] ?? 0);
      out[conv]![alg] = vals.reduce((a, b) => a + b, 0) / vals.length;
    }
  }
  return out;
}

// ── Output writers ────────────────────────────────────────────────────────────

function write_full_results(
  // kernel → provider_mode → scores
  all_results: Map<string, Map<string, Scores>>,
  alg_names: string[],
  conv_names: string[],
  provider_modes: string[],
) {
  const lines: string[] = [];
  lines.push(`# Full results — all kernels`);
  lines.push(``);
  lines.push(`Per-kernel jaccard matrices for every provider × mode combination.`);
  lines.push(``);

  for (const [kernel, pm_map] of all_results) {
    lines.push(`## ${kernel}`);
    lines.push(``);

    // group by provider
    const providers = [...new Set(provider_modes.map(pm => pm.split("/")[0]!))];
    for (const provider of providers) {
      const bare = pm_map.get(`${provider}/bare`);
      const desc = pm_map.get(`${provider}/described`);
      if (!bare && !desc) continue;

      lines.push(`### ${provider}`);
      lines.push(``);

      if (bare) {
        const b = best_of(bare, alg_names, conv_names);
        lines.push(`**bare** — best: \`${b.conv} × ${b.alg}\` (${(b.score * 100).toFixed(0)}%)`);
        lines.push(``);
        lines.push(...scores_table_md(bare, alg_names, conv_names));
        lines.push(``);
      }
      if (desc) {
        const d = best_of(desc, alg_names, conv_names);
        lines.push(`**described** — best: \`${d.conv} × ${d.alg}\` (${(d.score * 100).toFixed(0)}%)`);
        lines.push(``);
        lines.push(...scores_table_md(desc, alg_names, conv_names));
        lines.push(``);
      }
      if (bare && desc) {
        lines.push(`**bare → described delta**`);
        lines.push(``);
        lines.push(...delta_table_md(bare, desc, alg_names, conv_names));
        lines.push(``);
      }
    }
  }

  writeFileSync("FULL_RESULTS.md", lines.join("\n"));
  console.log("\nWrote FULL_RESULTS.md");
}

function write_readme(
  ptx_files: string[],
  // provider_mode → list of scores (one per kernel)
  pm_all_scores: Map<string, Scores[]>,
  alg_names: string[],
  conv_names: string[],
  provider_modes: string[],
) {
  const lines: string[] = [];
  lines.push(`# Levitate roundtrip results`);
  lines.push(``);
  lines.push(`Averaged instruction similarity across **${ptx_files.length} kernels**: ${ptx_files.map(f => `\`${f.replace("examples/","")}\``).join(", ")}`);
  lines.push(``);
  lines.push(`**Metric:** Weighted PTX instruction similarity (sequence + multiplicity + set + exact bonus), averaged across kernels`);
  lines.push(``);

  const providers = [...new Set(provider_modes.map(pm => pm.split("/")[0]!))];

  for (const provider of providers) {
    const bare_all = pm_all_scores.get(`${provider}/bare`) ?? [];
    const desc_all = pm_all_scores.get(`${provider}/described`) ?? [];
    if (bare_all.length === 0 && desc_all.length === 0) continue;

    lines.push(`## ${provider}`);
    lines.push(``);

    if (bare_all.length > 0) {
      const avg = avg_scores(bare_all, alg_names, conv_names);
      const b = best_of(avg, alg_names, conv_names);
      lines.push(`### bare`);
      lines.push(``);
      lines.push(`> **Best avg:** \`${b.conv} × ${b.alg}\` — **${(b.score * 100).toFixed(0)}%**`);
      lines.push(``);
      lines.push(...scores_table_md(avg, alg_names, conv_names));
      lines.push(``);
    }

    if (desc_all.length > 0) {
      const avg = avg_scores(desc_all, alg_names, conv_names);
      const d = best_of(avg, alg_names, conv_names);
      lines.push(`### described`);
      lines.push(``);
      lines.push(`> **Best avg:** \`${d.conv} × ${d.alg}\` — **${(d.score * 100).toFixed(0)}%**`);
      lines.push(``);
      lines.push(...scores_table_md(avg, alg_names, conv_names));
      lines.push(``);
    }

    if (bare_all.length > 0 && desc_all.length > 0) {
      const bare_avg = avg_scores(bare_all, alg_names, conv_names);
      const desc_avg = avg_scores(desc_all, alg_names, conv_names);
      lines.push(`### bare → described delta`);
      lines.push(``);
      lines.push(...delta_table_md(bare_avg, desc_avg, alg_names, conv_names));
      lines.push(``);
    }
  }

  // summary table
  lines.push(`## summary`);
  lines.push(``);
  lines.push(`| provider | bare avg best | described avg best |`);
  lines.push(`| --- | --- | --- |`);
  for (const provider of providers) {
    const bare_avg = pm_all_scores.get(`${provider}/bare`) ?? [];
    const desc_avg = pm_all_scores.get(`${provider}/described`) ?? [];
    const b = bare_avg.length > 0 ? best_of(avg_scores(bare_avg, alg_names, conv_names), alg_names, conv_names) : null;
    const d = desc_avg.length > 0 ? best_of(avg_scores(desc_avg, alg_names, conv_names), alg_names, conv_names) : null;
    lines.push(`| ${provider} | ${b ? `${(b.score*100).toFixed(0)}% (\`${b.conv} × ${b.alg}\`)` : "n/a"} | ${d ? `${(d.score*100).toFixed(0)}% (\`${d.conv} × ${d.alg}\`)` : "n/a"} |`);
  }
  lines.push(``);

  writeFileSync("README.md", lines.join("\n"));
  console.log("Wrote README.md");
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const vector_sets = find_vector_sets();
  const ptx_files   = find_ptx_files();

  if (vector_sets.length === 0) { console.error("No vector files in utils/. Run: npm run refresh"); process.exit(1); }

  const tmp        = mkdtempSync(join(tmpdir(), "levitate-"));
  const alg_names  = [...registry.keys()];
  const conv_names = [...conv_registry.keys()];
  const pm_labels  = [...new Set(vector_sets.map(v => `${v.provider}/${v.mode}`))];

  console.log(`\n${ptx_files.length} kernels × ${vector_sets.length} vector sets × ${conv_names.length} convs × ${alg_names.length} algs\n`);

  // kernel → provider_mode → scores
  const all_results   = new Map<string, Map<string, Scores>>();
  // provider_mode → scores[]  (one per kernel)
  const pm_all_scores = new Map<string, Scores[]>();

  for (const ptx_file of ptx_files) {
    const kernel = ptx_file.replace("examples/", "").replace(".ptx", "");
    const source = readFileSync(ptx_file, "utf8");
    console.log(`\n── ${kernel}`);

    const pm_map = new Map<string, Scores>();

    for (const vs of vector_sets) {
      const pm  = `${vs.provider}/${vs.mode}`;
      const slug = `${kernel}_${vs.provider}_${vs.mode}`;
      process.stdout.write(`  ${pm}: `);
      const scores = run_matrix(vs, source, tmp, slug, alg_names, conv_names);
      pm_map.set(pm, scores);
      if (!pm_all_scores.has(pm)) pm_all_scores.set(pm, []);
      pm_all_scores.get(pm)!.push(scores);
    }

    all_results.set(kernel, pm_map);
  }

  write_full_results(all_results, alg_names, conv_names, pm_labels);
  write_readme(ptx_files, pm_all_scores, alg_names, conv_names, pm_labels);
})();

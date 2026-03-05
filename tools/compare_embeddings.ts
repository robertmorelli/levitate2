#!/usr/bin/env tsx
/**
 * Embeds PTX + LLVM vocab in 2 modes (bare / described) for every available
 * provider (Gemini, OpenAI, Ollama), runs the full conv×alg roundtrip matrix
 * for each, and writes RESULTS.md with per-provider and cross-provider tables.
 *
 * Usage: tsx tools/compare_embeddings.ts <input.ptx>
 */

import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { PTX_DESCRIPTIONS, LLVM_DESCRIPTIONS } from "../utils/token_descriptions.js";
import { make_gemini, make_openai, make_ollama, type EmbedFn } from "../utils/embed_providers.js";

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
type VectorSet = { label: string; ptx_path: string; llvm_path: string };
type RunResult = { provider: string; mode: "bare" | "described"; scores: Scores };

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

function to_map(tokens: string[], vecs: number[][]): Record<string, number[]> {
  return Object.fromEntries(tokens.map((t, i) => [t, vecs[i]!]));
}

async function embed_variant(
  embed: EmbedFn,
  provider: string,
  mode: "bare" | "described",
  ptx_tokens: string[], ptx_texts: string[],
  llvm_tokens: string[], llvm_texts: string[],
): Promise<VectorSet> {
  process.stdout.write(`  [${provider}/${mode}] PTX...  `);
  const ptx_vecs  = await embed(ptx_texts);
  console.log(`dim=${ptx_vecs[0]?.length ?? 0}`);

  process.stdout.write(`  [${provider}/${mode}] LLVM... `);
  const llvm_vecs = await embed(llvm_texts);
  console.log(`dim=${llvm_vecs[0]?.length ?? 0}`);

  const slug      = `${provider}_${mode}`;
  const ptx_path  = `utils/ptx_vectors_${slug}.json`;
  const llvm_path = `utils/llvm_vectors_${slug}.json`;
  writeFileSync(ptx_path,  JSON.stringify(to_map(ptx_tokens,  ptx_vecs),  null, 2));
  writeFileSync(llvm_path, JSON.stringify(to_map(llvm_tokens, llvm_vecs), null, 2));
  return { label: slug, ptx_path, llvm_path };
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
      const ll_file = join(tmp, `${vs.label}_${conv}_${alg}.ll`);
      const ptx_out = join(tmp, `${vs.label}_${conv}_${alg}.ptx`);
      writeFileSync(ll_file, ll);

      const r = spawnSync("node", [resolve("llc.mjs"), ll_file, ptx_out], { encoding: "utf8" });
      if (r.status !== 0) { scores[conv]![alg] = 0; continue; }

      const score = jaccard(src_ops, ops_of(readFileSync(ptx_out, "utf8")));
      scores[conv]![alg] = score;
      if (score > best) { best = score; best_cell = `${conv} × ${alg}`; }
    }
  }

  print_matrix(vs.label, scores, alg_names, conv_names, best, best_cell);
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

function scores_table_md(scores: Scores, alg_names: string[], conv_names: string[]): string[] {
  let best_score = -1;
  for (const conv of conv_names)
    for (const alg of alg_names) {
      const s = scores[conv]?.[alg] ?? 0;
      if (s > best_score) best_score = s;
    }

  const header = ["conv \\ alg", ...alg_names];
  const lines = [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
  ];
  for (const conv of conv_names) {
    const cells = alg_names.map(alg => {
      const s = scores[conv]?.[alg] ?? 0;
      const pct = `${(s * 100).toFixed(0)}%`;
      return s === best_score ? `**${pct}**` : pct;
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
      const b = bare[conv]?.[alg] ?? 0;
      const d = desc[conv]?.[alg] ?? 0;
      const delta = Math.round((d - b) * 100);
      return delta === 0 ? `0%` : delta > 0 ? `**+${delta}%**` : `${delta}%`;
    });
    lines.push(`| ${conv} | ${cells.join(" | ")} |`);
  }
  return lines;
}

function best_cell(scores: Scores, alg_names: string[], conv_names: string[]): { conv: string; alg: string; score: number } {
  let best = { conv: "", alg: "", score: -1 };
  for (const conv of conv_names)
    for (const alg of alg_names) {
      const s = scores[conv]?.[alg] ?? 0;
      if (s > best.score) best = { conv, alg, score: s };
    }
  return best;
}

function write_results_md(
  ptx_file: string,
  src_ops: string[],
  results: RunResult[],
  alg_names: string[],
  conv_names: string[],
  providers: string[],
) {
  const lines: string[] = [];
  lines.push(`# Levitate roundtrip results`);
  lines.push(``);
  lines.push(`**Input:** \`${ptx_file}\`  `);
  lines.push(`**Source ops:** \`${src_ops.join(" ")}\`  `);
  lines.push(`**Metric:** Jaccard similarity on PTX opcode sets  `);
  lines.push(``);

  // ── per-provider sections ──
  for (const provider of providers) {
    const bare_run = results.find(r => r.provider === provider && r.mode === "bare");
    const desc_run = results.find(r => r.provider === provider && r.mode === "described");
    if (!bare_run || !desc_run) continue;

    const b = best_cell(bare_run.scores, alg_names, conv_names);
    const d = best_cell(desc_run.scores, alg_names, conv_names);

    lines.push(`## ${provider}`);
    lines.push(``);
    lines.push(`### bare embeddings`);
    lines.push(``);
    lines.push(`> **Best:** \`${b.conv} × ${b.alg}\` — **${(b.score * 100).toFixed(0)}%** jaccard`);
    lines.push(``);
    lines.push(...scores_table_md(bare_run.scores, alg_names, conv_names));
    lines.push(``);
    lines.push(`### described embeddings`);
    lines.push(``);
    lines.push(`> **Best:** \`${d.conv} × ${d.alg}\` — **${(d.score * 100).toFixed(0)}%** jaccard`);
    lines.push(``);
    lines.push(...scores_table_md(desc_run.scores, alg_names, conv_names));
    lines.push(``);
    lines.push(`### bare vs described delta`);
    lines.push(``);
    lines.push(`Positive = described beat bare.`);
    lines.push(``);
    lines.push(...delta_table_md(bare_run.scores, desc_run.scores, alg_names, conv_names));
    lines.push(``);
  }

  // ── cross-provider best score summary ──
  lines.push(`## cross-provider summary`);
  lines.push(``);
  lines.push(`Best jaccard score per provider × mode.`);
  lines.push(``);
  lines.push(`| provider | bare best | described best |`);
  lines.push(`| --- | --- | --- |`);
  for (const provider of providers) {
    const bare_run = results.find(r => r.provider === provider && r.mode === "bare");
    const desc_run = results.find(r => r.provider === provider && r.mode === "described");
    const b = bare_run ? best_cell(bare_run.scores, alg_names, conv_names) : null;
    const d = desc_run ? best_cell(desc_run.scores, alg_names, conv_names) : null;
    const b_str = b ? `${(b.score * 100).toFixed(0)}% (\`${b.conv} × ${b.alg}\`)` : "n/a";
    const d_str = d ? `${(d.score * 100).toFixed(0)}% (\`${d.conv} × ${d.alg}\`)` : "n/a";
    lines.push(`| ${provider} | ${b_str} | ${d_str} |`);
  }
  lines.push(``);

  writeFileSync("RESULTS.md", lines.join("\n"));
  console.log("Wrote RESULTS.md");
}

// ── Provider detection ────────────────────────────────────────────────────────

async function detect_providers(): Promise<Array<{ name: string; embed: EmbedFn }>> {
  const out: Array<{ name: string; embed: EmbedFn }> = [];

  const gemini_key = process.env["GEMINI_API_KEY"] ?? process.env["GEMINI_TOKEN"];
  if (gemini_key) {
    console.log("  gemini: found GEMINI_API_KEY");
    out.push({ name: "gemini", embed: make_gemini(gemini_key) });
  }

  const openai_key = process.env["OPENAI_API_KEY"];
  if (openai_key) {
    console.log("  openai: found OPENAI_API_KEY");
    out.push({ name: "openai", embed: make_openai(openai_key) });
  }

  // check Ollama connectivity
  try {
    const r = await fetch("http://localhost:11434/api/tags", { signal: AbortSignal.timeout(3000) });
    if (r.ok) {
      const data = await r.json() as { models: { name: string }[] };
      const model = data.models.find(m => m.name.startsWith("nomic-embed-text") || m.name.startsWith("bge-small"));
      if (model) {
        const m = model.name.split(":")[0]!;
        console.log(`  ollama: found model ${model.name}`);
        out.push({ name: "ollama", embed: make_ollama(m) });
      } else {
        console.log("  ollama: running but no embedding model found (need nomic-embed-text or bge-small-en-v1.5)");
      }
    }
  } catch {
    console.log("  ollama: not reachable");
  }

  return out;
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  const ptx_file = process.argv[2];
  if (!ptx_file) { console.error("Usage: compare_embeddings.ts <input.ptx>"); process.exit(1); }

  const ptx_tokens  = Object.keys(PTX_DESCRIPTIONS);
  const llvm_tokens = Object.keys(LLVM_DESCRIPTIONS);
  const source      = readFileSync(ptx_file, "utf8");
  const src_ops     = ops_of(source);
  const tmp         = mkdtempSync(join(tmpdir(), "levitate-"));
  const alg_names   = [...registry.keys()];
  const conv_names  = [...conv_registry.keys()];

  console.log("\n=== Detecting providers ===\n");
  const providers = await detect_providers();
  if (providers.length === 0) { console.error("No providers available. Set GEMINI_API_KEY, OPENAI_API_KEY, or run Ollama."); process.exit(1); }

  console.log(`\nsource: ${src_ops.join(" ")}\n`);
  console.log("=== Embedding + running matrices ===\n");

  const results: RunResult[] = [];

  for (const { name, embed } of providers) {
    const bare_vs = await embed_variant(embed, name, "bare",       ptx_tokens, ptx_tokens,                       llvm_tokens, llvm_tokens);
    const desc_vs = await embed_variant(embed, name, "described",  ptx_tokens, Object.values(PTX_DESCRIPTIONS),  llvm_tokens, Object.values(LLVM_DESCRIPTIONS));

    const bare_scores = run_matrix(bare_vs, source, tmp, alg_names, conv_names);
    const desc_scores = run_matrix(desc_vs, source, tmp, alg_names, conv_names);

    results.push({ provider: name, mode: "bare",      scores: bare_scores });
    results.push({ provider: name, mode: "described", scores: desc_scores });
  }

  write_results_md(ptx_file, src_ops, results, alg_names, conv_names, providers.map(p => p.name));
})();

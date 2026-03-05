#!/usr/bin/env tsx
/**
 * Roundtrip harness: PTX → (conv × algorithm) matrix → .ll → llc → PTX → jaccard
 *
 * Usage:  npm run roundtrip <input.ptx>
 */

import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import "./utils/convolutions.js";
import "./algorithms/global_residual.js";
import "./algorithms/per_token.js";
import "./algorithms/arithmetic.js";
import "./algorithms/arithmetic_opt.js";
import "./algorithms/momentum.js";
import "./algorithms/dominant_prefix.js";
import "./algorithms/delta_decode.js";
import "./algorithms/amplitude_sort.js";
import "./algorithms/conv_residual.js";
import "./algorithms/dynamic_stack_healing.js";
import "./algorithms/dynamic_stack_healing_v2.js";
import "./algorithms/arithmetic_stack_block_healing.js";

import { lift_all_matrix } from "./lift.js";
import { tokens_to_ll } from "./utils/tokens_to_ll.js";
import { registry, conv_registry } from "./utils/registry.js";
import { compare_ptx } from "./utils/ptx_similarity.js";

const ptxFile = process.argv[2];
if (!ptxFile) { console.error("Usage: roundtrip.ts <input.ptx>"); process.exit(1); }

const source   = readFileSync(ptxFile, "utf8");
const tmp      = mkdtempSync(join(tmpdir(), "levitate-"));
const matrix   = lift_all_matrix(source);

const alg_names  = [...registry.keys()];
const conv_names = [...conv_registry.keys()];

console.log(`\nsource: ${ptxFile}\n`);

// ── compile every (conv, alg) cell ───────────────────────────────────────────
const scores: Record<string, Record<string, number>> = {};
let best_score = -1, best_cell = "";

for (const conv of conv_names) {
  scores[conv] = {};
  for (const alg of alg_names) {
    const tokens = matrix[conv]?.[alg] ?? [];
    if (tokens.length === 0) { scores[conv]![alg] = 0; continue; }

    const ll    = tokens_to_ll(tokens);
    const llFile = join(tmp, `${conv}_${alg}.ll`);
    const ptxOut = join(tmp, `${conv}_${alg}.ptx`);
    writeFileSync(llFile, ll);

    const r = spawnSync("node", [resolve("llc.mjs"), llFile, ptxOut], { encoding: "utf8" });
    if (r.status !== 0) { scores[conv]![alg] = 0; continue; }

    const score = compare_ptx(source, readFileSync(ptxOut, "utf8")).score;
    scores[conv]![alg] = score;
    if (score > best_score) { best_score = score; best_cell = `${conv} × ${alg}`; }
  }
}

// ── print matrix ─────────────────────────────────────────────────────────────
const COL = 10;
const ROW = 16;

process.stdout.write("\n" + " ".repeat(ROW));
for (const alg of alg_names) process.stdout.write(alg.substring(0, COL - 1).padEnd(COL));
console.log();
console.log("─".repeat(ROW + alg_names.length * COL));

for (const conv of conv_names) {
  process.stdout.write(conv.padEnd(ROW));
  for (const alg of alg_names) {
    const pct = `${((scores[conv]?.[alg] ?? 0) * 100).toFixed(0)}%`;
    const cell = scores[conv]?.[alg] === best_score ? `[${pct}]` : ` ${pct} `;
    process.stdout.write(cell.padEnd(COL));
  }
  console.log();
}

console.log("─".repeat(ROW + alg_names.length * COL));
console.log(`\nbest: ${best_cell}  (${(best_score * 100).toFixed(0)}% similarity)`);

// ── show lifted tokens for best cell ─────────────────────────────────────────
const [best_conv = "", best_alg = ""] = best_cell.split(" × ");
console.log(`lifted: ${(matrix[best_conv]?.[best_alg] ?? []).join(" ")}`);

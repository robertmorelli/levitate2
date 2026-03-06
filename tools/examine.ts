#!/usr/bin/env tsx
/**
 * Examine one conv×alg combination against one or all PTX examples.
 *
 * Usage:
 *   npm run examine -- <conv> <alg> [test] [nearest_metric=cosine]
 * Examples:
 *   npm run examine -- identity arithmetic_opt
 *   npm run examine -- gaussian per_token add_fma
 *   npm run examine -- differential conv_residual examples/add_fma.ptx
 */

import { mkdtempSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, resolve, basename } from "node:path";
import { tmpdir } from "node:os";

import { lift_all } from "../lift.js";
import { tokens_to_ll } from "../utils/tokens_to_ll.js";
import { compare_ptx, ptx_instruction_signatures } from "../utils/ptx_similarity.js";
import { conv_registry, registry } from "../utils/registry.js";
import { parse_nearest_metric } from "../utils/find_nearest_token.js";
import { parse_ptx_source } from "../utils/parse_ptx_source.js";
import { load_vector_map } from "../utils/load_vector_map.js";
import { ensure_vocab } from "../utils/ensure_vocab.js";

function usage_and_exit(msg?: string): never {
  if (msg) console.error(msg);
  console.error("Usage: npm run examine -- <conv> <alg> [test] [nearest_metric=cosine]");
  console.error(`Convs: ${[...conv_registry.keys()].join(", ")}`);
  console.error(`Algs:  ${[...registry.keys()].join(", ")}`);
  process.exit(1);
}

function resolve_tests(optionalTest?: string): string[] {
  if (!optionalTest) {
    return readdirSync("examples")
      .filter(f => f.endsWith(".ptx"))
      .sort()
      .map(f => `examples/${f}`);
  }

  const t = optionalTest.endsWith(".ptx") ? optionalTest : `${optionalTest}.ptx`;
  if (t.startsWith("examples/")) return [t];
  if (t.includes("/")) return [t];
  return [`examples/${t}`];
}

function summarize_diff(source: string[], candidate: string[], maxShow = 24): string[] {
  let pre = 0;
  while (pre < source.length && pre < candidate.length && source[pre] === candidate[pre]) pre++;

  let sa = source.length - 1;
  let ca = candidate.length - 1;
  while (sa >= pre && ca >= pre && source[sa] === candidate[ca]) { sa--; ca--; }

  const srcMid = sa >= pre ? source.slice(pre, sa + 1) : [];
  const candMid = ca >= pre ? candidate.slice(pre, ca + 1) : [];

  const lines: string[] = [];
  lines.push(`shared prefix: ${pre} instructions`);
  lines.push(`shared suffix: ${Math.max(0, source.length - 1 - sa)} instructions`);
  lines.push(`source unique middle: ${srcMid.length}`);
  lines.push(`candidate unique middle: ${candMid.length}`);

  if (srcMid.length === 0 && candMid.length === 0) {
    lines.push("diff: exact signature match");
    return lines;
  }

  lines.push("");
  lines.push("source-only slice:");
  for (const s of srcMid.slice(0, maxShow)) lines.push(`- ${s}`);
  if (srcMid.length > maxShow) lines.push(`- ... (${srcMid.length - maxShow} more)`);

  lines.push("");
  lines.push("candidate-only slice:");
  for (const s of candMid.slice(0, maxShow)) lines.push(`+ ${s}`);
  if (candMid.length > maxShow) lines.push(`+ ... (${candMid.length - maxShow} more)`);

  return lines;
}

const conv = process.argv[2];
const alg = process.argv[3];
const optionalTest = process.argv[4];
const nearestMetric = parse_nearest_metric(process.argv[5] ?? process.env["NEAREST_METRIC"]);
process.env["NEAREST_METRIC"] = nearestMetric;

if (!conv || !alg) usage_and_exit();
if (!conv_registry.has(conv)) usage_and_exit(`Unknown conv: ${conv}`);
if (!registry.has(alg)) usage_and_exit(`Unknown alg: ${alg}`);

const tests = resolve_tests(optionalTest);
if (tests.length === 0) usage_and_exit("No PTX tests found.");

// Pre-flight: embed any tokens that appear in PTX sources but are missing from vocab
{
  const ptx_path = process.env["PTX_VECTORS"] ?? "utils/ptx_vectors_gemini_described.json";
  const ptx_vecs = load_vector_map(ptx_path);
  const all_tokens = tests.flatMap(f => parse_ptx_source(readFileSync(f, "utf8"), ptx_vecs));
  await ensure_vocab(all_tokens);
}

const tmp = mkdtempSync(join(tmpdir(), "levitate-examine-"));
let passed = 0;
let failedCompile = 0;
let total = 0;
let scoreSum = 0;

console.log(`\nexamine: conv=${conv} alg=${alg} tests=${tests.length}\n`);
console.log(`nearest metric: ${nearestMetric}\n`);

for (const ptxFile of tests) {
  total++;
  const source = readFileSync(ptxFile, "utf8");
  const lifted = lift_all(source, conv)[alg] ?? [];
  const ll = tokens_to_ll(lifted);

  const stem = basename(ptxFile, ".ptx");
  const llFile = join(tmp, `${stem}_${conv}_${alg}.ll`);
  const ptxOut = join(tmp, `${stem}_${conv}_${alg}.ptx`);
  writeFileSync(llFile, ll);

  const r = spawnSync("node", [resolve("llc.mjs"), llFile, ptxOut], { encoding: "utf8" });
  console.log(`=== ${ptxFile} ===`);
  if (r.status !== 0) {
    failedCompile++;
    console.log("compile: FAIL");
    console.log("");
    continue;
  }

  const candidate = readFileSync(ptxOut, "utf8");
  const sim = compare_ptx(source, candidate);
  const srcSig = ptx_instruction_signatures(source);
  const candSig = ptx_instruction_signatures(candidate);
  scoreSum += sim.score;
  if (sim.exact === 1) passed++;

  console.log(`compile: OK`);
  console.log(`score: ${(sim.score * 100).toFixed(1)}%`);
  console.log(`  seq_lcs=${(sim.seq_lcs * 100).toFixed(1)}% bag=${(sim.bag_overlap * 100).toFixed(1)}% set=${(sim.set_jaccard * 100).toFixed(1)}% exact=${sim.exact ? "yes" : "no"}`);
  console.log(`  source_instr=${srcSig.length} candidate_instr=${candSig.length}`);
  console.log(`  lifted_tokens=${lifted.length}`);

  const diff = summarize_diff(srcSig, candSig);
  for (const line of diff) console.log(line);
  console.log("");
}

console.log("=== summary ===");
console.log(`exact matches: ${passed}/${total}`);
console.log(`compile failures: ${failedCompile}/${total}`);
console.log(`avg score: ${total > 0 ? ((scoreSum / total) * 100).toFixed(1) : "0.0"}%`);

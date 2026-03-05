#!/usr/bin/env tsx
/**
 * Tune vectors using all benchmarks except one holdout benchmark, then test holdout.
 *
 * Usage:
 *   npm run tuned -- <conv> <alg> <tuner> <holdout> [epochs=1] [ptx_vectors] [llvm_vectors]
 *
 * Example:
 *   npm run tuned -- causal dynamic_stack_healing_v2 dynamic_stack_v2 complex_kernel 2
 */

import { readFileSync, readdirSync, writeFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

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

import { conv_registry, registry, type LiftContext } from "../utils/registry.js";
import { load_vector_map } from "../utils/load_vector_map.js";
import { parse_ptx_source } from "../utils/parse_ptx_source.js";
import { get_vector_dimension } from "../utils/get_vector_dimension.js";
import { build_nearest_token_fn } from "../utils/find_nearest_token.js";
import { tokens_to_ll } from "../utils/tokens_to_ll.js";
import { compare_ptx } from "../utils/ptx_similarity.js";
import { tuner_registry, type TuneSample } from "../tuning/registry.js";

type VecMap = Record<string, number[]>;

function usage_and_exit(msg?: string): never {
  if (msg) console.error(msg);
  console.error("Usage: npm run tuned -- <conv> <alg> <tuner> <holdout> [epochs=1] [ptx_vectors] [llvm_vectors]");
  console.error(`Convs:  ${[...conv_registry.keys()].join(", ")}`);
  console.error(`Algs:   ${[...registry.keys()].join(", ")}`);
  console.error(`Tuners: ${[...tuner_registry.keys()].join(", ")}`);
  process.exit(1);
}

function normalize_holdout(input: string): string {
  const h = input.endsWith(".ptx") ? input : `${input}.ptx`;
  if (h.startsWith("examples/")) return h;
  if (h.includes("/")) return h;
  return `examples/${h}`;
}

function list_ptx_examples(): string[] {
  return readdirSync("examples")
    .filter(f => f.endsWith(".ptx"))
    .sort()
    .map(f => `examples/${f}`);
}

function llvm_expectations_from_ptx(tokens: string[]): string[] {
  const out: string[] = [];
  for (const t of tokens) {
    switch (t) {
      case "add.f32": out.push("fadd_float"); break;
      case "sub.f32": out.push("fsub_float"); break;
      case "mul.f32": out.push("fmul_float"); break;
      case "fma.rn.f32": out.push("fma_float"); break;
      case "div.rn.f32": out.push("fdiv_float"); break;
      case "rcp.rn.f32":
      case "rcp.approx.f32": out.push("fdiv_float_recip"); break;
      case "sqrt.rn.f32": out.push("fsqrt_float"); break;
      case "abs.f32": out.push("fabs_float"); break;
      case "neg.f32": out.push("fneg_float"); break;
      case "min.f32": out.push("fmin_float"); break;
      case "max.f32": out.push("fmax_float"); break;
      case "selp.f32": out.push("select_float"); break;
      case "setp.eq.f32": out.push("fcmp_oeq_float"); break;
      case "setp.lt.f32": out.push("fcmp_olt_float"); break;
      case "setp.gt.f32": out.push("fcmp_ogt_float"); break;
      case "setp.eq.b32": out.push("icmp_eq_i32"); break;
      case "setp.ne.s32": out.push("icmp_ne_i32"); break;
      case "setp.ge.s32": out.push("icmp_sge_i32"); break;
      case "add.s32": out.push("add_i32"); break;
      case "sub.s32": out.push("sub_i32"); break;
      case "mul.lo.s32":
      case "mad.lo.s32": out.push("mul_i32"); break;
      case "mul.wide.s32": out.push("mul_i64"); break;
      case "add.s64": out.push("add_i64"); break;
      case "and.b32": out.push("and_i32"); break;
      case "or.b32": out.push("or_i32"); break;
      case "xor.b32": out.push("xor_i32"); break;
      case "shl.b32": out.push("shl_i32"); break;
      case "shl.b64": out.push("shl_i64"); break;
      case "shr.u32": out.push("lshr_i32"); break;
      case "mov.f32": out.push("mov_float"); break;
      case "mov.s32":
      case "mov.u32": out.push("mov_i32"); break;
      case "cvt.rzi.s32.f32": out.push("fptosi_f32_to_i32"); break;
      case "cvt.rn.f32.s32": out.push("sitofp_i32_to_f32"); break;
      case "cvt.s64.s32": out.push("sext_i32_to_i64"); break;
      case "cvt.u64.u32": out.push("zext_i32_to_i64"); break;
      case "ld.global.f32": out.push("load_float_addrspace1"); break;
      case "st.global.f32": out.push("store_float_addrspace1"); break;
      case "ld.global.u32":
      case "ld.global.s32": out.push("load_i32_addrspace1"); break;
      case "st.global.u32":
      case "st.global.s32": out.push("store_i32_addrspace1"); break;
      case "ld.param.u64":
      case "cvta.to.global.u64": out.push("ptrtoint_p1_to_i64"); break;
      case "ld.param.u32": out.push("mov_i32"); break;
      case "bra": out.push("br_uncond"); break;
      case "ret": out.push("ret_void"); break;
      default: out.push("mov_i32"); break;
    }
  }
  return out;
}

function make_vector_dictionary(ptx_vectors: VecMap, llvm_vectors: VecMap) {
  const all_vectors: VecMap = { ...ptx_vectors, ...llvm_vectors };
  const llvm_tokens = Object.keys(llvm_vectors);

  return {
    getVector(tokenId: string): number[] {
      return all_vectors[tokenId] ?? [];
    },
    setVector(tokenId: string, vector: number[]): void {
      all_vectors[tokenId] = [...vector];
      if (tokenId in ptx_vectors) ptx_vectors[tokenId] = [...vector];
      if (tokenId in llvm_vectors) llvm_vectors[tokenId] = [...vector];
    },
    findNearest(query: number[]): string {
      const queryNorm = Math.sqrt(query.reduce((s, q) => s + q * q, 0));
      if (queryNorm === 0) return "";
      let best = "";
      let bestScore = -Infinity;
      for (const token of llvm_tokens) {
        const v = llvm_vectors[token] ?? [];
        const vNorm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
        if (vNorm === 0) continue;
        const dot = query.reduce((s, q, i) => s + q * (v[i] ?? 0), 0);
        const score = dot / (queryNorm * vNorm);
        if (score > bestScore) {
          bestScore = score;
          best = token;
        }
      }
      return best;
    },
  };
}

function score_holdout(
  source: string,
  conv: string,
  alg: string,
  ptx_vectors: VecMap,
  llvm_vectors: VecMap
): { score: number; emitted: string[] } {
  const dim = get_vector_dimension(ptx_vectors);
  const conv_fn = conv_registry.get(conv);
  const alg_fn = registry.get(alg);
  if (!alg_fn) return { score: 0, emitted: [] };

  const tokens = parse_ptx_source(source, ptx_vectors);
  const context_vectors = conv_fn
    ? conv_fn(tokens, ptx_vectors, dim)
    : tokens.map(t => [...(ptx_vectors[t] ?? [])]);
  const ctx: LiftContext = {
    ptx_vectors,
    llvm_vectors,
    find_nearest_llvm: build_nearest_token_fn(llvm_vectors),
    dim,
    context_vectors,
  };

  const emitted = alg_fn(ctx, tokens);
  const ll = tokens_to_ll(emitted);
  const tmp = mkdtempSync(join(tmpdir(), "levitate-tuned-"));
  const llFile = join(tmp, "holdout.ll");
  const ptxOut = join(tmp, "holdout.ptx");
  writeFileSync(llFile, ll);
  const r = spawnSync("node", [resolve("llc.mjs"), llFile, ptxOut], { encoding: "utf8" });
  if (r.status !== 0) return { score: 0, emitted };
  const candidate = readFileSync(ptxOut, "utf8");
  return { score: compare_ptx(source, candidate).score, emitted };
}

const conv = process.argv[2];
const alg = process.argv[3];
const tunerName = process.argv[4];
const holdoutArg = process.argv[5];
const epochs = parseInt(process.argv[6] ?? "1", 10);
const ptxPath = process.argv[7] ?? process.env["PTX_VECTORS"] ?? "utils/ptx_vectors_openai_described.json";
const llvmPath = process.argv[8] ?? process.env["LLVM_VECTORS"] ?? "utils/llvm_vectors_openai_described.json";

if (!conv || !alg || !tunerName || !holdoutArg) usage_and_exit();
if (!conv_registry.has(conv)) usage_and_exit(`Unknown conv: ${conv}`);
if (!registry.has(alg)) usage_and_exit(`Unknown alg: ${alg}`);
const tuner = tuner_registry.get(tunerName);
if (!tuner) usage_and_exit(`Unknown tuner: ${tunerName}`);

const holdout = normalize_holdout(holdoutArg);
const allTests = list_ptx_examples();
if (!allTests.includes(holdout)) usage_and_exit(`Holdout test not found: ${holdout}`);
const trainTests = allTests.filter(t => t !== holdout);

const ptx_vectors = load_vector_map(ptxPath);
const llvm_vectors = load_vector_map(llvmPath);
const dict = make_vector_dictionary(ptx_vectors, llvm_vectors);

const holdoutSource = readFileSync(holdout, "utf8");
const before = score_holdout(holdoutSource, conv, alg, ptx_vectors, llvm_vectors);

const dim = get_vector_dimension(ptx_vectors);
const conv_fn = conv_registry.get(conv)!;
const alg_fn = registry.get(alg)!;

for (let epoch = 0; epoch < epochs; epoch++) {
  for (const f of trainTests) {
    const source = readFileSync(f, "utf8");
    const ptx_tokens = parse_ptx_source(source, ptx_vectors);
    if (ptx_tokens.length === 0) continue;

    const context_vectors = conv_fn(ptx_tokens, ptx_vectors, dim);
    const ctx: LiftContext = {
      ptx_vectors,
      llvm_vectors,
      find_nearest_llvm: build_nearest_token_fn(llvm_vectors),
      dim,
      context_vectors,
    };
    const emitted = alg_fn(ctx, ptx_tokens);
    const expected = llvm_expectations_from_ptx(ptx_tokens).filter(t => llvm_vectors[t] !== undefined);

    const sample: TuneSample = {
      ptx_tokens,
      expected_llvm_tokens: expected,
      emitted_llvm_tokens: emitted,
      context_vectors,
    };
    tuner(dict, sample);
  }
}

const after = score_holdout(holdoutSource, conv, alg, ptx_vectors, llvm_vectors);

const outDir = join("tuning", "out");
mkdirSync(outDir, { recursive: true });
const stem = `${basename(holdout, ".ptx")}_${conv}_${alg}_${tunerName}_e${epochs}`;
const outPtx = join(outDir, `ptx_vectors_tuned_${stem}.json`);
const outLlvm = join(outDir, `llvm_vectors_tuned_${stem}.json`);
writeFileSync(outPtx, JSON.stringify(ptx_vectors, null, 2));
writeFileSync(outLlvm, JSON.stringify(llvm_vectors, null, 2));

console.log(`\ntrain files: ${trainTests.length}`);
console.log(`holdout: ${holdout}`);
console.log(`conv=${conv} alg=${alg} tuner=${tunerName} epochs=${epochs}`);
console.log(`vectors in: PTX=${ptxPath} LLVM=${llvmPath}`);
console.log(`holdout score before: ${(before.score * 100).toFixed(2)}%`);
console.log(`holdout score after:  ${(after.score * 100).toFixed(2)}%`);
console.log(`delta: ${((after.score - before.score) * 100).toFixed(2)}%`);
console.log(`emitted tokens before=${before.emitted.length} after=${after.emitted.length}`);
console.log(`wrote: ${outPtx}`);
console.log(`wrote: ${outLlvm}`);

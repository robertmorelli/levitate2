#!/usr/bin/env tsx
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

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

const ptxPath = process.env["PTX_VECTORS"] ?? "utils/ptx_vectors_openai_described.json";
const llvmPath = process.env["LLVM_VECTORS"] ?? "utils/llvm_vectors_openai_described.json";
const ptx_vectors = load_vector_map(ptxPath);
const llvm_vectors = load_vector_map(llvmPath);
const dim = get_vector_dimension(ptx_vectors);

const source = readFileSync("examples/complex_kernel.ptx", "utf8");
const tokens = parse_ptx_source(source, ptx_vectors);
const conv = conv_registry.get("ema");
const alg = registry.get("dynamic_stack_healing");
if (!conv || !alg) throw new Error("missing conv/alg");

const ctx: LiftContext = {
  ptx_vectors,
  llvm_vectors,
  find_nearest_llvm: build_nearest_token_fn(llvm_vectors),
  dim,
  context_vectors: conv(tokens, ptx_vectors, dim),
};

const emitted = alg(ctx, tokens);
const ll = tokens_to_ll(emitted);

mkdirSync("exploration/out", { recursive: true });
const out = "exploration/out/complex_kernel_lifted_ema_dynamic_stack_healing.ll";
writeFileSync(out, ll);

console.log(`emitted tokens: ${emitted.length}`);
console.log(`wrote: ${out}`);

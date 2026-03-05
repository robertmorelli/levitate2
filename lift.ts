import { load_lift_vectors } from "./utils/load_lift_vectors.js";
import { parse_ptx_source } from "./utils/parse_ptx_source.js";
import { get_vector_dimension } from "./utils/get_vector_dimension.js";
import { registry, conv_registry } from "./utils/registry.js";
import type { LiftContext } from "./utils/registry.js";

export type { LiftContext, LiftAlgorithm, ConvFn } from "./utils/registry.js";
export { register, register_conv } from "./utils/registry.js";

function make_context(tokens: string[], conv_name: string): LiftContext {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = load_lift_vectors();
  const dim = get_vector_dimension(ptx_vectors);
  const conv_fn = conv_registry.get(conv_name);
  const context_vectors = conv_fn
    ? conv_fn(tokens, ptx_vectors, dim)
    : tokens.map(t => [...(ptx_vectors[t] ?? [])]);
  return { ptx_vectors, llvm_vectors, find_nearest_llvm, dim, context_vectors };
}

/** Run every registered algorithm under a single convolution. */
export function lift_all(source: string | string[], conv = "identity"): Record<string, string[]> {
  const { ptx_vectors } = load_lift_vectors();
  const tokens = parse_ptx_source(source, ptx_vectors);
  if (tokens.length === 0) return Object.fromEntries([...registry.keys()].map(k => [k, []]));
  const ctx = make_context(tokens, conv);
  return Object.fromEntries([...registry].map(([name, alg]) => [name, alg(ctx, tokens)]));
}

/** Run every (conv × algorithm) combination. Returns [conv][alg] → tokens. */
export function lift_all_matrix(source: string | string[]): Record<string, Record<string, string[]>> {
  const { ptx_vectors } = load_lift_vectors();
  const tokens = parse_ptx_source(source, ptx_vectors);
  const matrix: Record<string, Record<string, string[]>> = {};
  for (const [conv_name, conv_fn] of conv_registry) {
    const dim = get_vector_dimension(ptx_vectors);
    const { llvm_vectors, find_nearest_llvm } = load_lift_vectors();
    const context_vectors = conv_fn(tokens, ptx_vectors, dim);
    const ctx: LiftContext = { ptx_vectors, llvm_vectors, find_nearest_llvm, dim, context_vectors };
    matrix[conv_name] = Object.fromEntries(
      [...registry].map(([alg_name, alg]) => [alg_name, tokens.length === 0 ? [] : alg(ctx, tokens)])
    );
  }
  return matrix;
}

export function lift(source: string | string[]): string[] {
  return Object.values(lift_all(source))[0] ?? [];
}

// ── register all algorithms and convolutions ──────────────────────────────────
import "./utils/convolutions.js";
import "./algorithms/global_residual.js";
import "./algorithms/per_token.js";
import "./algorithms/arithmetic.js";
import "./algorithms/arithmetic_opt.js";
import "./algorithms/momentum.js";
import "./algorithms/dominant_prefix.js";

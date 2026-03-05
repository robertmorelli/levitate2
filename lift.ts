import { load_lift_vectors } from "./utils/load_lift_vectors.js";
import { parse_ptx_source } from "./utils/parse_ptx_source.js";
import { get_vector_dimension } from "./utils/get_vector_dimension.js";
import { registry } from "./utils/registry.js";

export type { LiftContext, LiftAlgorithm } from "./utils/registry.js";
export { register } from "./utils/registry.js";

function make_context() {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = load_lift_vectors();
  return { ptx_vectors, llvm_vectors, find_nearest_llvm, dim: get_vector_dimension(ptx_vectors) };
}

export function lift_all(source: string | string[]): Record<string, string[]> {
  const ctx = make_context();
  const tokens = parse_ptx_source(source, ctx.ptx_vectors);
  return Object.fromEntries(
    [...registry].map(([name, alg]) => [name, tokens.length === 0 ? [] : alg(ctx, tokens)])
  );
}

export function lift(source: string | string[]): string[] {
  return Object.values(lift_all(source))[0] ?? [];
}

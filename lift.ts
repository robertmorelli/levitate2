import { load_lift_vectors } from "./utils/load_lift_vectors.js";
import { parse_ptx_source } from "./utils/parse_ptx_source.js";
import { get_vector_dimension } from "./utils/get_vector_dimension.js";
import { sum_token_vectors } from "./utils/sum_token_vectors.js";
import { subtract_vectors } from "./utils/subtract_vectors.js";
import { vector_norm } from "./utils/vector_norm.js";

export function lift(source: string | string[], threshold = 0.1): string[] {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = load_lift_vectors();

  const source_tokens = parse_ptx_source(source, ptx_vectors);
  if (source_tokens.length === 0) return [];

  const dim = get_vector_dimension(ptx_vectors);
  let residual = sum_token_vectors(source_tokens, ptx_vectors, dim);
  const source_stack = [...source_tokens];
  const lift_tokens: string[] = [];

  while (source_stack.length > 0) {
    source_stack.pop();
    const best_token = find_nearest_llvm(residual);
    if (!best_token) break;
    lift_tokens.push(best_token);
    residual = subtract_vectors(residual, llvm_vectors[best_token] ?? []);
    if (vector_norm(residual) < threshold) break;
  }

  return lift_tokens;
}

/**
 * Baseline: sum all source token vectors into one residual, then greedily
 * peel off LLVM tokens until the residual is small or tokens are exhausted.
 */
import { register } from "../utils/registry.js";
import { sum_token_vectors } from "../utils/sum_token_vectors.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

register("global_residual", (ctx, tokens) => {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm, dim } = ctx;
  let residual = sum_token_vectors(tokens, ptx_vectors, dim);
  const out: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(residual) < 0.1) break;
    const u = find_nearest_llvm(residual);
    if (!u) break;
    out.push(u);
    residual = subtract_vectors(residual, llvm_vectors[u] ?? []);
  }

  return out;
});

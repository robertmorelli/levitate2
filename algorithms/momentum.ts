/**
 * Momentum pursuit: global residual like the baseline, but each query is
 * biased by an exponential moving average of recently subtracted LLVM vectors.
 * The momentum term pushes the search to keep "going the same direction",
 * which breaks out of the local optima the baseline gets stuck in (where the
 * same token keeps winning when the residual points at it indefinitely).
 */
import { register } from "../utils/registry.js";
import { sum_token_vectors } from "../utils/sum_token_vectors.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const ALPHA = 0.4;   // momentum decay (higher = more inertia)
const THRESHOLD = 0.1;

register("momentum", (ctx, tokens) => {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm, dim } = ctx;
  let residual = sum_token_vectors(tokens, ptx_vectors, dim);
  let momentum = new Array<number>(dim).fill(0);
  const out: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(residual) < THRESHOLD) break;

    // Bias the query: lean toward where we've been going
    const biased = residual.map((x, j) => x + ALPHA * (momentum[j] ?? 0));
    const u = find_nearest_llvm(biased);
    if (!u) break;

    out.push(u);
    const uv = llvm_vectors[u] ?? [];

    // Update momentum: EMA of subtracted directions
    momentum = momentum.map((m, j) => ALPHA * m + (1 - ALPHA) * (uv[j] ?? 0));
    residual = subtract_vectors(residual, uv);
  }

  return out;
});

/**
 * amplitude_sort: processes positions in signal-amplitude order.
 *
 * The norm of context_vectors[i] is a proxy for "how much information
 * this position carries." High-amplitude positions have a strong, well-
 * defined context signal; low-amplitude positions are in the noise.
 *
 * Strategy:
 *   1. Sort positions by ||context[i]|| descending.
 *   2. Process high-amplitude positions first — they get up to MAX_HIGH
 *      LLVM tokens each and drive a global residual.
 *   3. Low-amplitude positions (below THRESHOLD fraction of max) get at
 *      most 1 token from whatever residual remains.
 *   4. Outputs are re-sorted back to original position order.
 *
 * This is analogous to treating the activation envelope as an importance
 * mask: don't waste residual budget on flat parts of the signal.
 */

import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const NORM_THRESHOLD = 0.3;  // positions below this fraction of max amplitude are "low"
const MAX_HIGH = 3;
const MAX_LOW  = 1;
const STOP     = 0.05;

register("amplitude_sort", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, dim, context_vectors } = ctx;

  // compute norms and find the max
  const norms = context_vectors.map(v => vector_norm(v));
  const max_norm = Math.max(...norms, 1e-9);

  // sort positions by norm descending
  const order = tokens.map((_, i) => i).sort((a, b) => (norms[b] ?? 0) - (norms[a] ?? 0));

  // maintain a global residual in context space
  let residual = new Array<number>(dim).fill(0);
  for (const v of context_vectors)
    for (let k = 0; k < dim; k++) residual[k] = (residual[k] ?? 0) + (v[k] ?? 0);

  const per_position: Record<number, string[]> = {};

  for (const i of order) {
    const amplitude_fraction = (norms[i] ?? 0) / max_norm;
    const budget = amplitude_fraction >= NORM_THRESHOLD ? MAX_HIGH : MAX_LOW;

    if (vector_norm(residual) < STOP) break;

    // bias query toward this position's context
    const ctx_v = context_vectors[i] ?? [];
    const query = residual.map((x, k) => x + (ctx_v[k] ?? 0));
    let r = query;
    const out: string[] = [];

    for (let j = 0; j < budget; j++) {
      if (vector_norm(r) < STOP) break;
      const u = find_nearest_llvm(r);
      if (!u) break;
      out.push(u);
      const uv = llvm_vectors[u] ?? [];
      r = subtract_vectors(r, uv);
      residual = subtract_vectors(residual, uv);
    }

    per_position[i] = out;
  }

  // reconstruct in original token order
  return tokens.flatMap((_, i) => per_position[i] ?? []);
});

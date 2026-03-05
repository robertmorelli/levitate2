import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const ALPHA = 0.4;
const THRESHOLD = 0.1;

register("momentum", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, dim, context_vectors } = ctx;

  const residual = new Array<number>(dim).fill(0);
  for (const v of context_vectors)
    for (let k = 0; k < dim; k++) residual[k] = (residual[k] ?? 0) + (v[k] ?? 0);

  let r = residual;
  let momentum = new Array<number>(dim).fill(0);
  const out: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(r) < THRESHOLD) break;
    const biased = r.map((x, k) => x + ALPHA * (momentum[k] ?? 0));
    const u = find_nearest_llvm(biased);
    if (!u) break;
    out.push(u);
    const uv = llvm_vectors[u] ?? [];
    momentum = momentum.map((m, k) => ALPHA * m + (1 - ALPHA) * (uv[k] ?? 0));
    r = subtract_vectors(r, uv);
  }
  return out;
});

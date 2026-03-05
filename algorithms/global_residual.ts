import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

register("global_residual", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, dim, context_vectors } = ctx;

  // Sum context vectors (conv-aware) rather than raw ptx_vectors.
  const residual = new Array<number>(dim).fill(0);
  for (const v of context_vectors)
    for (let k = 0; k < dim; k++) residual[k] = (residual[k] ?? 0) + (v[k] ?? 0);

  const out: string[] = [];
  let r = residual;
  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(r) < 0.1) break;
    const u = find_nearest_llvm(r);
    if (!u) break;
    out.push(u);
    r = subtract_vectors(r, llvm_vectors[u] ?? []);
  }
  return out;
});

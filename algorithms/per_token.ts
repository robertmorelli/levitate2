import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const THRESHOLD = 0.1;
const MAX_PER_TOKEN = 3;

register("per_token", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, context_vectors } = ctx;
  const out: string[] = [];

  tokens.forEach((_, i) => {
    let r = [...(context_vectors[i] ?? [])];
    for (let j = 0; j < MAX_PER_TOKEN; j++) {
      if (vector_norm(r) < THRESHOLD) break;
      const u = find_nearest_llvm(r);
      if (!u) break;
      out.push(u);
      r = subtract_vectors(r, llvm_vectors[u] ?? []);
    }
  });

  return out;
});

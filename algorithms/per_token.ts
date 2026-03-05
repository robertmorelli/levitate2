/**
 * Per-token residual pursuit: process each source token independently.
 * For each PTX token, find the LLVM token(s) that best explain its vector
 * via greedy residual subtraction. Preserves source token ordering.
 */
import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const THRESHOLD = 0.1;
const MAX_PER_TOKEN = 3;

register("per_token", (ctx, tokens) => {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = ctx;
  const out: string[] = [];

  for (const s of tokens) {
    let r = [...(ptx_vectors[s] ?? [])];

    for (let i = 0; i < MAX_PER_TOKEN; i++) {
      if (vector_norm(r) < THRESHOLD) break;
      const u = find_nearest_llvm(r);
      if (!u) break;
      out.push(u);
      r = subtract_vectors(r, llvm_vectors[u] ?? []);
    }
  }

  return out;
});

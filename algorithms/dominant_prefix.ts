import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const DECAY = 0.5;
const THRESHOLD = 0.05;

register("dominant_prefix", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, dim, context_vectors } = ctx;

  // Geometrically-weighted sum of context vectors: position 0 dominates.
  const encoding = new Array<number>(dim).fill(0);
  for (let i = 0; i < tokens.length; i++) {
    const w = Math.pow(DECAY, i);
    const v = context_vectors[i] ?? [];
    for (let k = 0; k < dim; k++) encoding[k] = (encoding[k] ?? 0) + w * (v[k] ?? 0);
  }

  let r = [...encoding];
  const out: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(r) < THRESHOLD) break;
    const u = find_nearest_llvm(r);
    if (!u) break;
    out.push(u);
    r = subtract_vectors(r, llvm_vectors[u] ?? []);
    // Arithmetic rescale: zoom into the next dominant position
    r = r.map(x => x / DECAY);
  }
  return out;
});

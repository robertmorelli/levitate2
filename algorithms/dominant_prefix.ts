/**
 * Dominant-prefix encoding: encode PTX tokens as a geometrically-weighted sum
 * so that the first token dominates the vector. Token at index i gets weight
 * r^i where r < 1, making position 0 contribute the most and each subsequent
 * token contribute exponentially less (like a polynomial with the first
 * coefficient being largest).
 *
 * Then greedily peel LLVM tokens from this weighted sum — the first LLVM
 * token decoded should correspond to the first (dominant) PTX token.
 *
 * Equivalent to treating the PTX sequence as a base-r number in vector space,
 * then doing arithmetic decoding from the most-significant "digit" down.
 */
import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const DECAY = 0.5;      // r: weight of token[i] = DECAY^i, so token[0] = 1.0
const THRESHOLD = 0.05;

register("dominant_prefix", (ctx, tokens) => {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = ctx;
  const out: string[] = [];

  // Build geometrically-weighted encoding: token[0] * 1.0 + token[1] * 0.5 + ...
  const first = ptx_vectors[tokens[0] ?? ""] ?? [];
  const dim = first.length;
  let encoding = new Array<number>(dim).fill(0);

  for (let i = 0; i < tokens.length; i++) {
    const w = Math.pow(DECAY, i);
    const v = ptx_vectors[tokens[i] ?? ""] ?? [];
    for (let j = 0; j < dim; j++) encoding[j] = (encoding[j] ?? 0) + w * (v[j] ?? 0);
  }

  // Decode: greedily peel LLVM tokens from the weighted sum.
  // Each pop should pull out the most-dominant remaining token first.
  let residual = [...encoding];
  for (let i = 0; i < tokens.length; i++) {
    if (vector_norm(residual) < THRESHOLD) break;
    const u = find_nearest_llvm(residual);
    if (!u) break;
    out.push(u);

    // Scale-subtract: the next token in the PTX sequence was weighted by DECAY,
    // so after pulling out the dominant token, scale the residual up by 1/DECAY
    // to "zoom in" to the next most-dominant position (arithmetic rescale).
    const uv = llvm_vectors[u] ?? [];
    residual = subtract_vectors(residual, uv);
    residual = residual.map(x => x / DECAY);
  }

  return out;
});

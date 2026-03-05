/**
 * delta_decode: uses the derivative of the context signal as query.
 *
 * context_vectors[i] encodes a token's neighborhood. The *difference*
 * between consecutive context vectors — the signal derivative — captures
 * what this token contributes to program state beyond what came before.
 * That delta is a better query than the raw context when the convolution
 * has smoothed out individual token identity (e.g. gaussian, ema).
 *
 * delta[0] = context[0]  (no previous, use raw)
 * delta[i] = context[i] - context[i-1]
 *
 * Each delta drives a residual pursuit for up to MAX_PER_TOKEN LLVM tokens.
 */

import { register } from "../utils/registry.js";
import { subtract_vectors } from "../utils/subtract_vectors.js";
import { vector_norm } from "../utils/vector_norm.js";

const THRESHOLD = 0.05;
const MAX_PER_TOKEN = 3;

register("delta_decode", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, context_vectors } = ctx;
  const out: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const cur  = context_vectors[i] ?? [];
    const prev = context_vectors[i - 1] ?? new Array<number>(cur.length).fill(0);

    // derivative of the activation signal at position i
    const delta = cur.map((x, k) => x - (prev[k] ?? 0));

    let mag = vector_norm(delta);
    if (mag < THRESHOLD) continue;

    let r = delta.map(x => x / mag);  // unit direction of the change

    for (let j = 0; j < MAX_PER_TOKEN; j++) {
      if (mag < THRESHOLD) break;
      const u = find_nearest_llvm(r);
      if (!u) break;
      const uv = llvm_vectors[u] ?? [];
      const uv_norm = vector_norm(uv);
      if (uv_norm === 0) break;
      const uv_unit = uv.map(x => x / uv_norm);

      const alignment = r.reduce((s, x, k) => s + x * (uv_unit[k] ?? 0), 0);
      mag *= Math.max(0, 1 - alignment);

      r = subtract_vectors(r, uv_unit.map(x => x * alignment));
      const rn = vector_norm(r);
      out.push(u);
      if (rn < 1e-6) break;
      r = r.map(x => x / rn);
    }
  }

  return out;
});

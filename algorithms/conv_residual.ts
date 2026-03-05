/**
 * conv_residual: inverse filtering in convolved space.
 *
 * The mismatch in current algorithms: PTX context_vectors are in
 * "convolved embedding space" but LLVM tokens are searched in raw
 * embedding space. When you subtract an LLVM token vector from the
 * residual, you're mixing spaces.
 *
 * This algorithm simulates the convolution of each selected LLVM token
 * across the target position window and subtracts that from the
 * context-space residual. It's a greedy inverse of the forward
 * convolution: find LLVM tokens whose simulated convolution output
 * best reconstructs the PTX context signal.
 *
 * Convolution kernel used: symmetric Gaussian, σ=1.5, window ±2.
 * (Mirrors the "gaussian" PTX convolution so the spaces align.)
 *
 * Per position i, the LLVM token u contributes:
 *   residual[j] -= gaussian_weight(i, j) * llvm_vectors[u]
 * for j in [i-2, i+2].
 *
 * This means picking u at position i partially reduces the residual
 * at neighboring positions too — just like the forward convolution did.
 */

import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

const SIGMA   = 1.5;
const WINDOW  = 2;
const STOP    = 0.05;
const MAX_PER = 2;

function gauss_w(d: number): number {
  return Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
}

register("conv_residual", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, dim, context_vectors } = ctx;
  const n = tokens.length;

  // residual is a per-position signal in convolved space
  const R: number[][] = context_vectors.map(v => [...v]);

  const out: string[] = [];

  for (let i = 0; i < n; i++) {
    const r_i = R[i] ?? [];
    if (vector_norm(r_i) < STOP) continue;

    for (let j = 0; j < MAX_PER; j++) {
      const cur = R[i] ?? [];
      if (vector_norm(cur) < STOP) break;

      const u = find_nearest_llvm(cur);
      if (!u) break;
      out.push(u);

      const uv = llvm_vectors[u] ?? [];

      // subtract the convolution contribution of u at position i
      // from all positions in its window
      let total_w = 0;
      for (let di = -WINDOW; di <= WINDOW; di++) total_w += gauss_w(di);

      for (let di = -WINDOW; di <= WINDOW; di++) {
        const pos = i + di;
        if (pos < 0 || pos >= n) continue;
        const w = gauss_w(di) / total_w;
        const r_pos = R[pos]!;
        for (let k = 0; k < dim; k++) {
          r_pos[k] = (r_pos[k] ?? 0) - w * (uv[k] ?? 0);
        }
      }
    }
  }

  return out;
});

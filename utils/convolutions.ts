/**
 * Convolution techniques for PTX token sequences.
 *
 * Each ConvFn maps a token sequence + their raw embeddings → one context
 * vector per position. Algorithms use these context vectors instead of raw
 * per-token lookups, so each vector encodes neighborhood information.
 */
import { register_conv } from "./registry.js";

// ── 0. shared guard ───────────────────────────────────────────────────────────
function require_vec(ptx_vectors: Record<string, number[]>, token: string): number[] {
  const v = ptx_vectors[token];
  if (!v) throw new Error(`Token not in vocab: '${token}' — run npm run refresh`);
  return v;
}

// ── 1. identity ───────────────────────────────────────────────────────────────
// No convolution — raw token vector. Baseline for comparison.
register_conv("identity", (tokens, ptx_vectors) =>
  tokens.map(t => [...require_vec(ptx_vectors, t)])
);

// ── 2. gaussian ───────────────────────────────────────────────────────────────
// Weighted average of a ±2 window with Gaussian decay (σ=1.5).
// Smooths over local context symmetrically.
register_conv("gaussian", (tokens, ptx_vectors, dim) => {
  const sigma = 1.5;
  return tokens.map((_, i) => {
    const out = new Array<number>(dim).fill(0);
    let total_w = 0;
    for (let j = Math.max(0, i - 2); j <= Math.min(tokens.length - 1, i + 2); j++) {
      const d = i - j;
      const w = Math.exp(-(d * d) / (2 * sigma * sigma));
      const v = require_vec(ptx_vectors, tokens[j] ?? "");
      for (let k = 0; k < dim; k++) out[k] = (out[k] ?? 0) + w * (v[k] ?? 0);
      total_w += w;
    }
    return total_w > 0 ? out.map(x => x / total_w) : out;
  });
});

// ── 3. causal ─────────────────────────────────────────────────────────────────
// Exponential decay looking left only (past tokens weighted more than future).
// context[i] = v[i]*1 + v[i-1]*0.5 + v[i-2]*0.25 + ...
// Makes each token encode "what has happened so far" — directional signal.
register_conv("causal", (tokens, ptx_vectors, dim) => {
  const decay = 0.5;
  return tokens.map((_, i) => {
    const out = new Array<number>(dim).fill(0);
    let w = 1.0, total_w = 0;
    for (let j = i; j >= Math.max(0, i - 4); j--) {
      const v = require_vec(ptx_vectors, tokens[j] ?? "");
      for (let k = 0; k < dim; k++) out[k] = (out[k] ?? 0) + w * (v[k] ?? 0);
      total_w += w;
      w *= decay;
    }
    return total_w > 0 ? out.map(x => x / total_w) : out;
  });
});

// ── 4. uniform ────────────────────────────────────────────────────────────────
// Simple unweighted average over a ±1 window (3 tokens).
// Cheapest context; treats all neighbors equally.
register_conv("uniform", (tokens, ptx_vectors, dim) =>
  tokens.map((_, i) => {
    const out = new Array<number>(dim).fill(0);
    let count = 0;
    for (let j = Math.max(0, i - 1); j <= Math.min(tokens.length - 1, i + 1); j++) {
      const v = require_vec(ptx_vectors, tokens[j] ?? "");
      for (let k = 0; k < dim; k++) out[k] = (out[k] ?? 0) + (v[k] ?? 0);
      count++;
    }
    return count > 0 ? out.map(x => x / count) : out;
  })
);

// ── 5. differential ───────────────────────────────────────────────────────────
// v[i] minus mean of neighbors — an edge/contrast detector.
// Highlights tokens that differ from their context; suppresses runs of the
// same operation. Like a 1D Laplacian / high-pass filter.
register_conv("differential", (tokens, ptx_vectors, dim) =>
  tokens.map((t, i) => {
    const self = require_vec(ptx_vectors, t);
    const neighbors: number[][] = [];
    if (i > 0)                    neighbors.push(require_vec(ptx_vectors, tokens[i - 1] ?? ""));
    if (i < tokens.length - 1)   neighbors.push(require_vec(ptx_vectors, tokens[i + 1] ?? ""));
    if (neighbors.length === 0)   return [...self];
    const mean = new Array<number>(dim).fill(0);
    for (const v of neighbors)
      for (let k = 0; k < dim; k++) mean[k] = (mean[k] ?? 0) + (v[k] ?? 0) / neighbors.length;
    return self.map((x, k) => x - (mean[k] ?? 0));
  })
);

// ── 6. ema ────────────────────────────────────────────────────────────────────
// Exponential moving average running left-to-right (α=0.35).
// context[i] = α*context[i-1] + (1-α)*v[i]
// Behaves like a recurrent state: each position encodes accumulated history
// with recent tokens weighted more. Good signal for sequential patterns.
register_conv("ema", (tokens, ptx_vectors, dim) => {
  const alpha = 0.35;
  const result: number[][] = [];
  let state = new Array<number>(dim).fill(0);
  for (const t of tokens) {
    const v = require_vec(ptx_vectors, t);
    state = state.map((s, k) => alpha * s + (1 - alpha) * (v[k] ?? 0));
    result.push([...state]);
  }
  return result;
});

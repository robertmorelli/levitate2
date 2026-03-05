export function sum_token_vectors(tokens: string[], vectors: Record<string, number[]>, dim: number): number[] {
  const out = Array.from({ length: dim }, () => 0);
  for (const token of tokens) {
    const v = vectors[token];
    if (!v) continue;
    for (let i = 0; i < dim; i += 1) out[i] = (out[i] ?? 0) + (v[i] ?? 0);
  }
  return out;
}

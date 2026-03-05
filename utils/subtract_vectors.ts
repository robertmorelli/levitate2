export function subtract_vectors(a: number[], b: number[]): number[] {
  return a.map((x, i) => x - (b[i] ?? 0));
}

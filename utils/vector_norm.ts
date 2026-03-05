export function vector_norm(a: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += (a[i] ?? 0) * (a[i] ?? 0);
  return Math.sqrt(s);
}

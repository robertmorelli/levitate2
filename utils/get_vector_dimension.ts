export function get_vector_dimension(vectors: Record<string, number[]>): number {
  const first = Object.values(vectors)[0];
  if (!first) throw new Error("vector map is empty");
  return first.length;
}

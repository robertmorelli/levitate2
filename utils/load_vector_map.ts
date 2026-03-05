import { readFileSync } from "node:fs";

export function load_vector_map(path: string): Record<string, number[]> {
  const raw = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  const out: Record<string, number[]> = {};

  for (const [token, value] of Object.entries(raw)) {
    if (!Array.isArray(value) || value.some((x) => typeof x !== "number")) {
      throw new Error(`Invalid vector for token '${token}' in ${path}`);
    }
    out[token] = value;
  }

  return out;
}

import { line_to_ptx_tokens } from "./line_to_ptx_tokens.js";

export function parse_ptx_source(source: string | string[], ptx_vectors: Record<string, number[]>): string[] {
  const text = Array.isArray(source) ? source.join("\n") : String(source || "");

  return text
    .split(/\r?\n/)
    .flatMap((line) => line_to_ptx_tokens(line))
    .filter((token) => token in ptx_vectors);
}

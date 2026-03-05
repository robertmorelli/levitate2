import { line_to_ptx_tokens } from "./line_to_ptx_tokens.js";
import { normalize_ptx_token } from "./normalize_ptx_token.js";

export function parse_ptx_source(source: string | string[], ptx_vectors: Record<string, number[]>): string[] {
  const text = Array.isArray(source) ? source.join("\n") : String(source || "");
  const vocab = Object.keys(ptx_vectors);

  return text
    .split(/\r?\n/)
    .flatMap((line) => line_to_ptx_tokens(line))
    .map((token) => normalize_ptx_token(token, vocab))
    .filter((token): token is string => token !== null);
}

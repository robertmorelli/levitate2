import { line_to_ptx_tokens } from "./line_to_ptx_tokens.js";
import { normalize_ptx_token } from "./normalize_ptx_token.js";

export function parse_ptx_source(source: string | string[], ptx_vectors: Record<string, number[]>): string[] {
  const text = Array.isArray(source) ? source.join("\n") : String(source || "");
  const vocab = Object.keys(ptx_vectors);

  return text
    .split(/\r?\n/)
    .flatMap((line) => {
      const tokens = line_to_ptx_tokens(line);
      if (tokens.length === 0) return [];
      // First token is the opcode — normalize to vocab. Remaining tokens are
      // structural operand-type markers (op_f, op_r, …) and pass through as-is.
      const [opcode, ...operands] = tokens;
      const normalized = normalize_ptx_token(opcode!, vocab);
      if (normalized === null) return [];
      return [normalized, ...operands];
    });
}

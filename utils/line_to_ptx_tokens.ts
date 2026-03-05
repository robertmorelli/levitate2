import { is_ptx_token, ptx_token_keys } from "./ptx_token.js";
import type { PtxToken } from "./ptx_token.js";

/** Convert one PTX line to zero or more canonical PTX tokens. */
export function line_to_ptx_tokens(line: string): PtxToken[] {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith(".") || trimmed === "{" || trimmed === "}") {
    return [];
  }

  const noComment = (trimmed.split("//", 1)[0] ?? "").trim();
  if (!noComment || noComment.endsWith(":")) return [];

  const m = noComment.match(/^([a-z][a-z0-9_.]*)\b/i);
  const op = m?.[1]?.toLowerCase();
  if (!op) return [];

  if (is_ptx_token(op) && ptx_token_keys.has(op)) return [op as PtxToken];

  return [];
}

export default line_to_ptx_tokens;

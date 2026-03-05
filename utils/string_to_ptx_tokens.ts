import line_to_ptx_tokens from "./line_to_ptx_tokens.js";
import type { PtxToken } from "./ptx_token.js";

/** Convert PTX file content into canonical PTX token sequence. */
export function string_to_ptx_tokens(sourceText: string): PtxToken[] {
  const out: PtxToken[] = [];
  for (const line of sourceText.split(/\r?\n/)) {
    out.push(...line_to_ptx_tokens(line));
  }
  return out;
}

export default string_to_ptx_tokens;

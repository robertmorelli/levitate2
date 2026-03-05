import type { PtxToken } from "./ptx_token.js";
import { load_ptx_token_dict } from "./ptx_token.js";

/** Embed one canonical PTX token using its dictionary description. */
export async function embed_ptx_token(token: PtxToken): Promise<number[]> {
  const dict = load_ptx_token_dict();
  const entry = dict[token];
  if (!entry || !Array.isArray(entry.vector) || entry.vector.length === 0) {
    throw new Error(`Missing PTX vector for token: ${token}`);
  }
  return entry.vector;
}

export default embed_ptx_token;

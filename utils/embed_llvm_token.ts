import type { LlvmToken } from "./llvm_token.js";
import { load_llvm_token_dict } from "./llvm_token.js";

/** Embed one canonical LLVM token using its dictionary description. */
export async function embed_llvm_token(token: LlvmToken): Promise<number[]> {
  const dict = load_llvm_token_dict();
  const entry = dict[token];
  if (!entry || !Array.isArray(entry.vector) || entry.vector.length === 0) {
    throw new Error(`Missing LLVM vector for token: ${token}`);
  }
  return entry.vector;
}

export default embed_llvm_token;

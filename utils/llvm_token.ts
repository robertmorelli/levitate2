import { readFileSync } from "node:fs";

export type LlvmToken = string;
export interface LlvmTokenEntry {
  name: string;
  vector: number[];
}
export type LlvmTokenDict = Record<LlvmToken, LlvmTokenEntry>;

export const llvm_token_dict: LlvmTokenDict =
  (JSON.parse(readFileSync("llvm_tokens.json", "utf8")) as LlvmTokenDict) ?? {};

export const llvm_token_keys = new Set(Object.keys(llvm_token_dict));

export function is_llvm_token(value: string): value is LlvmToken {
  return llvm_token_keys.has(value);
}

export function load_llvm_token_dict(): LlvmTokenDict {
  return llvm_token_dict;
}

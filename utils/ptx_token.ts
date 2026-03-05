import { readFileSync } from "node:fs";

export type PtxToken = string;
export interface PtxTokenEntry {
  name: string;
  vector: number[];
}
export type PtxTokenDict = Record<PtxToken, PtxTokenEntry>;

export const ptx_token_dict: PtxTokenDict =
  (JSON.parse(readFileSync("ptx_tokens.json", "utf8")) as PtxTokenDict) ?? {};

export const ptx_token_keys = new Set(Object.keys(ptx_token_dict));

export function is_ptx_token(value: string): value is PtxToken {
  return ptx_token_keys.has(value);
}

export function load_ptx_token_dict(): PtxTokenDict {
  return ptx_token_dict;
}

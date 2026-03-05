import { load_vector_map } from "./load_vector_map.js";
import { build_nearest_token_fn, type NearestTokenFn } from "./find_nearest_token.js";

export interface LiftVectors {
  ptx_vectors: Record<string, number[]>;
  llvm_vectors: Record<string, number[]>;
  find_nearest_llvm: NearestTokenFn;
}

export function load_lift_vectors(): LiftVectors {
  const ptx_path  = process.env["PTX_VECTORS"]  ?? "utils/ptx_vectors_gemini_described.json";
  const llvm_path = process.env["LLVM_VECTORS"] ?? "utils/llvm_vectors_gemini_described.json";
  const ptx_vectors  = load_vector_map(ptx_path);
  const llvm_vectors = load_vector_map(llvm_path);
  const find_nearest_llvm = build_nearest_token_fn(llvm_vectors);
  return { ptx_vectors, llvm_vectors, find_nearest_llvm };
}

import type { NearestTokenFn } from "./find_nearest_token.js";

export interface LiftContext {
  ptx_vectors: Record<string, number[]>;
  llvm_vectors: Record<string, number[]>;
  find_nearest_llvm: NearestTokenFn;
  dim: number;
}

export type LiftAlgorithm = (ctx: LiftContext, tokens: string[]) => string[];

export const registry = new Map<string, LiftAlgorithm>();

export function register(name: string, alg: LiftAlgorithm): void {
  registry.set(name, alg);
}

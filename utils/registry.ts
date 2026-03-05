import type { NearestTokenFn } from "./find_nearest_token.js";

export interface LiftContext {
  ptx_vectors: Record<string, number[]>;
  llvm_vectors: Record<string, number[]>;
  find_nearest_llvm: NearestTokenFn;
  dim: number;
  /** One context vector per source token, produced by the active convolution. */
  context_vectors: number[][];
}

export type LiftAlgorithm = (ctx: LiftContext, tokens: string[]) => string[];
export type ConvFn = (tokens: string[], ptx_vectors: Record<string, number[]>, dim: number) => number[][];

export const registry     = new Map<string, LiftAlgorithm>();
export const conv_registry = new Map<string, ConvFn>();

export function register(name: string, alg: LiftAlgorithm): void {
  registry.set(name, alg);
}

export function register_conv(name: string, fn: ConvFn): void {
  conv_registry.set(name, fn);
}

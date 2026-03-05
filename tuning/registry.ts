import { tune_arithmetic_omp, tune_dynamic_stack } from "./arithmetic_tuning.js";
import { tune_dynamic_stack_v2 } from "./arithmetic_dynamic_stack_healing_v2.js";

export interface VectorDictionary {
  getVector(tokenId: string): number[];
  setVector(tokenId: string, vector: number[]): void;
  findNearest(query: number[]): string;
}

export interface TuneSample {
  ptx_tokens: string[];
  expected_llvm_tokens: string[];
  emitted_llvm_tokens: string[];
  context_vectors: number[][];
}

export type TunerFn = (dict: VectorDictionary, sample: TuneSample) => void;

export const tuner_registry = new Map<string, TunerFn>();

tuner_registry.set("arithmetic_omp", (dict, sample) => {
  if (sample.context_vectors.length === 0 || sample.expected_llvm_tokens.length === 0) return;
  tune_arithmetic_omp(dict, sample.context_vectors, sample.expected_llvm_tokens, sample.emitted_llvm_tokens);
});

tuner_registry.set("dynamic_stack", (dict, sample) => {
  if (sample.ptx_tokens.length === 0 || sample.expected_llvm_tokens.length === 0) return;
  tune_dynamic_stack(dict, sample.ptx_tokens, sample.expected_llvm_tokens, sample.emitted_llvm_tokens);
});

tuner_registry.set("dynamic_stack_v2", (dict, sample) => {
  if (sample.ptx_tokens.length === 0 || sample.expected_llvm_tokens.length === 0) return;
  tune_dynamic_stack_v2(dict, sample.ptx_tokens, sample.expected_llvm_tokens, sample.emitted_llvm_tokens);
});

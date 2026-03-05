import { vector_norm } from "../utils/vector_norm.js";

// ============================================================================
// VECTOR MATH PRIMITIVES
// We are operating in a continuous, high-dimensional Euclidean space. 
// All distance and similarity metrics rely on these geometric primitives.
// ============================================================================
const V = {
  // Normalization strips the 'magnitude' (how much meaning is left) 
  // from the 'direction' (what the actual meaning is), returning a unit vector.
  normalize: (v: number[]) => {
    const mag = vector_norm(v);
    return mag === 0 ? new Array(v.length).fill(0) : v.map(x => x / mag);
  },
  // Since we only compare unit vectors, the Dot Product perfectly equals 
  // Cosine Similarity. 1.0 = identical direction, 0.0 = completely orthogonal.
  dot: (a: number[], b: number[]) => a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0),
  add: (a: number[], b: number[]) => a.map((val, i) => val + (b[i] ?? 0)),
  sub: (a: number[], b: number[]) => a.map((val, i) => val - (b[i] ?? 0)),
  scale: (v: number[], s: number) => v.map(val => val * s),
};

export interface VectorDictionary {
  getVector(tokenId: string): number[];
  setVector(tokenId: string, vector: number[]): void;
  findNearest(query: number[]): string;
}

export function tune_dynamic_stack_v2(
  dict: VectorDictionary,
  ptx_block_tokens: string[],    
  expected_llvm_block: string[], 
  emitted_llvm_block: string[], // NEW: We need to see what it hallucinated
  LEARNING_RATE = 0.05,
  DECAY_CONSTANT = 0.5,
  HEAL_THRESHOLD = 0.95
) {
  const dim = dict.getVector(ptx_block_tokens[0]).length;

  // 1. Build Target Stack (PTX)
  let target_stack = new Array(dim).fill(0);
  ptx_block_tokens.forEach((ptx_tok, k) => {
    const v_unit = V.normalize(dict.getVector(ptx_tok));
    target_stack = V.add(target_stack, V.scale(v_unit, Math.pow(DECAY_CONSTANT, k)));
  });

  // 2. Build Expected Stack (LLVM Golden)
  let expected_stack = new Array(dim).fill(0);
  expected_llvm_block.forEach((llvm_tok, j) => {
    const u_unit = V.normalize(dict.getVector(llvm_tok));
    expected_stack = V.add(expected_stack, V.scale(u_unit, Math.pow(DECAY_CONSTANT, j)));
  });

  let emitted_stack = new Array(dim).fill(0);
  emitted_llvm_block.forEach((llvm_tok, j) => {
    const u_unit = V.normalize(dict.getVector(llvm_tok));
    emitted_stack = V.add(emitted_stack, V.scale(u_unit, Math.pow(DECAY_CONSTANT, j)));
  });

  const target_unit = V.normalize(target_stack);
  const expected_unit = V.normalize(expected_stack);
  const emitted_unit = V.normalize(emitted_stack);
  const alignment = V.dot(expected_unit, emitted_unit);

  // --- THE NEW GUARDRAIL TUNING: Punish Over-Emission ---
  // If the lifter hallucinated excess tokens, we push those specific tokens 
  // away from the PTX target geometry.
  emitted_llvm_block.forEach((emitted_tok) => {
    if (!expected_llvm_block.includes(emitted_tok)) {
       let hallucinated_vec = dict.getVector(emitted_tok);
       // Repel the frequent/safe token away from this specific PTX context
       hallucinated_vec = V.sub(hallucinated_vec, V.scale(target_unit, LEARNING_RATE));
       dict.setVector(emitted_tok, V.normalize(hallucinated_vec));
    }
  });

  // --- STANDARD SEQUENCE HEALING ---
  if (alignment < HEAL_THRESHOLD) {
    const error_magnitude = HEAL_THRESHOLD - alignment;
    const dynamic_lr = LEARNING_RATE * error_magnitude;

    ptx_block_tokens.forEach((ptx_tok, k) => {
      let v = dict.getVector(ptx_tok);
      v = V.add(v, V.scale(expected_unit, dynamic_lr * Math.pow(DECAY_CONSTANT, k)));
      dict.setVector(ptx_tok, V.normalize(v));
    });

    expected_llvm_block.forEach((llvm_tok, j) => {
      let u = dict.getVector(llvm_tok);
      u = V.add(u, V.scale(target_unit, dynamic_lr * Math.pow(DECAY_CONSTANT, j)));
      dict.setVector(llvm_tok, V.normalize(u));
    });
  }
}

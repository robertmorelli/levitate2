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

// ============================================================================
// 1. OMP TUNER (Orthogonal Matching Pursuit with Triplet Loss)
// 
// This tunes the flat residual-chasing algorithm. It uses a Contrastive 
// Triplet Loss approach paired with "Teacher Forcing" to prevent cascading 
// errors from ruining a multi-token sequence training step.
// ============================================================================
export function tune_arithmetic_omp(
  dict: VectorDictionary,
  ptx_context_vectors: number[][],
  expected_llvm_tokens: string[],
  LEARNING_RATE = 0.05,
  MARGIN = 0.1,         // Enforced geometric distance between right and wrong choices
  THRESHOLD = 0.1
) {
  let expected_idx = 0;

  ptx_context_vectors.forEach((raw_vec) => {
    let mag = vector_norm(raw_vec);
    if (mag === 0) return;

    // The Anchor: The pure semantic direction we are currently trying to satisfy
    let r = raw_vec.map(x => x / mag); 

    for (let j = 0; j < 3; j++) {
      if (mag < THRESHOLD || expected_idx >= expected_llvm_tokens.length) break;

      const chosen_u = dict.findNearest(r);                // What the algorithm guessed (The Negative)
      const target_u = expected_llvm_tokens[expected_idx]; // What it SHOULD have guessed (The Positive)

      let target_vec = dict.getVector(target_u);
      let chosen_vec = dict.getVector(chosen_u);
      
      const target_unit = V.normalize(target_vec);
      const chosen_unit = V.normalize(chosen_vec);

      // Evaluate how well the geometries aligned with the residual anchor
      const sim_target = V.dot(r, target_unit);
      const sim_chosen = V.dot(r, chosen_unit);

      // --- TRIPLET LOSS CHECK ---
      // We only apply a gradient if the algorithm picked the wrong token AND 
      // the wrong token is encroaching on the target's geometric territory (violating the MARGIN).
      if (chosen_u !== target_u && (sim_chosen > sim_target - MARGIN)) {
        
        // Gradient Ascent: Pull the correct token closer to the residual's direction
        target_vec = V.add(target_vec, V.scale(r, LEARNING_RATE));
        
        // Gradient Descent: Push the wrong token away from the residual's direction
        chosen_vec = V.sub(chosen_vec, V.scale(r, LEARNING_RATE));

        // Re-normalize to maintain the spherical geometry required for OMP, then save
        dict.setVector(target_u, V.normalize(target_vec));
        dict.setVector(chosen_u, V.normalize(chosen_vec));
      }

      // --- TEACHER FORCING ---
      // If the algorithm picked the wrong token, projecting out the WRONG token 
      // will create a garbage residual, making it impossible to tune the 2nd token in the sequence.
      // Therefore, we mathematically force the state to project out the CORRECT target token.
      const fresh_target_unit = V.normalize(dict.getVector(target_u));
      const alignment = V.dot(r, fresh_target_unit);
      
      mag *= Math.max(0, 1 - alignment); // Shrink semantic debt
      
      // Gram-Schmidt Orthogonalization: Erase the target concept from the state
      r = V.sub(r, V.scale(fresh_target_unit, alignment));
      r = V.normalize(r); // Laser-focus the remaining orthogonal meaning
      
      expected_idx++;
    }
  });
}

// ============================================================================
// 2. DYNAMIC STACK TUNER (Decay-Weighted Sequence Alignment)
//
// This tunes the stack-based checkpointing algorithm. Instead of tuning 
// individual token choices, it aligns the MACRO-GEOMETRY of entire sequences.
// It distributes the error gradient across the tokens based on their 
// exponential position in the decay stack (a localized form of BPTT).
// ============================================================================
export function tune_dynamic_stack(
  dict: VectorDictionary,
  ptx_block_tokens: string[],    // e.g., ["mul.f32", "add.f32"]
  expected_llvm_block: string[], // e.g., ["fma_float"]
  LEARNING_RATE = 0.05,
  DECAY_CONSTANT = 0.5,
  HEAL_THRESHOLD = 0.95
) {
  const dim = dict.getVector(ptx_block_tokens[0]).length;

  // --- 1. ENCODE THE TARGET STACK (PTX) ---
  // We compress the source sequence into a single geometric point.
  // T = (v0 * 1.0) + (v1 * 0.5) + (v2 * 0.25)
  let target_stack = new Array(dim).fill(0);
  ptx_block_tokens.forEach((ptx_tok, k) => {
    const v_unit = V.normalize(dict.getVector(ptx_tok));
    const c_k = Math.pow(DECAY_CONSTANT, k); 
    target_stack = V.add(target_stack, V.scale(v_unit, c_k));
  });

  // --- 2. ENCODE THE EMITTED STACK (LLVM) ---
  // We compress the expected output sequence into a single geometric point.
  // E = (u0 * 1.0) + (u1 * 0.5) + (u2 * 0.25)
  let emitted_stack = new Array(dim).fill(0);
  expected_llvm_block.forEach((llvm_tok, j) => {
    const u_unit = V.normalize(dict.getVector(llvm_tok));
    const c_j = Math.pow(DECAY_CONSTANT, j);
    emitted_stack = V.add(emitted_stack, V.scale(u_unit, c_j));
  });

  const target_unit = V.normalize(target_stack);
  const emitted_unit = V.normalize(emitted_stack);

  // --- 3. EVALUATE SEQUENCE SYNC ---
  // Do these two sequences mean the same thing fundamentally?
  const alignment = V.dot(target_unit, emitted_unit);

  // If the sequences fail to sync up enough to satisfy the checkpoint gate...
  if (alignment < HEAL_THRESHOLD) {
    
    // We calculate exactly how much geometric ground we need to cover
    const error_magnitude = HEAL_THRESHOLD - alignment;
    const dynamic_lr = LEARNING_RATE * error_magnitude;

    // --- 4. TUNE PTX TOKENS (Decay-Weighted Gradient) ---
    // We drag the PTX tokens toward the geometry of the LLVM sequence.
    // Crucially, we scale the tug by the decay constant (c_k). 
    // The first token (k=0, weight 1.0) gets pulled hard. 
    // The second token (k=1, weight 0.5) gets a much smaller adjustment, 
    // preserving its role as a structural modifier rather than the primary meaning.
    ptx_block_tokens.forEach((ptx_tok, k) => {
      let v = dict.getVector(ptx_tok);
      const c_k = Math.pow(DECAY_CONSTANT, k); 
      
      v = V.add(v, V.scale(emitted_unit, dynamic_lr * c_k));
      dict.setVector(ptx_tok, V.normalize(v));
    });

    // --- 5. TUNE LLVM TOKENS (Decay-Weighted Gradient) ---
    // Conversely, we drag the LLVM tokens toward the PTX sequence geometry,
    // also respecting their structural weight in the sequence.
    expected_llvm_block.forEach((llvm_tok, j) => {
      let u = dict.getVector(llvm_tok);
      const c_j = Math.pow(DECAY_CONSTANT, j);
      
      u = V.add(u, V.scale(target_unit, dynamic_lr * c_j));
      dict.setVector(llvm_tok, V.normalize(u));
    });
  }
}
import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

// Core hyperparameters for the Stack
const DECAY_CONSTANT = 0.5;
const CHUNK_SIZE = 5; 
const HEAL_THRESHOLD = 0.95; // Stop emitting when the stack alignment hits 95%
const MAX_PER_CHUNK = CHUNK_SIZE * 3;

// Helper: Dot product for cosine similarities and projections
function dot(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0);
}

register("arithmetic_stack_block_healing", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, context_vectors } = ctx;
  const out: string[] = [];

  // Process the token stream in isolated, stable chunks
  for (let i = 0; i < tokens.length; i += CHUNK_SIZE) {
    const chunk_vectors = context_vectors.slice(i, i + CHUNK_SIZE);
    if (chunk_vectors.length === 0) continue;

    const dim = chunk_vectors[0]?.length || 384;

    // 1. Build the Checkpoint Target (Encode Last-to-First)
    // Formula: T = v_0 + c*v_1 + c^2*v_2 ...
    let checkpoint_target = new Array(dim).fill(0);
    for (let k = chunk_vectors.length - 1; k >= 0; k--) {
      const v = chunk_vectors[k] ?? new Array(dim).fill(0);
      const v_mag = vector_norm(v);
      const v_unit = v_mag > 0 ? v.map(x => x / v_mag) : new Array(dim).fill(0);

      checkpoint_target = checkpoint_target.map(
        (t_val, idx) => v_unit[idx] + (DECAY_CONSTANT * t_val)
      );
    }

    const checkpoint_mag = vector_norm(checkpoint_target);
    if (checkpoint_mag === 0) continue;
    const target_unit = checkpoint_target.map(x => x / checkpoint_mag);

    // 2. Setup the Generative State
    let residual = [...checkpoint_target];
    let emitted_stack = new Array(dim).fill(0);

    for (let step = 0; step < MAX_PER_CHUNK; step++) {
      const res_mag = vector_norm(residual);
      if (res_mag < 1e-3) break; // Noise floor

      // Normalized residual dictates the search direction
      const r_unit = residual.map(x => x / res_mag);

      // Find best token
      const u = find_nearest_llvm(r_unit);
      if (!u) break;

      const uv = llvm_vectors[u] ?? [];
      const uv_norm = vector_norm(uv);
      if (uv_norm === 0) break;
      const uv_unit = uv.map(x => x / uv_norm);

      // Emit token
      out.push(u);

      // 3. Forward-Encode the Emitted Stack
      // E = E + c^step * uv_unit
      const current_decay = Math.pow(DECAY_CONSTANT, step);
      emitted_stack = emitted_stack.map(
        (e_val, idx) => e_val + (current_decay * (uv_unit[idx] ?? 0))
      );

      // 4. The Verification Gate ("Does it look like the input yet?")
      const e_mag = vector_norm(emitted_stack);
      let alignment = 0;
      if (e_mag > 0) {
        const e_unit = emitted_stack.map(x => x / e_mag);
        alignment = dot(e_unit, target_unit);
      }

      // If the generated sequence's stack math matches the source stack math, we are done
      if (alignment >= HEAL_THRESHOLD) {
        break; 
      }

      // 5. Pop and Shift (Gram-Schmidt Projection + Scale)
      // Project the found vector out of the residual to maintain orthogonality, 
      // then scale by (1 / c) to shift the next token to the dominant 1.0 position.
      const projection = dot(residual, uv_unit);
      residual = residual.map(
        (r_val, idx) => (r_val - projection * (uv_unit[idx] ?? 0)) / DECAY_CONSTANT
      );
    }
  }

  return out;
});

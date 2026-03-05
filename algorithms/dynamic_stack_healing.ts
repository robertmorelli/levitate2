import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

// Core Stack Hyperparameters
const DECAY_CONSTANT = 0.5;
const HEAL_THRESHOLD = 0.95;     // The alignment required to definitively close a block
const MIN_ALIGNMENT = 0.55;      // The noise filter (must capture 55% of the direction)
const MAX_LOOKAHEAD = 5;         // Max tokens to evaluate before forcing a fallback reset

// Helper: Dot product for cosine similarities
function dot(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0);
}

register("dynamic_stack_healing", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, context_vectors } = ctx;
  const out: string[] = [];
  const dim = context_vectors[0]?.length || 384;

  let cursor = 0;

  while (cursor < tokens.length) {
    let target_stack = new Array(dim).fill(0);
    let emitted_stack = new Array(dim).fill(0);
    let emitted_tokens: string[] = [];
    let synced = false;

    const end_k = Math.min(tokens.length, cursor + MAX_LOOKAHEAD);

    // Dynamically build the target stack by looking ahead
    for (let k = cursor; k < end_k; k++) {
      let c_k = Math.pow(DECAY_CONSTANT, k - cursor);
      const v = context_vectors[k] ?? new Array(dim).fill(0);
      const v_mag = vector_norm(v);
      const v_unit = v_mag > 0 ? v.map(x => x / v_mag) : new Array(dim).fill(0);

      // Add the next PTX token to the target geometry
      target_stack = target_stack.map((t, idx) => t + c_k * v_unit[idx]);

      // Attempt to cover the target geometry by emitting LLVM tokens
      for (let step = 0; step < 3; step++) {
        let target_mag = vector_norm(target_stack);
        let emitted_mag = vector_norm(emitted_stack);
        let alignment = 0;
        
        // 1. The Verification Gate
        if (target_mag > 0 && emitted_mag > 0) {
          let t_unit = target_stack.map(x => x / target_mag);
          let e_unit = emitted_stack.map(x => x / emitted_mag);
          alignment = dot(t_unit, e_unit);
        }

        // If the stacks align, we have perfectly translated this dynamic boundary
        if (alignment >= HEAL_THRESHOLD && emitted_tokens.length > 0) {
          synced = true;
          break;
        }

        // 2. Cancellation Residual (No (1/c) shift required!)
        // T = v0 + c*v1. E = u0. R = (v0-u0) + c*v1. 
        // Normalizing R naturally targets v1 because the v0 geometry was cancelled out.
        let residual = target_stack.map((t, idx) => t - emitted_stack[idx]);
        let res_mag = vector_norm(residual);
        
        if (res_mag < 0.1) break; // Everything is covered

        let r_unit = residual.map(x => x / res_mag);

        // 3. Search and filter noise
        const u = find_nearest_llvm(r_unit);
        if (!u) break;

        const uv = llvm_vectors[u] ?? [];
        const uv_norm = vector_norm(uv);
        if (uv_norm === 0) break;
        const uv_unit = uv.map(x => x / uv_norm);

        const token_alignment = dot(r_unit, uv_unit);
        if (token_alignment < MIN_ALIGNMENT) {
          break; // Stop chasing geometric shadows
        }

        // 4. Push found token to the emitted decay stack
        let c_emit = Math.pow(DECAY_CONSTANT, emitted_tokens.length);
        emitted_stack = emitted_stack.map((e, idx) => e + c_emit * (uv_unit[idx] ?? 0));
        emitted_tokens.push(u);
      }

      // If we synced successfully inside the loop, break lookahead and reset
      if (synced) {
        out.push(...emitted_tokens);
        cursor = k + 1; // Advance the cursor past the consumed PTX tokens
        break;
      }
    }

    // 5. Fallback Reset
    // If we searched the max lookahead and never achieved a 95% perfect sync,
    // we cut our losses, emit the closest verified tokens we found, and step forward by 1.
    if (!synced) {
      if (emitted_tokens.length > 0) {
        out.push(...emitted_tokens);
      }
      cursor += 1;
    }
  }

  return out;
});

import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

const DECAY_CONSTANT = 0.5;
const HEAL_THRESHOLD = 0.95;
const MIN_ALIGNMENT = 0.55;
const MAX_LOOKAHEAD = 5;

// --- New Guardrail Hyperparameters ---
const REPETITION_PENALTY = 0.15; // Deducted from cosine similarity
const PENALTY_WINDOW = 3;        // How far back to look for duplicates
const EXPANSION_BUDGET = 2;      // Max LLVM tokens per PTX token in a chunk

function dot(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0);
}

register("dynamic_stack_healing_v2", (ctx, tokens) => {
  const { llvm_vectors, context_vectors } = ctx;
  const out: string[] = [];
  const dim = context_vectors[0]?.length || 384;
  const llvm_keys = Object.keys(llvm_vectors);

  let cursor = 0;

  while (cursor < tokens.length) {
    let target_stack = new Array(dim).fill(0);
    let emitted_stack = new Array(dim).fill(0);
    let emitted_tokens: string[] = [];
    let synced = false;

    const end_k = Math.min(tokens.length, cursor + MAX_LOOKAHEAD);

    for (let k = cursor; k < end_k; k++) {
      let c_k = Math.pow(DECAY_CONSTANT, k - cursor);
      const v = context_vectors[k] ?? new Array(dim).fill(0);
      const v_mag = vector_norm(v);
      const v_unit = v_mag > 0 ? v.map(x => x / v_mag) : new Array(dim).fill(0);

      target_stack = target_stack.map((t, idx) => t + c_k * (v_unit[idx] ?? 0));

      // Guardrail 2: Length Budget (Dynamic based on current PTX tokens evaluated)
      const current_ptx_count = (k - cursor) + 1;
      const max_emissions = current_ptx_count * EXPANSION_BUDGET;

      while (emitted_tokens.length < max_emissions) {
        let target_mag = vector_norm(target_stack);
        let emitted_mag = vector_norm(emitted_stack);
        let alignment = 0;
        
        if (target_mag > 0 && emitted_mag > 0) {
          let t_unit = target_stack.map(x => x / target_mag);
          let e_unit = emitted_stack.map(x => x / emitted_mag);
          alignment = dot(t_unit, e_unit);
        }

        if (alignment >= HEAL_THRESHOLD && emitted_tokens.length > 0) {
          synced = true;
          break;
        }

        let residual = target_stack.map((t, idx) => t - emitted_stack[idx]);
        let res_mag = vector_norm(residual);
        if (res_mag < 0.1) break;

        let r_unit = residual.map(x => x / res_mag);

        // Guardrail 1: Custom Nearest Neighbor with Dup-Penalty
        let best_token = "";
        let best_score = -Infinity;

        for (const target_id of llvm_keys) {
            const uv = llvm_vectors[target_id] ?? [];
            const uv_norm = vector_norm(uv);
            if (uv_norm === 0) continue;
            
            const uv_unit = uv.map(x => x / uv_norm);
            let raw_score = dot(r_unit, uv_unit);

            // Apply Repetition Penalty
            const recent_window = emitted_tokens.slice(-PENALTY_WINDOW);
            const dup_count = recent_window.filter(t => t === target_id).length;
            const penalized_score = raw_score - (dup_count * REPETITION_PENALTY);

            if (penalized_score > best_score) {
                best_score = penalized_score;
                best_token = target_id;
            }
        }

        // If even the best penalized token falls below confidence, break
        if (!best_token || best_score < MIN_ALIGNMENT) {
          break;
        }

        const chosen_uv = llvm_vectors[best_token] ?? [];
        const chosen_uv_norm = vector_norm(chosen_uv);
        if (chosen_uv_norm === 0) break;
        const chosen_uv_unit = chosen_uv.map(x => x / chosen_uv_norm);
        let c_emit = Math.pow(DECAY_CONSTANT, emitted_tokens.length);
        emitted_stack = emitted_stack.map((e, idx) => e + c_emit * (chosen_uv_unit[idx] ?? 0));
        emitted_tokens.push(best_token);
      }

      if (synced) {
        out.push(...emitted_tokens);
        cursor = k + 1;
        break;
      }
    }

    if (!synced) {
      if (emitted_tokens.length > 0) {
        out.push(...emitted_tokens);
      }
      cursor += 1;
    }
  }

  return out;
});

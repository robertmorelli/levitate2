import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

const THRESHOLD = 0.1;
const MAX_PER_TOKEN = 3;

register("arithmetic", (ctx, tokens) => {
  const { llvm_vectors, find_nearest_llvm, context_vectors } = ctx;
  const out: string[] = [];

  tokens.forEach((_, i) => {
    const raw = context_vectors[i] ?? [];
    let mag = vector_norm(raw);
    if (mag === 0) return;

    let r = raw.map(x => x / mag);  // unit vector = decode position

    for (let j = 0; j < MAX_PER_TOKEN; j++) {
      if (mag < THRESHOLD) break;
      const u = find_nearest_llvm(r);
      if (!u) break;
      const uv = llvm_vectors[u] ?? [];
      const uv_norm = vector_norm(uv);
      if (uv_norm === 0) break;
      const uv_unit = uv.map(x => x / uv_norm);

      const alignment = r.reduce((s, x, k) => s + x * (uv_unit[k] ?? 0), 0);
      mag *= Math.max(0, 1 - alignment);

      // Project u out and renormalize — the arithmetic rescale step
      r = r.map((x, k) => x - alignment * (uv_unit[k] ?? 0));
      const rn = vector_norm(r);
      out.push(u);
      if (rn < 1e-6) break;
      r = r.map(x => x / rn);
    }
  });

  return out;
});

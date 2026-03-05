/**
 * Arithmetic / Gram-Schmidt pursuit: for each source token, normalize the
 * residual to a unit vector after every subtraction (the "rescale" step in
 * arithmetic coding). This means each successive LLVM token is chosen based
 * purely on direction — the most-aligned token first, then the next most
 * aligned to whatever direction remains unexplained. Emitting tokens in
 * decreasing order of alignment mirrors how arithmetic coding orders symbols
 * by probability: the most informative symbol is always decoded first.
 *
 * Termination tracks remaining magnitude separately from the unit direction.
 */
import { register } from "../utils/registry.js";
import { vector_norm } from "../utils/vector_norm.js";

const THRESHOLD = 0.1;
const MAX_PER_TOKEN = 3;

register("arithmetic", (ctx, tokens) => {
  const { ptx_vectors, llvm_vectors, find_nearest_llvm } = ctx;
  const out: string[] = [];

  for (const s of tokens) {
    const raw = ptx_vectors[s] ?? [];
    let mag = vector_norm(raw);
    if (mag === 0) continue;

    // r is always a unit vector — the "current decode position"
    let r = raw.map(x => x / mag);

    for (let i = 0; i < MAX_PER_TOKEN; i++) {
      if (mag < THRESHOLD) break;

      const u = find_nearest_llvm(r);
      if (!u) break;

      const uv = llvm_vectors[u] ?? [];
      const uv_norm = vector_norm(uv);
      if (uv_norm === 0) break;
      const uv_unit = uv.map(x => x / uv_norm);

      // How much of r is aligned with u (cosine similarity since r is unit)
      const alignment = r.reduce((s, x, i) => s + x * (uv_unit[i] ?? 0), 0);

      // Reduce remaining magnitude by the explained fraction
      mag *= Math.max(0, 1 - alignment);

      // Project u out of r (Gram-Schmidt), then renormalize — the arithmetic step
      r = r.map((x, i) => x - alignment * (uv_unit[i] ?? 0));
      const rn = vector_norm(r);
      if (rn < 1e-6) { out.push(u); break; }
      r = r.map(x => x / rn);

      out.push(u);
    }
  }

  return out;
});

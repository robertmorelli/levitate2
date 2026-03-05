/**
 * Map an arbitrary PTX opcode to the closest token in the vocab by
 * longest-common-prefix on dot-separated segments.
 *
 * e.g. "add.rn.f32" → "add.f32", "ld.global.b32" → "ld.global.f32"
 *
 * Returns null if no segment matches (completely unknown root).
 */
export function normalize_ptx_token(token: string, vocab: string[]): string | null {
  const segs = token.split(".");
  let best = "";
  let bestScore = 0;

  for (const v of vocab) {
    const vsegs = v.split(".");
    let score = 0;
    for (let i = 0; i < Math.min(segs.length, vsegs.length); i++) {
      if (segs[i] === vsegs[i]) score++;
      else break;
    }
    if (score > bestScore) {
      bestScore = score;
      best = v;
    }
  }

  return bestScore > 0 ? best : null;
}

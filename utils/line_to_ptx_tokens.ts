/**
 * Classify a single PTX operand string into a register-identity token.
 *
 * Returns:
 *   - Named register:  "f3", "r0", "rd1", "p2"   (actual %fN/%rN/%rdN/%pN)
 *   - Memory access:   "mem_rd0"                   ([%rdN] or [%rdN+offset])
 *   - Immediate:       "imm"                        (any numeric literal)
 *   - Branch label:    "op_label"
 *   - Generic/special: "op_reg"
 */
export function classify_ptx_operand(operand: string): string {
  const s = operand.trim();

  // Memory-indirect: [%rd0] or [%rd0+16] or [%rd0+-8]
  const memMatch = s.match(/^\[%?(rd\d+)(?:[+\-][\w]+)?\]$/i);
  if (memMatch) return `mem_${memMatch[1]!.toLowerCase()}`;

  // Named registers: %f3→f3, %rd0→rd0, %r5→r5, %p1→p1
  const regMatch = s.match(/^%?(rd\d+|f\d+|r\d+|p\d+)$/i);
  if (regMatch) return regMatch[1]!.toLowerCase();

  // Branch labels
  if (s.startsWith("$")) return "op_label";

  // Immediate numeric literal (hex, float-hex, decimal, signed)
  if (/^(0x[0-9a-f]+|0f[0-9a-f]+|[-+]?\d+(\.\d*)?)$/i.test(s)) return "imm";

  return "op_reg";
}

/**
 * Extract the opcode and per-operand structural type tokens from a PTX
 * instruction line.  Returns [] for non-instruction lines.
 *
 * e.g. "fma.rn.f32 %f1, %f2, %f3, %f4;" → ["fma.rn.f32","op_f","op_f","op_f","op_f"]
 */
export function line_to_ptx_tokens(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith(".") || trimmed === "{" || trimmed === "}") return [];

  const noComment = (trimmed.split("//", 1)[0] ?? "").trim();
  if (!noComment || noComment.endsWith(":")) return [];

  // Strip predicate prefix (@%p0 / @!%p0) before matching opcode
  let body = noComment;
  if (body.startsWith("@")) {
    const sp = body.indexOf(" ");
    if (sp < 0) return [];
    body = body.slice(sp + 1).trim();
  }

  const m = body.match(/^([a-z][a-z0-9_.]*)\s*(.*)/i);
  const op = m?.[1]?.toLowerCase();
  if (!op) return [];

  const rest = (m?.[2] ?? "").replace(/;$/, "").trim();
  const operand_types = rest
    ? rest.split(",").map(s => classify_ptx_operand(s.trim()))
    : [];

  return [op, ...operand_types];
}

export default line_to_ptx_tokens;

/** Extract the opcode from a PTX instruction line. Returns [] for non-instruction lines. */
export function line_to_ptx_tokens(line: string): string[] {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith(".") || trimmed === "{" || trimmed === "}") return [];

  const noComment = (trimmed.split("//", 1)[0] ?? "").trim();
  if (!noComment || noComment.endsWith(":")) return [];

  const m = noComment.match(/^([a-z][a-z0-9_.]*)\b/i);
  const op = m?.[1]?.toLowerCase();
  return op ? [op] : [];
}

export default line_to_ptx_tokens;

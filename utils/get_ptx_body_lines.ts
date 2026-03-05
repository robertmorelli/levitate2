/**
 * Extract trimmed lines inside the first PTX function body.
 * Returns lines between the first "{" and its matching "}".
 */
export function get_ptx_body_lines(ptxText: string): string[] {
  const lines = ptxText.split(/\r?\n/);
  const out: string[] = [];
  let depth = 0;
  let started = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (!started) {
      if (line.includes("{")) {
        started = true;
        depth += (line.match(/\{/g) ?? []).length;
        depth -= (line.match(/\}/g) ?? []).length;
      }
      continue;
    }

    depth += (line.match(/\{/g) ?? []).length;
    depth -= (line.match(/\}/g) ?? []).length;

    if (line && line !== "{" && line !== "}") out.push(line);
    if (depth <= 0) break;
  }

  return out;
}

export default get_ptx_body_lines;

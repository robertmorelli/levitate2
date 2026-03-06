export interface PtxSimilarity {
  score: number;
  set_jaccard: number;
  bag_overlap: number;
  seq_lcs: number;
  exact: number;
}

export function ptx_instruction_signatures(ptx: string): string[] {
  const out: string[] = [];

  for (const raw of ptx.split(/\r?\n/)) {
    let line = raw.trim();
    if (!line || line.startsWith("//") || line.startsWith(".") || line === "{" || line === "}") continue;
    const noComment = (line.split("//", 1)[0] ?? "").trim();
    if (!noComment || noComment.endsWith(":")) continue;
    line = noComment;

    let pred = "0";
    if (line.startsWith("@")) {
      pred = "1";
      const sp = line.indexOf(" ");
      if (sp < 0) continue;
      line = line.slice(sp + 1).trim();
    }

    const m = line.match(/^([a-z][a-z0-9_.]*)\s*(.*)$/i);
    if (!m) continue;
    // Canonicalize bitwidth type qualifiers: .b32 → .u32, .b64 → .u64
    // Signed (.s) and float (.f) qualifiers are preserved as-is.
    const op = (m[1] ?? "").toLowerCase()
      .replace(/\.b(32)\b/g, ".u32")
      .replace(/\.b(64)\b/g, ".u64");
    const rest = ((m[2] ?? "").replace(/;$/, "")).trim();

    const operands = rest ? rest.split(",").map(s => s.trim()).filter(Boolean) : [];
    const kinds = operands.map(classify_operand).join(",");
    out.push(`${op}|p${pred}|n${operands.length}|${kinds}`);
  }

  return out;
}

function classify_operand(op: string): string {
  const s = op.toLowerCase();
  if (s.includes("[")) return "mem";
  if (s.startsWith("%rd")) return "rd";
  if (s.startsWith("%r")) return "r";
  if (s.startsWith("%f")) return "f";
  if (s.startsWith("%p")) return "p";
  if (s.startsWith("%")) return "reg";
  if (s.startsWith("$l")) return "label";
  if (/^(0x[0-9a-f]+|[-+]?\d+|0f[0-9a-f]+)$/i.test(s)) return "imm";
  return "other";
}

function set_jaccard(a: string[], b: string[]): number {
  const sa = new Set(a);
  const sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 1 : inter / union;
}

function bag_overlap(a: string[], b: string[]): number {
  const ca = new Map<string, number>();
  const cb = new Map<string, number>();
  for (const x of a) ca.set(x, (ca.get(x) ?? 0) + 1);
  for (const x of b) cb.set(x, (cb.get(x) ?? 0) + 1);

  let inter = 0;
  for (const [k, av] of ca) inter += Math.min(av, cb.get(k) ?? 0);
  const denom = a.length + b.length;
  return denom === 0 ? 1 : (2 * inter) / denom;
}

function lcs_ratio(a: string[], b: string[]): number {
  const n = a.length;
  const m = b.length;
  if (n + m === 0) return 1;

  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i]![j] = a[i - 1] === b[j - 1]
        ? (dp[i - 1]![j - 1] ?? 0) + 1
        : Math.max(dp[i - 1]![j] ?? 0, dp[i]![j - 1] ?? 0);
    }
  }
  const lcs = dp[n]![m] ?? 0;
  return (2 * lcs) / (n + m);
}

export function compare_ptx(source_ptx: string, candidate_ptx: string): PtxSimilarity {
  const a = ptx_instruction_signatures(source_ptx);
  const b = ptx_instruction_signatures(candidate_ptx);
  const set = set_jaccard(a, b);
  const bag = bag_overlap(a, b);
  const seq = lcs_ratio(a, b);
  const exact = a.length === b.length && a.every((x, i) => x === b[i]) ? 1 : 0;

  // Harsh scorer: sequence and multiplicity dominate set overlap.
  const score = 0.45 * seq + 0.35 * bag + 0.15 * set + 0.05 * exact;
  return { score, set_jaccard: set, bag_overlap: bag, seq_lcs: seq, exact };
}

#!/usr/bin/env tsx
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";

import { load_vector_map } from "../utils/load_vector_map.js";
import { parse_ptx_source } from "../utils/parse_ptx_source.js";
import { get_vector_dimension } from "../utils/get_vector_dimension.js";

type Vec = number[];

interface DriftCellMetric {
  cell: number;
  l2: number;
  cosine: number;
}

interface DriftReport {
  ptx_file: string;
  llvm_file: string;
  cells: number;
  dim: number;
  ptx_token_count: number;
  llvm_token_count: number;
  ptx_tokens: string[];
  llvm_tokens: string[];
  dropped_llvm_lines: number;
  stats: {
    mean_l2: number;
    max_l2: number;
    max_l2_cell: number;
    mean_cosine: number;
    min_cosine: number;
    min_cosine_cell: number;
  };
  cell_metrics: DriftCellMetric[];
  drift_vectors: Vec[];
}

function dot(a: Vec, b: Vec): number {
  return a.reduce((s, x, i) => s + x * (b[i] ?? 0), 0);
}

function norm(a: Vec): number {
  return Math.sqrt(dot(a, a));
}

function cosine(a: Vec, b: Vec): number {
  const an = norm(a);
  const bn = norm(b);
  if (an === 0 || bn === 0) return 0;
  return dot(a, b) / (an * bn);
}

function l2(a: Vec, b: Vec): number {
  return Math.sqrt(a.reduce((s, x, i) => {
    const d = x - (b[i] ?? 0);
    return s + d * d;
  }, 0));
}

function map_llvm_line_to_token(line: string): string | null {
  const s = line.trim().toLowerCase();
  if (!s || s.startsWith(";") || s.startsWith("declare") || s.endsWith(":") || s === "{" || s === "}") return null;

  if (/\bload float\b/.test(s)) return "load_float_addrspace1";
  if (/\bstore float\b/.test(s)) return "store_float_addrspace1";
  if (/\bload i32\b/.test(s)) return "load_i32_addrspace1";
  if (/\bstore i32\b/.test(s)) return "store_i32_addrspace1";
  if (/\bload i64\b/.test(s)) return "load_i64_addrspace1";
  if (/\bstore i64\b/.test(s)) return "store_i64_addrspace1";

  if (/\bfadd float\b/.test(s)) return "fadd_float";
  if (/\bfsub float\b/.test(s)) return "fsub_float";
  if (/\bfmul float\b/.test(s)) return "fmul_float";
  if (/\bfdiv float\b/.test(s)) return s.includes("fdiv float 1.000000e+00") ? "fdiv_float_recip" : "fdiv_float";
  if (/\bfneg float\b/.test(s)) return "fneg_float";

  if (/\bcall float @llvm\.fma\.f32\b/.test(s)) return "fma_float";
  if (/\bcall float @llvm\.sqrt\.f32\b/.test(s)) return "fsqrt_float";
  if (/\bcall float @llvm\.fabs\.f32\b/.test(s)) return "fabs_float";
  if (/\bcall float @llvm\.minnum\.f32\b/.test(s)) return "fmin_float";
  if (/\bcall float @llvm\.maxnum\.f32\b/.test(s)) return "fmax_float";

  if (/\bfcmp oeq float\b/.test(s)) return "fcmp_oeq_float";
  if (/\bfcmp one float\b/.test(s)) return "fcmp_one_float";
  if (/\bfcmp olt float\b/.test(s)) return "fcmp_olt_float";
  if (/\bfcmp ogt float\b/.test(s)) return "fcmp_ogt_float";
  if (/\bselect i1\b/.test(s) && /\bfloat\b/.test(s)) return "select_float";

  if (/\badd i32\b/.test(s)) return "add_i32";
  if (/\bsub i32\b/.test(s)) return "sub_i32";
  if (/\bmul i32\b/.test(s)) return "mul_i32";
  if (/\band i32\b/.test(s)) return "and_i32";
  if (/\bor i32\b/.test(s)) return "or_i32";
  if (/\bxor i32\b/.test(s)) return "xor_i32";
  if (/\bshl i32\b/.test(s)) return "shl_i32";
  if (/\blshr i32\b/.test(s)) return "lshr_i32";
  if (/\bashr i32\b/.test(s)) return "ashr_i32";

  if (/\badd i64\b/.test(s)) return "add_i64";
  if (/\bmul i64\b/.test(s)) return "mul_i64";
  if (/\bshl i64\b/.test(s)) return "shl_i64";

  if (/\bicmp eq i32\b/.test(s)) return "icmp_eq_i32";
  if (/\bicmp ne i32\b/.test(s)) return "icmp_ne_i32";
  if (/\bicmp sge i32\b/.test(s)) return "icmp_sge_i32";
  if (/\bselect i1\b/.test(s) && /\bi32\b/.test(s)) return "select_i32";

  if (/\bfptosi float\b/.test(s) && /\bto i32\b/.test(s)) return "fptosi_f32_to_i32";
  if (/\bsitofp i32\b/.test(s) && /\bto float\b/.test(s)) return "sitofp_i32_to_f32";
  if (/\bsext i32\b/.test(s) && /\bto i64\b/.test(s)) return "sext_i32_to_i64";
  if (/\bzext i32\b/.test(s) && /\bto i64\b/.test(s)) return "zext_i32_to_i64";

  if (/\bptrtoint .* to i64\b/.test(s)) return "ptrtoint_p1_to_i64";
  if (/\binttoptr i64\b/.test(s) && /addrspace\(1\)/.test(s)) return "inttoptr_i64_to_p1";

  if (/\bbr label\b/.test(s)) return "br_uncond";
  if (/\bret void\b/.test(s)) return "ret_void";
  if (/\bret i32\b/.test(s)) return "ret_i32";
  if (/\bret i64\b/.test(s)) return "ret_i64";
  if (/\bret float\b/.test(s)) return "ret_float";

  return null;
}

function parse_llvm_source(source: string, llvm_vectors: Record<string, number[]>): { tokens: string[]; dropped: number } {
  const tokens: string[] = [];
  let dropped = 0;

  for (const line of source.split(/\r?\n/)) {
    const tok = map_llvm_line_to_token(line);
    if (!tok) continue;
    if (llvm_vectors[tok] === undefined) {
      dropped++;
      continue;
    }
    tokens.push(tok);
  }

  return { tokens, dropped };
}

function resample_to_cells(vectors: Vec[], cells: number, dim: number): Vec[] {
  const out = Array.from({ length: cells }, () => new Array<number>(dim).fill(0));
  const weights = new Array<number>(cells).fill(0);

  if (vectors.length === 0) return out;
  if (vectors.length === 1) {
    out[0] = [...(vectors[0] ?? new Array<number>(dim).fill(0))];
    weights[0] = 1;
  } else {
    for (let i = 0; i < vectors.length; i++) {
      const v = vectors[i] ?? [];
      const pos = (i / (vectors.length - 1)) * (cells - 1);
      const left = Math.floor(pos);
      const right = Math.min(cells - 1, left + 1);
      const wr = pos - left;
      const wl = 1 - wr;

      for (let k = 0; k < dim; k++) {
        const x = v[k] ?? 0;
        out[left]![k] = (out[left]![k] ?? 0) + wl * x;
        out[right]![k] = (out[right]![k] ?? 0) + wr * x;
      }
      weights[left] = (weights[left] ?? 0) + wl;
      weights[right] = (weights[right] ?? 0) + wr;
    }
  }

  for (let c = 0; c < cells; c++) {
    const w = weights[c] ?? 0;
    if (w <= 0) continue;
    out[c] = (out[c] ?? []).map((x) => x / w);
  }
  return out;
}

function blur_cells(cells: Vec[], passes = 2): Vec[] {
  const kernel = [1, 4, 6, 4, 1];
  const radius = 2;
  let cur = cells.map((v) => [...v]);
  const dim = cells[0]?.length ?? 0;

  for (let pass = 0; pass < passes; pass++) {
    const next = cur.map(() => new Array<number>(dim).fill(0));
    for (let i = 0; i < cur.length; i++) {
      let weightSum = 0;
      for (let k = -radius; k <= radius; k++) {
        const j = i + k;
        if (j < 0 || j >= cur.length) continue;
        const w = kernel[k + radius] ?? 0;
        weightSum += w;
        const src = cur[j] ?? [];
        for (let d = 0; d < dim; d++) {
          next[i]![d] = (next[i]![d] ?? 0) + w * (src[d] ?? 0);
        }
      }
      if (weightSum > 0) {
        for (let d = 0; d < dim; d++) next[i]![d] = (next[i]![d] ?? 0) / weightSum;
      }
    }
    cur = next;
  }
  return cur;
}

function usage(): never {
  console.error("Usage: npm run explore:drift -- [ptx_file] [llvm_file] [cells]");
  process.exit(1);
}

const ptx_file = process.argv[2] ?? "examples/reference.ptx";
const llvm_file = process.argv[3] ?? "examples/reference.ll";
const cells = parseInt(process.argv[4] ?? "32", 10);
if (!Number.isFinite(cells) || cells <= 0) usage();

const ptx_path = process.env["PTX_VECTORS"] ?? "utils/ptx_vectors_openai_described.json";
const llvm_path = process.env["LLVM_VECTORS"] ?? "utils/llvm_vectors_openai_described.json";

const ptx_vectors = load_vector_map(ptx_path);
const llvm_vectors = load_vector_map(llvm_path);
const dim = get_vector_dimension(ptx_vectors);
const llvm_dim = get_vector_dimension(llvm_vectors);
if (dim !== llvm_dim) {
  throw new Error(`Vector dimension mismatch: PTX=${dim}, LLVM=${llvm_dim}`);
}

const ptx_source = readFileSync(ptx_file, "utf8");
const llvm_source = readFileSync(llvm_file, "utf8");

const ptx_tokens = parse_ptx_source(ptx_source, ptx_vectors);
const llvm_parse = parse_llvm_source(llvm_source, llvm_vectors);
const llvm_tokens = llvm_parse.tokens;

const ptx_seq = ptx_tokens.map((t) => [...(ptx_vectors[t] ?? new Array<number>(dim).fill(0))]);
const llvm_seq = llvm_tokens.map((t) => [...(llvm_vectors[t] ?? new Array<number>(dim).fill(0))]);

const ptx_cells = blur_cells(resample_to_cells(ptx_seq, cells, dim), 2);
const llvm_cells = blur_cells(resample_to_cells(llvm_seq, cells, dim), 2);

const drift_vectors: Vec[] = [];
const cell_metrics: DriftCellMetric[] = [];

for (let i = 0; i < cells; i++) {
  const a = ptx_cells[i] ?? new Array<number>(dim).fill(0);
  const b = llvm_cells[i] ?? new Array<number>(dim).fill(0);
  const drift = b.map((x, k) => x - (a[k] ?? 0));
  drift_vectors.push(drift);
  cell_metrics.push({
    cell: i,
    l2: l2(a, b),
    cosine: cosine(a, b),
  });
}

const mean_l2 = cell_metrics.reduce((s, c) => s + c.l2, 0) / cells;
const mean_cosine = cell_metrics.reduce((s, c) => s + c.cosine, 0) / cells;
const max_l2_cell = cell_metrics.reduce((best, c) => (c.l2 > best.l2 ? c : best), cell_metrics[0] ?? { cell: 0, l2: 0, cosine: 0 });
const min_cosine_cell = cell_metrics.reduce((worst, c) => (c.cosine < worst.cosine ? c : worst), cell_metrics[0] ?? { cell: 0, l2: 0, cosine: 0 });

const report: DriftReport = {
  ptx_file,
  llvm_file,
  cells,
  dim,
  ptx_token_count: ptx_tokens.length,
  llvm_token_count: llvm_tokens.length,
  ptx_tokens,
  llvm_tokens,
  dropped_llvm_lines: llvm_parse.dropped,
  stats: {
    mean_l2,
    max_l2: max_l2_cell.l2,
    max_l2_cell: max_l2_cell.cell,
    mean_cosine,
    min_cosine: min_cosine_cell.cosine,
    min_cosine_cell: min_cosine_cell.cell,
  },
  cell_metrics,
  drift_vectors,
};

mkdirSync("exploration/out", { recursive: true });
const pair = `${basename(ptx_file).replace(/\.[^.]+$/, "")}__${basename(llvm_file).replace(/\.[^.]+$/, "")}`;
const out = join("exploration/out", `semantic_drift_32_${pair}.json`);
writeFileSync(out, JSON.stringify(report, null, 2));

console.log(`ptx tokens: ${ptx_tokens.length}`);
console.log(`llvm tokens: ${llvm_tokens.length} (dropped lines: ${llvm_parse.dropped})`);
console.log(`cells: ${cells}, dim: ${dim}`);
console.log(`mean L2 drift: ${mean_l2.toFixed(6)}`);
console.log(`max L2 drift: ${max_l2_cell.l2.toFixed(6)} at cell ${max_l2_cell.cell}`);
console.log(`mean cosine: ${mean_cosine.toFixed(6)}`);
console.log(`min cosine: ${min_cosine_cell.cosine.toFixed(6)} at cell ${min_cosine_cell.cell}`);
console.log(`wrote: ${out}`);

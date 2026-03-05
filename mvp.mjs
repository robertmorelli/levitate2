#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { loadHnswlib } from "hnswlib-wasm";

const ALIGNMENT_PATH = "alignment.json";
const EXPAND_FMA = process.env.MVP_EXPAND_FMA === "1";

const KNOWN_MAPPINGS = new Map([
  ["add.f32", ["fadd_float"]],
  ["mul.f32", ["fmul_float"]],
  ["fma.rn.f32", EXPAND_FMA ? ["fmul_float", "fadd_float"] : ["fma_float"]],
  ["rcp.approx.f32", ["fdiv_float_recip"]],
  ["ld.global.f32", ["load_float_addrspace1"]],
  ["st.global.f32", ["store_float_addrspace1"]],
  ["ret", ["ret_void"]],
]);

const CANONICAL_PAIRS = new Map([
  ["add.f32", "fadd_float"],
  ["mul.f32", "fmul_float"],
  ["fma.rn.f32", "fma_float"],
  ["rcp.approx.f32", "fdiv_float_recip"],
  ["ld.global.f32", "load_float_addrspace1"],
  ["st.global.f32", "store_float_addrspace1"],
  ["ret", "ret_void"],
]);

function usage() {
  console.log(`Usage:
  node mvp.mjs init
  node mvp.mjs embed
  node mvp.mjs translate --ptx add.f32,mul.f32,ret [--threshold 0.1]
  node mvp.mjs verify --ptx add.f32,mul.f32,ret [--source-ptx source.ptx]

Flow:
  1) npm run embed:tokens      # generate vectors in token JSON via Ollama
  2) node mvp.mjs embed        # compute alignment.json
  3) node mvp.mjs translate ...
`);
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      out[key] = value;
    } else {
      out._.push(a);
    }
  }
  return out;
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function l2Norm(v) {
  return Math.sqrt(v.reduce((s, x) => s + x * x, 0));
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += a[i] * b[i];
  return s;
}

function zeros(n) {
  return Array.from({ length: n }, () => 0);
}

function addVec(a, b) {
  return a.map((x, i) => x + b[i]);
}

function subVec(a, b) {
  return a.map((x, i) => x - b[i]);
}

function transpose(A) {
  const m = A.length;
  const n = A[0].length;
  const out = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));
  for (let i = 0; i < m; i += 1) for (let j = 0; j < n; j += 1) out[j][i] = A[i][j];
  return out;
}

function matMul(A, B) {
  const m = A.length;
  const k = A[0].length;
  const n = B[0].length;
  const out = Array.from({ length: m }, () => Array.from({ length: n }, () => 0));
  for (let i = 0; i < m; i += 1) {
    for (let p = 0; p < k; p += 1) {
      const aip = A[i][p];
      if (aip === 0) continue;
      for (let j = 0; j < n; j += 1) out[i][j] += aip * B[p][j];
    }
  }
  return out;
}

function identity(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

function qrThin(A) {
  const d = A.length;
  const n = A[0].length;
  const Q = Array.from({ length: d }, () => Array.from({ length: n }, () => 0));
  const R = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  const V = Array.from({ length: d }, (_, i) => A[i].slice());
  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < j; i += 1) {
      let rij = 0;
      for (let r = 0; r < d; r += 1) rij += Q[r][i] * V[r][j];
      R[i][j] = rij;
      for (let r = 0; r < d; r += 1) V[r][j] -= rij * Q[r][i];
    }
    let norm = 0;
    for (let r = 0; r < d; r += 1) norm += V[r][j] * V[r][j];
    norm = Math.sqrt(norm);
    R[j][j] = norm > 1e-12 ? norm : 1e-12;
    for (let r = 0; r < d; r += 1) Q[r][j] = V[r][j] / R[j][j];
  }
  return { Q, R };
}

function jacobiEigenSymmetric(Ain, maxIter = 200, eps = 1e-10) {
  const n = Ain.length;
  const A = Ain.map((row) => row.slice());
  const V = identity(n);

  for (let iter = 0; iter < maxIter; iter += 1) {
    let p = 0;
    let q = 1;
    let max = Math.abs(A[p][q]);
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        const v = Math.abs(A[i][j]);
        if (v > max) {
          max = v;
          p = i;
          q = j;
        }
      }
    }
    if (max < eps) break;

    const app = A[p][p];
    const aqq = A[q][q];
    const apq = A[p][q];
    const phi = 0.5 * Math.atan2(2 * apq, aqq - app);
    const c = Math.cos(phi);
    const s = Math.sin(phi);

    for (let k = 0; k < n; k += 1) {
      const aik = A[p][k];
      const aqk = A[q][k];
      A[p][k] = c * aik - s * aqk;
      A[q][k] = s * aik + c * aqk;
    }
    for (let k = 0; k < n; k += 1) {
      const akp = A[k][p];
      const akq = A[k][q];
      A[k][p] = c * akp - s * akq;
      A[k][q] = s * akp + c * akq;
    }
    A[p][q] = 0;
    A[q][p] = 0;

    for (let k = 0; k < n; k += 1) {
      const vkp = V[k][p];
      const vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }

  const eigenvalues = Array.from({ length: n }, (_, i) => A[i][i]);
  return { eigenvalues, eigenvectors: V };
}

function svdSmall(M) {
  const Mt = transpose(M);
  const MtM = matMul(Mt, M);
  const { eigenvalues, eigenvectors } = jacobiEigenSymmetric(MtM);

  const idx = Array.from({ length: eigenvalues.length }, (_, i) => i).sort(
    (a, b) => eigenvalues[b] - eigenvalues[a]
  );

  const V = Array.from({ length: eigenvectors.length }, () => []);
  const S = [];
  for (const i of idx) {
    S.push(Math.sqrt(Math.max(eigenvalues[i], 0)));
    for (let r = 0; r < eigenvectors.length; r += 1) V[r].push(eigenvectors[r][i]);
  }

  const MV = matMul(M, V);
  const U = MV.map((row) => row.map((x, j) => x / (S[j] > 1e-12 ? S[j] : 1e-12)));
  return { U, S, V };
}

function orthogonalProcrustes(X, Y) {
  const Xt = transpose(X);
  const Yt = transpose(Y);
  const { Q: Qx, R: Rx } = qrThin(Xt);
  const { Q: Qy, R: Ry } = qrThin(Yt);
  const M = matMul(Rx, transpose(Ry));
  const { U: Um, V: Vm } = svdSmall(M);
  const core = matMul(Um, transpose(Vm));
  const W = matMul(matMul(Qx, core), transpose(Qy));
  return W;
}

function applyTransform(v, W) {
  const d = v.length;
  const out = zeros(d);
  for (let i = 0; i < d; i += 1) {
    let s = 0;
    for (let j = 0; j < d; j += 1) s += v[j] * W[j][i];
    out[i] = s;
  }
  return out;
}

function loadTokenVectors(path) {
  const raw = readJson(path);
  const out = new Map();
  for (const [token, entry] of Object.entries(raw)) {
    const vector = entry && typeof entry === "object" ? entry.vector : null;
    if (!Array.isArray(vector) || vector.length === 0) {
      throw new Error(`Missing vector for token '${token}' in ${path}. Run: npm run embed:tokens`);
    }
    out.set(token, vector);
  }
  return out;
}

function loadEmbeddings() {
  return {
    ptx: loadTokenVectors("ptx_tokens.json"),
    llvm: loadTokenVectors("llvm_tokens.json"),
  };
}

function runInit() {
  if (!existsSync("ptx_tokens.json") || !existsSync("llvm_tokens.json")) {
    throw new Error("Expected ptx_tokens.json and llvm_tokens.json in cwd");
  }
  console.log("init ok");
}

function runEmbed() {
  const { ptx, llvm } = loadEmbeddings();
  const pairs = [...CANONICAL_PAIRS.entries()];

  const X = [];
  const Y = [];
  for (const [a, b] of pairs) {
    const xa = ptx.get(a);
    const yb = llvm.get(b);
    if (!xa || !yb) continue;
    X.push(xa);
    Y.push(yb);
  }

  const W = orthogonalProcrustes(X, Y);
  writeJson(ALIGNMENT_PATH, { dim: W.length, matrix: W });
  console.log(`alignment written: ${ALIGNMENT_PATH}`);
}

function loadAlignment() {
  if (!existsSync(ALIGNMENT_PATH)) {
    throw new Error(`Missing ${ALIGNMENT_PATH}. Run: node mvp.mjs embed`);
  }
  const json = readJson(ALIGNMENT_PATH);
  if (!Array.isArray(json.matrix)) {
    throw new Error(`Invalid ${ALIGNMENT_PATH}`);
  }
  return json.matrix;
}

function embed(tokens, map, dim) {
  return tokens.reduce((acc, t) => addVec(acc, map.get(t) || zeros(dim)), zeros(dim));
}

async function buildLlvmIndex(llvmMap) {
  const lib = await loadHnswlib();
  const first = llvmMap.values().next().value;
  const dim = first.length;

  const index = new lib.HierarchicalNSW("cosine", dim);
  index.initIndex(llvmMap.size, 16, 64, 100);
  index.setEfSearch(Math.max(10, llvmMap.size));

  const vectors = [];
  for (const vec of llvmMap.values()) vectors.push(Array.from(vec));
  index.addItems(vectors, false);

  return {
    index,
    label_to_token: Array.from(llvmMap.keys()),
  };
}

function query_nn(targetVec, llvmIndex) {
  const result = llvmIndex.index.searchKnn(Array.from(targetVec), 1);
  const label = Array.isArray(result?.neighbors) ? result.neighbors[0] : null;
  if (typeof label !== "number") {
    throw new Error("HNSW query failed");
  }
  const token = llvmIndex.label_to_token[label];
  if (!token) throw new Error(`Invalid HNSW label: ${label}`);
  return token;
}

async function do_lift(source, threshold = 0.1) {
  const { ptx, llvm } = loadEmbeddings();
  const W = loadAlignment();
  const dim = W.length;
  const llvmIndex = await buildLlvmIndex(llvm);

  const alignedPtx = new Map();
  for (const [token, vec] of ptx.entries()) alignedPtx.set(token, applyTransform(vec, W));

  const A = embed(source, alignedPtx, dim);
  const lift = [];
  let targetSum = zeros(dim);

  for (let i = 0; i < source.length; i += 1) {
    const just_popped = source[i];
    const current = alignedPtx.get(just_popped) || zeros(dim);
    const unconsumed = embed(source.slice(i + 1), alignedPtx, dim);
    const residual = subVec(subVec(subVec(A, targetSum), unconsumed), current);
    const norm = l2Norm(residual);

    const priorTokens = KNOWN_MAPPINGS.get(just_popped);
    if (priorTokens && priorTokens.length > 0) {
      for (const token of priorTokens) {
        lift.push(token);
        targetSum = addVec(targetSum, llvm.get(token) || zeros(dim));
      }
    } else {
      const to_push = query_nn(residual, llvmIndex);
      lift.push(to_push);
      targetSum = addVec(targetSum, llvm.get(to_push) || zeros(dim));
    }

    if (norm < threshold && i >= source.length - 1) break;
  }

  if (!lift.includes("ret_void")) lift.push("ret_void");
  return lift;
}

function llvmFromTokens(tokens, signature = {}) {
  const fnName = signature.fnName || "candidate";
  const p0 = signature.p0 || "p0";
  const p1 = signature.p1 || "p1";
  const p2 = signature.p2 || "p2";
  let reg = 1;
  const lines = [];
  const nextReg = () => `%${reg++}`;

  lines.push("declare float @llvm.fma.f32(float, float, float)");
  lines.push("");
  lines.push(`define void @${fnName}(ptr addrspace(1) %${p0}, ptr addrspace(1) %${p1}, ptr addrspace(1) %${p2}) {`);
  lines.push("entry:");

  const in0 = nextReg();
  lines.push(`  ${in0} = load float, ptr addrspace(1) %${p0}, align 4`);
  const in1 = nextReg();
  lines.push(`  ${in1} = load float, ptr addrspace(1) %${p1}, align 4`);

  let cur = in0;
  for (const t of tokens) {
    if (t === "load_float_addrspace1") {
      const r = nextReg();
      lines.push(`  ${r} = load float, ptr addrspace(1) %${p0}, align 4`);
      cur = r;
    } else if (t === "fadd_float") {
      const r = nextReg();
      lines.push(`  ${r} = fadd float ${cur}, ${in1}`);
      cur = r;
    } else if (t === "fmul_float") {
      const r = nextReg();
      lines.push(`  ${r} = fmul float ${cur}, ${in1}`);
      cur = r;
    } else if (t === "fma_float") {
      const r = nextReg();
      lines.push(`  ${r} = call float @llvm.fma.f32(float ${cur}, float ${in1}, float ${in1})`);
      cur = r;
    } else if (t === "fdiv_float_recip") {
      const r = nextReg();
      lines.push(`  ${r} = fdiv float 1.000000e+00, ${cur}`);
      cur = r;
    } else if (t === "store_float_addrspace1") {
      lines.push(`  store float ${cur}, ptr addrspace(1) %${p2}, align 4`);
    }
  }

  if (!tokens.includes("store_float_addrspace1")) {
    lines.push(`  store float ${cur}, ptr addrspace(1) %${p2}, align 4`);
  }
  lines.push("  ret void");
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

function parsePtxSignature(path) {
  const src = readFileSync(path, "utf8");
  const fnMatch = src.match(/\.visible\s+\.func\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/);
  const fnName = fnMatch ? fnMatch[1] : "candidate";
  const params = [];
  const lines = src.split(/\r?\n/);
  let inHeader = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.includes(".visible .func")) inHeader = true;
    if (!inHeader) continue;
    const m = line.match(/\.param\s+\.[A-Za-z0-9]+\s+([A-Za-z_][A-Za-z0-9_]*)/);
    if (m) params.push(m[1]);
    if (line.includes(")")) break;
  }
  const [p0, p1, p2] = params.length >= 3 ? params.slice(0, 3) : ["p0", "p1", "p2"];
  return { fnName, p0, p1, p2 };
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function rewriteCandidatePtxParamNames(signature) {
  const path = "candidate.ptx";
  let src = readFileSync(path, "utf8");
  const generated = [
    `${signature.fnName}_param_0`,
    `${signature.fnName}_param_1`,
    `${signature.fnName}_param_2`,
  ];
  const desired = [signature.p0, signature.p1, signature.p2];

  for (let i = 0; i < generated.length; i += 1) {
    const from = generated[i];
    const to = desired[i];
    if (!to || from === to) continue;
    const re = new RegExp(`\\b${escapeRegExp(from)}\\b`, "g");
    src = src.replace(re, to);
  }

  writeFileSync(path, src, "utf8");
}

function extractPtxOpcodes(path) {
  const src = readFileSync(path, "utf8");
  const ops = [];
  for (const line of src.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith(".")) continue;
    const m = trimmed.match(/^([a-z][a-z0-9_.]*)\b/);
    if (m) ops.push(m[1]);
  }
  return ops;
}

async function runVerify(ptxTokens, sourcePtxPath) {
  const llvmTokens = await do_lift(ptxTokens);
  const signature = sourcePtxPath ? parsePtxSignature(sourcePtxPath) : { fnName: "candidate", p0: "p0", p1: "p1", p2: "p2" };
  const ll = llvmFromTokens(llvmTokens, signature);
  writeFileSync("candidate.ll", ll, "utf8");
  execFileSync("node", ["llc.mjs", "candidate.ll", "candidate.ptx"], { stdio: "inherit" });
  rewriteCandidatePtxParamNames(signature);

  if (sourcePtxPath) {
    const srcOps = extractPtxOpcodes(sourcePtxPath);
    const candOps = extractPtxOpcodes("candidate.ptx");
    const srcSet = new Set(srcOps);
    const candSet = new Set(candOps);
    const missing = [...srcSet].filter((x) => !candSet.has(x));
    const extra = [...candSet].filter((x) => !srcSet.has(x));

    console.log("\\nPTX opcode diff (set-based):");
    console.log("missing from candidate:", missing.length ? missing.join(", ") : "none");
    console.log("extra in candidate:", extra.length ? extra.join(", ") : "none");
  }

  return { llvmTokens };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  if (!cmd) {
    usage();
    process.exit(1);
  }

  if (cmd === "init") {
    runInit();
    return;
  }

  if (cmd === "embed") {
    runEmbed();
    return;
  }

  if (cmd === "translate") {
    if (!args.ptx) throw new Error("Missing --ptx token1,token2,...");
    const ptxTokens = String(args.ptx)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    const threshold = Number(args.threshold || 0.1);
    const out = await do_lift(ptxTokens, threshold);
    console.log(JSON.stringify({ ptxTokens, llvmTokens: out }, null, 2));
    return;
  }

  if (cmd === "verify") {
    if (!args.ptx) throw new Error("Missing --ptx token1,token2,...");
    const ptxTokens = String(args.ptx)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    const result = await runVerify(ptxTokens, args["source-ptx"] ? resolve(args["source-ptx"]) : null);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  usage();
  process.exit(1);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

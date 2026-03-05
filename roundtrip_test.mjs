#!/usr/bin/env node

import { execFileSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from "fs";
import { basename, join, resolve } from "path";

const EXAMPLES_DIR = resolve("examples");
const OUT_DIR = resolve("examples/roundtrip");

function runNode(args, opts = {}) {
  return execFileSync("node", args, { encoding: "utf8", ...opts });
}

function parseCli(argv) {
  const out = { rebuild: true };
  for (const arg of argv) {
    if (arg === "--no-embed") out.rebuild = false;
  }
  return out;
}

function normalizeOpcode(op) {
  if (op.startsWith("ld.global") && op.endsWith(".b32")) return "ld.global.f32";
  if (op.startsWith("st.global") && op.endsWith(".b32")) return "st.global.f32";
  if (op.startsWith("add") && op.endsWith(".f32")) return "add.f32";
  if (op.startsWith("mul") && op.endsWith(".f32")) return "mul.f32";
  if (op.startsWith("fma") && op.endsWith(".f32")) return "fma.rn.f32";
  if (op.startsWith("rcp") && op.endsWith(".f32")) return "rcp.approx.f32";
  if (op === "ret") return "ret";
  return null;
}

function extractCoveredOps(path) {
  const src = readFileSync(path, "utf8");
  const ops = [];
  for (const rawLine of src.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//") || line.startsWith(".") || line.startsWith("{")) continue;
    if (line.startsWith("}")) continue;
    const m = line.match(/^([a-z][a-z0-9_.]*)\b/i);
    if (!m) continue;
    const op = normalizeOpcode(m[1]);
    if (op) ops.push(op);
  }
  return ops;
}

function uniqueStem(file) {
  return basename(file, ".ptx");
}

function diffText(a, b, labelA, labelB) {
  const aa = a.split("\n");
  const bb = b.split("\n");
  if (a === b) return "";

  const out = [`--- ${labelA}`, `+++ ${labelB}`];
  const max = Math.max(aa.length, bb.length);
  for (let i = 0; i < max; i += 1) {
    if (aa[i] === bb[i]) continue;
    if (aa[i] !== undefined) out.push(`- ${aa[i]}`);
    if (bb[i] !== undefined) out.push(`+ ${bb[i]}`);
  }
  return `${out.join("\n")}\n`;
}

function main() {
  const args = parseCli(process.argv.slice(2));
  mkdirSync(OUT_DIR, { recursive: true });

  const ptxFiles = readdirSync(EXAMPLES_DIR)
    .filter((f) => f.endsWith(".ptx"))
    .filter((f) => !f.includes(".roundtrip"))
    .sort()
    .map((f) => join(EXAMPLES_DIR, f));

  if (ptxFiles.length === 0) {
    console.error("No .ptx files found in examples/");
    process.exit(1);
  }

  if (args.rebuild) {
    console.log("[setup] embedding/alignment refresh");
    runNode(["mvp.mjs", "embed"], { stdio: "inherit" });
  }

  let failures = 0;

  for (const file of ptxFiles) {
    const stem = uniqueStem(file);
    const srcOps = extractCoveredOps(file);
    if (srcOps.length === 0) {
      console.log(`[skip] ${stem}: no covered opcodes`);
      continue;
    }

    const tokenCsv = srcOps.join(",");
    const raw = runNode(["mvp.mjs", "verify", "--ptx", tokenCsv]);
    let llvmTokens = [];
    try {
      llvmTokens = JSON.parse(raw).llvmTokens || [];
    } catch {
      console.error(`[fail] ${stem}: unable to parse mvp verify output`);
      failures += 1;
      continue;
    }

    const outLl = join(OUT_DIR, `${stem}.roundtrip.ll`);
    const outPtx = join(OUT_DIR, `${stem}.roundtrip.ptx`);
    copyFileSync(resolve("candidate.ll"), outLl);
    copyFileSync(resolve("candidate.ptx"), outPtx);

    const roundOps = extractCoveredOps(outPtx);
    const srcOpsText = `${srcOps.join("\n")}\n`;
    const roundOpsText = `${roundOps.join("\n")}\n`;
    const srcOpsPath = join(OUT_DIR, `${stem}.source.ops.txt`);
    const roundOpsPath = join(OUT_DIR, `${stem}.roundtrip.ops.txt`);
    const diffPath = join(OUT_DIR, `${stem}.ops.diff.txt`);

    writeFileSync(srcOpsPath, srcOpsText, "utf8");
    writeFileSync(roundOpsPath, roundOpsText, "utf8");

    const diff = diffText(srcOpsText, roundOpsText, srcOpsPath, roundOpsPath);
    writeFileSync(diffPath, diff, "utf8");

    if (diff) {
      failures += 1;
      console.log(`[fail] ${stem}`);
      console.log(`  llvm: ${llvmTokens.join(", ")}`);
      console.log(`  diff: ${diffPath}`);
    } else {
      console.log(`[pass] ${stem}`);
      console.log(`  llvm: ${llvmTokens.join(", ")}`);
    }
  }

  const rootCandidateLl = resolve("candidate.ll");
  const rootCandidatePtx = resolve("candidate.ptx");
  const lastLl = join(OUT_DIR, "_last_candidate.ll");
  const lastPtx = join(OUT_DIR, "_last_candidate.ptx");
  if (existsSync(rootCandidateLl)) {
    if (existsSync(lastLl)) rmSync(lastLl);
    renameSync(rootCandidateLl, lastLl);
  }
  if (existsSync(rootCandidatePtx)) {
    if (existsSync(lastPtx)) rmSync(lastPtx);
    renameSync(rootCandidatePtx, lastPtx);
  }

  if (failures > 0) {
    console.error(`\nRoundtrip failures: ${failures}`);
    process.exit(1);
  }

  console.log("\nAll roundtrip tests passed.");
}

main();

#!/usr/bin/env tsx
/**
 * Roundtrip harness: PTX → each lift algorithm → .ll → llc → PTX → compare
 *
 * Usage:  npm run roundtrip <input.ptx>
 */

import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import "./algorithms/global_residual.js";
import "./algorithms/per_token.js";
import "./algorithms/arithmetic.js";
import "./algorithms/momentum.js";
import { lift_all } from "./lift.js";
import { tokens_to_ll } from "./utils/tokens_to_ll.js";

const ptxFile = process.argv[2];
if (!ptxFile) { console.error("Usage: roundtrip.ts <input.ptx>"); process.exit(1); }

const source = readFileSync(ptxFile, "utf8");
const srcOps = ops_of(source);

const tmp = mkdtempSync(join(tmpdir(), "levitate-"));
const results = lift_all(source);

console.log(`\nsource ops: ${srcOps.join(" ")}\n`);
console.log("─".repeat(72));

for (const [name, tokens] of Object.entries(results)) {
  console.log(`\n▶ ${name}`);
  console.log(`  lifted:    ${tokens.join(" ") || "(none)"}`);

  if (tokens.length === 0) {
    console.log(`  roundtrip: (skipped — no tokens)`);
    continue;
  }

  const ll = tokens_to_ll(tokens);
  const llFile = join(tmp, `${name}.ll`);
  const ptxOut = join(tmp, `${name}.ptx`);
  writeFileSync(llFile, ll);

  const compiled = spawnSync(
    "node",
    [resolve("llc.mjs"), llFile, ptxOut],
    { encoding: "utf8" }
  );

  if (compiled.status !== 0) {
    console.log(`  roundtrip: (llc failed)`);
    console.log(`  error: ${compiled.stderr?.trim()}`);
    continue;
  }

  const rtOps = ops_of(readFileSync(ptxOut, "utf8"));
  const score = jaccard(srcOps, rtOps);
  console.log(`  roundtrip: ${rtOps.join(" ") || "(empty)"}`);
  console.log(`  score:     ${(score * 100).toFixed(0)}% jaccard`);
}

console.log("\n" + "─".repeat(72));

// ── helpers ──────────────────────────────────────────────────────────────────

function ops_of(ptx: string): string[] {
  return ptx.split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith("//") && !l.startsWith(".") && !l.startsWith("@") && l !== "{" && l !== "}")
    .map(l => (l.match(/^([a-z][a-z0-9_.]*)/i) ?? [])[1] ?? "")
    .filter(Boolean);
}

function jaccard(a: string[], b: string[]): number {
  const sa = new Set(a), sb = new Set(b);
  const inter = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 1 : inter / union;
}

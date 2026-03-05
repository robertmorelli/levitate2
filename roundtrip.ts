#!/usr/bin/env tsx
/**
 * Roundtrip test: PTX → lift() → .ll → llc → PTX → diff
 *
 * Usage:  npx tsx roundtrip.ts <input.ptx>
 *   or:   npm run roundtrip <input.ptx>
 */

import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { lift } from "./lift.js";
import { tokens_to_ll } from "./utils/tokens_to_ll.js";

const ptxFile = process.argv[2];
if (!ptxFile) {
  console.error("Usage: roundtrip.ts <input.ptx>");
  process.exit(1);
}

const source = readFileSync(ptxFile, "utf8");

// ── 1. Lift PTX → LLVM token sequence ────────────────────────────────────────
const tokens = lift(source);
console.log("lifted tokens:", tokens.join(" "));

// ── 2. Assemble tokens → .ll ─────────────────────────────────────────────────
const ll = tokens_to_ll(tokens);

// ── 3. Write temp files ───────────────────────────────────────────────────────
const tmp    = mkdtempSync(join(tmpdir(), "levitate-"));
const llFile = join(tmp, "lifted.ll");
const ptxOut = join(tmp, "lifted.ptx");

writeFileSync(llFile, ll);

// ── 4. Compile .ll → .ptx via llc ────────────────────────────────────────────
execSync(`node ${resolve("llc.mjs")} "${llFile}" "${ptxOut}"`, { stdio: "inherit" });
const roundtripped = readFileSync(ptxOut, "utf8");

// ── 5. Diff ───────────────────────────────────────────────────────────────────
console.log("\n── diff (source vs roundtrip) ──");
const r = spawnSync("diff", [ptxFile, ptxOut], { encoding: "utf8" });
if (r.stdout) process.stdout.write(r.stdout);

const opsOf = (ptx: string): string[] =>
  ptx.split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//") && !l.startsWith(".") && !l.startsWith("@") && l !== "{" && l !== "}")
    .map((l) => (l.match(/^([a-z][a-z0-9_.]*)/i) ?? [])[1] ?? "")
    .filter(Boolean);

const srcOps = opsOf(source);
const outOps = opsOf(roundtripped);
console.log("\n── op diff ──");
console.log("source:    ", srcOps.join(" "));
console.log("roundtrip: ", outOps.join(" "));
if (r.status === 0) console.log("\n✓ identical");

console.log("\n── lifted IR ──");
console.log(ll);

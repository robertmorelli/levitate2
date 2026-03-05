#!/usr/bin/env node

import { execSync } from "child_process";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: llc.mjs <input.ll> <output.ptx>");
  process.exit(1);
}

execSync(
  `/opt/homebrew/opt/llvm/bin/llc -march=nvptx64 -mcpu=sm_52 "${input}" -o "${output}"`,
  { stdio: "inherit" }
);

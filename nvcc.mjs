#!/usr/bin/env node

import { execSync } from "child_process";
import { resolve, dirname } from "path";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: nvcc.mjs <input.cu> <output.ptx>");
  process.exit(1);
}

const absInput = resolve(input);
const absOutput = resolve(output);
const dir = dirname(absInput);

execSync(
  `docker run --rm -v "${dir}":/work -w /work nvidia/cuda:12.6.0-devel-ubuntu22.04 nvcc -ptx "${absInput.replace(dir, ".")}" -o "${absOutput.replace(dir, ".")}"`,
  { stdio: "inherit" }
);

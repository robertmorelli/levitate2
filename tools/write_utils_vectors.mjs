#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function toVectorMap(dict, label) {
  const out = {};
  for (const [token, entry] of Object.entries(dict)) {
    const vec = entry && typeof entry === 'object' ? entry.vector : null;
    if (!Array.isArray(vec) || vec.length === 0) {
      throw new Error(`Missing vector for ${label} token '${token}'. Run: npm run embed:tokens`);
    }
    out[token] = vec;
  }
  return out;
}

const ptx = readJson('ptx_tokens.json');
const llvm = readJson('llvm_tokens.json');

writeJson('utils/ptx_vectors.json', toVectorMap(ptx, 'PTX'));
writeJson('utils/llvm_vectors.json', toVectorMap(llvm, 'LLVM'));

console.log('wrote utils/ptx_vectors.json and utils/llvm_vectors.json');

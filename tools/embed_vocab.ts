#!/usr/bin/env tsx
/**
 * Re-embeds the PTX and LLVM token vocab using a chosen provider and writes
 * utils/ptx_vectors.json and utils/llvm_vectors.json.
 *
 * Usage:
 *   GEMINI_API_KEY=<key>  tsx tools/embed_vocab.ts gemini
 *   OPENAI_API_KEY=<key>  tsx tools/embed_vocab.ts openai
 *   VOYAGE_API_KEY=<key>  tsx tools/embed_vocab.ts voyage
 *                         tsx tools/embed_vocab.ts ollama
 *
 * The vectors written here are what the lift/roundtrip pipeline reads.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { PTX_DESCRIPTIONS, LLVM_DESCRIPTIONS } from "../utils/token_descriptions.js";
import { get_provider, type ProviderName } from "../utils/embed_providers.js";

const provider_name = (process.argv[2] ?? "ollama") as ProviderName;
const embed = get_provider(provider_name);

console.log(`Embedding with provider: ${provider_name}`);

const ptx_tokens  = Object.keys(PTX_DESCRIPTIONS);
const llvm_tokens = Object.keys(LLVM_DESCRIPTIONS);
const ptx_texts   = Object.values(PTX_DESCRIPTIONS);
const llvm_texts  = Object.values(LLVM_DESCRIPTIONS);

console.log(`PTX tokens:  ${ptx_tokens.length}`);
console.log(`LLVM tokens: ${llvm_tokens.length}`);

// Embed in batches to avoid rate limits / payload limits
async function embed_batch(tokens: string[], texts: string[], label: string): Promise<Record<string, number[]>> {
  const BATCH = 32;
  const result: Record<string, number[]> = {};
  for (let i = 0; i < tokens.length; i += BATCH) {
    const batch_tokens = tokens.slice(i, i + BATCH);
    const batch_texts  = texts.slice(i, i + BATCH);
    process.stdout.write(`  ${label} [${i + 1}–${Math.min(i + BATCH, tokens.length)}/${tokens.length}]... `);
    const vecs = await embed(batch_texts);
    for (let j = 0; j < batch_tokens.length; j++) {
      result[batch_tokens[j]!] = vecs[j]!;
    }
    console.log(`dim=${vecs[0]?.length ?? 0}`);
  }
  return result;
}

const ptx_vectors  = await embed_batch(ptx_tokens,  ptx_texts,  "PTX");
const llvm_vectors = await embed_batch(llvm_tokens, llvm_texts, "LLVM");

const ptx_out  = join("utils", "ptx_vectors.json");
const llvm_out = join("utils", "llvm_vectors.json");

writeFileSync(ptx_out,  JSON.stringify(ptx_vectors,  null, 2));
writeFileSync(llvm_out, JSON.stringify(llvm_vectors, null, 2));

console.log(`\nWrote ${ptx_out}  (${ptx_tokens.length} vectors)`);
console.log(`Wrote ${llvm_out} (${llvm_tokens.length} vectors)`);
console.log("\nRun: npm run roundtrip examples/<file>.ptx");

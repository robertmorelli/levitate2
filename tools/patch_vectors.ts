#!/usr/bin/env tsx
/**
 * Patch existing vector JSON files by embedding only the tokens that are
 * present in the current descriptions but missing from the file.
 *
 * Determines the provider from the filename (gemini / openai / ollama) and
 * uses only that provider — no cross-contamination.
 *
 * Usage:
 *   npm run patch               # patch all detected provider files
 *   REFRESH_PROVIDER=gemini npm run patch
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { PTX_DESCRIPTIONS, LLVM_DESCRIPTIONS } from "../utils/token_descriptions.js";
import { make_gemini, make_openai, make_ollama, type EmbedFn } from "../utils/embed_providers.js";

// Load .env
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [k, ...rest] = trimmed.split("=");
    if (k && !process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}

const only = (process.env["REFRESH_PROVIDER"] ?? "all")
  .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
const want = (name: string) => only.includes("all") || only.includes(name);

function make_embed(provider: string): EmbedFn {
  if (provider === "gemini") {
    const key = process.env["GEMINI_API_KEY"] ?? process.env["GEMINI_TOKEN"];
    if (!key) throw new Error("GEMINI_API_KEY not set");
    return make_gemini(key);
  }
  if (provider === "openai") {
    const key = process.env["OPENAI_API_KEY"];
    if (!key) throw new Error("OPENAI_API_KEY not set");
    return make_openai(key);
  }
  if (provider === "ollama") return make_ollama();
  throw new Error(`Unknown provider: ${provider}`);
}

function load(path: string): Record<string, number[]> {
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, number[]>;
}

// Find all existing vector files grouped by (provider, mode)
const files = readdirSync("utils")
  .filter(f => f.match(/^(ptx|llvm)_vectors_(gemini|openai|ollama)_(bare|described)\.json$/))
  .map(f => `utils/${f}`);

// Group into pairs: ptx + llvm for same provider+mode
type Pair = { provider: string; mode: string; ptx: string; llvm: string };
const pairs = new Map<string, Partial<Pair>>();
for (const f of files) {
  const m = f.match(/(ptx|llvm)_vectors_(gemini|openai|ollama)_(bare|described)/);
  if (!m) continue;
  const [, side, provider, mode] = m as [string, string, string, string];
  const key = `${provider}_${mode}`;
  if (!pairs.has(key)) pairs.set(key, { provider, mode });
  const p = pairs.get(key)!;
  if (side === "ptx") p.ptx = f;
  else p.llvm = f;
}

(async () => {
  for (const [key, pair] of pairs) {
    const { provider, mode, ptx: ptxPath, llvm: llvmPath } = pair as Pair;

    if (!want(provider)) continue;
    if (!ptxPath || !llvmPath) { console.log(`  [${key}] incomplete pair, skipping`); continue; }

    const descriptions = mode === "described" ? { ptx: PTX_DESCRIPTIONS, llvm: LLVM_DESCRIPTIONS }
                                               : { ptx: Object.fromEntries(Object.keys(PTX_DESCRIPTIONS).map(k => [k, k])),
                                                   llvm: Object.fromEntries(Object.keys(LLVM_DESCRIPTIONS).map(k => [k, k])) };

    const ptxVecs  = load(ptxPath);
    const llvmVecs = load(llvmPath);

    const missingPtx  = Object.keys(descriptions.ptx).filter(t => !ptxVecs[t]);
    const missingLlvm = Object.keys(descriptions.llvm).filter(t => !llvmVecs[t]);

    if (missingPtx.length === 0 && missingLlvm.length === 0) {
      console.log(`  [${key}] up to date`);
      continue;
    }

    console.log(`  [${key}] patching ${missingPtx.length} PTX + ${missingLlvm.length} LLVM missing tokens`);

    let embed: EmbedFn;
    try { embed = make_embed(provider); }
    catch (e) { console.error(`  [${key}] skipping: ${(e as Error).message}`); continue; }

    const BATCH_SIZE = 20;
    const BATCH_DELAY_MS = 3 * 60 * 1000;

    async function embedInBatches(
      label: string,
      missing: string[],
      descs: Record<string, string>,
      vecs: Record<string, number[]>,
      outPath: string,
    ) {
      for (let start = 0; start < missing.length; start += BATCH_SIZE) {
        if (start > 0) {
          console.log(`  [${key}] ${label} waiting 3 minutes before next batch...`);
          await new Promise(res => setTimeout(res, BATCH_DELAY_MS));
        }
        const batch = missing.slice(start, start + BATCH_SIZE);
        const batchNum = Math.floor(start / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(missing.length / BATCH_SIZE);
        process.stdout.write(`  [${key}] ${label} batch ${batchNum}/${totalBatches} (${batch.length} tokens)... `);
        const texts = batch.map(t => descs[t] ?? t);
        const batchVecs = await embed(texts);
        for (let i = 0; i < batch.length; i++) vecs[batch[i]!] = batchVecs[i]!;
        writeFileSync(outPath, JSON.stringify(vecs, null, 2));
        console.log(`done`);
      }
    }

    try {
      if (missingPtx.length > 0) {
        await embedInBatches("PTX", missingPtx, descriptions.ptx, ptxVecs, ptxPath);
      }

      if (missingLlvm.length > 0) {
        await embedInBatches("LLVM", missingLlvm, descriptions.llvm, llvmVecs, llvmPath);
      }
    } catch (e) {
      console.error(`failed: ${(e as Error).message}`);
    }
  }
  console.log("\nDone.");
})();

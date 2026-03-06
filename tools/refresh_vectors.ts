#!/usr/bin/env tsx
/**
 * Re-embeds the PTX + LLVM vocab for every available provider and writes
 * utils/{ptx,llvm}_vectors_{provider}_{bare|described}.json.
 *
 * Run this when you want fresh vectors (new descriptions, new provider keys, etc).
 * The matrix benchmarks (compare_embeddings.ts) load these files directly and
 * never call any embedding API.
 *
 * Usage: tsx tools/refresh_vectors.ts
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { PTX_DESCRIPTIONS, LLVM_DESCRIPTIONS } from "../utils/token_descriptions.js";
import { make_gemini, make_openai, make_ollama, type EmbedFn } from "../utils/embed_providers.js";

// Load .env if present (no spaces around = required)
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [k, ...rest] = trimmed.split("=");
    if (k && !process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}

const ptx_tokens  = Object.keys(PTX_DESCRIPTIONS);
const llvm_tokens = Object.keys(LLVM_DESCRIPTIONS);

function to_map(tokens: string[], vecs: number[][]): Record<string, number[]> {
  return Object.fromEntries(tokens.map((t, i) => [t, vecs[i]!]));
}

async function embed_and_write(embed: EmbedFn, provider: string, mode: "bare" | "described") {
  const ptx_texts  = mode === "bare" ? ptx_tokens  : Object.values(PTX_DESCRIPTIONS);
  const llvm_texts = mode === "bare" ? llvm_tokens : Object.values(LLVM_DESCRIPTIONS);

  process.stdout.write(`  [${provider}/${mode}] PTX...  `);
  const ptx_vecs = await embed(ptx_texts);
  console.log(`dim=${ptx_vecs[0]?.length ?? 0}`);

  process.stdout.write(`  [${provider}/${mode}] LLVM... `);
  const llvm_vecs = await embed(llvm_texts);
  console.log(`dim=${llvm_vecs[0]?.length ?? 0}`);

  const slug = `${provider}_${mode}`;
  writeFileSync(`utils/ptx_vectors_${slug}.json`,  JSON.stringify(to_map(ptx_tokens,  ptx_vecs),  null, 2));
  writeFileSync(`utils/llvm_vectors_${slug}.json`, JSON.stringify(to_map(llvm_tokens, llvm_vecs), null, 2));
  console.log(`  wrote utils/*_vectors_${slug}.json`);
}

async function detect_providers(): Promise<Array<{ name: string; embed: EmbedFn }>> {
  // REFRESH_PROVIDER=gemini,openai  (comma-separated, or "all" / unset for all)
  const only = (process.env["REFRESH_PROVIDER"] ?? "all")
    .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  const want = (name: string) => only.includes("all") || only.includes(name);

  const out: Array<{ name: string; embed: EmbedFn }> = [];

  if (want("gemini")) {
    const gemini_key = process.env["GEMINI_API_KEY"] ?? process.env["GEMINI_TOKEN"];
    if (gemini_key) { console.log("  gemini: key found"); out.push({ name: "gemini", embed: make_gemini(gemini_key) }); }
    else console.log("  gemini: no GEMINI_API_KEY");
  }

  if (want("openai")) {
    const openai_key = process.env["OPENAI_API_KEY"];
    if (openai_key) { console.log("  openai: key found"); out.push({ name: "openai", embed: make_openai(openai_key) }); }
    else console.log("  openai: no OPENAI_API_KEY");
  }

  if (want("ollama")) {
    try {
      const r = await fetch("http://localhost:11434/api/tags", { signal: AbortSignal.timeout(3000) });
      if (r.ok) {
        const data = await r.json() as { models: { name: string }[] };
        const model = data.models.find(m => m.name.startsWith("nomic-embed-text") || m.name.startsWith("bge-small"));
        if (model) {
          const m = model.name.split(":")[0]!;
          console.log(`  ollama: found ${model.name}`);
          out.push({ name: "ollama", embed: make_ollama(m) });
        } else {
          console.log("  ollama: running but no embedding model (need nomic-embed-text or bge-small-en-v1.5)");
        }
      }
    } catch { console.log("  ollama: not reachable"); }
  }

  return out;
}

(async () => {
  console.log("\n=== Detecting providers ===\n");
  const providers = await detect_providers();
  if (providers.length === 0) {
    console.error("\nNo providers available. Set GEMINI_API_KEY, OPENAI_API_KEY, or run Ollama.");
    process.exit(1);
  }

  console.log("\n=== Embedding vocab ===\n");
  for (const { name, embed } of providers) {
    try {
      await embed_and_write(embed, name, "bare");
      await embed_and_write(embed, name, "described");
    } catch (err) {
      console.error(`  [${name}] failed, skipping: ${(err as Error).message}`);
    }
  }

  console.log("\nDone. Run: npm run compare examples/<file>.ptx");
})();

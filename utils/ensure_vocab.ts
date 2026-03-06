/**
 * Ensure all tokens in a PTX token stream are present in the active vector
 * files.  If any are missing, embed them using the configured provider and
 * write them into both the PTX and LLVM vector JSON files so the next run
 * finds them without re-embedding.
 *
 * Called as a pre-flight step by examine, bench, and roundtrip tools.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

// Load .env if present so API keys are available without shell pre-sourcing
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [k, ...rest] = trimmed.split("=");
    if (k && !process.env[k.trim()]) process.env[k.trim()] = rest.join("=").trim();
  }
}
import { make_gemini, make_openai, make_ollama, type EmbedFn } from "./embed_providers.js";
import { REGISTER_DESCRIPTIONS } from "./token_descriptions.js";

function load_json(path: string): Record<string, number[]> {
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf8")) as Record<string, number[]>;
}

function provider_from_path(path: string): EmbedFn {
  if (path.includes("gemini")) {
    const key = process.env["GEMINI_API_KEY"] ?? process.env["GEMINI_TOKEN"];
    if (!key) throw new Error("GEMINI_API_KEY not set");
    return make_gemini(key);
  }
  if (path.includes("openai")) {
    const key = process.env["OPENAI_API_KEY"];
    if (!key) throw new Error("OPENAI_API_KEY not set");
    return make_openai(key);
  }
  if (path.includes("ollama")) {
    return make_ollama();
  }
  throw new Error(`Cannot determine provider from path: ${path}`);
}

export async function ensure_vocab(tokens: string[]): Promise<void> {
  const ptx_path  = process.env["PTX_VECTORS"]  ?? "utils/ptx_vectors_gemini_described.json";
  const llvm_path = process.env["LLVM_VECTORS"] ?? "utils/llvm_vectors_gemini_described.json";

  const ptx_vecs  = load_json(ptx_path);
  const llvm_vecs = load_json(llvm_path);

  const missing = [...new Set(tokens)].filter(t => !ptx_vecs[t]);
  if (missing.length === 0) return;

  console.log(`  [ensure_vocab] ${missing.length} missing token(s): ${missing.join(", ")}`);
  console.log(`  [ensure_vocab] embedding with provider from ${ptx_path}...`);

  const embed = provider_from_path(ptx_path);

  // Generate a description for each missing token — use REGISTER_DESCRIPTIONS
  // if available, otherwise fall back to the token name itself.
  const allDesc: Record<string, string> = { ...REGISTER_DESCRIPTIONS };
  const texts = missing.map(t => allDesc[t] ?? t);

  const vecs = await embed(texts);

  for (let i = 0; i < missing.length; i++) {
    const token = missing[i]!;
    const vec   = vecs[i]!;
    ptx_vecs[token]  = vec;
    llvm_vecs[token] = vec; // same description → same vector on both sides
  }

  writeFileSync(ptx_path,  JSON.stringify(ptx_vecs,  null, 2));
  writeFileSync(llvm_path, JSON.stringify(llvm_vecs, null, 2));
  console.log(`  [ensure_vocab] wrote ${missing.length} new token(s) to both vector files`);
}

#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";

const MODEL = process.env.OLLAMA_EMBED_MODEL || "nomic-embed-text";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function embed(name) {
  let res;
  try {
    res = await fetch("http://127.0.0.1:11434/api/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt: name }),
    });
  } catch {
    throw new Error(
      `Cannot reach Ollama at http://127.0.0.1:11434. Start it with: ollama serve`
    );
  }

  if (!res.ok) {
    throw new Error(`Embedding request failed (${res.status}) for token: ${name}`);
  }

  const json = await res.json();
  if (!Array.isArray(json.embedding)) {
    throw new Error(`Embedding response missing vector for token: ${name}`);
  }
  return json.embedding;
}

async function enrich(path) {
  const raw = readJson(path);
  const out = {};
  const tokens = Object.keys(raw);

  for (const token of tokens) {
    const existing = raw[token];
    const currentVec = existing && typeof existing === "object" ? existing.vector : null;
    if (Array.isArray(currentVec) && currentVec.length > 0) {
      out[token] = { name: token, vector: currentVec };
      continue;
    }

    const vector = await embed(token);
    out[token] = { name: token, vector };
    console.log(`[embedded] ${token} (${vector.length})`);
  }

  writeJson(path, out);
}

async function main() {
  await enrich("ptx_tokens.json");
  await enrich("llvm_tokens.json");
  console.log("done");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

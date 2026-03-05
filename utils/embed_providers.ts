/**
 * Embedding providers for re-embedding the PTX/LLVM vocab with richer models.
 * Each provider takes a list of texts and returns a list of float32 vectors.
 *
 * Set the matching env var before running tools/embed_vocab.ts:
 *   GEMINI_API_KEY    — Google Gemini text-embedding-004
 *   OPENAI_API_KEY    — OpenAI text-embedding-3-large
 *   VOYAGE_API_KEY    — Voyage AI voyage-code-2
 *   OLLAMA_BASE_URL   — Ollama (default http://localhost:11434)
 */

export type EmbedFn = (texts: string[]) => Promise<number[][]>;

// ── Gemini ────────────────────────────────────────────────────────────────────

export function make_gemini(api_key: string, model = "gemini-embedding-001"): EmbedFn {
  return async (texts) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:batchEmbedContents?key=${api_key}`;
    const body = {
      requests: texts.map(text => ({
        model: `models/${model}`,
        content: { parts: [{ text }] },
      })),
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Gemini error ${res.status}: ${await res.text()}`);
    const data = await res.json() as { embeddings: { values: number[] }[] };
    return data.embeddings.map(e => e.values);
  };
}

// ── OpenAI ────────────────────────────────────────────────────────────────────

export function make_openai(api_key: string, model = "text-embedding-3-large"): EmbedFn {
  return async (texts) => {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${api_key}` },
      body: JSON.stringify({ model, input: texts }),
    });
    if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${await res.text()}`);
    const data = await res.json() as { data: { index: number; embedding: number[] }[] };
    const sorted = data.data.sort((a, b) => a.index - b.index);
    return sorted.map(d => d.embedding);
  };
}

// ── Voyage AI ─────────────────────────────────────────────────────────────────

export function make_voyage(api_key: string, model = "voyage-code-2"): EmbedFn {
  return async (texts) => {
    const res = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${api_key}` },
      body: JSON.stringify({ model, input: texts }),
    });
    if (!res.ok) throw new Error(`Voyage error ${res.status}: ${await res.text()}`);
    const data = await res.json() as { data: { index: number; embedding: number[] }[] };
    const sorted = data.data.sort((a, b) => a.index - b.index);
    return sorted.map(d => d.embedding);
  };
}

// ── Ollama (local, fallback) ───────────────────────────────────────────────────

export function make_ollama(model = "nomic-embed-text", base_url = process.env["OLLAMA_BASE_URL"] ?? "http://localhost:11434"): EmbedFn {
  return async (texts) => {
    const results: number[][] = [];
    for (const text of texts) {
      const res = await fetch(`${base_url}/api/embeddings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt: text }),
      });
      if (!res.ok) throw new Error(`Ollama error ${res.status}: ${await res.text()}`);
      const data = await res.json() as { embedding: number[] };
      results.push(data.embedding);
    }
    return results;
  };
}

// ── Provider selector ─────────────────────────────────────────────────────────

export type ProviderName = "gemini" | "openai" | "voyage" | "ollama";

export function get_provider(name: ProviderName): EmbedFn {
  switch (name) {
    case "gemini": {
      const key = process.env["GEMINI_API_KEY"] ?? process.env["GEMINI_TOKEN"];
      if (!key) throw new Error("GEMINI_API_KEY or GEMINI_TOKEN not set");
      return make_gemini(key);
    }
    case "openai": {
      const key = process.env["OPENAI_API_KEY"];
      if (!key) throw new Error("OPENAI_API_KEY not set");
      return make_openai(key);
    }
    case "voyage": {
      const key = process.env["VOYAGE_API_KEY"];
      if (!key) throw new Error("VOYAGE_API_KEY not set");
      return make_voyage(key);
    }
    case "ollama":
      return make_ollama();
    default:
      throw new Error(`Unknown provider: ${name}`);
  }
}

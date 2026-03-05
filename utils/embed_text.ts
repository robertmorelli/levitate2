export const DEFAULT_MODEL = process.env.OLLAMA_EMBED_MODEL ?? "bge-small-en-v1.5";

interface OllamaEmbeddingResponse {
  embedding: number[];
}

export async function embed_text(text: string, model: string = DEFAULT_MODEL): Promise<number[]> {
  const res = await fetch("http://127.0.0.1:11434/api/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, prompt: text }),
  });

  if (!res.ok) {
    throw new Error(`Ollama embedding request failed: ${res.status}`);
  }

  const json = (await res.json()) as OllamaEmbeddingResponse;
  if (!Array.isArray(json.embedding)) {
    throw new Error("Ollama response missing embedding array");
  }

  return json.embedding;
}

export default embed_text;

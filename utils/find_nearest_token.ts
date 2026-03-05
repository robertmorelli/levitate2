import { createRequire } from "node:module";
import type { BruteforceSearch as BruteforceSearchType } from "hnswlib-node";

const require = createRequire(import.meta.url);
const { BruteforceSearch } = require("hnswlib-node") as {
  BruteforceSearch: typeof BruteforceSearchType;
};

export type NearestTokenFn = (query: number[]) => string;

/**
 * Build a cosine nearest-neighbor searcher over the given token vectors.
 * Returns a synchronous search function.
 */
export function build_nearest_token_fn(
  vectors: Record<string, number[]>
): NearestTokenFn {
  const entries = Object.entries(vectors);
  if (entries.length === 0) return () => "";

  const dim = entries[0]![1].length;
  const index = new BruteforceSearch("cosine", dim);
  index.initIndex(entries.length);
  entries.forEach(([, vec], i) => index.addPoint(vec, i));

  const tokens = entries.map(([token]) => token);
  return (query) => {
    const { neighbors } = index.searchKnn(query, 1, undefined);
    return tokens[neighbors[0] ?? 0] ?? "";
  };
}

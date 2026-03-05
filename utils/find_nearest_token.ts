import { createRequire } from "node:module";
import type { BruteforceSearch as BruteforceSearchType } from "hnswlib-node";

const require = createRequire(import.meta.url);
const { BruteforceSearch } = require("hnswlib-node") as {
  BruteforceSearch: typeof BruteforceSearchType;
};

export type NearestTokenFn = (query: number[]) => string;
export type NearestMetric = "cosine" | "l2" | "ip" | "dot";
export const NEAREST_METRICS: NearestMetric[] = ["cosine", "l2", "ip", "dot"];

export function parse_nearest_metric(raw: string | undefined): NearestMetric {
  const metric = (raw ?? "cosine").trim().toLowerCase() as NearestMetric;
  if (!NEAREST_METRICS.includes(metric)) {
    throw new Error(`Invalid nearest metric '${raw}'. Expected one of: ${NEAREST_METRICS.join(", ")}`);
  }
  return metric;
}

export function parse_nearest_metric_list(raw: string | undefined): NearestMetric[] {
  const parts = (raw ?? "cosine")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const unique = new Set<NearestMetric>();
  for (const p of parts) unique.add(parse_nearest_metric(p));
  if (unique.size === 0) unique.add("cosine");
  return [...unique];
}

function to_hnsw_space(metric: NearestMetric): "cosine" | "l2" | "ip" {
  return metric === "dot" ? "ip" : metric;
}

/**
 * Build a nearest-neighbor searcher over the given token vectors.
 * Returns a synchronous search function.
 */
export function build_nearest_token_fn(
  vectors: Record<string, number[]>,
  metric: NearestMetric = "cosine"
): NearestTokenFn {
  const entries = Object.entries(vectors);
  if (entries.length === 0) return () => "";

  const dim = entries[0]![1].length;
  const index = new BruteforceSearch(to_hnsw_space(metric), dim);
  index.initIndex(entries.length);
  entries.forEach(([, vec], i) => index.addPoint(vec, i));

  const tokens = entries.map(([token]) => token);
  return (query) => {
    const { neighbors } = index.searchKnn(query, 1, undefined);
    return tokens[neighbors[0] ?? 0] ?? "";
  };
}

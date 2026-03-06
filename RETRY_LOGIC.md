# Retry / Correction Logic Ideas

The core premise: after one lift pass, compile the result back to PTX, compare it to the
target PTX, and use the error signal to correct the input vectors before re-lifting.
This is a roundtrip feedback loop. All ideas below are parameterizable as a "correction
algorithm" that transforms `(source_tokens, source_vectors, result_ptx, target_ptx) →
new_source_vectors` for a second (or nth) lift pass.

---

## 1. Instruction-set residual pursuit

**Idea**: Compute the multiset difference between target PTX instruction signatures and
result PTX instruction signatures. Embed the missing signatures, sum them into a residual
vector, and lift that residual to get correction LLVM tokens to append.

**Details**:
- `missing = bag(target_sigs) - bag(result_sigs)` — instructions that are in target but
  not yet reproduced
- Embed each missing signature using the PTX embedding, sum → `r`
- Run arithmetic_opt-style pursuit on `r` → extra LLVM tokens
- Append to existing token sequence, recompile, re-score

**Why it might work**: The missing instructions are exactly the semantic gap. Embedding
their signatures and pursuing the nearest LLVM tokens is the most direct signal available.

**Risk**: Ignores ordering — the correction tokens get appended, not inserted at the right
position. Good for bag-overlap score improvement, poor for seq_lcs.

---

## 2. Per-position vector perturbation (gradient-free)

**Idea**: For each source token i where the lifted result diverged, nudge the context
vector at position i by a small delta in the direction of the "correct" LLVM embedding
minus the "produced" LLVM embedding.

**Details**:
- For each produced LLVM token `p` at position i that doesn't match expected, compute:
  `delta = embed(correct_llvm) - embed(produced_llvm)` (if we can infer the correct one)
- New context vector: `ctx[i] += alpha * delta`
- Re-lift with corrected context vectors

**Why it might work**: Directly corrects the input to the nearest-neighbor lookup.
Equivalent to one step of coordinate descent in embedding space.

**Risk**: Requires knowing which LLVM token was "correct" at each position — hard to
determine without full alignment between PTX and LLVM sequences.

---

## 3. Global mean-vector shift

**Idea**: Embed all target PTX instructions, compute their mean `T`. Embed all result PTX
instructions, compute their mean `R`. The shift `T - R` is the aggregate error direction.
Add a fraction of `T - R` to every source context vector and re-lift.

**Details**:
- `shift = mean(embed(target_sigs)) - mean(embed(result_sigs))`
- `new_ctx[i] = ctx[i] + beta * shift`  (beta ∈ [0.1, 0.5])
- Re-lift with shifted vectors

**Why it might work**: If the lift is systematically biased toward the wrong region of
embedding space, a global shift corrects the bias. Cheap — one extra vector op per token.

**Risk**: A single global shift is too blunt. Works best when the error is a consistent
type (e.g. always producing float ops when integers are needed).

---

## 4. Instruction-class reweighting

**Idea**: Classify target instructions into groups (float, int, memory, control, cast).
Compute the ratio of each class in target vs result. Reweight context vectors by
multiplying components in the direction of under-represented classes.

**Details**:
- Compute class centroids in PTX embedding space: `C_float`, `C_int`, `C_mem`, etc.
- For each class k, compute scale factor: `s_k = count_k(target) / max(1, count_k(result))`
- New context vector: `ctx[i] += sum_k (s_k - 1) * dot(ctx[i], C_k) * C_k`
  (i.e., amplify the component in under-represented class directions)

**Why it might work**: complex_kernel fails partly because the lift collapses integer ops
into float ops. This explicitly boosts the integer/control class signal.

**Risk**: Class centroids must be precomputed and stored. Requires good class separation
in embedding space.

---

## 5. Sequence alignment guided correction (hard)

**Idea**: Run a sequence alignment (Smith-Waterman or DTW) between target PTX signature
sequence and result PTX signature sequence. For each matched pair (target_i, result_j),
if they differ, push the context vector for the source token that produced result_j toward
the embedding of target_i.

**Details**:
- Align `target_sigs[0..n]` to `result_sigs[0..m]` using PTX embedding similarity as the
  match score
- For mismatched pairs: `correction[source_pos] += embed(target_sig_i) - embed(result_sig_j)`
- Sum corrections per source position, re-lift

**Why it might work**: Most principled approach. Directly maps "what we got" to "what we
wanted" at each position and computes a targeted correction.

**Risk**: High complexity. Alignment is O(n*m). Requires a reliable alignment score
(embedding similarity between instruction signatures may be noisy). Can fail badly if
insertion/deletion patterns are heavy.

---

## 6. Temperature annealing on nearest-neighbor selection

**Idea**: Instead of always picking the single nearest LLVM token, sample from a softmax
distribution over the top-k nearest LLVM tokens, with temperature decreasing across
retry iterations.

**Details**:
- Iteration 1: high temperature → sample from top-5 neighbors (explore)
- Iteration 2..n: lower temperature → sharper distribution (exploit best seen)
- Keep the candidate with the highest score across all iterations

**Why it might work**: The nearest-neighbor lookup is greedy and can get stuck in a local
optimum in embedding space. Temperature sampling provides escape.

**Risk**: Non-deterministic; requires multiple compiles per iteration. More of a stochastic
search than a correction.

---

## 7. PTX-to-LLVM embedding space bridge correction

**Idea**: After a failed lift, train (or use) a small linear projection `M` that maps PTX
embedding vectors to LLVM embedding vectors more accurately. Apply `M` to the source
context vectors before re-lifting instead of relying on raw cosine similarity across spaces.

**Details**:
- Collect (PTX token, correct LLVM token) pairs from all examples where lift succeeded
- Fit a least-squares linear map: `M = argmin ||M * PTX_vecs - LLVM_vecs||`
- Use `M @ ctx[i]` as the query vector for nearest-LLVM lookup instead of `ctx[i]` directly

**Why it might work**: The PTX and LLVM embedding spaces are produced by different
descriptions and may be misaligned. A learned bridge can correct for systematic offset/
rotation between spaces.

**Risk**: Requires enough ground-truth (PTX, LLVM) pairs to fit M. Bootstrapping problem:
you need correct lifts to learn the bridge, but the bridge is needed to get correct lifts.
Solve by using the simple examples (add_fma, fma_rcp, etc.) which already score well.

---

## Implementation notes

- All of these should share a common interface:
  ```ts
  type CorrectionFn = (
    source_tokens: string[],
    context_vectors: number[][],
    result_ptx: string,
    target_ptx: string,
    ctx: LiftContext
  ) => number[][];  // corrected context vectors
  ```
- Register via `register_correction(name, fn)` analogous to `register_conv`.
- The examine tool should accept an optional `--correction=<name> --iterations=<n>` to
  run the roundtrip loop and report per-iteration scores.
- Ideas 1, 3, and 4 are cheapest to implement and most likely to produce visible improvement
  on complex_kernel in the near term.

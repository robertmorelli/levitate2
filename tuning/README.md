# Tuning

This folder contains vector-tuning implementations and a registry used by `npm run tuned`.

## Files

- `registry.ts`: central tuner registry (`tuner_registry`) and shared sample/dictionary interfaces.
- `arithmetic_tuning.ts`: `arithmetic_omp` and `dynamic_stack` tuner implementations.
- `arithmetic_dynamic_stack_healing_v2.ts`: `dynamic_stack_v2` tuner implementation.
- `out/`: generated tuned vector maps (ignored by git).

## Running

```bash
npm run tuned -- <conv> <alg> <tuner> <holdout> [epochs=1] [ptx_vectors] [llvm_vectors]
```

Example:

```bash
npm run tuned -- causal dynamic_stack_healing_v2 dynamic_stack_v2 complex_kernel 3
```

Behavior:

1. Use all `examples/*.ptx` except `<holdout>` as training set.
2. Tune vectors through selected `<tuner>`.
3. Re-score holdout with tuned vectors.
4. Write tuned vector JSON files under `tuning/out/`.


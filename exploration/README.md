# Exploration

This folder contains focused experiments for deciding next steps.

## Experiment 1: 32-cell semantic drift

Goal:
- Take a known-good LLVM IR / PTX pair.
- Convert each side to token vectors.
- Blur each sequence into 32 cells.
- Subtract cell-by-cell to get a 32 x vector drift map.

Run:

```bash
npm run explore:drift -- [ptx_file] [llvm_file] [cells]
```

Defaults:
- `ptx_file`: `examples/reference.ptx`
- `llvm_file`: `examples/reference.ll`
- `cells`: `32`

Outputs:
- `exploration/out/semantic_drift_32_<pair>.json`
- Console summary with mean/max drift and per-cell metrics.

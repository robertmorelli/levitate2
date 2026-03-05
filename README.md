# Levitate roundtrip results

Averaged jaccard similarity across **16 kernels**: `add_fma.ptx`, `add_fma_rcp.ptx`, `add_mul_rcp.ptx`, `add_only.ptx`, `add_rcp.ptx`, `all_ops.ptx`, `copy.ptx`, `fma_only.ptx`, `fma_rcp.ptx`, `mul_fma.ptx`, `mul_only.ptx`, `mul_rcp.ptx`, `non1to1_fma_source.ptx`, `rcp_only.ptx`, `reference.ptx`, `reference_big.ptx`

**Metric:** Jaccard similarity on PTX opcode sets (averaged across all kernels)

## gemini

### bare

> **Best avg:** `uniform × amplitude_sort` — **61%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 31% | 40% | 17% | 17% | 17% | 32% | 56% | 36% |
| gaussian | 17% | 33% | 31% | 17% | 17% | 17% | 17% | 58% | 33% |
| causal | 17% | 23% | 17% | 17% | 17% | 17% | 24% | 59% | 27% |
| uniform | 17% | 44% | 38% | 17% | 17% | 17% | 19% | **61%** | 30% |
| differential | 47% | 57% | 17% | 0% | 47% | 0% | 25% | 57% | 45% |
| ema | 17% | 20% | 19% | 17% | 17% | 17% | 32% | 57% | 35% |

### described

> **Best avg:** `identity × arithmetic_opt` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 85% | 83% | 80% | **100%** | 89% | 67% | 84% | 78% | 83% |
| gaussian | 89% | 78% | 79% | 74% | 89% | 53% | 25% | 80% | 80% |
| causal | 78% | 91% | 82% | 84% | 81% | 68% | 85% | 75% | 78% |
| uniform | 86% | 84% | 80% | 78% | 85% | 62% | 85% | 77% | 81% |
| differential | 65% | 76% | 98% | 0% | 65% | 0% | 98% | 79% | 93% |
| ema | 82% | 77% | 82% | **100%** | 83% | 74% | 85% | 78% | 86% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+68%** | **+52%** | **+41%** | **+83%** | **+72%** | **+49%** | **+52%** | **+22%** | **+47%** |
| gaussian | **+71%** | **+45%** | **+48%** | **+56%** | **+71%** | **+36%** | **+8%** | **+22%** | **+47%** |
| causal | **+61%** | **+68%** | **+64%** | **+67%** | **+64%** | **+50%** | **+60%** | **+16%** | **+51%** |
| uniform | **+69%** | **+41%** | **+43%** | **+60%** | **+68%** | **+45%** | **+65%** | **+16%** | **+52%** |
| differential | **+18%** | **+18%** | **+81%** | 0% | **+18%** | 0% | **+73%** | **+22%** | **+49%** |
| ema | **+65%** | **+57%** | **+63%** | **+83%** | **+65%** | **+57%** | **+53%** | **+21%** | **+51%** |

## ollama

### bare

> **Best avg:** `identity × per_token` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 52% | **64%** | **64%** | 17% | 52% | 52% | 60% | 52% | 52% |
| gaussian | 52% | 52% | 52% | 17% | 52% | 52% | 58% | 52% | 52% |
| causal | 52% | 52% | 52% | 17% | 52% | 52% | 60% | 52% | 52% |
| uniform | 52% | 52% | 52% | 17% | 52% | 52% | 60% | 52% | 52% |
| differential | 52% | 63% | 64% | 0% | 52% | 34% | 63% | 52% | 62% |
| ema | 52% | 52% | 52% | 17% | 52% | 52% | 60% | 52% | 52% |

### described

> **Best avg:** `identity × arithmetic_opt` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 28% | 82% | 75% | **100%** | 22% | 17% | 77% | 75% | 80% |
| gaussian | 27% | 77% | 73% | 64% | 22% | 17% | 25% | 73% | 78% |
| causal | 17% | 82% | 61% | 56% | 17% | 17% | 80% | 73% | 75% |
| uniform | 28% | 82% | 77% | 80% | 25% | 17% | 80% | 73% | 83% |
| differential | 67% | 76% | 95% | 0% | 67% | 12% | 93% | 69% | 86% |
| ema | 28% | 90% | 74% | 99% | 22% | 55% | 81% | 76% | 78% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -24% | **+18%** | **+11%** | **+83%** | -30% | -35% | **+17%** | **+22%** | **+28%** |
| gaussian | -25% | **+25%** | **+21%** | **+47%** | -30% | -35% | -33% | **+21%** | **+26%** |
| causal | -35% | **+30%** | **+9%** | **+39%** | -35% | -35% | **+20%** | **+21%** | **+23%** |
| uniform | -24% | **+30%** | **+24%** | **+63%** | -27% | -35% | **+20%** | **+21%** | **+31%** |
| differential | **+14%** | **+13%** | **+31%** | 0% | **+14%** | -22% | **+30%** | **+17%** | **+24%** |
| ema | -24% | **+38%** | **+22%** | **+82%** | -30% | **+2%** | **+21%** | **+24%** | **+26%** |

## openai

### bare

> **Best avg:** `differential × amplitude_sort` — **53%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 52% | 17% | 15% | 17% | 17% | 17% | 37% | 17% |
| gaussian | 17% | 17% | 17% | 15% | 17% | 17% | 17% | 32% | 17% |
| causal | 17% | 17% | 17% | 16% | 17% | 17% | 17% | 33% | 17% |
| uniform | 17% | 17% | 17% | 16% | 17% | 17% | 17% | 35% | 17% |
| differential | 23% | 34% | 17% | 0% | 23% | 0% | 17% | **53%** | 17% |
| ema | 17% | 17% | 17% | 16% | 17% | 17% | 17% | 34% | 17% |

### described

> **Best avg:** `identity × arithmetic_opt` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 74% | 52% | 52% | **100%** | 75% | 50% | 52% | 68% | 89% |
| gaussian | 76% | 80% | 70% | 70% | 75% | 50% | 21% | 78% | 76% |
| causal | 74% | 79% | 77% | 95% | 77% | 31% | 52% | 73% | 72% |
| uniform | 76% | 80% | 68% | 66% | 76% | 50% | 52% | 81% | 77% |
| differential | 17% | 52% | 85% | 0% | 30% | 0% | 85% | 51% | 58% |
| ema | 73% | 82% | 74% | 96% | 75% | 27% | 94% | 66% | 75% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+57%** | 0% | **+35%** | **+85%** | **+58%** | **+33%** | **+35%** | **+31%** | **+72%** |
| gaussian | **+59%** | **+62%** | **+53%** | **+55%** | **+58%** | **+33%** | **+3%** | **+46%** | **+58%** |
| causal | **+57%** | **+62%** | **+60%** | **+79%** | **+60%** | **+13%** | **+35%** | **+40%** | **+54%** |
| uniform | **+58%** | **+63%** | **+51%** | **+51%** | **+58%** | **+33%** | **+35%** | **+46%** | **+60%** |
| differential | -5% | **+19%** | **+67%** | 0% | **+8%** | 0% | **+67%** | -2% | **+41%** |
| ema | **+56%** | **+65%** | **+56%** | **+80%** | **+58%** | **+10%** | **+76%** | **+32%** | **+58%** |

## summary

| provider | bare avg best | described avg best |
| --- | --- | --- |
| gemini | 61% (`uniform × amplitude_sort`) | 100% (`identity × arithmetic_opt`) |
| ollama | 64% (`identity × per_token`) | 100% (`identity × arithmetic_opt`) |
| openai | 53% (`differential × amplitude_sort`) | 100% (`identity × arithmetic_opt`) |

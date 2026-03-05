# Levitate roundtrip results

Averaged jaccard similarity across **16 kernels**: `add_fma.ptx`, `add_fma_rcp.ptx`, `add_mul_rcp.ptx`, `add_only.ptx`, `add_rcp.ptx`, `all_ops.ptx`, `copy.ptx`, `fma_only.ptx`, `fma_rcp.ptx`, `mul_fma.ptx`, `mul_only.ptx`, `mul_rcp.ptx`, `non1to1_fma_source.ptx`, `rcp_only.ptx`, `reference.ptx`, `reference_big.ptx`

**Metric:** Jaccard similarity on PTX opcode sets (averaged across all kernels)

## gemini

### bare

> **Best avg:** `differential × arithmetic` — **93%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 29% | 81% | 89% | 26% | 17% | 40% | 76% | 77% |
| gaussian | 29% | 17% | 55% | 29% | 17% | 17% | 75% | 80% |
| causal | 26% | 35% | 59% | 26% | 17% | 22% | 74% | 82% |
| uniform | 29% | 42% | 69% | 29% | 17% | 17% | 75% | 80% |
| differential | 71% | 83% | **93%** | 70% | 0% | 32% | 68% | 89% |
| ema | 29% | 52% | 69% | 29% | 17% | 27% | 71% | 85% |

### described

> **Best avg:** `differential × delta_decode` — **98%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 85% | 83% | 80% | 89% | 67% | 84% | 78% | 83% |
| gaussian | 89% | 78% | 79% | 89% | 53% | 25% | 80% | 80% |
| causal | 78% | 91% | 82% | 81% | 68% | 85% | 75% | 78% |
| uniform | 86% | 84% | 80% | 85% | 62% | 85% | 77% | 81% |
| differential | 65% | 76% | 98% | 65% | 0% | **98%** | 79% | 93% |
| ema | 82% | 77% | 82% | 83% | 74% | 85% | 78% | 86% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+57%** | **+2%** | -8% | **+63%** | **+49%** | **+43%** | **+2%** | **+6%** |
| gaussian | **+60%** | **+61%** | **+24%** | **+60%** | **+36%** | **+8%** | **+5%** | **+1%** |
| causal | **+52%** | **+56%** | **+22%** | **+55%** | **+50%** | **+63%** | **+1%** | -3% |
| uniform | **+58%** | **+42%** | **+12%** | **+57%** | **+45%** | **+67%** | **+2%** | **+1%** |
| differential | -6% | -8% | **+5%** | -6% | 0% | **+66%** | **+10%** | **+5%** |
| ema | **+54%** | **+24%** | **+13%** | **+54%** | **+57%** | **+57%** | **+7%** | **+1%** |

## ollama

### bare

> **Best avg:** `identity × per_token` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 52% | **64%** | **64%** | 52% | 52% | 60% | 52% | 52% |
| gaussian | 52% | 52% | 52% | 52% | 52% | 58% | 52% | 52% |
| causal | 52% | 52% | 52% | 52% | 52% | 60% | 52% | 52% |
| uniform | 52% | 52% | 52% | 52% | 52% | 60% | 52% | 52% |
| differential | 52% | 63% | 64% | 52% | 34% | 63% | 52% | 62% |
| ema | 52% | 52% | 52% | 52% | 52% | 60% | 52% | 52% |

### described

> **Best avg:** `differential × arithmetic` — **95%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 28% | 82% | 75% | 22% | 17% | 77% | 75% | 80% |
| gaussian | 27% | 77% | 73% | 22% | 17% | 25% | 73% | 78% |
| causal | 17% | 82% | 61% | 17% | 17% | 80% | 73% | 75% |
| uniform | 28% | 82% | 77% | 25% | 17% | 80% | 73% | 83% |
| differential | 67% | 76% | **95%** | 67% | 12% | 93% | 69% | 86% |
| ema | 28% | 90% | 74% | 22% | 55% | 81% | 76% | 78% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -24% | **+18%** | **+11%** | -30% | -35% | **+17%** | **+22%** | **+28%** |
| gaussian | -25% | **+25%** | **+21%** | -30% | -35% | -33% | **+21%** | **+26%** |
| causal | -35% | **+30%** | **+9%** | -35% | -35% | **+20%** | **+21%** | **+23%** |
| uniform | -24% | **+30%** | **+24%** | -27% | -35% | **+20%** | **+21%** | **+31%** |
| differential | **+14%** | **+13%** | **+31%** | **+14%** | -22% | **+30%** | **+17%** | **+24%** |
| ema | -24% | **+38%** | **+22%** | -30% | **+2%** | **+21%** | **+24%** | **+26%** |

## openai

### bare

> **Best avg:** `ema × amplitude_sort` — **70%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 35% | 39% | 33% | 42% | 17% | 28% | 48% | 37% |
| gaussian | 38% | 17% | 17% | 40% | 17% | 19% | 56% | 50% |
| causal | 29% | 17% | 17% | 34% | 17% | 39% | 56% | 51% |
| uniform | 38% | 17% | 17% | 40% | 17% | 19% | 54% | 50% |
| differential | 17% | 32% | 34% | 17% | 0% | 38% | 54% | 32% |
| ema | 31% | 17% | 17% | 38% | 17% | 37% | **70%** | 58% |

### described

> **Best avg:** `differential × conv_residual` — **96%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 73% | 92% | 78% | 76% | 50% | 80% | 75% | 83% |
| gaussian | 75% | 76% | 78% | 77% | 50% | 20% | 76% | 80% |
| causal | 74% | 86% | 84% | 78% | 31% | 80% | 77% | 84% |
| uniform | 78% | 80% | 78% | 78% | 50% | 80% | 77% | 80% |
| differential | 66% | 80% | 91% | 66% | 0% | 90% | 73% | **96%** |
| ema | 69% | 85% | 83% | 74% | 77% | 84% | 82% | 84% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+38%** | **+53%** | **+45%** | **+33%** | **+33%** | **+52%** | **+27%** | **+46%** |
| gaussian | **+37%** | **+59%** | **+60%** | **+37%** | **+33%** | **+1%** | **+20%** | **+30%** |
| causal | **+45%** | **+68%** | **+66%** | **+44%** | **+13%** | **+42%** | **+21%** | **+33%** |
| uniform | **+40%** | **+63%** | **+61%** | **+38%** | **+33%** | **+61%** | **+23%** | **+30%** |
| differential | **+49%** | **+48%** | **+57%** | **+49%** | 0% | **+52%** | **+18%** | **+64%** |
| ema | **+38%** | **+67%** | **+65%** | **+36%** | **+60%** | **+47%** | **+12%** | **+25%** |

## summary

| provider | bare avg best | described avg best |
| --- | --- | --- |
| gemini | 93% (`differential × arithmetic`) | 98% (`differential × delta_decode`) |
| ollama | 64% (`identity × per_token`) | 95% (`differential × arithmetic`) |
| openai | 70% (`ema × amplitude_sort`) | 96% (`differential × conv_residual`) |

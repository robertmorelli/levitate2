# Levitate roundtrip results

Averaged instruction similarity across **20 kernels**: `add_fma.ptx`, `add_fma_rcp.ptx`, `add_mul_rcp.ptx`, `add_only.ptx`, `add_rcp.ptx`, `all_ops.ptx`, `complex_kernel.ptx`, `copy.ptx`, `fma_only.ptx`, `fma_rcp.ptx`, `medium_blend.ptx`, `medium_int_mix.ptx`, `medium_loop_mix.ptx`, `mul_fma.ptx`, `mul_only.ptx`, `mul_rcp.ptx`, `non1to1_fma_source.ptx`, `rcp_only.ptx`, `reference.ptx`, `reference_big.ptx`

**Metric:** Weighted PTX instruction similarity (sequence + multiplicity + set + exact bonus), averaged across kernels

## gemini

### bare

> **Best avg:** `uniform × amplitude_sort` — **46%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 20% | 20% | 16% | 16% | 16% | 21% | 34% | 21% | 18% | 19% |
| gaussian | 16% | 25% | 23% | 16% | 16% | 16% | 16% | 41% | 17% | 16% | 17% |
| causal | 16% | 22% | 15% | 16% | 16% | 16% | 18% | 42% | 19% | 16% | 15% |
| uniform | 16% | 31% | 29% | 16% | 16% | 16% | 17% | **46%** | 20% | 16% | 20% |
| differential | 24% | 45% | 16% | 0% | 24% | 0% | 21% | 36% | 25% | 0% | 18% |
| ema | 16% | 18% | 17% | 16% | 16% | 16% | 21% | 41% | 21% | 16% | 16% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 37% | 31% | **69%** | 57% | 49% | 41% | 39% | 40% | 50% | 27% |
| gaussian | 58% | 37% | 32% | 51% | 57% | 43% | 18% | 39% | 42% | 43% | 29% |
| causal | 60% | 38% | 31% | 61% | 59% | 52% | 41% | 37% | 40% | 51% | 24% |
| uniform | 59% | 38% | 33% | 52% | 58% | 47% | 41% | 38% | 41% | 43% | 29% |
| differential | 46% | 50% | 49% | 0% | 46% | 0% | 49% | 50% | 50% | 0% | 17% |
| ema | 57% | 38% | 32% | **69%** | 56% | 54% | 43% | 40% | 44% | 50% | 25% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+42%** | **+18%** | **+11%** | **+53%** | **+41%** | **+33%** | **+20%** | **+5%** | **+19%** | **+32%** | **+8%** |
| gaussian | **+43%** | **+12%** | **+9%** | **+36%** | **+41%** | **+27%** | **+2%** | -2% | **+25%** | **+27%** | **+12%** |
| causal | **+44%** | **+16%** | **+16%** | **+45%** | **+44%** | **+36%** | **+24%** | -5% | **+21%** | **+35%** | **+9%** |
| uniform | **+43%** | **+7%** | **+4%** | **+36%** | **+42%** | **+31%** | **+24%** | -8% | **+21%** | **+28%** | **+9%** |
| differential | **+22%** | **+5%** | **+33%** | 0% | **+22%** | 0% | **+28%** | **+14%** | **+26%** | 0% | -1% |
| ema | **+41%** | **+20%** | **+15%** | **+53%** | **+41%** | **+39%** | **+22%** | -1% | **+23%** | **+35%** | **+9%** |

## ollama

### bare

> **Best avg:** `differential × per_token` — **40%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 29% | 30% | 16% | 26% | 25% | 40% | 31% | 35% | 16% | 25% |
| gaussian | 26% | 23% | 31% | 16% | 26% | 26% | 33% | 31% | 34% | 16% | 23% |
| causal | 27% | 23% | 27% | 16% | 27% | 25% | 40% | 31% | 35% | 16% | 24% |
| uniform | 26% | 23% | 30% | 16% | 26% | 25% | 38% | 31% | 35% | 16% | 23% |
| differential | 31% | **40%** | 37% | 0% | 31% | 21% | 37% | 34% | 40% | 0% | 20% |
| ema | 27% | 24% | 27% | 16% | 27% | 25% | 29% | 31% | 35% | 16% | 24% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 22% | 39% | 39% | **69%** | 18% | 16% | 41% | 42% | 42% | 43% | 26% |
| gaussian | 22% | 36% | 33% | 47% | 18% | 16% | 18% | 39% | 46% | 24% | 24% |
| causal | 15% | 39% | 26% | 42% | 15% | 16% | 42% | 38% | 46% | 36% | 20% |
| uniform | 22% | 39% | 35% | 59% | 20% | 16% | 41% | 39% | 50% | 29% | 25% |
| differential | 36% | 49% | 49% | 0% | 36% | 12% | 49% | 43% | 51% | 0% | 17% |
| ema | 22% | 37% | 43% | 69% | 18% | 37% | 36% | 36% | 45% | 49% | 18% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -4% | **+10%** | **+8%** | **+53%** | -8% | -10% | **+1%** | **+12%** | **+7%** | **+27%** | **+1%** |
| gaussian | -4% | **+14%** | **+3%** | **+31%** | -8% | -10% | -15% | **+8%** | **+12%** | **+9%** | 0% |
| causal | -12% | **+16%** | 0% | **+26%** | -12% | -10% | **+2%** | **+7%** | **+12%** | **+21%** | -4% |
| uniform | -4% | **+15%** | **+6%** | **+43%** | -6% | -10% | **+3%** | **+8%** | **+16%** | **+13%** | **+2%** |
| differential | **+5%** | **+9%** | **+11%** | 0% | **+5%** | -9% | **+12%** | **+9%** | **+10%** | 0% | -3% |
| ema | -5% | **+13%** | **+17%** | **+53%** | -9% | **+12%** | **+6%** | **+5%** | **+11%** | **+33%** | -6% |

## openai

### bare

> **Best avg:** `differential × amplitude_sort` — **25%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 17% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 17% | 16% | 0% | 16% | 15% | 16% | **25%** | 16% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

### described

> **Best avg:** `ema × arithmetic_opt` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 26% | 64% | 23% | 16% | 37% | 33% | 40% | 63% | 22% |
| gaussian | 27% | 45% | 45% | 26% | 26% | 16% | 49% | 36% | 36% | 26% | 30% |
| causal | 17% | 28% | 29% | 64% | 16% | 16% | 39% | 35% | 52% | 62% | 24% |
| uniform | 27% | 38% | 44% | 37% | 27% | 16% | 42% | 36% | 35% | 37% | 24% |
| differential | 18% | 36% | 37% | 0% | 18% | 19% | 37% | 35% | 40% | 0% | 20% |
| ema | 25% | 29% | 29% | **64%** | 25% | 16% | 40% | 39% | 44% | 62% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+9%** | **+10%** | **+10%** | **+48%** | **+7%** | 0% | **+21%** | **+17%** | **+24%** | **+48%** | **+7%** |
| gaussian | **+11%** | **+29%** | **+29%** | **+10%** | **+10%** | 0% | **+34%** | **+21%** | **+20%** | **+10%** | **+15%** |
| causal | **+1%** | **+12%** | **+13%** | **+48%** | 0% | 0% | **+23%** | **+19%** | **+36%** | **+46%** | **+8%** |
| uniform | **+11%** | **+22%** | **+28%** | **+21%** | **+11%** | 0% | **+27%** | **+21%** | **+20%** | **+21%** | **+8%** |
| differential | **+2%** | **+19%** | **+22%** | 0% | **+2%** | **+5%** | **+22%** | **+10%** | **+25%** | 0% | **+5%** |
| ema | **+9%** | **+14%** | **+14%** | **+49%** | **+10%** | 0% | **+25%** | **+23%** | **+28%** | **+47%** | **+6%** |

## summary

| provider | bare avg best | described avg best |
| --- | --- | --- |
| gemini | 46% (`uniform × amplitude_sort`) | 69% (`identity × arithmetic_opt`) |
| ollama | 40% (`differential × per_token`) | 69% (`identity × arithmetic_opt`) |
| openai | 25% (`differential × amplitude_sort`) | 64% (`ema × arithmetic_opt`) |

# Levitate roundtrip results

Averaged instruction similarity across **20 kernels**: `add_fma.ptx`, `add_fma_rcp.ptx`, `add_mul_rcp.ptx`, `add_only.ptx`, `add_rcp.ptx`, `all_ops.ptx`, `complex_kernel.ptx`, `copy.ptx`, `fma_only.ptx`, `fma_rcp.ptx`, `medium_blend.ptx`, `medium_int_mix.ptx`, `medium_loop_mix.ptx`, `mul_fma.ptx`, `mul_only.ptx`, `mul_rcp.ptx`, `non1to1_fma_source.ptx`, `rcp_only.ptx`, `reference.ptx`, `reference_big.ptx`

**Metric:** Weighted PTX instruction similarity (sequence + multiplicity + set + exact bonus), averaged across kernels
**Nearest metrics tested:** `cosine`, `l2`, `ip`, `dot`

## gemini@cosine

### bare

> **Best avg:** `uniform × amplitude_sort` — **46%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 20% | 20% | 16% | 16% | 16% | 21% | 34% | 21% | 18% | 18% | 19% |
| gaussian | 16% | 25% | 23% | 16% | 16% | 16% | 16% | 41% | 17% | 16% | 16% | 17% |
| causal | 16% | 22% | 15% | 16% | 16% | 16% | 18% | 42% | 19% | 16% | 16% | 15% |
| uniform | 16% | 31% | 29% | 16% | 16% | 16% | 17% | **46%** | 20% | 16% | 16% | 20% |
| differential | 24% | 45% | 16% | 0% | 24% | 0% | 21% | 36% | 25% | 0% | 0% | 18% |
| ema | 16% | 18% | 17% | 16% | 16% | 16% | 21% | 41% | 21% | 16% | 16% | 16% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 37% | 31% | **69%** | 57% | 49% | 41% | 39% | 40% | 50% | 50% | 27% |
| gaussian | 58% | 37% | 32% | 51% | 57% | 43% | 18% | 39% | 42% | 43% | 43% | 29% |
| causal | 60% | 38% | 31% | 61% | 59% | 52% | 41% | 37% | 40% | 51% | 51% | 24% |
| uniform | 59% | 38% | 33% | 52% | 58% | 47% | 41% | 38% | 41% | 43% | 44% | 29% |
| differential | 46% | 50% | 49% | 0% | 46% | 0% | 49% | 50% | 50% | 0% | 0% | 17% |
| ema | 57% | 38% | 32% | **69%** | 56% | 54% | 43% | 40% | 44% | 50% | 50% | 25% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+42%** | **+18%** | **+11%** | **+53%** | **+41%** | **+33%** | **+20%** | **+5%** | **+19%** | **+32%** | **+32%** | **+8%** |
| gaussian | **+43%** | **+12%** | **+9%** | **+36%** | **+41%** | **+27%** | **+2%** | -2% | **+25%** | **+27%** | **+27%** | **+12%** |
| causal | **+44%** | **+16%** | **+16%** | **+45%** | **+44%** | **+36%** | **+24%** | -5% | **+21%** | **+35%** | **+35%** | **+9%** |
| uniform | **+43%** | **+7%** | **+4%** | **+36%** | **+42%** | **+31%** | **+24%** | -8% | **+21%** | **+28%** | **+29%** | **+9%** |
| differential | **+22%** | **+5%** | **+33%** | 0% | **+22%** | 0% | **+28%** | **+14%** | **+26%** | 0% | 0% | -1% |
| ema | **+41%** | **+20%** | **+15%** | **+53%** | **+41%** | **+39%** | **+22%** | -1% | **+23%** | **+35%** | **+35%** | **+9%** |

## gemini@l2

### bare

> **Best avg:** `uniform × amplitude_sort` — **46%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 20% | 20% | 16% | 16% | 16% | 21% | 34% | 21% | 18% | 18% | 19% |
| gaussian | 16% | 25% | 23% | 16% | 16% | 16% | 16% | 41% | 17% | 16% | 16% | 17% |
| causal | 16% | 22% | 15% | 16% | 16% | 16% | 18% | 42% | 19% | 16% | 16% | 15% |
| uniform | 16% | 31% | 29% | 16% | 16% | 16% | 17% | **46%** | 20% | 16% | 16% | 20% |
| differential | 24% | 45% | 16% | 0% | 24% | 0% | 21% | 36% | 25% | 0% | 0% | 18% |
| ema | 16% | 18% | 17% | 16% | 16% | 16% | 21% | 41% | 21% | 16% | 16% | 16% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 37% | 31% | **69%** | 57% | 47% | 41% | 39% | 40% | 50% | 50% | 27% |
| gaussian | 58% | 37% | 32% | 51% | 57% | 41% | 18% | 39% | 42% | 43% | 43% | 29% |
| causal | 60% | 38% | 31% | 61% | 59% | 52% | 41% | 37% | 40% | 51% | 51% | 24% |
| uniform | 59% | 38% | 33% | 52% | 58% | 47% | 41% | 38% | 41% | 43% | 44% | 29% |
| differential | 46% | 50% | 49% | 0% | 46% | 0% | 49% | 50% | 50% | 0% | 0% | 17% |
| ema | 57% | 38% | 32% | **69%** | 56% | 54% | 43% | 40% | 44% | 50% | 50% | 25% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+42%** | **+18%** | **+11%** | **+53%** | **+41%** | **+31%** | **+20%** | **+5%** | **+19%** | **+32%** | **+32%** | **+8%** |
| gaussian | **+43%** | **+12%** | **+9%** | **+36%** | **+41%** | **+25%** | **+2%** | -2% | **+25%** | **+27%** | **+27%** | **+12%** |
| causal | **+44%** | **+16%** | **+16%** | **+45%** | **+44%** | **+36%** | **+24%** | -5% | **+21%** | **+35%** | **+35%** | **+9%** |
| uniform | **+43%** | **+7%** | **+4%** | **+36%** | **+42%** | **+32%** | **+24%** | -8% | **+21%** | **+28%** | **+29%** | **+9%** |
| differential | **+22%** | **+5%** | **+33%** | 0% | **+22%** | 0% | **+28%** | **+14%** | **+26%** | 0% | 0% | -1% |
| ema | **+41%** | **+20%** | **+15%** | **+53%** | **+41%** | **+38%** | **+22%** | -1% | **+23%** | **+35%** | **+35%** | **+9%** |

## gemini@ip

### bare

> **Best avg:** `uniform × amplitude_sort` — **46%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 20% | 20% | 16% | 16% | 16% | 21% | 34% | 21% | 18% | 18% | 19% |
| gaussian | 16% | 25% | 23% | 16% | 16% | 16% | 16% | 41% | 17% | 16% | 16% | 17% |
| causal | 16% | 22% | 15% | 16% | 16% | 16% | 18% | 42% | 19% | 16% | 16% | 15% |
| uniform | 16% | 31% | 29% | 16% | 16% | 16% | 17% | **46%** | 20% | 16% | 16% | 20% |
| differential | 24% | 45% | 16% | 0% | 24% | 0% | 21% | 36% | 25% | 0% | 0% | 18% |
| ema | 16% | 18% | 17% | 16% | 16% | 16% | 21% | 41% | 21% | 16% | 16% | 16% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 37% | 31% | **69%** | 57% | 49% | 41% | 39% | 40% | 50% | 50% | 27% |
| gaussian | 58% | 37% | 32% | 51% | 57% | 43% | 18% | 39% | 42% | 43% | 43% | 29% |
| causal | 60% | 38% | 31% | 61% | 59% | 52% | 41% | 37% | 40% | 51% | 51% | 24% |
| uniform | 59% | 38% | 33% | 52% | 58% | 47% | 41% | 38% | 41% | 43% | 44% | 29% |
| differential | 46% | 50% | 49% | 0% | 46% | 0% | 49% | 50% | 50% | 0% | 0% | 17% |
| ema | 57% | 38% | 32% | **69%** | 56% | 54% | 43% | 40% | 44% | 50% | 50% | 25% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+42%** | **+18%** | **+11%** | **+53%** | **+41%** | **+33%** | **+20%** | **+5%** | **+19%** | **+32%** | **+32%** | **+8%** |
| gaussian | **+43%** | **+12%** | **+9%** | **+36%** | **+41%** | **+27%** | **+2%** | -2% | **+25%** | **+27%** | **+27%** | **+12%** |
| causal | **+44%** | **+16%** | **+16%** | **+45%** | **+44%** | **+36%** | **+24%** | -5% | **+21%** | **+35%** | **+35%** | **+9%** |
| uniform | **+43%** | **+7%** | **+4%** | **+36%** | **+42%** | **+31%** | **+24%** | -8% | **+21%** | **+28%** | **+29%** | **+9%** |
| differential | **+22%** | **+5%** | **+33%** | 0% | **+22%** | 0% | **+28%** | **+14%** | **+26%** | 0% | 0% | -1% |
| ema | **+41%** | **+20%** | **+15%** | **+53%** | **+41%** | **+39%** | **+22%** | -1% | **+23%** | **+35%** | **+35%** | **+9%** |

## gemini@dot

### bare

> **Best avg:** `uniform × amplitude_sort` — **46%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 20% | 20% | 16% | 16% | 16% | 21% | 34% | 21% | 18% | 18% | 19% |
| gaussian | 16% | 25% | 23% | 16% | 16% | 16% | 16% | 41% | 17% | 16% | 16% | 17% |
| causal | 16% | 22% | 15% | 16% | 16% | 16% | 18% | 42% | 19% | 16% | 16% | 15% |
| uniform | 16% | 31% | 29% | 16% | 16% | 16% | 17% | **46%** | 20% | 16% | 16% | 20% |
| differential | 24% | 45% | 16% | 0% | 24% | 0% | 21% | 36% | 25% | 0% | 0% | 18% |
| ema | 16% | 18% | 17% | 16% | 16% | 16% | 21% | 41% | 21% | 16% | 16% | 16% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 37% | 31% | **69%** | 57% | 49% | 41% | 39% | 40% | 50% | 50% | 27% |
| gaussian | 58% | 37% | 32% | 51% | 57% | 43% | 18% | 39% | 42% | 43% | 43% | 29% |
| causal | 60% | 38% | 31% | 61% | 59% | 52% | 41% | 37% | 40% | 51% | 51% | 24% |
| uniform | 59% | 38% | 33% | 52% | 58% | 47% | 41% | 38% | 41% | 43% | 44% | 29% |
| differential | 46% | 50% | 49% | 0% | 46% | 0% | 49% | 50% | 50% | 0% | 0% | 17% |
| ema | 57% | 38% | 32% | **69%** | 56% | 54% | 43% | 40% | 44% | 50% | 50% | 25% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+42%** | **+18%** | **+11%** | **+53%** | **+41%** | **+33%** | **+20%** | **+5%** | **+19%** | **+32%** | **+32%** | **+8%** |
| gaussian | **+43%** | **+12%** | **+9%** | **+36%** | **+41%** | **+27%** | **+2%** | -2% | **+25%** | **+27%** | **+27%** | **+12%** |
| causal | **+44%** | **+16%** | **+16%** | **+45%** | **+44%** | **+36%** | **+24%** | -5% | **+21%** | **+35%** | **+35%** | **+9%** |
| uniform | **+43%** | **+7%** | **+4%** | **+36%** | **+42%** | **+31%** | **+24%** | -8% | **+21%** | **+28%** | **+29%** | **+9%** |
| differential | **+22%** | **+5%** | **+33%** | 0% | **+22%** | 0% | **+28%** | **+14%** | **+26%** | 0% | 0% | -1% |
| ema | **+41%** | **+20%** | **+15%** | **+53%** | **+41%** | **+39%** | **+22%** | -1% | **+23%** | **+35%** | **+35%** | **+9%** |

## ollama@cosine

### bare

> **Best avg:** `differential × per_token` — **40%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 29% | 30% | 16% | 26% | 25% | 40% | 31% | 35% | 16% | 16% | 25% |
| gaussian | 26% | 23% | 31% | 16% | 26% | 26% | 33% | 31% | 34% | 16% | 16% | 23% |
| causal | 27% | 23% | 27% | 16% | 27% | 25% | 40% | 31% | 35% | 16% | 16% | 24% |
| uniform | 26% | 23% | 30% | 16% | 26% | 25% | 38% | 31% | 35% | 16% | 16% | 23% |
| differential | 31% | **40%** | 37% | 0% | 31% | 21% | 37% | 34% | 40% | 0% | 0% | 20% |
| ema | 27% | 24% | 27% | 16% | 27% | 25% | 29% | 31% | 35% | 16% | 16% | 24% |

### described

> **Best avg:** `identity × arithmetic_opt` — **69%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 22% | 39% | 39% | **69%** | 18% | 16% | 41% | 42% | 42% | 43% | 43% | 26% |
| gaussian | 22% | 36% | 33% | 47% | 18% | 16% | 18% | 39% | 46% | 24% | 24% | 24% |
| causal | 15% | 39% | 26% | 42% | 15% | 16% | 42% | 38% | 46% | 36% | 36% | 20% |
| uniform | 22% | 39% | 35% | 59% | 20% | 16% | 41% | 39% | 50% | 29% | 29% | 25% |
| differential | 36% | 49% | 49% | 0% | 36% | 12% | 49% | 43% | 51% | 0% | 0% | 17% |
| ema | 22% | 37% | 43% | 69% | 18% | 37% | 36% | 36% | 45% | 49% | 49% | 18% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -4% | **+10%** | **+8%** | **+53%** | -8% | -10% | **+1%** | **+12%** | **+7%** | **+27%** | **+27%** | **+1%** |
| gaussian | -4% | **+14%** | **+3%** | **+31%** | -8% | -10% | -15% | **+8%** | **+12%** | **+9%** | **+9%** | 0% |
| causal | -12% | **+16%** | 0% | **+26%** | -12% | -10% | **+2%** | **+7%** | **+12%** | **+21%** | **+21%** | -4% |
| uniform | -4% | **+15%** | **+6%** | **+43%** | -6% | -10% | **+3%** | **+8%** | **+16%** | **+13%** | **+13%** | **+2%** |
| differential | **+5%** | **+9%** | **+11%** | 0% | **+5%** | -9% | **+12%** | **+9%** | **+10%** | 0% | 0% | -3% |
| ema | -5% | **+13%** | **+17%** | **+53%** | -9% | **+12%** | **+6%** | **+5%** | **+11%** | **+33%** | **+33%** | -6% |

## ollama@l2

### bare

> **Best avg:** `differential × conv_residual` — **54%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 27% | 29% | 16% | 0% | 27% | 33% | 16% | 29% | 40% | 0% | 16% | 16% |
| gaussian | 27% | 25% | 16% | 8% | 27% | 32% | 16% | 29% | 36% | 8% | 16% | 16% |
| causal | 28% | 26% | 16% | 0% | 28% | 33% | 16% | 29% | 40% | 2% | 16% | 16% |
| uniform | 27% | 25% | 16% | 8% | 27% | 32% | 16% | 29% | 36% | 8% | 16% | 16% |
| differential | 30% | 45% | 16% | 0% | 30% | 24% | 16% | 46% | **54%** | 0% | 0% | 16% |
| ema | 28% | 26% | 16% | 0% | 28% | 25% | 16% | 30% | 46% | 4% | 16% | 16% |

### described

> **Best avg:** `differential × conv_residual` — **52%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 35% | 16% | 16% | 15% | 16% | 16% | 42% | 38% | 16% | 43% | 16% |
| gaussian | 20% | 31% | 16% | 16% | 15% | 16% | 16% | 38% | 43% | 16% | 24% | 16% |
| causal | 15% | 34% | 16% | 16% | 15% | 16% | 16% | 37% | 44% | 16% | 36% | 16% |
| uniform | 20% | 33% | 16% | 16% | 18% | 16% | 16% | 38% | 44% | 16% | 29% | 16% |
| differential | 41% | 50% | 16% | 0% | 49% | 28% | 16% | 41% | **52%** | 0% | 0% | 16% |
| ema | 22% | 35% | 16% | 16% | 18% | 43% | 16% | 35% | 41% | 16% | 49% | 16% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -7% | **+6%** | 0% | **+16%** | -12% | -17% | 0% | **+13%** | -2% | **+16%** | **+27%** | 0% |
| gaussian | -7% | **+6%** | 0% | **+8%** | -12% | -16% | 0% | **+9%** | **+7%** | **+8%** | **+9%** | 0% |
| causal | -12% | **+8%** | 0% | **+16%** | -12% | -17% | 0% | **+8%** | **+4%** | **+13%** | **+21%** | 0% |
| uniform | -7% | **+9%** | 0% | **+8%** | -9% | -16% | 0% | **+10%** | **+8%** | **+8%** | **+13%** | 0% |
| differential | **+11%** | **+5%** | 0% | 0% | **+18%** | **+4%** | 0% | -4% | -2% | 0% | 0% | 0% |
| ema | -6% | **+9%** | 0% | **+16%** | -10% | **+18%** | 0% | **+5%** | -4% | **+11%** | **+33%** | 0% |

## ollama@ip

### bare

> **Best avg:** `differential × amplitude_sort` — **44%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 26% | 27% | 16% | 27% | 25% | 39% | 29% | 36% | 16% | 16% | 26% |
| gaussian | 27% | 25% | 29% | 16% | 27% | 26% | 31% | 29% | 36% | 16% | 16% | 22% |
| causal | 27% | 25% | 27% | 16% | 26% | 25% | 39% | 29% | 36% | 16% | 16% | 25% |
| uniform | 27% | 25% | 30% | 16% | 27% | 25% | 37% | 29% | 36% | 16% | 16% | 24% |
| differential | 30% | 42% | 37% | 0% | 32% | 21% | 38% | **44%** | 40% | 0% | 0% | 20% |
| ema | 27% | 26% | 27% | 16% | 28% | 25% | 30% | 29% | 35% | 16% | 16% | 24% |

### described

> **Best avg:** `identity × arithmetic_opt` — **66%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 18% | 41% | 39% | **66%** | 15% | 16% | 41% | 40% | 45% | 42% | 43% | 26% |
| gaussian | 20% | 37% | 34% | 54% | 15% | 16% | 18% | 39% | 48% | 29% | 24% | 25% |
| causal | 15% | 37% | 31% | 50% | 15% | 16% | 42% | 37% | 51% | 49% | 36% | 27% |
| uniform | 23% | 37% | 33% | 57% | 18% | 16% | 41% | 38% | 49% | 31% | 29% | 29% |
| differential | 38% | 49% | 49% | 0% | 48% | 12% | 49% | 42% | 52% | 0% | 0% | 17% |
| ema | 23% | 38% | 38% | 65% | 18% | 30% | 36% | 36% | 45% | 48% | 49% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -9% | **+15%** | **+12%** | **+50%** | -11% | -10% | **+2%** | **+12%** | **+9%** | **+26%** | **+27%** | 0% |
| gaussian | -7% | **+12%** | **+4%** | **+38%** | -12% | -10% | -13% | **+10%** | **+12%** | **+13%** | **+9%** | **+3%** |
| causal | -12% | **+12%** | **+4%** | **+34%** | -11% | -10% | **+3%** | **+8%** | **+15%** | **+33%** | **+21%** | **+2%** |
| uniform | -4% | **+11%** | **+3%** | **+41%** | -9% | -10% | **+4%** | **+10%** | **+13%** | **+16%** | **+13%** | **+6%** |
| differential | **+8%** | **+8%** | **+11%** | 0% | **+17%** | -9% | **+12%** | -2% | **+11%** | 0% | 0% | -3% |
| ema | -4% | **+12%** | **+11%** | **+50%** | -10% | **+5%** | **+6%** | **+7%** | **+11%** | **+32%** | **+33%** | -3% |

## ollama@dot

### bare

> **Best avg:** `differential × amplitude_sort` — **44%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 26% | 27% | 16% | 27% | 25% | 39% | 29% | 36% | 16% | 16% | 26% |
| gaussian | 27% | 25% | 29% | 16% | 27% | 26% | 31% | 29% | 36% | 16% | 16% | 22% |
| causal | 27% | 25% | 27% | 16% | 26% | 25% | 39% | 29% | 36% | 16% | 16% | 25% |
| uniform | 27% | 25% | 30% | 16% | 27% | 25% | 37% | 29% | 36% | 16% | 16% | 24% |
| differential | 30% | 42% | 37% | 0% | 32% | 21% | 38% | **44%** | 40% | 0% | 0% | 20% |
| ema | 27% | 26% | 27% | 16% | 28% | 25% | 30% | 29% | 35% | 16% | 16% | 24% |

### described

> **Best avg:** `identity × arithmetic_opt` — **66%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 18% | 41% | 39% | **66%** | 15% | 16% | 41% | 40% | 45% | 42% | 43% | 26% |
| gaussian | 20% | 37% | 34% | 54% | 15% | 16% | 18% | 39% | 48% | 29% | 24% | 25% |
| causal | 15% | 37% | 31% | 50% | 15% | 16% | 42% | 37% | 51% | 49% | 36% | 27% |
| uniform | 23% | 37% | 33% | 57% | 18% | 16% | 41% | 38% | 49% | 31% | 29% | 29% |
| differential | 38% | 49% | 49% | 0% | 48% | 12% | 49% | 42% | 52% | 0% | 0% | 17% |
| ema | 23% | 38% | 38% | 65% | 18% | 30% | 36% | 36% | 45% | 48% | 49% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -9% | **+15%** | **+12%** | **+50%** | -11% | -10% | **+2%** | **+12%** | **+9%** | **+26%** | **+27%** | 0% |
| gaussian | -7% | **+12%** | **+4%** | **+38%** | -12% | -10% | -13% | **+10%** | **+12%** | **+13%** | **+9%** | **+3%** |
| causal | -12% | **+12%** | **+4%** | **+34%** | -11% | -10% | **+3%** | **+8%** | **+15%** | **+33%** | **+21%** | **+2%** |
| uniform | -4% | **+11%** | **+3%** | **+41%** | -9% | -10% | **+4%** | **+10%** | **+13%** | **+16%** | **+13%** | **+6%** |
| differential | **+8%** | **+8%** | **+11%** | 0% | **+17%** | -9% | **+12%** | -2% | **+11%** | 0% | 0% | -3% |
| ema | -4% | **+12%** | **+11%** | **+50%** | -10% | **+5%** | **+6%** | **+7%** | **+11%** | **+32%** | **+33%** | -3% |

## openai@cosine

### bare

> **Best avg:** `differential × amplitude_sort` — **25%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 17% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 17% | 16% | 0% | 16% | 15% | 16% | **25%** | 16% | 0% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

### described

> **Best avg:** `ema × arithmetic_opt` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 26% | 64% | 23% | 16% | 37% | 33% | 40% | 63% | 63% | 22% |
| gaussian | 27% | 45% | 45% | 26% | 26% | 16% | 49% | 36% | 36% | 26% | 26% | 30% |
| causal | 17% | 28% | 29% | 64% | 16% | 16% | 39% | 35% | 52% | 62% | 62% | 24% |
| uniform | 27% | 38% | 44% | 37% | 27% | 16% | 42% | 36% | 35% | 37% | 37% | 24% |
| differential | 18% | 36% | 37% | 0% | 18% | 19% | 37% | 35% | 40% | 0% | 0% | 20% |
| ema | 25% | 29% | 29% | **64%** | 25% | 16% | 40% | 39% | 44% | 62% | 62% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+9%** | **+10%** | **+10%** | **+48%** | **+7%** | 0% | **+21%** | **+17%** | **+24%** | **+48%** | **+48%** | **+7%** |
| gaussian | **+11%** | **+29%** | **+29%** | **+10%** | **+10%** | 0% | **+34%** | **+21%** | **+20%** | **+10%** | **+10%** | **+15%** |
| causal | **+1%** | **+12%** | **+13%** | **+48%** | 0% | 0% | **+23%** | **+19%** | **+36%** | **+46%** | **+46%** | **+8%** |
| uniform | **+11%** | **+22%** | **+28%** | **+21%** | **+11%** | 0% | **+27%** | **+21%** | **+20%** | **+21%** | **+21%** | **+8%** |
| differential | **+2%** | **+19%** | **+22%** | 0% | **+2%** | **+5%** | **+22%** | **+10%** | **+25%** | 0% | 0% | **+5%** |
| ema | **+9%** | **+14%** | **+14%** | **+49%** | **+10%** | 0% | **+25%** | **+23%** | **+28%** | **+47%** | **+47%** | **+6%** |

## openai@l2

### bare

> **Best avg:** `differential × amplitude_sort` — **25%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 17% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 17% | 16% | 0% | 16% | 15% | 16% | **25%** | 16% | 0% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

### described

> **Best avg:** `ema × arithmetic_opt` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 26% | 64% | 23% | 16% | 37% | 33% | 40% | 63% | 63% | 22% |
| gaussian | 27% | 45% | 45% | 26% | 26% | 16% | 49% | 36% | 36% | 26% | 26% | 30% |
| causal | 17% | 28% | 29% | 64% | 16% | 16% | 39% | 35% | 52% | 62% | 62% | 24% |
| uniform | 27% | 38% | 44% | 37% | 27% | 16% | 42% | 36% | 35% | 37% | 37% | 24% |
| differential | 18% | 36% | 37% | 0% | 18% | 20% | 37% | 35% | 40% | 0% | 0% | 20% |
| ema | 25% | 29% | 29% | **64%** | 25% | 16% | 40% | 39% | 44% | 62% | 62% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+9%** | **+10%** | **+10%** | **+48%** | **+7%** | 0% | **+21%** | **+17%** | **+24%** | **+48%** | **+48%** | **+7%** |
| gaussian | **+11%** | **+29%** | **+29%** | **+10%** | **+10%** | 0% | **+34%** | **+21%** | **+20%** | **+10%** | **+10%** | **+15%** |
| causal | **+1%** | **+12%** | **+13%** | **+48%** | 0% | 0% | **+23%** | **+19%** | **+36%** | **+46%** | **+46%** | **+8%** |
| uniform | **+11%** | **+22%** | **+28%** | **+21%** | **+11%** | 0% | **+27%** | **+21%** | **+20%** | **+21%** | **+21%** | **+8%** |
| differential | **+2%** | **+19%** | **+22%** | 0% | **+2%** | **+5%** | **+22%** | **+10%** | **+25%** | 0% | 0% | **+5%** |
| ema | **+9%** | **+14%** | **+14%** | **+49%** | **+10%** | 0% | **+25%** | **+23%** | **+28%** | **+47%** | **+47%** | **+6%** |

## openai@ip

### bare

> **Best avg:** `differential × amplitude_sort` — **25%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 17% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 17% | 16% | 0% | 16% | 15% | 16% | **25%** | 16% | 0% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

### described

> **Best avg:** `ema × arithmetic_opt` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 26% | 64% | 23% | 16% | 37% | 33% | 40% | 63% | 63% | 22% |
| gaussian | 27% | 45% | 45% | 26% | 26% | 16% | 49% | 36% | 36% | 26% | 26% | 30% |
| causal | 17% | 28% | 29% | 64% | 16% | 16% | 39% | 35% | 52% | 62% | 62% | 24% |
| uniform | 27% | 38% | 44% | 37% | 27% | 16% | 42% | 36% | 35% | 37% | 37% | 24% |
| differential | 18% | 36% | 37% | 0% | 18% | 19% | 37% | 35% | 40% | 0% | 0% | 20% |
| ema | 25% | 29% | 29% | **64%** | 25% | 16% | 40% | 39% | 44% | 62% | 62% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+9%** | **+10%** | **+10%** | **+48%** | **+7%** | 0% | **+21%** | **+17%** | **+24%** | **+48%** | **+48%** | **+7%** |
| gaussian | **+11%** | **+29%** | **+29%** | **+10%** | **+10%** | 0% | **+34%** | **+21%** | **+20%** | **+10%** | **+10%** | **+15%** |
| causal | **+1%** | **+12%** | **+13%** | **+48%** | 0% | 0% | **+23%** | **+19%** | **+36%** | **+46%** | **+46%** | **+8%** |
| uniform | **+11%** | **+22%** | **+28%** | **+21%** | **+11%** | 0% | **+27%** | **+21%** | **+20%** | **+21%** | **+21%** | **+8%** |
| differential | **+2%** | **+19%** | **+22%** | 0% | **+2%** | **+5%** | **+22%** | **+10%** | **+25%** | 0% | 0% | **+5%** |
| ema | **+9%** | **+14%** | **+14%** | **+49%** | **+10%** | 0% | **+25%** | **+23%** | **+28%** | **+47%** | **+47%** | **+6%** |

## openai@dot

### bare

> **Best avg:** `differential × amplitude_sort` — **25%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 17% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 17% | 16% | 0% | 16% | 15% | 16% | **25%** | 16% | 0% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

### described

> **Best avg:** `ema × arithmetic_opt` — **64%**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 26% | 64% | 23% | 16% | 37% | 33% | 40% | 63% | 63% | 22% |
| gaussian | 27% | 45% | 45% | 26% | 26% | 16% | 49% | 36% | 36% | 26% | 26% | 30% |
| causal | 17% | 28% | 29% | 64% | 16% | 16% | 39% | 35% | 52% | 62% | 62% | 24% |
| uniform | 27% | 38% | 44% | 37% | 27% | 16% | 42% | 36% | 35% | 37% | 37% | 24% |
| differential | 18% | 36% | 37% | 0% | 18% | 19% | 37% | 35% | 40% | 0% | 0% | 20% |
| ema | 25% | 29% | 29% | **64%** | 25% | 16% | 40% | 39% | 44% | 62% | 62% | 22% |

### bare → described delta

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+9%** | **+10%** | **+10%** | **+48%** | **+7%** | 0% | **+21%** | **+17%** | **+24%** | **+48%** | **+48%** | **+7%** |
| gaussian | **+11%** | **+29%** | **+29%** | **+10%** | **+10%** | 0% | **+34%** | **+21%** | **+20%** | **+10%** | **+10%** | **+15%** |
| causal | **+1%** | **+12%** | **+13%** | **+48%** | 0% | 0% | **+23%** | **+19%** | **+36%** | **+46%** | **+46%** | **+8%** |
| uniform | **+11%** | **+22%** | **+28%** | **+21%** | **+11%** | 0% | **+27%** | **+21%** | **+20%** | **+21%** | **+21%** | **+8%** |
| differential | **+2%** | **+19%** | **+22%** | 0% | **+2%** | **+5%** | **+22%** | **+10%** | **+25%** | 0% | 0% | **+5%** |
| ema | **+9%** | **+14%** | **+14%** | **+49%** | **+10%** | 0% | **+25%** | **+23%** | **+28%** | **+47%** | **+47%** | **+6%** |

## summary

| provider | bare avg best | described avg best |
| --- | --- | --- |
| gemini@cosine | 46% (`uniform × amplitude_sort`) | 69% (`identity × arithmetic_opt`) |
| gemini@l2 | 46% (`uniform × amplitude_sort`) | 69% (`identity × arithmetic_opt`) |
| gemini@ip | 46% (`uniform × amplitude_sort`) | 69% (`identity × arithmetic_opt`) |
| gemini@dot | 46% (`uniform × amplitude_sort`) | 69% (`identity × arithmetic_opt`) |
| ollama@cosine | 40% (`differential × per_token`) | 69% (`identity × arithmetic_opt`) |
| ollama@l2 | 54% (`differential × conv_residual`) | 52% (`differential × conv_residual`) |
| ollama@ip | 44% (`differential × amplitude_sort`) | 66% (`identity × arithmetic_opt`) |
| ollama@dot | 44% (`differential × amplitude_sort`) | 66% (`identity × arithmetic_opt`) |
| openai@cosine | 25% (`differential × amplitude_sort`) | 64% (`ema × arithmetic_opt`) |
| openai@l2 | 25% (`differential × amplitude_sort`) | 64% (`ema × arithmetic_opt`) |
| openai@ip | 25% (`differential × amplitude_sort`) | 64% (`ema × arithmetic_opt`) |
| openai@dot | 25% (`differential × amplitude_sort`) | 64% (`ema × arithmetic_opt`) |

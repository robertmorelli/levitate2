# Full results — all kernels

Per-kernel jaccard matrices for every provider × mode combination.

## add_fma

### gemini

**bare** — best: `uniform × per_token` (74%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 27% | 16% | 16% | 16% | 16% | 34% | 16% | 16% | 16% |
| gaussian | 16% | 60% | 34% | 16% | 16% | 16% | 16% | 62% | 27% | 16% | 27% |
| causal | 16% | 60% | 16% | 16% | 16% | 16% | 16% | 27% | 56% | 16% | 16% |
| uniform | 16% | **74%** | 63% | 16% | 16% | 16% | 16% | 70% | 27% | 16% | 16% |
| differential | 27% | 57% | 16% | 0% | 27% | 0% | 16% | 62% | 27% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 34% | 27% | 16% | 16% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 66% | 46% | 37% | **85%** | 66% | 67% | 47% | 48% | 48% | 58% | 36% |
| gaussian | 66% | 46% | 39% | 66% | 66% | 67% | 16% | 41% | 52% | 58% | 40% |
| causal | 80% | 47% | 38% | 78% | 80% | 66% | 51% | 46% | 47% | 61% | 36% |
| uniform | 66% | 46% | 38% | 71% | 66% | 67% | 51% | 42% | 49% | 56% | 40% |
| differential | 52% | 60% | 65% | 0% | 52% | 0% | 70% | 63% | 55% | 0% | 16% |
| ema | 66% | 46% | 37% | **85%** | 66% | 60% | 56% | 51% | 56% | 67% | 26% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+30%** | **+10%** | **+69%** | **+50%** | **+51%** | **+32%** | **+14%** | **+32%** | **+42%** | **+20%** |
| gaussian | **+50%** | -14% | **+5%** | **+50%** | **+50%** | **+51%** | 0% | -21% | **+25%** | **+42%** | **+12%** |
| causal | **+64%** | -13% | **+22%** | **+62%** | **+64%** | **+50%** | **+35%** | **+19%** | -9% | **+45%** | **+20%** |
| uniform | **+50%** | -28% | -25% | **+55%** | **+50%** | **+51%** | **+35%** | -27% | **+22%** | **+40%** | **+24%** |
| differential | **+25%** | **+3%** | **+49%** | 0% | **+25%** | 0% | **+54%** | **+1%** | **+28%** | 0% | 0% |
| ema | **+50%** | **+30%** | **+22%** | **+69%** | **+50%** | **+44%** | **+41%** | **+16%** | **+29%** | **+51%** | **+10%** |

### ollama

**bare** — best: `identity × delta_decode` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 27% | 37% | 37% | 16% | 27% | 27% | **60%** | 38% | 40% | 16% | 34% |
| gaussian | 27% | 28% | 31% | 16% | 27% | 27% | 34% | 38% | 44% | 16% | 24% |
| causal | 34% | 28% | 31% | 16% | 34% | 27% | **60%** | 38% | 40% | 16% | 34% |
| uniform | 27% | 28% | 31% | 16% | 27% | 27% | 52% | 38% | 40% | 16% | 34% |
| differential | 34% | 53% | 16% | 0% | 34% | 0% | 16% | 41% | 58% | 0% | 16% |
| ema | 34% | 28% | 31% | 16% | 34% | 27% | 45% | 38% | 40% | 16% | 34% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 45% | 33% | **85%** | 16% | 16% | 47% | 46% | 48% | 43% | 16% |
| gaussian | 16% | 47% | 39% | 16% | 16% | 16% | 16% | 49% | 54% | 16% | 16% |
| causal | 16% | 45% | 33% | 69% | 16% | 16% | 51% | 44% | 60% | 60% | 39% |
| uniform | 16% | 45% | 33% | 60% | 16% | 16% | 51% | 44% | 52% | 48% | 39% |
| differential | 55% | 58% | 65% | 0% | 55% | 0% | 62% | 47% | 55% | 0% | 16% |
| ema | 16% | 46% | 40% | **85%** | 16% | 55% | 43% | 40% | 60% | 60% | 16% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -11% | **+8%** | -4% | **+69%** | -11% | -11% | -13% | **+9%** | **+8%** | **+28%** | -18% |
| gaussian | -11% | **+19%** | **+8%** | 0% | -11% | -11% | -18% | **+11%** | **+10%** | 0% | -8% |
| causal | -18% | **+17%** | **+2%** | **+53%** | -18% | -11% | -9% | **+6%** | **+20%** | **+44%** | **+5%** |
| uniform | -11% | **+17%** | **+2%** | **+44%** | -11% | -11% | 0% | **+6%** | **+12%** | **+32%** | **+5%** |
| differential | **+20%** | **+5%** | **+49%** | 0% | **+20%** | 0% | **+47%** | **+6%** | -3% | 0% | 0% |
| ema | -18% | **+18%** | **+9%** | **+69%** | -18% | **+28%** | -2% | **+2%** | **+20%** | **+44%** | -18% |

### openai

**bare** — best: `differential × amplitude_sort` (27%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 16% | 16% | 0% | 16% | 16% | 16% | **27%** | 16% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

**described** — best: `causal × dynamic_stack_healing` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 41% | 27% | 27% | 75% | 41% | 16% | 46% | 34% | 58% | 70% | 16% |
| gaussian | 41% | 44% | 61% | 71% | 27% | 16% | 62% | 48% | 34% | 71% | 56% |
| causal | 16% | 27% | 27% | 75% | 16% | 16% | 49% | 45% | 63% | **85%** | 27% |
| uniform | 41% | 34% | 65% | 16% | 27% | 16% | 62% | 39% | 43% | 16% | 27% |
| differential | 16% | 44% | 44% | 0% | 16% | 16% | 44% | 34% | 54% | 0% | 27% |
| ema | 41% | 27% | 27% | 75% | 41% | 16% | 50% | 43% | 36% | **85%** | 27% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+25%** | **+11%** | **+11%** | **+59%** | **+25%** | 0% | **+31%** | **+18%** | **+42%** | **+54%** | 0% |
| gaussian | **+25%** | **+28%** | **+45%** | **+55%** | **+11%** | 0% | **+46%** | **+32%** | **+18%** | **+55%** | **+40%** |
| causal | 0% | **+11%** | **+11%** | **+59%** | 0% | 0% | **+33%** | **+30%** | **+48%** | **+69%** | **+11%** |
| uniform | **+25%** | **+18%** | **+49%** | 0% | **+11%** | 0% | **+46%** | **+23%** | **+27%** | 0% | **+11%** |
| differential | 0% | **+28%** | **+28%** | 0% | 0% | 0% | **+28%** | **+7%** | **+38%** | 0% | **+11%** |
| ema | **+25%** | **+11%** | **+11%** | **+59%** | **+25%** | 0% | **+34%** | **+27%** | **+20%** | **+69%** | **+11%** |

## add_fma_rcp

### gemini

**bare** — best: `gaussian × per_token` (70%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 14% | 25% | 14% | 14% | 14% | 25% | 53% | 52% | 14% | 14% |
| gaussian | 14% | **70%** | 56% | 14% | 14% | 14% | 14% | 65% | 14% | 14% | 25% |
| causal | 14% | 56% | 14% | 14% | 14% | 14% | 32% | 58% | 25% | 14% | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 37% | 65% | 25% | 14% | 14% |
| differential | 25% | 53% | 14% | 0% | 25% | 0% | 14% | 53% | 25% | 0% | 56% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 25% | 50% | 25% | 14% | 14% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 72% | 44% | 35% | **85%** | 68% | 72% | 45% | 47% | 50% | 53% | 35% |
| gaussian | 72% | 42% | 35% | 62% | 68% | 77% | 14% | 47% | 52% | 47% | 38% |
| causal | 75% | 45% | 38% | 81% | 75% | 73% | 51% | 45% | 48% | 63% | 35% |
| uniform | 68% | 42% | 36% | 63% | 68% | 72% | 51% | 50% | 53% | 50% | 38% |
| differential | 60% | 56% | 64% | 0% | 60% | 0% | 55% | 65% | 55% | 0% | 28% |
| ema | 68% | 44% | 38% | **85%** | 68% | 67% | 56% | 44% | 57% | 63% | 35% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+58%** | **+29%** | **+10%** | **+71%** | **+54%** | **+57%** | **+20%** | -6% | -2% | **+38%** | **+20%** |
| gaussian | **+58%** | -27% | -20% | **+48%** | **+54%** | **+62%** | 0% | -18% | **+38%** | **+33%** | **+13%** |
| causal | **+60%** | -11% | **+24%** | **+67%** | **+60%** | **+58%** | **+19%** | -13% | **+23%** | **+49%** | **+20%** |
| uniform | **+54%** | **+28%** | **+21%** | **+49%** | **+54%** | **+57%** | **+14%** | -15% | **+27%** | **+36%** | **+24%** |
| differential | **+35%** | **+2%** | **+49%** | 0% | **+35%** | 0% | **+41%** | **+12%** | **+30%** | 0% | -27% |
| ema | **+54%** | **+29%** | **+24%** | **+71%** | **+54%** | **+52%** | **+31%** | -6% | **+32%** | **+49%** | **+20%** |

### ollama

**bare** — best: `differential × conv_residual` (62%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 32% | 40% | 41% | 14% | 32% | 25% | 56% | 33% | 37% | 14% | 37% |
| gaussian | 32% | 25% | 36% | 14% | 32% | 25% | 42% | 33% | 42% | 14% | 32% |
| causal | 32% | 25% | 30% | 14% | 32% | 25% | 56% | 33% | 42% | 14% | 23% |
| uniform | 32% | 25% | 31% | 14% | 32% | 25% | 49% | 33% | 42% | 14% | 32% |
| differential | 32% | 57% | 54% | 0% | 32% | 0% | 54% | 39% | **62%** | 0% | 56% |
| ema | 32% | 27% | 30% | 14% | 32% | 25% | 41% | 33% | 42% | 14% | 23% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 42% | 36% | **85%** | 14% | 14% | 48% | 51% | 46% | 56% | 44% |
| gaussian | 14% | 41% | 31% | 75% | 14% | 14% | 14% | 46% | 50% | 42% | 43% |
| causal | 14% | 45% | 34% | 71% | 14% | 14% | 52% | 45% | 64% | 56% | 14% |
| uniform | 14% | 42% | 35% | 75% | 14% | 14% | 52% | 46% | 56% | 43% | 43% |
| differential | 52% | 55% | 58% | 0% | 52% | 14% | 55% | 52% | 55% | 0% | 28% |
| ema | 14% | 46% | 41% | **85%** | 14% | 63% | 42% | 37% | 64% | 56% | 44% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -18% | **+2%** | -4% | **+71%** | -18% | -11% | -8% | **+18%** | **+8%** | **+41%** | **+7%** |
| gaussian | -18% | **+15%** | -5% | **+60%** | -18% | -11% | -27% | **+13%** | **+8%** | **+28%** | **+11%** |
| causal | -18% | **+19%** | **+4%** | **+56%** | -18% | -11% | -5% | **+12%** | **+22%** | **+41%** | -9% |
| uniform | -18% | **+17%** | **+4%** | **+60%** | -18% | -11% | **+3%** | **+12%** | **+14%** | **+29%** | **+11%** |
| differential | **+20%** | -2% | **+3%** | 0% | **+20%** | **+14%** | **+1%** | **+13%** | -6% | 0% | -27% |
| ema | -18% | **+19%** | **+11%** | **+71%** | -18% | **+38%** | **+1%** | **+4%** | **+22%** | **+41%** | **+21%** |

### openai

**bare** — best: `differential × amplitude_sort` (25%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| causal | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| differential | 14% | 14% | 14% | 0% | 14% | 14% | 14% | **25%** | 14% | 0% | 14% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |

**described** — best: `causal × dynamic_stack_healing` (72%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 25% | 71% | 25% | 14% | 44% | 50% | 59% | 66% | 52% |
| gaussian | 25% | 30% | 42% | 14% | 14% | 14% | 58% | 40% | 25% | 14% | 25% |
| causal | 14% | 25% | 25% | 68% | 14% | 14% | 44% | 40% | 25% | **72%** | 25% |
| uniform | 25% | 32% | 32% | 70% | 25% | 14% | 46% | 46% | 25% | 67% | 24% |
| differential | 14% | 42% | 42% | 0% | 14% | 14% | 45% | 43% | 57% | 0% | 32% |
| ema | 25% | 25% | 25% | 71% | 25% | 14% | 48% | 52% | 57% | 56% | 25% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+11%** | **+11%** | **+11%** | **+57%** | **+11%** | 0% | **+30%** | **+36%** | **+44%** | **+52%** | **+37%** |
| gaussian | **+11%** | **+16%** | **+27%** | 0% | 0% | 0% | **+44%** | **+26%** | **+11%** | 0% | **+11%** |
| causal | 0% | **+11%** | **+11%** | **+53%** | 0% | 0% | **+30%** | **+26%** | **+11%** | **+57%** | **+11%** |
| uniform | **+11%** | **+18%** | **+18%** | **+55%** | **+11%** | 0% | **+31%** | **+31%** | **+11%** | **+52%** | **+10%** |
| differential | 0% | **+27%** | **+27%** | 0% | 0% | 0% | **+31%** | **+18%** | **+43%** | 0% | **+17%** |
| ema | **+11%** | **+11%** | **+11%** | **+57%** | **+11%** | 0% | **+34%** | **+37%** | **+42%** | **+41%** | **+11%** |

## add_mul_rcp

### gemini

**bare** — best: `causal × amplitude_sort` (61%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 25% | 25% | 14% | 14% | 14% | 14% | 53% | 25% | 14% | 14% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 53% | 14% | 14% | 25% |
| causal | 14% | 25% | 14% | 14% | 14% | 14% | 14% | **61%** | 14% | 14% | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 53% | 14% | 14% | 14% |
| differential | 25% | 57% | 14% | 0% | 25% | 0% | 14% | 57% | 25% | 0% | 14% |
| ema | 14% | 25% | 14% | 14% | 14% | 14% | 14% | 32% | 14% | 14% | 14% |

**described** — best: `identity × arithmetic_opt` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 68% | 46% | 36% | **88%** | 77% | 67% | 50% | 46% | 53% | 61% | 36% |
| gaussian | 68% | 43% | 37% | 58% | 68% | 73% | 14% | 49% | 54% | 51% | 36% |
| causal | 77% | 53% | 40% | 81% | 75% | 72% | 50% | 42% | 53% | 66% | 36% |
| uniform | 74% | 42% | 42% | 68% | 74% | 72% | 50% | 48% | 53% | 51% | 36% |
| differential | 60% | 56% | 58% | 0% | 60% | 0% | 58% | 63% | 56% | 0% | 28% |
| ema | 68% | 48% | 40% | **88%** | 68% | 77% | 53% | 42% | 55% | 66% | 36% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+54%** | **+20%** | **+10%** | **+73%** | **+63%** | **+53%** | **+36%** | -8% | **+27%** | **+47%** | **+21%** |
| gaussian | **+54%** | **+29%** | **+23%** | **+44%** | **+54%** | **+58%** | 0% | -5% | **+40%** | **+36%** | **+10%** |
| causal | **+63%** | **+27%** | **+25%** | **+67%** | **+60%** | **+57%** | **+36%** | -18% | **+38%** | **+51%** | **+21%** |
| uniform | **+59%** | **+27%** | **+27%** | **+53%** | **+59%** | **+57%** | **+36%** | -5% | **+38%** | **+36%** | **+21%** |
| differential | **+35%** | 0% | **+44%** | 0% | **+35%** | 0% | **+44%** | **+6%** | **+31%** | 0% | **+14%** |
| ema | **+54%** | **+23%** | **+26%** | **+73%** | **+54%** | **+62%** | **+38%** | **+10%** | **+40%** | **+51%** | **+21%** |

### ollama

**bare** — best: `differential × per_token` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 32% | 40% | 39% | 14% | 32% | 25% | 56% | 33% | 42% | 14% | 37% |
| gaussian | 32% | 25% | 31% | 14% | 32% | 25% | 49% | 33% | 37% | 14% | 32% |
| causal | 32% | 27% | 30% | 14% | 32% | 25% | 56% | 33% | 42% | 14% | 22% |
| uniform | 32% | 25% | 31% | 14% | 32% | 25% | 57% | 33% | 39% | 14% | 32% |
| differential | 32% | **60%** | 52% | 0% | 32% | 0% | 52% | 39% | 57% | 0% | 22% |
| ema | 32% | 27% | 30% | 14% | 32% | 25% | 41% | 33% | 42% | 14% | 23% |

**described** — best: `identity × arithmetic_opt` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 38% | 56% | **88%** | 14% | 14% | 49% | 51% | 54% | 49% | 49% |
| gaussian | 14% | 42% | 36% | 63% | 14% | 14% | 14% | 47% | 52% | 47% | 34% |
| causal | 14% | 46% | 38% | 80% | 14% | 14% | 52% | 47% | 49% | 49% | 14% |
| uniform | 14% | 42% | 41% | 63% | 14% | 14% | 52% | 47% | 50% | 46% | 14% |
| differential | 52% | 53% | 58% | 0% | 52% | 0% | 60% | 43% | 56% | 0% | 28% |
| ema | 14% | 46% | 56% | **88%** | 14% | 61% | 48% | 46% | 56% | 49% | 49% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -18% | -2% | **+17%** | **+73%** | -18% | -11% | -7% | **+18%** | **+12%** | **+35%** | **+11%** |
| gaussian | -18% | **+16%** | **+5%** | **+48%** | -18% | -11% | -35% | **+14%** | **+14%** | **+32%** | **+2%** |
| causal | -18% | **+19%** | **+8%** | **+65%** | -18% | -11% | -5% | **+14%** | **+8%** | **+35%** | -8% |
| uniform | -18% | **+16%** | **+10%** | **+48%** | -18% | -11% | -5% | **+14%** | **+11%** | **+32%** | -18% |
| differential | **+20%** | -6% | **+6%** | 0% | **+20%** | 0% | **+7%** | **+5%** | -2% | 0% | **+6%** |
| ema | -18% | **+19%** | **+26%** | **+73%** | -18% | **+36%** | **+7%** | **+13%** | **+14%** | **+35%** | **+25%** |

### openai

**bare** — best: `differential × amplitude_sort` (25%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| causal | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |
| differential | 14% | 14% | 14% | 0% | 14% | 14% | 14% | **25%** | 14% | 0% | 14% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 14% |

**described** — best: `causal × arithmetic_opt` (82%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 25% | 25% | 75% | 14% | 14% | 48% | 40% | 25% | 75% | 56% |
| gaussian | 38% | 65% | 61% | 14% | 38% | 14% | 58% | 46% | 25% | 14% | 25% |
| causal | 14% | 25% | 25% | **82%** | 14% | 14% | 48% | 53% | 77% | 75% | 25% |
| uniform | 25% | 32% | 25% | 14% | 25% | 14% | 43% | 41% | 25% | 14% | 24% |
| differential | 14% | 39% | 55% | 0% | 14% | 14% | 55% | 46% | 63% | 0% | 32% |
| ema | 38% | 52% | 25% | 75% | 38% | 14% | 49% | 53% | 32% | 75% | 25% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+11%** | **+11%** | **+60%** | 0% | 0% | **+34%** | **+26%** | **+11%** | **+60%** | **+41%** |
| gaussian | **+24%** | **+50%** | **+46%** | 0% | **+24%** | 0% | **+44%** | **+31%** | **+11%** | 0% | **+11%** |
| causal | 0% | **+11%** | **+11%** | **+67%** | 0% | 0% | **+34%** | **+39%** | **+63%** | **+60%** | **+11%** |
| uniform | **+11%** | **+18%** | **+11%** | 0% | **+11%** | 0% | **+29%** | **+27%** | **+11%** | 0% | **+10%** |
| differential | 0% | **+24%** | **+40%** | 0% | 0% | 0% | **+40%** | **+21%** | **+49%** | 0% | **+18%** |
| ema | **+24%** | **+37%** | **+11%** | **+60%** | **+24%** | 0% | **+34%** | **+39%** | **+18%** | **+60%** | **+11%** |

## add_only

### gemini

**bare** — best: `causal × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 21% | 34% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 34% |
| gaussian | 21% | 68% | 42% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | **80%** | 21% | 21% | 21% |
| uniform | 21% | 34% | 34% | 21% | 21% | 21% | 21% | 67% | 21% | 21% | 34% |
| differential | 34% | 21% | 21% | 0% | 34% | 0% | 74% | 42% | 21% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 35% |

**described** — best: `identity × arithmetic_opt` (89%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 79% | 53% | 43% | **89%** | 79% | 77% | 55% | 55% | 49% | 64% | 38% |
| gaussian | 79% | 53% | 47% | 65% | 79% | 77% | 21% | 53% | 50% | 55% | 38% |
| causal | 74% | 52% | 44% | 73% | **89%** | 77% | 55% | 44% | 54% | 64% | 38% |
| uniform | 79% | 53% | 46% | 65% | 79% | 77% | 55% | 48% | 48% | 55% | 38% |
| differential | 62% | 63% | 64% | 0% | 62% | 0% | 64% | 55% | 64% | 0% | 21% |
| ema | 74% | 51% | 43% | **89%** | 74% | 67% | 55% | 48% | 54% | 64% | 38% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+58%** | **+33%** | **+9%** | **+69%** | **+58%** | **+56%** | **+35%** | **+21%** | **+29%** | **+43%** | **+4%** |
| gaussian | **+58%** | -15% | **+5%** | **+45%** | **+58%** | **+56%** | 0% | **+19%** | **+29%** | **+34%** | **+17%** |
| causal | **+53%** | **+31%** | **+23%** | **+52%** | **+69%** | **+56%** | **+35%** | -36% | **+33%** | **+43%** | **+17%** |
| uniform | **+58%** | **+19%** | **+12%** | **+45%** | **+58%** | **+56%** | **+35%** | -19% | **+27%** | **+34%** | **+4%** |
| differential | **+28%** | **+43%** | **+43%** | 0% | **+28%** | 0% | -9% | **+13%** | **+43%** | 0% | 0% |
| ema | **+53%** | **+30%** | **+22%** | **+69%** | **+53%** | **+46%** | **+34%** | **+14%** | **+33%** | **+43%** | **+3%** |

### ollama

**bare** — best: `differential × conv_residual` (62%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 42% | 40% | 21% | 34% | 34% | 61% | 39% | 48% | 21% | 22% |
| gaussian | 34% | 31% | 33% | 21% | 34% | 34% | 52% | 39% | 48% | 21% | 42% |
| causal | 34% | 31% | 33% | 21% | 34% | 34% | 61% | 39% | 48% | 21% | 22% |
| uniform | 34% | 31% | 33% | 21% | 34% | 34% | 52% | 39% | 48% | 21% | 22% |
| differential | 42% | 59% | 21% | 0% | 42% | 42% | 21% | 48% | **62%** | 0% | 35% |
| ema | 34% | 31% | 33% | 21% | 34% | 34% | 45% | 39% | 48% | 21% | 22% |

**described** — best: `identity × arithmetic_opt` (89%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 45% | 40% | **89%** | 21% | 21% | 58% | 52% | 51% | 45% | 62% |
| gaussian | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 43% | 46% | 21% | 21% |
| causal | 21% | 43% | 21% | 21% | 21% | 21% | 58% | 40% | 58% | 21% | 21% |
| uniform | 21% | 43% | 36% | 74% | 21% | 21% | 58% | 43% | 74% | 21% | 21% |
| differential | 34% | 63% | 64% | 0% | 34% | 21% | 64% | 51% | 64% | 0% | 21% |
| ema | 21% | 42% | 74% | **89%** | 21% | 21% | 46% | 39% | 45% | 74% | 21% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -13% | **+3%** | -1% | **+69%** | -13% | -13% | -3% | **+13%** | **+3%** | **+25%** | **+40%** |
| gaussian | -13% | -10% | -12% | 0% | -13% | -13% | -31% | **+4%** | -2% | 0% | -21% |
| causal | -13% | **+12%** | -12% | 0% | -13% | -13% | -3% | **+2%** | **+10%** | 0% | -2% |
| uniform | -13% | **+12%** | **+3%** | **+53%** | -13% | -13% | **+6%** | **+4%** | **+26%** | 0% | -2% |
| differential | -8% | **+5%** | **+43%** | 0% | -8% | -21% | **+43%** | **+3%** | **+2%** | 0% | -14% |
| ema | -13% | **+11%** | **+41%** | **+69%** | -13% | -13% | **+1%** | **+1%** | -2% | **+53%** | -2% |

### openai

**bare** — best: `differential × amplitude_sort` (34%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| gaussian | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| uniform | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| differential | 21% | 21% | 21% | 0% | 21% | 21% | 21% | **34%** | 21% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |

**described** — best: `identity × arithmetic_opt` (89%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 34% | 34% | **89%** | 34% | 21% | 45% | 42% | 56% | **89%** | 34% |
| gaussian | 34% | 73% | 73% | 74% | 34% | 21% | 74% | 46% | 62% | 74% | 74% |
| causal | 21% | 34% | 34% | **89%** | 21% | 21% | 44% | 41% | 83% | **89%** | 21% |
| uniform | 34% | 66% | 69% | 74% | 34% | 21% | 65% | 49% | 41% | 74% | 34% |
| differential | 21% | 48% | 44% | 0% | 21% | 21% | 42% | 42% | 42% | 0% | 21% |
| ema | 34% | 34% | 34% | **89%** | 34% | 21% | 55% | 41% | 73% | **89%** | 41% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+13%** | **+13%** | **+13%** | **+69%** | **+13%** | 0% | **+25%** | **+21%** | **+35%** | **+69%** | **+13%** |
| gaussian | **+13%** | **+52%** | **+52%** | **+53%** | **+13%** | 0% | **+53%** | **+26%** | **+42%** | **+53%** | **+53%** |
| causal | 0% | **+13%** | **+13%** | **+69%** | 0% | 0% | **+24%** | **+20%** | **+62%** | **+69%** | 0% |
| uniform | **+13%** | **+46%** | **+48%** | **+53%** | **+13%** | 0% | **+44%** | **+28%** | **+20%** | **+53%** | **+13%** |
| differential | 0% | **+27%** | **+24%** | 0% | 0% | 0% | **+21%** | **+8%** | **+21%** | 0% | 0% |
| ema | **+13%** | **+13%** | **+13%** | **+69%** | **+13%** | 0% | **+34%** | **+20%** | **+53%** | **+69%** | **+20%** |

## add_rcp

### gemini

**bare** — best: `gaussian × amplitude_sort` (69%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 19% | 31% | 19% | 19% | 19% | 19% | 39% | 31% | 19% | 19% |
| gaussian | 19% | 39% | 39% | 19% | 19% | 19% | 19% | **69%** | 31% | 19% | 19% |
| causal | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 31% | 19% | 19% | 19% |
| uniform | 19% | 31% | 31% | 19% | 19% | 19% | 19% | 39% | 19% | 19% | 19% |
| differential | 31% | 63% | 19% | 0% | 31% | 0% | 19% | 39% | 67% | 0% | 19% |
| ema | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 63% | 68% | 19% | 19% |

**described** — best: `identity × arithmetic_opt` (90%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 51% | 42% | **90%** | 73% | 76% | 55% | 48% | 53% | 63% | 42% |
| gaussian | 73% | 45% | 46% | 61% | 73% | 19% | 19% | 51% | 52% | 47% | 36% |
| causal | 67% | 54% | 40% | 73% | 67% | 76% | 55% | 49% | 55% | 60% | 19% |
| uniform | 73% | 50% | 45% | 61% | 73% | 19% | 55% | 46% | 52% | 56% | 36% |
| differential | 71% | 67% | 63% | 0% | 71% | 0% | 63% | 63% | 68% | 0% | 19% |
| ema | 67% | 51% | 41% | **90%** | 67% | 62% | 55% | 48% | 52% | 66% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+49%** | **+32%** | **+12%** | **+72%** | **+55%** | **+57%** | **+37%** | **+9%** | **+22%** | **+45%** | **+24%** |
| gaussian | **+55%** | **+7%** | **+7%** | **+42%** | **+55%** | 0% | 0% | -17% | **+21%** | **+29%** | **+18%** |
| causal | **+49%** | **+35%** | **+22%** | **+55%** | **+48%** | **+57%** | **+37%** | **+18%** | **+36%** | **+42%** | 0% |
| uniform | **+55%** | **+19%** | **+14%** | **+42%** | **+55%** | 0% | **+37%** | **+8%** | **+34%** | **+38%** | **+18%** |
| differential | **+40%** | **+4%** | **+44%** | 0% | **+40%** | 0% | **+44%** | **+24%** | **+1%** | 0% | 0% |
| ema | **+49%** | **+33%** | **+23%** | **+72%** | **+49%** | **+43%** | **+36%** | -15% | -15% | **+48%** | 0% |

### ollama

**bare** — best: `identity × delta_decode` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 31% | 40% | 46% | 19% | 31% | 31% | **57%** | 36% | 39% | 19% | 22% |
| gaussian | 31% | 27% | 36% | 19% | 31% | 31% | 51% | 36% | 44% | 19% | 39% |
| causal | 31% | 27% | 31% | 19% | 31% | 31% | **57%** | 36% | 44% | 19% | 22% |
| uniform | 31% | 27% | 31% | 19% | 31% | 31% | 49% | 36% | 44% | 19% | 39% |
| differential | 39% | 50% | 19% | 0% | 39% | 40% | 19% | 40% | 39% | 0% | 19% |
| ema | 31% | 29% | 31% | 19% | 31% | 31% | 42% | 36% | 44% | 19% | 22% |

**described** — best: `identity × arithmetic_opt` (90%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 65% | 54% | 39% | **90%** | 19% | 19% | 53% | 49% | 55% | 55% | 19% |
| gaussian | 65% | 54% | 44% | 19% | 19% | 19% | 19% | 46% | 45% | 19% | 19% |
| causal | 19% | 50% | 43% | 80% | 19% | 19% | 54% | 44% | 55% | 67% | 19% |
| uniform | 65% | 50% | 44% | 67% | 65% | 19% | 54% | 46% | 52% | 56% | 19% |
| differential | 31% | 65% | 63% | 0% | 31% | 19% | 63% | 49% | 68% | 0% | 19% |
| ema | 65% | 50% | 44% | **90%** | 19% | 19% | 47% | 43% | 49% | 67% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+34%** | **+14%** | -8% | **+72%** | -12% | -12% | -4% | **+13%** | **+16%** | **+36%** | -4% |
| gaussian | **+34%** | **+26%** | **+8%** | 0% | -12% | -12% | -33% | **+10%** | **+1%** | 0% | -20% |
| causal | -12% | **+23%** | **+12%** | **+62%** | -12% | -12% | -3% | **+8%** | **+11%** | **+49%** | -4% |
| uniform | **+34%** | **+23%** | **+13%** | **+49%** | **+34%** | -12% | **+6%** | **+10%** | **+8%** | **+38%** | -20% |
| differential | -8% | **+15%** | **+44%** | 0% | -8% | -21% | **+44%** | **+9%** | **+30%** | 0% | 0% |
| ema | **+34%** | **+21%** | **+13%** | **+72%** | -12% | -12% | **+5%** | **+7%** | **+5%** | **+49%** | -4% |

### openai

**bare** — best: `differential × amplitude_sort` (31%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| gaussian | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| causal | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| uniform | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| differential | 19% | 19% | 19% | 0% | 19% | 19% | 19% | **31%** | 19% | 0% | 19% |
| ema | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |

**described** — best: `identity × arithmetic_opt` (83%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 31% | 31% | 31% | **83%** | 31% | 19% | 43% | 39% | 54% | **83%** | 31% |
| gaussian | 31% | 60% | 61% | 19% | 31% | 19% | 67% | 46% | 63% | 19% | 41% |
| causal | 19% | 31% | 31% | **83%** | 19% | 19% | 46% | 38% | 69% | **83%** | 19% |
| uniform | 31% | 39% | 76% | **83%** | 19% | 19% | 69% | 57% | 64% | **83%** | 19% |
| differential | 19% | 44% | 49% | 0% | 19% | 19% | 49% | 39% | 44% | 0% | 19% |
| ema | 31% | 31% | 31% | **83%** | 31% | 19% | 48% | 49% | 69% | **83%** | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+12%** | **+12%** | **+12%** | **+64%** | **+12%** | 0% | **+24%** | **+20%** | **+36%** | **+64%** | **+12%** |
| gaussian | **+12%** | **+41%** | **+42%** | 0% | **+12%** | 0% | **+49%** | **+28%** | **+44%** | 0% | **+22%** |
| causal | 0% | **+12%** | **+12%** | **+64%** | 0% | 0% | **+28%** | **+20%** | **+50%** | **+64%** | 0% |
| uniform | **+12%** | **+20%** | **+57%** | **+64%** | 0% | 0% | **+50%** | **+38%** | **+46%** | **+64%** | 0% |
| differential | 0% | **+26%** | **+30%** | 0% | 0% | 0% | **+30%** | **+8%** | **+26%** | 0% | 0% |
| ema | **+12%** | **+12%** | **+12%** | **+64%** | **+12%** | 0% | **+29%** | **+30%** | **+50%** | **+64%** | 0% |

## all_ops

### gemini

**bare** — best: `identity × amplitude_sort` (62%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 23% | 23% | 13% | 13% | 13% | 23% | **62%** | 23% | 60% | 13% |
| gaussian | 13% | 23% | 23% | 13% | 13% | 13% | 13% | 50% | 13% | 13% | 13% |
| causal | 13% | 30% | 13% | 13% | 13% | 13% | 13% | 30% | 13% | 13% | 13% |
| uniform | 13% | 23% | 13% | 13% | 13% | 13% | 13% | 53% | 23% | 13% | 13% |
| differential | 23% | 50% | 13% | 0% | 23% | 0% | 13% | 35% | 30% | 0% | 13% |
| ema | 13% | 30% | 52% | 13% | 13% | 13% | 30% | 30% | 23% | 13% | 13% |

**described** — best: `causal × arithmetic_opt` (83%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 69% | 44% | 35% | 81% | 69% | 68% | 44% | 45% | 48% | 55% | 38% |
| gaussian | 69% | 42% | 33% | 62% | 69% | 73% | 37% | 41% | 53% | 53% | 29% |
| causal | 70% | 38% | 34% | **83%** | 68% | 68% | 44% | 45% | 52% | 56% | 33% |
| uniform | 71% | 42% | 33% | 55% | 71% | 68% | 44% | 45% | 55% | 50% | 29% |
| differential | 56% | 61% | 54% | 0% | 56% | 0% | 61% | 49% | 48% | 0% | 13% |
| ema | 69% | 43% | 36% | 81% | 69% | 69% | 49% | 46% | 52% | 53% | 33% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+56%** | **+20%** | **+12%** | **+68%** | **+56%** | **+55%** | **+21%** | -16% | **+24%** | -5% | **+24%** |
| gaussian | **+56%** | **+18%** | **+10%** | **+48%** | **+56%** | **+59%** | **+24%** | -9% | **+40%** | **+39%** | **+15%** |
| causal | **+57%** | **+8%** | **+21%** | **+69%** | **+55%** | **+55%** | **+31%** | **+15%** | **+38%** | **+43%** | **+20%** |
| uniform | **+58%** | **+18%** | **+20%** | **+42%** | **+58%** | **+55%** | **+31%** | -8% | **+32%** | **+36%** | **+15%** |
| differential | **+33%** | **+11%** | **+41%** | 0% | **+33%** | 0% | **+47%** | **+14%** | **+18%** | 0% | 0% |
| ema | **+56%** | **+13%** | -16% | **+68%** | **+56%** | **+55%** | **+19%** | **+16%** | **+28%** | **+40%** | **+20%** |

### ollama

**bare** — best: `differential × conv_residual` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 30% | 37% | 39% | 13% | 30% | 23% | 53% | 32% | 35% | 13% | 16% |
| gaussian | 30% | 23% | 34% | 13% | 30% | 23% | 49% | 32% | 37% | 13% | 16% |
| causal | 30% | 23% | 28% | 13% | 30% | 23% | 53% | 32% | 40% | 13% | 22% |
| uniform | 30% | 23% | 32% | 13% | 30% | 23% | 53% | 32% | 40% | 13% | 16% |
| differential | 35% | 52% | 47% | 0% | 35% | 30% | 52% | 34% | **57%** | 0% | 13% |
| ema | 30% | 24% | 28% | 13% | 30% | 23% | 39% | 32% | 40% | 13% | 16% |

**described** — best: `identity × arithmetic_opt` (81%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 37% | 43% | **81%** | 13% | 13% | 42% | 55% | 48% | 52% | 13% |
| gaussian | 13% | 38% | 33% | 65% | 13% | 13% | 44% | 48% | 54% | 41% | 13% |
| causal | 13% | 46% | 40% | 73% | 13% | 13% | 44% | 48% | 56% | 52% | 13% |
| uniform | 13% | 39% | 40% | 72% | 13% | 13% | 42% | 48% | 53% | 41% | 13% |
| differential | 49% | 49% | 51% | 0% | 49% | 13% | 53% | 47% | 49% | 0% | 13% |
| ema | 13% | 47% | 42% | **81%** | 13% | 58% | 40% | 50% | 56% | 52% | 13% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -17% | 0% | **+4%** | **+68%** | -17% | -10% | -12% | **+23%** | **+13%** | **+39%** | -3% |
| gaussian | -17% | **+15%** | -1% | **+52%** | -17% | -10% | -5% | **+16%** | **+17%** | **+28%** | -3% |
| causal | -17% | **+23%** | **+12%** | **+60%** | -17% | -10% | -9% | **+16%** | **+17%** | **+39%** | -9% |
| uniform | -17% | **+16%** | **+8%** | **+59%** | -17% | -10% | -12% | **+16%** | **+13%** | **+28%** | -3% |
| differential | **+14%** | -2% | **+4%** | 0% | **+14%** | -17% | **+1%** | **+13%** | -8% | 0% | 0% |
| ema | -17% | **+23%** | **+14%** | **+68%** | -17% | **+35%** | **+1%** | **+18%** | **+17%** | **+39%** | -3% |

### openai

**bare** — best: `differential × amplitude_sort` (23%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |
| gaussian | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |
| causal | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |
| uniform | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |
| differential | 13% | 13% | 13% | 0% | 13% | 13% | 13% | **23%** | 13% | 0% | 13% |
| ema | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |

**described** — best: `ema × dynamic_stack_healing` (81%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 23% | 23% | 68% | 34% | 13% | 43% | 30% | 56% | 68% | 23% |
| gaussian | 34% | 30% | 30% | 13% | 36% | 13% | 51% | 35% | 57% | 13% | 23% |
| causal | 13% | 30% | 23% | 68% | 13% | 13% | 43% | 39% | 57% | 52% | 23% |
| uniform | 36% | 23% | 23% | 63% | 36% | 13% | 45% | 35% | 23% | 68% | 23% |
| differential | 13% | 37% | 40% | 0% | 13% | 13% | 43% | 35% | 50% | 0% | 23% |
| ema | 34% | 23% | 23% | 73% | 34% | 13% | 46% | 39% | 56% | **81%** | 23% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+21%** | **+10%** | **+10%** | **+54%** | **+21%** | 0% | **+29%** | **+17%** | **+43%** | **+54%** | **+10%** |
| gaussian | **+21%** | **+17%** | **+17%** | 0% | **+23%** | 0% | **+38%** | **+22%** | **+44%** | 0% | **+10%** |
| causal | 0% | **+17%** | **+10%** | **+54%** | 0% | 0% | **+29%** | **+25%** | **+44%** | **+39%** | **+10%** |
| uniform | **+23%** | **+10%** | **+10%** | **+50%** | **+23%** | 0% | **+32%** | **+22%** | **+10%** | **+55%** | **+10%** |
| differential | 0% | **+23%** | **+26%** | 0% | 0% | 0% | **+30%** | **+12%** | **+37%** | 0% | **+10%** |
| ema | **+21%** | **+10%** | **+10%** | **+60%** | **+21%** | 0% | **+33%** | **+25%** | **+43%** | **+68%** | **+10%** |

## complex_kernel

### gemini

**bare** — best: `differential × per_token` (4%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 2% | 2% | 3% | 2% | 3% | 3% | 2% | 2% | 2% | 2% |
| gaussian | 2% | 2% | 2% | 3% | 2% | 3% | 3% | 2% | 2% | 2% | 3% |
| causal | 3% | 2% | 2% | 3% | 3% | 3% | 3% | 2% | 2% | 2% | 2% |
| uniform | 2% | 2% | 1% | 3% | 2% | 3% | 3% | 2% | 2% | 2% | 2% |
| differential | 2% | **4%** | 3% | 0% | 2% | 0% | 3% | 2% | 2% | 0% | 3% |
| ema | 2% | 2% | 2% | 3% | 3% | 3% | 3% | 2% | 2% | 2% | 2% |

**described** — best: `gaussian × dominant_prefix` (3%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 2% | 1% | 1% | 2% | 2% | 2% | 2% | 1% | 2% | 2% | 1% |
| gaussian | 2% | 1% | 1% | 2% | 2% | **3%** | 2% | 1% | 2% | 2% | 2% |
| causal | 2% | 1% | 1% | 2% | 2% | 2% | 2% | 1% | 2% | 2% | 1% |
| uniform | 2% | 1% | 1% | 2% | 2% | **3%** | 2% | 1% | 2% | 2% | 2% |
| differential | 2% | 2% | 2% | 0% | 2% | 0% | 2% | 2% | 2% | 0% | 1% |
| ema | 2% | 1% | 1% | 2% | 2% | **3%** | 2% | 1% | 2% | 2% | 1% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | -1% | -1% | -1% | 0% | -1% | -1% | -1% | -1% | 0% | -1% |
| gaussian | 0% | 0% | 0% | -1% | 0% | 0% | -1% | 0% | 0% | -1% | -2% |
| causal | -1% | 0% | -1% | -1% | -1% | -1% | -1% | 0% | -1% | -1% | 0% |
| uniform | 0% | 0% | 0% | -1% | 0% | 0% | -1% | 0% | -1% | -1% | 0% |
| differential | 0% | -3% | -1% | 0% | 0% | 0% | -1% | 0% | 0% | 0% | -2% |
| ema | 0% | 0% | 0% | -1% | -1% | 0% | -1% | -1% | -1% | -1% | -1% |

### ollama

**bare** — best: `identity × arithmetic_opt` (3%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 2% | 1% | 1% | **3%** | 2% | 3% | 2% | 2% | 2% | **3%** | 1% |
| gaussian | 2% | 2% | 2% | **3%** | 2% | 3% | 2% | 2% | 2% | **3%** | 2% |
| causal | 2% | 2% | 2% | **3%** | 2% | 3% | 2% | 2% | 2% | 3% | 2% |
| uniform | 2% | 2% | 2% | **3%** | 2% | 3% | 2% | 2% | 2% | **3%** | 2% |
| differential | 3% | 2% | 2% | 0% | 3% | 3% | 2% | 2% | 2% | 0% | 1% |
| ema | 2% | 2% | 2% | **3%** | 2% | 3% | 2% | 2% | 2% | **3%** | 2% |

**described** — best: `identity × dominant_prefix` (3%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 2% | 2% | 1% | 2% | 2% | **3%** | 2% | 2% | 2% | 2% | 2% |
| gaussian | 2% | 2% | 1% | **3%** | 2% | **3%** | 1% | 2% | 2% | 2% | 2% |
| causal | 2% | 1% | 1% | 2% | 2% | **3%** | 1% | 1% | 2% | 2% | 1% |
| uniform | 2% | 2% | 1% | 3% | 2% | **3%** | 2% | 2% | 2% | 2% | 2% |
| differential | 2% | 2% | 1% | 0% | 2% | **3%** | 1% | 2% | 2% | 0% | 1% |
| ema | 2% | 1% | 1% | 2% | 2% | 2% | 1% | 1% | 2% | 2% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | 0% | 0% | -1% | -1% | 0% | 0% | 0% | -1% | -1% | 0% |
| gaussian | 0% | 0% | -1% | 0% | 0% | 0% | 0% | 0% | -1% | -1% | 0% |
| causal | 0% | 0% | 0% | -1% | -1% | 0% | 0% | 0% | -1% | -1% | 0% |
| uniform | 0% | 0% | -1% | 0% | 0% | 0% | 0% | 0% | -1% | -1% | 0% |
| differential | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% | 0% |
| ema | 0% | 0% | 0% | -1% | 0% | -1% | 0% | 0% | 0% | -1% | 0% |

### openai

**bare** — best: `ema × conv_residual` (9%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% |
| gaussian | 3% | 5% | 3% | 3% | 3% | 3% | 2% | 3% | 3% | 3% | 3% |
| causal | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% |
| uniform | 3% | 3% | 3% | 3% | 3% | 3% | 2% | 3% | 3% | 3% | 3% |
| differential | 3% | 3% | 3% | 0% | 3% | 0% | 3% | 3% | 3% | 0% | 3% |
| ema | 3% | 3% | 3% | 3% | 3% | 3% | 3% | 3% | **9%** | 3% | 3% |

**described** — best: `differential × global_residual` (9%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 4% | 2% | 2% | 3% | 3% | 5% | 6% | 7% | 3% | 3% |
| gaussian | 3% | 2% | 5% | 3% | 3% | 3% | 3% | 6% | 2% | 3% | 3% |
| causal | 3% | 2% | 3% | 5% | 3% | 3% | 7% | 6% | 3% | 3% | 6% |
| uniform | 3% | 3% | 2% | 3% | 3% | 3% | 2% | 7% | 7% | 3% | 2% |
| differential | **9%** | 7% | 6% | 0% | **9%** | 0% | 5% | 6% | 2% | 0% | 3% |
| ema | 3% | 6% | 3% | 3% | 3% | 3% | 2% | 6% | 7% | 5% | 8% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+2%** | 0% | -1% | 0% | 0% | **+2%** | **+3%** | **+4%** | 0% | 0% |
| gaussian | 0% | -3% | **+2%** | 0% | 0% | 0% | 0% | **+3%** | 0% | 0% | 0% |
| causal | 0% | -1% | 0% | **+2%** | 0% | 0% | **+5%** | **+4%** | 0% | 0% | **+3%** |
| uniform | 0% | 0% | 0% | 0% | 0% | 0% | 0% | **+5%** | **+4%** | 0% | -1% |
| differential | **+6%** | **+4%** | **+3%** | 0% | **+6%** | 0% | **+2%** | **+4%** | -1% | 0% | 0% |
| ema | 0% | **+3%** | 0% | 0% | 0% | 0% | 0% | **+4%** | -1% | **+2%** | **+5%** |

## copy

### gemini

**bare** — best: `uniform × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 30% | 30% | 30% | 30% | 30% | 30% | 30% | 46% | 30% | 30% | 30% |
| gaussian | 30% | 30% | 30% | 30% | 30% | 30% | 30% | 46% | 30% | 30% | 30% |
| causal | 30% | 30% | 30% | 30% | 30% | 30% | 30% | 46% | 30% | 30% | 30% |
| uniform | 30% | 30% | 30% | 30% | 30% | 30% | 30% | **100%** | 30% | 30% | 30% |
| differential | 30% | 30% | 30% | 0% | 30% | 0% | 30% | 46% | 30% | 0% | 30% |
| ema | 30% | 30% | 30% | 30% | 30% | 30% | 30% | 46% | 30% | 30% | 30% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 51% | 44% | 86% | 86% | 30% | 59% | 49% | 54% | 86% | 30% |
| gaussian | **100%** | 50% | 46% | 72% | 86% | **100%** | 59% | 49% | 50% | 52% | 30% |
| causal | **100%** | 51% | 44% | 72% | **100%** | 30% | 59% | 44% | 54% | 72% | 30% |
| uniform | **100%** | 50% | 44% | 72% | **100%** | **100%** | 59% | 49% | 52% | 59% | 30% |
| differential | 30% | 85% | 59% | 0% | 30% | 0% | 59% | **100%** | **100%** | 0% | 30% |
| ema | **100%** | 50% | 49% | 86% | 86% | 85% | 50% | 60% | 59% | 86% | 30% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+70%** | **+20%** | **+13%** | **+56%** | **+56%** | 0% | **+28%** | **+3%** | **+24%** | **+56%** | 0% |
| gaussian | **+70%** | **+19%** | **+15%** | **+42%** | **+56%** | **+70%** | **+28%** | **+3%** | **+20%** | **+22%** | 0% |
| causal | **+70%** | **+20%** | **+13%** | **+42%** | **+70%** | 0% | **+28%** | -2% | **+24%** | **+42%** | 0% |
| uniform | **+70%** | **+19%** | **+13%** | **+42%** | **+70%** | **+70%** | **+28%** | -51% | **+22%** | **+29%** | 0% |
| differential | 0% | **+54%** | **+29%** | 0% | 0% | 0% | **+29%** | **+54%** | **+70%** | 0% | 0% |
| ema | **+70%** | **+19%** | **+18%** | **+56%** | **+56%** | **+54%** | **+20%** | **+14%** | **+29%** | **+56%** | 0% |

### ollama

**bare** — best: `identity × conv_residual` (54%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 46% | 40% | 40% | 30% | 46% | 46% | 40% | 46% | **54%** | 30% | 46% |
| gaussian | 46% | 36% | 46% | 30% | 46% | 46% | 40% | 46% | 46% | 30% | 21% |
| causal | 46% | 36% | 40% | 30% | 46% | 46% | 40% | 46% | 46% | 30% | 46% |
| uniform | 46% | 36% | 46% | 30% | 46% | 46% | 40% | 46% | 46% | 30% | 21% |
| differential | 46% | **54%** | 46% | 0% | 46% | 46% | 46% | **54%** | 46% | 0% | 30% |
| ema | 46% | 36% | 40% | 30% | 46% | 46% | 33% | 46% | 46% | 30% | 46% |

**described** — best: `uniform × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 74% | 57% | 49% | 86% | 30% | 30% | 59% | 59% | 54% | 57% | 30% |
| gaussian | 74% | 30% | 30% | 30% | 30% | 30% | 59% | 49% | 86% | 30% | 30% |
| causal | 30% | 49% | 30% | 30% | 30% | 30% | 59% | 53% | 54% | 30% | 30% |
| uniform | 74% | 50% | 42% | 86% | 30% | 30% | 59% | 49% | **100%** | 30% | 30% |
| differential | 46% | 85% | 59% | 0% | 46% | 30% | 59% | 54% | **100%** | 0% | 30% |
| ema | 74% | 51% | 49% | 86% | 30% | 77% | 41% | 52% | 86% | 57% | 30% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+28%** | **+17%** | **+8%** | **+56%** | -16% | -16% | **+18%** | **+13%** | 0% | **+27%** | -16% |
| gaussian | **+28%** | -6% | -16% | 0% | -16% | -16% | **+18%** | **+3%** | **+40%** | 0% | **+9%** |
| causal | -16% | **+13%** | -10% | 0% | -16% | -16% | **+18%** | **+7%** | **+8%** | 0% | -16% |
| uniform | **+28%** | **+14%** | -4% | **+56%** | -16% | -16% | **+18%** | **+3%** | **+54%** | 0% | **+9%** |
| differential | 0% | **+31%** | **+13%** | 0% | 0% | -16% | **+13%** | 0% | **+54%** | 0% | 0% |
| ema | **+28%** | **+15%** | **+8%** | **+56%** | -16% | **+31%** | **+8%** | **+6%** | **+40%** | **+27%** | -16% |

### openai

**bare** — best: `identity × global_residual` (30%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** |
| gaussian | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** |
| causal | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** |
| uniform | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** |
| differential | **30%** | **30%** | **30%** | 0% | **30%** | **30%** | **30%** | **30%** | **30%** | 0% | **30%** |
| ema | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** | **30%** |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 46% | 46% | 46% | **100%** | 46% | 30% | 54% | 46% | 46% | **100%** | 30% |
| gaussian | 46% | 72% | 79% | 30% | 46% | 30% | 69% | 55% | 46% | 30% | 30% |
| causal | 30% | 46% | 46% | **100%** | 30% | 30% | 54% | 53% | **100%** | 86% | 30% |
| uniform | 46% | 72% | 72% | 30% | 46% | 30% | 46% | 44% | 54% | 30% | 30% |
| differential | 30% | 54% | 54% | 0% | 30% | 30% | 54% | 46% | 54% | 0% | 30% |
| ema | 46% | 46% | 54% | **100%** | 46% | 30% | 46% | 46% | 79% | 86% | 30% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+16%** | **+16%** | **+16%** | **+70%** | **+16%** | 0% | **+24%** | **+16%** | **+16%** | **+70%** | 0% |
| gaussian | **+16%** | **+42%** | **+48%** | 0% | **+16%** | 0% | **+39%** | **+24%** | **+16%** | 0% | 0% |
| causal | 0% | **+16%** | **+16%** | **+70%** | 0% | 0% | **+24%** | **+23%** | **+70%** | **+56%** | 0% |
| uniform | **+16%** | **+42%** | **+42%** | 0% | **+16%** | 0% | **+16%** | **+14%** | **+24%** | 0% | 0% |
| differential | 0% | **+24%** | **+24%** | 0% | 0% | 0% | **+24%** | **+16%** | **+24%** | 0% | 0% |
| ema | **+16%** | **+16%** | **+24%** | **+70%** | **+16%** | 0% | **+16%** | **+16%** | **+48%** | **+56%** | 0% |

## fma_only

### gemini

**bare** — best: `uniform × arithmetic` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 18% | 18% | 18% | 18% | 18% | 18% | 43% | 30% | 18% | 18% | 18% |
| gaussian | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 37% | 18% | 18% | 18% |
| causal | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 65% | 18% | 18% | 18% |
| uniform | 18% | 65% | **67%** | 18% | 18% | 18% | 18% | 37% | 18% | 18% | 18% |
| differential | 30% | 65% | 18% | 0% | 30% | 0% | 18% | 37% | 30% | 0% | 18% |
| ema | 18% | 18% | 18% | 18% | 18% | 18% | 37% | 30% | 30% | 18% | 18% |

**described** — best: `identity × arithmetic_opt` (86%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 65% | 43% | 34% | **86%** | 65% | 61% | 53% | 51% | 47% | 63% | 18% |
| gaussian | 65% | 45% | 35% | 71% | 65% | 61% | 18% | 46% | 47% | 54% | 18% |
| causal | 72% | 44% | 34% | 75% | 65% | 61% | 53% | 47% | 47% | 66% | 18% |
| uniform | 65% | 45% | 37% | 71% | 65% | 61% | 47% | 39% | 48% | 54% | 18% |
| differential | 56% | 53% | 69% | 0% | 56% | 0% | 69% | 52% | 59% | 0% | 18% |
| ema | 65% | 44% | 37% | **86%** | 72% | 60% | 59% | 48% | 63% | 63% | 18% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+48%** | **+25%** | **+17%** | **+68%** | **+48%** | **+43%** | **+11%** | **+21%** | **+30%** | **+45%** | 0% |
| gaussian | **+48%** | **+27%** | **+18%** | **+53%** | **+48%** | **+43%** | 0% | **+9%** | **+29%** | **+36%** | 0% |
| causal | **+55%** | **+26%** | **+17%** | **+57%** | **+48%** | **+43%** | **+36%** | -18% | **+30%** | **+48%** | 0% |
| uniform | **+48%** | -21% | -31% | **+53%** | **+48%** | **+43%** | **+29%** | **+2%** | **+31%** | **+36%** | 0% |
| differential | **+26%** | -12% | **+51%** | 0% | **+26%** | 0% | **+51%** | **+15%** | **+29%** | 0% | 0% |
| ema | **+48%** | **+26%** | **+20%** | **+68%** | **+55%** | **+42%** | **+22%** | **+18%** | **+33%** | **+45%** | 0% |

### ollama

**bare** — best: `differential × arithmetic` (61%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 30% | 33% | 35% | 18% | 30% | 30% | 47% | 43% | 43% | 18% | 37% |
| gaussian | 30% | 31% | 40% | 18% | 30% | 30% | 30% | 43% | 43% | 18% | 37% |
| causal | 30% | 31% | 35% | 18% | 30% | 30% | 47% | 43% | 43% | 18% | 37% |
| uniform | 30% | 31% | 40% | 18% | 30% | 30% | 47% | 43% | 43% | 18% | 37% |
| differential | 37% | 43% | **61%** | 0% | 37% | 0% | **61%** | 47% | 37% | 0% | 18% |
| ema | 30% | 31% | 35% | 18% | 30% | 30% | 35% | 43% | 43% | 18% | 37% |

**described** — best: `identity × arithmetic_opt` (86%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 18% | 50% | 38% | **86%** | 18% | 18% | 54% | 57% | 52% | 45% | 18% |
| gaussian | 18% | 45% | 35% | 65% | 18% | 18% | 18% | 50% | 56% | 18% | 18% |
| causal | 18% | 49% | 18% | 18% | 18% | 18% | 54% | 48% | 56% | 18% | 18% |
| uniform | 18% | 43% | 34% | 72% | 18% | 18% | 48% | 50% | 53% | 18% | 18% |
| differential | 58% | 57% | 69% | 0% | 58% | 0% | 69% | 59% | 59% | 0% | 18% |
| ema | 18% | 45% | 37% | **86%** | 18% | 58% | 46% | 57% | 52% | 65% | 18% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -12% | **+17%** | **+3%** | **+68%** | -12% | -12% | **+7%** | **+14%** | **+9%** | **+27%** | -19% |
| gaussian | -12% | **+14%** | -4% | **+48%** | -12% | -12% | -12% | **+7%** | **+14%** | 0% | -19% |
| causal | -12% | **+19%** | -17% | 0% | -12% | -12% | **+7%** | **+4%** | **+14%** | 0% | -19% |
| uniform | -12% | **+12%** | -6% | **+55%** | -12% | -12% | 0% | **+7%** | **+10%** | 0% | -19% |
| differential | **+21%** | **+14%** | **+8%** | 0% | **+21%** | 0% | **+8%** | **+12%** | **+22%** | 0% | 0% |
| ema | -12% | **+14%** | **+2%** | **+68%** | -12% | **+28%** | **+11%** | **+13%** | **+9%** | **+48%** | -19% |

### openai

**bare** — best: `differential × amplitude_sort` (30%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% |
| gaussian | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% |
| causal | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% |
| uniform | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% |
| differential | 18% | 18% | 18% | 0% | 18% | 18% | 18% | **30%** | 18% | 0% | 18% |
| ema | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% | 18% |

**described** — best: `identity × arithmetic_opt` (86%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | 30% | 30% | **86%** | 30% | 18% | 49% | 47% | 57% | **86%** | 18% |
| gaussian | 43% | 68% | 69% | 65% | 30% | 18% | 65% | 36% | 30% | 65% | 18% |
| causal | 18% | 30% | 30% | **86%** | 18% | 18% | 52% | 45% | 72% | **86%** | 18% |
| uniform | 43% | 64% | 75% | 65% | 30% | 18% | 49% | 41% | 37% | 65% | 18% |
| differential | 18% | 47% | 47% | 0% | 18% | 18% | 46% | 48% | 58% | 0% | 30% |
| ema | 18% | 30% | 30% | **86%** | 43% | 18% | 52% | 30% | 43% | **86%** | 18% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+26%** | **+12%** | **+12%** | **+68%** | **+12%** | 0% | **+31%** | **+30%** | **+39%** | **+68%** | 0% |
| gaussian | **+26%** | **+50%** | **+51%** | **+48%** | **+12%** | 0% | **+48%** | **+19%** | **+12%** | **+48%** | 0% |
| causal | 0% | **+12%** | **+12%** | **+68%** | 0% | 0% | **+34%** | **+27%** | **+55%** | **+68%** | 0% |
| uniform | **+26%** | **+47%** | **+58%** | **+48%** | **+12%** | 0% | **+32%** | **+24%** | **+19%** | **+48%** | 0% |
| differential | 0% | **+30%** | **+29%** | 0% | 0% | 0% | **+29%** | **+18%** | **+40%** | 0% | **+12%** |
| ema | 0% | **+12%** | **+12%** | **+68%** | **+26%** | 0% | **+35%** | **+12%** | **+25%** | **+68%** | 0% |

## fma_rcp

### gemini

**bare** — best: `causal × amplitude_sort` (70%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 27% | 60% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 62% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 27% | **70%** | 16% | 16% | 16% |
| uniform | 16% | 60% | 63% | 16% | 16% | 16% | 16% | 57% | 16% | 16% | 16% |
| differential | 27% | 60% | 16% | 0% | 27% | 0% | 16% | 57% | 27% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 27% | 62% | 16% | 16% | 16% |

**described** — best: `identity × arithmetic_opt` (87%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 45% | 36% | **87%** | 60% | 67% | 53% | 51% | 50% | 60% | 31% |
| gaussian | 60% | 40% | 35% | 66% | 60% | 70% | 16% | 46% | 53% | 46% | 39% |
| causal | 68% | 44% | 37% | 69% | 60% | 67% | 53% | 51% | 50% | 65% | 30% |
| uniform | 60% | 39% | 38% | 68% | 60% | 67% | 53% | 40% | 52% | 47% | 39% |
| differential | 64% | 60% | 67% | 0% | 64% | 0% | 67% | 62% | 60% | 0% | 16% |
| ema | 60% | 45% | 42% | **87%** | 63% | 70% | 58% | 55% | 63% | 65% | 31% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+44%** | **+29%** | **+21%** | **+71%** | **+44%** | **+51%** | **+26%** | -9% | **+34%** | **+44%** | **+15%** |
| gaussian | **+44%** | **+24%** | **+19%** | **+50%** | **+44%** | **+54%** | 0% | -16% | **+37%** | **+30%** | **+23%** |
| causal | **+52%** | **+28%** | **+21%** | **+53%** | **+44%** | **+51%** | **+26%** | -19% | **+35%** | **+49%** | **+15%** |
| uniform | **+44%** | -21% | -25% | **+52%** | **+44%** | **+51%** | **+37%** | -17% | **+36%** | **+31%** | **+23%** |
| differential | **+37%** | 0% | **+51%** | 0% | **+37%** | 0% | **+51%** | **+5%** | **+33%** | 0% | 0% |
| ema | **+44%** | **+29%** | **+26%** | **+71%** | **+47%** | **+54%** | **+31%** | -7% | **+47%** | **+49%** | **+15%** |

### ollama

**bare** — best: `differential × arithmetic` (63%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 27% | 31% | 33% | 16% | 27% | 27% | 34% | 38% | 40% | 16% | 25% |
| gaussian | 27% | 28% | 41% | 16% | 27% | 27% | 27% | 38% | 40% | 16% | 25% |
| causal | 27% | 29% | 33% | 16% | 27% | 27% | 44% | 38% | 40% | 16% | 25% |
| uniform | 27% | 29% | 38% | 16% | 27% | 27% | 44% | 38% | 44% | 16% | 25% |
| differential | 34% | 44% | **63%** | 0% | 34% | 0% | 58% | 41% | 40% | 0% | 16% |
| ema | 27% | 31% | 33% | 16% | 27% | 27% | 33% | 38% | 40% | 16% | 25% |

**described** — best: `identity × arithmetic_opt` (87%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 60% | 40% | **87%** | 16% | 16% | 51% | 48% | 53% | 60% | 16% |
| gaussian | 16% | 70% | 60% | 72% | 16% | 16% | 16% | 51% | 59% | 16% | 46% |
| causal | 16% | 45% | 38% | 75% | 16% | 16% | 54% | 50% | 60% | 60% | 46% |
| uniform | 16% | 70% | 60% | 72% | 16% | 16% | 54% | 51% | 59% | 16% | 46% |
| differential | 55% | 58% | 67% | 0% | 55% | 0% | 68% | 58% | 63% | 0% | 16% |
| ema | 16% | 46% | 39% | **87%** | 16% | 67% | 47% | 45% | 55% | 60% | 16% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -11% | **+29%** | **+7%** | **+71%** | -11% | -11% | **+17%** | **+11%** | **+13%** | **+44%** | -10% |
| gaussian | -11% | **+42%** | **+19%** | **+56%** | -11% | -11% | -11% | **+13%** | **+19%** | 0% | **+21%** |
| causal | -11% | **+15%** | **+5%** | **+59%** | -11% | -11% | **+10%** | **+12%** | **+20%** | **+44%** | **+21%** |
| uniform | -11% | **+40%** | **+22%** | **+56%** | -11% | -11% | **+10%** | **+13%** | **+15%** | 0% | **+21%** |
| differential | **+20%** | **+14%** | **+4%** | 0% | **+20%** | 0% | **+10%** | **+18%** | **+23%** | 0% | 0% |
| ema | -11% | **+15%** | **+6%** | **+71%** | -11% | **+39%** | **+14%** | **+8%** | **+15%** | **+44%** | -10% |

### openai

**bare** — best: `differential × per_token` (27%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | **27%** | 16% | 0% | 16% | 16% | 16% | **27%** | 16% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

**described** — best: `ema × arithmetic_opt` (87%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 27% | 27% | 27% | 80% | 16% | 16% | 46% | 53% | 62% | 80% | 16% |
| gaussian | 27% | 49% | 40% | 16% | 27% | 16% | 62% | 45% | 64% | 16% | 56% |
| causal | 16% | 27% | 27% | 80% | 16% | 16% | 49% | 42% | 59% | 60% | 25% |
| uniform | 27% | 34% | 73% | 16% | 27% | 16% | 60% | 45% | 43% | 16% | 27% |
| differential | 16% | 41% | 48% | 0% | 16% | 16% | 47% | 34% | 61% | 0% | 27% |
| ema | 16% | 27% | 27% | **87%** | 27% | 16% | 50% | 43% | 27% | **87%** | 25% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+11%** | **+11%** | **+11%** | **+64%** | 0% | 0% | **+31%** | **+37%** | **+46%** | **+64%** | 0% |
| gaussian | **+11%** | **+33%** | **+24%** | 0% | **+11%** | 0% | **+46%** | **+29%** | **+48%** | 0% | **+40%** |
| causal | 0% | **+11%** | **+11%** | **+64%** | 0% | 0% | **+33%** | **+26%** | **+43%** | **+44%** | **+10%** |
| uniform | **+11%** | **+18%** | **+57%** | 0% | **+11%** | 0% | **+44%** | **+30%** | **+27%** | 0% | **+11%** |
| differential | 0% | **+14%** | **+32%** | 0% | 0% | 0% | **+32%** | **+7%** | **+45%** | 0% | **+11%** |
| ema | 0% | **+11%** | **+11%** | **+71%** | **+11%** | 0% | **+34%** | **+27%** | **+11%** | **+71%** | **+10%** |

## medium_blend

### gemini

**bare** — best: `identity × arithmetic_opt` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 5% | 4% | 3% | **5%** | 5% | **5%** | **5%** | 3% | 4% | **5%** | 4% |
| gaussian | 5% | 4% | 5% | **5%** | 5% | **5%** | **5%** | 3% | 3% | 5% | 3% |
| causal | 5% | 3% | 3% | **5%** | 5% | **5%** | **5%** | 3% | 4% | 5% | **5%** |
| uniform | 5% | 4% | 4% | **5%** | 5% | **5%** | 5% | 3% | 3% | 5% | 3% |
| differential | 4% | 3% | **5%** | 0% | 4% | 0% | **5%** | 3% | 4% | 0% | **5%** |
| ema | 5% | 3% | 3% | **5%** | 5% | **5%** | **5%** | 3% | 3% | 5% | 3% |

**described** — best: `identity × dominant_prefix` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 3% | 2% | 3% | 3% | **5%** | 3% | 2% | 3% | 3% | 2% |
| gaussian | 4% | 2% | 2% | 3% | 4% | **5%** | 2% | 2% | 3% | 2% | 2% |
| causal | 3% | 2% | 2% | 3% | 3% | **5%** | 2% | 2% | 2% | 3% | 2% |
| uniform | 3% | 2% | 2% | 3% | 3% | **5%** | 3% | 3% | 2% | 2% | 3% |
| differential | 4% | 3% | 2% | 0% | 4% | 0% | 2% | 3% | 3% | 0% | **5%** |
| ema | 3% | 2% | 2% | 3% | 3% | 4% | 2% | 2% | 2% | 3% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | -2% | -1% | -2% | -1% | 0% | -2% | -1% | -2% | -2% | -2% |
| gaussian | -1% | -2% | -2% | -2% | -1% | 0% | -3% | -1% | -1% | -2% | -1% |
| causal | -1% | -1% | -1% | -2% | -1% | 0% | -3% | -1% | -2% | -2% | -3% |
| uniform | -1% | -2% | -2% | -2% | -2% | 0% | -2% | 0% | -1% | -2% | -1% |
| differential | 0% | 0% | -2% | 0% | 0% | 0% | -3% | -1% | -1% | 0% | 0% |
| ema | -1% | -1% | -1% | -2% | -1% | -1% | -3% | -1% | -1% | -2% | -1% |

### ollama

**bare** — best: `identity × arithmetic_opt` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 2% | 2% | **5%** | 4% | 5% | 3% | 3% | 4% | **5%** | 2% |
| gaussian | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 3% | 4% | **5%** | 2% |
| causal | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 3% | 4% | **5%** | 3% |
| uniform | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 3% | 3% | **5%** | 3% |
| differential | 4% | 3% | 3% | 0% | 4% | 5% | 3% | 4% | 3% | 0% | 3% |
| ema | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 3% | 4% | **5%** | 3% |

**described** — best: `identity × dominant_prefix` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 3% | 2% | 3% | 4% | **5%** | 3% | 3% | 3% | 2% | 2% |
| gaussian | 3% | 2% | 2% | **5%** | 4% | **5%** | 2% | 2% | 3% | 3% | 2% |
| causal | **5%** | 2% | 2% | 3% | **5%** | **5%** | 2% | 2% | 3% | 2% | 4% |
| uniform | 3% | 2% | 2% | 4% | 4% | **5%** | 3% | 2% | 3% | 3% | 3% |
| differential | 4% | 3% | 2% | 0% | 4% | **5%** | 3% | 3% | 3% | 0% | 2% |
| ema | 4% | 2% | 4% | 3% | 4% | 3% | 2% | 2% | 3% | 2% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | 0% | 0% | -2% | 0% | 0% | 0% | -1% | -1% | -3% | 0% |
| gaussian | -1% | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -2% | 0% |
| causal | **+1%** | -1% | -1% | -2% | **+1%** | 0% | 0% | -1% | -1% | -3% | **+1%** |
| uniform | -1% | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -2% | 0% |
| differential | 0% | 0% | 0% | 0% | 0% | 0% | 0% | -1% | 0% | 0% | -1% |
| ema | 0% | -1% | **+1%** | -2% | 0% | -2% | 0% | -1% | -1% | -3% | -1% |

### openai

**bare** — best: `identity × global_residual` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | 4% | **5%** | **5%** | **5%** |
| gaussian | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | 5% | 4% | 5% | **5%** | **5%** |
| causal | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | 5% | 5% | **5%** | **5%** | **5%** |
| uniform | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | 5% | **5%** | **5%** | **5%** |
| differential | 5% | **5%** | **5%** | 0% | 5% | 0% | **5%** | 4% | **5%** | 0% | **5%** |
| ema | **5%** | **5%** | **5%** | **5%** | **5%** | **5%** | 4% | 5% | 5% | **5%** | **5%** |

**described** — best: `differential × global_residual` (12%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 5% | 8% | 4% | 4% | 5% | 5% | 4% | 9% | 4% | 5% | 3% |
| gaussian | 5% | 3% | 4% | 5% | 5% | 5% | 3% | 3% | 4% | 5% | 5% |
| causal | 5% | 4% | 4% | 5% | 5% | 5% | 4% | 4% | 4% | 5% | 5% |
| uniform | 5% | 4% | 4% | 5% | 5% | 5% | 3% | 9% | 3% | 5% | 5% |
| differential | **12%** | 4% | 4% | 0% | **12%** | 0% | 4% | 4% | 4% | 0% | 5% |
| ema | 5% | 4% | 4% | 5% | 5% | 5% | 4% | 12% | 4% | 5% | 5% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+3%** | -1% | -1% | 0% | 0% | -1% | **+5%** | -1% | 0% | -2% |
| gaussian | 0% | -2% | -1% | 0% | 0% | 0% | -1% | -1% | 0% | 0% | 0% |
| causal | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -1% | 0% | 0% |
| uniform | 0% | -1% | 0% | 0% | 0% | 0% | -2% | **+5%** | -2% | 0% | 0% |
| differential | **+8%** | -1% | -1% | 0% | **+8%** | 0% | 0% | -1% | -1% | 0% | 0% |
| ema | 0% | -1% | -1% | 0% | 0% | 0% | -1% | **+8%** | -1% | 0% | 0% |

## medium_int_mix

### gemini

**bare** — best: `identity × arithmetic_opt` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 5% | 3% | 3% | **5%** | 5% | **5%** | **5%** | 4% | 4% | 5% | 4% |
| gaussian | 5% | 3% | 3% | **5%** | 5% | **5%** | 5% | 4% | 4% | 4% | 3% |
| causal | 5% | 3% | 4% | **5%** | 5% | **5%** | **5%** | 4% | 4% | 4% | 4% |
| uniform | 5% | 3% | 3% | **5%** | 5% | **5%** | 5% | 4% | 4% | 4% | 3% |
| differential | 5% | 3% | **5%** | 0% | 5% | 0% | 5% | 3% | 5% | 0% | **5%** |
| ema | 5% | 3% | 4% | **5%** | 5% | **5%** | **5%** | 4% | 4% | 4% | 3% |

**described** — best: `identity × dominant_prefix` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 3% | 2% | 4% | 4% | **5%** | 3% | 3% | 3% | 3% | 2% |
| gaussian | 4% | 3% | 2% | 3% | 4% | **5%** | 3% | 3% | 3% | 3% | 2% |
| causal | 3% | 3% | 2% | 3% | 3% | **5%** | 3% | 3% | 3% | 3% | 2% |
| uniform | 4% | 3% | 2% | 3% | 4% | **5%** | 3% | 3% | 3% | 3% | 2% |
| differential | 5% | 3% | 3% | 0% | 5% | 0% | 3% | 3% | 4% | 0% | **5%** |
| ema | 4% | 3% | 2% | 4% | 4% | 5% | 3% | 3% | 3% | 3% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | -1% | -1% | -2% | -1% | 0% | -2% | -1% | -2% | -2% | -2% |
| gaussian | -1% | -1% | -1% | -2% | -1% | 0% | -2% | -1% | -1% | -2% | -1% |
| causal | -1% | 0% | -1% | -2% | -1% | 0% | -2% | -1% | -1% | -1% | -2% |
| uniform | -1% | -1% | 0% | -2% | -1% | 0% | -2% | -1% | -2% | -1% | -1% |
| differential | 0% | 0% | -3% | 0% | 0% | 0% | -2% | 0% | -1% | 0% | 0% |
| ema | -1% | -1% | -1% | -2% | -1% | -1% | -3% | -1% | -1% | -1% | -1% |

### ollama

**bare** — best: `identity × arithmetic_opt` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 3% | 3% | **5%** | 4% | 5% | 4% | 3% | 4% | **5%** | 5% |
| gaussian | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 3% | 4% | **5%** | 3% |
| causal | 4% | 3% | 3% | **5%** | 5% | 5% | 3% | 3% | 4% | **5%** | 5% |
| uniform | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 4% | 4% | **5%** | 5% |
| differential | 5% | 3% | 3% | 0% | 5% | 5% | 4% | 4% | 4% | 0% | 3% |
| ema | 4% | 3% | 3% | **5%** | 4% | 5% | 3% | 4% | 4% | **5%** | 5% |

**described** — best: `identity × dominant_prefix` (5%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 3% | 2% | 4% | 3% | **5%** | 3% | 3% | 3% | 3% | 3% |
| gaussian | 3% | 3% | 2% | **5%** | 3% | **5%** | 3% | 3% | 3% | 3% | 3% |
| causal | 3% | 3% | 2% | 3% | 3% | **5%** | 3% | 3% | 3% | 5% | 5% |
| uniform | 3% | 3% | 2% | 5% | 3% | **5%** | 3% | 3% | 3% | 3% | 3% |
| differential | 4% | 3% | 3% | 0% | 4% | **5%** | 3% | 3% | 4% | 0% | **5%** |
| ema | 3% | 3% | 2% | 4% | 3% | 4% | 3% | 3% | 3% | 3% | 3% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | 0% | 0% | -2% | -1% | 0% | -1% | 0% | -1% | -3% | -2% |
| gaussian | -1% | 0% | -1% | 0% | -1% | 0% | 0% | 0% | -1% | -3% | -1% |
| causal | -1% | 0% | -1% | -2% | -1% | 0% | 0% | -1% | -1% | -1% | 0% |
| uniform | -1% | 0% | -1% | -1% | -1% | 0% | 0% | -1% | -1% | -3% | -2% |
| differential | 0% | 0% | -1% | 0% | 0% | **+1%** | -1% | -1% | 0% | 0% | **+2%** |
| ema | -1% | 0% | -1% | -2% | -1% | -1% | 0% | -1% | -1% | -3% | -2% |

### openai

**bare** — best: `differential × amplitude_sort` (13%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% |
| gaussian | 5% | 5% | 5% | 5% | 5% | 5% | 4% | 5% | 5% | 5% | 5% |
| causal | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% |
| uniform | 5% | 5% | 5% | 5% | 5% | 5% | 4% | 5% | 5% | 5% | 5% |
| differential | 5% | 5% | 5% | 0% | 5% | 0% | 5% | **13%** | 5% | 0% | 5% |
| ema | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% | 5% |

**described** — best: `uniform × amplitude_sort` (15%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 5% | 4% | 5% | 5% | 5% | 5% | 5% | 4% | 4% | 5% | 5% |
| gaussian | 5% | 4% | 5% | 5% | 5% | 5% | 4% | 12% | 5% | 5% | 5% |
| causal | 5% | 4% | 5% | 9% | 5% | 5% | 4% | 12% | 5% | 9% | 5% |
| uniform | 5% | 4% | 4% | 9% | 5% | 5% | 4% | **15%** | 5% | 9% | 5% |
| differential | 13% | 4% | 4% | 0% | 13% | 0% | 5% | 4% | 5% | 0% | 5% |
| ema | 5% | 4% | 5% | 9% | 5% | 5% | 4% | 4% | 4% | 9% | 5% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -1% | 0% | 0% |
| gaussian | 0% | -2% | -1% | 0% | 0% | 0% | 0% | **+7%** | 0% | 0% | 0% |
| causal | 0% | -1% | -1% | **+4%** | 0% | 0% | -1% | **+7%** | 0% | **+4%** | 0% |
| uniform | 0% | -2% | -1% | **+4%** | 0% | 0% | 0% | **+11%** | -1% | **+4%** | 0% |
| differential | **+8%** | -1% | -1% | 0% | **+8%** | 0% | 0% | -9% | -1% | 0% | -1% |
| ema | 0% | -1% | 0% | **+4%** | 0% | 0% | -1% | -1% | -1% | **+4%** | 0% |

## medium_loop_mix

### gemini

**bare** — best: `identity × arithmetic_opt` (4%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 3% | 2% | **4%** | 4% | **4%** | **4%** | 3% | 3% | 3% | 3% |
| gaussian | 4% | 4% | 3% | **4%** | 4% | **4%** | **4%** | 3% | 3% | 3% | 4% |
| causal | 4% | 3% | 3% | **4%** | 4% | **4%** | **4%** | 3% | 4% | 3% | 2% |
| uniform | 4% | 4% | 2% | **4%** | 4% | **4%** | 4% | 3% | 4% | 4% | 3% |
| differential | 4% | 3% | **4%** | 0% | 4% | 0% | **4%** | 3% | 4% | 0% | **4%** |
| ema | 4% | 3% | 2% | **4%** | 4% | **4%** | **4%** | 3% | 3% | 3% | 3% |

**described** — best: `gaussian × dominant_prefix` (4%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 2% | 2% | 3% | 3% | 4% | 2% | 2% | 2% | 2% | 2% |
| gaussian | 3% | 2% | 2% | 3% | 3% | **4%** | 2% | 2% | 2% | 2% | 2% |
| causal | 3% | 2% | 2% | 3% | 3% | 4% | 2% | 2% | 2% | 2% | 2% |
| uniform | 3% | 2% | 2% | 3% | 3% | 3% | 2% | 2% | 2% | 2% | 2% |
| differential | 3% | 2% | 2% | 0% | 3% | 0% | 2% | 3% | 3% | 0% | 2% |
| ema | 3% | 2% | 2% | 3% | 3% | 3% | 2% | 2% | 2% | 2% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | -1% | 0% | -2% | -1% | -1% | -2% | -1% | -1% | -1% | -1% |
| gaussian | -1% | -2% | -1% | -2% | -1% | 0% | -2% | -1% | -1% | -1% | -2% |
| causal | -1% | -1% | -1% | -2% | -1% | -1% | -2% | -1% | -2% | -1% | 0% |
| uniform | -1% | -2% | 0% | -2% | -1% | -1% | -2% | -1% | -2% | -1% | 0% |
| differential | 0% | 0% | -2% | 0% | 0% | 0% | -2% | 0% | -1% | 0% | -3% |
| ema | -1% | -1% | 0% | -2% | -1% | -2% | -2% | -1% | -1% | -1% | -1% |

### ollama

**bare** — best: `identity × arithmetic_opt` (4%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 2% | 2% | **4%** | 4% | 4% | 3% | 3% | 3% | **4%** | 2% |
| gaussian | 4% | 2% | 2% | **4%** | 4% | 4% | 2% | 3% | 3% | **4%** | 4% |
| causal | 4% | 2% | 2% | **4%** | 4% | 4% | 2% | 3% | 3% | **4%** | 3% |
| uniform | 4% | 2% | 2% | **4%** | 4% | 4% | 3% | 3% | 3% | **4%** | 3% |
| differential | 4% | 2% | 3% | 0% | 4% | 4% | 3% | 3% | 3% | 0% | 2% |
| ema | 4% | 2% | 2% | **4%** | 4% | 4% | 2% | 3% | 3% | **4%** | 4% |

**described** — best: `identity × dominant_prefix` (4%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 3% | 2% | 2% | 3% | 4% | **4%** | 2% | 2% | 2% | 2% | 2% |
| gaussian | 4% | 2% | 2% | **4%** | 4% | **4%** | 2% | 2% | 2% | 2% | 2% |
| causal | 3% | 2% | 2% | 3% | 3% | **4%** | 2% | 2% | 2% | 2% | 4% |
| uniform | 3% | 2% | 2% | 4% | 4% | **4%** | 2% | 2% | 2% | 2% | 2% |
| differential | 3% | 3% | 2% | 0% | 3% | **4%** | 2% | 3% | 3% | 0% | 2% |
| ema | 4% | 2% | 2% | 3% | 4% | 3% | 2% | 2% | 2% | 2% | 2% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -1% | 0% | 0% | -2% | 0% | 0% | -1% | -1% | -1% | -2% | 0% |
| gaussian | 0% | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -2% | -2% |
| causal | -1% | 0% | -1% | -2% | -1% | 0% | 0% | -1% | -1% | -2% | **+1%** |
| uniform | -1% | 0% | -1% | 0% | 0% | 0% | 0% | -1% | -1% | -2% | -1% |
| differential | 0% | 0% | -1% | 0% | 0% | 0% | -1% | 0% | 0% | 0% | -1% |
| ema | 0% | 0% | -1% | -2% | 0% | -1% | 0% | -1% | -1% | -2% | -1% |

### openai

**bare** — best: `causal × amplitude_sort` (8%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% |
| gaussian | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 3% |
| causal | 4% | 4% | 4% | 4% | 4% | 4% | 4% | **8%** | 4% | 4% | 4% |
| uniform | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% |
| differential | 4% | 4% | 4% | 0% | 4% | 0% | 4% | 4% | 4% | 0% | 4% |
| ema | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 4% | 3% |

**described** — best: `causal × conv_residual` (12%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 4% | 4% | 11% | 4% | 4% | 4% | 7% | 10% | 4% | 4% | 4% |
| gaussian | 4% | 3% | 4% | 4% | 4% | 4% | 4% | 10% | 4% | 4% | 4% |
| causal | 4% | 9% | 4% | 4% | 4% | 4% | 4% | 3% | **12%** | 4% | 4% |
| uniform | 4% | 9% | 4% | 4% | 4% | 4% | 3% | 8% | 3% | 4% | 4% |
| differential | 11% | 4% | 7% | 0% | 11% | 0% | 7% | 3% | 4% | 0% | 4% |
| ema | 4% | 7% | 4% | 4% | 4% | 4% | 4% | 9% | 3% | 4% | 4% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | -1% | **+7%** | -1% | 0% | 0% | **+3%** | **+6%** | -1% | 0% | 0% |
| gaussian | 0% | -1% | -1% | 0% | 0% | 0% | 0% | **+6%** | -1% | 0% | **+1%** |
| causal | 0% | **+5%** | 0% | 0% | 0% | 0% | 0% | -5% | **+8%** | 0% | 0% |
| uniform | 0% | **+5%** | 0% | 0% | 0% | 0% | -1% | **+4%** | -1% | 0% | 0% |
| differential | **+7%** | 0% | **+2%** | 0% | **+7%** | 0% | **+3%** | -1% | 0% | 0% | 0% |
| ema | 0% | **+3%** | 0% | -1% | 0% | 0% | 0% | **+5%** | -1% | 0% | **+1%** |

## mul_fma

### gemini

**bare** — best: `ema × amplitude_sort` (62%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 27% | 16% | 16% | 16% | 16% | 16% | 27% | 27% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 27% | 16% | 16% | 16% |
| causal | 16% | 27% | 16% | 16% | 16% | 16% | 16% | 27% | 27% | 16% | 16% |
| uniform | 16% | 27% | 27% | 16% | 16% | 16% | 16% | 57% | 27% | 16% | 16% |
| differential | 27% | 57% | 16% | 0% | 27% | 0% | 16% | 34% | 27% | 0% | 16% |
| ema | 16% | 27% | 16% | 16% | 16% | 16% | 16% | **62%** | 16% | 16% | 16% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 65% | 45% | 37% | **85%** | 65% | 57% | 46% | 53% | 43% | 53% | 36% |
| gaussian | 65% | 40% | 34% | 66% | 65% | 60% | 16% | 40% | 51% | 52% | 31% |
| causal | 68% | 39% | 32% | 80% | 68% | 58% | 46% | 50% | 49% | 65% | 46% |
| uniform | 65% | 44% | 33% | 71% | 65% | 58% | 46% | 42% | 50% | 54% | 31% |
| differential | 52% | 45% | 59% | 0% | 52% | 0% | 59% | 63% | 52% | 0% | 16% |
| ema | 65% | 46% | 39% | **85%** | 65% | 70% | 52% | 43% | 55% | 62% | 36% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+49%** | **+18%** | **+21%** | **+69%** | **+49%** | **+41%** | **+30%** | **+26%** | **+16%** | **+37%** | **+20%** |
| gaussian | **+49%** | **+24%** | **+18%** | **+50%** | **+49%** | **+44%** | 0% | **+13%** | **+35%** | **+36%** | **+15%** |
| causal | **+52%** | **+12%** | **+16%** | **+64%** | **+52%** | **+42%** | **+30%** | **+23%** | **+22%** | **+49%** | **+30%** |
| uniform | **+49%** | **+17%** | **+5%** | **+55%** | **+49%** | **+42%** | **+30%** | -15% | **+23%** | **+38%** | **+15%** |
| differential | **+25%** | -12% | **+43%** | 0% | **+25%** | 0% | **+43%** | **+29%** | **+25%** | 0% | 0% |
| ema | **+49%** | **+18%** | **+23%** | **+69%** | **+49%** | **+54%** | **+36%** | -18% | **+39%** | **+46%** | **+20%** |

### ollama

**bare** — best: `differential × arithmetic` (52%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 27% | 29% | 33% | 16% | 27% | 27% | 34% | 38% | 40% | 16% | 25% |
| gaussian | 27% | 28% | 41% | 16% | 27% | 27% | 27% | 38% | 40% | 16% | 25% |
| causal | 27% | 28% | 33% | 16% | 27% | 27% | 44% | 38% | 40% | 16% | 25% |
| uniform | 27% | 28% | 38% | 16% | 27% | 27% | 44% | 38% | 40% | 16% | 25% |
| differential | 34% | 44% | **52%** | 0% | 34% | 0% | **52%** | 41% | 40% | 0% | 16% |
| ema | 27% | 28% | 33% | 16% | 27% | 27% | 33% | 38% | 40% | 16% | 25% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 43% | 60% | **85%** | 16% | 16% | 48% | 48% | 52% | 49% | 16% |
| gaussian | 16% | 45% | 38% | 73% | 16% | 16% | 16% | 49% | 62% | 16% | 39% |
| causal | 16% | 45% | 39% | 71% | 16% | 16% | 47% | 48% | 60% | 60% | 47% |
| uniform | 16% | 45% | 39% | 73% | 16% | 16% | 47% | 51% | 59% | 49% | 39% |
| differential | 55% | 58% | 59% | 0% | 55% | 0% | 67% | 49% | 52% | 0% | 16% |
| ema | 16% | 45% | 60% | **85%** | 16% | 57% | 46% | 44% | 60% | 47% | 16% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -11% | **+14%** | **+27%** | **+69%** | -11% | -11% | **+14%** | **+11%** | **+12%** | **+33%** | -10% |
| gaussian | -11% | **+17%** | -2% | **+57%** | -11% | -11% | -11% | **+11%** | **+22%** | 0% | **+14%** |
| causal | -11% | **+17%** | **+6%** | **+55%** | -11% | -11% | **+2%** | **+10%** | **+20%** | **+44%** | **+22%** |
| uniform | -11% | **+17%** | **+1%** | **+57%** | -11% | -11% | **+2%** | **+13%** | **+19%** | **+34%** | **+14%** |
| differential | **+20%** | **+14%** | **+7%** | 0% | **+20%** | 0% | **+15%** | **+8%** | **+13%** | 0% | 0% |
| ema | -11% | **+17%** | **+27%** | **+69%** | -11% | **+30%** | **+13%** | **+7%** | **+20%** | **+31%** | -10% |

### openai

**bare** — best: `identity × amplitude_sort` (37%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 16% | 16% | 16% | 16% | 16% | 16% | **37%** | 16% | 16% | 16% |
| gaussian | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| causal | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| uniform | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |
| differential | 16% | 16% | 16% | 0% | 16% | 16% | 16% | 27% | 16% | 0% | 16% |
| ema | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% | 16% |

**described** — best: `identity × arithmetic_opt` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 16% | 27% | 27% | **80%** | 16% | 16% | 45% | 34% | 27% | **80%** | 16% |
| gaussian | 16% | 58% | 41% | 16% | 16% | 16% | 62% | 34% | 65% | 16% | 60% |
| causal | 16% | 27% | 27% | **80%** | 16% | 16% | 45% | 34% | 51% | **80%** | 25% |
| uniform | 16% | 39% | 39% | 16% | 41% | 16% | 55% | 39% | 34% | 16% | 27% |
| differential | 16% | 44% | 58% | 0% | 16% | 16% | 58% | 34% | 57% | 0% | 27% |
| ema | 16% | 27% | 27% | **80%** | 16% | 16% | 46% | 43% | 34% | **80%** | 25% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+11%** | **+11%** | **+64%** | 0% | 0% | **+29%** | -3% | **+11%** | **+64%** | 0% |
| gaussian | 0% | **+42%** | **+26%** | 0% | 0% | 0% | **+46%** | **+18%** | **+49%** | 0% | **+44%** |
| causal | 0% | **+11%** | **+11%** | **+64%** | 0% | 0% | **+29%** | **+18%** | **+35%** | **+64%** | **+10%** |
| uniform | 0% | **+23%** | **+23%** | 0% | **+25%** | 0% | **+40%** | **+23%** | **+18%** | 0% | **+11%** |
| differential | 0% | **+28%** | **+42%** | 0% | 0% | 0% | **+42%** | **+7%** | **+41%** | 0% | **+11%** |
| ema | 0% | **+11%** | **+11%** | **+64%** | 0% | 0% | **+30%** | **+27%** | **+18%** | **+64%** | **+10%** |

## mul_only

### gemini

**bare** — best: `gaussian × amplitude_sort` (74%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 34% | 21% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 34% |
| gaussian | 21% | 34% | 21% | 21% | 21% | 21% | 21% | **74%** | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 21% |
| uniform | 21% | 21% | 21% | 21% | 21% | 21% | 21% | **74%** | 34% | 21% | **74%** |
| differential | 34% | 34% | 21% | 0% | 34% | 0% | 21% | 42% | 21% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 21% | **74%** | 21% | 21% | 21% |

**described** — best: `identity × arithmetic_opt` (89%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 74% | 43% | 36% | **89%** | 79% | 65% | 51% | 52% | 49% | 64% | 25% |
| gaussian | 79% | 52% | 45% | 65% | 79% | 21% | 21% | 58% | 49% | 58% | 38% |
| causal | 74% | 51% | 43% | 73% | 74% | 65% | 51% | 47% | 51% | 71% | 38% |
| uniform | 79% | 52% | 45% | 65% | 79% | 65% | 51% | 55% | 48% | 58% | 38% |
| differential | 62% | 59% | 64% | 0% | 62% | 0% | 64% | 68% | 65% | 0% | 21% |
| ema | 74% | 49% | 39% | **89%** | 74% | 67% | 55% | 62% | 57% | 64% | 38% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+53%** | **+9%** | **+15%** | **+69%** | **+58%** | **+44%** | **+30%** | **+18%** | **+29%** | **+43%** | -9% |
| gaussian | **+58%** | **+18%** | **+24%** | **+45%** | **+58%** | 0% | 0% | -15% | **+29%** | **+37%** | **+17%** |
| causal | **+53%** | **+30%** | **+22%** | **+52%** | **+53%** | **+44%** | **+30%** | **+13%** | **+30%** | **+50%** | **+17%** |
| uniform | **+58%** | **+31%** | **+24%** | **+45%** | **+58%** | **+44%** | **+30%** | -19% | **+14%** | **+37%** | -35% |
| differential | **+28%** | **+24%** | **+43%** | 0% | **+28%** | 0% | **+43%** | **+26%** | **+44%** | 0% | 0% |
| ema | **+53%** | **+29%** | **+18%** | **+69%** | **+53%** | **+46%** | **+34%** | -12% | **+36%** | **+43%** | **+17%** |

### ollama

**bare** — best: `differential × conv_residual` (62%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 33% | 35% | 21% | 34% | 34% | 42% | 39% | 48% | 21% | 34% |
| gaussian | 34% | 31% | 48% | 21% | 34% | 34% | 34% | 43% | 42% | 21% | 34% |
| causal | 34% | 31% | 35% | 21% | 34% | 34% | 43% | 43% | 42% | 21% | 34% |
| uniform | 34% | 31% | 39% | 21% | 34% | 34% | 43% | 43% | 42% | 21% | 34% |
| differential | 42% | 57% | 57% | 0% | 42% | 42% | 57% | 48% | **62%** | 0% | 21% |
| ema | 34% | 31% | 35% | 21% | 34% | 34% | 31% | 39% | 42% | 21% | 34% |

**described** — best: `identity × arithmetic_opt` (89%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 45% | 74% | **89%** | 21% | 21% | 51% | 52% | 52% | 55% | 59% |
| gaussian | 21% | 51% | 45% | 74% | 21% | 21% | 21% | 51% | 52% | 21% | 21% |
| causal | 21% | 51% | 21% | 21% | 21% | 21% | 51% | 45% | 60% | 21% | 21% |
| uniform | 21% | 48% | 43% | **89%** | 21% | 21% | 51% | 51% | 74% | 21% | 21% |
| differential | 34% | 59% | 64% | 0% | 34% | 21% | 64% | 66% | 64% | 0% | 21% |
| ema | 21% | 43% | 74% | **89%** | 21% | 21% | 45% | 39% | 54% | 74% | 21% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -13% | **+12%** | **+38%** | **+69%** | -13% | -13% | **+9%** | **+13%** | **+4%** | **+34%** | **+24%** |
| gaussian | -13% | **+20%** | -2% | **+53%** | -13% | -13% | -13% | **+8%** | **+10%** | 0% | -13% |
| causal | -13% | **+20%** | -15% | 0% | -13% | -13% | **+8%** | **+3%** | **+18%** | 0% | -13% |
| uniform | -13% | **+18%** | **+4%** | **+69%** | -13% | -13% | **+8%** | **+8%** | **+32%** | 0% | -13% |
| differential | -8% | **+1%** | **+7%** | 0% | -8% | -21% | **+7%** | **+19%** | **+2%** | 0% | 0% |
| ema | -13% | **+12%** | **+38%** | **+69%** | -13% | -13% | **+14%** | **+1%** | **+12%** | **+53%** | -13% |

### openai

**bare** — best: `differential × amplitude_sort` (34%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| gaussian | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| uniform | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| differential | 21% | 21% | 21% | 0% | 21% | 21% | 21% | **34%** | 21% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |

**described** — best: `identity × arithmetic_opt` (74%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 31% | 34% | **74%** | 21% | 21% | 47% | 34% | 34% | **74%** | 23% |
| gaussian | 21% | 72% | 65% | 21% | 48% | 21% | **74%** | 46% | 34% | 21% | 34% |
| causal | 21% | 73% | 66% | **74%** | 21% | 21% | 58% | 34% | 67% | **74%** | 21% |
| uniform | 48% | 61% | 61% | 21% | 48% | 21% | 54% | 44% | 49% | 21% | 41% |
| differential | 21% | 48% | 42% | 0% | 21% | 21% | 47% | **74%** | 42% | 0% | 21% |
| ema | 21% | **74%** | 69% | **74%** | 21% | 21% | 60% | 69% | 67% | **74%** | 41% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+10%** | **+13%** | **+53%** | 0% | 0% | **+26%** | **+13%** | **+13%** | **+53%** | **+3%** |
| gaussian | 0% | **+51%** | **+44%** | 0% | **+28%** | 0% | **+53%** | **+26%** | **+13%** | 0% | **+13%** |
| causal | 0% | **+52%** | **+45%** | **+53%** | 0% | 0% | **+37%** | **+13%** | **+46%** | **+53%** | 0% |
| uniform | **+28%** | **+40%** | **+40%** | 0% | **+28%** | 0% | **+34%** | **+23%** | **+29%** | 0% | **+20%** |
| differential | 0% | **+27%** | **+21%** | 0% | 0% | 0% | **+26%** | **+39%** | **+21%** | 0% | 0% |
| ema | 0% | **+53%** | **+48%** | **+53%** | 0% | 0% | **+39%** | **+48%** | **+46%** | **+53%** | **+20%** |

## mul_rcp

### gemini

**bare** — best: `ema × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 31% | 19% | 19% | 19% | 19% | 19% | 31% | 19% | 19% | 19% |
| gaussian | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 31% | 19% | 19% | 19% |
| causal | 19% | 31% | 19% | 19% | 19% | 19% | 19% | 63% | 19% | 19% | 19% |
| uniform | 19% | 31% | 19% | 19% | 19% | 19% | 19% | 63% | 19% | 19% | 36% |
| differential | 31% | 63% | 19% | 0% | 31% | 0% | 19% | 39% | 31% | 0% | 19% |
| ema | 19% | 31% | 19% | 19% | 19% | 19% | 19% | **67%** | 31% | 19% | 19% |

**described** — best: `identity × arithmetic_opt` (90%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 44% | 42% | **90%** | 67% | 69% | 51% | 48% | 52% | 61% | 42% |
| gaussian | 76% | 46% | 45% | 61% | 73% | 19% | 19% | 46% | 49% | 54% | 36% |
| causal | 67% | 50% | 37% | 73% | 67% | 69% | 51% | 45% | 45% | 58% | 19% |
| uniform | 73% | 50% | 44% | 61% | 73% | 19% | 51% | 49% | 45% | 60% | 36% |
| differential | 71% | 60% | 63% | 0% | 71% | 0% | 63% | 76% | 65% | 0% | 19% |
| ema | 67% | 51% | 45% | **90%** | 67% | 62% | 55% | 45% | 51% | 68% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+49%** | **+14%** | **+23%** | **+72%** | **+49%** | **+50%** | **+33%** | **+17%** | **+34%** | **+42%** | **+24%** |
| gaussian | **+58%** | **+27%** | **+26%** | **+42%** | **+55%** | 0% | 0% | **+16%** | **+31%** | **+35%** | **+18%** |
| causal | **+49%** | **+19%** | **+18%** | **+55%** | **+49%** | **+50%** | **+33%** | -18% | **+27%** | **+39%** | 0% |
| uniform | **+55%** | **+19%** | **+26%** | **+42%** | **+55%** | 0% | **+33%** | -14% | **+26%** | **+42%** | 0% |
| differential | **+40%** | -3% | **+44%** | 0% | **+40%** | 0% | **+44%** | **+38%** | **+34%** | 0% | 0% |
| ema | **+49%** | **+20%** | **+27%** | **+72%** | **+49%** | **+43%** | **+36%** | -22% | **+20%** | **+50%** | 0% |

### ollama

**bare** — best: `identity × conv_residual` (44%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 31% | 31% | 33% | 19% | 31% | 31% | 39% | 36% | **44%** | 19% | 31% |
| gaussian | 31% | 27% | **44%** | 19% | 31% | 31% | 31% | 36% | 39% | 19% | 31% |
| causal | 31% | 27% | 33% | 19% | 31% | 31% | 40% | 36% | **44%** | 19% | 31% |
| uniform | 31% | 27% | 40% | 19% | 31% | 31% | 40% | 36% | **44%** | 19% | 31% |
| differential | 39% | 40% | **44%** | 0% | 39% | 40% | **44%** | 40% | 39% | 0% | 19% |
| ema | 31% | 29% | 33% | 19% | 31% | 31% | 29% | 36% | **44%** | 19% | 31% |

**described** — best: `identity × arithmetic_opt` (90%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 54% | 67% | **90%** | 19% | 19% | 48% | 49% | 55% | 56% | 19% |
| gaussian | 19% | 49% | 44% | 68% | 19% | 19% | 19% | 52% | 77% | 52% | 19% |
| causal | 19% | 50% | 44% | 80% | 19% | 19% | 51% | 54% | 56% | 67% | 19% |
| uniform | 19% | 51% | 45% | 68% | 19% | 19% | 51% | 54% | 61% | 59% | 19% |
| differential | 31% | 65% | 63% | 0% | 31% | 19% | 66% | 49% | 68% | 0% | 19% |
| ema | 19% | 50% | 67% | **90%** | 19% | 19% | 46% | 41% | 54% | 56% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -12% | **+23%** | **+34%** | **+72%** | -12% | -12% | **+10%** | **+13%** | **+11%** | **+38%** | -12% |
| gaussian | -12% | **+22%** | 0% | **+50%** | -12% | -12% | -12% | **+16%** | **+38%** | **+34%** | -12% |
| causal | -12% | **+23%** | **+11%** | **+62%** | -12% | -12% | **+12%** | **+17%** | **+12%** | **+49%** | -12% |
| uniform | -12% | **+24%** | **+5%** | **+50%** | -12% | -12% | **+12%** | **+17%** | **+17%** | **+41%** | -12% |
| differential | -8% | **+26%** | **+18%** | 0% | -8% | -21% | **+22%** | **+9%** | **+30%** | 0% | 0% |
| ema | -12% | **+21%** | **+34%** | **+72%** | -12% | -12% | **+17%** | **+4%** | **+10%** | **+38%** | -12% |

### openai

**bare** — best: `differential × amplitude_sort` (31%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| gaussian | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| causal | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| uniform | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| differential | 19% | 19% | 19% | 0% | 19% | 19% | 19% | **31%** | 19% | 0% | 19% |
| ema | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |

**described** — best: `identity × arithmetic_opt` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 31% | 31% | 31% | **67%** | 31% | 19% | 51% | 31% | 54% | **67%** | 23% |
| gaussian | 31% | 60% | 62% | 19% | 31% | 19% | **67%** | 48% | 31% | 19% | 19% |
| causal | 31% | 31% | 31% | **67%** | 19% | 19% | 51% | 39% | 59% | **67%** | 19% |
| uniform | 31% | 63% | 31% | 19% | 31% | 19% | 57% | 43% | 39% | 19% | 31% |
| differential | 19% | 44% | 39% | 0% | 19% | 19% | 39% | 45% | 39% | 0% | 19% |
| ema | 31% | 39% | 39% | **67%** | 31% | 19% | 52% | 47% | 59% | **67%** | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+12%** | **+12%** | **+12%** | **+49%** | **+12%** | 0% | **+33%** | **+12%** | **+36%** | **+49%** | **+5%** |
| gaussian | **+12%** | **+41%** | **+43%** | 0% | **+12%** | 0% | **+49%** | **+29%** | **+12%** | 0% | 0% |
| causal | **+12%** | **+12%** | **+12%** | **+49%** | 0% | 0% | **+33%** | **+20%** | **+41%** | **+49%** | 0% |
| uniform | **+12%** | **+44%** | **+12%** | 0% | **+12%** | 0% | **+38%** | **+25%** | **+20%** | 0% | **+12%** |
| differential | 0% | **+26%** | **+20%** | 0% | 0% | 0% | **+20%** | **+14%** | **+20%** | 0% | 0% |
| ema | **+12%** | **+20%** | **+20%** | **+49%** | **+12%** | 0% | **+34%** | **+28%** | **+41%** | **+49%** | 0% |

## non1to1_fma_source

### gemini

**bare** — best: `uniform × arithmetic` (74%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 21% | 21% | 21% | 21% | 21% | 48% | 34% | 34% | 21% | 34% |
| gaussian | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 74% | 21% | 21% | 21% |
| uniform | 21% | 74% | **74%** | 21% | 21% | 21% | 21% | 34% | 21% | 21% | 21% |
| differential | 34% | 74% | 21% | 0% | 34% | 0% | 21% | 42% | 34% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 42% | 34% | 21% | 21% | 21% |

**described** — best: `identity × arithmetic_opt` (81%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 74% | 42% | 36% | **81%** | 74% | 21% | 50% | 43% | 48% | 59% | 36% |
| gaussian | 74% | 44% | 37% | 65% | 74% | 21% | 21% | 48% | 48% | 48% | 38% |
| causal | 74% | 43% | 36% | 73% | 74% | 65% | 50% | 48% | 48% | 58% | 21% |
| uniform | 74% | 44% | 39% | 65% | 66% | 21% | 44% | 44% | 48% | 48% | 38% |
| differential | 62% | 59% | 64% | 0% | 62% | 0% | 64% | 52% | 65% | 0% | 21% |
| ema | 74% | 43% | 37% | **81%** | 74% | 67% | 54% | 60% | 52% | 59% | 38% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+53%** | **+21%** | **+15%** | **+60%** | **+53%** | 0% | **+3%** | **+9%** | **+14%** | **+38%** | **+2%** |
| gaussian | **+53%** | **+23%** | **+17%** | **+45%** | **+53%** | 0% | 0% | **+13%** | **+27%** | **+27%** | **+17%** |
| causal | **+53%** | **+22%** | **+15%** | **+52%** | **+54%** | **+44%** | **+30%** | -26% | **+28%** | **+37%** | 0% |
| uniform | **+53%** | -30% | -35% | **+45%** | **+45%** | 0% | **+23%** | **+10%** | **+28%** | **+27%** | **+17%** |
| differential | **+28%** | -15% | **+43%** | 0% | **+28%** | 0% | **+43%** | **+11%** | **+31%** | 0% | 0% |
| ema | **+53%** | **+22%** | **+16%** | **+60%** | **+53%** | **+46%** | **+12%** | **+26%** | **+31%** | **+38%** | **+17%** |

### ollama

**bare** — best: `differential × arithmetic` (58%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 33% | 35% | 21% | 34% | 34% | 43% | 43% | 48% | 21% | 34% |
| gaussian | 34% | 31% | 43% | 21% | 34% | 34% | 34% | 43% | 42% | 21% | 34% |
| causal | 34% | 31% | 35% | 21% | 34% | 34% | 43% | 43% | 42% | 21% | 34% |
| uniform | 34% | 31% | 43% | 21% | 34% | 34% | 43% | 43% | 42% | 21% | 34% |
| differential | 42% | 48% | **58%** | 0% | 42% | 42% | **58%** | 48% | 42% | 0% | 21% |
| ema | 34% | 31% | 35% | 21% | 34% | 34% | 31% | 43% | 42% | 21% | 34% |

**described** — best: `identity × arithmetic_opt` (81%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 47% | 38% | **81%** | 21% | 21% | 51% | 52% | 51% | 45% | 59% |
| gaussian | 21% | 44% | 37% | 74% | 21% | 21% | 21% | 50% | 55% | 21% | 21% |
| causal | 21% | 49% | 21% | 21% | 21% | 21% | 51% | 50% | 55% | 21% | 21% |
| uniform | 21% | 42% | 35% | 74% | 21% | 21% | 44% | 50% | 58% | 21% | 21% |
| differential | 34% | 63% | 64% | 0% | 34% | 21% | 64% | 62% | 65% | 0% | 21% |
| ema | 21% | 44% | 36% | **81%** | 21% | 21% | 37% | 47% | 51% | 74% | 21% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -13% | **+14%** | **+2%** | **+60%** | -13% | -13% | **+8%** | **+9%** | **+3%** | **+24%** | **+24%** |
| gaussian | -13% | **+13%** | -6% | **+53%** | -13% | -13% | -13% | **+7%** | **+13%** | 0% | -13% |
| causal | -13% | **+19%** | -15% | 0% | -13% | -13% | **+8%** | **+7%** | **+13%** | 0% | -13% |
| uniform | -13% | **+11%** | -8% | **+54%** | -13% | -13% | **+2%** | **+7%** | **+16%** | 0% | -13% |
| differential | -8% | **+16%** | **+6%** | 0% | -8% | -21% | **+6%** | **+14%** | **+23%** | 0% | 0% |
| ema | -13% | **+13%** | **+1%** | **+60%** | -13% | -13% | **+7%** | **+4%** | **+9%** | **+53%** | -13% |

### openai

**bare** — best: `differential × amplitude_sort` (34%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| gaussian | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| causal | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| uniform | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% | 21% |
| differential | 21% | 21% | 21% | 0% | 21% | 21% | 21% | **34%** | 21% | 0% | 21% |
| ema | 21% | 21% | 21% | 21% | 21% | 21% | 21% | **34%** | 21% | 21% | 21% |

**described** — best: `identity × dynamic_stack_healing` (81%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 34% | 34% | 34% | 74% | 34% | 21% | 43% | 42% | 66% | **81%** | 23% |
| gaussian | 34% | 65% | 65% | 74% | 34% | 21% | 59% | 48% | 34% | 74% | 34% |
| causal | 34% | 34% | 69% | **81%** | 21% | 21% | 53% | 48% | 66% | **81%** | 34% |
| uniform | 34% | 48% | 62% | 74% | 34% | 21% | 42% | 34% | 55% | 74% | 34% |
| differential | 21% | 48% | 45% | 0% | 21% | 74% | 42% | 48% | 42% | 0% | 21% |
| ema | 34% | 34% | 34% | 74% | 34% | 21% | 50% | 67% | 66% | **81%** | 34% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+13%** | **+13%** | **+13%** | **+54%** | **+13%** | 0% | **+22%** | **+21%** | **+46%** | **+60%** | **+3%** |
| gaussian | **+13%** | **+44%** | **+44%** | **+53%** | **+13%** | 0% | **+38%** | **+28%** | **+13%** | **+53%** | **+13%** |
| causal | **+13%** | **+13%** | **+48%** | **+60%** | 0% | 0% | **+32%** | **+28%** | **+45%** | **+60%** | **+13%** |
| uniform | **+13%** | **+27%** | **+41%** | **+53%** | **+13%** | 0% | **+21%** | **+13%** | **+34%** | **+53%** | **+13%** |
| differential | 0% | **+27%** | **+24%** | 0% | 0% | **+53%** | **+21%** | **+14%** | **+21%** | 0% | 0% |
| ema | **+13%** | **+13%** | **+13%** | **+54%** | **+13%** | 0% | **+30%** | **+33%** | **+45%** | **+60%** | **+13%** |

## rcp_only

### gemini

**bare** — best: `differential × per_token` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 26% | 26% | 26% | 26% | 26% | 41% | 41% | 26% | 26% | 26% |
| gaussian | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 41% | 26% | 26% | 26% |
| causal | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 41% | 26% | 26% | 26% |
| uniform | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 41% | 41% | 26% | 26% |
| differential | 26% | **85%** | 26% | 0% | 26% | 0% | **85%** | 49% | 41% | 0% | 26% |
| ema | 26% | 26% | 26% | 26% | 26% | 26% | 41% | **85%** | 26% | 26% | 26% |

**described** — best: `identity × arithmetic_opt` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 85% | 52% | 41% | **88%** | 77% | 26% | 57% | 50% | 51% | 71% | 41% |
| gaussian | 85% | 49% | 44% | 65% | 77% | 26% | 26% | 51% | 63% | 71% | 49% |
| causal | 85% | 51% | 43% | 65% | 77% | 26% | 57% | 43% | 53% | 71% | 41% |
| uniform | 85% | 51% | 46% | 54% | 77% | 26% | 57% | 51% | 56% | 59% | 49% |
| differential | 26% | 79% | 59% | 0% | 26% | 0% | 59% | 77% | 75% | 0% | 26% |
| ema | 77% | 49% | 44% | **88%** | 77% | 77% | 51% | 51% | 53% | 61% | 23% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+59%** | **+26%** | **+16%** | **+62%** | **+51%** | 0% | **+17%** | **+9%** | **+25%** | **+46%** | **+15%** |
| gaussian | **+59%** | **+24%** | **+18%** | **+39%** | **+51%** | 0% | 0% | **+10%** | **+37%** | **+46%** | **+23%** |
| causal | **+59%** | **+25%** | **+17%** | **+39%** | **+51%** | 0% | **+32%** | **+3%** | **+27%** | **+46%** | **+15%** |
| uniform | **+59%** | **+25%** | **+20%** | **+28%** | **+51%** | 0% | **+32%** | **+10%** | **+16%** | **+33%** | **+23%** |
| differential | 0% | -5% | **+33%** | 0% | 0% | 0% | -26% | **+28%** | **+34%** | 0% | 0% |
| ema | **+51%** | **+24%** | **+18%** | **+62%** | **+51%** | **+51%** | **+10%** | -34% | **+27%** | **+35%** | -3% |

### ollama

**bare** — best: `identity × delta_decode` (49%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 41% | 37% | 37% | 26% | 41% | 41% | **49%** | 42% | **49%** | 26% | 41% |
| gaussian | 41% | 30% | 41% | 26% | 41% | **49%** | 37% | 42% | 41% | 26% | 20% |
| causal | 41% | 30% | 37% | 26% | 41% | 41% | 37% | 42% | **49%** | 26% | 41% |
| uniform | 41% | 30% | **49%** | 26% | 41% | 41% | 37% | 42% | **49%** | 26% | 20% |
| differential | 41% | 42% | 41% | 0% | 41% | **49%** | 41% | 42% | **49%** | 0% | 26% |
| ema | 41% | 33% | 37% | 26% | 41% | 41% | 30% | 42% | **49%** | 26% | 41% |

**described** — best: `identity × arithmetic_opt` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 77% | 48% | **88%** | 26% | 26% | 57% | 75% | 51% | 77% | 26% |
| gaussian | 26% | 66% | **88%** | 77% | 26% | 26% | 26% | 53% | 59% | 26% | 51% |
| causal | 26% | **88%** | 26% | 26% | 26% | 26% | 57% | 53% | 59% | 26% | 26% |
| uniform | 26% | 68% | 77% | **88%** | 26% | 26% | 57% | 53% | **88%** | 26% | 51% |
| differential | 41% | 81% | 59% | 0% | 41% | 26% | 59% | 73% | 77% | 0% | 26% |
| ema | 26% | 51% | 77% | **88%** | 26% | 26% | 43% | 46% | 54% | 77% | 26% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -15% | **+40%** | **+11%** | **+62%** | -15% | -15% | **+9%** | **+33%** | **+2%** | **+51%** | -15% |
| gaussian | -15% | **+36%** | **+47%** | **+51%** | -15% | -23% | -11% | **+11%** | **+18%** | 0% | **+30%** |
| causal | -15% | **+57%** | -11% | 0% | -15% | -15% | **+20%** | **+11%** | **+10%** | 0% | -15% |
| uniform | -15% | **+38%** | **+28%** | **+62%** | -15% | -15% | **+20%** | **+11%** | **+39%** | 0% | **+30%** |
| differential | 0% | **+39%** | **+18%** | 0% | 0% | -23% | **+18%** | **+31%** | **+28%** | 0% | 0% |
| ema | -15% | **+17%** | **+40%** | **+62%** | -15% | -15% | **+12%** | **+4%** | **+5%** | **+51%** | -15% |

### openai

**bare** — best: `differential × amplitude_sort` (41%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% |
| gaussian | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% |
| causal | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% |
| uniform | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% |
| differential | 26% | 26% | 26% | 0% | 26% | 26% | 26% | **41%** | 26% | 0% | 26% |
| ema | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% | 26% |

**described** — best: `identity × arithmetic_opt` (85%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 41% | 41% | **85%** | 26% | 26% | 37% | 41% | 66% | **85%** | 26% |
| gaussian | 41% | 60% | 49% | 26% | 26% | 26% | 26% | 41% | 41% | 26% | 41% |
| causal | 26% | 41% | 49% | **85%** | 26% | 26% | 42% | 48% | 75% | 77% | **85%** |
| uniform | 41% | 56% | 63% | 77% | 41% | 26% | 41% | 48% | 45% | 77% | 41% |
| differential | 26% | 49% | 42% | 0% | 26% | 26% | 36% | 41% | 42% | 0% | 26% |
| ema | 41% | 41% | 72% | **85%** | 26% | 26% | 49% | 53% | 75% | **85%** | 20% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+15%** | **+15%** | **+59%** | 0% | 0% | **+11%** | **+15%** | **+40%** | **+59%** | 0% |
| gaussian | **+15%** | **+34%** | **+23%** | 0% | 0% | 0% | 0% | **+15%** | **+15%** | 0% | **+15%** |
| causal | 0% | **+15%** | **+23%** | **+59%** | 0% | 0% | **+16%** | **+22%** | **+49%** | **+51%** | **+59%** |
| uniform | **+15%** | **+30%** | **+37%** | **+51%** | **+15%** | 0% | **+15%** | **+22%** | **+19%** | **+51%** | **+15%** |
| differential | 0% | **+23%** | **+16%** | 0% | 0% | 0% | **+10%** | 0% | **+16%** | 0% | 0% |
| ema | **+15%** | **+15%** | **+46%** | **+59%** | 0% | 0% | **+23%** | **+27%** | **+49%** | **+59%** | -6% |

## reference

### gemini

**bare** — best: `gaussian × arithmetic` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 31% | 31% | 19% | 19% | 19% | 19% | 63% | 19% | 19% | 31% |
| gaussian | 19% | 19% | **67%** | 19% | 19% | 19% | 19% | **67%** | 19% | 19% | 19% |
| causal | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 63% | 19% | 19% | 19% |
| uniform | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 63% | 31% | 19% | 19% |
| differential | 31% | 63% | 19% | 0% | 31% | 0% | 19% | 39% | 31% | 0% | 19% |
| ema | 19% | 19% | 19% | 19% | 19% | 19% | 19% | **67%** | 31% | 19% | 19% |

**described** — best: `identity × arithmetic_opt` (83%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 69% | 48% | 38% | **83%** | 69% | 72% | 47% | 52% | 44% | 64% | 24% |
| gaussian | 69% | 48% | 42% | 53% | 69% | 68% | 19% | 54% | 54% | 49% | 36% |
| causal | 75% | 45% | 38% | 73% | 75% | 72% | 47% | 42% | 43% | 58% | 19% |
| uniform | 69% | 54% | 46% | 61% | 69% | 68% | 47% | 49% | 51% | 55% | 36% |
| differential | 57% | 64% | 54% | 0% | 57% | 0% | 54% | 31% | 57% | 0% | 19% |
| ema | 69% | 51% | 39% | **83%** | 69% | 62% | 48% | 45% | 52% | 52% | 35% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+17%** | **+7%** | **+64%** | **+50%** | **+54%** | **+28%** | -11% | **+26%** | **+46%** | -7% |
| gaussian | **+50%** | **+30%** | -25% | **+35%** | **+50%** | **+49%** | 0% | -14% | **+35%** | **+31%** | **+18%** |
| causal | **+56%** | **+26%** | **+20%** | **+55%** | **+56%** | **+54%** | **+28%** | -21% | **+25%** | **+39%** | 0% |
| uniform | **+50%** | **+35%** | **+27%** | **+42%** | **+50%** | **+49%** | **+28%** | -14% | **+20%** | **+36%** | **+18%** |
| differential | **+27%** | **+1%** | **+36%** | 0% | **+27%** | 0% | **+36%** | -8% | **+26%** | 0% | 0% |
| ema | **+50%** | **+33%** | **+20%** | **+64%** | **+50%** | **+43%** | **+30%** | -22% | **+21%** | **+34%** | **+17%** |

### ollama

**bare** — best: `gaussian × delta_decode` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 31% | 38% | 36% | 19% | 31% | 31% | 57% | 36% | 44% | 19% | 21% |
| gaussian | 31% | 27% | 31% | 19% | 31% | 31% | **57%** | 36% | 44% | 19% | 21% |
| causal | 31% | 27% | 29% | 19% | 31% | 31% | 57% | 36% | 44% | 19% | 21% |
| uniform | 31% | 27% | 31% | 19% | 31% | 31% | 49% | 36% | 44% | 19% | 21% |
| differential | 39% | 52% | 52% | 0% | 39% | 39% | 52% | 40% | 55% | 0% | 33% |
| ema | 31% | 27% | 31% | 19% | 31% | 31% | 40% | 36% | 44% | 19% | 21% |

**described** — best: `identity × arithmetic_opt` (83%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 41% | 67% | **83%** | 19% | 19% | 48% | 45% | 51% | 47% | 57% |
| gaussian | 19% | 44% | 40% | 72% | 19% | 19% | 19% | 46% | 52% | 52% | 19% |
| causal | 19% | 44% | 38% | 73% | 19% | 19% | 48% | 43% | 56% | 67% | 19% |
| uniform | 19% | 44% | 37% | 68% | 19% | 19% | 48% | 46% | 58% | 52% | 34% |
| differential | 31% | 58% | 54% | 0% | 31% | 19% | 54% | 49% | 57% | 0% | 19% |
| ema | 19% | 43% | 67% | **83%** | 19% | 55% | 46% | 43% | 51% | 47% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -12% | **+3%** | **+31%** | **+64%** | -12% | -12% | -8% | **+9%** | **+7%** | **+29%** | **+36%** |
| gaussian | -12% | **+17%** | **+9%** | **+53%** | -12% | -12% | -38% | **+10%** | **+8%** | **+34%** | -3% |
| causal | -12% | **+17%** | **+9%** | **+55%** | -12% | -12% | -8% | **+7%** | **+12%** | **+49%** | -3% |
| uniform | -12% | **+17%** | **+6%** | **+50%** | -12% | -12% | 0% | **+10%** | **+14%** | **+34%** | **+13%** |
| differential | -8% | **+6%** | **+2%** | 0% | -8% | -20% | **+2%** | **+9%** | **+2%** | 0% | -14% |
| ema | -12% | **+16%** | **+36%** | **+64%** | -12% | **+24%** | **+6%** | **+7%** | **+7%** | **+29%** | -3% |

### openai

**bare** — best: `differential × amplitude_sort` (31%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| gaussian | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| causal | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| uniform | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |
| differential | 19% | 19% | 19% | 0% | 19% | 19% | 19% | **31%** | 19% | 0% | 19% |
| ema | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% | 19% |

**described** — best: `causal × dynamic_stack_healing` (83%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 45% | 31% | 31% | 83% | 31% | 19% | 42% | 39% | 31% | 83% | 31% |
| gaussian | 45% | 52% | 62% | 19% | 31% | 19% | 67% | 49% | 61% | 19% | 31% |
| causal | 19% | 31% | 31% | 77% | 19% | 19% | 42% | 38% | 65% | **83%** | 38% |
| uniform | 31% | 36% | 58% | 67% | 31% | 19% | 57% | 46% | 64% | 63% | 31% |
| differential | 19% | 39% | 39% | 0% | 19% | 19% | 39% | 45% | 52% | 0% | 19% |
| ema | 45% | 31% | 31% | 83% | 31% | 19% | 47% | 43% | 65% | 83% | 19% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+27%** | **+12%** | **+12%** | **+64%** | **+12%** | 0% | **+24%** | **+20%** | **+12%** | **+64%** | **+12%** |
| gaussian | **+27%** | **+34%** | **+43%** | 0% | **+12%** | 0% | **+49%** | **+30%** | **+42%** | 0% | **+12%** |
| causal | 0% | **+12%** | **+12%** | **+58%** | 0% | 0% | **+24%** | **+20%** | **+47%** | **+64%** | **+20%** |
| uniform | **+12%** | **+18%** | **+40%** | **+49%** | **+12%** | 0% | **+38%** | **+28%** | **+46%** | **+44%** | **+12%** |
| differential | 0% | **+21%** | **+20%** | 0% | 0% | 0% | **+20%** | **+14%** | **+34%** | 0% | 0% |
| ema | **+27%** | **+12%** | **+12%** | **+64%** | **+12%** | 0% | **+29%** | **+25%** | **+47%** | **+64%** | 0% |

## reference_big

### gemini

**bare** — best: `gaussian × amplitude_sort` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 15% | 26% | 26% | 15% | 15% | 15% | 26% | 33% | 26% | 15% | 26% |
| gaussian | 15% | 15% | 15% | 15% | 15% | 15% | 15% | **60%** | 15% | 15% | 15% |
| causal | 15% | 15% | 15% | 15% | 15% | 15% | 26% | 55% | 15% | 15% | 15% |
| uniform | 15% | 57% | 57% | 15% | 15% | 15% | 15% | 33% | 15% | 15% | 15% |
| differential | 26% | 55% | 15% | 0% | 26% | 0% | 15% | 39% | 15% | 0% | 15% |
| ema | 15% | 15% | 15% | 15% | 15% | 15% | 26% | 33% | 15% | 15% | 15% |

**described** — best: `identity × arithmetic_opt` (78%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 55% | 45% | 34% | **78%** | 55% | 70% | 41% | 40% | 43% | 51% | 20% |
| gaussian | 58% | 43% | 38% | 56% | 55% | 15% | 15% | 49% | 49% | 47% | 35% |
| causal | 60% | 42% | 39% | 77% | 60% | 74% | 41% | 48% | 42% | 48% | 23% |
| uniform | 58% | 45% | 38% | 56% | 58% | 68% | 41% | 53% | 47% | 46% | 35% |
| differential | 62% | 56% | 48% | 0% | 62% | 0% | 48% | 56% | 51% | 0% | 15% |
| ema | 66% | 45% | 32% | **78%** | 55% | 54% | 43% | 45% | 50% | 43% | 35% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+40%** | **+19%** | **+8%** | **+63%** | **+40%** | **+55%** | **+15%** | **+7%** | **+16%** | **+36%** | -6% |
| gaussian | **+43%** | **+28%** | **+23%** | **+41%** | **+40%** | 0% | 0% | -11% | **+34%** | **+32%** | **+20%** |
| causal | **+45%** | **+27%** | **+24%** | **+62%** | **+45%** | **+59%** | **+15%** | -7% | **+27%** | **+33%** | **+8%** |
| uniform | **+43%** | -12% | -20% | **+41%** | **+43%** | **+52%** | **+26%** | **+19%** | **+32%** | **+31%** | **+20%** |
| differential | **+35%** | **+1%** | **+32%** | 0% | **+35%** | 0% | **+32%** | **+17%** | **+36%** | 0% | 0% |
| ema | **+51%** | **+30%** | **+17%** | **+63%** | **+40%** | **+39%** | **+17%** | **+12%** | **+35%** | **+28%** | **+20%** |

### ollama

**bare** — best: `differential × arithmetic` (55%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 26% | 33% | 37% | 15% | 26% | 26% | 50% | 30% | 39% | 15% | 33% |
| gaussian | 26% | 22% | 30% | 15% | 26% | 26% | 50% | 30% | 39% | 15% | 20% |
| causal | 33% | 23% | 28% | 15% | 33% | 26% | 44% | 30% | 39% | 15% | 33% |
| uniform | 26% | 23% | 30% | 15% | 26% | 26% | 50% | 30% | 35% | 15% | 20% |
| differential | 33% | 42% | **55%** | 0% | 33% | 33% | 50% | 32% | 50% | 0% | 30% |
| ema | 33% | 25% | 28% | 15% | 33% | 26% | 32% | 30% | 39% | 15% | 33% |

**described** — best: `identity × arithmetic_opt` (78%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 62% | 36% | 36% | **78%** | 66% | 15% | 41% | 45% | 55% | 57% | 15% |
| gaussian | 66% | 37% | 37% | 61% | 66% | 15% | 15% | 45% | 51% | 41% | 57% |
| causal | 15% | 36% | 34% | 15% | 15% | 15% | 43% | 46% | 58% | 44% | 29% |
| uniform | 65% | 42% | 59% | 65% | 66% | 15% | 43% | 45% | 55% | 15% | 57% |
| differential | 49% | 44% | 47% | 0% | 49% | 15% | 50% | 46% | 49% | 0% | 15% |
| ema | 59% | 42% | 57% | 75% | 62% | 56% | 42% | 36% | 52% | 57% | 15% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+36%** | **+3%** | -1% | **+63%** | **+40%** | -11% | -10% | **+15%** | **+16%** | **+42%** | -18% |
| gaussian | **+40%** | **+15%** | **+7%** | **+46%** | **+40%** | -11% | -35% | **+15%** | **+13%** | **+26%** | **+37%** |
| causal | -18% | **+13%** | **+6%** | 0% | -18% | -11% | -1% | **+16%** | **+19%** | **+29%** | -4% |
| uniform | **+39%** | **+18%** | **+29%** | **+49%** | **+40%** | -11% | -7% | **+15%** | **+19%** | 0% | **+37%** |
| differential | **+16%** | **+2%** | -8% | 0% | **+16%** | -18% | -1% | **+14%** | -1% | 0% | -14% |
| ema | **+26%** | **+17%** | **+30%** | **+59%** | **+29%** | **+30%** | **+10%** | **+6%** | **+13%** | **+42%** | -18% |

### openai

**bare** — best: `differential × per_token` (26%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% |
| gaussian | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% |
| causal | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% |
| uniform | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% |
| differential | 15% | **26%** | 15% | 0% | 15% | 15% | 15% | **26%** | 15% | 0% | 15% |
| ema | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% | 15% |

**described** — best: `identity × arithmetic_opt` (68%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 15% | 26% | 26% | **68%** | 15% | 15% | 35% | 33% | 33% | 62% | 15% |
| gaussian | 15% | 33% | 26% | 15% | 26% | 15% | 49% | 34% | 33% | 15% | 26% |
| causal | 15% | 26% | 26% | 66% | 15% | 15% | 39% | 38% | 26% | 66% | 21% |
| uniform | 15% | 33% | 33% | 15% | 26% | 15% | 39% | 36% | 50% | 15% | 26% |
| differential | 26% | 35% | 43% | 0% | 26% | 55% | 39% | 33% | 33% | 0% | 15% |
| ema | 15% | 26% | 26% | **68%** | 15% | 15% | 44% | 38% | 26% | 26% | 21% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+11%** | **+11%** | **+53%** | 0% | 0% | **+20%** | **+18%** | **+18%** | **+47%** | 0% |
| gaussian | 0% | **+18%** | **+11%** | 0% | **+11%** | 0% | **+34%** | **+19%** | **+18%** | 0% | **+11%** |
| causal | 0% | **+11%** | **+11%** | **+51%** | 0% | 0% | **+24%** | **+22%** | **+11%** | **+51%** | **+6%** |
| uniform | 0% | **+18%** | **+18%** | 0% | **+11%** | 0% | **+24%** | **+21%** | **+35%** | 0% | **+11%** |
| differential | **+11%** | **+9%** | **+28%** | 0% | **+11%** | **+40%** | **+24%** | **+7%** | **+18%** | 0% | 0% |
| ema | 0% | **+11%** | **+11%** | **+53%** | 0% | 0% | **+29%** | **+22%** | **+11%** | **+11%** | **+6%** |

# Full results — all kernels

Per-kernel jaccard matrices for every provider × mode combination.

## add_fma

### gemini

**bare** — best: `gaussian × per_token` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 50% | 17% | 17% | 17% | 17% | 50% | 17% |
| gaussian | 17% | **67%** | 50% | 17% | 17% | 17% | 17% | **67%** | 50% |
| causal | 17% | **67%** | 17% | 17% | 17% | 17% | 17% | 50% | 57% |
| uniform | 17% | **67%** | 57% | 17% | 17% | 17% | 17% | **67%** | 50% |
| differential | 50% | **67%** | 17% | 0% | 50% | 0% | 17% | **67%** | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | **100%** | 86% | **100%** | **100%** | 63% | 86% | 75% | 86% |
| gaussian | **100%** | **100%** | 86% | 67% | **100%** | 63% | 17% | 75% | 75% |
| causal | 83% | **100%** | 86% | 83% | 83% | 63% | 86% | 75% | 75% |
| uniform | **100%** | **100%** | 86% | 83% | **100%** | 63% | 86% | 75% | 86% |
| differential | 50% | 67% | 83% | 0% | 50% | 0% | **100%** | 63% | 83% |
| ema | **100%** | 86% | 86% | **100%** | **100%** | 63% | 86% | 86% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+83%** | **+36%** | **+83%** | **+83%** | **+46%** | **+69%** | **+25%** | **+69%** |
| gaussian | **+83%** | **+33%** | **+36%** | **+50%** | **+83%** | **+46%** | 0% | **+8%** | **+25%** |
| causal | **+67%** | **+33%** | **+69%** | **+67%** | **+67%** | **+46%** | **+69%** | **+25%** | **+18%** |
| uniform | **+83%** | **+33%** | **+29%** | **+67%** | **+83%** | **+46%** | **+69%** | **+8%** | **+36%** |
| differential | 0% | 0% | **+67%** | 0% | 0% | 0% | **+83%** | -4% | **+33%** |
| ema | **+83%** | **+69%** | **+69%** | **+83%** | **+83%** | **+46%** | **+69%** | **+36%** | **+50%** |

### ollama

**bare** — best: `identity × per_token` (71%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **71%** | 63% | 17% | 50% | 50% | 67% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |
| uniform | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |
| differential | 50% | **71%** | 17% | 0% | 50% | 0% | 17% | 50% | 57% |
| ema | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 83% | 75% | **100%** | 17% | 17% | 71% | 63% | 86% |
| gaussian | 17% | **100%** | 86% | 17% | 17% | 17% | 17% | 63% | 63% |
| causal | 17% | 86% | 86% | 71% | 17% | 17% | 71% | 63% | 67% |
| uniform | 17% | **100%** | 86% | 67% | 17% | 17% | 71% | 63% | 63% |
| differential | 71% | 83% | 83% | 0% | 71% | 0% | 67% | 57% | 83% |
| ema | 17% | **100%** | 86% | **100%** | 17% | 63% | 71% | 63% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+12%** | **+13%** | **+83%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| gaussian | -33% | **+50%** | **+36%** | 0% | -33% | -33% | -33% | **+13%** | **+13%** |
| causal | -33% | **+36%** | **+36%** | **+55%** | -33% | -33% | **+5%** | **+13%** | **+17%** |
| uniform | -33% | **+50%** | **+36%** | **+50%** | -33% | -33% | **+5%** | **+13%** | **+13%** |
| differential | **+21%** | **+12%** | **+67%** | 0% | **+21%** | 0% | **+50%** | **+7%** | **+26%** |
| ema | -33% | **+50%** | **+36%** | **+83%** | -33% | **+13%** | **+5%** | **+13%** | **+17%** |

### openai

**bare** — best: `identity × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 50% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| differential | 17% | 50% | 17% | 0% | 17% | 0% | 17% | 50% | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 50% | 50% | **100%** | 71% | 17% | 50% | 67% | 71% |
| gaussian | 57% | 83% | 63% | 67% | 71% | 17% | 17% | 83% | 83% |
| causal | 83% | 83% | 67% | **100%** | 83% | 17% | 50% | 67% | 67% |
| uniform | 57% | 83% | 67% | 83% | 83% | 17% | 50% | 83% | 71% |
| differential | 17% | 50% | 83% | 0% | 50% | 0% | 83% | 50% | 50% |
| ema | 67% | 83% | 67% | **100%** | 71% | 17% | 83% | 67% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+40%** | 0% | **+33%** | **+83%** | **+55%** | 0% | **+33%** | 0% | **+55%** |
| gaussian | **+40%** | **+67%** | **+46%** | **+50%** | **+55%** | 0% | 0% | **+33%** | **+67%** |
| causal | **+67%** | **+67%** | **+50%** | **+83%** | **+67%** | 0% | **+33%** | 0% | **+50%** |
| uniform | **+40%** | **+67%** | **+50%** | **+67%** | **+67%** | 0% | **+33%** | **+33%** | **+55%** |
| differential | 0% | 0% | **+67%** | 0% | **+33%** | 0% | **+67%** | 0% | **+33%** |
| ema | **+50%** | **+67%** | **+50%** | **+83%** | **+55%** | 0% | **+67%** | **+17%** | **+50%** |

## add_fma_rcp

### gemini

**bare** — best: `identity × amplitude_sort` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 14% | 43% | 14% | 14% | 14% | 43% | **57%** | 50% |
| gaussian | 14% | **57%** | **57%** | 14% | 14% | 14% | 14% | 50% | 14% |
| causal | 14% | **57%** | 14% | 14% | 14% | 14% | 43% | **57%** | 43% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 43% | **57%** | 43% |
| differential | 43% | **57%** | 14% | 0% | 43% | 0% | 14% | **57%** | 43% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 43% | 50% | 43% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 86% | 75% | **100%** | **100%** | 75% | 75% | 75% | **100%** |
| gaussian | **100%** | 86% | 75% | 71% | **100%** | 75% | 14% | 88% | 88% |
| causal | 71% | **100%** | 88% | 86% | 71% | 75% | 88% | 88% | 88% |
| uniform | **100%** | 86% | 75% | 86% | **100%** | 75% | 88% | 88% | **100%** |
| differential | 63% | 88% | 86% | 0% | 63% | 0% | 71% | 88% | 71% |
| ema | **100%** | 75% | 88% | **100%** | **100%** | 75% | 88% | 88% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+86%** | **+71%** | **+32%** | **+86%** | **+86%** | **+61%** | **+32%** | **+18%** | **+50%** |
| gaussian | **+86%** | **+29%** | **+18%** | **+57%** | **+86%** | **+61%** | 0% | **+38%** | **+73%** |
| causal | **+57%** | **+43%** | **+73%** | **+71%** | **+57%** | **+61%** | **+45%** | **+30%** | **+45%** |
| uniform | **+86%** | **+71%** | **+61%** | **+71%** | **+86%** | **+61%** | **+45%** | **+30%** | **+57%** |
| differential | **+20%** | **+30%** | **+71%** | 0% | **+20%** | 0% | **+57%** | **+30%** | **+29%** |
| ema | **+86%** | **+61%** | **+73%** | **+86%** | **+86%** | **+61%** | **+45%** | **+38%** | **+57%** |

### ollama

**bare** — best: `differential × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | 75% | 75% | 14% | 43% | 43% | 57% | 43% | 43% |
| gaussian | 43% | 43% | 43% | 14% | 43% | 43% | 43% | 43% | 43% |
| causal | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |
| uniform | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |
| differential | 43% | **100%** | 71% | 0% | 43% | 0% | 71% | 43% | 86% |
| ema | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 71% | 88% | **100%** | 14% | 14% | 75% | 75% | 75% |
| gaussian | 14% | 86% | 75% | 86% | 14% | 14% | 14% | 75% | 75% |
| causal | 14% | 88% | 88% | 75% | 14% | 14% | 75% | 75% | 71% |
| uniform | 14% | 86% | 88% | 86% | 14% | 14% | 75% | 75% | 75% |
| differential | 63% | 71% | 86% | 0% | 63% | 14% | 71% | 71% | 71% |
| ema | 14% | 88% | 88% | **100%** | 14% | 75% | 63% | 75% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -29% | -4% | **+13%** | **+86%** | -29% | -29% | **+18%** | **+32%** | **+32%** |
| gaussian | -29% | **+43%** | **+32%** | **+71%** | -29% | -29% | -29% | **+32%** | **+32%** |
| causal | -29% | **+45%** | **+45%** | **+61%** | -29% | -29% | **+18%** | **+32%** | **+29%** |
| uniform | -29% | **+43%** | **+45%** | **+71%** | -29% | -29% | **+18%** | **+32%** | **+32%** |
| differential | **+20%** | -29% | **+14%** | 0% | **+20%** | **+14%** | 0% | **+29%** | -14% |
| ema | -29% | **+45%** | **+45%** | **+86%** | -29% | **+32%** | **+5%** | **+32%** | **+29%** |

### openai

**bare** — best: `identity × amplitude_sort` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 43% | 14% | 14% | 14% | 14% | 14% | **57%** | 14% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 43% | 14% |
| causal | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 43% | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 43% | 14% |
| differential | 43% | 43% | 14% | 0% | 43% | 0% | 14% | 43% | 14% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 50% | 14% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | 43% | 43% | **100%** | 86% | 14% | 43% | 71% | 86% |
| gaussian | 71% | 71% | 86% | 71% | 86% | 14% | 14% | 86% | 71% |
| causal | 86% | 71% | 57% | **100%** | 86% | 14% | 43% | 57% | 57% |
| uniform | 71% | 71% | 57% | 71% | 86% | 14% | 43% | 86% | 86% |
| differential | 14% | 43% | 86% | 0% | 43% | 0% | 86% | 43% | 57% |
| ema | 57% | 71% | 57% | **100%** | 86% | 14% | 86% | 71% | 57% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+57%** | 0% | **+29%** | **+86%** | **+71%** | 0% | **+29%** | **+14%** | **+71%** |
| gaussian | **+57%** | **+57%** | **+71%** | **+57%** | **+71%** | 0% | 0% | **+43%** | **+57%** |
| causal | **+71%** | **+57%** | **+43%** | **+86%** | **+71%** | 0% | **+29%** | **+14%** | **+43%** |
| uniform | **+57%** | **+57%** | **+43%** | **+57%** | **+71%** | 0% | **+29%** | **+43%** | **+71%** |
| differential | -29% | 0% | **+71%** | 0% | 0% | 0% | **+71%** | 0% | **+43%** |
| ema | **+43%** | **+57%** | **+43%** | **+86%** | **+71%** | 0% | **+71%** | **+21%** | **+43%** |

## add_mul_rcp

### gemini

**bare** — best: `identity × amplitude_sort` (57%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 43% | 43% | 14% | 14% | 14% | 14% | **57%** | 43% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **57%** | 43% |
| causal | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 50% | 43% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **57%** | 14% |
| differential | 43% | **57%** | 14% | 0% | 43% | 0% | 14% | **57%** | 43% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 14% | 43% | 14% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | 71% | 86% | **100%** | **100%** | **100%** | **100%** | 75% | **100%** |
| gaussian | 71% | 63% | 75% | 57% | 71% | **100%** | 14% | 88% | 88% |
| causal | **100%** | **100%** | 88% | 86% | 86% | **100%** | **100%** | 88% | 88% |
| uniform | 71% | 75% | **100%** | 71% | 71% | **100%** | **100%** | 88% | 88% |
| differential | 86% | 63% | **100%** | 0% | 86% | 0% | **100%** | 88% | **100%** |
| ema | 71% | 88% | 88% | **100%** | 71% | **100%** | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+57%** | **+29%** | **+43%** | **+86%** | **+86%** | **+86%** | **+86%** | **+18%** | **+57%** |
| gaussian | **+57%** | **+48%** | **+61%** | **+43%** | **+57%** | **+86%** | 0% | **+30%** | **+45%** |
| causal | **+86%** | **+86%** | **+73%** | **+71%** | **+71%** | **+86%** | **+86%** | **+38%** | **+45%** |
| uniform | **+57%** | **+61%** | **+86%** | **+57%** | **+57%** | **+86%** | **+86%** | **+30%** | **+73%** |
| differential | **+43%** | **+5%** | **+86%** | 0% | **+43%** | 0% | **+86%** | **+30%** | **+57%** |
| ema | **+57%** | **+73%** | **+73%** | **+86%** | **+57%** | **+86%** | **+86%** | **+45%** | **+73%** |

### ollama

**bare** — best: `identity × per_token` (75%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | **75%** | **75%** | 14% | 43% | 43% | 57% | 43% | 43% |
| gaussian | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |
| causal | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |
| uniform | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |
| differential | 43% | 63% | 57% | 0% | 43% | 0% | 57% | 43% | **75%** |
| ema | 43% | 43% | 43% | 14% | 43% | 43% | 57% | 43% | 43% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 75% | 57% | **100%** | 14% | 14% | 75% | 63% | 88% |
| gaussian | 14% | 63% | 63% | 71% | 14% | 14% | 14% | 75% | 75% |
| causal | 14% | 75% | 75% | 86% | 14% | 14% | 75% | 75% | 63% |
| uniform | 14% | 63% | 75% | 71% | 14% | 14% | 75% | 75% | 88% |
| differential | 63% | 50% | **100%** | 0% | 63% | 0% | **100%** | 71% | 88% |
| ema | 14% | 88% | 57% | **100%** | 14% | 75% | 88% | 75% | 57% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -29% | 0% | -18% | **+86%** | -29% | -29% | **+18%** | **+20%** | **+45%** |
| gaussian | -29% | **+20%** | **+20%** | **+57%** | -29% | -29% | -43% | **+32%** | **+32%** |
| causal | -29% | **+32%** | **+32%** | **+71%** | -29% | -29% | **+18%** | **+32%** | **+20%** |
| uniform | -29% | **+20%** | **+32%** | **+57%** | -29% | -29% | **+18%** | **+32%** | **+45%** |
| differential | **+20%** | -12% | **+43%** | 0% | **+20%** | 0% | **+43%** | **+29%** | **+13%** |
| ema | -29% | **+45%** | **+14%** | **+86%** | -29% | **+32%** | **+30%** | **+32%** | **+14%** |

### openai

**bare** — best: `identity × per_token` (43%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | **43%** | 14% | 14% | 14% | 14% | 14% | **43%** | 14% |
| gaussian | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **43%** | 14% |
| causal | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **43%** | 14% |
| uniform | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **43%** | 14% |
| differential | **43%** | 14% | 14% | 0% | **43%** | 0% | 14% | **43%** | 14% |
| ema | 14% | 14% | 14% | 14% | 14% | 14% | 14% | **43%** | 14% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | 43% | 43% | **100%** | 63% | 14% | 43% | 43% | 75% |
| gaussian | 71% | 71% | 63% | 71% | 63% | 14% | 14% | 56% | 50% |
| causal | 63% | 63% | 88% | 86% | 63% | 14% | 43% | 57% | 57% |
| uniform | 71% | 43% | 50% | 71% | 57% | 14% | 43% | 63% | 71% |
| differential | 14% | 43% | **100%** | 0% | 43% | 0% | **100%** | 43% | 43% |
| ema | 63% | 86% | 88% | 86% | 63% | 14% | **100%** | 43% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+57%** | 0% | **+29%** | **+86%** | **+48%** | 0% | **+29%** | 0% | **+61%** |
| gaussian | **+57%** | **+57%** | **+48%** | **+57%** | **+48%** | 0% | 0% | **+13%** | **+36%** |
| causal | **+48%** | **+48%** | **+73%** | **+71%** | **+48%** | 0% | **+29%** | **+14%** | **+43%** |
| uniform | **+57%** | **+29%** | **+36%** | **+57%** | **+43%** | 0% | **+29%** | **+20%** | **+57%** |
| differential | -29% | **+29%** | **+86%** | 0% | 0% | 0% | **+86%** | 0% | **+29%** |
| ema | **+48%** | **+71%** | **+73%** | **+71%** | **+48%** | 0% | **+86%** | 0% | **+61%** |

## add_only

### gemini

**bare** — best: `gaussian × per_token` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 60% | 20% | 20% | 20% | 20% | 60% | 20% |
| gaussian | 20% | **80%** | 60% | 20% | 20% | 20% | 20% | 60% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 67% | 20% |
| uniform | 20% | 60% | 60% | 20% | 20% | 20% | 20% | 67% | 20% |
| differential | 60% | 20% | 20% | 0% | 60% | 0% | **80%** | 60% | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | **100%** | 83% | **100%** | **100%** | 71% | 83% | 67% | 71% |
| gaussian | **100%** | **100%** | 83% | 80% | **100%** | 71% | 20% | 83% | 71% |
| causal | 80% | **100%** | 83% | 80% | **100%** | 71% | 83% | 63% | 83% |
| uniform | **100%** | **100%** | 83% | 80% | **100%** | 71% | 83% | 63% | 71% |
| differential | 57% | 67% | **100%** | 0% | 57% | 0% | **100%** | 50% | 83% |
| ema | 80% | 71% | 83% | **100%** | 80% | **100%** | 83% | 63% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+80%** | **+80%** | **+23%** | **+80%** | **+80%** | **+51%** | **+63%** | **+7%** | **+51%** |
| gaussian | **+80%** | **+20%** | **+23%** | **+60%** | **+80%** | **+51%** | 0% | **+23%** | **+51%** |
| causal | **+60%** | **+80%** | **+63%** | **+60%** | **+80%** | **+51%** | **+63%** | -4% | **+63%** |
| uniform | **+80%** | **+40%** | **+23%** | **+60%** | **+80%** | **+51%** | **+63%** | -4% | **+51%** |
| differential | -3% | **+47%** | **+80%** | 0% | -3% | 0% | **+20%** | -10% | **+63%** |
| ema | **+60%** | **+51%** | **+63%** | **+80%** | **+60%** | **+80%** | **+63%** | **+3%** | **+63%** |

### ollama

**bare** — best: `identity × delta_decode` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 57% | 50% | 20% | 60% | 60% | **80%** | 60% | 60% |
| gaussian | 60% | 60% | 60% | 20% | 60% | 60% | **80%** | 60% | 60% |
| causal | 60% | 60% | 60% | 20% | 60% | 60% | **80%** | 60% | 60% |
| uniform | 60% | 60% | 60% | 20% | 60% | 60% | **80%** | 60% | 60% |
| differential | 60% | 57% | 20% | 0% | 60% | 60% | 20% | 60% | 57% |
| ema | 60% | 60% | 60% | 20% | 60% | 60% | **80%** | 60% | 60% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | 57% | **100%** | 20% | 20% | 57% | 67% | 71% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 50% | 57% |
| causal | 20% | 57% | 20% | 20% | 20% | 20% | 57% | 50% | 71% |
| uniform | 20% | 57% | 57% | 80% | 20% | 20% | 57% | 50% | 80% |
| differential | 60% | 67% | **100%** | 0% | 60% | 20% | **100%** | 57% | 83% |
| ema | 20% | 71% | 80% | **100%** | 20% | 20% | 71% | 50% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+26%** | **+7%** | **+80%** | -40% | -40% | -23% | **+7%** | **+11%** |
| gaussian | -40% | -40% | -40% | 0% | -40% | -40% | -60% | -10% | -3% |
| causal | -40% | -3% | -40% | 0% | -40% | -40% | -23% | -10% | **+11%** |
| uniform | -40% | -3% | -3% | **+60%** | -40% | -40% | -23% | -10% | **+20%** |
| differential | 0% | **+10%** | **+80%** | 0% | 0% | -40% | **+80%** | -3% | **+26%** |
| ema | -40% | **+11%** | **+20%** | **+80%** | -40% | -40% | -9% | -10% | **+11%** |

### openai

**bare** — best: `identity × per_token` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **60%** | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| differential | 20% | 20% | 20% | 0% | 20% | 0% | 20% | **60%** | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 60% | 60% | **100%** | 80% | 80% | 60% | 50% | 83% |
| gaussian | 80% | 60% | 50% | 80% | 57% | 80% | 20% | 67% | 57% |
| causal | 67% | 67% | 83% | 80% | 80% | 20% | 60% | 80% | 83% |
| uniform | 57% | 67% | 50% | 80% | 67% | 80% | 60% | 80% | 80% |
| differential | 20% | 60% | **100%** | 0% | 20% | 0% | **100%** | 60% | 60% |
| ema | 80% | **100%** | 83% | 80% | 80% | 20% | **100%** | 60% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | **+40%** | **+80%** | **+60%** | **+60%** | **+40%** | **+30%** | **+63%** |
| gaussian | **+60%** | **+40%** | **+30%** | **+60%** | **+37%** | **+60%** | 0% | **+47%** | **+37%** |
| causal | **+47%** | **+47%** | **+63%** | **+60%** | **+60%** | 0% | **+40%** | **+60%** | **+63%** |
| uniform | **+37%** | **+47%** | **+30%** | **+60%** | **+47%** | **+60%** | **+40%** | **+60%** | **+60%** |
| differential | 0% | **+40%** | **+80%** | 0% | 0% | 0% | **+80%** | 0% | **+40%** |
| ema | **+60%** | **+80%** | **+63%** | **+60%** | **+60%** | 0% | **+80%** | **+40%** | **+60%** |

## add_rcp

### gemini

**bare** — best: `gaussian × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 50% | 17% | 17% | 17% | 17% | 50% | 50% |
| gaussian | 17% | 50% | 50% | 17% | 17% | 17% | 17% | **67%** | 50% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| uniform | 17% | 50% | 50% | 17% | 17% | 17% | 17% | 50% | 17% |
| differential | 50% | **67%** | 17% | 0% | 50% | 0% | 17% | 50% | **67%** |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 63% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 86% | 75% | **100%** | 83% | 86% | 86% | 75% | **100%** |
| gaussian | 83% | 63% | 86% | 67% | 83% | 17% | 17% | 75% | 86% |
| causal | 67% | **100%** | 75% | 83% | 86% | 86% | 86% | 75% | 86% |
| uniform | 83% | 86% | 75% | 67% | 83% | 17% | 86% | 75% | 86% |
| differential | 71% | 67% | **100%** | 0% | 71% | 0% | **100%** | 67% | **100%** |
| ema | 67% | 75% | 86% | **100%** | 67% | 83% | 86% | 71% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+69%** | **+25%** | **+83%** | **+67%** | **+69%** | **+69%** | **+25%** | **+50%** |
| gaussian | **+67%** | **+13%** | **+36%** | **+50%** | **+67%** | 0% | 0% | **+8%** | **+36%** |
| causal | **+50%** | **+83%** | **+58%** | **+67%** | **+69%** | **+69%** | **+69%** | **+25%** | **+69%** |
| uniform | **+67%** | **+36%** | **+25%** | **+50%** | **+67%** | 0% | **+69%** | **+25%** | **+69%** |
| differential | **+21%** | 0% | **+83%** | 0% | **+21%** | 0% | **+83%** | **+17%** | **+33%** |
| ema | **+50%** | **+58%** | **+69%** | **+83%** | **+50%** | **+67%** | **+69%** | **+5%** | **+23%** |

### ollama

**bare** — best: `identity × delta_decode` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 63% | 17% | 50% | 50% | **67%** | 50% | 50% |
| gaussian | 50% | 50% | 50% | 17% | 50% | 50% | **67%** | 50% | 50% |
| causal | 50% | 50% | 50% | 17% | 50% | 50% | **67%** | 50% | 50% |
| uniform | 50% | 50% | 50% | 17% | 50% | 50% | **67%** | 50% | 50% |
| differential | 50% | 50% | 17% | 0% | 50% | 50% | 17% | 50% | 50% |
| ema | 50% | 50% | 50% | 17% | 50% | 50% | **67%** | 50% | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 63% | 86% | 75% | **100%** | 17% | 17% | 63% | 57% | 75% |
| gaussian | 63% | 86% | 75% | 17% | 17% | 17% | 17% | 63% | 63% |
| causal | 17% | 75% | 75% | **100%** | 17% | 17% | 75% | 63% | 75% |
| uniform | 63% | 75% | 75% | 67% | 63% | 17% | 75% | 63% | 63% |
| differential | 50% | 71% | **100%** | 0% | 50% | 17% | **100%** | 57% | 71% |
| ema | 63% | 75% | 75% | **100%** | 17% | 17% | 75% | 63% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+13%** | **+36%** | **+13%** | **+83%** | -33% | -33% | -4% | **+7%** | **+25%** |
| gaussian | **+13%** | **+36%** | **+25%** | 0% | -33% | -33% | -50% | **+13%** | **+13%** |
| causal | -33% | **+25%** | **+25%** | **+83%** | -33% | -33% | **+8%** | **+13%** | **+25%** |
| uniform | **+13%** | **+25%** | **+25%** | **+50%** | **+13%** | -33% | **+8%** | **+13%** | **+13%** |
| differential | 0% | **+21%** | **+83%** | 0% | 0% | -33% | **+83%** | **+7%** | **+21%** |
| ema | **+13%** | **+25%** | **+25%** | **+83%** | -33% | -33% | **+8%** | **+13%** | **+25%** |

### openai

**bare** — best: `identity × per_token` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **50%** | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| differential | 17% | 17% | 17% | 0% | 17% | 0% | 17% | **50%** | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 50% | 50% | **100%** | 67% | 67% | 50% | 71% | **100%** |
| gaussian | 67% | 83% | 71% | 67% | 71% | 67% | 17% | 83% | 71% |
| causal | 71% | 83% | 83% | **100%** | 71% | 17% | 50% | 67% | 71% |
| uniform | 71% | 83% | 71% | 67% | 71% | 67% | 50% | 83% | 67% |
| differential | 17% | 50% | 50% | 0% | 17% | 0% | 50% | 50% | 50% |
| ema | 67% | 83% | 67% | **100%** | 67% | 50% | **100%** | 40% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | **+33%** | **+83%** | **+50%** | **+50%** | **+33%** | **+55%** | **+83%** |
| gaussian | **+50%** | **+67%** | **+55%** | **+50%** | **+55%** | **+50%** | 0% | **+67%** | **+55%** |
| causal | **+55%** | **+67%** | **+67%** | **+83%** | **+55%** | 0% | **+33%** | **+50%** | **+55%** |
| uniform | **+55%** | **+67%** | **+55%** | **+50%** | **+55%** | **+50%** | **+33%** | **+67%** | **+50%** |
| differential | 0% | **+33%** | **+33%** | 0% | 0% | 0% | **+33%** | 0% | **+33%** |
| ema | **+50%** | **+67%** | **+50%** | **+83%** | **+50%** | **+33%** | **+83%** | **+23%** | **+50%** |

## all_ops

### gemini

**bare** — best: `uniform × per_token` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 38% | 38% | 13% | 13% | 13% | 38% | 40% | 38% |
| gaussian | 13% | 38% | 38% | 13% | 13% | 13% | 13% | 40% | 38% |
| causal | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 38% | 13% |
| uniform | 13% | **50%** | 13% | 13% | 13% | 13% | 13% | **50%** | 13% |
| differential | 38% | **50%** | 13% | 0% | 38% | 0% | 13% | 38% | 38% |
| ema | 13% | 13% | 38% | 13% | 13% | 13% | 38% | 44% | 13% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 88% | 88% | **100%** | **100%** | 88% | **100%** | **100%** | **100%** |
| gaussian | **100%** | 88% | 88% | 75% | **100%** | 88% | **100%** | **100%** | **100%** |
| causal | 63% | 88% | **100%** | 88% | 75% | 88% | **100%** | **100%** | **100%** |
| uniform | 75% | 88% | 88% | 63% | 75% | 88% | **100%** | **100%** | **100%** |
| differential | 75% | **100%** | **100%** | 0% | 75% | 0% | **100%** | **100%** | 88% |
| ema | **100%** | 88% | 88% | **100%** | **100%** | 88% | **100%** | 75% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+88%** | **+50%** | **+50%** | **+88%** | **+88%** | **+75%** | **+63%** | **+60%** | **+63%** |
| gaussian | **+88%** | **+50%** | **+50%** | **+63%** | **+88%** | **+75%** | **+88%** | **+60%** | **+63%** |
| causal | **+50%** | **+75%** | **+88%** | **+75%** | **+63%** | **+75%** | **+63%** | **+63%** | **+88%** |
| uniform | **+63%** | **+38%** | **+75%** | **+50%** | **+63%** | **+75%** | **+88%** | **+50%** | **+88%** |
| differential | **+38%** | **+50%** | **+88%** | 0% | **+38%** | 0% | **+88%** | **+63%** | **+50%** |
| ema | **+88%** | **+75%** | **+50%** | **+88%** | **+88%** | **+75%** | **+63%** | **+31%** | **+88%** |

### ollama

**bare** — best: `identity × per_token` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | **88%** | **88%** | 13% | 38% | 38% | 50% | 38% | 38% |
| gaussian | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| causal | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| uniform | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| differential | 38% | 75% | 75% | 0% | 38% | 38% | 63% | 38% | 75% |
| ema | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 75% | **100%** | **100%** | 13% | 13% | 75% | 88% | 88% |
| gaussian | 13% | 75% | 75% | 75% | 13% | 13% | **100%** | 88% | 88% |
| causal | 13% | **100%** | **100%** | 88% | 13% | 13% | **100%** | 88% | 88% |
| uniform | 13% | 75% | **100%** | 88% | 13% | 13% | **100%** | 88% | 88% |
| differential | 75% | 63% | 75% | 0% | 75% | 13% | 63% | 63% | 63% |
| ema | 13% | **100%** | **100%** | **100%** | 13% | 88% | 88% | 88% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -25% | -12% | **+13%** | **+88%** | -25% | -25% | **+25%** | **+50%** | **+50%** |
| gaussian | -25% | **+38%** | **+38%** | **+63%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| causal | -25% | **+63%** | **+63%** | **+75%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| uniform | -25% | **+38%** | **+63%** | **+75%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| differential | **+38%** | -12% | 0% | 0% | **+38%** | -25% | 0% | **+25%** | -12% |
| ema | -25% | **+63%** | **+63%** | **+88%** | -25% | **+50%** | **+38%** | **+50%** | **+63%** |

### openai

**bare** — best: `gaussian × amplitude_sort` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 38% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |
| gaussian | 13% | 13% | 13% | 13% | 13% | 13% | 13% | **50%** | 13% |
| causal | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 13% |
| uniform | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |
| differential | 38% | 38% | 13% | 0% | 38% | 0% | 13% | 44% | 13% |
| ema | 13% | 13% | 13% | 13% | 13% | 13% | 13% | **50%** | 13% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 75% | 38% | 38% | **100%** | 75% | 13% | 38% | 45% | 88% |
| gaussian | 75% | 63% | 75% | 63% | 75% | 13% | 13% | 75% | 75% |
| causal | 63% | 75% | 50% | **100%** | 75% | 13% | 38% | 75% | 50% |
| uniform | 63% | 63% | 63% | 75% | 63% | 13% | 38% | 67% | 75% |
| differential | 13% | 38% | 75% | 0% | 38% | 0% | 75% | 38% | 38% |
| ema | 75% | 75% | 50% | **100%** | 75% | 13% | 75% | 45% | 78% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+63%** | 0% | **+25%** | **+88%** | **+63%** | 0% | **+25%** | **+8%** | **+75%** |
| gaussian | **+63%** | **+50%** | **+63%** | **+50%** | **+63%** | 0% | 0% | **+25%** | **+63%** |
| causal | **+50%** | **+63%** | **+38%** | **+88%** | **+63%** | 0% | **+25%** | **+63%** | **+38%** |
| uniform | **+50%** | **+50%** | **+50%** | **+63%** | **+50%** | 0% | **+25%** | **+29%** | **+63%** |
| differential | -25% | 0% | **+63%** | 0% | 0% | 0% | **+63%** | -7% | **+25%** |
| ema | **+63%** | **+63%** | **+38%** | **+88%** | **+63%** | 0% | **+63%** | -5% | **+65%** |

## copy

### gemini

**bare** — best: `uniform × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 25% | 25% | 25% | 25% | 25% | 75% | 25% |
| gaussian | 25% | 25% | 25% | 25% | 25% | 25% | 25% | 75% | 25% |
| causal | 25% | 25% | 25% | 25% | 25% | 25% | 25% | 75% | 25% |
| uniform | 25% | 25% | 25% | 25% | 25% | 25% | 25% | **100%** | 25% |
| differential | 25% | 25% | 25% | 0% | 25% | 0% | 25% | 75% | 25% |
| ema | 25% | 25% | 25% | 25% | 25% | 25% | 25% | 75% | 25% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 80% | 67% | **100%** | **100%** | 25% | 67% | 67% | 67% |
| gaussian | **100%** | 67% | 67% | **100%** | **100%** | **100%** | 67% | 67% | 67% |
| causal | **100%** | 80% | 67% | **100%** | **100%** | 25% | 67% | 50% | 67% |
| uniform | **100%** | 67% | 67% | **100%** | **100%** | **100%** | 67% | 67% | 80% |
| differential | 25% | 80% | **100%** | 0% | 25% | 0% | **100%** | **100%** | **100%** |
| ema | **100%** | 57% | 67% | **100%** | **100%** | 80% | 67% | 67% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+75%** | **+55%** | **+42%** | **+75%** | **+75%** | 0% | **+42%** | -8% | **+42%** |
| gaussian | **+75%** | **+42%** | **+42%** | **+75%** | **+75%** | **+75%** | **+42%** | -8% | **+42%** |
| causal | **+75%** | **+55%** | **+42%** | **+75%** | **+75%** | 0% | **+42%** | -25% | **+42%** |
| uniform | **+75%** | **+42%** | **+42%** | **+75%** | **+75%** | **+75%** | **+42%** | -33% | **+55%** |
| differential | 0% | **+55%** | **+75%** | 0% | 0% | 0% | **+75%** | **+25%** | **+75%** |
| ema | **+75%** | **+32%** | **+42%** | **+75%** | **+75%** | **+55%** | **+42%** | -8% | **+55%** |

### ollama

**bare** — best: `identity × global_residual` (75%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **75%** | **75%** | **75%** | 25% | **75%** | **75%** | **75%** | **75%** | **75%** |
| gaussian | **75%** | **75%** | **75%** | 25% | **75%** | **75%** | **75%** | **75%** | **75%** |
| causal | **75%** | **75%** | **75%** | 25% | **75%** | **75%** | **75%** | **75%** | **75%** |
| uniform | **75%** | **75%** | **75%** | 25% | **75%** | **75%** | **75%** | **75%** | **75%** |
| differential | **75%** | **75%** | **75%** | 0% | **75%** | **75%** | **75%** | **75%** | **75%** |
| ema | **75%** | **75%** | **75%** | 25% | **75%** | **75%** | **75%** | **75%** | **75%** |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 80% | 67% | **100%** | 25% | 25% | 67% | 67% | 67% |
| gaussian | 80% | 25% | 25% | 25% | 25% | 25% | 67% | 67% | **100%** |
| causal | 25% | 67% | 25% | 25% | 25% | 25% | 67% | 67% | 67% |
| uniform | 80% | 80% | 67% | **100%** | 25% | 25% | 67% | 67% | **100%** |
| differential | 75% | 80% | **100%** | 0% | 75% | 25% | **100%** | 75% | **100%** |
| ema | 80% | 80% | 67% | **100%** | 25% | 67% | 67% | 80% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+5%** | **+5%** | -8% | **+75%** | -50% | -50% | -8% | -8% | -8% |
| gaussian | **+5%** | -50% | -50% | 0% | -50% | -50% | -8% | -8% | **+25%** |
| causal | -50% | -8% | -50% | 0% | -50% | -50% | -8% | -8% | -8% |
| uniform | **+5%** | **+5%** | -8% | **+75%** | -50% | -50% | -8% | -8% | **+25%** |
| differential | 0% | **+5%** | **+25%** | 0% | 0% | -50% | **+25%** | 0% | **+25%** |
| ema | **+5%** | **+5%** | -8% | **+75%** | -50% | -8% | -8% | **+5%** | **+25%** |

### openai

**bare** — best: `identity × per_token` (75%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | **75%** | 25% | 0% | 25% | 25% | 25% | 25% | 25% |
| gaussian | 25% | 25% | 25% | 0% | 25% | 25% | 25% | 25% | 25% |
| causal | 25% | 25% | 25% | 0% | 25% | 25% | 25% | 25% | 25% |
| uniform | 25% | 25% | 25% | 0% | 25% | 25% | 25% | 25% | 25% |
| differential | 25% | 25% | 25% | 0% | 25% | 0% | 25% | **75%** | 25% |
| ema | 25% | 25% | 25% | 0% | 25% | 25% | 25% | 25% | 25% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 75% | 75% | **100%** | **100%** | **100%** | 75% | **100%** | 80% |
| gaussian | **100%** | 75% | 75% | **100%** | **100%** | **100%** | 75% | 80% | **100%** |
| causal | **100%** | 75% | 75% | **100%** | **100%** | **100%** | 75% | **100%** | 80% |
| uniform | **100%** | 75% | 75% | **100%** | **100%** | **100%** | 75% | 80% | **100%** |
| differential | 25% | 75% | 75% | 0% | 25% | 0% | 75% | 75% | 75% |
| ema | **100%** | 75% | 75% | **100%** | **100%** | 75% | **100%** | 80% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+75%** | 0% | **+50%** | **+100%** | **+75%** | **+75%** | **+50%** | **+75%** | **+55%** |
| gaussian | **+75%** | **+50%** | **+50%** | **+100%** | **+75%** | **+75%** | **+50%** | **+55%** | **+75%** |
| causal | **+75%** | **+50%** | **+50%** | **+100%** | **+75%** | **+75%** | **+50%** | **+75%** | **+55%** |
| uniform | **+75%** | **+50%** | **+50%** | **+100%** | **+75%** | **+75%** | **+50%** | **+55%** | **+75%** |
| differential | 0% | **+50%** | **+50%** | 0% | 0% | 0% | **+50%** | 0% | **+50%** |
| ema | **+75%** | **+50%** | **+50%** | **+100%** | **+75%** | **+50%** | **+75%** | **+55%** | **+55%** |

## fma_only

### gemini

**bare** — best: `causal × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | **80%** | 20% |
| uniform | 20% | **80%** | 67% | 20% | 20% | 20% | 20% | 60% | 20% |
| differential | 60% | **80%** | 20% | 0% | 60% | 0% | 20% | 60% | 60% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% | 60% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 71% | **100%** | 80% | 50% | 71% | 63% | 71% |
| gaussian | 80% | 83% | 71% | 80% | 80% | 50% | 20% | 63% | 63% |
| causal | 67% | 83% | 71% | 80% | 80% | 50% | 71% | 63% | 63% |
| uniform | 80% | 83% | 71% | 80% | 80% | 50% | 71% | 63% | 63% |
| differential | 57% | 83% | **100%** | 0% | 57% | 0% | **100%** | 71% | **100%** |
| ema | 80% | 71% | 71% | **100%** | 67% | 67% | 71% | 63% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | **+51%** | **+51%** | **+80%** | **+60%** | **+30%** | **+11%** | **+3%** | **+51%** |
| gaussian | **+60%** | **+63%** | **+51%** | **+60%** | **+60%** | **+30%** | 0% | **+3%** | **+43%** |
| causal | **+47%** | **+63%** | **+51%** | **+60%** | **+60%** | **+30%** | **+51%** | -18% | **+43%** |
| uniform | **+60%** | **+3%** | **+5%** | **+60%** | **+60%** | **+30%** | **+51%** | **+3%** | **+43%** |
| differential | -3% | **+3%** | **+80%** | 0% | -3% | 0% | **+80%** | **+11%** | **+40%** |
| ema | **+60%** | **+51%** | **+51%** | **+80%** | **+47%** | **+47%** | **+11%** | **+3%** | **+23%** |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 60% | **100%** | 0% | 60% | 0% | **100%** | 60% | 60% |
| ema | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 71% | **100%** | 20% | 20% | 83% | 83% | 71% |
| gaussian | 20% | **100%** | 83% | 80% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 20% | 83% | 71% | 83% |
| uniform | 20% | 83% | 71% | 67% | 20% | 20% | 83% | 71% | 71% |
| differential | 83% | **100%** | **100%** | 0% | 83% | 0% | **100%** | 67% | **100%** |
| ema | 20% | **100%** | 71% | **100%** | 20% | 71% | 83% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+40%** | **+11%** | **+80%** | -40% | -40% | **+23%** | **+23%** | **+11%** |
| gaussian | -40% | **+40%** | **+23%** | **+60%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | 0% | -40% | -40% | **+23%** | **+11%** | **+23%** |
| uniform | -40% | **+23%** | **+11%** | **+47%** | -40% | -40% | **+23%** | **+11%** | **+11%** |
| differential | **+23%** | **+40%** | 0% | 0% | **+23%** | 0% | 0% | **+7%** | **+40%** |
| ema | -40% | **+40%** | **+11%** | **+80%** | -40% | **+11%** | **+23%** | **+23%** | **+11%** |

### openai

**bare** — best: `identity × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 60% | 20% | 20% | 20% | 20% | 20% | **80%** | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | **80%** | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| differential | 20% | 60% | 20% | 0% | 20% | 0% | 20% | 60% | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 60% | 60% | **100%** | 80% | 20% | 60% | 60% | 83% |
| gaussian | 80% | **100%** | 60% | 80% | 80% | 20% | 20% | **100%** | **100%** |
| causal | 83% | 80% | 80% | **100%** | 80% | 20% | 60% | 80% | 80% |
| uniform | 83% | **100%** | 60% | 80% | 83% | 20% | 60% | **100%** | 83% |
| differential | 20% | 60% | **100%** | 0% | 20% | 0% | **100%** | 60% | 80% |
| ema | 80% | 80% | 80% | **100%** | 80% | 20% | **100%** | 80% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | **+40%** | **+80%** | **+60%** | 0% | **+40%** | -20% | **+63%** |
| gaussian | **+60%** | **+80%** | **+40%** | **+60%** | **+60%** | 0% | 0% | **+80%** | **+80%** |
| causal | **+63%** | **+60%** | **+60%** | **+80%** | **+60%** | 0% | **+40%** | 0% | **+60%** |
| uniform | **+63%** | **+80%** | **+40%** | **+60%** | **+63%** | 0% | **+40%** | **+80%** | **+63%** |
| differential | 0% | 0% | **+80%** | 0% | 0% | 0% | **+80%** | 0% | **+60%** |
| ema | **+60%** | **+60%** | **+60%** | **+80%** | **+60%** | 0% | **+80%** | **+20%** | **+63%** |

## fma_rcp

### gemini

**bare** — best: `identity × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 17% | 17% | 17% | 17% | 50% | **67%** | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 50% | **67%** | 17% |
| uniform | 17% | **67%** | 57% | 17% | 17% | 17% | 17% | **67%** | 17% |
| differential | 50% | **67%** | 17% | 0% | 50% | 0% | 17% | **67%** | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 50% | **67%** | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 86% | 75% | **100%** | 67% | 63% | 75% | 86% | 86% |
| gaussian | 67% | 71% | 63% | 67% | 67% | 63% | 17% | 75% | 86% |
| causal | 57% | 86% | 75% | 83% | 67% | 63% | 75% | 75% | 75% |
| uniform | 67% | 71% | 75% | 83% | 67% | 63% | 75% | 75% | 86% |
| differential | 71% | 67% | **100%** | 0% | 71% | 0% | **100%** | 67% | **100%** |
| ema | 67% | 75% | 75% | **100%** | 57% | 63% | 75% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+69%** | **+58%** | **+83%** | **+50%** | **+46%** | **+25%** | **+19%** | **+69%** |
| gaussian | **+50%** | **+55%** | **+46%** | **+50%** | **+50%** | **+46%** | 0% | **+8%** | **+69%** |
| causal | **+40%** | **+69%** | **+58%** | **+67%** | **+50%** | **+46%** | **+25%** | **+8%** | **+58%** |
| uniform | **+50%** | **+5%** | **+18%** | **+67%** | **+50%** | **+46%** | **+58%** | **+8%** | **+69%** |
| differential | **+21%** | 0% | **+83%** | 0% | **+21%** | 0% | **+83%** | 0% | **+50%** |
| ema | **+50%** | **+58%** | **+58%** | **+83%** | **+40%** | **+46%** | **+25%** | **+19%** | **+69%** |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| uniform | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| differential | 50% | 50% | **100%** | 0% | 50% | 0% | **100%** | 50% | 50% |
| ema | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 67% | 86% | **100%** | 17% | 17% | 86% | 71% | 75% |
| gaussian | 17% | 83% | 67% | 71% | 17% | 17% | 17% | 86% | 86% |
| causal | 17% | 86% | 86% | 71% | 17% | 17% | 86% | 86% | 67% |
| uniform | 17% | 83% | 67% | 71% | 17% | 17% | 86% | 86% | 86% |
| differential | 71% | 83% | **100%** | 0% | 71% | 0% | **100%** | 83% | **100%** |
| ema | 17% | **100%** | 75% | **100%** | 17% | 86% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+17%** | **+36%** | **+83%** | -33% | -33% | **+36%** | **+21%** | **+25%** |
| gaussian | -33% | **+33%** | **+17%** | **+55%** | -33% | -33% | -33% | **+36%** | **+36%** |
| causal | -33% | **+36%** | **+36%** | **+55%** | -33% | -33% | **+36%** | **+36%** | **+17%** |
| uniform | -33% | **+33%** | **+17%** | **+55%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| differential | **+21%** | **+33%** | 0% | 0% | **+21%** | 0% | 0% | **+33%** | **+50%** |
| ema | -33% | **+50%** | **+25%** | **+83%** | -33% | **+36%** | **+36%** | **+36%** | **+36%** |

### openai

**bare** — best: `identity × per_token` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **50%** | 17% | 17% | 17% | 17% | 17% | **50%** | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **50%** | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **50%** | 17% |
| differential | 17% | **50%** | 17% | 0% | 17% | 0% | 17% | **50%** | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **50%** | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 50% | 50% | **100%** | 67% | 17% | 50% | 50% | **100%** |
| gaussian | 67% | 83% | **100%** | 67% | 67% | 17% | 17% | **100%** | **100%** |
| causal | **100%** | 83% | 83% | **100%** | **100%** | 17% | 50% | 67% | 67% |
| uniform | **100%** | 83% | **100%** | 17% | **100%** | 17% | 50% | **100%** | **100%** |
| differential | 17% | 50% | **100%** | 0% | 50% | 0% | **100%** | 38% | 67% |
| ema | 67% | 83% | 67% | **100%** | 67% | 17% | **100%** | 86% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | **+33%** | **+83%** | **+50%** | 0% | **+33%** | 0% | **+83%** |
| gaussian | **+50%** | **+67%** | **+83%** | **+50%** | **+50%** | 0% | 0% | **+50%** | **+83%** |
| causal | **+83%** | **+67%** | **+67%** | **+83%** | **+83%** | 0% | **+33%** | **+50%** | **+50%** |
| uniform | **+83%** | **+67%** | **+83%** | 0% | **+83%** | 0% | **+33%** | **+50%** | **+83%** |
| differential | 0% | 0% | **+83%** | 0% | **+33%** | 0% | **+83%** | -12% | **+50%** |
| ema | **+50%** | **+67%** | **+50%** | **+83%** | **+50%** | 0% | **+83%** | **+36%** | **+83%** |

## mul_fma

### gemini

**bare** — best: `gaussian × arithmetic` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 50% | 50% | 17% | 17% | 17% | 17% | 50% | 17% |
| gaussian | 17% | 17% | **67%** | 17% | 17% | 17% | 17% | **67%** | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |
| uniform | 17% | **67%** | **67%** | 17% | 17% | 17% | 17% | **67%** | 50% |
| differential | 50% | **67%** | 17% | 0% | 50% | 0% | 17% | **67%** | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 86% | 86% | 86% | **100%** | 86% | 63% | 86% | 86% | 75% |
| gaussian | 86% | 71% | 86% | 67% | 86% | 63% | 17% | 75% | 75% |
| causal | 57% | 86% | 86% | 83% | 57% | 63% | 86% | 75% | 75% |
| uniform | 86% | 86% | 86% | 83% | 86% | 63% | 86% | 75% | 75% |
| differential | 71% | 86% | **100%** | 0% | 71% | 0% | **100%** | 86% | **100%** |
| ema | 86% | 86% | 86% | **100%** | 86% | 63% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+69%** | **+36%** | **+36%** | **+83%** | **+69%** | **+46%** | **+69%** | **+36%** | **+58%** |
| gaussian | **+69%** | **+55%** | **+19%** | **+50%** | **+69%** | **+46%** | 0% | **+8%** | **+58%** |
| causal | **+40%** | **+69%** | **+69%** | **+67%** | **+40%** | **+46%** | **+69%** | **+25%** | **+25%** |
| uniform | **+69%** | **+19%** | **+19%** | **+67%** | **+69%** | **+46%** | **+69%** | **+8%** | **+25%** |
| differential | **+21%** | **+19%** | **+83%** | 0% | **+21%** | 0% | **+83%** | **+19%** | **+50%** |
| ema | **+69%** | **+69%** | **+69%** | **+83%** | **+69%** | **+46%** | **+69%** | **+36%** | **+36%** |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| uniform | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |
| differential | 50% | 50% | **100%** | 0% | 50% | 0% | **100%** | 50% | 50% |
| ema | 50% | 50% | 50% | 17% | 50% | 50% | 50% | 50% | 50% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **100%** | 67% | **100%** | 17% | 17% | **100%** | 71% | 86% |
| gaussian | 17% | **100%** | **100%** | 83% | 17% | 17% | 17% | 86% | 86% |
| causal | 17% | **100%** | **100%** | 83% | 17% | 17% | **100%** | 86% | 67% |
| uniform | 17% | **100%** | **100%** | 83% | 17% | 17% | **100%** | 86% | 86% |
| differential | **100%** | 83% | **100%** | 0% | **100%** | 0% | **100%** | 57% | **100%** |
| ema | 17% | **100%** | 67% | **100%** | 17% | 86% | **100%** | 86% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+50%** | **+17%** | **+83%** | -33% | -33% | **+50%** | **+21%** | **+36%** |
| gaussian | -33% | **+50%** | **+50%** | **+67%** | -33% | -33% | -33% | **+36%** | **+36%** |
| causal | -33% | **+50%** | **+50%** | **+67%** | -33% | -33% | **+50%** | **+36%** | **+17%** |
| uniform | -33% | **+50%** | **+50%** | **+67%** | -33% | -33% | **+50%** | **+36%** | **+36%** |
| differential | **+50%** | **+33%** | 0% | 0% | **+50%** | 0% | 0% | **+7%** | **+50%** |
| ema | -33% | **+50%** | **+17%** | **+83%** | -33% | **+36%** | **+50%** | **+36%** | **+17%** |

### openai

**bare** — best: `identity × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 50% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| differential | 17% | 50% | 17% | 0% | 17% | 0% | 17% | 50% | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 83% | 50% | 50% | **100%** | 71% | 17% | 50% | 71% | 86% |
| gaussian | 83% | 83% | **100%** | 67% | 67% | 17% | 17% | 83% | 83% |
| causal | 71% | **100%** | 67% | **100%** | 71% | 17% | 50% | 67% | 67% |
| uniform | 83% | 83% | 83% | 17% | 67% | 17% | 50% | 83% | 71% |
| differential | 17% | 50% | 83% | 0% | 50% | 0% | 83% | 50% | 50% |
| ema | 67% | 83% | 67% | **100%** | 67% | 17% | 83% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+67%** | 0% | **+33%** | **+83%** | **+55%** | 0% | **+33%** | **+5%** | **+69%** |
| gaussian | **+67%** | **+67%** | **+83%** | **+50%** | **+50%** | 0% | 0% | **+17%** | **+67%** |
| causal | **+55%** | **+83%** | **+50%** | **+83%** | **+55%** | 0% | **+33%** | 0% | **+50%** |
| uniform | **+67%** | **+67%** | **+67%** | 0% | **+50%** | 0% | **+33%** | **+17%** | **+55%** |
| differential | 0% | 0% | **+67%** | 0% | **+33%** | 0% | **+67%** | 0% | **+33%** |
| ema | **+50%** | **+67%** | **+50%** | **+83%** | **+50%** | 0% | **+67%** | **+36%** | **+69%** |

## mul_only

### gemini

**bare** — best: `differential × per_token` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 60% | 60% | 20% | 20% | 20% | 20% | 60% | 60% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 67% | 20% |
| differential | 60% | **80%** | 20% | 0% | 60% | 0% | 20% | 60% | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 44% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 83% | 83% | **100%** | **100%** | 71% | 83% | 83% | 71% |
| gaussian | **100%** | 83% | 83% | 80% | **100%** | 20% | 20% | 83% | 71% |
| causal | 80% | 83% | 83% | 80% | 80% | 71% | 83% | 63% | 71% |
| uniform | **100%** | 83% | 83% | 80% | **100%** | 71% | 83% | 83% | 63% |
| differential | 83% | 83% | **100%** | 0% | 83% | 0% | **100%** | 80% | **100%** |
| ema | 80% | 71% | 83% | **100%** | 80% | 67% | 83% | 67% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | **+23%** | **+23%** | **+80%** | **+80%** | **+51%** | **+63%** | **+23%** | **+11%** |
| gaussian | **+80%** | **+63%** | **+63%** | **+60%** | **+80%** | 0% | 0% | **+23%** | **+11%** |
| causal | **+60%** | **+63%** | **+63%** | **+60%** | **+60%** | **+51%** | **+63%** | **+3%** | **+51%** |
| uniform | **+80%** | **+63%** | **+63%** | **+60%** | **+80%** | **+51%** | **+63%** | **+17%** | **+43%** |
| differential | **+23%** | **+3%** | **+80%** | 0% | **+23%** | 0% | **+80%** | **+20%** | **+80%** |
| ema | **+60%** | **+51%** | **+63%** | **+80%** | **+60%** | **+47%** | **+63%** | **+22%** | **+63%** |

### ollama

**bare** — best: `differential × arithmetic` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 50% | **67%** | 0% | 60% | 60% | **67%** | 60% | 57% |
| ema | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | 80% | **100%** | 20% | 20% | 83% | **100%** | 71% |
| gaussian | 20% | 83% | 83% | 80% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 20% | 83% | 71% | 83% |
| uniform | 20% | 83% | 83% | **100%** | 20% | 20% | 83% | 71% | 80% |
| differential | 60% | 83% | **100%** | 0% | 60% | 20% | **100%** | 80% | 83% |
| ema | 20% | 83% | 80% | **100%** | 20% | 20% | 83% | 71% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+23%** | **+20%** | **+80%** | -40% | -40% | **+23%** | **+40%** | **+11%** |
| gaussian | -40% | **+23%** | **+23%** | **+60%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | 0% | -40% | -40% | **+23%** | **+11%** | **+23%** |
| uniform | -40% | **+23%** | **+23%** | **+80%** | -40% | -40% | **+23%** | **+11%** | **+20%** |
| differential | 0% | **+33%** | **+33%** | 0% | 0% | -40% | **+33%** | **+20%** | **+26%** |
| ema | -40% | **+23%** | **+20%** | **+80%** | -40% | -40% | **+23%** | **+11%** | **+23%** |

### openai

**bare** — best: `identity × per_token` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **60%** | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| differential | 20% | 20% | 20% | 0% | 20% | 0% | 20% | **60%** | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 60% | 60% | **100%** | 80% | 80% | 60% | 80% | **100%** |
| gaussian | 80% | **100%** | 83% | 80% | 80% | 80% | 20% | 67% | 57% |
| causal | 57% | **100%** | 83% | 80% | 57% | 80% | 60% | 80% | 83% |
| uniform | 80% | **100%** | 83% | 80% | 80% | 80% | 60% | 67% | 80% |
| differential | 20% | 60% | **100%** | 0% | 20% | 0% | **100%** | 60% | 60% |
| ema | 80% | 60% | 80% | **100%** | 80% | 20% | **100%** | 80% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | **+40%** | **+80%** | **+60%** | **+60%** | **+40%** | **+60%** | **+80%** |
| gaussian | **+60%** | **+80%** | **+63%** | **+60%** | **+60%** | **+60%** | 0% | **+47%** | **+37%** |
| causal | **+37%** | **+80%** | **+63%** | **+60%** | **+37%** | **+60%** | **+40%** | **+60%** | **+63%** |
| uniform | **+60%** | **+80%** | **+63%** | **+60%** | **+60%** | **+60%** | **+40%** | **+47%** | **+60%** |
| differential | 0% | **+40%** | **+80%** | 0% | 0% | 0% | **+80%** | 0% | **+40%** |
| ema | **+60%** | **+40%** | **+60%** | **+80%** | **+60%** | 0% | **+80%** | **+60%** | **+60%** |

## mul_rcp

### gemini

**bare** — best: `differential × per_token` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 50% | 50% | 17% | 17% | 17% | 17% | 50% | 50% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| differential | 50% | **67%** | 17% | 0% | 50% | 0% | 17% | 50% | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 75% | 75% | **100%** | 67% | 86% | 86% | 75% | 86% |
| gaussian | **100%** | 71% | 86% | 67% | 83% | 17% | 17% | 75% | 75% |
| causal | 67% | 86% | 75% | 83% | 67% | 86% | 86% | 75% | 75% |
| uniform | 83% | 86% | 75% | 67% | 83% | 17% | 86% | 75% | 75% |
| differential | **100%** | 86% | **100%** | 0% | **100%** | 0% | **100%** | **100%** | **100%** |
| ema | 67% | 75% | 86% | **100%** | 67% | 57% | 86% | 63% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+25%** | **+25%** | **+83%** | **+50%** | **+69%** | **+69%** | **+25%** | **+36%** |
| gaussian | **+83%** | **+55%** | **+69%** | **+50%** | **+67%** | 0% | 0% | **+25%** | **+25%** |
| causal | **+50%** | **+69%** | **+58%** | **+67%** | **+50%** | **+69%** | **+69%** | **+25%** | **+58%** |
| uniform | **+67%** | **+69%** | **+58%** | **+50%** | **+67%** | 0% | **+69%** | **+25%** | **+58%** |
| differential | **+50%** | **+19%** | **+83%** | 0% | **+50%** | 0% | **+83%** | **+50%** | **+50%** |
| ema | **+50%** | **+58%** | **+69%** | **+83%** | **+50%** | **+40%** | **+69%** | -4% | **+25%** |

### ollama

**bare** — best: `identity × global_residual` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **50%** | **50%** | **50%** | 17% | **50%** | **50%** | **50%** | **50%** | **50%** |
| gaussian | **50%** | **50%** | **50%** | 17% | **50%** | **50%** | **50%** | **50%** | **50%** |
| causal | **50%** | **50%** | **50%** | 17% | **50%** | **50%** | **50%** | **50%** | **50%** |
| uniform | **50%** | **50%** | **50%** | 17% | **50%** | **50%** | **50%** | **50%** | **50%** |
| differential | **50%** | **50%** | **50%** | 0% | **50%** | **50%** | **50%** | **50%** | **50%** |
| ema | **50%** | **50%** | **50%** | 17% | **50%** | **50%** | **50%** | **50%** | **50%** |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 86% | 67% | **100%** | 17% | 17% | 86% | 57% | 86% |
| gaussian | 17% | 86% | 86% | 83% | 17% | 17% | 17% | 86% | 83% |
| causal | 17% | 86% | 86% | **100%** | 17% | 17% | 86% | 86% | 86% |
| uniform | 17% | 86% | 86% | 83% | 17% | 17% | 86% | 86% | 86% |
| differential | 50% | 71% | **100%** | 0% | 50% | 17% | **100%** | 57% | 71% |
| ema | 17% | 86% | 67% | **100%** | 17% | 17% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+36%** | **+17%** | **+83%** | -33% | -33% | **+36%** | **+7%** | **+36%** |
| gaussian | -33% | **+36%** | **+36%** | **+67%** | -33% | -33% | -33% | **+36%** | **+33%** |
| causal | -33% | **+36%** | **+36%** | **+83%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| uniform | -33% | **+36%** | **+36%** | **+67%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| differential | 0% | **+21%** | **+50%** | 0% | 0% | -33% | **+50%** | **+7%** | **+21%** |
| ema | -33% | **+36%** | **+17%** | **+83%** | -33% | -33% | **+36%** | **+36%** | **+36%** |

### openai

**bare** — best: `identity × per_token` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **50%** | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| differential | 17% | 17% | 17% | 0% | 17% | 0% | 17% | **50%** | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 50% | 50% | **100%** | 67% | 67% | 50% | 71% | **100%** |
| gaussian | 83% | 83% | 71% | 67% | 83% | 67% | 17% | 71% | 71% |
| causal | 71% | 83% | 83% | **100%** | 71% | 17% | 50% | 67% | 71% |
| uniform | 83% | 83% | 71% | 83% | 67% | 67% | 50% | 71% | 67% |
| differential | 17% | 50% | 50% | 0% | 17% | 0% | 50% | 50% | 50% |
| ema | 67% | 83% | 67% | **100%** | 67% | 50% | **100%** | 67% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | **+33%** | **+83%** | **+50%** | **+50%** | **+33%** | **+55%** | **+83%** |
| gaussian | **+67%** | **+67%** | **+55%** | **+50%** | **+67%** | **+50%** | 0% | **+55%** | **+55%** |
| causal | **+55%** | **+67%** | **+67%** | **+83%** | **+55%** | 0% | **+33%** | **+50%** | **+55%** |
| uniform | **+67%** | **+67%** | **+55%** | **+67%** | **+50%** | **+50%** | **+33%** | **+55%** | **+50%** |
| differential | 0% | **+33%** | **+33%** | 0% | 0% | 0% | **+33%** | 0% | **+33%** |
| ema | **+50%** | **+67%** | **+50%** | **+83%** | **+50%** | **+33%** | **+83%** | **+50%** | **+50%** |

## non1to1_fma_source

### gemini

**bare** — best: `causal × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% | 60% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | **80%** | 20% |
| uniform | 20% | **80%** | 67% | 20% | 20% | 20% | 20% | 60% | 20% |
| differential | 60% | **80%** | 20% | 0% | 60% | 0% | 20% | 60% | 60% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 71% | **100%** | 80% | 20% | 71% | 71% | 71% |
| gaussian | 80% | 83% | 71% | 80% | 80% | 20% | 20% | 71% | 71% |
| causal | 80% | 83% | 71% | 80% | 67% | 50% | 71% | 63% | 63% |
| uniform | 80% | 83% | 71% | 80% | 67% | 20% | 71% | 71% | 71% |
| differential | 57% | 83% | **100%** | 0% | 57% | 0% | **100%** | 71% | **100%** |
| ema | 80% | 71% | 71% | **100%** | 80% | 67% | 71% | **100%** | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | **+51%** | **+51%** | **+80%** | **+60%** | 0% | **+11%** | **+11%** | **+11%** |
| gaussian | **+60%** | **+63%** | **+51%** | **+60%** | **+60%** | 0% | 0% | **+11%** | **+51%** |
| causal | **+60%** | **+63%** | **+51%** | **+60%** | **+47%** | **+30%** | **+51%** | -18% | **+43%** |
| uniform | **+60%** | **+3%** | **+5%** | **+60%** | **+47%** | 0% | **+51%** | **+11%** | **+51%** |
| differential | -3% | **+3%** | **+80%** | 0% | -3% | 0% | **+80%** | **+11%** | **+40%** |
| ema | **+60%** | **+51%** | **+51%** | **+80%** | **+60%** | **+47%** | **+11%** | **+40%** | **+63%** |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 60% | **100%** | 0% | 60% | 60% | **100%** | 60% | 60% |
| ema | 60% | 60% | 60% | 20% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 71% | **100%** | 20% | 20% | 83% | **100%** | 83% |
| gaussian | 20% | **100%** | 83% | 80% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 20% | 83% | 71% | 71% |
| uniform | 20% | 83% | 71% | 67% | 20% | 20% | 83% | 71% | 83% |
| differential | 60% | **100%** | **100%** | 0% | 60% | 20% | **100%** | 67% | **100%** |
| ema | 20% | **100%** | 71% | **100%** | 20% | 20% | 83% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+40%** | **+11%** | **+80%** | -40% | -40% | **+23%** | **+40%** | **+23%** |
| gaussian | -40% | **+40%** | **+23%** | **+60%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | 0% | -40% | -40% | **+23%** | **+11%** | **+11%** |
| uniform | -40% | **+23%** | **+11%** | **+47%** | -40% | -40% | **+23%** | **+11%** | **+23%** |
| differential | 0% | **+40%** | 0% | 0% | 0% | -40% | 0% | **+7%** | **+40%** |
| ema | -40% | **+40%** | **+11%** | **+80%** | -40% | -40% | **+23%** | **+23%** | **+11%** |

### openai

**bare** — best: `uniform × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 60% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | **80%** | 20% |
| differential | 20% | 60% | 20% | 0% | 20% | 0% | 20% | 60% | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 60% | 60% | **100%** | 80% | 80% | 60% | 80% | **100%** |
| gaussian | 80% | **100%** | 60% | 80% | 80% | 80% | 20% | **100%** | 83% |
| causal | 80% | 80% | 80% | **100%** | 83% | 20% | 60% | 80% | 83% |
| uniform | 80% | **100%** | 60% | 80% | 80% | 80% | 60% | **100%** | 80% |
| differential | 20% | 60% | **100%** | 0% | 20% | 0% | **100%** | 60% | 80% |
| ema | 80% | 80% | 80% | **100%** | 80% | 20% | **100%** | 60% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | **+40%** | **+80%** | **+60%** | **+60%** | **+40%** | **+60%** | **+80%** |
| gaussian | **+60%** | **+80%** | **+40%** | **+60%** | **+60%** | **+60%** | 0% | **+80%** | **+63%** |
| causal | **+60%** | **+60%** | **+60%** | **+80%** | **+63%** | 0% | **+40%** | **+60%** | **+63%** |
| uniform | **+60%** | **+80%** | **+40%** | **+60%** | **+60%** | **+60%** | **+40%** | **+20%** | **+60%** |
| differential | 0% | 0% | **+80%** | 0% | 0% | 0% | **+80%** | 0% | **+60%** |
| ema | **+60%** | **+60%** | **+60%** | **+80%** | **+60%** | 0% | **+80%** | **+40%** | **+60%** |

## rcp_only

### gemini

**bare** — best: `differential × per_token` (80%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 60% | 60% |
| differential | 20% | **80%** | 20% | 0% | 20% | 0% | **80%** | 60% | 60% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 60% | **80%** | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 63% | **100%** | 80% | 20% | 71% | 67% | 71% |
| gaussian | 80% | 63% | 63% | 80% | 80% | 20% | 20% | 71% | 83% |
| causal | 80% | 83% | 63% | 80% | 80% | 20% | 71% | 63% | 71% |
| uniform | 80% | 83% | 63% | 80% | 80% | 20% | 71% | 71% | 83% |
| differential | 20% | 71% | **100%** | 0% | 20% | 0% | **100%** | 80% | 83% |
| ema | 80% | 63% | 71% | **100%** | 80% | 67% | 71% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | **+51%** | **+43%** | **+80%** | **+60%** | 0% | **+11%** | **+7%** | **+51%** |
| gaussian | **+60%** | **+43%** | **+43%** | **+60%** | **+60%** | 0% | 0% | **+11%** | **+63%** |
| causal | **+60%** | **+63%** | **+43%** | **+60%** | **+60%** | 0% | **+51%** | **+3%** | **+51%** |
| uniform | **+60%** | **+63%** | **+43%** | **+60%** | **+60%** | 0% | **+51%** | **+11%** | **+23%** |
| differential | 0% | -9% | **+80%** | 0% | 0% | 0% | **+20%** | **+20%** | **+23%** |
| ema | **+60%** | **+43%** | **+51%** | **+80%** | **+60%** | **+47%** | **+11%** | **+3%** | **+51%** |

### ollama

**bare** — best: `identity × global_residual` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **60%** | **60%** | **60%** | 20% | **60%** | **60%** | **60%** | **60%** | **60%** |
| gaussian | **60%** | **60%** | **60%** | 20% | **60%** | **60%** | **60%** | **60%** | **60%** |
| causal | **60%** | **60%** | **60%** | 20% | **60%** | **60%** | **60%** | **60%** | **60%** |
| uniform | **60%** | **60%** | **60%** | 20% | **60%** | **60%** | **60%** | **60%** | **60%** |
| differential | **60%** | **60%** | **60%** | 0% | **60%** | **60%** | **60%** | **60%** | **60%** |
| ema | **60%** | **60%** | **60%** | 20% | **60%** | **60%** | **60%** | **60%** | **60%** |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 80% | 71% | **100%** | 20% | 20% | 71% | **100%** | 71% |
| gaussian | 20% | 83% | **100%** | 80% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | **100%** | 20% | 20% | 20% | 20% | 71% | 71% | 71% |
| uniform | 20% | **100%** | 80% | **100%** | 20% | 20% | 71% | 71% | **100%** |
| differential | 60% | 83% | **100%** | 0% | 60% | 20% | **100%** | **100%** | **100%** |
| ema | 20% | 83% | 80% | **100%** | 20% | 20% | 71% | 71% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+20%** | **+11%** | **+80%** | -40% | -40% | **+11%** | **+40%** | **+11%** |
| gaussian | -40% | **+23%** | **+40%** | **+60%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+40%** | -40% | 0% | -40% | -40% | **+11%** | **+11%** | **+11%** |
| uniform | -40% | **+40%** | **+20%** | **+80%** | -40% | -40% | **+11%** | **+11%** | **+40%** |
| differential | 0% | **+23%** | **+40%** | 0% | 0% | -40% | **+40%** | **+40%** | **+40%** |
| ema | -40% | **+23%** | **+20%** | **+80%** | -40% | -40% | **+11%** | **+11%** | **+11%** |

### openai

**bare** — best: `identity × per_token` (60%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **60%** | 20% | 0% | 20% | 20% | 20% | 20% | 20% |
| gaussian | 20% | 20% | 20% | 0% | 20% | 20% | 20% | 20% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |
| differential | 20% | 20% | 20% | 0% | 20% | 0% | 20% | **60%** | 20% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% | 20% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 60% | 60% | **100%** | 80% | **100%** | 60% | **100%** | **100%** |
| gaussian | 80% | **100%** | 60% | 80% | 80% | **100%** | 20% | 83% | 83% |
| causal | 80% | 80% | 80% | **100%** | 80% | **100%** | 60% | 80% | 83% |
| uniform | 80% | **100%** | 83% | 80% | 80% | **100%** | 60% | **100%** | 83% |
| differential | 20% | 60% | 80% | 0% | 20% | 0% | 80% | 60% | 80% |
| ema | 80% | 80% | 80% | **100%** | 80% | 60% | **100%** | 83% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | **+40%** | **+100%** | **+60%** | **+80%** | **+40%** | **+80%** | **+80%** |
| gaussian | **+60%** | **+80%** | **+40%** | **+80%** | **+60%** | **+80%** | 0% | **+63%** | **+63%** |
| causal | **+60%** | **+60%** | **+60%** | **+80%** | **+60%** | **+80%** | **+40%** | **+60%** | **+63%** |
| uniform | **+60%** | **+80%** | **+63%** | **+60%** | **+60%** | **+80%** | **+40%** | **+80%** | **+63%** |
| differential | 0% | **+40%** | **+60%** | 0% | 0% | 0% | **+60%** | 0% | **+60%** |
| ema | **+60%** | **+60%** | **+60%** | **+80%** | **+60%** | **+40%** | **+80%** | **+63%** | **+63%** |

## reference

### gemini

**bare** — best: `causal × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 50% | 50% | 17% | 17% | 17% | 17% | 50% | 50% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | **67%** | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 50% |
| differential | 50% | 17% | 17% | 0% | 50% | 0% | 17% | 50% | **67%** |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 57% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 83% | **100%** | **100%** | **100%** | 86% | **100%** | 83% | 75% |
| gaussian | **100%** | 83% | **100%** | 67% | **100%** | 75% | 17% | 86% | 86% |
| causal | **100%** | **100%** | **100%** | 83% | **100%** | 86% | **100%** | 86% | 75% |
| uniform | **100%** | **100%** | **100%** | 67% | **100%** | 75% | **100%** | 75% | 75% |
| differential | 71% | 57% | **100%** | 0% | 71% | 0% | **100%** | 50% | 86% |
| ema | **100%** | 86% | **100%** | **100%** | **100%** | 83% | **100%** | 75% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+33%** | **+50%** | **+83%** | **+83%** | **+69%** | **+83%** | **+33%** | **+25%** |
| gaussian | **+83%** | **+67%** | **+83%** | **+50%** | **+83%** | **+58%** | 0% | **+36%** | **+36%** |
| causal | **+83%** | **+83%** | **+83%** | **+67%** | **+83%** | **+69%** | **+83%** | **+19%** | **+58%** |
| uniform | **+83%** | **+83%** | **+83%** | **+50%** | **+83%** | **+58%** | **+83%** | **+25%** | **+25%** |
| differential | **+21%** | **+40%** | **+83%** | 0% | **+21%** | 0% | **+83%** | 0% | **+19%** |
| ema | **+83%** | **+69%** | **+83%** | **+83%** | **+83%** | **+67%** | **+83%** | **+25%** | **+29%** |

### ollama

**bare** — best: `identity × per_token` (71%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **71%** | 63% | 17% | 50% | 50% | 67% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |
| causal | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |
| uniform | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |
| differential | 50% | 63% | 67% | 0% | 50% | 50% | 67% | 50% | 50% |
| ema | 50% | 50% | 50% | 17% | 50% | 50% | 67% | 50% | 50% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | 67% | **100%** | 17% | 17% | 71% | 57% | 86% |
| gaussian | 17% | 71% | 71% | 83% | 17% | 17% | 17% | 63% | 86% |
| causal | 17% | 71% | 71% | 83% | 17% | 17% | 71% | 63% | 86% |
| uniform | 17% | 71% | 71% | 83% | 17% | 17% | 71% | 63% | 86% |
| differential | 50% | 57% | **100%** | 0% | 50% | 17% | **100%** | 83% | 86% |
| ema | 17% | 86% | 67% | **100%** | 17% | 63% | 86% | 71% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | 0% | **+4%** | **+83%** | -33% | -33% | **+5%** | **+7%** | **+36%** |
| gaussian | -33% | **+21%** | **+21%** | **+67%** | -33% | -33% | -50% | **+13%** | **+36%** |
| causal | -33% | **+21%** | **+21%** | **+67%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| uniform | -33% | **+21%** | **+21%** | **+67%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| differential | 0% | -5% | **+33%** | 0% | 0% | -33% | **+33%** | **+33%** | **+36%** |
| ema | -33% | **+36%** | **+17%** | **+83%** | -33% | **+13%** | **+19%** | **+21%** | **+36%** |

### openai

**bare** — best: `identity × per_token` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **50%** | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |
| differential | 17% | 17% | 17% | 0% | 17% | 0% | 17% | **50%** | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% | 17% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | **100%** | 67% | 67% | 50% | 67% | 86% |
| gaussian | 67% | 57% | 44% | 67% | 67% | 67% | 17% | 57% | 50% |
| causal | 50% | 71% | 86% | 83% | 57% | 17% | 50% | 67% | 71% |
| uniform | 67% | 71% | 56% | 67% | 67% | 67% | 50% | 57% | 67% |
| differential | 17% | 50% | 83% | 0% | 17% | 0% | 83% | 50% | 50% |
| ema | 67% | **100%** | 86% | 83% | 67% | 17% | 83% | 57% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+33%** | 0% | **+33%** | **+83%** | **+50%** | **+50%** | **+33%** | **+50%** | **+69%** |
| gaussian | **+50%** | **+40%** | **+28%** | **+50%** | **+50%** | **+50%** | 0% | **+40%** | **+33%** |
| causal | **+33%** | **+55%** | **+69%** | **+67%** | **+40%** | 0% | **+33%** | **+50%** | **+55%** |
| uniform | **+50%** | **+55%** | **+39%** | **+50%** | **+50%** | **+50%** | **+33%** | **+40%** | **+50%** |
| differential | 0% | **+33%** | **+67%** | 0% | 0% | 0% | **+67%** | 0% | **+33%** |
| ema | **+50%** | **+83%** | **+69%** | **+67%** | **+50%** | 0% | **+67%** | **+40%** | **+50%** |

## reference_big

### gemini

**bare** — best: `identity × amplitude_sort` (50%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 38% | 38% | 13% | 13% | 13% | 38% | **50%** | 38% |
| gaussian | 13% | **50%** | 13% | 13% | 13% | 13% | 13% | 38% | 38% |
| causal | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 40% | 38% |
| uniform | 13% | **50%** | 38% | 13% | 13% | 13% | 13% | 44% | 38% |
| differential | 38% | 38% | 13% | 0% | 38% | 0% | 13% | 38% | 13% |
| ema | 13% | **50%** | 13% | 13% | 13% | 13% | 38% | 38% | 38% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 88% | 88% | **100%** | **100%** | 88% | **100%** | **100%** | **100%** | **100%** |
| gaussian | 75% | 75% | 88% | 75% | 88% | 13% | 13% | **100%** | **100%** |
| causal | **100%** | **100%** | **100%** | 88% | **100%** | 88% | **100%** | **100%** | **100%** |
| uniform | 75% | 75% | 88% | 75% | 75% | **100%** | **100%** | 88% | **100%** |
| differential | 75% | 63% | **100%** | 0% | 75% | 0% | **100%** | **100%** | **100%** |
| ema | 63% | 88% | 88% | **100%** | 88% | 63% | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+75%** | **+50%** | **+63%** | **+88%** | **+75%** | **+88%** | **+63%** | **+50%** | **+63%** |
| gaussian | **+63%** | **+25%** | **+75%** | **+63%** | **+75%** | 0% | 0% | **+63%** | **+63%** |
| causal | **+88%** | **+88%** | **+88%** | **+75%** | **+88%** | **+75%** | **+63%** | **+60%** | **+63%** |
| uniform | **+63%** | **+25%** | **+50%** | **+63%** | **+63%** | **+88%** | **+88%** | **+43%** | **+63%** |
| differential | **+38%** | **+25%** | **+88%** | 0% | **+38%** | 0% | **+88%** | **+63%** | **+88%** |
| ema | **+50%** | **+38%** | **+75%** | **+88%** | **+75%** | **+50%** | **+63%** | **+50%** | **+50%** |

### ollama

**bare** — best: `identity × arithmetic` (88%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | 75% | **88%** | 13% | 38% | 38% | 50% | 38% | 38% |
| gaussian | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| causal | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| uniform | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |
| differential | 38% | 75% | 50% | 0% | 38% | 38% | 50% | 38% | 75% |
| ema | 38% | 38% | 38% | 13% | 38% | 38% | 50% | 38% | 38% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 88% | 75% | **100%** | **100%** | 88% | 13% | 88% | 75% | **100%** |
| gaussian | 63% | 75% | 75% | 75% | 88% | 13% | 13% | 88% | **100%** |
| causal | 13% | 75% | 88% | 13% | 13% | 13% | 88% | 88% | 88% |
| uniform | 88% | 88% | 50% | 75% | 88% | 13% | 88% | 88% | **100%** |
| differential | 75% | 63% | 75% | 0% | 75% | 13% | 88% | 63% | 75% |
| ema | 88% | **100%** | 50% | 88% | 88% | 88% | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | **+13%** | **+88%** | **+50%** | -25% | **+38%** | **+38%** | **+63%** |
| gaussian | **+25%** | **+38%** | **+38%** | **+63%** | **+50%** | -25% | -37% | **+50%** | **+63%** |
| causal | -25% | **+38%** | **+50%** | 0% | -25% | -25% | **+38%** | **+50%** | **+50%** |
| uniform | **+50%** | **+50%** | **+13%** | **+63%** | **+50%** | -25% | **+38%** | **+50%** | **+63%** |
| differential | **+38%** | -12% | **+25%** | 0% | **+38%** | -25% | **+38%** | **+25%** | 0% |
| ema | **+50%** | **+63%** | **+13%** | **+75%** | **+50%** | **+50%** | **+50%** | **+50%** | **+50%** |

### openai

**bare** — best: `causal × amplitude_sort` (44%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 38% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |
| gaussian | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |
| causal | 13% | 13% | 13% | 13% | 13% | 13% | 13% | **44%** | 13% |
| uniform | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |
| differential | 13% | 38% | 13% | 0% | 13% | 0% | 13% | **44%** | 13% |
| ema | 13% | 13% | 13% | 13% | 13% | 13% | 13% | 38% | 13% |

**described** — best: `identity × arithmetic_opt` (100%)

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 75% | 38% | 38% | **100%** | 75% | 50% | 38% | 56% | 88% |
| gaussian | 75% | 63% | 60% | 13% | 75% | 50% | 13% | 63% | 75% |
| causal | 63% | 75% | 88% | 88% | 75% | 13% | 38% | 75% | 75% |
| uniform | 63% | 75% | 60% | 13% | 63% | 50% | 38% | 75% | 50% |
| differential | 13% | 38% | 88% | 0% | 38% | 0% | 88% | 30% | 38% |
| ema | 75% | 88% | 88% | 88% | 75% | 13% | 88% | 45% | 50% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+63%** | 0% | **+25%** | **+88%** | **+63%** | **+38%** | **+25%** | **+18%** | **+75%** |
| gaussian | **+63%** | **+50%** | **+48%** | 0% | **+63%** | **+38%** | 0% | **+25%** | **+63%** |
| causal | **+50%** | **+63%** | **+75%** | **+75%** | **+63%** | 0% | **+25%** | **+31%** | **+63%** |
| uniform | **+50%** | **+63%** | **+48%** | 0% | **+50%** | **+38%** | **+25%** | **+38%** | **+38%** |
| differential | 0% | 0% | **+75%** | 0% | **+25%** | 0% | **+75%** | -14% | **+25%** |
| ema | **+63%** | **+75%** | **+75%** | **+75%** | **+63%** | 0% | **+75%** | **+8%** | **+38%** |

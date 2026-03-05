# Full results — all kernels

Per-kernel jaccard matrices for every provider × mode combination.

## add_fma

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 83% | **100%** | 17% | 17% | 17% | 75% | **100%** |
| gaussian | 17% | 17% | **100%** | 17% | 17% | 17% | 75% | **100%** |
| causal | 17% | **100%** | **100%** | 17% | 17% | 17% | 75% | **100%** |
| uniform | 17% | 83% | **100%** | 17% | 17% | 17% | 75% | **100%** |
| differential | 71% | 71% | 83% | 71% | 0% | 17% | 75% | 83% |
| ema | 17% | **100%** | **100%** | 17% | 17% | 17% | 63% | **100%** |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | **100%** | 86% | **100%** | 63% | 86% | 75% | 86% |
| gaussian | **100%** | **100%** | 86% | **100%** | 63% | 17% | 75% | 75% |
| causal | 83% | **100%** | 86% | 83% | 63% | 86% | 75% | 75% |
| uniform | **100%** | **100%** | 86% | **100%** | 63% | 86% | 75% | 86% |
| differential | 50% | 67% | 83% | 50% | 0% | **100%** | 63% | 83% |
| ema | **100%** | 86% | 86% | **100%** | 63% | 86% | 86% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+17%** | -14% | **+83%** | **+46%** | **+69%** | 0% | -14% |
| gaussian | **+83%** | **+83%** | -14% | **+83%** | **+46%** | 0% | 0% | -25% |
| causal | **+67%** | 0% | -14% | **+67%** | **+46%** | **+69%** | 0% | -25% |
| uniform | **+83%** | **+17%** | -14% | **+83%** | **+46%** | **+69%** | 0% | -14% |
| differential | -21% | -5% | 0% | -21% | 0% | **+83%** | -12% | 0% |
| ema | **+83%** | -14% | -14% | **+83%** | **+46%** | **+69%** | **+23%** | 0% |

### ollama

**bare** — best: `identity × per_token` (71%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **71%** | 63% | 50% | 50% | 67% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| differential | 50% | **71%** | 17% | 50% | 0% | 17% | 50% | 57% |
| ema | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |

**described** — best: `gaussian × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 83% | 75% | 17% | 17% | 71% | 63% | 86% |
| gaussian | 17% | **100%** | 86% | 17% | 17% | 17% | 63% | 63% |
| causal | 17% | 86% | 86% | 17% | 17% | 71% | 63% | 67% |
| uniform | 17% | **100%** | 86% | 17% | 17% | 71% | 63% | 63% |
| differential | 71% | 83% | 83% | 71% | 0% | 67% | 57% | 83% |
| ema | 17% | **100%** | 86% | 17% | 63% | 71% | 63% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+12%** | **+13%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| gaussian | -33% | **+50%** | **+36%** | -33% | -33% | -33% | **+13%** | **+13%** |
| causal | -33% | **+36%** | **+36%** | -33% | -33% | **+5%** | **+13%** | **+17%** |
| uniform | -33% | **+50%** | **+36%** | -33% | -33% | **+5%** | **+13%** | **+13%** |
| differential | **+21%** | **+12%** | **+67%** | **+21%** | 0% | **+50%** | **+7%** | **+26%** |
| ema | -33% | **+50%** | **+36%** | -33% | **+13%** | **+5%** | **+13%** | **+17%** |

### openai

**bare** — best: `identity × per_token` (83%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **83%** | 50% | 50% | 17% | 50% | 50% | 17% |
| gaussian | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| causal | 17% | 17% | 17% | 50% | 17% | 50% | 57% | 75% |
| uniform | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| differential | 17% | 50% | 50% | 17% | 0% | 50% | 57% | 50% |
| ema | 50% | 17% | 17% | 50% | 17% | 50% | 50% | 75% |

**described** — best: `identity × per_token` (86%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | **86%** | 71% | 71% | 17% | 71% | 75% | 71% |
| gaussian | 71% | 71% | **86%** | 71% | 17% | 17% | 71% | **86%** |
| causal | 83% | **86%** | 71% | 83% | 17% | 71% | 63% | **86%** |
| uniform | 71% | 71% | 71% | 83% | 17% | 71% | 63% | **86%** |
| differential | 71% | 67% | 83% | 71% | 0% | 83% | 63% | 83% |
| ema | 57% | 75% | 71% | 71% | 83% | 71% | 75% | **86%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+21%** | **+2%** | **+21%** | **+21%** | 0% | **+21%** | **+25%** | **+55%** |
| gaussian | **+21%** | **+55%** | **+69%** | **+21%** | 0% | 0% | **+21%** | **+11%** |
| causal | **+67%** | **+69%** | **+55%** | **+33%** | 0% | **+21%** | **+5%** | **+11%** |
| uniform | **+21%** | **+55%** | **+55%** | **+33%** | 0% | **+55%** | **+13%** | **+11%** |
| differential | **+55%** | **+17%** | **+33%** | **+55%** | 0% | **+33%** | **+5%** | **+33%** |
| ema | **+7%** | **+58%** | **+55%** | **+21%** | **+67%** | **+21%** | **+25%** | **+11%** |

## add_fma_rcp

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 86% | **100%** | 14% | 14% | 86% | 88% | 86% |
| gaussian | 14% | 14% | 86% | 14% | 14% | 14% | 88% | 86% |
| causal | 14% | 14% | 86% | 14% | 14% | 14% | 88% | 86% |
| uniform | 14% | 86% | 86% | 14% | 14% | 14% | 88% | **100%** |
| differential | 86% | 86% | 86% | 86% | 0% | 86% | 43% | 71% |
| ema | 14% | 86% | 86% | 14% | 14% | 14% | 57% | 86% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 86% | 75% | **100%** | 75% | 75% | 75% | **100%** |
| gaussian | **100%** | 86% | 75% | **100%** | 75% | 14% | 88% | 88% |
| causal | 71% | **100%** | 88% | 71% | 75% | 88% | 88% | 88% |
| uniform | **100%** | 86% | 75% | **100%** | 75% | 88% | 88% | **100%** |
| differential | 63% | 88% | 86% | 63% | 0% | 71% | 88% | 71% |
| ema | **100%** | 75% | 88% | **100%** | 75% | 88% | 88% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+86%** | 0% | -25% | **+86%** | **+61%** | -11% | -12% | **+14%** |
| gaussian | **+86%** | **+71%** | -11% | **+86%** | **+61%** | 0% | 0% | **+2%** |
| causal | **+57%** | **+86%** | **+2%** | **+57%** | **+61%** | **+73%** | 0% | **+2%** |
| uniform | **+86%** | 0% | -11% | **+86%** | **+61%** | **+73%** | 0% | 0% |
| differential | -23% | **+2%** | 0% | -23% | 0% | -14% | **+45%** | 0% |
| ema | **+86%** | -11% | **+2%** | **+86%** | **+61%** | **+73%** | **+30%** | **+14%** |

### ollama

**bare** — best: `differential × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | 75% | 75% | 43% | 43% | 57% | 43% | 43% |
| gaussian | 43% | 43% | 43% | 43% | 43% | 43% | 43% | 43% |
| causal | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |
| uniform | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |
| differential | 43% | **100%** | 71% | 43% | 0% | 71% | 43% | 86% |
| ema | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |

**described** — best: `identity × arithmetic` (88%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 71% | **88%** | 14% | 14% | 75% | 75% | 75% |
| gaussian | 14% | 86% | 75% | 14% | 14% | 14% | 75% | 75% |
| causal | 14% | **88%** | **88%** | 14% | 14% | 75% | 75% | 71% |
| uniform | 14% | 86% | **88%** | 14% | 14% | 75% | 75% | 75% |
| differential | 63% | 71% | 86% | 63% | 14% | 71% | 71% | 71% |
| ema | 14% | **88%** | **88%** | 14% | 75% | 63% | 75% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -29% | -4% | **+13%** | -29% | -29% | **+18%** | **+32%** | **+32%** |
| gaussian | -29% | **+43%** | **+32%** | -29% | -29% | -29% | **+32%** | **+32%** |
| causal | -29% | **+45%** | **+45%** | -29% | -29% | **+18%** | **+32%** | **+29%** |
| uniform | -29% | **+43%** | **+45%** | -29% | -29% | **+18%** | **+32%** | **+32%** |
| differential | **+20%** | -29% | **+14%** | **+20%** | **+14%** | 0% | **+29%** | -14% |
| ema | -29% | **+45%** | **+45%** | -29% | **+32%** | **+5%** | **+32%** | **+29%** |

### openai

**bare** — best: `gaussian × conv_residual` (88%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | 71% | 43% | 43% | 14% | 43% | 43% | 14% |
| gaussian | 43% | 14% | 14% | 43% | 14% | 14% | 43% | **88%** |
| causal | 14% | 14% | 14% | 14% | 14% | 43% | 43% | 14% |
| uniform | 43% | 14% | 14% | 43% | 14% | 43% | 43% | **88%** |
| differential | 14% | 43% | 43% | 14% | 0% | 43% | **88%** | 43% |
| ema | 43% | 14% | 14% | 43% | 14% | 43% | 86% | **88%** |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 86% | **100%** | 86% | 86% | 14% | 86% | 88% | 86% |
| gaussian | 86% | 86% | 86% | 86% | 14% | 14% | 75% | **100%** |
| causal | 86% | **100%** | 86% | 86% | 14% | 86% | 75% | **100%** |
| uniform | 86% | 86% | 86% | 86% | 14% | 86% | **100%** | **100%** |
| differential | 63% | **100%** | 71% | 63% | 0% | 86% | 63% | 71% |
| ema | 71% | **100%** | 86% | 86% | 86% | 86% | 88% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+43%** | **+29%** | **+43%** | **+43%** | 0% | **+43%** | **+45%** | **+71%** |
| gaussian | **+43%** | **+71%** | **+71%** | **+43%** | 0% | 0% | **+32%** | **+13%** |
| causal | **+71%** | **+86%** | **+71%** | **+71%** | 0% | **+43%** | **+32%** | **+86%** |
| uniform | **+43%** | **+71%** | **+71%** | **+43%** | 0% | **+43%** | **+57%** | **+13%** |
| differential | **+48%** | **+57%** | **+29%** | **+48%** | 0% | **+43%** | -25% | **+29%** |
| ema | **+29%** | **+86%** | **+71%** | **+43%** | **+71%** | **+43%** | **+2%** | **+13%** |

## add_mul_rcp

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 75% | **100%** | 14% | 14% | 14% | 88% | 88% |
| gaussian | 57% | 14% | 14% | 57% | 14% | 14% | 88% | 88% |
| causal | 14% | 14% | 86% | 14% | 14% | 14% | 88% | 88% |
| uniform | 57% | 14% | 57% | 57% | 14% | 14% | 88% | 88% |
| differential | 63% | **100%** | 86% | 63% | 0% | 14% | 50% | **100%** |
| ema | 57% | 75% | 86% | 57% | 14% | 14% | 86% | 88% |

**described** — best: `identity × momentum` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | 71% | 86% | **100%** | **100%** | **100%** | 75% | **100%** |
| gaussian | 71% | 63% | 75% | 71% | **100%** | 14% | 88% | 88% |
| causal | **100%** | **100%** | 88% | 86% | **100%** | **100%** | 88% | 88% |
| uniform | 71% | 75% | **100%** | 71% | **100%** | **100%** | 88% | 88% |
| differential | 86% | 63% | **100%** | 86% | 0% | **100%** | 88% | **100%** |
| ema | 71% | 88% | 88% | 71% | **100%** | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+14%** | -4% | -14% | **+86%** | **+86%** | **+86%** | -12% | **+13%** |
| gaussian | **+14%** | **+48%** | **+61%** | **+14%** | **+86%** | 0% | 0% | 0% |
| causal | **+86%** | **+86%** | **+2%** | **+71%** | **+86%** | **+86%** | 0% | 0% |
| uniform | **+14%** | **+61%** | **+43%** | **+14%** | **+86%** | **+86%** | 0% | 0% |
| differential | **+23%** | -37% | **+14%** | **+23%** | 0% | **+86%** | **+38%** | 0% |
| ema | **+14%** | **+13%** | **+2%** | **+14%** | **+86%** | **+86%** | **+2%** | 0% |

### ollama

**bare** — best: `identity × per_token` (75%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | **75%** | **75%** | 43% | 43% | 57% | 43% | 43% |
| gaussian | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |
| causal | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |
| uniform | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |
| differential | 43% | 63% | 57% | 43% | 0% | 57% | 43% | **75%** |
| ema | 43% | 43% | 43% | 43% | 43% | 57% | 43% | 43% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 14% | 75% | 57% | 14% | 14% | 75% | 63% | 88% |
| gaussian | 14% | 63% | 63% | 14% | 14% | 14% | 75% | 75% |
| causal | 14% | 75% | 75% | 14% | 14% | 75% | 75% | 63% |
| uniform | 14% | 63% | 75% | 14% | 14% | 75% | 75% | 88% |
| differential | 63% | 50% | **100%** | 63% | 0% | **100%** | 71% | 88% |
| ema | 14% | 88% | 57% | 14% | 75% | 88% | 75% | 57% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -29% | 0% | -18% | -29% | -29% | **+18%** | **+20%** | **+45%** |
| gaussian | -29% | **+20%** | **+20%** | -29% | -29% | -43% | **+32%** | **+32%** |
| causal | -29% | **+32%** | **+32%** | -29% | -29% | **+18%** | **+32%** | **+20%** |
| uniform | -29% | **+20%** | **+32%** | -29% | -29% | **+18%** | **+32%** | **+45%** |
| differential | **+20%** | -12% | **+43%** | **+20%** | 0% | **+43%** | **+29%** | **+13%** |
| ema | -29% | **+45%** | **+14%** | -29% | **+32%** | **+30%** | **+32%** | **+14%** |

### openai

**bare** — best: `causal × conv_residual` (88%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 43% | 43% | 43% | 43% | 14% | 14% | 43% | 14% |
| gaussian | 43% | 14% | 14% | 43% | 14% | 14% | 43% | 14% |
| causal | 43% | 14% | 14% | 43% | 14% | 14% | 43% | **88%** |
| uniform | 43% | 14% | 14% | 43% | 14% | 14% | 43% | **88%** |
| differential | 14% | 14% | 43% | 14% | 0% | 14% | **88%** | 14% |
| ema | 43% | 14% | 14% | 43% | 14% | 14% | 86% | **88%** |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 63% | **100%** | 75% | 63% | 14% | 75% | 75% | 88% |
| gaussian | 63% | 63% | 63% | 63% | 14% | 14% | 88% | 75% |
| causal | 63% | 75% | 88% | 63% | 14% | 75% | 75% | 88% |
| uniform | 63% | 75% | 75% | 63% | 14% | 75% | 88% | 75% |
| differential | 63% | 86% | **100%** | 63% | 0% | **100%** | 75% | **100%** |
| ema | 63% | 88% | 88% | 63% | 63% | 88% | 88% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+20%** | **+57%** | **+32%** | **+20%** | 0% | **+61%** | **+32%** | **+73%** |
| gaussian | **+20%** | **+48%** | **+48%** | **+20%** | 0% | 0% | **+45%** | **+61%** |
| causal | **+20%** | **+61%** | **+73%** | **+20%** | 0% | **+61%** | **+32%** | 0% |
| uniform | **+20%** | **+61%** | **+61%** | **+20%** | 0% | **+61%** | **+45%** | -12% |
| differential | **+48%** | **+71%** | **+57%** | **+48%** | 0% | **+86%** | -12% | **+86%** |
| ema | **+20%** | **+73%** | **+73%** | **+20%** | **+48%** | **+73%** | **+2%** | -12% |

## add_only

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | **100%** | 20% | 20% | 20% | 63% | 71% |
| gaussian | 20% | 20% | **100%** | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 20% | 80% | 20% | 20% | 20% | 63% | 71% |
| uniform | 20% | 20% | **100%** | 20% | 20% | 20% | 63% | 71% |
| differential | 57% | 83% | **100%** | 57% | 0% | 20% | 71% | 83% |
| ema | 20% | 83% | **100%** | 20% | 20% | 20% | 63% | 71% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | **100%** | 83% | **100%** | 71% | 83% | 67% | 71% |
| gaussian | **100%** | **100%** | 83% | **100%** | 71% | 20% | 83% | 71% |
| causal | 80% | **100%** | 83% | **100%** | 71% | 83% | 63% | 83% |
| uniform | **100%** | **100%** | 83% | **100%** | 71% | 83% | 63% | 71% |
| differential | 57% | 67% | **100%** | 57% | 0% | **100%** | 50% | 83% |
| ema | 80% | 71% | 83% | 80% | **100%** | 83% | 63% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+80%** | **+17%** | -17% | **+80%** | **+51%** | **+63%** | **+4%** | 0% |
| gaussian | **+80%** | **+80%** | -17% | **+80%** | **+51%** | 0% | **+12%** | 0% |
| causal | **+60%** | **+80%** | **+3%** | **+80%** | **+51%** | **+63%** | 0% | **+12%** |
| uniform | **+80%** | **+80%** | -17% | **+80%** | **+51%** | **+63%** | 0% | 0% |
| differential | 0% | -17% | 0% | 0% | 0% | **+80%** | -21% | 0% |
| ema | **+60%** | -12% | -17% | **+60%** | **+80%** | **+63%** | 0% | **+12%** |

### ollama

**bare** — best: `identity × delta_decode` (80%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 57% | 50% | 60% | 60% | **80%** | 60% | 60% |
| gaussian | 60% | 60% | 60% | 60% | 60% | **80%** | 60% | 60% |
| causal | 60% | 60% | 60% | 60% | 60% | **80%** | 60% | 60% |
| uniform | 60% | 60% | 60% | 60% | 60% | **80%** | 60% | 60% |
| differential | 60% | 57% | 20% | 60% | 60% | 20% | 60% | 57% |
| ema | 60% | 60% | 60% | 60% | 60% | **80%** | 60% | 60% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | 57% | 20% | 20% | 57% | 67% | 71% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 50% | 57% |
| causal | 20% | 57% | 20% | 20% | 20% | 57% | 50% | 71% |
| uniform | 20% | 57% | 57% | 20% | 20% | 57% | 50% | 80% |
| differential | 60% | 67% | **100%** | 60% | 20% | **100%** | 57% | 83% |
| ema | 20% | 71% | 80% | 20% | 20% | 71% | 50% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+26%** | **+7%** | -40% | -40% | -23% | **+7%** | **+11%** |
| gaussian | -40% | -40% | -40% | -40% | -40% | -60% | -10% | -3% |
| causal | -40% | -3% | -40% | -40% | -40% | -23% | -10% | **+11%** |
| uniform | -40% | -3% | -3% | -40% | -40% | -23% | -10% | **+20%** |
| differential | 0% | **+10%** | **+80%** | 0% | -40% | **+80%** | -3% | **+26%** |
| ema | -40% | **+11%** | **+20%** | -40% | -40% | -9% | -10% | **+11%** |

### openai

**bare** — best: `gaussian × conv_residual` (71%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 60% | 20% | 20% | 60% | 20% |
| gaussian | 60% | 20% | 20% | 60% | 20% | 20% | 60% | **71%** |
| causal | 60% | 20% | 20% | 60% | 20% | 20% | 60% | 63% |
| uniform | 60% | 20% | 20% | 60% | 20% | 20% | 60% | **71%** |
| differential | 20% | 20% | 20% | 20% | 0% | 20% | 20% | 20% |
| ema | 60% | 20% | 20% | 60% | 20% | 20% | 57% | **71%** |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 83% | 71% | 57% | 80% | 57% | 57% | 71% |
| gaussian | 57% | 57% | 57% | 57% | 80% | 20% | 57% | 57% |
| causal | 67% | 57% | 71% | 80% | 20% | 57% | 57% | 71% |
| uniform | 57% | 57% | 71% | 67% | 80% | 57% | 57% | 71% |
| differential | 57% | 71% | **100%** | 57% | 0% | **100%** | 80% | **100%** |
| ema | 57% | 71% | 71% | 57% | 57% | 71% | 71% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -3% | **+23%** | **+11%** | -3% | **+60%** | **+37%** | -3% | **+51%** |
| gaussian | -3% | **+37%** | **+37%** | -3% | **+60%** | 0% | -3% | -14% |
| causal | **+7%** | **+37%** | **+51%** | **+20%** | 0% | **+37%** | -3% | **+9%** |
| uniform | -3% | **+37%** | **+51%** | **+7%** | **+60%** | **+37%** | -3% | 0% |
| differential | **+37%** | **+51%** | **+80%** | **+37%** | 0% | **+80%** | **+60%** | **+80%** |
| ema | -3% | **+51%** | **+51%** | -3% | **+37%** | **+51%** | **+14%** | 0% |

## add_rcp

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 86% | **100%** | 17% | 17% | 17% | 86% | 86% |
| gaussian | 17% | 17% | 83% | 17% | 17% | 17% | 75% | 86% |
| causal | 17% | 71% | **100%** | 17% | 17% | 17% | 75% | 86% |
| uniform | 17% | 71% | **100%** | 17% | 17% | 17% | 75% | 86% |
| differential | 71% | 86% | **100%** | 71% | 0% | 17% | 71% | **100%** |
| ema | 17% | 71% | **100%** | 17% | 17% | 17% | 75% | 86% |

**described** — best: `identity × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 86% | 75% | 83% | 86% | 86% | 75% | **100%** |
| gaussian | 83% | 63% | 86% | 83% | 17% | 17% | 75% | 86% |
| causal | 67% | **100%** | 75% | 86% | 86% | 86% | 75% | 86% |
| uniform | 83% | 86% | 75% | 83% | 17% | 86% | 75% | 86% |
| differential | 71% | 67% | **100%** | 71% | 0% | **100%** | 67% | **100%** |
| ema | 67% | 75% | 86% | 67% | 83% | 86% | 71% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | -25% | **+67%** | **+69%** | **+69%** | -11% | **+14%** |
| gaussian | **+67%** | **+46%** | **+2%** | **+67%** | 0% | 0% | 0% | 0% |
| causal | **+50%** | **+29%** | -25% | **+69%** | **+69%** | **+69%** | 0% | 0% |
| uniform | **+67%** | **+14%** | -25% | **+67%** | 0% | **+69%** | 0% | 0% |
| differential | 0% | -19% | 0% | 0% | 0% | **+83%** | -5% | 0% |
| ema | **+50%** | **+4%** | -14% | **+50%** | **+67%** | **+69%** | -4% | 0% |

### ollama

**bare** — best: `identity × delta_decode` (67%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 63% | 50% | 50% | **67%** | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | **67%** | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | **67%** | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | **67%** | 50% | 50% |
| differential | 50% | 50% | 17% | 50% | 50% | 17% | 50% | 50% |
| ema | 50% | 50% | 50% | 50% | 50% | **67%** | 50% | 50% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 63% | 86% | 75% | 17% | 17% | 63% | 57% | 75% |
| gaussian | 63% | 86% | 75% | 17% | 17% | 17% | 63% | 63% |
| causal | 17% | 75% | 75% | 17% | 17% | 75% | 63% | 75% |
| uniform | 63% | 75% | 75% | 63% | 17% | 75% | 63% | 63% |
| differential | 50% | 71% | **100%** | 50% | 17% | **100%** | 57% | 71% |
| ema | 63% | 75% | 75% | 17% | 17% | 75% | 63% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+13%** | **+36%** | **+13%** | -33% | -33% | -4% | **+7%** | **+25%** |
| gaussian | **+13%** | **+36%** | **+25%** | -33% | -33% | -50% | **+13%** | **+13%** |
| causal | -33% | **+25%** | **+25%** | -33% | -33% | **+8%** | **+13%** | **+25%** |
| uniform | **+13%** | **+25%** | **+25%** | **+13%** | -33% | **+8%** | **+13%** | **+13%** |
| differential | 0% | **+21%** | **+83%** | 0% | -33% | **+83%** | **+7%** | **+21%** |
| ema | **+13%** | **+25%** | **+25%** | -33% | -33% | **+8%** | **+13%** | **+25%** |

### openai

**bare** — best: `identity × conv_residual` (86%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 50% | 17% | 50% | 50% | **86%** |
| gaussian | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| causal | 50% | 17% | 17% | 50% | 17% | 50% | 50% | **86%** |
| uniform | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| differential | 17% | 17% | 17% | 17% | 0% | 17% | 83% | 17% |
| ema | 50% | 17% | 17% | 50% | 17% | 50% | 83% | 75% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | **100%** | 71% | 71% | 67% | 86% | 57% | 86% |
| gaussian | 71% | 83% | 71% | 71% | 67% | 17% | 63% | 71% |
| causal | 71% | **100%** | 86% | 71% | 17% | 86% | 63% | 86% |
| uniform | 71% | 71% | 71% | 71% | 67% | 86% | 71% | 71% |
| differential | 50% | 67% | 67% | 50% | 0% | 67% | 57% | **100%** |
| ema | 71% | 75% | 86% | 71% | 83% | 86% | 75% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+21%** | **+50%** | **+21%** | **+21%** | **+50%** | **+36%** | **+7%** | 0% |
| gaussian | **+21%** | **+67%** | **+55%** | **+21%** | **+50%** | 0% | **+13%** | -4% |
| causal | **+21%** | **+83%** | **+69%** | **+21%** | 0% | **+36%** | **+13%** | 0% |
| uniform | **+21%** | **+55%** | **+55%** | **+21%** | **+50%** | **+69%** | **+21%** | -4% |
| differential | **+33%** | **+50%** | **+50%** | **+33%** | 0% | **+50%** | -26% | **+83%** |
| ema | **+21%** | **+58%** | **+69%** | **+21%** | **+67%** | **+36%** | -8% | **+11%** |

## all_ops

### gemini

**bare** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 75% | 88% | **100%** | 13% | 88% | **100%** | 88% |
| gaussian | **100%** | 13% | 88% | **100%** | 13% | 13% | **100%** | 88% |
| causal | **100%** | 88% | 88% | **100%** | 13% | 13% | **100%** | **100%** |
| uniform | **100%** | 75% | 75% | **100%** | 13% | 13% | **100%** | **100%** |
| differential | 88% | 88% | **100%** | 75% | 0% | **100%** | 88% | 88% |
| ema | **100%** | 88% | 88% | **100%** | 13% | 13% | **100%** | **100%** |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 88% | 88% | **100%** | 88% | **100%** | **100%** | **100%** |
| gaussian | **100%** | 88% | 88% | **100%** | 88% | **100%** | **100%** | **100%** |
| causal | 63% | 88% | **100%** | 75% | 88% | **100%** | **100%** | **100%** |
| uniform | 75% | 88% | 88% | 75% | 88% | **100%** | **100%** | **100%** |
| differential | 75% | **100%** | **100%** | 75% | 0% | **100%** | **100%** | 88% |
| ema | **100%** | 88% | 88% | **100%** | 88% | **100%** | 75% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+13%** | 0% | 0% | **+75%** | **+13%** | 0% | **+13%** |
| gaussian | 0% | **+75%** | 0% | 0% | **+75%** | **+88%** | 0% | **+13%** |
| causal | -37% | 0% | **+13%** | -25% | **+75%** | **+88%** | 0% | 0% |
| uniform | -25% | **+13%** | **+13%** | -25% | **+75%** | **+88%** | 0% | 0% |
| differential | -12% | **+13%** | 0% | 0% | 0% | 0% | **+13%** | 0% |
| ema | 0% | 0% | 0% | 0% | **+75%** | **+88%** | -25% | 0% |

### ollama

**bare** — best: `identity × per_token` (88%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | **88%** | **88%** | 38% | 38% | 50% | 38% | 38% |
| gaussian | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| causal | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| uniform | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| differential | 38% | 75% | 75% | 38% | 38% | 63% | 38% | 75% |
| ema | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 13% | 75% | **100%** | 13% | 13% | 75% | 88% | 88% |
| gaussian | 13% | 75% | 75% | 13% | 13% | **100%** | 88% | 88% |
| causal | 13% | **100%** | **100%** | 13% | 13% | **100%** | 88% | 88% |
| uniform | 13% | 75% | **100%** | 13% | 13% | **100%** | 88% | 88% |
| differential | 75% | 63% | 75% | 75% | 13% | 63% | 63% | 63% |
| ema | 13% | **100%** | **100%** | 13% | 88% | 88% | 88% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -25% | -12% | **+13%** | -25% | -25% | **+25%** | **+50%** | **+50%** |
| gaussian | -25% | **+38%** | **+38%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| causal | -25% | **+63%** | **+63%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| uniform | -25% | **+38%** | **+63%** | -25% | -25% | **+50%** | **+50%** | **+50%** |
| differential | **+38%** | -12% | 0% | **+38%** | -25% | 0% | **+25%** | -12% |
| ema | -25% | **+63%** | **+63%** | -25% | **+50%** | **+38%** | **+50%** | **+63%** |

### openai

**bare** — best: `gaussian × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | 75% | 38% | 38% | 13% | 13% | 38% | 13% |
| gaussian | 38% | 13% | 13% | 38% | 13% | 38% | 38% | **100%** |
| causal | 38% | 13% | 13% | 38% | 13% | 13% | 38% | **100%** |
| uniform | 38% | 13% | 13% | 38% | 13% | 13% | 38% | **100%** |
| differential | 13% | 38% | 38% | 13% | 0% | 38% | 88% | 38% |
| ema | 38% | 13% | 13% | 38% | 13% | 13% | 50% | **100%** |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 75% | **100%** | 75% | 75% | 13% | **100%** | 88% | 88% |
| gaussian | 75% | 75% | 88% | 75% | 13% | 13% | **100%** | 88% |
| causal | 63% | **100%** | **100%** | 75% | 13% | **100%** | 88% | 88% |
| uniform | 75% | 75% | 75% | 75% | 13% | **100%** | 75% | 88% |
| differential | 75% | 75% | **100%** | 75% | 0% | 75% | 63% | **100%** |
| ema | 88% | **100%** | 88% | 75% | 75% | **100%** | **100%** | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+38%** | **+25%** | **+38%** | **+38%** | 0% | **+88%** | **+50%** | **+75%** |
| gaussian | **+38%** | **+63%** | **+75%** | **+38%** | 0% | -25% | **+63%** | -12% |
| causal | **+25%** | **+88%** | **+88%** | **+38%** | 0% | **+88%** | **+50%** | -12% |
| uniform | **+38%** | **+63%** | **+63%** | **+38%** | 0% | **+88%** | **+38%** | -12% |
| differential | **+63%** | **+38%** | **+63%** | **+63%** | 0% | **+38%** | -25% | **+63%** |
| ema | **+50%** | **+88%** | **+75%** | **+38%** | **+63%** | **+88%** | **+50%** | -12% |

## copy

### gemini

**bare** — best: `identity × arithmetic` (80%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 67% | **80%** | 25% | 25% | 25% | 50% | 25% |
| gaussian | 25% | 25% | 25% | 25% | 25% | 25% | 50% | 25% |
| causal | 25% | 25% | 25% | 25% | 25% | 25% | 50% | 25% |
| uniform | 25% | 25% | 25% | 25% | 25% | 25% | 57% | 25% |
| differential | 25% | **80%** | **80%** | 25% | 0% | 25% | 57% | 25% |
| ema | 25% | 25% | 25% | 25% | 25% | 25% | 50% | 67% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 80% | 67% | **100%** | 25% | 67% | 67% | 67% |
| gaussian | **100%** | 67% | 67% | **100%** | **100%** | 67% | 67% | 67% |
| causal | **100%** | 80% | 67% | **100%** | 25% | 67% | 50% | 67% |
| uniform | **100%** | 67% | 67% | **100%** | **100%** | 67% | 67% | 80% |
| differential | 25% | 80% | **100%** | 25% | 0% | **100%** | **100%** | **100%** |
| ema | **100%** | 57% | 67% | **100%** | 80% | 67% | 67% | 80% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+75%** | **+13%** | -13% | **+75%** | 0% | **+42%** | **+17%** | **+42%** |
| gaussian | **+75%** | **+42%** | **+42%** | **+75%** | **+75%** | **+42%** | **+17%** | **+42%** |
| causal | **+75%** | **+55%** | **+42%** | **+75%** | 0% | **+42%** | 0% | **+42%** |
| uniform | **+75%** | **+42%** | **+42%** | **+75%** | **+75%** | **+42%** | **+10%** | **+55%** |
| differential | 0% | 0% | **+20%** | 0% | 0% | **+75%** | **+43%** | **+75%** |
| ema | **+75%** | **+32%** | **+42%** | **+75%** | **+55%** | **+42%** | **+17%** | **+13%** |

### ollama

**bare** — best: `identity × global_residual` (75%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |
| gaussian | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |
| causal | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |
| uniform | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |
| differential | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |
| ema | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** | **75%** |

**described** — best: `gaussian × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 80% | 67% | 25% | 25% | 67% | 67% | 67% |
| gaussian | 80% | 25% | 25% | 25% | 25% | 67% | 67% | **100%** |
| causal | 25% | 67% | 25% | 25% | 25% | 67% | 67% | 67% |
| uniform | 80% | 80% | 67% | 25% | 25% | 67% | 67% | **100%** |
| differential | 75% | 80% | **100%** | 75% | 25% | **100%** | 75% | **100%** |
| ema | 80% | 80% | 67% | 25% | 67% | 67% | 80% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+5%** | **+5%** | -8% | -50% | -50% | -8% | -8% | -8% |
| gaussian | **+5%** | -50% | -50% | -50% | -50% | -8% | -8% | **+25%** |
| causal | -50% | -8% | -50% | -50% | -50% | -8% | -8% | -8% |
| uniform | **+5%** | **+5%** | -8% | -50% | -50% | -8% | -8% | **+25%** |
| differential | 0% | **+5%** | **+25%** | 0% | -50% | **+25%** | 0% | **+25%** |
| ema | **+5%** | **+5%** | -8% | -50% | -8% | -8% | **+5%** | **+25%** |

### openai

**bare** — best: `gaussian × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 25% | 25% | 25% | 25% | 25% | 25% | 25% | 75% |
| gaussian | 25% | 25% | 25% | 25% | 25% | 25% | **100%** | 25% |
| causal | 25% | 25% | 25% | 25% | 25% | 25% | **100%** | 25% |
| uniform | 25% | 25% | 25% | 25% | 25% | 25% | **100%** | 25% |
| differential | 25% | 25% | 25% | 25% | 0% | 67% | 25% | 25% |
| ema | 25% | 25% | 25% | 25% | 25% | 25% | 75% | 25% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 80% | 67% | **100%** | **100%** | 67% | 57% | 67% |
| gaussian | **100%** | 67% | 67% | **100%** | **100%** | 67% | 67% | 67% |
| causal | **100%** | 80% | 67% | **100%** | **100%** | 67% | 67% | 67% |
| uniform | **100%** | 80% | 67% | **100%** | **100%** | 67% | 80% | 67% |
| differential | 25% | 80% | 80% | 25% | 0% | 80% | 75% | 80% |
| ema | **100%** | 57% | 67% | **100%** | 80% | 67% | 80% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+75%** | **+55%** | **+42%** | **+75%** | **+75%** | **+42%** | **+32%** | -8% |
| gaussian | **+75%** | **+42%** | **+42%** | **+75%** | **+75%** | **+42%** | -33% | **+42%** |
| causal | **+75%** | **+55%** | **+42%** | **+75%** | **+75%** | **+42%** | -33% | **+42%** |
| uniform | **+75%** | **+55%** | **+42%** | **+75%** | **+75%** | **+42%** | -20% | **+42%** |
| differential | 0% | **+55%** | **+55%** | 0% | 0% | **+13%** | **+50%** | **+55%** |
| ema | **+75%** | **+32%** | **+42%** | **+75%** | **+55%** | **+42%** | **+5%** | **+42%** |

## fma_only

### gemini

**bare** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 83% | 20% | 20% | 20% | 63% | 83% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |
| uniform | 20% | 20% | 83% | 20% | 20% | 20% | 63% | 83% |
| differential | 83% | 83% | **100%** | 83% | 0% | 20% | 57% | **100%** |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 71% | 80% | 50% | 71% | 63% | 71% |
| gaussian | 80% | 83% | 71% | 80% | 50% | 20% | 63% | 63% |
| causal | 67% | 83% | 71% | 80% | 50% | 71% | 63% | 63% |
| uniform | 80% | 83% | 71% | 80% | 50% | 71% | 63% | 63% |
| differential | 57% | 83% | **100%** | 57% | 0% | **100%** | 71% | **100%** |
| ema | 80% | 71% | 71% | 67% | 67% | 71% | 63% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | -29% | -12% | **+60%** | **+30%** | **+51%** | 0% | -12% |
| gaussian | **+60%** | **+63%** | **+51%** | **+60%** | **+30%** | 0% | 0% | -21% |
| causal | **+47%** | **+63%** | **+51%** | **+60%** | **+30%** | **+51%** | 0% | -21% |
| uniform | **+60%** | **+63%** | -12% | **+60%** | **+30%** | **+51%** | 0% | -21% |
| differential | -26% | 0% | 0% | -26% | 0% | **+80%** | **+14%** | 0% |
| ema | **+60%** | **+51%** | **+51%** | **+47%** | **+47%** | **+51%** | 0% | 0% |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 60% | **100%** | 60% | 0% | **100%** | 60% | 60% |
| ema | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 71% | 20% | 20% | 83% | 83% | 71% |
| gaussian | 20% | **100%** | 83% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 83% | 71% | 83% |
| uniform | 20% | 83% | 71% | 20% | 20% | 83% | 71% | 71% |
| differential | 83% | **100%** | **100%** | 83% | 0% | **100%** | 67% | **100%** |
| ema | 20% | **100%** | 71% | 20% | 71% | 83% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+40%** | **+11%** | -40% | -40% | **+23%** | **+23%** | **+11%** |
| gaussian | -40% | **+40%** | **+23%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | -40% | -40% | **+23%** | **+11%** | **+23%** |
| uniform | -40% | **+23%** | **+11%** | -40% | -40% | **+23%** | **+11%** | **+11%** |
| differential | **+23%** | **+40%** | 0% | **+23%** | 0% | 0% | **+7%** | **+40%** |
| ema | -40% | **+40%** | **+11%** | -40% | **+11%** | **+23%** | **+23%** | **+11%** |

### openai

**bare** — best: `gaussian × amplitude_sort` (67%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 60% | 20% | 60% | 50% | 20% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | **67%** | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 60% | **67%** | 20% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | **67%** | 20% |
| differential | 20% | 60% | 60% | 20% | 0% | 60% | 20% | 60% |
| ema | 20% | 20% | 20% | 20% | 20% | 60% | 50% | 20% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 83% | 83% | 83% | 20% | 83% | 71% | 83% |
| gaussian | 67% | 83% | 83% | 83% | 20% | 20% | 83% | 83% |
| causal | 83% | 83% | 83% | 83% | 20% | 83% | 83% | 83% |
| uniform | 83% | 83% | 83% | 83% | 20% | 83% | 83% | 83% |
| differential | 83% | 83% | **100%** | 83% | 0% | **100%** | 71% | **100%** |
| ema | 67% | 83% | 83% | 83% | **100%** | 83% | 71% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+47%** | **+63%** | **+63%** | **+23%** | 0% | **+23%** | **+21%** | **+63%** |
| gaussian | **+47%** | **+63%** | **+63%** | **+63%** | 0% | 0% | **+17%** | **+63%** |
| causal | **+63%** | **+63%** | **+63%** | **+63%** | 0% | **+23%** | **+17%** | **+63%** |
| uniform | **+63%** | **+63%** | **+63%** | **+63%** | 0% | **+63%** | **+17%** | **+63%** |
| differential | **+63%** | **+23%** | **+40%** | **+63%** | 0% | **+40%** | **+51%** | **+40%** |
| ema | **+47%** | **+63%** | **+63%** | **+63%** | **+80%** | **+23%** | **+21%** | **+63%** |

## fma_rcp

### gemini

**bare** — best: `differential × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | 71% | 17% | 17% | 86% | 75% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 75% | 86% |
| causal | 17% | 17% | 17% | 17% | 17% | 86% | 75% | 86% |
| uniform | 17% | 17% | 71% | 17% | 17% | 17% | 75% | 71% |
| differential | **100%** | **100%** | **100%** | **100%** | 0% | 17% | 75% | **100%** |
| ema | 17% | 17% | 17% | 17% | 17% | 86% | 75% | 86% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 86% | 75% | 67% | 63% | 75% | 86% | 86% |
| gaussian | 67% | 71% | 63% | 67% | 63% | 17% | 75% | 86% |
| causal | 57% | 86% | 75% | 67% | 63% | 75% | 75% | 75% |
| uniform | 67% | 71% | 75% | 67% | 63% | 75% | 75% | 86% |
| differential | 71% | 67% | **100%** | 71% | 0% | **100%** | 67% | **100%** |
| ema | 67% | 75% | 75% | 57% | 63% | 75% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | **+14%** | **+4%** | **+50%** | **+46%** | -11% | **+11%** | **+69%** |
| gaussian | **+50%** | **+55%** | **+46%** | **+50%** | **+46%** | 0% | 0% | 0% |
| causal | **+40%** | **+69%** | **+58%** | **+50%** | **+46%** | -11% | 0% | -11% |
| uniform | **+50%** | **+55%** | **+4%** | **+50%** | **+46%** | **+58%** | 0% | **+14%** |
| differential | -29% | -33% | 0% | -29% | 0% | **+83%** | -8% | 0% |
| ema | **+50%** | **+58%** | **+58%** | **+40%** | **+46%** | -11% | **+11%** | 0% |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| differential | 50% | 50% | **100%** | 50% | 0% | **100%** | 50% | 50% |
| ema | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 67% | 86% | 17% | 17% | 86% | 71% | 75% |
| gaussian | 17% | 83% | 67% | 17% | 17% | 17% | 86% | 86% |
| causal | 17% | 86% | 86% | 17% | 17% | 86% | 86% | 67% |
| uniform | 17% | 83% | 67% | 17% | 17% | 86% | 86% | 86% |
| differential | 71% | 83% | **100%** | 71% | 0% | **100%** | 83% | **100%** |
| ema | 17% | **100%** | 75% | 17% | 86% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+17%** | **+36%** | -33% | -33% | **+36%** | **+21%** | **+25%** |
| gaussian | -33% | **+33%** | **+17%** | -33% | -33% | -33% | **+36%** | **+36%** |
| causal | -33% | **+36%** | **+36%** | -33% | -33% | **+36%** | **+36%** | **+17%** |
| uniform | -33% | **+33%** | **+17%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| differential | **+21%** | **+33%** | 0% | **+21%** | 0% | 0% | **+33%** | **+50%** |
| ema | -33% | **+50%** | **+25%** | -33% | **+36%** | **+36%** | **+36%** | **+36%** |

### openai

**bare** — best: `differential × amplitude_sort` (83%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 50% | 50% | 75% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| differential | 17% | 50% | 50% | 17% | 0% | 50% | **83%** | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 50% | 63% | 17% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | **100%** | **100%** | **100%** | 17% | **100%** | 86% | **100%** |
| gaussian | **100%** | **100%** | **100%** | **100%** | 17% | 17% | 86% | **100%** |
| causal | **100%** | **100%** | **100%** | **100%** | 17% | **100%** | **100%** | **100%** |
| uniform | **100%** | **100%** | **100%** | **100%** | 17% | **100%** | 86% | **100%** |
| differential | 71% | **100%** | **100%** | 71% | 0% | **100%** | 86% | **100%** |
| ema | 67% | **100%** | **100%** | **100%** | **100%** | **100%** | 86% | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+83%** | **+83%** | **+83%** | 0% | **+83%** | **+36%** | **+83%** |
| gaussian | **+83%** | **+83%** | **+83%** | **+83%** | 0% | 0% | **+36%** | **+83%** |
| causal | **+83%** | **+83%** | **+83%** | **+83%** | 0% | **+50%** | **+50%** | **+25%** |
| uniform | **+83%** | **+83%** | **+83%** | **+83%** | 0% | **+83%** | **+36%** | **+83%** |
| differential | **+55%** | **+50%** | **+50%** | **+55%** | 0% | **+50%** | **+2%** | **+50%** |
| ema | **+50%** | **+83%** | **+83%** | **+83%** | **+83%** | **+50%** | **+23%** | **+83%** |

## mul_fma

### gemini

**bare** — best: `differential × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 83% | 71% | 17% | 17% | 17% | 75% | 86% |
| gaussian | 17% | 17% | 86% | 17% | 17% | 17% | 75% | 86% |
| causal | 17% | 17% | 86% | 17% | 17% | 17% | 75% | 86% |
| uniform | 17% | 17% | 71% | 17% | 17% | 17% | 75% | 86% |
| differential | 71% | 63% | 86% | 71% | 0% | 17% | 75% | **100%** |
| ema | 17% | **100%** | 86% | 17% | 17% | 17% | 75% | 86% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 86% | 86% | 86% | 86% | 63% | 86% | 86% | 75% |
| gaussian | 86% | 71% | 86% | 86% | 63% | 17% | 75% | 75% |
| causal | 57% | 86% | 86% | 57% | 63% | 86% | 75% | 75% |
| uniform | 86% | 86% | 86% | 86% | 63% | 86% | 75% | 75% |
| differential | 71% | 86% | **100%** | 71% | 0% | **100%** | 86% | **100%** |
| ema | 86% | 86% | 86% | 86% | 63% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+69%** | **+2%** | **+14%** | **+69%** | **+46%** | **+69%** | **+11%** | -11% |
| gaussian | **+69%** | **+55%** | 0% | **+69%** | **+46%** | 0% | 0% | -11% |
| causal | **+40%** | **+69%** | 0% | **+40%** | **+46%** | **+69%** | 0% | -11% |
| uniform | **+69%** | **+69%** | **+14%** | **+69%** | **+46%** | **+69%** | 0% | -11% |
| differential | 0% | **+23%** | **+14%** | 0% | 0% | **+83%** | **+11%** | 0% |
| ema | **+69%** | -14% | 0% | **+69%** | **+46%** | **+69%** | **+11%** | 0% |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |
| differential | 50% | 50% | **100%** | 50% | 0% | **100%** | 50% | 50% |
| ema | 50% | 50% | 50% | 50% | 50% | 50% | 50% | 50% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | **100%** | 67% | 17% | 17% | **100%** | 71% | 86% |
| gaussian | 17% | **100%** | **100%** | 17% | 17% | 17% | 86% | 86% |
| causal | 17% | **100%** | **100%** | 17% | 17% | **100%** | 86% | 67% |
| uniform | 17% | **100%** | **100%** | 17% | 17% | **100%** | 86% | 86% |
| differential | **100%** | 83% | **100%** | **100%** | 0% | **100%** | 57% | **100%** |
| ema | 17% | **100%** | 67% | 17% | 86% | **100%** | 86% | 67% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+50%** | **+17%** | -33% | -33% | **+50%** | **+21%** | **+36%** |
| gaussian | -33% | **+50%** | **+50%** | -33% | -33% | -33% | **+36%** | **+36%** |
| causal | -33% | **+50%** | **+50%** | -33% | -33% | **+50%** | **+36%** | **+17%** |
| uniform | -33% | **+50%** | **+50%** | -33% | -33% | **+50%** | **+36%** | **+36%** |
| differential | **+50%** | **+33%** | 0% | **+50%** | 0% | 0% | **+7%** | **+50%** |
| ema | -33% | **+50%** | **+17%** | -33% | **+36%** | **+50%** | **+36%** | **+17%** |

### openai

**bare** — best: `ema × amplitude_sort` (75%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 50% | 50% | 17% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 50% | 17% |
| differential | 17% | 50% | 50% | 17% | 0% | 50% | 57% | 50% |
| ema | 17% | 17% | 17% | 17% | 17% | 50% | **75%** | 17% |

**described** — best: `differential × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 83% | 86% | 71% | 71% | 17% | 86% | 86% | 86% |
| gaussian | 83% | 71% | 86% | 67% | 17% | 17% | 86% | 86% |
| causal | 71% | 86% | 86% | 71% | 17% | 86% | 86% | 86% |
| uniform | 83% | 71% | 71% | 67% | 17% | 86% | 83% | 86% |
| differential | **100%** | 71% | **100%** | **100%** | 0% | **100%** | 75% | **100%** |
| ema | 57% | 86% | 86% | 57% | 71% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+67%** | **+69%** | **+55%** | **+55%** | 0% | **+69%** | **+36%** | **+69%** |
| gaussian | **+67%** | **+55%** | **+69%** | **+50%** | 0% | 0% | **+36%** | **+69%** |
| causal | **+55%** | **+69%** | **+69%** | **+55%** | 0% | **+36%** | **+36%** | **+69%** |
| uniform | **+67%** | **+55%** | **+55%** | **+50%** | 0% | **+69%** | **+33%** | **+69%** |
| differential | **+83%** | **+21%** | **+50%** | **+83%** | 0% | **+50%** | **+18%** | **+50%** |
| ema | **+40%** | **+69%** | **+69%** | **+40%** | **+55%** | **+36%** | **+11%** | **+69%** |

## mul_only

### gemini

**bare** — best: `differential × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | 83% | 20% | 20% | 20% | 63% | 71% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 71% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 71% |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 71% |
| differential | 57% | 83% | 83% | 57% | 0% | 20% | 83% | **100%** |
| ema | 20% | 20% | 80% | 20% | 20% | 20% | 57% | 71% |

**described** — best: `identity × momentum` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 83% | 83% | **100%** | 71% | 83% | 83% | 71% |
| gaussian | **100%** | 83% | 83% | **100%** | 20% | 20% | 83% | 71% |
| causal | 80% | 83% | 83% | 80% | 71% | 83% | 63% | 71% |
| uniform | **100%** | 83% | 83% | **100%** | 71% | 83% | 83% | 63% |
| differential | 83% | 83% | **100%** | 83% | 0% | **100%** | 80% | **100%** |
| ema | 80% | 71% | 83% | 80% | 67% | 83% | 67% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | 0% | **+80%** | **+51%** | **+63%** | **+21%** | 0% |
| gaussian | **+80%** | **+63%** | **+63%** | **+80%** | 0% | 0% | **+21%** | 0% |
| causal | **+60%** | **+63%** | **+63%** | **+60%** | **+51%** | **+63%** | 0% | 0% |
| uniform | **+80%** | **+63%** | **+63%** | **+80%** | **+51%** | **+63%** | **+21%** | -9% |
| differential | **+26%** | 0% | **+17%** | **+26%** | 0% | **+80%** | -3% | 0% |
| ema | **+60%** | **+51%** | **+3%** | **+60%** | **+47%** | **+63%** | **+10%** | **+12%** |

### ollama

**bare** — best: `differential × arithmetic` (67%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 50% | **67%** | 60% | 60% | **67%** | 60% | 57% |
| ema | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 83% | 80% | 20% | 20% | 83% | **100%** | 71% |
| gaussian | 20% | 83% | 83% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 83% | 71% | 83% |
| uniform | 20% | 83% | 83% | 20% | 20% | 83% | 71% | 80% |
| differential | 60% | 83% | **100%** | 60% | 20% | **100%** | 80% | 83% |
| ema | 20% | 83% | 80% | 20% | 20% | 83% | 71% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+23%** | **+20%** | -40% | -40% | **+23%** | **+40%** | **+11%** |
| gaussian | -40% | **+23%** | **+23%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | -40% | -40% | **+23%** | **+11%** | **+23%** |
| uniform | -40% | **+23%** | **+23%** | -40% | -40% | **+23%** | **+11%** | **+20%** |
| differential | 0% | **+33%** | **+33%** | 0% | -40% | **+33%** | **+20%** | **+26%** |
| ema | -40% | **+23%** | **+20%** | -40% | -40% | **+23%** | **+11%** | **+23%** |

### openai

**bare** — best: `gaussian × amplitude_sort` (71%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 60% | 20% | 20% | 57% | 20% |
| gaussian | 60% | 20% | 20% | 20% | 20% | 20% | **71%** | **71%** |
| causal | 20% | 20% | 20% | 20% | 20% | 60% | 63% | 20% |
| uniform | 60% | 20% | 20% | 20% | 20% | 20% | 57% | **71%** |
| differential | 20% | 20% | 20% | 20% | 0% | 20% | 20% | 20% |
| ema | 20% | 20% | 20% | 60% | 20% | 60% | 60% | 20% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 57% | 83% | 71% | 57% | 80% | 71% | 71% | 71% |
| gaussian | 57% | 71% | 71% | 80% | 80% | 20% | 67% | 71% |
| causal | 57% | 71% | 71% | 57% | 80% | 71% | 57% | 71% |
| uniform | 80% | 83% | 71% | 80% | 80% | 71% | 67% | 71% |
| differential | 83% | 71% | **100%** | 83% | 0% | **100%** | 63% | **100%** |
| ema | 57% | 71% | 71% | 57% | 57% | 71% | 80% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+37%** | **+63%** | **+51%** | -3% | **+60%** | **+51%** | **+14%** | **+51%** |
| gaussian | -3% | **+51%** | **+51%** | **+60%** | **+60%** | 0% | -5% | 0% |
| causal | **+37%** | **+51%** | **+51%** | **+37%** | **+60%** | **+11%** | -5% | **+51%** |
| uniform | **+20%** | **+63%** | **+51%** | **+60%** | **+60%** | **+51%** | **+10%** | 0% |
| differential | **+63%** | **+51%** | **+80%** | **+63%** | 0% | **+80%** | **+43%** | **+80%** |
| ema | **+37%** | **+51%** | **+51%** | -3% | **+37%** | **+11%** | **+20%** | **+51%** |

## mul_rcp

### gemini

**bare** — best: `differential × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 86% | 86% | 17% | 17% | 17% | 86% | 75% |
| gaussian | 17% | 17% | 17% | 17% | 17% | 17% | 75% | 75% |
| causal | 17% | 17% | 17% | 17% | 17% | 17% | 75% | 67% |
| uniform | 17% | 17% | 17% | 17% | 17% | 17% | 75% | 75% |
| differential | 71% | 86% | 86% | 71% | 0% | 17% | 86% | **100%** |
| ema | 17% | 17% | 86% | 17% | 17% | 17% | 75% | 75% |

**described** — best: `gaussian × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 75% | 75% | 67% | 86% | 86% | 75% | 86% |
| gaussian | **100%** | 71% | 86% | 83% | 17% | 17% | 75% | 75% |
| causal | 67% | 86% | 75% | 67% | 86% | 86% | 75% | 75% |
| uniform | 83% | 86% | 75% | 83% | 17% | 86% | 75% | 75% |
| differential | **100%** | 86% | **100%** | **100%** | 0% | **100%** | **100%** | **100%** |
| ema | 67% | 75% | 86% | 67% | 57% | 86% | 63% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | -11% | -11% | **+50%** | **+69%** | **+69%** | -11% | **+11%** |
| gaussian | **+83%** | **+55%** | **+69%** | **+67%** | 0% | 0% | 0% | 0% |
| causal | **+50%** | **+69%** | **+58%** | **+50%** | **+69%** | **+69%** | 0% | **+8%** |
| uniform | **+67%** | **+69%** | **+58%** | **+67%** | 0% | **+69%** | 0% | 0% |
| differential | **+29%** | 0% | **+14%** | **+29%** | 0% | **+83%** | **+14%** | 0% |
| ema | **+50%** | **+58%** | 0% | **+50%** | **+40%** | **+69%** | -12% | 0% |

### ollama

**bare** — best: `identity × global_residual` (50%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |
| gaussian | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |
| causal | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |
| uniform | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |
| differential | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |
| ema | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** | **50%** |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 86% | 67% | 17% | 17% | 86% | 57% | 86% |
| gaussian | 17% | 86% | 86% | 17% | 17% | 17% | 86% | 83% |
| causal | 17% | 86% | 86% | 17% | 17% | 86% | 86% | 86% |
| uniform | 17% | 86% | 86% | 17% | 17% | 86% | 86% | 86% |
| differential | 50% | 71% | **100%** | 50% | 17% | **100%** | 57% | 71% |
| ema | 17% | 86% | 67% | 17% | 17% | 86% | 86% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | **+36%** | **+17%** | -33% | -33% | **+36%** | **+7%** | **+36%** |
| gaussian | -33% | **+36%** | **+36%** | -33% | -33% | -33% | **+36%** | **+33%** |
| causal | -33% | **+36%** | **+36%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| uniform | -33% | **+36%** | **+36%** | -33% | -33% | **+36%** | **+36%** | **+36%** |
| differential | 0% | **+21%** | **+50%** | 0% | -33% | **+50%** | **+7%** | **+21%** |
| ema | -33% | **+36%** | **+17%** | -33% | -33% | **+36%** | **+36%** | **+36%** |

### openai

**bare** — best: `identity × conv_residual` (86%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 17% | 17% | 50% | 17% | 17% | 50% | **86%** |
| gaussian | 17% | 17% | 17% | 50% | 17% | 17% | 50% | 17% |
| causal | 17% | 17% | 17% | 17% | 17% | 50% | 50% | 75% |
| uniform | 17% | 17% | 17% | 50% | 17% | 17% | 50% | 17% |
| differential | 17% | 17% | 17% | 17% | 0% | 17% | 83% | 17% |
| ema | 17% | 17% | 17% | 17% | 17% | 17% | 83% | 75% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 71% | **100%** | 86% | 71% | 67% | 86% | 86% | 86% |
| gaussian | 83% | 83% | 71% | 71% | 67% | 17% | 86% | 86% |
| causal | 71% | **100%** | 86% | 71% | 17% | 86% | 86% | 86% |
| uniform | 83% | **100%** | 71% | 67% | 67% | 86% | 86% | 71% |
| differential | 71% | **100%** | 67% | 71% | 0% | 67% | 86% | **100%** |
| ema | 71% | **100%** | 86% | 71% | 83% | 86% | 71% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+55%** | **+83%** | **+69%** | **+21%** | **+50%** | **+69%** | **+36%** | 0% |
| gaussian | **+67%** | **+67%** | **+55%** | **+21%** | **+50%** | 0% | **+36%** | **+69%** |
| causal | **+55%** | **+83%** | **+69%** | **+55%** | 0% | **+36%** | **+36%** | **+11%** |
| uniform | **+67%** | **+83%** | **+55%** | **+17%** | **+50%** | **+69%** | **+36%** | **+55%** |
| differential | **+55%** | **+83%** | **+50%** | **+55%** | 0% | **+50%** | **+2%** | **+83%** |
| ema | **+55%** | **+83%** | **+69%** | **+55%** | **+67%** | **+69%** | -12% | **+11%** |

## non1to1_fma_source

### gemini

**bare** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 83% | 20% | 20% | 20% | 63% | 83% |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |
| uniform | 20% | 20% | 83% | 20% | 20% | 20% | 63% | 83% |
| differential | 83% | 83% | **100%** | 83% | 0% | 20% | 67% | **100%** |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 83% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 71% | 80% | 20% | 71% | 71% | 71% |
| gaussian | 80% | 83% | 71% | 80% | 20% | 20% | 71% | 71% |
| causal | 80% | 83% | 71% | 67% | 50% | 71% | 63% | 63% |
| uniform | 80% | 83% | 71% | 67% | 20% | 71% | 71% | 71% |
| differential | 57% | 83% | **100%** | 57% | 0% | **100%** | 71% | **100%** |
| ema | 80% | 71% | 71% | 80% | 67% | 71% | **100%** | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | -29% | -12% | **+60%** | 0% | **+51%** | **+9%** | -12% |
| gaussian | **+60%** | **+63%** | **+51%** | **+60%** | 0% | 0% | **+9%** | -12% |
| causal | **+60%** | **+63%** | **+51%** | **+47%** | **+30%** | **+51%** | 0% | -21% |
| uniform | **+60%** | **+63%** | -12% | **+47%** | 0% | **+51%** | **+9%** | -12% |
| differential | -26% | 0% | 0% | -26% | 0% | **+80%** | **+5%** | 0% |
| ema | **+60%** | **+51%** | **+51%** | **+60%** | **+47%** | **+51%** | **+38%** | 0% |

### ollama

**bare** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| gaussian | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| causal | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| uniform | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |
| differential | 60% | 60% | **100%** | 60% | 60% | **100%** | 60% | 60% |
| ema | 60% | 60% | 60% | 60% | 60% | 60% | 60% | 60% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | **100%** | 71% | 20% | 20% | 83% | **100%** | 83% |
| gaussian | 20% | **100%** | 83% | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | 83% | 20% | 20% | 20% | 83% | 71% | 71% |
| uniform | 20% | 83% | 71% | 20% | 20% | 83% | 71% | 83% |
| differential | 60% | **100%** | **100%** | 60% | 20% | **100%** | 67% | **100%** |
| ema | 20% | **100%** | 71% | 20% | 20% | 83% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+40%** | **+11%** | -40% | -40% | **+23%** | **+40%** | **+23%** |
| gaussian | -40% | **+40%** | **+23%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+23%** | -40% | -40% | -40% | **+23%** | **+11%** | **+11%** |
| uniform | -40% | **+23%** | **+11%** | -40% | -40% | **+23%** | **+11%** | **+23%** |
| differential | 0% | **+40%** | 0% | 0% | -40% | 0% | **+7%** | **+40%** |
| ema | -40% | **+40%** | **+11%** | -40% | -40% | **+23%** | **+23%** | **+11%** |

### openai

**bare** — best: `causal × amplitude_sort` (80%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 20% | 20% | 20% | 20% | 60% | 50% | 20% |
| gaussian | 20% | 20% | 20% | 60% | 20% | 20% | 71% | 20% |
| causal | 20% | 20% | 20% | 20% | 20% | 60% | **80%** | 20% |
| uniform | 20% | 20% | 20% | 60% | 20% | 20% | 63% | 20% |
| differential | 20% | 60% | 60% | 20% | 0% | 60% | 20% | 60% |
| ema | 20% | 20% | 20% | 20% | 20% | 60% | 63% | 20% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 67% | 83% | 83% | 83% | 80% | 83% | 67% | 83% |
| gaussian | 67% | 83% | 83% | 83% | 80% | 20% | 71% | 83% |
| causal | 83% | 83% | 83% | 83% | 20% | 83% | 83% | 83% |
| uniform | 67% | 83% | 83% | 83% | 80% | 83% | 71% | 83% |
| differential | 83% | 83% | **100%** | 83% | 0% | **100%** | 71% | **100%** |
| ema | 67% | 71% | 83% | 83% | 83% | 83% | 80% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+47%** | **+63%** | **+63%** | **+63%** | **+60%** | **+23%** | **+17%** | **+63%** |
| gaussian | **+47%** | **+63%** | **+63%** | **+23%** | **+60%** | 0% | 0% | **+63%** |
| causal | **+63%** | **+63%** | **+63%** | **+63%** | 0% | **+23%** | **+3%** | **+63%** |
| uniform | **+47%** | **+63%** | **+63%** | **+23%** | **+60%** | **+63%** | **+9%** | **+63%** |
| differential | **+63%** | **+23%** | **+40%** | **+63%** | 0% | **+40%** | **+51%** | **+40%** |
| ema | **+47%** | **+51%** | **+63%** | **+63%** | **+63%** | **+23%** | **+18%** | **+63%** |

## rcp_only

### gemini

**bare** — best: `identity × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 71% | 83% | 20% | 20% | 83% | 63% | **100%** |
| gaussian | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 71% |
| causal | 20% | 20% | 20% | 20% | 20% | 20% | 63% | **100%** |
| uniform | 20% | 20% | 20% | 20% | 20% | 20% | 63% | 71% |
| differential | 83% | 80% | **100%** | 83% | 0% | **100%** | 60% | 83% |
| ema | 20% | 20% | 20% | 20% | 20% | 20% | 63% | **100%** |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | 71% | 63% | 80% | 20% | 71% | 67% | 71% |
| gaussian | 80% | 63% | 63% | 80% | 20% | 20% | 71% | 83% |
| causal | 80% | 83% | 63% | 80% | 20% | 71% | 63% | 71% |
| uniform | 80% | 83% | 63% | 80% | 20% | 71% | 71% | 83% |
| differential | 20% | 71% | **100%** | 20% | 0% | **100%** | 80% | 83% |
| ema | 80% | 63% | 71% | 80% | 67% | 71% | 83% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+60%** | 0% | -21% | **+60%** | 0% | -12% | **+4%** | -29% |
| gaussian | **+60%** | **+43%** | **+43%** | **+60%** | 0% | 0% | **+9%** | **+12%** |
| causal | **+60%** | **+63%** | **+43%** | **+60%** | 0% | **+51%** | 0% | -29% |
| uniform | **+60%** | **+63%** | **+43%** | **+60%** | 0% | **+51%** | **+9%** | **+12%** |
| differential | -63% | -9% | 0% | -63% | 0% | 0% | **+20%** | 0% |
| ema | **+60%** | **+43%** | **+51%** | **+60%** | **+47%** | **+51%** | **+21%** | -29% |

### ollama

**bare** — best: `identity × global_residual` (60%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |
| gaussian | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |
| causal | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |
| uniform | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |
| differential | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |
| ema | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** | **60%** |

**described** — best: `identity × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 20% | 80% | 71% | 20% | 20% | 71% | **100%** | 71% |
| gaussian | 20% | 83% | **100%** | 20% | 20% | 20% | 71% | 71% |
| causal | 20% | **100%** | 20% | 20% | 20% | 71% | 71% | 71% |
| uniform | 20% | **100%** | 80% | 20% | 20% | 71% | 71% | **100%** |
| differential | 60% | 83% | **100%** | 60% | 20% | **100%** | **100%** | **100%** |
| ema | 20% | 83% | 80% | 20% | 20% | 71% | 71% | 71% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -40% | **+20%** | **+11%** | -40% | -40% | **+11%** | **+40%** | **+11%** |
| gaussian | -40% | **+23%** | **+40%** | -40% | -40% | -40% | **+11%** | **+11%** |
| causal | -40% | **+40%** | -40% | -40% | -40% | **+11%** | **+11%** | **+11%** |
| uniform | -40% | **+40%** | **+20%** | -40% | -40% | **+11%** | **+11%** | **+40%** |
| differential | 0% | **+23%** | **+40%** | 0% | -40% | **+40%** | **+40%** | **+40%** |
| ema | -40% | **+23%** | **+20%** | -40% | -40% | **+11%** | **+11%** | **+11%** |

### openai

**bare** — best: `ema × amplitude_sort` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 60% | 20% | 20% | 60% | 20% | 20% | 60% | 60% |
| gaussian | 60% | 20% | 20% | 60% | 20% | 20% | 60% | 20% |
| causal | 20% | 20% | 20% | 60% | 20% | 20% | 60% | 20% |
| uniform | 60% | 20% | 20% | 60% | 20% | 20% | 60% | 20% |
| differential | 20% | 20% | 20% | 20% | 0% | 20% | 20% | 20% |
| ema | 20% | 20% | 20% | 60% | 20% | 20% | **100%** | 71% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 80% | **100%** | 83% | 80% | **100%** | 83% | 83% | 83% |
| gaussian | 80% | **100%** | 83% | 80% | **100%** | 20% | 71% | 83% |
| causal | 80% | **100%** | 83% | 83% | **100%** | 83% | 83% | **100%** |
| uniform | 80% | **100%** | 83% | 80% | **100%** | 83% | 71% | 83% |
| differential | 20% | 71% | 80% | 20% | 0% | 80% | **100%** | **100%** |
| ema | 80% | **100%** | 83% | 80% | 83% | 83% | 83% | 83% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+20%** | **+80%** | **+63%** | **+20%** | **+80%** | **+63%** | **+23%** | **+23%** |
| gaussian | **+20%** | **+80%** | **+63%** | **+20%** | **+80%** | 0% | **+11%** | **+63%** |
| causal | **+60%** | **+80%** | **+63%** | **+23%** | **+80%** | **+63%** | **+23%** | **+80%** |
| uniform | **+20%** | **+80%** | **+63%** | **+20%** | **+80%** | **+63%** | **+11%** | **+63%** |
| differential | 0% | **+51%** | **+60%** | 0% | 0% | **+60%** | **+80%** | **+80%** |
| ema | **+60%** | **+80%** | **+63%** | **+20%** | **+63%** | **+63%** | -17% | **+12%** |

## reference

### gemini

**bare** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | **100%** | 17% | 17% | 17% | 75% | 86% |
| gaussian | 17% | 17% | **100%** | 17% | 17% | 17% | 75% | 86% |
| causal | 17% | 17% | **100%** | 17% | 17% | 17% | 75% | 86% |
| uniform | 17% | 86% | **100%** | 17% | 17% | 17% | 75% | 86% |
| differential | 50% | 71% | **100%** | 50% | 0% | 17% | 63% | **100%** |
| ema | 17% | 86% | **100%** | 17% | 17% | 17% | 75% | 86% |

**described** — best: `identity × global_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 83% | **100%** | **100%** | 86% | **100%** | 83% | 75% |
| gaussian | **100%** | 83% | **100%** | **100%** | 75% | 17% | 86% | 86% |
| causal | **100%** | **100%** | **100%** | **100%** | 86% | **100%** | 86% | 75% |
| uniform | **100%** | **100%** | **100%** | **100%** | 75% | **100%** | 75% | 75% |
| differential | 71% | 57% | **100%** | 71% | 0% | **100%** | 50% | 86% |
| ema | **100%** | 86% | **100%** | **100%** | 83% | **100%** | 75% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+12%** | 0% | **+83%** | **+69%** | **+83%** | **+8%** | -11% |
| gaussian | **+83%** | **+67%** | 0% | **+83%** | **+58%** | 0% | **+11%** | 0% |
| causal | **+83%** | **+83%** | 0% | **+83%** | **+69%** | **+83%** | **+11%** | -11% |
| uniform | **+83%** | **+14%** | 0% | **+83%** | **+58%** | **+83%** | 0% | -11% |
| differential | **+21%** | -14% | 0% | **+21%** | 0% | **+83%** | -12% | -14% |
| ema | **+83%** | 0% | 0% | **+83%** | **+67%** | **+83%** | 0% | 0% |

### ollama

**bare** — best: `identity × per_token` (71%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **71%** | 63% | 50% | 50% | 67% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| differential | 50% | 63% | 67% | 50% | 50% | 67% | 50% | 50% |
| ema | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | 67% | 17% | 17% | 71% | 57% | 86% |
| gaussian | 17% | 71% | 71% | 17% | 17% | 17% | 63% | 86% |
| causal | 17% | 71% | 71% | 17% | 17% | 71% | 63% | 86% |
| uniform | 17% | 71% | 71% | 17% | 17% | 71% | 63% | 86% |
| differential | 50% | 57% | **100%** | 50% | 17% | **100%** | 83% | 86% |
| ema | 17% | 86% | 67% | 17% | 63% | 86% | 71% | 86% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | 0% | **+4%** | -33% | -33% | **+5%** | **+7%** | **+36%** |
| gaussian | -33% | **+21%** | **+21%** | -33% | -33% | -50% | **+13%** | **+36%** |
| causal | -33% | **+21%** | **+21%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| uniform | -33% | **+21%** | **+21%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| differential | 0% | -5% | **+33%** | 0% | -33% | **+33%** | **+33%** | **+36%** |
| ema | -33% | **+36%** | **+17%** | -33% | **+13%** | **+19%** | **+21%** | **+36%** |

### openai

**bare** — best: `identity × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 50% | 17% | 17% | 50% | **100%** |
| gaussian | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| causal | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 17% |
| uniform | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 86% |
| differential | 17% | 17% | 17% | 17% | 0% | 67% | 57% | 17% |
| ema | 17% | 17% | 17% | 50% | 17% | 17% | 57% | 86% |

**described** — best: `differential × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 86% | 63% | 67% | 67% | 63% | 63% | 75% |
| gaussian | 67% | 50% | 63% | 67% | 67% | 17% | 57% | 63% |
| causal | 50% | 63% | 75% | 57% | 17% | 63% | 75% | 63% |
| uniform | 67% | 63% | 75% | 67% | 67% | 63% | 71% | 63% |
| differential | 71% | 71% | **100%** | 71% | 0% | **100%** | 63% | **100%** |
| ema | 50% | 75% | 75% | 50% | 50% | 75% | 75% | 75% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+36%** | **+13%** | **+17%** | **+50%** | **+46%** | **+13%** | -25% |
| gaussian | **+17%** | **+33%** | **+46%** | **+17%** | **+50%** | 0% | **+7%** | -12% |
| causal | 0% | **+46%** | **+58%** | **+7%** | 0% | **+46%** | **+25%** | **+46%** |
| uniform | **+17%** | **+46%** | **+58%** | **+17%** | **+50%** | **+46%** | **+21%** | -23% |
| differential | **+55%** | **+55%** | **+83%** | **+55%** | 0% | **+33%** | **+5%** | **+83%** |
| ema | **+33%** | **+58%** | **+58%** | 0% | **+33%** | **+58%** | **+18%** | -11% |

## reference_big

### gemini

**bare** — best: `identity × delta_decode` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 63% | 75% | 88% | 63% | 13% | **100%** | **100%** | 88% |
| gaussian | 63% | 13% | 88% | 63% | 13% | 13% | **100%** | 88% |
| causal | 63% | 88% | 88% | 63% | 13% | 13% | **100%** | 88% |
| uniform | 63% | 88% | 88% | 63% | 13% | 13% | **100%** | 88% |
| differential | 75% | 88% | **100%** | 75% | 0% | 13% | 75% | 88% |
| ema | 63% | 13% | 88% | 63% | 13% | **100%** | **100%** | 88% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 88% | 88% | **100%** | 88% | **100%** | **100%** | **100%** | **100%** |
| gaussian | 75% | 75% | 88% | 88% | 13% | 13% | **100%** | **100%** |
| causal | **100%** | **100%** | **100%** | **100%** | 88% | **100%** | **100%** | **100%** |
| uniform | 75% | 75% | 88% | 75% | **100%** | **100%** | 88% | **100%** |
| differential | 75% | 63% | **100%** | 75% | 0% | **100%** | **100%** | **100%** |
| ema | 63% | 88% | 88% | 88% | 63% | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+25%** | **+13%** | **+13%** | **+25%** | **+88%** | 0% | 0% | **+13%** |
| gaussian | **+13%** | **+63%** | 0% | **+25%** | 0% | 0% | 0% | **+13%** |
| causal | **+38%** | **+13%** | **+13%** | **+38%** | **+75%** | **+88%** | 0% | **+13%** |
| uniform | **+13%** | -12% | 0% | **+13%** | **+88%** | **+88%** | -12% | **+13%** |
| differential | 0% | -25% | 0% | 0% | 0% | **+88%** | **+25%** | **+13%** |
| ema | 0% | **+75%** | 0% | **+25%** | **+50%** | 0% | -12% | 0% |

### ollama

**bare** — best: `identity × arithmetic` (88%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | 75% | **88%** | 38% | 38% | 50% | 38% | 38% |
| gaussian | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| causal | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| uniform | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |
| differential | 38% | 75% | 50% | 38% | 38% | 50% | 38% | 75% |
| ema | 38% | 38% | 38% | 38% | 38% | 50% | 38% | 38% |

**described** — best: `identity × arithmetic` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 88% | 75% | **100%** | 88% | 13% | 88% | 75% | **100%** |
| gaussian | 63% | 75% | 75% | 88% | 13% | 13% | 88% | **100%** |
| causal | 13% | 75% | 88% | 13% | 13% | 88% | 88% | 88% |
| uniform | 88% | 88% | 50% | 88% | 13% | 88% | 88% | **100%** |
| differential | 75% | 63% | 75% | 75% | 13% | 88% | 63% | 75% |
| ema | 88% | **100%** | 50% | 88% | 88% | **100%** | 88% | 88% |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+50%** | 0% | **+13%** | **+50%** | -25% | **+38%** | **+38%** | **+63%** |
| gaussian | **+25%** | **+38%** | **+38%** | **+50%** | -25% | -37% | **+50%** | **+63%** |
| causal | -25% | **+38%** | **+50%** | -25% | -25% | **+38%** | **+50%** | **+50%** |
| uniform | **+50%** | **+50%** | **+13%** | **+50%** | -25% | **+38%** | **+50%** | **+63%** |
| differential | **+38%** | -12% | **+25%** | **+38%** | -25% | **+38%** | **+25%** | 0% |
| ema | **+50%** | **+63%** | **+13%** | **+50%** | **+50%** | **+50%** | **+50%** | **+50%** |

### openai

**bare** — best: `gaussian × conv_residual` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 38% | 38% | 38% | 38% | 13% | 13% | 38% | 13% |
| gaussian | 38% | 13% | 13% | 38% | 13% | 13% | 38% | **100%** |
| causal | 38% | 13% | 13% | 38% | 13% | 38% | 38% | **100%** |
| uniform | 38% | 13% | 13% | 38% | 13% | 13% | 38% | 13% |
| differential | 13% | 13% | 13% | 13% | 0% | 13% | 63% | 13% |
| ema | 38% | 13% | 13% | 38% | 13% | 38% | 75% | 88% |

**described** — best: `identity × per_token` (100%)

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 75% | **100%** | 88% | 75% | 50% | 88% | 88% | **100%** |
| gaussian | 75% | 75% | 88% | 75% | 50% | 13% | 88% | 88% |
| causal | 63% | 88% | **100%** | 75% | 13% | 88% | 88% | 88% |
| uniform | 75% | 88% | **100%** | 75% | 50% | 88% | 75% | 88% |
| differential | 75% | 75% | **100%** | 75% | 0% | **100%** | 75% | **100%** |
| ema | 75% | **100%** | **100%** | 75% | 75% | **100%** | **100%** | **100%** |

**bare → described delta**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+38%** | **+63%** | **+50%** | **+38%** | **+38%** | **+75%** | **+50%** | **+88%** |
| gaussian | **+38%** | **+63%** | **+75%** | **+38%** | **+38%** | 0% | **+50%** | -12% |
| causal | **+25%** | **+75%** | **+88%** | **+38%** | 0% | **+50%** | **+50%** | -12% |
| uniform | **+38%** | **+75%** | **+88%** | **+38%** | **+38%** | **+75%** | **+38%** | **+75%** |
| differential | **+63%** | **+63%** | **+88%** | **+63%** | 0% | **+88%** | **+13%** | **+88%** |
| ema | **+38%** | **+88%** | **+88%** | **+38%** | **+63%** | **+63%** | **+25%** | **+13%** |

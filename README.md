# Levitate roundtrip results

**Input:** `examples/reference.ptx`  
**Source ops:** `ld.param.b64 ld.global.b32 ld.param.b64 ld.global.b32 ld.param.b64 add.rn.f32 mul.rn.f32 st.global.b32 ret`  
**Metric:** Jaccard similarity on PTX opcode sets  

## gemini

### bare

> **Best:** `identity × arithmetic` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | **100%** | 17% | 17% | 17% | 75% | 86% |
| gaussian | 17% | 17% | **100%** | 17% | 17% | 17% | 75% | 86% |
| causal | 17% | 17% | **100%** | 17% | 17% | 17% | 75% | 86% |
| uniform | 17% | 86% | **100%** | 17% | 17% | 17% | 75% | 86% |
| differential | 50% | 71% | **100%** | 50% | 0% | 17% | 63% | **100%** |
| ema | 17% | 86% | **100%** | 17% | 17% | 17% | 75% | 86% |

### described

> **Best:** `identity × global_residual` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **100%** | 83% | **100%** | **100%** | 86% | **100%** | 83% | 75% |
| gaussian | **100%** | 83% | **100%** | **100%** | 75% | 17% | 86% | 86% |
| causal | **100%** | **100%** | **100%** | **100%** | 86% | **100%** | 86% | 75% |
| uniform | **100%** | **100%** | **100%** | **100%** | 75% | **100%** | 75% | 75% |
| differential | 71% | 57% | **100%** | 71% | 0% | **100%** | 50% | 86% |
| ema | **100%** | 86% | **100%** | **100%** | 83% | **100%** | 75% | 86% |

### bare → described delta

Positive = described beat bare.

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | **+83%** | **+12%** | 0% | **+83%** | **+69%** | **+83%** | **+8%** | -11% |
| gaussian | **+83%** | **+67%** | 0% | **+83%** | **+58%** | 0% | **+11%** | 0% |
| causal | **+83%** | **+83%** | 0% | **+83%** | **+69%** | **+83%** | **+11%** | -11% |
| uniform | **+83%** | **+14%** | 0% | **+83%** | **+58%** | **+83%** | 0% | -11% |
| differential | **+21%** | -14% | 0% | **+21%** | 0% | **+83%** | -12% | -14% |
| ema | **+83%** | 0% | 0% | **+83%** | **+67%** | **+83%** | 0% | 0% |

## ollama

### bare

> **Best:** `identity × per_token` — **71%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | **71%** | 63% | 50% | 50% | 67% | 50% | 50% |
| gaussian | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| causal | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| uniform | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |
| differential | 50% | 63% | 67% | 50% | 50% | 67% | 50% | 50% |
| ema | 50% | 50% | 50% | 50% | 50% | 67% | 50% | 50% |

### described

> **Best:** `differential × arithmetic` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 17% | 71% | 67% | 17% | 17% | 71% | 57% | 86% |
| gaussian | 17% | 71% | 71% | 17% | 17% | 17% | 63% | 86% |
| causal | 17% | 71% | 71% | 17% | 17% | 71% | 63% | 86% |
| uniform | 17% | 71% | 71% | 17% | 17% | 71% | 63% | 86% |
| differential | 50% | 57% | **100%** | 50% | 17% | **100%** | 83% | 86% |
| ema | 17% | 86% | 67% | 17% | 63% | 86% | 71% | 86% |

### bare → described delta

Positive = described beat bare.

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | -33% | 0% | **+4%** | -33% | -33% | **+5%** | **+7%** | **+36%** |
| gaussian | -33% | **+21%** | **+21%** | -33% | -33% | -50% | **+13%** | **+36%** |
| causal | -33% | **+21%** | **+21%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| uniform | -33% | **+21%** | **+21%** | -33% | -33% | **+5%** | **+13%** | **+36%** |
| differential | 0% | -5% | **+33%** | 0% | -33% | **+33%** | **+33%** | **+36%** |
| ema | -33% | **+36%** | **+17%** | -33% | **+13%** | **+19%** | **+21%** | **+36%** |

## openai

### bare

> **Best:** `identity × conv_residual` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 50% | 50% | 50% | 17% | 17% | 50% | **100%** |
| gaussian | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 75% |
| causal | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 17% |
| uniform | 50% | 17% | 17% | 50% | 17% | 17% | 50% | 86% |
| differential | 17% | 17% | 17% | 17% | 0% | 67% | 57% | 17% |
| ema | 17% | 17% | 17% | 50% | 17% | 17% | 57% | 86% |

### described

> **Best:** `differential × arithmetic` — **100%**

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 50% | 86% | 63% | 67% | 67% | 63% | 63% | 75% |
| gaussian | 67% | 50% | 63% | 67% | 67% | 17% | 57% | 63% |
| causal | 50% | 63% | 75% | 57% | 17% | 63% | 75% | 63% |
| uniform | 67% | 63% | 75% | 67% | 67% | 63% | 71% | 63% |
| differential | 71% | 71% | **100%** | 71% | 0% | **100%** | 63% | **100%** |
| ema | 50% | 75% | 75% | 50% | 50% | 75% | 75% | 75% |

### bare → described delta

Positive = described beat bare.

| conv \ alg | global_residual | per_token | arithmetic | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| identity | 0% | **+36%** | **+13%** | **+17%** | **+50%** | **+46%** | **+13%** | -25% |
| gaussian | **+17%** | **+33%** | **+46%** | **+17%** | **+50%** | 0% | **+7%** | -12% |
| causal | 0% | **+46%** | **+58%** | **+7%** | 0% | **+46%** | **+25%** | **+46%** |
| uniform | **+17%** | **+46%** | **+58%** | **+17%** | **+50%** | **+46%** | **+21%** | -23% |
| differential | **+55%** | **+55%** | **+83%** | **+55%** | 0% | **+33%** | **+5%** | **+83%** |
| ema | **+33%** | **+58%** | **+58%** | 0% | **+33%** | **+58%** | **+18%** | -11% |

## summary

| provider | bare best | described best |
| --- | --- | --- |
| gemini | 100% (`identity × arithmetic`) | 100% (`identity × global_residual`) |
| ollama | 71% (`identity × per_token`) | 100% (`differential × arithmetic`) |
| openai | 100% (`identity × conv_residual`) | 100% (`differential × arithmetic`) |

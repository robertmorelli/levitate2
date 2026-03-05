# Bench results

**Vectors:** `gemini_described`  
**Convolution:** `identity`  
**Iterations:** 50 per kernel  
**Index load:** 40445ms (one-time, not included in algorithm times)  

All times are median wall-clock for a single algorithm call (index already built).

| kernel (tokens) | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| add_fma (11) | 1.99ms | 6.60ms | 10.17ms | 6.07ms | 2.30ms | 2.10ms | 5.58ms | 7.09ms | 5.10ms |
| add_fma_rcp (12) | 2.21ms | 7.41ms | 11.26ms | 6.82ms | 2.64ms | 2.35ms | 6.54ms | 7.70ms | 5.61ms |
| add_mul_rcp (12) | 2.18ms | 7.38ms | 11.24ms | 6.75ms | 2.61ms | 2.35ms | 6.59ms | 7.72ms | 5.60ms |
| add_only (8) | 1.46ms | 4.89ms | 7.45ms | 4.51ms | 1.73ms | 1.55ms | 4.34ms | 5.12ms | 3.65ms |
| add_rcp (9) | 1.63ms | 5.56ms | 8.39ms | 5.04ms | 1.95ms | 1.76ms | 5.41ms | 5.73ms | 4.13ms |
| all_ops (13) | 2.36ms | 8.00ms | 11.86ms | 7.30ms | 2.85ms | 2.53ms | 7.58ms | 8.32ms | 6.06ms |
| copy (5) | 902µs | 3.06ms | 4.54ms | 2.80ms | 1.10ms | 972µs | 3.20ms | 3.23ms | 2.23ms |
| fma_only (10) | 1.79ms | 6.14ms | 9.13ms | 5.59ms | 2.18ms | 1.93ms | 4.41ms | 6.41ms | 4.66ms |
| fma_rcp (11) | 1.99ms | 6.66ms | 10.06ms | 6.24ms | 2.42ms | 2.11ms | 5.47ms | 7.06ms | 5.10ms |
| mul_fma (11) | 2.00ms | 6.68ms | 10.08ms | 6.15ms | 2.41ms | 2.13ms | 5.48ms | 7.04ms | 5.14ms |
| mul_only (8) | 1.44ms | 4.97ms | 7.54ms | 4.57ms | 1.77ms | 1.55ms | 4.33ms | 5.15ms | 3.69ms |
| mul_rcp (9) | 1.62ms | 5.41ms | 8.53ms | 4.98ms | 1.96ms | 1.74ms | 5.50ms | 5.81ms | 4.14ms |
| non1to1_fma_source (8) | 1.45ms | 4.85ms | 7.50ms | 4.42ms | 1.73ms | 1.54ms | 4.39ms | 5.14ms | 3.70ms |
| rcp_only (6) | 1.08ms | 3.65ms | 5.62ms | 3.33ms | 1.31ms | 1.16ms | 4.35ms | 3.84ms | 2.72ms |
| reference (9) | 1.64ms | 5.46ms | 8.45ms | 4.96ms | 1.96ms | 1.75ms | 5.50ms | 5.79ms | 4.15ms |
| reference_big (11) | 2.02ms | 6.68ms | 10.38ms | 6.07ms | 2.43ms | 2.14ms | 7.60ms | 7.09ms | 5.09ms |

## aggregate

| stat | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **median** | **1.78ms** | **5.97ms** | **9.01ms** | **5.51ms** | **2.13ms** | **1.90ms** | **5.43ms** | **6.24ms** | **4.45ms** |
| p95 | 2.36ms | 7.89ms | 11.80ms | 7.24ms | 2.89ms | 2.50ms | 7.64ms | 8.25ms | 5.99ms |

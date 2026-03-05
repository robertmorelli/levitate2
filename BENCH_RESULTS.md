# Bench results

**Vectors:** `gemini_described`  
**Convolution:** `identity`  
**Iterations:** 1 per kernel  
**Nearest Metric:** `l2`  
**Index load:** 32373ms (one-time, not included in algorithm times)  

All times are median wall-clock for a single algorithm call (index already built).

| kernel (tokens) | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| add_fma (11) | 2.70ms | 6.23ms | 10.05ms | 6.54ms | 3.04ms | 2.07ms | 5.42ms | 9.13ms | 9.46ms | 28.54ms | 39.76ms | 18.86ms |
| add_fma_rcp (12) | 2.12ms | 7.04ms | 11.40ms | 6.91ms | 3.51ms | 2.36ms | 7.00ms | 7.89ms | 5.74ms | 29.64ms | 44.22ms | 18.58ms |
| add_mul_rcp (12) | 2.12ms | 7.09ms | 11.28ms | 6.50ms | 2.63ms | 2.31ms | 6.42ms | 7.61ms | 5.85ms | 29.87ms | 44.01ms | 20.95ms |
| add_only (8) | 1.51ms | 5.80ms | 7.59ms | 4.39ms | 1.86ms | 1.54ms | 4.53ms | 5.24ms | 4.43ms | 18.68ms | 27.48ms | 12.55ms |
| add_rcp (9) | 1.90ms | 6.61ms | 8.23ms | 4.91ms | 2.10ms | 1.69ms | 5.68ms | 6.53ms | 4.14ms | 20.87ms | 32.02ms | 12.65ms |
| all_ops (13) | 2.36ms | 7.92ms | 12.25ms | 7.71ms | 3.02ms | 2.95ms | 7.41ms | 8.95ms | 6.37ms | 33.50ms | 51.89ms | 19.27ms |
| complex_kernel (30) | 6.04ms | 18.22ms | 28.28ms | 16.47ms | 6.44ms | 5.85ms | 16.95ms | 19.62ms | 14.52ms | 85.47ms | 137.04ms | 37.48ms |
| copy (5) | 876µs | 3.11ms | 4.82ms | 2.85ms | 1.05ms | 1.04ms | 3.20ms | 3.10ms | 2.34ms | 8.71ms | 13.15ms | 6.23ms |
| fma_only (10) | 1.76ms | 6.70ms | 9.74ms | 5.98ms | 2.17ms | 2.05ms | 4.65ms | 6.83ms | 4.88ms | 24.17ms | 34.90ms | 12.91ms |
| fma_rcp (11) | 1.99ms | 7.25ms | 10.38ms | 6.35ms | 2.35ms | 2.17ms | 5.60ms | 6.95ms | 5.10ms | 26.26ms | 39.07ms | 17.98ms |
| medium_blend (18) | 3.14ms | 10.79ms | 16.19ms | 10.01ms | 4.09ms | 3.59ms | 13.52ms | 11.40ms | 8.70ms | 46.86ms | 73.83ms | 24.94ms |
| medium_int_mix (15) | 2.97ms | 8.89ms | 14.05ms | 8.30ms | 3.42ms | 2.82ms | 8.24ms | 9.44ms | 7.30ms | 38.97ms | 59.98ms | 19.06ms |
| medium_loop_mix (22) | 3.86ms | 14.03ms | 20.26ms | 12.04ms | 4.86ms | 4.23ms | 16.12ms | 13.91ms | 10.42ms | 58.96ms | 93.91ms | 31.18ms |
| mul_fma (11) | 2.12ms | 6.64ms | 9.87ms | 6.18ms | 2.41ms | 2.17ms | 5.62ms | 7.43ms | 5.22ms | 26.70ms | 42.36ms | 18.54ms |
| mul_only (8) | 1.40ms | 5.39ms | 7.50ms | 4.83ms | 1.76ms | 1.68ms | 4.29ms | 5.09ms | 3.76ms | 17.62ms | 28.35ms | 12.46ms |
| mul_rcp (9) | 1.60ms | 5.56ms | 8.15ms | 4.96ms | 1.89ms | 1.68ms | 5.24ms | 6.08ms | 4.66ms | 20.98ms | 33.43ms | 12.53ms |
| non1to1_fma_source (8) | 1.39ms | 4.98ms | 7.22ms | 4.23ms | 1.79ms | 1.81ms | 4.32ms | 4.90ms | 3.61ms | 17.99ms | 28.47ms | 12.34ms |
| rcp_only (6) | 1.10ms | 3.71ms | 5.43ms | 3.29ms | 1.28ms | 1.20ms | 4.31ms | 3.90ms | 2.75ms | 11.98ms | 19.07ms | 12.73ms |
| reference (9) | 1.61ms | 5.30ms | 8.10ms | 5.01ms | 2.04ms | 1.68ms | 5.25ms | 5.62ms | 4.18ms | 21.33ms | 32.23ms | 12.28ms |
| reference_big (11) | 1.97ms | 6.69ms | 10.21ms | 6.37ms | 2.39ms | 2.05ms | 8.11ms | 7.16ms | 4.95ms | 27.76ms | 42.94ms | 18.96ms |

## aggregate

| stat | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **median** | **1.99ms** | **6.69ms** | **10.05ms** | **6.35ms** | **2.39ms** | **2.07ms** | **5.62ms** | **7.16ms** | **5.10ms** | **26.70ms** | **39.76ms** | **18.54ms** |
| p95 | 6.04ms | 18.22ms | 28.28ms | 16.47ms | 6.44ms | 5.85ms | 16.95ms | 19.62ms | 14.52ms | 85.47ms | 137.04ms | 37.48ms |

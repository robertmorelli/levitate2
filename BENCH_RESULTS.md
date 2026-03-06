# Bench results

**Vectors:** `gemini_described`  
**Convolution:** `identity`  
**Iterations:** 1000 per kernel  
**Nearest Metric:** `cosine`  
**Index load:** 6196610ms (one-time, not included in algorithm times)  

All times are median wall-clock for a single algorithm call (index already built).

| kernel (tokens) | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| add_fma (11) | 3.49ms | 10.87ms | 14.58ms | 9.13ms | 3.74ms | 3.56ms | 16.02ms | 11.14ms | 7.04ms | 28.94ms | 85.64ms | 25.46ms |
| add_fma_rcp (12) | 3.89ms | 12.22ms | 13.27ms | 10.18ms | 4.34ms | 4.00ms | 13.28ms | 12.63ms | 8.85ms | 29.84ms | 90.03ms | 20.01ms |
| add_mul_rcp (12) | 3.73ms | 11.14ms | 12.57ms | 8.09ms | 4.15ms | 3.86ms | 12.85ms | 12.27ms | 8.60ms | 29.14ms | 89.67ms | 19.99ms |
| add_only (8) | 2.48ms | 7.41ms | 8.33ms | 5.36ms | 2.75ms | 2.58ms | 8.57ms | 8.17ms | 5.81ms | 18.70ms | 56.35ms | 13.39ms |
| add_rcp (9) | 2.84ms | 8.50ms | 9.54ms | 6.12ms | 3.15ms | 2.94ms | 9.74ms | 9.31ms | 6.51ms | 21.24ms | 64.78ms | 13.40ms |
| all_ops (13) | 4.10ms | 12.25ms | 13.85ms | 8.91ms | 4.56ms | 4.34ms | 14.19ms | 13.51ms | 9.46ms | 32.52ms | 101.37ms | 20.18ms |
| complex_kernel (62) | 19.40ms | 58.30ms | 65.90ms | 42.33ms | 21.73ms | 21.02ms | 57.64ms | 64.34ms | 46.12ms | 172.41ms | 548.99ms | 86.67ms |
| copy (5) | 1.55ms | 4.96ms | 6.53ms | 4.05ms | 1.73ms | 1.62ms | 5.35ms | 5.10ms | 3.50ms | 9.08ms | 29.12ms | 6.58ms |
| fma_only (10) | 3.11ms | 9.37ms | 10.51ms | 6.82ms | 3.45ms | 3.22ms | 10.78ms | 10.23ms | 7.17ms | 23.07ms | 73.14ms | 13.35ms |
| fma_rcp (11) | 3.43ms | 10.28ms | 11.51ms | 7.40ms | 3.80ms | 3.55ms | 11.88ms | 11.32ms | 7.93ms | 26.70ms | 84.93ms | 19.97ms |
| medium_blend (36) | 11.30ms | 33.64ms | 37.92ms | 24.25ms | 12.48ms | 11.60ms | 33.40ms | 36.90ms | 26.28ms | 100.37ms | 317.81ms | 53.16ms |
| medium_int_mix (33) | 10.33ms | 30.72ms | 35.80ms | 23.04ms | 11.92ms | 10.75ms | 30.24ms | 33.89ms | 24.14ms | 86.96ms | 274.70ms | 46.54ms |
| medium_loop_mix (41) | 12.75ms | 38.42ms | 42.94ms | 27.48ms | 14.14ms | 13.34ms | 37.72ms | 41.85ms | 29.93ms | 111.08ms | 355.35ms | 60.54ms |
| mul_fma (11) | 3.44ms | 10.43ms | 11.73ms | 7.63ms | 3.88ms | 3.57ms | 11.98ms | 11.33ms | 7.98ms | 26.89ms | 85.76ms | 20.05ms |
| mul_only (8) | 2.52ms | 7.53ms | 8.47ms | 5.41ms | 2.80ms | 2.60ms | 8.69ms | 8.28ms | 5.82ms | 17.76ms | 55.91ms | 13.52ms |
| mul_rcp (9) | 2.84ms | 8.49ms | 9.56ms | 6.09ms | 3.15ms | 2.91ms | 9.74ms | 9.25ms | 6.53ms | 20.88ms | 66.27ms | 13.46ms |
| non1to1_fma_source (8) | 2.52ms | 7.56ms | 8.51ms | 5.47ms | 2.80ms | 2.62ms | 6.54ms | 8.28ms | 5.77ms | 18.12ms | 57.10ms | 13.44ms |
| rcp_only (6) | 1.90ms | 5.66ms | 6.33ms | 4.08ms | 2.11ms | 1.96ms | 6.54ms | 6.21ms | 4.30ms | 12.51ms | 39.61ms | 13.21ms |
| reference (9) | 2.86ms | 8.50ms | 9.52ms | 6.12ms | 3.15ms | 2.94ms | 9.78ms | 9.30ms | 6.50ms | 21.35ms | 67.63ms | 13.50ms |
| reference_big (11) | 3.47ms | 10.37ms | 11.60ms | 7.46ms | 3.81ms | 3.57ms | 9.78ms | 11.33ms | 7.95ms | 26.86ms | 85.50ms | 19.82ms |

## aggregate

| stat | global_residual | per_token | arithmetic | arithmetic_opt | momentum | dominant_prefix | delta_decode | amplitude_sort | conv_residual | dynamic_stack_healing | dynamic_stack_healing_v2 | arithmetic_stack_block_healing |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **median** | **3.42ms** | **10.28ms** | **11.53ms** | **7.43ms** | **3.77ms** | **3.53ms** | **11.69ms** | **11.17ms** | **7.82ms** | **26.66ms** | **84.81ms** | **19.79ms** |
| p95 | 19.16ms | 57.37ms | 65.26ms | 41.75ms | 21.30ms | 20.69ms | 56.74ms | 63.14ms | 45.51ms | 169.39ms | 541.09ms | 85.20ms |

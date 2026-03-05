extern "C" __global__ void medium_loop_mix(
  const float* a,
  const float* b,
  const int* c,
  float* out,
  int n
) {
  int idx = blockIdx.x * blockDim.x + threadIdx.x;
  if (idx >= n) return;

  float x = a[idx];
  float y = b[idx];
  int k = c[idx] & 3;
  float acc = 0.0f;

  #pragma unroll 1
  for (int i = 0; i < 3; i++) {
    float fi = (float)(i + k);
    float t = fmaf(x, fi, y);
    float u = 1.0f / (fabsf(t) + 1.0f);
    acc += t * u;
  }

  out[idx] = acc + y;
}

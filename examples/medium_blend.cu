extern "C" __global__ void medium_blend(
  const float* a,
  const float* b,
  float* out,
  int n
) {
  int idx = blockIdx.x * blockDim.x + threadIdx.x;
  if (idx >= n) return;

  float x = a[idx];
  float y = b[idx];
  float s = x + y;
  float d = x - y;
  float p = x * y;
  float r = 1.0f / (fabsf(d) + 1.0f);
  float q = sqrtf(fabsf(p) + 0.25f);
  float v = fmaf(s, r, q);
  out[idx] = fminf(v, 5.0f) - fmaxf(y, -2.0f);
}

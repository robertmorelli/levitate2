extern "C" __global__ void complex_kernel(
  const float* a,
  const float* b,
  const int* c,
  float* out_f,
  int* out_i,
  int n
) {
  int idx = blockIdx.x * blockDim.x + threadIdx.x;
  if (idx >= n) return;

  float x = a[idx];
  float y = b[idx];
  int z = c[idx];
  float acc = 0.0f;

  #pragma unroll 1
  for (int k = 0; k < 4; k++) {
    float kf = (float)k;
    float t = fmaf(x + kf * 0.25f, y - kf * 0.5f, acc);
    float inv = 1.0f / (fabsf(t) + 1.0f);
    float s = sqrtf(fabsf(t) + 0.1f);
    float clamp_min = fminf(s, 2.0f);
    float clamp_max = fmaxf(y, -3.0f);
    acc = acc + (t * inv) + clamp_min - clamp_max;

    z = (z ^ (k + 1)) + ((z & 7) << 1);
    if ((z & 1) == 0) acc += 0.25f;
    else              acc -= 0.125f;
  }

  out_f[idx] = acc;
  out_i[idx] = z + (int)acc;
}

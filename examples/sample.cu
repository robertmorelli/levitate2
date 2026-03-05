extern "C" __global__ void kernel(const float* a, const float* b, float* out) {
  int i = blockIdx.x * blockDim.x + threadIdx.x;
  float x = a[i];
  float y = b[i];
  out[i] = (x + y) * y;
}

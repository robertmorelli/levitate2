extern "C" __global__ void medium_int_mix(
  const int* in0,
  const int* in1,
  int* out,
  int n
) {
  int idx = blockIdx.x * blockDim.x + threadIdx.x;
  if (idx >= n) return;

  int a = in0[idx];
  int b = in1[idx];
  int x = (a ^ b) + ((a & 31) << 2);
  int y = (b | 7) - (a & 3);
  int z = x + y;
  if ((z & 1) == 0) z = z + 11;
  else              z = z - 5;
  out[idx] = z;
}

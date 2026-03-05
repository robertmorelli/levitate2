declare float @llvm.fma.f32(float, float, float)

define void @reference_big(ptr addrspace(1) %in0, ptr addrspace(1) %in1, ptr addrspace(1) %out) {
entry:
  %1 = load float, ptr addrspace(1) %in0, align 4
  %2 = load float, ptr addrspace(1) %in1, align 4
  %3 = load float, ptr addrspace(1) %in0, align 4
  %4 = fadd float %3, %2
  %5 = fmul float %4, %2
  %6 = call float @llvm.fma.f32(float %5, float %2, float %2)
  %7 = fdiv float 1.000000e+00, %6
  store float %7, ptr addrspace(1) %out, align 4
  ret void
}

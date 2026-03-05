declare float @llvm.fma.f32(float, float, float)

define void @candidate(ptr addrspace(1) %in0, ptr addrspace(1) %in1, ptr addrspace(1) %out) {
entry:
  %1 = load float, ptr addrspace(1) %in0, align 4
  %2 = load float, ptr addrspace(1) %in1, align 4
  %3 = load float, ptr addrspace(1) %in0, align 4
  %4 = load float, ptr addrspace(1) %in0, align 4
  %5 = fadd float %4, %2
  %6 = fmul float %5, %2
  %7 = call float @llvm.fma.f32(float %6, float %2, float %2)
  %8 = fdiv float 1.000000e+00, %7
  store float %8, ptr addrspace(1) %out, align 4
  ret void
}

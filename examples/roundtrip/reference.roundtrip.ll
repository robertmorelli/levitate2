declare float @llvm.fma.f32(float, float, float)

define void @candidate(ptr addrspace(1) %in0, ptr addrspace(1) %in1, ptr addrspace(1) %out) {
entry:
  %1 = load float, ptr addrspace(1) %in0, align 4
  %2 = load float, ptr addrspace(1) %in1, align 4
  %3 = load float, ptr addrspace(1) %in0, align 4
  %4 = load float, ptr addrspace(1) %in0, align 4
  %5 = fadd float %4, %2
  %6 = fmul float %5, %2
  store float %6, ptr addrspace(1) %out, align 4
  ret void
}

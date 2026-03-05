declare float @llvm.fma.f32(float, float, float)

define void @reference(ptr addrspace(1) %in0, ptr addrspace(1) %in1, ptr addrspace(1) %out) {
entry:
  %1 = load float, ptr addrspace(1) %in0, align 4
  %2 = load float, ptr addrspace(1) %in1, align 4
  %3 = fadd float %1, %2
  %4 = fmul float %3, %2
  store float %4, ptr addrspace(1) %out, align 4
  ret void
}

declare float @llvm.fma.f32(float, float, float)

define void @candidate(ptr addrspace(1) %p0, ptr addrspace(1) %p1, ptr addrspace(1) %p2) {
entry:
  %1 = load float, ptr addrspace(1) %p0, align 4
  %2 = load float, ptr addrspace(1) %p1, align 4
  %3 = fadd float %1, %2
  %4 = fmul float %3, %2
  store float %4, ptr addrspace(1) %p2, align 4
  ret void
}

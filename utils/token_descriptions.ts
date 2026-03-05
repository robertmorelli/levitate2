/**
 * Human-readable descriptions for each PTX and LLVM IR token in the vocab.
 * These are fed to embedding models — richer descriptions produce better
 * cross-space alignment between PTX and LLVM IR instruction vectors.
 */

export const PTX_DESCRIPTIONS: Record<string, string> = {
  "add.f32":        "PTX add.f32: add two 32-bit single-precision floating-point registers and write result to destination register",
  "mul.f32":        "PTX mul.f32: multiply two 32-bit single-precision floating-point registers and write product to destination register",
  "fma.rn.f32":     "PTX fma.rn.f32: fused multiply-add of three single-precision floats with round-to-nearest, computes d = a*b + c in a single operation",
  "rcp.approx.f32": "PTX rcp.approx.f32: approximate reciprocal of a 32-bit float, computes 1/a with reduced precision",
  "ld.global.f32":  "PTX ld.global.f32: load a 32-bit float from global GPU memory address into a register",
  "st.global.f32":  "PTX st.global.f32: store a 32-bit float register value to a global GPU memory address",
  "ret":            "PTX ret: return from the current function or kernel, end of execution",
};

export const LLVM_DESCRIPTIONS: Record<string, string> = {
  "fadd_float":              "LLVM IR fadd float: floating-point addition of two f32 values, produces f32 result, IEEE 754 semantics",
  "fmul_float":              "LLVM IR fmul float: floating-point multiplication of two f32 values, produces f32 result, IEEE 754 semantics",
  "fma_float":               "LLVM IR call llvm.fma.f32: fused multiply-add intrinsic for f32, computes a*b+c without intermediate rounding",
  "fdiv_float_recip":        "LLVM IR fdiv float: floating-point division producing reciprocal 1.0/x for f32, used to implement approximate reciprocal",
  "load_float_addrspace1":   "LLVM IR load float addrspace(1): load a 32-bit float from GPU global memory address space 1",
  "store_float_addrspace1":  "LLVM IR store float addrspace(1): store a 32-bit float value to GPU global memory address space 1",
  "ret_void":                "LLVM IR ret void: return from function with no return value, terminates the function",
};

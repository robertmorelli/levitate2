/**
 * Human-readable descriptions for each PTX and LLVM IR token in the vocab.
 * These are fed to embedding models — richer descriptions produce better
 * cross-space alignment between PTX and LLVM IR instruction vectors.
 */

export const PTX_DESCRIPTIONS: Record<string, string> = {
  "add.f32":        "PTX add.f32: add two 32-bit single-precision floating-point registers and write result to destination register",
  "sub.f32":        "PTX sub.f32: subtract one 32-bit single-precision floating-point register from another",
  "mul.f32":        "PTX mul.f32: multiply two 32-bit single-precision floating-point registers and write product to destination register",
  "fma.rn.f32":     "PTX fma.rn.f32: fused multiply-add of three single-precision floats with round-to-nearest, computes d = a*b + c in a single operation",
  "rcp.approx.f32": "PTX rcp.approx.f32: approximate reciprocal of a 32-bit float, computes 1/a with reduced precision",
  "div.rn.f32":     "PTX div.rn.f32: floating-point division of two 32-bit floats with round-to-nearest",
  "sqrt.rn.f32":    "PTX sqrt.rn.f32: square-root of a 32-bit float with round-to-nearest",
  "abs.f32":        "PTX abs.f32: absolute value of a 32-bit float",
  "neg.f32":        "PTX neg.f32: negate a 32-bit float value",
  "min.f32":        "PTX min.f32: minimum of two 32-bit floating-point values",
  "max.f32":        "PTX max.f32: maximum of two 32-bit floating-point values",
  "setp.eq.f32":    "PTX setp.eq.f32: set predicate if two 32-bit floats are equal",
  "setp.lt.f32":    "PTX setp.lt.f32: set predicate if one 32-bit float is less than another",
  "setp.gt.f32":    "PTX setp.gt.f32: set predicate if one 32-bit float is greater than another",
  "selp.f32":       "PTX selp.f32: predicate-controlled selection between two 32-bit float values",
  "mov.f32":        "PTX mov.f32: move/copy a 32-bit float value between registers",

  "add.s32":        "PTX add.s32: add two signed 32-bit integers",
  "sub.s32":        "PTX sub.s32: subtract one signed 32-bit integer from another",
  "mul.lo.s32":     "PTX mul.lo.s32: low 32 bits of signed integer multiplication",
  "and.b32":        "PTX and.b32: bitwise and on 32-bit values",
  "or.b32":         "PTX or.b32: bitwise or on 32-bit values",
  "xor.b32":        "PTX xor.b32: bitwise xor on 32-bit values",
  "shl.b32":        "PTX shl.b32: logical left shift of a 32-bit value",
  "shr.u32":        "PTX shr.u32: logical right shift of an unsigned 32-bit value",
  "mov.s32":        "PTX mov.s32: move/copy a signed 32-bit integer value between registers",

  "cvt.rzi.s32.f32":"PTX cvt.rzi.s32.f32: convert 32-bit float to signed 32-bit integer by truncation toward zero",
  "cvt.rn.f32.s32": "PTX cvt.rn.f32.s32: convert signed 32-bit integer to 32-bit float with round-to-nearest",

  "ld.global.f32":  "PTX ld.global.f32: load a 32-bit float from global GPU memory address into a register",
  "st.global.f32":  "PTX st.global.f32: store a 32-bit float register value to a global GPU memory address",
  "ld.global.s32":  "PTX ld.global.s32: load a signed 32-bit integer from global GPU memory address into a register",
  "st.global.s32":  "PTX st.global.s32: store a signed 32-bit integer register value to a global GPU memory address",
  "bra":            "PTX bra: unconditional branch to a label",
  "ret":            "PTX ret: return from the current function or kernel, end of execution",
};

export const LLVM_DESCRIPTIONS: Record<string, string> = {
  "fadd_float":              "LLVM IR fadd float: floating-point addition of two f32 values, produces f32 result, IEEE 754 semantics",
  "fsub_float":              "LLVM IR fsub float: floating-point subtraction of two f32 values",
  "fmul_float":              "LLVM IR fmul float: floating-point multiplication of two f32 values, produces f32 result, IEEE 754 semantics",
  "fma_float":               "LLVM IR call llvm.fma.f32: fused multiply-add intrinsic for f32, computes a*b+c without intermediate rounding",
  "fdiv_float_recip":        "LLVM IR fdiv float: floating-point division producing reciprocal 1.0/x for f32, used to implement approximate reciprocal",
  "fdiv_float":              "LLVM IR fdiv float: floating-point division of one f32 by another",
  "fsqrt_float":             "LLVM IR call llvm.sqrt.f32: square-root intrinsic for f32",
  "fabs_float":              "LLVM IR call llvm.fabs.f32: absolute value intrinsic for f32",
  "fneg_float":              "LLVM IR fneg float: negate an f32 value",
  "fmin_float":              "LLVM IR call llvm.minnum.f32: floating-point minimum of two f32 values",
  "fmax_float":              "LLVM IR call llvm.maxnum.f32: floating-point maximum of two f32 values",
  "fcmp_oeq_float":          "LLVM IR fcmp oeq float: ordered equality comparison of two f32 values producing i1",
  "fcmp_olt_float":          "LLVM IR fcmp olt float: ordered less-than comparison of two f32 values producing i1",
  "fcmp_ogt_float":          "LLVM IR fcmp ogt float: ordered greater-than comparison of two f32 values producing i1",
  "select_float":            "LLVM IR select i1, float, float: choose between two f32 values by predicate",
  "mov_float":               "LLVM IR value forwarding: represent float register move via trivial float op",

  "add_i32":                 "LLVM IR add i32: integer addition of signed 32-bit values",
  "sub_i32":                 "LLVM IR sub i32: integer subtraction of signed 32-bit values",
  "mul_i32":                 "LLVM IR mul i32: integer multiplication of signed 32-bit values",
  "and_i32":                 "LLVM IR and i32: bitwise and on 32-bit integers",
  "or_i32":                  "LLVM IR or i32: bitwise or on 32-bit integers",
  "xor_i32":                 "LLVM IR xor i32: bitwise xor on 32-bit integers",
  "shl_i32":                 "LLVM IR shl i32: logical left shift of a 32-bit integer",
  "lshr_i32":                "LLVM IR lshr i32: logical right shift of a 32-bit integer",
  "mov_i32":                 "LLVM IR value forwarding: represent integer register move via trivial integer op",
  "fptosi_f32_to_i32":       "LLVM IR fptosi: convert f32 to signed i32 by truncation toward zero",
  "sitofp_i32_to_f32":       "LLVM IR sitofp: convert signed i32 to f32",

  "load_float_addrspace1":   "LLVM IR load float addrspace(1): load a 32-bit float from GPU global memory address space 1",
  "store_float_addrspace1":  "LLVM IR store float addrspace(1): store a 32-bit float value to GPU global memory address space 1",
  "load_i32_addrspace1":     "LLVM IR load i32 addrspace(1): load a signed 32-bit integer from GPU global memory address space 1",
  "store_i32_addrspace1":    "LLVM IR store i32 addrspace(1): store a signed 32-bit integer value to GPU global memory address space 1",
  "br_uncond":               "LLVM IR br label: unconditional branch to a basic block label",
  "ret_void":                "LLVM IR ret void: return from function with no return value, terminates the function",
};

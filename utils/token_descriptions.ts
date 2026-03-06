/**
 * Human-readable descriptions for each PTX and LLVM IR token in the vocab.
 * These are fed to embedding models; richer coverage helps larger kernels.
 */

export const PTX_DESCRIPTIONS: Record<string, string> = {
  // Float arithmetic
  "add.f32":        "PTX add.f32: add two f32 registers",
  "add.rn.f32":     "PTX add.rn.f32: add two f32 registers with explicit round to nearest mode",
  "sub.f32":        "PTX sub.f32: subtract two f32 registers",
  "mul.f32":        "PTX mul.f32: multiply two f32 registers",
  "mul.rn.f32":     "PTX mul.rn.f32: multiply two f32 registers with explicit round to nearest mode",
  "fma.rn.f32":     "PTX fma.rn.f32: fused multiply add on f32 with round to nearest",
  "div.rn.f32":     "PTX div.rn.f32: divide one f32 by another",
  "rcp.rn.f32":     "PTX rcp.rn.f32: reciprocal of f32 value",
  "rcp.approx.f32": "PTX rcp.approx.f32: approximate reciprocal of f32 value",
  "sqrt.rn.f32":    "PTX sqrt.rn.f32: square root of f32",
  "abs.f32":        "PTX abs.f32: absolute value of f32",
  "neg.f32":        "PTX neg.f32: negate f32",
  "min.f32":        "PTX min.f32: minimum of two f32 values",
  "max.f32":        "PTX max.f32: maximum of two f32 values",
  "mov.f32":        "PTX mov.f32: move f32 register value",

  // Integer arithmetic and bit ops
  "add.s32":        "PTX add.s32: add two signed 32 bit integers",
  "sub.s32":        "PTX sub.s32: subtract signed 32 bit integers",
  "mul.lo.s32":     "PTX mul.lo.s32: lower 32 bits of signed multiplication",
  "mad.lo.s32":     "PTX mad.lo.s32: integer multiply add low 32 bits",
  "mul.wide.s32":   "PTX mul.wide.s32: widen 32 bit multiply into 64 bit result",
  "add.s64":        "PTX add.s64: add two signed 64 bit integers",
  "shl.b32":        "PTX shl.b32: logical left shift 32 bit",
  "shl.b64":        "PTX shl.b64: logical left shift 64 bit",
  "shr.u32":        "PTX shr.u32: logical right shift 32 bit unsigned",
  "and.b32":        "PTX and.b32: bitwise and 32 bit",
  "or.b32":         "PTX or.b32: bitwise or 32 bit",
  "xor.b32":        "PTX xor.b32: bitwise xor 32 bit",
  "mov.s32":        "PTX mov.s32: move signed 32 bit register value",
  "mov.u32":        "PTX mov.u32: move unsigned 32 bit register value",

  // Predicate and control
  "selp.b32":       "PTX selp.b32: select 32 bit integer value by predicate register",
  "setp.eq.b32":    "PTX setp.eq.b32: predicate set if 32 bit values are equal",
  "setp.ne.s32":    "PTX setp.ne.s32: predicate set if signed 32 bit values are not equal",
  "setp.ge.s32":    "PTX setp.ge.s32: predicate set if signed 32 bit greater or equal",
  "setp.eq.f32":    "PTX setp.eq.f32: predicate set if f32 values are equal",
  "setp.lt.f32":    "PTX setp.lt.f32: predicate set if left f32 is less than right",
  "setp.gt.f32":    "PTX setp.gt.f32: predicate set if left f32 is greater than right",
  "selp.f32":       "PTX selp.f32: select f32 by predicate",
  "bra":            "PTX bra: branch to label",
  "ret":            "PTX ret: return from kernel or function",

  // Conversions
  "cvt.rzi.s32.f32":"PTX cvt.rzi.s32.f32: convert f32 to signed i32 truncating toward zero",
  "cvt.rn.f32.s32": "PTX cvt.rn.f32.s32: convert signed i32 to f32 with round to nearest",
  "cvt.s64.s32":    "PTX cvt.s64.s32: sign extend i32 to i64",
  "cvt.u64.u32":    "PTX cvt.u64.u32: zero extend u32 to u64",

  // Memory and addressing
  "ld.param.u64":       "PTX ld.param.u64: load 64 bit unsigned pointer argument from kernel parameter space",
  "ld.param.b64":       "PTX ld.param.b64: load 64 bit raw bits pointer argument from kernel parameter space",
  "ld.param.u32":       "PTX ld.param.u32: load 32 bit unsigned integer argument from kernel parameter space",
  "cvta.to.global.u64": "PTX cvta.to.global.u64: convert generic address to global memory space pointer",
  "ld.global.f32":      "PTX ld.global.f32: load f32 from global memory",
  "st.global.f32":      "PTX st.global.f32: store f32 to global memory",
  "ld.global.s32":      "PTX ld.global.s32: load signed i32 from global memory",
  "ld.global.u32":      "PTX ld.global.u32: load unsigned i32 from global memory",
  "ld.global.b32":      "PTX ld.global.b32: load 32 bit value as raw bits from global memory",
  "st.global.s32":      "PTX st.global.s32: store signed i32 to global memory",
  "st.global.u32":      "PTX st.global.u32: store unsigned i32 to global memory",
  "st.global.b32":      "PTX st.global.b32: store 32 bit value as raw bits to global memory",
  "ld.shared.b32":      "PTX ld.shared.b32: load 32 bit value from shared memory",
  "st.shared.b32":      "PTX st.shared.b32: store 32 bit value to shared memory",
  "bar.sync":           "PTX bar.sync: synchronize threads in a thread block",
};

export const LLVM_DESCRIPTIONS: Record<string, string> = {
  // Float arithmetic and comparisons
  "fadd_float":       "LLVM IR fadd float: add two f32 values",
  "fsub_float":       "LLVM IR fsub float: subtract two f32 values",
  "fmul_float":       "LLVM IR fmul float: multiply two f32 values",
  "fma_float":        "LLVM IR call llvm.fma.f32: fused multiply add for f32",
  "fdiv_float":       "LLVM IR fdiv float: divide one f32 by another",
  "fdiv_float_recip": "LLVM IR fdiv float: reciprocal style divide 1.0 by x",
  "fsqrt_float":      "LLVM IR call llvm.sqrt.f32: square root intrinsic",
  "fabs_float":       "LLVM IR call llvm.fabs.f32: absolute value intrinsic",
  "fneg_float":       "LLVM IR fneg float: negate f32",
  "fmin_float":       "LLVM IR call llvm.minnum.f32: floating min",
  "fmax_float":       "LLVM IR call llvm.maxnum.f32: floating max",
  "fcmp_oeq_float":   "LLVM IR fcmp oeq float: ordered equal compare to i1",
  "fcmp_olt_float":   "LLVM IR fcmp olt float: ordered less-than compare to i1",
  "fcmp_ogt_float":   "LLVM IR fcmp ogt float: ordered greater-than compare to i1",
  "fcmp_one_float":   "LLVM IR fcmp one float: ordered not-equal compare to i1",
  "select_float":     "LLVM IR select i1 float float: choose one float by predicate",
  "mov_float":        "LLVM IR float move represented by zero-add copy",

  // Integer arithmetic and bit ops
  "add_i32":      "LLVM IR add i32: integer add",
  "sub_i32":      "LLVM IR sub i32: integer subtract",
  "mul_i32":      "LLVM IR mul i32: integer multiply",
  "mul_i64":      "LLVM IR mul i64: widened integer multiply",
  "add_i64":      "LLVM IR add i64: 64 bit integer add",
  "and_i32":      "LLVM IR and i32: bitwise and",
  "or_i32":       "LLVM IR or i32: bitwise or",
  "xor_i32":      "LLVM IR xor i32: bitwise xor",
  "shl_i32":      "LLVM IR shl i32: shift left",
  "shl_i64":      "LLVM IR shl i64: shift left 64 bit",
  "lshr_i32":     "LLVM IR lshr i32: logical shift right",
  "ashr_i32":     "LLVM IR ashr i32: arithmetic shift right",
  "mov_i32":      "LLVM IR integer move represented by add zero copy",
  "icmp_eq_i32":  "LLVM IR icmp eq i32: equality compare",
  "icmp_ne_i32":  "LLVM IR icmp ne i32: inequality compare",
  "icmp_sge_i32": "LLVM IR icmp sge i32: signed greater-or-equal compare",
  "select_i32":   "LLVM IR select i1 i32 i32: choose integer by predicate",

  // Casts and pointer conversion
  "fptosi_f32_to_i32": "LLVM IR fptosi: f32 to i32",
  "sitofp_i32_to_f32": "LLVM IR sitofp: i32 to f32",
  "sext_i32_to_i64":   "LLVM IR sext i32 to i64: sign extension",
  "zext_i32_to_i64":   "LLVM IR zext i32 to i64: zero extension",
  "ptrtoint_p1_to_i64":"LLVM IR ptrtoint addrspace(1) pointer to i64 integer",
  "inttoptr_i64_to_p1":"LLVM IR inttoptr i64 to addrspace(1) pointer",

  // Kernel parameter access (scalar args)
  "load_i32_param":         "LLVM IR i32 scalar kernel argument: 32 bit integer passed by value in kernel parameter space",
  "load_i64_param":         "LLVM IR i64 scalar kernel argument: 64 bit integer or pointer passed by value in kernel parameter space",

  // Memory and GEP
  "load_float_addrspace1":  "LLVM IR load float addrspace(1): load f32 global",
  "store_float_addrspace1": "LLVM IR store float addrspace(1): store f32 global",
  "load_i32_addrspace1":    "LLVM IR load i32 addrspace(1): load i32 global",
  "store_i32_addrspace1":   "LLVM IR store i32 addrspace(1): store i32 global",
  "load_i64_addrspace1":    "LLVM IR load i64 addrspace(1): load i64 global",
  "store_i64_addrspace1":   "LLVM IR store i64 addrspace(1): store i64 global",
  "gep_float_idx_i32":      "LLVM IR getelementptr float with i32 index",
  "gep_i32_idx_i32":        "LLVM IR getelementptr i32 with i32 index",

  // Control flow
  "br_uncond":    "LLVM IR br label: unconditional branch",
  "br_cond_i1":   "LLVM IR br i1: conditional branch",
  "phi_float":    "LLVM IR phi float: loop-carried float value",
  "phi_i32":      "LLVM IR phi i32: loop-carried integer value",
  "ret_void":     "LLVM IR ret void: return from function",
};

// ---------------------------------------------------------------------------
// Shared operand tokens — same description on both PTX and LLVM sides so the
// embedding model maps them to the same point and lift algorithms pass them
// through unchanged.
// ---------------------------------------------------------------------------

function ordinal(n: number): string {
  const s = ["th","st","nd","rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]!);
}

export const REGISTER_DESCRIPTIONS: Record<string, string> = {};

// f0–f31: 32-bit float virtual registers
for (let i = 0; i < 32; i++)
  REGISTER_DESCRIPTIONS[`f${i}`] = `virtual f32 register number ${i}, the ${ordinal(i+1)} float register in PTX/LLVM scope`;

// r0–r31: 32-bit integer virtual registers
for (let i = 0; i < 32; i++)
  REGISTER_DESCRIPTIONS[`r${i}`] = `virtual i32 register number ${i}, the ${ordinal(i+1)} 32-bit integer register in PTX/LLVM scope`;

// rd0–rd31: 64-bit integer / pointer virtual registers
for (let i = 0; i < 32; i++)
  REGISTER_DESCRIPTIONS[`rd${i}`] = `virtual i64 register number ${i}, the ${ordinal(i+1)} 64-bit integer or pointer register in PTX/LLVM scope`;

// p0–p15: predicate (i1) virtual registers
for (let i = 0; i < 16; i++)
  REGISTER_DESCRIPTIONS[`p${i}`] = `virtual predicate register number ${i}, the ${ordinal(i+1)} i1 boolean condition register in PTX/LLVM scope`;

// mem_rd0–mem_rd31: memory addresses held in 64-bit registers
for (let i = 0; i < 32; i++)
  REGISTER_DESCRIPTIONS[`mem_rd${i}`] = `memory address held in 64-bit register rd${i}, used as a global memory pointer operand`;

// imm: structural marker for an immediate constant in an instruction
REGISTER_DESCRIPTIONS["imm"] = "an immediate constant value embedded directly in a PTX or LLVM IR instruction operand";

// op_label: branch target label
REGISTER_DESCRIPTIONS["op_label"] = "a branch target label operand in a PTX or LLVM IR instruction";

// op_reg: generic or special-purpose register not covered by f/r/rd/p families
REGISTER_DESCRIPTIONS["op_reg"] = "a generic or special-purpose register operand not classified as float, int, pointer, or predicate";

// Merge shared tokens into both vocabs so the refresh script embeds them on
// both sides with identical descriptions → identical embedding vectors.
Object.assign(PTX_DESCRIPTIONS,  REGISTER_DESCRIPTIONS);
Object.assign(LLVM_DESCRIPTIONS, REGISTER_DESCRIPTIONS);

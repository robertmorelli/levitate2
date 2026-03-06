/**
 * Assemble a sequence of LLVM token names (as returned by lift()) into a
 * minimal but valid LLVM IR module that llc can compile to PTX.
 *
 * Token names match the keys in utils/llvm_vectors.json.
 *
 * This is the original stack-machine emitter. See tokens_to_ll_v2 for the
 * register-table emitter that uses named register tokens (f0, r3, rd1, p0,
 * mem_rd0, imm) from the new token stream format.
 */
export function tokens_to_ll(tokens: string[]): string {
  const ONE_F  = "1.000000e+00";

  const float_ptr_ops = tokens.filter((t) => t === "load_float_addrspace1" || t === "store_float_addrspace1").length;
  const int_ptr_ops = tokens.filter((t) => t === "load_i32_addrspace1" || t === "store_i32_addrspace1").length;
  const i64_ptr_ops = tokens.filter((t) => t === "load_i64_addrspace1" || t === "store_i64_addrspace1").length;
  const i32_param_ops = tokens.filter((t) => t === "load_i32_param").length;
  const i64_param_ops = tokens.filter((t) => t === "load_i64_param").length;
  const numFPtrs = Math.max(3, float_ptr_ops);
  const numIPtrs = Math.max(3, int_ptr_ops);
  const numI64Ptrs = Math.max(2, i64_ptr_ops);
  const numI32Params = Math.max(1, i32_param_ops);
  const numI64Params = Math.max(4, i64_param_ops);
  const fParams = Array.from({ length: numFPtrs }, (_, i) => `float addrspace(1)* %pf${i}`);
  const iParams = Array.from({ length: numIPtrs }, (_, i) => `i32 addrspace(1)* %pi${i}`);
  const i64Params = Array.from({ length: numI64Ptrs }, (_, i) => `i64 addrspace(1)* %p64${i}`);
  const i32ScalarParams = Array.from({ length: numI32Params }, (_, i) => `i32 %ki${i}`);
  const i64ScalarParams = Array.from({ length: numI64Params }, (_, i) => `i64 %kl${i}`);
  const params = [...fParams, ...iParams, ...i64Params, ...i32ScalarParams, ...i64ScalarParams].join(", ");

  let counter = 0;
  const nextReg = (): string => `%v${counter++}`;

  // Pools of available SSA names by type.
  const floats: string[] = [];
  const ints: string[] = [];
  const i64s: string[] = [];
  const preds: string[] = [];
  const fPtrs: string[] = Array.from({ length: numFPtrs }, (_, i) => `%pf${i}`);
  const iPtrs: string[] = Array.from({ length: numIPtrs }, (_, i) => `%pi${i}`);
  const i64Ptrs: string[] = Array.from({ length: numI64Ptrs }, (_, i) => `%p64${i}`);
  const i32Scalars: string[] = Array.from({ length: numI32Params }, (_, i) => `%ki${i}`);
  const i64Scalars: string[] = Array.from({ length: numI64Params }, (_, i) => `%kl${i}`);

  // Emit a freeze undef of the given type — prevents constant folding while
  // keeping the IR valid. Used as fallback when a typed stack is empty.
  const freeze = (type: string): string => {
    const reg = nextReg();
    body.push(`  ${reg} = freeze ${type} undef`);
    return reg;
  };

  const popFloat = (): string => floats.pop() ?? freeze("float");
  const popInt   = (): string => ints.pop()   ?? freeze("i32");
  const popI64   = (): string => i64s.pop()   ?? freeze("i64");
  const popPred  = (): string => preds.pop()  ?? freeze("i1");
  const popFPtr  = (): string => fPtrs.pop()  ?? "%pf0";
  const popIPtr  = (): string => iPtrs.pop()  ?? "%pi0";
  const popI64Ptr = (): string => i64Ptrs.pop() ?? "%p640";

  const body: string[] = [];
  let hasRet = false;
  const needsFma = tokens.includes("fma_float");
  const needsSqrt = tokens.includes("fsqrt_float");
  const needsFabs = tokens.includes("fabs_float");
  const needsFMin = tokens.includes("fmin_float");
  const needsFMax = tokens.includes("fmax_float");

  for (const tok of tokens) {
    switch (tok) {
      case "load_float_addrspace1": {
        const reg = nextReg();
        body.push(`  ${reg} = load float, float addrspace(1)* ${popFPtr()}`);
        floats.push(reg);
        break;
      }
      case "store_float_addrspace1": {
        body.push(`  store float ${popFloat()}, float addrspace(1)* ${popFPtr()}`);
        break;
      }
      case "load_i32_addrspace1": {
        const reg = nextReg();
        body.push(`  ${reg} = load i32, i32 addrspace(1)* ${popIPtr()}`);
        ints.push(reg);
        break;
      }
      case "store_i32_addrspace1": {
        body.push(`  store i32 ${popInt()}, i32 addrspace(1)* ${popIPtr()}`);
        break;
      }
      case "load_i64_addrspace1": {
        const reg = nextReg();
        body.push(`  ${reg} = load i64, i64 addrspace(1)* ${popI64Ptr()}`);
        i64s.push(reg);
        break;
      }
      case "store_i64_addrspace1": {
        body.push(`  store i64 ${popI64()}, i64 addrspace(1)* ${popI64Ptr()}`);
        break;
      }
      case "fadd_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fadd float ${a}, ${b}`);
        floats.push(reg);
        break;
      }
      case "fsub_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fsub float ${a}, ${b}`);
        floats.push(reg);
        break;
      }
      case "fmul_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fmul float ${a}, ${b}`);
        floats.push(reg);
        break;
      }
      case "fma_float": {
        const c = popFloat(), b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = call float @llvm.fma.f32(float ${a}, float ${b}, float ${c})`);
        floats.push(reg);
        break;
      }
      case "fdiv_float_recip": {
        const reg = nextReg();
        body.push(`  ${reg} = fdiv float ${ONE_F}, ${popFloat()}`);
        floats.push(reg);
        break;
      }
      case "fdiv_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fdiv float ${a}, ${b}`);
        floats.push(reg);
        break;
      }
      case "fsqrt_float": {
        const reg = nextReg();
        body.push(`  ${reg} = call float @llvm.sqrt.f32(float ${popFloat()})`);
        floats.push(reg);
        break;
      }
      case "fabs_float": {
        const reg = nextReg();
        body.push(`  ${reg} = call float @llvm.fabs.f32(float ${popFloat()})`);
        floats.push(reg);
        break;
      }
      case "fneg_float": {
        const reg = nextReg();
        body.push(`  ${reg} = fneg float ${popFloat()}`);
        floats.push(reg);
        break;
      }
      case "fmin_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = call float @llvm.minnum.f32(float ${a}, float ${b})`);
        floats.push(reg);
        break;
      }
      case "fmax_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = call float @llvm.maxnum.f32(float ${a}, float ${b})`);
        floats.push(reg);
        break;
      }
      case "fcmp_oeq_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fcmp oeq float ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "fcmp_one_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fcmp one float ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "fcmp_olt_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fcmp olt float ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "fcmp_ogt_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fcmp ogt float ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "select_float": {
        const f = popFloat(), t = popFloat(), c = popPred();
        const reg = nextReg();
        body.push(`  ${reg} = select i1 ${c}, float ${t}, float ${f}`);
        floats.push(reg);
        break;
      }
      case "mov_float": {
        const reg = nextReg();
        body.push(`  ${reg} = fadd float ${popFloat()}, 0.000000e+00`);
        floats.push(reg);
        break;
      }

      case "load_i32_param": {
        // Consume a scalar i32 kernel argument (becomes ld.param.u32 in PTX)
        ints.push(i32Scalars.pop() ?? freeze("i32"));
        break;
      }
      case "load_i64_param": {
        // Consume a scalar i64 kernel argument (becomes ld.param.u64/b64 in PTX)
        i64s.push(i64Scalars.pop() ?? freeze("i64"));
        break;
      }

      case "add_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = add i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "sub_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = sub i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "mul_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = mul i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "and_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = and i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "or_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = or i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "xor_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = xor i32 ${a}, ${b}`);
        ints.push(reg);
        break;
      }
      case "shl_i32": {
        const shift = popInt(), value = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = shl i32 ${value}, ${shift}`);
        ints.push(reg);
        break;
      }
      case "lshr_i32": {
        const shift = popInt(), value = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = lshr i32 ${value}, ${shift}`);
        ints.push(reg);
        break;
      }
      case "mov_i32": {
        const reg = nextReg();
        body.push(`  ${reg} = add i32 ${popInt()}, 0`);
        ints.push(reg);
        break;
      }
      case "mul_i64": {
        const b = popI64(), a = popI64();
        const reg = nextReg();
        body.push(`  ${reg} = mul i64 ${a}, ${b}`);
        i64s.push(reg);
        break;
      }
      case "add_i64": {
        const b = popI64(), a = popI64();
        const reg = nextReg();
        body.push(`  ${reg} = add i64 ${a}, ${b}`);
        i64s.push(reg);
        break;
      }
      case "shl_i64": {
        const shift = popI64(), value = popI64();
        const reg = nextReg();
        body.push(`  ${reg} = shl i64 ${value}, ${shift}`);
        i64s.push(reg);
        break;
      }
      case "ashr_i32": {
        const shift = popInt(), value = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = ashr i32 ${value}, ${shift}`);
        ints.push(reg);
        break;
      }
      case "icmp_eq_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = icmp eq i32 ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "icmp_ne_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = icmp ne i32 ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "icmp_sge_i32": {
        const b = popInt(), a = popInt();
        const reg = nextReg();
        body.push(`  ${reg} = icmp sge i32 ${a}, ${b}`);
        preds.push(reg);
        break;
      }
      case "select_i32": {
        const f = popInt(), t = popInt(), c = popPred();
        const reg = nextReg();
        body.push(`  ${reg} = select i1 ${c}, i32 ${t}, i32 ${f}`);
        ints.push(reg);
        break;
      }
      case "fptosi_f32_to_i32": {
        const reg = nextReg();
        body.push(`  ${reg} = fptosi float ${popFloat()} to i32`);
        ints.push(reg);
        break;
      }
      case "sitofp_i32_to_f32": {
        const reg = nextReg();
        body.push(`  ${reg} = sitofp i32 ${popInt()} to float`);
        floats.push(reg);
        break;
      }
      case "sext_i32_to_i64": {
        const reg = nextReg();
        body.push(`  ${reg} = sext i32 ${popInt()} to i64`);
        i64s.push(reg);
        break;
      }
      case "zext_i32_to_i64": {
        const reg = nextReg();
        body.push(`  ${reg} = zext i32 ${popInt()} to i64`);
        i64s.push(reg);
        break;
      }
      case "ptrtoint_p1_to_i64": {
        const reg = nextReg();
        body.push(`  ${reg} = ptrtoint float addrspace(1)* ${popFPtr()} to i64`);
        i64s.push(reg);
        break;
      }
      case "inttoptr_i64_to_p1": {
        const reg = nextReg();
        body.push(`  ${reg} = inttoptr i64 ${popI64()} to float addrspace(1)*`);
        fPtrs.push(reg);
        break;
      }
      case "gep_float_idx_i32": {
        const reg = nextReg();
        body.push(`  ${reg} = getelementptr float, float addrspace(1)* ${popFPtr()}, i32 ${popInt()}`);
        fPtrs.push(reg);
        break;
      }
      case "gep_i32_idx_i32": {
        const reg = nextReg();
        body.push(`  ${reg} = getelementptr i32, i32 addrspace(1)* ${popIPtr()}, i32 ${popInt()}`);
        iPtrs.push(reg);
        break;
      }
      case "br_uncond": {
        // This emitter currently uses a single basic block. Keep branch tokens
        // as a semantic marker for embedding experiments without emitting CFG.
        break;
      }
      case "br_cond_i1":
      case "phi_float":
      case "phi_i32": {
        // Unsupported control-flow forms in the single-block emitter.
        break;
      }
      case "ret_void": {
        // deferred — only one ret void at end of block
        hasRet = true;
        break;
      }
    }
  }

  // Drain remaining typed values into stores so they are live and cannot be
  // DCE'd by the backend. Use fixed param names (not the consumable ptr pools,
  // which may already be depleted by prior load/store operations).
  let df = 0, di = 0, di64 = 0;
  while (floats.length > 0)
    body.push(`  store float ${floats.pop()!}, float addrspace(1)* %pf${df++ % numFPtrs}`);
  while (ints.length > 0)
    body.push(`  store i32 ${ints.pop()!}, i32 addrspace(1)* %pi${di++ % numIPtrs}`);
  while (i64s.length > 0)
    body.push(`  store i64 ${i64s.pop()!}, i64 addrspace(1)* %p64${di64++ % numI64Ptrs}`);

  body.push("  ret void");
  void hasRet; // ret_void tokens only signal intent; we always emit one at end

  const decls: string[] = [];
  if (needsFma) decls.push("declare float @llvm.fma.f32(float, float, float) #1");
  if (needsSqrt) decls.push("declare float @llvm.sqrt.f32(float) #1");
  if (needsFabs) decls.push("declare float @llvm.fabs.f32(float) #1");
  if (needsFMin) decls.push("declare float @llvm.minnum.f32(float, float) #1");
  if (needsFMax) decls.push("declare float @llvm.maxnum.f32(float, float) #1");

  return [
    'target triple = "nvptx64-nvidia-cuda"',
    'target datalayout = "e-p:64:64:64-i1:8:8-i8:8:8-i16:16:16-i32:32:32-i64:64:64-f32:32:32-f64:64:64-v16:16:16-v32:32:32-v64:64:64-v128:128:128-n16:32:64"',
    "",
    `define void @kernel(${params}) #0 {`,
    "entry:",
    ...body,
    "}",
    ...(decls.length > 0 ? ["", ...decls, 'attributes #1 = { nounwind readnone speculatable willreturn }'] : []),
    "",
    'attributes #0 = { "kernel" }',
    "",
  ].join("\n");
}

// ============================================================================
// tokens_to_ll_v2 — register-table emitter
//
// Processes token streams that include named register operands:
//   f0-f31   (float),  r0-r31  (i32),  rd0-rd15 (i64),  p0-p7 (i1)
//   mem_rd0-mem_rd15   (global memory address via %rdN pointer)
//   imm                (immediate constant — emits freeze i32/float undef)
//   op_label           (branch target label — ignored, no CFG)
//
// Convention: PTX dest is always the first operand.  For opcodes that write a
// result (arithmetic, loads, conversions) operands[0] is the destination
// register; operands[1..] are sources.  For stores, operands[0] is the memory
// target (mem_rdN) and operands[1] is the value register.
// ============================================================================
export function tokens_to_ll_v2(tokens: string[]): string {
  // ── Helpers ──────────────────────────────────────────────────────────────
  const IS_REG = /^(f|r|rd|p)\d+$/;
  const IS_MEM = /^mem_rd\d+$/;

  function isOperand(t: string): boolean {
    return IS_REG.test(t) || IS_MEM.test(t) || t === "imm" || t === "op_label" || t === "op_reg";
  }

  // Group flat token stream into { opcode, operands[] } instructions
  type Instr = { opcode: string; operands: string[] };
  const instrs: Instr[] = [];
  let cur: Instr | null = null;
  for (const tok of tokens) {
    if (isOperand(tok)) {
      cur?.operands.push(tok);
    } else {
      if (cur) instrs.push(cur);
      cur = { opcode: tok, operands: [] };
    }
  }
  if (cur) instrs.push(cur);

  // ── Kernel parameter sizing ───────────────────────────────────────────────
  // Count distinct mem_rdN registers and scalar param tokens to size the
  // kernel signature.  This mirrors the heuristic from tokens_to_ll v1 but
  // can be refined later via a parameterizable ArgFillingStrategy.
  const memRdSet = new Set<string>();
  for (const { operands } of instrs)
    for (const op of operands)
      if (IS_MEM.test(op)) memRdSet.add(op.replace("mem_", ""));

  const float_ptr_ops   = instrs.filter(i => i.opcode === "load_float_addrspace1" || i.opcode === "store_float_addrspace1").length;
  const int_ptr_ops     = instrs.filter(i => i.opcode === "load_i32_addrspace1"   || i.opcode === "store_i32_addrspace1").length;
  const i64_ptr_ops     = instrs.filter(i => i.opcode === "load_i64_addrspace1"   || i.opcode === "store_i64_addrspace1").length;
  const i32_param_ops   = instrs.filter(i => i.opcode === "load_i32_param").length;
  const i64_param_ops   = instrs.filter(i => i.opcode === "load_i64_param").length;

  const numFPtrs     = Math.max(3, float_ptr_ops);
  const numIPtrs     = Math.max(3, int_ptr_ops);
  const numI64Ptrs   = Math.max(Math.max(2, memRdSet.size), i64_ptr_ops);
  const numI32Params = Math.max(1, i32_param_ops);
  const numI64Params = Math.max(4, i64_param_ops);

  const fParams        = Array.from({ length: numFPtrs     }, (_, i) => `float addrspace(1)* %pf${i}`);
  const iParams        = Array.from({ length: numIPtrs     }, (_, i) => `i32 addrspace(1)* %pi${i}`);
  const i64Params      = Array.from({ length: numI64Ptrs   }, (_, i) => `i64 addrspace(1)* %p64${i}`);
  const i32ScalarParams= Array.from({ length: numI32Params }, (_, i) => `i32 %ki${i}`);
  const i64ScalarParams= Array.from({ length: numI64Params }, (_, i) => `i64 %kl${i}`);
  const params = [...fParams, ...iParams, ...i64Params, ...i32ScalarParams, ...i64ScalarParams].join(", ");

  // ── SSA state ─────────────────────────────────────────────────────────────
  let counter = 0;
  const nextReg = (): string => `%v${counter++}`;

  // Typed register tables: PTX register name → current SSA value
  const floatRegs = new Map<string, string>(); // fN  → SSA
  const intRegs   = new Map<string, string>(); // rN  → SSA
  const i64Regs   = new Map<string, string>(); // rdN → SSA
  const predRegs  = new Map<string, string>(); // pN  → SSA

  // Scalar kernel param pools (same as v1)
  const i32Scalars: string[] = Array.from({ length: numI32Params }, (_, i) => `%ki${i}`);
  const i64Scalars: string[] = Array.from({ length: numI64Params }, (_, i) => `%kl${i}`);

  const body: string[] = [];

  const freeze = (type: string): string => {
    const r = nextReg(); body.push(`  ${r} = freeze ${type} undef`); return r;
  };

  // Define: allocate a new SSA reg and record in the appropriate table
  function defF(name: string | undefined): string {
    const r = nextReg(); if (name) floatRegs.set(name, r); return r;
  }
  function defR(name: string | undefined): string {
    const r = nextReg(); if (name) intRegs.set(name, r); return r;
  }
  function defRd(name: string | undefined): string {
    const r = nextReg(); if (name) i64Regs.set(name, r); return r;
  }
  function defP(name: string | undefined): string {
    const r = nextReg(); if (name) predRegs.set(name, r); return r;
  }

  // Use: look up existing SSA reg or emit a freeze undef fallback
  function useF(name: string | undefined): string { return floatRegs.get(name ?? "") ?? freeze("float"); }
  function useR(name: string | undefined): string { return intRegs.get(name  ?? "") ?? freeze("i32"); }
  function useRd(name: string | undefined): string { return i64Regs.get(name  ?? "") ?? freeze("i64"); }
  function useP(name: string | undefined): string { return predRegs.get(name  ?? "") ?? freeze("i1"); }

  // Extract base rd register name from a mem_rdN token
  function rdOfMem(memTok: string | undefined): string {
    return (memTok ?? "").replace(/^mem_/, "");
  }

  // Emit inttoptr for a float global pointer from an rd register
  function ptrF(memTok: string | undefined): string {
    const r = nextReg();
    body.push(`  ${r} = inttoptr i64 ${useRd(rdOfMem(memTok))} to float addrspace(1)*`);
    return r;
  }
  function ptrI32(memTok: string | undefined): string {
    const r = nextReg();
    body.push(`  ${r} = inttoptr i64 ${useRd(rdOfMem(memTok))} to i32 addrspace(1)*`);
    return r;
  }
  function ptrI64(memTok: string | undefined): string {
    const r = nextReg();
    body.push(`  ${r} = inttoptr i64 ${useRd(rdOfMem(memTok))} to i64 addrspace(1)*`);
    return r;
  }

  // Intrinsic declarations needed
  const needsFma  = instrs.some(i => i.opcode === "fma_float");
  const needsSqrt = instrs.some(i => i.opcode === "fsqrt_float");
  const needsFabs = instrs.some(i => i.opcode === "fabs_float");
  const needsFMin = instrs.some(i => i.opcode === "fmin_float");
  const needsFMax = instrs.some(i => i.opcode === "fmax_float");

  // ── Emit instructions ─────────────────────────────────────────────────────
  for (const { opcode, operands: ops } of instrs) {
    const d = ops[0], s1 = ops[1], s2 = ops[2], s3 = ops[3];

    switch (opcode) {
      // ── Loads from global memory ──
      case "load_float_addrspace1": {
        const r = defF(d);
        const ptr = IS_MEM.test(s1 ?? "") ? ptrF(s1) : `%pf${counter % numFPtrs}`;
        body.push(`  ${r} = load float, float addrspace(1)* ${ptr}`);
        break;
      }
      case "load_i32_addrspace1": {
        const r = defR(d);
        const ptr = IS_MEM.test(s1 ?? "") ? ptrI32(s1) : `%pi${counter % numIPtrs}`;
        body.push(`  ${r} = load i32, i32 addrspace(1)* ${ptr}`);
        break;
      }
      case "load_i64_addrspace1": {
        const r = defRd(d);
        const ptr = IS_MEM.test(s1 ?? "") ? ptrI64(s1) : `%p64${counter % numI64Ptrs}`;
        body.push(`  ${r} = load i64, i64 addrspace(1)* ${ptr}`);
        break;
      }

      // ── Stores to global memory ──
      // ops[0] = mem target (mem_rdN), ops[1] = value register
      case "store_float_addrspace1": {
        const ptr = IS_MEM.test(d ?? "") ? ptrF(d) : `%pf${counter % numFPtrs}`;
        body.push(`  store float ${useF(s1)}, float addrspace(1)* ${ptr}`);
        break;
      }
      case "store_i32_addrspace1": {
        const ptr = IS_MEM.test(d ?? "") ? ptrI32(d) : `%pi${counter % numIPtrs}`;
        body.push(`  store i32 ${useR(s1)}, i32 addrspace(1)* ${ptr}`);
        break;
      }
      case "store_i64_addrspace1": {
        const ptr = IS_MEM.test(d ?? "") ? ptrI64(d) : `%p64${counter % numI64Ptrs}`;
        body.push(`  store i64 ${useRd(s1)}, i64 addrspace(1)* ${ptr}`);
        break;
      }

      // ── Kernel parameter loads ──
      case "load_i32_param": { intRegs.set(d ?? "", i32Scalars.pop() ?? freeze("i32")); break; }
      case "load_i64_param": { i64Regs.set(d ?? "", i64Scalars.pop() ?? freeze("i64")); break; }

      // ── Float arithmetic ──
      case "fadd_float": { const r = defF(d); body.push(`  ${r} = fadd float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fsub_float": { const r = defF(d); body.push(`  ${r} = fsub float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fmul_float": { const r = defF(d); body.push(`  ${r} = fmul float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fdiv_float": { const r = defF(d); body.push(`  ${r} = fdiv float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fdiv_float_recip": { const r = defF(d); body.push(`  ${r} = fdiv float 1.000000e+00, ${useF(s1)}`); break; }
      case "fneg_float": { const r = defF(d); body.push(`  ${r} = fneg float ${useF(s1)}`); break; }
      case "mov_float":  { const r = defF(d); body.push(`  ${r} = fadd float ${useF(s1)}, 0.000000e+00`); break; }
      case "fma_float": {
        const r = defF(d);
        body.push(`  ${r} = call float @llvm.fma.f32(float ${useF(s1)}, float ${useF(s2)}, float ${useF(s3)})`);
        break;
      }
      case "fsqrt_float": { const r = defF(d); body.push(`  ${r} = call float @llvm.sqrt.f32(float ${useF(s1)})`); break; }
      case "fabs_float":  { const r = defF(d); body.push(`  ${r} = call float @llvm.fabs.f32(float ${useF(s1)})`); break; }
      case "fmin_float": {
        const r = defF(d);
        body.push(`  ${r} = call float @llvm.minnum.f32(float ${useF(s1)}, float ${useF(s2)})`);
        break;
      }
      case "fmax_float": {
        const r = defF(d);
        body.push(`  ${r} = call float @llvm.maxnum.f32(float ${useF(s1)}, float ${useF(s2)})`);
        break;
      }

      // ── Float comparisons ──
      case "fcmp_oeq_float": { const r = defP(d); body.push(`  ${r} = fcmp oeq float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fcmp_olt_float": { const r = defP(d); body.push(`  ${r} = fcmp olt float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fcmp_ogt_float": { const r = defP(d); body.push(`  ${r} = fcmp ogt float ${useF(s1)}, ${useF(s2)}`); break; }
      case "fcmp_one_float": { const r = defP(d); body.push(`  ${r} = fcmp one float ${useF(s1)}, ${useF(s2)}`); break; }
      case "select_float": {
        const r = defF(d);
        body.push(`  ${r} = select i1 ${useP(s1)}, float ${useF(s2)}, float ${useF(s3)}`);
        break;
      }

      // ── Integer arithmetic ──
      case "add_i32":  { const r = defR(d); body.push(`  ${r} = add i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "sub_i32":  { const r = defR(d); body.push(`  ${r} = sub i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "mul_i32":  { const r = defR(d); body.push(`  ${r} = mul i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "and_i32":  { const r = defR(d); body.push(`  ${r} = and i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "or_i32":   { const r = defR(d); body.push(`  ${r} = or i32 ${useR(s1)}, ${useR(s2)}`);   break; }
      case "xor_i32":  { const r = defR(d); body.push(`  ${r} = xor i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "shl_i32":  { const r = defR(d); body.push(`  ${r} = shl i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "lshr_i32": { const r = defR(d); body.push(`  ${r} = lshr i32 ${useR(s1)}, ${useR(s2)}`); break; }
      case "ashr_i32": { const r = defR(d); body.push(`  ${r} = ashr i32 ${useR(s1)}, ${useR(s2)}`); break; }
      case "mov_i32":  { const r = defR(d); body.push(`  ${r} = add i32 ${useR(s1)}, 0`);             break; }
      case "mul_i64":  { const r = defRd(d); body.push(`  ${r} = mul i64 ${useRd(s1)}, ${useRd(s2)}`); break; }
      case "add_i64":  { const r = defRd(d); body.push(`  ${r} = add i64 ${useRd(s1)}, ${useRd(s2)}`); break; }
      case "shl_i64":  { const r = defRd(d); body.push(`  ${r} = shl i64 ${useRd(s1)}, ${useRd(s2)}`); break; }

      // ── Integer comparisons ──
      case "icmp_eq_i32":  { const r = defP(d); body.push(`  ${r} = icmp eq i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "icmp_ne_i32":  { const r = defP(d); body.push(`  ${r} = icmp ne i32 ${useR(s1)}, ${useR(s2)}`);  break; }
      case "icmp_sge_i32": { const r = defP(d); body.push(`  ${r} = icmp sge i32 ${useR(s1)}, ${useR(s2)}`); break; }
      case "select_i32": {
        const r = defR(d);
        body.push(`  ${r} = select i1 ${useP(s1)}, i32 ${useR(s2)}, i32 ${useR(s3)}`);
        break;
      }

      // ── Type conversions ──
      case "fptosi_f32_to_i32": { const r = defR(d);  body.push(`  ${r} = fptosi float ${useF(s1)} to i32`);  break; }
      case "sitofp_i32_to_f32": { const r = defF(d);  body.push(`  ${r} = sitofp i32 ${useR(s1)} to float`); break; }
      case "sext_i32_to_i64":   { const r = defRd(d); body.push(`  ${r} = sext i32 ${useR(s1)} to i64`);    break; }
      case "zext_i32_to_i64":   { const r = defRd(d); body.push(`  ${r} = zext i32 ${useR(s1)} to i64`);    break; }
      case "ptrtoint_p1_to_i64": {
        const r = defRd(d);
        body.push(`  ${r} = ptrtoint float addrspace(1)* %pf${counter % numFPtrs} to i64`);
        break;
      }
      case "inttoptr_i64_to_p1": {
        // Store the resulting pointer in i64Regs so downstream mem_rdN can find it
        const r = nextReg();
        body.push(`  ${r} = inttoptr i64 ${useRd(s1)} to float addrspace(1)*`);
        if (d) i64Regs.set(d, r); // reuse table slot (non-standard but practical)
        break;
      }
      case "gep_float_idx_i32": {
        const r = defF(d); // destination is a float pointer (stored back as float reg)
        body.push(`  ${r} = getelementptr float, float addrspace(1)* %pf${counter % numFPtrs}, i32 ${useR(s1)}`);
        break;
      }
      case "gep_i32_idx_i32": {
        const r = defR(d);
        body.push(`  ${r} = getelementptr i32, i32 addrspace(1)* %pi${counter % numIPtrs}, i32 ${useR(s1)}`);
        break;
      }

      // ── Control flow (no CFG in single-block emitter) ──
      case "br_uncond":
      case "br_cond_i1":
      case "phi_float":
      case "phi_i32":
      case "ret_void":
        break;

      default:
        // Unknown token — skip silently
        break;
    }
  }

  // ── Drain live values into stores so DCE cannot eliminate them ────────────
  let df = 0, di = 0, di64 = 0;
  for (const v of floatRegs.values())
    body.push(`  store float ${v}, float addrspace(1)* %pf${df++ % numFPtrs}`);
  for (const v of intRegs.values())
    body.push(`  store i32 ${v}, i32 addrspace(1)* %pi${di++ % numIPtrs}`);
  for (const v of i64Regs.values())
    body.push(`  store i64 ${v}, i64 addrspace(1)* %p64${di64++ % numI64Ptrs}`);
  for (const v of predRegs.values()) {
    // Extend pred to i32 then store to avoid needing an i1 ptr
    const ext = nextReg();
    body.push(`  ${ext} = zext i1 ${v} to i32`);
    body.push(`  store i32 ${ext}, i32 addrspace(1)* %pi${di++ % numIPtrs}`);
  }

  body.push("  ret void");

  const decls: string[] = [];
  if (needsFma)  decls.push("declare float @llvm.fma.f32(float, float, float) #1");
  if (needsSqrt) decls.push("declare float @llvm.sqrt.f32(float) #1");
  if (needsFabs) decls.push("declare float @llvm.fabs.f32(float) #1");
  if (needsFMin) decls.push("declare float @llvm.minnum.f32(float, float) #1");
  if (needsFMax) decls.push("declare float @llvm.maxnum.f32(float, float) #1");

  return [
    'target triple = "nvptx64-nvidia-cuda"',
    'target datalayout = "e-p:64:64:64-i1:8:8-i8:8:8-i16:16:16-i32:32:32-i64:64:64-f32:32:32-f64:64:64-v16:16:16-v32:32:32-v64:64:64-v128:128:128-n16:32:64"',
    "",
    `define void @kernel(${params}) #0 {`,
    "entry:",
    ...body,
    "}",
    ...(decls.length > 0 ? ["", ...decls, 'attributes #1 = { nounwind readnone speculatable willreturn }'] : []),
    "",
    'attributes #0 = { "kernel" }',
    "",
  ].join("\n");
}

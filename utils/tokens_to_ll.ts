/**
 * Assemble a sequence of LLVM token names (as returned by lift()) into a
 * minimal but valid LLVM IR module that llc can compile to PTX.
 *
 * Token names match the keys in utils/llvm_vectors.json.
 */
export function tokens_to_ll(tokens: string[]): string {
  const ZERO_F = "0.000000e+00";
  const ONE_F  = "1.000000e+00";
  const ZERO_I = "0";
  const ONE_I  = "1";

  const float_ptr_ops = tokens.filter((t) => t === "load_float_addrspace1" || t === "store_float_addrspace1").length;
  const int_ptr_ops = tokens.filter((t) => t === "load_i32_addrspace1" || t === "store_i32_addrspace1").length;
  const numFPtrs = Math.max(3, float_ptr_ops);
  const numIPtrs = Math.max(3, int_ptr_ops);
  const fParams = Array.from({ length: numFPtrs }, (_, i) => `float addrspace(1)* %pf${i}`);
  const iParams = Array.from({ length: numIPtrs }, (_, i) => `i32 addrspace(1)* %pi${i}`);
  const params = [...fParams, ...iParams].join(", ");

  let counter = 0;
  const nextReg = (): string => `%v${counter++}`;

  // Pools of available SSA names by type.
  const floats: string[] = [];
  const ints: string[] = [];
  const preds: string[] = [];
  const fPtrs: string[] = Array.from({ length: numFPtrs }, (_, i) => `%pf${i}`);
  const iPtrs: string[] = Array.from({ length: numIPtrs }, (_, i) => `%pi${i}`);

  const popFloat = (): string => floats.pop() ?? ZERO_F;
  const popInt = (): string => ints.pop() ?? ZERO_I;
  const popPred = (): string => preds.pop() ?? "false";
  const popFPtr = (): string => fPtrs.pop() ?? "%pf0";
  const popIPtr = (): string => iPtrs.pop() ?? "%pi0";

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
        body.push(`  ${reg} = fadd float ${popFloat()}, ${ZERO_F}`);
        floats.push(reg);
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
        body.push(`  ${reg} = add i32 ${popInt()}, ${ZERO_I}`);
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
      case "br_uncond": {
        // This emitter currently uses a single basic block. Keep branch tokens
        // as a semantic marker for embedding experiments without emitting CFG.
        break;
      }
      case "ret_void": {
        // deferred — only one ret void at end of block
        hasRet = true;
        break;
      }
    }
  }

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

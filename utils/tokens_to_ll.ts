/**
 * Assemble a sequence of LLVM token names (as returned by lift()) into a
 * minimal but valid LLVM IR module that llc can compile to PTX.
 *
 * Token names match the keys in utils/llvm_vectors.json.
 */
export function tokens_to_ll(tokens: string[]): string {
  const ZERO = "0.000000e+00";
  const ONE  = "1.000000e+00";

  // Count how many pointer params we need.
  const ptrOps = tokens.filter((t) => t.includes("addrspace"));
  const numPtrs = Math.max(3, ptrOps.length);
  const params = Array.from({ length: numPtrs }, (_, i) => `float addrspace(1)* %p${i}`).join(", ");

  let counter = 0;
  const nextReg = (): string => `%v${counter++}`;

  // Pools of available SSA names.
  const floats: string[] = [];
  const ptrs: string[]   = Array.from({ length: numPtrs }, (_, i) => `%p${i}`);

  const popFloat = (): string => floats.pop() ?? ZERO;
  const popPtr   = (): string => ptrs.pop()   ?? "%p0";

  const body: string[] = [];
  let hasRet = false;
  const needsFma = tokens.includes("fma_float");

  for (const tok of tokens) {
    switch (tok) {
      case "load_float_addrspace1": {
        const reg = nextReg();
        body.push(`  ${reg} = load float, float addrspace(1)* ${popPtr()}`);
        floats.push(reg);
        break;
      }
      case "store_float_addrspace1": {
        body.push(`  store float ${popFloat()}, float addrspace(1)* ${popPtr()}`);
        break;
      }
      case "fadd_float": {
        const b = popFloat(), a = popFloat();
        const reg = nextReg();
        body.push(`  ${reg} = fadd float ${a}, ${b}`);
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
        body.push(`  ${reg} = fdiv float ${ONE}, ${popFloat()}`);
        floats.push(reg);
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

  const decls = needsFma
    ? [
        "",
        "declare float @llvm.fma.f32(float, float, float) #1",
        'attributes #1 = { nounwind readnone speculatable willreturn }',
      ]
    : [];

  return [
    'target triple = "nvptx64-nvidia-cuda"',
    'target datalayout = "e-p:64:64:64-i1:8:8-i8:8:8-i16:16:16-i32:32:32-i64:64:64-f32:32:32-f64:64:64-v16:16:16-v32:32:32-v64:64:64-v128:128:128-n16:32:64"',
    "",
    `define void @kernel(${params}) #0 {`,
    "entry:",
    ...body,
    "}",
    ...decls,
    "",
    'attributes #0 = { "kernel" }',
    "",
  ].join("\n");
}

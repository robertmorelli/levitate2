# Register Filling — Design Notes

## Problem

The current `tokens_to_ll` stack machine has no concept of register identity.
It emits whatever is on the typed stack when an opcode fires. When the lift
algorithm produces tokens in a slightly wrong order (or the convolution smears
context vectors across instruction boundaries), stack values get mismatched and
the resulting IR is semantically wrong even when instruction types are correct.

## The Goal

Produce LLVM IR where each PTX register (`%f3`, `%rd0`, `%r1`, `%p0`) maps to
the same SSA value every time it appears. This preserves data-flow identity and
gives llc enough information to emit correct PTX.

---

## Design: Numbered Register Tokens

### Token stream format

Instead of structural type markers (`op_f`, `op_r`, `op_rd`, `op_p`, `op_mem`),
emit the actual register name as a token:

```
PTX:          fma.rn.f32  %f1,  %f2,  %f3,  %f4;
Token stream: fma.rn.f32  f1    f2    f3    f4
```

Convention: first operand in PTX is always the destination. So `f1` is the
result register; `f2`, `f3`, `f4` are source registers.

Memory-indirect accesses become `mem_rdN`:
```
PTX:          ld.global.f32  %f0,  [%rd1];
Token stream: ld.global.f32  f0    mem_rd1
```

Immediates become `imm` (structural marker; value is lost unless tracked
separately — see "Immediate Value Recovery" below):
```
PTX:          shl.b32   %r0,  %r1,  2;
Token stream: shl.b32   r0    r1    imm
```

### Register token vocabulary

| Family | Tokens | Description template |
|--------|--------|----------------------|
| float  | f0-f31 | "the Nth f32 virtual register in PTX/LLVM scope" |
| int32  | r0-r31 | "the Nth i32 virtual register in PTX/LLVM scope" |
| int64  | rd0-rd15 | "the Nth i64 (pointer-width) virtual register" |
| pred   | p0-p7 | "the Nth predicate (i1) virtual register" |
| mem    | mem_rd0-mem_rd15 | "memory address held in 64-bit register rdN" |
| imm    | imm | "an immediate constant value in the instruction" |

Both PTX and LLVM description tables use the same text for each register token,
so they get identical embeddings. The nearest-neighbor lookup maps `f3 → f3`
automatically — no special algorithm logic needed.

### Lift algorithm impact

None. Algorithms call `find_nearest_llvm(context_vector)`. Register tokens have
the same embedding on both sides, so they map to themselves. Opcode tokens map
via the normal embedding similarity. The algorithms are unchanged.

`parse_ptx_source` already passes non-opcode tokens through as-is (the opcode
is normalized, operands are not). Once register tokens are in `ptx_vectors`, the
convolution can weight their context vectors.

---

## tokens_to_ll Rewrite: Register-Table Emitter

### Stream grouping

Group the flat token stream into instructions:
```ts
type Instr = { opcode: string; operands: string[] };
// e.g. ["fma_float", "f1", "f2", "f3", "f4"]
//   → { opcode: "fma_float", operands: ["f1","f2","f3","f4"] }
```

Tokens that are register names or `imm` or `mem_rdN` are grouped under the
preceding opcode. All other tokens start a new instruction.

### Typed register tables

```ts
const floatRegs = new Map<string, string>(); // "f3" → "%v7"
const intRegs   = new Map<string, string>(); // "r0" → "%v2"
const i64Regs   = new Map<string, string>(); // "rd1" → "%v4"
const predRegs  = new Map<string, string>(); // "p0" → "%v9"
```

Helper convention:
- `defF(name)` — allocates new SSA reg, stores in floatRegs, returns SSA name
- `useF(name)` — looks up floatRegs, falls back to `freeze float undef`
- Same for `defR/useR`, `defRd/useRd`, `defP/useP`

### Memory pointer resolution

When `mem_rd0` appears as a source operand, extract the base register name
(`rd0`), look it up in `i64Regs` to get the i64 address, then emit:
```llvm
%ptrN = inttoptr i64 %v4 to float addrspace(1)*
```
The resulting pointer is used for the load/store, NOT cached (each access
creates a fresh inttoptr).

### Destination / source convention

For every instruction: `operands[0]` is the PTX destination register (the
value being defined). `operands[1..]` are source registers.

Exceptions (no SSA result, destination is memory):
- `store_float_addrspace1`, `store_i32_addrspace1`, `store_i64_addrspace1`:
  `operands[0]` is `mem_rdN` (memory target), `operands[1]` is the value.
- `ret_void`, `br_uncond`, `bar_sync`: no operands.

### Drain

Keep the existing drain logic (store remaining values so DCE can't eliminate
them), but instead of using pool indices, iterate `floatRegs.values()` etc.

---

## Arg Filling (Parameterized — Future Work)

The kernel signature (number/type of pointer and scalar params) is currently
inferred by counting opcode tokens. With register tokens, we can be smarter:

- Count how many distinct `rd*` registers are used as pointers (memory base regs
  after `cvta.to.global.u64` or directly in `mem_rd*` tokens).
- Count distinct `r*` scalars that trace back to `ld.param.u32`.

This analysis is parameterizable: different `ArgFillingStrategy` implementations
decide how to assign kernel parameters to the PTX register name space.

The current strategy (count float/int/i64 pointer params by opcode frequency)
stays as the default. New strategies can be added without breaking anything.

---

## Ollama-Assisted Register Naming (Future Work)

After a lift+roundtrip produces some PTX output, an LLM can be asked:

> Given this PTX source and this generated LLVM IR, produce a JSON mapping from
> PTX register names (like `%f3`, `%rd0`) to the LLVM SSA values (like `%v7`,
> `%v12`) that best correspond to them.

This mapping can be used to post-process the emitted IR, renaming SSA values to
match the PTX register structure and potentially correcting instruction ordering.

Ollama (local, no quota) is the ideal model for this: it can run in a loop
during retry/correction passes without rate limit concerns.

The interface would be something like:
```ts
type RegNameMap = Record<string, string>; // ptxReg → llvmSSA
type RegNamingFn = (ptx: string, ll: string) => Promise<RegNameMap>;
```

---

## Immediate Value Recovery (Future Work)

Currently `imm` tokens lose the actual numeric value. Options:

1. **Parallel immediates array**: `parse_ptx_source` returns `{ tokens, immediates: string[] }`
   and the entire pipeline threads this alongside the token stream. The emitter
   pops from `immediates` when it sees `imm`.

2. **Encoded token**: `imm:42` or `imm:0x3f800000` — a special token string.
   Algorithms special-case tokens starting with `imm:` and pass them through
   without embedding lookup. The emitter parses the value directly.

Option 2 is lower-friction (no interface change). Option 1 is cleaner for
Ollama-assisted passes that need the actual values.

---

## Implementation Order

1. Add register tokens to `token_descriptions.ts` (non-destructive — just adds keys)
2. Update `line_to_ptx_tokens.ts` to emit register names instead of structural types
3. Run `npm run refresh` to get embeddings for new tokens
4. Add register-table emitter to `tokens_to_ll.ts` (additive — new exported
   function `tokens_to_ll_v2`; keep old `tokens_to_ll` for comparison)
5. Wire up the new emitter in a new `--emitter v2` CLI flag or as the default
   for new algorithm variants
6. Benchmark old vs new emitter on the 20 test cases

Here is the streamlined, execution-focused MVP plan. Every step represents a direct action to build the pipeline.

### Phase 1: Curate the Graphics-Math Micro-ISA

Define a focused vocabulary of core floating-point operations. Write rich natural language descriptions for each token to give the embedding model strong semantic signals.

**Create `ptx_tokens.json`:**

* `add.f32`: "PTX 32-bit floating point addition"
* `mul.f32`: "PTX 32-bit floating point multiplication"
* `fma.rn.f32`: "PTX fused multiply-add round to nearest 32-bit float"
* `rcp.approx.f32`: "PTX approximate reciprocal 32-bit float"
* `ld.global.f32`: "PTX load 32-bit float from global memory"
* `st.global.f32`: "PTX store 32-bit float to global memory"
* `ret`: "PTX return from function"

**Create `llvm_tokens.json`:**

* `fadd_float`: "LLVM IR 32-bit floating point addition"
* `fmul_float`: "LLVM IR 32-bit floating point multiplication"
* `fma_float`: "LLVM IR fused multiply-add 32-bit float intrinsic"
* `fdiv_float_recip`: "LLVM IR floating point division by 1.0 for reciprocal 32-bit"
* `load_float_addrspace1`: "LLVM IR load 32-bit float from address space 1 global memory"
* `store_float_addrspace1`: "LLVM IR store 32-bit float to address space 1 global memory"
* `ret_void`: "LLVM IR return void from function"

### Phase 2: Embed and Align

Construct the joint vector space using your token dictionaries.

1. **Embed:** Run the descriptions through `BAAI/bge-small-en-v1.5` to generate 384-dimensional vectors.
2. **Store:** Insert the names and vectors into your in-memory vector index.
3. **Align:** Calculate the Orthogonal Procrustes matrix $W$ using the known pairs from your JSON files. Project all PTX embeddings into the LLVM vector space by multiplying them by $W$.

### Phase 3: The Residual Chaser Loop

Implement the translation algorithm to convert a sequence of PTX opcodes into LLVM opcodes.

1. **Calculate Target Meaning:** Sum the aligned embeddings of the input PTX sequence to find the total block meaning $A$.
2. **Iterate:** In a loop, calculate the current residual using the embeddings of the target tokens generated so far, the unconsumed source tokens, and the current token being evaluated.

$$Residual = A - \sum E_{Target} - \sum E_{Unconsumed} - E_{Current}$$


3. **Select:** Query your vector index to find the nearest LLVM neighbor to the calculated `Residual` vector. Append this LLVM token to your output sequence.
4. **Advance:** Move to the next source token and repeat until the residual norm falls below your threshold.

### Phase 4: Verification via `llc` Injection

Wrap the generated LLVM opcodes in a valid syntax structure to verify compilation round-tripping.

1. **Template Generation:** Construct a static string containing a valid LLVM IR function definition (e.g., a function taking an array pointer).
2. **Sequential Wiring:** Iterate through your generated array of LLVM opcodes. Format each opcode as a line of text, assigning strictly sequential virtual registers (e.g., `%1`, `%2`, `%3`) so the output of one instruction feeds directly into the input of the next.
3. **Compile:** Write the complete string to `candidate.ll`.
4. **Verify:** Execute `llc -march=nvptx64 -mcpu=sm_75 candidate.ll -o candidate.ptx` and diff the result against the original PTX to confirm the mathematical semantics are preserved.

---

Would you like the Python string template for Phase 4 to handle the sequential register assignment automatically?

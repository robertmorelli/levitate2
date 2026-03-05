import line_to_ptx_tokens from "./line_to_ptx_tokens.js";

/** Convert PTX file content into a raw PTX opcode sequence. */
export function string_to_ptx_tokens(sourceText: string): string[] {
  return sourceText.split(/\r?\n/).flatMap((line) => line_to_ptx_tokens(line));
}

export default string_to_ptx_tokens;

/** Parse comma-, semicolon-, or newline-separated keywords from a form field. */
export function parseKeywordsInput(input: string): string[] {
  return input
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function keywordsToInput(keywords: string[] | undefined): string {
  return (keywords ?? []).join(', ')
}

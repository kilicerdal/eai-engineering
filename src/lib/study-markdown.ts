/** Accept common model LaTeX delimiters while preserving Markdown code. */
export function normalizeStudyMath(content: string): string {
  function convertProse(text: string): string {
    return text.split(/(`+[^`]*`+)/g).map((part, index) => index % 2 ? part : part
      .replace(/\\\[([\s\S]*?)\\\]/g, (_, math: string) => `\n$$\n${math.trim()}\n$$\n`)
      .replace(/\\\(([\s\S]*?)\\\)/g, (_, math: string) => `$${math.trim()}$`)
    ).join("");
  }
  const output: string[] = [];
  let prose: string[] = [];
  let fence: { marker: string; length: number } | null = null;
  function flush() { output.push(convertProse(prose.join("\n"))); prose = []; }
  for (const line of content.split("\n")) {
    const opening = /^ {0,3}(`{3,}|~{3,})/.exec(line);
    if (fence) {
      output.push(line);
      if (opening && opening[1][0] === fence.marker && opening[1].length >= fence.length && !line.slice(opening[0].length).trim()) fence = null;
    } else if (opening) {
      flush(); output.push(line);
      fence = { marker: opening[1][0], length: opening[1].length };
    } else prose.push(line);
  }
  flush();
  return output.join("\n");
}

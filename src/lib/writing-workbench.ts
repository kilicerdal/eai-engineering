export type WritingBrief = { audience: string; purpose: string; boundaries: string; commentOnly: boolean };
export type WritingSnapshot = { id: string; name: string; title: string; content: string; createdAt: number };
export type WritingDecision = { status: "accepted" | "declined" | "deferred"; reason: string };
export const writingReviews = {
  "Sentence and meaning review": "Separate necessary corrections from optional style preferences. For each proposed change quote Original, offer Proposed wording, and explain Why. Flag changes in certainty, scope, causality or factual meaning. Respect editorial boundaries.",
  "Evidence and claim review": "Distinguish missing support, irrelevant evidence, weak sources and contradictory evidence. Identify overclaims such as proves or always; propose a justified narrower claim. Do not invent sources or facts.",
  "Counterargument review": "Assess whether the opposing position is credible and represented fairly, identify a possible straw man, and explain what a fair response needs. Do not invent the author's position.",
  "Paragraph roles and structure": "Identify each supplied paragraph's role: introduce, support, qualify, challenge or conclude. Compare scope promised in the introduction with delivered coverage. If only a passage is supplied do not claim to assess the whole essay.",
  "Conclusion review": "Assess synthesis, contribution, unsupported new claims and repetition. Explain what the ending adds. If the ending is not supplied say so.",
} as const;
export function writingParagraphs(text: string): string[] { return text.split(/\n\s*\n/).filter(p => p.trim()); }
export function paragraphChanges(before:string,after:string):{before:{text:string;changed:boolean}[];after:{text:string;changed:boolean}[]}{
 const a=before.match(/\s+|\S+/g)||[],b=after.match(/\s+|\S+/g)||[];
 if(a.length>300||b.length>300)return {before:[{text:before,changed:before!==after}],after:[{text:after,changed:before!==after}]};
 const matrix=Array.from({length:a.length+1},()=>new Uint16Array(b.length+1));
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)matrix[i][j]=a[i]===b[j]?1+matrix[i+1][j+1]:Math.max(matrix[i+1][j],matrix[i][j+1]);
 const old:{text:string;changed:boolean}[]=[],next:{text:string;changed:boolean}[]=[];let i=0,j=0;
 while(i<a.length||j<b.length){if(i<a.length&&j<b.length&&a[i]===b[j]){old.push({text:a[i++],changed:false});next.push({text:b[j++],changed:false});}else if(i<a.length&&(j===b.length||matrix[i+1][j]>=matrix[i][j+1]))old.push({text:a[i++],changed:true});else next.push({text:b[j++],changed:true});}
 return {before:old,after:next};
}
export function writingReviewPrompt(action: string, text: string, brief: WritingBrief, location: string): string {
  const task = writingReviews[action as keyof typeof writingReviews] || action;
  const policy = `Prioritize: Required before sharing / Useful refinement / Optional polish. Quote exact short passages so comments can be located. ${brief.commentOnly ? "Comment only: diagnose and ask questions; do not supply replacement prose." : "For rewrites include Original, Proposed wording, Why, and any meaning change."}`;
  const context = `Audience: ${brief.audience.slice(0,100)}. Purpose: ${brief.purpose.slice(0,140)}. Preserve: ${brief.boundaries.slice(0,160)}. Scope: ${location}.`;
  return `${task.slice(0,500)}\n${policy}\n${context}\nReviewed text:\n${text}`;
}
export function reviewCapacity(action: string, brief: WritingBrief, location: string) { return Math.max(400, 2880 - writingReviewPrompt(action, "", brief, location).length); }
export function quotedWritingPassages(feedback: string, original: string): string[] {
  return [...new Set([...feedback.matchAll(/[“"]([^”"\n]{8,400})[”"]/g)].map(m=>m[1]).filter(q=>original.includes(q)))].slice(0,20);
}
export function writingExportName(title: string, kind: string) { return `${title.replace(/[^\p{L}\p{N}_ -]/gu, "").trim().replace(/\s+/g,"-").slice(0,90)||"essay"}-${kind}.txt`; }

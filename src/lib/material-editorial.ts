import type {CourseDocument,MaterialExcerpt} from "./study-materials";
export type MaterialMetadata={originalName:string;author:string;title:string;date:string;edition:string;revisionOf?:string};
export type ExtractionPage={number:number;label?:string;warnings:string[]};
export function extractionWarnings(text:string,columns=false,table=false):string[]{
 const warnings:string[]=[];
 if(!text.trim())warnings.push("No extracted text — images or scanned text may be present.");
 else if(text.trim().length<80)warnings.push("Little extracted text — inspect before studying.");
 if(columns)warnings.push("Possible multiple columns: reading order needs inspection.");
 if(table||/\S[ \t]{3,}\S/.test(text))warnings.push("Possible table or aligned values: row and column relationships may be lost.");
 return warnings;
}
export function repeatedPageEdges(document:CourseDocument):string[]{
 const counts=new Map<string,number>();
 for(const page of document.pages){const lines=page.text.split(/\n/).map(s=>s.trim()).filter(Boolean);for(const edge of new Set([lines[0],lines.at(-1)].filter((s):s is string=>!!s&&s.length<160)))counts.set(edge,(counts.get(edge)||0)+1);}
 return [...counts].filter(([,n])=>n>=Math.max(2,Math.ceil(document.pages.length*.6))).map(([s])=>s);
}
export function cleanExtraction(text:string,edges:string[],removeEdges:boolean,repair:boolean):string{
 const lines=text.split("\n");
 const kept=removeEdges?lines.filter((line,i)=>!((i===0||i===lines.length-1)&&edges.includes(line.trim()))):lines;
 return (repair?kept.join("\n").replace(/(\p{L}{3,})-\n(\p{Ll}{2,})/gu,"$1$2"):kept.join("\n")).trim();
}
export function materialCoverage(documents:CourseDocument[],excerpts:MaterialExcerpt[]){return documents.map(d=>{const selected=excerpts.filter(e=>e.documentId===d.id);const pages=[...new Set(selected.map(e=>e.page))];return {id:d.id,name:d.name,total:d.pageCount,pages,characters:selected.reduce((n,e)=>n+e.text.length,0)};});}
export function visualQuestionWarning(question:string){return /\b(figure|diagram|chart|graph|table|illustration|image|photograph)\b/i.test(question)?"This question may require a visual or table. Extracted text does not establish its layout, labels or values. Select a complete textual description or check the original before relying on an answer.":"";}

export type ExtractionEdit={id:string;start:number;end:number;before:string;after:string;kind:"edge"|"hyphen"};
export function extractionEdits(text:string,edges:string[],removeEdges:boolean,repair:boolean):ExtractionEdit[]{
 const edits:ExtractionEdit[]=[];
 if(removeEdges){let offset=0;const lines=text.split("\n");for(let i=0;i<lines.length;i++){const line=lines[i];if((i===0||i===lines.length-1)&&edges.includes(line.trim())){const end=offset+line.length+(i<lines.length-1?1:0);edits.push({id:`edge:${offset}:${end}`,start:offset,end,before:text.slice(offset,end),after:"",kind:"edge"});}offset+=line.length+1;}}
 if(repair)for(const match of text.matchAll(/(\p{L}{3,})-\n(\p{Ll}{2,})/gu)){const start=match.index,end=start+match[0].length;if(!edits.some(e=>start<e.end&&end>e.start))edits.push({id:`hyphen:${start}:${end}`,start,end,before:match[0],after:match[1]+match[2],kind:"hyphen"});}
 return edits.sort((a,b)=>a.start-b.start);
}
export function applyExtractionEdits(text:string,edits:ExtractionEdit[],undone:string[]=[]):string{
 let next="",cursor=0;for(const edit of edits){if(undone.includes(edit.id))continue;next+=text.slice(cursor,edit.start)+edit.after;cursor=edit.end;}return (next+text.slice(cursor)).trim();
}
export function omittedMaterialPages(total:number,included:number[]):number[]{const chosen=new Set(included);return Array.from({length:total},(_,i)=>i+1).filter(n=>!chosen.has(n));}
export function pageRanges(pages:number[]):string{const sorted=[...new Set(pages)].sort((a,b)=>a-b),parts:string[]=[];for(let i=0;i<sorted.length;i++){let last=sorted[i];const first=last;while(sorted[i+1]===last+1)last=sorted[++i];parts.push(first===last?String(first):`${first}–${last}`);}return parts.join(", ");}

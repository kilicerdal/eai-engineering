import type {ReadingParagraph} from './session';
export type SourcePlace={section:number;paragraph:string};
export type SourceChapter=SourcePlace&{label:string};
export type SourceNote=SourcePlace&{marker:string;text:string;voice:string};
export function noteDefinition(text:string){return text.match(/^\s*\[(\d{1,3}|\*|†|‡)\]\s+([\s\S]+)/);}
export function sourceVoice(text:string){if(/\btranslator[’']?s note\b/i.test(text))return 'Translator’s note (identified in source)';if(/\beditor[’']?s note\b/i.test(text))return 'Editor’s note (identified in source)';if(/\bauthor[’']?s note\b/i.test(text))return 'Author’s note (identified in source)';return 'Source note · authorship not identified by this marker';}
export function sourceIndex(sections:ReadingParagraph[][],chapters:SourceChapter[]){
 const all=sections.flatMap((s,section)=>s.map(p=>({...p,section})));let blockStart:number|null=null;
 const definitions=all.flatMap((p,i)=>{if(/^\s*(?:Footnotes|Endnotes)\s*$/i.test(p.text)){blockStart=i;return [];}const bracket=noteDefinition(p.text),numbered=blockStart!==null?p.text.match(/^\s*(\d{1,3})\.\s+([\s\S]+)/):null,m=bracket||numbered;if(!m){blockStart=null;return [];}return [{section:p.section,paragraph:p.id,marker:m[1],text:p.text,voice:sourceVoice(p.text),order:i,endnoteBlock:numbered?blockStart:null}];});
 const noteIds=new Set(definitions.map(n=>n.paragraph)),first=chapters[0]?all.findIndex(p=>p.id===chapters[0].paragraph):0;
 const references:Record<string,SourceNote[]>={};
 for(let i=0;i<all.length;i++){const p=all[i];if(noteIds.has(p.id))continue;for(const token of p.text.matchAll(/\[(\d{1,3}|\*|†|‡)\]/g)){const candidates=definitions.filter(n=>n.marker===token[1]&&n.order>i);const next=candidates[0];if(!next)continue;const nextBoundary=chapters.find(c=>Number(c.paragraph.slice(1))>Number(p.id.slice(1)));if(next.endnoteBlock===null&&nextBoundary&&Number(next.paragraph.slice(1))>=Number(nextBoundary.paragraph.slice(1)))continue; // Reused markers must not jump into a later chapter.
 const previousDefinition=definitions.filter(n=>n.marker===token[1]&&n.order<i).at(-1);if(previousDefinition&&i-previousDefinition.order>500)continue;
 if(!references[p.id]?.some(n=>n.paragraph===next.paragraph))(references[p.id]??=[]).push(next);
 }}
 return {all,definitions,noteIds,references,firstMain:Math.max(0,first)};
}
export type ScholarOptions={whole:boolean;from:number;to:number;scope:'all'|'main'|'notes';concordance:boolean};
export type ScholarHit=SourcePlace&{text:string;snippet:string;continued?:string;chapter:string;occurrences:number};
export function foldTypography(text:string){return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[‐‑‒–—−]/g,'-').replace(/\s+/g,' ').trim();}
export function queryTerms(query:string){const parts=[...foldTypography(query.slice(0,100)).matchAll(/"([^"]+)"|([^\s"]+)/g)].map(m=>foldTypography(m[1]||m[2])).filter(Boolean);return parts;}
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function count(text:string,term:string,whole:boolean){const expression=whole?new RegExp(`(?<![\\p{L}\\p{N}_])${escape(term)}(?![\\p{L}\\p{N}_])`,'gu'):new RegExp(escape(term),'gu');return [...text.matchAll(expression)].length;}
export function scholarSearch(sections:ReadingParagraph[][],chapters:SourceChapter[],query:string,options:ScholarOptions){
 const terms=queryTerms(query);if(foldTypography(query).replace(/"/g,'').length<2||!terms.length)return {hits:[] as ScholarHit[],total:0,truncated:false};
 const index=sourceIndex(sections,chapters),hits:ScholarHit[]=[];let total=0;
 for(const [i,p] of index.all.entries()){
  if(i<options.from||i>options.to||options.scope==='main'&&(i<index.firstMain||index.noteIds.has(p.id))||options.scope==='notes'&&!index.noteIds.has(p.id))continue;
  const own=foldTypography(p.text),next=index.all[i+1],canJoin=next&&i+1<=options.to&&!index.noteIds.has(next.id)&&!index.noteIds.has(p.id)&&!chapters.some(c=>c.paragraph===next.id),combined=own+(canJoin?' '+foldTypography(next.text):'');
  const inOwn=terms.every(t=>count(own,t,options.whole)>0),cross=!inOwn&&terms.every(t=>count(combined,t,options.whole)>0)&&terms.some(t=>count(own,t,options.whole)===0&&combined.indexOf(t)<own.length);
  if(!inOwn&&!cross)continue;total++;if(hits.length>=100)continue;
  const text=p.text+(cross?'\n\n'+next!.text:''),flat=text.replace(/\s+/g,' '),at=Math.max(0,foldTypography(flat).indexOf(terms[0])),start=Math.max(0,at-65),chapter=chapters.filter(c=>Number(c.paragraph.slice(1))<=Number(p.id.slice(1))).at(-1)?.label||'Introductory material';
  hits.push({section:p.section,paragraph:p.id,text,snippet:(start?'…':'')+flat.slice(start,start+260)+(flat.length>start+260?'…':''),...(cross?{continued:next!.id}:{}),chapter,occurrences:terms.reduce((n,t)=>n+count(own,t,options.whole),0)});
 }
 return {hits,total,truncated:total>100};
}
export function sourcePresentation(text:string,play=false){if(noteDefinition(text))return 'note';if(/^\s*\[Illustration\b/i.test(text))return 'illustration';if(play&&(/^[A-Z][A-Z .’'-]{1,35}\.\s*\n/.test(text)||/^(?:_?\[?)(?:Enter|Exit|Exeunt|Re-enter)\b/i.test(text)))return 'drama';if(/^\s*[_“"\[]?(?:My dear|Dear|Dearest)[^\n]{0,80},\s*\n/.test(text)||/^Letter\s+[IVX\d]+/i.test(text)||/^\s*\[(?:Letter|Extract|Copy of)/i.test(text))return 'letter';if(/^(?:Yours (?:ever|truly|affectionately|sincerely)|Your (?:affectionate|loving|devoted))[^\n]*[\s\S]{0,150}$/i.test(text.trim())||/^(?:[\p{L} .'-]+,\s*)?(?:Jan\.?|Feb\.?|Mar\.?|Apr\.?|May|Jun\.?|Jul\.?|Aug\.?|Sep\.?|Oct\.?|Nov\.?|Dec\.?)[a-z]*\s+\d{1,2}(?:st|nd|rd|th)?[, .]+[\d—-]{2,5}\.?$/u.test(text.trim()))return 'letter';return 'prose';}
export function chapterReference(text:string,chapters:SourceChapter[]){return [...text.matchAll(/\b(?:see|in|refer to)\s+(?:chapter|chap\.)\s+([IVXLCDM]+|\d+)\b/gi)].flatMap(m=>{const re=new RegExp(`^CHAPTER\\s+${m[1]}(?:[. :]|$)`,'i'),matches=chapters.filter(c=>re.test(c.label));return matches.length===1?[matches[0]]:[];});}

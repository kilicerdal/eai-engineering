export type ReadingParagraph={id:string;text:string};
export type SessionPlace={section:number;paragraph?:string};
export type ReadingSession={start:SessionPlace;end:SessionPlace;words:number};
export function tenMinuteSession(sections:ReadingParagraph[][],place:SessionPlace):ReadingSession|null{
 const all=sections.flatMap((paragraphs,section)=>paragraphs.map(p=>({...p,section})));if(!all.length)return null;
 const startIndex=place.paragraph?all.findIndex(p=>p.id===place.paragraph&&p.section===place.section):all.findIndex(p=>p.section===place.section);
 if(startIndex<0)return null;let words=0,end=all[startIndex];
 for(let i=startIndex;i<all.length;i++){end=all[i];words+=end.text.trim().split(/\s+/).filter(Boolean).length;if(words>=2000)break;}
 return {start:{section:all[startIndex].section,paragraph:all[startIndex].id},end:{section:end.section,paragraph:end.id},words};
}

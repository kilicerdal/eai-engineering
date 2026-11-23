export type ArtReference={title:string;url:string;scope?:string};
const line=(value:string)=>value.replace(/[\r\n]+/g,' ').trim();
const bib=(value:string)=>line(value).replace(/\\/g,'\\textbackslash{}').replace(/[{}%&#_$]/g,c=>'\\'+c);
export function studyCitation(title:string,edition:string,url:string,accessed:string){return `dAI Art Room. “${line(title)}.” ${line(edition)}. ${url}. Accessed ${accessed}.`;}
export function referenceExport(refs:ArtReference[],format:'ris'|'bib',accessed:string){return refs.map((r,i)=>format==='ris'?`TY  - ELEC\nTI  - ${line(r.title)}\nUR  - ${line(r.url)}\nY2  - ${accessed}\n${r.scope?'N1  - '+line(r.scope)+'\n':''}ER  - \n`:`@online{artroom${i+1},\n  title = {${bib(r.title)}},\n  url = {${bib(r.url)}},\n  urldate = {${accessed}}${r.scope?',\n  note = {'+bib(r.scope)+'}':''}\n}\n`).join('\n');}

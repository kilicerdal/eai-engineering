import 'server-only';
import {artPaintings} from './collection';
import {artArtists,artEras} from './artists';
import {normalizeArtText} from './navigation';
import depth from '../../../data/art/research/looking-room.json';
import {artEditorial} from './editorial';
import {artFacts} from './facts';
import readingNotes from '../../../data/art/research/reading-refinements.json';
import dossiers from '../../../data/art/research/research-dossiers.json';
export type Passage={title:string;heading:string;text:string;href:string;kind:string};
export function scholarshipPassages():Passage[]{const rows:Passage[]=[];for(const [kind,entries]of Object.entries(artEditorial)){for(const [id,e]of Object.entries(entries)){const base=kind==='paintings'?`/study/art/painting/${id}`:kind==='painters'?`/study/art/painter/${id}`:kind==='eras'?`/study/art/era/${id}`:`/study/art/essays/${id}`;const prefix=kind==='painters'?'biography':'essay';for(const s of e.sections)rows.push({title:e.title,heading:s.title,text:s.paragraphs.join('\n\n'),href:base+`#${prefix}-${s.id}`,kind});}}for(const [id,d]of Object.entries(dossiers)){for(const key of ['materials','patronage','ownership','reception','unresolved']as const)rows.push({title:artEditorial.paintings[id].title,heading:key,text:d[key],href:`/study/art/painting/${id}#research-${key}`,kind:'paintings'});}for(const [id,c]of Object.entries(depth.cases)){for(const key of ['naming','scale','color','people','story','challenge']as const)rows.push({title:artEditorial.paintings[id].title,heading:key,text:c[key],href:`/study/art/painting/${id}#looking-${key}`,kind:'paintings'});}for(const kind of ['painters','paintings'] as const)for(const [id,entries]of Object.entries(artFacts[kind]))for(const f of entries)rows.push({title:artEditorial[kind][id].title,heading:f.title,text:f.text+'\n\nWhy it matters: '+f.why,href:`/study/art/${kind==='painters'?'painter':'painting'}/${id}#${f.id}`,kind});for(const [id,n]of Object.entries(readingNotes.works))rows.push({title:artEditorial.paintings[id].title,heading:n.heading,text:n.subject+"\n\n"+n.encounter,href:`/study/art/painting/${id}#essay-object-context`,kind:"paintings"});return rows;}
const normalize=normalizeArtText;
export function searchScholarship(query:string,kind='all'){const terms=normalize(query.trim().slice(0,100)).split(/\s+/).filter(Boolean);if(!terms.length)return [];return scholarshipPassages().filter(p=>(kind==='all'||p.kind===kind)&&terms.every(t=>normalize(p.text+' '+p.title+' '+p.heading).includes(t))).map(p=>{const segments=p.href.split('#')[0].split('/'),id=segments.at(-1),subject=p.kind==='paintings'?artPaintings.find(w=>w.id===id)?.title:p.kind==='painters'?artArtists.find(a=>a.id===id)?.name:p.kind==='eras'?artEras.find(e=>e.id===id)?.name:p.title;return {...p,subject:subject??p.title,excerpt:scholarshipExcerpt(p.text,terms)};});}

export function groupScholarship(results:ReturnType<typeof searchScholarship>){const groups=new Map<string,{href:string;subject:string;title:string;kind:string;passages:typeof results}>();for(const passage of results){const key=passage.href.split('#')[0],group=groups.get(key);if(group)group.passages.push(passage);else groups.set(key,{href:key,subject:passage.subject,title:passage.title,kind:passage.kind,passages:[passage]});}return [...groups.values()];}

/** Locate matches in original words so stripped accents/apostrophes cannot shift the excerpt. */
export function scholarshipExcerpt(text:string,terms:string[],limit=360){
 const words=Array.from(text.matchAll(/\S+/g));
 const hit=words.findIndex(word=>terms.some(term=>normalize(word[0]).includes(term)));
 const proposed=hit<0?0:Math.max(0,words[hit].index!-110);
 const start=words.find(word=>word.index!>=proposed)?.index??0;
 const maximum=start+limit;
 const ends=words.filter(word=>word.index!>=start&&word.index!+word[0].length<=maximum);
 const end=ends.length?ends.at(-1)!.index!+ends.at(-1)![0].length:Math.min(text.length,maximum);
 return (start?'…':'')+text.slice(start,end)+(end<text.length?'…':'');
}

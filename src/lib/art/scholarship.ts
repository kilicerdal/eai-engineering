import objectReading from '../../../data/art/research/object-reading.json';
import signatures from '../../../data/art/research/signature-studies.json';
import collectionStudies from '../../../data/art/research/collection-studies.json';
import {scholarshipQuery,scholarshipMatch} from './scholarship-query';
import {artSearchText} from './search';
import 'server-only';
import {artPaintings} from './collection';
import {artArtists,artEras} from './artists';
import {normalizeArtText} from './navigation';
import depth from '../../../data/art/research/looking-room.json';
import {artEditorial} from './editorial';
import {artFacts} from './facts';
import readingNotes from '../../../data/art/research/reading-refinements.json';
import dossiers from '../../../data/art/research/research-dossiers.json';
import paper from '../../../data/art/research/on-paper.json';
import paperObjects from '../../../data/art/research/on-paper-acquisition.json';
import connections from '../../../data/art/research/paper-connections.json';
import processEvidence from '../../../data/art/research/paper-process-evidence.json';
import notebooks from '../../../data/art/research/notebook-encounters.json';
export type Passage={title:string;heading:string;text:string;href:string;kind:string};
export function scholarshipPassages():Passage[]{const rows:Passage[]=[];for(const [kind,entries]of Object.entries(artEditorial)){for(const [id,e]of Object.entries(entries)){const base=kind==='paintings'?`/study/art/painting/${id}`:kind==='painters'?`/study/art/painter/${id}`:kind==='eras'?`/study/art/era/${id}`:`/study/art/essays/${id}`;const prefix=kind==='painters'?'biography':'essay';for(const s of e.sections)rows.push({title:e.title,heading:s.title,text:s.paragraphs.join('\n\n'),href:base+`#${prefix}-${s.id}`,kind});}}for(const [id,d]of Object.entries(dossiers)){for(const key of ['materials','patronage','ownership','reception','unresolved']as const)rows.push({title:artEditorial.paintings[id].title,heading:key,text:d[key],href:`/study/art/painting/${id}#research-${key}`,kind:'paintings'});}for(const [id,c]of Object.entries(depth.cases)){for(const key of ['naming','scale','color','people','story','challenge']as const)rows.push({title:artEditorial.paintings[id].title,heading:key,text:c[key],href:`/study/art/painting/${id}#looking-${key}`,kind:'paintings'});}for(const kind of ['painters','paintings'] as const)for(const [id,entries]of Object.entries(artFacts[kind]))for(const f of entries)rows.push({title:artEditorial[kind][id].title,heading:f.title,text:f.text+'\n\nWhy it matters: '+f.why,href:`/study/art/${kind==='painters'?'painter':'painting'}/${id}#${f.id}`,kind});for(const [id,n]of Object.entries(readingNotes.works))rows.push({title:artEditorial.paintings[id].title,heading:n.heading,text:n.subject+"\n\n"+n.encounter,href:`/study/art/painting/${id}#essay-object-context`,kind:"paintings"});for(const object of paperObjects.records){const study=paper.studies[object.id as keyof typeof paper.studies];for(const key of ['observation','documented','limit','process','paper','provenance','inscription'] as const)rows.push({title:object.title,heading:({observation:'Looking at the sheet',documented:'Documented purpose',limit:'Limits of reconstruction',process:'Working process',paper:'The physical sheet',provenance:'Ownership and survival',inscription:'Inscriptions and annotations'})[key],text:study[key],href:'/study/art/on-paper#'+object.id+'-working-process',kind:'drawings'});}for(const c of connections)rows.push({title:c.title,heading:c.relationship,text:c.documented+'\n\n'+c.looking+'\n\n'+c.limit,href:'/study/art/on-paper/connections#connection-'+c.id,kind:'connections'});for(const e of processEvidence)rows.push({title:e.title,heading:e.theme,text:e.documented+'\n\n'+e.looking+'\n\n'+e.limit,href:'/study/art/on-paper#'+e.sheet+'-documentary-context',kind:'drawings'});for(const n of notebooks)rows.push({title:n.title,heading:n.object,text:n.documented+'\n\n'+n.looking+'\n\n'+n.limit,href:'/study/art/on-paper#'+n.id,kind:'drawings'});for(const [id,study]of Object.entries(signatures))for(const [i,c]of study.evidence.entries())rows.push({title:artPaintings.find(p=>p.id===id)!.title,heading:c.status,text:c.claim+' '+c.limit,href:'/study/art/painting/'+id+'#claim-'+id+'-'+i,kind:'paintings'});for(const [id,study]of Object.entries(collectionStudies)){rows.push({title:artPaintings.find(p=>p.id===id)!.title,heading:'Commission, audience and setting',text:study.audience+' '+study.limit,href:'/study/art/painting/'+id+'#dossier-'+id+'-context',kind:'paintings'});rows.push({title:artPaintings.find(p=>p.id===id)!.title,heading:'Attributed scholarship and alternative readings',text:study.debate.map(row=>row.join(' ')).join(' ')+('scholarship' in study&&study.scholarship?' '+study.scholarship.name+' '+study.scholarship.text:''),href:'/study/art/painting/'+id+'#dossier-'+id+'-readings',kind:'paintings'});}for(const [id,entry]of Object.entries(objectReading.works))rows.push({title:artPaintings.find(p=>p.id===id)!.title,heading:entry.heading,text:entry.text,href:'/study/art/painting/'+id+'#object-labels',kind:'paintings'});rows.push({title:'Reading collection labels',heading:'Attribution, versions and frames',text:objectReading.labels.map(row=>row.term+' '+row.text).join(' '),href:'/study/art/painting/rembrandt-01#object-labels',kind:'essays'});return rows;}
const normalize=normalizeArtText;
export function searchScholarship(query:string,kind='all'){const plan=scholarshipQuery(query);if(!plan.terms.length)return [];return scholarshipPassages().filter(p=>kind==='all'||p.kind===kind).flatMap((p,index)=>{const id=p.href.split('#')[0].split('/').at(-1),work=p.kind==='paintings'?artPaintings.find(w=>w.id===id):undefined,aliases=work?artSearchText(work.id,work.title,work.artist):'',score=scholarshipMatch(plan,p.title,p.heading,p.text,aliases);if(score===null)return [];const subject=work?.title??(p.kind==='painters'?artArtists.find(a=>a.id===id)?.name:p.kind==='eras'?artEras.find(e=>e.id===id)?.name:p.title);return [{score,index,result:{...p,subject:subject??p.title,excerpt:scholarshipExcerpt(p.text,plan.excerptTerms)}}];}).sort((a,b)=>b.score-a.score||a.index-b.index).map(r=>r.result);}


export function groupScholarship(results:ReturnType<typeof searchScholarship>){const groups=new Map<string,{href:string;subject:string;title:string;kind:string;passages:typeof results}>();for(const passage of results){const key=['drawings','connections'].includes(passage.kind)?passage.href:passage.href.split('#')[0],group=groups.get(key);if(group)group.passages.push(passage);else groups.set(key,{href:key,subject:passage.subject,title:passage.title,kind:passage.kind,passages:[passage]});}return [...groups.values()];}

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

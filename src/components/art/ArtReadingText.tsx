import Link from 'next/link';
import type {ReactNode} from 'react';
const terms=[
{term:'tronie',meaning:'A study of a type, expression or costume rather than a commissioned portrait of a named sitter.'},
{term:'patronage',meaning:'The support, commissioning and collecting relationships through which art is funded and given a setting or audience.'},
{term:'glazing',meaning:'Using thin translucent layers of paint to modify the appearance of underlying color.'},
{term:'sfumato',meaning:'Soft tonal transitions that make a boundary difficult to locate, often associated with Leonardo.'},
{term:'chiaroscuro',meaning:'The use of light and dark to model forms or organize a composition.'},
{term:'impasto',meaning:'Paint applied in raised passages whose thickness is part of the surface. A reproduction cannot reproduce the relief under changing light.'},
{term:'foreshortening',meaning:'A figure or object directed into depth appears compressed along that direction, helping it project toward or recede from the viewer.'},
{term:'pentimento',meaning:'A change made during painting, sometimes revealed by aging or technical examination. A visible irregularity alone does not prove one.'},
{term:'grisaille',meaning:'Painting largely in gray tones, sometimes used to suggest sculptural relief or as part of a layered process.'},
{term:'picture plane',meaning:'The physical surface of the picture considered in relation to the space represented on it.'},
{term:'negative space',meaning:'The shaped intervals around or between figures and objects, which can organize attention as actively as the objects.'},
{term:'provenance',meaning:'An object’s documented ownership history. Gaps in that history should remain explicit.'}
];
export const termDefinitionId=(section:string,term:string)=>section+'-'+term.replaceAll(' ','-');
export function termsIn(text:string){return terms.filter(t=>new RegExp('\\b'+t.term+'\\b','i').test(text));}
export function ArtParagraph({text,termsId,paragraphId,works=[],origin}:{origin?:string;text:string;paragraphId?:string;termsId:string;works?:{id:string;title:string}[]}){
 const tokens:{start:number;end:number;node:ReactNode}[]=[];
 // Link the first occurrence of each title or term, preserving the full paragraph.
 // Longest titles win when one title contains another; no nested links are made.
 for(const work of [...works].sort((a,b)=>b.title.length-a.title.length)){
  const start=text.indexOf(work.title);if(start<0)continue;const end=start+work.title.length;
  if(!tokens.some(t=>start<t.end&&end>t.start))tokens.push({start,end,node:<Link key={'work-'+start} href={'/study/art/painting/'+work.id+(origin&&paragraphId?'?from=biography&origin='+encodeURIComponent(origin)+'&passage='+encodeURIComponent(paragraphId):'')}>{work.title}</Link>});
 }
 for(const term of termsIn(text)){
  const match=new RegExp('\\b'+term.term+'\\b','i').exec(text)!;const start=match.index,end=start+match[0].length;
  if(!tokens.some(t=>start<t.end&&end>t.start))tokens.push({start,end,node:<a key={'term-'+start} className="art-term-link" href={'#'+termDefinitionId(termsId,term.term)} aria-label={match[0]+': go to its definition'}>{match[0]}</a>});
 }
 const nodes:ReactNode[]=[];let at=0;for(const t of tokens.sort((a,b)=>a.start-b.start)){nodes.push(text.slice(at,t.start),t.node);at=t.end;}nodes.push(text.slice(at));
 return <p id={paragraphId}>{nodes}</p>;
}

// Contextual examples are visual readings; they do not infer unexamined paint layers.
export function termContext(term:string,id:string){
 const examples:Record<string,Record<string,string>>={
 sfumato:{'leonardo-01':'Here, compare the hard-to-locate boundary around the mouth with the more firmly described hands. The term names that softened transition; it does not identify the sitter’s emotion.','leonardo-06':'Here, compare the modeled face with the sharper juniper foliage. Different boundaries do different work within the same portrait.'},
 tronie:{'vermeer-01':'Here, the headdress and turn construct a presence without supplying the identifying setting expected of a commissioned likeness.'},
 chiaroscuro:{'caravaggio-02':'Here, follow the relation between the illuminated bodies and the darker room. Light organizes the encounter rather than functioning only as an atmospheric effect.','rembrandt-02':'Here, the pale body and the participants’ illuminated faces create different centers of attention within one demonstration.'},
 provenance:{'leonardo-01':'Here, the documented royal and museum history does not by itself supply every transfer from Leonardo’s possession. Consult the object record for the stages actually supported.','vermeer-01':'Here, the modern auction and museum history must remain separate from an imagined account of the painting’s earlier owners.'}
 };return examples[term]?.[id];
}

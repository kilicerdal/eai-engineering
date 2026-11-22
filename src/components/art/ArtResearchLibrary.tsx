import {Children, Fragment, isValidElement, type ReactNode} from 'react';
import type {ArtPainting} from '@/lib/art/collection';
import ArtResearchStudy from './ArtResearchStudy';
import ArtStudyDossier from './ArtStudyDossier';
import ArtResearchDossier from './ArtResearchDossier';
import ArtDeeperStudy from './ArtDeeperStudy';
import ArtBibliography from './ArtBibliography';
const topicPurposes:Record<string,string>={making:'Support, method and material consequences',history:'Who commissioned, owned and encountered the work',interpretation:'Arguments, alternatives and unresolved evidence',looking:'Visible relationships and purposeful comparisons',evidence:'Technical findings and the limits of reproduction',sources:'Institutional records and attributed scholarship'};
const topics=[['making','Materials and making'],['history','Patronage, ownership and reception'],['interpretation','Interpretations and open questions'],['looking','Looking and comparisons'],['evidence','Conservation and evidence'],['sources','Sources and further reading']] as const;
type Part={title:string;node:ReactNode};
// These four functions are synchronous server-only renderers. Unwrap their
// editorial disclosures here; never evaluate client components or their hooks.
function parts(node:ReactNode):Part[]{return Children.toArray(node).flatMap(n=>{if(!isValidElement<{children?:ReactNode;id?:string}>(n))return [];if(n.type===Fragment)return parts(n.props.children);if(n.type==='details'){const children=Children.toArray(n.props.children),head=children.find(c=>isValidElement(c)&&c.type==='summary');const sections=children.filter(c=>isValidElement<{id?:string}>(c)&&c.type==='section'&&c.props.id?.startsWith('research-'));if(sections.length){const refs=children.filter(c=>isValidElement(c)&&['a','p'].includes(String(c.type)));return sections.map((c,index)=>({title:isValidElement<{children?:ReactNode}>(c)?plain(Children.toArray(c.props.children)[0]):'Research',node:<>{isValidElement<{children?:ReactNode}>(c)?<section id={(c.props as {id?:string}).id}>{Children.toArray(c.props.children).slice(1)}</section>:c}{index===sections.length-1?refs.filter(r=>isValidElement(r)&&r.type==='p'):null}</>}));}return [{title:isValidElement<{children:ReactNode}>(head)?plain(head.props.children):'Further reading',node:<section id={n.props.id}>{children.filter(c=>c!==head)}</section>}];}if(n.type==='section'&&n.props.id?.startsWith('looking-'))return [{title:plain(Children.toArray(n.props.children)[0]),node:n}];if(n.type===ArtStudyDossier)return [];if(typeof n.type!=='string')return [{title:'Browser-read introduction and transcript',node:n}];if(['section','div'].includes(String(n.type)))return parts(n.props.children);return [];});}
function plain(n:ReactNode):string{return Children.toArray(n).map(c=>isValidElement<{children?:ReactNode}>(c)?plain(c.props.children):typeof c==='string'?c:'').join('');}
function topic(title:string){
 const exact:Record<string,string>={
 'The argument, the audience & what remains open':'interpretation',
 'Two readings to hold together':'interpretation',
 'Different voices, different questions':'history',
 'Try it yourself · observation, record, argument':'evidence',
 'What the title tells us':'history',
 'A familiar story, tested':'interpretation',
 'What would change this reading?':'interpretation',
 'A sequence to investigate':'making',
 'Other people in the history':'history',
 'Different moments of reception':'history',
 'Browser-read introduction and transcript':'looking'};
 if(exact[title])return exact[title];
 if(/bibliography|source|supporting reading/i.test(title))return 'sources';
 if(/conservation|evidence ledger|changing surface|drawings, versions/i.test(title))return 'evidence';
 if(/material|making|sequence/i.test(title))return 'making';
 if(/journey|reached|audience|reception|people|circumstances|ownership|patronage/i.test(title))return 'history';
 if(/argument|readings|unsettled|story|change this|unresolved/i.test(title))return 'interpretation';return 'looking';}
export default function ArtResearchLibrary({painting}:{painting:ArtPainting}){const study=ArtResearchStudy({painting});const entries=[...parts(study),...parts(ArtStudyDossier({painting})),...parts(ArtResearchDossier({id:painting.id})).filter(e=>e.title!=='Unresolved questions'),...parts(ArtBibliography({painting}))];
 const deep=ArtDeeperStudy({painting});if(deep){const outer=Children.toArray(deep.props.children).find(n=>isValidElement(n)&&n.type==='details');if(isValidElement<{children:ReactNode}>(outer)){for(const n of Children.toArray(outer.props.children)){if(isValidElement<{children?:ReactNode}>(n)&&n.type===Fragment)entries.push(...parts(n.props.children as ReactNode));else if(isValidElement<{id?:string;children?:ReactNode}>(n)&&n.type==='section')entries.push({title:plain(Children.toArray(n.props.children)[0]),node:n});else if(isValidElement(n)&&typeof n.type!=='string')entries.push({title:'Composition study',node:n});}}}
 return <section id="research" className="art-research-library"><p className="art-kicker">RESEARCH · OPEN ONE TOPIC AT A TIME</p><h2>Follow the evidence.</h2><p>Choose a question below. Historical documentation, visual observations and editorial arguments remain distinguished throughout.</p>{topics.map(([id,title])=>{const items=entries.filter((e,index)=>topic(e.title)===id&&entries.findIndex(other=>other.title===e.title)===index);return <details name="art-research-topics" key={id} id={'study-'+id}><summary><span>{title}</span><small className="art-topic-coverage">{items.length?topicPurposes[id]:'Record and current research limits'}</small></summary>{!items.length&&<p>{id==='making'?`The object record identifies ${painting.medium.toLowerCase()}. A recorded medium does not establish a complete working sequence; consult the essay and institutional record before inferring one.`:id==='history'?`The recorded collection or setting is ${painting.location}. This is not a complete provenance or a promise of current display. Follow the institution’s object history for documented transfers and audiences.`:id==='interpretation'?painting.question:id==='evidence'?'No object-specific conservation investigation is reproduced in this topic. The digital image alone cannot establish pigments, underdrawing or the dates of revisions. Consult the institutional object resources for technical findings.':'Begin with the essay and the original object record.'} <a href={painting.sources[0]?.url??painting.imageSource} target="_blank" rel="noreferrer">Institutional record ↗</a></p>}{items.map((e,i)=><section className="art-research-entry" key={i}><h3 id={e.title==='What remains unsettled?'?'research-unresolved':undefined}>{e.title}</h3>{e.node}</section>)}</details>;})}</section>;
}

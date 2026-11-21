import Link from 'next/link';
import {artFacts,factLabels,type ArtFact} from '@/lib/art/facts';
import {artPaintings} from '@/lib/art/collection';

function Entry({fact,returnTo}:{fact:ArtFact;returnTo:string}) {
 const work=fact.relatedWork?artPaintings.find(p=>p.id===fact.relatedWork):undefined;
 return <article className="art-fact-entry">
  <p className="art-kicker">{fact.category}</p>
  <details id={fact.id}>
   <summary><span>{fact.title}</span><small>{factLabels[fact.kind]}</small></summary>
   <p>{fact.text}</p>
   <aside><strong>Why it matters</strong><p>{fact.why}</p></aside>
   {work&&<p><Link className="art-fact-work" href={'/study/art/painting/'+work.id}>Continue with {work.title} →</Link></p>}
   <p className="art-fact-source"><a href={fact.source.url} target="_blank" rel="noreferrer" aria-label={fact.source.title+' · external source, opens in a new tab'}>{fact.source.title} ↗</a></p>
   <details className="art-fact-evidence"><summary>Evidence & limits</summary>
    {fact.evidenceNote&&<p>{fact.evidenceNote}</p>}
    {fact.source.scope&&<p>{fact.source.scope}</p>}
    {fact.kind!=='documented'&&<p>{fact.kind==='observation'?'The arrangement can be examined in the image. Its proposed significance is an editorial reading.':'This entry identifies an evidential limit; it does not establish an undocumented event or identity.'}</p>}
    <p>Editorial review: {fact.editorialReviewed}. This records comparison with the collection’s cited research, rather than independent specialist verification of every claim.</p>
   </details>
   <p className="art-small"><a className="art-fact-return" href={returnTo}>Return to the full study →</a></p>
  </details>
 </article>;
}

export default function ArtFacts({id,kind}:{id:string;kind:'painters'|'paintings'}) {
 const entries=artFacts[kind][id];if(!entries?.length)return null;
 const returnTo=kind==='painters'?'#biography':'#essay';
 return <section id="facts" className="art-facts" aria-label={kind==='painters'?'Facts about the painter':'Facts about this painting'}>
  <header><p className="art-kicker">ANOTHER WAY INTO THE {kind==='painters'?'CAREER':'PAINTING'}</p><h2>Details that change the encounter.</h2><p>Choose a detail to explore. Each entry distinguishes historical context, visible evidence or an open question from our explanation of why it matters.</p></header>
  <div className="art-facts-grid">{entries.slice(0,3).map(f=><Entry key={f.id} fact={f} returnTo={returnTo}/>)}</div>
  <details className="art-facts-more"><summary>More to discover · {entries.length-3} further entries</summary><div className="art-facts-grid">{entries.slice(3).map(f=><Entry key={f.id} fact={f} returnTo={returnTo}/>)}</div></details>
  <p className="art-small"><Link href="/study/art/sources">Sources, evidence standards & corrections →</Link> · The full study develops the argument behind these shorter encounters.</p>
 </section>;
}

import Link from 'next/link';
import {stories,references,type Collection,type Story} from '@/lib/knowledge/stories';
import {readingMinutes,storyHref,storyReferences} from '@/lib/knowledge/story-utils';
import ScientificFigure from './ScientificFigure';
import NobelCollectionTools from './NobelCollectionTools';

export default function CollectionEntrance({collection}:{collection:Collection}){
  const discovery=collection==='discoveries';
  const selected=stories.filter(s=>s.collection===collection);
  const card=(s:Story,i:number)=><article className="knowledge-story-card" key={s.slug}>
    <Link className="knowledge-card-visual" href={storyHref(s)} aria-label={'Read '+s.name}><ScientificFigure kind={s.visual} compact/></Link>
    <div className="knowledge-card-copy"><p className="knowledge-kicker">{String(i+1).padStart(2,'0')} / {s.topic}</p>
      <h3><Link href={storyHref(s)}>{s.title} <span aria-hidden="true">↗</span></Link></h3>
      <p>{s.dek}</p><div className="knowledge-card-meta"><span>{s.period}</span><span>About {readingMinutes(s)} min</span></div>
      <Link className="knowledge-text-link" href={storyHref(s)}>Read {discovery?'the investigation':'the prize story'} →</Link>
    </div>
  </article>;
  return <>
    <header className="knowledge-entrance"><div className="knowledge-entrance-heading">
      <p className="knowledge-kicker">{discovery?'THE CURIOSITY ROOM / GREAT DISCOVERIES':'THE LEARNING STUDIO / NOBEL STORIES'}</p>
      <h1>{discovery?<>The moment<br/>the world <em>changes.</em></>:<>Behind the prize,<br/><em>an extraordinary story.</em></>}</h1>
      <p className="knowledge-dek">{discovery?'An unexpected observation. A difficult question. Evidence that changes what we think we know.':'Who received it. What the work established. Why the recognition mattered—and whose contributions extend beyond the citation.'}</p>
      <a className="knowledge-primary" href="#opening-stories">Explore the stories <span aria-hidden="true">↓</span></a>
      <p className="knowledge-small">{selected.length} researched {discovery?'investigations':'award histories'} · Across {discovery?'science and history':'five Nobel categories + Economic Sciences'} · Read at your own pace</p>
    </div><div className="knowledge-entrance-art">{discovery?<ScientificFigure kind="penicillin"/>:<div className="knowledge-award-poster" aria-label="Eighteen award histories across five Nobel Prize categories and Economic Sciences"><p>IDEAS / EVIDENCE / RECOGNITION</p><div><span>{selected.length}</span><p>AWARD HISTORIES<br/><strong>Six fields · Eighteen stories</strong></p></div><p>THE ACHIEVEMENT IS LARGER THAN THE MOMENT OF RECOGNITION.</p></div>}</div></header>
    <section className="knowledge-opening" id="opening-stories" aria-labelledby="opening-title">
      <div className="knowledge-section-heading"><div><p className="knowledge-kicker">THE COLLECTION</p><h2 id="opening-title">{discovery?'Follow the evidence across disciplines.':'Read the achievement behind the award.'}</h2></div>
        <p>{discovery?'Follow the observation, the people and the work needed to turn a promising idea into a reliable claim.':'Move across five Nobel categories and Economic Sciences, with different kinds of achievement. Each study pairs the official award record with historical context, named contributors, evidence and the questions that remain.'}</p>
      </div>
      {discovery?<div className="knowledge-story-grid">{selected.map(card)}</div>:<NobelCollectionTools stories={selected.map(story=>({...story,sourceTitles:storyReferences(story).map(id=>references[id]?.title||'')}))} processLinks={{selection:references['nobel-selection-process'].url,statutes:references['nobel-foundation-statutes'].url}}/>}
    </section>
    <section className="knowledge-approach"><p className="knowledge-kicker">A WAY OF READING</p><h2>{discovery?'Begin with wonder. Stay for the explanation.':'Recognition is an entrance into the work.'}</h2>
      <div className="knowledge-approach-grid"><article><span>01</span><h3>{discovery?'The question':'The official record'}</h3><p>{discovery?'What seemed surprising, and which earlier assumptions made it difficult to explain?':'Identify the recipients, award year and motivation before interpreting their significance.'}</p></article><article><span>02</span><h3>{discovery?'The investigation':'The wider achievement'}</h3><p>{discovery?'Follow the people, methods, measurements and practical obstacles that shaped the answer.':'Trace the work across collaborators, institutions and the ideas that made the recognized advance possible.'}</p></article><article><span>03</span><h3>The evidence and its limits</h3><p>Separate what the sources establish from what historians interpret, and ask what the award citation leaves outside its frame.</p></article></div>
      {!discovery&&<p className="knowledge-scope">The Economic Sciences award is formally the Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel. It was established in 1968 by Sveriges Riksbank and is administered alongside the Nobel Prizes. <a href={references['nobel-facts'].url} target="_blank" rel="noreferrer">Official prize context ↗</a></p>}
      {!discovery&&<aside className="knowledge-selection-note"><p className="knowledge-kicker">WHY THESE STORIES</p><h3>A collection to explore, not a ranking of importance.</h3><p>These eighteen studies were selected to show different kinds of recognized work and to make the gap between an official citation and a fuller history visible. They are an opening selection, not a representative survey of every era, region, discipline or contributor; that scope should be widened carefully as the collection grows.</p></aside>}
    </section>
    <aside className="knowledge-bridge"><div><p className="knowledge-kicker">{discovery?'FOLLOW THE RECOGNITION':'UNDERSTAND THE DISCOVERY'}</p><h2>{discovery?'What happened after the breakthrough?':'What made the achievement possible?'}</h2><p>{discovery?'The Nobel companions examine how these achievements were recognised and why the recipients’ names tell only part of the story.':'The discovery companions explain the experimental puzzle, the scientific reasoning and the evidence in greater depth.'}</p></div><Link className="knowledge-primary" href={discovery?'/study/nobel':'/study/curiosity/discoveries'}>Explore {discovery?'Nobel Stories':'Great Discoveries'} →</Link></aside>
    <p className="knowledge-editorial-note">Original dAI editorial accounts with claim-specific references. {discovery?'The existing Curiosity Room remains available for shorter discoveries.':'Independent editorial collection; official award records are linked in each story.'} The diagrams are original explanatory illustrations.</p>
  </>;
}

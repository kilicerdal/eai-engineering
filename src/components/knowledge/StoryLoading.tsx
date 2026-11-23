import './knowledge.css';

export default function StoryLoading({collection}:{collection:'discoveries'|'nobel'}){
  return <div className={`knowledge-room knowledge-${collection}`}><main className="knowledge-loading" aria-busy="true"><p className="knowledge-kicker">{collection==='discoveries'?'GREAT DISCOVERIES':'NOBEL STORIES'}</p><h1>Opening the story…</h1><p role="status">Preparing the reading guide, evidence and sources.</p></main></div>;
}

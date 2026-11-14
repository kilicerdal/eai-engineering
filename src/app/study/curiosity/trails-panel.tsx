import {discoveryTrails} from './trails';
export function TrailsPanel({current,onStart,onClose}:{current?:string;onStart:(id:string)=>void;onClose:()=>void}){
 return <section className="curiosity-reading-panel curiosity-trails-panel" id="curiosity-trails" aria-label="Discovery trails">
  <div className="curiosity-panel-heading"><h2>Follow a thread of wonder.</h2><button aria-label="Close discovery trails" onClick={onClose}>×</button></div>
  <p>Five discoveries, one connecting idea. Follow them in order at your own pace. Your place is saved through Resume.</p>
  <div className="curiosity-trail-choices">{discoveryTrails.map(trail=><button key={trail.id} aria-pressed={current===trail.id} onClick={()=>onStart(trail.id)}><strong>{trail.title}</strong><span>{trail.description}</span><small>{current===trail.id?'Restart this trail':'Start trail'} · 5 discoveries →</small></button>)}</div>
  <p>You can leave at any time. Your saves, collections, and interests stay with you.</p>
 </section>;
}

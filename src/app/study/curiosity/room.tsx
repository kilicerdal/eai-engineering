'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { facts } from './facts';

const categories = ['All discoveries', ...new Set(facts.map(fact => fact.category))];
const questions = [
  'Can a memory test teach you something?', 'Could a break help an idea stick?', 'Can a simple sketch help you remember?', 'Do revision gaps have to keep growing?',
  'Who built monuments before powered machines?', 'What stories can a stone tell?', 'How did one stone help unlock a language?', 'How far would you move a giant stone?', 'Could you predict an eclipse with gears?',
  'Can a planet’s spin last longer than its year?', 'Is the closest planet always the hottest?', 'How old is the sunlight reaching you?', 'Does the Moon actually rotate?', 'Could you stand on the Sun’s surface?',
  'What animal has three working hearts?', 'Could you taste with your arms?', 'What if your skin could change its pattern?', 'Can a dance give directions?',
  'Can a shape have only one side?', 'Is there a largest prime number?', 'What does weaving have to do with code?', 'Could a loom inspire a computer?', 'Can concrete help repair itself?', 'What tiny invention helped change everything?',
];
const scenes: Record<string,string> = { Learning:'02-study-v1.webp', 'Ancient ingenuity':'01-academy-v1.webp', Space:'04-observatory-v1.webp', Nature:'04-observatory-v1.webp', 'Patterns & invention':'03-library-v1.webp' };
export default function CuriosityRoom() {
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [more, setMore] = useState(false);
  const feed = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = feed.current;
    const preventPageScroll = (event: WheelEvent) => {
      if (!(event.target as HTMLElement).closest('.curiosity-extra,input,select') && !event.ctrlKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) event.preventDefault();
    };
    element?.addEventListener('wheel', preventPageScroll, { passive: false });
    return () => element?.removeEventListener('wheel', preventPageScroll);
  }, []);
  const touch = useRef<{x:number;y:number}|null>(null);
  const gesture = useRef({ amount:0, last:0, changed:0 });
  const visible = facts.filter(fact => (category === categories[0] || fact.category === category) && `${fact.title} ${fact.text} ${fact.category}`.toLowerCase().includes(query.toLowerCase().trim()));
  const currentIndex = Math.min(index, Math.max(0, visible.length - 1));
  const selected = visible[currentIndex];
  function go(next:number) {
    if (next < 0 || next >= visible.length || next === currentIndex) return;
    setIndex(next); setRevealed(false); setMore(false);
  }
  function reset() { setIndex(0); setRevealed(false); setMore(false); }
  function surprise() {
    if(visible.length < 2) return;
    go((currentIndex + 1 + Math.floor(Math.random() * (visible.length - 1))) % visible.length);
  }
  return <main ref={feed} className="curiosity-feed" id="discoveries" tabIndex={0} aria-label="Curiosity discovery feed"
    style={{backgroundImage:`linear-gradient(90deg,rgba(5,17,29,.88),rgba(5,17,29,.55)),url('/images/study/${scenes[selected?.category] || '04-observatory-v1.webp'}')`}}
    onKeyDown={event => {
      if((event.target as HTMLElement).closest('button,a,input,select,summary,textarea')) return;
      if(event.key === 'ArrowDown' || event.key === 'PageDown') {event.preventDefault();go(currentIndex+1);}
      if(event.key === 'ArrowUp' || event.key === 'PageUp') {event.preventDefault();go(currentIndex-1);}
    }}
    onWheel={event => {
      if((event.target as HTMLElement).closest('.curiosity-extra, input, select') || Math.abs(event.deltaX)>Math.abs(event.deltaY) || event.ctrlKey) return;
      const now = Date.now(), tracker = gesture.current;
      if(now - tracker.changed < 850) {tracker.last=now;return;}
      if(now-tracker.last>180 || Math.sign(event.deltaY)!==Math.sign(tracker.amount)) tracker.amount=0;
      tracker.last=now;tracker.amount+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?400:1);
      if(Math.abs(tracker.amount)>65) {go(currentIndex+(tracker.amount>0?1:-1));tracker.amount=0;tracker.changed=now;}
    }}
    onTouchStart={event => {if(event.touches.length===1 && !(event.target as HTMLElement).closest('.curiosity-extra,input,select,button,a'))touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};else touch.current=null;}}
    onTouchEnd={event => {if(!touch.current)return;const dx=touch.current.x-event.changedTouches[0].clientX,dy=touch.current.y-event.changedTouches[0].clientY;if(Math.abs(dy)>65 && Math.abs(dy)>Math.abs(dx)*1.3)go(currentIndex+(dy>0?1:-1));touch.current=null;}}
    onTouchCancel={()=>{touch.current=null;}}>
    <div className="curiosity-feed-top"><div><Link href="/study" className="curiosity-back">← Studio</Link><h1>The Curiosity Room</h1></div><span className="curiosity-trial">24 SOURCED DISCOVERIES</span></div>
    <div className="curiosity-feed-tools"><label><span>Choose a topic</span><select value={category} onChange={event=>{setCategory(event.target.value);reset();}}>{categories.map(item=><option key={item}>{item}</option>)}</select></label><label className="curiosity-feed-search"><span>Find a discovery</span><input type="search" placeholder="Moon, memory, ancient…" value={query} onChange={event=>{setQuery(event.target.value);reset();}} /></label><button className="curiosity-shuffle" onClick={surprise} disabled={visible.length<2}>Surprise me ✧</button></div>
    {selected ? <>
      <article className="curiosity-slide" key={facts.indexOf(selected)} aria-live="polite" aria-atomic="true">
        <p className="curiosity-kicker">{selected.category} <span>·</span> A LITTLE WONDER GOES A LONG WAY</p>
        <h2>{questions[facts.indexOf(selected)]}</h2>
        {!revealed ? <><p className="curiosity-tease">Take a guess. Then discover the story.</p><button className="curiosity-reveal" onClick={()=>setRevealed(true)}>Reveal the fact <span aria-hidden="true">✧</span></button></> : <div className="curiosity-answer"><h3>{selected.title}</h3><p>{selected.text}</p><button className="curiosity-more" aria-expanded={more} aria-controls="curiosity-extra" onClick={()=>setMore(!more)}>{more?'Close exploration −':'Try a thought experiment +'}</button>{more && <div className="curiosity-extra" id="curiosity-extra" tabIndex={0}><p>{selected.explore}</p></div>}</div>}
        <a className="curiosity-citation" href={selected.url} target="_blank" rel="noopener noreferrer">Source: {selected.source} ↗</a>
      </article>
      <footer className="curiosity-feed-bottom"><div className="curiosity-progress"><span role="status">{currentIndex+1} <span>of {visible.length}</span></span><progress aria-label="Discovery position" value={currentIndex+1} max={visible.length} /><small>{currentIndex===visible.length-1?'You’ve reached the end of this collection.':'Swipe up · scroll down · or use ↓'}</small></div><div className="curiosity-step-buttons"><button aria-label="Previous discovery" onClick={()=>go(currentIndex-1)} disabled={currentIndex===0}>↑ <span>Previous</span></button>{currentIndex===visible.length-1?<button className="curiosity-next" onClick={reset}>Start again ↺</button>:<button className="curiosity-next" onClick={()=>go(currentIndex+1)}>Next discovery ↓</button>}</div></footer>
    </> : <div className="curiosity-no-results"><h2>A different question might open a door.</h2><p>No discoveries match. Try another word or topic.</p><button className="curiosity-reveal" onClick={()=>{setCategory(categories[0]);setQuery('');reset();}}>Show all discoveries</button></div>}
  </main>;
}

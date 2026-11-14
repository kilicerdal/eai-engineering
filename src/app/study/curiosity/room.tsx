'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { facts } from './facts';
import { discoveryQuestion, insights, relatedDiscoveries } from './insights';
import { INTERESTS_KEY, parseInterests, personalOrder, readInterests, topics, type Interest, type TopicPreferences } from './interests';
import { dailyFacts, discoveryLink, guesses, localDay } from './journey';
import { markRead, parseSeen, readReading, readingOrder, surprisePool, unreadSurprisePool, READING_KEY, SEEN_KEY, type ReadingPreferences } from './reading';

import {plainSightFacts} from './hidden-in-plain-sight';
import {BackupPanel} from './backup-panel';
import type {Snapshot} from './backup';
import {CollectionPanel} from './collection-panel';
import {ShareCardPanel} from './share-card-panel';
import {COLLECTIONS_KEY,readCollections,parseCollections,createCollection,renameCollection,deleteCollection,putInCollection,type PersonalCollection} from './collections';
import { readArrivals } from './arrivals';
import { ConcernReport } from './concern-report';
import { sourceDetails } from './provenance';

import { categories, discoveries, initialView, normalizeView, parseSaved, readMemory, RESUME_KEY, SAVED_KEY, type View } from './memory';


function canScrollDiscovery(target: HTMLElement, direction: number) {
  const card = target.closest<HTMLElement>('.curiosity-slide');
  if (!card || card.scrollHeight <= card.clientHeight + 2) return false;
  return direction < 0 ? card.scrollTop > 1 : card.scrollTop + card.clientHeight < card.scrollHeight - 2;
}

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const scenes: Record<string,string> = { Learning:'02-study-v1.webp', 'Food & Drink':'03-library-v1.webp', 'Earth & Weather':'04-observatory-v1.webp', 'Computing & AI':'03-library-v1.webp', 'Ancient ingenuity':'01-academy-v1.webp', Space:'04-observatory-v1.webp', Nature:'04-observatory-v1.webp', 'Patterns & invention':'03-library-v1.webp' };
export default function CuriosityRoom() {
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  return hydrated ? <RememberedRoom /> : <main className="curiosity-feed" aria-busy="true"><p className="curiosity-loading">Opening the Curiosity Room…</p></main>;
}

function RememberedRoom() {
  const [arrivals] = useState(()=>readArrivals(facts.map(fact=>fact.id),plainSightFacts.map(fact=>fact.id)));
  const [collections,setCollections]=useState(readCollections);
  const collectionSessionOnly=useRef(!!collections.warning);
  const [backupOpen,setBackupOpen]=useState(false);
  const backupToggle=useRef<HTMLButtonElement>(null);
  function closeBackup(){setBackupOpen(false);backupToggle.current?.focus();}
  const [collectionsOpen,setCollectionsOpen]=useState(false);
  const collectionsToggle=useRef<HTMLButtonElement>(null);
  const [removedCollection,setRemovedCollection]=useState<PersonalCollection|null>(null);
  const [memory, setMemory] = useState(()=>readMemory(arrivals.ids,collections.items));
  const [reading, setReading] = useState(readReading);
  const [interests, setInterests] = useState(readInterests);
  const [interestsOpen, setInterestsOpen] = useState(false);
  const interestsToggle = useRef<HTMLButtonElement>(null);
  function closeInterests() {setInterestsOpen(false);interestsToggle.current?.focus();}
  const [sessionSeen, setSessionSeen] = useState(() => reading.seen);
  const [anchor, setAnchor] = useState(() => memory.view.factId);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const slide = useRef<HTMLElement>(null);
  const readingToggle = useRef<HTMLButtonElement>(null);
  function closeReadingOptions() {setOptionsOpen(false);readingToggle.current?.focus();}
  function storeInterests(next: TopicPreferences, message: string) {
    let warning = '';
    try { localStorage.setItem(INTERESTS_KEY,JSON.stringify({version:1,topics:next})); }
    catch { warning = 'Topic preferences apply for this visit only. Browser saving is unavailable.'; }
    setAnchor(view.factId);setSessionSeen(reading.seen);
    setInterests({topics:next,warning});setNotice(message);
  }
  function rateTopic(topic: string, value: Interest | undefined, toggle = false) {
    if (!topics.includes(topic)) return;
    let latest = interests.topics;
    try {const raw = localStorage.getItem(INTERESTS_KEY);if(raw !== null && !interests.warning) latest = parseInterests(raw);} catch { /* Session preferences remain usable. */ }
    const next = {...latest};
    const choice = toggle && latest[topic] === value ? undefined : value;
    if(choice) next[topic] = choice; else delete next[topic];
    storeInterests(next,choice === 'more' ? `More ${topic} in your mix. Other topics still appear.` : choice === 'less' ? `Less ${topic} in your mix. You can still find it through its topic filter.` : `${topic} is back to a balanced mix.`);
  }
  function updatePreferences(patch: Partial<ReadingPreferences>) {
    const preferences = { ...reading.preferences, ...patch };
    let warning = reading.warning;
    try { localStorage.setItem(READING_KEY, JSON.stringify({version:1,preferences})); }
    catch { warning = 'Reading options apply for this visit only. Browser saving is unavailable.'; }
    if ('unreadFirst' in patch) {setSessionSeen(reading.seen);setAnchor(view.factId);}
    setReading(previous=>({...previous,preferences,warning}));
    if ('focus' in patch) {setBackupOpen(false);setCollectionsOpen(false);setShowBrowse(false);setOptionsOpen(false);setInterestsOpen(false);}
  }
  function recordReveal(id: string) {
    let latest = reading.seen, warning = reading.warning;
    try { const raw = localStorage.getItem(SEEN_KEY); if(raw !== null) latest = parseSeen(raw); } catch { /* Session history still works. */ }
    const seen = markRead(latest, id);
    try { localStorage.setItem(SEEN_KEY, JSON.stringify({version:1,ids:seen})); }
    catch { warning = 'Read history applies for this visit only. Browser saving is unavailable.'; }
    setReading(previous=>({...previous,seen,warning}));
  }
  const { view, saved, warning, restored } = memory;
  const { category, query, revealed, savedOnly } = view;
  const [more, setMore] = useState(false);
  const [notice, setNotice] = useState('');
  const [guess, setGuess] = useState<{id:string;choice:number}|null>(null);
  const [copyFallback, setCopyFallback] = useState('');
  function remember(next: View, nextSaved = saved) {
    let normalized = normalizeView(next, nextSaved);
    if (!next.factId && !next.daily && !next.savedOnly && !next.personalId) {
      const first = personalOrder(discoveries(next,nextSaved),next.category === categories[0] && !next.query ? interests.topics : {},reading.seen,reading.preferences.unreadFirst)[0];
      normalized = {...normalized,factId:first?.id || '',revealed:false};
      setSessionSeen(reading.seen);setAnchor('');
    }
    if(normalized.revealed && normalized.factId) recordReveal(normalized.factId);
    let issue = warning;
    // Keep the last meaningful place when a search or an empty Saved view has no result.
    if (normalized.factId) {
      try { localStorage.setItem(RESUME_KEY, JSON.stringify({ version: 1, view: normalized })); }
      catch { issue = 'Your place cannot be saved in this browser right now. You can still explore.'; }
    }
    const url = new URL(window.location.href);
    if (url.searchParams.has('fact')) {
      if (normalized.factId && !normalized.daily && !normalized.savedOnly && !normalized.query && normalized.category === categories[0]) url.searchParams.set('fact', normalized.factId);
      else url.searchParams.delete('fact');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    setCopyFallback('');
    setMemory({ saved: nextSaved, view: normalized, warning: issue, restored: false });
  }
  function applyRestored(data:Snapshot,place:boolean){
    let next=place && data.resume?data.resume:view;
    if(next.personalId){const item=data.collections.find(item=>item.id===next.personalId);if(item)next={...next,personalName:item.name,personalIds:item.ids};}
    next=normalizeView(next,data.saved);
    setMemory({view:next,saved:data.saved,warning:'',restored:false});
    setCollections({items:data.collections,warning:''});collectionSessionOnly.current=false;
    setReading({seen:data.seen,preferences:data.reading,warning:''});
    setInterests({topics:data.topics,warning:''});setSessionSeen(data.seen);setAnchor(next.factId);setMore(false);
    if(place && data.resume){const url=new URL(window.location.href);if(url.searchParams.has('fact')){url.searchParams.delete('fact');window.history.replaceState(null,'',url.pathname+url.search+url.hash);}}
    setNotice('Backup merged. Existing saves and collections kept.');
  }
  function startOver() {
    setAnchor('');setSessionSeen(reading.seen);
    setMore(false); setNotice('Back at the first discovery. Saved discoveries kept.');
    remember(initialView);
  }
  function toggleSaved() {
    if (!selected) return;
    let latest = saved, issue = '';
    try { const raw = localStorage.getItem(SAVED_KEY); latest = raw === null ? saved : parseSaved(raw); }
    catch { /* Keep session favorites if browser storage is unavailable. */ }
    const removing = latest.includes(selected.id);
    const nextSaved = removing ? latest.filter(id => id !== selected.id) : [...latest, selected.id];
    try { localStorage.setItem(SAVED_KEY, JSON.stringify({ version: 1, ids: nextSaved })); }
    catch { issue = 'This change is kept for this visit only. Browser saving is unavailable.'; }
    const nextList = discoveries(view, nextSaved);
    const nextId = nextList.some(fact => fact.id === selected.id) ? selected.id : nextList[Math.min(currentIndex, nextList.length - 1)]?.id || '';
    setNotice(issue || (removing ? 'Removed from saved discoveries.' : 'Discovery saved in this browser.'));
    setMore(false);
    remember({ ...view, factId: nextId, revealed: nextId === selected.id && revealed }, nextSaved);
    if (issue) setMemory(previous => ({ ...previous, warning: issue }));
  }
  const feed = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = feed.current;
    const preventPageScroll = (event: WheelEvent) => {
      if (!(event.target as HTMLElement).closest('.curiosity-extra,input,select,textarea,.curiosity-concern,.curiosity-share-card,.curiosity-reading-panel') && !canScrollDiscovery(event.target as HTMLElement,event.deltaY) && !event.ctrlKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) event.preventDefault();
    };
    element?.addEventListener('wheel', preventPageScroll, { passive: false });
    return () => element?.removeEventListener('wheel', preventPageScroll);
  }, []);
  const touch = useRef<{x:number;y:number}|null>(null);
  const gesture = useRef({ amount:0, last:0, changed:0 });
  const personalized = !view.personalId && !view.daily && !savedOnly && category === categories[0] && !query.trim();
  const visible = personalized ? personalOrder(discoveries(view,saved),interests.topics,sessionSeen,reading.preferences.unreadFirst,anchor) : readingOrder(discoveries(view, saved),sessionSeen,reading.preferences.unreadFirst && !view.personalId && !view.daily && !savedOnly,anchor);
  const currentIndex = Math.max(0, visible.findIndex(fact => fact.id === view.factId));
  const selected = visible[currentIndex];
  const quiz = selected ? guesses[selected.id] : null;
  const provenance = selected ? sourceDetails(selected) : null;
  const context = selected ? insights[selected.id] : null;
  const related = selected ? relatedDiscoveries(selected.id) : [];
  useEffect(()=>{
    const element = slide.current;
    if(!element) return;
    let mounted = true;
    const measure = () => {if(mounted)setScrollable(element.scrollHeight > element.clientHeight + 2);};
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    for(const child of element.children) observer.observe(child);
    queueMicrotask(measure);
    return ()=>{mounted=false;observer.disconnect();};
  },[selected?.id,revealed,more,copyFallback,reading.preferences.focus,reading.preferences.textSize]);
  function updateCollections(change:(items:PersonalCollection[])=>PersonalCollection[],message:string):boolean {
    let latest=collections.items,canWrite=true,issue='';
    try {if(collectionSessionOnly.current)canWrite=false;else latest=parseCollections(localStorage.getItem(COLLECTIONS_KEY));}catch{canWrite=false;collectionSessionOnly.current=true;issue='Collections apply to this visit only. Browser saving is unavailable; existing stored data is untouched.';}
    let next:PersonalCollection[];
    try {next=change(latest);}catch(error){setCollections(previous=>({...previous,warning:error instanceof Error?error.message:'Collection change could not be completed.'}));return false;}
    if(!canWrite && !issue)issue='Collections apply to this visit only. Existing stored data is untouched.';
    if(canWrite)try{localStorage.setItem(COLLECTIONS_KEY,JSON.stringify({version:1,collections:next}));}catch{collectionSessionOnly.current=true;issue='Collections apply to this visit only. Browser saving is unavailable.';}
    setCollections({items:next,warning:issue});setNotice(message);
    if(view.personalId){const item=next.find(item=>item.id===view.personalId);remember(item?{...view,personalName:item.name,personalIds:item.ids}:initialView);}
    return true;
  }
  function undoCollection() {
    const backup=removedCollection;if(!backup)return;
    if(updateCollections(items=>{if(items.some(item=>item.id===backup.id || item.name.toLowerCase()===backup.name.toLowerCase()))throw Error('A collection with that name already exists. Rename it before restoring.');if(items.length>=30)throw Error('Make room before restoring this collection.');return [...items,backup];},'Collection restored.'))setRemovedCollection(null);
  }
  function todaysFive() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, daily: true, dailyDate: localDay(), dailyIds: dailyFacts(localDay()).map(fact => fact.id), factId: '' });
    setMore(false); setNotice('Five discoveries across five topics. No score, no rush.');
  }
  async function shareDiscovery() {
    if (!selected) return;
    const link = discoveryLink(window.location.origin, selected.id);
    try { await navigator.clipboard.writeText(link); setNotice('Discovery link copied.'); setCopyFallback(''); }
    catch { setCopyFallback(link); setNotice('Select and copy the discovery link below.'); }
  }
  function go(next: number) {
    if (next < 0 || next >= visible.length || next === currentIndex) return;
    remember({ ...view, factId: visible[next].id, revealed: false });
    setMore(false); setNotice('');
  }
  function followRelated(id: string) {
    if (!selected || !related.some(fact => fact.id === id)) return;
    setAnchor(id);setSessionSeen(reading.seen);
    remember({ ...initialView, factId: id, revealed: false });
    setMore(false);setNotice('Following a related discovery in Explore all.');
    requestAnimationFrame(() => feed.current?.querySelector<HTMLElement>('.curiosity-slide h2')?.focus());
  }
  function surprise() {
    if(visible.length < 2) return;
    const random = window.crypto.getRandomValues(new Uint32Array(1))[0] / 0x100000000;
    const pool = reading.preferences.unreadFirst && !view.daily && !savedOnly ? surprisePool(visible,reading.seen,selected?.id || '') : visible.filter(fact=>fact.id !== selected?.id);
    const choices = personalized && Object.keys(interests.topics).length ? personalOrder(pool,interests.topics,[],false).slice(0,10) : pool;
    if(choices.length) go(visible.findIndex(fact=>fact.id === choices[Math.floor(random*choices.length)].id));
  }
  function surpriseUnread() {
    // Another tab may have revealed a card since this visit began.
    let seen = reading.seen;
    try { const raw = localStorage.getItem(SEEN_KEY); if (raw !== null) seen = [...new Set([...seen, ...parseSeen(raw)])]; } catch { /* Keep usable session history. */ }
    setReading(previous => ({ ...previous, seen }));
    const pool = unreadSurprisePool(visible, seen, selected?.id || '');
    if (!pool.length) {
      setNotice(!selected ? 'This selection has no discoveries. Clear your search or choose another topic.' : !seen.includes(selected.id)
        ? 'You’re on the only unread discovery in this selection. Reveal it, or try another topic or collection.'
        : 'You’ve revealed every discovery in this selection. Try another topic, clear your search, or explore another collection.');
      return;
    }
    const choices = personalized && Object.keys(interests.topics).length ? personalOrder(pool, interests.topics, [], false).slice(0, 10) : pool;
    const random = window.crypto.getRandomValues(new Uint32Array(1))[0] / 0x100000000;
    go(visible.findIndex(fact => fact.id === choices[Math.floor(random * choices.length)].id));
    setNotice('An unread discovery from your current selection.');
  }
  function smallThings() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({...initialView,collection:'small-things',factId:''});
    setMore(false);setNotice('Small Things, Big Surprises · 100 new discoveries.');
  }
  function newSinceVisit() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({...initialView,newOnly:true,newIds:arrivals.ids,factId:''});
    setMore(false);setNotice(arrivals.warning || (arrivals.kind === 'latest' ? 'Visit history starts here. Showing the latest additions; future visits can show what was added since your previous visit in this browser.' : `${arrivals.ids.length} discoveries added since your previous visit in this browser. This selection stays fixed while you explore.`));
  }
  function yourWorld() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, collection: 'your-world', factId: '' });
    setMore(false);setNotice('Your World · 100 new discoveries hiding in familiar things.');
  }
  function hiddenConnections() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, collection: 'hidden-connections', factId: '' });
    setMore(false);setNotice('Hidden Connections · 100 discoveries linking nature, history, and engineering.');
  }
  function everydayWonders() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, collection: 'everyday-wonders', factId: '' });
    setMore(false);setNotice('Everyday Wonders · 100 discoveries hiding in familiar things, each with a source.');
  }
  function soundsMadeUp() {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, collection: 'sounds-made-up', factId: '' });
    setMore(false);setNotice('Sounds made up. Worth discovering. 100 surprises, each with a source.');
  }
  function changeCollection(savedOnly: boolean) {
    setAnchor('');setSessionSeen(reading.seen);
    remember({ ...initialView, savedOnly, factId: '' }); setMore(false); setNotice('');
  }
  return <main ref={feed} className="curiosity-feed curiosity-v11" data-focus={reading.preferences.focus} data-text-size={reading.preferences.textSize} id="discoveries" tabIndex={0} aria-label="Curiosity discovery feed"
    style={{backgroundImage:`linear-gradient(90deg,rgba(5,17,29,.88),rgba(5,17,29,.55)),url('/images/study/${scenes[selected?.category] || '04-observatory-v1.webp'}')`}}
    onKeyDown={event => {
      if(event.key === 'Escape') {if(backupOpen){closeBackup();}else if(collectionsOpen){setCollectionsOpen(false);collectionsToggle.current?.focus();}else if(interestsOpen)closeInterests();else if(optionsOpen)closeReadingOptions();else if(reading.preferences.focus)updatePreferences({focus:false});return;}
      if((event.target as HTMLElement).closest('button,a,input,select,summary,textarea')) return;
      if(canScrollDiscovery(event.target as HTMLElement,event.key === 'ArrowUp' || event.key === 'PageUp' ? -1 : 1)) return;
      if(event.key === 'ArrowDown' || event.key === 'PageDown') {event.preventDefault();go(currentIndex+1);}
      if(event.key === 'ArrowUp' || event.key === 'PageUp') {event.preventDefault();go(currentIndex-1);}
    }}
    onWheel={event => {
      if((event.target as HTMLElement).closest('.curiosity-extra, input, select, textarea,.curiosity-concern,.curiosity-share-card,.curiosity-reading-panel') || canScrollDiscovery(event.target as HTMLElement,event.deltaY) || Math.abs(event.deltaX)>Math.abs(event.deltaY) || event.ctrlKey) return;
      const now = event.timeStamp, tracker = gesture.current;
      if(now - tracker.changed < 850) {tracker.last=now;return;}
      if(now-tracker.last>180 || Math.sign(event.deltaY)!==Math.sign(tracker.amount)) tracker.amount=0;
      tracker.last=now;tracker.amount+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?400:1);
      if(Math.abs(tracker.amount)>65) {go(currentIndex+(tracker.amount>0?1:-1));tracker.amount=0;tracker.changed=now;}
    }}
    onTouchStart={event => {if(event.touches.length===1 && !(event.target as HTMLElement).closest('.curiosity-extra,input,select,textarea,button,a,.curiosity-concern,.curiosity-share-card,.curiosity-reading-panel,[data-scrollable=true]'))touch.current={x:event.touches[0].clientX,y:event.touches[0].clientY};else touch.current=null;}}
    onTouchEnd={event => {if(!touch.current)return;const dx=touch.current.x-event.changedTouches[0].clientX,dy=touch.current.y-event.changedTouches[0].clientY;if(Math.abs(dy)>65 && Math.abs(dy)>Math.abs(dx)*1.3)go(currentIndex+(dy>0?1:-1));touch.current=null;}}
    onTouchCancel={()=>{touch.current=null;}}>
    <div className="curiosity-feed-top"><div><Link href="/study" className="curiosity-back">← Studio</Link><h1>The Curiosity Room</h1></div><div className="curiosity-reading-actions"><button aria-pressed={reading.preferences.focus} onClick={()=>updatePreferences({focus:!reading.preferences.focus})}>{reading.preferences.focus ? 'Exit Focus' : 'Focus mode'}</button><button ref={readingToggle} aria-expanded={optionsOpen} aria-controls="curiosity-reading-options" onClick={()=>{setBackupOpen(false);setCollectionsOpen(false);setInterestsOpen(false);setOptionsOpen(!optionsOpen);}}>Reading options</button><button ref={interestsToggle} aria-expanded={interestsOpen} aria-controls="curiosity-interests" onClick={()=>{setBackupOpen(false);setCollectionsOpen(false);setOptionsOpen(false);setInterestsOpen(!interestsOpen);}}>Interests</button><button ref={collectionsToggle} aria-expanded={collectionsOpen} onClick={()=>{setBackupOpen(false);setOptionsOpen(false);setInterestsOpen(false);setCollectionsOpen(!collectionsOpen);}}>Collections</button><button ref={backupToggle} aria-label="Backup and restore" aria-expanded={backupOpen} onClick={()=>{setOptionsOpen(false);setInterestsOpen(false);setCollectionsOpen(false);setBackupOpen(!backupOpen);}}>Backup</button>{reading.preferences.focus && <button aria-expanded={showBrowse} aria-controls="curiosity-browse-tools" onClick={()=>setShowBrowse(!showBrowse)}>Browse</button>}</div>{backupOpen && <BackupPanel onClose={closeBackup} onRestored={applyRestored}/>} {optionsOpen && <section className="curiosity-reading-panel" id="curiosity-reading-options" aria-label="Reading options"><div className="curiosity-panel-heading"><h2>Make yourself comfortable.</h2><button aria-label="Close reading options" onClick={closeReadingOptions}>×</button></div><p>Text size</p><div className="curiosity-text-sizes" aria-label="Discovery text size">{(['regular','large','largest'] as const).map(size=><button key={size} aria-pressed={reading.preferences.textSize === size} onClick={()=>updatePreferences({textSize:size})}>{size === 'regular'?'Regular':size === 'large'?'Large':'Largest'}</button>)}</div><label><input type="checkbox" checked={reading.preferences.unreadFirst} onChange={event=>updatePreferences({unreadFirst:event.target.checked})}/> Prefer unread discoveries</label><p>New visits and Surprise me favor answers you haven’t revealed. Today’s 5 and Saved keep their order.</p><p>{reading.seen.length} of {facts.length} discoveries revealed. Options and read history stay in this browser.</p></section>}{interestsOpen && <section className="curiosity-reading-panel curiosity-interests-panel" id="curiosity-interests" aria-label="Your curiosity interests"><div className="curiosity-panel-heading"><h2>Your curiosity.</h2><button aria-label="Close interests" onClick={closeInterests}>×</button></div><p>Choose favorite topics. Other topics will still appear.</p><button className="curiosity-reset-interests" onClick={()=>storeInterests({},'Topic preferences reset. Saved discoveries, Resume, and reading options kept.')}>Reset preferences</button><p>Reset clears topic choices only, keeping saved work and reading settings.</p><div className="curiosity-topic-preferences">{topics.map(topic=><label key={topic}><input type="checkbox" checked={interests.topics[topic] === 'more'} onChange={event=>rateTopic(topic,event.target.checked ? 'more' : undefined)}/><span>{topic}</span>{interests.topics[topic] === 'less' && <small>Less often</small>}</label>)}</div><p>Browser-only preferences. Topic filters, search, Today’s 5 and Saved stay under your control.</p>{interests.warning && <p role="status">{interests.warning}</p>}</section>}{collectionsOpen && <CollectionPanel items={collections.items} fact={selected} warning={collections.warning} onClose={()=>{setCollectionsOpen(false);collectionsToggle.current?.focus();}} onCreate={name=>updateCollections(items=>createCollection(items,window.crypto.randomUUID(),name),'Collection created. Choose discoveries to include.')} onRename={(id,name)=>updateCollections(items=>renameCollection(items,id,name),'Collection renamed.')} onDelete={id=>{setRemovedCollection(collections.items.find(item=>item.id===id)||null);updateCollections(items=>deleteCollection(items,id),'Collection removed. Saved discoveries kept.');}} onMembership={(id,include)=>{if(selected)updateCollections(items=>putInCollection(items,id,selected.id,include),include?'Added to collection.':'Removed from collection. Saved discoveries kept.');}} removedName={removedCollection?.name} onUndo={undoCollection} onOpen={item=>{setAnchor('');setSessionSeen(reading.seen);remember({...initialView,personalId:item.id,personalName:item.name,personalIds:item.ids,factId:''});setCollectionsOpen(false);setShowBrowse(false);setNotice(`Your collection: ${item.name} · ${item.ids.length} discoveries.`);}}/>}</div>
    <div id="curiosity-browse-tools" className="curiosity-browse-tools" hidden={reading.preferences.focus && !showBrowse}><div className="curiosity-feed-tools"><label><span>Choose a topic</span><select value={category} onChange={event=>{remember({ ...view, daily: false, category: event.target.value, factId: '', revealed: false });setMore(false);setNotice('');}}>{categories.map(item=><option key={item}>{item}</option>)}</select></label><label className="curiosity-feed-search"><span>Find a discovery</span><input type="search" maxLength={200} placeholder="Try an idea, question, or source…" aria-describedby="curiosity-search-help" value={query} onChange={event=>{remember({ ...view, daily: false, query: event.target.value.slice(0,200), factId: '', revealed: false });setMore(false);setNotice('');}} /><small id="curiosity-search-help">Search questions, facts, why it matters, and sources.</small></label><div className="curiosity-surprises" aria-label="Surprise options"><button className="curiosity-shuffle" onClick={surprise} disabled={visible.length<2}>Surprise me ✧</button><button className="curiosity-shuffle" onClick={surpriseUnread} aria-label="Surprise me · unread only" title="Only answers you haven’t revealed, within your current filters">Unread only ✧</button></div></div>
    <div className="curiosity-personal-bar"><div className="curiosity-collections" aria-label="Discovery collection"><button aria-pressed={!savedOnly && !view.daily && !view.collection && !view.newOnly && !view.personalId} onClick={()=>changeCollection(false)}>Explore all</button><button aria-pressed={view.collection === 'hidden-in-plain-sight'} onClick={()=>{setAnchor('');setSessionSeen(reading.seen);remember({...initialView,collection:'hidden-in-plain-sight',factId:''});setMore(false);setNotice('Hidden in Plain Sight · 100 new discoveries.');}}>Hidden in Plain Sight · New</button><button aria-pressed={view.collection === 'world-worth-wondering'} onClick={()=>{setAnchor('');setSessionSeen(reading.seen);remember({...initialView,collection:'world-worth-wondering',factId:''});setMore(false);setNotice('A World Worth Wondering About · 100 new discoveries.');}}>World of Wonder</button><button aria-pressed={view.collection === 'small-things'} onClick={smallThings}>Small Things</button><button aria-pressed={!!view.newOnly} onClick={newSinceVisit}>New since your last visit ({arrivals.ids.length})</button><button aria-pressed={view.collection === 'your-world'} onClick={yourWorld}>Your World</button><button aria-pressed={view.collection === 'hidden-connections'} onClick={hiddenConnections}>Hidden Connections</button><button aria-pressed={view.collection === 'everyday-wonders'} onClick={everydayWonders}>Everyday Wonders</button><button aria-pressed={view.collection === 'sounds-made-up'} onClick={soundsMadeUp}>Sounds Made Up</button><button aria-pressed={!!view.daily} onClick={todaysFive}>Today’s 5</button><button aria-pressed={savedOnly} onClick={()=>changeCollection(true)}>Saved ({saved.length})</button></div><button className="curiosity-restart" onClick={startOver}>Back to first ↺</button><p className="curiosity-memory-note" role="status">{warning || reading.warning || interests.warning || notice || (restored ? 'Resumed your place · saved in this browser only.' : 'Saves & your place stay in this browser only.')}</p></div></div>
    {reading.preferences.focus && !showBrowse && (warning || reading.warning || interests.warning || notice) && <p className="curiosity-focus-notice" role="status">{warning || reading.warning || interests.warning || notice}</p>}
    {selected ? <>
      <article ref={slide} className="curiosity-slide" data-scrollable={scrollable} tabIndex={scrollable ? 0 : -1} aria-label="Current discovery" key={selected.id} aria-live="polite" aria-atomic="true">
        <p className="curiosity-kicker">{selected.category} <span>·</span> {selected.collection === 'hidden-in-plain-sight' ? 'HIDDEN IN PLAIN SIGHT · NOTICE THE EXTRAORDINARY' : selected.collection === 'world-worth-wondering' ? 'A WORLD WORTH WONDERING ABOUT · FOLLOW THE SURPRISE' : selected.collection === 'small-things' ? 'SMALL THINGS, BIG SURPRISES · LOOK CLOSER' : selected.collection === 'your-world' ? 'YOUR WORLD · STRANGER THAN YOU THINK' : selected.collection === 'hidden-connections' ? 'HIDDEN CONNECTIONS · IDEAS CROSS BOUNDARIES' : selected.collection === 'everyday-wonders' ? 'EVERYDAY WONDERS · LOOK A LITTLE CLOSER' : selected.collection === 'sounds-made-up' ? 'SOUNDS MADE UP · WORTH DISCOVERING' : 'A LITTLE WONDER GOES A LONG WAY'}</p>
        <h2 tabIndex={-1}>{discoveryQuestion(selected)}</h2>
        {!revealed ? <><p className={`curiosity-tease ${quiz ? 'curiosity-quiz-tease' : ''}`}>{quiz ? 'What’s your guess? No scores—just curiosity.' : 'Take a guess. Then discover the story.'}</p><div className={quiz ? "curiosity-guess-row" : "curiosity-reveal-row"}>{quiz && <div className="curiosity-guess-options" aria-label="Make a guess">{quiz.options.map((option,choice)=><button key={option} onClick={()=>{setGuess({id:selected.id,choice});remember({...view,revealed:true});}}>{option}</button>)}</div>}<button className={quiz ? 'curiosity-skip-guess' : 'curiosity-reveal'} onClick={()=>remember({ ...view, revealed: true })}>{quiz ? 'Reveal without guessing' : 'Reveal the fact'} <span aria-hidden="true">✧</span></button></div></> : <div className="curiosity-answer">{quiz && guess?.id === selected.id && <p className="curiosity-guess-feedback">{guess.choice === quiz.correct ? 'You spotted it.' : `A surprising answer: ${quiz.options[quiz.correct]}.`}</p>}<h3>{selected.title}</h3><p>{selected.text}</p><button className="curiosity-more" aria-expanded={more} aria-controls="curiosity-extra" onClick={()=>setMore(!more)}>{more?'Close exploration −':'Try a thought experiment +'}</button>{more && <div className="curiosity-extra" id="curiosity-extra" tabIndex={0}><p>{selected.explore}</p></div>}</div>}
        <div className="curiosity-fact-actions"><button className="curiosity-save" aria-pressed={saved.includes(selected.id)} onClick={toggleSaved}>{saved.includes(selected.id) ? '♥ Saved' : '♡ Save discovery'}</button><Link className="curiosity-ask" href={`/study?curiosity=${selected.id}#ai-assistant`}>Ask dAI ↗</Link><button className="curiosity-share" onClick={shareDiscovery}>Copy link ↗</button><button className="curiosity-share" onClick={()=>{setBackupOpen(false);setOptionsOpen(false);setInterestsOpen(false);setCollectionsOpen(true);}}>Add to collection</button><a className="curiosity-citation" href={selected.url} target="_blank" rel="noopener noreferrer">Source: {selected.source} ↗</a></div>
        <div className="curiosity-depth curiosity-source-details"><details><summary>Source details</summary><dl><div><dt>Publisher / institution</dt><dd>{provenance?.publisher}</dd></div><div><dt>Source</dt><dd><a href={selected.url} target="_blank" rel="noopener noreferrer">{selected.source} ↗</a><small>{provenance?.host}</small></dd></div><div><dt>Source reviewed</dt><dd>{provenance?.reviewedOn ? <time dateTime={provenance?.reviewedOn}>{provenance?.reviewedOn}</time> : 'Review date not recorded for this earlier discovery.'}</dd></div></dl><p className="curiosity-source-note">The review date records our source check, not the source’s publication date. Questions, connections, and thought experiments are editorial.</p></details></div>
        <ShareCardPanel key={`share-${selected.id}`} fact={selected} background={`/images/study/${scenes[selected.category] || '04-observatory-v1.webp'}`}/><ConcernReport key={selected.id} fact={selected}/>
        {revealed && <div className="curiosity-topic-feedback" aria-label={`Tune your ${selected.category} discoveries`}><button aria-pressed={interests.topics[selected.category] === 'more'} onClick={()=>rateTopic(selected.category,'more',true)}>More like this <span aria-hidden="true">↑</span></button><button aria-pressed={interests.topics[selected.category] === 'less'} onClick={()=>rateTopic(selected.category,'less',true)}>Less of this <span aria-hidden="true">↓</span></button><span>{selected.category}</span></div>}
        {revealed && context && <div className="curiosity-depth">
          <details className="curiosity-why"><summary>Why does this matter?</summary><p>{context.why}</p></details>
          <details className="curiosity-related"><summary>Related discoveries <span>2 to explore</span></summary><p className="curiosity-related-note">Follow a connection in Explore all. Your saved discoveries and preferences stay with you.</p><div className="curiosity-related-grid">{related.map(fact => <button key={fact.id} onClick={()=>followRelated(fact.id)}><span>{fact.category}</span><strong>{discoveryQuestion(fact)}</strong><span aria-hidden="true">Explore →</span></button>)}</div></details>
        </div>}
        {copyFallback && <label className="curiosity-copy-fallback">Discovery link<input value={copyFallback} readOnly onFocus={event=>event.target.select()} /></label>}
        {view.daily && currentIndex === visible.length - 1 && revealed && <p className="curiosity-daily-finish">That’s your five for today. Follow any idea further, or keep exploring.</p>}
      </article>
      <footer className="curiosity-feed-bottom"><div className="curiosity-progress"><span role="status">{currentIndex+1} <span>of {visible.length}</span></span><progress aria-label="Discovery position" value={currentIndex+1} max={visible.length} /><small>{view.personalId ? `Collection: ${view.personalName}` : scrollable ? 'Scroll inside the discovery to read more.' : view.daily ? `Today’s five · ${view.dailyDate}` : currentIndex===visible.length-1?'You’ve reached the end of this collection.':'Swipe up · scroll down · or use ↓'}</small></div><div className="curiosity-step-buttons"><button aria-label="Previous discovery" onClick={()=>go(currentIndex-1)} disabled={currentIndex===0}>↑ <span>Previous</span></button>{view.daily && currentIndex===visible.length-1 && revealed ? <button className="curiosity-next" onClick={()=>changeCollection(false)}>Keep exploring →</button> : view.daily && currentIndex===visible.length-1 ? <button className="curiosity-next" onClick={()=>remember({...view,revealed:true})}>Reveal final discovery ✧</button> : currentIndex===visible.length-1?<button className="curiosity-next" onClick={()=>{remember({...view,factId:visible[0].id,revealed:false});setMore(false);setNotice('');}}>Start again ↺</button>:<button className="curiosity-next" onClick={()=>go(currentIndex+1)}>Next discovery ↓</button>}</div></footer>
    </> : <div className="curiosity-no-results"><h2>{view.personalId && !view.personalIds?.length ? 'A place for your next discovery.' : view.newOnly && view.newIds?.length === 0 ? 'You’re up to date.' : savedOnly && saved.length === 0 ? 'Keep a little wonder for later.' : 'A different question might open a door.'}</h2><p>{view.personalId && !view.personalIds?.length ? 'This collection is empty. Explore a discovery, then choose Add to collection.' : view.newOnly && view.newIds?.length === 0 ? 'No discoveries have been added since your previous visit in this browser. You can still explore the full collection.' : savedOnly && saved.length === 0 ? 'Tap Save discovery on a fact you like. You’ll find it here when you return in this browser.' : 'No discoveries match. Try another word or topic.'}</p><button className="curiosity-reveal" onClick={()=>changeCollection(false)}>Show all discoveries</button></div>}
  </main>;
}

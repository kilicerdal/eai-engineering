'use client';

import {useEffect,useState} from 'react';

const STORAGE_KEY='dai-nobel-reading-progress-v1';
const PREF_KEY='dai-nobel-reading-preferences-v1';
type SavedReading={slug:string;title:string;href:string;section:string;sectionTitle:string;percent:number;updatedAt:number};
type ReadingPreferences={size:0|1|2;focus:boolean};
type Props={slug:string;title:string;href:string;sections:{id:string;title:string}[]};
let inMemorySaved:SavedReading|undefined;

function parseSaved(value:string|undefined):SavedReading|undefined{if(!value)return;try{const record=JSON.parse(value) as Partial<SavedReading>;if(typeof record.slug!=='string'||typeof record.title!=='string'||typeof record.href!=='string'||!record.href.startsWith('/study/nobel/'))return;return{slug:record.slug,title:record.title,href:record.href,section:typeof record.section==='string'?record.section:'one-minute',sectionTitle:typeof record.sectionTitle==='string'?record.sectionTitle:'In one minute',percent:typeof record.percent==='number'?Math.max(0,Math.min(100,record.percent)):0,updatedAt:typeof record.updatedAt==='number'?record.updatedAt:0}}catch{return undefined}}
function readSaved():SavedReading|undefined{if(inMemorySaved)return inMemorySaved;try{const local=window.localStorage.getItem(STORAGE_KEY);if(local)return inMemorySaved=parseSaved(local)}catch{/* Continue with the first-party cookie fallback. */}try{const cookie=document.cookie.split('; ').find(part=>part.startsWith('dai_nobel_reading_v1='))?.slice('dai_nobel_reading_v1='.length);return cookie?inMemorySaved=parseSaved(decodeURIComponent(cookie)):undefined}catch{return undefined}}
function writeSaved(value:SavedReading):'local'|'cookie'|'session'{inMemorySaved=value;const serialized=JSON.stringify(value);try{window.localStorage.setItem(STORAGE_KEY,serialized);return'local'}catch{/* Storage may be disabled or full. */}try{const secure=location.protocol==='https:'?'; Secure':'';document.cookie=`dai_nobel_reading_v1=${encodeURIComponent(serialized)}; Path=/study/nobel; Max-Age=15552000; SameSite=Lax${secure}`;return document.cookie.includes('dai_nobel_reading_v1=')?'cookie':'session'}catch{return'session'}}

export function NobelCollectionResume(){
 const [saved,setSaved]=useState<SavedReading>();
 useEffect(()=>{const frame=requestAnimationFrame(()=>setSaved(readSaved()));return()=>cancelAnimationFrame(frame)},[]);
 if(!saved||saved.percent<2)return null;
 return <aside className="nobel-resume" aria-label="Continue reading"><p className="knowledge-kicker">PICK UP WHERE YOU LEFT OFF</p><p><strong>{saved.title}</strong><span>{saved.sectionTitle} · {saved.percent}% read</span></p><a href={`${saved.href}#${saved.section}`}>Continue this story →</a></aside>;
}

export default function NobelReadingTools({slug,title,href,sections}:Props){
 const [progress,setProgress]=useState(0);const [saved,setSaved]=useState<SavedReading>();const [storageStatus,setStorageStatus]=useState<'checking'|'saved'|'session'|'cleared'>('checking');const [preferences,setPreferences]=useState<ReadingPreferences>({size:0,focus:false});
 useEffect(()=>{
  const root=document.querySelector<HTMLElement>('.knowledge-room');
  const preferenceFrame=requestAnimationFrame(()=>{try{const parsed=JSON.parse(localStorage.getItem(PREF_KEY)||'{}') as Partial<ReadingPreferences>;const next:ReadingPreferences={size:parsed.size===1||parsed.size===2?parsed.size:0,focus:Boolean(parsed.focus)};setPreferences(next);root?.setAttribute('data-reading-size',String(next.size));root?.toggleAttribute('data-reading-focus',next.focus)}catch{/* Defaults stay available if local storage is unavailable. */}});
  const article=document.querySelector<HTMLElement>('.knowledge-reading');if(!article)return()=>cancelAnimationFrame(preferenceFrame);const previous=readSaved();
  let pending=0;
  const update=()=>{if(pending)return;pending=requestAnimationFrame(()=>{pending=0;if(window.scrollY<80&&previous?.slug===slug&&previous.percent>=2){setSaved(previous);setProgress(previous.percent);setStorageStatus('saved');return}const rect=article.getBoundingClientRect();const available=Math.max(1,article.scrollHeight-innerHeight*.55);const percent=Math.min(100,Math.max(0,Math.round((innerHeight*.45-rect.top)/available*100)));const active=[...sections].reverse().find(section=>{const element=document.getElementById(section.id);return element&&element.getBoundingClientRect().top<=innerHeight*.35})||sections[0];const record:SavedReading={slug,title,href,section:active?.id||'one-minute',sectionTitle:active?.title||'In one minute',percent,updatedAt:Date.now()};setStorageStatus(writeSaved(record)==='session'?'session':'saved');setSaved(record);setProgress(percent)})};
  const initialFrame=requestAnimationFrame(update);window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);return()=>{cancelAnimationFrame(preferenceFrame);cancelAnimationFrame(initialFrame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);if(pending)cancelAnimationFrame(pending)};
 },[slug,title,href,sections]);
 const setSize=(size:0|1|2)=>{const next={...preferences,size};setPreferences(next);document.querySelector('.knowledge-room')?.setAttribute('data-reading-size',String(size));try{localStorage.setItem(PREF_KEY,JSON.stringify(next))}catch{}}
 const toggleFocus=()=>{const next={...preferences,focus:!preferences.focus};setPreferences(next);document.querySelector('.knowledge-room')?.toggleAttribute('data-reading-focus',next.focus);try{localStorage.setItem(PREF_KEY,JSON.stringify(next))}catch{}}
 const clearSavedPosition=()=>{inMemorySaved=undefined;try{window.localStorage.removeItem(STORAGE_KEY)}catch{}try{document.cookie=`dai_nobel_reading_v1=; Path=/study/nobel; Max-Age=0; SameSite=Lax`}catch{}setSaved(undefined);setProgress(0);setStorageStatus('cleared')}
 const resume=saved?.slug===slug&&saved.percent>=2?saved:undefined;
 return <div className="nobel-reading-tools" aria-label="Reading controls">
  <div className="nobel-reading-progress"><span>Reading progress</span><progress max="100" value={progress} aria-label={`${progress}% of this story read`}/><span>{progress}%</span></div>
  <div className="nobel-reading-actions"><div className="nobel-text-size" role="group" aria-label="Text size"><span>Text size</span><button type="button" onClick={()=>setSize(Math.max(0,preferences.size-1) as 0|1|2)} disabled={preferences.size===0} aria-label="Decrease text size">A−</button><button type="button" onClick={()=>setSize(Math.min(2,preferences.size+1) as 0|1|2)} disabled={preferences.size===2} aria-label="Increase text size">A+</button></div><button type="button" aria-pressed={preferences.focus} onClick={toggleFocus}>{preferences.focus?'Exit focused reading':'Focus reading'}</button><button type="button" onClick={()=>window.print()}>Print this story</button>{resume&&<><a href={`${href}#${resume.section}`}>Resume at “{resume.sectionTitle}” →</a><button type="button" onClick={clearSavedPosition}>Clear saved position</button></>}</div>
  <span className="nobel-reading-saved" aria-live="polite">{storageStatus==='checking'?'Checking browser storage…':storageStatus==='cleared'?'Saved reading position cleared.':storageStatus==='saved'?'Reading progress is saved in this browser only.':'Reading progress is available while this tab stays open; browser storage is unavailable.'}</span>
 </div>
}

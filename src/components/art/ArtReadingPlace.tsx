'use client';
import {useEffect,useRef} from 'react';
import {useArtPersonal} from './useArtPersonal';
export default function ArtReadingPlace({id,prefix,sections}:{id:string;prefix:string;sections:string[]}){
 const {personal,ready,error,notice,update}=useArtPersonal(),last=useRef(''),entry=personal.reading?.[id];
 const signature=sections.join('|');
 useEffect(()=>{if(!ready||error||entry?.completed)return;const names=signature.split('|'),nodes=names.map(s=>document.getElementById(prefix+'-'+s)).filter((e):e is HTMLElement=>!!e);let timer:ReturnType<typeof setTimeout>|undefined;
 const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!visible)return;const section=visible.target.id;if(section===last.current)return;clearTimeout(timer);timer=setTimeout(()=>{last.current=section;update(p=>({...p,reading:{...p.reading,[id]:{section,completed:false}}}),'');},1400);},{rootMargin:'-10% 0px -55% 0px',threshold:0});nodes.forEach(n=>observer.observe(n));return()=>{clearTimeout(timer);observer.disconnect();};},[ready,error,id,prefix,signature,update,entry?.completed]);
 const valid=entry&&sections.some(s=>prefix+'-'+s===entry.section);
 return <div className="art-reading-place"><div className="art-tool-row">{valid&&!entry.completed&&<a href={'#'+entry.section}>Continue from your saved section ↓</a>}<button disabled={!ready||!!error} onClick={()=>update(p=>({...p,reading:{...p.reading,[id]:{section:prefix+'-'+sections[0],completed:!entry?.completed}}}),entry?.completed?'Essay reopened.':'Essay marked as read.')}>{entry?.completed?'Read ✓ · Reopen essay':'Mark essay as read'}</button></div><p className="art-small">Your section is remembered in this browser while you read. Opening a page never moves it automatically. {error||notice}</p></div>;
}

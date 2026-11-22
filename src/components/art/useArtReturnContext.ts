'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {ART_CONTEXT_KEY,artContextLabel,parseArtReturnContext} from '@/lib/art/return-context';
export function useArtReturnContext(){const path=usePathname();useEffect(()=>{
 function remember(event:MouseEvent){if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const element=event.target;if(!(element instanceof Element))return;const link=element.closest<HTMLAnchorElement>('a[href]');if(!link||link.target==='_blank'||link.hasAttribute('download'))return;const next=new URL(link.href,location.href);if(next.origin!==location.origin||next.pathname===path||!/^\/study\/art\/(painting|painter)\/[a-z0-9-]+$/.test(next.pathname))return;
 const anchor=link.closest<HTMLElement>('.art-search-results>li[id],.art-tile[id],.art-painter-card[id],section[id],article[id]');const href=location.pathname+location.search+(anchor?'#'+anchor.id:location.hash);const context={target:next.pathname,href,label:artContextLabel(path)};
 if(parseArtReturnContext(JSON.stringify(context),next.pathname))try{sessionStorage.setItem(ART_CONTEXT_KEY,JSON.stringify(context));}catch{/* Ordinary browser Back remains available. */}
 }
 document.addEventListener('click',remember);return()=>document.removeEventListener('click',remember);
 },[path]);}

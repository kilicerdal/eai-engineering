'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {useComfort} from './useComfort';
import {readingBooks} from '@/lib/study-reading';
import {projectSavedWork,type SavedLink} from '@/lib/your-space';
export default function YourNextStep(){const {data:comfort}=useComfort();const [items,setItems]=useState<SavedLink[]>([]);useEffect(()=>{const refresh=()=>setItems(projectSavedWork(k=>localStorage.getItem(k),readingBooks).recent.slice(0,1));queueMicrotask(refresh);window.addEventListener('focus',refresh);window.addEventListener('storage',refresh);window.addEventListener('dai-browser-save',refresh);return()=>{window.removeEventListener('focus',refresh);window.removeEventListener('storage',refresh);window.removeEventListener('dai-browser-save',refresh);};},[]);if(!items.length)return null;return <section className="continuity-strip signature-resume" aria-label="Continue where you left off"><div><small>YOUR NEXT STEP</small><h2>Continue your work.</h2><p>Pick up one thread. Opening it won’t send a draft or start a new test.</p></div><ul>{items.map(i=><li key={i.id}><span>{i.kind}</span><Link href={i.href}>{comfort.labels[i.id+"|"+i.href]||i.title} →</Link><p>{i.detail}</p></li>)}</ul><Link href="/your-space">Open Your space ↗</Link></section>;}

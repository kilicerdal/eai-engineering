'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {readingBooks} from '@/lib/study-reading';
import {projectSavedWork,type SavedLink} from '@/lib/your-space';
export default function YourNextStep(){const [items,setItems]=useState<SavedLink[]>([]);useEffect(()=>{const refresh=()=>setItems(projectSavedWork(k=>localStorage.getItem(k),readingBooks).recent.slice(0,1));queueMicrotask(refresh);window.addEventListener('focus',refresh);window.addEventListener('storage',refresh);window.addEventListener('dai-browser-save',refresh);return()=>{window.removeEventListener('focus',refresh);window.removeEventListener('storage',refresh);window.removeEventListener('dai-browser-save',refresh);};},[]);if(!items.length)return null;return <section className="continuity-strip" aria-label="Continue where you left off"><div><small>YOUR NEXT STEP</small><h2>Welcome back.</h2><p>Your work is here when you’re ready.</p></div><ul>{items.map(i=><li key={i.id}><span>{i.kind}</span><Link href={i.href}>{i.title} →</Link></li>)}</ul><Link href="/your-space">All your saved work ↗</Link></section>;}

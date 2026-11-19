'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {SHORT_CASE_KEY,restoreShortProgress} from '@/lib/short-experiences';
export default function ShortCaseResume(){
 const [available,setAvailable]=useState(false);
 useEffect(()=>{const read=()=>{try{const p=restoreShortProgress(localStorage.getItem(SHORT_CASE_KEY));setAvailable(!!p&&p.step<2);}catch{setAvailable(false);}};queueMicrotask(read);window.addEventListener('storage',read);window.addEventListener('focus',read);return()=>{window.removeEventListener('storage',read);window.removeEventListener('focus',read);};},[]);
 return available?<p className="short-home-resume"><Link href="/start/two-minutes">Continue your case →</Link></p>:null;
}

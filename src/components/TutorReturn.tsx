'use client';
import {useSyncExternalStore} from 'react';
import Link from 'next/link';
import {TUTOR_RETURN,certificationReturn} from '@/lib/tutor-return';
const subscribe=()=>()=>{};
export default function TutorReturn(){const href=useSyncExternalStore(subscribe,()=>{try{return certificationReturn(sessionStorage.getItem(TUTOR_RETURN));}catch{return null;}},()=>null);return href?<p className="tutor-return"><Link href={href}>← Return to my certification practice</Link><small>Your saved session stays at its current question. Tutor text is not submitted as an answer.</small></p>:null;}

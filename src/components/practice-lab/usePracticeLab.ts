'use client';
import {useState,useSyncExternalStore} from 'react';
import {useWritingStatus} from '@/components/WritingStatus';
import {practiceStore,PRACTICE_LAB_KEY,type PracticeState} from '@/lib/practice-lab-storage';
export function usePracticeLab(){const [store]=useState(()=>practiceStore(()=>window.localStorage,fn=>{const listen=(e:StorageEvent)=>fn(e.key);window.addEventListener('storage',listen);return()=>window.removeEventListener('storage',listen);}));const state=useSyncExternalStore(store.subscribe,store.get,()=>store.server);useWritingStatus(!!state.error,state.error);return {...state,update:(fn:(s:PracticeState)=>PracticeState)=>{const ok=store.update(fn);window.dispatchEvent(new CustomEvent('dai-browser-save',{detail:{key:PRACTICE_LAB_KEY,ok}}));return ok;}};}

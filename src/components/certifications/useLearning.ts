'use client';
import {useSyncExternalStore} from 'react';
import {learningStore,type LearningWork} from '@/lib/certification-learning';
import type {CertId} from '@/lib/certification-content';
const stores=new Map<CertId,ReturnType<typeof learningStore>>();
export function getLearningStore(id:CertId){if(!stores.has(id))stores.set(id,learningStore(id,()=>window.localStorage,f=>{const l=(e:StorageEvent)=>f(e.key);window.addEventListener('storage',l);return()=>window.removeEventListener('storage',l);}));return stores.get(id)!;}
export function useLearning(id:CertId){const store=getLearningStore(id);return {...useSyncExternalStore(store.subscribe,store.get,()=>store.server),update:store.update};}
export function exportLearning(data:LearningWork){const u=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=`eai-${data.track}-learning-notes.json`;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}

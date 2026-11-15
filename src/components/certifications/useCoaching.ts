'use client';
import {useSyncExternalStore} from 'react';
import {coachingStore} from '@/lib/certification-coaching';
import type {CertId} from '@/lib/certification-content';
const stores=new Map<CertId,ReturnType<typeof coachingStore>>();
export function useCoaching(id:CertId){if(!stores.has(id))stores.set(id,coachingStore(id,()=>window.localStorage,f=>{const l=(e:StorageEvent)=>f(e.key);window.addEventListener('storage',l);return()=>window.removeEventListener('storage',l);}));const store=stores.get(id)!;return {...useSyncExternalStore(store.subscribe,store.get,()=>store.server),update:store.update};}

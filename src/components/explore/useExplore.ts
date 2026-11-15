"use client";
import {useState,useSyncExternalStore} from 'react';
import {createExploreStore,exploreServerSnapshot} from '@/lib/explore-storage';
export function useExplore(){
 const [store]=useState(()=>createExploreStore(()=>window.localStorage,changed=>{const listener=(e:StorageEvent)=>changed(e.key,e.newValue);window.addEventListener('storage',listener);return()=>window.removeEventListener('storage',listener)}));
 const snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,()=>exploreServerSnapshot);
 return {...snapshot,update:store.update};
}

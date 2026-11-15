"use client";
import {useState,useSyncExternalStore} from 'react';
import {createLabNotebookStore,labServerSnapshot} from '@/lib/investigation-store';
export function useLabNotebook(){
 const [store]=useState(()=>createLabNotebookStore(()=>window.localStorage,changed=>{const listener=(event:StorageEvent)=>changed(event.key,event.newValue);window.addEventListener('storage',listener);return()=>window.removeEventListener('storage',listener)}));
 const snapshot=useSyncExternalStore(store.subscribe,store.getSnapshot,()=>labServerSnapshot);
 return {...snapshot,update:store.update};
}

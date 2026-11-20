'use client';
import {useCallback,useEffect,useState} from 'react';
import {ART_PERSONAL_KEY,emptyPersonal,parseArtPersonal,type ArtPersonal} from '@/lib/art/personal';
export function useArtPersonal(){
 const [personal,setPersonal]=useState(emptyPersonal),[ready,setReady]=useState(false),[error,setError]=useState(''),[notice,setNotice]=useState('');
 const refresh=useCallback(()=>{try{setPersonal(parseArtPersonal(localStorage.getItem(ART_PERSONAL_KEY)));setError('');}catch(e){setError(e instanceof Error?e.message:'Art Room saving is unavailable.');}setReady(true);},[]);
 useEffect(()=>{queueMicrotask(refresh);function storage(e:StorageEvent){if(e.key===ART_PERSONAL_KEY||e.key===null)refresh();}window.addEventListener('storage',storage);window.addEventListener('dai-art-personal-change',refresh);return()=>{window.removeEventListener('storage',storage);window.removeEventListener('dai-art-personal-change',refresh);};},[refresh]);
 const update=useCallback((change:(p:ArtPersonal)=>ArtPersonal,message='Saved in this browser.')=>{try{const latest=parseArtPersonal(localStorage.getItem(ART_PERSONAL_KEY)),next=parseArtPersonal(JSON.stringify(change(latest)));localStorage.setItem(ART_PERSONAL_KEY,JSON.stringify(next));setPersonal(next);setError('');setNotice(message);window.dispatchEvent(new Event('dai-art-personal-change'));window.dispatchEvent(new CustomEvent('dai-browser-save',{detail:{key:ART_PERSONAL_KEY,ok:true}}));return true;}catch(e){setError(e instanceof Error?e.message:'Saving failed. Your earlier work is unchanged.');return false;}},[]);
 return {personal,ready,error,notice,update};
}

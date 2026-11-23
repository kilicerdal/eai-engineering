'use client';
import {useCallback,useEffect,useState} from 'react';
/** Finder state is public navigation context, never personal writing. */
export function useArtFinderUrl(prefix:string,groups:readonly string[]){
 const [state,setState]=useState({query:'',group:'all'}),[ready,setReady]=useState(false);
 const allowed=groups.join('|');
 useEffect(()=>{const read=()=>{const q=new URLSearchParams(location.search),group=q.get(prefix+'Group')??'all';setState({query:(q.get(prefix+'Query')??'').slice(0,100),group:group==='all'||allowed.split('|').includes(group)?group:'all'});setReady(true);};queueMicrotask(read);window.addEventListener('popstate',read);window.addEventListener('dai-art-finder-change',read);return()=>{window.removeEventListener('popstate',read);window.removeEventListener('dai-art-finder-change',read)}},[prefix,allowed]);
 const change=useCallback((patch:Partial<typeof state>)=>{const next={...state,...patch},url=new URL(location.href);for(const [key,value]of [[prefix+'Query',next.query],[prefix+'Group',next.group]])if(value&&value!=='all')url.searchParams.set(key,value);else url.searchParams.delete(key);history.replaceState(history.state,'',url);setState(next);window.dispatchEvent(new Event('dai-art-finder-change'));},[prefix,state]);
 return {...state,ready,change};
}

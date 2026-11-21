'use client';
import {useEffect,useRef,useState} from 'react';
/** Give looking-tool requests a visible next step without bypassing image preferences. */
export function useArtHiddenImageRequest(id:string,hidden:boolean,revealLabel:string){
 const revealButtonRef=useRef<HTMLButtonElement|null>(null);const [notice,setNotice]=useState('');
 useEffect(()=>{
  function request(event:Event){if(!hidden||(event as CustomEvent<{id:string}>).detail?.id!==id)return;setNotice(`The image is hidden. Choose “${revealLabel}”, then select the looking tool again.`);revealButtonRef.current?.focus();}
  window.addEventListener('dai-art-inspect',request);window.addEventListener('dai-art-highlight',request);
  return()=>{window.removeEventListener('dai-art-inspect',request);window.removeEventListener('dai-art-highlight',request);};
 },[id,hidden,revealLabel]);
 return {revealButtonRef,notice,clearNotice:()=>setNotice('')};
}

'use client';
import {useEffect} from 'react';
import {writingRegistry} from '@/lib/writing-registry';
/** Warn only for writers that explicitly report unsaved work or failed storage. */
export default function NavigationDraftGuard(){
 useEffect(()=>{
  function status(event:Event){const d=(event as CustomEvent).detail;if(typeof d?.id==='string')writingRegistry.update(d.id,d.dirty===true,!!d.error);}
  function click(event:MouseEvent){
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||!writingRegistry.hasPending())return;
   const target=event.target instanceof Element?event.target.closest('a'):null;
   if(!target||target.hasAttribute('download')||target.target==='_blank'||!target.href)return;
   const url=new URL(target.href,location.href);
   if(url.protocol!=='http:'&&url.protocol!=='https:'||url.origin===location.origin&&url.pathname===location.pathname&&url.search===location.search)return;
   if(!window.confirm('Some writing has unsaved changes or saving needs attention. Stay here to copy or download it first. Leave this page anyway?')){event.preventDefault();event.stopPropagation();}
  }
  window.addEventListener('eai-writing-status',status);document.addEventListener('click',click,true);
  document.documentElement.dataset.navigationGuardReady='true';
  return()=>{window.removeEventListener('eai-writing-status',status);document.removeEventListener('click',click,true);delete document.documentElement.dataset.navigationGuardReady;};
 },[]);
 return null;
}

"use client";
import {useCallback,useEffect,useRef,useState,type SetStateAction} from "react";
import {readSavedArray,writeStudyCopy} from "@/lib/study-safe-storage";

/** Save on learner changes only; never write an empty fallback over an unreadable record. */
export function useSavedStudyArray<T>(key:string,normalize:(value:unknown)=>T[],updateEvent?:string){
 const [items,setItems]=useState<T[]>([]),[ready,setReady]=useState(false),[warning,setWarning]=useState("");
 const current=useRef<T[]>([]),saved=useRef<{raw:string|null}|null>(null),unsaved=useRef(false);
 useEffect(()=>{
  let cancelled=false;
  function read(){
   if(cancelled)return;
   if(unsaved.current){setWarning("New work is still open in this tab. Copy it before reloading; the saved copy has not been replaced.");return;}
   try{const value=readSavedArray(localStorage,key,normalize);saved.current={raw:value.raw};current.current=value.items;setItems(value.items);setWarning("");}
   catch{saved.current=null;setWarning("The saved copy could not be read. It has been preserved. New work stays in this tab; copy it before leaving.");}
   setReady(true);
  }
  queueMicrotask(read);
  function changed(event:StorageEvent){if(event.key===key||event.key===null)read();}
  window.addEventListener("storage",changed);
  if(updateEvent)window.addEventListener(updateEvent,read);
  return()=>{cancelled=true;window.removeEventListener("storage",changed);if(updateEvent)window.removeEventListener(updateEvent,read);};
 },[key,normalize,updateEvent]);
 const update=useCallback((action:SetStateAction<T[]>)=>{
  const next=typeof action==="function"?(action as (previous:T[])=>T[])(current.current):action;
  current.current=next;setItems(next);unsaved.current=true;
  try{
   if(!saved.current)throw new Error("Saving is paused because the original saved copy could not be read.");
   if(normalize(next).length!==next.length)throw new Error("This change could not be safely saved.");
   saved.current.raw=writeStudyCopy(localStorage,key,saved.current.raw,next);unsaved.current=false;setWarning("");
   window.dispatchEvent(new Event("eai-study-progress-change"));
  }catch(error){saved.current=null;setWarning(`${error instanceof Error?error.message:"Browser saving is unavailable."} New work stays in this tab; copy it before leaving.`);}
 },[key,normalize]);
 return {items,setItems:update,ready,warning};
}

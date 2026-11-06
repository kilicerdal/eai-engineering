"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { studyAccountClient } from "@/lib/study-account";
import { bindCloud, captureStudy, cloudBinding, pauseCloud, writeCloud } from "@/lib/study-cloud";
import { snapshotSignature } from "@/lib/study-cloud-snapshot";
export default function StudyCloudBridge() {
  const [message,setMessage]=useState("");
  const [browserMessage,setBrowserMessage]=useState("Browser mode · Saving happens on this device. Account saving is optional.");
  const [saveIssues,setSaveIssues]=useState<Record<string,boolean>>({});
  useEffect(()=>{
    function saved(event:Event){const detail=(event as CustomEvent<{key:string;ok:boolean}>).detail;
      if(!detail||typeof detail.key!=="string"||typeof detail.ok!=="boolean")return;
      setSaveIssues(previous=>({...previous,[detail.key]:!detail.ok}));
      setBrowserMessage(detail.ok?"Latest browser save confirmed.":"Browser saving needs attention. Copy your open answer before reloading.");
      if(cloudBinding())setMessage("Account copy may have newer changes waiting to save.");
    }
    function bindingChanged(){setMessage(cloudBinding()?"Account saving enabled · checking for changes every 30 seconds.":"Account saving is not active in this tab.");}
    window.addEventListener("dai-browser-save",saved);window.addEventListener("dai-cloud-change",bindingChanged);
    queueMicrotask(bindingChanged);
    return()=>{window.removeEventListener("dai-browser-save",saved);window.removeEventListener("dai-cloud-change",bindingChanged);};
  },[]);
  useEffect(()=>{
    const client=studyAccountClient(); if(!client)return;
    let stopped=false, busy=false;
    async function save() {
      const binding=cloudBinding(); if(!binding || busy || document.visibilityState!=="visible")return;
      busy=true;
      try {
        const snapshot=await captureStudy();
        if(snapshotSignature(snapshot)===binding!.signature)return;
        const current=cloudBinding(); if(!current || current.userId!==binding!.userId || current.revision!==binding!.revision)return;
        const record=await writeCloud(binding!.userId,snapshot,binding!.revision);
        // Never re-enable a session that was paused while its request was in flight.
        const after=cloudBinding();
        if(!stopped && after?.userId===binding!.userId && after.revision===binding!.revision) {bindCloud(binding!.userId,record);setMessage("Account copy saved at "+new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})+".");}
      }catch(error){const current=cloudBinding();if(!stopped && current?.userId===binding!.userId && current.revision===binding!.revision){pauseCloud();setMessage(error instanceof Error?error.message:"Account saving paused. Your browser work is still here.");}}
      finally{busy=false;}
    }
    const timer=setInterval(()=>void save(),30000);
    const {data:{subscription}}=client.auth.onAuthStateChange((event,session)=>{
      const binding=cloudBinding();
      if(binding && (!session || binding.userId!==session.user.id)) {pauseCloud();setMessage("Account saving paused. Browser work remains on this device.");}
      if(event==="SIGNED_OUT")setMessage("Signed out. Saved browser work remains on this device.");
    });
    return()=>{stopped=true;clearInterval(timer);subscription.unsubscribe();};
  },[]);
  const needsAttention=Object.values(saveIssues).some(Boolean);
  return <aside id="study-saving-status" className="studio-saving-panel" aria-label="Saving and recovery"><details open={needsAttention || undefined}>
    <summary>{needsAttention?"Saving needs attention":"Saving and recovery"}</summary>
    <div role="status"><p>{needsAttention?"Some browser changes could not be saved. Copy the affected open work before reloading; a later save in another section does not recover it.":browserMessage}</p><p>{message}</p></div>
    <p>Account copies can lag behind your latest work. Local saving does not mean every open activity has an account copy.</p>
    <Link href="/study/account">Manage account copies and download a saved backup →</Link>
  </details></aside>;
}

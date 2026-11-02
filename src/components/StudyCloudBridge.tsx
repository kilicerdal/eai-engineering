"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { studyAccountClient } from "@/lib/study-account";
import { bindCloud, captureStudy, cloudBinding, pauseCloud, writeCloud } from "@/lib/study-cloud";
import { snapshotSignature } from "@/lib/study-cloud-snapshot";
export default function StudyCloudBridge() {
  const [message,setMessage]=useState("");
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
        if(!stopped && after?.userId===binding!.userId && after.revision===binding!.revision) {bindCloud(binding!.userId,record);setMessage("Saved to your account.");}
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
  return message ? <aside className="studio-cloud-status" role="status">{message} <Link href="/study/account">Account →</Link></aside>:null;
}

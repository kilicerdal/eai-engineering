"use client";
import StudyGuide from "@/components/StudyGuide";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { accountConfigured, accountProviders, studyAccountClient } from "@/lib/study-account";
import { bindCloud, captureStudy, cloudBinding, deleteCloud, exportStudy, pauseCloud, readCloud, restoreCloud, writeCloud, type CloudRecord } from "@/lib/study-cloud";

export default function StudyAccount() {
  const [user,setUser]=useState<User|null>(null),[ready,setReady]=useState(!accountConfigured);
  const [email,setEmail]=useState(""),[busy,setBusy]=useState(false),[message,setMessage]=useState("");
  const [record,setRecord]=useState<CloudRecord|null>(null),[recordReady,setRecordReady]=useState(false),[saving,setSaving]=useState(false);
  const [confirm,setConfirm]=useState<"restore"|"delete"|null>(null);
  useEffect(()=>{
    const client=studyAccountClient();if(!client)return;
    let cancelled=false;
    void client.auth.getUser().then(({data,error})=>{if(!cancelled){setUser(data.user);setReady(true);if(error && new URLSearchParams(location.search).has("code"))setMessage("Sign-in could not be verified. Please try again.");}});
    const {data:{subscription}}=client.auth.onAuthStateChange((_event,session)=>{if(!cancelled){setUser(session?.user??null);setReady(true);setRecord(null);setRecordReady(false);setConfirm(null);}});
    // OAuth error details can contain provider data; show a generic message only.
    if(new URLSearchParams(location.search).has("error"))setMessage("Sign-in was cancelled or could not finish. You can try again or continue in this browser.");
    return()=>{cancelled=true;subscription.unsubscribe();};
  },[]);
  useEffect(()=>{
    if(!user)return;let cancelled=false;
    void readCloud(user.id).then(saved=>{if(!cancelled){setRecord(saved);setRecordReady(true);}}).catch(error=>{if(!cancelled)setMessage(error.message);});
    return()=>{cancelled=true;};
  },[user]);
  useEffect(()=>{const update=()=>setSaving(Boolean(user && cloudBinding()?.userId===user.id));update();window.addEventListener("dai-cloud-change",update);return()=>window.removeEventListener("dai-cloud-change",update);},[user]);
  async function run(action:()=>Promise<void>){setBusy(true);setMessage("");try{await action();}catch(error){setMessage(error instanceof Error?error.message:"That action could not finish. Your browser work is still here.");}finally{setBusy(false);}}
  function social(provider:"google"|"apple") {void run(async()=>{const client=studyAccountClient();if(!client||!accountProviders[provider])return;const {error}=await client.auth.signInWithOAuth({provider,options:{redirectTo:`${location.origin}/study/account`}});if(error)throw new Error("Sign-in could not start. Please try again later.");});}
  async function emailSignIn(){const client=studyAccountClient();if(!client||!accountProviders.email)return;const {error}=await client.auth.signInWithOtp({email:email.trim(),options:{emailRedirectTo:`${location.origin}/study/account`}});if(error)throw new Error("The sign-in email could not be sent. Please wait and try again, or choose another sign-in option.");setMessage("Check your email for a sign-in link. Open it in this browser to finish. If it does not arrive, check your spam folder.");}
  async function save(){if(!user||!recordReady)return;pauseCloud();const snapshot=await captureStudy();const latest=await readCloud(user.id);if((latest?.revision??null)!==(record?.revision??null)){setRecord(latest);throw new Error("Your account has a newer save. Review its date and choose again before replacing it.");}const saved=await writeCloud(user.id,snapshot,latest?.revision??null);setRecord(saved);bindCloud(user.id,saved);setMessage("Saved to your account. Changes in this tab will save about every 30 seconds while it is open. Return here to restore on another device.");}
  async function restore(){if(!record||!user)return;pauseCloud();const latest=await readCloud(user.id);if(!latest)throw new Error("That account record is no longer available.");exportStudy(await captureStudy());await restoreCloud(latest.snapshot);bindCloud(user.id,latest);location.assign("/study#my-learning");}
  async function remove(){if(!user||!record)return;pauseCloud();await deleteCloud(user.id,record.revision);setRecord(null);setConfirm(null);setMessage("Your cloud learning record was deleted. Your sign-in account and this browser's work remain.");}
  return <section className="studio-account-card" aria-labelledby="account-heading">
    <p className="studio-eyebrow">YOUR LEARNING, YOUR CHOICE</p><h1 id="account-heading">Keep your next step with you.</h1><p className="studio-account-intro">Learn in this browser, or sign in to save your plan, tutor conversations, mistake notebook, lesson checks, and extracted materials to an account.</p><StudyGuide section="Account saving">You can study in this browser right away. To keep a copy in your account, sign in and choose “Save this browser to my account.” On another device, sign in and review the restore confirmation before replacing its local work.</StudyGuide><p className="studio-account-fine"><Link href="/study/privacy">How your learning data is handled ↗</Link></p>
    {message && <p className="studio-account-notice" role="status">{message}</p>}
    {!ready?<p role="status">Checking your account…</p>:!user?<>
      {!accountConfigured && <p className="studio-account-notice">Account saving is being prepared. Your learning tools are available now in browser-only mode.</p>}
      <div className="studio-account-providers"><button disabled={busy||!accountConfigured||!accountProviders.google} onClick={()=>social("google")}>Continue with Google{!accountConfigured||!accountProviders.google?" · Not available yet":""}</button><button disabled={busy||!accountConfigured||!accountProviders.apple} onClick={()=>social("apple")}>Continue with Apple{!accountConfigured||!accountProviders.apple?" · Not available yet":""}</button></div>
      <form onSubmit={event=>{event.preventDefault();void run(emailSignIn);}}><label htmlFor="account-email">Or continue with email</label><input id="account-email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={event=>setEmail(event.target.value)} placeholder="you@example.com" disabled={busy||!accountConfigured||!accountProviders.email}/><button className="goal-primary" disabled={busy||!accountConfigured||!accountProviders.email}>Email me a sign-in link</button>{(!accountConfigured||!accountProviders.email)&&<small>Email sign-in is not available yet.</small>}</form>
      <Link className="studio-account-browser" href="/study#my-learning">Continue in this browser →</Link><p className="studio-account-fine">Browser-only work stays on this browser and device. Clearing browser storage can remove it. Signing in does not automatically upload or replace it.</p>
    </>:<>
      <div className="studio-account-identity"><strong>Signed in as {user.email||"your account"}</strong><button disabled={busy} onClick={()=>void run(async()=>{pauseCloud();const {error}=await studyAccountClient()!.auth.signOut({scope:"local"});if(error)throw new Error("Sign-out could not finish. Please try again.");setUser(null);setMessage("Signed out. Browser work remains on this device. On a shared computer, clear your browser data when you finish.");})}>Sign out</button></div>
      <p>{recordReady ? record ? `Account save: ${new Date(record.updated_at).toLocaleString()}` : "No learning record saved to this account yet." : "Opening your account record…"}</p>
      <p className="studio-account-fine">{saving?"Automatic saving is on for this tab. Wait for confirmation before closing it.":"Automatic saving is off. Choose whether to save this browser's work or open your account's saved work."}</p>
      <div className="goal-actions"><button className="goal-primary" disabled={busy||!recordReady} onClick={()=>void run(save)}>Save this browser to my account</button><button disabled={busy||!record} onClick={()=>{pauseCloud();setConfirm("restore");}}>Restore account work here</button>{saving&&<button disabled={busy} onClick={()=>{pauseCloud();setMessage("Automatic saving paused. Your work continues in this browser.");}}>Pause automatic saving</button>}</div>
      {confirm&&<div className="studio-account-confirm" role="group" aria-label="Confirm account action"><h2>{confirm==="restore"?"Replace this browser's learning work?":"Delete your cloud learning record?"}</h2><p>{confirm==="restore"?"We will download a backup of your current browser work first, then restore your account's saved plan, conversations, notebook, practice, and materials. This replaces the learning work in this browser; it does not merge two versions.":"This removes your saved learning data from your account. It keeps your sign-in account and the work in this browser. Export a copy first if you need one."}</p><button disabled={busy} onClick={()=>void run(confirm==="restore"?restore:remove)}>{confirm==="restore"?"Back up and restore":"Delete cloud learning data"}</button><button disabled={busy} onClick={()=>setConfirm(null)}>Cancel</button></div>}
      <details className="studio-account-controls"><summary>Export and data controls</summary><div className="goal-actions"><button disabled={busy} onClick={()=>void run(async()=>{exportStudy(await captureStudy());setMessage("Your browser learning export was downloaded. Keep it private; it includes conversations and extracted materials.");})}>Export browser work</button><button disabled={busy||!record} onClick={()=>{pauseCloud();setConfirm("delete");}}>Delete cloud learning data</button><button disabled={busy} onClick={()=>void run(async()=>{pauseCloud();setRecord(await readCloud(user.id));setRecordReady(true);setMessage("Account record refreshed. Automatic saving is paused until you choose a version.");})}>Refresh account record</button></div></details>
      <p className="studio-account-fine">Cloud saving includes extracted text and study history, not original PDF files. The current limit is 4 MB per learning record. Other tabs and devices must explicitly restore the saved version. Sign-out leaves browser work on this device.</p><Link className="studio-account-browser" href="/study#my-learning">Return to my learning →</Link>
    </>}
  </section>;
}

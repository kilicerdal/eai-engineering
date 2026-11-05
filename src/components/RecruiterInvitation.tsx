"use client";
import { useEffect,useState } from "react";
export default function RecruiterInvitation(){
  const [token,setToken]=useState<string|null>(null),[busy,setBusy]=useState(false),[sent,setSent]=useState(false),[message,setMessage]=useState('');
  useEffect(()=>{const value=new URLSearchParams(window.location.hash.slice(1)).get('invite');window.history.replaceState(null,'',window.location.pathname);setToken(value&&/^[a-f0-9]{64}$/.test(value)?value:null);},[]);
  async function verify(){
    if(!token || busy)return;setBusy(true);setMessage('');
    try{const response=await fetch('/api/recruiter/verify-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Verification unavailable');setSent(true);setMessage(result.message);}
    catch(error){setMessage(error instanceof Error?error.message:'Verification unavailable.');}finally{setBusy(false);}
  }
  return <section className="recruiter-card"><p className="recruiter-eyebrow">PRIVATE RECRUITER ACCESS</p><h1>Your invitation to connect.</h1><p>This space is reserved for recruiters invited by Erdal Kilic. Verify through the email address that received your invitation.</p>{token?<button disabled={busy||sent} onClick={verify}>{busy?'Sending verification…':sent?'Check your email':'Send my verification link'}</button>:<p>A valid invitation link is required. Please use the link in Erdal’s email.</p>}<p role="status" aria-live="polite">{message}</p><p className="recruiter-note">Forwarding an invitation does not grant access to another email address. Verification links expire; you can request a new invitation by replying to Erdal.</p></section>;
}

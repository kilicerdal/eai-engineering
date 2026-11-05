"use client";
import { useEffect,useState } from "react";
import { createClient,type SupabaseClient } from "@supabase/supabase-js";
let verificationClient:SupabaseClient|null=null;
export default function RecruiterVerification(){
  const [message,setMessage]=useState('Verifying your invitation…');
  useEffect(()=>{
    let alive=true;
    async function complete(){
      try{
        const inviteId=new URLSearchParams(window.location.search).get('invite');
        const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
        if(!inviteId || !url || !key)throw new Error('This verification link is unavailable. Please open your original invitation again.');
        const client=verificationClient??=createClient(url,key,{auth:{flowType:'implicit',persistSession:false,autoRefreshToken:false,detectSessionInUrl:true,storageKey:'eai-recruiter-auth-v1'}});
        const {data,error}=await client.auth.getSession();
        window.history.replaceState(null,'',window.location.pathname+'?invite='+encodeURIComponent(inviteId));
        if(error || !data.session?.access_token)throw new Error('This verification link has expired or was already used. Please open your original invitation again.');
        const response=await fetch('/api/recruiter/session',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+data.session.access_token},body:JSON.stringify({inviteId})});
        if(!response.ok){const result=await response.json();throw new Error(result.error||'This email address does not have access to the invitation.');}
        if(alive)window.location.replace('/recruiters');
      }catch(error){if(alive)setMessage(error instanceof Error?error.message:'Verification could not be completed.');}
    }
    void complete();return()=>{alive=false;};
  },[]);
  return <section className="recruiter-card"><p className="recruiter-eyebrow">EMAIL VERIFICATION</p><h1>A private connection.</h1><p role="status" aria-live="polite">{message}</p></section>;
}

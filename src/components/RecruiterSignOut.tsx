"use client";
import {useState} from 'react';
export default function RecruiterSignOut(){const[busy,setBusy]=useState(false);return <button disabled={busy} onClick={async()=>{setBusy(true);try{const result=await fetch('/api/recruiter/session',{method:'DELETE'});if(result.ok)window.location.replace('/');else setBusy(false);}catch{setBusy(false);}}}>{busy?'Signing out…':'Sign out'}</button>;}

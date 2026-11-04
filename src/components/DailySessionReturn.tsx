"use client";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {DAILY_SESSION_KEY,dailyStages,openDailySession,type DailySession} from "@/lib/study-daily-session";
export default function DailySessionReturn(){
 const [session,setSession]=useState<DailySession|null>(null),pathname=usePathname();
 useEffect(()=>{let cancelled=false;function refresh(){if(cancelled)return;try{const raw=localStorage.getItem(DAILY_SESSION_KEY);setSession(raw?openDailySession(JSON.parse(raw),Date.now()):null);}catch{setSession(null);}}queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);window.addEventListener("focus",refresh);return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);window.removeEventListener("focus",refresh);};},[pathname]);
 if(!session)return null;
 return <aside className="daily-session-return" aria-label="Your focused study session"><div><span>YOUR STUDY SESSION · {dailyStages[session.stage].toUpperCase()}</span><strong title={session.target.title}>{session.target.title}</strong><small>{session.minutes}-minute plan · Your place is saved</small></div><a href="/study#daily-study-session" onClick={()=>window.dispatchEvent(new Event("eai-daily-session-return"))}>Return to my session <span aria-hidden="true">↗</span></a></aside>;
}

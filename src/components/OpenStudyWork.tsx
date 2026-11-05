"use client";
import StudyGuide from "@/components/StudyGuide";
import {useEffect,useState} from "react";
import {openStudyWork,type OpenStudyWork as Work} from "@/lib/study-open-work";
export default function OpenStudyWork(){
 const [work,setWork]=useState<Work[]>([]);
 useEffect(()=>{let cancelled=false;function refresh(){if(cancelled)return;let conversations:unknown=null,exam:unknown=null;try{conversations=JSON.parse(localStorage.getItem("eai-study-conversations-v1")||"null");}catch{}try{exam=JSON.parse(localStorage.getItem("eai-exam-prep-v1")||"null");}catch{}setWork(openStudyWork(conversations,exam,Date.now()));}queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);window.addEventListener("focus",refresh);return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);window.removeEventListener("focus",refresh);};},[]);
 if(!work.length)return null;
 return <section className="open-study-work" aria-label="Saved work to continue"><div><p className="studio-eyebrow">YOUR OPEN WORK</p><h3>Pick up where you paused.</h3><StudyGuide section="Saved work">Choose the saved activity you want to reopen. Use its title and description to find the conversation or task you were working on.</StudyGuide><p>Open your saved work. Nothing is sent to the tutor until you choose Send.</p></div><div>{work.map(item=><a key={item.id} href={item.href}><span>{item.kind==="tutor"?"AI TUTOR":"EXAM PRACTICE"}</span><strong>{item.title}</strong><p>{item.detail}</p><b>Continue →</b></a>)}</div></section>;
}

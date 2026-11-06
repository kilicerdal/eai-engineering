"use client";
import {useEffect,useState} from "react";
import {openStudyWork} from "@/lib/study-open-work";
import {restoreJourney} from "@/lib/study-progress";
import {DAILY_SESSION_KEY,openDailySession,readDailyRecord} from "@/lib/study-daily-session";
import {loadMaterialLibrary} from "@/lib/study-material-files";

/** Navigation only: never starts a session or sends a saved draft. */
export default function StudyResumeShortcut(){
 const [destination,setDestination]=useState<string|null>(null);
 useEffect(()=>{let cancelled=false,revision=0;
  function read(key:string){try{return JSON.parse(localStorage.getItem(key)||"null");}catch{return null;}}
  function refresh(){const current=++revision,now=Date.now();let href:string|null=null;
   try{const raw=read(DAILY_SESSION_KEY);if(raw){const record=readDailyRecord(raw);if(openDailySession(record,now)||record.sessions.some(s=>s.startedAt<=now))href="#my-learning";}}catch{/* Unreadable records do not create a resume promise. */}
   if(!href){const journey=restoreJourney(read("eai-goal-journey-v1"));if(journey?.accepted)href="#my-learning";}
   if(!href){const work=openStudyWork(read("eai-study-conversations-v1"),read("eai-exam-prep-v1"),now);if(work.length)href=work[0].href;}
   if(!cancelled)setDestination(href);
   if(!href)void loadMaterialLibrary().then(library=>{if(!cancelled&&revision===current&&library.documents.length)setDestination("/study/materials");}).catch(()=>{});
  }
  queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);window.addEventListener("focus",refresh);
  return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);window.removeEventListener("focus",refresh);};
 },[]);
 if(!destination)return null;
 return <div className="study-resume-shortcut"><span>Your saved work is ready.</span><a href={destination}>Resume learning <span aria-hidden="true">→</span></a></div>;
}

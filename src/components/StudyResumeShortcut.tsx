"use client";
import {useEffect,useState} from "react";
import {projectSavedWork} from '@/lib/your-space';
import {readingBooks} from '@/lib/study-reading';
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
   const saved=projectSavedWork(k=>localStorage.getItem(k),readingBooks,now).continueItem;
   const work=openStudyWork(read("eai-study-conversations-v1"),read("eai-exam-prep-v1"),now)[0];
   if(saved||work)href=work&&(!saved||work.updatedAt>saved.at)?work.href:saved!.href;
   if(!href)try{const raw=read(DAILY_SESSION_KEY);if(raw&&openDailySession(readDailyRecord(raw),now))href="#my-learning";}catch{/* Keep unreadable records untouched. */}
   if(!href){const journey=restoreJourney(read("eai-goal-journey-v1"));if(journey?.accepted)href="#my-learning";}
   if(!href){const data=projectSavedWork(k=>localStorage.getItem(k),readingBooks,now);if(data.mapItems.length||data.discoveries.length)href='/your-space';}
   if(!cancelled)setDestination(href);
   if(!href)void loadMaterialLibrary().then(library=>{if(!cancelled&&revision===current&&library.documents.length)setDestination("/study/materials");}).catch(()=>{});
  }
  queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);window.addEventListener("focus",refresh);window.addEventListener("dai-browser-save",refresh);
  return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);window.removeEventListener("focus",refresh);window.removeEventListener("dai-browser-save",refresh);};
 },[]);
 if(!destination)return <div className="study-resume-shortcut"><a href="/start">Start here <span aria-hidden="true">→</span></a></div>;
 return <div className="study-resume-shortcut"><span>Your saved work is ready.</span><a href={destination}>Continue learning <span aria-hidden="true">→</span></a><a href="/your-space" className="resume-all-work">All saved work</a></div>;
}

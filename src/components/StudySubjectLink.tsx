'use client';
import type {ReactNode} from 'react';
/** Only the subject handoff needs browser state; the room directory stays server-rendered. */
export default function StudySubjectLink({mode,description,label,children}:{mode:string;description:string;label:string;children:ReactNode}){return <a href={mode==='writing'?'/study/writing':'#ai-assistant'} title={description} aria-label={`${label}: ${description}`} className="studio-subject" onClick={()=>{try{sessionStorage.setItem('eai-study-selected-mode',mode);}catch{/* The destination remains usable without browser storage. */}window.dispatchEvent(new Event('eai-study-mode-change'));}}>{children}</a>;}

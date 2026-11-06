"use client";
import {useEffect,useState} from "react";
import PlanAdjustment from "@/components/PlanAdjustment";
import {CHECK_KEY,normalizeLessonChecks} from "@/lib/study-checkpoints";
import {PLAN_CHOICE_KEY,resolvePlanChoice} from "@/lib/study-plan-adjustment";
import {readSavedArray} from "@/lib/study-safe-storage";
import type {SavedJourney} from "@/lib/study-progress";
import type {GoalSource} from "@/lib/study-goal";
import {materialLocation} from "@/lib/study-materials";

type Props={journey:SavedJourney;sources:GoalSource[];onContinue:()=>void;onEdit:()=>void;onChangePace:()=>void;onStart:(index:number)=>void;onMaterials:(index:number,task:"explain"|"quiz")=>void;onComplete:(id:string,checked:boolean)=>void};
export default function AcceptedStudyPlan({journey,sources,onContinue,onEdit,onChangePace,onStart,onMaterials,onComplete}:Props){
 const {plan,settings,completed,dirty}=journey;
 const fallback=plan.lessons.find(l=>!completed.includes(l.id))?.id||plan.lessons[0].id;
 const [selected,setSelected]=useState(fallback);
 useEffect(()=>{let cancelled=false;function refresh(){let id=fallback;try{const checks=readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items,value=localStorage.getItem(PLAN_CHOICE_KEY);id=resolvePlanChoice(journey,checks,value?JSON.parse(value):null,Date.now())?.lesson.id||fallback;}catch{/* Explicit lesson controls remain available if the recommendation cannot be read. */}if(!cancelled)setSelected(id);}queueMicrotask(refresh);window.addEventListener("eai-study-progress-change",refresh);window.addEventListener("storage",refresh);return()=>{cancelled=true;window.removeEventListener("eai-study-progress-change",refresh);window.removeEventListener("storage",refresh);};},[journey,fallback]);
 return <div className="accepted-study-plan">
  <header className="accepted-plan-header"><div><p className="studio-eyebrow">YOUR SAVED PATH</p><h3>{plan.title}</h3><p>{settings.minutes} minutes per session · {settings.sessions} sessions per week{settings.deadline?` · Target: ${settings.deadline}`:""}</p></div><button onClick={onEdit}>Edit plan</button></header>
  <div className="accepted-plan-actions"><button className="goal-primary" disabled={dirty} onClick={onContinue}>Continue my learning →</button><span>{completed.length} of {plan.lessons.length} marked complete by you</span></div>
  {dirty&&<p role="status" className="goal-notice">Your inputs changed. Review your goal or pace before continuing; your saved lessons are unchanged.</p>}
  <details className="accepted-plan-overview"><summary>Plan overview &amp; next-step feedback</summary><p>{plan.overview}</p><PlanAdjustment journey={journey} onStart={id=>{const index=plan.lessons.findIndex(l=>l.id===id);if(index>=0)onStart(index);}}/><p className="goal-helper">Completion marks record your activity, not mastery. Starting a lesson prepares a tutor draft; select Send when ready.</p></details>
  <ol className="accepted-plan-lessons" aria-label="Your plan lessons">{plan.lessons.map((lesson,index)=><li key={lesson.id}><details open={lesson.id===selected} className="accepted-lesson"><summary><span className="accepted-lesson-number">{String(index+1).padStart(2,"0")}</span><span>{lesson.title}<small>{completed.includes(lesson.id)?"Marked complete":lesson.id===selected?"Current focus":"Available lesson"}</small></span></summary><div className="accepted-lesson-content"><p>{lesson.objective}</p><p><strong>Try:</strong> {lesson.activity}</p><p><strong>Check your understanding:</strong> {lesson.checkpoint}</p>{!!lesson.sourceIds.length&&<p className="goal-helper">Planning context: {lesson.sourceIds.map(id=>{const source=sources.find(s=>s.sourceId===id);return source?`${source.name} · ${materialLocation(source)}`:id;}).join("; ")}. These references shaped the outline; they are not verified answer citations.</p>}<div className="goal-actions"><button onClick={()=>onStart(index)}>{completed.includes(lesson.id)?"Revisit lesson":"Start this lesson"} →</button><label className="goal-completion"><input type="checkbox" checked={completed.includes(lesson.id)} onChange={event=>onComplete(lesson.id,event.target.checked)}/>Mark complete</label></div><details className="accepted-lesson-materials"><summary>Study with your materials</summary><div className="goal-actions"><button onClick={()=>onMaterials(index,"explain")}>Learn from my materials →</button><button onClick={()=>onMaterials(index,"quiz")}>Practice from my materials →</button></div></details></div></details></li>)}</ol>
  <button className="accepted-plan-pace" onClick={onChangePace}>Change goal or pace →</button>
 </div>;
}

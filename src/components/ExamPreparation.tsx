"use client";
import { useSavedStudyArray } from "@/components/useSavedStudyArray";
import { accountConfigured } from "@/lib/study-account";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import StudyLandmark from "@/components/StudyLandmark";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { normalizeStudyMath } from "@/lib/study-markdown";
import { buildExamGoal, differentQuestionPrompt, examProfiles, mistakeReviewPrompt, nextMistakeReview, normalizeMistakes, type Mistake } from "@/lib/study-exams";
import { readStudyStream } from "@/lib/study-stream";
import LessonCheckpoint from "@/components/LessonCheckpoint";
import { mistakePracticeContext, mistakePracticeEvidence } from "@/lib/study-mistake-practice";
const KEY="eai-exam-mistakes-v1";
function NotebookPractice({mistake}:{mistake:Mistake}) {
 const {id,exam,question}=mistake;
 const context=useMemo(()=>mistakePracticeContext({id,exam,question}),[id,exam,question]);
 return <LessonCheckpoint context={context} sessionId={`notebook-${mistake.id}`} recentWork={mistakePracticeEvidence(mistake)} kind="notebook"/>;
}
export default function ExamPreparation(){
 const [examId,setExamId]=useState("sat"),[examName,setExamName]=useState(""),[focus,setFocus]=useState(""),[date,setDate]=useState("");
 const [question,setQuestion]=useState(""),[answer,setAnswer]=useState(""),[expected,setExpected]=useState("");
 const {items:mistakes,setItems:setMistakes,ready,warning}=useSavedStudyArray(KEY,normalizeMistakes,"eai-study-notebook-update");
 const [active,setActive]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");
 const [practiceId,setPracticeId]=useState("");
 const [draft,setDraft]=useState(""),[now,setNow]=useState(0);
 const abort=useRef<AbortController|null>(null);
 const profile=examProfiles.find(p=>p.id===examId)!;
 useEffect(()=>{queueMicrotask(()=>setNow(Date.now()));const timer=setInterval(()=>setNow(Date.now()),60000);return()=>{clearInterval(timer);abort.current?.abort();};},[]);
 useEffect(()=>{
  function openPractice(event:Event){
   const id=(event as CustomEvent).detail?.id;
   if(busy||typeof id!=="string"||!mistakes.some(item=>item.id===id))return;
   setActive(id);setPracticeId(id);
   requestAnimationFrame(()=>document.getElementById("mistake-understanding-check")?.scrollIntoView({behavior:"smooth",block:"start"}));
  }
  window.addEventListener("eai-study-notebook-practice",openPractice);
  return()=>window.removeEventListener("eai-study-notebook-practice",openPractice);
 },[mistakes,busy]);
 function plan(){try{const data=buildExamGoal({examId,examName,focus,date});window.dispatchEvent(new CustomEvent("eai-learning-goal",{detail:data}));setError("");document.getElementById("learning-goal")?.scrollIntoView({behavior:"smooth"});}catch(e){setError(e instanceof Error?e.message:"Describe your exam focus.");}}
 function tutor(){try{const data=buildExamGoal({examId,examName,focus,date});window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"exam",title:`${examId==="other"?examName:profile.name} practice`,goal:data.goal,level:data.level,approach:"practice",message:`${data.goal}\nStart with one original practice question focused on ${focus}. Ask for any missing course or exam variant first. Wait for my answer, then explain my reasoning gaps. Do not claim to simulate official scoring or test conditions.`}}));document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth"});setError("");}catch(e){setError(e instanceof Error?e.message:"Describe your exam focus.");}}
 function save(now:number){if(!question.trim()||!answer.trim())return;if(mistakes.length>=50){setError("Your notebook has 50 entries. Remove an entry before adding another.");return;}const m:Mistake={id:crypto.randomUUID(),exam:examId==="other"?examName.trim()||"My exam":profile.name,question:question.trim(),answer:answer.trim(),expected:expected.trim(),reflection:"",createdAt:now,reviewAt:now+86400000,reviews:0};setMistakes(items=>[m,...items]);setActive(m.id);setQuestion("");setAnswer("");setExpected("");setError("");}
 async function explain(m:Mistake){if(busy)return;setBusy(true);setDraft("");setError("");abort.current=new AbortController();try{const response=await fetch("/api/study/chat",{method:"POST",headers:{"Content-Type":"application/json"},signal:AbortSignal.any([abort.current.signal,AbortSignal.timeout(55000)]),body:JSON.stringify({subject:"exam",message:mistakeReviewPrompt(m),learning:{level:examProfiles.find(p=>p.name===m.exam)?.level||"college",approach:"review",goal:`Understand and learn from a ${m.exam} practice attempt`}})});const result=await readStudyStream(response,setDraft);if(abort.current.signal.aborted)throw new DOMException("Cancelled","AbortError");if(result.length>14000)throw new Error("The review was too long. Ask the tutor about a more focused question.");setMistakes(items=>items.map(item=>item.id===m.id?{...item,reflection:result}:item));setDraft("");}catch(e){setError(e instanceof Error&&e.name==="AbortError"?"Review cancelled. Your saved entry is unchanged.":e instanceof Error?e.message:"The review could not be completed.");setDraft("");}finally{setBusy(false);abort.current=null;}}
 function retry(m:Mistake){window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"exam",title:`Review: ${m.exam}`,goal:"Check understanding with a different example",approach:"practice",message:differentQuestionPrompt(m)}}));document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth"});}
 const entry=mistakes.find(m=>m.id===active)||mistakes[0];
 return <section id="exam-preparation" className="goal-workspace exam-workspace" aria-labelledby="exam-heading">
  <div className="exam-landmark-stage">
  <StudyLandmark scene="cappadocia" />
  <div className="studio-section-title"><div><p className="studio-eyebrow">PREPARE WITH PURPOSE</p><h2 id="exam-heading">Your exam. Your preparation.</h2></div><p>Understand the idea.<br/>Learn from each attempt.</p></div>
  <p className="goal-intro">Choose an exam. Build a study path around your focus.</p>
  <div className="goal-panel exam-prep-controls"><div className="goal-settings"><label className="goal-label">Exam profile<select aria-label="Exam profile" value={examId} onChange={e=>{setExamId(e.target.value);setFocus("");}}>{examProfiles.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><label className="goal-label">Exam date · optional<input aria-label="Exam date" type="date" value={date} onChange={e=>setDate(e.target.value)}/></label></div>
  {examId==="other"&&<label className="goal-label">Exam name<input aria-label="Exam name" maxLength={100} value={examName} onChange={e=>setExamName(e.target.value)}/></label>}
  <p className="goal-helper">{profile.note}</p><details className="exam-focus-ideas"><summary>Explore focus ideas</summary><div className="exam-focuses" aria-label="Optional focus ideas">{profile.focus.map(topic=><button key={topic} type="button" onClick={()=>setFocus(topic)}>{topic} +</button>)}</div></details>
  <label className="goal-label">What would you like to improve?<textarea aria-label="Exam study focus" maxLength={800} rows={2} value={focus} onChange={e=>setFocus(e.target.value)} placeholder="What would you like to improve?"/></label>
  {(examId==="sat"||examId==="psat")&&<div className="exam-practice-invitation"><strong>Put your preparation into practice.</strong><p>Start a short skill check or work through original questions with hints and explanations.</p><Link className="goal-primary" href={`/study/exams?exam=${examId}`}>Open {profile.name} skill practice →</Link></div>}
  <div className="goal-actions"><button className="goal-primary" onClick={plan}>Build my preparation plan →</button><button onClick={tutor}>Practice this focus ↗</button><Link href="/study/materials">Study my exam materials ↗</Link>{profile.url&&<a href={profile.url} target="_blank" rel="noopener noreferrer">Official exam resources ↗</a>}</div>
  <details className="exam-prep-note"><summary>About this preparation</summary><p className="goal-helper">Independent AI study support, not an official or complete exam course. No full-length simulations, score predictions, or licensed question banks. Practice opens a prepared tutor message; select Send to begin. Confirm current requirements with your exam provider.</p></details></div>
  <p className="studio-landmark-caption">Cappadocia, Türkiye · An imagined horizon</p>
  </div>
  <div id="mistake-notebook" className="exam-notebook"><div className="notebook-landmark-stage"><StudyLandmark scene="pantheon" /><div className="studio-section-title"><div><p className="studio-eyebrow">TURN MISTAKES INTO UNDERSTANDING</p><h2>My mistake notebook</h2></div><p>{mistakes.filter(m=>m.reviewAt<=now).length} ready to revisit</p></div>
  {warning&&<p className="goal-notice" role="status">{warning}</p>}
  <div className="goal-panel notebook-capture"><h3>Capture the reasoning.</h3><label className="goal-label">Question or problem<textarea aria-label="Mistake question" rows={2} maxLength={1200} value={question} onChange={e=>setQuestion(e.target.value)} disabled={busy}/></label><label className="goal-label">My answer and reasoning<textarea aria-label="My mistaken answer" rows={2} maxLength={700} value={answer} onChange={e=>setAnswer(e.target.value)} disabled={busy}/></label><details className="notebook-answer-key"><summary>Add an answer-key explanation · optional</summary><label className="goal-label">Answer-key explanation<textarea aria-label="Answer key guidance" rows={2} maxLength={700} value={expected} onChange={e=>setExpected(e.target.value)} disabled={busy}/></label></details><button className="goal-primary" onClick={event=>save(performance.timeOrigin+event.timeStamp)} disabled={!ready||busy||!question.trim()||!answer.trim()}>Save to my notebook</button><p className="goal-helper">Saved under {examId==="other"?examName||"My exam":profile.name}. Use practice you may share. Reviews send this entry to the AI; avoid personal or confidential information.</p>
  </div><p className="studio-landmark-caption">Pantheon, Rome · An imagined horizon</p></div>
  <div className="exam-notebook-grid"><div className="goal-panel"><h3>Saved attempts</h3>{!mistakes.length&&<p className="goal-helper">Your saved attempts will appear here.</p>}<div className="exam-entries">{[...mistakes].sort((a,b)=>a.reviewAt-b.reviewAt).map(m=><button key={m.id} aria-pressed={active===m.id} disabled={busy} onClick={()=>setActive(m.id)}><strong>{m.exam} · {m.reviewAt<=now?"Ready to revisit":`Review ${new Date(m.reviewAt).toLocaleDateString()}`}</strong><span>{m.question}</span></button>)}</div></div>
  <div className="goal-panel">{entry?<><p className="studio-eyebrow">{entry.exam} · PRACTICE REFLECTION</p><h3>{entry.question}</h3><p className="goal-overview"><strong>Your answer:</strong> {entry.answer}</p>{entry.expected&&<p className="goal-helper">Your supplied answer key: {entry.expected}</p>}
  <div className="goal-actions"><button className="goal-primary" disabled={busy} onClick={()=>void explain(entry)}>{busy?"Reviewing your reasoning…":entry.reflection?"Review my reasoning again":"Help me understand this mistake"}</button>{busy&&<button onClick={()=>abort.current?.abort()}>Cancel review</button>}</div>
  {(draft||entry.reflection)&&<div className="exam-reflection" aria-live="polite"><ReactMarkdown skipHtml remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]} components={{a:({children})=><span>{children}</span>,img:()=>null}}>{normalizeStudyMath(draft||entry.reflection)}</ReactMarkdown></div>}
  <details><summary>Edit my learning notes</summary><label className="goal-label">My learning notes<textarea aria-label="My learning notes" rows={5} maxLength={14000} value={entry.reflection} disabled={busy} onChange={e=>setMistakes(items=>items.map(m=>m.id===entry.id?{...m,reflection:e.target.value}:m))}/></label></details>
  <div className="goal-actions"><button className="goal-primary" disabled={busy} onClick={()=>setPracticeId(entry.id)}>Practice and check this idea</button><button disabled={busy} onClick={()=>retry(entry)}>Explore this with my tutor ↗</button><button disabled={busy} onClick={()=>{setMistakes(items=>items.map(m=>m.id===entry.id?nextMistakeReview(m,Date.now()):m));setNow(Date.now());}}>I reviewed this · schedule again</button><button disabled={busy} onClick={()=>{setMistakes(items=>items.filter(m=>m.id!==entry.id));setActive(mistakes.find(m=>m.id!==entry.id)?.id||"");}}>Remove entry</button></div><p className="goal-helper">Reviews are suggested after 1, 3, 7, then 14 days, based on your own review marks. Return here to see what is due; no notifications or mastery scores are created. AI feedback can be wrong—check your source or answer key.</p>{practiceId===entry.id&&<NotebookPractice key={entry.id} mistake={entry}/>}</>:<><h3>A mistake is a starting point.</h3><p className="goal-overview">Save an attempt to inspect the reasoning, identify a missing idea, and revisit it with a different question.</p><p className="goal-helper">Up to 50 entries, saved in this browser. Clearing browser data removes the local copy. {accountConfigured ? <a href="/study/account">Choose optional account saving ↗</a> : "Account sync is not available."}</p></>}</div></div></div>
  {error&&<p className="goal-error" role="alert">{error}</p>}
  <p className="goal-footnote">Want a short checked exercise? <Link href="/study/practice">Open foundational practice ↗</Link> · Limited to the existing four-track bank; not an exam simulation.</p>
 </section>;
}

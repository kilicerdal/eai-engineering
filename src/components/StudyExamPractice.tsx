"use client";
import {useEffect,useRef,useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {accountConfigured} from "@/lib/study-account";
import {examBank,examDomains,examSkillLessons,examDomainSource,type ExamSkill,type ExamDomain,type ExamProfile} from "@/lib/study-exam-bank";
import {EXAM_PREP_KEY,emptyExamRecord,readExamRecord,examSkillEvidence,recommendedExamDomain,examReviewProgress,startExamReview,startExamSession,sessionAnswers,submitExamAnswer,advanceExamSession,examAttemptToMistake,type ExamRecord,type ExamSession} from "@/lib/study-exam-practice";
import {normalizeMistakes} from "@/lib/study-exams";
const examName=(exam:ExamProfile)=>exam==="sat"?"SAT":"PSAT/NMSQT";
function eventTime(event:{timeStamp:number}){return Math.round(event.timeStamp>1e12?event.timeStamp:performance.timeOrigin+event.timeStamp);}
function display(text:string){const superscript="⁰¹²³⁴⁵⁶⁷⁸⁹";return text.replace(/([a-z])\^(\d+)/gi,(_all,base:string,power:string)=>base+[...power].map(d=>superscript[Number(d)]).join(""));}
export default function StudyExamPractice(){
 const params=useSearchParams(),requested=params.get("exam"),requestedDomain=params.get("domain"),requestedSkill=params.get("skill");
 const [record,setRecord]=useState<ExamRecord>(emptyExamRecord),[ready,setReady]=useState(false),[warning,setWarning]=useState(""),[error,setError]=useState(""),[now,setNow]=useState(0),[domain,setDomain]=useState<ExamDomain>("information"),[savedNotebook,setSavedNotebook]=useState(""),[pendingBackup,setPendingBackup]=useState<ExamRecord|null>(null);
 const current=useRef(record),lastRaw=useRef<string|null>(null),writable=useRef(true),importRevision=useRef(0),workspace=useRef<HTMLElement>(null);
 useEffect(()=>{
  let next=emptyExamRecord(),message="";writable.current=true;
  try{lastRaw.current=localStorage.getItem(EXAM_PREP_KEY);if(lastRaw.current)next=readExamRecord(JSON.parse(lastRaw.current));}
  catch(e){writable.current=false;message=e instanceof Error?e.message:"Browser saving is unavailable. This session will stay temporary.";}
  if(requested==="sat"||requested==="psat")next={...next,activeExam:requested};
  current.current=next;
  const initial=setTimeout(()=>{setRecord(next);setWarning(message);setNow(Date.now());setDomain(requestedDomain&&Object.hasOwn(examDomains,requestedDomain)?requestedDomain as ExamDomain:recommendedExamDomain(next.activeExam,next.attempts,Date.now()));setReady(true);},0);
  const timer=setInterval(()=>setNow(Date.now()),30000);
  return()=>{clearTimeout(initial);clearInterval(timer);};
 },[requested,requestedDomain]);
 useEffect(()=>{
  if(!ready||window.location.hash!=="#exam-review")return;
  const frame=requestAnimationFrame(()=>document.getElementById("exam-review")?.scrollIntoView({block:"start"}));
  return()=>cancelAnimationFrame(frame);
 },[ready,requested,requestedSkill]);
 const exam=record.activeExam,session=record.sessions[exam],question=session?examBank.find(q=>q.id===session.questionIds[session.index]):null;
 const answers=sessionAnswers(record,exam,now),attempt=question?answers.find(a=>a.questionId===question.id):undefined;
 const reviews=examReviewProgress(exam,record.attempts,now),pendingReviews=reviews.filter(r=>!r.resolvedBy),finishedReviews=reviews.filter(r=>r.resolvedBy);
 const skills=examSkillEvidence(exam,record.attempts,now),suggestion=recommendedExamDomain(exam,record.attempts,now);
 function update(next:ExamRecord,at:number){
  if(next===current.current)return;
  current.current=next;setRecord(next);setNow(at);setError("");
  if(!writable.current)return;
  try{
   if(localStorage.getItem(EXAM_PREP_KEY)!==lastRaw.current){writable.current=false;setWarning("Exam practice changed in another tab or device restore. Your work here is still open, but saving is paused. Download a copy and reload before continuing to save.");return;}
   const raw=JSON.stringify(next);localStorage.setItem(EXAM_PREP_KEY,raw);lastRaw.current=raw;
   window.dispatchEvent(new Event("eai-study-progress-change"));
  }catch{writable.current=false;setWarning("Your latest work could not be saved in this browser. Download a practice backup before leaving.");}
 }
 function focusWorkspace(){requestAnimationFrame(()=>{workspace.current?.focus({preventScroll:true});workspace.current?.scrollIntoView({behavior:"smooth",block:"start"});});}
 function start(mode:"diagnostic"|"practice",focus:ExamDomain,at:number){
  const active=current.current.sessions[exam];
  if(active&&!active.finished&&!window.confirm("Start a new session? Checked answers stay in your history; the current unsubmitted answer will be replaced."))return;
  update(startExamSession(current.current,exam,mode,focus,at,crypto.randomUUID()),at);setSavedNotebook("");focusWorkspace();
 }
 function reviewSkill(skill:ExamSkill,at:number){
  const active=current.current.sessions[exam];
  if(active&&!active.finished&&!window.confirm("Start this skill review? Checked answers stay in history; the current unsubmitted answer will be replaced."))return;
  try{update(startExamReview(current.current,exam,skill,at,crypto.randomUUID()),at);setSavedNotebook("");focusWorkspace();}
  catch(error){setError(error instanceof Error?error.message:"This review could not be opened.");}
 }
 function reviewCard(review:typeof reviews[number]){
  const highlighted=requestedSkill===review.skill;
  return <article key={review.skill} className="exam-review-item" data-highlighted={highlighted}><div><span className="studio-eyebrow">{review.dueAt<=now?"READY TO REVISIT":`SUGGESTED ${new Date(review.dueAt).toLocaleDateString(undefined,{month:"short",day:"numeric"})}`}</span><h3>{examSkillLessons[review.skill].name}</h3><p>{review.anchor.hintsUsed?"An earlier answer used hints or an explanation.":"An earlier answer needs another look."} Try a different question on the same idea.</p></div><button className="goal-primary" onClick={event=>reviewSkill(review.skill,eventTime(event))}>Review {examSkillLessons[review.skill].name} →</button></article>;
 }
 function draft(patch:Partial<Pick<ExamSession,"selectedIndex"|"hintsUsed"|"reasoning">>,at:number){
  const r=current.current,s=r.sessions[exam];if(!s||s.finished||sessionAnswers(r,exam,at).some(a=>a.questionId===s.questionIds[s.index]))return;
  update({...r,sessions:{...r.sessions,[exam]:{...s,...patch}}},at);
 }
 function answer(skip:boolean,at:number){update(submitExamAnswer(current.current,exam,skip,at,crypto.randomUUID()),at);}
 function advance(at:number){update(advanceExamSession(current.current,exam,at),at);setSavedNotebook("");focusWorkspace();}
 function saveMistake(at:number){
  if(!attempt)return;
  try{
   const raw=localStorage.getItem("eai-exam-mistakes-v1"),items=normalizeMistakes(JSON.parse(raw||"[]"));
   if(raw&&(!Array.isArray(JSON.parse(raw))||items.length!==JSON.parse(raw).length))throw new Error("Your notebook contains unreadable entries. The original saved copy has not been changed.");
   const entry=examAttemptToMistake(attempt,at);
   if(items.some(m=>m.id===entry.id)){setSavedNotebook(attempt.id);return;}
   if(items.length>=50)throw new Error("Your notebook has 50 entries. This checked attempt remains in exam practice.");
   localStorage.setItem("eai-exam-mistakes-v1",JSON.stringify([...items,entry]));setSavedNotebook(attempt.id);
   window.dispatchEvent(new Event("eai-study-progress-change"));window.dispatchEvent(new Event("eai-study-notebook-update"));
  }catch(e){setError(e instanceof Error?e.message:"The attempt could not be saved to your notebook.");}
 }
 function tutor(at:number){
  if(!question)return;
  if(!attempt&&session)draft({hintsUsed:Math.max(session.hintsUsed,1)},at);
  const message=`${examName(exam)} foundational practice. Skill: ${examSkillLessons[question.skill].name}.\n${question.passage?`Passage / notes:\n${question.passage}\n`:""}Question: ${question.prompt}\nChoices: ${question.choices.join(" | ")}\n${attempt?`My selected answer: ${attempt.selectedIndex===null?"Skipped":question.choices[attempt.selectedIndex]}. My reasoning: ${attempt.reasoning||"Not supplied"}. Authored explanation: ${question.explanation}. Help me understand the first gap, then ask a different question.`:"I have not checked an answer yet. Give one guiding question or a small hint, without revealing the answer."}\nThis is original dAI practice, not an official exam item.`;
  window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"exam",message:message.slice(0,3000),title:examSkillLessons[question.skill].name,goal:`Strengthen ${examSkillLessons[question.skill].name}`,level:"highSchool",approach:attempt?"review":"guide"}}));
  document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth",block:"start"});
 }
 function download(raw:string,name:string){const url=URL.createObjectURL(new Blob([raw],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 function backup(){download(JSON.stringify(current.current,null,2),"dai-exam-practice-backup.json");}
 async function importBackup(file:File|undefined){
  if(!file)return;const revision=++importRevision.current;setPendingBackup(null);setError("");
  try{if(file.size>2*1024*1024)throw new Error("Choose a practice backup smaller than 2 MB.");const parsed=readExamRecord(JSON.parse(await file.text()));if(importRevision.current===revision)setPendingBackup(parsed);}
  catch(e){if(importRevision.current===revision)setError(e instanceof Error?e.message:"This backup could not be read. Nothing was replaced.");}
 }
 function restoreBackup(at:number){
  if(!pendingBackup)return;
  try{
   const original=localStorage.getItem(EXAM_PREP_KEY);
   if(original)download(original,"dai-exam-practice-before-restore.json");
   const restored={...pendingBackup,activeExam:requested==="sat"||requested==="psat"?requested:pendingBackup.activeExam};
   if(localStorage.getItem(EXAM_PREP_KEY)!==original)throw new Error("Practice changed while restoring. Nothing was replaced; choose your backup again.");
   const raw=JSON.stringify(restored);localStorage.setItem(EXAM_PREP_KEY,raw);lastRaw.current=raw;writable.current=true;current.current=restored;setRecord(restored);setNow(at);setPendingBackup(null);setWarning("Exam practice restored. A copy of your previous saved practice was downloaded first.");setDomain(recommendedExamDomain(restored.activeExam,restored.attempts,at));window.dispatchEvent(new Event("eai-study-progress-change"));
  }catch(e){setError(e instanceof Error?e.message:"The backup could not be restored. Keep this page open and download your current work.");}
 }
 return <div className="exam-practice-page">
  <header className="exam-practice-intro"><p className="studio-eyebrow">PREPARE WITH PURPOSE</p><h1>Your next breakthrough starts with a clear picture.</h1><p>Find a starting point, practice a specific skill, and learn from the reasoning behind each answer.</p><Link href="/study#exam-preparation">← Return to exam preparation</Link></header>
  <div className="exam-profile-nav" aria-label="Practice exam profile">{(["sat","psat"] as const).map(value=><Link key={value} href={`/study/exams?exam=${value}`} aria-current={exam===value?"page":undefined} scroll={false}>{examName(value)}</Link>)}</div>
  <p className="exam-practice-scope">{examBank.length} original dAI questions · 16 sampled skills · 8 content domains. Shared foundational skills, separate profile histories. This is a small learning snapshot—not a full test, an official score, or a complete exam course. <a href={examDomainSource.url} target="_blank" rel="noopener noreferrer">Official domain outline ↗</a></p>
  {!ready?<p role="status">Opening your saved practice…</p>:<>
   {warning&&<div className="goal-notice" role="status">{warning} <button onClick={backup}>Download practice backup</button></div>}
   {error&&<p className="goal-error" role="alert">{error}</p>}
   <div className="exam-start-grid"><section className="exam-start-card"><p className="studio-eyebrow">FIND YOUR STARTING POINT</p><h2>A short skill check.</h2><p>Eight questions, one per domain. Use a hint or skip when needed—we keep that separate from an independent answer. Untimed; pause and return.</p><button className="goal-primary" onClick={event=>start("diagnostic",domain,eventTime(event))}>{session&&!session.finished?"Start a new skill check":"Start skill check"}</button></section><section className="exam-start-card"><p className="studio-eyebrow">FOCUSED PRACTICE</p><h2>Work on one area.</h2><label className="goal-label">Practice focus<select value={domain} onChange={e=>setDomain(e.target.value as ExamDomain)}>{(Object.keys(examDomains) as ExamDomain[]).map(d=><option key={d} value={d}>{examDomains[d].name}</option>)}</select></label><p className="goal-helper">Suggested from your latest checked items: {examDomains[suggestion].name}. A small sample cannot establish mastery.</p><div className="goal-actions"><button className="goal-primary" onClick={event=>start("practice",domain,eventTime(event))}>Start targeted practice</button><button onClick={()=>setDomain(suggestion)}>Use suggested focus</button></div></section></div>
   <section id="exam-review" className="exam-review-panel" aria-labelledby="exam-review-heading"><div className="exam-review-heading"><div><p className="studio-eyebrow">BUILD UNDERSTANDING THAT LASTS</p><h2 id="exam-review-heading">Return to the idea. Try it differently.</h2></div><span>{pendingReviews.filter(r=>r.dueAt<=now).length} ready · {pendingReviews.filter(r=>r.dueAt>now).length} upcoming</span></div><p>Missed and helped answers suggest a review 24 hours later. Review sooner if you like. A different question answered without hints completes this follow-up; it does not prove mastery. Dates are suggestions, with no automatic notifications.</p>
    {!pendingReviews.length&&<p className="exam-review-empty">{finishedReviews.length?"Your current follow-ups have a different example answered without hints. Keep exploring, or choose another practice area.":"Your review list will grow from checked answers. Skipping a question is not counted as a mistake."}</p>}
    {requestedSkill&&Object.hasOwn(examSkillLessons,requestedSkill)&&!pendingReviews.some(r=>r.skill===requestedSkill)&&<p className="goal-notice">There is no pending review for {examSkillLessons[requestedSkill as ExamSkill].name} in this profile. Your latest evidence may have changed.</p>}
    <div className="exam-review-list">{pendingReviews.slice(0,3).map(reviewCard)}</div>{pendingReviews.length>3&&<details><summary>View {pendingReviews.length-3} more suggested reviews</summary><div className="exam-review-list">{pendingReviews.slice(3).map(reviewCard)}</div></details>}
    {!!finishedReviews.length&&<details className="exam-review-evidence"><summary>{finishedReviews.length} {finishedReviews.length===1?"idea revisited":"ideas revisited"} with a different example</summary>{finishedReviews.map(review=><p key={review.skill}><strong>{examSkillLessons[review.skill].name}</strong> · Different question answered without hints on {new Date(review.resolvedBy!.submittedAt).toLocaleDateString()}. Earlier attempts stay in your history.</p>)}</details>}
   </section>
   {session&&<section ref={workspace} tabIndex={-1} className="exam-question-shell" aria-label="Exam practice workspace">
    {session.finished?<><p className="studio-eyebrow">SESSION COMPLETE</p><h2>Your practice snapshot.</h2><p>{answers.filter(a=>a.selectedIndex!==null).length} answered · {answers.filter(a=>a.selectedIndex===null).length} skipped. These results describe this set of questions, not your overall ability.</p><div className="exam-session-results">{answers.map(a=>{const q=examBank.find(q=>q.id===a.questionId)!;return <details key={a.id}><summary>{examSkillLessons[q.skill].name} · {a.selectedIndex===null?"Not answered":a.selectedIndex!==q.answerIndex?"Needs another look":a.hintsUsed?"Correct with help":"Correct without hints"}</summary>{q.passage&&<p className="exam-passage">{q.passage}</p>}<p>{display(q.prompt)}</p><p>Your answer: {a.selectedIndex===null?"Skipped":display(q.choices[a.selectedIndex])}</p><p>{q.explanation}</p></details>;})}</div><div className="goal-actions"><button className="goal-primary" onClick={event=>{setDomain(suggestion);start("practice",suggestion,eventTime(event));}}>Practice the suggested area</button><Link href="/study#my-learning">Return to my learning home ↗</Link></div></>:question&&<>
     <div className="exam-question-top"><p className="studio-eyebrow">{session.mode==="diagnostic"?"SKILL CHECK":"TARGETED PRACTICE"} · {session.index+1} / {session.questionIds.length}</p><span>{examDomains[question.domain].name}</span></div><progress value={answers.length} max={session.questionIds.length} aria-label="Questions checked or skipped in this session"/>
     <h2>{examSkillLessons[question.skill].name}</h2>{question.passage&&<div className="exam-passage">{question.passage}</div>}<p className="exam-question-prompt">{display(question.prompt)}</p>
     {session.startedAt>now&&<p role="alert" className="goal-error">Your device clock is earlier than this saved session. Check your date and time before submitting.</p>}
     <fieldset disabled={!!attempt||session.startedAt>now}><legend>Choose your answer</legend><div className="exam-answer-options">{question.choices.map((choice,index)=><label key={index} data-selected={(attempt?attempt.selectedIndex:session.selectedIndex)===index}><input type="radio" name={`exam-answer-${session.id}-${question.id}`} checked={(attempt?attempt.selectedIndex:session.selectedIndex)===index} onChange={event=>draft({selectedIndex:index},eventTime(event))}/><span className="exam-choice-letter">{String.fromCharCode(65+index)}</span><span>{display(choice)}</span></label>)}</div></fieldset>
     <label className="goal-label">Your reasoning · optional<textarea rows={2} maxLength={500} value={attempt?.reasoning??session.reasoning} disabled={!!attempt} onChange={e=>draft({reasoning:e.target.value},eventTime(e))} placeholder="What led you to your answer?"/></label>
     {(attempt?.hintsUsed||session.hintsUsed)>0&&<div className="exam-hints" aria-live="polite">{question.hints.slice(0,attempt?.hintsUsed??session.hintsUsed).map((hint,index)=><p key={index}><strong>Hint {index+1}:</strong> {hint}</p>)}</div>}
     {!attempt?<div className="goal-actions"><button className="goal-primary" disabled={session.selectedIndex===null||session.startedAt>now} onClick={event=>answer(false,eventTime(event))}>Check answer</button><button disabled={session.hintsUsed>=question.hints.length} onClick={event=>draft({hintsUsed:session.hintsUsed+1},eventTime(event))}>Show a hint · counts as help</button><button onClick={event=>answer(true,eventTime(event))}>Skip for now</button></div>:<>
      <div className="exam-answer-feedback" role="status"><h3>{attempt.selectedIndex===null?"Not answered yet.":attempt.selectedIndex===question.answerIndex?attempt.hintsUsed?"Correct with help.":"Correct without hints.":"Let’s work through the reasoning."}</h3>{attempt.selectedIndex===null?<p>This item is recorded as skipped, not incorrect. Its explanation is available below.</p>:<p>{question.choiceNotes[attempt.selectedIndex]}</p>}<p><strong>Answer:</strong> {display(question.choices[question.answerIndex])}</p><p>{question.explanation}</p>{reviews.some(review=>review.resolvedBy?.id===attempt.id)&&<p className="exam-review-breakthrough"><strong>A different example, answered without hints.</strong> This completes the current follow-up for this skill. Your earlier attempt stays in history; one follow-up does not establish mastery.</p>}<details><summary>Why each choice works or doesn’t</summary>{question.choices.map((choice,index)=><p key={index}><strong>{String.fromCharCode(65+index)}. {display(choice)}</strong> — {question.choiceNotes[index]}</p>)}</details></div>
      <div className="goal-actions"><button className="goal-primary" onClick={event=>advance(eventTime(event))}>{session.index+1===session.questionIds.length?"See my snapshot":"Next question →"}</button>{attempt.selectedIndex!==null&&<button disabled={savedNotebook===attempt.id} onClick={event=>saveMistake(eventTime(event))}>{savedNotebook===attempt.id?"Saved to notebook":"Save this attempt to my notebook"}</button>}</div>
     </>}
     <div className="exam-study-actions"><button onClick={event=>tutor(eventTime(event))}>Work through this with my tutor{!attempt?" · counts as help":""} ↗</button><details><summary>Review the key idea{!attempt?" · counts as help":""}</summary><button disabled={!!attempt||session.hintsUsed>=question.hints.length} onClick={event=>draft({hintsUsed:question.hints.length},eventTime(event))}>Use the mini lesson · counts as help</button>{(!!attempt||session.hintsUsed===question.hints.length)&&<div><p>{examSkillLessons[question.skill].idea}</p><p><strong>Another example:</strong> {examSkillLessons[question.skill].example}</p><p><strong>Think about:</strong> {examSkillLessons[question.skill].check}</p></div>}</details></div>
    </>}
   </section>}
   <section className="exam-evidence-grid" aria-labelledby="exam-evidence-title"><h2 id="exam-evidence-title">What your checked practice shows.</h2><p>Latest eligible answer per question in this profile. Repeating a question does not add another point. These counts do not measure all skills in a domain.</p><div>{(Object.keys(examDomains) as ExamDomain[]).map(d=><article key={d}><p className="studio-eyebrow">{examDomains[d].section}</p><h3>{examDomains[d].name}</h3>{skills.filter(s=>s.domain===d).map(s=><div className="exam-skill-row" key={s.skill}><strong>{examSkillLessons[s.skill].name}</strong><span>{s.checked?`${s.independent} correct without hints · ${s.helped} with help · ${s.needsPractice} need review`:`Not checked yet${s.unanswered?` · ${s.unanswered} skipped`:""}`}</span></div>)}<button onClick={event=>{setDomain(d);start("practice",d,eventTime(event));}}>Practice this area ↗</button></article>)}</div></section>
   <footer className="exam-practice-footer"><p>Saved in this browser{accountConfigured&&<> · <Link href="/study/account">Optional account saving</Link></>}. {examName(exam)} profile results stay separate. Original dAI exercises; not affiliated with or endorsed by College Board. No official score or readiness prediction.</p><button onClick={backup}>Download practice backup</button><label className="exam-backup-import">Open a practice backup<input type="file" accept="application/json,.json" aria-label="Open exam practice backup" onChange={event=>{void importBackup(event.target.files?.[0]);event.target.value="";}}/></label><Link href="/study#mistake-notebook">Open my mistake notebook ↗</Link>{pendingBackup&&<div className="exam-backup-preview"><h3>Review this backup before restoring.</h3><p>{pendingBackup.attempts.length} checked or skipped attempts, with separate SAT and PSAT sessions. Restoring replaces exam practice on this device. Your other learning tools stay unchanged. We download the existing exam-practice copy first.</p><button onClick={event=>restoreBackup(eventTime(event))}>Restore this exam-practice backup</button><button onClick={()=>setPendingBackup(null)}>Cancel restore</button></div>}</footer>
  </>}
 </div>;
}

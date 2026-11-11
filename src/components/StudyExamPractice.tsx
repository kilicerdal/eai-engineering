"use client";
import StudyGuide from "@/components/StudyGuide";
import {useEffect,useRef,useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {accountConfigured} from "@/lib/study-account";
import {examBank,examDomains,examSkillLessons,examDomainSource,type ExamSkill,type ExamDomain,type ExamProfile} from "@/lib/study-exam-bank";
import {EXAM_PREP_KEY,emptyExamRecord,readExamRecord,examSkillEvidence,recommendedExamDomain,examReviewProgress,startExamReview,startExamSession,sessionAnswers,submitExamAnswer,advanceExamSession,examAttemptToMistake,type ExamRecord,type ExamSession} from "@/lib/study-exam-practice";
import {normalizeMistakes} from "@/lib/study-exams";
import {readSavedArray,writeStudyCopy} from "@/lib/study-safe-storage";
const examName=(exam:ExamProfile)=>exam==="sat"?"SAT":"PSAT/NMSQT";
function eventTime(event:{timeStamp:number}){return Math.round(event.timeStamp>1e12?event.timeStamp:performance.timeOrigin+event.timeStamp);}
function display(text:string){const superscript="⁰¹²³⁴⁵⁶⁷⁸⁹";return text.replace(/([a-z)])\^(\d+)/gi,(_all,base:string,power:string)=>base+[...power].map(d=>superscript[Number(d)]).join(""));}
export default function StudyExamPractice(){
 const params=useSearchParams(),requested=params.get("exam"),requestedDomain=params.get("domain"),requestedSkill=params.get("skill");
 const [record,setRecord]=useState<ExamRecord>(emptyExamRecord),[ready,setReady]=useState(false),[warning,setWarning]=useState(""),[error,setError]=useState(""),[now,setNow]=useState(0),[domain,setDomain]=useState<ExamDomain>("information"),[savedNotebook,setSavedNotebook]=useState(""),[pendingBackup,setPendingBackup]=useState<ExamRecord|null>(null);
 const [damagedCopy,setDamagedCopy]=useState<string|null>(null);
 const [coverageFilter,setCoverageFilter]=useState("all");
 const current=useRef(record),lastRaw=useRef<string|null>(null),writable=useRef(true),importRevision=useRef(0),workspace=useRef<HTMLElement>(null);
 useEffect(()=>{
  let next=emptyExamRecord(),message="",stored:string|null=null;writable.current=true;
  try{stored=localStorage.getItem(EXAM_PREP_KEY);lastRaw.current=stored;if(stored!==null)next=readExamRecord(JSON.parse(stored));}
  catch{writable.current=false;message=stored===null?"Browser storage is unavailable. You can practice temporarily and download your work.":"Your saved exam practice could not be read. The original is preserved. New practice stays in this tab until you download it."; }
  if(requested==="sat"||requested==="psat")next={...next,activeExam:requested};
  current.current=next;
  const initial=setTimeout(()=>{setDamagedCopy(writable.current?null:stored);setRecord(next);setCoverageFilter("all");setWarning(message);setNow(Date.now());setDomain(requestedDomain&&Object.hasOwn(examDomains,requestedDomain)?requestedDomain as ExamDomain:recommendedExamDomain(next.activeExam,next.attempts,Date.now()));setReady(true);},0);
  const timer=setInterval(()=>setNow(Date.now()),30000);
  return()=>{clearTimeout(initial);clearInterval(timer);};
 },[requested,requestedDomain]);
 useEffect(()=>{
  if(!ready)return;
  const allowed=["#exam-review","#exam-practice-workspace","#skill-coverage",...Object.keys(examSkillLessons).map(s=>"#coverage-"+s)];
  if(!allowed.includes(window.location.hash))return;
  const target=window.location.hash.slice(1);
  const frame=requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({block:"start"}));
  return()=>cancelAnimationFrame(frame);
 },[ready,requested,requestedSkill]);
 const exam=record.activeExam,session=record.sessions[exam],question=session?examBank.find(q=>q.id===session.questionIds[session.index]):null;
 const answers=sessionAnswers(record,exam,now),attempt=question?answers.find(a=>a.questionId===question.id):undefined;
 const reviews=examReviewProgress(exam,record.attempts,now),pendingReviews=reviews.filter(r=>!r.resolvedBy),finishedReviews=reviews.filter(r=>r.resolvedBy);
 const skills=examSkillEvidence(exam,record.attempts,now),suggestion=recommendedExamDomain(exam,record.attempts,now);
 const coverageGroups=[
  {id:"all",name:"All skills",items:skills},
  {id:"new",name:"Not checked",items:skills.filter(s=>!s.checked)},
  {id:"helped",name:"Correct with help",items:skills.filter(s=>s.helped>0)},
  {id:"review",name:"Needs review",items:skills.filter(s=>s.needsPractice>0)},
  {id:"independent",name:"Correct without hints",items:skills.filter(s=>s.independent>0)}
 ];
 const visibleSkills=coverageGroups.find(group=>group.id===coverageFilter)!.items;
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
 function start(mode:"diagnostic"|"practice",focus:ExamDomain,at:number,skill?:ExamSkill){
  const active=current.current.sessions[exam];
  if(active&&!active.finished&&!window.confirm("Start a new session? Checked answers stay in your history; the current unsubmitted answer will be replaced."))return;
  update(startExamSession(current.current,exam,mode,focus,at,crypto.randomUUID(),skill),at);setSavedNotebook("");focusWorkspace();
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
   const notebookKey="eai-exam-mistakes-v1";
   let copy: {raw:string|null; items:ReturnType<typeof normalizeMistakes>};
   try { copy=readSavedArray(localStorage,notebookKey,normalizeMistakes); }
   catch { throw new Error("Your saved notebook could not be read. Its original copy and your checked exam answer are preserved."); }
   const {raw,items}=copy;
   const entry=examAttemptToMistake(attempt,at);
   if(items.some(m=>m.id===entry.id)){setSavedNotebook(attempt.id);return;}
   if(items.length>=50)throw new Error("Your notebook has 50 entries. This checked attempt remains in exam practice.");
   writeStudyCopy(localStorage,notebookKey,raw,[...items,entry]);setError("");setSavedNotebook(attempt.id);
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
   if(original!==null)download(original,"dai-exam-practice-before-restore.json");
   const restored={...pendingBackup,activeExam:requested==="sat"||requested==="psat"?requested:pendingBackup.activeExam};
   if(localStorage.getItem(EXAM_PREP_KEY)!==original)throw new Error("Practice changed while restoring. Nothing was replaced; choose your backup again.");
   const raw=JSON.stringify(restored);localStorage.setItem(EXAM_PREP_KEY,raw);lastRaw.current=raw;writable.current=true;current.current=restored;setRecord(restored);setNow(at);setPendingBackup(null);setDamagedCopy(null);setError("");setSavedNotebook("");setWarning(original===null?"Exam practice restored.":"Exam practice restored. A copy of your previous saved practice was downloaded first.");setDomain(recommendedExamDomain(restored.activeExam,restored.attempts,at));window.dispatchEvent(new Event("eai-study-progress-change"));
  }catch(e){setError(e instanceof Error?e.message:"The backup could not be restored. Keep this page open and download your current work.");}
 }
 return <div className="exam-practice-page">
  <header className="exam-practice-intro"><p className="studio-eyebrow">PREPARE WITH PURPOSE</p><h1>Your next breakthrough starts with a clear picture.</h1><p>Find a starting point, practice a specific skill, and learn from the reasoning behind each answer.</p><StudyGuide section="Exam skill practice">Choose a short skill check to find a starting point, or practice one skill. Select an answer and check it, then read the explanation. Use the suggested reviews to return to skills that need another attempt.</StudyGuide><Link href="/study#exam-preparation">← Return to exam preparation</Link></header>
  <div className="exam-profile-nav" aria-label="Practice exam profile">{(["sat","psat"] as const).map(value=><Link key={value} href={`/study/exams?exam=${value}`} aria-current={exam===value?"page":undefined} scroll={false}>{examName(value)}</Link>)}</div>
  <p className="exam-practice-scope">{examBank.length} original dAI questions · 16 sampled skills · 8 content domains. Shared foundational skills, separate profile histories. This is a small learning snapshot—not a full test, an official score, or a complete exam course. <a href={examDomainSource.url} target="_blank" rel="noopener noreferrer">Official domain outline ↗</a></p>
  {!ready?<p role="status">Opening your saved practice…</p>:<>
   {warning&&<div className="goal-notice" role="status">{warning} {damagedCopy!==null&&<button onClick={()=>download(damagedCopy,"dai-exam-practice-original.json")}>Download original saved copy</button>} <button onClick={backup}>Download practice backup</button></div>}
   {error&&<p className="goal-error" role="alert">{error}</p>}
   <div className="exam-start-grid"><section className="exam-start-card"><p className="studio-eyebrow">FIND YOUR STARTING POINT</p><h2>A short skill check.</h2><p>Eight questions, one per domain. Use a hint or skip when needed—we keep that separate from an independent answer. Untimed; pause and return.</p><button className="goal-primary" onClick={event=>start("diagnostic",domain,eventTime(event))}>{session&&!session.finished?"Start a new skill check":"Start skill check"}</button></section><section className="exam-start-card"><p className="studio-eyebrow">FOCUSED PRACTICE</p><h2>Work on one area.</h2><label className="goal-label">Practice focus<select value={domain} onChange={e=>setDomain(e.target.value as ExamDomain)}>{(Object.keys(examDomains) as ExamDomain[]).map(d=><option key={d} value={d}>{examDomains[d].name}</option>)}</select></label><p className="goal-helper">Suggested from your latest checked items: {examDomains[suggestion].name}. A small sample cannot establish mastery.</p><div className="goal-actions"><button className="goal-primary" onClick={event=>start("practice",domain,eventTime(event))}>Start targeted practice</button><button onClick={()=>setDomain(suggestion)}>Use suggested focus</button><a href="#skill-coverage">Browse skills ↓</a></div></section></div>
   <section id="exam-review" className="exam-review-panel" aria-labelledby="exam-review-heading"><div className="exam-review-heading"><div><p className="studio-eyebrow">BUILD UNDERSTANDING THAT LASTS</p><h2 id="exam-review-heading">Return to the idea. Try it differently.</h2></div><span>{pendingReviews.filter(r=>r.dueAt<=now).length} ready · {pendingReviews.filter(r=>r.dueAt>now).length} upcoming</span></div><p>Missed and helped answers suggest a review 24 hours later. Review sooner if you like. A different question answered without hints completes this follow-up; it does not prove mastery. Dates are suggestions, with no automatic notifications.</p>
    {!pendingReviews.length&&<p className="exam-review-empty">{finishedReviews.length?"Your current follow-ups have a different example answered without hints. Keep exploring, or choose another practice area.":"Your review list will grow from checked answers. Skipping a question is not counted as a mistake."}</p>}
    {requestedSkill&&Object.hasOwn(examSkillLessons,requestedSkill)&&!pendingReviews.some(r=>r.skill===requestedSkill)&&<p className="goal-notice">There is no pending review for {examSkillLessons[requestedSkill as ExamSkill].name} in this profile. Your latest evidence may have changed.</p>}
    <div className="exam-review-list">{pendingReviews.slice(0,3).map(reviewCard)}</div>{pendingReviews.length>3&&<details><summary>View {pendingReviews.length-3} more suggested reviews</summary><div className="exam-review-list">{pendingReviews.slice(3).map(reviewCard)}</div></details>}
    {!!finishedReviews.length&&<details className="exam-review-evidence"><summary>{finishedReviews.length} {finishedReviews.length===1?"idea revisited":"ideas revisited"} with a different example</summary>{finishedReviews.map(review=><p key={review.skill}><strong>{examSkillLessons[review.skill].name}</strong> · Different question answered without hints on {new Date(review.resolvedBy!.submittedAt).toLocaleDateString()}. Earlier attempts stay in your history.</p>)}</details>}
   </section>
   {session&&<section id="exam-practice-workspace" ref={workspace} tabIndex={-1} className="exam-question-shell" aria-label="Exam practice workspace">
    {session.finished?<><p className="studio-eyebrow">SESSION COMPLETE</p><h2>Your practice snapshot.</h2><p>{answers.filter(a=>a.selectedIndex!==null).length} answered · {answers.filter(a=>a.selectedIndex===null).length} skipped. These results describe this set of questions, not your overall ability.</p><div className="exam-session-results">{answers.map(a=>{const q=examBank.find(q=>q.id===a.questionId)!;return <details key={a.id}><summary>{examSkillLessons[q.skill].name} · {a.selectedIndex===null?"Not answered":a.selectedIndex!==q.answerIndex?"Needs another look":a.hintsUsed?"Correct with help":"Correct without hints"}</summary>{q.passage&&<p className="exam-passage">{q.passage}</p>}<p>{display(q.prompt)}</p><p>Your answer: {a.selectedIndex===null?"Skipped":display(q.choices[a.selectedIndex])}</p><p>{q.explanation}</p></details>;})}</div><div className="goal-actions"><button className="goal-primary" onClick={event=>{setDomain(suggestion);start("practice",suggestion,eventTime(event));}}>Practice the suggested area</button><Link href="/study#my-learning">Return to my learning home ↗</Link></div></>:question&&<>
     <div className="exam-question-top"><p className="studio-eyebrow">{session.mode==="diagnostic"?"SKILL CHECK":"TARGETED PRACTICE"} · {session.index+1} / {session.questionIds.length}</p><span>{examDomains[question.domain].name}</span></div><progress value={answers.length} max={session.questionIds.length} aria-label="Questions checked or skipped in this session"/>
     <h2>{examSkillLessons[question.skill].name}</h2>{question.passage&&<div className="exam-passage">{question.passage}</div>}<p className="exam-question-prompt">{display(question.prompt)}</p>
     {session.startedAt>now&&<p role="alert" className="goal-error">Your device clock is earlier than this saved session. Check your date and time before submitting.</p>}
     <fieldset disabled={!!attempt||session.startedAt>now}><legend>Choose your answer</legend><div className="exam-answer-options">{question.choices.map((choice,index)=><label key={index} data-selected={(attempt?attempt.selectedIndex:session.selectedIndex)===index}><input type="radio" name={`exam-answer-${session.id}-${question.id}`} checked={(attempt?attempt.selectedIndex:session.selectedIndex)===index} onChange={event=>draft({selectedIndex:index},eventTime(event))}/><span className="exam-choice-letter">{String.fromCharCode(65+index)}</span><span>{display(choice)}</span></label>)}</div></fieldset>
     <label className="goal-label">Your reasoning · optional<textarea rows={2} maxLength={500} value={attempt?.reasoning??session.reasoning} disabled={!!attempt} onChange={e=>draft({reasoning:e.target.value},eventTime(e))} placeholder="What led you to your answer?"/></label>
     {(attempt?.hintsUsed||session.hintsUsed)>0&&<div className="exam-hints" aria-live="polite">{question.hints.slice(0,attempt?.hintsUsed??session.hintsUsed).map((hint,index)=><p key={index}><strong>Hint {index+1}:</strong> {hint}</p>)}</div>}
     {!attempt?<div className="goal-actions"><button className="goal-primary" disabled={session.selectedIndex===null||session.startedAt>now} onClick={event=>answer(false,eventTime(event))}>Check answer</button><button disabled={session.hintsUsed>=question.hints.length} onClick={event=>draft({hintsUsed:session.hintsUsed+1},eventTime(event))}>Show a hint · counts as help</button><button onClick={event=>answer(true,eventTime(event))}>Skip for now</button></div>:<>
      <div className="exam-answer-feedback" role="status"><h3>{attempt.selectedIndex===null?"Not answered yet.":attempt.selectedIndex===question.answerIndex?attempt.hintsUsed?"Correct with help.":"Correct without hints.":"Let’s work through the reasoning."}</h3>{attempt.selectedIndex===null?<p>This item is recorded as skipped, not incorrect. Its explanation is available below.</p>:<p>{question.choiceNotes[attempt.selectedIndex]}</p>}<p><strong>Answer:</strong> {display(question.choices[question.answerIndex])}</p><p>{question.explanation}</p>{reviews.some(review=>review.resolvedBy?.id===attempt.id)&&<p className="exam-review-breakthrough"><strong>A different example, answered without hints.</strong> This completes the current follow-up for this skill. Your earlier attempt stays in history; one follow-up does not establish mastery.</p>}<details><summary>Why each choice works or doesn’t</summary>{question.choices.map((choice,index)=><p key={index}><strong>{String.fromCharCode(65+index)}. {display(choice)}</strong> — {question.choiceNotes[index]}</p>)}</details></div>
      <aside className="practice-next-action" aria-label="Your next exam practice step"><p className="studio-eyebrow">YOUR NEXT MOVE</p><h3>{attempt.selectedIndex===null?"Revisit the key idea when ready.":attempt.selectedIndex!==question.answerIndex?"Understand the first gap, then move forward.":attempt.hintsUsed?"Try the next example without hints.":"Apply your reasoning to the next question."}</h3><p>{attempt.selectedIndex!==question.answerIndex?"Use the authored explanation or ask your tutor to explain the reasoning differently. Your original answer stays in history.":"Keep your explanation in mind and try a different question. One answer does not establish mastery."}</p><button onClick={event=>tutor(eventTime(event))}>Explain this differently with my tutor ↗</button></aside><div className="goal-actions"><button className="goal-primary" onClick={event=>advance(eventTime(event))}>{session.index+1===session.questionIds.length?"See my snapshot":"Next question →"}</button>{attempt.selectedIndex!==null&&<button disabled={savedNotebook===attempt.id} onClick={event=>saveMistake(eventTime(event))}>{savedNotebook===attempt.id?"Saved to notebook":"Save this attempt to my notebook"}</button>}</div>
     </>}
     <div className="exam-study-actions"><button onClick={event=>tutor(eventTime(event))}>Work through this with my tutor{!attempt?" · counts as help":""} ↗</button><details><summary>Review the key idea{!attempt?" · counts as help":""}</summary><button disabled={!!attempt||session.hintsUsed>=question.hints.length} onClick={event=>draft({hintsUsed:question.hints.length},eventTime(event))}>Use the mini lesson · counts as help</button>{(!!attempt||session.hintsUsed===question.hints.length)&&<div><p>{examSkillLessons[question.skill].idea}</p><p><strong>Another example:</strong> {examSkillLessons[question.skill].example}</p><p><strong>Think about:</strong> {examSkillLessons[question.skill].check}</p></div>}</details></div>
    </>}
   </section>}
   <section id="skill-coverage" className="exam-evidence-grid" aria-labelledby="exam-evidence-title">
    <h2 id="exam-evidence-title">{examName(exam)} skill coverage</h2>
    <p>{skills.filter(s=>s.checked>0).length} of {skills.length} skills have a checked answer. Counts use the latest attempt on each question in this profile. A skill can appear in several groups.</p>
    <label className="goal-label">Show skills
      <select value={coverageFilter} onChange={e=>setCoverageFilter(e.target.value)}>{coverageGroups.map(g=><option key={g.id} value={g.id}>{g.name} ({g.items.length})</option>)}</select>
    </label>
    {!visibleSkills.length && <p role="status">No skills match this group for {examName(exam)} yet. Choose All skills to start practicing.</p>}
    <div>{(Object.keys(examDomains) as ExamDomain[]).map(d=>{
      const rows=visibleSkills.filter(s=>s.domain===d);
      return rows.length>0 && <article key={d}><p className="studio-eyebrow">{examDomains[d].section}</p><h3>{examDomains[d].name}</h3>
        {rows.map(s=><div className="exam-skill-row" id={`coverage-${s.skill}`} key={s.skill}>
          <strong>{examSkillLessons[s.skill].name}</strong>
          <span>{s.checked} of {s.total} questions checked · {s.independent} correct without hints · {s.helped} correct with help · {s.needsPractice} need review{s.unanswered>0 && ` · ${s.unanswered} skipped`}</span>
          <button type="button" className="goal-primary self-start" aria-label={`Practice ${examSkillLessons[s.skill].name}`} onClick={event=>start("practice",d,eventTime(event),s.skill)}>Practice this skill →</button>
        </div>)}
      </article>;
    })}</div>
   </section>
   <footer className="exam-practice-footer"><p>Saved in this browser{accountConfigured&&<> · <Link href="/study/account">Optional account saving</Link></>}. {examName(exam)} profile results stay separate. Original dAI exercises; not affiliated with or endorsed by College Board. No official score or readiness prediction.</p><button onClick={backup}>Download practice backup</button><label className="exam-backup-import">Open a practice backup<input type="file" accept="application/json,.json" aria-label="Open exam practice backup" onChange={event=>{void importBackup(event.target.files?.[0]);event.target.value="";}}/></label><Link href="/study#mistake-notebook">Open my mistake notebook ↗</Link>{pendingBackup&&<div className="exam-backup-preview"><h3>Review this backup before restoring.</h3><p>{pendingBackup.attempts.length} checked or skipped attempts, with separate SAT and PSAT sessions. Restoring replaces exam practice on this device. Your other learning tools stay unchanged. We download the existing exam-practice copy first.</p><button onClick={event=>restoreBackup(eventTime(event))}>Restore this exam-practice backup</button><button onClick={()=>setPendingBackup(null)}>Cancel restore</button></div>}</footer>
  </>}
 </div>;
}

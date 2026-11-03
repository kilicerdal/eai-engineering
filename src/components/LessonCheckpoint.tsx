"use client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {normalizeStudyMath} from "@/lib/study-markdown";
import {useEffect,useRef,useState} from "react";
import {readSavedArray,writeStudyCopy} from "@/lib/study-safe-storage";
import {normalizeMistakes} from "@/lib/study-exams";
import {CHECK_KEY,readLessonDraft,lessonIdentity,checkLabel,checkReviewMethod,normalizeLessonChecks,latestLessonCheck,checkMemory,validateCheckQuestion,validateCheckFeedback,type LessonContext,type CheckQuestion,type LessonCheck} from "@/lib/study-checkpoints";
function CheckText({text}:{text:string}){return <div className="lesson-check-rich"><ReactMarkdown skipHtml remarkPlugins={[remarkGfm,remarkMath]} rehypePlugins={[rehypeKatex]} components={{img:()=>null,a:({children})=><span>{children}</span>}}>{normalizeStudyMath(text)}</ReactMarkdown></div>;}
export default function LessonCheckpoint({context,sessionId,disabled=false,recentWork="",kind="lesson",openSource}:{context:LessonContext;sessionId:string;disabled?:boolean;recentWork?:string;kind?:"lesson"|"notebook"|"material";openSource?:(source:{documentId:string;page:number;quote:string})=>void}){
 const [notebookSaved,setNotebookSaved]=useState(false),[open,setOpen]=useState(kind!=="lesson"),[question,setQuestion]=useState<CheckQuestion|null>(null),[answer,setAnswer]=useState(""),[help,setHelp]=useState(false),[hint,setHint]=useState(""),[result,setResult]=useState<LessonCheck|null>(null),[previous,setPrevious]=useState<LessonCheck|null>(null),[hintRequested,setHintRequested]=useState(false),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(""),[warning,setWarning]=useState("");
 const [revising,setRevising]=useState(false);
 const controller=useRef<AbortController|null>(null),attemptId=useRef("");
 const draftCopy=useRef<{raw:string|null}|null>(null);
 const draftKey=`eai-lesson-check-draft-${sessionId}`;
 useEffect(()=>{
  draftCopy.current=null;
  let cancelled=false;
  queueMicrotask(()=>{
   if(cancelled)return;
   setQuestion(null);setAnswer("");setResult(null);setPrevious(null);setHint("");setHelp(false);setHintRequested(false);setRevising(false);setWarning("");draftCopy.current=null;
   let checks:LessonCheck[]=[];
   try{checks=readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks).items;setPrevious(latestLessonCheck(context,checks,Date.now()));}
   catch{setWarning("Saved feedback could not be fully read. The original history has been preserved.");}
   try{
    const raw=localStorage.getItem(draftKey);
    if(raw!==null){
     const draft=readLessonDraft(JSON.parse(raw),context),restored=draft.question;
     setQuestion(restored);setRevising(draft.revising);attemptId.current=draft.id;setAnswer(draft.answer);setHelp(draft.help);setHintRequested(draft.hintRequested);setHint(draft.hint);setResult(checks.find(c=>c.id===draft.id&&lessonIdentity(c.context)===lessonIdentity(context))||null);setOpen(true);
    }
    draftCopy.current={raw};
   }catch(error){setWarning(error instanceof Error?error.message:"The saved draft could not be read. The original copy has been preserved.");}
   setReady(true);
  });
  return()=>{cancelled=true;controller.current?.abort();};
 },[draftKey,context]);
 useEffect(()=>{
  if(!ready||!question||!draftCopy.current)return;
  try{
   if(!draftCopy.current)throw new Error("Draft saving is paused. The earlier saved copy has been preserved.");
   draftCopy.current.raw=writeStudyCopy(localStorage,draftKey,draftCopy.current.raw,{id:attemptId.current,identity:lessonIdentity(context),question,answer,help,hint,hintRequested,revising});
  }catch{draftCopy.current=null;queueMicrotask(()=>setWarning("Draft saving is paused. Copy your answer before leaving; the earlier saved copy has been preserved."));}
 },[ready,question,answer,help,hint,hintRequested,revising,draftKey,context]);
 async function request(action:"question"|"hint"|"review"){
  if(busy||disabled||controller.current)return;setBusy(true);setError("");controller.current=new AbortController();
  // Once a hint is requested, preserve that help signal even if delivery is interrupted.
  if(action==="hint"){setHelp(true);setHintRequested(true);}
  try{
   const response=await fetch("/api/study/checkpoint",{method:"POST",headers:{"Content-Type":"application/json"},signal:AbortSignal.any([controller.current.signal,AbortSignal.timeout(55000)]),body:JSON.stringify({action,context,question,answer,recentWork:action==="question"?[recentWork,checkMemory(previous)].filter(Boolean).join("\n").slice(0,4000):undefined,previousQuestion:question?.question||previous?.question.question})});
   const data=await response.json();if(controller.current?.signal.aborted)throw new DOMException("Cancelled","AbortError");if(!response.ok)throw new Error(data.error||"This check could not be completed.");
   if(action==="question"){const next=validateCheckQuestion(data.question);attemptId.current=crypto.randomUUID();setQuestion(next);setAnswer("");setHint("");setHelp(false);setHintRequested(false);setResult(null);setRevising(false);setNotebookSaved(false);setOpen(true);}
   else if(action==="hint")setHint(data.hint);
   else{
    const checked=validateCheckFeedback(data.result);
    const record:LessonCheck={id:attemptId.current,context,question:question!,answer:answer.trim(),helpUsed:help||hintRequested,result:checked,submittedAt:Date.now()};
    setResult(record);setPrevious(record);
    try{const saved=readSavedArray(localStorage,CHECK_KEY,normalizeLessonChecks),existing=saved.items;writeStudyCopy(localStorage,CHECK_KEY,saved.raw,normalizeLessonChecks([record,...existing.filter(c=>c.id!==record.id)]));window.dispatchEvent(new Event("eai-study-progress-change"));}
    catch{setWarning("The feedback could not be saved. Keep this page open and copy it before leaving.");}
   }
  }catch(e){setError(e instanceof Error&&e.name==="AbortError"?"Check cancelled. Your saved results have not been replaced.":e instanceof Error?e.message:"The check could not be completed.");}finally{setBusy(false);controller.current=null;}
 }
 function revise(){
  if(!result||busy||disabled)return;
  attemptId.current=crypto.randomUUID();setPrevious(result);setResult(null);setHelp(true);setHintRequested(true);setRevising(true);setNotebookSaved(false);setError("");
  requestAnimationFrame(()=>document.getElementById(`check-answer-${sessionId}`)?.focus());
 }
 function saveNotebook(){
  if(!result)return;
  try{const key="eai-exam-mistakes-v1",saved=readSavedArray(localStorage,key,normalizeMistakes),items=saved.items,id=`check-${result.id}`;
   if(items.some(item=>item.id===id)){setNotebookSaved(true);return;}
   if(items.length>=50)throw new Error("Your notebook has 50 entries. This check remains saved in your lesson history.");
   if(result.question.question.length>1200||result.answer.length>700)throw new Error("This attempt is too long for the existing notebook. The full answer and feedback remain saved in your lesson history.");
   const entry={id,exam:"Lesson practice",question:result.question.question,answer:result.answer,expected:"",reflection:`${checkReviewMethod(result)} lesson check: ${checkLabel(result)}\n${result.result.feedback}\nReasoning gap: ${result.result.reasoningGap}\nNext step: ${result.result.nextStep}`,createdAt:result.submittedAt,reviewAt:Date.now()+86400000,reviews:0};
   writeStudyCopy(localStorage,key,saved.raw,[...items,entry]);window.dispatchEvent(new Event("eai-study-progress-change"));window.dispatchEvent(new Event("eai-study-notebook-update"));setNotebookSaved(true);setError("");
  }catch(e){setError(e instanceof Error?e.message:"This attempt could not be added to your notebook.");}
 }
 return <section id={kind==="notebook"?"mistake-understanding-check":kind==="material"?"material-understanding-check":"lesson-understanding-check"} className="lesson-check" aria-label={kind==="notebook"?"Mistake practice check":kind==="material"?"Material practice check":"Lesson understanding check"} aria-busy={busy}>
  <div className="lesson-check-heading"><div><p className="studio-eyebrow">PUT THE IDEA INTO PRACTICE</p><h3>{kind==="notebook"?"Try the idea again. Show your reasoning.":kind==="material"?"Practice from your passage.":"Check this lesson’s understanding."}</h3><p>{context.lesson.title}</p></div><button type="button" disabled={!ready||busy||disabled} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Close check":kind==="notebook"?"Open practice check":"Open lesson check"}</button></div>
  {open&&<><p className="goal-helper">{kind==="notebook"?"Try a different question on the idea behind this saved attempt. Your original entry and review date stay unchanged.":kind==="material"?"Keep the passage nearby. Explain your answer using what the source supports.":"Try a fresh question after working through the lesson."} {context.sources?.length?"AI reviews your reasoning against the supplied passage, with source quotations you can inspect. This does not certify mastery or predict an exam score.":"AI reviews your reasoning; short numeric answers to recognized linear equations use a substitution check. Neither certifies mastery or predicts an exam score."} Help use is self-reported.</p>
  {!question&&<><p>{previous?`Last check: ${checkLabel(previous)}. ${previous.result.nextStep}`:"Explain your reasoning so the tutor can identify what to work on next."}</p><button type="button" className="goal-primary" disabled={busy||disabled} onClick={()=>void request("question")}>Create a fresh question</button>{kind==="notebook"&&previous&&<details className="lesson-check-result"><summary>Last saved practice attempt</summary><CheckText text={previous.question.question}/><p><strong>Your answer:</strong> {previous.answer}</p><p><strong>{checkLabel(previous)}</strong> · Help use self-reported</p><CheckText text={previous.result.feedback}/><p><strong>Reasoning gap:</strong> {previous.result.reasoningGap}</p><p><strong>Next step:</strong> {previous.result.nextStep}</p></details>}</>}
  {question&&<><div className="lesson-check-question"><h4>Your practice question</h4><CheckText text={question.question}/><p className="goal-helper">What we’re checking: {question.criterion}</p></div>
  <label className="goal-label">Your answer and reasoning<textarea id={`check-answer-${sessionId}`} aria-label="Lesson check answer" rows={4} maxLength={2500} value={answer} disabled={busy||!!result||disabled} onChange={e=>setAnswer(e.target.value)} placeholder="Show how you reached your answer…"/></label>
  <label className="lesson-check-help"><input type="checkbox" checked={help} disabled={busy||!!result||hintRequested||disabled} onChange={e=>setHelp(e.target.checked)}/>I used help, notes, or an example for this answer.</label>
  {revising&&!result&&<p className="goal-notice">Revise using the feedback. Your earlier attempt stays in history; this revision counts as using help.</p>}
  {!result&&<div className="goal-actions"><button type="button" className="goal-primary" disabled={busy||disabled||!answer.trim()} onClick={()=>void request("review")}>Review my reasoning</button><button type="button" disabled={busy||disabled||!!hint} onClick={()=>void request("hint")}>Get a hint · counts as help</button></div>}
  {hint&&<p className="lesson-check-hint"><strong>Hint:</strong> {hint}</p>}
  {result&&<div className="lesson-check-result" aria-live="polite"><p className="studio-eyebrow">{checkReviewMethod(result).toUpperCase()} · HELP USE SELF-REPORTED</p><h4>{checkLabel(result)}</h4><CheckText text={result.result.feedback}/>{result.result.answerExcerpt&&<blockquote className="lesson-check-evidence"><strong>From your answer</strong><p>{result.result.answerExcerpt}</p></blockquote>}{result.result.sourceEvidence?.map((e,i)=>{const source=context.sources?.find(s=>s.sourceId===e.sourceId);return source&&<blockquote className="lesson-check-evidence" key={i}><strong>Source support · {source.name} · {source.kind==="pdf"?"Page":"Section"} {source.page}</strong><p>{e.quote}</p>{openSource&&<button type="button" onClick={()=>openSource({...source,quote:e.quote})}>Open source passage ↗</button>}</blockquote>;})}<p><strong>Reasoning gap:</strong> {result.result.reasoningGap}</p><p><strong>Next step:</strong> {result.result.nextStep}</p><div className="lesson-check-guiding">{result.result.guidingQuestion&&<><strong>Continue your reasoning</strong><CheckText text={result.result.guidingQuestion}/></>}<button type="button" className="goal-primary" disabled={busy||disabled} onClick={revise}>Revise my answer · counts as help</button></div><div className="goal-actions">{kind==="notebook"?<a href="#mistake-notebook">Return to my notebook ↑</a>:kind==="material"?<a href="#material-reviews">See passage reviews ↑</a>:<><a href="/study#my-learning">See this in my learning home ↗</a><button type="button" disabled={notebookSaved} onClick={saveNotebook}>{notebookSaved?"Saved to mistake notebook":"Save this reflection to my notebook"}</button></>}</div></div>}
  <div className="goal-actions"><button type="button" disabled={busy||disabled} onClick={()=>void request("question")}>New question · replaces this draft</button></div></>}
  {busy&&<p role="status">Working on your practice check… <button type="button" onClick={()=>controller.current?.abort()}>Cancel</button></p>}
  </>}
  {warning&&<p className="goal-notice" role="status">{warning}</p>}{error&&<p className="goal-error" role="alert">{error}</p>}
 </section>;
}

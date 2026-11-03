"use client";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {normalizeStudyMath} from "@/lib/study-markdown";
import {useEffect,useRef,useState} from "react";
import {normalizeMistakes} from "@/lib/study-exams";
import {CHECK_KEY,lessonIdentity,checkLabel,normalizeLessonChecks,latestLessonCheck,validateCheckQuestion,validateCheckFeedback,type LessonContext,type CheckQuestion,type LessonCheck} from "@/lib/study-checkpoints";
function CheckText({text}:{text:string}){return <div className="lesson-check-rich"><ReactMarkdown skipHtml remarkPlugins={[remarkGfm,remarkMath]} rehypePlugins={[rehypeKatex]} components={{img:()=>null,a:({children})=><span>{children}</span>}}>{normalizeStudyMath(text)}</ReactMarkdown></div>;}
export default function LessonCheckpoint({context,sessionId,disabled=false,recentWork="",kind="lesson"}:{context:LessonContext;sessionId:string;disabled?:boolean;recentWork?:string;kind?:"lesson"|"notebook"}){
 const [notebookSaved,setNotebookSaved]=useState(false),[open,setOpen]=useState(kind==="notebook"),[question,setQuestion]=useState<CheckQuestion|null>(null),[answer,setAnswer]=useState(""),[help,setHelp]=useState(false),[hint,setHint]=useState(""),[result,setResult]=useState<LessonCheck|null>(null),[previous,setPrevious]=useState<LessonCheck|null>(null),[hintRequested,setHintRequested]=useState(false),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(""),[warning,setWarning]=useState("");
 const controller=useRef<AbortController|null>(null),attemptId=useRef("");
 const draftKey=`eai-lesson-check-draft-${sessionId}`;
 useEffect(()=>{try{
  const checks=normalizeLessonChecks(JSON.parse(localStorage.getItem(CHECK_KEY)||"[]"));setPrevious(latestLessonCheck(context,checks,Date.now()));
  const draft=JSON.parse(localStorage.getItem(draftKey)||"null");
  if(draft){setQuestion(validateCheckQuestion(draft.question));attemptId.current=typeof draft.id==="string"?draft.id:crypto.randomUUID();setAnswer(typeof draft.answer==="string"?draft.answer.slice(0,2500):"");setHelp(draft.help===true);setHintRequested(draft.hintRequested===true);setHint(typeof draft.hint==="string"?draft.hint.slice(0,900):"");setResult(checks.find(c=>c.id===attemptId.current&&lessonIdentity(c.context)===lessonIdentity(context))||null);setOpen(true);}
 }catch{setWarning("Some saved check data could not be restored. Your original lesson is unchanged.");}setReady(true);return()=>controller.current?.abort();},[draftKey,context]);
 useEffect(()=>{if(!ready||!question)return;try{localStorage.setItem(draftKey,JSON.stringify({id:attemptId.current,question,answer,help,hint,hintRequested}));}catch{setWarning("This browser could not save your check draft. Keep this page open and copy your answer.");}},[ready,question,answer,help,hint,hintRequested,draftKey]);
 async function request(action:"question"|"hint"|"review"){
  if(busy||disabled||controller.current)return;setBusy(true);setError("");controller.current=new AbortController();
  // Once a hint is requested, preserve that help signal even if delivery is interrupted.
  if(action==="hint"){setHelp(true);setHintRequested(true);}
  try{
   const response=await fetch("/api/study/checkpoint",{method:"POST",headers:{"Content-Type":"application/json"},signal:AbortSignal.any([controller.current.signal,AbortSignal.timeout(55000)]),body:JSON.stringify({action,context,question,answer,recentWork:action==="question"?recentWork.slice(0,4000):undefined,previousQuestion:question?.question||previous?.question.question})});
   const data=await response.json();if(controller.current?.signal.aborted)throw new DOMException("Cancelled","AbortError");if(!response.ok)throw new Error(data.error||"This check could not be completed.");
   if(action==="question"){const next=validateCheckQuestion(data.question);attemptId.current=crypto.randomUUID();setQuestion(next);setAnswer("");setHint("");setHelp(false);setHintRequested(false);setResult(null);setNotebookSaved(false);setOpen(true);}
   else if(action==="hint")setHint(data.hint);
   else{
    const checked=validateCheckFeedback(data.result);
    const record:LessonCheck={id:attemptId.current,context,question:question!,answer:answer.trim(),helpUsed:help||hintRequested,result:checked,submittedAt:Date.now()};
    setResult(record);setPrevious(record);
    try{const existing=normalizeLessonChecks(JSON.parse(localStorage.getItem(CHECK_KEY)||"[]"));localStorage.setItem(CHECK_KEY,JSON.stringify(normalizeLessonChecks([record,...existing.filter(c=>c.id!==record.id)])));window.dispatchEvent(new Event("eai-study-progress-change"));}
    catch{setWarning("The feedback could not be saved. Keep this page open and copy it before leaving.");}
   }
  }catch(e){setError(e instanceof Error&&e.name==="AbortError"?"Check cancelled. Your saved results have not been replaced.":e instanceof Error?e.message:"The check could not be completed.");}finally{setBusy(false);controller.current=null;}
 }
 function saveNotebook(){
  if(!result)return;
  try{const key="eai-exam-mistakes-v1",items=normalizeMistakes(JSON.parse(localStorage.getItem(key)||"[]")),id=`check-${result.id}`;
   if(items.some(item=>item.id===id)){setNotebookSaved(true);return;}
   if(items.length>=50)throw new Error("Your notebook has 50 entries. This check remains saved in your lesson history.");
   if(result.question.question.length>1200||result.answer.length>700)throw new Error("This attempt is too long for the existing notebook. The full answer and feedback remain saved in your lesson history.");
   const entry={id,exam:"Lesson practice",question:result.question.question,answer:result.answer,expected:"",reflection:`AI-reviewed lesson check: ${checkLabel(result)}\n${result.result.feedback}\nReasoning gap: ${result.result.reasoningGap}\nNext step: ${result.result.nextStep}`,createdAt:result.submittedAt,reviewAt:Date.now()+86400000,reviews:0};
   localStorage.setItem(key,JSON.stringify([...items,entry]));window.dispatchEvent(new Event("eai-study-progress-change"));window.dispatchEvent(new Event("eai-study-notebook-update"));setNotebookSaved(true);setError("");
  }catch(e){setError(e instanceof Error?e.message:"This attempt could not be added to your notebook.");}
 }
 return <section id={kind==="notebook"?"mistake-understanding-check":"lesson-understanding-check"} className="lesson-check" aria-label={kind==="notebook"?"Mistake practice check":"Lesson understanding check"} aria-busy={busy}>
  <div className="lesson-check-heading"><div><p className="studio-eyebrow">PUT THE IDEA INTO PRACTICE</p><h3>{kind==="notebook"?"Try the idea again. Show your reasoning.":"Check this lesson’s understanding."}</h3><p>{context.lesson.title}</p></div><button type="button" disabled={!ready||busy||disabled} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Close check":kind==="notebook"?"Open practice check":"Open lesson check"}</button></div>
  {open&&<><p className="goal-helper">{kind==="notebook"?"Try a different question on the idea behind this saved attempt. Your original entry and review date stay unchanged.":"Try a fresh question after working through the lesson."} AI reviews your reasoning; it does not certify mastery or predict an exam score. Help use is self-reported.</p>
  {!question&&<><p>{previous?`Last check: ${checkLabel(previous)}. ${previous.result.nextStep}`:"Explain your reasoning so the tutor can identify what to work on next."}</p><button type="button" className="goal-primary" disabled={busy||disabled} onClick={()=>void request("question")}>Create a fresh question</button>{kind==="notebook"&&previous&&<details className="lesson-check-result"><summary>Last saved practice attempt</summary><CheckText text={previous.question.question}/><p><strong>Your answer:</strong> {previous.answer}</p><p><strong>{checkLabel(previous)}</strong> · Help use self-reported</p><CheckText text={previous.result.feedback}/><p><strong>Reasoning gap:</strong> {previous.result.reasoningGap}</p><p><strong>Next step:</strong> {previous.result.nextStep}</p></details>}</>}
  {question&&<><div className="lesson-check-question"><h4>Your practice question</h4><CheckText text={question.question}/><p className="goal-helper">What we’re checking: {question.criterion}</p></div>
  <label className="goal-label">Your answer and reasoning<textarea aria-label="Lesson check answer" rows={4} maxLength={2500} value={answer} disabled={busy||!!result||disabled} onChange={e=>setAnswer(e.target.value)} placeholder="Show how you reached your answer…"/></label>
  <label className="lesson-check-help"><input type="checkbox" checked={help} disabled={busy||!!result||hintRequested||disabled} onChange={e=>setHelp(e.target.checked)}/>I used help, notes, or an example for this answer.</label>
  {!result&&<div className="goal-actions"><button type="button" className="goal-primary" disabled={busy||disabled||!answer.trim()} onClick={()=>void request("review")}>Review my reasoning</button><button type="button" disabled={busy||disabled||!!hint} onClick={()=>void request("hint")}>Get a hint · counts as help</button></div>}
  {hint&&<p className="lesson-check-hint"><strong>Hint:</strong> {hint}</p>}
  {result&&<div className="lesson-check-result" aria-live="polite"><p className="studio-eyebrow">AI-REVIEWED · HELP USE SELF-REPORTED</p><h4>{checkLabel(result)}</h4><CheckText text={result.result.feedback}/><p><strong>Reasoning gap:</strong> {result.result.reasoningGap}</p><p><strong>Next step:</strong> {result.result.nextStep}</p><div className="goal-actions">{kind==="notebook"?<a href="#mistake-notebook">Return to my notebook ↑</a>:<><a href="/study#my-learning">See this in my learning home ↗</a><button type="button" disabled={notebookSaved} onClick={saveNotebook}>{notebookSaved?"Saved to mistake notebook":"Save this reflection to my notebook"}</button></>}</div></div>}
  <div className="goal-actions"><button type="button" disabled={busy||disabled} onClick={()=>void request("question")}>New question · replaces this draft</button></div></>}
  {busy&&<p role="status">Working on your practice check… <button type="button" onClick={()=>controller.current?.abort()}>Cancel</button></p>}
  </>}
  {warning&&<p className="goal-notice" role="status">{warning}</p>}{error&&<p className="goal-error" role="alert">{error}</p>}
 </section>;
}

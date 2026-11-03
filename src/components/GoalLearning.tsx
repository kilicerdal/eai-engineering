"use client";

import { accountConfigured } from "@/lib/study-account";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StudyLandmark from "@/components/StudyLandmark";
import { MATERIAL_HANDOFF_KEY, makeLessonMaterialHandoff } from "@/lib/study-material-handoff";
import { CHECK_KEY, normalizeLessonChecks, latestLessonCheck, checkMemory } from "@/lib/study-checkpoints";
import { defaultGoalSettings, goalLevels, goalLessonPrompt, normalizeGoalProgress, validateGoalPlan, validateGoalSettings, type GoalPlan, type GoalSettings, type GoalSource } from "@/lib/study-goal";
import { writeStudyCopy } from "@/lib/study-safe-storage";
import { importCourseFile, importCourseNotes, loadMaterialLibrary, saveMaterialLibrary } from "@/lib/study-material-files";
import { MATERIAL_LIMITS, materialLocation, selectMaterialExcerpts, validateMaterialSources, type MaterialLibrary } from "@/lib/study-materials";

const KEY = "eai-goal-journey-v1";
const examples = ["Understand calculus even though my algebra is rusty", "Learn world history and connect major events", "Learn Python so I can automate everyday tasks"];
const emptyLibrary: MaterialLibrary = { documents: [], entries: [] };
export default function GoalLearning() {
  const [settings,setSettings]=useState<GoalSettings>(defaultGoalSettings);
  const [plan,setPlan]=useState<GoalPlan|null>(null);
  const [sources,setSources]=useState<GoalSource[]>([]);
  const [completed,setCompleted]=useState<string[]>([]);
  const [library,setLibrary]=useState<MaterialLibrary>(emptyLibrary);
  const [selected,setSelected]=useState<string[]>([]);
  const [step,setStep]=useState(1);
  const [ready,setReady]=useState(false);
  const [busy,setBusy]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [status,setStatus]=useState("");
  const [error,setError]=useState("");
  const [storageWarning,setStorageWarning]=useState("");
  const [notes,setNotes]=useState("");
  const [accepted,setAccepted]=useState(false);
  const [editing,setEditing]=useState(false);
  const [dirty,setDirty]=useState(false);
  const abort=useRef<AbortController|null>(null);
  const libraryRef=useRef(library);
  const materialRead=useRef(false);
  const savedPlan=useRef<{raw:string|null}|null>(null);
  useEffect(()=>{libraryRef.current=library;},[library]);
  const region=useRef<HTMLElement>(null);
  useEffect(()=>{
    let cancelled=false;
    try {
      const raw=localStorage.getItem(KEY);
      if(raw){const saved=JSON.parse(raw);const settings=validateGoalSettings(saved.settings);const sources:GoalSource[]=Array.isArray(saved.sources)&&saved.sources.length?validateMaterialSources(saved.sources):[];const plan=saved.plan?validateGoalPlan(saved.plan,sources):null;
        queueMicrotask(()=>{if(cancelled)return;setSettings(settings);setSources(sources);setPlan(plan);setCompleted(plan?normalizeGoalProgress(saved.completed,plan):[]);setAccepted(!!plan&&saved.accepted===true);setStep(plan?4:1);setDirty(saved.dirty===true);setSelected(sources.map(source=>source.documentId));});}
      savedPlan.current={raw};
    } catch {queueMicrotask(()=>setStorageWarning("A saved plan could not be restored. You can create a new one."));}
    loadMaterialLibrary().then(value=>{if(!cancelled){materialRead.current=true;libraryRef.current=value;setLibrary(value);setReady(true);}}).catch(()=>{if(!cancelled){setStorageWarning("Material storage is unavailable. You can still plan without materials.");setReady(true);}});
    return ()=>{cancelled=true;abort.current?.abort();};
  },[]);
  useEffect(()=>{
    if(!ready||!plan)return;
    try{validateGoalSettings(settings);validateGoalPlan(plan,sources);}catch{return;}
    try{if(!savedPlan.current)throw new Error("Saving is paused because the original plan could not be read.");savedPlan.current.raw=writeStudyCopy(localStorage,KEY,savedPlan.current.raw,{settings,plan,sources,completed,accepted,dirty});window.dispatchEvent(new Event("eai-study-progress-change"));}catch{savedPlan.current=null;queueMicrotask(()=>setStorageWarning("Plan saving is paused. The saved copy has been preserved. Copy new work before leaving or reloading."));}
  },[ready,settings,plan,sources,completed,accepted,dirty]);
  useEffect(()=>{
    function receiveGoal(event:Event){
      const detail=(event as CustomEvent<unknown>).detail;
      if(!detail||typeof detail!=="object")return;
      const input=detail as Record<string,unknown>;
      try{
        const level=input.level==="highSchool"?"highschool":input.level==="foundation"?"foundations":input.level;
        const incoming=validateGoalSettings({...defaultGoalSettings,goal:input.goal,deadline:input.deadline,level});
        setSettings(previous=>({...previous,goal:incoming.goal,deadline:incoming.deadline,level:incoming.level}));setStep(2);setDirty(true);setAccepted(false);setError("");
      }catch{setError("The exam goal could not be opened. Please describe it above.");}
    }
    window.addEventListener("eai-learning-goal",receiveGoal);return()=>window.removeEventListener("eai-learning-goal",receiveGoal);
  },[]);
  function move(next:number){setStep(next);setError("");window.requestAnimationFrame(()=>region.current?.scrollIntoView({block:"start",behavior:"smooth"}));}
  function change<K extends keyof GoalSettings>(key:K,value:GoalSettings[K]){setSettings(previous=>({...previous,[key]:value}));if(plan){setDirty(true);setAccepted(false);}}
  async function addMaterial(file?:File){
    if(uploading||busy)return;setUploading(true);setError("");
    try {
      if(!materialRead.current)throw new Error("Your saved material library could not be read. It has been preserved; add materials after storage is available again.");
      const document=file?await importCourseFile(file,setStatus):await importCourseNotes("Planning notes",notes);
      const current=libraryRef.current;
      if(current.documents.some(d=>d.id===document.id))throw new Error("This material is already in your library. Select it below.");
      if(current.documents.length>=MATERIAL_LIMITS.documents)throw new Error("Your library has five materials. Manage them in your library before adding another.");
      if([...current.documents,document].reduce((sum,d)=>sum+d.pages.reduce((n,p)=>n+p.text.length,0),0)>MATERIAL_LIMITS.libraryCharacters)throw new Error("The library is full. Use a smaller selection or manage your materials.");
      const next={...current,documents:[...current.documents,document]};await saveMaterialLibrary(next,current);libraryRef.current=next;setLibrary(next);setSelected(previous=>[...previous,document.id]);setNotes("");if(plan){setDirty(true);setAccepted(false);}
    }catch(e){setError(e instanceof Error?e.message:"The material could not be added.");}finally{setUploading(false);setStatus("");}
  }
  async function generate(){
    if(busy||uploading)return;setError("");let normalized:GoalSettings;
    try{normalized=validateGoalSettings(settings);}catch(e){setError(e instanceof Error?e.message:"Check your goal settings.");return;}
    setBusy(true);abort.current=new AbortController();
    try {
      const excerpts=selectMaterialExcerpts(library.documents.filter(d=>selected.includes(d.id)),normalized.goal,"guide");
      const response=await fetch("/api/study/plan",{method:"POST",headers:{"Content-Type":"application/json"},signal:AbortSignal.any([abort.current.signal,AbortSignal.timeout(55000)]),body:JSON.stringify({...normalized,excerpts})});
      const result=await response.json();if(!response.ok)throw new Error(result.error||"The plan could not be created.");
      const sources=Array.isArray(result.sources)&&result.sources.length?validateMaterialSources(result.sources):[];
      const next=validateGoalPlan(result.plan,sources);
      setPlan(next);setSources(sources);setCompleted([]);setAccepted(false);setEditing(false);setDirty(false);move(4);
    }catch(e){if(e instanceof Error&&e.name==="AbortError")setError("Planning cancelled. Your previous plan is unchanged.");else setError(e instanceof Error?e.message:"The plan could not be created. Try again.");}finally{setBusy(false);abort.current=null;}
  }
  function editLesson(index:number,key:"title"|"objective"|"activity"|"checkpoint",value:string){setPlan(previous=>previous?{...previous,lessons:previous.lessons.map((lesson,i)=>i===index?{...lesson,[key]:value}:lesson)}:null);setAccepted(false);}
  function accept(){
    try{validateGoalPlan(plan,sources);setAccepted(true);setEditing(false);setError("");}catch(e){setError(e instanceof Error?e.message:"Complete all lesson fields first.");}
  }
  function start(index:number){
    if(!plan||!accepted)return;
    const level=settings.level==="foundations"?"foundation":settings.level==="highschool"?"highSchool":settings.level;
    const checkpoint={goal:settings.goal,lesson:plan.lessons[index]};
    let memory="";try{memory=checkMemory(latestLessonCheck(checkpoint,normalizeLessonChecks(JSON.parse(localStorage.getItem(CHECK_KEY)||"[]")),Date.now()));}catch{/* The lesson still opens without saved evidence. */}
    window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"general",message:(goalLessonPrompt(settings,plan.lessons[index]).slice(0,1900)+memory).slice(0,3000),title:plan.lessons[index].title,goal:settings.goal,level,checkpoint}}));
    document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function withMaterials(index:number,task:"explain"|"quiz"){
    if(!plan||!accepted||editing)return;
    try{sessionStorage.setItem(MATERIAL_HANDOFF_KEY,JSON.stringify(makeLessonMaterialHandoff(settings.goal,plan.lessons[index],sources,task)));window.location.assign("/study/materials");}
    catch{setError("The lesson could not be passed to the library. Open Materials and enter the lesson objective there.");}
  }
  const next=plan?.lessons.findIndex(lesson=>!completed.includes(lesson.id))??-1;
  return <section id="learning-goal" ref={region} className="goal-workspace goal-landmark-workspace" data-step={step} aria-labelledby="goal-heading" aria-busy={busy}>
    <StudyLandmark scene="stonehenge" />
    <div className="studio-section-title"><div><p className="studio-eyebrow">YOUR CURIOSITY. YOUR DIRECTION.</p><h2 id="goal-heading">What do you want to achieve?</h2></div><p>A learning path built<br/>around your goal.</p></div>
    <p className="goal-intro">Tell us your goal. Shape your next step.</p>
    <ol className="goal-steps" aria-label="Plan creation steps">{["Your goal","Materials","Your pace","Review"].map((label,index)=><li key={label} aria-current={step===index+1?"step":undefined}><span>{index+1}</span>{label}</li>)}</ol>
    {storageWarning&&<p role="status" className="goal-notice">{storageWarning}</p>}
    {step===1&&<div className="goal-panel">
      <label htmlFor="learning-achievement" className="goal-label">Tell us what you want to learn or accomplish</label>
      <textarea id="learning-achievement" value={settings.goal} onChange={e=>change("goal",e.target.value)} maxLength={1500} rows={2} placeholder="I want to learn…" disabled={!ready||busy}/>
      <p className="goal-helper">Any subject. A specific question, a skill, or a bigger ambition. {settings.goal.length}/1,500</p>
      <details className="goal-examples"><summary>Need inspiration? Try an example</summary><div>{examples.map(example=><button key={example} type="button" onClick={()=>change("goal",example)}>{example} ↗</button>)}</div></details>
      <div className="goal-actions"><button className="goal-primary" disabled={!ready||settings.goal.trim().length<10} onClick={()=>move(2)}>Continue →</button>{plan&&<button onClick={()=>move(4)}>Return to my plan</button>}<a href="#ai-assistant">Explore with the tutor instead ↗</a></div>
    </div>}
    {step===2&&<div className="goal-panel">
      <h3>Bring context, if you have it.</h3><p className="goal-helper">Add a syllabus, chapter, or notes—or continue without materials. Select the items you want the planner to use.</p>
      <label className="goal-label">Add a PDF, TXT, or Markdown file<input type="file" accept=".pdf,.txt,.md" aria-label="Add planning material" disabled={!ready||uploading||busy} onChange={e=>{const file=e.target.files?.[0];if(file)void addMaterial(file);e.target.value="";}}/></label>
      <p className="goal-helper">Up to 10 MB per file, 100 PDF pages, 5 materials. Scanned pages need OCR.</p>
      <details><summary>Paste notes instead</summary><textarea aria-label="Planning notes" rows={4} value={notes} maxLength={250000} disabled={uploading} onChange={e=>setNotes(e.target.value)}/><button type="button" disabled={!notes.trim()||uploading} onClick={()=>void addMaterial()}>Add these notes</button></details>
      {uploading&&<p role="status">{status||"Saving your material…"}</p>}
      <div className="goal-materials">{library.documents.map(document=><label key={document.id}><input type="checkbox" checked={selected.includes(document.id)} onChange={e=>{setSelected(ids=>e.target.checked?[...ids,document.id]:ids.filter(id=>id!==document.id));if(plan){setDirty(true);setAccepted(false);}}} disabled={uploading}/><span>{document.name}<small>{document.pages.length} readable {document.kind==="pdf"?"pages":"sections"}</small></span></label>)}</div>
      <p className="goal-helper">Extracted text is saved in this browser{accountConfigured ? " and included if you choose account saving" : ""}. Up to six selected excerpts are sent to the AI when you create the plan. A long syllabus may only be partially represented. <Link href="/study/materials">Manage your library ↗</Link></p>
      <div className="goal-actions"><button onClick={()=>move(1)} disabled={uploading}>← Back</button><button className="goal-primary" disabled={uploading} onClick={()=>move(3)}>{selected.length?"Continue with selected materials":"Continue without materials"} →</button></div>
    </div>}
    {step===3&&<div className="goal-panel">
      <h3>Make room for learning.</h3><p className="goal-helper">Set a comfortable starting point. You can adjust your plan later.</p>
      <div className="goal-settings"><label className="goal-label">Starting level<select aria-label="Starting level" value={settings.level} onChange={e=>change("level",e.target.value as GoalSettings["level"])} disabled={busy}>{Object.entries(goalLevels).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
      <label className="goal-label">Minutes per session<input type="number" min={10} max={120} value={settings.minutes} onChange={e=>change("minutes",Number(e.target.value))} disabled={busy}/></label>
      <label className="goal-label">Sessions per week<input type="number" min={1} max={7} value={settings.sessions} onChange={e=>change("sessions",Number(e.target.value))} disabled={busy}/></label>
      <label className="goal-label">Target date · optional<input type="date" value={settings.deadline} onChange={e=>change("deadline",e.target.value)} disabled={busy}/></label></div>
      <p className="goal-helper">This creates a suggested outline, not calendar bookings or a guarantee of completion.</p>
      <div className="goal-actions"><button onClick={()=>move(2)} disabled={busy}>← Back</button><button className="goal-primary" onClick={()=>void generate()} disabled={busy}>{busy?"Building your starting path…":"Create my learning plan →"}</button>{busy&&<button onClick={()=>abort.current?.abort()}>Cancel</button>}</div>
    </div>}
    {step===4&&plan&&<div className="goal-panel">
      <div className="goal-plan-head"><div><p className="studio-eyebrow">{accepted?"YOUR LEARNING PATH":"PROPOSED PATH · REVIEW BEFORE STARTING"}</p>{editing?<input aria-label="Plan title" value={plan.title} maxLength={120} onChange={e=>{setPlan({...plan,title:e.target.value});setAccepted(false);}}/>:<h3>{plan.title}</h3>}</div><button onClick={()=>{setEditing(!editing);setAccepted(false);}}> {editing?"Finish editing":"Edit this plan"}</button></div>
      {editing?<textarea aria-label="Plan overview" value={plan.overview} maxLength={1200} rows={3} onChange={e=>setPlan({...plan,overview:e.target.value})}/>:<p className="goal-overview">{plan.overview}</p>}
      <p className="goal-helper">{settings.minutes} minutes per session · {settings.sessions} sessions per week{settings.deadline?` · Target: ${settings.deadline}`:""} · {completed.length}/{plan.lessons.length} marked complete by you</p>
      {dirty&&<p role="status" className="goal-notice">Your inputs changed. Regenerate to apply them to the outline; your current lessons are unchanged.</p>}
      <ol className="goal-lessons">{plan.lessons.map((lesson,index)=><li key={lesson.id}><span className="goal-lesson-number">{String(index+1).padStart(2,"0")}</span><div>
        {editing?<><label className="goal-label">Lesson title<input aria-label={`Lesson ${index+1} title`} maxLength={120} value={lesson.title} onChange={e=>editLesson(index,"title",e.target.value)}/></label>{(["objective","activity","checkpoint"] as const).map(key=><label className="goal-label" key={key}>{key=== "checkpoint"?"Understanding check":key}<textarea aria-label={`Lesson ${index+1} ${key}`} maxLength={key==="activity"?650:450} rows={2} value={lesson[key]} onChange={e=>editLesson(index,key,e.target.value)}/></label>)}<div className="goal-actions"><button disabled={index===0} onClick={()=>{const list=[...plan.lessons];[list[index-1],list[index]]=[list[index],list[index-1]];setPlan({...plan,lessons:list});}}>Move earlier ↑</button><button disabled={plan.lessons.length<=3} onClick={()=>{setPlan({...plan,lessons:plan.lessons.filter(l=>l.id!==lesson.id)});setCompleted(ids=>ids.filter(id=>id!==lesson.id));}}>Remove lesson</button></div></>:<><h4>{lesson.title}</h4><p>{lesson.objective}</p><p><strong>Try:</strong> {lesson.activity}</p><p><strong>Check your understanding:</strong> {lesson.checkpoint}</p></>}
        {!!lesson.sourceIds.length&&<p className="goal-helper">Planning context: {lesson.sourceIds.map(id=>{const source=sources.find(s=>s.sourceId===id);return source?`${source.name} · ${materialLocation(source)}`:id;}).join("; ")}. These references shaped the outline; they are not verified answer citations.</p>}
        {accepted&&!editing&&<div className="goal-actions"><button onClick={()=>start(index)}>{completed.includes(lesson.id)?"Revisit lesson":"Start this lesson"} ↗</button><button onClick={()=>withMaterials(index,"explain")}>Learn from my materials ↗</button><button onClick={()=>withMaterials(index,"quiz")}>Practice from my materials ↗</button><label className="goal-completion"><input type="checkbox" checked={completed.includes(lesson.id)} onChange={e=>setCompleted(ids=>e.target.checked?[...ids,lesson.id]:ids.filter(id=>id!==lesson.id))}/>Mark complete</label></div>}
      </div></li>)}</ol>
      {editing&&plan.lessons.length<8&&<button onClick={()=>{const id=Array.from({length:8},(_,i)=>`lesson-${i+1}`).find(id=>!plan.lessons.some(l=>l.id===id))!;setPlan({...plan,lessons:[...plan.lessons,{id,title:"New lesson",objective:"",activity:"",checkpoint:"",sourceIds:[]}]});}}>Add a lesson +</button>}
      <div className="goal-actions">{!accepted?<button className="goal-primary" onClick={accept}>Use this plan</button>:<button className="goal-primary" onClick={()=>start(next<0?0:next)}>{next<0?"Revisit the first lesson":"Continue my learning"} →</button>}<button onClick={()=>move(1)}>Change goal or pace</button><a href="#ai-assistant">Explore freely ↗</a><Link href="/study/materials">Study with materials ↗</Link></div>
      {accepted&&<p className="goal-helper">Starting a lesson prepares a message in the tutor. Review it and select Send when ready. Completion is self-reported, not a mastery assessment.</p>}
    </div>}
    {error&&<p role="alert" className="goal-error">{error}</p>}
    <p className="studio-landmark-caption">Stonehenge, England · An imagined horizon</p>
    <details className="goal-saving-note"><summary>About your saved plan</summary><p className="goal-footnote">Your plan is saved in this browser after generation. AI-proposed outlines can contain gaps or mistakes; edit them to suit your needs. {accountConfigured ? <Link href="/study/account">Choose optional account saving ↗</Link> : "Account sync is not yet available."}</p></details>
  </section>;
}

"use client";

import { accountConfigured } from "@/lib/study-account";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { normalizeStudyMath } from "@/lib/study-markdown";
import { importCourseFile, importCourseNotes, loadMaterialLibrary, saveMaterialLibrary } from "@/lib/study-material-files";
import { MATERIAL_HANDOFF_KEY, normalizeLessonMaterialHandoff, lessonMaterialScope, type LessonMaterialHandoff } from "@/lib/study-material-handoff";
import { MATERIAL_LIMITS, materialLocation, materialTasks, normalizeMaterialText, removeMaterialDocument, validateMaterialAnswer, validateMaterialSources, selectMaterialExcerpts, type CourseDocument, type MaterialCitation, type MaterialEntry, type MaterialLibrary, type MaterialTask } from "@/lib/study-materials";

type SourceView = { documentId: string; page: number; quote: string };
function SourceViewer({ document, source, close }: { document: CourseDocument; source: SourceView; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const highlight = useRef<HTMLElement>(null);
  const [pageNumber,setPageNumber] = useState(source.page);
  useEffect(() => { dialog.current?.showModal(); highlight.current?.scrollIntoView({block:"center"}); },[]);
  const page = document.pages.find(page => page.number === pageNumber);
  const text = normalizeMaterialText(page?.text || "");
  const quote = pageNumber === source.page ? normalizeMaterialText(source.quote) : "";
  const index = quote ? text.indexOf(quote) : -1;
  return <dialog ref={dialog} onCancel={event=>{event.preventDefault();close();}} aria-labelledby="material-source-heading" className="m-auto max-h-[85vh] w-[92vw] max-w-3xl overflow-y-auto rounded-2xl border border-cyan-300/25 bg-[#101827] p-6 text-white shadow-2xl backdrop:bg-slate-950/80">
    <div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">SOURCE TEXT</p><h3 id="material-source-heading" className="mt-2 break-words text-lg font-semibold">{document.name}</h3></div><button type="button" onClick={close} className="shrink-0 rounded-lg border border-white/20 px-3 py-2 text-sm">Close source</button></div>
    <label className="mt-5 flex items-center gap-3 text-sm text-slate-300">{document.kind === "pdf" ? "PDF page" : "Notes section"}<select aria-label="Source location" value={pageNumber} onChange={event=>setPageNumber(Number(event.target.value))} className="rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-white">{document.pages.map(page=><option key={page.number} value={page.number}>{page.number}</option>)}</select></label>
    <p className="mt-3 text-xs leading-5 text-slate-500">Extracted text from your material. PDF layout, images, and complex notation may not be preserved.</p>
    <div className="mt-5 whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-5 text-sm leading-8 text-slate-200">{index < 0 ? text : <>{text.slice(0,index)}<mark ref={highlight} className="rounded bg-cyan-300/25 px-1 text-cyan-100">{text.slice(index,index+quote.length)}</mark>{text.slice(index+quote.length)}</>}</div>
  </dialog>;
}

function MaterialResponse({ entry, openSource }: { entry: MaterialEntry; openSource: (source: SourceView) => void }) {
  const markdown = normalizeStudyMath(entry.answer).replace(/\[(S\d+)\]/g,(_,id:string)=>`[${id}](#course-source-${id})`);
  return <div className="space-y-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{entry.supported ? "ANSWER FROM YOUR MATERIALS" : "MORE SOURCE SUPPORT NEEDED"}</p>
    <h3 className="break-words text-lg font-semibold text-white">{entry.question.startsWith("Lesson: ") ? entry.question.split("\n")[0].slice(8) : entry.question}</h3>
    {entry.question.startsWith("Lesson: ")&&<details className="library-lesson-question"><summary>Question and lesson context</summary><p>{entry.question}</p></details>}
    <div className="min-w-0 break-words text-sm leading-7 text-slate-200"><ReactMarkdown skipHtml remarkPlugins={[remarkGfm,remarkMath]} rehypePlugins={[rehypeKatex]} components={{
      a({href,children}) { const id=/^#course-source-(S\d+)$/.exec(href||"")?.[1]; const citation=entry.citations.find(citation=>citation.sourceId===id); return citation ? <button type="button" onClick={()=>openSource(citation)} className="mx-1 rounded border border-cyan-300/30 px-1.5 text-xs font-semibold text-cyan-200 hover:bg-cyan-300/10" aria-label={`Open ${citation.sourceId}: ${citation.name}, ${materialLocation(citation)}`}>{children}</button> : <span>{children}</span>; },
      img(){return null;}, p({children}){return <p className="my-3">{children}</p>;}, h1({children}){return <h4 className="mb-2 mt-5 text-lg font-semibold text-white">{children}</h4>;}, h2({children}){return <h4 className="mb-2 mt-5 text-base font-semibold text-white">{children}</h4>;}, h3({children}){return <h4 className="mb-2 mt-4 font-semibold text-white">{children}</h4>;}, ul({children}){return <ul className="my-3 list-disc space-y-2 pl-5">{children}</ul>;}, ol({children}){return <ol className="my-3 list-decimal space-y-2 pl-5">{children}</ol>;}, pre({children}){return <pre className="my-4 overflow-x-auto rounded-xl bg-slate-950 p-4">{children}</pre>;}, blockquote({children}){return <blockquote className="my-4 border-l-2 border-cyan-300/40 pl-4 text-slate-400">{children}</blockquote>;}, table({children}){return <div className="my-4 overflow-x-auto"><table className="w-full border-collapse text-left">{children}</table></div>;}, th({children}){return <th className="border border-white/15 p-2">{children}</th>;}, td({children}){return <td className="border border-white/15 p-2">{children}</td>;},
    }}>{markdown}</ReactMarkdown></div>
    {!!entry.citations.length && <div className="library-evidence"><p className="text-xs font-semibold text-slate-400">SUPPORTING EXCERPTS</p>{entry.citations.map(citation=><details key={citation.sourceId}><summary><span>[{citation.sourceId}]</span> Source passage · {citation.name} · {materialLocation(citation)}</summary><blockquote>{citation.quote}</blockquote><button type="button" onClick={()=>openSource(citation)} aria-label={`Open ${citation.sourceId}: ${citation.name}, ${materialLocation(citation)}`}>Open source text ↗</button></details>)}<p className="mt-3 text-xs leading-5 text-slate-500">Quotes are checked against the supplied excerpts. Open a source to assess whether it supports the explanation.</p></div>}

  </div>;
}

const emptyLibrary: MaterialLibrary = { documents: [], entries: [] };
export default function CourseMaterials() {
  const [library,setLibrary] = useState<MaterialLibrary>(emptyLibrary);
  const [ready,setReady] = useState(false);
  const [panel,setPanel] = useState<"materials"|"add"|null>(null);
  const [storageAvailable,setStorageAvailable] = useState(true);
  const [lessonContext,setLessonContext] = useState<LessonMaterialHandoff|null>(null);
  const [lessonNotice,setLessonNotice] = useState("");
  const [focus,setFocus] = useState("all");
  const [task,setTask] = useState<MaterialTask>("explain");
  const [question,setQuestion] = useState("");
  const [activeEntryId,setActiveEntryId] = useState("");
  const [uploading,setUploading] = useState(false);
  const [uploadStatus,setUploadStatus] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [showNotes,setShowNotes] = useState(false);
  const [notesName,setNotesName] = useState("");
  const [notes,setNotes] = useState("");
  const [source,setSource] = useState<SourceView|null>(null);
  const abort = useRef<AbortController|null>(null);
  const currentLibrary = useRef(library);
  currentLibrary.current = library;

  useEffect(()=>{
    let cancelled=false;
    loadMaterialLibrary().then(value=>{if(!cancelled){setLibrary(value);setActiveEntryId(value.entries[0]?.id||"");
      try{const raw=sessionStorage.getItem(MATERIAL_HANDOFF_KEY);if(raw){const handoff=normalizeLessonMaterialHandoff(JSON.parse(raw));sessionStorage.removeItem(MATERIAL_HANDOFF_KEY);if(handoff){setLessonContext(handoff);setQuestion(handoff.question);setTask(handoff.task);setActiveEntryId("");setFocus(handoff.documentIds.length?"lesson":"choose");if(!handoff.documentIds.length)setLessonNotice("This lesson has no linked materials. Choose a material below before asking.");else if(handoff.documentIds.some(id=>!value.documents.some(d=>d.id===id)))setLessonNotice("Some linked materials are missing from this browser. Add them again or choose another material explicitly.");}else setLessonNotice("The lesson link could not be restored. Your library is unchanged.");}}
      catch{setLessonNotice("The prepared lesson could not be read. You can still ask about your materials.");}
      setReady(true);}}).catch(()=>{if(!cancelled){setReady(true);setStorageAvailable(false);}});
    return ()=>{cancelled=true;abort.current?.abort();};
  },[]);
  useEffect(()=>{
    if(!ready) return;
    saveMaterialLibrary(library).catch(()=>setStorageAvailable(false));
  },[library,ready]);

  function addDocument(document: CourseDocument) {
    const current=currentLibrary.current;
    if(current.documents.length>=MATERIAL_LIMITS.documents) throw new Error("Your library has five materials. Remove one before adding another.");
    if(current.documents.some(item=>item.id===document.id)) throw new Error("This material is already in your library.");
    const characters=[...current.documents,document].reduce((sum,item)=>sum+item.pages.reduce((sum,page)=>sum+page.text.length,0),0);
    if(characters>MATERIAL_LIMITS.libraryCharacters) throw new Error("This library has reached its text limit. Remove a material or use a shorter selection.");
    const next={...current,documents:[...current.documents,document]}; currentLibrary.current=next; setLibrary(next);setFocus(document.id);setActiveEntryId("");
  }
  async function uploadFiles(files: FileList|null) {
    if(!files?.length || uploading || loading) return;
    if(currentLibrary.current.documents.length+files.length>MATERIAL_LIMITS.documents){setError("Choose fewer files: the library supports five materials at a time.");return;}
    setUploading(true);setError("");
    try { for(const file of Array.from(files)) {setUploadStatus(`Reading ${file.name}…`);addDocument(await importCourseFile(file,setUploadStatus));} }
    catch(error){setError(error instanceof Error?error.message:"This file could not be read.");}
    finally{setUploading(false);setUploadStatus("");}
  }
  async function trySample() {
    if(uploading||loading||!ready)return;
    setUploading(true);setError("");setUploadStatus("Opening the sample PDF…");
    try {
      const response=await fetch("/examples/eai-course-sample.pdf");
      if(!response.ok)throw new Error("The sample could not be opened. Please try again.");
      const file=new File([await response.blob()],"EAI sample course.pdf",{type:"application/pdf"});
      addDocument(await importCourseFile(file,setUploadStatus));
    }catch(error){setError(error instanceof Error?error.message:"The sample could not be opened.");}
    finally{setUploading(false);setUploadStatus("");}
  }
  async function addNotes(event: FormEvent) {
    event.preventDefault();if(!notes.trim()||uploading||loading)return;
    setUploading(true);setError("");
    try{addDocument(await importCourseNotes(notesName,notes));setNotes("");setNotesName("");setShowNotes(false);}
    catch(error){setError(error instanceof Error?error.message:"These notes could not be added.");}
    finally{setUploading(false);}
  }
  function removeDocument(id:string) {
    if(loading||uploading)return;
    setLibrary(previous=>removeMaterialDocument(previous,id));
    if(focus===id)setFocus("all");setActiveEntryId("");setSource(null);setError("");
  }
  async function ask(event: FormEvent) {
    event.preventDefault();if(loading||uploading||!ready)return;
    const message=question.trim()||(task==="guide"?"Create a study guide from the selected material.":task==="quiz"?"Ask me one practice question from the selected material.":"");
    if(!message)return;
    let documents:CourseDocument[];
    try{documents=lessonMaterialScope(library.documents,focus,lessonContext);}catch(e){setError(e instanceof Error?e.message:"Choose a material first.");return;}
    const ids=new Set(documents.map(document=>document.id));
    const recent=library.entries.filter(entry=>entry.documentIds.every(id=>ids.has(id))).slice(0,2);
    const excerpts=selectMaterialExcerpts(documents,message,task,recent[0]?.question||"");
    if(!excerpts.length){setError("I couldn’t find matching text in the selected materials. Try a more specific question or choose another material.");return;}
    setLoading(true);setError("");const controller=new AbortController();abort.current=controller;
    try{
      const history=recent.slice().reverse().flatMap(entry=>[{role:"user",content:entry.question.slice(0,3000)},{role:"assistant",content:entry.answer.slice(0,3000)}]);
      const response=await fetch("/api/study/materials",{method:"POST",headers:{"Content-Type":"application/json"},signal:controller.signal,body:JSON.stringify({message,task,excerpts,history})});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(typeof result?.error==="string"?result.error:"The tutor is temporarily unavailable. Please try again.");
      if(!result||typeof result.answer!=="string"||!Array.isArray(result.citations))throw new Error("The tutor returned an invalid response.");
      const verified=validateMaterialAnswer(result,validateMaterialSources(excerpts));
      const entry:MaterialEntry={...verified,id:crypto.randomUUID(),question:message,task,documentIds:[...new Set(excerpts.map(excerpt=>excerpt.documentId))],createdAt:Date.now()};
      setLibrary(previous=>({...previous,entries:[entry,...previous.entries].slice(0,20)}));setActiveEntryId(entry.id);setQuestion("");
    }catch(error){if(!controller.signal.aborted)setError(error instanceof Error?error.message:"The tutor could not complete this request.");}
    finally{if(abort.current===controller)abort.current=null;setLoading(false);}
  }

  const busy=uploading||loading;
  const entry=library.entries.find(entry=>entry.id===activeEntryId);
  const sourceDocument=library.documents.find(document=>document.id===source?.documentId);
  return <>
    {lessonContext&&<section className="library-lesson-context" aria-label="Lesson materials context"><div><p className="studio-eyebrow">YOUR LESSON, YOUR SOURCES</p><h2>{lessonContext.title}</h2><p>The question is prepared below. Review the material focus, then select Ask. Only selected excerpts are sent; your full files are not automatically read.</p>{lessonNotice&&<p role="status">{lessonNotice}</p>}</div><button type="button" disabled={busy} onClick={()=>{setLessonContext(null);setLessonNotice("");setFocus("all");setQuestion("");}}>Clear lesson context</button><a href="/study#learning-goal">Return to my plan ↗</a></section>}
    {!lessonContext&&lessonNotice&&<p role="status" className="goal-notice">{lessonNotice}</p>}
    <div className="library-focused-shell" onKeyDown={event=>{if(event.key === "Escape" && panel){event.preventDefault();setPanel(null);document.getElementById("library-materials-trigger")?.focus();}}}>
      <div className="library-toolbar">
        <button type="button" id="library-materials-trigger" disabled={!ready||busy} aria-expanded={panel==="materials"} aria-controls="library-materials-panel" onClick={()=>setPanel(panel==="materials"?null:"materials")}>Materials · {library.documents.length} <span aria-hidden="true">⌄</span></button>
        <div className="library-focus-select"><label className="min-w-0 text-xs font-medium text-slate-300">Material focus<select aria-label="Material focus" value={focus} onChange={event=>{setFocus(event.target.value);setActiveEntryId("");}} disabled={busy||!ready} className="mt-2 min-w-0 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white">{lessonContext&&<><option value="choose">Choose lesson materials…</option>{lessonContext.documentIds.length>0&&<option value="lesson">Linked lesson materials · {lessonContext.documentIds.length}</option>}</>}<option value="all">All materials</option>{library.documents.map(document=><option key={document.id} value={document.id}>{document.name}</option>)}</select></label></div>
        <button type="button" className="library-add-trigger" disabled={!ready||busy} aria-expanded={panel==="add"} aria-controls="library-materials-panel" onClick={()=>setPanel(panel==="add"?null:"add")}>+ Add materials</button>
      </div>
      {panel&&<>      <aside id="library-materials-panel" aria-label="Manage your materials" className={`library-material-panel library-panel-${panel}`}>
        <div className="library-management">
          <div className="library-panel-heading"><h2 className="text-lg font-semibold text-white">Your materials</h2><span className="text-xs text-slate-500">{library.documents.length} / 5</span><button type="button" disabled={busy} onClick={()=>setPanel(null)}>Close</button></div>
          <div className="library-upload-controls"><p className="mt-2 text-xs leading-6 text-slate-400">PDF, TXT, or Markdown · up to 10 MB per file · PDFs up to 100 pages</p>
          <label className={`mt-4 block rounded-xl border border-dashed border-cyan-300/40 px-4 py-5 text-center text-sm font-semibold text-cyan-200 ${busy||!ready?"opacity-40":"cursor-pointer hover:bg-cyan-300/5"}`}>
            Add course files
            <input aria-label="Add course files" type="file" multiple accept=".pdf,.txt,.md" disabled={busy||!ready} onChange={event=>{void uploadFiles(event.target.files);event.target.value="";}} className="mt-3 block w-full text-xs text-slate-400 file:mr-2 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-slate-200" />
          </label>
          {!library.documents.length&&<div className="mt-4 rounded-xl bg-slate-950/50 p-3"><button type="button" disabled={busy||!ready} onClick={()=>void trySample()} className="text-xs font-semibold text-cyan-200 disabled:opacity-40">Try a sample PDF</button><p className="mt-1 text-xs leading-5 text-slate-500">Two fictional classroom cases. No personal material needed.</p></div>}
          <button type="button" disabled={busy||!ready} onClick={()=>setShowNotes(value=>!value)} className="mt-3 text-xs font-medium text-cyan-300 underline underline-offset-4 disabled:opacity-40">{showNotes?"Close notes form":"Paste notes instead"}</button>
          {showNotes&&<form onSubmit={addNotes} className="mt-4 space-y-3"><label className="block text-xs text-slate-300">Notes title<input aria-label="Notes title" disabled={busy} maxLength={120} value={notesName} onChange={event=>setNotesName(event.target.value)} placeholder="For example: Biology lecture 3" className="mt-2 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-white" /></label><label className="block text-xs text-slate-300">Course notes<textarea aria-label="Course notes" disabled={busy} rows={7} maxLength={250000} value={notes} onChange={event=>setNotes(event.target.value)} className="mt-2 w-full rounded-lg border border-white/15 bg-slate-950 px-3 py-2 text-sm text-white" /></label><button disabled={busy||!notes.trim()} className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-40">Add notes</button></form>}
          {uploading&&<p role="status" className="mt-4 text-xs leading-6 text-cyan-200">{uploadStatus||"Adding your notes…"}</p>}
          </div><div className="library-document-list">{library.documents.map(document=><div key={document.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-3"><p className="break-words text-sm font-medium text-slate-200">{document.name}</p><p className="mt-1 text-xs text-slate-500">{document.kind==="pdf"?`${document.pages.length} of ${document.pageCount} pages with readable text`:`${document.pages.length} note ${document.pages.length===1?"section":"sections"}`}</p>{document.kind==="pdf"&&document.pages.length<document.pageCount&&<p className="mt-2 text-xs leading-5 text-amber-200">Pages without readable text are not searched.</p>}<div className="mt-3 flex gap-4"><button type="button" onClick={()=>setSource({documentId:document.id,page:document.pages[0].number,quote:""})} className="text-xs text-cyan-300" aria-label={`Read ${document.name}`}>Read</button><button type="button" disabled={busy} onClick={()=>removeDocument(document.id)} className="text-xs text-slate-400 hover:text-red-200 disabled:opacity-40" aria-label={`Remove ${document.name}`}>Remove</button></div></div>)}</div>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-6 text-slate-500">Extracted text is saved in this browser{accountConfigured ? " and included if you choose account saving" : ""}. Relevant excerpts are sent to the AI provider when you ask a question. Removing a material also removes answers saved from it.</p>
          {!storageAvailable&&<p role="status" className="mt-3 text-xs leading-6 text-amber-200">Browser storage is unavailable. Your current materials and answers may not survive a reload.</p>}
        </div>
        {!!library.entries.length&&<div className="library-recent-questions"><h2 className="text-sm font-semibold text-slate-300">Recent questions</h2><div className="mt-3 space-y-2">{library.entries.map(item=><button type="button" key={item.id} disabled={busy} onClick={()=>{setActiveEntryId(item.id);setPanel(null);}} className={`w-full rounded-lg border px-3 py-2 text-left text-xs leading-5 disabled:opacity-40 ${item.id===activeEntryId?"border-cyan-300/30 bg-cyan-300/5 text-cyan-200":"border-white/5 text-slate-400"}`}>{item.question.slice(0,100)}</button>)}</div></div>}
      </aside></>}
      {!storageAvailable&&<p role="status" className="library-storage-warning">Browser storage is unavailable. Keep this page open; your current materials and answers may not survive a reload.</p>}
      <div className="library-mode-bar" role="group" aria-label="Material learning mode">{Object.entries(materialTasks).map(([value,label])=><button key={value} type="button" aria-pressed={task===value} disabled={busy} onClick={()=>setTask(value as MaterialTask)}>{label}</button>)}</div>
      <div className="library-reading-area" aria-live="polite">
          {entry?<MaterialResponse entry={entry} openSource={setSource}/>:<div className="library-empty"><h2>What would you like to know?</h2><p>Add a source, choose how you want to learn, and follow a question.</p><p className="library-empty-note">Answers use selected excerpts. Scanned pages and images need OCR.</p>{!library.documents.length&&<button type="button" disabled={busy||!ready} onClick={()=>setPanel("add")}>Add your first material ↗</button>}</div>}
      </div>
      <div className="library-composer"><form onSubmit={ask}>
            <label className="block text-xs font-medium text-slate-300">Your question<textarea aria-label="Question about your materials" disabled={busy} rows={2} maxLength={3000} value={question} onChange={event=>setQuestion(event.target.value)} placeholder={task==="explain"?"For example: how does this chapter explain cellular respiration?":"Add a topic or leave this blank to use the selected excerpts."} className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-sm leading-7 text-white" /></label>
            <div className="flex flex-wrap items-center gap-3"><button type="submit" disabled={!ready||busy||!library.documents.length||(task==="explain"&&!question.trim())} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-40">{task==="guide"?"Create study guide":task==="quiz"?"Start or continue quiz":"Ask about materials"}</button>{loading&&<button type="button" onClick={()=>abort.current?.abort()} className="rounded-xl border border-white/20 px-4 py-3 text-sm text-slate-300">Stop request</button>}</div>
          </form>
          {error&&<p role="alert" className="mt-5 rounded-xl border border-amber-300/25 bg-amber-300/5 p-4 text-sm leading-7 text-amber-100">{error}</p>}
          {loading&&<p role="status" className="mt-5 text-sm text-cyan-200">Reading the relevant excerpts and checking citation quotes…</p>}
      </div>
      <div className="library-shell-footer"><span>Saved in this browser</span><span>Check AI answers against your sources.</span></div>
    </div>
    {source&&sourceDocument&&<SourceViewer key={`${source.documentId}-${source.page}-${source.quote}`} document={sourceDocument} source={source} close={()=>setSource(null)}/>}
  </>;
}

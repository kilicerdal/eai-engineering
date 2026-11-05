"use client";
import { useState } from "react";
import { notebookFields, tutorNotebookEntry } from "@/lib/study-chat-check";
import type { LessonCheck } from "@/lib/study-checkpoints";
import { normalizeMistakes } from "@/lib/study-exams";
import { readSavedArray, writeStudyCopy } from "@/lib/study-safe-storage";

export default function TutorNotebookSave({check}: {check: LessonCheck}) {
  const [fields, setFields] = useState(() => notebookFields(check));
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  function save() {
    try {
      const key = "eai-exam-mistakes-v1";
      const copy = readSavedArray(localStorage, key, normalizeMistakes);
      if (!copy.items.some(item => item.id === `check-${check.id}`)) {
        if (copy.items.length >= 50) throw new Error("Your notebook is full. Remove an entry, then try again.");
        const entry = tutorNotebookEntry(check, fields, Date.now());
        writeStudyCopy(localStorage, key, copy.raw, [entry, ...copy.items]);
        window.dispatchEvent(new Event("eai-study-notebook-update"));
        window.dispatchEvent(new Event("eai-study-progress-change"));
      }
      setError(""); setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not save this notebook entry."); }
  }
  return <div>
    {saved ? <p role="status">Saved. <a href={`/study?mistake=${encodeURIComponent("check-"+check.id)}#mistake-notebook`}>Open my mistake notebook ↗</a></p> : <>
      <details><summary>Edit notebook copy</summary>
        {([["question","Question"],["answer","My reasoning"],["reflection","Feedback and notes"]] as const).map(([key,label]) =>
          <label key={key} className="goal-label">{label}<textarea aria-label={label} value={fields[key]} rows={3} onChange={e=>setFields({...fields,[key]:e.target.value})}/></label>)}
      </details>
      <button type="button" onClick={save}>Save to my mistake notebook</button>
    </>}
    {error && <p role="alert">{error}</p>}
  </div>;
}

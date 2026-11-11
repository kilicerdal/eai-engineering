"use client";
import { useRef, useState } from "react";

export default function TeacherQuestion({ question, answer }: { question: string; answer: string }) {
  const [draft, setDraft] = useState(`Problem: ${question}\n\nMy reasoning: ${answer}\n\nWhich step in my reasoning should I revisit, and why?`);
  const [status, setStatus] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      if (input.current?.value !== draft) return;
      setStatus("Copied. You can paste this into a message to your teacher.");
    } catch {
      if (input.current?.value !== draft) return;
      input.current.focus();
      input.current.select();
      setStatus("Your question is selected. Copy it manually.");
    }
  }
  return <details>
    <summary>Prepare a question for my teacher</summary>
    <label className="goal-label">Edit your question before copying
      <textarea ref={input} rows={5} value={draft} onChange={event => {setDraft(event.target.value); setStatus("");}} />
    </label>
    <button type="button" disabled={!draft.trim()} onClick={copy}>Copy question</button>
    <p role="status">{status}</p>
  </details>;
}

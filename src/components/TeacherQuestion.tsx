"use client";
import { useState } from "react";

export default function TeacherQuestion({ question, answer }: { question: string; answer: string }) {
  const [draft, setDraft] = useState(`Problem: ${question}\n\nMy reasoning: ${answer}\n\nCould you help me check the step where `);
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Copied. You can paste this into a message to your teacher.");
    } catch {
      setStatus("Select the text above and copy it manually.");
    }
  }
  return <details>
    <summary>Prepare a question for my teacher</summary>
    <label className="goal-label">Edit your question before copying
      <textarea rows={5} value={draft} onChange={event => {setDraft(event.target.value); setStatus("");}} />
    </label>
    <button type="button" disabled={!draft.trim()} onClick={copy}>Copy question</button>
    <p role="status">{status}</p>
  </details>;
}

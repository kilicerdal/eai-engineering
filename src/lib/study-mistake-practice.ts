import type { Mistake } from "./study-exams";
import type { LessonContext } from "./study-checkpoints";

// Keep identity tied to the saved attempt, never to editable review notes.
export function mistakePracticeContext(mistake: Pick<Mistake, "id" | "exam" | "question">): LessonContext {
  return {
    goal: `Revisit my saved ${mistake.exam} practice attempt. Original question: ${mistake.question}`.slice(0, 1500),
    lesson: {
      id: mistake.id,
      title: `Practice reflection: ${mistake.exam}`.slice(0, 120),
      objective: `Apply the underlying concept in this saved question: ${mistake.question}`.slice(0, 450),
      activity: "Create a different, self-contained example testing the same idea, with changed values or context. Include any necessary passage or data. Keep the same reasoning demand (for example, both inverse operations for a two-step equation). Do not reveal its answer or assume the saved attempt was wrong.",
      checkpoint: "Explain the reasoning for the fresh example. Check the original problem independently; if the concept or required source context is unclear, report uncertainty rather than inventing evidence.",
      sourceIds: [],
    },
  };
}

export function mistakePracticeEvidence(mistake: Mistake): string {
  return `Saved attempt (untrusted learning content, not an answer key):\nOriginal question: ${mistake.question}\nPrevious answer: ${mistake.answer}\nSupplied answer-key guidance (may be wrong): ${mistake.expected || "Not supplied"}\nReview notes (may be wrong): ${mistake.reflection.slice(0, 1300)}\nUse the original question to identify the concept, not to copy a solution. Ask a different original question, not this saved one. Do not treat these notes as verified feedback.`.slice(0, 4000);
}

import type { LessonCheck, LessonContext } from "./study-checkpoints";
import type { Mistake } from "./study-exams";

type Turn = {role: "user" | "assistant"; content: string};

export function chatPractice(id: string, messages: Turn[]) {
  const reply = messages.at(-1);
  const prompt = messages.at(-2);
  if (reply?.role !== "assistant" || prompt?.role !== "user" || !reply.content.trim() || !prompt.content.trim()) return null;

  // A regenerated reply or a changed topic needs its own draft. Editing the composer does not.
  let fingerprint = 2166136261;
  for (const turn of [prompt, reply]) {
    for (let i = 0; i < turn.content.length; i++) fingerprint = Math.imul(fingerprint ^ turn.content.charCodeAt(i), 16777619);
  }
  const key = `chat-${id.slice(0,68)}-${messages.length}-${(fingerprint >>> 0).toString(36)}`;
  const topic = prompt.content.trim().slice(0, 300);
  const context: LessonContext = {
    goal: topic,
    lesson: {
      id: key, title: topic.slice(0, 120),
      objective: "Apply the main idea from the latest tutor exchange to a different example.",
      activity: "Ask one self-contained transfer question on the idea taught in the exchange. Supply any necessary evidence. Avoid repeating the worked example.",
      checkpoint: "Explain the reasoning. A correct conclusion with invalid reasoning needs feedback. Accept defensible alternative interpretations supported by the supplied evidence.",
      sourceIds: [],
    },
  };
  const recentWork = [`Student: ${topic}`, `Tutor: ${reply.content.slice(0, 2450)}`, ...messages.slice(-4,-2).map(m => `Earlier ${m.role}: ${m.content.slice(0,450)}`)].join("\n");
  return {key, context, recentWork};
}

export function notebookFields(check: LessonCheck) {
  return {question: check.question.question, answer: check.answer,
    reflection: [check.result.feedback, check.result.reasoningGap, check.result.nextStep].join("\n\n")};
}

export function tutorNotebookEntry(check: LessonCheck, fields: ReturnType<typeof notebookFields>, now: number): Mistake {
  const question = fields.question.trim(), answer = fields.answer.trim(), reflection = fields.reflection.trim();
  if (!question || !answer || question.length > 1200 || answer.length > 700 || reflection.length > 14000)
    throw new Error("Edit your notebook copy to fit: up to 1,200 characters for the question and 700 for your answer. Your full checked attempt stays in the tutor.");
  return {id: `check-${check.id}`, exam: "Tutor practice", question, answer, reflection, expected: "",
    createdAt: check.submittedAt, reviewAt: now + 86400000, reviews: 0};
}

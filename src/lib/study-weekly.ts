import {checkLabel, checkReviewMethod, lessonIdentity, type LessonCheck} from "./study-checkpoints";
import {normalizePracticeAttempts, practiceQuestions} from "./study-practice";
import {normalizeExamAttempts} from "./study-exam-practice";
import {examBank, examSkillLessons} from "./study-exam-bank";

type Outcome = "independent" | "practice" | "helped" | "uncertain";
export type WeeklyAttempt = {
  key: string; time: number; topic: string; outcome: Outcome; label: string;
  question: string; answer: string; feedback: string; next: string; href: string; action: string;
};

export function weeklyAttempts(checks: LessonCheck[], exams: unknown, practice: unknown, now: number) {
  const start = new Date(now);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const latest = new Map<string, WeeklyAttempt>();
  function add(attempt: WeeklyAttempt) {
    if (attempt.time < start.getTime() || attempt.time > now) return;
    const prior = latest.get(attempt.key);
    if (!prior || attempt.time >= prior.time) latest.set(attempt.key, attempt);
  }
  for (const c of checks) {
    const decision = c.result.decision;
    const outcome = decision === "uncertain" ? "uncertain" : decision !== "meets" ? "practice" : c.helpUsed ? "helped" : "independent";
    add({key: JSON.stringify([lessonIdentity(c.context),c.question.question]), time:c.submittedAt, topic:c.context.lesson.title,
      outcome, label:checkLabel(c), question:c.question.question, answer:c.answer,
      feedback:`${checkReviewMethod(c)} · ${c.result.feedback}`, next:c.result.nextStep,
      href:"#ai-assistant", action:"Open AI Tutor"});
  }
  const record = exams && typeof exams === "object" && "attempts" in exams ? exams.attempts : [];
  for (const a of normalizeExamAttempts(record)) {
    if (a.selectedIndex === null) continue;
    const q = examBank.find(item=>item.id===a.questionId)!;
    const skill = examSkillLessons[q.skill];
    addChoice(a.exam+"-"+q.id,a.submittedAt,a.exam.toUpperCase()+" · "+skill.name,
      [q.passage,q.prompt].filter(Boolean).join("\n"),q.choices[a.selectedIndex],a.reasoning,
      a.selectedIndex===q.answerIndex,a.hintsUsed,q.explanation,
      `/study/exams?exam=${a.exam}&domain=${q.domain}&skill=${q.skill}`,"Open exam practice");
  }
  for (const a of normalizePracticeAttempts(practice)) {
    const q=practiceQuestions.find(item=>item.id===a.questionId)!;
    addChoice("foundation-"+q.id,a.submittedAt,q.title,[q.prompt,q.code].filter(Boolean).join("\n"),
      q.choices[a.selectedIndex],"",a.selectedIndex===q.answerIndex,a.hintsUsed,q.explanation,"/study/practice","Open foundational practice");
  }
  function addChoice(key:string,time:number,topic:string,question:string,choice:string,reasoning:string,correct:boolean,hints:number,feedback:string,href:string,action:string) {
    const outcome = !correct ? "practice" : hints ? "helped" : "independent";
    add({key,time,topic,outcome,question,answer:[choice,reasoning].filter(Boolean).join("\n"),feedback,href,action,
      label: !correct ? "Incorrect choice" : hints ? "Correct with help" : "Correct without recorded help",
      next: !correct ? "Compare your choice with the explanation below. Then try another question on this skill." :
        "Try a different example on this skill and explain your reasoning before checking it."});
  }
  const attempts = [...latest.values()].sort((a,b)=>b.time-a.time);
  const independent = attempts.find(a=>a.outcome==="independent");
  const review = attempts.find(a=>a.outcome==="practice") ?? attempts.find(a=>a.outcome==="helped") ?? attempts.find(a=>a.outcome==="uncertain");
  return {count:attempts.length, independent, review};
}

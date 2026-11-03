import type { GoalLesson } from "./study-goal";
import type { SavedJourney } from "./study-progress";
import { normalizeMistakes } from "./study-exams";
import { latestLessonCheck, type LessonCheck } from "./study-checkpoints";
import {readExamRecord,examReviewProgress} from "./study-exam-practice";
import {examBank,examSkillLessons,type ExamProfile,type ExamDomain,type ExamSkill} from "./study-exam-bank";
import { mistakePracticeContext } from "./study-mistake-practice";

export type LearningRecommendation = {
 title: string; reason: string; action: string; check?: LessonCheck;
} & ({kind: "lesson"; lesson: GoalLesson} | {kind: "notebook"; mistakeId: string} | {kind: "plan"} | {kind:"exam";exam:ExamProfile;domain:ExamDomain;skill?:ExamSkill});

/** Transparent rules over saved evidence; never a score or an automatic completion. */
export function recommendLearningStep(journey: SavedJourney | null, rawMistakes: unknown, checks: LessonCheck[], now: number, rawExamPractice:unknown=null): LearningRecommendation {
 if (journey && (!journey.accepted || journey.dirty)) return {kind:"plan",title:"Review your learning plan.",reason:"Your plan has changes or has not been accepted. Review it before continuing a planned lesson.",action:"Review my plan"};
 const candidates: {recommendation: LearningRecommendation; priority: number; time: number}[] = [];
 if (journey) {
  for (const lesson of journey.plan.lessons) {
   const check = latestLessonCheck({goal:journey.settings.goal,lesson},checks,now);
   if (!check) continue;
   const base = {kind:"lesson" as const,lesson,check};
   if (check.result.decision === "partial" || check.result.decision === "needs_work") candidates.push({priority:10,time:check.submittedAt,recommendation:{...base,title:`Revisit: ${lesson.title}`,reason:"Your latest check on this lesson identified reasoning to work on. Revisit that step before moving forward.",action:"Work on this lesson"}});
   else if (check.result.decision === "uncertain") candidates.push({priority:20,time:check.submittedAt,recommendation:{...base,title:`Verify: ${lesson.title}`,reason:"The latest feedback could not verify your answer. Check the question and sources with your tutor; this is not evidence of a wrong answer.",action:"Clarify this feedback"}});
   else if (check.helpUsed) candidates.push({priority:30,time:check.submittedAt,recommendation:{...base,title:`Try independently: ${lesson.title}`,reason:"Your latest check was completed with help. A different example without hints can show what you can explain on your own.",action:"Practice this lesson"}});
  }
  const next = journey.plan.lessons.find(lesson=>!journey.completed.includes(lesson.id));
  if (next) candidates.push({priority:50,time:0,recommendation:{kind:"lesson",lesson:next,title:`Continue: ${next.title}`,reason:"This is the next lesson you have not marked complete in your accepted plan.",action:"Continue my learning"}});
  else {
   const unchecked = journey.plan.lessons.find(lesson=>!latestLessonCheck({goal:journey.settings.goal,lesson},checks,now));
   if (unchecked) candidates.push({priority:60,time:0,recommendation:{kind:"lesson",lesson:unchecked,title:`Check: ${unchecked.title}`,reason:"You marked your lessons complete. This lesson has no saved understanding check yet; try explaining it in a fresh example.",action:"Revisit and check"}});
  }
 }
 for (const mistake of normalizeMistakes(rawMistakes).filter(m=>m.createdAt<=now && m.reviewAt<=now)) {
  const latest = latestLessonCheck(mistakePracticeContext(mistake),checks,now);
  const check = latest && latest.submittedAt >= mistake.createdAt ? latest : undefined;
  const base = {kind:"notebook" as const,mistakeId:mistake.id,check};
  const short = mistake.question.length>95 ? mistake.question.slice(0,92)+"…" : mistake.question;
  let recommendation:LearningRecommendation,priority:number;
  if (!check) {priority=40;recommendation={...base,title:`Revisit: ${short}`,reason:`This ${mistake.exam} notebook entry is due and has no saved follow-up check. Try a different question on the same idea.`,action:"Practice this saved idea"};}
  else if (check.result.decision === "partial" || check.result.decision === "needs_work") {priority=10;recommendation={...base,title:`Work on: ${short}`,reason:"This notebook entry is due, and its latest follow-up identified reasoning that needs another look.",action:"Revisit this reasoning"};}
  else if (check.result.decision === "uncertain") {priority=20;recommendation={...base,title:`Verify: ${short}`,reason:"This entry is due, but its latest feedback could not verify the answer. Check the problem and sources before treating it as right or wrong.",action:"Review uncertain feedback"};}
  else if (check.helpUsed) {priority=30;recommendation={...base,title:`Try without hints: ${short}`,reason:"This entry is due. Its latest follow-up was completed with help; try a fresh example independently when you are ready.",action:"Practice without hints"};}
  else {priority=55;recommendation={...base,title:`Finish your review: ${short}`,reason:"Your latest follow-up was answered independently. The original entry is still due; review the evidence and choose whether to reschedule it.",action:"Review this result"};}
  candidates.push({recommendation,priority,time:mistake.reviewAt});
 }
 try {
  if(rawExamPractice){
   const practice=readExamRecord(rawExamPractice),exam=practice.activeExam;
   const review=examReviewProgress(exam,practice.attempts,now).find(r=>!r.resolvedBy);
   if(review){
    const missed=review.anchor.selectedIndex!==examBank.find(q=>q.id===review.anchor.questionId)?.answerIndex;
    candidates.push({priority:review.dueAt<=now?(missed?15:35):45,time:review.dueAt,recommendation:{kind:"exam",exam,domain:review.domain,skill:review.skill,title:`Revisit: ${examSkillLessons[review.skill].name}`,reason:review.dueAt<=now?"Your suggested review is due. Try a different question on this idea without hints; repeating the original answer does not complete this follow-up.":"Your last attempt on this idea needed another look or used help. A next-day review is suggested; you can try a different example sooner if you prefer.",action:`Review ${exam==="sat"?"SAT":"PSAT"} skill`}});
   }
  }
 }catch{/* An unreadable exam record must never invent evidence or block other learning. */}
 candidates.sort((a,b)=>a.priority-b.priority||a.time-b.time);
 return candidates[0]?.recommendation || {kind:"plan",title:journey?"Choose your next learning goal.":"What would you like to understand?",reason:journey?"There are no due notebook entries or current lesson checks needing follow-up. You can review your plan or explore a new goal; this does not certify mastery.":"Describe a subject, challenge, or exam to shape a practical starting path.",action:journey?"Review my plan":"Shape my learning plan"};
}

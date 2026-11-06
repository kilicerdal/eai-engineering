import {weeklyReviewPrompt, weeklyAttempts, type WeeklyAttempt} from "@/lib/study-weekly";
import type {LessonCheck} from "@/lib/study-checkpoints";
import StudyGuide from "@/components/StudyGuide";

function Evidence({attempt}: {attempt: WeeklyAttempt}) {
  return <details><summary>View saved attempt</summary>
    <p>{new Date(attempt.time).toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})} · {attempt.label}</p>
    <p className="whitespace-pre-wrap"><strong>Question</strong><br/>{attempt.question}</p>
    <p className="whitespace-pre-wrap"><strong>Your answer</strong><br/>{attempt.answer}</p>
    <p>{attempt.feedback}</p>
    <button type="button" onClick={() => {
      window.dispatchEvent(new CustomEvent("eai-study-prompt", {detail:weeklyReviewPrompt(attempt)}));
      document.getElementById("ai-assistant")?.scrollIntoView({block:"start"});
    }}>Review this attempt with my tutor →</button>
    <p>A new tutor draft includes this question, your answer and saved feedback. Review it before sending; long entries are shortened.</p>
  </details>;
}

export default function WeeklyStudySummary({checks,exams,practice,now}: {checks:LessonCheck[];exams:unknown;practice:unknown;now:number}) {
  const {count,independent,review}=weeklyAttempts(checks,exams,practice,now);
  const next=review??independent;
  return <section id="weekly-summary" className="learning-check-evidence" aria-labelledby="weekly-heading">
    <h3 id="weekly-heading">Your week in learning</h3>
    <p>Last 7 days · {count} distinct {count===1?"question":"questions"} checked</p>
    <StudyGuide section="Weekly summary">Open a saved attempt to see the question, your answer and the feedback. This summary uses the latest checked attempt per question from today and the previous six days.</StudyGuide>
    {!next ? <p>Complete a check after a tutor conversation, or answer a practice question. Your first result will appear here. <a href="#ai-assistant">Start with your tutor ↗</a></p> : <>
      <div>{independent && <article><strong>Answered independently</strong><p>{independent.topic}</p><Evidence attempt={independent}/></article>}
        {review && <article><strong>{review.outcome==="uncertain"?"Feedback to verify":review.outcome==="helped"?"Try without help":"Worth practicing again"}</strong><p>{review.topic}</p><Evidence attempt={review}/></article>}
      </div>
      {!independent && <p>An independent answer will appear here once a check records one.</p>}
      <p><strong>Suggested next step · {next.topic}</strong><br/>{next.next} <a href={next.href}>{next.action} ↗</a></p>
    </>}
  </section>;
}

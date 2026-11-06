"use client";

import {useState} from "react";
import {weeklyReviewPrompt, weeklyAttempts, type WeeklyAttempt, type Outcome} from "@/lib/study-weekly";
import type {LessonCheck} from "@/lib/study-checkpoints";
import StudyGuide from "@/components/StudyGuide";

function Evidence({attempt}: {attempt: WeeklyAttempt}) {
  return <details><summary>View saved attempt</summary>
    <p>{new Date(attempt.time).toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric"})} · {attempt.label}</p>
    <p className="whitespace-pre-wrap"><strong>Question</strong><br/>{attempt.question}</p>
    <p className="whitespace-pre-wrap"><strong>Your answer</strong><br/>{attempt.answer}</p>
    <p>{attempt.feedback}</p>
    {attempt.originalQuestion&&<details><summary>Original question behind this follow-up</summary><p className="whitespace-pre-wrap">{attempt.originalQuestion}</p><p>This is a follow-up result, not a mastery score. Compare the reasoning and recorded help before drawing conclusions.</p></details>}
    {attempt.sources?.length&&<details><summary>Source passages available for this review</summary><p>These saved excerpts support source-based review. They do not verify every statement in the feedback.</p>{attempt.sources.map(source=><blockquote key={source.sourceId}><strong>{source.name} · {source.kind==="pdf"?"Page":"Section"} {source.page}</strong><p className="whitespace-pre-wrap">{source.text}</p></blockquote>)}</details>}
    <button type="button" onClick={() => {
      window.dispatchEvent(new CustomEvent("eai-study-prompt", {detail:weeklyReviewPrompt(attempt)}));
      document.getElementById("ai-assistant")?.scrollIntoView({block:"start"});
    }}>Review this attempt with my tutor →</button>
    <p>Open a tutor review with this question, your answer and feedback. After discussing it, choose Open review practice to try a different question and save checked feedback. Existing drafts are preserved; long entries are shortened.</p>
  </details>;
}

export default function WeeklyStudySummary({checks,exams,practice,now}: {checks:LessonCheck[];exams:unknown;practice:unknown;now:number}) {
  const {count,attempts,counts,independent,review}=weeklyAttempts(checks,exams,practice,now);
  const [filter,setFilter]=useState<Outcome | "all">("all");
  const labels:Record<Outcome,string>={independent:"Without recorded help",helped:"With help",practice:"Needs practice",uncertain:"Needs verification"};
  const visible=attempts.filter(attempt=>filter==="all"||attempt.outcome===filter);
  const next=review??independent;
  return <section id="weekly-summary" className="learning-check-evidence" aria-labelledby="weekly-heading">
    <h3 id="weekly-heading">Your week in learning</h3>
    <p>Last 7 days · {count} distinct {count===1?"question":"questions"} checked</p>
    <details className="weekly-summary-detail"><summary>Review this week’s activity</summary>
    <StudyGuide section="Weekly summary">Open a saved attempt to see the question, your answer and the feedback. This summary uses the latest checked attempt per question from today and the previous six days.</StudyGuide>
    {!next ? <p>Complete a check after a tutor conversation, or answer a practice question. Your first result will appear here. <a href="#ai-assistant">Start with your tutor ↗</a></p> : <>
      <div>{independent && <article><strong>Answered independently</strong><p>{independent.topic}</p><Evidence attempt={independent}/></article>}
        {review && <article><strong>{review.outcome==="uncertain"?"Feedback to verify":review.outcome==="helped"?"Try without help":"Worth practicing again"}</strong><p>{review.topic}</p><Evidence attempt={review}/></article>}
      </div>
      <details>
        <summary>Explore all {count} recent results</summary>
        <p>Latest checked answer per question. These are recorded outcomes, not mastery scores. Uncertain feedback is separate from incorrect answers.</p>
        <div role="group" aria-label="Filter recent learning results" className="flex flex-wrap gap-2">
          {(["all","independent","helped","practice","uncertain"] as const).map(outcome=><button key={outcome} type="button" aria-pressed={filter===outcome} onClick={()=>setFilter(outcome)}>{outcome==="all"?`All (${count})`:`${labels[outcome]} (${counts[outcome]})`}</button>)}
        </div>
        <p role="status">{visible.length} {visible.length===1?"result":"results"} shown</p>
        {visible.length===0?<p>No results in this category yet. Results appear after you submit a learning check or practice answer.</p>:<ul className="space-y-4">{visible.map(attempt=><li key={attempt.key}><strong>{attempt.topic}</strong><p>{labels[attempt.outcome]}</p><Evidence attempt={attempt}/></li>)}</ul>}
      </details>
      {!independent && <p>An independent answer will appear here once a check records one.</p>}
      <p><strong>Suggested next step · {next.topic}</strong><br/>{next.next} <a href={next.href}>{next.action} ↗</a></p>
    </>}
    </details>
  </section>;
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { restoreJourney, learningEvidence, type SavedJourney } from "@/lib/study-progress";
import { goalLessonPrompt } from "@/lib/study-goal";
import { differentQuestionPrompt } from "@/lib/study-exams";
import { loadMaterialLibrary } from "@/lib/study-material-files";

const emptyEvidence = learningEvidence([], [], 0);
export default function LearningHome() {
  const [journey,setJourney] = useState<SavedJourney | null>(null);
  const [evidence,setEvidence] = useState(emptyEvidence);
  const [documents,setDocuments] = useState<number | null>(null);
  const [ready,setReady] = useState(false);
  const [warning,setWarning] = useState("");
  useEffect(() => {
    let cancelled = false, revision = 0;
    const refresh = () => {
      const current = ++revision;
      try {
        const saved = localStorage.getItem("eai-goal-journey-v1");
        setJourney(restoreJourney(saved ? JSON.parse(saved) : null));
        setEvidence(learningEvidence(JSON.parse(localStorage.getItem("eai-study-practice-v1") || "[]"),JSON.parse(localStorage.getItem("eai-exam-mistakes-v1") || "[]"),Date.now()));
        setWarning("");
      } catch { setJourney(null); setEvidence(emptyEvidence); setWarning("Some saved progress could not be read. Open the original tool to check your work."); }
      setReady(true);
      void loadMaterialLibrary().then(library => { if (!cancelled && current === revision) setDocuments(library.documents.length); }).catch(() => { if (!cancelled && current === revision) setDocuments(null); });
    };
    const initial = window.setTimeout(refresh,0);
    const timer = window.setInterval(refresh,60000);
    window.addEventListener("eai-study-progress-change",refresh);
    window.addEventListener("storage",refresh);
    window.addEventListener("focus",refresh);
    return () => { cancelled = true; clearTimeout(initial); clearInterval(timer); window.removeEventListener("eai-study-progress-change",refresh); window.removeEventListener("storage",refresh); window.removeEventListener("focus",refresh); };
  },[]);
  const next = journey?.plan.lessons.find(lesson => !journey.completed.includes(lesson.id));
  const usable = journey?.accepted && !journey.dirty;
  function resume() {
    if (!journey || !next || !usable) return;
    const level = journey.settings.level === "foundations" ? "foundation" : journey.settings.level === "highschool" ? "highSchool" : journey.settings.level;
    window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"general",message:goalLessonPrompt(journey.settings,next),title:next.title,goal:journey.settings.goal,level}}));
    document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function review() {
    const mistake = evidence.due[0]; if (!mistake) return;
    window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"exam",message:differentQuestionPrompt(mistake),title:`Review: ${mistake.exam}`,goal:"Check understanding with a different example",approach:"practice"}}));
    document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  return <section id="my-learning" className="learning-home" aria-labelledby="learning-home-heading">
    <div className="studio-section-title"><div><p className="studio-eyebrow">YOUR LEARNING, CONNECTED</p><h2 id="learning-home-heading">Your next step, in focus.</h2></div><p>Build on what you know.<br/>Return to what needs practice.</p></div>
    <p className="learning-home-note">Saved in this browser · No account or subscription required</p>
    {!ready ? <p role="status">Loading your learning…</p> : <>
      {warning && <p role="status" className="goal-notice">{warning}</p>}
      <div className="learning-home-grid"><article className="learning-next"><p className="studio-eyebrow">{journey ? "YOUR PERSONAL PATH" : "BEGIN WITH YOUR GOAL"}</p><h3>{journey?.plan.title || "What would you like to understand?"}</h3><p>{journey ? usable ? next ? next.objective : "You marked every lesson complete. Revisit a checkpoint or explore a new goal to check what you can explain independently." : "Your outline needs your review before you continue." : "Start with a subject, a challenge, or an exam. Your existing tutor and materials will help you shape a practical starting path."}</p>
      {journey && <><p className="learning-home-count">{journey.completed.length} of {journey.plan.lessons.length} lessons marked complete by you</p><progress aria-label="Lessons you marked complete" value={journey.completed.length} max={journey.plan.lessons.length}/><p className="learning-home-small">Completion marks are your record of activity, not a mastery score.</p></>}
      <div className="goal-actions">{usable && next ? <button className="goal-primary" onClick={resume}>Continue: {next.title} ↗</button> : <a className="goal-primary" href="#learning-goal">{journey ? "Review my plan" : "Shape my learning plan"} →</a>}{journey && usable && <a href="#learning-goal">View my plan ↗</a>}</div>{usable && next && <p className="learning-home-small">Continue prepares your lesson in the tutor. Review it and select Send.</p>}</article>
      <article className="learning-review"><p className="studio-eyebrow">MY MISTAKE NOTEBOOK</p><h3>{evidence.due.length ? `${evidence.due.length} ready to revisit` : evidence.mistakes ? "Your next review is planned." : "Turn a mistake into a next step."}</h3><p>{evidence.due.length ? "Try a different question on the same idea. Your saved entry stays due until you mark it reviewed." : evidence.nextReviewAt ? `Next suggested review: ${new Date(evidence.nextReviewAt).toLocaleDateString()}.` : "Capture your reasoning in the existing notebook, understand the missing idea, then return to a fresh example."}</p><div className="goal-actions">{evidence.due.length > 0 && <button className="goal-primary" onClick={review}>Practice a due concept ↗</button>}<a href="#mistake-notebook">Open my notebook ↗</a></div><p className="learning-home-small">Review dates follow your own review marks; they do not certify understanding.</p></article></div>
      <details className="learning-evidence"><summary>Evidence behind your progress <span>{evidence.attempted} checked {evidence.attempted === 1 ? "question" : "questions"} · {documents === null ? "Library unavailable" : `${documents} ${documents === 1 ? "material" : "materials"}`}</span></summary><div className="learning-evidence-grid"><div><strong>{evidence.independent}</strong><span>Latest answer correct without hints</span></div><div><strong>{evidence.supported}</strong><span>Latest answer correct with hints</span></div><div><strong>{evidence.revisit}</strong><span>Latest answer needs another look</span></div><Link href="/study/materials"><strong>{documents ?? "—"}</strong><span>Saved materials · Open library ↗</span></Link></div><p className="learning-home-small">Checked answers come from the small foundational practice bank, one latest answer per question. Repeating an answer cannot increase this count. These results do not measure overall mastery or predict an exam score.</p><Link href="/study/practice">Continue foundational practice ↗</Link></details>
    </>}
  </section>;
}

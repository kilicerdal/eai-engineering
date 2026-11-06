"use client";
import WeeklyStudySummary from "@/components/WeeklyStudySummary";
import {PLAN_CHOICE_KEY,resolvePlanChoice} from "@/lib/study-plan-adjustment";
import DailyStudySession from "@/components/DailyStudySession";
import {dailyTargetHref,type DailyTarget} from "@/lib/study-daily-session";
import {mistakePracticeContext} from "@/lib/study-mistake-practice";
import {normalizeMistakes} from "@/lib/study-exams";
import {lessonIdentity} from "@/lib/study-checkpoints";
import OpenStudyWork from "@/components/OpenStudyWork";
import { useEffect, useState } from "react";
import Link from "next/link";
import StudyLandmark from "@/components/StudyLandmark";
import { CHECK_KEY, checkLabel, checkReviewMethod, normalizeLessonChecks, latestLessonCheck, recommendLesson, checkMemory, type LessonCheck } from "@/lib/study-checkpoints";
import { restoreJourney, learningEvidence, type SavedJourney } from "@/lib/study-progress";
import { recommendLearningStep } from "@/lib/study-recommendations";
import type { GoalLesson } from "@/lib/study-goal";
import { goalLessonPrompt } from "@/lib/study-goal";
import type {CourseDocument} from "@/lib/study-materials";
import { loadMaterialLibrary } from "@/lib/study-material-files";

const emptyEvidence = learningEvidence([], [], 0);
export default function LearningHome() {
  const [journey,setJourney] = useState<SavedJourney | null>(null);
  const [evidence,setEvidence] = useState(emptyEvidence);
  const [materials,setMaterials]=useState<CourseDocument[]>([]);
  const [documents,setDocuments] = useState<number | null>(null);
  const [examPractice,setExamPractice] = useState<unknown>(null);
  const [foundation,setFoundation] = useState<unknown>([]);
  const [checks,setChecks] = useState<LessonCheck[]>([]);
  const [planChoice,setPlanChoice]=useState<unknown>(null);
  const [now,setNow] = useState(0);
  const [ready,setReady] = useState(false);
  const [warning,setWarning] = useState("");
  useEffect(() => {
    let cancelled = false, revision = 0;
    const refresh = () => {
      const current = ++revision;
      try {
        const saved = localStorage.getItem("eai-goal-journey-v1");
        setJourney(restoreJourney(saved ? JSON.parse(saved) : null));
        setNow(Date.now());try{setPlanChoice(JSON.parse(localStorage.getItem(PLAN_CHOICE_KEY)||"null"));}catch{setPlanChoice(null);}
        try{setExamPractice(JSON.parse(localStorage.getItem("eai-exam-prep-v1")||"null"));}catch{setExamPractice(null);}
        try { setChecks(normalizeLessonChecks(JSON.parse(localStorage.getItem(CHECK_KEY)||"[]"))); } catch { setChecks([]); }
        const attempts = JSON.parse(localStorage.getItem("eai-study-practice-v1") || "[]");
        setFoundation(attempts);
        setEvidence(learningEvidence(attempts,JSON.parse(localStorage.getItem("eai-exam-mistakes-v1") || "[]"),Date.now()));
        setWarning("");
      } catch { setJourney(null); setEvidence(emptyEvidence); setWarning("Some saved progress could not be read. Open the original tool to check your work."); }
      setReady(true);
      void loadMaterialLibrary().then(library => { if (!cancelled && current === revision) {setDocuments(library.documents.length);setMaterials(library.documents);} }).catch(() => { if (!cancelled && current === revision) {setDocuments(null);setMaterials([]);} });
    };
    const initial = window.setTimeout(refresh,0);
    const timer = window.setInterval(refresh,60000);
    window.addEventListener("eai-study-progress-change",refresh);
    window.addEventListener("storage",refresh);
    window.addEventListener("focus",refresh);
    return () => { cancelled = true; clearTimeout(initial); clearInterval(timer); window.removeEventListener("eai-study-progress-change",refresh); window.removeEventListener("storage",refresh); window.removeEventListener("focus",refresh); };
  },[]);
  const chosenPlan=resolvePlanChoice(journey,checks,planChoice,now);
  const next = chosenPlan?.lesson || (journey ? recommendLesson(journey.settings.goal,journey.plan.lessons,journey.completed,checks,now) : null);
  const lessonEvidence = journey ? journey.plan.lessons.flatMap(lesson => {const check=latestLessonCheck({goal:journey.settings.goal,lesson},checks,now);return check?[check]:[];}) : [];
  const recommendation = recommendLearningStep(journey,evidence.due,checks,now,examPractice,materials,planChoice);
  const notebookRecommendation = recommendLearningStep(null,evidence.due,checks,now);
  const sharedNotebookStep = recommendation.kind==="notebook"&&notebookRecommendation.kind==="notebook"&&recommendation.mistakeId===notebookRecommendation.mistakeId;
  const usable = journey?.accepted && !journey.dirty;
  function resume(lesson:GoalLesson|null=next) {
    if (!journey || !lesson || !usable) return;
    const nextCheck=latestLessonCheck({goal:journey.settings.goal,lesson},checks,now);
    const level = journey.settings.level === "foundations" ? "foundation" : journey.settings.level === "highschool" ? "highSchool" : journey.settings.level;
    window.dispatchEvent(new CustomEvent("eai-study-prompt",{detail:{subject:"general",message:(goalLessonPrompt(journey.settings,lesson).slice(0,1900)+checkMemory(nextCheck)).slice(0,3000),title:lesson.title,goal:journey.settings.goal,level,checkpoint:{goal:journey.settings.goal,lesson}}}));
    document.getElementById("ai-assistant")?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function review(id:string) {
    window.dispatchEvent(new CustomEvent("eai-study-notebook-practice",{detail:{id}}));
  }
  function followRecommendation() {
    if(recommendation.kind==="lesson")resume(recommendation.lesson);
    else if(recommendation.kind==="notebook")review(recommendation.mistakeId);
  }
  const dailyTarget:DailyTarget=recommendation.kind==="lesson"&&journey?{kind:"lesson",title:recommendation.lesson.title,context:{goal:journey.settings.goal,lesson:recommendation.lesson}}:recommendation.kind==="notebook"?(()=>{const item=evidence.due.find(m=>m.id===recommendation.mistakeId);return item?{kind:"notebook" as const,title:recommendation.title,id:item.id,context:mistakePracticeContext(item)}:{kind:"plan" as const,title:"Shape your learning goal"};})():recommendation.kind==="material"&&recommendation.check?{kind:"material",title:recommendation.title,id:recommendation.contextId,context:recommendation.check.context}:recommendation.kind==="exam"?{kind:"exam",title:recommendation.title,exam:recommendation.exam,domain:recommendation.domain,skill:recommendation.skill}:{kind:"plan",title:recommendation.title};
  function openDailyTarget(target:DailyTarget,practice=false){
    if(target.kind==="lesson"){
      const lesson=journey?.plan.lessons.find(l=>lessonIdentity({goal:journey.settings.goal,lesson:l})===lessonIdentity(target.context!));
      if(!lesson||!usable)throw new Error("This plan changed. Your session is preserved; review the current plan before continuing.");resume(lesson);if(practice)requestAnimationFrame(()=>requestAnimationFrame(()=>document.getElementById("lesson-understanding-check")?.scrollIntoView({behavior:"smooth",block:"start"})));return;
    }
    if(target.kind==="notebook"){
      const item=normalizeMistakes(JSON.parse(localStorage.getItem("eai-exam-mistakes-v1")||"[]")).find(m=>m.id===target.id);
      if(!item||lessonIdentity(mistakePracticeContext(item))!==lessonIdentity(target.context!))throw new Error("This notebook entry changed or was removed. Your session is preserved.");review(item.id);document.getElementById("mistake-notebook")?.scrollIntoView({behavior:"smooth",block:"start"});return;
    }
    if(target.kind==="material"&&!target.context?.sources?.every(source=>materials.some(d=>d.id===source.documentId&&d.pages.some(p=>p.number===source.page&&p.text.replace(/\s+/g," ").includes(source.text)))))throw new Error("The original source passage is unavailable or changed. Your session is preserved.");
    window.location.assign(dailyTargetHref(target));
  }
  return <section id="my-learning" className="learning-home" aria-labelledby="learning-home-heading">
    <div className="studio-landmark-banner studio-landmark-giza">
    <StudyLandmark scene="giza" />
    <div className="studio-section-title"><div><p className="studio-eyebrow">YOUR LEARNING, CONNECTED</p><h2 id="learning-home-heading">Your next step, in focus.</h2></div><p>Build on what you know.<br/>Return to what needs practice.</p></div>
    <p className="studio-landmark-caption">Giza, Egypt · An imagined horizon</p>
    </div>
    <div className="learning-home-content">
    {!ready ? <p role="status">Loading your learning…</p> : <>
      {warning && <p role="status" className="goal-notice">{warning}</p>}
      <DailyStudySession target={dailyTarget} openTarget={openDailyTarget} checks={checks} exam={examPractice} now={now}>
      <article className="learning-next"><p className="studio-eyebrow">01 / YOUR SUGGESTED FOCUS</p><h3>{recommendation.title}</h3><p>{recommendation.reason}</p>
      {recommendation.check && <div className="learning-check-memory"><strong>{checkLabel(recommendation.check)} · {checkReviewMethod(recommendation.check)}</strong>{recommendation.kind==="lesson"&&recommendation.lesson.id!==recommendation.check.context.lesson.id&&<p className="learning-home-small">Evidence from the earlier lesson: {recommendation.check.context.lesson.title}. The next lesson has not been assessed by this check.</p>}<p>{recommendation.check.result.nextStep}</p><small>Latest saved response · {new Date(recommendation.check.submittedAt).toLocaleDateString()} · Help use self-reported.</small></div>}
      <p className="learning-home-small">Based on your latest saved checks and due review dates. You can choose a different lesson or explore freely.</p>
      <div className="goal-actions">{recommendation.kind==="material"?<Link className="goal-primary" href={`/study/materials?review=${encodeURIComponent(recommendation.contextId)}`}>{recommendation.action} ↗</Link>:recommendation.kind==="exam"?<Link className="goal-primary" href={`/study/exams?exam=${recommendation.exam}&domain=${recommendation.domain}${recommendation.skill?`&skill=${recommendation.skill}`:""}#exam-review`}>{recommendation.action} ↗</Link>:recommendation.kind==="plan"?<a className="goal-primary" href="#learning-goal">Choose a learning goal →</a>:<button className="goal-primary" onClick={followRecommendation}>{recommendation.action} ↗</button>}{journey&&usable&&<a href="#learning-goal">View my plan ↗</a>}</div>
      {recommendation.kind==="lesson"&&<p className="learning-home-small">Prepares the lesson and its latest feedback in your tutor. Review the message and select Send.</p>}
      {journey&&<><p className="learning-home-count">Your plan: {journey.plan.title}</p><p className="learning-home-small">{journey.completed.length} of {journey.plan.lessons.length} lessons marked complete by you</p><progress aria-label="Lessons you marked complete" value={journey.completed.length} max={journey.plan.lessons.length}/><p className="learning-home-small">Completion marks are your record of activity, not a mastery score.</p>{recommendation.kind!=="lesson"&&usable&&next&&<button className="learning-plan-alternative" onClick={()=>resume()}>Continue my plan instead ↗</button>}</>}
      </article>

      </DailyStudySession>
      <OpenStudyWork/>
      <div className="learning-home-grid">
      <article className="learning-review"><p className="studio-eyebrow">MY MISTAKE NOTEBOOK</p><h3>{evidence.due.length ? `${evidence.due.length} ready to revisit` : evidence.mistakes ? "Your next review is planned." : "Turn a mistake into a next step."}</h3><p>{sharedNotebookStep ? "Your suggested review is highlighted in the recommendation. Open the notebook to see all saved attempts and their review dates." : evidence.due.length&&notebookRecommendation.kind==="notebook" ? notebookRecommendation.reason : evidence.nextReviewAt ? `Next suggested review: ${new Date(evidence.nextReviewAt).toLocaleDateString()}.` : "Capture your reasoning in the existing notebook, understand the missing idea, then return to a fresh example."}</p>
      {!sharedNotebookStep&&notebookRecommendation.check&&<div className="learning-check-memory"><strong>{checkLabel(notebookRecommendation.check)} · Latest follow-up</strong><p>{notebookRecommendation.check.result.nextStep}</p><small>{checkReviewMethod(notebookRecommendation.check)}; not a mastery assessment.</small></div>}
      <div className="goal-actions">{!sharedNotebookStep&&notebookRecommendation.kind==="notebook"&&<button className="goal-primary" onClick={()=>{if(notebookRecommendation.kind==="notebook")review(notebookRecommendation.mistakeId);}}>{notebookRecommendation.action} ↗</button>}<a href="#mistake-notebook">Open my notebook ↗</a></div><p className="learning-home-small">Review dates follow your own review marks; they do not certify understanding.</p></article></div>
      {!warning && <WeeklyStudySummary checks={checks} exams={examPractice} practice={foundation} now={now}/>}
      {lessonEvidence.length > 0 && <details className="learning-check-evidence" aria-label="Saved lesson checks"><summary>What your lesson checks show</summary><p>Latest saved check per lesson in your current plan. Check important feedback against your materials.</p><div>{lessonEvidence.map(check=><article key={check.context.lesson.id}><strong>{check.context.lesson.title}</strong><span>{checkLabel(check)}</span><p>{check.result.reasoningGap}</p><small>{checkReviewMethod(check)} · {new Date(check.submittedAt).toLocaleDateString()} · Help use self-reported</small></article>)}</div></details>}
      <details className="learning-evidence"><summary>Evidence behind your progress <span>{evidence.attempted} checked {evidence.attempted === 1 ? "question" : "questions"} · {documents === null ? "Library unavailable" : `${documents} ${documents === 1 ? "material" : "materials"}`}</span></summary><div className="learning-evidence-grid"><div><strong>{evidence.independent}</strong><span>Latest answer correct without hints</span></div><div><strong>{evidence.supported}</strong><span>Latest answer correct with hints</span></div><div><strong>{evidence.revisit}</strong><span>Latest answer needs another look</span></div><Link href="/study/materials"><strong>{documents ?? "—"}</strong><span>Saved materials · Open library ↗</span></Link></div><p className="learning-home-small">Checked answers come from the small foundational practice bank, one latest answer per question. Repeating an answer cannot increase this count. These results do not measure overall mastery or predict an exam score.</p><Link href="/study/practice">Continue foundational practice ↗</Link></details>
    </>}
    </div>
  </section>;
}

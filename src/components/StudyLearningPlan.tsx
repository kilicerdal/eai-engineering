"use client";

import { useEffect, useRef, useState } from "react";
import { practiceQuestions, practiceTracks, type PracticeAttempt, type PracticeTrack } from "@/lib/study-practice";
import { buildLearningPlan, defaultPlanSettings, learningGoals, miniLessons, normalizePlanSettings, type PlanSettings } from "@/lib/study-learning";

import { writeStudyCopy } from "@/lib/study-safe-storage";

const SETTINGS_KEY = "eai-study-plan-v1";

type Props = {
  track: PracticeTrack;
  attempts: PracticeAttempt[];
  ready: boolean;
  onTrackChange: (track: PracticeTrack) => void;
  onPractice: (questionId: string) => void;
};

export default function StudyLearningPlan({ track, attempts, ready, onTrackChange, onPractice }: Props) {
  const [settings, setSettings] = useState<PlanSettings>(defaultPlanSettings);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(0);
  const [lessonQuestionId, setLessonQuestionId] = useState<string | null>(null);
  const lessonTrigger = useRef<HTMLButtonElement>(null);
  const lessonHeading = useRef<HTMLHeadingElement>(null);
  function closeLesson() {
    setLessonQuestionId(null);
    lessonTrigger.current?.focus();
  }
  const savedRaw = useRef<string | null | undefined>(undefined);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    let saved = defaultPlanSettings;
    let notice = "";
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
        saved = normalizePlanSettings(parsed);
      }
      savedRaw.current = raw;
    } catch {
      savedRaw.current = undefined;
      notice = "Saved plan settings could not be read. Changes will apply only in this tab.";
    }
    queueMicrotask(() => { setSettings(saved); setNow(Date.now()); setLoaded(true); setSaveNotice(notice); });
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  function changeSettings(next: PlanSettings) {
    setSettings(next);
    if (savedRaw.current === undefined) return;
    try {
      savedRaw.current = writeStudyCopy(localStorage, SETTINGS_KEY, savedRaw.current, next);
      setSaveNotice("");
    } catch {
      savedRaw.current = undefined;
      setSaveNotice("These settings apply only in this tab. Reload to read the latest saved settings.");
    }
  }

  useEffect(() => { queueMicrotask(() => setNow(Date.now())); }, [attempts]);

  const plan = ready && loaded ? buildLearningPlan(track, attempts, settings, now) : null;
  const lessonQuestion = practiceQuestions.find(question => question.id === lessonQuestionId);
  const lesson = lessonQuestion ? miniLessons[lessonQuestion.skill] : null;
  const reviewDate = plan?.nextReviewAt ? new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(plan.nextReviewAt) : null;

  return (
    <div className="mb-6 rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/5 to-slate-900 p-5 md:p-7" aria-labelledby="learning-plan-heading">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">YOUR NEXT STEPS</p>
          <h3 id="learning-plan-heading" className="mt-2 text-2xl font-semibold text-white">Your guided practice session</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Choose from the skills in this practice bank. Your attempts shape the next exercise and suggested reviews.</p>
        </div>
        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-xs text-cyan-200">Estimated session · {settings.minutes} min</span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="text-xs font-medium text-slate-300">Practice track
          <select aria-label="Practice track" value={track} disabled={!ready || !loaded} onChange={event => { setLessonQuestionId(null); onTrackChange(event.target.value as PracticeTrack); }} className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white">
            {Object.entries(practiceTracks).map(([value,label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-300">Learning goal
          <select aria-label="Plan learning goal" value={settings.goal} disabled={!ready || !loaded} onChange={event => changeSettings({ ...settings, goal: event.target.value as PlanSettings["goal"] })} className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white">
            {Object.entries(learningGoals).map(([value,label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-300">Time for this session
          <select aria-label="Study session length" value={settings.minutes} disabled={!ready || !loaded} onChange={event => changeSettings({ ...settings, minutes: Number(event.target.value) as PlanSettings["minutes"] })} className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-3 text-sm text-white">
            {[10,20,30].map(minutes => <option key={minutes} value={minutes}>{minutes} minutes</option>)}
          </select>
        </label>
      </div>

      {!plan ? <p role="status" className="mt-6 text-sm text-slate-400">Preparing your learning plan…</p> : <>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400" aria-live="polite">
          <span>{plan.evidenceCount} recorded {plan.evidenceCount === 1 ? "attempt" : "attempts"} in {practiceTracks[track]}</span>
          <span>{plan.dueCount ? `${plan.dueCount} ${plan.dueCount === 1 ? "question" : "questions"} to review` : "No reviews due right now"}</span>
          {reviewDate && <span>Next suggested review: {reviewDate}</span>}
        </div>
        <ol className={`mt-5 grid gap-3 ${plan.tasks.length === 3 ? "md:grid-cols-3" : plan.tasks.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
          {plan.tasks.map((task,index) => <li key={`${task.kind}-${task.questionId}-${index}`} className="flex flex-col rounded-xl border border-white/10 bg-slate-950/50 p-4">
            <div className="flex items-center justify-between gap-3 text-xs"><span className="font-semibold text-cyan-300">STEP {index + 1}</span><span className="text-slate-500">{task.minutes} min</span></div>
            <h4 className="mt-3 text-sm font-semibold text-white">{task.title}</h4>
            <p className="mb-4 mt-2 flex-1 text-xs leading-6 text-slate-400">{task.reason}</p>
            <button type="button" aria-expanded={task.kind === "lesson" ? lessonQuestionId === task.questionId : undefined} aria-controls={task.kind === "lesson" ? "active-mini-lesson" : undefined} onClick={event => {
              if (task.kind !== "lesson") return onPractice(task.questionId);
              if (lessonQuestionId === task.questionId) return closeLesson();
              lessonTrigger.current = event.currentTarget;
              setLessonQuestionId(task.questionId);
              requestAnimationFrame(() => lessonHeading.current?.focus());
            }} className="w-fit rounded-lg border border-cyan-300/30 px-3 py-2 text-xs font-semibold text-cyan-200 hover:bg-cyan-300/10">
              {task.kind === "lesson" ? "Read mini lesson" : "Open practice"}
            </button>
          </li>)}
        </ol>
      </>}

      {lesson && lessonQuestion && <div className="mt-5 rounded-xl border border-cyan-300/25 bg-[#101827] p-5" id="active-mini-lesson" role="region" aria-label="Mini lesson">
        <div className="flex items-start justify-between gap-4"><h4 ref={lessonHeading} tabIndex={-1} className="text-lg font-semibold text-white">{lesson.title}</h4><button type="button" onClick={closeLesson} className="shrink-0 text-xs text-slate-400 hover:text-white">Close lesson</button></div>
        <p className="mt-2 text-sm font-medium text-cyan-200">{lesson.objective}</p>
        <p className="mt-3 text-sm leading-7 text-slate-300">{lesson.explanation}</p>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-4 text-sm leading-7 text-slate-200">{lesson.workedExample}</pre>
        <p className="mt-4 text-sm leading-7 text-slate-200"><strong className="text-cyan-200">Check your understanding:</strong> {lesson.checkpoint}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => onPractice(lessonQuestion.id)} className="rounded-lg bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950">Practice this skill →</button>
          {lesson.source && <a href={lesson.source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-300 underline underline-offset-4">Read the reference ↗</a>}
        </div>
      </div>}
      <p className="mt-5 text-xs leading-5 text-slate-500">Recommendations cover the skills in this practice bank. Review dates are suggestions, and do not create reminders. Plan settings are stored in this browser.</p>
      {saveNotice && <p role="status" className="mt-2 text-xs text-amber-200">{saveNotice}</p>}
    </div>
  );
}

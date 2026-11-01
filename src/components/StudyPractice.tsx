"use client";

import { useEffect, useState } from "react";
import StudyLearningPlan from "@/components/StudyLearningPlan";
import {
  practiceQuestions, practiceTracks, normalizePracticeAttempts, normalizePracticeTrack,
  nextPracticeQuestion, practiceSummary,
  type PracticeAttempt, type PracticeTrack,
} from "@/lib/study-practice";

const STORAGE_KEY = "eai-study-practice-v1";
const TRACK_KEY = "eai-study-practice-track-v1";

export default function StudyPractice() {
  const [track, setTrack] = useState<PracticeTrack>("math");
  const [questionId, setQuestionId] = useState(practiceQuestions[0].id);
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    let initial: PracticeAttempt[] = [];
    let available = true;
    let initialTrack: PracticeTrack = "math";
    try {
      initial = normalizePracticeAttempts(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
      initialTrack = normalizePracticeTrack(localStorage.getItem(TRACK_KEY));
    }
    catch { available = false; }
    queueMicrotask(() => {
      setAttempts(initial);
      setTrack(initialTrack);
      setQuestionId(nextPracticeQuestion(initialTrack, initial).id);
      setStorageAvailable(available);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
      localStorage.setItem(TRACK_KEY, track);
    }
    catch { queueMicrotask(() => setStorageAvailable(false)); }
  }, [attempts, hydrated, track]);

  const question = practiceQuestions.find(question => question.id === questionId)!;
  const summary = practiceSummary(track, attempts);
  const correct = selected === question.answerIndex;

  function openQuestion(id: string) {
    setQuestionId(id); setSelected(null); setHintsUsed(0); setSubmitted(false);
  }
  function changeTrack(value: PracticeTrack) {
    setTrack(value); openQuestion(nextPracticeQuestion(value, attempts).id);
  }
  function checkAnswer() {
    if (selected === null || submitted) return;
    setAttempts(previous => [...previous, {
      questionId: question.id, selectedIndex: selected, hintsUsed, submittedAt: Date.now(),
    }]);
    setSubmitted(true);
  }
  function discussWithTutor() {
    const prompt = `Subject: ${practiceTracks[question.track]}\nHelp me understand this practice question: ${question.prompt}\n${question.code || ""}\nMy answer: ${selected === null ? "Not attempted yet" : question.choices[selected]}.\n${submitted ? `The practice explanation was: ${question.explanation}` : "Give me a hint without revealing the answer."}`;
    window.dispatchEvent(new CustomEvent("eai-study-prompt", { detail: { subject: question.track, message: prompt, title: question.title, goal: question.prompt } }));
  }

  return (
    <section id="practice-lab" aria-labelledby="practice-heading" className="border-t border-white/10 bg-slate-950/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-cyan-300">LEARN BY DOING</p>
            <h2 id="practice-heading" className="text-3xl font-bold md:text-4xl">Guided Practice</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">Explore our four-track practice bank. Try a question, use a hint when needed, and review the worked explanation.</p>
          </div>
          <p className="rounded-full border border-white/10 px-4 py-2 text-xs text-slate-300">{practiceQuestions.length} questions · 4 learning tracks</p>
        </div>

        <StudyLearningPlan track={track} attempts={attempts} ready={hydrated} onTrackChange={changeTrack} onPractice={id => {
          openQuestion(id);
          window.requestAnimationFrame(() => {
            const workspace = document.getElementById("practice-question");
            workspace?.focus({ preventScroll: true });
            workspace?.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }} />

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-[#101827] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">PRACTICE PROGRESS</p>
            <p className="mt-3 text-sm font-medium text-slate-200">{practiceTracks[track]}</p>
            <dl className="mt-6 space-y-5">
              <div><dt className="text-xs text-slate-400">Questions tried in this track</dt><dd className="mt-1 text-2xl font-semibold text-white">{summary.tried}<span className="text-base text-slate-500"> / {summary.total}</span></dd></div>
              <div><dt className="text-xs text-slate-400">Correct on first attempt</dt><dd className="mt-1 text-2xl font-semibold text-cyan-300">{summary.firstTryCorrect}</dd></div>
              <div><dt className="text-xs text-slate-400">First attempt correct without hints</dt><dd className="mt-1 text-2xl font-semibold text-white">{summary.independentCorrect}</dd></div>
            </dl>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-slate-500">These are practice results, not a mastery assessment. Progress is stored in this browser.</p>
            {!storageAvailable && <p role="status" className="mt-3 text-xs text-amber-200">Browser storage is unavailable. This session’s results may not be saved.</p>}
          </aside>

          <div id="practice-question" tabIndex={-1} role="region" aria-label="Practice question workspace" className="min-w-0 scroll-mt-6 rounded-2xl border border-cyan-400/20 bg-[#101827] p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-300">{practiceTracks[track]}</p>
              <label className="flex items-center gap-2 text-xs text-slate-400">Question
                <select aria-label="Practice question" value={questionId} disabled={!hydrated} onChange={event => openQuestion(event.target.value)} className="max-w-[220px] rounded-lg border border-white/15 bg-slate-950 px-2 py-2 text-slate-200">
                  {practiceQuestions.filter(item => item.track === track).map((item, index) => <option key={item.id} value={item.id}>{index + 1}. {item.title}</option>)}
                </select>
              </label>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{question.title}</h3>
            <p className="mt-3 text-base leading-7 text-slate-200">{question.prompt}</p>
            {question.code && <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-cyan-100"><code>{question.code}</code></pre>}
            <fieldset className="mt-6 space-y-3" disabled={!hydrated || submitted}>
              <legend className="sr-only">Choose your answer</legend>
              {question.choices.map((choice, index) => (
                <label key={`${question.id}-${index}`} className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-6 transition ${selected === index ? "border-cyan-300 bg-cyan-300/10 text-white" : "border-white/10 text-slate-300 hover:border-white/30"}`}>
                  <input type="radio" name={`answer-${question.id}`} checked={selected === index} onChange={() => setSelected(index)} className="mt-1.5 shrink-0 accent-cyan-300" />
                  <span>{choice}</span>
                </label>
              ))}
            </fieldset>
            {hintsUsed > 0 && <div className="mt-5 rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-4" aria-live="polite">
              {question.hints.slice(0, hintsUsed).map((hint, index) => <p key={hint} className="mt-1 text-sm leading-6 text-cyan-100"><strong>Hint {index + 1}:</strong> {hint}</p>)}
            </div>}
            {submitted && <div role="status" className={`mt-5 rounded-xl border p-4 ${correct ? "border-emerald-300/30 bg-emerald-300/5" : "border-amber-300/30 bg-amber-300/5"}`}>
              <p className={`font-semibold ${correct ? "text-emerald-200" : "text-amber-200"}`}>{correct ? "Correct. Here’s the reasoning." : "Not quite. Let’s review the reasoning."}</p>
              {!correct && <p className="mt-2 text-sm text-white">Correct answer: {question.choices[question.answerIndex]}</p>}
              <p className="mt-2 text-sm leading-7 text-slate-200">{question.explanation}</p>
              {question.source && <a href={question.source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-cyan-300 underline underline-offset-4">Reference: {question.source.title} ↗</a>}
            </div>}
            <div className="mt-6 flex flex-wrap gap-3">
              {!submitted ? <>
                <button type="button" disabled={!hydrated || selected === null} onClick={checkAnswer} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-40">Check answer</button>
                <button type="button" disabled={!hydrated || hintsUsed === question.hints.length} onClick={() => setHintsUsed(value => value + 1)} className="rounded-xl border border-white/20 px-4 py-3 text-sm text-white disabled:opacity-40">{hintsUsed === question.hints.length ? "All hints shown" : "Show a hint"}</button>
              </> : <button type="button" onClick={() => openQuestion(nextPracticeQuestion(track, attempts, question.id).id)} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950">Next question →</button>}
              <a href="#ai-assistant" onClick={discussWithTutor} className={`rounded-xl border border-white/20 px-4 py-3 text-sm text-slate-200 ${!hydrated ? "pointer-events-none opacity-40" : ""}`}>Discuss with tutor</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

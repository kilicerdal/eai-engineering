"use client";
import { useEffect, useState } from "react";
import { problems, key, fresh, restore, type Step } from "@/lib/algebra-sample";

export default function SampleLesson() {
  const [steps, setSteps] = useState(fresh);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (!mounted) return;
      try {
        const raw = sessionStorage.getItem(key);
        if (raw) setSteps(restore(raw));
      } catch { setNotice("Your previous sample could not be opened. You can start again here."); }
      setReady(true);
    });
    return () => { mounted = false; };
  }, []);
  function save(next: Step[]) {
    setSteps(next);
    try { sessionStorage.setItem(key, JSON.stringify(next)); setNotice(""); }
    catch { setNotice("Browser saving is unavailable. Your answers are visible until you leave."); }
  }
  const completed = steps.every(step => step.checked);
  return <div className="my-6 space-y-4">
    {problems.map((problem,index) => {
      const step = steps[index];
      if (index && !steps[index-1].checked) return null;
      function update(patch: Partial<Step>) { save(steps.map((item,i)=>i === index ? {...item,...patch} : item)); }
      const correct = step.answer === problem.choices[problem.answerIndex];
      return <fieldset key={problem.id} disabled={!ready || step.checked} className="rounded-xl border border-amber-200/40 p-5">
        <legend className="px-2">{index ? "Try a fresh problem" : "First attempt"}</legend>
        <p className="mb-3 font-serif text-xl">{problem.prompt}</p>
        <div className="flex flex-wrap gap-4">{problem.choices.map(choice=><label key={choice} className="flex items-center gap-2 py-2"><input type="radio" name={problem.id} checked={step.answer===choice} onChange={()=>update({answer:choice})}/>{choice}</label>)}</div>
        {!step.checked && <div className="goal-actions"><button disabled={!step.answer} onClick={()=>update({checked:true})}>Check my choice</button><button disabled={step.hint} onClick={()=>update({hint:true})}>Show a hint</button></div>}
        {step.hint && <p>Hint · {problem.hints[0]}</p>}
        {step.checked && <p role="status"><strong>{correct ? "Correct" : "Revisit this step"} · {step.hint ? "used a hint" : "answered without a hint"}</strong><br/>{problem.explanation}</p>}
      </fieldset>;
    })}
    {completed && <div><h2 className="font-serif text-2xl">Your session</h2><p>You answered {steps.filter((s,i)=>s.answer===problems[i].choices[problems[i].answerIndex]&&!s.hint).length} of two questions correctly without a hint.</p><button className="underline" onClick={()=>save(fresh())}>Restart this sample</button></div>}
    <p role="status">{notice}</p>
  </div>;
}

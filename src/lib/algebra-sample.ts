import { practiceQuestions } from "./study-practice";

export const problems = practiceQuestions.filter(item => item.skill === "linear").slice(0, 2);
export const key = "dai-algebra-sample-v1";
export type Step = { answer: string; hint: boolean; checked: boolean };
export const fresh = ():Step[] => problems.map(() => ({answer:"",hint:false,checked:false}));

export function restore(raw: string): Step[] {
  const steps: unknown = JSON.parse(raw);
  if (!Array.isArray(steps) || steps.length !== problems.length || !steps.every((step, index) =>
    step && typeof step.hint === "boolean" && typeof step.checked === "boolean" &&
    (problems[index].choices.includes(step.answer) || (!step.checked && step.answer === "")) &&
    (!index || steps[index - 1].checked || (!step.checked && !step.hint && !step.answer))
  )) throw new Error();
  return steps;
}

export function algebraDiscussion(raw: string | null): string {
  const steps = raw ? restore(raw) : fresh();
  const records = steps.flatMap((step, index) => {
    if (!step.checked && !step.answer && !step.hint) return [];
    const problem = problems[index];
    const outcome = step.checked
      ? (step.answer === problem.choices[problem.answerIndex] ? "correct" : "needs another look")
      : "not checked";
    return [problem.prompt, `My choice: ${step.answer || "no choice yet"} (${outcome}). Hint used: ${step.hint ? "yes" : "no"}.`];
  });
  return [...records, records.length ? "Help me understand my next algebra step. Ask one guiding question." : "Guide me through balancing a linear equation, one step at a time."].join("\n");
}

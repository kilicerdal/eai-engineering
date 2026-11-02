import { validateGoalPlan, validateGoalSettings, normalizeGoalProgress, type GoalPlan, type GoalSettings } from "./study-goal";
import { validateMaterialSources } from "./study-materials";
import { normalizeMistakes } from "./study-exams";
import { normalizePracticeAttempts, practiceQuestions } from "./study-practice";

export type SavedJourney = { settings: GoalSettings; plan: GoalPlan; completed: string[]; accepted: boolean; dirty: boolean };
export function restoreJourney(value: unknown): SavedJourney | null {
  try {
    if (!value || typeof value !== "object") return null;
    const raw = value as Record<string, unknown>;
    const sources = Array.isArray(raw.sources) && raw.sources.length ? validateMaterialSources(raw.sources) : [];
    const settings = validateGoalSettings(raw.settings);
    const plan = validateGoalPlan(raw.plan, sources);
    return { settings, plan, completed: normalizeGoalProgress(raw.completed, plan), accepted: raw.accepted === true, dirty: raw.dirty === true };
  } catch { return null; }
}
export function learningEvidence(rawAttempts: unknown, rawMistakes: unknown, now: number) {
  // Each question contributes only its latest eligible attempt. Repeated clicks cannot inflate evidence.
  const attempts = normalizePracticeAttempts(rawAttempts).filter(a => a.submittedAt <= now);
  const latest = new Map<string, (typeof attempts)[number]>();
  for (const attempt of attempts) {
    const previous = latest.get(attempt.questionId);
    if (!previous || attempt.submittedAt >= previous.submittedAt) latest.set(attempt.questionId, attempt);
  }
  let independent = 0, supported = 0, revisit = 0;
  for (const attempt of latest.values()) {
    const question = practiceQuestions.find(q => q.id === attempt.questionId)!;
    if (attempt.selectedIndex !== question.answerIndex) revisit++;
    else if (attempt.hintsUsed) supported++;
    else independent++;
  }
  const mistakes = normalizeMistakes(rawMistakes).filter(m => m.createdAt <= now);
  return { attempted: latest.size, independent, supported, revisit, mistakes: mistakes.length,
    due: mistakes.filter(m => m.reviewAt <= now).sort((a,b) => a.reviewAt - b.reviewAt),
    nextReviewAt: mistakes.filter(m => m.reviewAt > now).reduce<number | null>((earliest,m) => earliest === null ? m.reviewAt : Math.min(earliest,m.reviewAt), null) };
}

import { practiceQuestions, normalizePracticeAttempts, type PracticeAttempt, type PracticeQuestion, type PracticeTrack, type PracticeSkill } from "./study-practice";
import { studyReferences } from "./study-reference";

export const learningGoals = {
  foundations: "Build foundations",
  assessment: "Prepare for an assessment",
  retention: "Keep skills fresh",
} as const;
export type PlanSettings = { goal: keyof typeof learningGoals; minutes: 10 | 20 | 30 };
export const defaultPlanSettings: PlanSettings = { goal: "foundations", minutes: 20 };

export function normalizePlanSettings(value: unknown): PlanSettings {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  return {
    goal: typeof input.goal === "string" && Object.hasOwn(learningGoals, input.goal) ? input.goal as PlanSettings["goal"] : "foundations",
    minutes: input.minutes === 10 || input.minutes === 20 || input.minutes === 30 ? input.minutes : 20,
  };
}

export type MiniLesson = {
  title: string;
  objective: string;
  explanation: string;
  workedExample: string;
  checkpoint: string;
  source?: { title: string; url: string };
};
export const miniLessons: Record<PracticeSkill, MiniLesson> = {
  linear: {
    title: "Balance a linear equation",
    objective: "Isolate the variable while preserving equality.",
    explanation: "Apply the same inverse operation to both sides. Undo addition or subtraction, then undo multiplication. Check the result by substituting it into the original equation.",
    workedExample: "8x + 7 = 79\nSubtract 7 from both sides: 8x = 72\nDivide both sides by 8: x = 9\nCheck: 8 × 9 + 7 = 79",
    checkpoint: "Why must the same operation be applied to both sides?",
  },
  forces: {
    title: "Connect force, mass, and acceleration",
    objective: "Use net external force in Newton’s second law.",
    explanation: "For a constant-mass system in classical mechanics, F_net = m × a. Combine external forces before using the relation. Use kilograms, meters per second squared, and newtons.",
    workedExample: "Mass = 10 kg; net force = 70 N\na = F_net / m = 70 / 10 = 7 m/s²\nAcceleration points in the net force’s direction.",
    checkpoint: "If the net force stays the same and the mass doubles, what happens to acceleration?", source: studyReferences.force,
  },
  plantCarbon: {
    title: "Separate energy from matter",
    objective: "Identify where a plant’s carbon atoms come from.",
    explanation: "A photosynthesizing plant incorporates carbon from atmospheric CO₂ into organic molecules. Roots supply water and mineral nutrients; light supplies energy. These inputs have different roles.",
    workedExample: "Carbon source → atmospheric CO₂\nWater supply → roots absorb water from soil\nEnergy source → light\nSunlight supplies energy, not carbon atoms.",
    checkpoint: "Why does an increase in a tree’s dry mass not imply the same decrease in soil minerals?", source: studyReferences.plants,
  },
  pythonDefaults: {
    title: "Track Python default arguments",
    objective: "Recognize when calls share a mutable default object.",
    explanation: "A default argument is evaluated when the function is defined. A list default can therefore retain mutations across calls. Use None as a sentinel and create a list inside the function when a fresh default is intended.",
    workedExample: "def f(items=None):\n    if items is None:\n        items = []\n    items.append(1)\n    return items\n\nf()  # [1]\nf()  # [1] from a new list",
    checkpoint: "What changes when the caller supplies an existing list?", source: studyReferences.python,
  },
  pythonRange: {
    title: "Trace a Python range",
    objective: "Apply the start, exclusive stop, and step correctly.",
    explanation: "Start with the first value and repeatedly add the step. Exclude the stop value. A negative step moves toward smaller values; it does not change the exclusive boundary rule.",
    workedExample: "list(range(9, 0, -3))\nStart: 9\nThen: 6, 3\nExclude 0\nResult: [9, 6, 3]",
    checkpoint: "What would list(range(0, 6, 3)) contain?", source: studyReferences.python,
  },
  cacheFlow: {
    title: "Trace cache-aside reads",
    objective: "Distinguish a hit from the miss-and-load path.",
    explanation: "In basic cache-aside, a hit returns the cached value. A miss causes the application to query the database, populate the cache, and return the retrieved value.",
    workedExample: "Read 1: key absent → query database → store value in cache → return value\nRead 2: valid key present → return cached value",
    checkpoint: "Why does a normal cache hit avoid a database query?", source: studyReferences.caching,
  },
  cacheFreshness: {
    title: "Reason about cache freshness",
    objective: "Explain why a TTL does not guarantee immediate freshness.",
    explanation: "A database write does not automatically modify an independent cached copy. Without an update or invalidation, a valid cached entry can be stale. In the basic scenario, expiration causes the next read to miss and load the database value.",
    workedExample: "t=0: cache stores 20, TTL=40 seconds\nt=5: database changes to 25; cache is untouched\nt=20: hit returns 20\nt=40: expired entry → miss → load 25\nAssume no other writes, refreshes, or evictions.",
    checkpoint: "Which action could remove the stale cached copy before its TTL expires?", source: studyReferences.caching,
  },
};

export const REVIEW_DAY_MS = 24 * 60 * 60 * 1000;
export type QuestionLearningState = {
  question: PracticeQuestion;
  status: "unseen" | "needsReview" | "supported" | "due" | "scheduled";
  nextReviewAt: number | null;
  independentSessions: number;
  lastAttempt: PracticeAttempt | null;
};

export function questionLearningState(question: PracticeQuestion, attempts: PracticeAttempt[], now: number): QuestionLearningState {
  const history = normalizePracticeAttempts(attempts).filter(attempt => attempt.questionId === question.id && attempt.submittedAt <= now).sort((a,b) => a.submittedAt - b.submittedAt);
  const lastAttempt = history.at(-1) || null;
  if (!lastAttempt) return { question, status: "unseen", nextReviewAt: null, independentSessions: 0, lastAttempt };
  let independentSessions = 0;
  let qualifyingAt = 0;
  for (const attempt of history) {
    if (attempt.selectedIndex !== question.answerIndex || attempt.hintsUsed > 0) {
      independentSessions = 0; qualifyingAt = 0;
    } else if (!qualifyingAt || attempt.submittedAt - qualifyingAt >= REVIEW_DAY_MS) {
      independentSessions += 1; qualifyingAt = attempt.submittedAt;
    }
  }
  if (lastAttempt.selectedIndex !== question.answerIndex) return { question, status: "needsReview", nextReviewAt: now, independentSessions, lastAttempt };
  const intervals = [1, 3, 7, 14];
  const interval = intervals[Math.min(Math.max(independentSessions - 1, 0), intervals.length - 1)];
  const nextReviewAt = (qualifyingAt || lastAttempt.submittedAt) + interval * REVIEW_DAY_MS;
  const status = nextReviewAt <= now ? "due" : lastAttempt.hintsUsed > 0 ? "supported" : "scheduled";
  return { question, status, nextReviewAt, independentSessions, lastAttempt };
}

export type LearningTask = { kind: "lesson" | "practice"; questionId: string; title: string; minutes: number; reason: string };
export type LearningPlan = { tasks: LearningTask[]; states: QuestionLearningState[]; dueCount: number; nextReviewAt: number | null; evidenceCount: number };

export function buildLearningPlan(track: PracticeTrack, attempts: PracticeAttempt[], settings: PlanSettings, now: number): LearningPlan {
  const priorities: Record<PlanSettings["goal"], Record<QuestionLearningState["status"], number>> = {
    foundations: { needsReview: 0, supported: 1, unseen: 2, due: 3, scheduled: 4 },
    assessment: { needsReview: 0, due: 1, supported: 2, unseen: 3, scheduled: 4 },
    retention: { due: 0, needsReview: 1, supported: 2, unseen: 3, scheduled: 4 },
  };
  const states = practiceQuestions.filter(question => question.track === track).map(question => questionLearningState(question, attempts, now));
  const ranked = [...states].sort((a,b) => priorities[settings.goal][a.status] - priorities[settings.goal][b.status] || (a.nextReviewAt || 0) - (b.nextReviewAt || 0));
  const primary = ranked[0];
  const secondary = ranked.find(state => state.question.id !== primary.question.id)!;
  const reasons: Record<QuestionLearningState["status"], string> = {
    unseen: "You have not attempted this question yet.",
    needsReview: "Your latest attempt was incorrect; revisit the explanation before trying again.",
    supported: "You used a hint last time. Try recalling the method independently.",
    due: "This question is due for a suggested spaced review.",
    scheduled: "Optional reinforcement while you wait for your next suggested review.",
  };
  const timings = settings.minutes === 10 ? [3,7] : settings.minutes === 20 ? [4,10,6] : [5,10,10,5];
  const tasks: LearningTask[] = [
    { kind: "lesson", questionId: primary.question.id, title: miniLessons[primary.question.skill].title, minutes: timings[0], reason: reasons[primary.status] },
    { kind: "practice", questionId: primary.question.id, title: primary.status === "needsReview" || primary.status === "due" ? "Revisit the problem" : "Put the idea into practice", minutes: timings[1], reason: "Attempt the question before revealing its worked explanation." },
  ];
  if (timings.length > 2) tasks.push({ kind: "practice", questionId: secondary.question.id, title: secondary.lastAttempt ? "Review another problem" : "Try another example", minutes: timings[2], reason: reasons[secondary.status] });
  if (timings.length > 3) tasks.push({ kind: "lesson", questionId: secondary.question.id, title: "Recall and explain the key idea", minutes: timings[3], reason: "Use the lesson’s checkpoint to explain the method in your own words." });
  const futureDates = states.flatMap(state => state.nextReviewAt && state.nextReviewAt > now ? [state.nextReviewAt] : []);
  const trackIds = new Set(states.map(state => state.question.id));
  return {
    tasks, states,
    dueCount: states.filter(state => state.status === "due" || state.status === "needsReview").length,
    nextReviewAt: futureDates.length ? Math.min(...futureDates) : null,
    evidenceCount: normalizePracticeAttempts(attempts).filter(attempt => trackIds.has(attempt.questionId) && attempt.submittedAt <= now).length,
  };
}

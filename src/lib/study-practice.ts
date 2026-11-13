import { studyReferences } from "./study-reference";

export const practiceTracks = {
  math: "Mathematics",
  science: "Science",
  coding: "Python reasoning",
  engineering: "Engineering foundations",
} as const;
export type PracticeTrack = keyof typeof practiceTracks;
export function normalizePracticeTrack(value: unknown): PracticeTrack {
  return typeof value === "string" && Object.hasOwn(practiceTracks, value) ? value as PracticeTrack : "math";
}
export type PracticeSkill = "linear" | "forces" | "plantCarbon" | "pythonDefaults" | "pythonRange" | "cacheFlow" | "cacheFreshness";
export type PracticeQuestion = {
  id: string;
  track: PracticeTrack;
  skill: PracticeSkill;
  title: string;
  prompt: string;
  code?: string;
  choices: string[];
  answerIndex: number;
  hints: string[];
  explanation: string;
  source?: { title: string; url: string };
};

function linearQuestion(a: number, b: number, solution: number, index: number): PracticeQuestion {
  const rhs = a * solution + b;
  const choices = [solution, solution + 1, solution - 1, solution + 3];
  const rotation = index % choices.length;
  const rotated = [...choices.slice(rotation), ...choices.slice(0, rotation)];
  const inverse = b < 0 ? `Add ${-b}` : `Subtract ${b}`;
  return {
    id: `linear-v1-${index}`, track: "math", skill: "linear", title: "Keep the equation balanced",
    prompt: `Solve for x: ${a}x ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${rhs}.`,
    choices: rotated.map(String), answerIndex: rotated.indexOf(solution),
    hints: ["Undo the addition or subtraction first. Apply the same operation to both sides.", `${inverse} on both sides, then divide both sides by ${a}.`],
    explanation: `${inverse} on both sides to get ${a}x = ${a * solution}. Divide both sides by ${a}: x = ${solution}. Check: ${a} × ${solution} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${rhs}.`,
  };
}

function forceQuestion(mass: number, acceleration: number, index: number): PracticeQuestion {
  const force = mass * acceleration;
  const choices = [String(force + 1), String(force), String(force + 3), String(force + 5)];
  return {
    id: `force-example-v1-${index}`, track: "science", skill: "forces", title: "Apply Newton’s second law",
    prompt: `A ${mass} kg object accelerates at ${acceleration} m/s². What is the magnitude of the net external force?`,
    choices: choices.map(value => `${value} N`), answerIndex: 1,
    hints: ["Identify the mass and the acceleration before selecting a formula.", "Use the net force relation F_net = m × a."],
    explanation: `F_net = ${mass} kg × ${acceleration} m/s² = ${force} N. The net force combines all external forces.`, source: studyReferences.force,
  };
}

function rangeQuestion(start: number, stop: number, step: number, values: number[], index: number): PracticeQuestion {
  const show = (items: number[]) => `[${items.join(", ")}]`;
  const choices = [show([...values, stop]), show(values), show(values.slice(1)), show([start])];
  return {
    id: `range-example-v1-${index}`, track: "coding", skill: "pythonRange", title: "Trace a Python range",
    prompt: `What is list(range(${start}, ${stop}, ${step})) in Python?`, choices, answerIndex: 1,
    hints: ["Start at the first argument and repeatedly add the step, including its sign.", "The stop value is excluded, even when the step is negative."],
    explanation: `Beginning at ${start}, move in steps of ${step} and stop before ${stop}: ${show(values)}.`, source: studyReferences.python,
  };
}

function cacheTimeline(readAt: number, ttl: number, index: number): PracticeQuestion {
  const expired = readAt >= ttl;
  return {
    id: `cache-timeline-v1-${index}`, track: "engineering", skill: "cacheFreshness", title: "Follow the cache timeline",
    prompt: `At t=0 a cache stores price=10 with a ${ttl}-second TTL. At t=5 the database changes to price=12. No further writes, refreshes, invalidations, or evictions occur. In basic cache-aside, what does a read at t=${readAt} return?`,
    choices: ["10", "12", "The sum, 22", "No value, without checking the database"], answerIndex: expired ? 1 : 0,
    hints: ["Compare the read time with the cached entry’s expiration time.", expired ? "An expired entry causes a miss and the usual database load path." : "The entry is still valid according to its TTL, although the database value has changed."],
    explanation: expired ? `The entry expires at t=${ttl}. The read at t=${readAt} misses, loads 12 from the database, and repopulates the cache.` : `At t=${readAt}, the TTL has not expired. The hit returns 10 because the database write did not change the cached copy.`, source: studyReferences.caching,
  };
}

export const practiceQuestions: PracticeQuestion[] = [
  linearQuestion(3, 4, 5, 0), linearQuestion(2, -7, 6, 1),
  linearQuestion(4, 9, 3, 2), linearQuestion(5, -3, 4, 3),
  {
    id: "net-force-v1", track: "science", skill: "forces", title: "Use the net force",
    prompt: "A 4 kg cart accelerates at 3 m/s². What is the magnitude of the net force?",
    choices: ["7 N", "12 N", "0.75 N", "1.33 N"], answerIndex: 1,
    hints: ["Newton’s second law connects net force, mass, and acceleration.", "Use F_net = m × a."],
    explanation: "F_net = 4 kg × 3 m/s² = 12 N. This is the net external force, after all forces are combined.", source: studyReferences.force,
  },
  {
    id: "acceleration-v1", track: "science", skill: "forces", title: "Find the acceleration",
    prompt: "A 6 kg object experiences a 24 N net force. What is its acceleration?",
    choices: ["144 m/s²", "18 m/s²", "4 m/s²", "0.25 m/s²"], answerIndex: 2,
    hints: ["Start with F_net = m × a.", "Divide the net force by the mass."],
    explanation: "a = F_net / m = 24 N / 6 kg = 4 m/s², in the direction of the net force.", source: studyReferences.force,
  },
  {
    id: "plant-carbon-v1", track: "science", skill: "plantCarbon", title: "Trace the carbon",
    prompt: "What is the main source of the carbon incorporated into a growing tree’s organic molecules?",
    choices: ["Mineral particles in soil", "Atmospheric carbon dioxide", "Sunlight", "Atmospheric nitrogen"], answerIndex: 1,
    hints: ["Think about which input to photosynthesis contains carbon.", "Light supplies energy; it does not supply carbon atoms."],
    explanation: "Plants incorporate carbon from atmospheric CO₂ into organic molecules. Roots supply water and mineral nutrients; sunlight supplies energy.", source: studyReferences.plants,
  },
  {
    id: "python-default-v1", track: "coding", skill: "pythonDefaults", title: "Follow the shared object",
    prompt: "For this function, what does the second consecutive call to f() return? Assume no other calls or mutations.",
    code: "def f(items=[]):\n    items.append(1)\n    return items\n\nf()\nf()",
    choices: ["[1]", "[]", "[1, 1]", "None"], answerIndex: 2,
    hints: ["When is a default argument evaluated?", "Both calls use the same default list."],
    explanation: "The default list is created once at definition time. Each call appends to that same list, so the second call returns [1, 1].", source: studyReferences.python,
  },
  {
    id: "python-sentinel-v1", track: "coding", skill: "pythonDefaults", title: "Create independent defaults",
    prompt: "Which change gives each call with no argument its own new list?",
    choices: ["Use items=[] again", "Use items=None and create [] inside when items is None", "Use one module-level list", "Clear the shared list after every return"], answerIndex: 1,
    hints: ["The default expression should not create a shared mutable container.", "Use a sentinel to detect that no list was supplied."],
    explanation: "Use items=None, then if items is None: items = []. A new list is created during each call that omits the argument.", source: studyReferences.python,
  },
  {
    id: "python-range-v1", track: "coding", skill: "pythonRange", title: "Read the range boundary",
    prompt: "What is list(range(2, 8, 2)) in Python?",
    choices: ["[2, 4, 6, 8]", "[2, 4, 6]", "[0, 2, 4, 6]", "[2, 3, 4, 5, 6, 7]"], answerIndex: 1,
    hints: ["The third argument is the step size.", "The stop value is excluded."],
    explanation: "Start at 2, increase by 2, and stop before 8: [2, 4, 6].", source: studyReferences.python,
  },
  {
    id: "cache-hit-v1", track: "engineering", skill: "cacheFlow", title: "Trace a cache hit",
    prompt: "In a basic cache-aside read, a valid cached value is found. What happens next?",
    choices: ["Always query the database", "Delete the cached entry", "Return the cached value", "Write the cached value to the database"], answerIndex: 2,
    hints: ["A hit means the requested data is already available in the cache.", "Separate a cache hit from the miss-and-load path."],
    explanation: "A basic cache-aside hit returns the cached value. A miss instead queries the database and populates the cache.", source: studyReferences.caching,
  },
  {
    id: "cache-stale-v1", track: "engineering", skill: "cacheFreshness", title: "Spot the stale read",
    prompt: "A cache stores price=10 with an unexpired TTL. The database changes to price=12, and nothing updates or invalidates the cache. What can the next cache hit return?",
    choices: ["Only 12", "10", "Both values merged", "A guaranteed cache miss"], answerIndex: 1,
    hints: ["A database write and a cache update are separate actions in this design.", "The unexpired cached copy still contains the earlier value."],
    explanation: "The hit can return 10. A TTL does not update the cached value immediately after an independent database write.", source: studyReferences.caching,
  },
  {
    id: "cache-miss-v1", track: "engineering", skill: "cacheFlow", title: "Trace a cache miss",
    prompt: "In basic cache-aside, the requested value is absent from the cache but present in the database. Which is the usual read path?",
    choices: ["Return no result without checking the database", "Query the database, populate the cache, return the value", "Populate the cache with an arbitrary default", "Wait for the TTL before reading the database"], answerIndex: 1,
    hints: ["The cache is a fast copy, not the only data store in this pattern.", "A miss triggers the load path from the primary data store."],
    explanation: "The application queries the database, stores the retrieved value in the cache, and returns it to the caller.", source: studyReferences.caching,
  },
  linearQuestion(2, 3, -2, 4), linearQuestion(3, -6, 0, 5),
  linearQuestion(4, -5, 7, 6), linearQuestion(5, 8, -3, 7),
  linearQuestion(6, -9, 2, 8), linearQuestion(7, 5, 4, 9),
  forceQuestion(2, 5, 0), forceQuestion(3, 4, 1), forceQuestion(5, 2, 2),
  forceQuestion(7, 3, 3), forceQuestion(8, 4, 4), forceQuestion(9, 2, 5),
  rangeQuestion(1, 7, 2, [1, 3, 5], 0),
  rangeQuestion(5, -1, -2, [5, 3, 1], 1),
  rangeQuestion(0, 6, 3, [0, 3], 2),
  cacheTimeline(20, 30, 0), cacheTimeline(40, 30, 1), cacheTimeline(30, 30, 2),
];

export type PracticeAttempt = {
  questionId: string;
  selectedIndex: number;
  hintsUsed: number;
  submittedAt: number;
};

export function normalizePracticeAttempts(value: unknown): PracticeAttempt[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is PracticeAttempt => {
    if (!item || typeof item !== "object") return false;
    const question = practiceQuestions.find(question => question.id === item.questionId);
    return !!question && Number.isInteger(item.selectedIndex) && item.selectedIndex >= 0 && item.selectedIndex < question.choices.length &&
      Number.isInteger(item.hintsUsed) && item.hintsUsed >= 0 && item.hintsUsed <= question.hints.length &&
      Number.isFinite(item.submittedAt) && item.submittedAt > 0;
  }).map(({ questionId, selectedIndex, hintsUsed, submittedAt }) => ({ questionId, selectedIndex, hintsUsed, submittedAt }));
}

function attemptsInTimeOrder(attempts: PracticeAttempt[]) {
  return [...attempts].sort((a,b) => a.submittedAt - b.submittedAt);
}

export function practiceSummary(track: PracticeTrack, attempts: PracticeAttempt[]) {
  const history = attemptsInTimeOrder(attempts);
  const questions = practiceQuestions.filter(question => question.track === track);
  const firstAttempts = questions.map(question => ({ question, attempt: history.find(attempt => attempt.questionId === question.id) })).filter(item => item.attempt);
  return {
    total: questions.length,
    tried: firstAttempts.length,
    firstTryCorrect: firstAttempts.filter(({ question, attempt }) => attempt!.selectedIndex === question.answerIndex).length,
    independentCorrect: firstAttempts.filter(({ question, attempt }) => attempt!.selectedIndex === question.answerIndex && attempt!.hintsUsed === 0).length,
  };
}

export function nextPracticeQuestion(track: PracticeTrack, attempts: PracticeAttempt[], currentId?: string): PracticeQuestion {
  const history = attemptsInTimeOrder(attempts);
  const questions = practiceQuestions.filter(question => question.track === track);
  const unseen = questions.find(question => question.id !== currentId && !history.some(attempt => attempt.questionId === question.id));
  const missed = questions.find(question => question.id !== currentId && history.findLast(attempt => attempt.questionId === question.id)?.selectedIndex !== question.answerIndex);
  return unseen || missed || questions[(questions.findIndex(question => question.id === currentId) + 1) % questions.length];
}

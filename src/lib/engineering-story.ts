export type StoryObservation = {
  status: number;
  total?: number;
  count?: number;
  state?: string;
  sameOrder?: boolean;
  stock?: Record<string, number>;
};
export type StoryStep = {
  index: number;
  action: string;
  actor: string;
  expected: StoryObservation;
  actual: StoryObservation;
  passed: boolean;
};
export type StoryRun = {
  passed: boolean;
  hash: string;
  fault: string | null;
  steps: StoryStep[];
};
export type OrderOnceCapture = {
  runId: string;
  generatedAt: string;
  origin: string;
  journey: string;
  requirement: string;
  hash: string;
  modelCalls: number;
  backend: string;
  outcome: string;
  control: StoryRun;
  fault: StoryRun;
  divergence: StoryStep;
  reproduction: string;
  source: { repository: string; commit: string; tag: string };
};
export type Prediction = "reuse" | "duplicate" | "reject";
export const predictionOptions: {
  id: Prediction;
  title: string;
  detail: string;
}[] = [
  {
    id: "reuse",
    title: "Return the existing order",
    detail: "A retry confirms the original result.",
  },
  {
    id: "duplicate",
    title: "Create another order",
    detail: "Each request becomes a new purchase.",
  },
  {
    id: "reject",
    title: "Reject every repeat",
    detail: "A repeated key always produces an error.",
  },
];
export function predictionFeedback(prediction: Prediction) {
  return prediction === "reuse"
    ? "Your prediction matches the healthy control. The retry returned the original order."
    : "The healthy control returned the existing order. Compare it with the injected defect below.";
}
export function summarizeOrderOnce(capture: OrderOnceCapture) {
  if (
    capture.journey !== "J-REPLAY" ||
    capture.backend !== "postgres" ||
    capture.origin !== "authored-offline-example" ||
    capture.modelCalls !== 0 ||
    !capture.control.passed ||
    capture.control.hash !== capture.hash ||
    capture.fault.hash !== capture.hash ||
    !/^[a-f0-9]{40}$/.test(capture.source.commit)
  )
    throw new Error("Unsupported or invalid recorded evidence");
  const control = capture.control.steps.filter(
    (step) => step.action === "checkout",
  );
  const faulty = capture.fault.steps.filter(
    (step) => step.action === "checkout",
  );
  const history = capture.control.steps.find(
    (step) => step.action === "inspect" && step.expected.count === 1,
  );
  if (
    control.length !== 2 ||
    faulty.length !== 2 ||
    history?.actual.count !== 1 ||
    !capture.divergence ||
    capture.fault.passed ||
    capture.outcome !== "fault-detected"
  )
    throw new Error("Incomplete checkout replay evidence");
  return {
    control,
    faulty,
    orderCount: history.actual.count,
    divergence: capture.divergence,
    totalCents: control[0].actual.total ?? 0,
  };
}
export function storySources(commit: string) {
  if (!/^[a-f0-9]{40}$/.test(commit))
    throw new Error("Source links require a full commit");
  const base = `https://github.com/kilicerdal/playwright-ai-automation/blob/${commit}`;
  return [
    {
      label: "Checkout implementation",
      description:
        "Customer lock, key lookup, payload comparison and transactional writes.",
      href: `${base}/src/db/store.ts#L239`,
    },
    {
      label: "Database uniqueness constraint",
      description: "The stored key is unique within its customer.",
      href: `${base}/migrations/001_commerce.sql`,
    },
    {
      label: "Concurrent replay regression",
      description:
        "Three same-key submissions produce one creation and two replays.",
      href: `${base}/tests/postgres/commerce.spec.ts#L128`,
    },
    {
      label: "Injected defect and independent oracle",
      description:
        "Inspect the curated duplicate-replay fault and the separate reference model.",
      href: `${base}/src/journeys/runner.ts#L71`,
    },
    {
      label: "Replay assertion",
      description:
        "The faulty retry returns 201 with a different order identity; the expected result is 200 with the original identity.",
      href: `${base}/tests/postgres/showcase-session.spec.ts#L18`,
    },
    {
      label: "Independent reference model",
      description:
        "Expected outcomes are derived without importing application or store code.",
      href: `${base}/src/journeys/model.ts`,
    },
  ];
}

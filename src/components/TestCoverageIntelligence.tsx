"use client";

type CoverageStatus = "Detected" | "Potential gap" | "Not specified";

type CoverageItem = {
  title: string;
  status: CoverageStatus;
  description: string;
};

function matches(text: string, patterns: RegExp[]) {
  return patterns.some((pattern) => pattern.test(text));
}

export default function TestCoverageIntelligence({
  code,
  requirements,
  framework,
}: {
  code: string;
  requirements: string;
  framework: string;
}) {
  if (!code.trim()) return null;

  const categories = [
    {
      title: "Positive Scenarios",
      requirementPatterns: [
        /\b(valid|successful|success|happy path|correct|authorized)\b/i,
        /\b(200|201|202|204)\b/,
      ],
      codePatterns: [
        /\b(valid|successful|success|happy.path|correct)\b/i,
        /\b(200|201|202|204)\b/,
        /\btoBeVisible\s*\(/,
      ],
      description:
        "Tests that expected operations succeed with valid inputs.",
    },
    {
      title: "Negative Scenarios",
      requirementPatterns: [
        /\b(invalid|incorrect|failure|fail|error|reject|unauthorized)\b/i,
        /\b(400|401|403|404|422)\b/,
      ],
      codePatterns: [
        /\b(invalid|incorrect|failure|fail|error|reject|unauthorized)\b/i,
        /\b(400|401|403|404|422)\b/,
      ],
      description:
        "Tests that invalid operations produce expected failures.",
    },
    {
      title: "Boundary Scenarios",
      requirementPatterns: [
        /\b(empty|blank|minimum|maximum|limit|boundary|edge case)\b/i,
        /\b(zero|null|missing|required|length)\b/i,
      ],
      codePatterns: [
        /\b(empty|blank|minimum|maximum|limit|boundary|edge.case)\b/i,
        /\b(null|undefined|missing|required|length)\b/i,
        /["']{2}/,
      ],
      description:
        "Tests for empty inputs, limits, and edge conditions.",
    },
    {
      title: "Security Scenarios",
      requirementPatterns: [
        /\b(authentication|authorization|unauthorized|forbidden)\b/i,
        /\b(permission|access denied|token|credential|security)\b/i,
        /\b(401|403)\b/,
      ],
      codePatterns: [
        /\b(authentication|authorization|unauthorized|forbidden)\b/i,
        /\b(permission|access.denied|token|credential|security)\b/i,
        /\b(401|403)\b/,
      ],
      description:
        "Tests for authentication, authorization, and access restrictions.",
    },
    {
      title: "Result Assertions",
      requirementPatterns: [
        /\b(verify|assert|expect|should|must|return|display)\b/i,
      ],
      codePatterns: [
        framework === "playwright"
          ? /\bexpect\s*\(/
          : /\bassert\b/,
      ],
      description:
        "Checks that generated tests contain recognizable assertions.",
    },
  ];

  const items: CoverageItem[] = categories.map((category) => {
    const requested =
      category.title === "Result Assertions" ||
      matches(requirements, category.requirementPatterns);

    const detected = matches(code, category.codePatterns);

    const status: CoverageStatus = !requested
      ? "Not specified"
      : detected
        ? "Detected"
        : "Potential gap";

    return {
      title: category.title,
      status,
      description: category.description,
    };
  });

  const requested = items.filter(
    (item) => item.status !== "Not specified"
  );

  const detected = requested.filter(
    (item) => item.status === "Detected"
  ).length;

  return (
    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#101e32] p-5">
      <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
        eAI 6.2 / COVERAGE INTELLIGENCE
      </p>

      <h4 className="mt-3 text-lg font-bold text-white">
        Test Coverage Overview
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        Heuristic comparison of requirements and generated code.
        Detection does not prove a scenario is correctly tested.
      </p>

      <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 p-4">
        <p className="text-2xl font-bold text-white">
          {detected} / {requested.length}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Requested coverage categories with matching code signals
        </p>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-cyan-400"
            style={{
              width: requested.length
                ? `${(detected / requested.length) * 100}%`
                : "0%",
            }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-slate-950 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">
                {item.title}
              </p>

              <span
                className={
                  item.status === "Detected"
                    ? "text-xs font-semibold text-emerald-300"
                    : item.status === "Potential gap"
                      ? "text-xs font-semibold text-amber-300"
                      : "text-xs font-semibold text-slate-400"
                }
              >
                {item.status}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-amber-300">
        This is not measured test coverage. Generated tests have not
        been executed, and no application coverage data was collected.
      </p>
    </div>
  );
}

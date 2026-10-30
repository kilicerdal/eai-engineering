"use client";

type Classification = {
  category: string;
  severity: "High" | "Medium" | "Low";
  explanation: string;
  recommendation: string;
  pattern: RegExp;
};

const rules: Classification[] = [
  {
    category: "Authentication Failure",
    severity: "High",
    explanation: "The log indicates an authentication or authorization problem.",
    recommendation: "Verify authentication configuration, permissions, and credential availability without exposing secrets.",
    pattern: /\b(401|403|unauthorized|forbidden|authentication failed|access denied)\b/i,
  },
  {
    category: "Dependency Failure",
    severity: "High",
    explanation: "A required dependency or module may be missing.",
    recommendation: "Verify dependency installation, package versions, and build configuration.",
    pattern: /(module not found|cannot find module|no module named|modulenotfounderror|dependency resolution failed)/i,
  },
  {
    category: "Configuration Failure",
    severity: "High",
    explanation: "The log suggests a missing or invalid configuration.",
    recommendation: "Check environment variables, configuration files, and CI environment settings.",
    pattern: /(missing environment variable|configuration error|invalid configuration|env.*not defined|environment variable.*missing)/i,
  },
  {
    category: "API Failure",
    severity: "High",
    explanation: "An HTTP request or backend service appears to have failed.",
    recommendation: "Inspect response status, request details, service health, and relevant server logs.",
    pattern: /\b(500|502|503|504|internal server error|bad gateway|service unavailable|gateway timeout)\b/i,
  },
  {
    category: "Assertion Failure",
    severity: "Medium",
    explanation: "An assertion did not match the observed application behavior.",
    recommendation: "Compare expected and actual values, verify test data, and inspect application state.",
    pattern: /(assertionerror|assertion failed|expected.*received|expected.*actual|toequal|tobevisible)/i,
  },
  {
    category: "Element Interaction Failure",
    severity: "Medium",
    explanation: "The test may be unable to interact with a UI element.",
    recommendation: "Verify locator stability, element visibility, enabled state, and application readiness.",
    pattern: /(element is not enabled|element is not visible|locator.*not found|element not interactable|strict mode violation)/i,
  },
  {
    category: "Timeout Failure",
    severity: "Medium",
    explanation: "An operation exceeded its allowed execution time.",
    recommendation: "Investigate application readiness, network delays, locator conditions, and CI resource availability.",
    pattern: /(timeouterror|timeout.*exceeded|timed out|test timeout)/i,
  },
];

export default function FailureClassifier({ log }: { log: string }) {
  if (log.trim().length < 15) return null;

  const matches = rules.filter((rule) => rule.pattern.test(log));

  const selected = matches.length > 0
    ? matches
    : [{
        category: "Unclassified Failure",
        severity: "Low" as const,
        explanation: "No known failure signature was identified.",
        recommendation: "Use AI analysis to investigate the available evidence.",
      }];

  return (
    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#0b1729] p-5">
      <div className="mb-5">
        <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
          eAI 5.2 / FAILURE INTELLIGENCE
        </p>

        <h4 className="mt-2 text-lg font-bold text-white">
          Preliminary Failure Classification
        </h4>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Rule-based classification using recognizable log patterns.
          Matches are diagnostic indicators, not verified root causes.
        </p>
      </div>

      <div className="space-y-3">
        {selected.map((item) => (
          <div
            key={item.category}
            className="rounded-xl border border-white/10 bg-slate-950 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h5 className="font-semibold text-white">{item.category}</h5>

              <span className={
                item.severity === "High"
                  ? "text-xs font-semibold text-red-300"
                  : item.severity === "Medium"
                    ? "text-xs font-semibold text-amber-300"
                    : "text-xs font-semibold text-slate-400"
              }>
                {item.severity} Priority
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              {item.explanation}
            </p>

            <p className="mt-3 text-sm text-cyan-200">
              Suggested investigation: {item.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

type Finding = {
  title: string;
  detail: string;
  severity: "Warning" | "Suggestion";
};

export default function TestQualityValidator({
  code,
  framework,
}: {
  code: string;
  framework: string;
}) {
  if (!code.trim()) return null;

  const findings: Finding[] = [];

  const add = (
    title: string,
    detail: string,
    severity: Finding["severity"] = "Suggestion"
  ) => findings.push({ title, detail, severity });

  const isPython = framework === "pytest" || framework === "api";

  // These are heuristic signals, not parser-verified findings.
  const hasAssertion = isPython
    ? /\bassert\b/.test(code)
    : /\bexpect\s*\(/.test(code);

  if (!hasAssertion) {
    add(
      "No recognizable assertion",
      "Review whether the generated tests verify expected behavior.",
      "Warning"
    );
  }

  const possibleSecret =
    /\b(?:password|secret|api[_-]?key|token)\s*[:=]\s*["'][^"'\n]{8,}["']/i;

  if (possibleSecret.test(code)) {
    add(
      "Possible hardcoded credential",
      "Review string assignments that may contain credentials. Prefer environment variables or test fixtures.",
      "Warning"
    );
  }

  if (
    /(?:waitForTimeout\s*\(|time\.sleep\s*\(|sleep\s*\()/i.test(code)
  ) {
    add(
      "Fixed wait detected",
      "Prefer condition-based waiting or framework-native assertions where possible.",
      "Warning"
    );
  }

  if (framework === "playwright") {
    if (/\b(?:page\.)?\$\$?\s*\(|locator\s*\(\s*["'](?:#[\w-]+|\.[\w-]+)/.test(code)) {
      add(
        "Potentially brittle selector",
        "Consider role-based, label-based, or stable test-ID locators."
      );
    }

    if (!/\btest\s*\(/.test(code)) {
      add(
        "Playwright test declaration not recognized",
        "Check whether the output uses the Playwright test runner."
      );
    }
  }

  if (isPython && !/\bdef\s+test_\w+\s*\(/.test(code)) {
    add(
      "pytest test function not recognized",
      "Confirm that pytest can discover the generated tests."
    );
  }

  if (framework === "api") {
    if (!/\bstatus_code\b/.test(code)) {
      add(
        "HTTP status validation not recognized",
        "Verify that API tests check expected response status codes.",
        "Warning"
      );
    }

    if (!/\brequests\b/.test(code)) {
      add(
        "HTTP client not recognized",
        "Confirm that an appropriate HTTP client is configured."
      );
    }
  }

  if (
    !/\b(invalid|unauthorized|forbidden|error|negative|404|401|403|reject)\b/i.test(code)
  ) {
    add(
      "Negative coverage not obvious",
      "Consider invalid inputs, authorization failures, and error responses where applicable."
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#101e32] p-5">
      <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
        eAI 6.1 / STATIC QUALITY REVIEW
      </p>

      <h4 className="mt-3 text-lg font-bold text-white">
        Test Quality Validation
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        Preliminary pattern-based checks. No code was executed,
        compiled, or parser-validated.
      </p>

      {findings.length === 0 ? (
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
          <p className="font-semibold text-emerald-300">
            No issues detected by the available checks
          </p>
          <p className="mt-2 text-xs text-slate-400">
            This does not establish that the code is correct, secure,
            executable, or complete.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="text-sm font-semibold text-slate-300">
            {findings.length} potential improvement
            {findings.length === 1 ? "" : "s"} identified
          </p>

          {findings.map((finding) => (
            <div
              key={finding.title}
              className="rounded-xl border border-white/10 bg-slate-950 p-4"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <p className="text-sm font-semibold text-white">
                  {finding.title}
                </p>

                <span
                  className={
                    finding.severity === "Warning"
                      ? "text-xs font-semibold text-amber-300"
                      : "text-xs font-semibold text-cyan-300"
                  }
                >
                  {finding.severity}
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                {finding.detail}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

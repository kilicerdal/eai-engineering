"use client";

type Finding = {
  severity: "Warning" | "Info";
  message: string;
};

export default function TestCodeValidator({
  code,
  framework,
  title,
}: {
  code: string;
  framework: string;
  title: string;
}) {
  if (!code.trim()) return null;

  const findings: Finding[] = [];

  function add(
    message: string,
    severity: Finding["severity"] = "Warning"
  ) {
    findings.push({ message, severity });
  }

  if (framework === "playwright") {
    if (!/\btest(?:\.\w+)?\s*\(/.test(code)) {
      add("No recognizable Playwright test declaration.");
    }

    if (!/\bexpect\s*\(/.test(code)) {
      add("No recognizable Playwright assertion.");
    }

    code.split("\n").forEach((line, index) => {
      const trimmed = line.trim();

      if (
        /\bexpect\s*\(/.test(trimmed) &&
        /\.(?:toHaveURL|toBeVisible|toHaveText|toContainText|toHaveValue|toBeEnabled|toBeDisabled|toHaveCount|toHaveAttribute)\s*\(/.test(trimmed) &&
        !/\bawait\b/.test(trimmed) &&
        !trimmed.startsWith("//")
      ) {
        add(
          `Line ${index + 1}: Playwright assertion may be missing await.`
        );
      }
    });
  }

  if (framework === "pytest" || framework === "api") {
    if (!/\bdef\s+test_\w+\s*\(/.test(code)) {
      add("No recognizable pytest test function.");
    }

    if (!/\bassert\b/.test(code)) {
      add("No recognizable Python assertion.");
    }
  }

  if (/https?:\/\/(?:example\.com|localhost)(?:[:/]|$)/i.test(code)) {
    add(
      "Example or localhost URL detected. Verify the target environment.",
      "Info"
    );
  }

  if (
    /\b(?:password|secret|token|api_key)\s*[:=]\s*["'][^"'\n]{4,}["']/i.test(code)
  ) {
    add(
      "Possible hardcoded credential. Use environment variables or fixtures."
    );
  }

  if (/waitForTimeout\s*\(|time\.sleep\s*\(|sleep\s*\(/.test(code)) {
    add("Fixed wait detected. Prefer condition-based waiting.");
  }

  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-slate-950 p-4">
      <p className="text-sm font-semibold text-white">
        {title} — Static Validation
      </p>

      {findings.length === 0 ? (
        <p className="mt-3 text-xs text-emerald-300">
          No issues detected by the available checks.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          {findings.map((finding, index) => (
            <p
              key={`${finding.message}-${index}`}
              className={
                finding.severity === "Warning"
                  ? "text-xs leading-5 text-amber-300"
                  : "text-xs leading-5 text-cyan-300"
              }
            >
              {finding.severity}: {finding.message}
            </p>
          ))}
        </div>
      )}

      <p className="mt-3 text-xs leading-5 text-slate-500">
        Heuristic checks only. Code has not been parsed,
        compiled, executed, or security-audited.
      </p>
    </div>
  );
}

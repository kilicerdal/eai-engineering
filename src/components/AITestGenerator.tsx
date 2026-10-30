"use client";

import { useState } from "react";
import TestQualityValidator from "./TestQualityValidator";
import TestCoverageIntelligence from "./TestCoverageIntelligence";
import TestCodeComparison from "./TestCodeComparison";

const frameworks = [
  { value: "playwright", label: "Playwright + TypeScript" },
  { value: "pytest", label: "pytest + Python" },
  { value: "api", label: "REST API + Python" },
];

const example =
  "Test a login page where valid credentials allow access to the dashboard, " +
  "invalid credentials display an error, and empty fields prevent submission.";

export default function AITestGenerator() {
  const [framework, setFramework] = useState("playwright");
  const [requirements, setRequirements] = useState("");
  const [code, setCode] = useState("");
  const [improvedCode, setImprovedCode] = useState("");
  const [improving, setImproving] = useState(false);
  const [improveError, setImproveError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function improveTests() {
    if (improving || loading || !code.trim()) return;

    setImproving(true);
    setImproveError("");
    setImprovedCode("");

    try {
      const response = await fetch("/api/improve-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements, code, framework }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to improve tests.");
      }

      if (typeof data.code !== "string" || !data.code.trim()) {
        throw new Error("AI returned no improved code.");
      }

      setImprovedCode(data.code);
    } catch (error) {
      setImproveError(
        error instanceof Error ? error.message : "Improvement failed."
      );
    } finally {
      setImproving(false);
    }
  }

  async function generate() {
    if (loading || requirements.trim().length < 20) return;

    setLoading(true);
    setError("");
    setCode("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ framework, requirements }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate tests.");
      }

      if (typeof data.code !== "string" || !data.code.trim()) {
        throw new Error("The AI service returned no test code.");
      }

      setCode(data.code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Test generation failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai-test-generator"
      className="scroll-mt-24 px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">
            eAI 6.0 / TEST ENGINEERING
          </p>

          <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
            AI Test Generation Engine
          </h2>

          <p className="mt-4 max-w-3xl text-slate-400">
            Transform natural-language requirements into automation test
            code using AI. Generate a starting point for UI and API testing,
            then review and adapt it to your application.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 md:p-8">
            <h3 className="text-xl font-bold text-white">
              Test Requirements
            </h3>

            <label
              htmlFor="generator-framework"
              className="mt-6 block text-sm font-semibold text-slate-300"
            >
              Automation Framework
            </label>

            <select
              id="generator-framework"
              value={framework}
              onChange={(event) => {
                setFramework(event.target.value);
                setCode("");
              }}
              className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-sm text-white"
            >
              {frameworks.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <label
              htmlFor="generator-requirements"
              className="mt-6 block text-sm font-semibold text-slate-300"
            >
              Describe Your Test Scenario
            </label>

            <textarea
              id="generator-requirements"
              value={requirements}
              onChange={(event) => setRequirements(event.target.value)}
              maxLength={3000}
              rows={11}
              placeholder="Describe the application behavior, expected results, and test scenarios..."
              className="mt-2 w-full rounded-xl border border-white/20 bg-slate-950 p-4 text-sm leading-6 text-slate-200"
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs">
              <span className="text-amber-300">
                Do not enter credentials, secrets, or confidential information.
              </span>
              <span className="text-slate-400">
                {requirements.length}/3000
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void generate()}
                disabled={loading || requirements.trim().length < 20}
                className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Test Code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setRequirements(example);
                  setCode("");
                  setError("");
                }}
                className="rounded-xl border border-white/20 px-5 py-3 text-sm text-white hover:bg-white/5"
              >
                Load Example
              </button>
            </div>

            {error && (
              <p role="alert" className="mt-5 text-sm text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b1425] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-bold text-white">
                Generated Automation Code
              </h3>

              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-300">
                NOT EXECUTED
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-400">
              AI-generated code is a draft. Verify selectors, fixtures,
              endpoints, assertions, dependencies, and security before use.
            </p>

            <div className="mt-6 min-h-[340px] overflow-auto rounded-xl border border-white/10 bg-slate-950 p-5">
              {code ? (
                <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-6 text-cyan-100">
                  <code>{code}</code>
                </pre>
              ) : (
                <p className="text-sm text-slate-500">
                  Generated test code will appear here.
                </p>
              )}
            </div>

            {code && (
              <TestQualityValidator code={code} framework={framework} />
            )}

            {code && (
              <TestCoverageIntelligence
                code={code}
                requirements={requirements}
                framework={framework}
              />
            )}
            {code && (
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#101e32] p-5">
                <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
                  eAI 6.3 / TEST IMPROVEMENT
                </p>

                <h4 className="mt-3 text-lg font-bold text-white">
                  AI Test Improvement Engine
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Generate a revised version with stronger assertions,
                  reliability, and relevant coverage improvements.
                  Original code is preserved.
                </p>

                <button
                  type="button"
                  onClick={improveTests}
                  disabled={improving || loading}
                  className="mt-4 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
                >
                  {improving ? "Improving Tests..." : "Improve Generated Tests"}
                </button>

                {improveError && (
                  <p className="mt-3 text-sm text-red-300">{improveError}</p>
                )}

                {improvedCode && (
                  <div className="mt-5">
                  </div>
                )}
              </div>
            )}


            {code && (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(code);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2000);
                  } catch {
                    setError("Unable to copy generated code.");
                  }
                }}
                className="mt-5 rounded-xl border border-cyan-400/30 px-5 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
              >
                {copied ? "Copied!" : "Copy Generated Code"}
              </button>
            )}
          </div>
        </div>

        {code && improvedCode && (
          <div className="mt-10">
            <TestCodeComparison
              originalCode={code}
              improvedCode={improvedCode}
              framework={framework}
            />
          </div>
        )}
      </div>
    </section>
  );
}

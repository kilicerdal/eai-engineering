"use client";

import { useEffect, useRef, useState } from "react";

type Run = {
  id: number;
  repository: string;
  name: string;
  conclusion: string | null;
  url: string;
};

const DEMO_LOG = `Repository: playwright-ai-automation
Workflow: Playwright Tests
Job: browser-tests
Step: Run Playwright tests

TimeoutError: locator.click: Timeout 30000ms exceeded.
Locator: getByRole('button', { name: 'Sign in' })
Element: <button disabled>Sign in</button>
Actionability check: element is not enabled`;

export default function GitHubFailureInvestigator({runs,refreshing,unavailable}: {
  runs:Run[]; refreshing:boolean; unavailable:boolean;
}) {
  const failures = runs.filter(run => run.conclusion === "failure");
  const request = useRef<AbortController | null>(null);
  const [loadedRun, setLoadedRun] = useState("");
  const [selected, setSelected] = useState("");
  const [evidence, setEvidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => () => request.current?.abort(), []);

  async function loadFailure(override?: string) {
    const target = override || selected;
    if (!target) return;

    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const [repo, runId] = target.split(":");

      const response = await fetch(
        `/api/github-failure?repo=${encodeURIComponent(repo)}&runId=${encodeURIComponent(runId)}`, {signal:controller.signal}
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to load failure.");
      }

      if (controller.signal.aborted) return;
      if (typeof data.evidence !== "string" || !data.evidence.trim() || typeof data.source !== "string" || !data.source.trim()) {
        throw new Error("GitHub returned incomplete evidence. Try loading the workflow again.");
      }
      setLoadedRun(`${repo} · Run ${runId}`);
      setEvidence(data.evidence);
      setSource(data.source);
      setNote(typeof data.note === "string" ? data.note : "");
    } catch (err) {
      if (!controller.signal.aborted) setError(err instanceof Error ? err.message : "Unable to load failure.");
    } finally {
      if (request.current === controller) {request.current = null; setLoading(false);}
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
        eAI 4.8
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        GitHub CI Failure Investigator
      </h3>

      <p className="mt-3 text-sm text-slate-400">
        Investigate real GitHub Actions failures using authenticated
        CI logs, extracted errors, or verified workflow metadata.
      </p>

      <select
        aria-label="Failed GitHub workflow"
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className="mt-5 w-full rounded-lg border border-white/20 bg-slate-950 p-3 text-sm"
      >
        <option value="">Select a failed GitHub workflow</option>
        {failures.map((run) => (
          <option
            key={`${run.repository}-${run.id}`}
            value={`${run.repository}:${run.id}`}
          >
            {run.repository} — {run.name}
          </option>
        ))}
      </select>

      {(!failures.length || unavailable || refreshing) && (
        <p className="mt-3 text-xs text-slate-400">
          {refreshing ? "Checking for failed workflows…" : unavailable ? "Current workflow status is unavailable. Use Refresh CI Data to try again." : "No failed workflows found in the latest GitHub Actions results."}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!failures.some(run => `${run.repository}:${run.id}` === selected) || loading}
          onClick={() => void loadFailure()}
          className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load GitHub Failure"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() =>
            void loadFailure(
              "ai-healthcare-quality-platform:38679023819"
            )
          }
          className="rounded-lg border border-emerald-400/40 px-5 py-3 text-sm text-emerald-300 disabled:opacity-50"
        >
          Investigate Real Historical Failure
        </button>

        <button
          type="button"
          onClick={() => {
            request.current?.abort();
            request.current = null;
            setLoading(false);
            setCopied(false);
            setLoadedRun("");
            setEvidence(DEMO_LOG);
            setSource("SIMULATED DEMO");
            setNote("Demonstration only. Not retrieved from GitHub.");
            setError("");
          }}
          className="rounded-lg border border-white/20 px-5 py-3 text-sm"
        >
          Load Demo Failure
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>
      )}

      {evidence && (
        <div className="mt-6 rounded-xl border border-white/10 bg-slate-950 p-5">
          <span className="text-xs font-semibold text-amber-300">
            {source}{loadedRun && ` · ${loadedRun}` }
          </span>

          {note && (
            <p className="mt-2 text-xs text-slate-400">{note}</p>
          )}

          <pre className="mt-4 whitespace-pre-wrap break-words text-sm text-slate-200">
            {evidence}
          </pre>

          <p className="mt-4 text-xs text-slate-400">
            Click Analyze with AI to transfer this evidence to the analyzer.
            Review the extracted information before requesting AI analysis.
          </p>

          <button
            type="button"
            onClick={() => {
              const framework =
                evidence.toLowerCase().includes("playwright")
                  ? "Playwright"
                  : evidence.toLowerCase().includes("pytest")
                    ? "pytest"
                    : "CI/CD";

              const header = loadedRun ? `${source} · ${loadedRun}` : source;
              const text = `${header}\n\n${evidence}`;
              const gap = "\n[Middle omitted to fit the analyzer]\n";
              const log = text.length <= 3000 ? text :
                text.slice(0,1500) + gap + text.slice(-(1500-gap.length));
              window.dispatchEvent(
                new CustomEvent("erdal-ai-load-failure", {
                  detail: {
                    framework,
                    log,
                  },
                })
              );

              document.getElementById("failure-log")?.focus({preventScroll:true});
              document
                .getElementById("ai-failure-analyzer")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className="mt-3 mr-3 rounded-lg bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Analyze with AI →
          </button>

          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(evidence);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              } catch {
                setError("Unable to copy evidence.");
              }
            }}
            className={`mt-3 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              copied
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                : "border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy Evidence"}
          </button>
        </div>
      )}
    </div>
  );
}

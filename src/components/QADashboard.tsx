import RepositoryHealth from "./RepositoryHealth";
import CIHealthOverview from "./CIHealthOverview";
import GitHubFailureInvestigator from "@/components/GitHubFailureInvestigator";

import { useEffect, useState, useCallback, useRef } from "react";
import FailureAnalyzer from "@/components/FailureAnalyzer";


type CIRun = {
  id: number;
  repository: string;
  name: string;
  status: string;
  conclusion: string | null;
  createdAt: string;
  url: string;
};

export default function QADashboard() {
  const [ciRuns, setCiRuns] = useState<CIRun[]>([]);
  const [ciLoading, setCiLoading] = useState(true);
  const [ciError, setCiError] = useState("");
  const [ciUpdatedAt, setCiUpdatedAt] = useState<Date | null>(null);
  const ciRequestInFlight = useRef(false);

  const loadCI = useCallback(async (signal?: AbortSignal) => {
    if (ciRequestInFlight.current) return;

    ciRequestInFlight.current = true;
    setCiLoading(true);
    setCiError("");

    try {
      const response = await fetch("/api/ci-status", { signal });

      if (!response.ok) {
        throw new Error("GitHub API unavailable");
      }

      const data = await response.json();

      if (!data.live || !Array.isArray(data.runs)) {
        throw new Error("Invalid GitHub API response");
      }

      if (signal?.aborted) return;

      setCiRuns(data.runs);
      setCiUpdatedAt(new Date());
    } catch {
      if (!signal?.aborted) {
        setCiError(
          "Unable to refresh GitHub Actions data. Previously loaded results may be outdated."
        );
      }
    } finally {
      ciRequestInFlight.current = false;

      if (!signal?.aborted) {
        setCiLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timer = window.setTimeout(() => {
      void loadCI(controller.signal);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [loadCI]);


  return (
    <section id="qa-dashboard" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan-400">
            eAI 4.4
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Quality Engineering Command Center
          </h2>
          <p className="mt-4 max-w-3xl text-slate-400">
            Real GitHub Actions monitoring, repository intelligence, and
            AI-powered quality engineering tools.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cyan-400/20 bg-slate-900 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Live CI Data Controls
            </p>

            <p className="mt-1 text-xs text-slate-400" aria-live="polite">
              {ciLoading
                ? "Refreshing GitHub Actions data..."
                : ciUpdatedAt
                  ? `Last checked: ${ciUpdatedAt.toLocaleString("en-US")}`
                  : "No successful data retrieval yet."}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              GitHub Actions results may be cached for up to five minutes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadCI()}
            disabled={ciLoading}
            className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ciLoading ? "Refreshing..." : "↻ Refresh CI Data"}
          </button>
        </div>

        <CIHealthOverview
          runs={ciRuns}
          loading={ciLoading}
          error={ciError}
        />

        <RepositoryHealth
          runs={ciRuns}
          loading={ciLoading}
          error={ciError}
        />

        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-bold">Live GitHub Actions</h3>
            <span className="rounded-lg bg-emerald-400/10 px-3 py-2 text-xs text-emerald-300">
              REAL CI/CD DATA
            </span>
          </div>

          <p className="mb-5 text-sm text-slate-400">
            Recent workflow executions retrieved from public GitHub repositories.
            Workflow success does not necessarily represent individual test counts.
            Results are cached for up to five minutes.
          </p>

          {ciLoading && (
            <p className="text-slate-400">Loading GitHub Actions results...</p>
          )}

          {ciError && (
            <p role="alert" className="text-red-400">{ciError}</p>
          )}

          {!ciLoading && !ciError && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-white/10 text-slate-400">
                  <tr>
                    <th className="py-3">Repository</th>
                    <th className="py-3">Workflow</th>
                    <th className="py-3">Result</th>
                    <th className="py-3">Executed</th>
                    <th className="py-3">Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {ciRuns.map((run) => (
                    <tr key={`${run.repository}-${run.id}`} className="border-b border-white/5">
                      <td className="py-4">{run.repository}</td>
                      <td className="py-4">{run.name}</td>
                      <td className="py-4">
                        <span className={
                          run.conclusion === "success"
                            ? "text-emerald-400"
                            : run.conclusion === "failure"
                              ? "text-red-400"
                              : "text-amber-400"
                        }>
                          {run.status !== "completed"
                            ? run.status
                            : run.conclusion ?? "Unknown"}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400">
                        {new Date(run.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>
                      <td className="py-4">
                        <a
                          href={run.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline"
                        >
                          View Run ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {ciRuns.length === 0 && (
                <p className="py-5 text-slate-400">No workflow runs found.</p>
              )}
            </div>
          )}
        </div>

        <GitHubFailureInvestigator />\n      <FailureAnalyzer />

      </div>
    </section>
  );
}

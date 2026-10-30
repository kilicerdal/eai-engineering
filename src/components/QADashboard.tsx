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

type Status = "Passed" | "Failed" | "Skipped";
type Category = "UI" | "API" | "Integration" | "Regression";

type TestResult = {
  id: string;
  name: string;
  category: Category;
  status: Status;
  duration: number;
};

const results: TestResult[] = [
  { id: "QA-001", name: "User login validation", category: "UI", status: "Passed", duration: 1.2 },
  { id: "QA-002", name: "Invalid password handling", category: "UI", status: "Passed", duration: 0.9 },
  { id: "QA-003", name: "Claims API response validation", category: "API", status: "Passed", duration: 0.4 },
  { id: "QA-004", name: "Claims API authorization", category: "API", status: "Failed", duration: 2.1 },
  { id: "QA-005", name: "Database synchronization", category: "Integration", status: "Passed", duration: 3.2 },
  { id: "QA-006", name: "S3 event processing", category: "Integration", status: "Passed", duration: 1.8 },
  { id: "QA-007", name: "End-to-end policy workflow", category: "Regression", status: "Failed", duration: 5.4 },
  { id: "QA-008", name: "Cross-browser validation", category: "Regression", status: "Skipped", duration: 0 },
  { id: "QA-009", name: "API schema validation", category: "API", status: "Passed", duration: 0.3 },
  { id: "QA-010", name: "Session expiration", category: "UI", status: "Passed", duration: 1.1 },
];

const categories: Category[] = ["UI", "API", "Integration", "Regression"];

export default function QADashboard() {
  const [filter, setFilter] = useState("All");
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


  const passed = results.filter((test) => test.status === "Passed").length;
  const failed = results.filter((test) => test.status === "Failed").length;
  const skipped = results.filter((test) => test.status === "Skipped").length;
  const executed = passed + failed;
  const passRate = Math.round((passed / executed) * 100);

  const filtered = results.filter(
    (test) => filter === "All" || test.status === filter || test.category === filter
  );

  return (
    <section id="qa-dashboard" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-cyan-400">
            eAI 4.4
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            QA Automation Dashboard
          </h2>
          <p className="mt-4 max-w-3xl text-slate-400">
            Interactive quality engineering dashboard demonstrating automated
            test reporting, execution analytics, and CI/CD observability.
          </p>
          <p className="mt-3 inline-block rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-semibold text-amber-300">
            DEMO DATA — Simulated test results, not live executions
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Tests", results.length, "text-white"],
            ["Passed", passed, "text-emerald-400"],
            ["Failed", failed, "text-red-400"],
            ["Pass Rate", `${passRate}%`, "text-cyan-400"],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">{label}</p>
              <p className={`mt-3 text-4xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="mb-5 text-lg font-bold">Execution Summary</h3>
            <div className="flex h-4 overflow-hidden rounded-full bg-slate-800">
              <div className="bg-emerald-400" style={{ width: `${passed * 10}%` }} />
              <div className="bg-red-400" style={{ width: `${failed * 10}%` }} />
              <div className="bg-amber-400" style={{ width: `${skipped * 10}%` }} />
            </div>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-300">
              <span>🟢 Passed: {passed}</span>
              <span>🔴 Failed: {failed}</span>
              <span>🟡 Skipped: {skipped}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="mb-5 text-lg font-bold">Test Coverage by Category</h3>
            <div className="space-y-4">
              {categories.map((category) => {
                const count = results.filter((test) => test.category === category).length;
                return (
                  <div key={category}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="text-slate-400">{count} tests</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{ width: `${(count / results.length) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Distribution of demo tests by category; not code coverage.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Test Execution Results</h3>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter test results"
              className="rounded-lg border border-white/20 bg-slate-950 px-4 py-2 text-sm"
            >
              {["All", "Passed", "Failed", "Skipped", ...categories].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-white/10 text-slate-400">
                <tr>
                  <th className="py-3">Test ID</th>
                  <th className="py-3">Test Case</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((test) => (
                  <tr key={test.id} className="border-b border-white/5">
                    <td className="py-4 text-cyan-300">{test.id}</td>
                    <td className="py-4">{test.name}</td>
                    <td className="py-4 text-slate-400">{test.category}</td>
                    <td className="py-4">
                      <span className={
                        test.status === "Passed" ? "text-emerald-400" :
                        test.status === "Failed" ? "text-red-400" : "text-amber-400"
                      }>
                        {test.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">{test.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="py-8 text-center text-slate-400">No matching tests.</p>
            )}
          </div>
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

"use client";

import { useEffect, useState } from "react";

type TestMetrics = {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
  duration: number;
  updatedAt: string;
  runUrl: string;
  repositories: {
    repository: string;
    total: number;
    passed: number;
    failed: number;
    runUrl: string;
  }[];
};

export default function AutomatedTestIntelligence() {
  const [metrics, setMetrics] = useState<TestMetrics | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch("/api/test-metrics", {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Metrics unavailable");

        const data = await response.json();

        if (!controller.signal.aborted) {
          setMetrics(data);
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) setError(true);
      }
    }

    void load();

    return () => controller.abort();
  }, []);

  const cards = metrics
    ? [
        ["Executed", metrics.total],
        ["Passed", metrics.passed],
        ["Failed", metrics.failed],
        ["Skipped", metrics.skipped],
        ["Pass Rate", metrics.total
          ? `${Math.round((metrics.passed / metrics.total) * 100)}%`
          : "N/A"],
      ]
    : [];

  return (
    <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-slate-900 p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold">
          Automated Test Intelligence
        </h3>
        <span className="rounded-lg bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300">
          VERIFIED CI TEST RESULTS
        </span>
      </div>

      {!metrics && !error && (
        <p className="text-slate-400">Loading verified test results...</p>
      )}

      {error && (
        <p className="text-amber-300">
          Test metrics are not available yet. Existing CI monitoring remains active.
        </p>
      )}

      {metrics && (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {cards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-slate-950 p-4"
              >
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Source: Verified GitHub Actions · Playwright + Healthcare
            · Duration: {(metrics.duration / 1000).toFixed(1)}s
            · Flaky: {metrics.flaky}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Latest published test report:{" "}
            {new Date(metrics.updatedAt).toLocaleString("en-US")}
          </p>

          <div className="mt-5 space-y-3">
            {metrics.repositories.map((repo) => (
              <div
                key={repo.repository}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950 p-4"
              >
                <div>
                  <p className="font-semibold text-white">{repo.repository}</p>
                  <p className="text-sm text-slate-400">
                    {repo.passed}/{repo.total} passed · {repo.failed} failed
                  </p>
                </div>
                <a
                  href={repo.runUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-400 hover:underline"
                >
                  View CI Evidence ↗
                </a>
              </div>
            ))}
          </div>

          <a
            href={metrics.runUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-cyan-400 hover:underline"
          >
            View GitHub Actions Evidence ↗
          </a>
        </>
      )}
    </div>
  );
}

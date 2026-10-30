"use client";

type CIRun = {
  id: number;
  repository: string;
  name: string;
  status: string;
  conclusion: string | null;
  createdAt: string;
  url: string;
};

type Props = {
  runs: CIRun[];
  loading: boolean;
  error: string;
};

export default function CIHealthOverview({
  runs,
  loading,
  error,
}: Props) {
  const successful = runs.filter(
    (run) => run.status === "completed" && run.conclusion === "success"
  ).length;

  const failed = runs.filter(
    (run) => run.status === "completed" && run.conclusion === "failure"
  ).length;

  const completed = successful + failed;

  const successRate =
    completed > 0
      ? Math.round((successful / completed) * 100)
      : null;

  const metrics = [
    {
      label: "WORKFLOW RUNS",
      value: runs.length,
      color: "text-cyan-300",
      detail: "Recent GitHub Actions runs",
    },
    {
      label: "SUCCESSFUL",
      value: successful,
      color: "text-emerald-300",
      detail: "Completed successfully",
    },
    {
      label: "FAILED",
      value: failed,
      color: "text-red-300",
      detail: "Completed with failure",
    },
    {
      label: "SUCCESS RATE",
      value: successRate === null ? "N/A" : `${successRate}%`,
      color: "text-blue-300",
      detail: "Successful / (successful + failed)",
    },
  ];

  return (
    <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#101e32] to-[#0d1423] p-6 md:p-8">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
            eAI 5.0 / CI INTELLIGENCE
          </p>
          <h3 className="mt-3 text-2xl font-bold text-white">
            GitHub CI Health Overview
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Metrics calculated from recent GitHub Actions workflow results.
            These are workflow metrics, not individual test results.
          </p>
        </div>

        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300">
          GITHUB ACTIONS DATA
        </span>
      </div>

      {loading ? (
        <p role="status" className="text-sm text-slate-400">
          Loading CI health metrics...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-400">
          CI metrics unavailable: {error}
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-[#080f1e]/80 p-6 transition hover:border-cyan-400/30"
              >
                <p className="text-xs font-semibold tracking-widest text-slate-400">
                  {metric.label}
                </p>
                <p className={`mt-5 text-4xl font-black ${metric.color}`}>
                  {metric.value}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>

          {successRate !== null && (
            <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">
                  Completed Workflow Success Rate
                </span>
                <span className="text-sm font-bold text-cyan-300">
                  {successRate}%
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-slate-800"
                role="progressbar"
                aria-label="Completed workflow success rate"
                aria-valuenow={successRate}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
                  style={{ width: `${successRate}%` }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Based on {completed} completed workflow runs with success
                or failure conclusions. Other conclusions are excluded.
              </p>
            </div>
          )}

          {runs.length === 0 && (
            <p className="mt-5 text-sm text-slate-400">
              No recent workflow runs were returned.
            </p>
          )}
        </>
      )}
    </div>
  );
}

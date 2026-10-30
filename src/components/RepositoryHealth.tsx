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

export default function RepositoryHealth({
  runs,
  loading,
  error,
}: Props) {
  const repositories = [
    "ai-healthcare-quality-platform",
    "playwright-ai-automation",
  ];

  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-[#101827] p-6 md:p-8">
      <div className="mb-7">
        <p className="text-xs font-bold tracking-[0.2em] text-cyan-400">
          eAI 5.1 / REPOSITORY INTELLIGENCE
        </p>

        <h3 className="mt-3 text-2xl font-bold text-white">
          Repository Health
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Repository-specific workflow results from recent GitHub Actions
          executions. Success rates are based on completed runs with
          success or failure conclusions.
        </p>
      </div>

      {loading ? (
        <p role="status" className="text-sm text-slate-400">
          Loading repository health...
        </p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-400">
          Repository health unavailable: {error}
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {repositories.map((repository) => {
            const repoRuns = runs
              .filter((run) => run.repository === repository)
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );

            const successful = repoRuns.filter(
              (run) =>
                run.status === "completed" &&
                run.conclusion === "success"
            ).length;

            const failed = repoRuns.filter(
              (run) =>
                run.status === "completed" &&
                run.conclusion === "failure"
            ).length;

            const completed = successful + failed;

            const successRate =
              completed > 0
                ? Math.round((successful / completed) * 100)
                : null;

            const latest = repoRuns[0];

            const latestStatus = latest
              ? latest.status !== "completed"
                ? "In Progress"
                : latest.conclusion === "success"
                  ? "Success"
                  : latest.conclusion === "failure"
                    ? "Failure"
                    : latest.conclusion ?? "Unknown"
              : "No Data";

            const statusColor =
              latestStatus === "Success"
                ? "text-emerald-300"
                : latestStatus === "Failure"
                  ? "text-red-300"
                  : "text-amber-300";

            return (
              <article
                key={repository}
                className="rounded-2xl border border-white/10 bg-[#080f1e] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-cyan-400">
                      GITHUB REPOSITORY
                    </p>

                    <h4 className="mt-2 break-words text-lg font-bold text-white">
                      {repository}
                    </h4>
                  </div>

                  <span
                    className={`rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold ${statusColor}`}
                  >
                    {latestStatus}
                  </span>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Recent Runs</p>
                    <p className="mt-2 text-2xl font-black text-white">
                      {repoRuns.length}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Failures</p>
                    <p className="mt-2 text-2xl font-black text-red-300">
                      {failed}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Success Rate</p>
                    <p className="mt-2 text-2xl font-black text-cyan-300">
                      {successRate === null ? "N/A" : `${successRate}%`}
                    </p>
                  </div>
                </div>

                {successRate !== null && (
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                      style={{ width: `${successRate}%` }}
                    />
                  </div>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                  <span className="text-xs text-slate-500">
                    {latest
                      ? `Latest workflow: ${new Date(
                          latest.createdAt
                        ).toLocaleDateString("en-US")}`
                      : "No recent workflows returned"}
                  </span>

                  <a
                    href={`https://github.com/kilicerdal/${repository}/actions`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                  >
                    View Workflows ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

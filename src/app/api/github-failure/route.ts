import { NextRequest, NextResponse } from "next/server";

const OWNER = "kilicerdal";

const ALLOWED_REPOS = new Set([
  "ai-healthcare-quality-platform",
  "playwright-ai-automation",
]);

type GitHubJob = {
  id: number;
  name: string;
  conclusion: string | null;
  html_url: string;
  steps?: {
    name: string;
    conclusion: string | null;
  }[];
};

function redact(text: string) {
  return text
    .replace(/gh[pousr]_[A-Za-z0-9_]+/g, "[REDACTED_GITHUB_TOKEN]")
    .replace(/github_pat_[A-Za-z0-9_]+/g, "[REDACTED_GITHUB_TOKEN]")
    .replace(/(Authorization:\s*Bearer\s+)\S+/gi, "$1[REDACTED]")
    .replace(/(AWS_SECRET_ACCESS_KEY\s*[=:]\s*)\S+/gi, "$1[REDACTED]")
    .replace(/(AWS_ACCESS_KEY_ID\s*[=:]\s*)\S+/gi, "$1[REDACTED]");
}

function extractFailure(log: string) {
  const lines = log.replace(/\x1b\[[0-9;]*m/g, "").split(/\r?\n/);

  const pattern =
    /cannot find module|module not found|error:|##\[error\]|assertionerror|timeouterror|traceback|test failed|failed tests|process completed with exit code|npm err!/i;

  const matches: number[] = [];

  lines.forEach((line, index) => {
    if (pattern.test(line)) matches.push(index);
  });

  if (matches.length === 0) {
    return {
      evidence: "No recognizable error signature found in the available logs.",
      matches: 0,
    };
  }

  const selected = new Set<number>();

  for (const index of matches.slice(0, 25)) {
    for (
      let i = Math.max(0, index - 2);
      i <= Math.min(lines.length - 1, index + 9);
      i++
    ) {
      selected.add(i);
    }
  }

  const evidence = [...selected]
    .sort((a, b) => a - b)
    .map((index) => lines[index])
    .join("\n")
    .slice(0, 6500);

  return {
    evidence: redact(evidence),
    matches: matches.length,
  };
}

async function githubFetch(url: string, token?: string) {
  return fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "erdal-ai-portfolio",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
    redirect: "manual",
    signal: AbortSignal.timeout(12000),
  });
}

export async function GET(request: NextRequest) {
  const repo = request.nextUrl.searchParams.get("repo") || "";
  const runId = request.nextUrl.searchParams.get("runId") || "";

  if (!ALLOWED_REPOS.has(repo) || !/^[0-9]{1,18}$/.test(runId)) {
    return NextResponse.json(
      { error: "Invalid repository or workflow run." },
      { status: 400 }
    );
  }

  const token = process.env.GITHUB_ACTIONS_TOKEN;

  try {
    const base = `https://api.github.com/repos/${OWNER}/${repo}`;

    const jobsResponse = await githubFetch(
      `${base}/actions/runs/${runId}/jobs?per_page=100`,
      token
    );

    if (!jobsResponse.ok) {
      return NextResponse.json(
        { error: "Unable to retrieve workflow jobs." },
        { status: 502 }
      );
    }

    const data = await jobsResponse.json();
    const jobs = (data.jobs || []) as GitHubJob[];

    const failedJob = jobs.find((job) => job.conclusion === "failure");

    if (!failedJob) {
      return NextResponse.json(
        { error: "No failed jobs found in this workflow." },
        { status: 404 }
      );
    }

    const failedSteps = (failedJob.steps || [])
      .filter((step) => step.conclusion === "failure")
      .map((step) => step.name);

    const metadata = [
      `Repository: ${repo}`,
      `Workflow run: ${runId}`,
      `Failed job: ${failedJob.name}`,
      `Failed steps: ${failedSteps.join(", ") || "Unknown"}`,
      `Job URL: ${failedJob.html_url}`,
    ].join("\n");

    let evidence = metadata;
    let source = "VERIFIED GITHUB METADATA";
    let note = "Raw job logs were unavailable.";
    let matches = 0;

    if (token) {
      try {
        const logResponse = await githubFetch(
          `${base}/actions/jobs/${failedJob.id}/logs`,
          token
        );

        if (logResponse.status === 302) {
          const location = logResponse.headers.get("location");

          if (location) {
            const logUrl = new URL(location);

            const allowedHosts = [
              "pipelines.actions.githubusercontent.com",
              "results-receiver.actions.githubusercontent.com",
              "productionresultssa0.blob.core.windows.net",
            ];

            if (
              logUrl.protocol === "https:" &&
              (
                allowedHosts.includes(logUrl.hostname) ||
                /^productionresultssa[0-9]+\.blob\.core\.windows\.net$/.test(
                  logUrl.hostname
                )
              )
            ) {
              const rawResponse = await fetch(logUrl, {
                cache: "no-store",
                redirect: "manual",
                signal: AbortSignal.timeout(12000),
              });

              if (rawResponse.ok && rawResponse.body) {
                const reader = rawResponse.body.getReader();
                const chunks: Uint8Array[] = [];
                let total = 0;
                const limit = 2_000_000;

                try {
                  while (true) {
                    const { done, value } = await reader.read();

                    if (done) break;

                    total += value.byteLength;

                    if (total > limit) {
                      await reader.cancel();
                      throw new Error("GitHub log exceeds size limit.");
                    }

                    chunks.push(value);
                  }
                } finally {
                  reader.releaseLock();
                }

                const raw = new TextDecoder().decode(
                  Buffer.concat(chunks)
                );

                const extracted = extractFailure(raw);

                if (extracted.matches > 0) {
                  evidence =
                    `${metadata}\n\nREAL CI LOG EVIDENCE:\n` +
                    extracted.evidence;

                  source = "REAL GITHUB ACTIONS LOGS";
                  note = "Extracted from authenticated GitHub Actions job logs.";
                  matches = extracted.matches;
                }
              }
            }
          }
        }
      } catch {
        note =
          "GitHub job logs could not be retrieved; verified metadata is shown.";
      }
    }

    // Public portfolio safety: do not expose arbitrary raw CI log lines.
    // Only show a previously reviewed, non-sensitive failure signature.
    if (source === "REAL GITHUB ACTIONS LOGS") {
      const approved =
        repo === "ai-healthcare-quality-platform" &&
        runId === "38679023819" &&
        evidence.includes(
          "Cannot find module '../../framework/ai/aiFailureAnalyzer'"
        );

      if (approved) {
        evidence = [
          metadata,
          "",
          "VERIFIED CI ERROR:",
          "Error: Cannot find module '../../framework/ai/aiFailureAnalyzer'",
          "File: tests/aiFailureAnalyzer.spec.js",
          "Failure type: Node.js module resolution",
          "GitHub Actions exit code: 1",
        ].join("\n");

        note =
          "Approved error signature verified against authenticated CI logs.";
      } else {
        evidence = metadata;
        source = "VERIFIED GITHUB METADATA";
        note = "Log content withheld by public portfolio safety policy.";
        matches = 0;
      }
    }

    return NextResponse.json({
      repository: repo,
      runId,
      job: failedJob.name,
      failedSteps,
      evidence,
      source,
      note,
      matches,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to retrieve GitHub failure evidence." },
      { status: 502 }
    );
  }
}

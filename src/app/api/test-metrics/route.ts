import { NextResponse } from "next/server";

const repositories = [
  "playwright-ai-automation",
  "ai-healthcare-quality-platform",
];

type TestMetrics = {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  flaky: number;
  duration: number;
  updatedAt: string;
  runUrl: string;
};

export async function GET() {
  try {
    const results = await Promise.all(
      repositories.map(async (repository) => {
        const response = await fetch(
          `https://raw.githubusercontent.com/kilicerdal/${repository}/main/docs/test-metrics.json`,
          { next: { revalidate: 300 } }
        );

        if (!response.ok) {
          throw new Error(`Metrics unavailable: ${repository}`);
        }

        const data: TestMetrics = await response.json();

        const numericFields: (keyof TestMetrics)[] = [
          "total", "passed", "failed", "skipped", "flaky", "duration"
        ];

        if (
          !numericFields.every(
            (field) =>
              typeof data[field] === "number" &&
              Number.isFinite(data[field]) &&
              (data[field] as number) >= 0
          ) ||
          data.total !== data.passed + data.failed + data.skipped + data.flaky ||
          !Number.isFinite(Date.parse(data.updatedAt)) ||
          typeof data.runUrl !== "string" ||
          !data.runUrl.startsWith(
            `https://github.com/kilicerdal/${repository}/actions/runs/`
          )
        ) {
          throw new Error(`Invalid metrics: ${repository}`);
        }

        return { repository, ...data };
      })
    );

    const totals = results.reduce(
      (acc, result) => ({
        total: acc.total + result.total,
        passed: acc.passed + result.passed,
        failed: acc.failed + result.failed,
        skipped: acc.skipped + result.skipped,
        flaky: acc.flaky + result.flaky,
        duration: acc.duration + result.duration,
      }),
      {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        flaky: 0,
        duration: 0,
      }
    );

    return NextResponse.json({
      ...totals,
      updatedAt: results
        .map((result) => result.updatedAt)
        .sort()
        .at(-1),
      runUrl: results[0].runUrl,
      repositories: results,
      source: "Verified GitHub Actions test reports",
    });
  } catch {
    return NextResponse.json(
      { error: "Verified test metrics are currently unavailable." },
      { status: 503 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/kilicerdal/playwright-ai-automation/main/docs/test-metrics.json",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("Published test metrics unavailable");
    }

    const data = await response.json();

    const numericFields = [
      "total",
      "passed",
      "failed",
      "skipped",
      "flaky",
      "duration",
    ];

    if (
      !numericFields.every(
        (field) =>
          typeof data[field] === "number" &&
          Number.isFinite(data[field]) &&
          data[field] >= 0
      ) ||
      typeof data.updatedAt !== "string" ||
      !Number.isFinite(Date.parse(data.updatedAt)) ||
      typeof data.runUrl !== "string" ||
      !/^https:\/\/github\.com\/kilicerdal\/playwright-ai-automation\/actions\/runs\/\d+$/.test(data.runUrl)
    ) {
      throw new Error("Invalid test metrics");
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Verified test metrics are currently unavailable." },
      { status: 503 }
    );
  }
}

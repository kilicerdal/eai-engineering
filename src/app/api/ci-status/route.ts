import { NextResponse } from "next/server";




const repositories = [
  "ai-healthcare-quality-platform",
  "playwright-ai-automation",
];

type GitHubRun = {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  created_at: string;
  html_url: string;
};

export async function GET() {
  try {
    const results = await Promise.all(
      repositories.map(async (repo) => {
        const response = await fetch(
          `https://api.github.com/repos/kilicerdal/${repo}/actions/runs?per_page=5`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "erdal-ai-portfolio",
            },
            next: { revalidate: 300 },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        return (data.workflow_runs as GitHubRun[]).map((run) => ({
          id: run.id,
          repository: repo,
          name: run.name,
          status: run.status,
          conclusion: run.conclusion,
          createdAt: run.created_at,
          url: run.html_url,
        }));
      })
    );

    return NextResponse.json({
      source: "GitHub Actions API",
      live: true,
      runs: results.flat().sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      ),
    });
  } catch {
    return NextResponse.json(
      {
        live: false,
        error: "Unable to retrieve GitHub Actions results.",
      },
      { status: 503 }
    );
  }
}

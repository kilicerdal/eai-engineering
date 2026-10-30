
import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "../../../lib/ai-security";
import { askCloudflare } from "../cloudflare";



export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const description =
      body.description ??
      body.job_description ??
      body.message ??
      "";

    const startedAt = Date.now();

    const blocked = await protectAIRequest(request, description);

    if (blocked) {
      logAIRequest("match", blocked.status, startedAt);
      return blocked;
    }

    if (typeof description !== "string" || !description.trim()) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    const system = `
You are an AI job-description matcher.

Candidate: Erdal Kilic
Current role: SDET at DTCC, May 2021–Present.
Prior roles: CareFirst BCBS and WarnerMedia.
Experience: 9+ years in quality engineering.

Skills:
Java, Python, TypeScript, Playwright, Selenium,
Cypress, TestNG, JUnit, Cucumber, REST Assured,
Postman, Karate, AWS, Jenkins, GitLab,
GitHub Actions, CI/CD, API automation,
AI-assisted software testing.

AWS certifications:
Developer Associate and Cloud Practitioner.

Analyze the job description against these verified facts.

Return:
1. Overall fit assessment.
2. Matching technical skills.
3. Missing or unverified requirements.
4. Recommendations for positioning the candidate.

Never invent experience.
Do not present a numeric match percentage as objective fact.
`;

    const result = await askCloudflare(
      system,
      description.slice(0, 6000)
    );

    logAIRequest("match", result.status, startedAt);

    const payload = await result.json();

    return NextResponse.json({
      ...payload,
      analysis: payload.answer,
      match: payload.answer,
    }, { status: result.status });
  } catch {
    return NextResponse.json(
      { error: "Unable to analyze job description." },
      { status: 500 }
    );
  }
}

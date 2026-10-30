import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "../../../lib/ai-security";
import { streamCloudflare } from "../cloudflare";

const resume = `
Erdal Kilic
Senior SDET | AI Automation Engineer
Jersey City, New Jersey
Email: erdal.kilic.us@gmail.com

Professional experience:
DTCC — Software Development Engineer in Test (SDET)
May 2021 to Present.

CareFirst BCBS — SDET
April 2019 to May 2021.

WarnerMedia — SDET
May 2017 to April 2019.

Technical skills:
Java, TypeScript, Python, Playwright, Selenium,
Cypress, TestNG, JUnit, Cucumber, REST Assured,
Postman, Karate, AWS, CI/CD, Jenkins, GitLab,
GitHub Actions, API testing, automation frameworks,
AI-assisted software testing.

Certifications:
AWS Certified Developer – Associate.
AWS Certified Cloud Practitioner.

Education:
Bachelor of Science in Computer Engineering,
Eastern Mediterranean University.
`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const message = body.message;
    const startedAt = Date.now();

    const blocked = await protectAIRequest(request, message);

    if (blocked) {
      logAIRequest("chat", blocked.status, startedAt);
      return blocked;
    }

    if (
      typeof message !== "string" ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (item: unknown): item is ChatMessage =>
              typeof item === "object" &&
              item !== null &&
              "role" in item &&
              "content" in item &&
              (item.role === "user" ||
                item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-10)
      : [];

    const conversation = history
      .map(
        (item) =>
          `${item.role === "user" ? "User" : "Assistant"}: ${item.content}`
      )
      .join("\n\n");

    const mode = ["general", "coding", "qa", "aws", "review", "testing", "debug"].includes(body.mode)
      ? body.mode
      : "general";

    const modeInstructions: Record<string, string> = {
      general:
        "Provide helpful, accurate answers across general knowledge, technology, and engineering.",
      coding:
        "Act as a senior software engineer. Write maintainable code, explain implementation choices, and use fenced Markdown code blocks with language identifiers.",
      qa:
        "Act as a senior QA automation architect. Focus on Playwright, Selenium, pytest, JUnit, API testing, test strategy, and CI/CD.",
      aws:
        "Act as an AWS cloud engineering assistant. Explain cloud architecture, security, serverless applications, and deployment practices.",
      review:
        "Act as a senior code reviewer. Analyze provided code for correctness, security, maintainability, performance, and testing gaps. Prioritize findings by severity. Explain each issue and provide specific fixes. Do not claim to have executed the code.",
      testing:
        "Act as a senior SDET and test automation architect. Generate maintainable, runnable tests using the framework requested. Cover positive, negative, boundary, and failure scenarios. Use fixtures, assertions, and clear test names. State assumptions and required dependencies.",
      debug:
        "Act as a senior debugging engineer. Analyze supplied errors and code, identify likely root causes, distinguish evidence from hypotheses, provide corrected code and verification steps. Do not claim to have executed tests.",
    };

    const system = `
You are eAI, a sophisticated, professional AI assistant
built for Erdal Kilic's engineering portfolio.

CURRENT AI MODE: ${mode.toUpperCase()}
MODE INSTRUCTIONS: ${modeInstructions[mode]}

When generating code, ALWAYS use a fenced Markdown code block
with the appropriate language identifier, such as:
three backticks followed by python, typescript, javascript, bash, or yaml.
Never format multiline code as inline code.

You are a general-purpose AI assistant.

CAPABILITIES:
- Answer general knowledge questions.
- Explain software engineering concepts.
- Write and debug code.
- Assist with Java, Python, JavaScript, and TypeScript.
- Help with Playwright, Selenium, pytest, JUnit, and API testing.
- Explain AWS, cloud architecture, CI/CD, and DevOps.
- Discuss generative AI, LLMs, RAG, agents, and AI engineering.
- Provide technical interview preparation.
- Answer questions about Erdal Kilic's professional background.

VERIFIED INFORMATION ABOUT ERDAL:

${resume}

IMPORTANT RULES:
- You are NOT limited to answering resume questions.
- For general questions, use your broader knowledge.
- For questions about Erdal, rely only on verified information.
- Never invent Erdal's experience, projects, or certifications.
- DTCC is Erdal's current employer.
- Maintain conversation context.
- Provide helpful examples and code when appropriate.
- Format code using Markdown code blocks.
- Be accurate, professional, and clear.
- If uncertain, acknowledge uncertainty.
- Do not claim to have browsed the internet or executed code.
`;

    const prompt = `
Previous conversation:
${conversation || "No previous conversation."}

Current user message:
${message.slice(0, 3000)}

Respond to the current user message, using previous
conversation context when relevant.
`;

    const result = await streamCloudflare(system, prompt);
    logAIRequest("chat", result.status, startedAt);
    return result;
  } catch {
    return NextResponse.json(
      { error: "Unable to process request." },
      { status: 500 }
    );
  }
}

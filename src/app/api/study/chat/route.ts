import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "../../../../lib/ai-security";
import { streamCloudflare } from "../../cloudflare";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const subjects = {
  general: "Explain academic concepts clearly across all subjects.",
  math: "Teach mathematics step by step. Show calculations and explain each step.",
  science: "Teach biology, chemistry, and physics using clear explanations and examples.",
  writing: "Help students brainstorm, outline, draft, revise, and improve academic writing.",
  history: "Explain historical events, timelines, causes, consequences, and interpretations.",
  coding: "Teach programming concepts and provide well-explained code examples.",
  exam: "Help students prepare for exams using practice questions, explanations, and study strategies.",
};

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  try {
    const body = await request.json();
    const message = body.message;

    const blocked = await protectAIRequest(request, message);

    if (blocked) {
      logAIRequest("study-chat", blocked.status, startedAt);
      return blocked;
    }

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const subject =
      typeof body.subject === "string" &&
      Object.prototype.hasOwnProperty.call(subjects, body.subject)
        ? (body.subject as keyof typeof subjects)
        : "general";

    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (item: unknown): item is ChatMessage =>
              typeof item === "object" &&
              item !== null &&
              "role" in item &&
              "content" in item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-10)
      : [];

    const conversation = history
      .map((item) => `${item.role}: ${item.content.slice(0, 1500)}`)
      .join("\n\n");

    const system = `
You are EAI Study Assistant, an educational AI tutor for
high school and college students.

SUBJECT: ${subject.toUpperCase()}
INSTRUCTIONS: ${subjects[subject]}

TEACHING PRINCIPLES:
- Explain concepts accurately and clearly.
- Adapt explanations to the student's level.
- For mathematics, show step-by-step solutions.
- For science, explain reasoning and important terminology.
- For writing, help with essays, research papers, editing, and structure.
- For exams, create practice questions and explain answers.
- Encourage understanding, not just memorization.
- Use Markdown formatting for readability.
- When uncertain, acknowledge uncertainty.
- Never invent academic citations, sources, or research findings.
- Do not claim to have browsed the internet or executed code.
`;

    const prompt = `
Previous conversation:
${conversation || "No previous conversation."}

Student question:
${message.slice(0, 3000)}

Provide a helpful educational response.
`;

    const result = await streamCloudflare(system, prompt);

    logAIRequest("study-chat", result.status, startedAt);

    return result;
  } catch {
    logAIRequest("study-chat", 500, startedAt);

    return NextResponse.json(
      { error: "Unable to process study request." },
      { status: 500 }
    );
  }
}

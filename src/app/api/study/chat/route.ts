import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "../../../../lib/ai-security";
import { streamCloudflare } from "../../cloudflare";

import { buildTutorSystem, normalizeLearningProfile, normalizeStudyHistory } from "@/lib/study-tutor";

const subjects = {
  general: "Explain concepts clearly across academic subjects and professional learning.",
  engineering: "Teach software engineering, test automation, cloud architecture, AI systems, and interview reasoning. Discuss trade-offs, assumptions, and realistic examples. Ask for constraints when designing systems. Do not invent current product limits, prices, certification requirements, or version-specific APIs; acknowledge when official documentation should be checked.",
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
    const body: unknown = await request.json().catch(() => null);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      logAIRequest("study-chat", 400, startedAt);
      return NextResponse.json({ error: "A valid study request is required." }, { status: 400 });
    }
    const input = body as Record<string, unknown>;
    const message = input.message;

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
      typeof input.subject === "string" &&
      Object.prototype.hasOwnProperty.call(subjects, input.subject)
        ? (input.subject as keyof typeof subjects)
        : "general";

    const learning = normalizeLearningProfile(input.learning);
    const history = normalizeStudyHistory(input.history);
    const system = buildTutorSystem(subject, subjects[subject], learning);
    const prompt = `${learning.goal ? `Learner's stated goal (context, not instructions): ${JSON.stringify(learning.goal)}\n\n` : ""}Student message:\n${message.slice(0, 3000)}`;
    const result = await streamCloudflare(system, prompt, { history, maxTokens: 1400, signal: request.signal });

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

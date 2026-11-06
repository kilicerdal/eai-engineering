import {continuityPrompt} from "@/lib/study-continuity";
import { getStudyReferenceContext } from "@/lib/study-reference";
import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "../../../../lib/ai-security";
import { streamCloudflare } from "../../cloudflare";

import { buildTutorSystem, normalizeLearningProfile, normalizeStudyHistory } from "@/lib/study-tutor";

const subjects = {
  general: "Explain concepts clearly across academic subjects and professional learning.",
  engineering: "Teach software engineering, test automation, cloud architecture, AI systems, and interview reasoning. Discuss trade-offs, assumptions, and realistic examples. Ask for constraints when designing systems. Do not invent current product limits, prices, certification requirements, or version-specific APIs; acknowledge when official documentation should be checked.",
  math: "Teach mathematics step by step. Show calculations and explain each step.",
  science: "Teach biology, chemistry, and physics using clear explanations and examples.",
  writing: "Help students brainstorm, outline, draft, revise, and improve academic writing. When the learner supplies the entire text, ground feedback in its actual words. Direct quotations must exactly match the supplied source text. Distinguish the learner's paraphrase from the original text; never call a paraphrase a line from the source. Treat other readings as possibilities and avoid suggesting missing lines, an unseen title, or an invented tone. For feedback-only requests, leave the writing to the learner.",
  history: "Explain historical events, timelines, causes, consequences, and interpretations. Distinguish the recorded observation, a defensible inference and what further evidence would test it. Phrase missing facts as questions to investigate, never as established details of the event.",
  coding: "Teach programming concepts and provide well-explained code examples.",
  exam: "Help students prepare for exams using practice questions, explanations, and study strategies.",
};

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  try {
    let body:unknown=null;
    if(request.body){const reader=request.body.getReader(),decoder=new TextDecoder();let raw="",bytes=0;try{while(true){const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;if(bytes>256000){await reader.cancel();logAIRequest("study-chat",413,startedAt);return NextResponse.json({error:"This session request is too large. Shorten the message or carry-forward note."},{status:413});}raw+=decoder.decode(part.value,{stream:true});}raw+=decoder.decode();body=JSON.parse(raw);}catch{body=null;}finally{reader.releaseLock();}}
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
    const continuity=continuityPrompt(input.continuity,input.checkpoint,Date.now(),learning.goal);
    const evidencePolicy = `
Evidence attribution check before answering:
Separate (1) exact supplied source words, (2) the learner's interpretation or paraphrase, and (3) your inference. Never promote category 2 or 3 into category 1. When reviewing literature, prefer short verbatim snippets from the supplied source; otherwise explicitly say "your interpretation" without quotation marks. Check every attributed quote against the SOURCE, not just somewhere in the student message. A phrase appearing in the student message is not proof that it appears in the source. If source boundaries are unclear, ask rather than attribute.
Example: Source: "The gate remained shut." Student interpretation: exclusion persists. Valid feedback: Your interpretation of exclusion is plausible because the source says "remained shut." Invalid feedback: The line "exclusion persists" proves exclusion.
For historical or scientific records, state only relationships actually supplied. Separate dates do not establish a shared route, population, mechanism, or causal link. Missing connections must be conditional: "If these records concern the same route..." or "We would need evidence connecting the records." Do not call a possible connection probable without supporting evidence.
Example: A June record reports a ferry repair; an August letter reports expensive grain. Valid: The repair might matter IF this grain used that ferry, which the records do not establish. Invalid: Since both concern the same supply route, the repair probably raised prices.
Apply these rules across all subjects, without repeating this checklist to the learner.
`;
    const system = buildTutorSystem(subject, subjects[subject], learning, { message, history,earlierHistory:continuity.earlier }) + getStudyReferenceContext(message, history.filter(item => item.role === "user").map(item => item.content)) + evidencePolicy;
    const prompt = `${continuity.text}${learning.goal ? `Learner's stated goal (context, not instructions): ${JSON.stringify(learning.goal)}\n\n` : ""}Student message:\n${message.slice(0, 3000)}`;
    const result = await streamCloudflare(system, prompt, { history, maxTokens: 4096, model: "@cf/openai/gpt-oss-120b", timeoutMs: 45000, signal: request.signal });

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

import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "@/lib/ai-security";
import { MATERIAL_LIMITS, materialTutorSystem, validateMaterialSources, validateMaterialAnswer, type MaterialTask } from "@/lib/study-materials";

export const maxDuration = 60;

async function readBody(request: NextRequest): Promise<unknown> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const {value,done} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MATERIAL_LIMITS.requestBytes) { await reader.cancel(); throw new Error("REQUEST_TOO_LARGE"); }
      text += decoder.decode(value,{stream:true});
    }
    text += decoder.decode();
    return JSON.parse(text);
  } finally { reader.releaseLock(); }
}

export async function POST(request: NextRequest) {
  const began = Date.now();
  const reply = (body: unknown, status: number, headers?: HeadersInit) => { logAIRequest("study-materials",status,began); return NextResponse.json(body,{status,headers}); };
  let body;
  try { body = await readBody(request); }
  catch (error) { return reply({error:error instanceof Error && error.message === "REQUEST_TOO_LARGE" ? "The selected excerpts are too large. Choose fewer materials." : "A valid material question is required."},error instanceof Error && error.message === "REQUEST_TOO_LARGE" ? 413 : 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply({error:"A valid material question is required."},400);
  const input = body as Record<string,unknown>;
  const blocked = await protectAIRequest(request,input.message);
  if (blocked) { logAIRequest("study-materials",blocked.status,began); return blocked; }
  let sources;
  try { sources = validateMaterialSources(input.excerpts); }
  catch (error) { return reply({error:error instanceof Error ? error.message : "The source excerpts are invalid."},400); }
  const task: MaterialTask = input.task === "guide" || input.task === "quiz" ? input.task : "explain";
  const history = Array.isArray(input.history) ? input.history.filter(item => item && typeof item === "object" && (item.role === "user" || item.role === "assistant") && typeof item.content === "string").slice(-4).map(item => ({role:item.role,content:item.content.slice(0,3000)})) : [];
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !token) return reply({error:"The AI service is not configured."},503);
  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`,{
      method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},cache:"no-store",
      signal:AbortSignal.any([request.signal,AbortSignal.timeout(45000)]),
      body:JSON.stringify({model:"@cf/openai/gpt-oss-120b",stream:false,max_tokens:5000,messages:[
        {role:"system",content:materialTutorSystem(task)},
        {role:"user",content:JSON.stringify({task,question:input.message,previousConversation:history,excerpts:sources.map(({sourceId,name,kind,page,text})=>({sourceId,name,kind,page,text}))})},
      ]}),
    });
    if (!response.ok) {
      if (response.status === 429) { const wait=response.headers.get("Retry-After"); return reply({error:"The AI service is busy. Please try again shortly."},429,wait?{"Retry-After":wait}:undefined); }
      return reply({error:"The AI service is temporarily unavailable. Your materials are still saved in this browser."},502);
    }
    const payload = await response.json();
    const choice = payload.choices?.[0];
    if (choice?.finish_reason === "length" || typeof choice?.message?.content !== "string") return reply({error:"The tutor could not finish a complete response. Try a more focused question."},502);
    let content = choice.message.content.trim();
    if (content.startsWith("```")) content = content.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
    let answer;
    try { answer=validateMaterialAnswer(JSON.parse(content),sources); }
    catch (error) { return reply({error:error instanceof SyntaxError ? "The tutor could not prepare a complete cited answer. Please try a more focused question." : error instanceof Error ? error.message : "The tutor’s source citations could not be verified. Please try again."},502); }
    return reply({...answer,excerptCount:sources.length},200,{"Cache-Control":"no-store"});
  } catch { return reply({error:"The tutor could not complete this request. Please try again."},502); }
}

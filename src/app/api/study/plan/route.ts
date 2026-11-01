import { NextRequest, NextResponse } from "next/server";
import { protectAIRequest, logAIRequest } from "@/lib/ai-security";
import { validateGoalSettings, validateGoalPlan, goalPlannerSystem } from "@/lib/study-goal";
import { validateMaterialSources } from "@/lib/study-materials";
export const maxDuration = 60;
export async function POST(request: NextRequest) {
  const began = Date.now();
  const reply = (body: unknown, status: number, headers?: HeadersInit) => { logAIRequest("study-plan",status,began); return NextResponse.json(body,{status,headers}); };
  let input: Record<string,unknown>;
  try {
    if (!request.body) return reply({error:"Describe your learning goal first."},400);
    const reader=request.body.getReader(); const decoder=new TextDecoder(); let bytes=0,raw="";
    try { while(true) {const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;if(bytes>64000){await reader.cancel();return reply({error:"This plan request is too large. Select fewer excerpts."},413);}raw+=decoder.decode(part.value,{stream:true});} raw+=decoder.decode(); } finally {reader.releaseLock();}
    const parsed=JSON.parse(raw); if(!parsed || typeof parsed!=="object" || Array.isArray(parsed))return reply({error:"A valid learning goal is required."},400); input=parsed;
  } catch { return reply({error:"A valid learning goal is required."},400); }
  const blocked=await protectAIRequest(request,input.goal); if(blocked){logAIRequest("study-plan",blocked.status,began);return blocked;}
  let settings, sources;
  try {settings=validateGoalSettings(input);sources=input.excerpts===undefined || (Array.isArray(input.excerpts)&&input.excerpts.length===0) ? [] : validateMaterialSources(input.excerpts);} catch(error){return reply({error:error instanceof Error?error.message:"The plan settings are invalid."},400);}
  const account=process.env.CLOUDFLARE_ACCOUNT_ID, token=process.env.CLOUDFLARE_API_TOKEN;
  if(!account||!token)return reply({error:"The AI service is not configured."},503);
  try {
    const signal=AbortSignal.any([request.signal,AbortSignal.timeout(45000)]);
    const messages:{role:"system"|"user"|"assistant";content:string}[]=[{role:"system",content:goalPlannerSystem},{role:"user",content:JSON.stringify({settings,excerpts:sources})}];
    let validationIssue="The plan was not complete.";
    for(let attempt=0;attempt<2;attempt++) {
      const response=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},cache:"no-store",signal,body:JSON.stringify({model:"@cf/openai/gpt-oss-120b",stream:false,max_tokens:4500,response_format:{type:"json_object"},messages})});
      if(!response.ok)return reply({error:response.status===429?"The tutor is busy. Please try again shortly.":"The tutor is temporarily unavailable. Your current plan has not been replaced."},response.status===429?429:502,response.headers.get("Retry-After")?{"Retry-After":response.headers.get("Retry-After")!}:undefined);
      const choice=(await response.json()).choices?.[0];if(choice?.finish_reason==="length"||typeof choice?.message?.content!=="string")return reply({error:"The plan was incomplete. Try a more focused goal."},502);
      const content=choice.message.content.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
      try{return reply({plan:validateGoalPlan(JSON.parse(content),sources),sources},200,{"Cache-Control":"no-store"});}catch(error){
        validationIssue=error instanceof SyntaxError?"Return valid JSON.":error instanceof Error?error.message:"The plan was incomplete.";
        if(attempt===0)messages.push({role:"assistant",content:choice.message.content.slice(0,18000)},{role:"user",content:`Correct the JSON format for the original goal. Include title, overview and 3–8 lessons. Every lesson needs title, objective, activity, checkpoint and sourceIds (an array, empty if unused). Use ONLY original source IDs. Return only the corrected JSON. Validation issue: ${validationIssue}`});
      }
    }
    return reply({error:"The tutor could not produce a complete plan. Please try again."},502);
  }catch{return reply({error:"The plan could not be completed. Your current plan is still available; please try again."},502);}
}

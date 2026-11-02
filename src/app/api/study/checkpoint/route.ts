import {NextRequest,NextResponse} from "next/server";
import {protectAIRequest,logAIRequest} from "@/lib/ai-security";
import {checkpointSystem,normalizeLessonContext,validateCheckQuestion,validateCheckFeedback} from "@/lib/study-checkpoints";
export const maxDuration=60;
export async function POST(request:NextRequest){
 const started=Date.now();
 const reply=(data:unknown,status:number)=>{logAIRequest("study-checkpoint",status,started);return NextResponse.json(data,{status,headers:{"Cache-Control":"no-store"}});};
 let input:Record<string,unknown>;
 try{
  if(!request.body)return reply({error:"A lesson check is required."},400);
  const reader=request.body.getReader();let bytes=0,raw="";const decoder=new TextDecoder();
  try{while(true){const part=await reader.read();if(part.done)break;bytes+=part.value.byteLength;if(bytes>24000){await reader.cancel();return reply({error:"The lesson check is too large."},413);}raw+=decoder.decode(part.value,{stream:true});}raw+=decoder.decode();}finally{reader.releaseLock();}
  const parsed=JSON.parse(raw);if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error();input=parsed;
 }catch{return reply({error:"A valid lesson check is required."},400);}
 const context=normalizeLessonContext(input.context);
 if(!context || !["question","hint","review"].includes(String(input.action)))return reply({error:"Choose a valid lesson and check action."},400);
 const blocked=await protectAIRequest(request,context.goal);if(blocked){logAIRequest("study-checkpoint",blocked.status,started);return blocked;}
 let question;
 try{if(input.action!=="question")question=validateCheckQuestion(input.question);}catch{return reply({error:"The practice question is incomplete."},400);}
 if(input.action==="review"&&(typeof input.answer!=="string"||!input.answer.trim()||input.answer.length>2500))return reply({error:"Share your answer and reasoning in up to 2,500 characters."},400);
 const account=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;
 if(!account||!token)return reply({error:"The AI service is not configured."},503);
 const task=input.action==="question"?'Create ONE self-contained original question. Do not reuse a worked example or solved question present in recentWork. Return {"question":"...","criterion":"the skill/reasoning to demonstrate, with no answer or solution"}. Do not include the answer.':input.action==="hint"?'Return {"hint":"one small next-step hint without the answer"}.':'Review the actual answer and reasoning. Return {"decision":"meets|partial|needs_work|uncertain","feedback":"specific explanation grounded in the student attempt","reasoningGap":"first gap or None identified in this attempt","nextStep":"one useful next learning step"}. Do not infer whether help was used; that is recorded separately.';
 try{
  const response=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/ai/v1/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},cache:"no-store",signal:AbortSignal.any([request.signal,AbortSignal.timeout(45000)]),body:JSON.stringify({model:"@cf/openai/gpt-oss-120b",stream:false,max_tokens:1800,response_format:{type:"json_object"},messages:[{role:"system",content:checkpointSystem+"\n"+task},{role:"user",content:JSON.stringify({context,question,answer:input.action==="review"?input.answer:undefined,recentWork:input.action==="question"&&typeof input.recentWork==="string"?input.recentWork.slice(0,4000):undefined,previousQuestion:typeof input.previousQuestion==="string"?input.previousQuestion.slice(0,1800):undefined})}]})});
  if(!response.ok)return reply({error:response.status===429?"The tutor is busy. Try again shortly.":"The check could not be completed. Your saved work is unchanged."},response.status===429?429:502);
  const choice=(await response.json()).choices?.[0];if(choice?.finish_reason==="length"||typeof choice?.message?.content!=="string")throw new Error();
  const data=JSON.parse(choice.message.content.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,""));
  if(input.action==="question")return reply({question:validateCheckQuestion(data)},200);
  if(input.action==="review")return reply({result:validateCheckFeedback(data)},200);
  if(typeof data.hint!=="string"||!data.hint.trim()||data.hint.length>900)throw new Error();
  return reply({hint:data.hint.trim()},200);
 }catch{return reply({error:"The tutor did not complete this check reliably. Your answer is still available; try again."},502);}
}

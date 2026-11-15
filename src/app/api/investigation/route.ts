import {NextRequest,NextResponse} from 'next/server';
import {protectAIRequest,logAIRequest} from '@/lib/ai-security';
import {buildLabContext,LabInputError,LAB_MODEL,labPreviewGuardURL,readLabBody,requestLabAI} from '@/lib/investigation-ai';
export async function POST(request:NextRequest){
 const startedAt=Date.now();
 try{
  const context=buildLabContext(await readLabBody(request));
  // Native Request preserves the actual loopback Host; NextRequest normalizes 127.0.0.1 back to localhost.
  const guardRequest=process.env.DAI_LOCAL_PREVIEW==='1'?new Request(labPreviewGuardURL(request.url,request.headers.get('host')),{method:request.method,headers:request.headers}) as NextRequest:request;
  const blocked=await protectAIRequest(guardRequest,context.message);if(blocked){logAIRequest('investigation',blocked.status,startedAt);return blocked}
  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;
  if(!accountId||!token)return NextResponse.json({error:'Live AI is not configured here. The guided investigations and planning checklists remain available.'},{status:503});
  const answer=await requestLabAI(context,{accountId,token,signal:request.signal});
  logAIRequest('investigation',200,startedAt);
  return NextResponse.json({answer,observed:context.observed,title:context.title,caseId:context.caseId,model:LAB_MODEL,executed:false},{headers:{'Cache-Control':'no-store'}});
 }catch(error){const status=error instanceof LabInputError?error.status:502;logAIRequest('investigation',status,startedAt);return NextResponse.json({error:error instanceof LabInputError?error.message:'The AI request could not finish. Try again; your investigation is unchanged.'},{status,headers:{'Cache-Control':'no-store'}})}
}

import {NextRequest,NextResponse} from 'next/server';
import {protectAIRequest,logAIRequest} from '@/lib/ai-security';
import {LabInputError,readLabBody,labPreviewGuardURL} from '@/lib/investigation-ai';
import {buildExploreContext,requestExploreAI} from '@/lib/explore-ai';
import {LEVER_MODEL_VERSION} from '@/lib/explore-lever';
export async function POST(request:NextRequest){
 const startedAt=Date.now();
 try{
  const context=buildExploreContext(await readLabBody(request));
  const guardRequest=process.env.DAI_LOCAL_PREVIEW==='1'?new Request(labPreviewGuardURL(request.url,request.headers.get('host')),{method:request.method,headers:request.headers}) as NextRequest:request;
  const blocked=await protectAIRequest(guardRequest,context.question);if(blocked){logAIRequest('explore',blocked.status,startedAt);return blocked}
  const accountId=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;
  if(!accountId||!token)return NextResponse.json({error:'Live AI is not configured here. The interactive model, explanations and challenge still work.'},{status:503});
  const answer=await requestExploreAI(context,{accountId,token,signal:request.signal});
  logAIRequest('explore',200,startedAt);
  return NextResponse.json({answer,settings:context.settings,calculated:context.calculated,modelVersion:LEVER_MODEL_VERSION},{headers:{'Cache-Control':'no-store'}});
 }catch(e){const status=e instanceof LabInputError?e.status:502;logAIRequest('explore',status,startedAt);return NextResponse.json({error:e instanceof LabInputError?e.message:'The AI request could not finish. Your model is unchanged.'},{status,headers:{'Cache-Control':'no-store'}})}
}

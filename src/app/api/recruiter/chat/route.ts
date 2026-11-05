import {NextResponse} from 'next/server';
import {currentRecruiter,portalEnabled,PRIVATE_HEADERS,recruiterAdmin,recruiterOrigin} from '@/lib/recruiter-server';
import {requestIsSameOrigin} from '@/lib/recruiter-access';
import {protectRecruiterRequest} from '@/lib/recruiter-rate';
import {validProfile,careerGate} from '@/lib/recruiter-career';
import {conversationHistory,generateConversation} from '@/lib/recruiter-conversation';
export async function POST(request:Request){
 if(!portalEnabled())return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
 if(!requestIsSameOrigin(request,recruiterOrigin()))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
 const recruiter=await currentRecruiter();if(!recruiter)return NextResponse.json({error:'Your private session expired. Please verify your invitation again.'},{status:401,headers:PRIVATE_HEADERS});
 const limited=await protectRecruiterRequest(request);if(limited)return limited;
 let message:string,history:ReturnType<typeof conversationHistory>;
 try{const raw=await request.text();if(raw.length>42000)return new NextResponse(null,{status:413,headers:PRIVATE_HEADERS});const body=JSON.parse(raw);if(typeof body.message!=='string'||!body.message.trim()||body.message.length>10000)throw Error('Invalid question');message=body.message.trim();history=conversationHistory(body.history);}catch{return NextResponse.json({error:'Please enter a shorter question or start a new conversation.'},{status:400,headers:PRIVATE_HEADERS});}
 const gated=careerGate(message);if(gated)return NextResponse.json({answer:gated.answer,kind:gated.kind},{headers:PRIVATE_HEADERS});
 try{
  const {data,error}=await recruiterAdmin().from('recruiter_career_profile').select('profile').eq('id','erdal').single();
  if(error||!data)throw Error('Career records unavailable');
  const account=process.env.CLOUDFLARE_ACCOUNT_ID,token=process.env.CLOUDFLARE_API_TOKEN;
  if(!account||!token)throw Error('AI service unavailable');
  const answer=await generateConversation(validProfile(data.profile),message,history,{account,token});
  return NextResponse.json({answer,kind:'answer'},{headers:PRIVATE_HEADERS});
 }catch{return NextResponse.json({error:'I could not produce a verified answer just now. Please try again or rephrase your question.'},{status:503,headers:PRIVATE_HEADERS});}
}

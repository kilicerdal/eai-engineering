import {protectRecruiterRequest} from '@/lib/recruiter-rate';
import { NextResponse } from "next/server";
import { invitationDigest, requestIsSameOrigin } from "@/lib/recruiter-access";
import { PRIVATE_HEADERS, portalEnabled, recruiterAdmin, recruiterAuth, recruiterOrigin } from "@/lib/recruiter-server";
export async function POST(request: Request) {
  if(!portalEnabled())return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
  if(!requestIsSameOrigin(request,recruiterOrigin()))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
  const limited=await protectRecruiterRequest(request);if(limited)return limited;
  try {
    const raw=await request.text();if(raw.length>1024)return new NextResponse(null,{status:413,headers:PRIVATE_HEADERS});
    const {token}=JSON.parse(raw);
    if(typeof token!=="string" || !/^[a-f0-9]{64}$/.test(token))return new NextResponse(null,{status:400,headers:PRIVATE_HEADERS});
    const client=recruiterAdmin();
    const {data,error}=await client.rpc("recruiter_request_verification",{p_token_hash:invitationDigest(token)});
    if(error)throw new Error('Verification reservation failed');
    const invite=Array.isArray(data)?data[0]:null;
    if(!invite)return NextResponse.json({error:"This invitation is unavailable, expired, or was requested recently. Try again later."},{status:429,headers:PRIVATE_HEADERS});
    const sent=await recruiterAuth().auth.signInWithOtp({email:invite.email,options:{shouldCreateUser:true,emailRedirectTo:`${recruiterOrigin()}/recruiters/verify?invite=${invite.invite_id}`}});
    if(sent.error)throw new Error('Verification email unavailable');
    return NextResponse.json({message:"A verification link has been sent to the invited email address."},{headers:PRIVATE_HEADERS});
  } catch {return NextResponse.json({error:"Verification email could not be sent. Please try again later."},{status:503,headers:PRIVATE_HEADERS});}
}

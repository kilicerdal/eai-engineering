import {protectRecruiterRequest} from '@/lib/recruiter-rate';
import { NextResponse } from "next/server";
import { requestIsSameOrigin, validInvitationId } from "@/lib/recruiter-access";
import { PRIVATE_HEADERS, RECRUITER_COOKIE, authenticatedInvitation, portalEnabled, recruiterOrigin } from "@/lib/recruiter-server";
export async function POST(request: Request) {
  if(!portalEnabled())return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
  if(!requestIsSameOrigin(request,recruiterOrigin()))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
  const limited=await protectRecruiterRequest(request);if(limited)return limited;
  try {
    const raw=await request.text();if(raw.length>1024)return new NextResponse(null,{status:413,headers:PRIVATE_HEADERS});
    const {inviteId}=JSON.parse(raw),header=request.headers.get('authorization');
    if(!validInvitationId(inviteId) || !header?.startsWith('Bearer '))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
    const accessToken=header.slice(7),allowed=await authenticatedInvitation(accessToken,inviteId);
    if(!allowed)return NextResponse.json({error:"This verified email does not have access to this invitation."},{status:403,headers:PRIVATE_HEADERS});
    const {data:claimed,error}=await allowed.client.rpc('recruiter_claim_invitation',{p_invite_id:inviteId,p_user_id:allowed.user.id,p_email:allowed.user.email});
    if(error || claimed!==true)return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
    const response=NextResponse.json({next:'/recruiters'},{headers:PRIVATE_HEADERS});
    response.cookies.set(RECRUITER_COOKIE,Buffer.from(JSON.stringify({accessToken,inviteId})).toString('base64url'),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:1800});
    return response;
  } catch {return NextResponse.json({error:"The verification session could not be completed."},{status:503,headers:PRIVATE_HEADERS});}
}
export async function DELETE(request: Request) {
  if(!portalEnabled())return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
  if(!requestIsSameOrigin(request,recruiterOrigin()))return new NextResponse(null,{status:403,headers:PRIVATE_HEADERS});
  const response=NextResponse.json({signedOut:true},{headers:PRIVATE_HEADERS});
  response.cookies.set(RECRUITER_COOKIE,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:0});return response;
}

import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { automationAuthorized, invitationDigest, invitationToken, normalizeRecruiterEmail } from "@/lib/recruiter-access";
import { PRIVATE_HEADERS, portalEnabled, recruiterAdmin, recruiterOrigin } from "@/lib/recruiter-server";
export async function POST(request: Request) {
  if (!portalEnabled()) return new NextResponse(null,{status:404,headers:PRIVATE_HEADERS});
  if (!automationAuthorized(request.headers.get("authorization"),process.env.RECRUITER_INVITE_API_KEY) && !automationAuthorized(request.headers.get("authorization"),process.env.RECRUITER_AUTOMATION_KEY)) return new NextResponse(null,{status:401,headers:PRIVATE_HEADERS});
  try {
    const raw=await request.text();if(raw.length>4096)return new NextResponse(null,{status:413,headers:PRIVATE_HEADERS});
    const body=JSON.parse(raw),email=normalizeRecruiterEmail(body.email);
    if (!['gmail','outlook'].includes(body.source) || typeof body.messageId!=="string" || body.messageId.length<1 || body.messageId.length>1000) return NextResponse.json({error:"Invalid invitation request"},{status:400,headers:PRIVATE_HEADERS});
    const client=recruiterAdmin();
    const sourceKey=invitationDigest(JSON.stringify([body.source,body.messageId,email]));
    const existing=await client.from("recruiter_invitations").select("id,email,token_hash,expires_at,revoked_at").eq("source_key",sourceKey).maybeSingle();
    if(existing.error)throw new Error('Invite lookup failed');
    let invite=existing.data;
    if(!invite) {
      const id=randomUUID(),token=invitationToken(process.env.RECRUITER_AUTOMATION_KEY!,id,email);
      const inserted=await client.from("recruiter_invitations").insert({id,email,source:body.source,source_key:sourceKey,token_hash:invitationDigest(token),expires_at:new Date(Date.now()+7*86400000).toISOString()}).select("id,email,token_hash,expires_at,revoked_at").single();
      if(inserted.error?.code==="23505") {
        const retry=await client.from("recruiter_invitations").select("id,email,token_hash,expires_at,revoked_at").eq("source_key",sourceKey).single();
        if(retry.error)throw new Error('Invite reconciliation failed');invite=retry.data;
      } else {if(inserted.error)throw new Error('Invite creation failed');invite=inserted.data;}
    }
    if(!invite || invite.revoked_at || Date.parse(invite.expires_at)<=Date.now())return NextResponse.json({error:"Invitation expired or revoked"},{status:409,headers:PRIVATE_HEADERS});
    const token=invitationToken(process.env.RECRUITER_AUTOMATION_KEY!,invite.id,invite.email);
    if(invitationDigest(token)!==invite.token_hash)return NextResponse.json({error:"Invitation key changed; owner action required"},{status:409,headers:PRIVATE_HEADERS});
    return NextResponse.json({invitationId:invite.id,email:invite.email,url:`${recruiterOrigin()}/recruiters/invite#invite=${token}`,expiresAt:invite.expires_at},{headers:PRIVATE_HEADERS});
  } catch {return NextResponse.json({error:"Invitation could not be created"},{status:503,headers:PRIVATE_HEADERS});}
}

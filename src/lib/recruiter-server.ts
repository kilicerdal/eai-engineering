import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { invitationAllows, portalOrigin, validInvitationId, type RecruiterInvitation } from "./recruiter-access";
export const RECRUITER_COOKIE=process.env.NODE_ENV==="production"?"__Host-eai-recruiter-session":"eai-recruiter-session";
export const PRIVATE_HEADERS={"Cache-Control":"private, no-store, max-age=0","X-Robots-Tag":"noindex, nofollow, noarchive","Referrer-Policy":"no-referrer"};
export function portalEnabled(): boolean { return process.env.RECRUITER_PORTAL_ENABLED==="true"; }
export function recruiterOrigin(): string { return portalOrigin(process.env.RECRUITER_PORTAL_ORIGIN); }
export function recruiterAdmin() {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key=process.env.RECRUITER_SUPABASE_SERVICE_ROLE_KEY;
  if (!portalEnabled() || !url || !key) throw new Error("Recruiter portal is unavailable");
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
}
export function recruiterAuth() {
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!portalEnabled() || !url || !key) throw new Error("Recruiter verification unavailable");
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
}
export async function authenticatedInvitation(accessToken: string, inviteId: string) {
  if (!validInvitationId(inviteId) || accessToken.length>8000) return null;
  const client=recruiterAdmin();
  const {data:auth,error}=await client.auth.getUser(accessToken);
  if (error || !auth.user) return null;
  const {data:invite,error:readError}=await client.from("recruiter_invitations").select("id,email,token_hash,expires_at,revoked_at,auth_user_id").eq("id",inviteId).maybeSingle();
  if (readError || !invitationAllows(invite as RecruiterInvitation|null,auth.user)) return null;
  return {client,invite:invite as RecruiterInvitation,user:auth.user};
}
export async function currentRecruiter() {
  if (!portalEnabled()) return null;
  try {
    const raw=(await cookies()).get(RECRUITER_COOKIE)?.value;
    if (!raw || raw.length>12000) return null;
    const session=JSON.parse(Buffer.from(raw,"base64url").toString("utf8"));
    if (typeof session.accessToken!=="string" || typeof session.inviteId!=="string") return null;
    const allowed=await authenticatedInvitation(session.accessToken,session.inviteId);
    if (!allowed || allowed.invite.auth_user_id!==allowed.user.id) return null;
    return {email:allowed.invite.email,inviteId:allowed.invite.id};
  } catch { return null; }
}

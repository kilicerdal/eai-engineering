import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export type RecruiterInvitation = {
  id: string; email: string; token_hash: string; expires_at: string;
  revoked_at: string | null; auth_user_id: string | null;
};
export type VerifiedRecruiter = { id: string; email?: string; email_confirmed_at?: string };
export function normalizeRecruiterEmail(value: unknown): string {
  if (typeof value !== "string" || value.length > 254) throw new Error("Invalid recruiter email");
  const email=value.trim().toLowerCase();
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}$/.test(email)) throw new Error("Invalid recruiter email");
  return email;
}
export function invitationDigest(token: string): string { return createHash("sha256").update(token).digest("hex"); }
export function invitationToken(secret: string, id: string, email: string): string {
  if (secret.length < 32) throw new Error("Invitation secret is not configured");
  return createHmac("sha256",secret).update(`recruiter-invite:v1:${id}:${normalizeRecruiterEmail(email)}`).digest("hex");
}
export function automationAuthorized(header: string | null, secret: string | undefined): boolean {
  if (!secret || secret.length < 32 || !header?.startsWith("Bearer ")) return false;
  return timingSafeEqual(Buffer.from(invitationDigest(header.slice(7))),Buffer.from(invitationDigest(secret)));
}
export function invitationAllows(invite: RecruiterInvitation | null, user: VerifiedRecruiter | null, now=Date.now()): boolean {
  if (!invite || !user?.id || !user.email_confirmed_at || invite.revoked_at) return false;
  const expiry=Date.parse(invite.expires_at);
  if (!Number.isFinite(expiry) || expiry <= now || (invite.auth_user_id && invite.auth_user_id!==user.id)) return false;
  try { return normalizeRecruiterEmail(invite.email)===normalizeRecruiterEmail(user.email); } catch { return false; }
}
export function requestIsSameOrigin(request: Request, origin: string): boolean {
  return request.headers.get("origin")===origin;
}
export function portalOrigin(value: string | undefined): string {
  const url=new URL(value || "https://www.eai.engineering");
  if (url.username || url.password || url.search || url.hash || url.pathname!=="/" || (url.protocol!=="https:" && !(process.env.NODE_ENV!=="production" && url.hostname==="localhost"))) throw new Error("Invalid portal origin");
  return url.origin;
}
export function validInvitationId(value: unknown): value is string { return typeof value==="string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value); }

-- Private recruiter invitations are separate from Study accounts/data.
create table if not exists public.recruiter_invitations (
  id uuid primary key,
  email text not null check (email=lower(trim(email))),
  source text not null check (source in ('gmail','outlook')),
  source_key text not null unique check (source_key ~ '^[a-f0-9]{64}$'),
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  auth_user_id uuid references auth.users(id) on delete cascade,
  verification_window_at timestamptz,
  verification_requested_at timestamptz,
  verification_count integer not null default 0 check (verification_count>=0),
  check (expires_at>created_at and expires_at<=created_at+interval '7 days')
);
alter table public.recruiter_invitations enable row level security;
revoke all on public.recruiter_invitations from public, anon, authenticated;
grant select,insert,update,delete on public.recruiter_invitations to service_role;

create or replace function public.recruiter_request_verification(p_token_hash text)
returns table(invite_id uuid,email text)
language plpgsql security definer set search_path='' as $$
declare invitation public.recruiter_invitations%rowtype; window_count integer;
begin
  select * into invitation from public.recruiter_invitations i where i.token_hash=p_token_hash for update;
  if not found or invitation.revoked_at is not null or invitation.expires_at<=now() then return; end if;
  if invitation.verification_requested_at>now()-interval '60 seconds' then return; end if;
  window_count:=case when invitation.verification_window_at>now()-interval '1 hour' then invitation.verification_count else 0 end;
  if window_count>=5 then return; end if;
  update public.recruiter_invitations set
    verification_window_at=case when window_count=0 then now() else invitation.verification_window_at end,
    verification_requested_at=now(),verification_count=window_count+1 where id=invitation.id;
  return query select invitation.id,invitation.email;
end $$;
revoke all on function public.recruiter_request_verification(text) from public,anon,authenticated;
grant execute on function public.recruiter_request_verification(text) to service_role;

create or replace function public.recruiter_claim_invitation(p_invite_id uuid,p_user_id uuid,p_email text)
returns boolean language plpgsql security definer set search_path='' as $$
declare invitation public.recruiter_invitations%rowtype;
begin
  select * into invitation from public.recruiter_invitations i where i.id=p_invite_id for update;
  if not found or invitation.revoked_at is not null or invitation.expires_at<=now()
    or p_user_id is null or p_email is null or invitation.email<>lower(trim(p_email))
    or (invitation.auth_user_id is not null and invitation.auth_user_id<>p_user_id) then return false; end if;
  update public.recruiter_invitations set auth_user_id=p_user_id where id=p_invite_id;
  return true;
end $$;
revoke all on function public.recruiter_claim_invitation(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.recruiter_claim_invitation(uuid,uuid,text) to service_role;

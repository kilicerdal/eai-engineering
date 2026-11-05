create table if not exists public.recruiter_career_profile (
 id text primary key check(id='erdal'),
 profile jsonb not null check(jsonb_typeof(profile)='object'),
 updated_at timestamptz not null default now()
);
alter table public.recruiter_career_profile enable row level security;
revoke all on public.recruiter_career_profile from public,anon,authenticated;
grant select,insert,update on public.recruiter_career_profile to service_role;

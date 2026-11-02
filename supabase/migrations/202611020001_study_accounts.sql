-- Apply only to the dedicated dAI Free-plan project. No service-role key in the app.
begin;
create table public.study_learning_records (
  user_id uuid primary key references auth.users(id) on delete cascade,
  snapshot jsonb not null check (coalesce(jsonb_typeof(snapshot) = 'object' and snapshot->>'version' = '1' and jsonb_typeof(snapshot->'values') = 'object' and jsonb_typeof(snapshot->'library'->'documents') = 'array' and jsonb_typeof(snapshot->'library'->'entries') = 'array', false) and octet_length(snapshot::text) <= 4194304),
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now()
);
alter table public.study_learning_records enable row level security;
alter table public.study_learning_records force row level security;
revoke all on public.study_learning_records from anon;
grant select, insert, update, delete on public.study_learning_records to authenticated;
create policy "Read own learning" on public.study_learning_records for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own learning" on public.study_learning_records for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own learning" on public.study_learning_records for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own learning" on public.study_learning_records for delete to authenticated using ((select auth.uid()) = user_id);
create function public.study_record_revision() returns trigger language plpgsql set search_path = '' as $$
begin
  NEW.revision := gen_random_uuid();
  NEW.updated_at := now();
  return NEW;
end;
$$;
create trigger study_record_revision before insert or update on public.study_learning_records for each row execute function public.study_record_revision();
revoke all on function public.study_record_revision() from public;
commit;

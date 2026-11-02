-- Run against the dedicated test project after migration. All fixtures roll back.
begin;
insert into auth.users(id,email) values
('e1cb316c-9024-4669-994b-d2dde3a7f111','dai-test-a@example.invalid'),
('e1cb316c-9024-4669-994b-d2dde3a7f222','dai-test-b@example.invalid');
insert into public.study_learning_records(user_id,snapshot) values
('e1cb316c-9024-4669-994b-d2dde3a7f222','{"version":1,"values":{},"library":{"documents":[],"entries":[]}}');
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"e1cb316c-9024-4669-994b-d2dde3a7f111","role":"authenticated"}',true);
do $$
declare affected integer; before_revision uuid; after_revision uuid;
begin
 if exists(select 1 from public.study_learning_records) then raise exception 'RLS leaked another student record'; end if;
 begin
  insert into public.study_learning_records(user_id,snapshot) values ('e1cb316c-9024-4669-994b-d2dde3a7f222','{"version":1,"values":{},"library":{"documents":[],"entries":[]}}');
  raise exception 'Cross-owner insert was allowed';
 exception when insufficient_privilege then null; end;
 update public.study_learning_records set snapshot='{"version":1,"values":{},"library":{"documents":[],"entries":[]}}' where user_id='e1cb316c-9024-4669-994b-d2dde3a7f222';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Cross-owner update was allowed'; end if;
 delete from public.study_learning_records where user_id='e1cb316c-9024-4669-994b-d2dde3a7f222';
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Cross-owner deletion was allowed'; end if;
 insert into public.study_learning_records(user_id,snapshot) values ('e1cb316c-9024-4669-994b-d2dde3a7f111','{"version":1,"values":{},"library":{"documents":[],"entries":[]}}') returning revision into before_revision;
 update public.study_learning_records set snapshot=snapshot where user_id='e1cb316c-9024-4669-994b-d2dde3a7f111' and revision=before_revision returning revision into after_revision;
 if after_revision is null or after_revision=before_revision then raise exception 'Revision did not change'; end if;
 update public.study_learning_records set snapshot=snapshot where user_id='e1cb316c-9024-4669-994b-d2dde3a7f111' and revision=before_revision;
 get diagnostics affected = row_count;
 if affected <> 0 then raise exception 'Stale revision overwrote newer data'; end if;
 begin
  update public.study_learning_records set snapshot='{}' where user_id='e1cb316c-9024-4669-994b-d2dde3a7f111';
  raise exception 'Malformed snapshot accepted';
 exception when check_violation then null; end;
end $$;
set local role anon;
do $$ begin
 begin perform * from public.study_learning_records; raise exception 'Anonymous read allowed'; exception when insufficient_privilege then null; end;
end $$;
rollback;

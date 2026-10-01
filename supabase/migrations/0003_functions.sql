-- 0003_functions.sql — Analytics stored procedure

create or replace function public.fn_registration_stats()
returns table (
  workshop_slug  text,
  role           workshop_audience,
  mode           session_mode,
  payment_status payment_status,
  total          bigint
)
language sql
security definer
as $$
  select w.slug, r.role, r.mode, r.payment_status, count(*)
  from public.registrations r
  join public.workshops w on w.id = r.workshop_id
  group by w.slug, r.role, r.mode, r.payment_status;
$$;

revoke all on function public.fn_registration_stats() from public;
grant execute on function public.fn_registration_stats() to service_role;

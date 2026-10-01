-- 0002_rls.sql — Row-Level Security policies

alter table public.workshops         enable row level security;
alter table public.registrations     enable row level security;
alter table public.support_requests  enable row level security;

-- Public site can read workshop reference data
create policy "workshops_public_read" on public.workshops
  for select using (true);

-- Public site can INSERT a registration, nothing else
create policy "registrations_public_insert" on public.registrations
  for insert with check (true);

-- Public site can INSERT a support request, nothing else
create policy "support_public_insert" on public.support_requests
  for insert with check (true);

-- No anon SELECT/UPDATE/DELETE policies exist on registrations or
-- support_requests. All admin reads/writes go through server-side code
-- using SUPABASE_SERVICE_ROLE_KEY (bypasses RLS), gated by the admin
-- session check in middleware — never expose the service role key
-- to the client.

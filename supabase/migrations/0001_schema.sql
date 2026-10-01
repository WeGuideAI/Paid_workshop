-- 0001_schema.sql — WeGuide core schema
-- Creates enum types and all three tables.

create extension if not exists pgcrypto;

create type public.workshop_audience as enum ('student','parent','teacher');
create type public.session_mode     as enum ('online','offline');
create type public.payment_status   as enum ('pending','submitted','verified','rejected');
create type public.support_status   as enum ('open','in_progress','resolved');

create table public.workshops (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,          -- 'students' | 'parents' | 'teachers'
  title           text not null,
  audience        workshop_audience not null,
  tagline         text,
  description     text,
  duration_label  text not null default '2-3 hours',
  price           numeric(10,2) not null default 199,
  created_at      timestamptz not null default now()
);

create table public.registrations (
  id                    uuid primary key default gen_random_uuid(),
  workshop_id           uuid not null references public.workshops(id),
  role                  workshop_audience not null,
  full_name             text not null,
  email                 text not null,          -- self-reported, NOT an OAuth login
  phone                 text not null,
  mode                  session_mode not null,

  -- parent-only
  has_school_child      boolean,
  child_name            text,
  child_standard        text,
  child_school_name     text,

  -- student-only
  student_school_name   text,
  student_standard      text,

  -- teacher-only
  teacher_school_name   text,
  teacher_subject       text,

  -- payment (dummy QR + manual verification)
  amount                numeric(10,2) not null default 199,
  transaction_id        text,
  payment_status        payment_status not null default 'pending',

  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table public.support_requests (
  id              uuid primary key default gen_random_uuid(),
  registration_id uuid references public.registrations(id) on delete set null,
  name            text not null,
  email           text not null,
  message         text not null,
  status          support_status not null default 'open',
  created_at      timestamptz not null default now(),
  resolved_at     timestamptz
);

create index on public.registrations (workshop_id);
create index on public.registrations (payment_status);
create index on public.support_requests (status);

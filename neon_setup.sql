-- WeGuide Neon Serverless Postgres Setup
-- Run this script in the Neon SQL Editor or via migration script

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Enums (safe idempotent creation)
DO $$ BEGIN
  CREATE TYPE workshop_audience AS ENUM ('student','parent','teacher');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE session_mode AS ENUM ('online','offline');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending','submitted','verified','rejected');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE support_status AS ENUM ('open','in_progress','resolved');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Workshops Table
CREATE TABLE IF NOT EXISTS workshops (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  audience        workshop_audience NOT NULL,
  tagline         text,
  description     text,
  duration_label  text NOT NULL DEFAULT '3 hours',
  price           numeric(10,2) NOT NULL DEFAULT 199,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id           uuid NOT NULL REFERENCES workshops(id),
  role                  workshop_audience NOT NULL,
  full_name             text NOT NULL,
  email                 text NOT NULL,
  phone                 text NOT NULL,
  mode                  session_mode NOT NULL,

  -- Parent specifics
  has_school_child      boolean,
  child_name            text,
  child_standard        text,
  child_school_name     text,

  -- Student specifics
  student_school_name   text,
  student_standard      text,

  -- Teacher specifics
  teacher_school_name   text,
  teacher_subject       text,

  -- Payment
  amount                numeric(10,2) NOT NULL DEFAULT 199,
  transaction_id        text,
  payment_status        payment_status NOT NULL DEFAULT 'pending',

  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- Support Requests Table
CREATE TABLE IF NOT EXISTS support_requests (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id uuid REFERENCES registrations(id) ON DELETE SET NULL,
  name            text NOT NULL,
  email           text NOT NULL,
  message         text NOT NULL,
  status          support_status NOT NULL DEFAULT 'open',
  resolved_at     timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Analytics Helper Function
CREATE OR REPLACE FUNCTION fn_registration_stats()
RETURNS TABLE (
  workshop_slug  text,
  role           workshop_audience,
  mode           session_mode,
  payment_status payment_status,
  total          bigint
)
LANGUAGE sql
AS $$
  SELECT w.slug, r.role, r.mode, r.payment_status, count(*)
  FROM registrations r
  JOIN workshops w ON w.id = r.workshop_id
  GROUP BY w.slug, r.role, r.mode, r.payment_status;
$$;

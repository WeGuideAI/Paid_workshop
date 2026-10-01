# WeGuide Register

Registration and admin platform for WeGuide's AI & Robotics Awareness Workshops — built with **Next.js 16**, **Supabase**, and **Tailwind CSS v4**.

## Tech Stack

- **Framework**: Next.js 16.x (App Router, Server Actions, Middleware)
- **Database**: Supabase (PostgreSQL + RLS)
- **Auth**: Custom admin JWT sessions via `jose`
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel

---

## Prerequisites

- Node.js ≥ 20
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/your-org/weguide-register.git
cd weguide-register
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key — **server-only, never expose** |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password (min 12 chars recommended) |
| `ADMIN_SESSION_SECRET` | Random 64-char secret for JWT signing |
| `NEXT_PUBLIC_SITE_URL` | Full URL of the deployed site (e.g. `https://register.weguide.work`) |

Generate a secure session secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Set up the database

Run the SQL migrations in order in your **Supabase SQL Editor**:

1. `supabase/migrations/0001_schema.sql` — tables and enum types
2. `supabase/migrations/0002_rls.sql` — Row Level Security policies
3. `supabase/migrations/0003_functions.sql` — analytics stored procedure
4. `supabase/migrations/0004_seed.sql` — workshop seed data

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — leave build settings as-is

### 3. Add environment variables

In **Vercel Project → Settings → Environment Variables**, add all variables from `.env.local.example` with your real production values.

> **Important**: Set `NEXT_PUBLIC_SITE_URL` to your actual Vercel domain (e.g. `https://weguide-register.vercel.app`).

### 4. Deploy

Click **Deploy**. Subsequent pushes to `main` auto-deploy.

---

## Project Structure

```
app/
  (public)/         # Public-facing pages (home, register, workshops, support)
  admin/
    login/          # Admin login page
    (protected)/    # Protected admin pages (dashboard, registrations, support)
  api/admin/        # API routes (logout)
  actions/          # Server Actions (register, admin-auth, admin-data, support)
components/         # Shared UI components
lib/
  auth/             # JWT session helpers
  supabase/         # Supabase clients (anon + service-role)
  validations/      # Zod schemas
supabase/
  migrations/       # SQL migration files (run manually in Supabase SQL Editor)
middleware.ts       # Next.js middleware — admin route protection
vercel.json         # Vercel deployment configuration
```

---

## Security Notes

- **SUPABASE_SERVICE_ROLE_KEY** bypasses Row Level Security. It is imported via `server-only` and only used in Server Actions — never accessible client-side.
- Admin sessions use HS256 JWTs, expire after 8 hours, and are stored in `httpOnly; Secure; SameSite=Lax` cookies.
- Admin credential comparison uses `crypto.timingSafeEqual` to prevent timing attacks.
- All routes under `/admin/*` (except `/admin/login`) are protected by Next.js middleware.
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options, etc.) are set via `next.config.ts`.

---

## License

Private — WeGuide © 2026

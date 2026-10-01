-- 0004_seed.sql — Seed the three workshop rows

insert into public.workshops (slug, title, audience, tagline, description)
values
  (
    'students',
    'Prompting + Digital Portfolio Development',
    'student',
    'Master AI prompting and build your own digital portfolio',
    'Learn the fundamentals of AI prompting — how to talk to large-language models, iterate on outputs, and evaluate quality. Then apply those skills hands-on to build a polished, AI-assisted digital portfolio or resume you can share with colleges and future employers. Walk away with a live link and the confidence to keep refining it.'
  ),
  (
    'parents',
    'AI Literacy + Real-Time Use Cases',
    'parent',
    'Understand AI, protect your child, and use it every day',
    'Demystify artificial intelligence in plain language: what it actually is, how it works at a high level, and where it already touches your family''s daily life. Explore practical, real-time use cases — from homework help to career guidance — while learning how to keep your child safe online. Leave with a clear mental model of AI''s impact on education and your child''s future.'
  ),
  (
    'teachers',
    'Integration of AI in School Life',
    'teacher',
    'Use AI to plan lessons, grade smarter, and reclaim your time',
    'Discover how to weave AI tools into your existing workflow: lesson planning, formative assessment, differentiated instruction, and everyday admin tasks. This workshop is built by educators for educators — no jargon, no hype, just actionable strategies you can use Monday morning. Reclaim hours every week and redirect that energy toward what matters most: your students.'
  );

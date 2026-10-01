"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  BookOpen,
  Clock,
  Wifi,
  IndianRupee,
  Zap,
  ShieldAlert,
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { RealWorldApps } from "@/components/RealWorldApps";
import { ExploreResources } from "@/components/ExploreResources";

const workshops = [
  {
    slug: "students",
    role: "student",
    title: "Prompting + Digital Portfolio Development",
    audience: "Students",
    icon: GraduationCap,
    tagline: "Master AI prompting and build your own digital portfolio",
    highlights: [
      "Learn to talk to AI models effectively",
      "Build a polished AI-assisted portfolio",
      "Get a live shareable link",
      "Career head-start with AI fluency",
    ],
    gradient: "from-[#075985] to-[#0ea5e9]",
    accentColor: "#0ea5e9",
  },
  {
    slug: "parents",
    role: "parent",
    title: "AI Literacy + Real-Time Use Cases",
    audience: "Parents",
    icon: Users,
    tagline: "Understand AI, protect your child, and use it every day",
    highlights: [
      "Demystify AI in plain language",
      "Everyday practical use cases",
      "Child safety in the AI age",
      "Impact on education & future",
    ],
    gradient: "from-[#0ea5e9] to-[#22d3ee]",
    accentColor: "#22d3ee",
  },
  {
    slug: "teachers",
    role: "teacher",
    title: "Integration of AI in School Life",
    audience: "Teachers",
    icon: BookOpen,
    tagline: "Use AI to plan lessons, grade smarter, and reclaim your time",
    highlights: [
      "AI for lesson planning & assessment",
      "Differentiated instruction tools",
      "Admin workload reduction",
      "Actionable strategies for Monday morning",
    ],
    gradient: "from-[#22d3ee] to-[#075985]",
    accentColor: "#06b6d4",
  },
];

const whyAIMatters = [
  {
    icon: Zap,
    title: "The Shift Has Already Happened",
    description:
      "AI is reshaping education, hiring, creative work, and daily productivity right now. Schools using AI tools today are seeing 40% faster lesson preparation and more personalised student outcomes. This isn't a future trend — it's today's reality.",
  },
  {
    icon: TrendingUp,
    title: "The Cost of Waiting",
    description:
      "Individuals and schools that delay AI adoption aren't staying neutral — they're falling behind. Peers are already drafting with AI, analysing data faster, and building skills that employers now expect. Every month of inaction widens the gap.",
  },
  {
    icon: ShieldAlert,
    title: "Naming the Fear Directly",
    description:
      "\"AI will take over\" is a real anxiety — and we don't dismiss it. History shows that calculators didn't end mathematics, the internet didn't end libraries. Adaptation, not elimination, has always been the outcome. The same pattern holds for AI.",
  },
  {
    icon: Brain,
    title: "What Stays Irreplaceably Human",
    description:
      "Judgement, ethics, creativity, empathy, mentorship — these are amplified by AI, not replaced by it. Our workshops build fluency with AI so you can focus on what only humans can do, rather than competing with what machines do better.",
  },
  {
    icon: AlertTriangle,
    title: "Honest About the Risks",
    description:
      "Misinformation, algorithmic bias, and over-reliance are real dangers. We address them head-on — not to scare you, but so you can navigate AI with clear eyes. Credible guidance beats both hype and fear.",
  },
  {
    icon: Target,
    title: "Your Stake in This",
    description:
      "Parents: your child's competitiveness depends on AI fluency. Teachers: your classroom relevance and workload depend on it. Students: early AI skills are the career head-start everyone wishes they had five years ago.",
  },
];

export default function HomePage() {
  return (
    <div className="page-enter">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative pt-6 pb-20 px-4 max-w-7xl mx-auto min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-[#4DA3FF]">
                <span>✦ WE GUIDE PRESENTS • PRACTICAL AI WORKSHOP</span>
              </div>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-[1.1] text-white">
                Master Practical AI.{" "}
                <span className="text-[#087CF4] block mt-1">
                  For Students, Parents & Teachers.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                No jargon. No coding. An interactive, 90-minute hands-on awareness workshop
                tailored to empower <strong className="text-white">school students</strong> with AI literacy & prompting,{" "}
                <strong className="text-white">parents</strong> with daily life simplicity & child guidance, and{" "}
                <strong className="text-white">teachers</strong> with effortless workload automation.
              </p>
            </ScrollReveal>

            {/* Feature Badges */}
            <ScrollReveal className="delay-300">
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-200">
                  ✦ School Students: Prompting & Literacy
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-200">
                  ✦ Parents: Everyday AI & Child Guidance
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-200">
                  ✦ Teachers: Lesson Prep & Time-Saving
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-200">
                  ✦ 100% Beginner Friendly (No Coding)
                </span>
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-slate-200">
                  ✦ Orchid Mall, Palakkad
                </span>
              </div>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal className="delay-400">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link
                  href="/register"
                  className="bg-[#087CF4] hover:bg-[#0066cc] text-white font-bold text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/30 hover:scale-105 transition-all text-center"
                >
                  Claim Your Seat • ₹199
                </Link>
                <a
                  href="#workshops"
                  className="border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-base px-6 py-3.5 rounded-full transition-all text-center"
                >
                  Explore 3 Workshop Tracks ↓
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column Video Card (5 cols on lg) */}
          <div className="lg:col-span-5">
            <ScrollReveal className="delay-200">
              <div className="relative rounded-3xl p-3 bg-[#080d1a]/90 border border-cyan-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden group">
                {/* Looping Logo Animation Video (Widescreen Rectangular Screen) */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/80 border border-white/10">
                  <video
                    src="/animation weguide logo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Sub-card banner */}
                <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4DA3FF] mb-1">
                    <span>✦ WEGUIDE AI LITERACY INITIATIVE</span>
                  </div>
                  <p className="text-xs font-medium text-slate-300">
                    Hands-on Interactive Prompts & Practical AI Workflows
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>


      {/* ═══════ WHY AI LITERACY MATTERS ═══════ */}
      <section className="py-24 px-4 bg-[var(--bg-alt)] relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#4DA3FF] border border-blue-500/20 bg-blue-500/10 mb-4">
                The Bigger Picture
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                Why AI Literacy{" "}
                <span className="gradient-text">Matters Now</span>
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                This isn&apos;t about keeping up with a trend. It&apos;s about understanding
                the most significant technology shift since the internet — before
                it leaves you behind.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAIMatters.map((item) => (
              <ScrollReveal key={item.title}>
                <GlassCard hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#0353a4] to-[#087CF4] shrink-0">
                      <item.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2 text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ REAL WORLD APPLICATIONS ═══════ */}
      <RealWorldApps />

      {/* ═══════ WORKSHOP CARDS ═══════ */}
      <section id="workshops" className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#087CF4] border border-blue-500/20 bg-blue-500/10 mb-4">
                Choose Your Path
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                Three Workshops,{" "}
                <span className="gradient-text">One Mission</span>
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
                Each workshop is tailored to its audience — pick yours and take the
                first step toward AI fluency.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <ScrollReveal key={workshop.slug}>
                <GlassCard hover className="h-full flex flex-col relative overflow-hidden group">
                  {/* Top accent gradient */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${workshop.gradient}`}
                  />

                  {/* Icon & badge */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${workshop.gradient} shadow-lg`}
                      style={{
                        boxShadow: `0 8px 30px ${workshop.accentColor}30`,
                      }}
                    >
                      <workshop.icon size={28} className="text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(8,124,244,0.15)] text-[#4DA3FF] border border-[rgba(8,124,244,0.2)]">
                      {workshop.audience}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2 text-[var(--text-primary)]">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    {workshop.tagline}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {workshop.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                        <CheckCircle2
                          size={16}
                          className="text-[#087CF4] shrink-0 mt-0.5"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-6 pb-6 border-b border-[var(--border-glass)]">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> 2–3 hrs
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#4DA3FF]">
                      <IndianRupee size={14} /> 199
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <Link href={`/workshops/${workshop.slug}`} className="flex-1">
                      <GradientButton variant="outline" fullWidth size="sm">
                        Learn More
                      </GradientButton>
                    </Link>
                    <Link href={`/register?role=${workshop.role}`} className="flex-1">
                      <GradientButton fullWidth size="sm">
                        <span>Register</span>
                        <ChevronRight size={16} />
                      </GradientButton>
                    </Link>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EXPLORE RESOURCES (Inline Accordion) ═══════ */}
      <ExploreResources />

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 px-4 bg-[var(--bg-alt)] relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard glow className="py-12 px-8">
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
                Ready to{" "}
                <span className="gradient-text">Get Started?</span>
              </h2>
              <p className="text-[var(--text-muted)] max-w-xl mx-auto mb-8 text-lg">
                A 2–3 hour workshop for just ₹199 — that&apos;s less than a
                coffee subscription and more valuable than months of wondering
                what AI means for your future.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <GradientButton size="lg">
                    <span>Register Now</span>
                    <ArrowRight size={18} />
                  </GradientButton>
                </Link>
                <Link href="/support">
                  <GradientButton variant="ghost" size="lg">
                    Have a Doubt? Ask Us
                  </GradientButton>
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

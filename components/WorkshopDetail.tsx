"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";

interface WorkshopDetailProps {
  slug: string;
  role: string;
  title: string;
  audience: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
  learningOutcomes: string[];
  whoIsItFor: string[];
  sessionStructure: { title: string; description: string }[];
}

export function WorkshopDetail({
  role,
  title,
  audience,
  tagline,
  description,
  icon,
  gradient,
  accentColor,
  learningOutcomes,
  whoIsItFor,
  sessionStructure,
}: WorkshopDetailProps) {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--ocean-500)] transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Workshops
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div
                className={`p-6 rounded-2xl bg-gradient-to-br ${gradient} shadow-2xl shrink-0 flex items-center justify-center`}
                style={{ boxShadow: `0 15px 50px ${accentColor}40` }}
              >
                {icon}
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(14,165,233,0.1)] text-[var(--ocean-500)] border border-[rgba(14,165,233,0.15)] mb-3">
                  For {audience}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
                  {title}
                </h1>
                <p className="text-xl text-[var(--foam-400)] font-medium mb-4">
                  {tagline}
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed max-w-2xl mb-8">
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] mb-8">
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-[var(--ocean-500)]" />
                    3 Hours
                  </span>
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[var(--ocean-500)]" />
                    Interactive Cohort
                  </span>
                  <span className="flex items-center gap-2 font-semibold text-[var(--foam-400)]">
                    <IndianRupee size={18} />
                    ₹199
                  </span>
                </div>

                <Link href={`/register?role=${role}`}>
                  <GradientButton size="lg">
                    <span>Register for This Workshop</span>
                    <ArrowRight size={18} />
                  </GradientButton>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 px-4 bg-[var(--bg-alt)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-8">
              What You&apos;ll <span className="gradient-text">Learn</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningOutcomes.map((outcome, i) => (
              <ScrollReveal key={i}>
                <GlassCard hover className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: accentColor }} />
                  </div>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {outcome}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Session Structure */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-8">
              Session <span className="gradient-text">Structure</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {sessionStructure.map((session, i) => (
              <ScrollReveal key={i}>
                <GlassCard hover>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold"
                      style={{
                        background: `linear-gradient(135deg, var(--ocean-700), ${accentColor})`,
                        color: "white",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {session.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-20 px-4 bg-[var(--bg-alt)]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-8">
              Who Is This <span className="gradient-text">For?</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whoIsItFor.map((item, i) => (
              <ScrollReveal key={i}>
                <GlassCard className="flex items-center gap-3">
                  <Sparkles size={18} className="text-[var(--foam-400)] shrink-0" />
                  <p className="text-sm text-[var(--text-primary)]">{item}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <GlassCard glow className="py-12 px-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
                Ready to Begin Your{" "}
                <span className="gradient-text">AI Journey?</span>
              </h2>
              <p className="text-[var(--text-muted)] mb-8">
                Just ₹199 for a 3 hour workshop. No login required —
                register with your email and you&apos;re in.
              </p>
              <Link href={`/register?role=${role}`}>
                <GradientButton size="lg">
                  <span>Register Now — ₹199</span>
                  <ArrowRight size={18} />
                </GradientButton>
              </Link>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

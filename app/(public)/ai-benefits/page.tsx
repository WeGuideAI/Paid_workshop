"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { GraduationCap, Users, BookOpen, Brain, Zap, Target, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/GradientButton";

export default function AIBenefitsPage() {
  return (
    <div className="page-enter pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--ocean-500)] border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-4">
              Category Benefits
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6">
              How AI <span className="gradient-text">Boosts Your Potential</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-3xl mx-auto leading-relaxed">
              Artificial Intelligence isn't a one-size-fits-all tool. Discover exactly how AI is specifically tailored to revolutionize the way students learn, parents guide, and teachers educate.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-24">
          {/* Students Section */}
          <section className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[300px] bg-gradient-to-b from-[#0ea5e9] to-transparent opacity-5 blur-[100px] pointer-events-none" />
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#075985] to-[#0ea5e9] inline-block mb-6">
                    <GraduationCap size={40} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">For Students</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    AI transforms you from a passive consumer of information into an active creator. It levels the playing field, giving every student access to world-class tutoring and creative tools.
                  </p>
                  <Link href="/register?role=student">
                    <GradientButton variant="outline">Join Student Workshop <ArrowRight size={16} className="ml-2 inline" /></GradientButton>
                  </Link>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <Brain size={24} className="text-[#0ea5e9] mb-4" />
                    <h3 className="text-lg font-bold mb-2">24/7 Personalized Tutoring</h3>
                    <p className="text-sm text-[var(--text-muted)]">AI acts as a patient tutor that never sleeps, breaking down complex math or science concepts exactly at your learning pace.</p>
                  </GlassCard>
                  <GlassCard className="p-6">
                    <Zap size={24} className="text-[#0ea5e9] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Digital Portfolio Creation</h3>
                    <p className="text-sm text-[var(--text-muted)]">Use generative AI to build code, design graphics, and write essays to create a standout portfolio for college admissions.</p>
                  </GlassCard>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Parents Section */}
          <section className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[300px] bg-gradient-to-b from-[#22d3ee] to-transparent opacity-5 blur-[100px] pointer-events-none" />
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                <div className="lg:w-1/3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0ea5e9] to-[#22d3ee] inline-block mb-6">
                    <Users size={40} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">For Parents</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    Navigate the digital age with confidence. AI literacy empowers you to protect your children while guiding them to use these powerful tools constructively.
                  </p>
                  <Link href="/register?role=parent">
                    <GradientButton variant="outline">Join Parent Workshop <ArrowRight size={16} className="ml-2 inline" /></GradientButton>
                  </Link>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <Target size={24} className="text-[#22d3ee] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Future-Proofing Kids</h3>
                    <p className="text-sm text-[var(--text-muted)]">Understand the skills your child actually needs for the 2030 job market, shifting focus from memorization to critical AI collaboration.</p>
                  </GlassCard>
                  <GlassCard className="p-6">
                    <ShieldAlert size={24} className="text-[#22d3ee] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Digital Safety & Awareness</h3>
                    <p className="text-sm text-[var(--text-muted)]">Learn how to identify deepfakes, AI-generated misinformation, and set healthy boundaries for AI interaction at home.</p>
                  </GlassCard>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Teachers Section */}
          <section className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[300px] bg-gradient-to-b from-[#818cf8] to-transparent opacity-5 blur-[100px] pointer-events-none" />
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#22d3ee] to-[#075985] inline-block mb-6">
                    <BookOpen size={40} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-4">For Teachers</h2>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                    Reclaim your evenings and weekends. AI is the ultimate teaching assistant, handling administrative heavy lifting so you can focus on human connection.
                  </p>
                  <Link href="/register?role=teacher">
                    <GradientButton variant="outline">Join Teacher Workshop <ArrowRight size={16} className="ml-2 inline" /></GradientButton>
                  </Link>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <Zap size={24} className="text-[#075985] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Automated Lesson Planning</h3>
                    <p className="text-sm text-[var(--text-muted)]">Generate comprehensive lesson plans, quizzes, and rubrics aligned with your curriculum in seconds rather than hours.</p>
                  </GlassCard>
                  <GlassCard className="p-6">
                    <Users size={24} className="text-[#075985] mb-4" />
                    <h3 className="text-lg font-bold mb-2">Differentiated Instruction</h3>
                    <p className="text-sm text-[var(--text-muted)]">Instantly rewrite reading materials at three different reading levels to accommodate every student in your mixed-ability classroom.</p>
                  </GlassCard>
                </div>
              </div>
            </ScrollReveal>
          </section>
        </div>
      </div>
    </div>
  );
}

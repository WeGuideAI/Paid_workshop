"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import {
  Sparkles, ShieldCheck, Briefcase,
  GraduationCap, Users, BookOpen,
  Brain, Zap, Target, ArrowRight, ChevronDown,
  EyeOff, Scale, UserX, AlertTriangle,
  TerminalSquare, Compass, Cpu,
} from "lucide-react";

// ── Panel content ──────────────────────────────────────────────
const resources = [
  {
    id: "benefits",
    icon: Sparkles,
    label: "Category Benefits",
    summary: "Discover how AI is tailored to revolutionize learning, parenting, and teaching.",
    color: "text-[var(--ocean-500)]",
    bg: "rgba(14,165,233,0.1)",
    border: "rgba(14,165,233,0.3)",
    content: {
      heading: "How AI Boosts Each Category",
      sections: [
        {
          icon: GraduationCap,
          title: "For Students",
          color: "#0ea5e9",
          items: [
            "24/7 Personalized Tutoring — AI acts as a patient tutor that never sleeps, breaking down complex concepts at your pace.",
            "Digital Portfolio Creation — Use generative AI to build code, design graphics, and write essays for college admissions.",
          ],
        },
        {
          icon: Users,
          title: "For Parents",
          color: "#22d3ee",
          items: [
            "Future-Proofing Kids — Understand the skills your child needs for the 2030 job market.",
            "Digital Safety & Awareness — Learn how to identify deepfakes and set healthy AI boundaries at home.",
          ],
        },
        {
          icon: BookOpen,
          title: "For Teachers",
          color: "#818cf8",
          items: [
            "Automated Lesson Planning — Generate lesson plans, quizzes, and rubrics aligned to your curriculum in seconds.",
            "Differentiated Instruction — Instantly rewrite reading materials at multiple levels for mixed-ability classrooms.",
          ],
        },
      ],
    },
  },
  {
    id: "safety",
    icon: ShieldCheck,
    label: "Safety & Ethics",
    summary: "Learn about data privacy, algorithmic bias, deepfakes, and responsible AI usage.",
    color: "text-rose-400",
    bg: "rgba(244,63,94,0.1)",
    border: "rgba(244,63,94,0.3)",
    content: {
      heading: "AI Safety & Ethics Guide",
      sections: [
        {
          icon: EyeOff,
          title: "Data Privacy & Footprints",
          color: "#f43f5e",
          items: [
            "Every prompt you enter can train future models. Sanitize personal information and opt out of data collection when possible.",
          ],
        },
        {
          icon: Scale,
          title: "Algorithmic Bias",
          color: "#f59e0b",
          items: [
            "AI models inherit human prejudices from training data. Learn to identify biased outputs and cross-reference automated decisions.",
          ],
        },
        {
          icon: UserX,
          title: "Deepfakes & Misinformation",
          color: "#a78bfa",
          items: [
            "With voice cloning and photorealistic image generation, seeing is no longer believing. Learn the technical tells of deepfakes.",
          ],
        },
        {
          icon: AlertTriangle,
          title: "Over-Reliance & Deskilling",
          color: "#fb923c",
          items: [
            "AI as a co-pilot, not an autopilot — our workshops ensure core cognitive skills aren't lost to automation.",
          ],
        },
      ],
    },
  },
  {
    id: "careers",
    icon: Briefcase,
    label: "Future Careers",
    summary: "See how the skills from our workshops map to the high-demand jobs of the next decade.",
    color: "text-amber-400",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.3)",
    content: {
      heading: "Future Careers in AI",
      sections: [
        {
          icon: TerminalSquare,
          title: "AI Prompt Engineer",
          color: "#fbbf24",
          items: [
            "Craft optimized prompts to generate high-quality outputs from language models for marketing, coding, and creative writing. High demand globally.",
          ],
        },
        {
          icon: Compass,
          title: "AI Ethics Officer",
          color: "#34d399",
          items: [
            "Ensures AI systems are fair, unbiased, and comply with data privacy laws. Audits algorithms for unintended discrimination.",
          ],
        },
        {
          icon: Cpu,
          title: "Robotics / Edge AI Technician",
          color: "#60a5fa",
          items: [
            "Deploys lightweight neural networks onto local hardware for autonomous drones and factory robots. High growth field.",
          ],
        },
      ],
    },
  },
];

export function ExploreResources() {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => setActive((prev) => (prev === id ? null : id));

  return (
    <section className="py-24 px-4 bg-[var(--bg-base)] relative border-t border-[rgba(255,255,255,0.02)]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
              Explore <span className="gradient-text">More Resources</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base">Click any card to expand the details right here.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {resources.map((res) => {
            const isOpen = active === res.id;
            return (
              <ScrollReveal key={res.id}>
                <div
                  className="rounded-2xl overflow-hidden border transition-all duration-300"
                  style={{
                    borderColor: isOpen ? res.border : "rgba(255,255,255,0.06)",
                    background: isOpen ? `rgba(${res.bg.slice(5,-1)}, 0.04)` : "transparent",
                  }}
                >
                  {/* ── Tab header ── */}
                  <button
                    onClick={() => toggle(res.id)}
                    className="w-full flex items-center gap-4 p-6 text-left group transition-all"
                    aria-expanded={isOpen}
                  >
                    <div
                      className="p-3 rounded-xl shrink-0 transition-transform group-hover:scale-105"
                      style={{ background: res.bg }}
                    >
                      <res.icon size={24} className={res.color} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{res.label}</h3>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">{res.summary}</p>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* ── Expandable panel ── */}
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ maxHeight: isOpen ? "1000px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
                      <h4 className="text-xl font-bold font-[family-name:var(--font-display)] mb-6 text-[var(--text-primary)]">
                        {res.content.heading}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {res.content.sections.map((sec) => (
                          <GlassCard key={sec.title} className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                              <sec.icon size={20} style={{ color: sec.color }} />
                              <h5 className="font-semibold text-[var(--text-primary)]">{sec.title}</h5>
                            </div>
                            <ul className="space-y-2">
                              {sec.items.map((item, i) => (
                                <li key={i} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                                  <ArrowRight size={14} className="shrink-0 mt-0.5" style={{ color: sec.color }} />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </GlassCard>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

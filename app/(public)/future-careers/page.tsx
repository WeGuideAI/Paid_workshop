"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { Briefcase, Code, TerminalSquare, Compass, Cpu, TrendingUp } from "lucide-react";

const careers = [
  {
    title: "AI Prompt Engineer",
    icon: TerminalSquare,
    description: "The architects of AI interaction. They craft complex, optimized text prompts to generate specific, high-quality outputs from language models for marketing, coding, and creative writing.",
    salary: "High Demand",
    skills: ["Linguistics", "Logic", "Domain Expertise"]
  },
  {
    title: "AI Ethics Officer",
    icon: Compass,
    description: "Ensures AI systems are fair, unbiased, and comply with data privacy laws. They audit algorithms for unintended discrimination and establish corporate AI guidelines.",
    salary: "Emerging Field",
    skills: ["Philosophy", "Law", "Data Science"]
  },
  {
    title: "Robotics/Edge AI Technician",
    icon: Cpu,
    description: "Maintains and programs the physical bridge between AI brains and mechanical bodies. They deploy lightweight neural networks onto local hardware for autonomous drones and factory robots.",
    salary: "High Growth",
    skills: ["C++", "Hardware", "Neural Networks"]
  },
  {
    title: "AI Integrator / Consultant",
    icon: Briefcase,
    description: "Helps traditional businesses adopt AI tools. They analyze a company's workflow, identify bottlenecks, and implement AI solutions to automate repetitive tasks.",
    salary: "Highly Lucrative",
    skills: ["Business Analysis", "API Integration", "Project Management"]
  }
];

export default function FutureCareersPage() {
  return (
    <div className="page-enter pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-400 border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.06)] mb-4">
              <TrendingUp size={14} />
              The Future of Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6">
              Future <span className="text-amber-400">Careers in AI</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
              AI isn't just replacing jobs; it's creating entirely new categories of work. The skills you learn in our workshops directly map to the most sought-after careers of the next decade.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careers.map((career) => (
            <ScrollReveal key={career.title}>
              <GlassCard hover className="h-full flex flex-col p-8 border-[rgba(251,191,36,0.1)] hover:border-[rgba(251,191,36,0.3)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[rgba(251,191,36,0.1)] text-amber-400">
                    <career.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
                      {career.title}
                    </h3>
                    <p className="text-sm font-mono text-amber-400/80 uppercase tracking-wider mt-1">
                      {career.salary}
                    </p>
                  </div>
                </div>
                
                <p className="text-[var(--text-muted)] leading-relaxed mb-8 flex-1">
                  {career.description}
                </p>
                
                <div>
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Core Skills Required
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-md text-xs font-medium bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[var(--text-primary)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

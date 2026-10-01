"use client";

import { ScrollReveal } from "./ui/AnimatedBackground";
import { GlassCard } from "./ui/GlassCard";
import { Stethoscope, GraduationCap, PenTool, Code2, Factory, BrainCircuit, Rocket, ArrowRight } from "lucide-react";

const applications = [
  {
    icon: Stethoscope,
    title: "Healthcare & Diagnostics",
    description: "AI analyzes medical imaging faster than humanly possible, detecting anomalies early and accelerating drug discovery through protein folding simulations.",
    tag: "Life-saving",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: GraduationCap,
    title: "Personalized Education",
    description: "Adaptive learning algorithms adjust pacing and content for every student, acting as a 24/7 personalized tutor that identifies specific knowledge gaps.",
    tag: "Future-ready",
    gradient: "from-purple-500 to-indigo-400",
  },
  {
    icon: PenTool,
    title: "Creative Arts & Design",
    description: "Generative AI augments human creativity, allowing artists and designers to rapidly prototype visuals, compose music, and iterate on concepts in seconds.",
    tag: "Augmented Creativity",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Factory,
    title: "Robotics & Automation",
    description: "Computer vision and reinforcement learning enable autonomous systems to navigate warehouses, assemble products, and perform precision tasks safely.",
    tag: "Efficiency",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description: "AI coding assistants suggest entire functions, write unit tests, and debug complex architectures, drastically reducing development cycles.",
    tag: "Productivity",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: Rocket,
    title: "Aerospace & Climate",
    description: "Machine learning optimizes flight paths for fuel efficiency and models complex climate systems to predict weather patterns and natural disasters.",
    tag: "Global Impact",
    gradient: "from-[var(--ocean-700)] to-[var(--ocean-500)]",
  }
];

export function RealWorldApps() {
  return (
    <section className="py-24 px-4 relative z-10 border-t border-[rgba(255,255,255,0.02)]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#818cf8] border border-[rgba(129,140,248,0.2)] bg-[rgba(129,140,248,0.06)] mb-4">
              <BrainCircuit size={14} />
              Beyond the Hype
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
              Real-World <span className="gradient-text">Applications</span>
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
              AI is no longer science fiction. It is actively transforming every major industry globally, creating entirely new career paths and solving complex human problems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <ScrollReveal key={app.title}>
              <GlassCard hover className="h-full relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${app.gradient} opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${app.gradient} bg-opacity-10 shadow-lg`}>
                      <app.icon size={24} className="text-white" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[rgba(255,255,255,0.03)] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.05)]">
                      {app.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3 text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-colors">
                    {app.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {app.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--ocean-500)] group-hover:translate-x-2 transition-transform duration-300">
                    Explore Implementation <ArrowRight size={14} />
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

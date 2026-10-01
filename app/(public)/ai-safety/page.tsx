"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { ShieldAlert, ShieldCheck, EyeOff, Scale, UserX, AlertTriangle, Fingerprint, Lock } from "lucide-react";

const ethicsPrinciples = [
  {
    icon: EyeOff,
    title: "Data Privacy & Footprints",
    description: "Every prompt you enter trains future models. Learn how to sanitize personal information, opt out of data collection, and protect your family's digital footprint when using LLMs.",
    color: "text-rose-400"
  },
  {
    icon: Scale,
    title: "Algorithmic Bias",
    description: "AI models inherit human prejudices from their training data. We teach students how to identify biased outputs in generative AI and cross-reference automated decisions.",
    color: "text-amber-400"
  },
  {
    icon: UserX,
    title: "Deepfakes & Misinformation",
    description: "With voice cloning and photorealistic image generation, seeing is no longer believing. Learn the technical tells of deepfakes and how to verify digital authenticity.",
    color: "text-purple-400"
  },
  {
    icon: AlertTriangle,
    title: "Over-Reliance & Deskilling",
    description: "If AI writes every essay, what happens to critical thinking? We emphasize 'AI as a co-pilot, not an autopilot' to ensure core cognitive skills aren't lost to automation.",
    color: "text-orange-400"
  }
];

export default function AISafetyPage() {
  return (
    <div className="page-enter pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-rose-400 border border-[rgba(244,63,94,0.2)] bg-[rgba(244,63,94,0.06)] mb-4">
              <ShieldAlert size={14} />
              Critical Awareness
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)] mb-6">
              AI Safety & <span className="text-rose-400">Ethics Guide</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg leading-relaxed">
              Powerful tools require responsible operators. Understanding the risks, biases, and ethical implications of Artificial Intelligence is just as important as knowing how to use it.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {ethicsPrinciples.map((principle) => (
            <ScrollReveal key={principle.title}>
              <GlassCard hover className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border-[rgba(244,63,94,0.1)] hover:border-[rgba(244,63,94,0.3)]">
                <div className={`p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${principle.color} shrink-0`}>
                  <principle.icon size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-3 text-[var(--text-primary)]">
                    {principle.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#0f172a] to-[#020617] border border-[rgba(34,197,94,0.2)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} className="text-green-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] text-green-400 mb-4">Our Commitment in Workshops</h3>
              <p className="text-[var(--text-muted)] leading-relaxed max-w-2xl mb-6">
                Every WeGuide workshop includes a mandatory module on Digital Citizenship & AI Ethics. We don't just teach you how to write the perfect prompt; we teach you when it's appropriate to use AI and when human judgment must take the wheel.
              </p>
              <div className="flex gap-4 text-sm font-medium text-green-400">
                <span className="flex items-center gap-2"><Fingerprint size={16} /> Privacy First</span>
                <span className="flex items-center gap-2"><Lock size={16} /> Secure Models</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

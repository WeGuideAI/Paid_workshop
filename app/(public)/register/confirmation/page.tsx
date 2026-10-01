"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <ScrollReveal>
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center border border-[rgba(34,197,94,0.2)]">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
          Registration <span className="gradient-text">Submitted!</span>
        </h1>
        
        <p className="text-[var(--text-muted)] text-lg mb-8 max-w-xl mx-auto">
          Thank you for registering. We've received your details and your payment information.
        </p>

        <GlassCard glow className="p-8 mb-8 text-left max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 text-center border-b border-[var(--border-glass)] pb-4">
            What Happens Next?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
              <div className="w-6 h-6 rounded-full bg-[rgba(14,165,233,0.1)] text-[var(--ocean-500)] flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <p>Our team will manually verify your payment transaction ID within 24 hours.</p>
            </li>
            <li className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
              <div className="w-6 h-6 rounded-full bg-[rgba(14,165,233,0.1)] text-[var(--ocean-500)] flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <p>Once verified, you will receive a confirmation email with workshop joining details.</p>
            </li>
          </ul>

          {id && (
            <div className="mt-6 pt-4 border-t border-[var(--border-glass)] text-center">
              <p className="text-xs text-[var(--text-muted)] mb-1">Registration Reference ID</p>
              <code className="text-sm font-mono text-[var(--foam-400)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                {id}
              </code>
            </div>
          )}
        </GlassCard>

        <Link href="/">
          <GradientButton variant="outline">
            Return to Home
            <ArrowRight size={18} />
          </GradientButton>
        </Link>
      </ScrollReveal>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[var(--ocean-500)] border-t-transparent animate-spin" /></div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

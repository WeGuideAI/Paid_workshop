"use client";

import { useState } from "react";
import { Send, ShieldCheck, HelpCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { submitSupportRequest } from "@/app/actions/support";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await submitSupportRequest({ name, email, message });
    
    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setError(result.error || "Failed to submit request.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--ocean-700)] to-[var(--ocean-500)] mb-6 shadow-[0_8px_30px_rgba(14,165,233,0.3)]">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
            Have a <span className="gradient-text">Doubt?</span>
          </h1>
          <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
            Whether it's about the workshop content, payment issues, or registration details, 
            we're here to help. Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <GlassCard className="p-8 max-w-2xl mx-auto">
          {success ? (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center border border-[rgba(34,197,94,0.2)] mx-auto mb-4">
                <ShieldCheck size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                Message Sent Successfully
              </h3>
              <p className="text-[var(--text-muted)] mb-6">
                Thank you for reaching out. Our team will review your query and respond to {email} shortly.
              </p>
              <GradientButton onClick={() => setSuccess(false)} variant="outline">
                Send Another Message
              </GradientButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm flex items-start gap-2">
                  <ShieldCheck size={18} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-glass"
                  placeholder="Enter your full name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                  How can we help you?
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-glass resize-none"
                  placeholder="Describe your question or issue in detail..."
                  disabled={loading}
                />
              </div>

              <GradientButton type="submit" fullWidth loading={loading}>
                <span>Send Message</span>
                <Send size={18} />
              </GradientButton>
            </form>
          )}
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

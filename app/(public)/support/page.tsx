"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Send,
  ShieldCheck,
  HelpCircle,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  ChevronDown,
  Clock,
  Sparkles,
  Wifi,
  Car,
  CheckCircle2,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { submitSupportRequest } from "@/app/actions/support";

const faqs = [
  {
    q: "What is the fee and duration of the workshop?",
    a: "Each workshop is an intensive, interactive 3-hour session. The entry pass is available at an affordable community rate of just ₹199 per participant.",
  },
  {
    q: "Do I need any coding or prior technical knowledge?",
    a: "No prior technical or coding experience is required! The sessions are 100% beginner-friendly, taught in simple, accessible language with live practical demonstrations.",
  },
  {
    q: "Where is the workshop venue located?",
    a: "All sessions are conducted in-person at the WeGuide Robotics Lab, 2nd Floor, Orchid Mall, 966 National Highway, Sekharipuram, Kalpathy, Palakkad, Kerala — 678003.",
  },
  {
    q: "Who can attend the workshops?",
    a: "We have three tailored tracks: School Students (Grade 6–12 & college), Parents (focused on digital safety and everyday AI), and Teachers (focused on lesson planning and workload reduction).",
  },
  {
    q: "What should I bring to the workshop?",
    a: "Just bring your enthusiasm to learn! You can also bring your laptop, tablet, or smartphone if you would like to follow along and test live prompts during the session. High-speed Wi-Fi is provided.",
  },
  {
    q: "Will I receive a certificate of participation?",
    a: "Yes! Every participant who completes the 3-hour workshop receives an official verified Certificate of Participation from WeGuide.",
  },
  {
    q: "Can parents and children register together?",
    a: "Absolutely. Parents and students can register for their respective tracks. Many families choose to attend so parents and kids can share a common understanding of modern AI tools.",
  },
  {
    q: "Can schools or institutions arrange private batches?",
    a: "Yes. We frequently conduct institutional batches for schools, colleges, and educator groups. Reach out to us via the contact form below or call +91 75939 93975 to schedule an institutional session.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

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
    <div className="max-w-5xl mx-auto py-16 px-4 space-y-16">
      {/* ═══════ HERO HEADER ═══════ */}
      <ScrollReveal>
        <div className="text-center pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-[#4DA3FF] mb-5">
            <Sparkles size={14} />
            <span>VENUE, FAQ &amp; SUPPORT HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] mb-4 text-white">
            Workshop Venue &amp; <span className="gradient-text">FAQs</span>
          </h1>
          <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Find complete location directions, batch timings, answers to common
            questions, and direct support for your workshop registration.
          </p>
        </div>
      </ScrollReveal>

      {/* ═══════ SECTION 1: VENUE & DIRECTIONS ═══════ */}
      <section id="venue" className="scroll-mt-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#075985] to-[#0ea5e9] text-white shadow-md">
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Lab &amp; Workshop Venue
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                In-person hands-on training center in Palakkad
              </p>
            </div>
          </div>

          <GlassCard className="p-6 sm:p-8 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Address details */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-500/15 text-[#4DA3FF] border border-blue-500/30 mb-2">
                    Official Location
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    WeGuide Robotics Lab
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                    2nd Floor, Orchid Mall, 966 National Highway,
                    <br />
                    Sekharipuram, Kalpathy, Palakkad, Kerala — 678003
                  </p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                    <Clock size={16} className="text-[#087CF4] shrink-0" />
                    <span>3-Hour Interactive Sessions</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                    <Wifi size={16} className="text-[#087CF4] shrink-0" />
                    <span>High-Speed Wi-Fi Provided</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                    <Car size={16} className="text-[#087CF4] shrink-0" />
                    <span>Mall Parking on NH 966</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                    <CheckCircle2 size={16} className="text-[#087CF4] shrink-0" />
                    <span>Live Hardware Demonstrations</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-glass)]">
                  <a
                    href="https://maps.google.com/?q=Orchid+Mall+Sekharipuram+Kalpathy+Palakkad+Kerala+678003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#087CF4] hover:bg-[#0066cc] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:scale-105 transition-all"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={15} />
                  </a>

                  <a
                    href="tel:+917593993975"
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full transition-all"
                  >
                    <Phone size={15} className="text-[#4DA3FF]" />
                    <span>+91 75939 93975</span>
                  </a>

                  <a
                    href="mailto:info@weguide.co.in"
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full transition-all"
                  >
                    <Mail size={15} className="text-[#4DA3FF]" />
                    <span>info@weguide.co.in</span>
                  </a>
                </div>
              </div>

              {/* Map visual card */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-5 bg-[#0a1122]/90 border border-blue-500/20 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                      Landmark &amp; Transit
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Conveniently located directly along the Palakkad Highway (NH 966) at Orchid Mall, easily accessible via bus and local transit from Kalpathy and Palakkad Town.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs text-blue-200">
                      💡 <strong>Tip for attendees:</strong> Please arrive 10 minutes prior to your batch start time for registration desk check-in.
                    </p>
                  </div>
                  <Link href="/register">
                    <GradientButton fullWidth size="sm">
                      Claim Entry Pass • ₹199
                    </GradientButton>
                  </Link>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* ═══════ SECTION 2: FREQUENTLY ASKED QUESTIONS ═══════ */}
      <section id="faq" className="scroll-mt-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#0353a4] to-[#087CF4] text-white shadow-md">
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Quick answers to common questions about our workshop
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: isOpen
                      ? "rgba(14,165,233,0.4)"
                      : "rgba(255,255,255,0.06)",
                    background: isOpen
                      ? "rgba(14,165,233,0.04)"
                      : "rgba(255,255,255,0.02)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--ocean-500)] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[var(--text-muted)] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[var(--ocean-500)]" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed border-t border-[rgba(255,255,255,0.04)]">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════ SECTION 3: HAVE A DOUBT / CONTACT FORM ═══════ */}
      <section id="contact" className="scroll-mt-28">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#087CF4] to-[#22d3ee] text-white shadow-md">
              <Send size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Have a Doubt? Ask Us Directly
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Send a question to our coordinator team — we reply within 24 hours
              </p>
            </div>
          </div>

          <GlassCard className="p-6 sm:p-8 max-w-3xl">
            {success ? (
              <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.1)] flex items-center justify-center border border-[rgba(34,197,94,0.2)] mx-auto mb-4">
                  <ShieldCheck size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Message Sent Successfully
                </h3>
                <p className="text-[var(--text-muted)] mb-6 text-sm">
                  Thank you for reaching out. Our team will review your query and respond shortly.
                </p>
                <GradientButton onClick={() => setSuccess(false)} variant="outline">
                  Send Another Message
                </GradientButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm flex items-start gap-2">
                    <ShieldCheck size={18} className="shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-glass w-full"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-glass w-full"
                      placeholder="you@example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Your Question or Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input-glass w-full resize-none"
                    placeholder="Ask about batches, curriculum, group bookings, or payment issues..."
                    disabled={loading}
                  />
                </div>

                <GradientButton type="submit" fullWidth loading={loading}>
                  <span>Send Message</span>
                  <Send size={16} />
                </GradientButton>
              </form>
            )}
          </GlassCard>
        </ScrollReveal>
      </section>
    </div>
  );
}

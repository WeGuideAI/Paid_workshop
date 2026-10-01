"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { GradientButton } from "@/components/ui/GradientButton";
import Link from "next/link";
import {
  Info,
  Target,
  BookOpen,
  Microscope,
  Cpu,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Lightbulb,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page-enter pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* ── Hero ── */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--ocean-500)] border border-[rgba(14,165,233,0.2)] bg-[rgba(14,165,233,0.06)] mb-5">
              <Info size={14} />
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] mb-6">
              About <span className="gradient-text">WE Guide</span>
            </h1>
            <p className="text-[var(--text-muted)] text-lg max-w-3xl mx-auto leading-relaxed">
              An innovative educational startup dedicated to discovering the unique abilities of each student and guiding them to transform their passion into a fulfilling profession.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Company Overview ── */}
        <ScrollReveal>
          <GlassCard className="p-8 md:p-12 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[var(--ocean-500)] to-transparent opacity-[0.04] rounded-bl-full pointer-events-none" />
            <div className="relative z-10 space-y-5 text-[var(--text-muted)] text-lg leading-relaxed">
              <p>
                <strong className="text-[var(--text-primary)]">WE Guide</strong> is an innovative educational startup dedicated to discovering the unique abilities of each student and guiding them to transform their passion into a fulfilling profession.
              </p>
              <p>
                Registered under <strong className="text-[var(--foam-400)]">SAR Eduventures Private Limited</strong>, WE Guide operates from its headquarters in Palakkad, Kerala.
              </p>
              <p>
                Our Research and Development (R&D) Team is fully committed to exploring the most effective methods to identify and nurture individual student strengths through various activities and programs.
              </p>
              <div className="pt-4 border-t border-[var(--border-glass)]">
                <p className="text-base font-semibold text-[var(--text-primary)] mb-4">WE Guide offers three core initiatives:</p>
                <ul className="space-y-3">
                  {[
                    { icon: Target, label: "WE Guide Lab System", desc: "A hands-on, career-oriented lab setup in schools." },
                    { icon: BookOpen, label: "Career-Based Academic Coaching", desc: "Personalized academic guidance aligned with career goals." },
                    { icon: Microscope, label: "Technical Research and Development", desc: "Advanced technical training and project-based learning opportunities." },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[var(--ocean-500)] shrink-0 mt-1" />
                      <span><strong className="text-[var(--text-primary)]">{item.label}</strong> – {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="pt-4 border-t border-[var(--border-glass)]">
                With WE Guide, we aim to create a pathway where students can excel academically while laying a strong foundation for their future careers.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* ── WE Guide Lab System ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#075985] to-[#0ea5e9] shadow-lg">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
                WE Guide <span className="gradient-text">Lab System</span>
              </h2>
            </div>
            <GlassCard hover className="p-8 border-[rgba(14,165,233,0.1)] hover:border-[rgba(14,165,233,0.3)]">
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
                <p>
                  The WE Guide Lab System is a specially designed program for schools, catering to students from <strong className="text-[var(--text-primary)]">1st to 12th grade</strong>. This innovative lab system is established in collaboration with schools to nurture students in{" "}
                  <strong className="text-[var(--ocean-500)]">skill development, character building, science, career exploration, and technology</strong>.
                </p>
                <p>
                  Our program features a team of specially trained teachers, who monitor and guide students, helping them identify their interests across various fields. Through motivation and targeted guidance, students are encouraged to focus and excel in their areas of interest.
                </p>
                <p>
                  The syllabus is crafted to provide students with hands-on experience in different domains, enabling them to discover their true passion. Additionally, our{" "}
                  <strong className="text-[var(--text-primary)]">dedicated counseling team</strong> interacts with students regularly during the program to assess their interests and provide personalized guidance.
                </p>
                <div className="pt-4 border-t border-[var(--border-glass)]">
                  <p className="text-[var(--ocean-500)] font-medium">
                    The WE Guide Lab System aims to unlock each student's potential, paving the way for academic success and career clarity.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ── Cutting-Edge Technologies ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#818cf8] shadow-lg">
                <Cpu size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
                Cutting-Edge <span className="text-[#818cf8]">Technologies</span> and Career Preparation
              </h2>
            </div>
            <GlassCard hover className="p-8 border-[rgba(129,140,248,0.1)] hover:border-[rgba(129,140,248,0.3)]">
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
                <p>
                  At WE Guide, we expose students to top technologies such as{" "}
                  <strong className="text-[var(--text-primary)]">Electronics, Mechatronics, Web Designing, Networking, 3D Printing, Artificial Intelligence, and Data Science</strong>. Our labs are well-equipped with modern tools, and students are guided by dedicated trainers who specialize in these fields.
                </p>
                <p>
                  In addition to technical training, we help students identify their interests in high-demand career paths, including{" "}
                  <strong className="text-[#818cf8]">Engineering, Medicine, Financial Management, and Civil Services</strong>. For students aspiring to these fields, we provide specialized training for competitive exams like{" "}
                  <strong className="text-[var(--text-primary)]">JEE, NEET, CA, and Civil Service Exams</strong>, ensuring they are well-prepared to achieve their goals.
                </p>
                <div className="pt-4 border-t border-[var(--border-glass)]">
                  <p className="text-[#818cf8] font-medium">
                    With WE Guide, students gain a solid foundation in both technology and academics, enabling them to excel in their chosen careers.
                  </p>
                </div>
              </div>

              {/* Tech tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {["Electronics", "Mechatronics", "Web Design", "Networking", "3D Printing", "Artificial Intelligence", "Data Science"].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium rounded-lg bg-[rgba(129,140,248,0.08)] border border-[rgba(129,140,248,0.15)] text-[#818cf8]">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ── Career-Based Academic Tuition ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#22d3ee] shadow-lg">
                <BookOpen size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
                Career-Based <span className="text-[#22d3ee]">Academic Tuition</span>
              </h2>
            </div>
            <GlassCard hover className="p-8 border-[rgba(34,211,238,0.1)] hover:border-[rgba(34,211,238,0.3)]">
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
                <p>
                  At WE Guide, we provide comprehensive <strong className="text-[var(--text-primary)]">academic support</strong> to students through both <strong className="text-[var(--text-primary)]">online and offline</strong> platforms. Our unique <strong className="text-[var(--foam-400)]">one-teacher, one-student</strong> approach ensures personalized attention, allowing us to identify each student's strengths and weaknesses.
                </p>
                <p>
                  This method enables us to guide them effectively, helping them achieve the best results in their academics.
                </p>
                <p>
                  Our academic research team has designed specialized courses to help students discover their interests in various subjects. These courses not only enhance their academic performance but also align their studies with their career aspirations.
                </p>
                <div className="pt-4 border-t border-[var(--border-glass)]">
                  <p className="text-[#22d3ee] font-medium">
                    With WE Guide's career-based academic tuition, students receive tailored guidance that fosters both academic excellence and a clear pathway to their future goals.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ── Technical Research and Development ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#10b981] to-[#34d399] shadow-lg">
                <FlaskConical size={28} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
                Technical Research <span className="text-emerald-400">and Development</span>
              </h2>
            </div>
            <GlassCard hover className="p-8 border-[rgba(16,185,129,0.1)] hover:border-[rgba(16,185,129,0.3)]">
              <div className="space-y-5 text-[var(--text-muted)] leading-relaxed">
                <p>
                  At WE Guide, we provide students with the facilities and resources to explore and learn various technologies through both <strong className="text-[var(--text-primary)]">online and offline</strong> platforms. Students are encouraged to share their ideas, and our team of experienced experts is dedicated to assisting and supporting them throughout their research and development journey.
                </p>
                <p>
                  Our expert team, specializing in diverse fields, offers comprehensive guidance to help students refine their ideas, develop innovative solutions, and gain hands-on experience.
                </p>
                <div className="pt-4 border-t border-[var(--border-glass)]">
                  <p className="text-emerald-400 font-medium">
                    With WE Guide, students receive the support and mentorship they need to excel in technical research and innovation.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal>
          <GlassCard glow className="p-10 text-center">
            <Lightbulb size={40} className="text-[var(--foam-400)] mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-3">
              Ready to Discover Your Potential?
            </h3>
            <p className="text-[var(--text-muted)] mb-8 max-w-xl mx-auto">
              Join our AI & Robotics Awareness Workshop and take your first step toward a future-proof career in technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <GradientButton size="lg">
                  Register Now — ₹199 <ArrowRight size={18} />
                </GradientButton>
              </Link>
              <Link href="/support">
                <GradientButton variant="outline" size="lg">
                  Contact Us
                </GradientButton>
              </Link>
            </div>
          </GlassCard>
        </ScrollReveal>

      </div>
    </div>
  );
}

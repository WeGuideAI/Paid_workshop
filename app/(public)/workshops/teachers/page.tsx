import { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { WorkshopDetail } from "@/components/WorkshopDetail";

export const metadata: Metadata = {
  title: "Integration of AI in School Life — For Teachers",
  description:
    "Discover how to use AI for lesson planning, assessment, differentiated instruction, and admin tasks. A 2–3 hour workshop for teachers at just ₹199.",
};

export default function TeachersWorkshopPage() {
  return (
    <WorkshopDetail
      slug="teachers"
      role="teacher"
      title="Integration of AI in School Life"
      audience="Teachers"
      tagline="Use AI to plan lessons, grade smarter, and reclaim your time"
      description="Discover how to weave AI tools into your existing workflow: lesson planning, formative assessment, differentiated instruction, and everyday admin tasks. This workshop is built by educators for educators — no jargon, no hype, just actionable strategies you can use Monday morning. Reclaim hours every week and redirect that energy toward what matters most: your students."
      icon={<BookOpen size={48} className="text-white" />}
      gradient="from-[#22d3ee] to-[#075985]"
      accentColor="#06b6d4"
      learningOutcomes={[
        "Generate lesson plans, worksheets, and rubrics in minutes instead of hours",
        "Use AI for formative assessment: quiz generation, feedback drafts, and gap analysis",
        "Create differentiated materials for diverse learning needs without doubling your workload",
        "Automate admin tasks: parent communication drafts, report card comments, timetable planning",
        "Understand AI's limitations so you can use it responsibly in an educational context",
        "Walk away with a personal AI toolkit — a list of free tools you can use starting Monday",
      ]}
      whoIsItFor={[
        "K-12 teachers of any subject who want to save time and teach better",
        "School administrators looking for practical AI integration strategies",
        "Educators who are curious about AI but unsure where to start",
        "Teachers who've tried ChatGPT but want to go deeper with purposeful use",
      ]}
      sessionStructure={[
        {
          title: "The Teacher's AI Landscape",
          description:
            "A curated overview of the tools that actually matter for educators. No hype, no product pitches — just honest assessments of what works, what's free, and what to skip.",
        },
        {
          title: "Lesson Planning & Content Creation",
          description:
            "Hands-on workshop: build a full lesson plan with AI assistance. Cover curriculum alignment, worksheet generation, quiz creation, and rubric drafting — all in real time.",
        },
        {
          title: "Assessment & Feedback at Scale",
          description:
            "How to use AI for grading support, writing personalised feedback, spotting learning gaps, and generating formative assessments without losing the human touch.",
        },
        {
          title: "Admin Efficiency & Responsible Use",
          description:
            "Automate the mundane: report cards, parent emails, documentation. Plus: a frank discussion on academic integrity, AI detection tools, and setting classroom AI policies.",
        },
      ]}
    />
  );
}

import { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { WorkshopDetail } from "@/components/WorkshopDetail";

export const metadata: Metadata = {
  title: "Prompting + Digital Portfolio Development — For Students",
  description:
    "Master AI prompting fundamentals and build your own AI-assisted digital portfolio. A 3 hour hands-on workshop for students at just ₹199.",
};

export default function StudentsWorkshopPage() {
  return (
    <WorkshopDetail
      slug="students"
      role="student"
      title="Prompting + Digital Portfolio Development"
      audience="Students"
      tagline="Master AI prompting and build your own digital portfolio"
      description="Learn the fundamentals of AI prompting — how to talk to large-language models, iterate on outputs, and evaluate quality. Then apply those skills hands-on to build a polished, AI-assisted digital portfolio or resume you can share with colleges and future employers. Walk away with a live link and the confidence to keep refining it."
      icon={<GraduationCap size={48} className="text-white" />}
      gradient="from-[#075985] to-[#0ea5e9]"
      accentColor="#0ea5e9"
      learningOutcomes={[
        "Understand how large language models work at a high level — no deep math, just a clear mental model",
        "Master the art of prompt engineering: specificity, context, chain-of-thought, and iterative refinement",
        "Build a polished personal portfolio or resume using AI-assisted content generation",
        "Learn to critically evaluate AI outputs — spotting errors, biases, and hallucinations",
        "Get a live, shareable link to your finished portfolio before you leave the session",
        "Develop a workflow for using AI tools responsibly in schoolwork and projects",
      ]}
      whoIsItFor={[
        "Students in grades 8–12 curious about AI and technology",
        "College-bound students who want to stand out with a digital portfolio",
        "Anyone who wants to learn prompt engineering from scratch",
        "Young learners who want a head-start in the AI-powered job market",
      ]}
      sessionStructure={[
        {
          title: "What Is AI, Really?",
          description:
            "A jargon-free intro to large language models, how they're trained, what they can and can't do, and why understanding this matters for your future.",
        },
        {
          title: "Prompt Engineering Masterclass",
          description:
            "Hands-on exercises: from basic prompts to advanced techniques like chain-of-thought, few-shot examples, and structured output. You'll see results improve in real time.",
        },
        {
          title: "Build Your Digital Portfolio",
          description:
            "Apply what you've learned: use AI to draft, refine, and polish a personal portfolio page. We'll guide you through design choices, content structure, and deployment.",
        },
        {
          title: "Critical Thinking & Responsible Use",
          description:
            "How to spot AI mistakes, understand bias, avoid plagiarism, and use AI as a tool — not a crutch. Leave with ethical guardrails, not just technical skills.",
        },
      ]}
    />
  );
}

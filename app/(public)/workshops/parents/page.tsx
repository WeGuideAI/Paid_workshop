import { Metadata } from "next";
import { Users } from "lucide-react";
import { WorkshopDetail } from "@/components/WorkshopDetail";

export const metadata: Metadata = {
  title: "AI Literacy + Real-Time Use Cases — For Parents",
  description:
    "Understand what AI actually is, explore everyday use cases, learn to keep your child safe online, and see how AI impacts education. A 2–3 hour workshop for parents at just ₹199.",
};

export default function ParentsWorkshopPage() {
  return (
    <WorkshopDetail
      slug="parents"
      role="parent"
      title="AI Literacy + Real-Time Use Cases"
      audience="Parents"
      tagline="Understand AI, protect your child, and use it every day"
      description="Demystify artificial intelligence in plain language: what it actually is, how it works at a high level, and where it already touches your family's daily life. Explore practical, real-time use cases — from homework help to career guidance — while learning how to keep your child safe online. Leave with a clear mental model of AI's impact on education and your child's future."
      icon={<Users size={48} className="text-white" />}
      gradient="from-[#0ea5e9] to-[#22d3ee]"
      accentColor="#22d3ee"
      learningOutcomes={[
        "Understand what AI is — and isn't — in plain, non-technical language",
        "See real demonstrations of AI tools your child is likely already using",
        "Learn practical AI use cases for everyday life: planning, shopping, health, finance",
        "Understand the risks: misinformation, deepfakes, privacy, and over-reliance",
        "Get actionable strategies for keeping your child safe in the AI age",
        "See clearly how AI is reshaping education and what it means for your child's future",
      ]}
      whoIsItFor={[
        "Parents of school-aged children (grades 1–12)",
        "Parents who've heard about AI but aren't sure what it really means",
        "Anyone concerned about AI safety and their child's digital life",
        "Parents who want to have informed conversations about technology at home",
      ]}
      sessionStructure={[
        {
          title: "AI Demystified",
          description:
            "No jargon, no equations. We'll explain what AI is, how it 'learns', and why it's different from the robots in movies. Live demonstrations make it tangible.",
        },
        {
          title: "AI in Your Daily Life",
          description:
            "From the recommendations on your phone to homework helpers your child uses — a tour of AI tools already in your life, with hands-on time to try them.",
        },
        {
          title: "Safety, Risks & Parenting in the AI Age",
          description:
            "Honest coverage of deepfakes, misinformation, data privacy, and screen time. Practical takeaways: settings to check, conversations to have, and boundaries to set.",
        },
        {
          title: "Your Child's AI-Powered Future",
          description:
            "How AI is changing education, college admissions, and the job market. What skills matter most, and how you can support your child's readiness — starting now.",
        },
      ]}
    />
  );
}

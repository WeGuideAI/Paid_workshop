import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WeGuide — AI & Robotics Awareness Workshops",
    template: "%s | WeGuide",
  },
  description:
    "Join WeGuide's AI & Robotics Awareness Workshops for students, parents, and teachers. Learn AI prompting, digital portfolios, AI literacy, and classroom integration — just ₹199.",
  keywords: [
    "AI workshop",
    "robotics",
    "AI literacy",
    "students",
    "parents",
    "teachers",
    "WeGuide",
    "AI education",
    "digital portfolio",
  ],
  openGraph: {
    title: "WeGuide — AI & Robotics Awareness Workshops",
    description:
      "Empowering schools with AI & Robotics awareness. Workshops for students, parents, and teachers at just ₹199.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

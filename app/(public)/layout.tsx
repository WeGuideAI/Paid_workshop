import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1 pt-24">{children}</main>
      <Footer />
    </>
  );
}

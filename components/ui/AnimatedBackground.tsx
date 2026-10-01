"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 tech-grid">
      {/* Ocean blob — top-left */}
      <div
        className="blob blob-ocean"
        style={{
          width: "600px",
          height: "600px",
          top: "-10%",
          left: "-5%",
          animationDuration: "18s",
        }}
      />
      {/* Foam blob — top-right */}
      <div
        className="blob blob-foam"
        style={{
          width: "500px",
          height: "500px",
          top: "10%",
          right: "-8%",
          animationDuration: "22s",
          animationDelay: "-5s",
        }}
      />
      {/* Ink blob — center */}
      <div
        className="blob blob-ink"
        style={{
          width: "800px",
          height: "800px",
          top: "30%",
          left: "30%",
          animationDuration: "25s",
          animationDelay: "-10s",
        }}
      />
      {/* Ocean blob — bottom-right */}
      <div
        className="blob blob-ocean"
        style={{
          width: "450px",
          height: "450px",
          bottom: "-5%",
          right: "10%",
          animationDuration: "20s",
          animationDelay: "-8s",
          opacity: 0.2,
        }}
      />
      {/* Foam blob — bottom-left */}
      <div
        className="blob blob-foam"
        style={{
          width: "350px",
          height: "350px",
          bottom: "5%",
          left: "5%",
          animationDuration: "16s",
          animationDelay: "-3s",
          opacity: 0.15,
        }}
      />
    </div>
  );
}

export function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}

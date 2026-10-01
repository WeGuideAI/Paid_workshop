"use client";

import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  hover = false,
  glow = false,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass ${hover ? "glass-hover cursor-pointer" : ""} ${
        glow ? "glow-ring" : ""
      } p-6 ${className}`}
    >
      {children}
    </div>
  );
}

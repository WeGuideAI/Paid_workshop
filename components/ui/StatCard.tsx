"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; label: string };
  color?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  color = "var(--ocean-500)",
}: StatCardProps) {
  return (
    <GlassCard className="relative overflow-hidden stat-shimmer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-1">{label}</p>
          <p className="text-3xl font-bold font-[family-name:var(--font-display)]" style={{ color }}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value >= 0 ? (
                <TrendingUp size={14} className="text-green-400" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend.value >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {trend.label}
              </span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-xl"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>
      </div>
      {/* Decorative gradient accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </GlassCard>
  );
}

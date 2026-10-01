"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { adminLogin } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await adminLogin({ email, password });
    
    setLoading(false);
    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 bg-[var(--bg-base)]">
      <AnimatedBackground />
      
      <GlassCard glow className="w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--ocean-700)] to-[var(--ocean-500)] flex items-center justify-center mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
            Admin Access
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Restricted area for WeGuide staff
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass"
              placeholder="admin@weguide.work"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-glass"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <GradientButton type="submit" fullWidth loading={loading} className="mt-2">
            <span>Sign In</span>
            <LogIn size={18} />
          </GradientButton>
        </form>
      </GlassCard>
    </div>
  );
}

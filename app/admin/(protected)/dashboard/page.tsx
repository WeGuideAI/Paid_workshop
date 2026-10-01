import { sql } from "@/lib/db";
import { Users, CreditCard, Laptop, BookOpen, IndianRupee } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { GlassCard } from "@/components/ui/GlassCard";

// Disable caching for admin dashboard
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats: unknown[] = [];
  try {
    stats = await sql`
      SELECT 
        w.slug AS workshop_slug,
        r.role::text,
        r.mode::text,
        r.payment_status::text,
        COUNT(*)::int AS total
      FROM registrations r
      JOIN workshops w ON w.id = r.workshop_id
      GROUP BY w.slug, r.role, r.mode, r.payment_status
    `;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    stats = [];
  }
  const typedStats = stats as {
    workshop_slug: string;
    role: string;
    mode: string;
    payment_status: string;
    total: number;
  }[];

  let totalRegistrations = 0;
  let onlineCount = 0;
  let offlineCount = 0;
  let verifiedCount = 0;
  let submittedCount = 0;
  let revenue = 0;

  const roleCount = { student: 0, parent: 0, teacher: 0 };

  typedStats?.forEach((row) => {
    totalRegistrations += row.total;
    if (row.mode === "online") onlineCount += row.total;
    else offlineCount += row.total;
    
    if (row.payment_status === "submitted") submittedCount += row.total;
    if (row.payment_status === "verified") {
      verifiedCount += row.total;
      revenue += row.total * 199;
    }

    if (row.role in roleCount) {
      roleCount[row.role as keyof typeof roleCount] += row.total;
    }
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] mb-2">
          Dashboard Overview
        </h1>
        <p className="text-[var(--text-muted)] text-sm">
          Live statistics for WeGuide workshops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Registrations"
          value={totalRegistrations}
          icon={<Users size={24} />}
          color="#0ea5e9"
        />
        <StatCard
          label="Confirmed Revenue"
          value={`₹${revenue.toLocaleString()}`}
          icon={<IndianRupee size={24} />}
          color="#22d3ee"
        />
        <StatCard
          label="Verified Payments"
          value={verifiedCount}
          icon={<CreditCard size={24} />}
          color="#4ade80"
        />
        <StatCard
          label="Awaiting Verification"
          value={submittedCount}
          icon={<CreditCard size={24} />}
          color="#fbbf24"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
            Registrations by Audience
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(14,165,233,0.1)] flex items-center justify-center">
                  <BookOpen size={18} className="text-[var(--ocean-500)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Students</p>
                  <p className="text-xs text-[var(--text-muted)]">Prompting + Portfolios</p>
                </div>
              </div>
              <span className="text-lg font-bold">{roleCount.student}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(34,211,238,0.1)] flex items-center justify-center">
                  <Users size={18} className="text-[var(--foam-400)]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Parents</p>
                  <p className="text-xs text-[var(--text-muted)]">AI Literacy</p>
                </div>
              </div>
              <span className="text-lg font-bold">{roleCount.parent}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(74,222,128,0.1)] flex items-center justify-center">
                  <BookOpen size={18} className="text-[#4ade80]" />
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Teachers</p>
                  <p className="text-xs text-[var(--text-muted)]">School Integration</p>
                </div>
              </div>
              <span className="text-lg font-bold">{roleCount.teacher}</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
            Session Mode Split
          </h2>
          <div className="flex items-center gap-8 h-[200px] justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[12px] border-[var(--ocean-500)] opacity-20"></div>
                <div className="z-10 text-center">
                  <Laptop size={24} className="mx-auto text-[var(--ocean-500)] mb-1" />
                  <span className="text-2xl font-bold">{onlineCount}</span>
                </div>
              </div>
              <span className="text-sm font-medium text-[var(--text-muted)]">Online</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[12px] border-[var(--foam-400)] opacity-20"></div>
                <div className="z-10 text-center">
                  <Users size={24} className="mx-auto text-[var(--foam-400)] mb-1" />
                  <span className="text-2xl font-bold">{offlineCount}</span>
                </div>
              </div>
              <span className="text-sm font-medium text-[var(--text-muted)]">Offline</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

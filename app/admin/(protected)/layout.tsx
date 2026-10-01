import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth/admin-session";
import Link from "next/link";
import { LayoutDashboard, Users, MessageSquare, LogOut, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("weguide_admin_session")?.value;
    if (!token) return false;
    await verifyAdminSession(token);
    return true;
  } catch {
    return false;
  }
}

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] flex flex-col md:flex-row">
      {/* Sidebar — shown only after login */}
      <aside className="w-full md:w-64 bg-[rgba(255,255,255,0.02)] border-r border-[var(--border-glass)] flex flex-col shrink-0">
        <div className="p-6 border-b border-[var(--border-glass)] flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[rgba(8,124,244,0.1)]">
            <Shield size={20} className="text-[var(--ocean-500)]" />
          </div>
          <div>
            <h2 className="font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
              Admin Portal
            </h2>
            <p className="text-xs text-[var(--text-muted)]">WeGuide Platform</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(8,124,244,0.08)] transition-colors"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            href="/admin/registrations"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(8,124,244,0.08)] transition-colors"
          >
            <Users size={18} />
            Registrations
          </Link>
          <Link
            href="/admin/support"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(8,124,244,0.08)] transition-colors"
          >
            <MessageSquare size={18} />
            Support Queue
          </Link>
        </nav>

        <div className="p-4 border-t border-[var(--border-glass)]">
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center w-full gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-[rgba(239,68,68,0.08)] transition-colors"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { getSupportRequests, updateSupportStatus } from "@/app/actions/admin-data";

export default function SupportQueuePage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("open");

  const loadData = async () => {
    setLoading(true);
    const data = await getSupportRequests();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'in_progress' | 'resolved') => {
    const res = await updateSupportStatus(id, status);
    if (res.success) {
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    } else {
      alert(res.error);
    }
  };

  const filteredRequests = requests.filter(r => {
    if (statusFilter === "all") return true;
    if (statusFilter === "open") return r.status === "open" || r.status === "in_progress";
    return r.status === statusFilter;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] mb-2">
            Support Queue
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Manage and resolve user queries and doubts.
          </p>
        </div>
        <div className="flex bg-[rgba(255,255,255,0.04)] rounded-lg p-1 border border-[var(--border-glass)]">
          <button
            onClick={() => setStatusFilter("open")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === "open" ? "bg-[rgba(255,255,255,0.1)] text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setStatusFilter("resolved")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === "resolved" ? "bg-[rgba(255,255,255,0.1)] text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Resolved
          </button>
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              statusFilter === "all" ? "bg-[rgba(255,255,255,0.1)] text-[var(--text-primary)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-12 text-[var(--text-muted)]">Loading support requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">No support requests found matching the current filter.</div>
        ) : (
          filteredRequests.map((req) => (
            <GlassCard key={req.id} className="p-5 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{req.name}</h3>
                  <span className={`badge badge-${req.status.replace('_', '-')}`}>
                    {req.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] ml-auto">
                    {new Date(req.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-[var(--ocean-500)] mb-3">{req.email}</p>
                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-sm text-[var(--text-primary)] whitespace-pre-wrap">
                  {req.message}
                </div>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                {req.status === 'open' && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, 'in_progress')}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[rgba(251,191,36,0.1)] text-[#fbbf24] hover:bg-[rgba(251,191,36,0.2)] transition-colors text-sm font-medium"
                  >
                    <Clock size={16} />
                    Mark In Progress
                  </button>
                )}
                {(req.status === 'open' || req.status === 'in_progress') && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, 'resolved')}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[rgba(34,197,94,0.1)] text-green-500 hover:bg-[rgba(34,197,94,0.2)] transition-colors text-sm font-medium"
                  >
                    <CheckCircle size={16} />
                    Mark Resolved
                  </button>
                )}
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}

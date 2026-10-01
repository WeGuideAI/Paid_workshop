"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Download, Search, CheckCircle, XCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { getRegistrations, updatePaymentStatus } from "@/app/actions/admin-data";

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadData = async () => {
    setLoading(true);
    const data = await getRegistrations();
    setRegistrations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, status: 'verified' | 'rejected') => {
    const res = await updatePaymentStatus(id, status);
    if (res.success) {
      setRegistrations(registrations.map(r => r.id === id ? { ...r, payment_status: status } : r));
    } else {
      alert(res.error);
    }
  };

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || r.role === roleFilter;
    const matchesStatus = statusFilter === "all" || r.payment_status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const exportCSV = () => {
    const csvData = filteredRegistrations.map(r => ({
      ID: r.id,
      Date: new Date(r.created_at).toLocaleDateString(),
      Name: r.full_name,
      Email: r.email,
      Phone: r.phone,
      Role: r.role,
      Workshop: r.workshops?.title,
      Mode: r.mode,
      PaymentStatus: r.payment_status,
      TransactionID: r.transaction_id || 'N/A',
      Amount: r.amount,
      // specific fields
      StudentSchool: r.student_school_name || '',
      StudentClass: r.student_standard || '',
      ParentHasChild: r.has_school_child ? 'Yes' : 'No',
      ChildName: r.child_name || '',
      ChildClass: r.child_standard || '',
      ChildSchool: r.child_school_name || '',
      TeacherSchool: r.teacher_school_name || '',
      TeacherSubject: r.teacher_subject || ''
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `weguide_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    return (
      <span className={`badge badge-${status.replace('_', '-')}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] mb-2">
            Registrations
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            Manage attendees and verify payments.
          </p>
        </div>
        <GradientButton onClick={exportCSV} variant="outline">
          <Download size={16} />
          <span>Export CSV</span>
        </GradientButton>
      </div>

      <GlassCard className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input 
              type="text" 
              placeholder="Search by name, email, or transaction ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-glass pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="input-glass"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-glass"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-0 overflow-hidden overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name & Contact</th>
              <th>Role / Workshop</th>
              <th>Mode</th>
              <th>Payment Info</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-[var(--text-muted)]">
                  Loading registrations...
                </td>
              </tr>
            ) : filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-[var(--text-muted)]">
                  No registrations found matching your filters.
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((reg) => (
                <tr key={reg.id}>
                  <td className="whitespace-nowrap text-xs text-[var(--text-muted)]">
                    {new Date(reg.created_at).toLocaleDateString()}<br/>
                    {new Date(reg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </td>
                  <td>
                    <div className="font-medium text-[var(--text-primary)]">{reg.full_name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{reg.email}</div>
                    <div className="text-xs text-[var(--text-muted)]">{reg.phone}</div>
                  </td>
                  <td>
                    <span className="capitalize font-medium text-[var(--ocean-500)] text-sm">{reg.role}</span>
                    <div className="text-xs text-[var(--text-muted)] truncate max-w-[200px]" title={reg.workshops?.title}>
                      {reg.workshops?.title}
                    </div>
                  </td>
                  <td>
                    <span className="capitalize text-sm">{reg.mode}</span>
                  </td>
                  <td>
                    <div className="text-sm">₹{reg.amount}</div>
                    {reg.transaction_id ? (
                      <code className="text-xs text-[var(--foam-400)] bg-[rgba(255,255,255,0.05)] px-1 py-0.5 rounded">
                        {reg.transaction_id}
                      </code>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)]">No TXN ID</span>
                    )}
                  </td>
                  <td>
                    <StatusBadge status={reg.payment_status} />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {reg.payment_status === 'submitted' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(reg.id, 'verified')}
                            className="p-1.5 rounded bg-[rgba(34,197,94,0.1)] text-green-500 hover:bg-[rgba(34,197,94,0.2)] transition-colors"
                            title="Verify Payment"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(reg.id, 'rejected')}
                            className="p-1.5 rounded bg-[rgba(239,68,68,0.1)] text-red-500 hover:bg-[rgba(239,68,68,0.2)] transition-colors"
                            title="Reject Payment"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

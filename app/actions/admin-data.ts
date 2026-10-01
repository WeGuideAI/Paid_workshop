"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getRegistrations() {
  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select(`
      *,
      workshops ( title, slug )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
  return data;
}

export async function updatePaymentStatus(id: string, status: 'verified' | 'rejected') {
  const { error } = await supabaseAdmin
    .from("registrations")
    .update({ payment_status: status })
    .eq("id", id);
    
  if (error) {
    console.error("Error updating payment status:", error);
    return { success: false, error: "Failed to update status" };
  }
  return { success: true };
}

export async function getSupportRequests() {
  const { data, error } = await supabaseAdmin
    .from("support_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching support requests:", error);
    return [];
  }
  return data;
}

export async function updateSupportStatus(id: string, status: 'in_progress' | 'resolved') {
  const updateData: { status: string; resolved_at?: string } = { status };
  if (status === 'resolved') {
    updateData.resolved_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin
    .from("support_requests")
    .update(updateData)
    .eq("id", id);
    
  if (error) {
    console.error("Error updating support status:", error);
    return { success: false, error: "Failed to update status" };
  }
  return { success: true };
}

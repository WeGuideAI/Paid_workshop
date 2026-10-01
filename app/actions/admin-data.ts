"use server";

import { sql } from "@/lib/db";

export async function getRegistrations() {
  try {
    const data = await sql`
      SELECT 
        r.*,
        json_build_object('title', w.title, 'slug', w.slug) AS workshops
      FROM registrations r
      JOIN workshops w ON w.id = r.workshop_id
      ORDER BY r.created_at DESC
    `;
    return data;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
}

export async function updatePaymentStatus(id: string, status: "verified" | "rejected") {
  try {
    await sql`
      UPDATE registrations
      SET payment_status = ${status}::payment_status
      WHERE id = ${id}::uuid
    `;
    return { success: true };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function getSupportRequests() {
  try {
    const data = await sql`
      SELECT * FROM support_requests
      ORDER BY created_at DESC
    `;
    return data;
  } catch (error) {
    console.error("Error fetching support requests:", error);
    return [];
  }
}

export async function updateSupportStatus(id: string, status: "in_progress" | "resolved") {
  try {
    if (status === "resolved") {
      await sql`
        UPDATE support_requests
        SET status = ${status}::support_status,
            resolved_at = NOW()
        WHERE id = ${id}::uuid
      `;
    } else {
      await sql`
        UPDATE support_requests
        SET status = ${status}::support_status
        WHERE id = ${id}::uuid
      `;
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating support status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

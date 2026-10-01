"use server";

import { sql } from "@/lib/db";
import { supportSchema } from "@/lib/validations/registration";
import { z } from "zod";

export async function submitSupportRequest(formData: unknown) {
  try {
    const raw = formData as Record<string, unknown>;
    const validated = supportSchema.parse(raw);

    await sql`
      INSERT INTO support_requests (name, email, message, status)
      VALUES (${validated.name}, ${validated.email}, ${validated.message}, 'open')
    `;

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation failed" };
    }
    console.error("Support insert error:", error);
    return { success: false, error: "Failed to submit request. Please try again." };
  }
}

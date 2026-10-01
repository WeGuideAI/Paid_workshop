"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { supportSchema } from "@/lib/validations/registration";
import { z } from "zod";

export async function submitSupportRequest(formData: unknown) {
  try {
    const raw = formData as Record<string, unknown>;
    const validated = supportSchema.parse(raw);

    const { error } = await supabaseAdmin.from("support_requests").insert({
      name: validated.name,
      email: validated.email,
      message: validated.message,
      status: "open",
    });

    if (error) {
      console.error("Support insert error:", error);
      return { success: false, error: "Failed to submit request. Please try again." };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation failed" };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

"use server";

import { cookies } from "next/headers";
import { createAdminSession } from "@/lib/auth/admin-session";
import { z } from "zod";
import { timingSafeEqual, createHash } from "crypto";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/** Constant-time string comparison to prevent timing attacks */
function safeEqual(a: string, b: string): boolean {
  try {
    const ha = createHash("sha256").update(a).digest();
    const hb = createHash("sha256").update(b).digest();
    return timingSafeEqual(ha, hb);
  } catch {
    return false;
  }
}

export async function adminLogin(formData: unknown) {
  try {
    const raw = formData as Record<string, unknown>;
    const validated = loginSchema.parse(raw);

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@weguide.work").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "weguide@2026").trim();

    const inputEmail = validated.email.trim().toLowerCase();
    const inputPassword = validated.password.trim();

    if (
      !safeEqual(inputEmail, adminEmail) ||
      !safeEqual(inputPassword, adminPassword)
    ) {
      return { success: false, error: "Invalid credentials" };
    }

    const token = await createAdminSession(inputEmail);

    // Set cookie
    (await cookies()).set("weguide_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return { success: true };
  } catch (err) {
    console.error("Admin login error:", err);
    return { success: false, error: "Invalid login attempt" };
  }
}

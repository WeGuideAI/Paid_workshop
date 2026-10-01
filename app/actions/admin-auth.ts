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
    // Hash both to equalise lengths before comparing
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

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      !adminEmail ||
      !adminPassword ||
      !safeEqual(validated.email, adminEmail) ||
      !safeEqual(validated.password, adminPassword)
    ) {
      return { success: false, error: "Invalid credentials" };
    }

    const token = await createAdminSession(validated.email);

    // Set cookie
    (await cookies()).set("weguide_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return { success: true };
  } catch {
    return { success: false, error: "Invalid login attempt" };
  }
}

"use server";

import { sql } from "@/lib/db";
import {
  studentSchema,
  parentSchema,
  teacherSchema,
  paymentSchema,
} from "@/lib/validations/registration";
import { z } from "zod";

interface RegisterResult {
  success: boolean;
  registrationId?: string;
  error?: string;
}

export async function registerUser(formData: unknown): Promise<RegisterResult> {
  try {
    // Determine role and validate with the correct schema
    const raw = formData as Record<string, unknown>;
    const role = raw.role as string;

    let validated: Record<string, unknown>;
    if (role === "student") {
      validated = studentSchema.parse(raw);
    } else if (role === "parent") {
      validated = parentSchema.parse(raw) as Record<string, unknown>;
    } else if (role === "teacher") {
      validated = teacherSchema.parse(raw);
    } else {
      return { success: false, error: "Invalid role selected" };
    }

    // Look up the workshop by role → slug mapping
    const slugMap: Record<string, string> = {
      student: "students",
      parent: "parents",
      teacher: "teachers",
    };

    const targetSlug = slugMap[role] || "students";

    // Look up the workshop by slug
    const workshops = await sql`
      SELECT id FROM workshops WHERE slug = ${targetSlug} LIMIT 1
    `;
    let workshopId = workshops[0]?.id;

    // Auto-seed missing workshop if database table exists but isn't seeded yet
    if (!workshopId) {
      const defaultWorkshops: Record<
        string,
        { slug: string; title: string; audience: string; tagline: string; description: string }
      > = {
        students: {
          slug: "students",
          title: "Prompting + Digital Portfolio Development",
          audience: "student",
          tagline: "Master AI prompting and build your own digital portfolio",
          description: "Learn the fundamentals of AI prompting and build a polished digital portfolio.",
        },
        parents: {
          slug: "parents",
          title: "AI Literacy + Real-Time Use Cases",
          audience: "parent",
          tagline: "Understand AI, protect your child, and use it every day",
          description: "Demystify artificial intelligence and explore practical real-time use cases.",
        },
        teachers: {
          slug: "teachers",
          title: "Integration of AI in School Life",
          audience: "teacher",
          tagline: "Use AI to plan lessons, grade smarter, and reclaim your time",
          description: "Discover how to weave AI tools into your existing workflow.",
        },
      };

      const seedInfo = defaultWorkshops[targetSlug];
      if (seedInfo) {
        const upserted = await sql`
          INSERT INTO workshops (slug, title, audience, tagline, description)
          VALUES (
            ${seedInfo.slug},
            ${seedInfo.title},
            ${seedInfo.audience}::workshop_audience,
            ${seedInfo.tagline},
            ${seedInfo.description}
          )
          ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
          RETURNING id
        `;
        workshopId = upserted[0]?.id;
      }
    }

    if (!workshopId) {
      return {
        success: false,
        error: "Workshop not found. Please ensure database tables are created in Neon.",
      };
    }

    const inserted = await sql`
      INSERT INTO registrations (
        workshop_id, role, full_name, email, phone, mode,
        student_school_name, student_standard,
        has_school_child, child_name, child_standard, child_school_name,
        teacher_school_name, teacher_subject,
        amount, payment_status
      ) VALUES (
        ${workshopId}::uuid,
        ${role}::workshop_audience,
        ${validated.fullName as string},
        ${validated.email as string},
        ${validated.phone as string},
        ${(validated.mode as string) || "online"}::session_mode,
        ${role === "student" ? (validated.studentSchoolName as string) || null : null},
        ${role === "student" ? (validated.studentStandard as string) || null : null},
        ${role === "parent" ? (validated.hasSchoolChild as boolean) ?? null : null},
        ${role === "parent" && validated.hasSchoolChild ? (validated.childName as string) || null : null},
        ${role === "parent" && validated.hasSchoolChild ? (validated.childStandard as string) || null : null},
        ${role === "parent" && validated.hasSchoolChild ? (validated.childSchoolName as string) || null : null},
        ${role === "teacher" ? (validated.teacherSchoolName as string) || null : null},
        ${role === "teacher" ? (validated.teacherSubject as string) || null : null},
        199,
        'pending'::payment_status
      )
      RETURNING id
    `;

    const registrationId = inserted[0]?.id;
    if (!registrationId) {
      return { success: false, error: "Failed to create registration record." };
    }

    return { success: true, registrationId };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0];
      return { success: false, error: firstError?.message || "Validation failed" };
    }
    console.error("Registration error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function submitPayment(
  registrationId: string,
  transactionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    paymentSchema.parse({ transactionId });

    await sql`
      UPDATE registrations
      SET transaction_id = ${transactionId},
          payment_status = 'submitted'::payment_status,
          updated_at = NOW()
      WHERE id = ${registrationId}::uuid
    `;

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0];
      return { success: false, error: firstError?.message || "Validation failed" };
    }
    console.error("Payment update error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

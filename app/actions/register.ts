"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
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
    let { data: workshop, error: workshopError } = await supabaseAdmin
      .from("workshops")
      .select("id")
      .eq("slug", targetSlug)
      .maybeSingle();

    // Auto-seed missing workshop if database table exists but isn't seeded yet
    if (!workshop) {
      const defaultWorkshops: Record<string, { slug: string; title: string; audience: "student" | "parent" | "teacher"; tagline: string; description: string }> = {
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
        const { data: upserted, error: upsertError } = await supabaseAdmin
          .from("workshops")
          .upsert(seedInfo, { onConflict: "slug" })
          .select("id")
          .single();

        if (!upsertError && upserted) {
          workshop = upserted;
        } else {
          console.error("Auto-seed workshop error:", upsertError);
        }
      }
    }

    if (!workshop) {
      console.error("Workshop error:", workshopError);
      return { success: false, error: "Workshop not found. Please ensure SQL migrations are run in your Supabase SQL Editor." };
    }

    // Build the insert payload
    const insertData: Record<string, unknown> = {
      workshop_id: workshop.id,
      role: role,
      full_name: validated.fullName,
      email: validated.email,
      phone: validated.phone,
      mode: validated.mode,
      amount: 199,
      payment_status: "pending",
    };

    // Role-specific fields
    if (role === "student") {
      insertData.student_school_name = validated.studentSchoolName;
      insertData.student_standard = validated.studentStandard;
    } else if (role === "parent") {
      insertData.has_school_child = validated.hasSchoolChild;
      if (validated.hasSchoolChild) {
        insertData.child_name = validated.childName;
        insertData.child_standard = validated.childStandard;
        insertData.child_school_name = validated.childSchoolName;
      }
    } else if (role === "teacher") {
      insertData.teacher_school_name = validated.teacherSchoolName;
      insertData.teacher_subject = validated.teacherSubject;
    }

    const { data: registration, error: insertError } = await supabaseAdmin
      .from("registrations")
      .insert(insertData)
      .select("id")
      .single();

    if (insertError) {
      console.error("Registration insert error:", insertError);
      return { success: false, error: "Failed to create registration: " + (insertError.message || "Database error") };
    }

    return { success: true, registrationId: registration.id };
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


    const { error } = await supabaseAdmin
      .from("registrations")
      .update({
        transaction_id: transactionId,
        payment_status: "submitted",
        updated_at: new Date().toISOString(),
      })
      .eq("id", registrationId);

    if (error) {
      console.error("Payment update error:", error);
      return { success: false, error: "Failed to submit payment. Please try again." };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const firstError = error.issues?.[0];
      return { success: false, error: firstError?.message || "Validation failed" };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

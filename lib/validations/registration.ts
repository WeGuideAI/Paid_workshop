import { z } from "zod";

const base = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  mode: z.enum(["online", "offline"]),
});

export const studentSchema = base.extend({
  role: z.literal("student"),
  studentSchoolName: z.string().min(2, "Enter your school name"),
  studentStandard: z.string().min(1, "Enter your class/standard"),
});

export const parentSchema = base
  .extend({
    role: z.literal("parent"),
    hasSchoolChild: z.boolean(),
    childName: z.string().optional().or(z.literal("")),
    childStandard: z.string().optional().or(z.literal("")),
    childSchoolName: z.string().optional().or(z.literal("")),
  })
  .superRefine((d, ctx) => {
    if (d.hasSchoolChild) {
      if (!d.childName || d.childName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Child's name must be at least 2 characters",
          path: ["childName"],
        });
      }
      if (!d.childStandard || d.childStandard.trim().length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Child's class/standard is required",
          path: ["childStandard"],
        });
      }
      if (!d.childSchoolName || d.childSchoolName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Child's school name must be at least 2 characters",
          path: ["childSchoolName"],
        });
      }
    }
  });

export const teacherSchema = base.extend({
  role: z.literal("teacher"),
  teacherSchoolName: z.string().min(2, "Enter your school name"),
  teacherSubject: z.string().min(2, "Enter the subject you teach"),
});

export const paymentSchema = z.object({
  transactionId: z.string().min(4, "Enter the transaction / UTR number"),
});

export const supportSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Please describe your doubt or question in detail"),
});

export type StudentFormData = z.infer<typeof studentSchema>;
export type ParentFormData = z.infer<typeof parentSchema>;
export type TeacherFormData = z.infer<typeof teacherSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type SupportFormData = z.infer<typeof supportSchema>;
export type RegistrationFormData = StudentFormData | ParentFormData | TeacherFormData;

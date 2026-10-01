"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { Stepper } from "@/components/ui/Stepper";
import { QRCodeDisplay } from "@/components/ui/QRCodeDisplay";
import { ScrollReveal } from "@/components/ui/AnimatedBackground";
import { paymentSchema } from "@/lib/validations/registration";
import { registerUser, submitPayment } from "@/app/actions/register";

const steps = ["Role", "Details", "Specifics", "Payment"];

function RegistrationWizard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRole = searchParams.get("role");

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [role, setRole] = useState<"student" | "parent" | "teacher" | "">(
    (initialRole as any) || ""
  );
  
  // Step 1: Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Step 2: Specifics - Student
  const [studentSchoolName, setStudentSchoolName] = useState("");
  const [studentStandard, setStudentStandard] = useState("");

  // Step 2: Specifics - Parent
  const [hasSchoolChild, setHasSchoolChild] = useState(false);
  const [childName, setChildName] = useState("");
  const [childStandard, setChildStandard] = useState("");
  const [childSchoolName, setChildSchoolName] = useState("");

  // Step 2: Specifics - Teacher
  const [teacherSchoolName, setTeacherSchoolName] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");

  // Step 3: Payment & Verification
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (initialRole && ["student", "parent", "teacher"].includes(initialRole) && currentStep === 0) {
      setRole(initialRole as any);
    }
  }, [initialRole, currentStep]);

  const validateStep = () => {
    setError(null);
    try {
      if (currentStep === 0) {
        if (!role) throw new Error("Please select a role to continue");
        return true;
      }

      if (currentStep === 1) {
        const schema = z.object({
          fullName: z.string().min(2, "Enter your full name"),
          email: z.string().email("Enter a valid email"),
          phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
        });
        schema.parse({ fullName, email, phone });
        return true;
      }

      if (currentStep === 2) {
        if (role === "student") {
          z.object({
            studentSchoolName: z.string().min(2, "Enter your school name"),
            studentStandard: z.string().min(1, "Enter your class/standard"),
          }).parse({ studentSchoolName, studentStandard });
        } else if (role === "parent") {
          z.object({
            hasSchoolChild: z.boolean(),
            childName: hasSchoolChild ? z.string().min(2, "Child's name is required") : z.string().optional().or(z.literal("")),
            childStandard: hasSchoolChild ? z.string().min(1, "Child's class is required") : z.string().optional().or(z.literal("")),
            childSchoolName: hasSchoolChild ? z.string().min(2, "Child's school name is required") : z.string().optional().or(z.literal("")),
          }).parse({ hasSchoolChild, childName, childStandard, childSchoolName });
        } else if (role === "teacher") {
          z.object({
            teacherSchoolName: z.string().min(2, "Enter your school name"),
            teacherSubject: z.string().min(2, "Enter the subject you teach"),
          }).parse({ teacherSchoolName, teacherSubject });
        }
        return true;
      }

      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const issue = err.issues?.[0] || (err as any).errors?.[0];
        setError(issue?.message || "Validation failed. Please check your entries.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      return false;
    }
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep === 2) {
        // Going from Specifics to Payment: submit registration first
        setLoading(true);
        setError(null);
        
        const payload = {
          role, fullName, email, phone, mode: "online",
          studentSchoolName, studentStandard,
          hasSchoolChild, childName, childStandard, childSchoolName,
          teacherSchoolName, teacherSubject
        };

        const result = await registerUser(payload);
        setLoading(false);

        if (result.success && result.registrationId) {
          setRegistrationId(result.registrationId);
          setCurrentStep((prev) => prev + 1);
        } else {
          setError(result.error || "Registration failed");
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setError(null);
  };

  const handlePayment = async () => {
    if (!registrationId) return;
    
    try {
      paymentSchema.parse({ transactionId });
      
      setLoading(true);
      setError(null);
      
      const result = await submitPayment(registrationId, transactionId);
      setLoading(false);

      if (result.success) {
        router.push(`/register/confirmation?id=${registrationId}`);
      } else {
        setError(result.error || "Payment submission failed");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const issue = err.issues?.[0] || (err as any).errors?.[0];
        setError(issue?.message || "Validation failed");
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <ScrollReveal>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
            Secure Your <span className="gradient-text">Spot</span>
          </h1>
          <p className="text-[var(--text-muted)]">
            Complete your registration for the AI & Robotics Awareness Workshop
          </p>
        </div>

        <GlassCard className="p-8">
          <Stepper steps={steps} currentStep={currentStep} />

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-red-400 text-sm flex items-start gap-2">
              <ShieldCheck size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="min-h-[300px]">
            {/* Step 0: Role */}
            {currentStep === 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
                  I am registering as a:
                </h2>
                {(["student", "parent", "teacher"] as const).map((r) => (
                  <label
                    key={r}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                      role === r
                        ? "border-[var(--ocean-500)] bg-[rgba(14,165,233,0.1)]"
                        : "border-[var(--border-glass)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="hidden"
                    />
                    <div className="flex-1">
                      <p className="font-medium capitalize text-[var(--text-primary)]">{r}</p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {r === "student" && "Prompting + Digital Portfolio Development"}
                        {r === "parent" && "AI Literacy + Real-Time Use Cases"}
                        {r === "teacher" && "Integration of AI in School Life"}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${role === r ? "border-[var(--ocean-500)]" : "border-[var(--text-muted)]"}`}>
                      {role === r && <div className="w-2.5 h-2.5 rounded-full bg-[var(--ocean-500)]" />}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Step 1: Details */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
                  Your Details
                </h2>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-glass"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
                    Email <span className="text-xs opacity-60">(No login required)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-glass"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-glass"
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Specifics */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">
                  Additional Details
                </h2>

                {role === "student" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">School Name</label>
                      <input
                        type="text"
                        value={studentSchoolName}
                        onChange={(e) => setStudentSchoolName(e.target.value)}
                        className="input-glass"
                        placeholder="e.g., Delhi Public School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Class / Standard</label>
                      <input
                        type="text"
                        value={studentStandard}
                        onChange={(e) => setStudentStandard(e.target.value)}
                        className="input-glass"
                        placeholder="e.g., 10th, 12th"
                      />
                    </div>
                  </>
                )}

                {role === "teacher" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">School Name</label>
                      <input
                        type="text"
                        value={teacherSchoolName}
                        onChange={(e) => setTeacherSchoolName(e.target.value)}
                        className="input-glass"
                        placeholder="e.g., Delhi Public School"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Subject Taught</label>
                      <input
                        type="text"
                        value={teacherSubject}
                        onChange={(e) => setTeacherSubject(e.target.value)}
                        className="input-glass"
                        placeholder="e.g., Mathematics, English"
                      />
                    </div>
                  </>
                )}

                {role === "parent" && (
                  <>
                    <label className="flex items-center p-4 border border-[var(--border-glass)] rounded-xl cursor-pointer bg-[rgba(255,255,255,0.02)]">
                      <input
                        type="checkbox"
                        checked={hasSchoolChild}
                        onChange={(e) => setHasSchoolChild(e.target.checked)}
                        className="mr-3 w-4 h-4 accent-[var(--ocean-500)]"
                      />
                      <span className="font-medium text-[var(--text-primary)]">I have a school-going child</span>
                    </label>

                    {hasSchoolChild && (
                      <div className="space-y-4 p-4 mt-4 border border-[var(--border-glass)] rounded-xl bg-[rgba(255,255,255,0.01)]">
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Child's Name</label>
                          <input
                            type="text"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            className="input-glass"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Child's Class / Standard</label>
                          <input
                            type="text"
                            value={childStandard}
                            onChange={(e) => setChildStandard(e.target.value)}
                            className="input-glass"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">Child's School Name</label>
                          <input
                            type="text"
                            value={childSchoolName}
                            onChange={(e) => setChildSchoolName(e.target.value)}
                            className="input-glass"
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">
                    Payment & Verification
                  </h2>
                  <p className="text-[var(--text-muted)] text-sm">
                    Please scan the QR code to pay ₹199 and enter the transaction ID below.
                  </p>
                </div>

                <div className="flex justify-center">
                  <QRCodeDisplay value={`upi://pay?pa=weguide@upi&pn=WeGuide&am=199&cu=INR&tn=Workshop for ${fullName}`} />
                </div>

                <div className="max-w-xs mx-auto">
                  <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5 text-center">
                    Transaction / UTR Number
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="input-glass text-center"
                    placeholder="e.g. 312345678901"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-[var(--border-glass)]">
            {currentStep > 0 ? (
              <GradientButton variant="ghost" onClick={handleBack} disabled={loading}>
                <ArrowLeft size={18} />
                <span>Back</span>
              </GradientButton>
            ) : (
              <div /> // Placeholder to keep Next button right-aligned
            )}

            {currentStep < 3 ? (
              <GradientButton onClick={handleNext} loading={loading}>
                <span>Next</span>
                <ArrowRight size={18} />
              </GradientButton>
            ) : (
              <GradientButton onClick={handlePayment} loading={loading}>
                <span>Submit Verification</span>
                <ShieldCheck size={18} />
              </GradientButton>
            )}
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-[var(--ocean-500)] border-t-transparent animate-spin" /></div>}>
      <RegistrationWizard />
    </Suspense>
  );
}

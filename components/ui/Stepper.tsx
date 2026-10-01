"use client";

import { Check } from "lucide-react";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`stepper-circle ${
                  isActive
                    ? "stepper-circle-active"
                    : isCompleted
                    ? "stepper-circle-completed"
                    : "stepper-circle-pending"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] leading-tight ${
                  isActive
                    ? "text-[var(--ocean-500)]"
                    : isCompleted
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line mx-2 ${
                  isCompleted ? "stepper-line-completed" : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

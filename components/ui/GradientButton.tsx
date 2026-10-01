"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  if (variant === "outline") {
    return (
      <button
        disabled={disabled || loading}
        className={`
          relative rounded-xl font-semibold transition-all duration-300
          border border-[var(--border-glass)] text-[var(--text-primary)]
          bg-transparent hover:border-[var(--ocean-500)] hover:bg-[rgba(14,165,233,0.1)]
          hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}
        `}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {loading && <LoadingSpinner />}
          {children}
        </span>
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        disabled={disabled || loading}
        className={`
          rounded-xl font-semibold transition-all duration-300
          text-[var(--text-muted)] hover:text-[var(--text-primary)]
          hover:bg-[rgba(255,255,255,0.04)]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}
        `}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {loading && <LoadingSpinner />}
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`
        btn-gradient ${sizeClasses[size]}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${fullWidth ? "w-full" : ""} ${className}
      `}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && <LoadingSpinner />}
        {children}
      </span>
    </button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

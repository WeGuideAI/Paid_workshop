"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(value, {
      width: size,
      margin: 2,
      color: {
        dark: "#0ea5e9",
        light: "#020617",
      },
    }).then(setSrc);
  }, [value, size]);

  if (!src) {
    return (
      <div
        className="rounded-xl bg-[rgba(255,255,255,0.04)] animate-pulse"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div className="inline-block p-4 rounded-xl bg-[rgba(255,255,255,0.06)] border border-[var(--border-glass)]">
      <img
        src={src}
        alt="Payment QR Code"
        width={size}
        height={size}
        className="rounded-lg"
      />
    </div>
  );
}

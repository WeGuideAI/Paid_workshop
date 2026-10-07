"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  value?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export function QRCodeDisplay({
  src = "/qr.png",
  value,
  size = 230,
  alt = "Payment QR Code",
}: QRCodeDisplayProps) {
  const [generatedSrc, setGeneratedSrc] = useState<string>("");

  useEffect(() => {
    if (!src && value) {
      QRCode.toDataURL(value, {
        width: size,
        margin: 2,
        color: {
          dark: "#0ea5e9",
          light: "#020617",
        },
      }).then(setGeneratedSrc);
    }
  }, [src, value, size]);

  const activeSrc = src || generatedSrc;

  if (!activeSrc) {
    return (
      <div
        className="rounded-2xl bg-[rgba(255,255,255,0.04)] animate-pulse mx-auto"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div className="inline-block p-3 rounded-2xl bg-white border border-[var(--border-glass)] shadow-xl">
      <Image
        src={activeSrc}
        alt={alt}
        width={size}
        height={Math.round(size * (1176 / 1016))}
        className="rounded-xl object-contain mx-auto"
        style={{ height: "auto" }}
        priority
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, Mail, Globe, MapPin, Star, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = clickCount + 1;
    if (nextCount >= 3) {
      e.preventDefault();
      setClickCount(0);
      if (clickTimer) clearTimeout(clickTimer);
      router.push("/admin/login");
    } else {
      setClickCount(nextCount);
      if (clickTimer) clearTimeout(clickTimer);
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 1500);
      setClickTimer(timer);
    }
  };

  return (
    <footer className="relative mt-24 border-t border-[var(--border-glass)] bg-[#030812]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & Description (4 columns) */}
          <div className="md:col-span-12 lg:col-span-5">
            <div className="flex items-center mb-6 cursor-pointer" onClick={handleLogoClick}>
              <Image 
                src="/logo.png" 
                alt="WeGuide Logo" 
                width={140} 
                height={45} 
                className="object-contain hover:brightness-110 transition-all duration-300"
              />
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-sm mb-6">
              Demystifying artificial intelligence and robotics for our local community through hands-on awareness sessions and live hardware demonstrations.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.05)]">
              <div className="flex items-center text-amber-400">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
              <span className="text-xs font-semibold text-amber-400">5.0 Rating on Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Contact & Inquiries (3 columns) */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-6">
              Contact & Inquiries
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+917593993975" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--ocean-500)] transition-colors">
                  <Phone size={16} className="text-[var(--ocean-500)] shrink-0" />
                  +91 75939 93975
                </a>
              </li>
              <li>
                <a href="mailto:info@weguide.co.in" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--ocean-500)] transition-colors">
                  <Mail size={16} className="text-[var(--ocean-500)] shrink-0" />
                  info@weguide.co.in
                </a>
              </li>
              <li>
                <a href="https://weguide.work" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--ocean-500)] transition-colors">
                  <Globe size={16} className="text-[var(--ocean-500)] shrink-0" />
                  weguide.work
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Lab & Workshop Venue (4 columns) */}
          <div className="md:col-span-6 lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-6">
              Lab & Workshop Venue
            </h4>
            <div className="flex items-start gap-3 text-sm text-[var(--text-muted)] mb-4">
              <MapPin size={18} className="text-[var(--ocean-500)] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <p className="font-semibold text-[var(--text-primary)] mb-1">WeGuide Robotics Lab</p>
                <p>2nd Floor, Orchid Mall, 966 National Highway</p>
                <p>Sekharipuram, Kalpathy</p>
                <p>Palakkad, Kerala — 678003</p>
              </div>
            </div>
            <a href="#" className="inline-flex text-xs font-semibold text-[var(--ocean-500)] hover:text-[var(--foam-400)] transition-colors mt-2 ml-7">
              Get Directions on Google Maps →
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-[var(--border-glass)]">
          {/* Trust & Community Banner */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
              <span>Community Educational Initiative by WeGuide AI • 100% Free Entry</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
              <span>Crafted with</span>
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>for Palakkad & Kerala Tech Community</span>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <p className="text-[10px] sm:text-xs text-[var(--text-muted)] opacity-70 leading-relaxed">
              Disclaimer: WeGuide reserves the right to reschedule, modify, merge, or cancel workshop sessions or dates without prior individual notice due to operational, technical, or administrative constraints. Participation is subject to slot availability and verification.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[var(--text-muted)]">
              <p>© {new Date().getFullYear()} WeGuide. All rights reserved.</p>
              <span className="hidden sm:inline-block opacity-50">•</span>
              <Link href="/about" className="hover:text-[var(--ocean-500)] transition-colors">
                About WE Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

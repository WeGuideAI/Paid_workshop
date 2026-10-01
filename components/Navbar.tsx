"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "/", label: "Workshop Tracks" },
  { href: "/workshops/students", label: "Students" },
  { href: "/workshops/parents", label: "Parents" },
  { href: "/workshops/teachers", label: "Teachers" },
  { href: "/about", label: "Curriculum" },
  { href: "/support", label: "Venue & FAQ" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const router = useRouter();

  useEffect(() => {
    // Read theme preference on mount
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  };

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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300">
      {/* Floating Pill Header */}
      <div className="bg-[var(--pill-nav-bg)] backdrop-blur-xl border border-[var(--pill-nav-border)] rounded-full px-5 py-2.5 shadow-2xl flex items-center justify-between transition-all duration-300">
        
        {/* Left Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center group cursor-pointer shrink-0"
        >
          <Image
            src="/logo.png"
            alt="WeGuide Logo"
            width={140}
            height={42}
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-[var(--pill-nav-text)] opacity-90 hover:opacity-100 hover:text-[var(--brand-blue)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions: Sun/Moon Theme Toggle + Claim Entry Pass Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-slate-500/10 border border-slate-400/20 flex items-center justify-center text-amber-400 hover:bg-slate-500/20 transition-all shadow-sm cursor-pointer"
            aria-label="Toggle Dark/Light Mode"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>

          <Link
            href="/register"
            className="bg-[#087CF4] hover:bg-[#0066cc] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:scale-105 transition-all duration-300 block text-center"
          >
            Claim Entry Pass (₹199)
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-full text-[var(--pill-nav-text)] hover:bg-slate-500/10 transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 mt-2 ${
          isOpen
            ? "max-h-96 opacity-100 bg-[var(--pill-nav-bg)] backdrop-blur-xl border border-[var(--pill-nav-border)] rounded-2xl p-4 shadow-2xl"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-[var(--pill-nav-text)] hover:bg-slate-500/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-glass)]">
            <span className="text-xs font-medium text-[var(--text-muted)]">Switch Mode</span>
            <button
              type="button"
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-slate-500/10 border border-slate-400/20 flex items-center justify-center"
            >
              {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-blue-600" />}
            </button>
          </div>

          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="w-full mt-2 bg-[#087CF4] text-white font-bold text-sm px-6 py-3 rounded-full text-center block shadow-lg shadow-blue-500/30"
          >
            Claim Entry Pass (₹199)
          </Link>
        </div>
      </div>
    </nav>
  );
}

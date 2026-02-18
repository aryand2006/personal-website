"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks } from "@/components/site-content";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-slate-700/70 bg-[#0b0f19]/80 shadow-glow backdrop-blur-xl"
            : "border-slate-700/40 bg-[#0b0f19]/60 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="text-xl font-semibold tracking-tight">
          aryan<span className="text-primaryAccent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "text-primaryText" : "text-mutedText hover:text-primaryText"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-2 -bottom-[2px] h-0.5 rounded-full bg-primaryAccent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="rounded-lg border border-primaryAccent/50 bg-primaryAccent/15 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-primaryText transition hover:border-primaryAccent hover:bg-primaryAccent/25 sm:px-4"
        >
          Let&apos;s Talk
        </Link>
      </div>
    </header>
  );
}

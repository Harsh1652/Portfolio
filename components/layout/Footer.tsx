"use client";
import { useRef } from "react";
import { usePauseOffscreen } from "@/lib/usePauseOffscreen";
import Link from "next/link";

const footerLinks = [
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "YouTube", href: "/youtube" },
  { label: "RSS", href: "/feed.xml" },
  { label: "Contact", href: "/#contact" },
  { label: "GitHub", href: "https://github.com/Harsh1652" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-gupta16/" },
];

const techStack = ["Next.js", "Three.js", "Framer Motion", "GSAP", "TypeScript"];

function HeartbeatLine() {
  return (
    <svg width="100" height="20" viewBox="0 0 100 20" className="opacity-40 flex-shrink-0">
      <path
        className="animate-heartbeat"
        pathLength={1}
        d="M0 10 L16 10 L20 3 L24 17 L28 6 L32 14 L36 10 L52 10 L56 1 L60 19 L64 10 L100 10"
        fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  usePauseOffscreen(ref);
  return (
    <footer ref={ref} className="relative py-8 sm:py-12 border-t" style={{ background: "var(--bg)", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <nav aria-label="Footer" className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {footerLinks.map((l) =>
            l.href.startsWith("/") ? (
              <Link key={l.label} href={l.href} className="text-sm text-white/50 hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>{l.label}</Link>
            ) : (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer me" className="text-sm text-white/50 hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>{l.label}</a>
            )
          )}
        </nav>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-bright flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-sm gradient-text" style={{ fontFamily: "var(--font-display)" }}>HG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/70" style={{ fontFamily: "var(--font-display)" }}>Designed & Engineered by Harsh Gupta</p>
              <p className="text-xs text-white/25 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>© 2026 · All rights reserved</p>
            </div>
          </div>

          {/* Center */}
          <HeartbeatLine />

          {/* Right */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
            <span className="text-xs text-white/25 font-mono mr-1" style={{ fontFamily: "var(--font-mono)" }}>Built with</span>
            {techStack.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.15)", color: "rgba(165,180,252,0.7)", fontFamily: "var(--font-mono)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

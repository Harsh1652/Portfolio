"use client";
import { motion } from "framer-motion";

const techStack = ["Next.js", "Three.js", "Framer Motion", "GSAP", "TypeScript"];

function HeartbeatLine() {
  return (
    <svg width="100" height="20" viewBox="0 0 100 20" className="opacity-40 flex-shrink-0">
      <motion.path
        d="M0 10 L16 10 L20 3 L24 17 L28 6 L32 14 L36 10 L52 10 L56 1 L60 19 L64 10 L100 10"
        fill="none" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative py-8 sm:py-12 border-t" style={{ background: "var(--bg)", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-bright flex items-center justify-center flex-shrink-0">
              <span className="font-display font-bold text-sm gradient-text" style={{ fontFamily: "'Syne', sans-serif" }}>HG</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white/70" style={{ fontFamily: "'Syne', sans-serif" }}>Designed & Engineered by Harsh Gupta</p>
              <p className="text-xs text-white/25 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>© 2026 · All rights reserved</p>
            </div>
          </div>

          {/* Center */}
          <HeartbeatLine />

          {/* Right */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
            <span className="text-xs text-white/25 font-mono mr-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Built with</span>
            {techStack.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.15)", color: "rgba(165,180,252,0.7)", fontFamily: "'JetBrains Mono', monospace" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

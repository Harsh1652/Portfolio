"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const sites = [
  {
    name: "Invisigent", url: "https://invisigent.com",
    description: "Security intelligence platform with modern, conversion-optimized design and 100 Lighthouse score.",
    tech: ["Next.js", "React", "Responsive", "SEO"],
    color: "#818cf8",
    preview: { title: "Invisigent", tagline: "Intelligent threat detection for modern enterprises" },
    metrics: ["100 LH Score", "Core Web Vitals", "Mobile First"],
  },
  {
    name: "Baalaji Exports", url: "#",
    description: "Full B2B exports website with SEO panel, admin dashboard, and MongoDB backend for product management.",
    tech: ["Next.js", "MongoDB", "Admin Dashboard", "SEO"],
    color: "#f59e0b",
    preview: { title: "Baalaji Exports", tagline: "Quality exports to 20+ countries worldwide" },
    metrics: ["SEO Dashboard", "Admin Panel", "Product CMS"],
  },
  {
    name: "ArtCart by Swati", url: "#",
    description: "Luxury e-commerce platform for fine art with curated collections and optimized checkout.",
    tech: ["Next.js", "Stripe", "MongoDB", "Luxury UI"],
    color: "#ec4899",
    preview: { title: "ArtCart by Swati", tagline: "Curated art for the discerning collector" },
    metrics: ["Stripe Checkout", "Art Gallery UI", "Mobile Optimized"],
  },
];

function BrowserMockup({ site, index }: { site: typeof sites[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="group flex flex-col"
    >
      {/* Browser chrome */}
      <div className="rounded-xl sm:rounded-2xl overflow-hidden hover-lift" style={{ background: "rgba(8,8,8,0.9)", border: `1px solid ${site.color}18`, boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)` }}>
        {/* Top bar */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <div className="flex gap-1 sm:gap-1.5 flex-shrink-0">
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500/70" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-500/70" />
            <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500/70" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-1 sm:mx-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1.5 min-w-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="text-emerald-400/60 text-xs flex-shrink-0">🔒</span>
            <span className="text-xs text-white/25 font-mono truncate" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{site.url}</span>
          </div>
          <a href={site.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-xs font-mono px-2 py-1 rounded" style={{ background: `${site.color}15`, color: site.color, border: `1px solid ${site.color}25`, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>
            Visit →
          </a>
        </div>

        {/* Preview area */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <div className="w-full h-full flex flex-col" style={{ background: `linear-gradient(135deg, ${site.color}08 0%, rgba(8,8,8,0.95) 60%)` }}>
            {/* Fake navbar */}
            <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="w-12 sm:w-16 h-3 sm:h-4 rounded" style={{ background: `${site.color}30` }} />
              <div className="hidden sm:flex gap-2">
                {[1,2,3].map((i) => <div key={i} className="w-8 h-2 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />)}
              </div>
              <div className="w-12 sm:w-16 h-5 sm:h-6 rounded-lg" style={{ background: `${site.color}22` }} />
            </div>
            {/* Hero content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-12 text-center gap-2 sm:gap-4">
              <div className="font-display font-bold text-sm sm:text-xl" style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)" }}>{site.preview.title}</div>
              <div className="text-xs text-white/35 max-w-[200px] sm:max-w-xs hidden sm:block" style={{ fontFamily: "'DM Sans', sans-serif" }}>{site.preview.tagline}</div>
              <div className="px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: `${site.color}22`, color: site.color, fontFamily: "'DM Sans', sans-serif" }}>Explore →</div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 sm:mt-6 space-y-3">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{site.name}</h3>
          <p className="text-xs sm:text-sm text-white/45 mt-1 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{site.description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {site.tech.map((t) => <span key={t} className="tech-chip" style={{ background: `${site.color}10`, borderColor: `${site.color}20`, color: site.color }}>{t}</span>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {site.metrics.map((m) => (
            <span key={m} className="px-2 py-1 rounded text-xs text-white/30" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif" }}>✓ {m}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Freelance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="freelance" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">04 / Freelance</span>
            <div className="w-8 h-px bg-pink-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>Production <span className="gradient-text">Websites</span></h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>Client projects built with performance, SEO, and conversion in mind.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {sites.map((site, i) => <BrowserMockup key={site.name} site={site} index={i} />)}
        </div>
      </div>
    </section>
  );
}


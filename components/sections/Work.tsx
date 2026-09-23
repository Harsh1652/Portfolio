"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { projects, sites } from "@/lib/projects";

// ─── Site Case Study Modal ────────────────────────────────────────────────────

function SiteCaseStudyModal({ site, onClose }: { site: typeof sites[0]; onClose: () => void }) {
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cs = site.caseStudy!;

  useEffect(() => {
    lenis.stop();
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.stopPropagation();
        const dy = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        el.scrollTop += dy;
      }
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });
    return () => {
      lenis.start();
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-stretch justify-end"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl flex flex-col"
        style={{ background: "rgba(8,8,8,0.98)", borderLeft: `1px solid ${site.color}20`, height: "100vh", zIndex: 1 }}
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        <div className="flex-shrink-0 flex items-center px-6 sm:px-10 pt-5 pb-3">
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Close"><X size={16} /></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
          <div className="px-6 sm:px-10 pb-20">
            {/* Hero */}
            <div className="mb-8">
              <span className="text-xs font-mono px-2 py-0.5 rounded mb-3 inline-block" style={{ background: `${site.color}15`, color: site.color, border: `1px solid ${site.color}20`, fontFamily: "var(--font-mono)" }}>Website</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{site.name}</h2>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono" style={{ color: site.color, fontFamily: "var(--font-mono)" }}>{site.url} ↗</a>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Overview</h3>
              <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{cs.overview}</p>
            </div>

            {/* Problem */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-400/60 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Problem</h3>
              <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{cs.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: `${site.color}06`, border: `1px solid ${site.color}15` }}>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: site.color, fontFamily: "var(--font-mono)", opacity: 0.7 }}>Solution</h3>
              {cs.solution.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm text-white/55 leading-relaxed mb-2 last:mb-0" style={{ fontFamily: "var(--font-body)" }}>{p}</p>
              ))}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Key Features</h3>
              <ul className="space-y-2">
                {cs.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                    <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${site.color}15`, color: site.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: `${site.color}10`, border: `1px solid ${site.color}20`, color: site.color, fontFamily: "var(--font-mono)" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Results */}
            {cs.results && cs.results.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "var(--font-mono)" }}>Results</h3>
                <ul className="space-y-2">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                      <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${site.color}15`, color: site.color }}>✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* My Role */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "var(--font-mono)" }}>My Role</h3>
              <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{cs.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Case Study Modal ──────────────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lenis.stop();
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.stopPropagation();
        const dy = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        el.scrollTop += dy;
      }
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });

    return () => {
      lenis.start();
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-stretch justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel shell — animates in, does NOT scroll */}
      <motion.div
        className="relative w-full max-w-3xl flex flex-col"
        style={{ background: "rgba(8,8,8,0.98)", borderLeft: `1px solid ${project.color}20`, height: "100vh", zIndex: 1 }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        {/* Sticky close button sits above the scroll area */}
        <div className="flex-shrink-0 flex items-center px-6 sm:px-10 pt-5 pb-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Inner scroll container — this is what actually scrolls */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
        <div className="px-6 sm:px-10 pb-20">
          {/* Hero */}
          <div className="pt-10 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25`, fontFamily: "var(--font-mono)" }}>{project.category}</span>
            </div>
            <h2 className="font-bold mb-3 leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>{project.title}</h2>
            <p className="text-base sm:text-lg font-medium mb-2" style={{ color: project.color, fontFamily: "var(--font-body)" }}>{project.tagline}</p>
            <p className="text-sm text-white/40" style={{ fontFamily: "var(--font-mono)" }}>{project.subtitle}</p>
            <div className="flex gap-3 mt-6">
              <a href={project.github} className="px-4 py-2 rounded-xl text-sm font-semibold glass-bright" style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)" }}>GitHub ↗</a>
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35`, color: project.color, fontFamily: "var(--font-body)" }}>Live Demo ↗</a>}
            </div>
          </div>

          {/* Results bento */}
          <div className="py-8 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-mono text-white/30 mb-4" style={{ fontFamily: "var(--font-mono)" }}>// Key Results</p>
            <div className="grid grid-cols-2 gap-3">
              {project.results.map((r) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl"
                  style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}
                >
                  <div className="font-extrabold leading-none mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: project.color }}>{r.value}</div>
                  <div className="text-xs text-white/45 leading-snug" style={{ fontFamily: "var(--font-body)" }}>{r.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <Section title="Overview" color={project.color}>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{project.overview}</p>
          </Section>

          {/* Problem */}
          <Section title="Problem" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{project.problem}</p>
            </div>
          </Section>

          {/* Solution */}
          <Section title="Solution" color={project.color}>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{project.solution}</p>
          </Section>

          {/* Architecture */}
          <Section title="Architecture" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-mono text-white/25 mb-4" style={{ fontFamily: "var(--font-mono)" }}>// Data flow</p>
              <div className="flex flex-col">
                {project.architecture.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${project.color}0a`, border: `1px solid ${project.color}18` }}>
                      <span className="text-sm">{node.icon}</span>
                      <span className="text-xs font-mono" style={{ color: project.color, fontFamily: "var(--font-mono)" }}>{node.label}</span>
                    </div>
                    {i < project.architecture.length - 1 && (
                      <div className="flex justify-center py-1">
                        <span className="text-white/20 text-xs">↓</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          {/* Features */}
          <Section title="Key Features" color={project.color}>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                  <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${project.color}15`, color: project.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          {/* Tech Stack */}
          <Section title="Tech Stack" color={project.color}>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-mono" style={{ background: `${project.color}12`, border: `1px solid ${project.color}25`, color: project.color, fontFamily: "var(--font-mono)" }}>{t}</span>
              ))}
            </div>
          </Section>

          {/* Role */}
          <Section title="My Role" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: `${project.color}08`, border: `1px solid ${project.color}18` }}>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed italic" style={{ fontFamily: "var(--font-body)" }}>{project.role}</p>
            </div>
          </Section>
        </div>
        </div>{/* end inner scroll container */}
      </motion.div>
    </motion.div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="py-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 rounded-full" style={{ background: color }} />
        <h3 className="font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-display)", color }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Project List Item ────────────────────────────────────────────────────────

function ProjectListItem({ project, index, onOpen }: { project: typeof projects[0]; index: number; onOpen: (id: number) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project.id)}
      className="group relative cursor-pointer"
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${project.color}0d, transparent 70%)` }}
      />

      <div
        className="relative py-7 sm:py-8 px-1 border-b"
        style={{ borderColor: hovered ? `${project.color}40` : "rgba(255,255,255,0.07)", transition: "border-color 0.3s" }}
      >
        <div className="flex gap-4 sm:gap-8 items-start lg:items-center">
          {/* Index */}
          <motion.span
            animate={{ color: hovered ? project.color : "rgba(255,255,255,0.22)" }}
            transition={{ duration: 0.3 }}
            className="text-2xl sm:text-3xl font-bold leading-none flex-shrink-0 w-10 sm:w-14 tabular-nums mt-7 lg:mt-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.index}
          </motion.span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.color }} />
              <span className="text-[11px] uppercase tracking-wider" style={{ color: project.color, fontFamily: "var(--font-mono)" }}>{project.subtitle}</span>
            </div>
            <h3
              className="font-bold leading-tight mb-1.5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)", transition: "color 0.3s" }}
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-[15px] text-white/55 mb-3.5 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
              {project.tech.length > 4 && <span className="text-[11px] text-white/35 self-center ml-1" style={{ fontFamily: "var(--font-mono)" }}>+{project.tech.length - 4}</span>}
            </div>
            {/* CTA — visible only on mobile/tablet, below the chips */}
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mt-3"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color, fontFamily: "var(--font-body)" }}
            >
              View Case Study →
            </motion.div>
          </div>

          {/* CTA — desktop only, pinned to the right */}
          <motion.div
            animate={{ x: hovered ? 0 : -4 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:inline-flex items-center gap-3 flex-shrink-0 text-sm font-medium"
            style={{ color: hovered ? project.color : "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", transition: "color 0.3s" }}
          >
            Case study
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: hovered ? project.color : "transparent", border: `1px solid ${hovered ? project.color : "rgba(255,255,255,0.14)"}`, color: hovered ? "#08080a" : "rgba(255,255,255,0.7)", transition: "all 0.3s" }}
            >
              <motion.span animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex"><ArrowUpRight size={18} /></motion.span>
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Browser Mockup (list-item style matching ProjectListItem) ─────────────────

function BrowserMockup({ site, index, onOpenCaseStudy }: { site: typeof sites[0]; index: number; onOpenCaseStudy?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [hovered, setHovered] = useState(false);
  const idx = String(index + 4).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpenCaseStudy}
      className={`group relative py-7 sm:py-8 px-1 border-b ${onOpenCaseStudy ? "cursor-pointer" : ""}`}
      style={{ borderColor: hovered ? `${site.color}40` : "rgba(255,255,255,0.07)", transition: "border-color 0.3s" }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${site.color}0d, transparent 70%)` }}
      />

      <div className="flex gap-4 sm:gap-8 items-start lg:items-center">
        {/* Index */}
        <motion.span
          animate={{ color: hovered ? site.color : "rgba(255,255,255,0.22)" }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl font-bold leading-none flex-shrink-0 w-10 sm:w-14 tabular-nums mt-7 lg:mt-0"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {idx}
        </motion.span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: site.color }} />
            {site.url !== "#" && (
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] font-mono text-white/50 hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {site.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
              </a>
            )}
          </div>
          <h3
            className="font-bold leading-tight mb-1.5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)", transition: "color 0.3s" }}
          >
            {site.name}
          </h3>
          <p className="text-sm sm:text-[15px] text-white/55 mb-3.5 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
            {site.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {site.tech.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {/* CTA — mobile/tablet */}
          {onOpenCaseStudy && (
            <motion.div
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mt-3"
              style={{ background: `${site.color}15`, border: `1px solid ${site.color}30`, color: site.color, fontFamily: "var(--font-body)" }}
            >
              View Case Study →
            </motion.div>
          )}
        </div>

        {/* CTA — desktop */}
        {onOpenCaseStudy && (
          <motion.div
            animate={{ x: hovered ? 0 : -4 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:inline-flex items-center gap-3 flex-shrink-0 text-sm font-medium"
            style={{ color: hovered ? site.color : "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", transition: "color 0.3s" }}
          >
            Case study
            <span
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: hovered ? site.color : "transparent", border: `1px solid ${hovered ? site.color : "rgba(255,255,255,0.14)"}`, color: hovered ? "#08080a" : "rgba(255,255,255,0.7)", transition: "all 0.3s" }}
            >
              <motion.span animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }} className="flex"><ArrowUpRight size={18} /></motion.span>
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function GroupLabel({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-4 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
      <h3 className="text-xs uppercase tracking-[0.18em] text-white/70" style={{ fontFamily: "var(--font-mono)" }}>{label}</h3>
      <span className="text-xs text-white/30" style={{ fontFamily: "var(--font-mono)" }}>{String(count).padStart(2, "0")}</span>
    </div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [openSite, setOpenSite] = useState<string | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg)" }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">02 / Work</span>
            <div className="w-8 h-px bg-indigo-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="section-lead mt-4 max-w-xl">
            Deep dives into AI systems built for production. Click any project to explore the full architecture, decisions, and results.
          </p>
        </motion.div>

        {/* Project List */}
        <GroupLabel label="AI Systems" count={projects.length} />
        <div>
          {projects.map((project, i) => (
            <ProjectListItem key={project.id} project={project} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <div className="mt-14 sm:mt-20" />
        <GroupLabel label="Client Websites" count={sites.length} />
        <div>
          {sites.map((site, i) => (
            <BrowserMockup key={site.name} site={site} index={i} onOpenCaseStudy={site.caseStudy ? () => setOpenSite(site.name) : undefined} />
          ))}
        </div>
      </div>

      {/* Case Study Panel */}
      <AnimatePresence>
        {openProject !== null && (
          <CaseStudyModal
            project={projects.find((p) => p.id === openProject)!}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Site Case Study Panel */}
      <AnimatePresence>
        {openSite !== null && (
          <SiteCaseStudyModal
            site={sites.find((s) => s.name === openSite)!}
            onClose={() => setOpenSite(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, TrendingUp } from "lucide-react";

import { experiences } from "@/lib/experience";

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-10 py-8 sm:py-10 border-t"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Meta column */}
      <div className="flex lg:flex-col items-start justify-between lg:justify-start gap-3">
        <div>
          <span className="inline-flex items-center gap-2 text-xs tracking-widest" style={{ color: exp.color, fontFamily: "var(--font-mono)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color, boxShadow: `0 0 10px ${exp.color}` }} />
            {exp.year}
          </span>
          <h3 className="font-bold text-xl sm:text-2xl mt-2" style={{ fontFamily: "var(--font-display)" }}>{exp.company}</h3>
          <p className="text-sm text-white/55 mt-1" style={{ fontFamily: "var(--font-body)" }}>{exp.role}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white transition-colors lg:mt-3 flex-shrink-0"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {expanded ? "Hide" : "Show"} projects
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} className="flex"><ChevronDown size={14} /></motion.span>
        </button>
      </div>

      {/* Projects */}
      <div className="min-w-0">
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div key="open" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {exp.projects.map((proj) => (
                  <div key={proj.name} className="card p-5 sm:p-6 flex flex-col">
                    <h4 className="font-semibold text-base mb-2 text-white/90" style={{ fontFamily: "var(--font-display)" }}>{proj.name}</h4>
                    <p className="text-sm text-white/55 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {proj.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-4 border-t text-sm font-medium" style={{ borderColor: "rgba(255,255,255,0.07)", color: exp.color, fontFamily: "var(--font-body)" }}>
                      <TrendingUp size={15} className="flex-shrink-0" />
                      {proj.impact}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.p key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-white/45 lg:pt-7" style={{ fontFamily: "var(--font-mono)" }}>
              {exp.projects.map((p) => p.name).join("  ·  ")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="experience" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">03 / Experience</span>
            <div className="w-8 h-px bg-violet-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>Production <span className="gradient-text">Experience</span></h2>
          <p className="section-lead mt-4 max-w-xl">Building AI systems that run in production and solve real business problems.</p>
        </motion.div>
        <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {experiences.map((exp, i) => <ExperienceItem key={exp.id} exp={exp} index={i} />)}
        </div>
      </div>
    </section>
  );
}

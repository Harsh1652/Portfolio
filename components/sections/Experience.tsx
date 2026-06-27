"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const experiences = [
  {
    id: "reinvent", year: "2025–2026", company: "Reinvent Digital", role: "AI Automation Engineer", location: "", color: "#818cf8",
    projects: [
      { name: "Marketing Attribution Platform", description: "AI-powered marketing attribution system that automatically tracks, analyzes, and attributes customer journeys across multiple touchpoints.", tech: ["AWS", "Docker", "Express", "TypeScript", "React", "Next.js", "PostgreSQL", "Redis"], impact: "Automated 80% of manual attribution work" },
      { name: "Post Call Intelligence", description: "Real-time call analysis platform processing 200+ daily calls, extracting action items, sentiment, and business insights with Hindi language support.", tech: ["Sarvam", "GPT-4o", "FastAPI", "WebSockets", "MongoDB", "Lambda", "AWS"], impact: "200+ calls/day at 95% Hindi accuracy" },
    ],
  },
  {
    id: "excollo", year: "2025", company: "Excollo", role: "Software Engineer", location: "", color: "#a78bfa",
    projects: [
      { name: "AI Persona SaaS Platform", description: "Full-stack SaaS platform enabling businesses to create custom AI personas with specialized knowledge bases and multi-channel deployment.", tech: ["Next.js", "FastAPI", "n8n", "OpenAI", "Cohere Reranking", "Pinecone", "Redis", "MongoDB", "Docker"], impact: "Scalable multi-tenant AI personas" },
      { name: "CRUDO OMS", description: "Order management system for oil & gas industry with real-time tracking, automated workflows, and intelligent inventory optimization.", tech: ["Next.js", "Node.js", "Express.js", "TypeScript", "MongoDB", "Redis", "Docker"], impact: "Streamlined 50+ daily orders" },
    ],
  },
];

function ExperienceItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-6 sm:pl-8"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${exp.color}40, transparent)` }} />
      <div className="absolute left-0 top-6 w-2 h-2 rounded-full -translate-x-[3px]" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }} />

      <div className="pb-10 sm:pb-12">
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="min-w-0">
            <span className="font-mono text-xs tracking-widest mb-1 block" style={{ color: exp.color, fontFamily: "'JetBrains Mono', monospace" }}>{exp.year}</span>
            <h3 className="font-display font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>{exp.company}</h3>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
              <span className="text-sm text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>{exp.role}</span>
              {exp.location && <><span className="text-white/20 hidden sm:inline">·</span><span className="text-xs text-white/30 font-mono hidden sm:inline" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{exp.location}</span></>}
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-all flex-shrink-0"
          >
            <motion.span animate={{ rotate: expanded ? 45 : 0 }} className="text-lg leading-none">+</motion.span>
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
                {exp.projects.map((proj) => (
                  <div key={proj.name} className="p-4 sm:p-5 rounded-xl" style={{ background: `${exp.color}06`, border: `1px solid ${exp.color}15` }}>
                    <h4 className="font-semibold text-sm mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "rgba(255,255,255,0.85)" }}>{proj.name}</h4>
                    <p className="text-xs text-white/45 leading-relaxed mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}20`, color: exp.color, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                    <p className="text-xs" style={{ color: exp.color, fontFamily: "'DM Sans', sans-serif" }}>✓ {proj.impact}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <div className="flex flex-wrap gap-1 items-center">
            {exp.projects.map((p) => (
              <span key={p.name} className="text-xs text-white/30 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.name} · </span>
            ))}
            <button onClick={() => setExpanded(true)} className="text-xs font-mono hover:opacity-80 transition-opacity ml-1" style={{ color: exp.color, fontFamily: "'JetBrains Mono', monospace" }}>expand →</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="experience" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">03 / Experience</span>
            <div className="w-8 h-px bg-violet-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>Production <span className="gradient-text">Experience</span></h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>Building AI systems that run in production and solve real business problems.</p>
        </motion.div>
        <div className="max-w-3xl">
          {experiences.map((exp, i) => <ExperienceItem key={exp.id} exp={exp} index={i} />)}
        </div>
      </div>
    </section>
  );
}


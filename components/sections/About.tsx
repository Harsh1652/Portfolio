"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { usePauseOffscreen } from "@/lib/usePauseOffscreen";

const stats = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "AI Systems Built" },
  { value: 5, suffix: "+", label: "Deployments" },
];

const profile: { key: string; value: string | string[] }[] = [
  { key: "name", value: "Harsh Gupta" },
  { key: "role", value: "AI & Backend Engineer" },
  { key: "focus", value: ["Multi-agent systems", "Production RAG", "AI automation"] },
  { key: "stack", value: ["LangGraph", "FastAPI", "Next.js"] },
  { key: "status", value: "Available for projects" },
];

function ProfileCard() {
  const str = (v: string) => <span className="text-emerald-300/90">&quot;{v}&quot;</span>;
  return (
    <div className="relative w-full max-w-md">
      <div aria-hidden className="absolute -inset-24 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.16), transparent)" }} />
      <div className="relative card overflow-hidden" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.45)" }}>
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="ml-2 text-[11px] text-white/35" style={{ fontFamily: "var(--font-mono)" }}>engineer.ts</span>
        </div>
        {/* Code */}
        <div className="px-5 py-5 text-[12.5px] sm:text-[13px] leading-[1.9] overflow-x-auto whitespace-pre" style={{ fontFamily: "var(--font-mono)" }}>
          <div>
            <span className="text-violet-300">const </span>
            <span className="text-sky-300">engineer</span>
            <span className="text-white/40">{" = {"}</span>
          </div>
          {profile.map((row) => (
            <div key={row.key}>
              <div>
                <span className="text-indigo-200/90">{"  " + row.key}</span>
                <span className="text-white/40">: </span>
                {Array.isArray(row.value) ? <span className="text-white/40">[</span> : <>{str(row.value)}<span className="text-white/40">,</span></>}
              </div>
              {Array.isArray(row.value) && (
                <>
                  {row.value.map((v) => (
                    <div key={v}>{"    "}{str(v)}<span className="text-white/40">,</span></div>
                  ))}
                  <div className="text-white/40">{"  ],"}</div>
                </>
              )}
            </div>
          ))}
          <div className="text-white/40">{"};"}</div>
        </div>
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t text-[11px]" style={{ borderColor: "var(--border)", fontFamily: "var(--font-mono)" }}>
          <span className="flex items-center gap-2 text-emerald-300/80"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />online</span>
          <span className="text-white/30">AI · Backend · Automation</span>
        </div>
      </div>
    </div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const increment = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, 1500 / steps);
    return () => clearInterval(interval);
  }, [inView, value]);
  return (
    <span ref={ref} className="gradient-text">
      {count}{suffix}
    </span>
  );
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } } };

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  usePauseOffscreen(ref);

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <div aria-hidden className="glow-orb -top-40 -right-40 w-[520px] sm:w-[720px] h-[520px] sm:h-[720px] animate-drift-b" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)" }} />
      <div aria-hidden className="glow-orb -bottom-40 -left-40 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] animate-drift-a" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)" }} />

      <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 sm:mb-10">
          <span className="section-label">01 / About</span>
          <div className="w-10 h-px bg-indigo-500/40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Profile card */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start order-2 lg:order-1">
            <ProfileCard />
          </motion.div>

          {/* Right — Content */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <motion.div variants={itemVariants}>
              <h2 className="section-title mb-4 sm:mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
                Turning Business Logic into{" "}
                <span className="gradient-text">Intelligent Systems</span>
              </h2>
              <p className="section-lead">
                AI Backend Engineer with 1+ years of experience building production RAG systems,
                multi-agent workflows, AI automation platforms, and scalable backend architectures.
              </p>
              <p className="section-lead mt-3">
                I specialize in turning complex business processes into intelligent autonomous systems.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.04, y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="card p-4 sm:p-5 overflow-hidden cursor-default">
                  <div className="font-display font-extrabold leading-none gradient-text" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-white/50 mt-2 leading-tight" style={{ fontFamily: "var(--font-body)" }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {["LangGraph", "FastAPI", "Next.js", "GPT-4o", "Pinecone", "n8n"].map((tech) => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

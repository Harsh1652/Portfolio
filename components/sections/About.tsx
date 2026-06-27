"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "AI Systems Built" },
  { value: 300, suffix: "+", label: "Pages Processed" },
  { value: 200, suffix: "+", label: "Calls Daily" },
  { value: 5, suffix: "+", label: "Deployments" },
];

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
const itemVariants = { hidden: { opacity: 0, y: 50, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1] } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <div className="noise-overlay" />
      <motion.div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(139,92,246,0.06)" }} animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 1.15, 0.9, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(99,102,241,0.04)" }} animate={{ x: [0, 40, -20, 0], y: [0, -30, 30, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

      <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-4">
          <span className="section-label">01 / About</span>
          <div className="w-10 h-px bg-indigo-500/40" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image placeholder */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[280px] sm:max-w-sm">
              <div className="relative rounded-2xl overflow-hidden glass-bright p-1" style={{ aspectRatio: "4/5" }}>
                <div className="w-full h-full rounded-xl" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 50%, rgba(14,165,233,0.05) 100%)" }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-display font-extrabold gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 10vw, 6rem)" }}>HG</div>
                      <p className="text-xs font-mono text-white/30 mt-2 tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>AI & Backend Engineer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-16 sm:w-20 h-16 sm:h-20 rounded-2xl glass border border-indigo-500/20 flex items-center justify-center animate-float text-xl sm:text-2xl">🤖</div>
              <div className="absolute -bottom-3 -left-3 w-14 sm:w-18 h-14 sm:h-18 rounded-xl glass border border-violet-500/20 flex items-center justify-center animate-float-slow text-lg sm:text-xl">⚡</div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="section-title mb-4 sm:mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
                Turning Business Logic into{" "}
                <span className="gradient-text">Intelligent Systems</span>
              </h2>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                AI Backend Engineer with 1+ years of experience building production RAG systems,
                multi-agent workflows, AI automation platforms, and scalable backend architectures.
              </p>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                I specialize in turning complex business processes into intelligent autonomous systems.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.04, y: -3 }} transition={{ type: "spring", stiffness: 400, damping: 20 }} className="p-3 sm:p-4 rounded-xl glass hover-lift overflow-hidden cursor-default">
                  <div className="font-display font-extrabold leading-none gradient-text" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 2vw, 1.9rem)" }}>
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs text-white/40 mt-1 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
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

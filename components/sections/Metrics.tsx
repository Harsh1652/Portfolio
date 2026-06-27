"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: 200, suffix: "+", label: "Calls Processed Daily", icon: "📞", color: "#818cf8" },
  { value: 50, suffix: "%", label: "Prompt Cost Reduction", icon: "💰", color: "#34d399" },
  { value: 300, suffix: "+", label: "Page Documents", icon: "📄", color: "#38bdf8" },
  { value: 10, suffix: "+", label: "AI Agents Built", icon: "🤖", color: "#a78bfa" },
  { value: 95, suffix: "%", label: "Hindi Accuracy", icon: "🎯", color: "#f59e0b" },
];

function AnimatedMetric({ value, suffix, label, icon, color, delay }: typeof metrics[0] & { delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const steps = 55;
      const increment = value / steps;
      const interval = setInterval(() => {
        start += increment;
        if (start >= value) { setCount(value); clearInterval(interval); }
        else setCount(Math.floor(start));
      }, 1800 / steps);
      return () => clearInterval(interval);
    }, delay * 120);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.04, y: -4 }}
      className="group relative p-5 sm:p-6 lg:p-8 rounded-2xl glass hover-lift text-center cursor-default"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }} />
      <div className="relative z-10">
        <div className="text-2xl sm:text-3xl mb-3">{icon}</div>
        <div className="font-display font-extrabold leading-none mb-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)", color }}>
          {count}{suffix}
        </div>
        <p className="text-xs sm:text-sm text-white/45 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
    </motion.div>
  );
}

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="metrics" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Background large text - clamped to avoid overflow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
        <span className="font-display font-extrabold opacity-[0.015] select-none whitespace-nowrap" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(4rem, 15vw, 14rem)" }}>
          IMPACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 sm:w-12 h-px bg-sky-500/40" />
            <span className="section-label">06 / Impact</span>
            <div className="w-8 sm:w-12 h-px bg-sky-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>Numbers That <span className="gradient-text">Matter</span></h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>Real production metrics from AI systems I&apos;ve built and deployed.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m, i) => <AnimatedMetric key={m.label} {...m} delay={i} />)}
        </div>
      </div>
    </section>
  );
}


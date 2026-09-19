"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneCall, TrendingDown, FileText, Bot, Languages, type LucideIcon } from "lucide-react";

const metrics: { value: number; suffix: string; label: string; icon: LucideIcon; color: string }[] = [
  { value: 200, suffix: "+", label: "Calls Processed Daily", icon: PhoneCall, color: "#818cf8" },
  { value: 50, suffix: "%", label: "Prompt Cost Reduction", icon: TrendingDown, color: "#34d399" },
  { value: 300, suffix: "+", label: "Page Documents", icon: FileText, color: "#38bdf8" },
  { value: 10, suffix: "+", label: "AI Agents Built", icon: Bot, color: "#a78bfa" },
  { value: 95, suffix: "%", label: "Hindi Accuracy", icon: Languages, color: "#f59e0b" },
];

function AnimatedMetric({ value, suffix, label, icon: Icon, color, delay, className = "" }: typeof metrics[0] & { delay: number; className?: string }) {
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
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: delay * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      className={`group card p-5 sm:p-6 cursor-default overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 0%, ${color}14, transparent 70%)` }} />
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 sm:mb-8" style={{ background: `${color}14`, border: `1px solid ${color}30`, color }}>
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <div className="font-display font-extrabold leading-none mb-2.5 tabular-nums" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 2.1vw, 2.05rem)", color }}>
          {count}{suffix}
        </div>
        <p className="text-sm text-white/55 leading-snug" style={{ fontFamily: "var(--font-body)" }}>{label}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-70 transition-opacity duration-500" style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }} />
    </motion.div>
  );
}

export default function Metrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="metrics" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* Background large text - clamped to avoid overflow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden>
        <span className="font-display font-extrabold opacity-[0.02] select-none whitespace-nowrap" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(4rem, 15vw, 14rem)" }}>
          IMPACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 sm:w-12 h-px bg-sky-500/40" />
            <span className="section-label">05 / Impact</span>
            <div className="w-8 sm:w-12 h-px bg-sky-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>Numbers That <span className="gradient-text">Matter</span></h2>
          <p className="section-lead mt-4 max-w-xl mx-auto">Real production metrics from AI systems I&apos;ve built and deployed.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {metrics.map((m, i) => <AnimatedMetric key={m.label} {...m} delay={i} className={i === metrics.length - 1 ? "col-span-2 lg:col-span-1" : ""} />)}
        </div>
      </div>
    </section>
  );
}


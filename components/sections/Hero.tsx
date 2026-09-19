"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { site } from "@/lib/site";
import { usePauseOffscreen } from "@/lib/usePauseOffscreen";

const NeuralNetwork = dynamic(() => import("../three/NeuralNetwork"), { ssr: false });

const roles = [
  "Building Agentic AI",
  "Production RAG Systems",
  "Multi-Agent Workflows",
  "Automation Platforms",
  "Backend Architectures",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // no point animating the tagline once the hero is scrolled away or the tab is hidden
      if (document.hidden || window.scrollY > window.innerHeight) return;
      setIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-7 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 flex items-center text-sm"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-indigo-400">{">"}</span>
          <span className="ml-2 text-white/65">{roles[index]}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
};

export default function Hero({ active = true }: { active?: boolean }) {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  usePauseOffscreen(sectionRef);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = spotlightRef.current;
        if (!el || window.scrollY > window.innerHeight) return;
        el.style.opacity = "1";
        el.style.transform = `translate3d(${e.clientX - 500}px, ${e.clientY + window.scrollY - 500}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden aurora-bg grid-bg">
      <div ref={spotlightRef} aria-hidden className="absolute top-0 left-0 w-[1000px] h-[1000px] pointer-events-none z-0 opacity-0 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 50%)", willChange: "transform" }} />
      <div aria-hidden className="glow-orb top-[10%] left-[8%] w-[420px] sm:w-[640px] h-[420px] sm:h-[640px] animate-drift-a" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)" }} />
      <div aria-hidden className="glow-orb bottom-[8%] right-[10%] w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] animate-drift-b" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)" }} />
      <div aria-hidden className="glow-orb top-[35%] right-[25%] w-[420px] h-[420px] hidden sm:block animate-drift-c" style={{ background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
        {/* Left */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pt-8 lg:pt-0">
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border"
              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "var(--font-mono)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 10vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              <motion.span className="block" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}>Harsh</motion.span>
              <motion.span className="block gradient-text" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.48, ease: [0.23, 1, 0.32, 1] }}>Gupta</motion.span>
            </motion.h1>
          </div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl font-semibold text-white/80" style={{ fontFamily: "var(--font-display)" }}>
              AI & Backend Engineer
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <RotatingRole />
          </motion.div>

          <motion.p variants={itemVariants} className="text-[15px] sm:text-base text-white/60 leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-body)" }}>
            I build production-ready AI systems that automate complex business workflows.
            From multi-agent architectures to enterprise document intelligence, I focus on
            scalable backend engineering powered by LLMs.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            <motion.a
              href="#projects"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "var(--font-body)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              View Projects
            </motion.a>
            <motion.a
              href={site.resumeUrl}
              target="_blank"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright"
              style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ fontFamily: "var(--font-body)", color: "rgba(165,180,252,0.9)", border: "1px solid rgba(99,102,241,0.25)" }}
              whileHover={{ scale: 1.04, borderColor: "rgba(99,102,241,0.6)", boxShadow: "0 0 16px rgba(99,102,241,0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-1">
            {[{ label: "GitHub", href: "https://github.com/Harsh1652" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-gupta16/" }, { label: "YouTube", href: "/youtube" }, { label: "Email", href: "mailto:harsh160502@gmail.com" }].map((s) => (
              <a key={s.label} href={s.href} {...(s.href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })} className="text-xs font-mono text-white/45 hover:text-white transition-colors" style={{ fontFamily: "var(--font-mono)" }}>
                {s.label}
              </a>
            ))}
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>
        </motion.div>

        {/* Right — 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[320px] sm:h-[420px] lg:h-[560px] w-full"
        >
          <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.12), transparent)" }} />
          <div className="relative w-full h-full">
            {active && <NeuralNetwork />}
          </div>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass border text-xs font-mono text-indigo-300/60 text-center whitespace-nowrap"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Interactive Neural Network
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-white/20" style={{ fontFamily: "var(--font-mono)" }}>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-scroll-hint" />
      </motion.div>
    </section>
  );
}

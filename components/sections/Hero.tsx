"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

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
    const interval = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2500);
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
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-indigo-400">{">"}</span>
          <span className="ml-2 text-white/55">{roles[index]}</span>
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
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] } },
};

export default function Hero() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(99,102,241,0.07), transparent 50%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden aurora-bg grid-bg">
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="noise-overlay" />
      <motion.div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(99,102,241,0.08)" }} animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(139,92,246,0.07)" }} animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0], scale: [1, 0.9, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      <motion.div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(56,189,248,0.05)" }} animate={{ x: [0, 30, -40, 0], y: [0, -40, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
        {/* Left */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pt-8 lg:pt-0">
          <motion.div variants={itemVariants}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border"
              style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "'JetBrains Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-extrabold leading-none tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.8rem, 10vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              <motion.span className="block" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}>Harsh</motion.span>
              <motion.span className="block gradient-text" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.48, ease: [0.23, 1, 0.32, 1] }}>Gupta</motion.span>
            </motion.h1>
          </div>

          <motion.div variants={itemVariants}>
            <p className="text-lg sm:text-xl font-semibold text-white/80" style={{ fontFamily: "'Syne', sans-serif" }}>
              AI & Backend Engineer
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <RotatingRole />
          </motion.div>

          <motion.p variants={itemVariants} className="text-sm sm:text-base text-white/50 leading-relaxed max-w-lg" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            I build production-ready AI systems that automate complex business workflows.
            From multi-agent architectures to enterprise document intelligence, I focus on
            scalable backend engineering powered by LLMs.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 pt-1">
            <motion.a
              href="#projects"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "'DM Sans', sans-serif" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="https://docs.google.com/document/d/1MGhI2lXna21Xjvbatqwn2Zm9pVr2NzyJv6mw0ReqpdU/edit?usp=sharing"
              target="_blank"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.8)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
            <motion.a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(165,180,252,0.9)", border: "1px solid rgba(99,102,241,0.25)" }}
              whileHover={{ scale: 1.04, borderColor: "rgba(99,102,241,0.6)", boxShadow: "0 0 16px rgba(99,102,241,0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-1">
            {[{ label: "GitHub", href: "https://github.com/Harsh1652" }, { label: "LinkedIn", href: "https://www.linkedin.com/in/harsh-gupta16/" }, { label: "Email", href: "mailto:harsh160502@gmail.com" }].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
          <div className="absolute inset-0 rounded-3xl bg-indigo-600/4 blur-3xl" />
          <div className="relative w-full h-full">
            <NeuralNetwork />
          </div>
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass border text-xs font-mono text-indigo-300/60 text-center whitespace-nowrap"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Interactive Neural Network
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-white/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = [
  { id: "ai", label: "AI & LLMs", icon: "🧠", color: "#818cf8", items: [{ name: "OpenAI GPT-4o", level: 95, icon: "🤖" }, { name: "LangGraph", level: 90, icon: "🔗" }, { name: "LangChain", level: 85, icon: "⛓️" }, { name: "LangSmith", level: 80, icon: "🔬" }, { name: "Pinecone", level: 85, icon: "🌲" }, { name: "Cohere", level: 75, icon: "⚡" }, { name: "RAG Systems", level: 90, icon: "📚" }, { name: "Prompt Eng.", level: 90, icon: "✍️" }] },
  { id: "backend", label: "Backend", icon: "⚙️", color: "#38bdf8", items: [{ name: "FastAPI", level: 90, icon: "🚀" }, { name: "Node.js", level: 80, icon: "💚" }, { name: "Express.js", level: 80, icon: "🎯" }, { name: "REST APIs", level: 90, icon: "🔌" }, { name: "JWT Auth", level: 85, icon: "🔐" }, { name: "Redis", level: 75, icon: "🗄️" }, { name: "WebSockets", level: 80, icon: "📡" }, { name: "Python", level: 90, icon: "🐍" }] },
  { id: "frontend", label: "Frontend", icon: "🎨", color: "#a78bfa", items: [{ name: "Next.js", level: 85, icon: "▲" }, { name: "React", level: 85, icon: "⚛️" }, { name: "TypeScript", level: 80, icon: "📘" }, { name: "Tailwind CSS", level: 85, icon: "🎨" }, { name: "Framer Motion", level: 75, icon: "✨" }] },
  { id: "databases", label: "Databases", icon: "🗃️", color: "#34d399", items: [{ name: "MongoDB", level: 85, icon: "🍃" }, { name: "PostgreSQL", level: 75, icon: "🐘" }, { name: "Pinecone", level: 85, icon: "🌲" }, { name: "Redis", level: 75, icon: "🔴" }] },
  { id: "cloud", label: "DevOps", icon: "☁️", color: "#f59e0b", items: [{ name: "Docker", level: 80, icon: "🐋" }, { name: "AWS", level: 70, icon: "☁️" }, { name: "Git/GitHub", level: 90, icon: "🐙" }, { name: "CI/CD", level: 70, icon: "🔁" }] },
];

const archNodes = [
  { label: "Frontend", icon: "🖥️", color: "#a78bfa" }, { label: "→", icon: "", color: "" },
  { label: "API Gateway", icon: "🔌", color: "#38bdf8" }, { label: "→", icon: "", color: "" },
  { label: "AI Router", icon: "🧭", color: "#818cf8" }, { label: "→", icon: "", color: "" },
  { label: "Planner Agent", icon: "📋", color: "#6366f1" }, { label: "→", icon: "", color: "" },
  { label: "Research Agent", icon: "🔍", color: "#8b5cf6" }, { label: "→", icon: "", color: "" },
  { label: "Memory", icon: "💾", color: "#7c3aed" }, { label: "→", icon: "", color: "" },
  { label: "Vector DB", icon: "🌲", color: "#34d399" }, { label: "→", icon: "", color: "" },
  { label: "LLM", icon: "🤖", color: "#f59e0b" }, { label: "→", icon: "", color: "" },
  { label: "Response", icon: "✅", color: "#10b981" },
];

function SkillNode({ item, color, index }: { item: { name: string; level: number; icon: string }; color: string; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center gap-1.5 group"
    >
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl"
        style={{ background: `${color}10`, border: `1px solid ${color}${hovered ? "40" : "20"}`, transition: "border-color 0.2s" }}
      >
        {item.icon}
      </motion.div>
      <span className="text-[10px] sm:text-xs text-center leading-tight max-w-[56px] sm:max-w-[64px]" style={{ fontFamily: "'DM Sans', sans-serif", color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)", transition: "color 0.2s" }}>
        {item.name}
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap pointer-events-none"
            style={{ background: "rgba(8,8,8,0.95)", border: `1px solid ${color}30`, fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span style={{ color }}>{item.level}%</span><span className="text-white/30 ml-1">prof.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState("ai");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const active = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">05 / Skills</span>
            <div className="w-8 h-px bg-emerald-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>Tech <span className="gradient-text">Arsenal</span></h2>
        </motion.div>

        {/* Category tabs — scrollable on mobile */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", background: activeTab === cat.id ? `${cat.color}15` : "rgba(255,255,255,0.03)", border: `1px solid ${activeTab === cat.id ? `${cat.color}30` : "rgba(255,255,255,0.06)"}`, color: activeTab === cat.id ? cat.color : "rgba(255,255,255,0.4)" }}
            >
              <span className="mr-1">{cat.icon}</span>{cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="rounded-2xl p-5 sm:p-8 glass mb-4 sm:mb-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{active.icon}</span>
              <h3 className="font-display font-bold text-lg sm:text-xl" style={{ fontFamily: "'Syne', sans-serif", color: active.color }}>{active.label}</h3>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {active.items.map((item, i) => <SkillNode key={item.name} item={item} color={active.color} index={i} />)}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* AI Architecture flow */}
        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(4px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }} className="rounded-2xl p-5 sm:p-8 glass">
          <div className="flex items-center gap-3 mb-6">
            <span className="section-label">AI Architecture Flow</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-center">
            {archNodes.map((node, i) =>
              node.label === "→" ? (
                <span key={i} className="text-white/15 hidden sm:block">→</span>
              ) : (
                <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }} className="flex flex-col items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-center" style={{ background: `${node.color}10`, border: `1px solid ${node.color}20` }}>
                  <span className="text-base sm:text-lg">{node.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono whitespace-nowrap" style={{ color: node.color, fontFamily: "'JetBrains Mono', monospace" }}>{node.label}</span>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Server, LayoutTemplate, Database, Cloud, type LucideIcon } from "lucide-react";

const categories: { id: string; label: string; blurb: string; icon: LucideIcon; color: string; span: string; items: string[] }[] = [
  { id: "ai", label: "AI & LLMs", blurb: "Agents, retrieval and evaluation", icon: Brain, color: "#818cf8", span: "lg:col-span-3", items: ["OpenAI GPT-4o", "LangGraph", "LangChain", "LangSmith", "RAG Systems", "Prompt Engineering", "Pinecone", "Cohere"] },
  { id: "backend", label: "Backend", blurb: "APIs, auth and real-time services", icon: Server, color: "#38bdf8", span: "lg:col-span-3", items: ["Python", "FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets", "JWT Auth", "Redis"] },
  { id: "frontend", label: "Frontend", blurb: "Interfaces for AI products", icon: LayoutTemplate, color: "#a78bfa", span: "lg:col-span-2", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { id: "databases", label: "Databases", blurb: "Document, relational and vector", icon: Database, color: "#34d399", span: "lg:col-span-2", items: ["MongoDB", "PostgreSQL", "Pinecone", "Redis"] },
  { id: "cloud", label: "DevOps", blurb: "Shipping and running it", icon: Cloud, color: "#f59e0b", span: "lg:col-span-2", items: ["Docker", "AWS", "Git / GitHub", "CI/CD"] },
];

const archNodes = [
  { label: "Frontend", color: "#a78bfa" },
  { label: "API Gateway", color: "#38bdf8" },
  { label: "AI Router", color: "#818cf8" },
  { label: "Planner Agent", color: "#818cf8" },
  { label: "Research Agent", color: "#a78bfa" },
  { label: "Memory", color: "#a78bfa" },
  { label: "Vector DB", color: "#34d399" },
  { label: "LLM", color: "#f59e0b" },
  { label: "Response", color: "#34d399" },
];

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">04 / Skills</span>
            <div className="w-8 h-px bg-emerald-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>Tech <span className="gradient-text">Arsenal</span></h2>
          <p className="section-lead mt-4 max-w-xl">The tools I reach for to take an AI system from prototype to production.</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease }}
                className={`group card p-5 sm:p-6 overflow-hidden ${cat.span} ${i === categories.length - 1 ? "sm:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(420px circle at 0% 0%, ${cat.color}12, transparent 65%)` }} />
                <div className="relative flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cat.color}14`, border: `1px solid ${cat.color}30`, color: cat.color }}>
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "var(--font-display)" }}>{cat.label}</h3>
                    <p className="text-xs text-white/45 mt-0.5" style={{ fontFamily: "var(--font-body)" }}>{cat.blurb}</p>
                  </div>
                </div>
                <div className="relative flex flex-wrap gap-1.5">
                  {cat.items.map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Architecture flow */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5, ease }} className="card p-5 sm:p-8 mt-3 sm:mt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <span className="section-label">AI Architecture Flow</span>
            <span className="text-xs text-white/35" style={{ fontFamily: "var(--font-mono)" }}>request → response</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:flex lg:items-stretch gap-2 lg:gap-0">
            {archNodes.map((node, i) => (
              <div key={node.label} className="flex items-stretch lg:flex-1 min-w-0">
                <motion.div whileHover={{ y: -3 }} className="flex-1 min-w-0 px-2 py-3 rounded-xl text-center flex flex-col justify-center" style={{ background: `${node.color}0d`, border: `1px solid ${node.color}26` }}>
                  <div className="text-[10px] text-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="text-[10.5px] sm:text-[11px] leading-tight" style={{ color: node.color, fontFamily: "var(--font-mono)" }}>{node.label}</div>
                </motion.div>
                {i < archNodes.length - 1 && <div className="hidden lg:block w-3 xl:w-4 h-px flex-shrink-0 self-center" style={{ background: "rgba(255,255,255,0.18)" }} />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

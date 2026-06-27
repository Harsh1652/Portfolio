"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1, tag: "01",
    title: "Multi-Agent Document Intelligence",
    subtitle: "Contract Analysis System",
    description: "AI-powered contract analysis using multiple autonomous agents capable of extracting, validating, and reviewing enterprise contracts with structured outputs and streaming responses.",
    tech: ["LangGraph", "FastAPI", "GPT-4o", "Next.js", "Pydantic", "LangSmith"],
    metrics: [{ value: "50%", label: "LLM Cost Reduction" }, { value: "∞", label: "Streaming" }, { value: "Multi", label: "Agent Workflow" }, { value: "100%", label: "Structured Output" }],
    color: "#6366f1", gradient: "from-indigo-600/20 to-violet-600/10", icon: "🧠", github: "#", demo: "#",
  },
  {
    id: 2, tag: "02",
    title: "Stock Research Agent",
    subtitle: "Autonomous Financial Analysis",
    description: "5 parallel AI agents collaborating for comprehensive stock research — financial data analysis, news intelligence, sentiment analysis, and buy/hold/sell recommendations in 30 seconds.",
    tech: ["LangGraph", "OpenAI", "FastAPI", "Redis", "WebSockets", "Python"],
    metrics: [{ value: "30s", label: "Full Research" }, { value: "$0.0003", label: "Per Analysis" }, { value: "5x", label: "Parallel Agents" }, { value: "95%", label: "Accuracy" }],
    color: "#38bdf8", gradient: "from-sky-600/20 to-cyan-600/10", icon: "📈", github: "#", demo: "#",
  },
  {
    id: 3, tag: "03",
    title: "Regulatory Document Intelligence",
    subtitle: "Enterprise RAG Platform",
    description: "Enterprise-grade RAG platform processing 300+ page regulatory PDFs with workspace isolation, RBAC, semantic search, and real-time document processing for compliance teams.",
    tech: ["Pinecone", "LangChain", "FastAPI", "MongoDB", "Next.js", "Docker"],
    metrics: [{ value: "300+", label: "Page PDFs" }, { value: "RBAC", label: "Access Control" }, { value: "Semantic", label: "Search" }, { value: "Multi", label: "Workspace" }],
    color: "#34d399", gradient: "from-emerald-600/20 to-teal-600/10", icon: "📋", github: "#", demo: "#",
  },
];

function ProjectCard({ project, index, onOpen }: { project: typeof projects[0]; index: number; onOpen: (id: number) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center py-10 sm:py-12 border-b border-white/5"
    >
      {/* Content */}
      <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
        <div className="space-y-4 sm:space-y-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace", color: project.color }}>{project.tag} / Project</span>
            <div className="w-8 h-px" style={{ background: project.color, opacity: 0.4 }} />
          </div>

          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
              <span className="text-xl sm:text-2xl">{project.icon}</span>
              <h3 className="font-display font-bold" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>{project.title}</h3>
            </div>
            <p className="text-xs font-mono text-white/40 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.subtitle}</p>
            <p className="text-sm sm:text-base text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip" style={{ background: `${project.color}15`, borderColor: `${project.color}25`, color: project.color }}>{t}</span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-2.5 sm:p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-display font-bold text-base sm:text-lg" style={{ fontFamily: "'Syne', sans-serif", color: project.color }}>{m.value}</div>
                <div className="text-xs text-white/40 mt-0.5 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button onClick={() => onOpen(project.id)} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35`, color: project.color, fontFamily: "'DM Sans', sans-serif" }}>
              Architecture →
            </button>
            <a href={project.github} className="px-4 py-2 rounded-xl text-sm font-semibold glass-bright" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)" }}>GitHub</a>
            <a href={project.demo} className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>Live Demo</a>
          </div>
        </div>
      </div>

      {/* Visual */}
      <div className={`${isEven ? "order-2" : "order-2 lg:order-1"} w-full`}>
        <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient} p-px`} style={{ aspectRatio: "16/10" }}>
          <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{ background: "rgba(8,8,8,0.75)" }}>
            <div className="relative w-full h-full p-6 sm:p-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 sm:w-20 h-14 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl animate-float" style={{ background: `${project.color}12`, border: `1px solid ${project.color}25` }}>{project.icon}</div>
              </div>
              {project.tech.slice(0, 4).map((tech, i) => {
                const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
                const radius = 35;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                return (
                  <div key={tech} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}>
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-mono animate-float whitespace-nowrap" style={{ animationDelay: `${i * 0.5}s`, background: `${project.color}10`, border: `1px solid ${project.color}20`, color: project.color, fontFamily: "'JetBrains Mono', monospace" }}>{tech}</div>
                  </div>
                );
              })}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                {[0,1,2,3].map((i) => { const angle = (i/4)*Math.PI*2 - Math.PI/2; const r = 35; return <line key={i} x1="50%" y1="50%" x2={`${50+r*Math.cos(angle)}%`} y2={`${50+r*Math.sin(angle)}%`} stroke={project.color} strokeWidth="1" strokeDasharray="3 3" />; })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ id, onClose }: { id: number; onClose: () => void }) {
  const project = projects.find((p) => p.id === id);
  if (!project) return null;
  return (
    <motion.div className="fixed inset-0 z-[500] flex items-end sm:items-center justify-center p-0 sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl glass-bright p-5 sm:p-8"
        initial={{ scale: 0.95, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors">✕</button>
        <div className="space-y-5">
          <div className="flex items-center gap-3 pr-8">
            <span className="text-2xl sm:text-3xl">{project.icon}</span>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>{project.title}</h3>
              <p className="text-xs text-white/40 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.subtitle}</p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.description}</p>
          <div className="rounded-xl p-4 sm:p-5" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-mono text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// System Architecture</p>
            <div className="flex flex-wrap gap-2 items-center">
              {["Input","→","API Gateway","→","Orchestrator","→","AI Agents","→","Memory","→","Output"].map((item,i) => (
                <span key={i} className={item === "→" ? "text-white/20 text-sm" : "px-2 py-1 rounded text-xs font-mono"} style={item !== "→" ? { background: `${project.color}10`, border: `1px solid ${project.color}20`, color: project.color, fontFamily: "'JetBrains Mono', monospace" } : { fontFamily: "'JetBrains Mono', monospace" }}>{item}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-3 sm:p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-display font-bold text-lg sm:text-xl" style={{ fontFamily: "'Syne', sans-serif", color: project.color }}>{m.value}</div>
                <div className="text-xs sm:text-sm text-white/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (<span key={t} className="tech-chip" style={{ background: `${project.color}15`, borderColor: `${project.color}25`, color: project.color }}>{t}</span>))}
          </div>
          <div className="flex gap-3">
            <a href={project.github} className="flex-1 text-center py-3 rounded-xl glass-bright text-sm font-semibold text-white/70" style={{ fontFamily: "'DM Sans', sans-serif" }}>GitHub</a>
            <a href={project.demo} className="flex-1 text-center py-3 rounded-xl text-sm font-semibold" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35`, color: project.color, fontFamily: "'DM Sans', sans-serif" }}>Live Demo</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">02 / Featured Work</span>
            <div className="w-8 h-px bg-indigo-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>Featured <span className="gradient-text">AI Systems</span></h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>Production deployments that solve real business problems at scale.</p>
        </motion.div>
        <div className="divide-y divide-white/5">
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} onOpen={setOpenProject} />)}
        </div>
      </div>
      <AnimatePresence>
        {openProject !== null && <ProjectModal id={openProject} onClose={() => setOpenProject(null)} />}
      </AnimatePresence>
    </section>
  );
}


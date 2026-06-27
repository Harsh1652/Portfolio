"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useLenis } from "@/components/providers/SmoothScroll";

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    index: "01",
    title: "Multi-Agent Document Intelligence",
    subtitle: "Contract Analysis System",
    tagline: "Enterprise AI that reads, reasons, and reports — at scale.",
    color: "#6366f1",
    colorDim: "#6366f120",
    year: "2024",
    category: "AI Systems",
    overview: "Enterprise organizations spend significant time reviewing contracts, legal agreements, and business documents manually. Traditional LLM-based chatbots often struggle with long documents, structured outputs, and complex reasoning across multiple sections. The goal of this project was to build a production-ready multi-agent platform capable of analyzing contracts, extracting key clauses, identifying risks, and generating structured summaries through collaborative AI agents.",
    problem: "Legal and procurement teams manually review lengthy contracts, leading to slow turnaround times and inconsistent analysis. Existing chatbot-style solutions often lose context in long documents, produce inconsistent outputs, and cannot reason through multiple document sections simultaneously.",
    solution: "I designed a multi-agent architecture where specialized AI agents collaborate to complete different stages of document analysis. Instead of relying on a single LLM prompt, the workflow distributes responsibilities across multiple autonomous agents coordinated through LangGraph — each focusing on document understanding, clause extraction, risk identification, summary generation, and response validation. The final output is streamed back in real time with structured JSON responses.",
    architecture: [
      { label: "PDF Upload", icon: "📄" },
      { label: "Parser", icon: "⚙️" },
      { label: "Chunking", icon: "✂️" },
      { label: "Retriever", icon: "🔍" },
      { label: "Planner Agent", icon: "🧭" },
      { label: "Clause Agent", icon: "📋" },
      { label: "Risk Agent", icon: "⚠️" },
      { label: "Summary Agent", icon: "📝" },
      { label: "Aggregator", icon: "🔗" },
      { label: "Structured Output", icon: "✅" },
      { label: "Frontend", icon: "🖥️" },
    ],
    features: [
      "Multi-agent orchestration via LangGraph",
      "Streaming responses using Server-Sent Events",
      "Prompt caching for cost optimization",
      "Structured outputs with Pydantic",
      "LangSmith tracing & observability",
      "Conversation memory across sessions",
      "Modular, swappable agent architecture",
    ],
    tech: ["LangGraph", "OpenAI GPT-4o", "FastAPI", "Next.js", "TypeScript", "LangSmith", "Pydantic"],
    results: [
      { value: "50%", label: "LLM cost reduction via prompt caching" },
      { value: "∞", label: "Real-time streaming responses" },
      { value: "5+", label: "Specialized agents collaborating" },
      { value: "100%", label: "Structured JSON outputs" },
    ],
    role: "Designed the complete architecture, developed the backend orchestration using LangGraph, implemented streaming APIs, structured outputs, and integrated frontend interactions.",
    github: "https://github.com/Harsh1652/Multi-Agent-Document-Intelligence",
    demo: "https://multi-agent-document-intelligence.vercel.app/",
  },
  {
    id: 2,
    index: "02",
    title: "Stock Research Agent",
    subtitle: "Autonomous Financial Analysis",
    tagline: "5 AI agents. Full market research. 30 seconds.",
    color: "#38bdf8",
    colorDim: "#38bdf820",
    year: "2024",
    category: "AI Systems",
    overview: "Investment research requires gathering information from multiple independent sources including financial statements, company fundamentals, market news, and investor sentiment.\n\nThis project automates that workflow using multiple AI agents working in parallel to generate comprehensive research reports.",
    problem: "Retail investors spend hours switching between finance websites, news platforms, and earnings reports before making investment decisions.\n\nThere was no single system capable of consolidating all this information into an explainable AI-generated report.",
    solution: "Built a five-agent research system where each AI agent specializes in one domain.\n\nInstead of sequential processing, agents execute in parallel, significantly reducing response time. The final recommendation is generated only after aggregating outputs from all research agents.",
    architecture: [
      { label: "Ticker", icon: "💬" },
      { label: "Planner", icon: "🧭" },
      { label: "News Agent", icon: "📰" },
      { label: "Financial Agent", icon: "📊" },
      { label: "Technical Agent", icon: "📈" },
      { label: "Sentiment Agent", icon: "🎯" },
      { label: "Company Agent", icon: "🏢" },
      { label: "Aggregator", icon: "🔗" },
      { label: "Buy / Hold / Sell Report", icon: "✅" },
    ],
    features: [
      "Parallel execution",
      "Multi-agent reasoning",
      "LangGraph reducers",
      "LangSmith observability",
      "Cost tracking",
      "Portfolio-ready reports",
    ],
    tech: ["Python", "LangGraph", "FastAPI", "OpenAI", "Tavily", "yfinance", "LangSmith"],
    results: [
      { value: "~30s", label: "Report generation time" },
      { value: "5", label: "Concurrent research streams" },
      { value: "$0.0003", label: "Average cost per report" },
    ],
    role: "Designed the agent workflow, implemented state management, integrated external APIs, and optimized latency using parallel graph execution.",
    github: "https://github.com/Harsh1652/Stock_Research_Agent/tree/main",
    demo: "https://stock-research-agent-smoky.vercel.app/",
  },
  {
    id: 3,
    index: "03",
    title: "Regulatory Document Intelligence",
    subtitle: "Enterprise RAG Platform",
    tagline: "300-page PDFs. Instant, accurate, compliant answers.",
    color: "#34d399",
    colorDim: "#34d39920",
    year: "2024",
    category: "AI Systems",
    overview: "Regulatory filings such as RHPs and DRHPs often exceed hundreds of pages, making manual information retrieval inefficient.\n\nThis platform enables organizations to query large regulatory documents using Retrieval-Augmented Generation (RAG).",
    problem: "Business analysts spend significant time searching through lengthy regulatory filings for specific information.\n\nTraditional keyword search lacks semantic understanding and often misses relevant sections.",
    solution: "Developed a production-grade RAG platform capable of ingesting large PDF documents, generating embeddings, and answering natural language queries with contextual accuracy.\n\nThe platform supports multiple organizations while maintaining complete workspace isolation.",
    architecture: [
      { label: "PDF", icon: "📄" },
      { label: "Chunking", icon: "✂️" },
      { label: "Embedding", icon: "🔢" },
      { label: "Pinecone", icon: "🌲" },
      { label: "Retriever", icon: "🔍" },
      { label: "OpenAI", icon: "🤖" },
      { label: "Response", icon: "✅" },
    ],
    features: [
      "Recursive chunking",
      "Semantic search",
      "Multi-tenant architecture",
      "JWT authentication",
      "RBAC",
      "Automated ingestion",
      "Workspace isolation",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Pinecone", "OpenAI", "Cohere", "n8n", "React", "TypeScript"],
    results: [
      { value: "300+", label: "Page PDFs supported" },
      { value: "<3s", label: "Query latency" },
      { value: "80%", label: "Manual effort reduced" },
    ],
    role: "Designed and developed the backend architecture, ingestion pipeline, retrieval system, authentication, and AI integration.",
    github: "https://github.com/Harsh1652/ai-regulatory-document-intelligence",
    demo: "",
  },
];

const sites = [
  {
    name: "Invisigent", url: "https://invisigent.com",
    description: "Marketing website for an AI startup — modern design system, optimized layouts, and a fast, responsive user experience.",
    tech: ["Next.js", "React", "TypeScript", "CSS"],
    color: "#818cf8",
    preview: { title: "Invisigent", tagline: "Intelligent business solutions powered by AI" },
    metrics: ["Responsive", "Performance Optimized", "SEO-Friendly"],
    caseStudy: {
      overview: "Invisigent is an AI startup focused on building intelligent business solutions. I developed the company's marketing website with an emphasis on performance, responsiveness, and a modern user experience that reflects the company's AI-first identity.",
      problem: "The company needed a professional web presence to communicate its services, establish credibility with potential clients, and support business development.",
      solution: "Built a responsive marketing website featuring a modern design system, optimized layouts, reusable UI components, and performance-focused implementation.\n\nThe website was designed to scale with future product offerings while maintaining fast load times across devices.",
      features: ["Responsive design", "Modern landing pages", "Optimized performance", "Reusable components", "SEO-friendly structure"],
      tech: ["Next.js", "React", "TypeScript", "HTML", "CSS"],
      role: "Designed and developed the frontend, implemented responsive layouts, optimized performance, and collaborated with the team on branding and user experience.",
    },
  },
  {
    name: "Baalaji Exports", url: "https://www.baalajiexports.com/",
    description: "Corporate exports website with a custom SEO management panel — admins update metadata and content without touching code.",
    tech: ["Next.js", "React", "Node.js", "MongoDB"],
    color: "#f59e0b",
    preview: { title: "Baalaji Exports", tagline: "Quality exports to 20+ countries worldwide" },
    metrics: ["SEO Dashboard", "Admin Panel", "MongoDB"],
    caseStudy: {
      overview: "Baalaji Exports required both a public-facing business website and an internal system for managing SEO content efficiently.\n\nBeyond developing the website, I also built a custom SEO management panel that allows administrators to update metadata and website content without modifying code.",
      problem: "Updating SEO content manually across multiple pages was time-consuming and required developer involvement.",
      solution: "Developed a responsive corporate website alongside a custom admin panel connected to MongoDB.\n\nThe internal dashboard enables non-technical users to manage SEO metadata and website content dynamically.",
      features: ["Responsive corporate website", "SEO management dashboard", "Dynamic metadata", "MongoDB integration", "Content management"],
      tech: ["Next.js", "React", "Node.js", "MongoDB", "REST APIs"],
      results: ["Eliminated manual code changes for SEO updates.", "Simplified website maintenance through an internal admin interface.", "Improved scalability for future content updates."],
      role: "Designed, developed, and deployed both the website and the custom SEO management platform.",
    },
  },
  {
    name: "ArtCart by Swati", url: "https://artcartbyswati.in/",
    description: "Shopify storefront for curated artwork and home décor — custom theme, mobile-first design, and a frictionless checkout aligned with the brand's Instagram identity.",
    tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    color: "#ec4899",
    preview: { title: "ArtCart by Swati", tagline: "Curated art for the discerning collector" },
    metrics: ["Custom Theme", "Mobile-First", "Instagram-Friendly"],
    caseStudy: {
      overview: "ArtCart by Swati is a Shopify-powered e-commerce store for curated artwork and home décor products. The goal was to create a premium shopping experience while maintaining a seamless integration with the founder's existing Instagram-driven sales strategy.",
      problem: "The business relied heavily on Instagram for customer engagement, but required a dedicated e-commerce storefront to improve product discovery, build customer trust, and streamline online purchases.",
      solution: "Customized a Shopify storefront with a clean, modern design focused on visual storytelling, mobile responsiveness, and a frictionless shopping experience. The site was optimized to complement social media traffic while leveraging Shopify's built-in commerce capabilities.",
      features: ["Custom Shopify theme customization", "Mobile-first responsive design", "Optimized product catalog", "Seamless checkout experience", "Instagram-friendly landing experience", "Performance optimization"],
      tech: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
      results: ["Delivered a polished online storefront aligned with the brand's visual identity.", "Improved the customer journey from Instagram discovery to product purchase.", "Enabled the founder to manage products, inventory, and orders directly through Shopify."],
      role: "Customized the Shopify storefront, implemented the frontend experience, optimized responsiveness and performance, and collaborated closely with the founder to translate the brand's Instagram presence into a cohesive e-commerce experience.",
    },
  },
];

// ─── Site Case Study Modal ────────────────────────────────────────────────────

function SiteCaseStudyModal({ site, onClose }: { site: typeof sites[0]; onClose: () => void }) {
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cs = site.caseStudy!;

  useEffect(() => {
    lenis.stop();
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.stopPropagation();
        const dy = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        el.scrollTop += dy;
      }
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });
    return () => {
      lenis.start();
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-stretch justify-end"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl flex flex-col"
        style={{ background: "rgba(8,8,8,0.98)", borderLeft: `1px solid ${site.color}20`, height: "100vh", zIndex: 1 }}
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        <div className="flex-shrink-0 flex items-center px-6 sm:px-10 pt-5 pb-3">
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>✕</button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
          <div className="px-6 sm:px-10 pb-20">
            {/* Hero */}
            <div className="mb-8">
              <span className="text-xs font-mono px-2 py-0.5 rounded mb-3 inline-block" style={{ background: `${site.color}15`, color: site.color, border: `1px solid ${site.color}20`, fontFamily: "'JetBrains Mono', monospace" }}>Website</span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>{site.name}</h2>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono" style={{ color: site.color, fontFamily: "'JetBrains Mono', monospace" }}>{site.url} ↗</a>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Overview</h3>
              <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cs.overview}</p>
            </div>

            {/* Problem */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)" }}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-400/60 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Problem</h3>
              <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cs.problem}</p>
            </div>

            {/* Solution */}
            <div className="mb-6 p-4 rounded-xl" style={{ background: `${site.color}06`, border: `1px solid ${site.color}15` }}>
              <h3 className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: site.color, fontFamily: "'JetBrains Mono', monospace", opacity: 0.7 }}>Solution</h3>
              {cs.solution.split("\n\n").map((p, i) => (
                <p key={i} className="text-sm text-white/55 leading-relaxed mb-2 last:mb-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>{p}</p>
              ))}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Key Features</h3>
              <ul className="space-y-2">
                {cs.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${site.color}15`, color: site.color }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {cs.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: `${site.color}10`, border: `1px solid ${site.color}20`, color: site.color, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Results */}
            {cs.results && cs.results.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Results</h3>
                <ul className="space-y-2">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${site.color}15`, color: site.color }}>✓</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* My Role */}
            <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>My Role</h3>
              <p className="text-sm text-white/55 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{cs.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Case Study Modal ──────────────────────────────────────────────────────────

function CaseStudyModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const lenis = useLenis();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lenis.stop();
    document.body.style.overflow = "hidden";

    const handleWheel = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        el.scrollTop += e.deltaY;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el === e.target || el.contains(e.target as Node)) {
        e.stopPropagation();
        const dy = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        el.scrollTop += dy;
      }
    };

    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", handleTouchMove, { capture: true, passive: true });

    return () => {
      lenis.start();
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[600] flex items-stretch justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel shell — animates in, does NOT scroll */}
      <motion.div
        className="relative w-full max-w-3xl flex flex-col"
        style={{ background: "rgba(8,8,8,0.98)", borderLeft: `1px solid ${project.color}20`, height: "100vh", zIndex: 1 }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
      >
        {/* Sticky close button sits above the scroll area */}
        <div className="flex-shrink-0 flex items-center px-6 sm:px-10 pt-5 pb-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ✕
          </button>
        </div>

        {/* Inner scroll container — this is what actually scrolls */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
        <div className="px-6 sm:px-10 pb-20">
          {/* Hero */}
          <div className="pt-10 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25`, fontFamily: "'JetBrains Mono', monospace" }}>{project.category}</span>
            </div>
            <h2 className="font-bold mb-3 leading-tight" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>{project.title}</h2>
            <p className="text-base sm:text-lg font-medium mb-2" style={{ color: project.color, fontFamily: "'DM Sans', sans-serif" }}>{project.tagline}</p>
            <p className="text-sm text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{project.subtitle}</p>
            <div className="flex gap-3 mt-6">
              <a href={project.github} className="px-4 py-2 rounded-xl text-sm font-semibold glass-bright" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)" }}>GitHub ↗</a>
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: `${project.color}18`, border: `1px solid ${project.color}35`, color: project.color, fontFamily: "'DM Sans', sans-serif" }}>Live Demo ↗</a>}
            </div>
          </div>

          {/* Results bento */}
          <div className="py-8 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-mono text-white/30 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// Key Results</p>
            <div className="grid grid-cols-2 gap-3">
              {project.results.map((r) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl"
                  style={{ background: `${project.color}08`, border: `1px solid ${project.color}20` }}
                >
                  <div className="font-extrabold leading-none mb-1" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", color: project.color }}>{r.value}</div>
                  <div className="text-xs text-white/45 leading-snug" style={{ fontFamily: "'DM Sans', sans-serif" }}>{r.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <Section title="Overview" color={project.color}>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.overview}</p>
          </Section>

          {/* Problem */}
          <Section title="Problem" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.problem}</p>
            </div>
          </Section>

          {/* Solution */}
          <Section title="Solution" color={project.color}>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.solution}</p>
          </Section>

          {/* Architecture */}
          <Section title="Architecture" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs font-mono text-white/25 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>// Data flow</p>
              <div className="flex flex-col">
                {project.architecture.map((node, i) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: `${project.color}0a`, border: `1px solid ${project.color}18` }}>
                      <span className="text-sm">{node.icon}</span>
                      <span className="text-xs font-mono" style={{ color: project.color, fontFamily: "'JetBrains Mono', monospace" }}>{node.label}</span>
                    </div>
                    {i < project.architecture.length - 1 && (
                      <div className="flex justify-center py-1">
                        <span className="text-white/20 text-xs">↓</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          {/* Features */}
          <Section title="Key Features" color={project.color}>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]" style={{ background: `${project.color}15`, color: project.color }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          {/* Tech Stack */}
          <Section title="Tech Stack" color={project.color}>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-xl text-xs font-mono" style={{ background: `${project.color}12`, border: `1px solid ${project.color}25`, color: project.color, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
              ))}
            </div>
          </Section>

          {/* Role */}
          <Section title="My Role" color={project.color}>
            <div className="p-4 sm:p-5 rounded-xl" style={{ background: `${project.color}08`, border: `1px solid ${project.color}18` }}>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>{project.role}</p>
            </div>
          </Section>
        </div>
        </div>{/* end inner scroll container */}
      </motion.div>
    </motion.div>
  );
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="py-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-4 rounded-full" style={{ background: color }} />
        <h3 className="font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "'Syne', sans-serif", color }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Project List Item ────────────────────────────────────────────────────────

function ProjectListItem({ project, index, onOpen }: { project: typeof projects[0]; index: number; onOpen: (id: number) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project.id)}
      className="group relative cursor-pointer"
    >
      {/* Hover background glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(ellipse at 20% 50%, ${project.color}08, transparent 70%)` }}
      />

      <div
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:gap-8 items-center py-7 sm:py-8 px-1 border-b"
        style={{ borderColor: hovered ? `${project.color}25` : "rgba(255,255,255,0.05)", transition: "border-color 0.3s" }}
      >
        <div className="flex gap-5 sm:gap-8 items-center">
          {/* Index */}
          <motion.span
            animate={{ color: hovered ? project.color : "rgba(255,255,255,0.12)" }}
            transition={{ duration: 0.3 }}
            className="font-mono text-3xl sm:text-4xl font-bold leading-none flex-shrink-0"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.index}
          </motion.span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}20`, fontFamily: "'JetBrains Mono', monospace" }}>{project.category}</span>
            </div>
            <h3
              className="font-bold leading-tight mb-1.5"
              style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)", transition: "color 0.3s" }}
            >
              {project.title}
            </h3>
            <p className="text-sm text-white/40 mb-3 leading-relaxed max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="text-[11px] px-2 py-0.5 rounded-lg font-mono text-white/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
              ))}
              {project.tech.length > 4 && <span className="text-[11px] text-white/20" style={{ fontFamily: "'JetBrains Mono', monospace" }}>+{project.tech.length - 4}</span>}
            </div>
            {/* CTA — visible only on mobile/tablet, below the chips */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mt-3"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color, fontFamily: "'DM Sans', sans-serif" }}
            >
              View Case Study →
            </motion.div>
          </div>

          {/* CTA — desktop only, pinned to the right */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 0 : 6 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}30`, color: project.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            View Case Study
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Browser Mockup (list-item style matching ProjectListItem) ─────────────────

function BrowserMockup({ site, index, onOpenCaseStudy }: { site: typeof sites[0]; index: number; onOpenCaseStudy?: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [hovered, setHovered] = useState(false);
  const idx = String(index + 4).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpenCaseStudy}
      className={`relative px-5 sm:px-8 py-6 sm:py-8 rounded-2xl border transition-colors duration-300 ${onOpenCaseStudy ? "cursor-pointer" : ""}`}
      style={{ borderColor: hovered ? `${site.color}25` : "rgba(255,255,255,0.05)", background: hovered ? "rgba(255,255,255,0.02)" : "transparent", transition: "border-color 0.3s, background 0.3s" }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(600px circle at 50% 0%, ${site.color}06, transparent 60%)` }}
      />

      <div className="flex gap-5 sm:gap-8 items-center">
        {/* Index */}
        <motion.span
          animate={{ color: hovered ? site.color : "rgba(255,255,255,0.12)" }}
          transition={{ duration: 0.3 }}
          className="font-mono text-3xl sm:text-4xl font-bold leading-none flex-shrink-0"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {idx}
        </motion.span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: `${site.color}15`, color: site.color, border: `1px solid ${site.color}20`, fontFamily: "'JetBrains Mono', monospace" }}>Website</span>
            {site.url !== "#" && (
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {site.url} ↗
              </a>
            )}
          </div>
          <h3
            className="font-bold leading-tight mb-1.5"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.88)", transition: "color 0.3s" }}
          >
            {site.name}
          </h3>
          <p className="text-sm text-white/40 mb-3 leading-relaxed max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {site.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {site.tech.map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded-lg font-mono text-white/30" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
            ))}
          </div>
          {/* CTA — mobile/tablet */}
          {onOpenCaseStudy && (
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.5 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold mt-3"
              style={{ background: `${site.color}15`, border: `1px solid ${site.color}30`, color: site.color, fontFamily: "'DM Sans', sans-serif" }}
            >
              View Case Study →
            </motion.div>
          )}
        </div>

        {/* CTA — desktop */}
        {onOpenCaseStudy && (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 0 : 6 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0"
            style={{ background: `${site.color}15`, border: `1px solid ${site.color}30`, color: site.color, fontFamily: "'DM Sans', sans-serif" }}
          >
            View Case Study
            <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>→</motion.span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [openSite, setOpenSite] = useState<string | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-20 sm:py-28 lg:py-32" style={{ background: "var(--bg)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">02 / Work</span>
            <div className="w-8 h-px bg-indigo-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>
            Featured <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Deep dives into AI systems built for production. Click any project to explore the full architecture, decisions, and results.
          </p>
        </motion.div>

        {/* Project List */}
        <div>
          {projects.map((project, i) => (
            <ProjectListItem key={project.id} project={project} index={i} onOpen={setOpenProject} />
          ))}
        </div>

        <div className="flex flex-col divide-y divide-white/5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          {sites.map((site, i) => (
            <BrowserMockup key={site.name} site={site} index={i} onOpenCaseStudy={site.caseStudy ? () => setOpenSite(site.name) : undefined} />
          ))}
        </div>
      </div>

      {/* Case Study Panel */}
      <AnimatePresence>
        {openProject !== null && (
          <CaseStudyModal
            project={projects.find((p) => p.id === openProject)!}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Site Case Study Panel */}
      <AnimatePresence>
        {openSite !== null && (
          <SiteCaseStudyModal
            site={sites.find((s) => s.name === openSite)!}
            onClose={() => setOpenSite(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, FileText, ArrowUpRight, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/ui/BrandIcons";
import { site } from "@/lib/site";

const links = [
  { label: "Email", value: "harsh160502@gmail.com", icon: Mail, href: "mailto:harsh160502@gmail.com", color: "#818cf8" },
  { label: "LinkedIn", value: "linkedin.com/in/harsh-gupta16", icon: LinkedInIcon, href: "https://www.linkedin.com/in/harsh-gupta16/", color: "#38bdf8" },
  { label: "GitHub", value: "github.com/Harsh1652", icon: GitHubIcon, href: "https://github.com/Harsh1652", color: "#a78bfa" },
  { label: "YouTube", value: "AI breakdowns & transcripts", icon: YouTubeIcon, href: "/youtube", color: "#f87171" },
  { label: "Resume", value: "View Resume", icon: FileText, href: site.resumeUrl, color: "#34d399" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      alert("Something went wrong. Please email me directly at harsh160502@gmail.com");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.1)",
    fontFamily: "var(--font-body)",
    width: "100%",
    color: "white",
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[300px] sm:h-[450px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(79,70,229,0.10), transparent 65%)" }} />

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 sm:w-12 h-px bg-indigo-500/40" />
            <span className="section-label">06 / Contact</span>
            <div className="w-8 sm:w-12 h-px bg-indigo-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "var(--font-display)" }}>
            Let&apos;s Build{" "}
            <span className="gradient-text">Intelligent Systems</span>
          </h2>
          <p className="section-lead mt-4 max-w-lg mx-auto px-2">
            Have a complex AI problem? Let&apos;s talk about turning it into a production system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto w-full min-w-0">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" onSubmit={handleSubmit} className="card p-5 sm:p-7 space-y-4" exit={{ opacity: 0, y: -10 }}>
                  <div>
                    <label className="block text-xs font-mono text-white/55 mb-2" style={{ fontFamily: "var(--font-mono)" }}>Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Doe"
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/25 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/55 mb-2" style={{ fontFamily: "var(--font-mono)" }}>Email Address</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="john@company.com"
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/25 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/55 mb-2" style={{ fontFamily: "var(--font-mono)" }}>Tell me about your project</label>
                    <textarea rows={5} required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="We need a multi-agent system for..."
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/25 outline-none transition-all resize-none"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.6)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.01, boxShadow: "0 0 28px rgba(99,102,241,0.45)" }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white"
                    style={{ background: sending ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "var(--font-body)" }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">Send Message <ArrowRight size={16} /></span>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-10 text-center">
                  <CheckCircle2 size={44} strokeWidth={1.5} className="mx-auto mb-4 text-emerald-400" />
                  <h3 className="font-display font-bold text-xl mb-2" style={{ fontFamily: "var(--font-display)" }}>Message Sent!</h3>
                  <p className="text-sm text-white/50" style={{ fontFamily: "var(--font-body)" }}>I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-3 min-w-0 w-full overflow-hidden">
            <p className="text-sm text-white/55 mb-4" style={{ fontFamily: "var(--font-body)" }}>Or reach out directly:</p>
            {links.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="card flex items-center gap-3.5 p-3.5 sm:p-4 group w-full min-w-0 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${link.color}14`, border: `1px solid ${link.color}30`, color: link.color }}>
                  <link.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-white/40 font-mono mb-0.5 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>{link.label}</div>
                  <div className="text-sm truncate text-white/75 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-body)" }}>{link.value}</div>
                </div>
                <ArrowUpRight size={16} className="flex-shrink-0 text-white/30 group-hover:text-white transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


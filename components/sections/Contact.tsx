"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const links = [
  { label: "Email", value: "harsh160502@gmail.com", icon: "✉️", href: "mailto:harsh160502@gmail.com", color: "#818cf8" },
  { label: "LinkedIn", value: "linkedin.com/in/harsh-gupta16", icon: "💼", href: "https://www.linkedin.com/in/harsh-gupta16/", color: "#38bdf8" },
  { label: "GitHub", value: "github.com/Harsh1652", icon: "🐙", href: "https://github.com/Harsh1652", color: "#a78bfa" },
  { label: "Resume", value: "View Resume", icon: "📄", href: "https://docs.google.com/document/d/1MGhI2lXna21Xjvbatqwn2Zm9pVr2NzyJv6mw0ReqpdU/edit?usp=sharing", color: "#34d399" },
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
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    color: "white",
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" style={{ background: "var(--bg-2)" }}>
      <div className="noise-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(6px)" }} animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 sm:w-12 h-px bg-indigo-500/40" />
            <span className="section-label">07 / Contact</span>
            <div className="w-8 sm:w-12 h-px bg-indigo-500/40" />
          </div>
          <h2 className="section-title" style={{ fontFamily: "'Syne', sans-serif" }}>
            Let&apos;s Build{" "}
            <span className="gradient-text">Intelligent Systems</span>
          </h2>
          <p className="text-sm sm:text-base text-white/40 mt-3 max-w-lg mx-auto px-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Have a complex AI problem? Let&apos;s talk about turning it into a production system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto w-full min-w-0">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" exit={{ opacity: 0, y: -10 }}>
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Your Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Doe"
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/20 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email Address</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="john@company.com"
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/20 outline-none transition-all"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-1.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Tell me about your project</label>
                    <textarea rows={5} required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} placeholder="We need a multi-agent system for..."
                      className="px-4 py-3 rounded-xl text-sm placeholder:text-white/20 outline-none transition-all resize-none"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(129,140,248,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white"
                    style={{ background: sending ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block">✈️</motion.span>
                        Sending...
                      </span>
                    ) : "Send Message →"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl text-center glass">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Message Sent!</h3>
                  <p className="text-sm text-white/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Links */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-3 min-w-0 w-full overflow-hidden">
            <p className="text-sm text-white/40 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Or reach out directly:</p>
            {links.map((link, i) => (
              <motion.a key={link.label} href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl glass group transition-all w-full min-w-0 overflow-hidden"
              >
                <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0" style={{ background: `${link.color}12`, border: `1px solid ${link.color}25` }}>
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/30 font-mono mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{link.label}</div>
                  <div className="text-xs sm:text-sm truncate text-white/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>{link.value}</div>
                </div>
                <span className="flex-shrink-0 text-sm transition-colors" style={{ color: link.color, opacity: 0.5 }}>→</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


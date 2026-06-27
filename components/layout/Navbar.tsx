"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 60));
    return unsub;
  }, [scrollY]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(href);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.nav
          className="flex items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-500 w-full max-w-2xl"
          animate={{
            backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
            background: scrolled ? "rgba(8,8,8,0.75)" : "transparent",
            borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
          }}
          style={{ border: "1px solid transparent" }}
        >
          {/* Logo */}
          <a
            href="#"
            className="mr-3 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.25)" }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <span className="font-display font-bold text-sm gradient-text" style={{ fontFamily: "'Syne', sans-serif" }}>HG</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span className={`relative z-10 transition-colors duration-200 ${active === link.href ? "text-white" : "text-white/50 hover:text-white"}`}>
                  {link.label}
                </span>
                {active === link.href && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-lg" style={{ background: "rgba(255,255,255,0.07)" }} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNav(e, "#contact")}
            className="hidden md:block ml-auto px-4 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontFamily: "'DM Sans', sans-serif" }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile: spacer + hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontFamily: "'DM Sans', sans-serif" }}
            >
              Talk
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 rounded-lg flex flex-col items-center justify-center gap-1.5"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} className="block w-4 h-px bg-white/60" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block w-4 h-px bg-white/60" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} className="block w-4 h-px bg-white/60" />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-[99] rounded-2xl p-4 flex flex-col gap-1"
            style={{ background: "rgba(10,10,10,0.95)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: active === link.href ? "#a5b4fc" : "rgba(255,255,255,0.6)",
                  background: active === link.href ? "rgba(99,102,241,0.1)" : "transparent",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

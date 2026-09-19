"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, AnimatePresence } from "framer-motion";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "/youtube", label: "YouTube" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onHome = pathname === "/";
  const currentActive = onHome ? active : pathname;
  // Section links scroll in place on the home page and navigate to it from other pages
  const hrefFor = (href: string) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled((prev) => (prev === y > 60 ? prev : y > 60)));
    return unsub;
  }, [scrollY]);

  // Highlight the link for whichever section is crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    document.querySelectorAll("main > section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!href.startsWith("#") || !onHome) return; // let the link navigate
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(href);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <nav className={`nav-pill flex items-center gap-1 px-3 py-2 rounded-2xl w-full max-w-3xl ${scrolled ? "is-scrolled" : ""}`}>
          {/* Logo */}
          <Link
            href="/"
            aria-label="Harsh Gupta — home"
            className="mr-3 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(129,140,248,0.12)", border: "1px solid rgba(129,140,248,0.25)" }}
            onClick={(e) => { if (onHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
          >
            <span className="font-display font-bold text-sm gradient-text" style={{ fontFamily: "var(--font-display)" }}>HG</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={hrefFor(link.href)}
                onClick={(e) => handleNav(e, link.href)}
                aria-current={currentActive === link.href ? "page" : undefined}
                className="relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className={`relative z-10 transition-colors duration-200 ${currentActive === link.href ? "text-white" : "text-white/50 hover:text-white"}`}>
                  {link.label}
                </span>
                {currentActive === link.href && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-lg" style={{ background: "rgba(255,255,255,0.07)" }} transition={{ type: "spring", stiffness: 350, damping: 30 }} />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={hrefFor("#contact")}
            onClick={(e) => handleNav(e, "#contact")}
            className="hidden md:block ml-auto px-4 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontFamily: "var(--font-body)" }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile: spacer + hamburger */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <a
              href={hrefFor("#contact")}
              onClick={(e) => handleNav(e, "#contact")}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#a5b4fc", fontFamily: "var(--font-body)" }}
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
        </nav>
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
                href={hrefFor(link.href)}
                onClick={(e) => handleNav(e, link.href)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  fontFamily: "var(--font-body)",
                  color: currentActive === link.href ? "#a5b4fc" : "rgba(255,255,255,0.6)",
                  background: currentActive === link.href ? "rgba(99,102,241,0.1)" : "transparent",
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

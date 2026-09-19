"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Deterministic pseudo-random based on seed — avoids hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<"logo" | "typing1" | "typing2" | "progress" | "done">("logo");
  const [progress, setProgress] = useState(0);
  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const text1 = "Building Intelligent Systems...";
  const text2 = "Loading Experience...";

  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    // Returning within the same session (e.g. back from /youtube): don't replay the intro
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; sessionStorage.setItem("intro-seen", "1"); } catch {}
    if (seen) {
      setSkipped(true);
      setPhase("done");
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase("typing1"), 400);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "typing1") return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped1(text1.slice(0, i + 1));
      i++;
      if (i >= text1.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("typing2"), 150);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "typing2") return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped2(text2.slice(0, i + 1));
      i++;
      if (i >= text2.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("progress"), 120);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "progress") return;
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 14 + 8;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 450);
        }, 200);
        return;
      }
      setProgress(Math.floor(p));
    }, 60);
    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303]"
          exit={{ opacity: 0 }}
          transition={{ duration: skipped ? 0.15 : 0.5, ease: "easeInOut" }}
        >
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-indigo-400/30"
                style={{
                  left: `${(seededRandom(i * 3) * 100).toFixed(2)}%`,
                  top: `${(seededRandom(i * 3 + 1) * 100).toFixed(2)}%`,
                }}
                animate={{
                  y: [0, -80, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + seededRandom(i * 3 + 2) * 3,
                  delay: seededRandom(i * 3 + 3) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative mb-16"
          >
            <div className="w-20 h-20 rounded-2xl glass-bright flex items-center justify-center glow-ring">
              <span className="font-display font-bold text-3xl gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                HG
              </span>
            </div>
            <div className="absolute -inset-6 rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%)" }} />
          </motion.div>

          {/* Typing lines */}
          <div className="space-y-4 text-center min-h-[80px]">
            {typed1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-sm text-indigo-300/80 tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {typed1}
                {phase === "typing1" && <span className="animate-blink ml-0.5 text-indigo-400">|</span>}
              </motion.p>
            )}
            {typed2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-sm text-white/40 tracking-widest"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {typed2}
                {phase === "typing2" && <span className="animate-blink ml-0.5 text-white/60">|</span>}
              </motion.p>
            )}
          </div>

          {/* Progress bar */}
          <AnimatePresence>
            {phase === "progress" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 w-64"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs text-white/30" style={{ fontFamily: "var(--font-mono)" }}>
                    Initializing
                  </span>
                  <span className="font-mono text-xs text-indigo-400" style={{ fontFamily: "var(--font-mono)" }}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full h-px bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

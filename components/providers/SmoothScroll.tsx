"use client";
import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "@studio-freight/lenis";

const LenisContext = createContext<{ stop: () => void; start: () => void }>({
  stop: () => {},
  start: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children, paused = false }: { children: React.ReactNode; paused?: boolean }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    // lerp-based smoothing tracks the wheel closely; the old 1.2s eased duration made scrolling feel delayed
    const lenis = new Lenis({ lerp: 0.14, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    if (pausedRef.current) lenis.stop();

    let frame = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Hold scrolling while an overlay (e.g. the loading screen) covers the page
  useEffect(() => {
    pausedRef.current = paused;
    if (paused) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [paused]);

  const ctx = {
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <LenisContext.Provider value={ctx}>
      {children}
    </LenisContext.Provider>
  );
}

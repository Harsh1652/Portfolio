"use client";
import { useEffect, type RefObject } from "react";

// Pauses CSS animations inside `ref` while it is scrolled out of view (see `.anim-paused` in globals.css).
// Toggles a class directly instead of React state so it never causes a re-render.
export function usePauseOffscreen(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => el.classList.toggle("anim-paused", !entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

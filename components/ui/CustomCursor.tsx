"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  // Touch devices have no cursor to replace — render nothing and run no animation loop there
  const [enabled] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame = 0;
    let shown = false; // stay hidden until the pointer first moves, instead of parking at the top-left corner

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      if (!shown) { shown = true; ringX = mouseX; ringY = mouseY; dot.style.opacity = ring.style.opacity = "1"; }
      if (!animFrame) animFrame = requestAnimationFrame(animate);
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    // The ring eases toward the pointer, then the loop goes idle until the mouse moves again
    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      const settled = Math.abs(ringX - mouseX) < 0.1 && Math.abs(ringY - mouseY) < 0.1;
      animFrame = settled ? 0 : requestAnimationFrame(animate);
    };

    const onMouseDown = () => dot.style.transform += " scale(0.7)";
    const onMouseUp = () => dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;

    const onEnterLink = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      setIsHovering(true);
      setLabel(el.dataset.cursorLabel || "");
    };
    const onLeaveLink = () => {
      setIsHovering(false);
      setLabel("");
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    // Delegated hover detection: one listener, and it also covers elements added later (modals, new pages)
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest?.("a, button, [data-cursor]") as HTMLElement | null;
      if (el) onEnterLink({ currentTarget: el } as unknown as MouseEvent);
      else onLeaveLink();
    };
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[99999] pointer-events-none"
        style={{ willChange: "transform", opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 z-[99998] pointer-events-none flex items-center justify-center"
        style={{
          transition: "width 0.3s, height 0.3s, border-color 0.3s, margin 0.3s",
          willChange: "transform",
          opacity: 0,
          width: isHovering ? "64px" : "40px",
          height: isHovering ? "64px" : "40px",
          borderColor: isHovering ? "rgba(129,140,248,0.8)" : "rgba(255,255,255,0.4)",
          marginLeft: isHovering ? "-12px" : "0",
          marginTop: isHovering ? "-12px" : "0",
        }}
      >
        {label && (
          <span className="text-[9px] font-mono text-accent uppercase tracking-widest text-indigo-400 whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </>
  );
}

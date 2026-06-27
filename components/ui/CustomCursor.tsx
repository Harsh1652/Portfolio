"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    const onMouseDown = () => dot.style.transform += " scale(0.7)";
    const onMouseUp = () => dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;

    const onEnterLink = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      setIsHovering(true);
      setLabel(el.dataset.cursorLabel || "");
    };
    const onLeaveLink = () => {
      setIsHovering(false);
      setLabel("");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink as EventListener);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(animFrame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink as EventListener);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[99999] pointer-events-none mix-blend-difference"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 z-[99998] pointer-events-none flex items-center justify-center"
        style={{
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
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

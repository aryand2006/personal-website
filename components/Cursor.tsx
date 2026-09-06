"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, input, textarea, [data-cursor]");
      setHovering(!!interactive);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60]"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <div
        className={`rounded-full border border-bone transition-all duration-200 ${
          hovering ? "h-12 w-12 border-bone/40 bg-bone/5" : "h-3 w-3 bg-signal"
        }`}
      />
    </motion.div>
  );
}

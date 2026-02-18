"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedCursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 120);
      y.set(event.clientY - 120);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[70] h-60 w-60 rounded-full blur-3xl"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.07) 35%, transparent 70%)"
      }}
      aria-hidden
    />
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-70 technical-grid"
        aria-hidden
      />
      <div
        className="absolute left-[-10%] top-[-20%] h-[42rem] w-[42rem] rounded-full blur-[110px]"
        style={{ background: "rgba(59, 130, 246, 0.16)" }}
      />
      <div
        className="absolute right-[-16%] top-[10%] h-[34rem] w-[34rem] rounded-full blur-[110px]"
        style={{ background: "rgba(99, 102, 241, 0.14)" }}
      />
      <div
        className="absolute bottom-[-18%] left-[22%] h-[24rem] w-[24rem] rounded-full blur-[100px]"
        style={{ background: "rgba(14, 116, 144, 0.12)" }}
      />
    </div>
  );
}

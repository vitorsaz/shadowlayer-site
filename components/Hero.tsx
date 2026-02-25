"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background orbs */}
      <motion.div
        style={{ y: orbY1 }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[120px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-purple-200/30 blur-[100px]"
      />
      <motion.div
        style={{ y: orbY3 }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[150px]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Text */}
      <motion.div
        style={{ scale: textScale, opacity: textOpacity, y: textY }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center relative"
        >
          {/* Subtle glow behind text */}
          <div className="absolute inset-0 blur-[80px] bg-accent/10 rounded-full scale-150 pointer-events-none" />

          <h1 className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.15em] text-gray-900 uppercase">
            <span className="text-gradient">Shadow</span>
            <span className="text-gray-900">Layer</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-6 text-muted text-base md:text-lg font-light tracking-[0.3em] uppercase"
          >
            Zero-Knowledge Privacy on Solana
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-32 flex flex-col items-center gap-2"
        >
          <span className="text-muted/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

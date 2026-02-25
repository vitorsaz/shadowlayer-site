"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
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
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#d5d0c7]/30 blur-[120px]"
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-[#c8c2b8]/20 blur-[100px]"
      />
      <motion.div
        style={{ y: orbY3 }}
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#d5d0c7]/10 blur-[150px]"
      />

      {/* Logo image */}
      <motion.div
        style={{ scale: imgScale, opacity: imgOpacity, y: imgY }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src="/logo.png"
            alt="ShadowLayer"
            width={700}
            height={350}
            className="w-[320px] sm:w-[420px] md:w-[550px] lg:w-[700px] h-auto"
            priority
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-24 flex flex-col items-center gap-2"
        >
          <span className="text-muted/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-gray-400/50 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

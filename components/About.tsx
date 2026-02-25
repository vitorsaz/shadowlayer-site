"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[150px]"
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Protocol
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Financial privacy as a{" "}
            <span className="text-gradient">fundamental right</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted leading-relaxed text-center max-w-3xl mx-auto"
        >
          ShadowLayer is a privacy-preserving token protocol deployed natively on
          Solana. Through Groth16 zkSNARKs and Pedersen commitments, it achieves
          simultaneous sender anonymity, recipient anonymity, and amount
          confidentiality — without bridges or separate layers.
        </motion.p>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "< 0.4s", label: "Finality" },
            { value: "192 B", label: "Proof Size" },
            { value: "~$0.0002", label: "Tx Cost" },
            { value: "4.3B", label: "Max Notes" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-surface/50 border border-border/50"
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900 font-mono">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

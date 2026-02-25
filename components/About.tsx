"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "< 200ms", label: "Proof Generation" },
  { value: "< 50k", label: "Compute Units" },
  { value: "100%", label: "On-Chain Privacy" },
  { value: "Zero", label: "Trusted Setup" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeUp = (delay: number = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div>
            <motion.span
              {...fadeUp(0)}
              className="block font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-6"
            >
              ABOUT
            </motion.span>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-sans text-heading text-fg"
            >
              Privacy infrastructure for Solana
            </motion.h2>
          </div>

          {/* Right column */}
          <div className="lg:pt-10">
            <motion.p
              {...fadeUp(0.2)}
              className="font-sans text-sm text-fg-muted leading-relaxed"
            >
              ShadowLayer is a zero-knowledge privacy protocol built natively on
              Solana. By leveraging Groth16 zkSNARKs and Pedersen Commitments, it
              enables fully confidential transactions where sender identity,
              recipient identity, and transfer amounts remain cryptographically
              shielded -- without bridges, sidechains, or off-chain sequencers.
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 font-sans text-sm text-fg-muted leading-relaxed"
            >
              Every shielded transaction produces a single compact proof that is
              verified entirely on-chain. The protocol requires no trusted setup
              ceremonies and introduces no additional trust assumptions beyond
              Solana's consensus itself, delivering pure cryptographic certainty
              at network speed.
            </motion.p>
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-24 md:mt-32"
        >
          {/* Top border */}
          <div className="h-px w-full bg-border mb-10" />

          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative py-6 md:py-0 ${
                  i > 0 ? "md:border-l md:border-border md:pl-8 lg:pl-10" : ""
                } ${i < STATS.length - 1 ? "md:pr-8 lg:pr-10" : ""} ${
                  i % 2 === 1 ? "border-l border-border pl-6 md:pl-8 lg:pl-10" : ""
                } ${i >= 2 ? "border-t border-border md:border-t-0" : ""}`}
              >
                <div className="font-mono text-2xl text-fg">{stat.value}</div>
                <div className="mt-2 font-mono text-xs text-fg-faint uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom border */}
          <div className="h-px w-full bg-border mt-10" />
        </motion.div>
      </div>
    </section>
  );
}

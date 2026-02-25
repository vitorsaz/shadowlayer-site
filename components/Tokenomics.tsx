"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ALLOCATIONS = [
  { label: "Community & Ecosystem", pct: 40 },
  { label: "Protocol Development", pct: 25 },
  { label: "Team & Advisors", pct: 15 },
  { label: "Liquidity", pct: 10 },
  { label: "Treasury", pct: 10 },
];

const KEY_INFO = [
  {
    title: "Deflationary",
    description: "50% of protocol fees burned",
  },
  {
    title: "Governance",
    description: "Token holders vote on protocol parameters",
  },
  {
    title: "Staking",
    description: "Stake to earn protocol revenue share",
  },
  {
    title: "Privacy Mining",
    description: "Earn rewards for adding to the shielded pool",
  },
];

export default function Tokenomics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="tokenomics"
      ref={ref}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-4">
            TOKEN
          </span>
          <h2 className="font-sans text-heading text-fg">
            Tokenomics
          </h2>
          <p className="font-mono text-sm text-fg-muted mt-4">
            $SHDW — 1,000,000,000 total supply
          </p>
        </motion.div>

        {/* Allocation bars */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          {ALLOCATIONS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-6 last:mb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-fg">
                  {item.label}
                </span>
                <span className="font-mono text-sm text-accent">
                  {item.pct}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-bg-elevated w-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.pct}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {KEY_INFO.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-border rounded-lg bg-bg-card p-5 transition-colors duration-300 hover:border-accent/20"
            >
              <h4 className="font-mono text-sm text-fg mb-1">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-fg-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

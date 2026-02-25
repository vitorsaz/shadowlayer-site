"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const BENCHMARKS = [
  {
    metric: "Proof Generation",
    value: "1.21s",
    sub: "WASM single-thread",
    native: "0.34s native",
  },
  {
    metric: "Proof Size",
    value: "192",
    unit: "bytes",
    sub: "3 compressed curve points",
  },
  {
    metric: "On-Chain Verification",
    value: "198K",
    unit: "CU",
    sub: "~$0.0002 at current fees",
  },
  {
    metric: "Transaction Finality",
    value: "~380",
    unit: "ms",
    sub: "Solana median finality",
  },
];

const CU_BREAKDOWN = [
  { label: "Proof deserialization", cu: 12400, pct: 6.3 },
  { label: "Public input accumulation", cu: 38200, pct: 19.3 },
  { label: "Miller loop (×3)", cu: 89600, pct: 45.3 },
  { label: "Final exponentiation", cu: 41800, pct: 21.1 },
  { label: "Nullifier + Merkle write", cu: 16000, pct: 8.1 },
];

export default function Performance() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full bg-purple-200/20 blur-[150px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Benchmarks
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Engineered for{" "}
            <span className="text-gradient">speed</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Measured on consumer hardware (Apple M2, 16GB RAM)
          </p>
        </motion.div>

        {/* Main metrics */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {BENCHMARKS.map((b, i) => (
            <motion.div
              key={b.metric}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-surface/30 border border-border/50 text-center"
            >
              <div className="text-xs text-muted font-mono uppercase tracking-wider mb-3">
                {b.metric}
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-gray-900 font-mono">
                  {b.value}
                </span>
                {b.unit && (
                  <span className="text-sm text-muted font-mono">
                    {b.unit}
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs text-muted/70">{b.sub}</div>
              {b.native && (
                <div className="mt-1 text-xs text-accent/60 font-mono">
                  {b.native}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CU Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-8 rounded-2xl bg-surface/30 border border-border/50"
        >
          <div className="text-sm font-semibold text-gray-900 mb-6">
            Compute Unit Breakdown
          </div>
          <div className="space-y-4">
            {CU_BREAKDOWN.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted">{item.label}</span>
                  <span className="font-mono text-gray-800">
                    {item.cu.toLocaleString()} CU
                  </span>
                </div>
                <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent/30"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/30 flex justify-between text-sm">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="font-mono text-accent">
              198,000 CU{" "}
              <span className="text-muted/50 font-normal">
                / 1,400,000 limit
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

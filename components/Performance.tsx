"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MAIN_STATS = [
  { value: "~180ms", label: "Proof Generation" },
  { value: "~45,000", label: "Compute Units" },
  { value: "$0.001", label: "Cost per Tx" },
];

const TABLE_ROWS = [
  { operation: "Deposit", time: "~180ms", cu: "~45k CU" },
  { operation: "Shield Transfer", time: "~120ms", cu: "~38k CU" },
  { operation: "Withdrawal", time: "~200ms", cu: "~48k CU" },
  { operation: "Proof Verify", time: "~5ms", cu: "~12k CU" },
];

export default function Performance() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="performance"
      ref={ref}
      className="relative py-32 md:py-44 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-4">
            BENCHMARKS
          </span>
          <h2 className="font-sans text-heading text-fg">
            Performance
          </h2>
        </motion.div>

        {/* Main stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 md:mb-28">
          {MAIN_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center md:text-left"
            >
              <span className="font-mono text-4xl md:text-5xl text-fg block">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-fg-faint uppercase tracking-wider mt-3 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border border-border rounded-lg bg-bg-card overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-mono text-xs text-fg-faint uppercase tracking-wider px-6 py-4">
                  Operation
                </th>
                <th className="text-left font-mono text-xs text-fg-faint uppercase tracking-wider px-6 py-4">
                  Time
                </th>
                <th className="text-left font-mono text-xs text-fg-faint uppercase tracking-wider px-6 py-4">
                  CU Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <motion.tr
                  key={row.operation}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={
                    i < TABLE_ROWS.length - 1 ? "border-b border-border" : ""
                  }
                >
                  <td className="font-mono text-xs text-fg-muted px-6 py-4">
                    {row.operation}
                  </td>
                  <td className="font-mono text-xs text-fg-muted px-6 py-4 tabular-nums">
                    {row.time}
                  </td>
                  <td className="font-mono text-xs text-fg-muted px-6 py-4 tabular-nums">
                    {row.cu}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

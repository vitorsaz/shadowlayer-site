"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const PHASES = [
  {
    phase: "Phase 1",
    title: "Devnet",
    date: "Q2 2026",
    items: [
      "Complete circuit implementation",
      "Trusted setup ceremony",
      "Initial program deployment on Solana devnet",
      "Open-source release of all code and circuit artifacts",
    ],
    status: "current",
  },
  {
    phase: "Phase 2",
    title: "Testnet Audit",
    date: "Q3 2026",
    items: [
      "Independent security audit by two ZK-specialized firms",
      "Bug bounty program launch",
      "SDK release for wallet integration",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    title: "Mainnet",
    date: "Q4 2026",
    items: [
      "Mainnet deployment with USDC & wSOL support",
      "Governance activation",
      "DEX integration for private trading",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Scaling",
    date: "2027",
    items: [
      "Recursive proof composition",
      "Larger anonymity sets & batch transactions",
      "Cross-program invocation (CPI) privacy extensions",
      "DeFi protocol integrations",
    ],
    status: "future",
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="roadmap" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute -left-32 bottom-0 w-[500px] h-[500px] rounded-full bg-accent/[0.02] blur-[150px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Roadmap
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            The path <span className="text-gradient">forward</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                phase.status === "current"
                  ? "bg-accent/[0.05] border-accent/30"
                  : "bg-surface/30 border-border/50"
              }`}
            >
              {phase.status === "current" && (
                <div className="absolute top-4 right-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                </div>
              )}

              <div className="text-xs font-mono text-accent/60 mb-1">
                {phase.phase}
              </div>
              <div className="text-xl font-bold text-gray-900">{phase.title}</div>
              <div className="text-sm text-muted font-mono mt-1">
                {phase.date}
              </div>

              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted flex items-start gap-2"
                  >
                    <span className="text-accent/40 mt-1.5 flex-shrink-0">
                      &#x2022;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

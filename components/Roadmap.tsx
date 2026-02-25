"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PHASES = [
  {
    phase: "Phase 1",
    name: "Foundation",
    date: "Q1-Q2 2025",
    current: true,
    items: [
      "Protocol architecture",
      "Core ZK circuits",
      "Testnet deployment",
      "Security audits",
    ],
  },
  {
    phase: "Phase 2",
    name: "Launch",
    date: "Q3-Q4 2025",
    current: false,
    items: [
      "Mainnet launch",
      "Token generation event",
      "SDK release",
      "Initial integrations",
    ],
  },
  {
    phase: "Phase 3",
    name: "Growth",
    date: "Q1-Q2 2026",
    current: false,
    items: [
      "Cross-chain bridges",
      "Advanced privacy features",
      "Governance launch",
      "Ecosystem grants",
    ],
  },
  {
    phase: "Phase 4",
    name: "Scale",
    date: "Q3-Q4 2026",
    current: false,
    items: [
      "Layer-2 optimization",
      "Enterprise solutions",
      "Privacy DAOs",
      "Global adoption",
    ],
  },
];

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="roadmap"
      ref={ref}
      className="relative py-32 md:py-44 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
            TIMELINE
          </span>
          <h2 className="font-sans text-heading text-fg mt-4">
            Roadmap
          </h2>
        </motion.div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:block">
          {/* Horizontal connecting line */}
          <div className="relative mb-12">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-px bg-border origin-left"
            />
            {/* Phase dots on the line */}
            <div className="absolute top-0 left-0 right-0 flex">
              {PHASES.map((phase, i) => (
                <div
                  key={phase.phase}
                  className="flex-1 flex justify-start"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + 0.15 * i,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative -top-[3px]"
                  >
                    <div
                      className={`w-[7px] h-[7px] rounded-full ${
                        phase.current
                          ? "bg-accent"
                          : "bg-bg-card border border-fg-dim"
                      }`}
                    />
                    {phase.current && (
                      <motion.div
                        className="absolute inset-0 w-[7px] h-[7px] rounded-full bg-accent/40"
                        animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards grid */}
          <div className="grid grid-cols-4 gap-6">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + 0.12 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`border rounded-lg bg-bg-card p-6 ${
                  phase.current ? "border-accent/30" : "border-border"
                }`}
              >
                {/* Phase header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-accent uppercase tracking-wider">
                    {phase.phase} &middot; {phase.name}
                  </span>
                  {phase.current && (
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent bg-accent-dim px-2 py-0.5 rounded">
                      CURRENT
                    </span>
                  )}
                </div>

                {/* Date */}
                <p className="font-mono text-[10px] text-fg-faint mb-5">
                  {phase.date}
                </p>

                {/* Items */}
                <ul className="space-y-2.5">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-fg-dim mt-[5px] shrink-0" />
                      <span className="font-mono text-xs text-fg-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical layout */}
        <div className="md:hidden relative">
          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[3px] top-0 bottom-0 w-px bg-border origin-top"
          />

          <div className="space-y-8">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.15 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-8"
              >
                {/* Dot on the vertical line */}
                <div className="absolute left-0 top-6">
                  <div
                    className={`w-[7px] h-[7px] rounded-full ${
                      phase.current
                        ? "bg-accent"
                        : "bg-bg-card border border-fg-dim"
                    }`}
                  />
                  {phase.current && (
                    <motion.div
                      className="absolute inset-0 w-[7px] h-[7px] rounded-full bg-accent/40"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>

                {/* Phase card */}
                <div
                  className={`border rounded-lg bg-bg-card p-6 ${
                    phase.current ? "border-accent/30" : "border-border"
                  }`}
                >
                  {/* Phase header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-accent uppercase tracking-wider">
                      {phase.phase} &middot; {phase.name}
                    </span>
                    {phase.current && (
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent bg-accent-dim px-2 py-0.5 rounded">
                        CURRENT
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <p className="font-mono text-[10px] text-fg-faint mb-4">
                    {phase.date}
                  </p>

                  {/* Items */}
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-fg-dim mt-[5px] shrink-0" />
                        <span className="font-mono text-xs text-fg-muted leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

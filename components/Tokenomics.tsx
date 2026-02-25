"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const ALLOCATIONS = [
  { label: "Protocol Treasury", pct: 30, vesting: "4-year linear, 1-year cliff", color: "#8b5cf6" },
  { label: "Community / Ecosystem", pct: 25, vesting: "Governance milestones", color: "#a78bfa" },
  { label: "Team & Advisors", pct: 18, vesting: "4-year linear, 1-year cliff", color: "#7c3aed" },
  { label: "Public Sale", pct: 15, vesting: "6-month linear post-TGE", color: "#6d28d9" },
  { label: "Liquidity Provision", pct: 7, vesting: "LP locked 1yr, burned", color: "#5b21b6" },
  { label: "Airdrop", pct: 5, vesting: "Instant at TGE", color: "#4c1d95" },
];

export default function Tokenomics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="tokenomics" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-[160px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Token
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            $SHDW <span className="text-gradient">Tokenomics</span>
          </h2>
          <p className="mt-4 text-muted text-lg">
            Fixed supply of{" "}
            <span className="text-gray-900 font-mono">1,000,000,000</span> SHDW
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual ring chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <svg viewBox="0 0 200 200" className="w-72 h-72 md:w-80 md:h-80">
              {ALLOCATIONS.reduce(
                (acc, alloc, i) => {
                  const startAngle = acc.offset;
                  const angle = (alloc.pct / 100) * 360;
                  const endAngle = startAngle + angle;
                  const r = 80;
                  const cx = 100;
                  const cy = 100;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);

                  const largeArc = angle > 180 ? 1 : 0;

                  acc.elements.push(
                    <motion.path
                      key={alloc.label}
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={alloc.color}
                      fillOpacity={0.6}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    />
                  );

                  acc.offset = endAngle;
                  return acc;
                },
                { elements: [] as React.ReactNode[], offset: 0 }
              ).elements}

              {/* Center circle */}
              <circle cx="100" cy="100" r="45" fill="#ffffff" />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fill="#111111"
                fontSize="10"
                fontWeight="700"
                fontFamily="Inter"
              >
                SHDW
              </text>
              <text
                x="100"
                y="112"
                textAnchor="middle"
                fill="#6b7280"
                fontSize="7"
                fontFamily="monospace"
              >
                1B Supply
              </text>
            </svg>
          </motion.div>

          {/* Allocation list */}
          <div className="space-y-4">
            {ALLOCATIONS.map((alloc, i) => (
              <motion.div
                key={alloc.label}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface/30 border border-border/30"
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: alloc.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {alloc.label}
                    </span>
                    <span className="text-sm font-mono text-accent">
                      {alloc.pct}%
                    </span>
                  </div>
                  <div className="text-xs text-muted mt-0.5">{alloc.vesting}</div>
                </div>
              </motion.div>
            ))}

            {/* Deflationary note */}
            <div className="mt-4 p-4 rounded-xl border border-accent/20 bg-accent/[0.03]">
              <div className="text-xs font-mono text-accent/70 uppercase tracking-wider mb-1">
                Deflationary
              </div>
              <p className="text-sm text-muted">
                50% of transaction fees are burned, creating deflationary pressure
                proportional to protocol usage. Rate adjustable by governance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

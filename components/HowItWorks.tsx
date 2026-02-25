"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const STEPS = [
  {
    step: "01",
    title: "Shield",
    subtitle: "Public → Private",
    description:
      "Deposit SPL tokens into the ShadowLayer program. A note commitment is created and inserted into the on-chain Merkle accumulator. The shielding transaction is fully transparent.",
    color: "from-violet-500/20 to-purple-600/20",
  },
  {
    step: "02",
    title: "Transfer",
    subtitle: "Private → Private",
    description:
      "The core privacy operation. Spend input notes and create output notes with a single Groth16 proof that verifies Merkle membership, nullifier correctness, value conservation, and range bounds.",
    color: "from-purple-600/20 to-indigo-600/20",
  },
  {
    step: "03",
    title: "Unshield",
    subtitle: "Private → Public",
    description:
      "Withdraw tokens back to a standard SPL account. A simplified proof demonstrates ownership of the note and correct nullifier derivation. Tokens return to the public domain.",
    color: "from-indigo-600/20 to-blue-600/20",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Flow
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            How it <span className="text-gradient">works</span>
          </h2>
        </motion.div>

        <div className="mt-20 relative">
          {/* Animated vertical line */}
          <div className="absolute left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border/30">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-accent/60 to-accent/10"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step number dot */}
                <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full bg-bg border-2 border-accent/60 z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-3 ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span className="text-accent font-mono text-sm">
                      {step.step}
                    </span>
                    <span className="text-xs text-muted font-mono px-2 py-1 rounded-full border border-border/50">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl md:text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

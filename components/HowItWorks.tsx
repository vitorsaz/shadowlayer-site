"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Deposit",
    description:
      "Assets enter the shielded pool via a deposit transaction. A commitment is generated using Pedersen Commitments.",
  },
  {
    number: "02",
    title: "Shield",
    description:
      "The protocol generates a Groth16 zkSNARK proof, creating a shielded state that hides amount and sender.",
  },
  {
    number: "03",
    title: "Transact",
    description:
      "Shielded transfers occur within the pool. Each transaction produces a new proof without revealing details.",
  },
  {
    number: "04",
    title: "Withdraw",
    description:
      "Assets exit the pool with a withdrawal proof. Only the recipient knows the amount and source.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase block mb-4">
            ARCHITECTURE
          </span>
          <h2 className="font-sans text-heading text-fg">
            How It Works
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute left-0 top-0 bottom-0 w-px bg-border origin-top"
            style={{ left: "6px" }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mb-16 last:mb-0"
            >
              {/* Gold dot on the vertical line */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute w-[13px] h-[13px] rounded-full bg-accent"
                style={{ left: "-8px", top: "2px", marginLeft: "6px" }}
              />

              {/* Step content */}
              <div className="ml-8 md:ml-12">
                <span className="font-mono text-accent text-xs block mb-2">
                  {step.number}
                </span>
                <h3 className="font-sans text-lg text-fg mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-fg-muted leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

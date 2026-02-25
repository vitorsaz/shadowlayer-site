"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TECH_ITEMS = [
  {
    name: "Groth16 zkSNARKs",
    description:
      "Succinct non-interactive proofs with constant verification time",
  },
  {
    name: "Pedersen Commitments",
    description:
      "Homomorphic commitments enabling hidden arithmetic on encrypted values",
  },
  {
    name: "Poseidon Hash",
    description:
      "ZK-optimized hash function minimizing constraint count in circuits",
  },
  {
    name: "BPF Runtime",
    description:
      "Direct Solana VM integration for native on-chain verification",
  },
  {
    name: "Merkle Trees",
    description:
      "Efficient membership proofs for the shielded transaction pool",
  },
  {
    name: "Range Proofs",
    description:
      "Bulletproofs ensuring values remain within valid bounds",
  },
];

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="technology"
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
            STACK
          </span>
          <h2 className="font-sans text-heading text-fg">
            Technology
          </h2>
        </motion.div>

        {/* Top section: 2-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-20"
        >
          <div>
            <h3 className="font-sans text-subheading text-fg">
              Cryptographic Primitives
            </h3>
          </div>
          <div>
            <p className="font-sans text-sm text-fg-muted leading-relaxed">
              Every component of the ZK stack is selected for security,
              efficiency, and native Solana compatibility. The combination of
              Groth16 proofs, Pedersen commitments, and Poseidon hashing
              delivers constant-size proofs with minimal on-chain verification
              cost — no bridges, no separate layers, no compromises.
            </p>
          </div>
        </motion.div>

        {/* Grid of 6 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-border rounded-lg bg-bg-card p-6 transition-colors duration-300 hover:border-accent/20"
            >
              <h4 className="font-mono text-sm text-fg">
                {item.name}
              </h4>
              <p className="font-sans text-xs text-fg-muted mt-2 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

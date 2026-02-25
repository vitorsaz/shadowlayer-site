"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CARDS = [
  {
    number: "01",
    title: "Transaction Confidentiality",
    description:
      "Amounts and participants are shielded via Pedersen Commitments with zero-knowledge range proofs. Value conservation is verified homomorphically, ensuring no amounts are ever revealed while maintaining provable correctness across the entire transaction graph.",
  },
  {
    number: "02",
    title: "Sender Anonymity",
    description:
      "Transaction graph analysis is prevented through cryptographic mixing with Poseidon hash functions. The sender is hidden within a Merkle-based anonymity set, making them computationally indistinguishable from every other participant in the shielded pool.",
  },
  {
    number: "03",
    title: "Verifiable Compliance",
    description:
      "Selective disclosure enables regulatory compliance without compromising privacy. Authorized auditors can verify specific transaction properties through dedicated viewing keys, while the broader network remains unable to observe any confidential details.",
  },
];

export default function PrivacyGuarantees() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const fadeUp = (delay: number = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.span
          {...fadeUp(0)}
          className="block font-mono text-[10px] tracking-[0.3em] uppercase text-accent mb-6"
        >
          PROTOCOL
        </motion.span>

        <motion.h2
          {...fadeUp(0.1)}
          className="font-sans text-heading text-fg mb-16 md:mb-20"
        >
          Privacy Guarantees
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-border rounded-lg bg-bg-card p-8 hover:border-fg-dim transition-colors duration-300 group"
            >
              {/* Number */}
              <span className="font-mono text-xs text-accent">{card.number}</span>

              {/* Title */}
              <h3 className="font-sans text-lg text-fg mt-4">{card.title}</h3>

              {/* Description */}
              <p className="font-sans text-sm text-fg-muted mt-3 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

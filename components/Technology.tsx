"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const TECH_STACK = [
  {
    name: "Groth16 zkSNARKs",
    description: "Constant-size proofs (192 bytes) with verification via two pairing operations. 128-bit security on BLS12-381.",
    detail: "215,000 R1CS constraints",
  },
  {
    name: "Pedersen Commitments",
    description: "Additively homomorphic commitments enable value conservation verification without revealing amounts.",
    detail: "Perfectly hiding",
  },
  {
    name: "Poseidon Hash",
    description: "Algebraic hash optimized for ZK circuits. 104× more efficient than SHA-256 inside R1CS constraints.",
    detail: "~240 constraints",
  },
  {
    name: "Merkle Accumulator",
    description: "Depth-32 binary Merkle tree supporting 4.3 billion notes with O(log N) membership proofs.",
    detail: "Depth 32",
  },
  {
    name: "Nullifier Set",
    description: "Deterministic double-spend prevention via PRF-derived nullifiers stored in sharded PDAs.",
    detail: "Hash-map sharded",
  },
  {
    name: "BPF Runtime",
    description: "On-chain programs written in Rust and compiled to BPF bytecode. Full verification in ~198k compute units.",
    detail: "Solana native",
  },
];

const ARCHITECTURE = [
  { name: "ShadowPool", desc: "Merkle Accumulator + Nullifier Set", type: "on-chain" },
  { name: "ZkVerifier", desc: "Groth16 Pairing Verification", type: "on-chain" },
  { name: "TokenGateway", desc: "SPL Token Custody", type: "on-chain" },
  { name: "Client SDK", desc: "Proof Generation + Note Management", type: "off-chain" },
];

export default function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="technology" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full bg-accent/[0.02] blur-[180px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Technology
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Built on proven{" "}
            <span className="text-gradient">cryptography</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Every component is carefully chosen for security, efficiency, and
            Solana compatibility.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 p-8 rounded-2xl bg-surface/30 border border-border/50"
        >
          <div className="text-xs font-mono text-muted mb-6 text-center tracking-wider uppercase">
            On-Chain Architecture
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ARCHITECTURE.map((item) => (
              <div
                key={item.name}
                className={`p-4 rounded-xl border text-center ${
                  item.type === "on-chain"
                    ? "border-accent/20 bg-accent/[0.03]"
                    : "border-border/50 bg-surface/50"
                }`}
              >
                <div className="text-sm font-semibold text-gray-900">
                  {item.name}
                </div>
                <div className="mt-1 text-xs text-muted">{item.desc}</div>
                <div
                  className={`mt-2 text-[10px] font-mono uppercase tracking-wider ${
                    item.type === "on-chain" ? "text-accent/60" : "text-muted/60"
                  }`}
                >
                  {item.type}
                </div>
              </div>
            ))}
          </div>
          {/* Connection lines - simplified */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 text-xs text-muted/50">
              <div className="w-8 h-px bg-accent/30" />
              <span className="font-mono">CPI calls</span>
              <div className="w-8 h-px bg-accent/30" />
            </div>
          </div>
        </motion.div>

        {/* Tech grid */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="group p-6 rounded-2xl bg-surface/30 border border-border/50 hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono text-accent/50 bg-accent/5 px-2 py-1 rounded-full whitespace-nowrap">
                  {tech.detail}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

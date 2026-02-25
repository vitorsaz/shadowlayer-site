"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    content: `ShadowLayer is a privacy-preserving token protocol deployed natively on the Solana blockchain. It achieves sender anonymity, recipient anonymity, and amount confidentiality simultaneously through the composition of Groth16 zkSNARKs, Pedersen homomorphic commitments, and a modified Merkle-based nullifier accumulator.

Unlike prior approaches that introduce a separate privacy layer or require cross-chain bridges, ShadowLayer operates entirely within Solana's BPF runtime via a set of on-chain programs written in Rust.`,
  },
  {
    id: "note-model",
    title: "Note Model",
    content: `ShadowLayer adopts a UTXO-inspired note model on top of Solana's account model. A note is a data structure encoding a shielded value:

• v ∈ [0, 2⁶⁴) — the token value in base units (lamports)
• ρ — a secret nullifier seed
• r — Pedersen commitment randomness
• addr_pk = H(addr_sk) — the recipient's shielded public key

The note commitment is computed as: cm(n) = CRH(H(addr_pk ∥ ρ), v, r), where CRH is Poseidon hash.`,
  },
  {
    id: "transactions",
    title: "Transaction Types",
    content: `Shield (Public → Private)
Deposit SPL tokens into the ShadowLayer program. A note commitment is created and inserted into the Merkle accumulator. No proof is required — the shielding transaction is fully transparent.

Transfer (Private → Private)
The core privacy operation. Spend input notes and create output notes. The prover demonstrates: Merkle membership, correct nullifier derivation, value conservation, range proofs, and commitment well-formedness.

Unshield (Private → Public)
Spend an input note and receive tokens back to a standard SPL account. A simplified proof demonstrates ownership and correct nullifier derivation.`,
  },
  {
    id: "circuit",
    title: "Circuit Construction",
    content: `The transfer circuit is implemented using the bellman Rust crate over BLS12-381 scalar field. For a 2-in-2-out transfer, the circuit contains approximately 215,000 R1CS constraints:

• Merkle authentication × 2 — 82,000 constraints (38.1%)
• Nullifier derivation × 2 — 41,200 constraints (19.2%)
• Note commitment × 4 — 56,400 constraints (26.2%)
• Range proofs × 2 — 28,800 constraints (13.4%)
• Value conservation — 6,600 constraints (3.1%)

Poseidon hash is used instead of SHA-256, yielding a ~104× improvement in constraint efficiency (~240 vs ~25,000 constraints per invocation).`,
  },
  {
    id: "architecture",
    title: "On-Chain Architecture",
    content: `ShadowLayer consists of three Solana programs compiled to BPF bytecode:

ShadowPool — Maintains the Merkle accumulator (depth 32, supports 4.3B notes) and nullifier set as Program Derived Accounts (PDAs). The Merkle tree is stored as a flat array across multiple PDAs with lazy updates.

ZkVerifier — Groth16 proof verification using precomputed Miller loop tables and Montgomery multiplication. Full verification in ~198,000 compute units.

TokenGateway — SPL Token custody for shield and unshield operations. Manages PDA-owned token accounts.

Client SDK — Off-chain proof generation and note management.`,
  },
  {
    id: "security",
    title: "Security Model",
    content: `Sender Anonymity: Under the zero-knowledge property of Groth16, the proof reveals no information about the witness. The anonymity set is all unexpended note commitments in the accumulator.

Soundness: Under knowledge soundness of Groth16, no adversary can spend a note not in the accumulator or double-spend a nullified note.

Trusted Setup: Powers-of-Tau ceremony with ≥100 independent participants. Secure as long as at least one participant honestly discards their toxic waste.

Threat Model: Computationally bounded adversary with adaptive access to all on-chain data. Does not protect against IP-level traffic analysis or client-side side channels.`,
  },
  {
    id: "benchmarks",
    title: "Benchmarks",
    content: `All benchmarks on Apple M2, 16GB RAM:

• Proof generation (WASM): 1.21s
• Proof generation (native): 0.34s
• Proof size: 192 bytes
• On-chain verification: 198,000 CU (~$0.0002)
• Transaction finality: ~380ms
• Merkle tree depth: 32 (4.3B notes)`,
  },
];

const SIDEBAR_LINKS = SECTIONS.map((s) => ({ id: s.id, title: s.title }));

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-gray-900 font-bold tracking-[0.1em] uppercase">
              Shadow<span className="text-accent">Layer</span>
            </span>
            <span className="text-muted/50 text-sm">/ docs</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted hover:text-gray-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-20 self-start">
          <nav className="space-y-1">
            {SIDEBAR_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="block text-sm text-muted hover:text-gray-900 py-1.5 px-3 rounded-lg hover:bg-surface/50 transition-all duration-200"
              >
                {link.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Documentation
            </h1>
            <p className="text-muted mb-12">
              Technical documentation for ShadowLayer Protocol v0.9.1
            </p>
          </motion.div>

          <div className="space-y-16">
            {SECTIONS.map((section, i) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                className="scroll-mt-20"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-border/30">
                  {section.title}
                </h2>
                <div className="text-muted leading-relaxed whitespace-pre-line text-[15px]">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          {/* References */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/30"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">References</h2>
            <ol className="space-y-2 text-sm text-muted list-decimal list-inside">
              <li>Yakovenko, A. (2017). Solana: A new architecture for a high performance blockchain.</li>
              <li>Solana Labs. (2020). SPL Token Program.</li>
              <li>Ben-Sasson, E., et al. (2014). Zerocash: Decentralized anonymous payments from Bitcoin.</li>
              <li>Pertsev, A., et al. (2019). Tornado Cash: Ethereum transaction privacy using zero-knowledge proofs.</li>
              <li>Elusiv Team. (2022). Elusiv: Privacy as a service on Solana.</li>
              <li>Groth, J. (2016). On the size of pairing-based non-interactive arguments. EUROCRYPT 2016.</li>
              <li>Bowe, S. (2017). BLS12-381: New zk-SNARK elliptic curve construction.</li>
              <li>Grassi, L., et al. (2019). Poseidon: A new hash function for zero-knowledge proof systems.</li>
              <li>Bowe, S., et al. (2017). Scalable multi-party computation for zk-SNARK parameters.</li>
            </ol>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

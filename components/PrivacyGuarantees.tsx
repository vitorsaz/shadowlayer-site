"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const GUARANTEES = [
  {
    id: "G1",
    title: "Sender Anonymity",
    description:
      "An adversary observing the blockchain cannot determine which account initiated a shielded transfer beyond a cryptographic anonymity set.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        <path d="M2 12h4M18 12h4M12 2v4M12 18v4" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: "G2",
    title: "Recipient Anonymity",
    description:
      "The recipient of a shielded transfer is computationally hidden from all parties except the sender and recipient themselves.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
  },
  {
    id: "G3",
    title: "Amount Confidentiality",
    description:
      "The transferred amount is computationally hidden while remaining provably positive and bounded within the valid supply range.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
];

export default function PrivacyGuarantees() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [50, -100]);

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y: bgY }}
        className="absolute -left-40 top-1/2 w-[500px] h-[500px] rounded-full bg-purple-200/20 blur-[130px]"
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Privacy
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Three layers of{" "}
            <span className="text-gradient">protection</span>
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Every shielded transaction is protected by three simultaneous
            cryptographic guarantees, unified in a single zero-knowledge proof.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {GUARANTEES.map((g, i) => (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative p-8 rounded-2xl bg-surface/50 border border-border/50 hover:border-accent/30 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {g.icon}
                  </div>
                  <span className="text-xs font-mono text-accent/60">
                    {g.id}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {g.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {g.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

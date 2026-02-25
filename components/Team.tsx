"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MEMBERS = [
  {
    name: "Amir Akshan",
    role: "Co-Founder",
    org: "ShadowLayer Foundation",
  },
  {
    name: "Ryan Thomazzo",
    role: "Co-Founder",
    org: "Cryptographic Research Lab",
  },
  {
    name: "Eric R.M. Orseo",
    role: "Lead Engineer",
    org: "ZK Systems Engineering",
  },
];

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-32 md:py-44 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
            PEOPLE
          </span>
          <h2 className="font-sans text-heading text-fg mt-4">
            Team
          </h2>
        </motion.div>

        {/* Desktop: 3 columns with vertical border dividers */}
        <div className="hidden md:grid md:grid-cols-3">
          {MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + 0.12 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`py-2 ${
                i < MEMBERS.length - 1
                  ? "pr-12 border-r border-border"
                  : ""
              } ${i > 0 ? "pl-12" : ""}`}
            >
              <h3 className="font-sans text-xl text-fg">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-fg-muted mt-2">
                {member.role}
              </p>
              <p className="font-mono text-xs text-fg-faint mt-1">
                {member.org}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical stack with horizontal borders */}
        <div className="md:hidden">
          {MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`py-8 ${
                i < MEMBERS.length - 1 ? "border-b border-border" : ""
              } ${i === 0 ? "pt-0" : ""}`}
            >
              <h3 className="font-sans text-xl text-fg">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-fg-muted mt-2">
                {member.role}
              </p>
              <p className="font-mono text-xs text-fg-faint mt-1">
                {member.org}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TEAM = [
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" ref={ref} className="relative py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent text-sm font-mono tracking-widest uppercase">
            Team
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            The <span className="text-gradient">builders</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
              <p className="text-xs text-muted mt-1">{member.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

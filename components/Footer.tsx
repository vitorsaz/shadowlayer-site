"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Protocol", href: "#protocol" },
  { label: "Technology", href: "#technology" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
];

const EXTERNAL_LINKS = [
  { label: "Docs", href: "https://docs.shadowlayer.xyz" },
  { label: "GitHub", href: "https://github.com/Amir-Akshan" },
  { label: "X", href: "https://x.com/ShadowLayer_" },
  { label: "Discord", href: "https://discord.gg/shadowlayer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Row 1: Brand + Nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-8"
        >
          {/* Left: Brand */}
          <span className="font-mono text-sm tracking-widest uppercase text-fg">
            ShadowLayer
          </span>

          {/* Right: Nav links */}
          <nav className="flex flex-wrap items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-fg-muted hover:text-fg transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* Divider between rows */}
        <div className="border-t border-border" />

        {/* Row 2: Copyright + External links + Email */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-8"
        >
          {/* Left: Copyright */}
          <span className="font-mono text-xs text-fg-faint">
            &copy; 2026 ShadowLayer Foundation
          </span>

          {/* Center: External links */}
          <div className="flex flex-wrap items-center gap-6">
            {EXTERNAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-fg-faint hover:text-fg-muted transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Email */}
          <a
            href="mailto:contact@shadowlayer.xyz"
            className="font-mono text-xs text-fg-faint hover:text-fg-muted transition-colors duration-300"
          >
            contact@shadowlayer.xyz
          </a>
        </motion.div>
      </div>
    </footer>
  );
}

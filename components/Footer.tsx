"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  Protocol: [
    { label: "About", href: "#about" },
    { label: "Technology", href: "#technology" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Roadmap", href: "#roadmap" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Whitepaper", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Audit Reports", href: "#" },
  ],
  Community: [
    { label: "Twitter / X", href: "#" },
    { label: "Discord", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="text-gray-900 font-bold text-lg tracking-[0.1em] uppercase">
              Shadow<span className="text-accent">Layer</span>
            </span>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Zero-Knowledge Privacy Protocol native to the Solana Runtime.
            </p>
            <p className="mt-4 text-xs text-muted/50 font-mono">
              [email protected]
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-gray-900 transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} ShadowLayer Foundation. All rights
            reserved.
          </p>
          <p className="text-xs text-muted/50 font-mono">
            v0.9.1-alpha &middot; Draft &middot; Not for distribution
          </p>
        </div>
      </div>
    </footer>
  );
}

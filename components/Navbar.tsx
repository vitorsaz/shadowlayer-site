"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Protocol", href: "#protocol" },
  { label: "Technology", href: "#technology" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-border ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <Link
            href="/"
            className="font-mono text-sm text-fg tracking-[0.2em] uppercase select-none"
          >
            ShadowLayer
          </Link>

          {/* Center: Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-fg transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Docs link */}
          <div className="hidden md:flex items-center">
            <Link
              href="/docs"
              className="font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-fg transition-colors duration-300"
            >
              Docs
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 7, backgroundColor: "#ffffff" }
                    : { rotate: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.3 }}
                className="block h-px w-full bg-fg origin-center"
              />
              <motion.span
                animate={
                  mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block h-px w-full bg-fg origin-center"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -7, backgroundColor: "#ffffff" }
                    : { rotate: 0, y: 0, backgroundColor: "#ffffff" }
                }
                transition={{ duration: 0.3 }}
                className="block h-px w-full bg-fg origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="block py-4 font-mono text-lg text-fg tracking-wider uppercase border-b border-border"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.4 }}
              >
                <Link
                  href="/docs"
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 font-mono text-lg text-accent tracking-wider uppercase"
                >
                  Docs
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

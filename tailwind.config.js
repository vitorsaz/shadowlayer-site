/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        "bg-card": "#0a0a0a",
        "bg-elevated": "#111111",
        fg: "#ffffff",
        "fg-muted": "rgba(255,255,255,0.5)",
        "fg-faint": "rgba(255,255,255,0.25)",
        "fg-dim": "rgba(255,255,255,0.12)",
        accent: "#c8a555",
        "accent-dim": "rgba(200,165,85,0.15)",
        border: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'SF Mono'", "monospace"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "heading": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "subheading": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShadowLayer — Zero-Knowledge Privacy on Solana",
  description:
    "Confidential transactions via Groth16 zkSNARKs and Pedersen Commitments on Solana. Sender anonymity, recipient anonymity, and amount confidentiality.",
  keywords: [
    "ShadowLayer",
    "zero-knowledge",
    "zkSNARK",
    "Solana",
    "privacy",
    "confidential transactions",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="noise-bg" />
        {children}
      </body>
    </html>
  );
}

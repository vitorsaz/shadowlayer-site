import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShadowLayer — Zero-Knowledge Privacy on Solana",
  description:
    "Confidential transactions via Groth16 zkSNARKs and Pedersen Commitments on Solana.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}

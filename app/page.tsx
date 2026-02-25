"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PrivacyGuarantees from "@/components/PrivacyGuarantees";
import HowItWorks from "@/components/HowItWorks";
import Technology from "@/components/Technology";
import Performance from "@/components/Performance";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PrivacyGuarantees />
        <HowItWorks />
        <Technology />
        <Performance />
        <Tokenomics />
        <Roadmap />
        <Team />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

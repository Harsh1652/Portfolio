"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Metrics from "@/components/sections/Metrics";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/providers/SmoothScroll"), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <SmoothScroll>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Work />
            <Experience />
            <TechStack />
            <Metrics />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  );
}

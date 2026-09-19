"use client";
import { useEffect, useState } from "react";
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
import SmoothScroll from "@/components/providers/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

export default function HomeClient() {
  const [loaded, setLoaded] = useState(false);

  // Arriving from another page with a hash (e.g. /#projects): jump there once the loader clears
  useEffect(() => {
    if (!loaded) return;
    const hash = window.location.hash;
    if (hash.length > 1) document.querySelector(hash)?.scrollIntoView();
  }, [loaded]);

  // The page content is always rendered (so it is in the server HTML for crawlers);
  // the loading screen simply covers it. Hero/Navbar are re-keyed so their entrance
  // animations play when the loader clears rather than behind it.
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <SmoothScroll paused={!loaded}>
        <Navbar key={loaded ? "nav-in" : "nav-pre"} />
        <main>
          <Hero key={loaded ? "hero-in" : "hero-pre"} active={loaded} />
          <About />
          <Work />
          <Experience />
          <TechStack />
          <Metrics />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

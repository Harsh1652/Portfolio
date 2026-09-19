"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import SmoothScroll from "@/components/providers/SmoothScroll";

const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });

// Site chrome for inner pages: same cursor, scroll and navigation as the home page, without the loader
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
    </>
  );
}

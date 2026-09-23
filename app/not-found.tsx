import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/youtube/PageShell";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist. Head back to the portfolio or browse the video breakdowns.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <main id="main" className="relative min-h-[70vh] flex items-center aurora-bg grid-bg" style={{ background: "var(--bg)" }}>
        <div className="relative z-10 max-w-6xl mx-auto w-full px-5 sm:px-10 lg:px-16 py-32">
          <span className="section-label">Error 404</span>
          <h1 className="font-extrabold mt-4 max-w-3xl" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            This page <span className="gradient-text">doesn&apos;t exist</span>
          </h1>
          <p className="section-lead mt-5 max-w-xl">
            The link may be out of date. Everything else is still where you left it.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              Back to the portfolio
            </Link>
            <Link href="/youtube" className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">
              Watch the breakdowns
            </Link>
            <Link href="/#contact" className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

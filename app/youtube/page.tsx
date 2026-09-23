import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/youtube/PageShell";
import VideoCard from "@/components/youtube/VideoCard";
import { YouTubeIcon } from "@/components/ui/BrandIcons";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videos, videosNewestFirst, CHANNEL, embedUrl, watchUrl, thumbnailUrl, videoPath } from "@/lib/videos";

const PAGE_PATH = "/youtube";
const featured = videosNewestFirst[0];
const pageTitle = "YouTube — AI Architecture & Infrastructure Explained";
const pageDescription =
  "Video breakdowns by Harsh Gupta on how modern AI systems work — model architecture, scaling and inference — with chapters, key takeaways and full transcripts. Latest: AI agent harnesses, and looped transformers in OpenAI's Astra.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: PAGE_PATH,
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — AI architecture breakdowns` }] },
  },
  keywords: ["Invisigent YouTube", "Harsh Gupta YouTube", "AI architecture explained", "AI agent harness", "AI agents", "looped transformer", "OpenAI Astra", "AI scaling", "LLM inference", "video transcript"],
  openGraph: {
    type: "website",
    url: absoluteUrl(PAGE_PATH),
    siteName: site.name,
    title: `${pageTitle} | ${site.name}`,
    description: pageDescription,
    images: featured ? [{ url: thumbnailUrl(featured), width: 1280, height: 720, alt: featured.title }] : undefined,
    videos: videos.map((v) => ({ url: embedUrl(v), width: 1280, height: 720, type: "text/html" })),
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${site.name}`,
    description: pageDescription,
    images: featured ? [thumbnailUrl(featured)] : undefined,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": absoluteUrl(`${PAGE_PATH}#page`),
      url: absoluteUrl(PAGE_PATH),
      name: pageTitle,
      description: pageDescription,
      isPartOf: { "@id": absoluteUrl("/#website") },
      author: { "@id": absoluteUrl("/#person") },
      inLanguage: "en",
      dateModified: videosNewestFirst[0]?.uploadDate,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: videosNewestFirst.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(videoPath(v)),
          name: v.title,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "YouTube", item: absoluteUrl(PAGE_PATH) },
      ],
    },
    // Summary entries only — each video's full VideoObject (chapters, transcript, FAQ) lives on its own page
    ...videosNewestFirst.map((v) => ({
      "@type": "VideoObject",
      "@id": absoluteUrl(`${videoPath(v)}#video`),
      name: v.title,
      description: v.description,
      thumbnailUrl: [thumbnailUrl(v)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      embedUrl: embedUrl(v),
      url: absoluteUrl(videoPath(v)),
      sameAs: watchUrl(v),
      about: v.topics.map((t) => ({ "@type": "Thing", name: t })),
      inLanguage: "en",
      isFamilyFriendly: true,
      author: { "@id": absoluteUrl("/#person") },
      publisher: { "@id": absoluteUrl("/#person") },
    })),
  ],
};

export default function YouTubePage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* The player and thumbnails come from YouTube — warm those connections early */}
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <main id="main" className="relative" style={{ background: "var(--bg)" }}>
        {/* Page hero */}
        <div className="relative aurora-bg grid-bg overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-14 sm:pb-20">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/40 mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-indigo-300" aria-current="page">YouTube</span>
            </nav>
            <div className="flex items-center gap-4 mb-4">
              <span className="section-label">{CHANNEL.name} on YouTube</span>
              <div className="w-8 h-px bg-indigo-500/40" />
            </div>
            <h1 className="font-extrabold max-w-4xl" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.1rem, 5.2vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em", textWrap: "balance" }}>
              How modern AI systems <span className="gradient-text">actually work</span>
            </h1>
            <p className="section-lead mt-5 max-w-2xl">
              Short, visual breakdowns of the architecture and infrastructure behind modern AI — by {site.name}. Every video here comes with chapters, key takeaways and a full transcript.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href={CHANNEL.subscribeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#e11d2a" }}>
                <YouTubeIcon size={17} /> Subscribe to {CHANNEL.handle}
              </a>
              <a href={CHANNEL.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">
                Visit the channel <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* One card per video — each opens its own page */}
        <section aria-labelledby="all-videos" className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 py-14 sm:py-20">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 id="all-videos" className="font-extrabold text-2xl sm:text-3xl" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              All videos
            </h2>
            <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
              {videos.length} {videos.length === 1 ? "breakdown" : "breakdowns"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {videosNewestFirst.map((v, i) => <VideoCard key={v.id} video={v} position={i} />)}
          </div>
        </section>

        {/* Closing CTA */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pb-20 sm:pb-28">
          <div className="card relative p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(600px circle at 0% 0%, rgba(99,102,241,0.12), transparent 60%)" }} />
            <div className="relative">
              <h2 className="font-extrabold text-xl sm:text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>Building something with AI?</h2>
              <p className="text-sm sm:text-base text-white/60 max-w-xl">I design and ship production AI systems — multi-agent workflows, RAG platforms and the backends behind them.</p>
            </div>
            <div className="relative flex flex-wrap gap-3 flex-shrink-0">
              <Link href="/#projects" className="px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">See my work</Link>
              <Link href="/#contact" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>Let&apos;s talk</Link>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

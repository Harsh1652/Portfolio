import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/youtube/PageShell";
import VideoSection from "@/components/youtube/VideoSection";
import { YouTubeIcon } from "@/components/ui/BrandIcons";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videos, CHANNEL, embedUrl, watchUrl, thumbnailUrl, transcriptText } from "@/lib/videos";

const PAGE_PATH = "/youtube";
const pageTitle = "YouTube — AI Architecture & Infrastructure Explained";
const pageDescription =
  "Video breakdowns by Harsh Gupta on how modern AI systems work — model architecture, scaling and inference — with chapters, key takeaways and full transcripts. Latest: looped transformers and OpenAI's Astra.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: PAGE_PATH },
  keywords: ["Invisigent YouTube", "Harsh Gupta YouTube", "AI architecture explained", "looped transformer", "OpenAI Astra", "AI scaling", "LLM inference", "video transcript"],
  openGraph: {
    type: "website",
    url: absoluteUrl(PAGE_PATH),
    siteName: site.name,
    title: `${pageTitle} | ${site.name}`,
    description: pageDescription,
    images: videos[0] ? [{ url: thumbnailUrl(videos[0]), width: 1280, height: 720, alt: videos[0].title }] : undefined,
    videos: videos.map((v) => ({ url: embedUrl(v), width: 1280, height: 720, type: "text/html" })),
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${site.name}`,
    description: pageDescription,
    images: videos[0] ? [thumbnailUrl(videos[0])] : undefined,
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
      mainEntity: {
        "@type": "ItemList",
        itemListElement: videos.map((v, i) => ({ "@type": "ListItem", position: i + 1, item: { "@id": absoluteUrl(`${PAGE_PATH}#${v.slug}`) } })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "YouTube", item: absoluteUrl(PAGE_PATH) },
      ],
    },
    ...videos.map((v) => ({
      "@type": "VideoObject",
      "@id": absoluteUrl(`${PAGE_PATH}#${v.slug}`),
      name: v.title,
      description: v.description,
      abstract: v.summary,
      thumbnailUrl: [thumbnailUrl(v)],
      uploadDate: v.uploadDate,
      duration: v.duration,
      embedUrl: embedUrl(v),
      url: absoluteUrl(`${PAGE_PATH}#${v.slug}`),
      sameAs: watchUrl(v),
      keywords: v.topics.join(", "),
      transcript: transcriptText(v),
      author: { "@id": absoluteUrl("/#person") },
      publisher: { "@id": absoluteUrl("/#person") },
      isPartOf: { "@id": absoluteUrl(`${PAGE_PATH}#page`) },
      // Key moments
      hasPart: v.chapters.map((c, i) => ({
        "@type": "Clip",
        name: c.title,
        startOffset: c.start,
        ...(v.chapters[i + 1] ? { endOffset: v.chapters[i + 1].start } : {}),
        url: watchUrl(v, c.start),
      })),
    })),
    {
      "@type": "FAQPage",
      "@id": absoluteUrl(`${PAGE_PATH}#faq`),
      mainEntity: videos.flatMap((v) => v.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))),
    },
  ],
};

export default function YouTubePage() {
  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="relative" style={{ background: "var(--bg)" }}>
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

            {videos.length > 1 && (
              <ol className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label="Videos on this page">
                {videos.map((v, i) => (
                  <li key={v.id}>
                    <a href={`#${v.slug}`} className="card flex items-center gap-4 px-4 py-3 text-sm text-white/70 hover:text-white transition-colors">
                      <span className="text-xs text-indigo-300" style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</span>
                      {v.title}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* One section per video */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16">
          {videos.map((v, i) => <VideoSection key={v.id} video={v} index={i} />)}
        </div>

        {/* Closing CTA */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pb-20 sm:pb-28">
          <div className="card p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
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

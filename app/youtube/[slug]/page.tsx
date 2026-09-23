import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import PageShell from "@/components/youtube/PageShell";
import VideoSection from "@/components/youtube/VideoSection";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videos, videosByDate, findVideo, videoPath, episodeNumber, embedUrl, watchUrl, thumbnailUrl, transcriptText } from "@/lib/videos";

const INDEX_PATH = "/youtube";

export const dynamicParams = false;

export function generateStaticParams() {
  return videos.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const video = findVideo(slug);
  if (!video) return {};

  const path = videoPath(video);
  return {
    title: video.title,
    description: video.description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — AI architecture breakdowns` }] },
    },
    keywords: [...video.topics, "Harsh Gupta", "Invisigent", "AI explained", "video transcript"],
    openGraph: {
      type: "video.other",
      url: absoluteUrl(path),
      siteName: site.name,
      title: `${video.title} | ${site.name}`,
      description: video.description,
      images: [{ url: thumbnailUrl(video), width: 1280, height: 720, alt: video.title }],
      videos: [{ url: embedUrl(video), width: 1280, height: 720, type: "text/html" }],
    },
    twitter: {
      card: "player",
      title: `${video.title} | ${site.name}`,
      description: video.description,
      images: [thumbnailUrl(video)],
    },
  };
}

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const video = findVideo(slug);
  if (!video) notFound();

  // Neighbours follow publication order: "previous" is the older video
  const chronological = videosByDate.findIndex((v) => v.slug === video.slug);
  const prev = videosByDate[chronological - 1];
  const next = videosByDate[chronological + 1];
  const path = videoPath(video);
  const published = new Date(video.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        "@id": absoluteUrl(`${path}#video`),
        name: video.title,
        description: video.description,
        abstract: video.summary,
        thumbnailUrl: [thumbnailUrl(video)],
        uploadDate: video.uploadDate,
        duration: video.duration,
        embedUrl: embedUrl(video),
        url: absoluteUrl(path),
        sameAs: watchUrl(video),
        keywords: video.topics.join(", "),
        // Naming the subjects explicitly helps answer engines match the video to a question
        about: video.topics.map((t) => ({ "@type": "Thing", name: t })),
        inLanguage: "en",
        isFamilyFriendly: true,
        genre: "Technology",
        datePublished: video.uploadDate,
        transcript: transcriptText(video),
        author: { "@id": absoluteUrl("/#person") },
        publisher: { "@id": absoluteUrl("/#person") },
        isPartOf: { "@id": absoluteUrl(`${INDEX_PATH}#page`) },
        // Key moments
        hasPart: video.chapters.map((c, i) => ({
          "@type": "Clip",
          name: c.title,
          startOffset: c.start,
          ...(video.chapters[i + 1] ? { endOffset: video.chapters[i + 1].start } : {}),
          url: watchUrl(video, c.start),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "YouTube", item: absoluteUrl(INDEX_PATH) },
          { "@type": "ListItem", position: 3, name: video.title, item: absoluteUrl(path) },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`${path}#faq`),
        inLanguage: "en",
        about: { "@id": absoluteUrl(`${path}#video`) },
        mainEntity: video.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* The player and thumbnails come from YouTube — warm those connections early */}
      <link rel="preconnect" href="https://i.ytimg.com" />
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="dns-prefetch" href="https://www.youtube.com" />
      <main id="main" className="relative" style={{ background: "var(--bg)" }}>
        {/* Hero */}
        <div className="relative aurora-bg grid-bg overflow-hidden">
          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-32 sm:pt-40 pb-10 sm:pb-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/40 mb-8" style={{ fontFamily: "var(--font-mono)" }}>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href={INDEX_PATH} className="hover:text-white transition-colors">YouTube</Link>
              <span>/</span>
              <span className="text-indigo-300 truncate max-w-[60vw]" aria-current="page">{video.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5 text-xs text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="text-indigo-300">EP {String(episodeNumber(video)).padStart(2, "0")}</span>
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /><time dateTime={video.uploadDate}>{published}</time></span>
              <span className="inline-flex items-center gap-1.5"><Clock size={13} />{video.durationLabel}</span>
            </div>

            <h1 className="font-extrabold max-w-4xl" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", lineHeight: 1.06, letterSpacing: "-0.03em", textWrap: "balance" }}>
              {video.title}
            </h1>
            <p className="section-lead mt-5 max-w-3xl">{video.description}</p>
            <ul className="flex flex-wrap gap-1.5 mt-6" aria-label="Topics">
              {video.topics.map((t) => <li key={t} className="chip">{t}</li>)}
            </ul>
          </div>
        </div>

        {/* Player, chapters, takeaways, transcript and FAQ */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pt-10 sm:pt-14">
          <VideoSection video={video} standalone />
        </div>

        {/* Prev / next */}
        {(prev || next) && (
          <nav aria-label="More videos" className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link href={videoPath(prev)} className="card group p-5 sm:p-6 flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-0.5">
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                    <ArrowLeft size={13} /> Previous
                  </span>
                  <span className="font-bold text-[15px] sm:text-base text-white/85 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>{prev.title}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {next && (
                <Link href={videoPath(next)} className="card group p-5 sm:p-6 flex flex-col gap-2 sm:items-end sm:text-right transition-transform duration-300 hover:-translate-y-0.5">
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                    Next <ArrowRight size={13} />
                  </span>
                  <span className="font-bold text-[15px] sm:text-base text-white/85 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-display)" }}>{next.title}</span>
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* Back to index */}
        <div className="max-w-6xl mx-auto px-5 sm:px-10 lg:px-16 pb-20 sm:pb-28 pt-6">
          <Link href={INDEX_PATH} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">
            <ArrowLeft size={15} /> All videos
          </Link>
        </div>
      </main>
    </PageShell>
  );
}

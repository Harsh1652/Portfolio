"use client";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Clock, CalendarDays, Play } from "lucide-react";
import { type Video, embedUrl, watchUrl, formatTime, episodeNumber, CHANNEL } from "@/lib/videos";
import { YouTubeIcon } from "@/components/ui/BrandIcons";

const mono = { fontFamily: "var(--font-mono)" };
const display = { fontFamily: "var(--font-display)" };

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70 mb-5" style={mono}>
      <span className="w-1 h-4 rounded-full bg-indigo-400" />
      {children}
    </h3>
  );
}

/** `standalone` renders the section as the body of a video's own page (no divider, no top padding) */
export default function VideoSection({ video, standalone = false }: { video: Video; standalone?: boolean }) {
  // `seek` is null until a timestamp is clicked, so the initial embed never autoplays
  const [seek, setSeek] = useState<{ start: number; n: number } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const src = seek ? `${embedUrl(video)}?start=${seek.start}&autoplay=1&rel=0` : `${embedUrl(video)}?rel=0`;
  const activeChapter = seek ? video.chapters.reduce((acc, c, i) => (c.start <= seek.start ? i : acc), 0) : -1;

  const jumpTo = (start: number) => {
    setSeek((s) => ({ start, n: (s?.n ?? 0) + 1 }));
    const top = playerRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80 || top > window.innerHeight * 0.6) playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const published = new Date(video.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

  return (
    <section
      id={video.slug}
      aria-labelledby={standalone ? undefined : `${video.slug}-title`}
      className={standalone ? "pb-14 sm:pb-20" : "scroll-mt-28 py-14 sm:py-20 border-t"}
      style={standalone ? undefined : { borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Header — skipped when standalone, because the page hero already carries this */}
      {!standalone && (
      <header className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-xs text-white/50" style={mono}>
          <span className="text-indigo-300">EP {String(episodeNumber(video)).padStart(2, "0")}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /><time dateTime={video.uploadDate}>{published}</time></span>
          <span className="inline-flex items-center gap-1.5"><Clock size={13} />{video.durationLabel}</span>
        </div>
        <h2 id={`${video.slug}-title`} className="font-extrabold leading-tight max-w-4xl" style={{ ...display, fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)", letterSpacing: "-0.02em", textWrap: "balance" }}>
          {video.title}
        </h2>
        <p className="section-lead mt-4 max-w-3xl">{video.description}</p>
        <ul className="flex flex-wrap gap-1.5 mt-5" aria-label="Topics">
          {video.topics.map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>
      </header>
      )}

      {/* Player + chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        <div className="lg:col-span-8">
          <div ref={playerRef} className="card overflow-hidden p-1.5" style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
            <div className="relative w-full rounded-[14px] overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                key={seek?.n ?? 0}
                className="absolute inset-0 w-full h-full"
                src={src}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
            <a href={watchUrl(video)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold glass-bright text-white/80 hover:text-white transition-colors">
              Watch on YouTube <ArrowUpRight size={15} />
            </a>
            <a href={CHANNEL.subscribeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "#e11d2a" }}>
              <YouTubeIcon size={16} /> Subscribe
            </a>
          </div>
        </div>

        <nav aria-label={`Chapters — ${video.title}`} className="lg:col-span-4 card p-4 sm:p-5">
          <h3 className="text-xs uppercase tracking-[0.18em] text-white/70 mb-3 px-1" style={mono}>Chapters</h3>
          <ol className="flex flex-col">
            {video.chapters.map((c, i) => (
              <li key={c.start}>
                <button
                  onClick={() => jumpTo(c.start)}
                  className="group w-full flex items-start gap-3 px-2 py-2 rounded-lg text-left transition-colors hover:bg-white/5"
                  style={{ background: activeChapter === i ? "rgba(129,140,248,0.1)" : undefined }}
                >
                  <span className="text-[11px] tabular-nums pt-0.5 w-8 flex-shrink-0 text-indigo-300" style={mono}>{formatTime(c.start)}</span>
                  <span className={`text-[13px] leading-snug transition-colors ${activeChapter === i ? "text-white" : "text-white/60 group-hover:text-white"}`}>{c.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Summary + takeaways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mt-10 sm:mt-14">
        <div className="lg:col-span-5">
          <SubHeading>In short</SubHeading>
          <p className="text-[15px] sm:text-base text-white/70 leading-relaxed">{video.summary}</p>
        </div>
        <div className="lg:col-span-7">
          <SubHeading>Key takeaways</SubHeading>
          <ul className="space-y-3">
            {video.takeaways.map((t, i) => (
              <li key={i} className="flex gap-3 text-[15px] text-white/70 leading-relaxed">
                <span className="text-[11px] text-indigo-300 pt-1 tabular-nums flex-shrink-0" style={mono}>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transcript — always in the DOM (collapsed visually only) so it stays indexable */}
      <div className="mt-10 sm:mt-14">
        <SubHeading>Full transcript</SubHeading>
        <div className="card p-5 sm:p-8">
          <div id={`${video.slug}-transcript`} className="relative overflow-hidden" style={{ maxHeight: expanded ? "none" : 380 }}>
            <div className="max-w-3xl space-y-8">
              {video.chapters.map((c) => (
                <div key={c.start}>
                  <h4 className="flex items-center gap-3 mb-3">
                    <button onClick={() => jumpTo(c.start)} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] tabular-nums text-indigo-300 hover:text-white transition-colors" style={{ ...mono, background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)" }} aria-label={`Play from ${formatTime(c.start)}`}>
                      <Play size={10} fill="currentColor" />{formatTime(c.start)}
                    </button>
                    <span className="font-bold text-base text-white/90" style={display}>{c.title}</span>
                  </h4>
                  <div className="space-y-3">
                    {c.paragraphs.map((p, i) => <p key={i} className="text-[15px] text-white/65 leading-[1.8]">{p}</p>)}
                  </div>
                </div>
              ))}
            </div>
            {!expanded && <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, #0f0f10)" }} />}
          </div>
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={`${video.slug}-transcript`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-white transition-colors"
          >
            {expanded ? "Collapse transcript" : "Read the full transcript"}
            <ChevronDown size={16} className="transition-transform" style={{ transform: expanded ? "rotate(180deg)" : undefined }} />
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-10 sm:mt-14">
        <SubHeading>Questions this video answers</SubHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {video.faqs.map((f, i) => (
            <div key={f.q} className={`card p-5 sm:p-6 ${video.faqs.length % 2 === 1 && i === video.faqs.length - 1 ? "md:col-span-2" : ""}`}>
              <h4 className="font-bold text-[15px] sm:text-base mb-2 text-white/90" style={display}>{f.q}</h4>
              <p className="text-sm sm:text-[15px] text-white/60 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

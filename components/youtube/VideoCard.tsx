import Link from "next/link";
import { ArrowUpRight, Clock, CalendarDays, Play } from "lucide-react";
import { type Video, videoPath, thumbnailUrl, episodeNumber } from "@/lib/videos";

const mono = { fontFamily: "var(--font-mono)" };
const display = { fontFamily: "var(--font-display)" };

/** Index-page card linking to a video's own page. `position` is its place in the grid, newest first. */
export default function VideoCard({ video, position }: { video: Video; position: number }) {
  const published = new Date(video.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

  return (
    <article className="card group relative overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "16 / 9" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl(video)}
          alt={`Thumbnail for ${video.title}`}
          width={1280}
          height={720}
          loading={position === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,16,0.85), rgba(15,15,16,0.05) 55%)" }} />
        <span
          className="absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
          style={{ background: "rgba(225,29,42,0.92)", boxShadow: "0 10px 30px rgba(0,0,0,0.45)" }}
          aria-hidden
        >
          <Play size={20} fill="currentColor" />
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-[11px] tabular-nums text-white/90" style={{ ...mono, background: "rgba(0,0,0,0.6)" }}>
          {video.durationLabel}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3 text-[11px] text-white/45" style={mono}>
          <span className="text-indigo-300">EP {String(episodeNumber(video)).padStart(2, "0")}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} /><time dateTime={video.uploadDate}>{published}</time></span>
          <span className="inline-flex items-center gap-1.5"><Clock size={12} />{video.durationLabel}</span>
        </div>

        <h2 className="font-extrabold text-lg sm:text-xl leading-snug mb-3" style={{ ...display, letterSpacing: "-0.015em", textWrap: "balance" }}>
          <Link href={videoPath(video)} className="after:absolute after:inset-0 text-white/95 group-hover:text-white transition-colors">
            {video.title}
          </Link>
        </h2>

        <p className="text-sm text-white/55 leading-relaxed line-clamp-3">{video.description}</p>

        <ul className="flex flex-wrap gap-1.5 mt-4" aria-label="Topics">
          {video.topics.slice(0, 3).map((t) => <li key={t} className="chip">{t}</li>)}
        </ul>

        <span className="mt-5 pt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 group-hover:text-white transition-colors border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          Watch &amp; read the breakdown
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

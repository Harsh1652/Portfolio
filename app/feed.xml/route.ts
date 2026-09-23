import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videosNewestFirst, CHANNEL, videoPath, thumbnailUrl } from "@/lib/videos";

export const dynamic = "force-static";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// RSS 2.0 feed of the video breakdowns, so readers and aggregators can subscribe
export function GET() {
  const latest = videosNewestFirst[0];
  const items = videosNewestFirst
    .map((v) =>
      [
        "    <item>",
        `      <title>${escape(v.title)}</title>`,
        `      <link>${absoluteUrl(videoPath(v))}</link>`,
        `      <guid isPermaLink="true">${absoluteUrl(videoPath(v))}</guid>`,
        `      <pubDate>${new Date(v.uploadDate).toUTCString()}</pubDate>`,
        `      <dc:creator>${escape(site.name)}</dc:creator>`,
        ...v.topics.map((t) => `      <category>${escape(t)}</category>`),
        `      <enclosure url="${escape(thumbnailUrl(v))}" type="image/jpeg" length="0" />`,
        `      <description>${escape(v.summary)}</description>`,
        "    </item>",
      ].join("\n")
    )
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escape(`${site.name} — AI architecture breakdowns`)}</title>`,
    `    <link>${absoluteUrl("/youtube")}</link>`,
    `    <description>${escape(CHANNEL.tagline)}</description>`,
    "    <language>en</language>",
    `    <managingEditor>${escape(`${site.email} (${site.name})`)}</managingEditor>`,
    `    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />`,
    ...(latest ? [`    <lastBuildDate>${new Date(latest.uploadDate).toUTCString()}</lastBuildDate>`] : []),
    `    <docs>${SITE_URL}</docs>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}

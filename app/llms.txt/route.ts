import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videosNewestFirst, CHANNEL, watchUrl, formatTime, videoPath } from "@/lib/videos";

export const dynamic = "force-static";

// https://llmstxt.org — a plain-markdown summary of the site for LLM-based tools
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Role: ${site.jobTitle}`,
    `- Website: ${SITE_URL}`,
    `- Email: ${site.email}`,
    `- GitHub: ${site.socials.github}`,
    `- LinkedIn: ${site.socials.linkedin}`,
    `- YouTube: ${CHANNEL.url} (${CHANNEL.name})`,
    `- Expertise: ${site.knowsAbout.join(", ")}`,
    "",
    "## Pages",
    "",
    `- [Portfolio](${absoluteUrl("/")}): About, AI case studies, client websites, experience, skills, impact metrics and contact form.`,
    `- [YouTube](${absoluteUrl("/youtube")}): Index of video breakdowns of AI architecture and infrastructure. Each video has its own page with chapters, takeaways, FAQ and a full transcript.`,
    ...videosNewestFirst.map((v) => `- [${v.title}](${absoluteUrl(videoPath(v))}): ${v.description}`),
    "",
    `- [RSS feed](${absoluteUrl("/feed.xml")}): New video breakdowns as they are published.`,
    "",
    "## Videos",
    "",
    ...videosNewestFirst.flatMap((v) => [
      `### ${v.title}`,
      "",
      `- Page: ${absoluteUrl(videoPath(v))}`,
      `- Watch: ${watchUrl(v)}`,
      `- Published: ${v.uploadDate.slice(0, 10)} · Length: ${v.durationLabel}`,
      `- Topics: ${v.topics.join(", ")}`,
      "",
      v.summary,
      "",
      "Key takeaways:",
      ...v.takeaways.map((t) => `- ${t}`),
      "",
      "Questions answered:",
      ...v.faqs.map((f) => `- **${f.q}** ${f.a}`),
      "",
      "Transcript:",
      ...v.chapters.flatMap((c) => ["", `[${formatTime(c.start)}] ${c.title}`, ...c.paragraphs]),
      "",
    ]),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}

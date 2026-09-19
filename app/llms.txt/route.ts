import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { videos, CHANNEL, watchUrl, formatTime } from "@/lib/videos";

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
    `- [YouTube](${absoluteUrl("/youtube")}): Video breakdowns of AI architecture and infrastructure with chapters, takeaways and full transcripts.`,
    "",
    "## Videos",
    "",
    ...videos.flatMap((v) => [
      `### ${v.title}`,
      "",
      `- Page: ${absoluteUrl(`/youtube#${v.slug}`)}`,
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

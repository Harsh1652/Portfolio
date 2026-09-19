import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { videos, embedUrl, thumbnailUrl } from "@/lib/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVideo = videos.map((v) => new Date(v.uploadDate)).sort((a, b) => +b - +a)[0];
  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: absoluteUrl("/youtube"),
      lastModified: latestVideo ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      videos: videos.map((v) => ({
        title: v.title,
        description: v.description,
        thumbnail_loc: thumbnailUrl(v),
        player_loc: embedUrl(v),
        publication_date: v.uploadDate,
        family_friendly: "yes" as const,
      })),
    },
  ];
}

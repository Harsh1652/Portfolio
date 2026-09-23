import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { videos, videosNewestFirst, embedUrl, thumbnailUrl, videoPath } from "@/lib/videos";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestVideo = videos.map((v) => new Date(v.uploadDate)).sort((a, b) => +b - +a)[0];
  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1, images: [absoluteUrl("/opengraph-image")] },
    {
      url: absoluteUrl("/youtube"),
      lastModified: latestVideo ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      images: videosNewestFirst.map((v) => thumbnailUrl(v)),
      videos: videosNewestFirst.map((v) => ({
        title: v.title,
        description: v.description,
        thumbnail_loc: thumbnailUrl(v),
        player_loc: embedUrl(v),
        publication_date: v.uploadDate,
        family_friendly: "yes" as const,
      })),
    },
    // One entry per video page
    ...videosNewestFirst.map((v) => ({
      url: absoluteUrl(videoPath(v)),
      lastModified: new Date(v.uploadDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [thumbnailUrl(v)],
      videos: [
        {
          title: v.title,
          description: v.description,
          thumbnail_loc: thumbnailUrl(v),
          player_loc: embedUrl(v),
          publication_date: v.uploadDate,
          duration: durationSeconds(v.durationLabel),
          family_friendly: "yes" as const,
        },
      ],
    })),
    { url: absoluteUrl("/feed.xml"), lastModified: latestVideo ?? new Date(), changeFrequency: "weekly", priority: 0.3 },
  ];
}

/** "4:44" -> 284, for the sitemap's video:duration field */
function durationSeconds(label: string) {
  return label.split(":").reduce((acc, part) => acc * 60 + Number(part), 0);
}

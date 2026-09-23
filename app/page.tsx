import HomeClient from "@/components/home/HomeClient";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import { projects, sites } from "@/lib/projects";
import { experiences } from "@/lib/experience";

// Each case study and client site becomes its own entity so search and answer engines
// can cite an individual project rather than only the page as a whole.
const caseStudyEntities = projects.map((p) => ({
  "@type": "SoftwareApplication",
  "@id": absoluteUrl(`/#project-${p.id}`),
  name: p.title,
  alternateName: p.subtitle,
  applicationCategory: "BusinessApplication",
  description: p.overview.replace(/\s+/g, " ").trim(),
  abstract: p.tagline,
  dateCreated: p.year,
  keywords: p.tech.join(", "),
  author: { "@id": absoluteUrl("/#person") },
  creator: { "@id": absoluteUrl("/#person") },
  isPartOf: { "@id": absoluteUrl("/#profile") },
  ...(p.demo ? { url: p.demo } : {}),
  ...(p.github ? { codeRepository: p.github } : {}),
}));

const clientSiteEntities = sites.map((s) => ({
  "@type": "WebSite",
  "@id": absoluteUrl(`/#site-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
  name: s.name,
  url: s.url,
  description: s.description,
  keywords: s.tech.join(", "),
  creator: { "@id": absoluteUrl("/#person") },
}));

const currentRole = experiences[0];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": absoluteUrl("/#profile"),
      url: SITE_URL,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#person") },
      mainEntity: { "@id": absoluteUrl("/#person") },
      primaryImageOfPage: { "@id": absoluteUrl("/#og-image") },
      significantLink: [absoluteUrl("/youtube"), ...projects.filter((p) => p.demo).map((p) => p.demo)],
      hasPart: {
        "@type": "ItemList",
        name: "Featured AI case studies",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          item: { "@id": absoluteUrl(`/#project-${p.id}`) },
        })),
      },
    },
    {
      "@type": "ImageObject",
      "@id": absoluteUrl("/#og-image"),
      url: absoluteUrl("/opengraph-image"),
      contentUrl: absoluteUrl("/opengraph-image"),
      width: 1200,
      height: 630,
      caption: site.title,
    },
    // Extends the Person declared in the root layout with work history and skills
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      image: { "@id": absoluteUrl("/#og-image") },
      worksFor: {
        "@type": "Organization",
        name: currentRole.company,
        employee: { "@id": absoluteUrl("/#person") },
      },
      hasOccupation: {
        "@type": "Occupation",
        name: site.jobTitle,
        occupationalCategory: "15-1252.00", // Software Developers (O*NET)
        skills: site.knowsAbout.join(", "),
      },
      subjectOf: experiences.flatMap((e) =>
        e.projects.map((p) => ({
          "@type": "CreativeWork",
          name: p.name,
          description: p.description,
          keywords: p.tech.join(", "),
          creator: { "@id": absoluteUrl("/#person") },
        }))
      ),
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI and backend engineering",
          serviceType: ["Multi-agent AI systems", "Retrieval-Augmented Generation platforms", "AI automation", "Backend architecture"],
          provider: { "@id": absoluteUrl("/#person") },
          areaServed: "Worldwide",
        },
      },
    },
    ...caseStudyEntities,
    ...clientSiteEntities,
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}

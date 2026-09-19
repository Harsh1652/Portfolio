import HomeClient from "@/components/home/HomeClient";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": absoluteUrl("/#profile"),
  url: SITE_URL,
  name: site.title,
  description: site.description,
  isPartOf: { "@id": absoluteUrl("/#website") },
  about: { "@id": absoluteUrl("/#person") },
  mainEntity: { "@id": absoluteUrl("/#person") },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeClient />
    </>
  );
}

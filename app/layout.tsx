import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-dm-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  keywords: [
    "Harsh Gupta", "AI Engineer", "AI Backend Engineer", "Multi-Agent Systems", "LangGraph", "RAG", "Retrieval-Augmented Generation",
    "LLM Engineer", "AI Automation", "FastAPI", "Next.js", "Freelance AI Developer", "Invisigent",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#080808", colorScheme: "dark" };

// Entity data for search engines and AI answer engines
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: site.name,
      url: SITE_URL,
      email: `mailto:${site.email}`,
      jobTitle: site.jobTitle,
      description: site.description,
      knowsAbout: site.knowsAbout,
      sameAs: Object.values(site.socials),
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: SITE_URL,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": absoluteUrl("/#person") },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

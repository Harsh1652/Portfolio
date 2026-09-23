import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL, site, absoluteUrl } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts. Downloading these at build time from Google
// (next/font/google) makes builds depend on whichever URL format the Google CDN
// happens to serve, which Turbopack cannot always resolve.
const syne = localFont({
  src: "./fonts/Syne-Variable.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-syne",
  display: "swap",
});
const dmSans = localFont({
  src: [
    { path: "./fonts/DMSans-Variable.woff2", weight: "300 600", style: "normal" },
    { path: "./fonts/DMSans-Italic-Variable.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});
const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-jetbrains",
  display: "swap",
});

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
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — AI architecture breakdowns` }] },
  },
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
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Gupta — AI & Backend Engineer",
  description: "Building production-ready AI systems: multi-agent architectures, enterprise RAG, automation platforms, and scalable backend engineering.",
  keywords: ["AI Engineer", "RAG", "LangGraph", "Multi-Agent", "FastAPI", "Next.js"],
  authors: [{ name: "Harsh Gupta" }],
  openGraph: {
    title: "Harsh Gupta — AI & Backend Engineer",
    description: "Building production-ready AI systems that automate complex business workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

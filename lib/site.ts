// Single source of truth for SEO metadata, structured data, sitemap and llms.txt.
// Set NEXT_PUBLIC_SITE_URL in the environment when a custom domain is attached.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-harsh1652s-projects.vercel.app").replace(/\/$/, "");

export const site = {
  name: "Harsh Gupta",
  title: "Harsh Gupta — AI & Backend Engineer",
  jobTitle: "AI & Backend Engineer",
  description:
    "Harsh Gupta is an AI & Backend Engineer building production-ready AI systems: multi-agent architectures with LangGraph, enterprise RAG platforms, AI automation, and scalable FastAPI and Node.js backends.",
  email: "harsh160502@gmail.com",
  resumeUrl: "https://docs.google.com/document/d/1vm968shXI-XLMPRr1BLCTfvwecpdThXhDtXjQIWtzA4/edit?usp=sharing",
  locale: "en_US",
  socials: {
    github: "https://github.com/Harsh1652",
    linkedin: "https://www.linkedin.com/in/harsh-gupta16/",
    youtube: "https://www.youtube.com/@invisigent",
  },
  youtubeHandle: "@invisigent",
  knowsAbout: [
    "Multi-agent AI systems",
    "Retrieval-Augmented Generation (RAG)",
    "LangGraph",
    "LangChain",
    "Large language models",
    "AI automation",
    "FastAPI",
    "Node.js",
    "Next.js",
    "Vector databases",
    "Backend engineering",
  ],
};

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

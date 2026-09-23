// Roles shown in the Experience section. Kept here so the server can also build structured data.

export const experiences = [
  {
    id: "reinvent", year: "2025–2026", company: "Reinvent Digital", role: "AI Automation Engineer", location: "", color: "#818cf8",
    projects: [
      { name: "Marketing Attribution Platform", description: "AI-powered marketing attribution system that automatically tracks, analyzes, and attributes customer journeys across multiple touchpoints.", tech: ["AWS", "Docker", "Express", "TypeScript", "React", "Next.js", "PostgreSQL", "Redis"], impact: "Automated 80% of manual attribution work" },
      { name: "Post Call Intelligence", description: "Real-time call analysis platform processing 200+ daily calls, extracting action items, sentiment, and business insights with Hindi language support.", tech: ["Sarvam", "GPT-4o", "FastAPI", "WebSockets", "MongoDB", "Lambda", "AWS"], impact: "200+ calls/day at 95% Hindi accuracy" },
    ],
  },
  {
    id: "excollo", year: "2025", company: "Excollo", role: "Software Engineer", location: "", color: "#a78bfa",
    projects: [
      { name: "AI Persona SaaS Platform", description: "Full-stack SaaS platform enabling businesses to create custom AI personas with specialized knowledge bases and multi-channel deployment.", tech: ["Next.js", "FastAPI", "n8n", "OpenAI", "Cohere Reranking", "Pinecone", "Redis", "MongoDB", "Docker"], impact: "Scalable multi-tenant AI personas" },
      { name: "CRUDO OMS", description: "Order management system for oil & gas industry with real-time tracking, automated workflows, and intelligent inventory optimization.", tech: ["Next.js", "Node.js", "Express.js", "TypeScript", "MongoDB", "Redis", "Docker"], impact: "Streamlined 50+ daily orders" },
    ],
  },
];

export type Experience = (typeof experiences)[number];

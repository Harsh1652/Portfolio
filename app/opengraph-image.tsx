import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72,
          background: "radial-gradient(900px 500px at 10% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(700px 400px at 100% 100%, rgba(14,165,233,0.22), transparent 60%), #080808",
          color: "#efefef", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a5b4fc" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#34d399" }} />
          Available for projects
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Harsh Gupta</div>
          <div style={{ fontSize: 46, marginTop: 20, color: "#a78bfa", fontWeight: 700 }}>{site.jobTitle}</div>
          <div style={{ fontSize: 28, marginTop: 28, color: "rgba(255,255,255,0.6)", maxWidth: 900, lineHeight: 1.4 }}>
            Multi-agent systems · Production RAG · AI automation · Scalable backends
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 24, color: "rgba(255,255,255,0.75)" }}>
          {["LangGraph", "FastAPI", "Next.js", "GPT-4o", "Pinecone"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "8px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.05)" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}

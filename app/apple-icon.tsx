import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Monogram favicon, generated so there is no binary asset to keep in sync with the brand colours
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
          fontSize: 104, fontWeight: 800, letterSpacing: -4, fontFamily: "sans-serif",
        }}
      >
        HG
      </div>
    ),
    size
  );
}

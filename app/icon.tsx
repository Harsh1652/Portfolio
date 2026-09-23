import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Monogram favicon, generated so there is no binary asset to keep in sync with the brand colours
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
          fontSize: 300, fontWeight: 800, letterSpacing: -12, fontFamily: "sans-serif",
        }}
      >
        HG
      </div>
    ),
    size
  );
}

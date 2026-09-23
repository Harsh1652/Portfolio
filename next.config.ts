import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake these barrel imports so pages ship less JavaScript (helps INP/LCP)
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@react-three/drei"],
  },
};

export default nextConfig;

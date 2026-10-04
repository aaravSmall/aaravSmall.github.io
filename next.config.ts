import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Builds a fully static site into ./out for GitHub Pages.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;

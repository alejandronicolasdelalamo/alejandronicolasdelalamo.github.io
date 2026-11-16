import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera una carpeta `out/` con HTML estático: se puede publicar en GitHub Pages, Netlify o Vercel.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

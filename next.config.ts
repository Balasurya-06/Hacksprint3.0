import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.devfolio.co" },
    ],
  },
  /* ── Make PDFs download directly without browser permission prompt ── */
  async headers() {
    return [
      {
        source: "/pdf/:file*",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
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

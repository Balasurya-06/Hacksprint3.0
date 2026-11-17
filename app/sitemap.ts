import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hacksprint.tech";

/* Route → priority. The pages people search for most rank highest. */
const routes: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/tracks", priority: 0.9, changeFrequency: "weekly" },
  { path: "/timeline", priority: 0.9, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/prizes", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pass", priority: 0.8, changeFrequency: "weekly" },
  { path: "/sponsors", priority: 0.7, changeFrequency: "weekly" },
  { path: "/highlights", priority: 0.7, changeFrequency: "monthly" },
  { path: "/past-events", priority: 0.7, changeFrequency: "monthly" },
  { path: "/crew", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/why-sponsor-us", priority: 0.6, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(path === "" ? { images: [`${siteUrl}/og.png`, `${siteUrl}/3.0.png`] } : {}),
  }));
}

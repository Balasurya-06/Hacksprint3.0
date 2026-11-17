import type { Metadata } from "next";

/* ═══════════════════════════════════════════════════════════════
   SEO helpers — one place for the site URL, the core search phrases
   and per-page metadata (title, description, canonical, social cards).
   Every route sets its OWN canonical URL, so search engines index each
   page separately instead of folding them into the home page.
   ═══════════════════════════════════════════════════════════════ */

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hacksprint.tech";
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "HACKSPRINT 3.0 — India’s biggest national-level student hackathon, Feb 5–6, 2027, KAHE Coimbatore, Tamil Nadu",
};

/* Phrases people actually search for — shared by every page. */
export const coreKeywords = [
  "HackSprint 3.0",
  "HackSprint 2027",
  "hacksprint.tech",
  "national level hackathon 2027",
  "national level hackathon in India",
  "biggest hackathon in India 2027",
  "best hackathon in India 2027",
  "top hackathon in India",
  "hackathon in Tamil Nadu 2027",
  "hackathon in Coimbatore 2027",
  "student hackathon 2027",
  "36 hour hackathon",
];

type PageSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
};

export function pageMetadata({ path, title, description, keywords = [] }: PageSeo): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    keywords: [...keywords, ...coreKeywords],
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | HackSprint 3.0`,
      description,
      url,
      type: "website",
      locale: "en_IN",
      siteName: "HACKSPRINT 3.0 — India’s Biggest Student Hackathon",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | HackSprint 3.0`,
      description,
      images: [ogImage.url],
    },
  };
}

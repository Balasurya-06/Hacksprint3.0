import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/highlights",
  title: "Highlights – Moments from India’s Biggest Student Hackathon",
  description:
    "Photos and highlights from HackSprint — 36 hours of building, mentoring and demos at Karpagam Academy of Higher Education, Coimbatore, Tamil Nadu.",
  keywords: [
    "hackathon highlights",
    "hackathon photos",
    "HackSprint gallery",
  ],
});

export default function HighlightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

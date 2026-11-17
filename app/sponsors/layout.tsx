import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/sponsors",
  title: "Sponsors & Partners – Devfolio, Adaption, Eventopia",
  description:
    "Meet the partners powering HackSprint 3.0 — Devfolio (Gold Sponsor), Adaption (Official AI Partner) and Eventopia (Media Partner) — at India’s biggest student hackathon 2027.",
  keywords: [
    "hackathon sponsors",
    "Devfolio hackathon",
    "hackathon partners India",
  ],
});

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

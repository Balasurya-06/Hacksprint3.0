import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/timeline",
  title: "Timeline – Registration Nov 8 to Dec 28, 2026 · Finale Feb 5–6, 2027",
  description:
    "HackSprint 3.0 timeline: registration opens Nov 8, 2026, ideas due Dec 28, 2026, finalists announced Jan 4, 2027 and the 36-hour grand finale on Feb 5–6, 2027 in Coimbatore.",
  keywords: [
    "hackathon dates 2027",
    "hackathon registration 2026",
    "hackathon deadline",
    "upcoming hackathons 2027",
    "February 2027 hackathon",
  ],
});

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}

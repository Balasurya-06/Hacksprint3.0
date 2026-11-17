import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About HackSprint 3.0 – National Level Hackathon at KAHE, Coimbatore",
  description:
    "HackSprint 3.0 is a 36-hour national-level student hackathon by KAHE’s Department of CSE and the Metaverse Students Association in Coimbatore, Tamil Nadu — open to college students across India.",
  keywords: [
    "about HackSprint",
    "KAHE hackathon",
    "Karpagam Academy of Higher Education hackathon",
    "Metaverse Students Association",
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

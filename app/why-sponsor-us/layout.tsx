import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/why-sponsor-us",
  title: "Why Sponsor – Reach India’s Top Student Builders",
  description:
    "Sponsor HackSprint 3.0 and reach thousands of student developers from across India at a 36-hour national-level hackathon in Coimbatore, Tamil Nadu. Download the sponsorship deck.",
  keywords: [
    "sponsor a hackathon",
    "hackathon sponsorship India",
    "student developer outreach",
    "tech hiring hackathon",
  ],
});

export default function WhySponsorUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

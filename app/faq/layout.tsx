import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/faq",
  title: "FAQ – Eligibility, Team Size, Fees, Venue & Prizes",
  description:
    "Answers about HackSprint 3.0: who can participate, team size (3–5), free registration, the Feb 5–6, 2027 finale at KAHE Coimbatore, food and stay, judging and prizes.",
  keywords: [
    "hackathon FAQ",
    "hackathon eligibility",
    "free hackathon India",
    "hackathon for college students",
    "hackathon team size",
  ],
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}

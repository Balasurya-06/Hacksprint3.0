import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/prizes",
  title: "Prizes & Rewards – HackSprint 3.0",
  description:
    "Prizes, rewards and recognition at HackSprint 3.0 — India’s biggest national-level student hackathon 2027 at KAHE, Coimbatore. Prize details announced soon.",
  keywords: [
    "hackathon prizes",
    "hackathon cash prize India",
    "hackathon rewards 2027",
  ],
});

export default function PrizesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

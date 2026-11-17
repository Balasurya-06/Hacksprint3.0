import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/tracks",
  title: "Hackathon Tracks 2027 – AgroTech, EduTech, MedTech, WildVision & Open Innovation",
  description:
    "Explore the 5 HackSprint 3.0 tracks — AgroTech, EduTech, MedTech, WildVision Tech and Open Innovation (AI agents, drones, Web3, FinTech). Build real solutions at India’s biggest student hackathon 2027.",
  keywords: [
    "hackathon tracks 2027",
    "hackathon themes",
    "AgroTech hackathon",
    "EduTech hackathon",
    "MedTech hackathon",
    "AI hackathon India",
    "open innovation hackathon",
  ],
});

export default function TracksLayout({ children }: { children: React.ReactNode }) {
  return children;
}

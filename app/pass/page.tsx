import PassSection from "@/components/PassSection";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/pass",
  title: "Hacker Pass – Create & Share Your Participant Pass",
  description:
    "Make your HackSprint 3.0 participant pass with your name, team and photo, then share it on LinkedIn or Instagram. India’s biggest national-level student hackathon 2027, KAHE Coimbatore.",
  keywords: ["hackathon participant pass", "hacker pass", "HackSprint pass", "hackathon badge"],
});

export default function PassPage() {
  return (
    <div id="pass" className="page-top">
      <PassSection />
    </div>
  );
}

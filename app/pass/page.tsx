import type { Metadata } from "next";
import PassSection from "@/components/PassSection";

export const metadata: Metadata = {
  title: "Round 1 Participant Pass",
  description:
    "Took part in Round 1 of HACKSPRINT 3.0? Create your participant pass with your name, team and photo, then download it and share it on Instagram or LinkedIn.",
  alternates: { canonical: "/pass" },
};

export default function PassPage() {
  return (
    <div id="pass" className="page-top">
      <PassSection />
    </div>
  );
}

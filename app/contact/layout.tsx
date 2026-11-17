import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact – HackSprint 3.0 Organizers, KAHE Coimbatore",
  description:
    "Contact the HackSprint 3.0 team: call 95970 75831 / 73732 50006, email hacksprint.official@gmail.com, or visit Karpagam Academy of Higher Education, Eachanari, Coimbatore 641021.",
  keywords: [
    "HackSprint contact",
    "hackathon Coimbatore contact",
    "KAHE address",
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

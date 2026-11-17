import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/crew",
  title: "Meet the Crew – Organizers of HackSprint 3.0",
  description:
    "The people behind HackSprint 3.0: conveners Dr. R. Santhosh and Ramya, lead organizer Bala Surya S, and organizers Harini and Aravind — Department of CSE, KAHE, Coimbatore.",
  keywords: [
    "HackSprint organizers",
    "Bala Surya S",
    "HackSprint team",
    "KAHE CSE",
  ],
});

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return children;
}

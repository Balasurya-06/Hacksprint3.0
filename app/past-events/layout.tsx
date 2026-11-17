import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/past-events",
  title: "Past Edition – HackSprint 2.0 Legacy & Results",
  description:
    "HackSprint’s legacy: HackSprint 2.0 drew 4,200+ registrations, 80+ finalist teams and ₹1L in prizes. See how Coimbatore’s national-level student hackathon has grown.",
  keywords: [
    "HackSprint 2.0",
    "past hackathons",
    "hackathon results",
    "Coimbatore hackathon history",
  ],
});

export default function PastEventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

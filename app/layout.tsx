import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EntryLoader from "@/components/EntryLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "HACKSPRINT 3.0 — India’s Largest Student Hackathon 2027",
    template: "%s | HACKSPRINT 3.0",
  },
  description:
    "HACKSPRINT 3.0 is India’s largest student hackathon, organized by the Department of Computer Science & Engineering, KAHE, in association with the Metaverse Students Association.",
  keywords: [
    "HackSprint 3.0",
    "student hackathon",
    "India hackathon 2027",
    "KAHE",
    "Karpagam Academy of Higher Education",
    "Metaverse Students Association",
    "coding competition",
    "technology event",
  ],
  authors: [{ name: "HACKSPRINT 3.0 Organizing Team" }],
  creator: "HACKSPRINT 3.0 Organizing Team",
  publisher: "Karpagam Academy of Higher Education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HACKSPRINT 3.0 — India’s Largest Student Hackathon 2027",
    description:
      "Build, compete, and innovate at HACKSPRINT 3.0, organized by KAHE’s Department of Computer Science & Engineering with the Metaverse Students Association.",
    type: "website",
    locale: "en_IN",
    siteName: "HACKSPRINT 3.0",
    images: [
      {
        url: "/logo.png",
        width: 1280,
        height: 1280,
        alt: "HACKSPRINT 3.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HACKSPRINT 3.0 — India’s Largest Student Hackathon 2027",
    description:
      "Join India’s largest student hackathon, organized by KAHE and the Metaverse Students Association.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <EntryLoader />
        <Navbar />
        <main>{children}</main>
        <section className="venue-map" aria-labelledby="venue-map-title">
          <div className="venue-map-marquee" aria-hidden="true">
            <div className="venue-map-marquee-track">
              {[0, 1].map((copy) => (
                <span key={copy}>
                  REGISTER NOW <b>|</b> LIMITED SEATS <b>|</b> JOIN THE REVOLUTION <b>|</b> HACKSPRINT 3.0 <b>|</b>
                </span>
              ))}
            </div>
          </div>
          <div className="venue-map-frame">
            <div className="venue-map-card">
              <p className="venue-map-eyebrow">HackSprint 3.0 venue</p>
              <h2 id="venue-map-title">Karpagam Academy of Higher Education</h2>
              <p>Salem–Kochi Highway, Eachanari, Coimbatore, Tamil Nadu 641021</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Karpagam+Academy+of+Higher+Education%2C+Coimbatore"
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps ↗
              </a>
            </div>
            <iframe
              title="Karpagam Academy of Higher Education location map"
              src="https://www.google.com/maps?q=Karpagam+Academy+of+Higher+Education%2C+Coimbatore&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}

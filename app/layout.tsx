import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hacksprint3.devfolio.co";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HACKSPRINT 3.0 | India’s Biggest & Largest Student Hackathon 2027",
    template: "%s | HACKSPRINT 3.0",
  },
  description:
    "HACKSPRINT 3.0 is India’s biggest and largest student hackathon 2027, organized by KAHE’s Department of Computer Science & Engineering with the Metaverse Students Association in Coimbatore, Tamil Nadu.",
  keywords: [
    "HackSprint 3.0",
    "HACKSPRINT 3.0 2027",
    "India's biggest student hackathon",
    "India's largest student hackathon",
    "biggest hackathon in India",
    "largest hackathon in India",
    "student hackathon",
    "hackathon 2027 India",
    "student coding competition India",
    "national level hackathon",
    "36 hour hackathon",
    "hackathon Coimbatore",
    "KAHE",
    "Karpagam Academy of Higher Education",
    "Metaverse Students Association",
    "coding competition",
    "technology event",
  ],
  authors: [{ name: "HACKSPRINT 3.0 Organizing Team" }],
  creator: "HACKSPRINT 3.0 Organizing Team",
  publisher: "Karpagam Academy of Higher Education",
  category: "Technology",
  classification: "Student Hackathon",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HACKSPRINT 3.0 | India’s Biggest & Largest Student Hackathon 2027",
    description:
      "Build, compete, and innovate at India’s biggest and largest student hackathon 2027. Join HACKSPRINT 3.0 in Coimbatore, organized by KAHE and the Metaverse Students Association.",
    type: "website",
    locale: "en_IN",
    siteName: "HACKSPRINT 3.0 — India’s Biggest Student Hackathon",
    images: [
      {
        url: "/3.0.png",
        width: 404,
        height: 161,
        alt: "HACKSPRINT 3.0",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HACKSPRINT 3.0 | India’s Biggest Student Hackathon 2027",
    description:
      "Join India’s biggest and largest student hackathon 2027 in Coimbatore, Tamil Nadu.",
    images: ["/3.0.png"],
  },
  icons: {
    icon: "/3.0.png",
    shortcut: "/3.0.png",
    apple: "/3.0.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "HACKSPRINT 3.0",
        url: siteUrl,
        logo: `${siteUrl}/3.0.png`,
        email: "mailto:hacksprint.official@gmail.com",
        sameAs: [
          "https://www.instagram.com/hacksprint3.0?vrfl=eThtZjllMGpjM25r",
          "https://www.linkedin.com/showcase/hacksprint3-0/",
        ],
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "Karpagam Academy of Higher Education",
        },
      },
      {
        "@type": "Event",
        "@id": `${siteUrl}/#hacksprint-3`,
        name: "HACKSPRINT 3.0 — India’s Biggest & Largest Student Hackathon 2027",
        description:
          "A national-level student hackathon organized by KAHE’s Department of Computer Science & Engineering with the Metaverse Students Association.",
        url: siteUrl,
        image: `${siteUrl}/3.0.png`,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        startDate: "2026-11-08T09:00:00+05:30",
        endDate: "2026-12-28T18:00:00+05:30",
        location: {
          "@type": "Place",
          name: "Karpagam Academy of Higher Education",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Salem–Kochi Highway, Eachanari",
            addressLocality: "Coimbatore",
            addressRegion: "Tamil Nadu",
            postalCode: "641021",
            addressCountry: "IN",
          },
        },
        organizer: { "@id": `${siteUrl}/#organization` },
        offers: {
          "@type": "Offer",
          url: "https://hacksprint3.devfolio.co",
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "INR",
        },
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script
          src="https://apply.devfolio.co/v2/sdk.js"
          strategy="afterInteractive"
        />
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

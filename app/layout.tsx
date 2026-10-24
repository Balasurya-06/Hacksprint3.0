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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hacksprint3.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  /* ── Primary ── */
  title: {
    default: "HackSprint 3.0 — India's Biggest Student Hackathon 2026 | Coimbatore",
    template: "%s | HackSprint 3.0",
  },
  description:
    "HackSprint 3.0 is India's biggest and largest student hackathon — 500+ builders, 36 hours, ₹21 Lakh+ in prizes. Organized by KAHE Dept. of CSE & Metaverse Students Association, Coimbatore 2026. Register now for Open Innovation, AgroTech, EduTech, WildVision & MedTech tracks.",

  keywords: [
    // Primary intent
    "India's biggest hackathon",
    "India's largest student hackathon",
    "largest hackathon India 2026",
    "biggest hackathon India 2026",
    "HackSprint 3.0",
    "HackSprint3",
    "hacksprint 3",
    // Event specifics
    "student hackathon India",
    "hackathon Coimbatore 2026",
    "hackathon Tamil Nadu 2026",
    "KAHE hackathon",
    "Karpagam hackathon",
    "Metaverse Students Association hackathon",
    "36 hour hackathon India",
    "hackathon 21 lakh prize",
    // Tracks
    "AgroTech hackathon",
    "EduTech hackathon",
    "MedTech hackathon",
    "WildVision hackathon",
    "Open Innovation hackathon",
    // General SEO
    "student coding competition India 2026",
    "hackathon registration 2026",
    "hackathon November 2026",
    "engineering hackathon India",
    "tech hackathon college India",
    "best hackathon India 2026",
    "top hackathon India",
    "national hackathon India",
    "hackathon with prizes India",
    "devfolio hackathon 2026",
    "KAHE Coimbatore",
    "Karpagam Academy of Higher Education",
    "CSE hackathon",
  ],

  authors: [
    { name: "HackSprint 3.0 Organizing Team" },
    { name: "Dept. of CSE, KAHE Coimbatore" },
  ],
  creator:   "Metaverse Students Association, KAHE",
  publisher: "Karpagam Academy of Higher Education",

  /* ── Canonical ── */
  alternates: {
    canonical: "/",
  },

  /* ── Robots ── */
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:              true,
      follow:             true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    title:       "HackSprint 3.0 — India's Biggest Student Hackathon 2026",
    description:
      "500+ builders. 36 hours. ₹21 Lakh+ prizes. Join India's biggest student hackathon at KAHE, Coimbatore — Nov 2026. Tracks: AgroTech, EduTech, MedTech, WildVision & Open Innovation.",
    url:         SITE_URL,
    siteName:    "HackSprint 3.0",
    type:        "website",
    locale:      "en_IN",
    images: [
      {
        url:    "/hacksprint.png",
        width:  1200,
        height: 630,
        alt:    "HackSprint 3.0 — India's Biggest Student Hackathon",
      },
    ],
  },

  /* ── Twitter / X ── */
  twitter: {
    card:        "summary_large_image",
    site:        "@hacksprint3",
    creator:     "@hacksprint3",
    title:       "HackSprint 3.0 — India's Biggest Student Hackathon 2026",
    description:
      "500+ builders. 36 hours. ₹21 Lakh+ prizes. India's largest student hackathon — KAHE Coimbatore, Nov 2026.",
    images:      ["/hacksprint.png"],
  },

  /* ── Icons ── */
  icons: {
    icon:             "/hacksprint.png",
    apple:            "/hacksprint.png",
    shortcut:         "/hacksprint.png",
  },

  /* ── Verification (add your tokens when ready) ── */
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },

  /* ── Category ── */
  category: "Technology, Education, Hackathon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@600;700;800;900&family=Oswald:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "HackSprint 3.0",
              "alternateName": ["HackSprint3", "HackSprint 3", "India's Biggest Hackathon 2026"],
              "description":
                "HackSprint 3.0 is India's biggest and largest student hackathon with 500+ builders competing across 36 hours for ₹21 Lakh+ in prizes. Organized by KAHE Dept. of CSE & Metaverse Students Association, Coimbatore.",
              "startDate": "2026-11-08",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Karpagam Academy of Higher Education",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Pollachi Main Road, Eachanari",
                  "addressLocality": "Coimbatore",
                  "addressRegion": "Tamil Nadu",
                  "postalCode": "641021",
                  "addressCountry": "IN",
                },
              },
              "organizer": {
                "@type": "Organization",
                "name": "Metaverse Students Association, KAHE",
                "url": SITE_URL,
              },
              "offers": {
                "@type": "Offer",
                "name": "HackSprint 3.0 Registration",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-11-08",
                "url": SITE_URL,
              },
              "image": `${SITE_URL}/hacksprint.png`,
              "url": SITE_URL,
              "keywords": "hackathon, India, student, coding, AgroTech, EduTech, MedTech, WildVision, Open Innovation",
              "maximumAttendeeCapacity": 500,
              "typicalAgeRange": "18-25",
            }),
          }}
        />

        {/* BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home",     "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "About",    "item": `${SITE_URL}/about` },
                { "@type": "ListItem", "position": 3, "name": "Timeline", "item": `${SITE_URL}/timeline` },
                { "@type": "ListItem", "position": 4, "name": "Sponsors", "item": `${SITE_URL}/sponsors` },
                { "@type": "ListItem", "position": 5, "name": "Crew",     "item": `${SITE_URL}/crew` },
              ],
            }),
          }}
        />
      </head>
      <body>
        <EntryLoader />
        <Navbar />
        <main>{children}</main>
        <section id="venue" className="venue-map" aria-labelledby="venue-map-title">
          <div className="venue-map-marquee" aria-hidden="true">
            <div className="venue-map-marquee-track">
              {[0, 1].map((copy) => (
                <span key={copy}>
                  REGISTRATION OPENS NOV 8 <b>★</b> 500+ BUILDERS <b>★</b> 36H NON-STOP SPRINT <b>★</b> COIMBATORE ARENA <b>★</b> HACKSPRINT 3.0 <b>★</b>
                </span>
              ))}
            </div>
          </div>
          <div className="venue-map-frame">
            <div className="venue-map-card">
              <p className="venue-map-eyebrow">THE SHOWDOWN ARENA</p>
              <h2 id="venue-map-title">Karpagam Academy of Higher Education</h2>
              <p>Pollachi Main Road, Eachanari, Coimbatore, Tamil Nadu 641021</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Karpagam+Academy+of+Higher+Education%2C+Coimbatore"
                target="_blank"
                rel="noreferrer"
              >
                OPEN IN MAPS &gt;
              </a>
            </div>
            <iframe
              title="Karpagam Academy of Higher Education location map"
              src="https://www.google.com/maps?q=Karpagam+Academy+of+Higher+Education%2C+Coimbatore&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                filter: "invert(92%) hue-rotate(180deg) contrast(120%) brightness(85%)",
              }}
            />
          </div>
        </section>
        <Footer />
      </body>
    </html>
  );
}

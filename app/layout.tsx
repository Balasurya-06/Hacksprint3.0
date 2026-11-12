import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

import { faqs } from "@/data/faq";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hacksprint.tech";
const siteTitle = "HACKSPRINT 3.0 | India’s Biggest Student Hackathon 2027";
const siteDescription =
  "HACKSPRINT 3.0 is India’s biggest national-level student hackathon — 36 hours, 5 tracks, free registration till Dec 28, 2026. Grand finale Feb 5–6, 2027 at KAHE, Coimbatore.";
const registerUrl = "https://hacksprint-3.devfolio.co/overview";

/* Developer & organizer credit — lives only in SEO metadata / structured data, not in the visible UI. */
const developer = {
  name: "Balasurya Suresh Kumar",
  alternateName: "Balasurya",
  url: "https://balasurya02.vercel.app",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | HACKSPRINT 3.0 — India’s Biggest Student Hackathon",
  },
  description: siteDescription,
  applicationName: "HACKSPRINT 3.0",
  keywords: [
    "HackSprint 3.0",
    "HACKSPRINT 3.0 2027",
    "HackSprint",
    "Hack Sprint",
    "hacksprint.tech",
    "India's biggest student hackathon",
    "India's largest student hackathon",
    "biggest hackathon in India",
    "largest hackathon in India",
    "top hackathon in India",
    "best hackathon in India 2027",
    "top student hackathon in India",
    "national level hackathon",
    "national level hackathon 2027 for students",
    "national hackathon 2027",
    "hackathon 2027 India",
    "hackathon for college students",
    "inter college hackathon India",
    "free hackathon India",
    "student hackathon",
    "student coding competition India",
    "AI hackathon India",
    "36 hour hackathon",
    "36 hour hackathon India",
    "February 2027 hackathon",
    "hackathon Coimbatore",
    "hackathon Tamil Nadu",
    "biggest hackathon in Tamil Nadu",
    "college hackathon Coimbatore",
    "offline hackathon India",
    "hackathon registration India",
    "Devfolio hackathon India",
    "AgroTech hackathon",
    "EduTech hackathon",
    "MedTech hackathon",
    "WildVision Tech hackathon",
    "Open Innovation hackathon",
    "KAHE hackathon",
    "Karpagam Academy of Higher Education",
    "Metaverse Students Association",
    "Balasurya",
    "Balasurya Suresh Kumar",
  ],
  authors: [
    { name: developer.name, url: developer.url },
    { name: "HACKSPRINT 3.0 Organizing Team", url: siteUrl },
  ],
  creator: developer.name,
  publisher: "Karpagam Academy of Higher Education",
  category: "Technology",
  classification: "National-Level Student Hackathon",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  /* Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the Search Console token to verify the domain. */
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: "website",
    locale: "en_IN",
    siteName: "HACKSPRINT 3.0 — India’s Biggest Student Hackathon",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "HACKSPRINT 3.0 — India’s biggest national-level student hackathon, Feb 5–6, 2027, KAHE Coimbatore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
    creator: developer.name,
  },
  icons: {
    icon: "/3.0.png",
    shortcut: "/3.0.png",
    apple: "/3.0.png",
  },
  other: {
    designer: developer.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const developerRef = { "@id": `${siteUrl}/#developer` };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "HACKSPRINT 3.0",
        alternateName: ["HackSprint 3.0", "India’s Biggest Student Hackathon", "hacksprint.tech"],
        url: siteUrl,
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        creator: developerRef,
        author: developerRef,
        inLanguage: "en-IN",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#developer`,
        name: developer.name,
        alternateName: developer.alternateName,
        url: developer.url,
        sameAs: [developer.url],
        jobTitle: "Developer & Organizer, HACKSPRINT 3.0",
        worksFor: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "HACKSPRINT 3.0",
        url: siteUrl,
        logo: `${siteUrl}/3.0.png`,
        email: "mailto:hacksprint.official@gmail.com",
        founder: developerRef,
        sameAs: [
          "https://www.instagram.com/hacksprint3.0",
          "https://www.linkedin.com/showcase/hacksprint3-0/",
          registerUrl,
        ],
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "Karpagam Academy of Higher Education",
        },
      },
      {
        "@type": "Event",
        "@id": `${siteUrl}/#hacksprint-3`,
        name: "HACKSPRINT 3.0 — India’s Biggest & Largest Student Hackathon",
        description:
          "India’s biggest and largest national-level student hackathon: a 36-hour coding and innovation competition across AgroTech, EduTech, MedTech, WildVision Tech and Open Innovation, organized by KAHE’s Department of Computer Science & Engineering with the Metaverse Students Association.",
        url: siteUrl,
        image: [`${siteUrl}/og.png`, `${siteUrl}/3.0.png`],
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        startDate: "2027-02-05T09:00:00+05:30",
        endDate: "2027-02-06T20:00:00+05:30",
        inLanguage: "en-IN",
        isAccessibleForFree: true,
        audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "College students across India" },
        keywords:
          "India's biggest hackathon, India's largest student hackathon, top hackathon in India, national level hackathon 2027, student hackathon 2027, 36-hour hackathon, Coimbatore hackathon, Tamil Nadu hackathon",
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
        organizer: [{ "@id": `${siteUrl}/#organization` }, developerRef],
        sponsor: [
          { "@type": "Organization", name: "Devfolio", url: "https://devfolio.co" },
          { "@type": "Organization", name: "Adaption", url: "https://adaptionlabs.ai" },
          { "@type": "Organization", name: "Eventopia", url: "https://eventopia.in" },
        ],
        offers: {
          "@type": "Offer",
          name: "Free registration",
          url: registerUrl,
          availability: "https://schema.org/InStock",
          price: "0",
          priceCurrency: "INR",
          validFrom: "2026-11-08T09:00:00+05:30",
          validThrough: "2026-12-28T23:59:59+05:30",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Fixed site-wide backdrop: the content scrolls over it on every page. */}
        <div className="site-bg" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main className="site-main">{children}</main>
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
        <ChatBot />
      </body>
    </html>
  );
}

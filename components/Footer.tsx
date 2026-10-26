import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="contelas-footer">
      <div className="contelas-footer-inner">
        <div className="contelas-footer-top">
          {/* Brand & Socials */}
          <div className="contelas-footer-brand">
            <Link
              href="/#home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
              }}
            >
              <Image
                src="/logo.png"
                alt="HackSprint"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
              <span
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                }}
              >
                HackSprint <span style={{                 color: "var(--soft-red)" }}>3.0</span>
              </span>
            </Link>

            <p
              style={{
                color: "#777777",
                fontSize: "0.85rem",
                marginTop: "12px",
                lineHeight: 1.55,
              }}
            >
              Unlock your hackathon potential. Build, collaborate, and innovate with India&apos;s largest student hackathon.
            </p>

            {/* Social icon buttons in white rounded squares */}
            <div className="contelas-footer-socials">
              <a
                href="https://www.instagram.com/hacksprint3.0?vrfl=eThtZjllMGpjM25r"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="contelas-social-btn"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Community"
                className="contelas-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/showcase/hacksprint3-0/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="contelas-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              <a
                href="mailto:hacksprint.official@gmail.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Email HackSprint"
                className="contelas-social-btn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 3 Nav Columns */}
          <div className="contelas-footer-nav">
            <div className="contelas-nav-col">
              <Link href="/#home" className="contelas-nav-link">Home</Link>
              <Link href="/about" className="contelas-nav-link">About KAHE</Link>
              <Link href="/highlights" className="contelas-nav-link">Highlights</Link>
              <Link href="/crew" className="contelas-nav-link">Meet the Crew</Link>
              <Link href="/past-events" className="contelas-nav-link">Past Events</Link>
            </div>

            <div className="contelas-nav-col">
              <Link href="/highlights" className="contelas-nav-link">Challenge Tracks</Link>
              <Link href="/why-sponsor-us" className="contelas-nav-link">Why Sponsor Us</Link>
              <Link href="/#registration" className="contelas-nav-link">Registration</Link>
              <a href="/pdf/HS3_Brochure.pdf" download className="contelas-nav-link">Brochure PDF</a>
              <Link href="/#venue-map-title" className="contelas-nav-link">Venue Map</Link>
            </div>

            <div className="contelas-nav-col">
              <a href="https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K" target="_blank" rel="noreferrer" className="contelas-nav-link">WhatsApp Group</a>
              <a href="mailto:hacksprint.official@gmail.com" className="contelas-nav-link">Contact Support</a>
              <a href="tel:+919597075831" className="contelas-nav-link">Bala Surya: 95970 75831</a>
              <a href="https://kahedu.edu.in" target="_blank" rel="noreferrer" className="contelas-nav-link">KAHE CSE Dept</a>
              <Link href="/about" className="contelas-nav-link">Metaverse Club</Link>
            </div>
          </div>
        </div>

        {/* Massive oversized brand title resting flush at bottom */}
        <div className="contelas-footer-bottom">
          <h2 className="contelas-giant-text">
            HackSprint
          </h2>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.25%20PM.jpeg", "Students participating in a HackSprint event", "gallery-photo-one"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM%20(1).jpeg", "Students collaborating during HackSprint", "gallery-photo-two"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.26%20PM.jpeg", "HackSprint event activity", "gallery-photo-three"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM%20(1).jpeg", "Students gathered at a HackSprint event", "gallery-photo-four"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.27%20PM.jpeg", "Participants working in a computer laboratory", "gallery-photo-five"],
  ["/2.0/WhatsApp%20Image%202026-10-14%20at%206.45.28%20PM.jpeg", "HackSprint workshop participants", "gallery-photo-six"],
];

export default function HighlightsPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#070606",
        color: "#f5f1ea",
        padding: "80px 24px 100px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <header style={{ margin: "0 auto 48px", textAlign: "center", maxWidth: "720px" }}>
          <p className="rdr-kicker" style={{ marginBottom: "12px" }}>
            ★ THE VISUAL ARCHIVES · SEASON 2.0 ★
          </p>
          <h1
            style={{
              color: "#f5f1ea",
              fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            ARENA <span style={{ color: "#e51b24" }}>HIGHLIGHTS</span>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "#e51b24",
              margin: "18px auto 20px",
            }}
          >
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
            <span style={{ fontSize: "1rem" }}>★</span>
            <div style={{ width: "45px", height: "1.5px", background: "#e51b24" }} />
          </div>

          <p style={{ color: "#9e978d", fontSize: "0.95rem", lineHeight: 1.65, margin: 0 }}>
            A visual chronicle of the intense code battles, mentor huddles, hardware prototyping, and triumphant moments
            from HackSprint 2.0.
          </p>
        </header>

        <div
          className="highlights-gallery"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {galleryImages.map(([src, alt]) => (
            <div
              key={src}
              style={{
                position: "relative",
                height: "240px",
                overflow: "hidden",
                border: "1px solid #381a1e",
                background: "#0f0a0c",
                boxShadow: "0 10px 28px rgba(0, 0, 0, 0.7)",
                transition: "border-color 0.25s, transform 0.25s",
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(7, 6, 6, 0.85) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/#home" className="rdr-btn-ghost" style={{ fontSize: "0.8rem" }}>
            <span>← RETURN TO ARENA</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

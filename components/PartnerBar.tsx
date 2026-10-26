"use client";

import Image from "next/image";

/* ──────────────────────────────────────────────
   Partner / organizer logo bar — sits just below
   the floating navbar, fixed to the top-right of
   the viewport (matching the reference image).
   ────────────────────────────────────────────── */

const leftGroup = [
  { src: "/Sponsor/kahe.png",        alt: "Karpagam Academy of Higher Education", w: 110, h: 40 },
  { src: "/Sponsor/meta.png",        alt: "Metaverse Students Association",        w:  44, h: 40 },
];

const rightGroup = [
  { src: "/Sponsor/incubation.png",  alt: "Karpagam Innovation & Incubation Council", w: 110, h: 40 },
  { src: "/Sponsor/iic.png",         alt: "Institution's Innovation Council",          w:  90, h: 40 },
  { src: "/Sponsor/dst.png",         alt: "Dept. of Science & Technology",             w:  80, h: 40 },
];

function LogoPill({ logos }: { logos: typeof leftGroup }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(10,7,10,0.82)",
        backdropFilter: "blur(14px)",
        border: "1px solid #1e1218",
        borderRadius: "10px",
        padding: "7px 14px",
      }}
    >
      {logos.map((logo, i) => (
        <div
          key={logo.alt}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
          }}
        >
          {i > 0 && (
            <div
              aria-hidden="true"
              style={{
                width: "1px",
                height: "28px",
                background: "#281418",
                marginRight: "10px",
              }}
            />
          )}
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.w}
            height={logo.h}
            style={{
              objectFit: "contain",
              maxHeight: `${logo.h}px`,
              maxWidth: `${logo.w}px`,
              opacity: 0.9,
              filter: "brightness(1.05)",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function PartnerBar() {
  return (
    <div
      className="desktop-partner-bar"
      aria-label="Organising partners and recognitions"
      style={{
        position: "absolute",
        top: "18px",
        left: "calc(50% + 410px)",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        pointerEvents: "none", // visual only, doesn't block clicks
        transform: "scale(0.72)",
        transformOrigin: "left top",
      }}
    >
      <LogoPill logos={leftGroup} />
      <LogoPill logos={rightGroup} />
    </div>
  );
}

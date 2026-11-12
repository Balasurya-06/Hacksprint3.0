"use client";

import Image from "next/image";

/* ──────────────────────────────────────────────
   Partner / organizer logo strip — anchored to
   the bottom of the hero section.
   ────────────────────────────────────────────── */

const logos = [
  { src: "/Sponsor/kahe.png",        alt: "Karpagam Academy of Higher Education",     w: 110, h: 40 },
  { src: "/Sponsor/meta.png",        alt: "Metaverse Students Association",           w:  44, h: 40 },
  { src: "/Sponsor/incubation.png",  alt: "Karpagam Innovation & Incubation Council", w: 110, h: 40 },
  { src: "/Sponsor/iic.png",         alt: "Institution's Innovation Council",         w:  90, h: 40 },
  { src: "/Sponsor/dst.png",         alt: "Dept. of Science & Technology",            w:  80, h: 40 },
];

export default function PartnerBar() {
  return (
    <div className="partner-strip" aria-label="Organising partners and recognitions">
      <div className="partner-strip-inner">
        {logos.map((logo) => (
          <span key={logo.alt} className="partner-logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              style={{ objectFit: "contain", height: "28px", width: "auto" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

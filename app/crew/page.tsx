"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  positionCode: string;
  detail: string;
  tagRole: string;
  tagYear: string;
  bio: string;
  image: string;
  contact?: {
    phone?: string;
    whatsapp?: string;
    linkedin?: string;
  };
}

const conveners = [
  {
    kicker: "CONVENER & HEAD OF DEPARTMENT",
    name: "Dr. R. Santhosh",
    initials: "RS",
    subtitle: "Head of Department · Computer Science and Engineering, KAHE",
  },
  {
    kicker: "FACULTY CONVENER",
    name: "Ramya",
    initials: "R",
    subtitle: "Assistant Professor · Department of Computer Science and Engineering, KAHE",
  },
];

const startingFive: TeamMember[] = [
  {
    id: "deepa",
    number: "04",
    name: "DEEPA",
    role: "Organizer · Operations & Logistics",
    positionCode: "04",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Spearheading operations, track scheduling, on-ground execution, and seamless participant engagement across all 36 hours.",
    image: "/deepa.jpeg",
  },
  {
    id: "kavinya",
    number: "02",
    name: "KAVINYA",
    role: "Organizer · Outreach & Partnerships",
    positionCode: "02",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Directing attendee outreach, judge and mentor relations, community partnerships, and mainstage coordination.",
    image: "/kavinya.jpeg",
  },
  {
    id: "surya",
    number: "01",
    name: "BALA SURYA S",
    role: "Lead Organizer · HackSprint 2.0 & 3.0",
    positionCode: "01",
    detail: "Final Year · Computer Science and Engineering",
    tagRole: "LEAD ORGANIZER (C)",
    tagYear: "FINAL YEAR · CSE",
    bio: "Spearheading overarching vision, platform architecture, ecosystem sponsorships, and builder experience for HackSprint.",
    image: "/surya.png",
    contact: {
      phone: "9597075831",
      whatsapp: "9597075831",
      linkedin: "https://www.linkedin.com/in/balasurya06/",
    },
  },
  {
    id: "harini",
    number: "03",
    name: "HARINI",
    role: "Organizer · Admin & Participant Hospitality",
    positionCode: "03",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Coordinating event administration, participant hospitality, schedule management, and stage operations.",
    image: "/harini.jpeg",
  },
  {
    id: "aravind",
    number: "05",
    name: "ARAVIND",
    role: "Organizer · Technical Infrastructure",
    positionCode: "05",
    detail: "Third Year · Computer Science and Engineering",
    tagRole: "ORGANIZER",
    tagYear: "THIRD YEAR · CSE",
    bio: "Managing technical operations, hackathon cloud infrastructure, platform workflows, and track logistics.",
    image: "/aravind.jpeg",
  },
];

export default function CrewPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="hs-section hs-section--alt crew-sec">
      <div className="hs-container">
        {/* ── HEADER ── */}
        <header className="crew-title hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">The people behind the sprint</p>
          <h2 className="hs-title hs-title--xl">
            Meet the <span className="hs-accent">Crew</span>
          </h2>
        </header>

        {/* ── CONVENERS ── */}
        <section aria-labelledby="conveners-title" className="crew-block">
          <p id="conveners-title" className="crew-block-label">Conveners</p>
          <div className="convener-row">
            {conveners.map((convener) => (
              <article key={convener.name} className="convener hs-reveal">
                <span className="convener-mono" aria-hidden="true">
                  {convener.initials}
                </span>
                <div className="convener-info">
                  <span className="convener-role">{convener.kicker}</span>
                  <h3>{convener.name}</h3>
                  <p>{convener.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── ORGANIZERS ── */}
        <section id="starting-five" aria-label="Organizers" className="crew-block">
          <p className="crew-block-label">Organizers</p>

          <div className="starting-five-grid">
            {startingFive.map((member, index) => {
              const isCaptain = member.id === "surya";
              const offset = index === 0 || index === 4 ? 28 : index === 2 ? 12 : 0;
              const height = index === 0 || index === 4 ? 365 : index === 2 ? 430 : 395;

              return (
                <div key={member.id} className="s5-col" style={{ ["--s5-offset" as string]: `${offset}px` }}>
                  <div
                    onClick={() => setSelectedMember(member)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View profile of ${member.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedMember(member);
                    }}
                    className={`s5-card ${isCaptain ? "is-captain" : ""}`}
                    style={{ ["--s5-height" as string]: `${height}px` }}
                  >
                    <div className="s5-code" aria-hidden="true">
                      {member.positionCode}
                    </div>
                    <div className="s5-photo">
                      <Image
                        src={member.image}
                        alt={`${member.name} - HackSprint 3.0 Starting Five`}
                        fill
                        sizes="(max-width: 900px) 50vw, 20vw"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                        priority={isCaptain}
                      />
                    </div>
                    <div className="s5-wash" aria-hidden="true" />
                    {isCaptain && <div className="s5-lead">LEAD</div>}
                    <span className="s5-view" aria-hidden="true">↗</span>
                  </div>

                  <div className="s5-name">
                    <em className="s5-tag">{member.tagRole}</em>
                    <span>
                      {member.name} {isCaptain ? "(LEAD)" : ""}
                    </span>
                    <small>{member.tagYear}</small>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── QUERIES & CONTACT BAR ── */}
          <div className="crew-contact-bar hs-reveal">
            <div className="crew-contact-who">
              <div className="crew-contact-icon" aria-hidden="true">
                📞
              </div>
              <div>
                <div className="crew-contact-kicker">FOR ANY QUERIES OR ASSISTANCE</div>
                <div className="crew-contact-name">
                  Bala Surya S <span>(Lead Organizer)</span>
                </div>
              </div>
            </div>

            <div className="crew-contact-actions">
              <a href="tel:9597075831" className="hs-btn hs-btn--primary">
                <span>CALL: +91 9597075831</span>
                <span aria-hidden="true">&gt;</span>
              </a>
              <a
                href="https://wa.me/919597075831?text=Hi%20Bala,%20I%20have%20a%20query%20about%20HackSprint%203.0"
                target="_blank"
                rel="noreferrer"
                className="hs-btn hs-btn--ghost"
              >
                <span>WHATSAPP</span>
                <span aria-hidden="true">💬</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── MODAL FOR SELECTED MEMBER DETAILS ── */}
        {selectedMember && (
          <div className="hs-modal" onClick={() => setSelectedMember(null)} role="dialog" aria-modal="true">
            <div className="hs-modal-card member-modal" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => setSelectedMember(null)} className="hs-modal-close" aria-label="Close">
                ✕
              </button>

              <div className="member-modal-top">
                <div className="member-modal-photo">
                  <Image src={selectedMember.image} alt={selectedMember.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <span className="hs-chip hs-chip--solid">
                    #{selectedMember.number} · {selectedMember.positionCode}
                  </span>
                  <h3>{selectedMember.name}</h3>
                  <p className="member-modal-role">{selectedMember.role}</p>
                  <p className="member-modal-detail">{selectedMember.detail}</p>
                </div>
              </div>

              <p className="member-modal-bio">{selectedMember.bio}</p>

              {selectedMember.contact && (
                <div className="hs-pill-row">
                  {selectedMember.contact.phone && (
                    <a href={`tel:${selectedMember.contact.phone}`} className="hs-btn hs-btn--primary hs-btn--sm">
                      <span>📞 CALL {selectedMember.contact.phone}</span>
                    </a>
                  )}
                  {selectedMember.contact.whatsapp && (
                    <a href={`https://wa.me/91${selectedMember.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hs-btn hs-btn--primary hs-btn--sm">
                      <span>💬 WHATSAPP</span>
                    </a>
                  )}
                  {selectedMember.contact.linkedin && (
                    <a href={selectedMember.contact.linkedin} target="_blank" rel="noreferrer" className="hs-btn hs-btn--ghost hs-btn--sm">
                      <span>↗ LINKEDIN</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

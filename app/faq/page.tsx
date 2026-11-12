"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="hs-section">
      <div className="hs-container faqx">
        <header className="hs-head hs-head--center hs-reveal">
          <p className="hs-eyebrow hs-eyebrow--center">Got questions?</p>
          <h2 className="hs-title hs-title--xl">
            F<span className="hs-accent">A</span>Q
          </h2>
        </header>

        <div className="faqx-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <div key={f.q} className={`faqx-item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={`${id}-q`}
                    className="faqx-q"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faqx-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faqx-text">{f.q}</span>
                    <span className="faqx-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faqx-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`} inert={!isOpen}>
                  <div>
                    <p>{f.a}</p>
                    {f.links && (
                      <span className="faqx-links">
                        {f.links.map((l) => (
                          <a key={l.href} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                            {l.label} ↗
                          </a>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="faqx-more hs-reveal">
          Still stuck? Ask <strong>Sprinty</strong> in the corner, or call <a href="tel:+919597075831">95970 75831</a>.
        </p>
      </div>
    </div>
  );
}

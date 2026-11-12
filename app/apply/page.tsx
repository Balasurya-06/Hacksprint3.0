/**
 * /apply – Static Devfolio integration page (Server Component – no "use client").
 *
 * This page is intentionally a Next.js Server Component so that:
 *  1. The `.apply-button` div is present in the raw SSR HTML.
 *  2. Devfolio's website-verification crawler (plain HTTP fetch) can detect it.
 *  3. The Devfolio SDK script tag is rendered server-side in the <head> via metadata.
 *
 * Point your Devfolio dashboard "Hackathon website" field to:
 *   https://www.hacksprint.tech/apply
 */

import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Apply | HACKSPRINT 3.0",
  description: "Apply to HACKSPRINT 3.0 via Devfolio — India's biggest student hackathon 2027.",
  robots: { index: false, follow: false },
};

export default function ApplyPage() {
  return (
    <>
      {/* Devfolio SDK — loaded as a real <script> tag in the SSR HTML */}
      <Script
        src="https://apply.devfolio.co/v2/sdk.js"
        strategy="beforeInteractive"
      />

      <main className="apply-page">
        <div className="hs-bg-grid" aria-hidden="true" />
        <div className="apply-card term">
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="term-file" aria-hidden="true">apply.sh</span>
          </div>
          <div className="apply-body">
            <h1 className="hs-title">
              Apply to <span className="hs-accent">HACKSPRINT 3.0</span>
            </h1>

            <p className="hs-lead">
              Click the button below to register for India&apos;s biggest student hackathon on Devfolio.
            </p>

        {/*
          ── DEVFOLIO APPLY BUTTON ─────────────────────────────────────────
          Required attributes per official docs:
            class="apply-button"
            data-hackathon-slug  — exact slug from your Devfolio dashboard
            data-button-theme    — "blue" for dark backgrounds
            style height/width   — must be set explicitly
          ──────────────────────────────────────────────────────────────────
        */}
        <div
          className="apply-button"
          data-hackathon-slug="hacksprint-3"
          data-button-theme="blue"
          style={{ height: "44px", width: "312px" }}
        />
          </div>
        </div>
      </main>
    </>
  );
}

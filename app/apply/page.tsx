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

      <main
        style={{
          minHeight: "100vh",
          background: "#070506",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          fontFamily: "'Inter', sans-serif",
          padding: "40px 24px",
        }}
      >
        <h1
          style={{
            color: "#f5f1ea",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            textAlign: "center",
            margin: 0,
          }}
        >
          Apply to HACKSPRINT 3.0
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "1rem",
            textAlign: "center",
            maxWidth: "480px",
            margin: 0,
          }}
        >
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
          data-hackathon-slug="hacksprint3-0"
          data-button-theme="blue"
          style={{ height: "44px", width: "312px" }}
        />
      </main>
    </>
  );
}

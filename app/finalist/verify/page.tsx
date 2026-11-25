import type { Metadata } from "next";
import { Suspense } from "react";
import PassVerify from "@/components/finalist/PassVerify";
import "@/components/finalist/finalist.css";

export const metadata: Metadata = {
  title: "Verify Entry Pass",
  robots: { index: false, follow: false },
};

export default function VerifyPassPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-bg-grid" aria-hidden="true" />
      <div className="hs-container">
        <div className="fp-wrap">
          <Suspense fallback={<div className="fp-card"><p className="fp-muted">Checking pass…</p></div>}>
            <PassVerify />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import FinalistLogin from "@/components/finalist/FinalistLogin";
import "@/components/finalist/finalist.css";

export const metadata: Metadata = {
  title: "Finalist Login",
  description: "Shortlisted HackSprint 3.0 teams: log in with your Team ID to pay the finale fee and download your entry pass.",
  robots: { index: false, follow: false },
};

export default function FinalistLoginPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-bg-grid" aria-hidden="true" />
      <div className="hs-container">
        <div className="fp-wrap fp-wrap--sm">
          <header className="hs-head hs-head--center" style={{ marginBottom: 32 }}>
            <p className="hs-eyebrow hs-eyebrow--center">Grand Finale</p>
            <h1 className="hs-title hs-title--xl">
              Finalist
              <br />
              <span className="hs-accent">Login</span>
            </h1>
            <p className="hs-lead" style={{ margin: "0 auto" }}>
              Shortlisted teams can log in with their Team ID to confirm their spot and download the entry pass.
            </p>
          </header>
          <FinalistLogin />
        </div>
      </div>
    </div>
  );
}

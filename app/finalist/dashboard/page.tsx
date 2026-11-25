import type { Metadata } from "next";
import FinalistDashboard from "@/components/finalist/FinalistDashboard";
import "@/components/finalist/finalist.css";

export const metadata: Metadata = {
  title: "Finalist Dashboard",
  robots: { index: false, follow: false },
};

export default function FinalistDashboardPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-bg-grid" aria-hidden="true" />
      <div className="hs-container">
        <div className="fp-wrap">
          <FinalistDashboard />
        </div>
      </div>
    </div>
  );
}

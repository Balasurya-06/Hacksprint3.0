import type { Metadata } from "next";
import AdminScanner from "@/components/finalist/AdminScanner";
import "@/components/finalist/finalist.css";

export const metadata: Metadata = {
  title: "Venue Scanner · Admin",
  robots: { index: false, follow: false },
};

export default function AdminScanPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-container">
        <AdminScanner />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import AdminFinalists from "@/components/finalist/AdminFinalists";
import "@/components/finalist/finalist.css";

export const metadata: Metadata = {
  title: "Finalists · Admin",
  robots: { index: false, follow: false },
};

export default function AdminFinalistsPage() {
  return (
    <div className="hs-section page-top">
      <div className="hs-container">
        <AdminFinalists />
      </div>
    </div>
  );
}

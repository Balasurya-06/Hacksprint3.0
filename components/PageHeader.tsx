import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header style={{ textAlign:"center", maxWidth:"760px", margin:"0 auto 56px" }}>
      <p style={{
        color: "#e51b24",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        marginBottom: "14px",
        fontFamily: "'Oswald',sans-serif",
      }}>
        {eyebrow}
      </p>
      <h1 style={{
        fontFamily: "'Bebas Neue','Oswald',sans-serif",
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
        fontWeight: 900,
        letterSpacing: "0.04em",
        lineHeight: 1.05,
        marginBottom: "20px",
        color: "#f5f1ea",
        textTransform: "uppercase",
      }}>
        {title}
      </h1>
      <p style={{ color: "#7a7068", fontSize: "0.95rem", lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>
        {description}
      </p>
    </header>
  );
}

type PageFrameProps = { children: ReactNode; accent?: boolean };

export function PageFrame({ children, accent = false }: PageFrameProps) {
  return (
    <div style={{
      background: "#070606",
      color: "#f5f1ea",
      minHeight: "calc(100vh - 68px)",
      padding: "120px 32px 100px",
      position: "relative",
    }}>
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(to right, #e51b24, #7a0a0e)",
        }} />
      )}
      {children}
    </div>
  );
}

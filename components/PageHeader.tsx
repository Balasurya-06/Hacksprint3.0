import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <header
      style={{
        textAlign: "center",
        maxWidth: "820px",
        margin: "0 auto 56px",
      }}
    >
      <p
        style={{
          color: "#e51b24",
          fontFamily: "'Oswald', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        {eyebrow}
      </p>

      <h1
        style={{
          fontFamily: "'Bebas Neue', 'Oswald', sans-serif",
          fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
          fontWeight: 800,
          letterSpacing: "0.04em",
          lineHeight: 1.02,
          color: "#f5f1ea",
          marginBottom: "18px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h1>

      <div
        style={{
          width: "48px",
          height: "2px",
          background: "#e51b24",
          margin: "0 auto 18px",
          boxShadow: "0 0 10px #e51b24",
        }}
      />

      <p
        style={{
          color: "#9e978d",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {description}
      </p>
    </header>
  );
}

type PageFrameProps = {
  children: ReactNode;
  accent?: boolean;
};

export function PageFrame({
  children,
  accent = false,
}: PageFrameProps) {
  return (
    <div
      style={{
        background: accent ? "#8b0a0e" : "#070606",
        color: accent ? "#ffffff" : "#f5f1ea",
        minHeight: "calc(100vh - 68px)",
        padding: "80px 32px 100px",
      }}
    >
      {children}
    </div>
  );
}

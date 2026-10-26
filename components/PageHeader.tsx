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
        maxWidth: "760px",
        margin: "0 auto 56px",
      }}
    >
      <p
        style={{
          color: "var(--soft-red)",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        {eyebrow}
      </p>

      <h1
        style={{
          fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.05,
          marginBottom: "20px",
        }}
      >
        {title}
      </h1>

      <p
        style={{
          color: "#777",
          fontSize: "1rem",
          lineHeight: 1.7,
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
        background: accent ? "var(--primary-red)" : "var(--obsidian-black)",
        color: accent ? "var(--white)" : "var(--primary-text)",
        minHeight: "calc(100vh - 68px)",
        padding: "120px 32px 100px",
      }}
    >
      {children}
    </div>
  );
}

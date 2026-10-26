import PageHeader, { PageFrame } from "@/components/PageHeader";

export default function ContactPage() {
  return (
    <PageFrame accent>
      <PageHeader
        eyebrow="Join the sprint"
        title={
          <>
            Ready to Sprint
            <br />
            Into History?
          </>
        }
        description="Join 500+ hackers, designers, and builders. Registration closes October 20, 2026."
      />

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <a
          href="mailto:hacksprint.official@gmail.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "100px",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "none",
            background: "#090909",
            color: "#E53935",
            padding: "14px 36px",
          }}
        >
          Email the team →
        </a>

        <div
          style={{
            borderTop: "2px solid #0a0a0022",
            marginTop: "52px",
            paddingTop: "28px",
          }}
        >
          <p style={{ color: "#E53935", marginBottom: "14px" }}>
            Get in touch
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            hacksprint.official@gmail.com · Instagram: @hacksprint3.0 · LinkedIn: HackSprint 3.0
          </p>
        </div>
      </div>
    </PageFrame>
  );
}

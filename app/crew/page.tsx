import Image from "next/image";

const crew = [
  {
    image: "/surya.png",
    initials: "BS",
    name: "Bala Surya S",
    role: "Organizer · HackSprint 2.0 & 3.0",
    detail: "Final Year · Computer Science and Engineering",
    contact: {
      phone: "9597075831",
      whatsapp: "9597075831",
      linkedin: "https://www.linkedin.com/in/balasurya06/",
    },
    accent: "#d4ff00",
    className: "crew-profile-one",
  },
  { initials: "D", name: "Deepa", role: "Organizer · HackSprint 3.0", detail: "Coordinator · HackSprint 2.0 · Third Year · Computer Science and Engineering", accent: "#b9c4c4", className: "crew-profile-two" },
  { initials: "K", name: "Kavinya", role: "Organizer · HackSprint 3.0", detail: "Coordinator · HackSprint 2.0 · Third Year · Computer Science and Engineering", accent: "#758300", className: "crew-profile-three" },
];

export default function CrewPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", padding: "110px 32px 100px" }}>
    <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
      <div className="crew-intro" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "70px", alignItems: "end", marginBottom: "72px" }}>
        <div>
          <p style={{ color: "#d4ff00", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.16em", marginBottom: "16px", textTransform: "uppercase" }}>
            The people behind the sprint
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.7rem, 6vw, 5.2rem)", fontWeight: 800, letterSpacing: "-0.07em", lineHeight: 0.95 }}>
            Meet the <span style={{ color: "#d4ff00" }}>crew</span>.
          </h1>
        </div>
        <div>
          <p style={{ color: "#888", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "430px" }}>
            The organizers, builders, and community leaders creating a space where ideas become real-world projects.
          </p>
          <a href="#crew-profiles" style={{ display: "inline-flex", marginTop: "22px", padding: "10px 18px", border: "1px solid #d4ff00", borderRadius: "999px", color: "#d4ff00", fontSize: "0.75rem", fontWeight: 700, textDecoration: "none" }}>
            Meet the team ↓
          </a>
        </div>
      </div>

      <section style={{ marginBottom: "64px" }} aria-labelledby="conveners-title">
        <p
          id="conveners-title"
          style={{
            color: "#d4ff00",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.16em",
            marginBottom: "18px",
            textTransform: "uppercase",
          }}
        >
          Conveners
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {[
            ["Dr. R. Santhosh", "Head of Department", "Computer Science and Engineering"],
            ["Ramaya", "Assistant Professor", "Department of Computer Science and Engineering"],
          ].map(([name, role, department]) => (
            <article
              key={name}
              style={{
                borderTop: "1px solid #d4ff00",
                borderBottom: "1px solid #222",
                padding: "22px 0",
              }}
            >
              <h2 style={{ color: "#fff", fontSize: "1.2rem", letterSpacing: "-0.03em" }}>{name}</h2>
              <p style={{ color: "#d4ff00", fontSize: "0.78rem", fontWeight: 700, marginTop: "8px" }}>{role}</p>
              <p style={{ color: "#777", fontSize: "0.8rem", lineHeight: 1.5, marginTop: "4px" }}>{department}</p>
            </article>
          ))}
        </div>
      </section>

      <div
        id="crew-profiles"
        className="crew-profiles"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          alignItems: "end",
        }}
      >
        {crew.map((member) => (
          <article
            key={member.name}
            className={member.className}
            style={{
              minHeight: "450px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid #222",
              borderRadius: "190px 190px 0 0",
              background: `linear-gradient(180deg, ${member.accent} 0%, ${member.accent}cc 44%, #161616 100%)`,
              padding: "42px 18px 24px",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ color: "#0a0a0a", fontSize: "1.15rem", fontWeight: 800 }}>{member.name}</h2>
              <p style={{ color: "#0a0a0acc", fontSize: "0.7rem", lineHeight: 1.4, marginTop: "6px" }}>{member.role}</p>
              {"detail" in member && <p style={{ color: "#0a0a0a99", fontSize: "0.62rem", lineHeight: 1.4, marginTop: "5px" }}>{member.detail}</p>}
              {"contact" in member && member.contact && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "14px" }}>
                  <a
                    href={`tel:${member.contact.phone}`}
                    aria-label={`Call ${member.name}`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${member.contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`WhatsApp ${member.name}`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href={member.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    style={{ color: "#0a0a0a", fontSize: "0.68rem", fontWeight: 800, textDecoration: "none" }}
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "-24px",
                transform: "translateX(-50%)",
                width: "250px",
                height: "310px",
                borderRadius: "130px 130px 0 0",
                background: "linear-gradient(160deg, #222, #080808)",
                display: "grid",
                placeItems: "center",
                color: member.accent,
                fontSize: "3.6rem",
                fontWeight: 900,
                letterSpacing: "-0.1em",
                boxShadow: "0 -10px 30px #00000033",
              }}
            >
              {"image" in member && member.image ? (
                <Image
                  src={member.image}
                  alt={`${member.name} profile`}
                  fill
                  sizes="250px"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              ) : (
                member.initials
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
    </main>
  );
}

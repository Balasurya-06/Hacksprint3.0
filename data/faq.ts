/* ═══════════════════════════════════════════════════════════════
   HACKSPRINT 3.0 — QUESTIONS & ANSWERS
   ───────────────────────────────────────────────────────────────
   This one file feeds BOTH the FAQ section and the "Sprinty" chatbot.

   To add or change an answer, edit the lists below:
     q         – the question as people would ask it
     a         – the answer (plain text)
     keywords  – words or short phrases that should trigger this
                 answer in the chatbot (lowercase). Add the different
                 ways people might ask, including common spellings.
     links     – optional buttons shown under the answer

   `faqs`         → shown in the FAQ section AND used by the chatbot
   `chatbotOnly`  → used by the chatbot only (not shown in the FAQ)
   ═══════════════════════════════════════════════════════════════ */

export type QA = {
  q: string;
  a: string;
  keywords: string[];
  links?: { label: string; href: string }[];
};

const DEVFOLIO = "https://hacksprint-3.devfolio.co/overview";
const WHATSAPP = "https://chat.whatsapp.com/C9gawXXKFtr76gk6YoUe3K";

export const faqs: QA[] = [
  {
    q: "What is HackSprint 3.0?",
    a: "HackSprint 3.0 is the third edition of our 36-hour national-level hackathon, organized by the Department of Computer Science & Engineering and the Metaverse Students Association at Karpagam Academy of Higher Education, Coimbatore.",
    keywords: ["hacksprint", "hackathon", "event", "details", "national level", "organiser", "organizer", "organized", "about the event", "tell me about"],
  },
  {
    q: "Who can participate?",
    a: "Any college student in India can participate.",
    keywords: ["who can", "participate", "eligible", "eligibility", "join", "student", "college", "ug", "pg", "first year", "branch", "allowed"],
  },
  {
    q: "What is the team size?",
    a: "Teams must have 3 to 5 members.",
    keywords: ["team size", "team", "members", "how many", "solo", "alone", "individual", "group"],
  },
  {
    q: "Is there a registration fee?",
    a: "The first round is completely free. Teams shortlisted for the final round pay a participation fee for the finale — the amount will be announced along with the shortlist.",
    keywords: ["fee", "fees", "cost", "price", "pay", "payment", "free", "charge", "amount", "money"],
  },
  {
    q: "How do I register?",
    a: "Register your team on Devfolio. Registration is open from November 8 to December 28, 2026.",
    keywords: ["register", "registration", "apply", "sign up", "signup", "devfolio", "how to join", "enroll", "link"],
    links: [{ label: "Apply on Devfolio", href: DEVFOLIO }],
  },
  {
    q: "What is the last date to register?",
    a: "Registration closes on December 28, 2026. That is also the deadline to submit your project idea.",
    keywords: ["last date", "deadline", "closes", "close", "end date", "last day", "due", "submission", "idea submission"],
    links: [{ label: "Apply on Devfolio", href: DEVFOLIO }],
  },
  {
    q: "How are teams selected for the finale?",
    a: "Submit your project idea before the December 28, 2026 deadline. The finalized teams will be announced on January 4, 2027.",
    keywords: ["selected", "selection", "shortlist", "shortlisted", "finale", "final round", "round", "result", "announced", "january"],
  },
  {
    q: "When and where is the hackathon?",
    a: "The 36-hour final round is on 5 and 6 February 2027 at Karpagam Academy of Higher Education, Salem–Kochi Highway, Eachanari, Coimbatore.",
    keywords: ["when", "where", "venue", "location", "place", "date", "dates", "address", "coimbatore", "kahe", "campus", "offline", "online"],
    links: [{ label: "Open in Maps", href: "https://www.google.com/maps/search/?api=1&query=Karpagam+Academy+of+Higher+Education%2C+Coimbatore" }],
  },
  {
    q: "What are the tracks?",
    a: "There are 5 tracks: AgroTech (smart farming and crop health), EduTech (learning and education), MedTech (healthcare and diagnostics), WildVision Tech (wildlife and conservation), and Open Innovation (any strong idea, including AI agents, drones, Web3, FinTech, and smart campus projects).",
    keywords: ["track", "tracks", "theme", "themes", "domain", "domains", "problem statement", "category", "agrotech", "edutech", "medtech", "wildvision", "open innovation", "agent", "ai"],
  },
  {
    q: "Will food and accommodation be provided?",
    a: "Yes. Food and accommodation are provided for the shortlisted teams during the hackathon.",
    keywords: ["food", "accommodation", "stay", "hostel", "room", "meals", "lunch", "dinner", "sleep", "lodging"],
  },
  {
    q: "What are the prizes?",
    a: "Prize details will be announced soon. Follow us on Instagram and LinkedIn, or join the WhatsApp group, to hear first.",
    keywords: ["prize", "prizes", "reward", "rewards", "cash", "win", "winner", "pool", "money", "goodies", "swag"],
    links: [{ label: "Join WhatsApp", href: WHATSAPP }],
  },
  {
    q: "When is the final round?",
    a: "The HackSprint 3.0 final round is on 5 and 6 February 2027. It is a 36-hour on-campus finale at Karpagam Academy of Higher Education, Coimbatore.",
    keywords: ["final date", "final round date", "finale date", "february", "feb", "5 feb", "6 feb", "5 and 6", "when is finale", "when is final"],
  },
  {
    q: "How will projects be judged?",
    a: "Build a working solution that clearly addresses the chosen track or problem. Judges will look at innovation, real-world impact, technical execution, usability, and how clearly your team presents and demonstrates the project.",
    keywords: ["judge", "judging", "criteria", "evaluation", "score", "scoring", "presentation", "demo", "pitch"],
  },
  {
    q: "What should I build?",
    a: "Choose one of the five tracks and solve a meaningful problem with technology. You can build software, hardware, AI, agentic apps, or another practical prototype. Open Innovation is available if your idea does not fit the other tracks.",
    keywords: ["what to build", "project idea", "idea", "build", "problem statement", "project", "app", "prototype", "hardware", "software"],
  },
  {
    q: "Can beginners participate?",
    a: "Yes. Beginners and first-time hackathon participants are welcome. Form a team of 3 to 5 college students, choose a track, and start with a problem you understand.",
    keywords: ["beginner", "beginners", "first time", "new to hackathon", "experience", "no experience"],
  },
  {
    q: "What do I need to bring?",
    a: "Bring your laptop, charger, required hardware, college ID, and any project materials your team needs. Keep your Devfolio registration details ready as well.",
    keywords: ["bring", "carry", "laptop", "charger", "hardware", "things", "items", "id card", "college id"],
  },
  {
    q: "Will participants get certificates?",
    a: "Participants can expect certificates and recognition for their HackSprint 3.0 journey. Shortlisted finalists will receive the detailed finale instructions from the organizing team.",
    keywords: ["certificate", "certificates", "recognition", "participation", "proof"],
  },
];

export const chatbotOnly: QA[] = [
  {
    q: "How can I contact the organisers?",
    a: "Call 95970 75831 or 73732 50006, email hacksprint.official@gmail.com, or join the WhatsApp group.",
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "help", "support", "organiser", "organizer", "whatsapp", "query", "queries"],
    links: [
      { label: "Call 95970 75831", href: "tel:+919597075831" },
      { label: "Join WhatsApp", href: WHATSAPP },
    ],
  },
  {
    q: "Where can I get the brochure?",
    a: "You can download the official HackSprint 3.0 brochure here.",
    keywords: ["brochure", "pdf", "poster", "download"],
    links: [{ label: "Download brochure", href: "/pdf/HS3_Brochure.pdf" }],
  },
  {
    q: "How can my company sponsor HackSprint 3.0?",
    a: "We'd love to partner with you! See the sponsorship deck, or contact Bala Surya S (Lead Organizer) at 95970 75831 or hacksprint.official@gmail.com.",
    keywords: ["sponsor", "sponsorship", "partner", "partnership", "company", "brand", "deck", "collaborate"],
    links: [{ label: "Sponsor deck", href: "/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf" }],
  },
  {
    q: "What is the timeline?",
    a: "Registration opens Nov 8, 2026 · Idea submission deadline Dec 28, 2026 · Finalized teams announced Jan 4, 2027 · 36-hour final round on Feb 5–6, 2027.",
    keywords: ["timeline", "schedule", "phases", "important dates", "plan", "steps"],
  },
  {
    q: "How long is the hackathon?",
    a: "HackSprint 3.0 is a 36-hour hackathon.",
    keywords: ["how long", "duration", "hours", "36", "overnight"],
  },
  {
    q: "Who are the sponsors?",
    a: "Devfolio is our Gold Sponsor (official hackathon platform). Adaption is our Official AI Partner and Eventopia is our Media Partner.",
    keywords: ["sponsors", "devfolio", "adaption", "eventopia", "partners", "supported by"],
  },
  {
    q: "Who are the organisers?",
    a: "Conveners: Dr. R. Santhosh (Head of Department, CSE) and Ramya (Assistant Professor, CSE). Student organizers: Bala Surya S (Lead Organizer), Kavinya, Harini, Deepa and Aravind.",
    keywords: ["crew", "team behind", "organisers", "organizers", "convener", "conveners", "lead", "who runs", "hod", "faculty"],
  },
  {
    q: "What happened at HackSprint 2.0?",
    a: "In January 2026, 4,200+ developers registered for HackSprint 2.0. 80+ teams were shortlisted for the 36-hour finale at KAHE, with ₹1L worth of prizes awarded.",
    keywords: ["2.0", "last year", "previous", "past", "legacy", "history", "last edition"],
  },
  {
    q: "Who are you?",
    a: "I'm Sprinty, the HackSprint 3.0 assistant. I answer questions about registration, tracks, team size, fees, venue, prizes and more.",
    keywords: ["who are you", "your name", "sprinty", "bot", "assistant"],
  },
];

/* Messages the chatbot uses on its own. */
export const chatbotText = {
  name: "Sprinty",
  greeting: "Hi! I’m Sprinty, your HackSprint 3.0 assistant. Ask me about registration, tracks, teams, judging, the 5–6 February 2027 finale, venue, prizes, or anything related to the hackathon.",
  fallback: "I’m here for HackSprint 3.0 questions. Ask me about registration, tracks, project ideas, eligibility, teams, fees, judging, travel, accommodation, the 5–6 February 2027 finale, or contact the organizers at 95970 75831 / 73732 50006.",
  suggestions: ["Final round date?", "What are the tracks?", "How do I register?", "How will projects be judged?", "What should I bring?"],
};

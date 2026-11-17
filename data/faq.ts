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
                    (keep it short — the section shows these in two columns)
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
const MAPS = "https://www.google.com/maps/search/?api=1&query=Karpagam+Academy+of+Higher+Education%2C+Coimbatore";

export const faqs: QA[] = [
  {
    q: "What is HackSprint 3.0?",
    a: "HackSprint 3.0 is the third edition of our 36-hour national-level hackathon, organized by the Department of Computer Science & Engineering and the Metaverse Students Association at Karpagam Academy of Higher Education, Coimbatore.",
    keywords: ["hacksprint", "hackathon", "event", "national level", "organiser", "organizer", "organized"],
  },
  {
    q: "Who can participate?",
    a: "Any college student in India can participate — UG or PG, any year, any branch. Beginners are welcome too.",
    keywords: ["who can", "participate", "eligible", "eligibility", "join", "student", "college", "ug", "pg", "first year", "branch", "allowed"],
  },
  {
    q: "What is the team size?",
    a: "Teams must have 3 to 5 members.",
    keywords: ["team size", "team", "members", "how many", "solo", "alone", "individual", "group"],
  },
  {
    q: "Is there a registration fee?",
    a: "Registering and submitting your idea is completely free. Teams shortlisted for the final round pay a participation fee for the finale — the amount will be announced along with the shortlist.",
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
    keywords: ["selected", "selection", "shortlist", "shortlisted", "result", "results", "announced", "announcement", "january", "finalist", "finalists"],
  },
  {
    q: "When and where is the hackathon?",
    a: "The 36-hour final round is on 5 and 6 February 2027 at Karpagam Academy of Higher Education, Salem–Kochi Highway, Eachanari, Coimbatore.",
    keywords: ["when", "where", "venue", "location", "place", "address", "coimbatore", "kahe", "campus"],
    links: [{ label: "Open in Maps", href: MAPS }],
  },
  {
    q: "What are the tracks?",
    a: "There are 5 tracks: AgroTech (smart farming and crop health), EduTech (learning and education), MedTech (healthcare and diagnostics), WildVision Tech (wildlife and conservation), and Open Innovation (any strong idea, including AI agents, drones, Web3, FinTech, and smart campus projects).",
    keywords: ["track", "tracks", "theme", "themes", "domain", "domains", "problem statement", "category"],
  },
  {
    q: "Will food and accommodation be provided?",
    a: "Yes. Food and accommodation are provided for the shortlisted teams during the hackathon.",
    keywords: ["food", "accommodation", "stay", "hostel", "room", "meals", "lunch", "dinner", "sleep", "lodging"],
  },
  {
    q: "What are the prizes?",
    a: "Prize details will be announced soon. Follow us on Instagram and LinkedIn, or join the WhatsApp group, to hear first.",
    keywords: ["prize", "prizes", "reward", "rewards", "cash", "win", "winner", "pool", "goodies", "swag"],
    links: [{ label: "Join WhatsApp", href: WHATSAPP }],
  },
  {
    q: "How will projects be judged?",
    a: "Build a working solution that clearly addresses the chosen track or problem. Judges will look at innovation, real-world impact, technical execution, usability, and how clearly your team presents and demonstrates the project.",
    keywords: ["judge", "judging", "criteria", "evaluation", "score", "scoring", "presentation", "demo", "pitch"],
  },
];

export const chatbotOnly: QA[] = [
  /* ── The event, in depth ── */
  {
    q: "Tell me everything about HackSprint 3.0",
    a: "HackSprint 3.0 is a 36-hour national-level student hackathon by the Department of CSE and the Metaverse Students Association at KAHE, Coimbatore. How it works: register your team of 3–5 on Devfolio (free) between Nov 8 and Dec 28, 2026 and submit your idea → finalized teams are announced on Jan 4, 2027 → the 36-hour on-campus finale runs on Feb 5–6, 2027. Pick one of 5 tracks: AgroTech, EduTech, MedTech, WildVision Tech or Open Innovation. Shortlisted teams get food and accommodation during the finale.",
    keywords: ["overview", "everything", "full details", "complete details", "details", "explain", "summary", "info", "information", "what is this", "about hacksprint", "tell me about", "about the event", "hacksprint 3.0"],
    links: [
      { label: "Apply on Devfolio", href: DEVFOLIO },
      { label: "Download brochure", href: "/pdf/HS3_Brochure.pdf" },
    ],
  },
  {
    q: "What is the timeline?",
    a: "Registration opens Nov 8, 2026 · Registration and idea submission close Dec 28, 2026 · Finalized teams announced Jan 4, 2027 · 36-hour final round on Feb 5–6, 2027 at KAHE, Coimbatore.",
    keywords: ["timeline", "schedule", "phases", "important dates", "plan", "steps", "process", "how does it work", "stages", "rounds"],
  },
  {
    q: "When is the final round?",
    a: "The HackSprint 3.0 final round is on 5 and 6 February 2027. It is a 36-hour on-campus finale at Karpagam Academy of Higher Education, Coimbatore.",
    keywords: ["final round", "finale", "date", "date of", "final date", "final round date", "finale date", "february", "feb", "5 feb", "6 feb", "grand finale", "hackathon date", "event date"],
  },
  {
    q: "Is it online or offline?",
    a: "Both, in stages. Registration and idea submission happen online on Devfolio. The 36-hour final round is offline, on campus at KAHE, Coimbatore, for the shortlisted teams.",
    keywords: ["online", "offline", "virtual", "in person", "physical", "remote", "hybrid", "on campus"],
  },
  {
    q: "How long is the hackathon?",
    a: "The final round is a continuous 36-hour hackathon on Feb 5–6, 2027 — you build, test and present your prototype within those 36 hours.",
    keywords: ["how long", "duration", "hours", "36", "overnight", "non stop", "nonstop"],
  },
  {
    q: "How do I reach the venue?",
    a: "The venue is Karpagam Academy of Higher Education on the Salem–Kochi Highway at Eachanari, Coimbatore, Tamil Nadu 641021. Coimbatore is well connected by train (Coimbatore Junction) and air (Coimbatore International Airport); from the city you can take a bus or cab to Eachanari. Open the map for directions.",
    keywords: ["reach", "travel", "how to come", "directions", "bus", "train", "railway", "airport", "flight", "cab", "route", "transport", "way to"],
    links: [{ label: "Open in Maps", href: MAPS }],
  },

  /* ── Tracks in detail ── */
  {
    q: "Tell me about the AgroTech track",
    a: "AgroTech is about technology for farming and food: smart irrigation, crop-health and disease detection, soil and weather insights, supply-chain and market access for farmers, and agri drones or IoT.",
    keywords: ["agrotech", "agro", "agriculture", "farming", "farmer", "crop", "soil", "irrigation"],
  },
  {
    q: "Tell me about the EduTech track",
    a: "EduTech is about better learning: personalised or AI tutoring, accessibility tools, assessment and feedback, skill-building platforms and tools for teachers and institutions.",
    keywords: ["edutech", "edtech", "education", "learning", "teaching", "student tool", "tutor"],
  },
  {
    q: "Tell me about the MedTech track",
    a: "MedTech is about healthcare: diagnostics and screening, patient monitoring, health records, mental health, accessibility and assistive tech, and tools that help doctors or rural healthcare.",
    keywords: ["medtech", "medical", "health", "healthcare", "hospital", "diagnosis", "patient", "doctor"],
  },
  {
    q: "Tell me about the WildVision Tech track",
    a: "WildVision Tech is about wildlife and the environment: species detection with camera traps or audio, anti-poaching and human–wildlife conflict alerts, habitat monitoring and conservation tools.",
    keywords: ["wildvision", "wild vision", "wildlife", "animal", "forest", "conservation", "environment", "nature"],
  },
  {
    q: "Tell me about the Open Innovation track",
    a: "Open Innovation is for any strong idea that doesn't fit the other four tracks — AI agents, drones, Web3, FinTech, smart campus, sustainability and more. Solve a real problem and show a working prototype.",
    keywords: ["open innovation", "open track", "any idea", "other idea", "web3", "fintech", "drone", "drones", "agent", "agents", "ai", "smart campus"],
  },
  {
    q: "What should I build?",
    a: "Choose one of the five tracks and solve a meaningful problem with technology. You can build software, hardware, AI, agentic apps, or another practical prototype. Open Innovation is available if your idea does not fit the other tracks.",
    keywords: ["what to build", "project idea", "idea", "build", "project", "app", "prototype", "hardware", "software", "suggest"],
  },

  /* ── Participating ── */
  {
    q: "Can beginners participate?",
    a: "Yes. Beginners and first-time hackathon participants are welcome. Form a team of 3 to 5 college students, choose a track, and start with a problem you understand.",
    keywords: ["beginner", "beginners", "first time", "new to hackathon", "experience", "no experience", "fresher"],
  },
  {
    q: "Why should I take part?",
    a: "You get to build a real prototype in 36 hours, compete with student teams from across India, present to judges, win prizes (details coming soon), earn certificates and meet builders, organizers and sponsors like Devfolio.",
    keywords: ["why", "benefit", "benefits", "worth", "advantage", "what will i get", "gain", "learn"],
  },
  {
    q: "What do I need to bring?",
    a: "Bring your laptop, charger, required hardware, college ID, and any project materials your team needs. Keep your Devfolio registration details ready as well.",
    keywords: ["bring", "carry", "laptop", "charger", "things", "items", "id card", "college id", "pack"],
  },
  {
    q: "Will participants get certificates?",
    a: "Participants can expect certificates and recognition for their HackSprint 3.0 journey. Shortlisted finalists will receive the detailed finale instructions from the organizing team.",
    keywords: ["certificate", "certificates", "recognition", "participation", "proof"],
  },
  {
    q: "How do I get the hacker pass?",
    a: "Open the Pass section, enter your name and team, add a photo and download your HackSprint 3.0 participant pass — then share it on LinkedIn or Instagram and tag @hacksprint3.0. It's a keepsake, not an entry ticket.",
    keywords: ["pass", "hacker pass", "participant pass", "badge", "id card", "poster", "share", "linkedin post"],
    links: [{ label: "Get your pass", href: "/pass" }],
  },

  /* ── People, partners, links ── */
  {
    q: "How can I contact the organisers?",
    a: "Call 95970 75831 or 73732 50006, email hacksprint.official@gmail.com, or join the WhatsApp group.",
    keywords: ["contact", "phone", "call", "number", "mobile", "email", "mail", "help", "support", "whatsapp", "query", "queries"],
    links: [
      { label: "Call 95970 75831", href: "tel:+919597075831" },
      { label: "Join WhatsApp", href: WHATSAPP },
    ],
  },
  {
    q: "Where can I follow HackSprint?",
    a: "Follow @hacksprint3.0 on Instagram and the HackSprint 3.0 page on LinkedIn, and join the WhatsApp group for the fastest updates.",
    keywords: ["instagram", "insta", "linkedin", "social", "follow", "updates", "announcement", "news", "community"],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/hacksprint3.0" },
      { label: "LinkedIn", href: "https://www.linkedin.com/showcase/hacksprint3-0/" },
      { label: "Join WhatsApp", href: WHATSAPP },
    ],
  },
  {
    q: "Where can I get the brochure?",
    a: "You can download the official HackSprint 3.0 brochure here.",
    keywords: ["brochure", "pdf", "download"],
    links: [{ label: "Download brochure", href: "/pdf/HS3_Brochure.pdf" }],
  },
  {
    q: "How can my company sponsor HackSprint 3.0?",
    a: "We'd love to partner with you! See the sponsorship deck, or contact Bala Surya S (Lead Organizer) at 95970 75831 or hacksprint.official@gmail.com.",
    keywords: ["sponsor", "sponsorship", "partner", "partnership", "company", "brand", "deck", "collaborate"],
    links: [{ label: "Sponsor deck", href: "/pdf/HS3_SPONSORSHIP_PROPOSAL_FINAL%20(1).pdf" }],
  },
  {
    q: "Who are the sponsors?",
    a: "Devfolio is our Gold Sponsor (official hackathon platform). Adaption is our Official AI Partner and Eventopia is our Media Partner.",
    keywords: ["sponsors", "adaption", "eventopia", "partners", "supported by"],
  },
  {
    q: "Who are the organisers?",
    a: "Conveners: Dr. R. Santhosh (Head of Department, CSE) and Ramya (Assistant Professor, CSE). Student organizers: Bala Surya S (Lead Organizer), Harini (Organizer) and Aravind (Organizer).",
    keywords: ["crew", "team behind", "organisers", "organizers", "convener", "conveners", "lead", "who runs", "hod", "faculty"],
  },
  {
    q: "What happened at HackSprint 2.0?",
    a: "In January 2026, 4,200+ developers registered for HackSprint 2.0. 80+ teams were shortlisted for the 36-hour finale at KAHE, with ₹1L worth of prizes awarded.",
    keywords: ["2.0", "last year", "previous", "past", "legacy", "history", "last edition"],
  },
  {
    q: "Who are you?",
    a: "I'm Sprinty, the HackSprint 3.0 assistant. Ask me about registration, the timeline, tracks, team size, fees, the venue and travel, food and stay, judging, prizes, the hacker pass or how to contact the organizers.",
    keywords: ["who are you", "your name", "sprinty", "bot", "assistant"],
  },
];

/* Messages the chatbot uses on its own. */
export const chatbotText = {
  name: "Sprinty",
  greeting:
    "Hi! I’m Sprinty, your HackSprint 3.0 assistant. HackSprint 3.0 is a free-to-register, 36-hour national student hackathon at KAHE, Coimbatore — registration closes Dec 28, 2026 and the finale is on Feb 5–6, 2027. Ask me anything: tracks, teams, fees, venue, judging, prizes…",
  fallback:
    "I didn’t quite get that, but here’s the short version: register your team of 3–5 on Devfolio (free) by Dec 28, 2026 → finalists announced Jan 4, 2027 → 36-hour finale on Feb 5–6, 2027 at KAHE, Coimbatore. Try asking about tracks, fees, venue, judging or prizes — or call the organizers at 95970 75831 / 73732 50006.",
  suggestions: ["Tell me everything", "Timeline?", "What are the tracks?", "How do I register?", "Is there a fee?", "How do I reach the venue?"],
};

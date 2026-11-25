import type { AdminTeamRow, LoginCodeRow, MemberRow, Store, TeamRow } from "./db";

/* Local demo data (only when DATABASE_URL is not set in `next dev`). Resets when the dev server restarts. */

type Order = { team_id: number; order_id: string; amount: number; status: "created" | "paid" | "failed"; created_at: number };
type State = { teams: TeamRow[]; members: MemberRow[]; codes: Map<number, LoginCodeRow>; orders: Order[] };

const DEMO_TEAMS: { name: string; code: string; members: [string, string][] }[] = [
  {
    name: "Unique",
    code: "UNIQUE.DEMO",
    members: [["Arun Kumar", "arun@example.com"], ["Divya R", "divya@example.com"], ["Karthik S", "karthik@example.com"]],
  },
  {
    name: "Vigron",
    code: "VIGRON.DEMO",
    members: [
      ["Priya M", "priya@example.com"],
      ["Rahul V", "rahul@example.com"],
      ["Sneha P", "sneha@example.com"],
      ["Vishal K", "vishal@example.com"],
      ["Meena L", "meena@example.com"],
    ],
  },
];

function seed(): State {
  const s: State = { teams: [], members: [], codes: new Map(), orders: [] };
  let mid = 1;
  DEMO_TEAMS.forEach((t, i) => {
    const id = i + 1;
    s.teams.push({
      id, team_code: t.code, name: t.name, leader_email: t.members[0][1], status: "shortlisted",
      paid_at: null, payment_id: null, amount_paid: null, id_mail_sent_at: null, paid_mail_sent_at: null,
    });
    t.members.forEach(([name, email], j) => s.members.push({ id: mid++, team_id: id, name, email, is_leader: j === 0 }));
  });
  return s;
}

const g = globalThis as unknown as { __hsMemV2?: State };
const st = () => (g.__hsMemV2 ??= seed());
const nextId = (rows: { id: number }[]) => rows.reduce((n, r) => Math.max(n, r.id), 0) + 1;
const copy = <T,>(v: T): T => (v ? { ...v } : v);

const mem: Store = {
  async getTeamByCode(code) {
    return copy(st().teams.find((t) => t.team_code.toUpperCase() === code.trim().toUpperCase()) ?? null);
  },
  async getTeamById(id) {
    return copy(st().teams.find((t) => t.id === id) ?? null);
  },
  async getMembers(teamId) {
    return st().members.filter((m) => m.team_id === teamId).sort((a, b) => Number(b.is_leader) - Number(a.is_leader) || a.id - b.id);
  },
  async getTeamByName(name) {
    return copy(st().teams.find((t) => t.name.toLowerCase() === name.trim().toLowerCase()) ?? null);
  },
  async createTeam(code, name, leader_email, members) {
    const s = st();
    if (s.teams.some((t) => t.team_code === code)) return null;
    const team: TeamRow = {
      id: nextId(s.teams), team_code: code, name, leader_email, status: "shortlisted",
      paid_at: null, payment_id: null, amount_paid: null, id_mail_sent_at: null, paid_mail_sent_at: null,
    };
    s.teams.push(team);
    for (const mb of members) s.members.push({ id: nextId(s.members), team_id: team.id, name: mb.name, email: mb.email, is_leader: mb.isLeader });
    return { ...team };
  },
  async addMember(team_id, name, email) {
    const mb: MemberRow = { id: nextId(st().members), team_id, name, email, is_leader: false };
    st().members.push(mb);
    return { ...mb };
  },
  async getMember(memberId) {
    return copy(st().members.find((x) => x.id === memberId) ?? null);
  },
  async removeMember(memberId) {
    st().members = st().members.filter((x) => x.id !== memberId);
  },
  async deleteTeam(teamId) {
    const s = st();
    s.teams = s.teams.filter((t) => t.id !== teamId);
    s.members = s.members.filter((x) => x.team_id !== teamId);
    s.orders = s.orders.filter((o) => o.team_id !== teamId);
    s.codes.delete(teamId);
  },

  async getLoginCode(teamId) {
    return copy(st().codes.get(teamId) ?? null);
  },
  async saveLoginCode(teamId, code_hash, ttlMs) {
    st().codes.set(teamId, { code_hash, expires_at: new Date(Date.now() + ttlMs), attempts: 0, sent_at: new Date() });
  },
  async bumpLoginAttempts(teamId) {
    const c = st().codes.get(teamId);
    if (c) c.attempts++;
  },
  async deleteLoginCode(teamId) {
    st().codes.delete(teamId);
  },

  async findReusableOrder(teamId, amount) {
    return st().orders.find((o) => o.team_id === teamId && o.status === "created" && o.amount === amount)?.order_id ?? null;
  },
  async insertOrder(team_id, order_id, amount) {
    st().orders.push({ team_id, order_id, amount, status: "created", created_at: Date.now() });
  },
  async getOrder(orderId) {
    const o = st().orders.find((x) => x.order_id === orderId);
    return o ? { team_id: o.team_id, amount: o.amount, status: o.status } : null;
  },
  async markOrderPaid(orderId, paymentId, amount) {
    const o = st().orders.find((x) => x.order_id === orderId);
    if (!o) return null;
    if (amount !== undefined && amount !== o.amount) throw new Error(`Amount mismatch for ${orderId}`);
    o.status = "paid";
    const t = st().teams.find((x) => x.id === o.team_id);
    if (!t || t.status === "paid") return null;
    Object.assign(t, { status: "paid", paid_at: new Date(), payment_id: paymentId, amount_paid: o.amount });
    return { ...t };
  },

  async setMailSent(teamId, kind) {
    const t = st().teams.find((x) => x.id === teamId);
    if (t) t[kind === "id" ? "id_mail_sent_at" : "paid_mail_sent_at"] = new Date();
  },
  async listTeams() {
    return st()
      .teams.map((t): AdminTeamRow => {
        const ms = st().members.filter((m) => m.team_id === t.id).sort((a, b) => Number(b.is_leader) - Number(a.is_leader) || a.id - b.id);
        return { ...t, member_count: ms.length, members: ms.map((m) => m.name).join("; "), member_list: ms.map((m) => ({ ...m })) };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  },
  async teamsWithoutIdMail(limit) {
    return st().teams.filter((t) => !t.id_mail_sent_at).slice(0, limit).map((t) => ({ ...t }));
  },
  async countWithoutIdMail() {
    return st().teams.filter((t) => !t.id_mail_sent_at).length;
  },
};

export const memoryStore = () => mem;

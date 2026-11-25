import { withErrors } from "@/lib/finalist/http";
import { db } from "@/lib/finalist/db";
import { isAdmin } from "@/lib/finalist/session";

type Row = {
  id: number;
  team_code: string;
  name: string;
  leader_email: string;
  status: string;
  paid_at: Date | null;
  payment_id: string | null;
  amount_paid: number | null;
  id_mail_sent_at: Date | null;
  paid_mail_sent_at: Date | null;
  member_count: number;
  members: string;
};

/* GET /api/admin/teams            → JSON list
   GET /api/admin/teams?format=csv → CSV download */
async function handleGET(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db()<Row[]>`
    select t.id, t.team_code, t.name, t.leader_email, t.status, t.paid_at, t.payment_id, t.amount_paid,
           t.id_mail_sent_at, t.paid_mail_sent_at,
           count(m.id)::int as member_count,
           coalesce(string_agg(m.name, '; ' order by m.is_leader desc, m.id), '') as members
    from teams t left join members m on m.team_id = t.id
    group by t.id order by t.name`;

  if (new URL(req.url).searchParams.get("format") === "csv") {
    const head = ["team_code", "team_name", "leader_email", "members_count", "members", "status", "amount_inr", "payment_id", "paid_at"];
    const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      head.join(","),
      ...rows.map((r) =>
        [r.team_code, r.name, r.leader_email, r.member_count, r.members, r.status, r.amount_paid ? r.amount_paid / 100 : "", r.payment_id, r.paid_at?.toISOString()]
          .map(cell)
          .join(","),
      ),
    ].join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="hacksprint-finalists-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return Response.json({ teams: rows }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrors(handleGET);

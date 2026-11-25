import { withErrors } from "@/lib/finalist/http";
import { isDemoDb, store } from "@/lib/finalist/db";
import { isAdmin } from "@/lib/finalist/session";

/* GET /api/admin/teams            → JSON list
   GET /api/admin/teams?format=csv → CSV download */
async function handleGET(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await store().listTeams();

  if (new URL(req.url).searchParams.get("format") === "csv") {
    const head = ["team_code", "team_name", "leader_email", "members_count", "members", "status", "amount_inr", "payment_id", "paid_at"];
    const cell = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [
      head.join(","),
      ...rows.map((r) =>
        [r.team_code, r.name, r.leader_email, r.member_count, r.members, r.status, r.amount_paid ? r.amount_paid / 100 : "", r.payment_id, r.paid_at ? new Date(r.paid_at).toISOString() : ""]
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

  return Response.json({ teams: rows, demo: isDemoDb() }, { headers: { "Cache-Control": "no-store" } });
}

export const GET = withErrors(handleGET);

import { getMembers, getTeamById } from "@/lib/finalist/db";
import { readPassToken } from "@/lib/finalist/tokens";

/* Public: gate volunteers scan the entry-pass QR → this says if the team is valid & paid. */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("t") ?? "";
  const data = readPassToken(token);
  const team = data ? await getTeamById(data.t) : null;
  if (!team) return Response.json({ valid: false }, { status: 404, headers: { "Cache-Control": "no-store" } });

  const members = await getMembers(team.id);
  return Response.json(
    {
      valid: team.status === "paid",
      team: { code: team.team_code, name: team.name, status: team.status, paidAt: team.paid_at },
      members: members.map((m) => ({ name: m.name, isLeader: m.is_leader })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

import { withErrors } from "@/lib/finalist/http";
import { amountForMembers, FEE_PER_MEMBER_INR } from "@/lib/finalist/config";
import { getMembers } from "@/lib/finalist/db";
import { teamPasses } from "@/lib/finalist/passes";
import { currentMemberId, currentTeam } from "@/lib/finalist/session";

/* Dashboard data for the logged-in team. Entry passes (one per member) only once the team has paid. */
async function handleGET() {
  const team = await currentTeam();
  if (!team) return Response.json({ error: "Not logged in" }, { status: 401 });

  const members = await getMembers(team.id);
  const meId = await currentMemberId();
  const paid = team.status === "paid";
  const passes = paid ? await teamPasses(team, members) : null;

  return Response.json(
    {
      team: {
        code: team.team_code,
        name: team.name,
        status: team.status,
        paidAt: team.paid_at,
        paymentId: team.payment_id,
        amountPaid: team.amount_paid ? team.amount_paid / 100 : null,
      },
      members: members.map((m, i) => ({
        name: m.name,
        isLeader: m.is_leader,
        isYou: m.id === meId,
        checkedInAt: m.checked_in_at ? new Date(m.checked_in_at).toISOString() : null,
        pass: passes?.[i] ?? null,
      })),
      you: members.find((m) => m.id === meId)?.name ?? null,
      feePerMember: FEE_PER_MEMBER_INR,
      amountDue: amountForMembers(members.length),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export const GET = withErrors(handleGET);

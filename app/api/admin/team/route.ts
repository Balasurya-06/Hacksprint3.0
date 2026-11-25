import { withErrors } from "@/lib/finalist/http";
import { getMembers, getTeamById, store } from "@/lib/finalist/db";
import { isAdmin } from "@/lib/finalist/session";
import { createTeam, MAX_MEMBERS, MIN_MEMBERS, validateTeam, type NewMember } from "@/lib/finalist/teams";

type Body =
  | { action: "create"; name: string; members: NewMember[] }
  | { action: "addMember"; teamId: number; name: string; email?: string }
  | { action: "removeMember"; memberId: number }
  | { action: "delete"; teamId: number };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bad = (error: string, status = 400) => Response.json({ error }, { status });

/* Manual team management from the admin dashboard. Paid teams are locked (the fee depends on member count). */
async function handlePOST(req: Request) {
  if (!(await isAdmin())) return bad("Unauthorized", 401);
  const body = (await req.json().catch(() => ({}))) as Body;
  const db = store();

  switch (body.action) {
    case "create": {
      const t = { name: body.name ?? "", members: body.members ?? [] };
      const problems = validateTeam(t);
      if (problems.length) return bad(problems.join(" · "));
      const team = await createTeam(t);
      if (!team) return bad(`A team named "${t.name}" already exists.`, 409);
      return Response.json({ ok: true, code: team.team_code, name: team.name });
    }

    case "addMember": {
      const team = await getTeamById(Number(body.teamId));
      if (!team) return bad("Team not found", 404);
      if (team.status === "paid") return bad("This team has already paid. Members can't be changed.");
      const name = body.name?.trim();
      const email = body.email?.trim().toLowerCase() || null;
      if (!name) return bad("Member name is required");
      if (email && !EMAIL.test(email)) return bad(`Invalid email: ${email}`);
      const members = await getMembers(team.id);
      if (members.length >= MAX_MEMBERS) return bad(`A team can have at most ${MAX_MEMBERS} members.`);
      await db.addMember(team.id, name, email);
      return Response.json({ ok: true });
    }

    case "removeMember": {
      const member = await db.getMember(Number(body.memberId));
      if (!member) return bad("Member not found", 404);
      const team = await getTeamById(member.team_id);
      if (team?.status === "paid") return bad("This team has already paid. Members can't be changed.");
      if (member.is_leader) return bad("The team leader can't be removed (their email is used for login).");
      const members = await getMembers(member.team_id);
      if (members.length <= MIN_MEMBERS) return bad(`A team needs at least ${MIN_MEMBERS} members.`);
      await db.removeMember(member.id);
      return Response.json({ ok: true });
    }

    case "delete": {
      const team = await getTeamById(Number(body.teamId));
      if (!team) return bad("Team not found", 404);
      if (team.status === "paid") return bad("This team has already paid and can't be deleted.");
      await db.deleteTeam(team.id);
      return Response.json({ ok: true });
    }

    default:
      return bad("Unknown action");
  }
}

export const POST = withErrors(handlePOST);

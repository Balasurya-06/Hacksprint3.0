import { withErrors } from "@/lib/finalist/http";
import { getMembers, getTeamById, store } from "@/lib/finalist/db";
import { sendShortlistMail } from "@/lib/finalist/mail";
import { sendPaidMailSafely } from "@/lib/finalist/payments";
import { isAdmin } from "@/lib/finalist/session";

const BATCH = 20; // keep each request short; the admin page loops until done

/* POST { kind: "shortlist", all: true }        → mail Team IDs to the next batch of un-notified teams
   POST { kind: "shortlist" | "paid", teamId }   → (re)send one mail to one team */
async function handlePOST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { kind, teamId, all } = (await req.json().catch(() => ({}))) as { kind?: string; teamId?: number; all?: boolean };
  const db = store();

  if (kind === "shortlist" && all) {
    const teams = await db.teamsWithoutIdMail(BATCH);
    const failed: string[] = [];
    for (const team of teams) {
      try {
        await sendShortlistMail(team, await getMembers(team.id));
        await db.setMailSent(team.id, "id");
      } catch (err) {
        console.error(`[finalist] shortlist mail failed for ${team.team_code}`, err);
        failed.push(team.team_code);
      }
    }
    return Response.json({ sent: teams.length - failed.length, failed, remaining: await db.countWithoutIdMail() });
  }

  if (!teamId) return Response.json({ error: "teamId required" }, { status: 400 });
  const team = await getTeamById(teamId);
  if (!team) return Response.json({ error: "Team not found" }, { status: 404 });

  if (kind === "shortlist") {
    await sendShortlistMail(team, await getMembers(team.id));
    await db.setMailSent(team.id, "id");
    return Response.json({ ok: true });
  }
  if (kind === "paid") {
    if (team.status !== "paid") return Response.json({ error: "Team has not paid" }, { status: 400 });
    await sendPaidMailSafely(team);
    return Response.json({ ok: true });
  }
  return Response.json({ error: "Unknown kind" }, { status: 400 });
}

export const POST = withErrors(handlePOST);

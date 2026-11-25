import { withErrors } from "@/lib/finalist/http";
import { store } from "@/lib/finalist/db";
import { isAdmin } from "@/lib/finalist/session";
import { createTeam, teamsFromCsv, validateTeam } from "@/lib/finalist/teams";

/* POST { csv: "<file text>", dryRun: true }  → preview: parsed teams + problems, nothing saved
   POST { csv: "<file text>" }                → import valid teams (existing team names are skipped) */
async function handlePOST(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { csv, dryRun } = (await req.json().catch(() => ({}))) as { csv?: string; dryRun?: boolean };
  if (!csv?.trim()) return Response.json({ error: "Choose a CSV file first." }, { status: 400 });
  if (csv.length > 2_000_000) return Response.json({ error: "CSV is too large (max 2 MB)." }, { status: 400 });

  let teams;
  try {
    teams = teamsFromCsv(csv);
  } catch (err) {
    return Response.json({ error: (err as Error).message }, { status: 400 });
  }

  const rows = [];
  for (const t of teams) {
    const problems = validateTeam(t);
    const exists = !!(await store().getTeamByName(t.name));
    rows.push({ team: t, problems, exists });
  }

  if (dryRun) {
    return Response.json({
      preview: rows.map((r) => ({
        name: r.team.name,
        members: r.team.members,
        problems: r.problems,
        status: r.problems.length ? "error" : r.exists ? "exists" : "new",
      })),
    });
  }

  const created: { name: string; code: string }[] = [];
  let skipped = 0;
  const failed: { name: string; problems: string[] }[] = [];
  for (const r of rows) {
    if (r.problems.length) { failed.push({ name: r.team.name, problems: r.problems }); continue; }
    if (r.exists) { skipped++; continue; }
    const team = await createTeam(r.team);
    if (team) created.push({ name: team.name, code: team.team_code });
    else skipped++;
  }
  return Response.json({ created, skipped, failed });
}

export const POST = withErrors(handlePOST);

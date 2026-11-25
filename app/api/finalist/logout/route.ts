import { clearTeamSession } from "@/lib/finalist/session";

export async function POST() {
  await clearTeamSession();
  return Response.json({ ok: true });
}

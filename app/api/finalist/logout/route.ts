import { withErrors } from "@/lib/finalist/http";
import { clearTeamSession } from "@/lib/finalist/session";

async function handlePOST() {
  await clearTeamSession();
  return Response.json({ ok: true });
}

export const POST = withErrors(handlePOST);

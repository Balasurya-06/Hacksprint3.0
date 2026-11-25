import { requireEnv } from "@/lib/finalist/config";
import { setAdminSession } from "@/lib/finalist/session";
import { safeEqual } from "@/lib/finalist/tokens";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  if (!password || !safeEqual(password, requireEnv("ADMIN_PASSWORD"))) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }
  await setAdminSession();
  return Response.json({ ok: true });
}

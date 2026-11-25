import { createHmac, timingSafeEqual } from "node:crypto";
import { requireEnv } from "./config";

/* Small HMAC-signed tokens: "<payload>.<sig>" with base64url payload.
   Used for the team session cookie, the admin cookie and the entry-pass QR. */

function sign(data: string, purpose: string) {
  return createHmac("sha256", requireEnv("SESSION_SECRET")).update(`${purpose}:${data}`).digest("base64url");
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function makeToken(payload: Record<string, unknown>, purpose: string) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body, purpose)}`;
}

export function readToken<T extends Record<string, unknown>>(token: string | undefined, purpose: string): T | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig || !safeEqual(sig, sign(body, purpose))) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as T & { exp?: number };
    if (typeof data.exp === "number" && data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function hashCode(teamId: number, email: string, code: string) {
  return createHmac("sha256", requireEnv("SESSION_SECRET")).update(`otp:${teamId}:${email.toLowerCase()}:${code}`).digest("hex");
}

/* Entry-pass QR token: never expires, but only verifies for teams that are paid. */
export const passToken = (teamId: number) => makeToken({ t: teamId }, "pass");
export const readPassToken = (token: string) => readToken<{ t: number }>(token, "pass");

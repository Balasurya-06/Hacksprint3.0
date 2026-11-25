/* Shared settings for the finalist portal. */

export const FEE_PER_MEMBER_INR = Number(process.env.FINALIST_FEE_PER_MEMBER ?? 300);
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.hacksprint.tech").replace(/\/$/, "");
export const EVENT_VENUE = "KAHE, Coimbatore";
export const EVENT_DATES = "Feb 5–6, 2027";

export function amountForMembers(count: number) {
  return count * FEE_PER_MEMBER_INR; // rupees
}

export function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

import { createHmac } from "node:crypto";
import { requireEnv } from "./config";
import { safeEqual } from "./tokens";

/* Minimal Razorpay client over the REST API (no SDK needed). */

function auth() {
  return "Basic " + Buffer.from(`${requireEnv("RAZORPAY_KEY_ID")}:${requireEnv("RAZORPAY_KEY_SECRET")}`).toString("base64");
}

export type RazorpayOrder = { id: string; amount: number; currency: string; status: string; receipt: string };

export async function createOrder(amountPaise: number, receipt: string, notes: Record<string, string>) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: auth(), "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountPaise, currency: "INR", receipt: receipt.slice(0, 40), notes }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Razorpay order failed: ${res.status} ${await res.text()}`);
  return (await res.json()) as RazorpayOrder;
}

/** Signature returned to the browser by Checkout after a successful payment. */
export function verifyCheckoutSignature(orderId: string, paymentId: string, signature: string) {
  const expected = createHmac("sha256", requireEnv("RAZORPAY_KEY_SECRET")).update(`${orderId}|${paymentId}`).digest("hex");
  return safeEqual(expected, signature);
}

/** X-Razorpay-Signature header on webhooks (HMAC of the raw body with the webhook secret). */
export function verifyWebhookSignature(rawBody: string, signature: string) {
  const expected = createHmac("sha256", requireEnv("RAZORPAY_WEBHOOK_SECRET")).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}

import { db, getMembers, type TeamRow } from "./db";
import { sendPaymentSuccessMail } from "./mail";

/**
 * Mark an order as paid. Safe to call many times (checkout callback AND webhook):
 * only the first call flips the team to "paid" and sends the confirmation mail.
 */
export async function markOrderPaid(orderId: string, paymentId: string, amountPaise?: number) {
  const sql = db();

  const team = await sql.begin(async (tx) => {
    const [order] = await tx<{ team_id: number; amount: number; status: string }[]>`
      select team_id, amount, status from payments where order_id = ${orderId} for update`;
    if (!order) return null;
    if (amountPaise !== undefined && amountPaise !== order.amount) {
      throw new Error(`Amount mismatch for ${orderId}: got ${amountPaise}, expected ${order.amount}`);
    }
    if (order.status !== "paid") {
      await tx`update payments set status = 'paid', payment_id = ${paymentId}, paid_at = now() where order_id = ${orderId}`;
    }
    const [updated] = await tx<TeamRow[]>`
      update teams set status = 'paid', paid_at = now(), payment_id = ${paymentId}, amount_paid = ${order.amount}
      where id = ${order.team_id} and status <> 'paid'
      returning *`;
    return updated ?? null; // null → team was already paid
  });

  if (team) await sendPaidMailSafely(team);
  return team;
}

export async function sendPaidMailSafely(team: TeamRow) {
  try {
    await sendPaymentSuccessMail(team, await getMembers(team.id));
    await db()`update teams set paid_mail_sent_at = now() where id = ${team.id}`;
  } catch (err) {
    // Payment is already recorded; the admin page can resend the mail.
    console.error(`[finalist] confirmation mail failed for team ${team.team_code}`, err);
  }
}

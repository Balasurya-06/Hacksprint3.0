import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";
import qrcode from "qrcode-generator";
import { EVENT_DATES, EVENT_VENUE, SITE_URL, requireEnv } from "./config";
import type { MemberRow, TeamRow } from "./db";
import { passToken } from "./tokens";

/* Any SMTP works: Gmail (app password), Brevo, Amazon SES, Zoho, Resend SMTP...
   Gmail free accounts allow ~500 mails/day, which covers 400 teams. */
let transporter: Transporter | null = null;

/** Local dev without SMTP: mails are printed in the terminal instead of sent. */
export const isDevMail = () => !process.env.SMTP_HOST && process.env.NODE_ENV !== "production";

function mailer() {
  if (!transporter && isDevMail()) {
    /* Local dev without SMTP: don't send, print the mail in the `npm run dev` terminal. */
    const dev = nodemailer.createTransport({ jsonTransport: true });
    transporter = {
      sendMail: async (opts: SendMailOptions) => {
        console.log(
          `\n📧 [dev mail, not sent] to: ${opts.to}${opts.cc && String(opts.cc) ? ` cc: ${opts.cc}` : ""}\n   subject: ${opts.subject}\n   ${opts.text}\n`,
        );
        return dev.sendMail(opts);
      },
    } as unknown as Transporter;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: requireEnv("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: { user: requireEnv("SMTP_USER"), pass: requireEnv("SMTP_PASS") },
    });
  }
  return transporter;
}

const FROM = () => process.env.MAIL_FROM || `HackSprint 3.0 <${process.env.SMTP_USER}>`;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#0b0b0d;font-family:Arial,Helvetica,sans-serif;color:#f4eee4">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <div style="font-size:12px;letter-spacing:3px;color:#ff3b30;font-weight:bold">HACKSPRINT 3.0</div>
    <h1 style="font-size:26px;margin:10px 0 20px;color:#ffffff">${title}</h1>
    ${body}
    <p style="margin-top:32px;font-size:12px;color:#6f6a67">HackSprint 3.0 · ${EVENT_VENUE} · ${EVENT_DATES}<br>
    Questions? Reply to this mail or write to hacksprint.official@gmail.com</p>
  </div></body></html>`;
}

function memberList(members: MemberRow[]) {
  return `<ul style="padding-left:18px;line-height:1.8;color:#f4eee4">${members
    .map((m) => `<li>${esc(m.name)}${m.is_leader ? " <span style='color:#ff7a70'>(Leader)</span>" : ""}</li>`)
    .join("")}</ul>`;
}

const ccEmails = (team: TeamRow, members: MemberRow[]) =>
  [...new Set(members.map((m) => m.email?.trim().toLowerCase()).filter((e): e is string => !!e && e !== team.leader_email.toLowerCase()))];

/* ── 1. Login code ── */
export async function sendLoginCode(team: TeamRow, code: string) {
  await mailer().sendMail({
    from: FROM(),
    to: team.leader_email,
    subject: `${code} is your HackSprint 3.0 login code`,
    text: `Your login code for team ${team.name} (${team.team_code}) is ${code}. It expires in 10 minutes.`,
    html: shell(
      "Your login code",
      `<p>Use this code to log in to the finalist dashboard for <b>${esc(team.name)}</b>:</p>
       <div style="font-size:34px;letter-spacing:10px;font-weight:bold;background:#151515;border:1px solid #333;border-radius:10px;padding:16px;text-align:center;color:#fff">${code}</div>
       <p style="color:#a9a4a0">It expires in 10 minutes. If you didn't try to log in, you can ignore this mail.</p>`,
    ),
  });
}

/* ── 2. Shortlisted + team ID ── */
export async function sendShortlistMail(team: TeamRow, members: MemberRow[]) {
  const fee = members.length * Number(process.env.FINALIST_FEE_PER_MEMBER ?? 300);
  await mailer().sendMail({
    from: FROM(),
    to: team.leader_email,
    cc: ccEmails(team, members),
    subject: `🎉 ${team.name} is shortlisted for the HackSprint 3.0 Grand Finale`,
    text: `Congratulations! Team ${team.name} is shortlisted for the HackSprint 3.0 finals. Your Team ID: ${team.team_code}. Log in at ${SITE_URL}/finalist to pay the finale fee (₹${fee}) and download your entry pass.`,
    html: shell(
      "You're in the Grand Finale! 🎉",
      `<p>Congratulations, team <b>${esc(team.name)}</b> has been shortlisted for the HackSprint 3.0 finals.</p>
       <p style="margin:18px 0 6px;color:#a9a4a0">Your Team ID</p>
       <div style="font-size:24px;font-weight:bold;font-family:monospace;background:#151515;border:1px solid #333;border-radius:10px;padding:14px;text-align:center;color:#fff">${esc(team.team_code)}</div>
       <p style="margin-top:18px">Team members:</p>${memberList(members)}
       <p>Next step: log in with your Team ID, pay the finale fee of <b>₹${fee}</b> (₹300 × ${members.length} members) and download your entry pass.</p>
       <p style="margin:24px 0"><a href="${SITE_URL}/finalist" style="background:#e5191f;color:#fff;padding:14px 26px;border-radius:10px;text-decoration:none;font-weight:bold">Open finalist dashboard →</a></p>`,
    ),
  });
}

/* ── 3. Payment success ── */
export async function sendPaymentSuccessMail(team: TeamRow, members: MemberRow[]) {
  const qr = qrcode(0, "M");
  qr.addData(`${SITE_URL}/finalist/verify?t=${passToken(team.id)}`);
  qr.make();
  const gif = Buffer.from(qr.createDataURL(8, 4).split(",")[1], "base64");
  const amount = ((team.amount_paid ?? 0) / 100).toLocaleString("en-IN");

  await mailer().sendMail({
    from: FROM(),
    to: team.leader_email,
    cc: ccEmails(team, members),
    subject: `✅ Payment received: ${team.name} is confirmed for HackSprint 3.0`,
    text: `Payment of ₹${amount} received for team ${team.name} (${team.team_code}). Payment ID: ${team.payment_id}. Download your entry pass at ${SITE_URL}/finalist/dashboard and show the QR at the venue.`,
    html: shell(
      "Payment successful ✅",
      `<p>We've received the finale fee for team <b>${esc(team.name)}</b>. Your spot is confirmed!</p>
       <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px">
         <tr><td style="padding:8px 0;color:#a9a4a0">Team ID</td><td style="text-align:right;font-family:monospace">${esc(team.team_code)}</td></tr>
         <tr><td style="padding:8px 0;color:#a9a4a0">Members</td><td style="text-align:right">${members.length}</td></tr>
         <tr><td style="padding:8px 0;color:#a9a4a0">Amount paid</td><td style="text-align:right"><b>₹${amount}</b></td></tr>
         <tr><td style="padding:8px 0;color:#a9a4a0">Payment ID</td><td style="text-align:right;font-family:monospace">${esc(team.payment_id ?? "")}</td></tr>
       </table>
       <p>Team members:</p>${memberList(members)}
       <p>Show this QR at the venue entry:</p>
       <div style="background:#fff;display:inline-block;padding:10px;border-radius:10px"><img src="cid:passqr" width="200" height="200" alt="Entry QR"></div>
       <p style="margin:24px 0"><a href="${SITE_URL}/finalist/dashboard" style="background:#e5191f;color:#fff;padding:14px 26px;border-radius:10px;text-decoration:none;font-weight:bold">Download entry pass →</a></p>`,
    ),
    attachments: [{ filename: "entry-qr.gif", content: gif, cid: "passqr" }],
  });
}

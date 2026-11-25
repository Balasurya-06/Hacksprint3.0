-- HackSprint 3.0 — Finalist portal schema (PostgreSQL: Supabase / Neon / any Postgres)
-- Run once:  psql "$DATABASE_URL" -f db/schema.sql   (or paste into the Supabase SQL editor)

create table if not exists teams (
  id              serial primary key,
  team_code       text not null unique,          -- e.g. VIGRON.K7Q2 (what teams log in with)
  name            text not null,
  leader_email    text not null,
  status          text not null default 'shortlisted' check (status in ('shortlisted', 'paid')),
  paid_at         timestamptz,
  payment_id      text,
  amount_paid     integer,                       -- in paise
  id_mail_sent_at timestamptz,                   -- "you're shortlisted, here is your team ID" mail
  paid_mail_sent_at timestamptz,                 -- payment confirmation mail
  created_at      timestamptz not null default now()
);

create table if not exists members (
  id         serial primary key,
  team_id    integer not null references teams(id) on delete cascade,
  name       text not null,
  email      text not null,               -- each member can log in with this email
  is_leader  boolean not null default false
);
create index if not exists members_team_idx on members(team_id);

create table if not exists payments (
  id          serial primary key,
  team_id     integer not null references teams(id) on delete cascade,
  order_id    text not null unique,              -- Razorpay order_xxx
  payment_id  text,                              -- Razorpay pay_xxx
  amount      integer not null,                  -- in paise
  status      text not null default 'created' check (status in ('created', 'paid', 'failed')),
  created_at  timestamptz not null default now(),
  paid_at     timestamptz
);
create index if not exists payments_team_idx on payments(team_id);

-- One-time login codes, per team member email (any member can log in with their own email)
create table if not exists login_codes (
  team_id     integer not null references teams(id) on delete cascade,
  email       text not null,
  code_hash   text not null,
  expires_at  timestamptz not null,
  attempts    integer not null default 0,
  sent_at     timestamptz not null default now(),
  primary key (team_id, email)
);

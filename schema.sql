-- Neon Postgres schema for Ads Decision Intelligence

create table if not exists users (
  id text primary key,
  email text not null,
  password_hash text,
  role text not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists users_email_unique on users (lower(email));

create table if not exists goals (
  user_id text primary key references users(id) on delete cascade,
  inputs jsonb not null,
  targets jsonb not null,
  current jsonb not null,
  saved_at timestamptz not null default now()
);

create table if not exists rules_config (
  id int primary key default 1,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists recommendation_templates (
  id text primary key,
  title text not null,
  bullets jsonb not null,
  enabled boolean not null default true,
  impact_multiplier double precision not null default 1,
  updated_at timestamptz not null default now()
);

create table if not exists sessions (
  token text primary key,
  user_id text not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists sessions_user_id_idx on sessions (user_id);

insert into rules_config (id, config)
values (
  1,
  '{"healthWeights":{"ctr":25,"cvr":30,"cpa":30,"roas":15},"severityThresholds":{"critical":0.35,"medium":0.15}}'::jsonb
)
on conflict (id) do nothing;

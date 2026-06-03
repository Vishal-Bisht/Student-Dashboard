-- Run this in the Supabase SQL Editor to set up your courses table

create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name   text not null default 'book-open',
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (anon read is fine for a demo)
alter table courses enable row level security;

create policy "Allow anon read" on courses
  for select using (true);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',     75, 'code-2'),
  ('System Design Fundamentals',  42, 'layers'),
  ('TypeScript Deep Dive',        88, 'file-code-2'),
  ('Database Engineering',        31, 'database');

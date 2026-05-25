-- Gafferly initial pilot schema draft.
-- Review RLS, form intake, retention and private-media controls before handling live customer data.
create extension if not exists pgcrypto;

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.organisation_users (
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'staff', 'support')),
  created_at timestamptz not null default now(),
  primary key (organisation_id, user_id)
);

create table public.storefronts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  business_name text not null,
  tagline text,
  service_area text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (organisation_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  postcode text not null,
  job_type text not null,
  property_details jsonb not null default '{}'::jsonb,
  requested_add_ons text[] not null default '{}',
  notes text,
  status text not null default 'new' check (status in ('new','reviewing','quote_draft','quoted','accepted','deposit_paid','lost','expired','cancelled','refunded')),
  created_at timestamptz not null default now()
);

create table public.enquiry_photos (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  storage_path text not null,
  mime_type text not null,
  created_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft','sent','viewed','accepted','abandoned','expired','superseded','cancelled')),
  current_version integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.quote_versions (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  quote_id uuid not null references public.quotes(id) on delete cascade,
  version_number integer not null,
  total_pence integer not null check (total_pence >= 0),
  deposit_pence integer not null check (deposit_pence >= 0 and deposit_pence <= total_pence),
  validity_date date not null,
  notes text,
  public_token uuid not null default gen_random_uuid() unique,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  unique (quote_id, version_number)
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  quote_version_id uuid not null references public.quote_versions(id) on delete cascade,
  description text not null,
  quantity numeric(10,2) not null default 1,
  unit_price_pence integer not null check (unit_price_pence >= 0),
  created_at timestamptz not null default now()
);

create table public.quote_acceptances (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  quote_version_id uuid not null references public.quote_versions(id) on delete restrict,
  accepted_at timestamptz not null default now(),
  terms_snapshot text not null,
  customer_ip_hash text,
  unique (quote_version_id)
);

create table public.payment_records (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  quote_version_id uuid not null references public.quote_versions(id) on delete restrict,
  stripe_checkout_session_id text unique,
  amount_pence integer not null check (amount_pence >= 0),
  status text not null default 'created' check (status in ('created','pending','succeeded','failed','partially_refunded','refunded','disputed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(target_org_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.organisation_users ou
    where ou.organisation_id = target_org_id and ou.user_id = auth.uid()
  );
$$;

alter table public.organisations enable row level security;
alter table public.organisation_users enable row level security;
alter table public.storefronts enable row level security;
alter table public.services enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_photos enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_versions enable row level security;
alter table public.quote_items enable row level security;
alter table public.quote_acceptances enable row level security;
alter table public.payment_records enable row level security;
alter table public.audit_events enable row level security;

create policy "members read their organisation" on public.organisations for select to authenticated using (public.is_org_member(id));
create policy "members read organisation memberships" on public.organisation_users for select to authenticated using (public.is_org_member(organisation_id));
create policy "published storefronts are public" on public.storefronts for select to anon, authenticated using (is_published = true or public.is_org_member(organisation_id));
create policy "published services are public" on public.services for select to anon, authenticated using (is_active = true and exists (select 1 from public.storefronts s where s.organisation_id = services.organisation_id and s.is_published = true) or public.is_org_member(organisation_id));

-- Organisation member operations. Add role-specific write restrictions before production use.
do $$
declare tbl text;
begin
  foreach tbl in array array['storefronts','services','enquiries','enquiry_photos','quotes','quote_versions','quote_items','quote_acceptances','payment_records','audit_events'] loop
    execute format('create policy "members read %1$s" on public.%1$I for select to authenticated using (public.is_org_member(organisation_id))', tbl);
    execute format('create policy "members insert %1$s" on public.%1$I for insert to authenticated with check (public.is_org_member(organisation_id))', tbl);
    execute format('create policy "members update %1$s" on public.%1$I for update to authenticated using (public.is_org_member(organisation_id)) with check (public.is_org_member(organisation_id))', tbl);
  end loop;
end $$;

-- No anonymous enquiry or storage insert policy is supplied in this prototype.
-- Customer intake must be designed via a validated/rate-limited server endpoint with private media controls.

-- Optional demo seed after creating an authenticated user and substituting its UUID.
insert into public.organisations (id, name, slug)
values ('10000000-0000-0000-0000-000000000001', 'BrightWash Exterior Cleaning', 'brightwash')
on conflict do nothing;

insert into public.storefronts (organisation_id, business_name, tagline, service_area, is_published)
values ('10000000-0000-0000-0000-000000000001', 'BrightWash Exterior Cleaning', 'Driveways and patios professionally cleaned.', 'Bristol and surrounding areas', true)
on conflict do nothing;

insert into public.services (organisation_id, name, description) values
('10000000-0000-0000-0000-000000000001', 'Driveway pressure washing', 'Block paving, concrete and resin drives'),
('10000000-0000-0000-0000-000000000001', 'Patio cleaning', 'Slabs, stone and paths'),
('10000000-0000-0000-0000-000000000001', 'Re-sanding', 'Optional after block-paving cleaning');

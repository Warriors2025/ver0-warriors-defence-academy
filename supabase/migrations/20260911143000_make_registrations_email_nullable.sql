-- Email is optional on the public registration form
ALTER TABLE public.registrations
  ALTER COLUMN email DROP NOT NULL;

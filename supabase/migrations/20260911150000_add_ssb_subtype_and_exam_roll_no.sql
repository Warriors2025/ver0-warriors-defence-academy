-- SSB interview subtype (NDA / CDS / AFCAT) and written-exam roll number
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS ssb_subtype text,
  ADD COLUMN IF NOT EXISTS exam_roll_no text;

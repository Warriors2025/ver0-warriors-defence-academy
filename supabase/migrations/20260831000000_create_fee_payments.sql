-- Fee payment submissions from the public form
CREATE TABLE IF NOT EXISTS public.fee_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text NOT NULL UNIQUE,
  student_name text NOT NULL,
  reg_no text,
  father_name text NOT NULL,
  course text NOT NULL,
  course_validity text,
  amount integer NOT NULL CHECK (amount > 0),
  payment_date date NOT NULL,
  contact_number text NOT NULL,
  screenshot_path text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status = ANY (ARRAY['pending'::text, 'verified'::text, 'rejected'::text])),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS fee_payments_created_at_idx ON public.fee_payments (created_at DESC);
CREATE INDEX IF NOT EXISTS fee_payments_status_idx ON public.fee_payments (status);
CREATE INDEX IF NOT EXISTS fee_payments_contact_idx ON public.fee_payments (contact_number);

ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.fee_payments FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.fee_payments TO postgres, service_role;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'fee-screenshots',
  'fee-screenshots',
  false,
  8388608,
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

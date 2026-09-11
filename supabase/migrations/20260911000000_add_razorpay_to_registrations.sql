-- Adds Razorpay seat-booking payment tracking to the public registration form.
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status = ANY (ARRAY['pending'::text, 'paid'::text, 'failed'::text])),
  ADD COLUMN IF NOT EXISTS amount integer,
  ADD COLUMN IF NOT EXISTS razorpay_order_id text,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
  ADD COLUMN IF NOT EXISTS receipt_no text;

CREATE INDEX IF NOT EXISTS registrations_razorpay_order_id_idx ON public.registrations (razorpay_order_id);
CREATE INDEX IF NOT EXISTS registrations_payment_status_idx ON public.registrations (payment_status);

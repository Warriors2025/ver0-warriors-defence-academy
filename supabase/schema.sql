-- ============================================================
-- Warriors Defence Academy — Supabase Schema
-- Applied via Supabase MCP migration: initial_schema
-- ============================================================

-- ── Site Content (CMS) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  id           INTEGER PRIMARY KEY DEFAULT 1,
  announcement JSONB NOT NULL DEFAULT '{"text":"Admissions Open for 2026–27 Batch","phone":"+91 94522 45729"}',
  hero         JSONB NOT NULL DEFAULT '{"badge":"India''s Premier Defence Academy","headline":"Shape India''s Future","highlightText":"Defence Officer","tagline":"Join the ranks of India''s finest military officers. Expert coaching for NDA, CDS, AFCAT, SSB and more.","features":["NDA • CDS • AFCAT coaching","SSB interview training","Physical fitness programs","Expert retired officer faculty"],"stats":[{"value":"50,000+","label":"Students Trained"},{"value":"5,000+","label":"Selections"},{"value":"15+","label":"Years"},{"value":"200+","label":"Mentors"}]}',
  contact      JSONB NOT NULL DEFAULT '{"phone1":"+91 94522 45729","phone2":"+91 70810 11964","email":"info@warriorsdefenceacademy.com","address":"545-Ga/1 Chha, Near Kapoorthala Chauraha, Beside Raidas Railway Crossing, Lucknow - 226024","facebook":"https://www.facebook.com/WarriorsDefenceAcademyLko","instagram":"https://www.instagram.com/warriorsdefenceacademy_/","youtube":"https://www.youtube.com/@WarriorsDefenceAcademy"}',
  stats        JSONB NOT NULL DEFAULT '[{"value":"50,000+","label":"Students Trained","description":"From across India"},{"value":"5,000+","label":"Successful Selections","description":"In Armed Forces"},{"value":"200+","label":"Expert Mentors","description":"Retired officers"},{"value":"15+","label":"Years Experience","description":"Of excellence"}]',
  sections     JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO site_content (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- ── Contact Submissions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  course     TEXT,
  message    TEXT NOT NULL,
  ticket_id  TEXT UNIQUE NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Student Registrations ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS registrations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id       TEXT UNIQUE NOT NULL,
  first_name            TEXT NOT NULL,
  last_name             TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  course                TEXT NOT NULL,
  date_of_birth         TEXT NOT NULL,
  gender                TEXT,
  address               TEXT,
  city                  TEXT,
  state                 TEXT,
  pincode               TEXT,
  batch_type            TEXT,
  preferred_batch       TEXT,
  hostel_required       BOOLEAN DEFAULT false,
  highest_qualification TEXT,
  board                 TEXT,
  passing_year          TEXT,
  percentage            TEXT,
  school_name           TEXT,
  status                TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'rejected')),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ── Blog Posts ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     TEXT DEFAULT 'general',
  tags         TEXT[] DEFAULT '{}',
  image_url    TEXT,
  author       TEXT DEFAULT 'Warriors Defence Academy',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Gallery Images ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      TEXT NOT NULL,
  alt        TEXT NOT NULL,
  image_url  TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Results / Selections ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS results (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  rank         TEXT,
  exam         TEXT NOT NULL,
  batch_year   TEXT,
  branch       TEXT,
  image_url    TEXT,
  is_featured  BOOLEAN DEFAULT false,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Courses (CMS) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  duration    TEXT,
  students    TEXT,
  rating      NUMERIC(2,1) DEFAULT 4.8,
  badge       TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Mentors ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mentors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT,
  expertise TEXT,
  experience TEXT,
  branch TEXT,
  initials TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── FAQs ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── Testimonials ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  achievement TEXT,
  course TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── updated_at trigger ────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = pg_catalog.now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE site_content        ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images      ENABLE ROW LEVEL SECURITY;
ALTER TABLE results             ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors             ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs                ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials        ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_site_content" ON site_content
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_insert_contact" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "public_insert_registrations" ON registrations
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "public_read_published_posts" ON blog_posts
  FOR SELECT TO anon, authenticated USING (is_published = true);

CREATE POLICY "public_read_active_gallery" ON gallery_images
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "public_read_results" ON results
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_active_courses" ON courses
  FOR SELECT TO anon, authenticated USING (is_active = true);

-- ── API role grants ───────────────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON site_content TO anon, authenticated;
GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT INSERT ON registrations TO anon, authenticated;
GRANT SELECT ON blog_posts TO anon, authenticated;
GRANT SELECT ON gallery_images TO anon, authenticated;
GRANT SELECT ON results TO anon, authenticated;
GRANT SELECT ON courses TO anon, authenticated;
GRANT SELECT ON mentors TO anon, authenticated;
GRANT SELECT ON faqs TO anon, authenticated;
GRANT SELECT ON testimonials TO anon, authenticated;

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status     ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at       ON registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_status           ON registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_course           ON registrations (course);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug                ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published           ON blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category        ON gallery_images (category, sort_order);
CREATE INDEX IF NOT EXISTS idx_results_featured               ON results (is_featured, sort_order);
CREATE INDEX IF NOT EXISTS idx_courses_slug                   ON courses (slug);
CREATE INDEX IF NOT EXISTS idx_courses_active                 ON courses (is_active, sort_order);

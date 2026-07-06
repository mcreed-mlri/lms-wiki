-- ==========================================
-- LACE PLATFORM - SUPABASE SCHEMA MIGRATION
-- (Aligned with live learning_items schema)
-- Run this in your Supabase SQL Editor to initialize 
-- the proposed database tables and security policies.
-- ==========================================

-- 1. LEARNING ITEMS (Catalog table - aligned with your live schema)
CREATE TABLE IF NOT EXISTS learning_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider text NOT NULL DEFAULT 'brightspace',
  provider_course_id text UNIQUE,
  provider_module_id text,
  item_type text NOT NULL CHECK (item_type IN ('course', 'module', 'path')),
  title text NOT NULL,
  description text,
  practice_area text,
  level text,
  duration_label text,
  brightspace_url text,
  metadata jsonb NOT NULL DEFAULT '{}',
  synced_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index for searching provider mapping
CREATE INDEX IF NOT EXISTS idx_learning_items_provider_course ON learning_items(provider_course_id);

ALTER TABLE learning_items ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists and recreate
DO $$
BEGIN
  DROP POLICY IF EXISTS "Allow public catalog browse" ON learning_items;
  DROP POLICY IF EXISTS "Allow writes via sync route" ON learning_items;
END
$$;

CREATE POLICY "Allow public catalog browse"
  ON learning_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow writes via sync route"
  ON learning_items FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- 2. PROFILES (Extended user profile records)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bs_user_id bigint,
  email text,
  org text,
  license_status text,
  learning_group text,
  role text DEFAULT 'learner',
  updated_at timestamptz,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT check_role CHECK (role IN ('learner', 'manager', 'admin')),
  CONSTRAINT check_license CHECK (license_status IN ('licensed_attorney', 'paralegal', 'law_student', 'other_advocate'))
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Read own profile" ON profiles;
  DROP POLICY IF EXISTS "Update own profile" ON profiles;
  DROP POLICY IF EXISTS "Admins read all profiles" ON profiles;
END
$$;

CREATE POLICY "Read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );


-- 3. EVENTS (Engagement analytics)
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  item_id uuid REFERENCES learning_items(id) ON DELETE SET NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_metrics ON events(event_type, item_id);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Insert own events" ON events;
  DROP POLICY IF EXISTS "Read own events" ON events;
  DROP POLICY IF EXISTS "Admins/evaluators read all events" ON events;
END
$$;

CREATE POLICY "Insert own events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Read own events"
  ON events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins/evaluators read all events"
  ON events FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'manager')
  );


-- 4. FEEDBACK (Learner signals)
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  item_id uuid NOT NULL REFERENCES learning_items(id) ON DELETE CASCADE,
  rating int CHECK (rating BETWEEN 1 AND 5),
  flag text CHECK (flag IN ('outdated', 'unclear', 'not_relevant')),
  notes text,
  created_at timestamptz DEFAULT now(),

  -- One rating per user per item
  CONSTRAINT unique_user_item_feedback UNIQUE (user_id, item_id)
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Manage own feedback" ON feedback;
END
$$;

CREATE POLICY "Manage own feedback"
  ON feedback FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

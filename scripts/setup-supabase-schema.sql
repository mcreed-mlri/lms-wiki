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
  -- Content-quality flags (outdated/unclear/not_relevant) share this column
  -- with abandonment reasons from the stalled-course nudge (too_busy/too_long/
  -- need_help); values distinguish them. need_help rows surface in the
  -- Brightspace Manager needs-attention feed for human follow-up.
  flag text CHECK (flag IN ('outdated', 'unclear', 'not_relevant', 'too_busy', 'too_long', 'need_help')),
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


-- 5. SURVEY RESPONSES (Survey export landing zone)
-- One row per answered question. survey_key/question_key map to the
-- instruments in Brightspace-Manager/docs/planning/survey-instruments.md.
CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_key text NOT NULL,
  question_key text NOT NULL,
  -- Nullable: anonymous Brightspace surveys export without identity.
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  item_id uuid REFERENCES learning_items(id) ON DELETE SET NULL,
  response_value text NOT NULL,
  response_numeric int CHECK (response_numeric BETWEEN 1 AND 5),
  -- 1 = reaction, 2 = learning, 3 = application (Kirkpatrick)
  kirkpatrick_level smallint CHECK (kirkpatrick_level IN (1, 2, 3)),
  source text NOT NULL CHECK (source IN ('brightspace_export', 'followup_email', 'in_hub')),
  collected_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_survey_responses_item
  ON survey_responses(item_id, survey_key, question_key);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
-- No authenticated policies: raw survey rows are service-role only.
-- Aggregates are computed server-side with the n >= 5 suppression rule.


-- 6. ORG ROSTERS (Reach denominators — maintained by hand, ~quarterly)
CREATE TABLE IF NOT EXISTS org_rosters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org text NOT NULL,
  role text NOT NULL CHECK (role IN ('licensed_attorney', 'paralegal', 'law_student', 'other_advocate')),
  headcount int NOT NULL CHECK (headcount > 0),
  as_of date NOT NULL,
  created_at timestamptz DEFAULT now(),

  -- Keep history: new row per refresh so reach trends stay honest.
  CONSTRAINT org_rosters_snapshot_key UNIQUE (org, role, as_of)
);

ALTER TABLE org_rosters ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins read rosters" ON org_rosters;
END
$$;

CREATE POLICY "Admins read rosters"
  ON org_rosters FOR SELECT
  TO authenticated
  USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- ═══════════════════════════════════════════════════════════════════════════════
-- EXACT COLUMN NAMES VERIFICATION
-- Run these queries to get EXACT column names from both tables
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. GET ALL COLUMN NAMES FROM PROFILES TABLE
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- 2. GET ALL COLUMN NAMES FROM FORM_SUBMISSIONS TABLE
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'form_submissions'
ORDER BY ordinal_position;

-- 3. GET ALL COLUMN NAMES FROM TRANSACTIONS TABLE (if exists)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'transactions'
ORDER BY ordinal_position;

-- 4. QUICK TEST - Sample from PROFILES
SELECT * FROM profiles LIMIT 1;

-- 5. QUICK TEST - Sample from FORM_SUBMISSIONS
SELECT * FROM form_submissions LIMIT 1;


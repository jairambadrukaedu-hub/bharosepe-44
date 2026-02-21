/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MIGRATION: ADD REUSABLE FORM TEMPLATE SUPPORT
 * ═══════════════════════════════════════════════════════════════════════════════
 * Date: November 28, 2025
 * Purpose: Extend form_submissions table to support:
 *   1) Draft saving (is_draft flag)
 *   2) Reusable templates (is_template flag)
 *   3) Template naming & metadata
 *   4) Usage tracking (last_used_at)
 * 
 * This enables:
 * - Users to save form progress as drafts
 * - Users to mark completed forms as reusable templates
 * - Quick population of new forms from existing templates
 * - Form history and reuse analytics
 */

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 1: ADD NEW COLUMNS FOR TEMPLATE SUPPORT
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE form_submissions
ADD COLUMN IF NOT EXISTS is_template BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS template_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS template_category VARCHAR(100),
ADD COLUMN IF NOT EXISTS last_used_at TIMESTAMP WITH TIME ZONE;

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 2: CREATE INDEXES FOR PERFORMANCE
-- ═══════════════════════════════════════════════════════════════════════════════

-- Fast lookup of user's reusable templates by category
CREATE INDEX IF NOT EXISTS idx_form_submissions_templates 
ON form_submissions(user_id, is_template, industry_category, created_at DESC)
WHERE is_template = true;

-- Fast lookup of user's draft forms
CREATE INDEX IF NOT EXISTS idx_form_submissions_drafts 
ON form_submissions(user_id, is_draft, industry_category, updated_at DESC)
WHERE is_draft = true;

-- Seller's templates for specific product category
CREATE INDEX IF NOT EXISTS idx_form_submissions_seller_templates
ON form_submissions(seller_id, is_template, product_category, last_used_at DESC)
WHERE is_template = true AND seller_id IS NOT NULL;

-- Transaction-based lookup (primary key operation)
CREATE INDEX IF NOT EXISTS idx_form_submissions_transaction_user
ON form_submissions(transaction_id, user_id)
WHERE is_draft = true;

-- Template discovery by category
CREATE INDEX IF NOT EXISTS idx_form_submissions_template_category
ON form_submissions(user_id, template_category, is_template, updated_at DESC)
WHERE is_template = true;

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 3: ADD COMMENTS FOR DOCUMENTATION
-- ═══════════════════════════════════════════════════════════════════════════════

COMMENT ON COLUMN form_submissions.is_template IS 
'Boolean flag: true if this form is saved as a reusable template. Allows users to quickly populate new forms with previously saved data.';

COMMENT ON COLUMN form_submissions.template_name IS 
'User-friendly name for reusable template. Examples: "My iPhone 13 Listing", "Standard Electronics Form", "Business Service Template"';

COMMENT ON COLUMN form_submissions.is_draft IS 
'Boolean flag: true if form is still in progress (incomplete). Allows saving partial forms and resuming later. False = final/submitted form.';

COMMENT ON COLUMN form_submissions.template_category IS 
'Category where template is used. Copied from industry_category for faster filtering. Examples: "electronics", "furniture", "services_software"';

COMMENT ON COLUMN form_submissions.last_used_at IS 
'Timestamp when this template was last used to create a new form. Helps track popular templates and show recently-used templates first.';

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 4: DATA CONSTRAINTS & RULES
-- ═══════════════════════════════════════════════════════════════════════════════

-- Constraint: Templates cannot be drafts (final forms only)
ALTER TABLE form_submissions
ADD CONSTRAINT check_template_not_draft 
CHECK (NOT (is_template = true AND is_draft = true));

-- Constraint: Templates must have a name
ALTER TABLE form_submissions
ADD CONSTRAINT check_template_has_name 
CHECK (NOT (is_template = true AND template_name IS NULL));

-- Constraint: Template category must be set if template
ALTER TABLE form_submissions
ADD CONSTRAINT check_template_has_category 
CHECK (NOT (is_template = true AND template_category IS NULL));

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 5: POPULATE EXISTING DATA (For backward compatibility)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Set is_draft to false for all existing completed forms
UPDATE form_submissions
SET is_draft = false
WHERE form_status = 'completed' AND is_draft IS NULL;

-- Set is_draft to true for all existing draft forms
UPDATE form_submissions
SET is_draft = true
WHERE form_status = 'draft' AND is_draft IS NULL;

-- Populate template_category for forms that will become templates
UPDATE form_submissions
SET template_category = industry_category
WHERE is_template = true AND template_category IS NULL;

-- ═══════════════════════════════════════════════════════════════════════════════
-- STEP 6: VERIFICATION QUERIES (Run these to verify migration success)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Check new columns exist and have correct data types
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'form_submissions'
AND column_name IN ('is_template', 'template_name', 'is_draft', 'template_category', 'last_used_at')
ORDER BY column_name;

-- Check indexes created
SELECT 
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'form_submissions'
AND indexname LIKE 'idx_form_submissions_%';

-- Summary: Total templates and drafts in system
SELECT 
  COUNT(*) FILTER (WHERE is_template = true) as total_templates,
  COUNT(*) FILTER (WHERE is_draft = true) as total_drafts,
  COUNT(*) as total_forms
FROM form_submissions;

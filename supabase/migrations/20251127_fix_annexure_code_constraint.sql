-- ===============================================================================
-- FIX: Add missing 'E' annexure code for fashion-apparel
-- ===============================================================================
-- 
-- Issue: The form_submissions table had a constraint that excluded 'E',
-- but fashion-apparel category uses annexure code 'E'
-- 
-- Solution: Alter the constraint to include all valid annexure codes
-- A=Electronics, B=Mobile, C=Furniture, D=Vehicles, E=Fashion-apparel,
-- F=Jewellery, G=Building Materials, H=Collectibles, I=Industrial,
-- J=Books, K=Art
-- ===============================================================================

-- Drop the old constraint
ALTER TABLE form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_annexure_code_check;

-- Add the corrected constraint with all 11 annexure codes including 'E'
ALTER TABLE form_submissions 
ADD CONSTRAINT form_submissions_annexure_code_check 
CHECK (annexure_code IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'));

-- Verify the constraint is in place
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'form_submissions' AND constraint_type = 'CHECK';

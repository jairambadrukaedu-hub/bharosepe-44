/**
 * DATABASE SCHEMA MIGRATIONS - CONTRACT GENERATION SYSTEM
 * 
 * Purpose: Extend existing contracts table + create supporting tables
 * Database: Supabase PostgreSQL
 * 
 * Modifications:
 * 1. ADD columns to existing contracts table
 * 2. Create contract_form_data - User-filled form data (polymorphic)
 * 3. Create evidence_records - Photo/video evidence with integrity hashes
 * 4. Create contract_signatures - Digital signatures & acceptance
 * 5. Create dispute_records - Dispute cases & resolutions
 */

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 1: EXTEND EXISTING CONTRACTS TABLE
-- ═══════════════════════════════════════════════════════════════════

-- Add new columns to existing contracts table if they don't exist
ALTER TABLE IF EXISTS public.contracts 
ADD COLUMN IF NOT EXISTS product_category VARCHAR(50),
ADD COLUMN IF NOT EXISTS annexure_code CHAR(1),
ADD COLUMN IF NOT EXISTS contract_hash VARCHAR(64),
ADD COLUMN IF NOT EXISTS total_placeholders INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS populated_fields INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS missing_fields TEXT[],
ADD COLUMN IF NOT EXISTS seller_id UUID,
ADD COLUMN IF NOT EXISTS buyer_id UUID,
ADD COLUMN IF NOT EXISTS seller_signed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS buyer_signed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS escrow_amount DECIMAL(12, 2),
ADD COLUMN IF NOT EXISTS platform_fee DECIMAL(12, 2),
ADD COLUMN IF NOT EXISTS gross_amount DECIMAL(12, 2),
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS inspection_window_hours INT,
ADD COLUMN IF NOT EXISTS inspection_deadline TIMESTAMP,
ADD COLUMN IF NOT EXISTS has_dispute BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS dispute_id UUID,
ADD COLUMN IF NOT EXISTS dispute_status VARCHAR(50),
ADD COLUMN IF NOT EXISTS device_seller_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS ip_seller VARCHAR(45),
ADD COLUMN IF NOT EXISTS device_buyer_id VARCHAR(255),
ADD COLUMN IF NOT EXISTS ip_buyer VARCHAR(45);

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_contracts_product_category ON public.contracts(product_category);
CREATE INDEX IF NOT EXISTS idx_contracts_seller_buyer ON public.contracts(seller_id, buyer_id);
CREATE INDEX IF NOT EXISTS idx_contracts_dispute_id ON public.contracts(dispute_id);

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 2: CONTRACT_FORM_DATA (User-filled form data - Polymorphic)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.contract_form_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  
  -- Track which annexure this form belongs to
  annexure_code CHAR(1) NOT NULL,
  product_category VARCHAR(50) NOT NULL,
  
  -- PART A: Party Information (AUTO-FETCHED - non-editable)
  seller_id UUID NOT NULL,
  seller_name VARCHAR(255),
  seller_phone VARCHAR(20),
  seller_address TEXT,
  seller_pan VARCHAR(15),
  seller_gst VARCHAR(15),
  seller_kyc_status VARCHAR(50),
  seller_kyc_date TIMESTAMP,
  seller_device_id VARCHAR(255),
  seller_ip VARCHAR(45),
  
  buyer_id UUID NOT NULL,
  buyer_name VARCHAR(255),
  buyer_phone VARCHAR(20),
  buyer_address TEXT,
  buyer_pan VARCHAR(15),
  buyer_gst VARCHAR(15),
  buyer_kyc_status VARCHAR(50),
  buyer_kyc_date TIMESTAMP,
  buyer_device_id VARCHAR(255),
  buyer_ip VARCHAR(45),
  
  -- PART B: Product Details (USER-PROVIDED)
  product_name VARCHAR(255),
  brand VARCHAR(100),
  model_number VARCHAR(100),
  serial_number VARCHAR(100),
  color VARCHAR(50),
  
  -- Category-specific fields (JSONB for flexibility)
  category_specific_fields JSONB, -- Stores all category-specific fields
  
  -- General condition (all categories)
  condition_category VARCHAR(50),
  scratches_present VARCHAR(255),
  dents_present VARCHAR(255),
  repairs_done TEXT,
  
  -- Functional status
  power_on_working VARCHAR(10),
  charging_working VARCHAR(10),
  
  -- Accessories
  original_box_included VARCHAR(50),
  original_charger_included VARCHAR(50),
  
  -- Warranty
  warranty_status VARCHAR(100),
  warranty_valid_till TIMESTAMP,
  
  -- Transaction details (USER-PROVIDED)
  sale_price DECIMAL(12, 2),
  delivery_method VARCHAR(50),
  delivery_address TEXT,
  delivery_days INT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contract_form_data_contract_id ON public.contract_form_data(contract_id);
CREATE INDEX IF NOT EXISTS idx_contract_form_data_annexure ON public.contract_form_data(annexure_code);
CREATE INDEX IF NOT EXISTS idx_contract_form_data_seller_buyer ON public.contract_form_data(seller_id, buyer_id);

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 3: EVIDENCE_RECORDS (Photo/video evidence with hashes)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.evidence_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  
  -- Who uploaded
  uploader_id UUID NOT NULL,
  uploader_role VARCHAR(50) NOT NULL, -- 'seller' or 'buyer'
  
  -- Evidence type
  evidence_type VARCHAR(50) NOT NULL,
    -- Values: seller_pre_dispatch_video, buyer_unboxing_video, seller_photo,
    --         buyer_photo, diagnostic_output, inspection_report, etc.
  
  -- File details
  file_name VARCHAR(255),
  file_path VARCHAR(500),
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  
  -- Integrity
  file_hash_sha256 VARCHAR(64) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  
  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  verified_by_id UUID,
  
  -- Content metadata
  duration_seconds INT, -- For videos
  resolution_width INT,
  resolution_height INT,
  frame_rate DECIMAL(5, 2), -- For videos
  
  -- Metadata
  device_id VARCHAR(255),
  device_os VARCHAR(50),
  device_model VARCHAR(255),
  location_lat DECIMAL(10, 8),
  location_long DECIMAL(11, 8),
  
  -- Tamper detection
  exif_data JSONB,
  is_edited BOOLEAN,
  edit_evidence TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_evidence_contract_id ON public.evidence_records(contract_id);
CREATE INDEX IF NOT EXISTS idx_evidence_uploader ON public.evidence_records(uploader_id);
CREATE INDEX IF NOT EXISTS idx_evidence_type ON public.evidence_records(evidence_type);
CREATE INDEX IF NOT EXISTS idx_evidence_verified ON public.evidence_records(is_verified);

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 4: CONTRACT_SIGNATURES (Digital signatures & acceptance)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.contract_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  
  -- Signer info
  signer_id UUID NOT NULL,
  signer_role VARCHAR(50) NOT NULL, -- 'seller' or 'buyer'
  signer_name VARCHAR(255),
  signer_phone VARCHAR(20),
  
  -- Signature method
  signature_method VARCHAR(50) NOT NULL,
    -- Values: digital_signature, otp_verification, password_auth, biometric
  
  -- Signature data
  signature_hash VARCHAR(64), -- Hash of signature
  signature_timestamp TIMESTAMP DEFAULT NOW(),
  
  -- Device info
  device_id VARCHAR(255),
  device_os VARCHAR(50),
  device_model VARCHAR(255),
  ip_address VARCHAR(45),
  
  -- Acceptance details
  accepted BOOLEAN DEFAULT TRUE,
  acceptance_terms_version VARCHAR(20),
  
  -- OTP/Auth info (if applicable)
  otp_sent_at TIMESTAMP,
  otp_verified_at TIMESTAMP,
  
  -- Biometric info (if applicable)
  biometric_type VARCHAR(50), -- fingerprint, face, iris
  biometric_confidence DECIMAL(5, 2),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_signatures_contract_id ON public.contract_signatures(contract_id);
CREATE INDEX IF NOT EXISTS idx_signatures_signer ON public.contract_signatures(signer_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_signatures_unique ON public.contract_signatures(contract_id, signer_id);

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 5: DISPUTE_RECORDS (Dispute cases & resolutions)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.dispute_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  transaction_id UUID NOT NULL REFERENCES public.transactions(id),
  
  -- Dispute initiator
  raised_by_id UUID NOT NULL,
  raised_by_role VARCHAR(50) NOT NULL, -- 'seller' or 'buyer'
  raised_at TIMESTAMP DEFAULT NOW(),
  
  -- Dispute details
  reason VARCHAR(255) NOT NULL,
  description TEXT,
  expected_resolution VARCHAR(100), -- 'refund', 'replacement', 'repair'
  amount_claimed DECIMAL(12, 2),
  
  -- Dispute status (4-step resolution)
  status VARCHAR(50) NOT NULL DEFAULT 'ai_triage',
    -- Values: ai_triage, human_review, mediation, arbitration, resolved, cancelled
  
  -- Step 1: AI Triage
  ai_triage_completed_at TIMESTAMP,
  ai_triage_result VARCHAR(50), -- 'seller_likely_liable', 'buyer_likely_liable', 'inconclusive'
  ai_confidence DECIMAL(5, 2),
  ai_reasoning TEXT,
  
  -- Step 2: Human Review
  human_review_started_at TIMESTAMP,
  human_review_completed_at TIMESTAMP,
  review_panel_ids UUID[],
  human_decision VARCHAR(50), -- 'seller_liable', 'buyer_liable', 'mutual_fault'
  human_reasoning TEXT,
  final_amount_awarded DECIMAL(12, 2),
  
  -- Step 3: Mediation (optional)
  mediation_requested BOOLEAN DEFAULT FALSE,
  mediator_id UUID,
  mediation_started_at TIMESTAMP,
  mediation_completed_at TIMESTAMP,
  mediation_settlement JSONB,
  mediation_success BOOLEAN,
  
  -- Step 4: Arbitration (final)
  arbitration_initiated BOOLEAN DEFAULT FALSE,
  arbitration_venue VARCHAR(255),
  arbitration_case_number VARCHAR(100),
  arbitration_commenced_at TIMESTAMP,
  arbitration_outcome VARCHAR(100),
  arbitration_award DECIMAL(12, 2),
  
  -- Fraud detection
  is_fraud_flagged BOOLEAN DEFAULT FALSE,
  fraud_type VARCHAR(100), -- 'seller_misrepresentation', 'buyer_false_claim', etc.
  fraud_confidence DECIMAL(5, 2),
  
  -- Resolution
  resolution_date TIMESTAMP,
  resolution_type VARCHAR(50), -- 'refund', 'replacement', 'settlement'
  resolution_amount DECIMAL(12, 2),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dispute_contract_id ON public.dispute_records(contract_id);
CREATE INDEX IF NOT EXISTS idx_dispute_status ON public.dispute_records(status);
CREATE INDEX IF NOT EXISTS idx_dispute_raised_by ON public.dispute_records(raised_by_id);
CREATE INDEX IF NOT EXISTS idx_dispute_fraud_flagged ON public.dispute_records(is_fraud_flagged);

-- ═══════════════════════════════════════════════════════════════════
-- TABLE 6: CONTRACT_AUDIT_LOG (Immutable audit trail)
-- ═══════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.contract_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES public.contracts(id) ON DELETE CASCADE,
  
  -- Action details
  action VARCHAR(100) NOT NULL,
    -- Values: created, modified, viewed, signed_seller, signed_buyer,
    --         dispute_raised, dispute_resolved, evidence_uploaded, etc.
  
  actor_id UUID,
  actor_role VARCHAR(50),
  
  -- Changes
  old_value JSONB,
  new_value JSONB,
  
  -- Details
  details TEXT,
  
  -- Device info
  device_id VARCHAR(255),
  ip_address VARCHAR(45),
  
  -- Timestamp (immutable)
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_log_contract ON public.contract_audit_log(contract_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_action ON public.contract_audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.contract_audit_log(created_at);

-- ═══════════════════════════════════════════════════════════════════
-- VIEWS FOR EASY QUERYING
-- ═══════════════════════════════════════════════════════════════════

-- View: Contract with key details
CREATE OR REPLACE VIEW public.v_contract_details AS
SELECT
  c.id,
  c.id as contract_id,
  c.transaction_id,
  c.seller_id,
  c.buyer_id,
  c.product_category,
  c.annexure_code,
  c.status,
  c.populated_fields,
  c.total_placeholders,
  c.escrow_amount,
  c.platform_fee,
  c.inspection_deadline,
  c.has_dispute,
  c.dispute_status,
  c.seller_signed_at,
  c.buyer_signed_at,
  c.created_at,
  c.updated_at
FROM public.contracts c;

-- View: Evidence completeness by contract
CREATE OR REPLACE VIEW public.v_evidence_summary AS
SELECT
  contract_id,
  COUNT(*) as total_evidence_items,
  SUM(CASE WHEN evidence_type = 'seller_pre_dispatch_video' THEN 1 ELSE 0 END) as seller_video_count,
  SUM(CASE WHEN evidence_type = 'buyer_unboxing_video' THEN 1 ELSE 0 END) as buyer_video_count,
  SUM(CASE WHEN evidence_type LIKE '%photo%' THEN 1 ELSE 0 END) as photo_count,
  SUM(CASE WHEN is_verified = TRUE THEN 1 ELSE 0 END) as verified_count,
  MAX(uploaded_at) as latest_evidence_at
FROM public.evidence_records
GROUP BY contract_id;

-- View: Dispute resolution metrics
CREATE OR REPLACE VIEW public.v_dispute_metrics AS
SELECT
  status,
  COUNT(*) as dispute_count,
  COUNT(CASE WHEN is_fraud_flagged = TRUE THEN 1 END) as fraud_count,
  AVG(EXTRACT(EPOCH FROM (COALESCE(resolution_date, NOW()) - created_at)) / 3600) as avg_hours_to_resolve
FROM public.dispute_records
GROUP BY status;

-- ═══════════════════════════════════════════════════════════════════
-- TRIGGERS FOR AUDIT LOG
-- ═══════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.log_contract_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.contract_audit_log (
    contract_id,
    action,
    actor_id,
    old_value,
    new_value,
    details
  ) VALUES (
    NEW.id,
    CASE
      WHEN TG_OP = 'INSERT' THEN 'created'
      WHEN TG_OP = 'UPDATE' THEN 'modified'
      WHEN TG_OP = 'DELETE' THEN 'deleted'
    END,
    NULL,
    CASE WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END,
    TG_OP
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contract_audit_trigger ON public.contracts;

CREATE TRIGGER contract_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.log_contract_changes();

-- ═══════════════════════════════════════════════════════════════════
-- GRANTS & SECURITY
-- ═══════════════════════════════════════════════════════════════════

-- Enable Row Level Security (RLS)
ALTER TABLE public.contract_form_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_audit_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS contract_form_data_policy ON public.contract_form_data;
DROP POLICY IF EXISTS evidence_policy ON public.evidence_records;
DROP POLICY IF EXISTS signature_policy ON public.contract_signatures;
DROP POLICY IF EXISTS dispute_policy ON public.dispute_records;
DROP POLICY IF EXISTS audit_log_policy ON public.contract_audit_log;

-- Policy: Users can only view their own form data
CREATE POLICY contract_form_data_policy ON public.contract_form_data
  FOR SELECT
  USING (seller_id = auth.uid() OR buyer_id = auth.uid());

-- Policy: Users can view evidence for contracts they're part of
CREATE POLICY evidence_policy ON public.evidence_records
  FOR SELECT
  USING (
    uploader_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.contracts WHERE id = contract_id AND (seller_id = auth.uid() OR buyer_id = auth.uid()))
  );

-- Policy: Users can view their signatures
CREATE POLICY signature_policy ON public.contract_signatures
  FOR SELECT
  USING (signer_id = auth.uid());

-- Policy: Users can view disputes for their contracts
CREATE POLICY dispute_policy ON public.dispute_records
  FOR SELECT
  USING (
    raised_by_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.contracts WHERE id = contract_id AND (seller_id = auth.uid() OR buyer_id = auth.uid()))
  );

-- Policy: Users can view audit logs for their contracts
CREATE POLICY audit_log_policy ON public.contract_audit_log
  FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.contracts WHERE id = contract_id AND (seller_id = auth.uid() OR buyer_id = auth.uid()))
  );

-- ═══════════════════════════════════════════════════════════════════
-- FULL-TEXT SEARCH (Optional - for contract search)
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS search_text tsvector;

CREATE OR REPLACE FUNCTION public.update_contract_search_text()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_text := to_tsvector('english', COALESCE(NEW.contract_id, '') || ' ' || COALESCE(NEW.product_category, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS contract_search_trigger ON public.contracts;

CREATE TRIGGER contract_search_trigger
BEFORE INSERT OR UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_contract_search_text();

CREATE INDEX IF NOT EXISTS idx_contract_search ON public.contracts USING gin(search_text);

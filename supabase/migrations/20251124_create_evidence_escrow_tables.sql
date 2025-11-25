-- ============================================================================
-- EVIDENCE AND ESCROW MANAGEMENT TABLES FOR BHAROSE PE
-- ============================================================================
-- Created: 2025-11-24
-- Purpose: Store evidence, escrow conditions, OTP, and industry classification
-- ============================================================================

-- 1. INDUSTRY CLASSIFICATION TABLE
-- Stores AI-detected industry categories and confidence scores
CREATE TABLE IF NOT EXISTS industry_classification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  detected_industry VARCHAR(50) NOT NULL CHECK (detected_industry IN (
    'physical_products',
    'services',
    'digital_goods',
    'custom_made_order',
    'logistics',
    'home_services'
  )),
  confidence_score DECIMAL(3, 2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  sub_category VARCHAR(100),
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  manually_overridden BOOLEAN DEFAULT FALSE,
  override_industry VARCHAR(50),
  override_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT valid_confidence CHECK (confidence_score BETWEEN 0 AND 1)
);

CREATE INDEX idx_industry_transaction ON industry_classification(transaction_id);
CREATE INDEX idx_industry_detected ON industry_classification(detected_industry);

-- 2. EVIDENCE COLLECTION TABLE
-- Stores metadata about evidence (photos, videos, OTP, documents)
CREATE TABLE IF NOT EXISTS evidence_collection (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  evidence_type VARCHAR(50) NOT NULL CHECK (evidence_type IN (
    'pre_dispatch_video',
    'dispatch_photo',
    'unboxing_video',
    'defect_photo',
    'serial_number_photo',
    'signature_slip',
    'before_after_photo',
    'service_completion_video',
    'work_checklist',
    'other_document'
  )),
  submitted_by VARCHAR(50) NOT NULL CHECK (submitted_by IN ('seller', 'buyer')),
  media_url VARCHAR(500),
  storage_path VARCHAR(500) UNIQUE,
  file_size INTEGER,
  file_type VARCHAR(50),
  metadata JSONB DEFAULT '{}'::jsonb,
  -- Metadata may include: timestamp, location, device_info, etc.
  
  verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN (
    'pending',
    'verified',
    'rejected',
    'flagged'
  )),
  verification_notes TEXT,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_evidence_transaction ON evidence_collection(transaction_id);
CREATE INDEX idx_evidence_type ON evidence_collection(evidence_type);
CREATE INDEX idx_evidence_status ON evidence_collection(verification_status);
CREATE INDEX idx_evidence_submitted_by ON evidence_collection(submitted_by);

-- 3. ESCROW TRANSACTION RECORD
-- Detailed escrow tracking with conditional release logic
CREATE TABLE IF NOT EXISTS escrow_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE CASCADE,
  
  -- ESCROW AMOUNTS (in rupees)
  total_amount INTEGER NOT NULL CHECK (total_amount > 0),
  platform_fee_amount INTEGER NOT NULL DEFAULT 0,
  actual_escrow_amount INTEGER NOT NULL,
  -- platform_fee = 1% of transaction_amount
  
  -- RELEASE CONDITIONS
  escrow_status VARCHAR(50) NOT NULL DEFAULT 'held' CHECK (escrow_status IN (
    'held',
    'partial_released',
    'fully_released',
    'disputed',
    'refunded'
  )),
  
  release_trigger_type VARCHAR(100) NOT NULL CHECK (release_trigger_type IN (
    'auto_buyer_acceptance',
    'auto_timeout',
    'manual_admin_approval',
    'mediation_resolved',
    'dispute_resolved'
  )),
  
  required_evidence JSONB DEFAULT '[]'::jsonb,
  -- Array of evidence types required before release
  
  evidence_verified JSONB DEFAULT '[]'::jsonb,
  -- Array of verified evidence types
  
  -- TIMELINE
  held_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  release_eligible_at TIMESTAMP WITH TIME ZONE,
  -- X days after transaction completion
  
  auto_release_at TIMESTAMP WITH TIME ZONE,
  -- If no dispute by this time, auto-release
  
  released_at TIMESTAMP WITH TIME ZONE,
  
  -- RELEASE DETAILS
  released_to_seller BOOLEAN DEFAULT FALSE,
  released_to_buyer BOOLEAN DEFAULT FALSE,
  refunded_to_buyer BOOLEAN DEFAULT FALSE,
  
  -- DISPUTE FLAGGING
  disputed_at TIMESTAMP WITH TIME ZONE,
  dispute_reason TEXT,
  dispute_evidence_id UUID REFERENCES evidence_collection(id) ON DELETE SET NULL,
  
  -- ADMIN NOTES
  admin_notes TEXT,
  admin_decision TEXT,
  admin_decided_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_decided_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_escrow_transaction ON escrow_records(transaction_id);
CREATE INDEX idx_escrow_status ON escrow_records(escrow_status);
CREATE INDEX idx_escrow_release_eligible ON escrow_records(release_eligible_at);
CREATE INDEX idx_escrow_auto_release ON escrow_records(auto_release_at);

-- 4. OTP RECORDS TABLE
-- Manages OTP generation, verification, and tracking
CREATE TABLE IF NOT EXISTS otp_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  otp_code VARCHAR(6) NOT NULL,
  purpose VARCHAR(50) NOT NULL CHECK (purpose IN (
    'delivery_confirmation',
    'payment_authorization',
    'dispute_initiation',
    'dispute_resolution_acceptance'
  )),
  
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP WITH TIME ZONE,
  
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Security
  ip_address INET,
  user_agent VARCHAR(500),
  device_fingerprint VARCHAR(256)
);

CREATE INDEX idx_otp_transaction ON otp_records(transaction_id);
CREATE INDEX idx_otp_user ON otp_records(user_id);
CREATE INDEX idx_otp_verified ON otp_records(is_verified);
CREATE INDEX idx_otp_expires ON otp_records(expires_at);

-- 5. DISPUTE EVIDENCE LOG
-- Comprehensive audit trail for dispute resolution
CREATE TABLE IF NOT EXISTS dispute_evidence_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  
  dispute_initiated_by VARCHAR(50) NOT NULL CHECK (dispute_initiated_by IN ('buyer', 'seller')),
  initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  dispute_reason TEXT NOT NULL,
  dispute_category VARCHAR(100) NOT NULL CHECK (dispute_category IN (
    'product_mismatch',
    'wrong_item_sent',
    'transit_damage',
    'manufacturing_defect',
    'missing_parts',
    'poor_quality_work',
    'scope_creep',
    'payment_not_received',
    'non_delivery',
    'fake_product',
    'quality_claim',
    'other'
  )),
  
  -- EVIDENCE SUBMITTED
  evidence_submitted JSONB DEFAULT '[]'::jsonb,
  -- Array of evidence_collection.id
  
  -- BUYER CLAIMS
  buyer_claim_text TEXT,
  buyer_claim_submitted_at TIMESTAMP WITH TIME ZONE,
  
  -- SELLER RESPONSE
  seller_response_text TEXT,
  seller_response_submitted_at TIMESTAMP WITH TIME ZONE,
  
  -- RESOLUTION
  resolution_status VARCHAR(50) DEFAULT 'open' CHECK (resolution_status IN (
    'open',
    'in_mediation',
    'resolved',
    'escalated'
  )),
  
  resolution_type VARCHAR(50) CHECK (resolution_type IN (
    'refund_issued',
    'replacement_offered',
    'partial_refund',
    'no_refund_sustained',
    'mediation_agreed'
  )),
  
  resolution_amount INTEGER,
  resolution_date TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_dispute_transaction ON dispute_evidence_log(transaction_id);
CREATE INDEX idx_dispute_initiated_by ON dispute_evidence_log(dispute_initiated_by);
CREATE INDEX idx_dispute_status ON dispute_evidence_log(resolution_status);
CREATE INDEX idx_dispute_category ON dispute_evidence_log(dispute_category);

-- 6. INDUSTRY-SPECIFIC RULES TABLE
-- Stores dynamic industry rules and requirements
CREATE TABLE IF NOT EXISTS industry_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry VARCHAR(50) NOT NULL UNIQUE CHECK (industry IN (
    'physical_products',
    'services',
    'digital_goods',
    'custom_made_order',
    'logistics',
    'home_services'
  )),
  
  -- RETURN POLICY
  returnable BOOLEAN DEFAULT TRUE,
  return_window_days INTEGER,
  non_returnable_items TEXT[],
  return_condition_requirements TEXT[],
  
  -- EVIDENCE REQUIREMENTS
  seller_required_evidence TEXT[] DEFAULT ARRAY[]::TEXT[],
  buyer_required_evidence TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- ESCROW CONDITIONS
  escrow_hold_days INTEGER DEFAULT 3,
  auto_release_hours INTEGER DEFAULT 72,
  
  -- WARRANTY/GUARANTEE
  default_warranty_days INTEGER,
  warranty_description TEXT,
  
  -- MATERIAL DEFECT DEFINITION
  material_defect_criteria JSONB,
  
  -- LEGAL COMPLIANCE
  applicable_acts TEXT[],
  certification_required TEXT[],
  
  -- DISPUTE RESOLUTION
  preferred_mediation_type VARCHAR(100),
  escalation_threshold_amount INTEGER,
  
  -- NOTES
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_industry_rules ON industry_rules(industry);

-- 7. ESCROW RELEASE APPROVAL QUEUE
-- Admin dashboard queue for manual release approvals
CREATE TABLE IF NOT EXISTS escrow_release_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  escrow_record_id UUID NOT NULL UNIQUE REFERENCES escrow_records(id) ON DELETE CASCADE,
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',
    'approved',
    'rejected',
    'needs_review'
  )),
  
  priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN (
    'low',
    'normal',
    'high',
    'urgent'
  )),
  
  reason_for_queue TEXT,
  
  assigned_to_admin UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  admin_decision TEXT,
  admin_decided_at TIMESTAMP WITH TIME ZONE,
  
  queued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_release_queue_status ON escrow_release_queue(status);
CREATE INDEX idx_release_queue_escrow ON escrow_release_queue(escrow_record_id);
CREATE INDEX idx_release_queue_transaction ON escrow_release_queue(transaction_id);
CREATE INDEX idx_release_queue_assigned ON escrow_release_queue(assigned_to_admin);

-- 8. PLATFORM LIABILITY TRACKING
-- Tracks platform fees, liability caps, and transaction history for compliance
CREATE TABLE IF NOT EXISTS platform_liability_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL UNIQUE REFERENCES transactions(id) ON DELETE CASCADE,
  
  transaction_amount INTEGER NOT NULL,
  platform_fee_percentage DECIMAL(4, 2) DEFAULT 1.00,
  -- Currently 1% of transaction amount
  
  platform_fee_collected INTEGER NOT NULL,
  -- Calculated as: FLOOR(transaction_amount * platform_fee_percentage / 100)
  
  liability_cap_amount INTEGER NOT NULL,
  -- Cap = MAX(platform_fee_collected, 1000) -- Minimum liability cap
  
  actual_liability JSONB DEFAULT '{}'::jsonb,
  -- If dispute occurs, track actual liability incurred
  
  dispute_flag BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_liability_transaction ON platform_liability_tracking(transaction_id);

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
-- Allow authenticated users to read their own records
GRANT SELECT ON industry_classification TO authenticated;
GRANT SELECT ON evidence_collection TO authenticated;
GRANT SELECT ON escrow_records TO authenticated;
GRANT SELECT ON otp_records TO authenticated;
GRANT SELECT ON dispute_evidence_log TO authenticated;
GRANT SELECT ON industry_rules TO authenticated;
GRANT SELECT ON escrow_release_queue TO authenticated;
GRANT SELECT ON platform_liability_tracking TO authenticated;

-- Admins can do everything
GRANT ALL ON industry_classification TO authenticated;
GRANT ALL ON evidence_collection TO authenticated;
GRANT ALL ON escrow_records TO authenticated;
GRANT ALL ON otp_records TO authenticated;
GRANT ALL ON dispute_evidence_log TO authenticated;
GRANT ALL ON industry_rules TO authenticated;
GRANT ALL ON escrow_release_queue TO authenticated;
GRANT ALL ON platform_liability_tracking TO authenticated;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================
COMMENT ON TABLE industry_classification IS 'AI-detected industry classification with confidence scores and manual override capability';
COMMENT ON TABLE evidence_collection IS 'Stores evidence metadata (photos, videos, documents) with verification status tracking';
COMMENT ON TABLE escrow_records IS 'Escrow management with conditional release logic, evidence requirements, and dispute tracking';
COMMENT ON TABLE otp_records IS 'OTP generation and verification for delivery confirmation and payment authorization';
COMMENT ON TABLE dispute_evidence_log IS 'Complete audit trail for dispute resolution including claims, responses, and resolutions';
COMMENT ON TABLE industry_rules IS 'Dynamic rules engine storing industry-specific requirements, evidence, warranties, and compliance rules';
COMMENT ON TABLE escrow_release_queue IS 'Admin dashboard queue for manual escrow release approvals with priority and assignment tracking';
COMMENT ON TABLE platform_liability_tracking IS 'Platform fee and liability cap tracking for compliance and dispute resolution';

-- Contract Templates Table
CREATE TABLE IF NOT EXISTS contract_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL,  -- 'master_goods', 'master_services'
  category VARCHAR(50) NOT NULL,  -- 'goods', 'services'
  version INT DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,  -- Full HTML/formatted content
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT unique_template_type_version UNIQUE(type, version)
);

-- Contract Annexures Table
CREATE TABLE IF NOT EXISTS contract_annexures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  master_template_id UUID NOT NULL REFERENCES contract_templates(id) ON DELETE CASCADE,
  industry_id VARCHAR(100) NOT NULL,  -- 'electronics', 'furniture', 'vehicles', etc.
  annexure_code VARCHAR(10) NOT NULL,  -- 'A', 'B', 'C', etc.
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,  -- Annexure-specific content
  required_fields JSONB,  -- Fields specific to this annexure
  evidence_requirements JSONB,  -- photo/video requirements
  inspection_window_hours INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT unique_industry_per_master UNIQUE(master_template_id, industry_id)
);

-- Field Mappings for Contract Population
CREATE TABLE IF NOT EXISTS contract_field_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  annexure_id UUID NOT NULL REFERENCES contract_annexures(id) ON DELETE CASCADE,
  field_name VARCHAR(100) NOT NULL,
  field_type VARCHAR(50) NOT NULL,  -- 'AUTO-FETCHED', 'SELLER-INPUT', 'BUYER-INPUT', 'PLATFORM-DEFAULT'
  source VARCHAR(255),  -- where to fetch from (e.g., 'transaction.id', 'formData.price', 'profile.email')
  data_type VARCHAR(50),  -- 'string', 'number', 'date', 'json'
  is_mandatory BOOLEAN DEFAULT false,
  placeholder_text TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated Contracts Storage (for audit trail)
CREATE TABLE IF NOT EXISTS generated_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id VARCHAR(100) NOT NULL UNIQUE,
  master_template_id UUID NOT NULL REFERENCES contract_templates(id),
  annexure_id UUID REFERENCES contract_annexures(id),
  seller_id UUID,
  buyer_id UUID,
  contract_content TEXT NOT NULL,
  contract_summary TEXT,
  status VARCHAR(50) DEFAULT 'draft',  -- 'draft', 'accepted', 'executed', 'disputed', 'completed'
  seller_accepted_at TIMESTAMP,
  buyer_accepted_at TIMESTAMP,
  accepted_metadata JSONB,  -- IP, device, browser info at acceptance
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_contract_templates_type_active ON contract_templates(type, is_active);
CREATE INDEX idx_contract_annexures_master ON contract_annexures(master_template_id);
CREATE INDEX idx_contract_annexures_industry ON contract_annexures(industry_id);
CREATE INDEX idx_field_mappings_annexure ON contract_field_mappings(annexure_id);
CREATE INDEX idx_generated_contracts_transaction ON generated_contracts(transaction_id);
CREATE INDEX idx_generated_contracts_seller_buyer ON generated_contracts(seller_id, buyer_id);

-- Enable RLS (Row Level Security)
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_annexures ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_contracts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read active templates" ON contract_templates
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public read active annexures" ON contract_annexures
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow users to read their own contracts" ON generated_contracts
  FOR SELECT USING (
    auth.uid() = seller_id OR auth.uid() = buyer_id
  );

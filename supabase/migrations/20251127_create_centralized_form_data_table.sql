-- Create centralized form_data table for storing all form submissions
-- This table serves as the master repository for contract generation

CREATE TABLE IF NOT EXISTS form_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL, -- Who filled this form
  
  -- Industry and annexure information
  industry TEXT NOT NULL, -- electronics, mobile, furniture, etc.
  annexure_code TEXT NOT NULL, -- A, B, C, D, E, F, G, H, I, J, K
  
  -- Quick access fields for common searches
  product_name TEXT,
  sale_price DECIMAL(12,2), -- Increased precision for high-value items
  
  -- Complete form data as JSONB (this stores ALL form fields)
  form_data JSONB NOT NULL, -- Stores entire form submission with all fields
  
  -- Product details (extracted from JSONB for indexing)
  brand TEXT,
  model_number TEXT,
  serial_number TEXT,
  color TEXT,
  condition_category TEXT,
  
  -- Common electronics fields
  warranty_status TEXT,
  warranty_valid_till DATE,
  power_on_working BOOLEAN,
  charging_working BOOLEAN,
  scratches_present BOOLEAN,
  dents_present BOOLEAN,
  original_box_included BOOLEAN,
  original_charger_included BOOLEAN,
  
  -- Vehicle specific fields
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  vehicle_registration TEXT,
  mileage INTEGER,
  fuel_type TEXT,
  
  -- Furniture specific fields
  furniture_material TEXT,
  dimensions TEXT,
  weight_kg DECIMAL(8,2),
  
  -- Jewellery specific fields  
  metal_type TEXT,
  gemstone_type TEXT,
  jewellery_weight_grams DECIMAL(8,3),
  purity_karat INTEGER,
  
  -- Fashion specific fields
  clothing_size TEXT,
  clothing_material TEXT,
  brand_authenticity TEXT,
  
  -- Books specific fields
  book_author TEXT,
  book_publisher TEXT,
  book_isbn TEXT,
  book_edition TEXT,
  publication_year INTEGER,
  
  -- Art & collectibles fields
  artist_name TEXT,
  artwork_medium TEXT,
  artwork_dimensions TEXT,
  creation_year INTEGER,
  authenticity_certificate BOOLEAN,
  
  -- Industrial equipment fields
  equipment_category TEXT,
  manufacturing_year INTEGER,
  operating_hours INTEGER,
  maintenance_status TEXT,
  
  -- Building materials fields
  material_type TEXT,
  quantity_available DECIMAL(10,2),
  unit_of_measurement TEXT,
  grade_quality TEXT,
  
  -- Common transaction fields
  delivery_method TEXT,
  delivery_address TEXT,
  inspection_window_hours INTEGER,
  return_policy TEXT,
  payment_terms TEXT,
  
  -- File attachments (stored as JSONB array)
  uploaded_files JSONB, -- [{filename, url, type, size, description}...]
  
  -- Additional terms and conditions
  special_terms TEXT,
  additional_notes TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'used_in_contract', 'archived')),
  is_template BOOLEAN DEFAULT false, -- Can be used as template for future forms
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE form_data ENABLE ROW LEVEL SECURITY;

-- Create policies for form_data
CREATE POLICY "Users can view their own form data" 
ON form_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own form data" 
ON form_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own form data" 
ON form_data 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for better performance on all searchable fields
CREATE INDEX idx_form_data_user_id ON form_data (user_id);
CREATE INDEX idx_form_data_industry ON form_data (industry);
CREATE INDEX idx_form_data_annexure ON form_data (annexure_code);
CREATE INDEX idx_form_data_status ON form_data (status);
CREATE INDEX idx_form_data_transaction ON form_data (transaction_id);
CREATE INDEX idx_form_data_product_name ON form_data (product_name);
CREATE INDEX idx_form_data_brand ON form_data (brand);
CREATE INDEX idx_form_data_price ON form_data (sale_price);

-- Industry-specific indexes
CREATE INDEX idx_form_data_vehicle_make ON form_data (vehicle_make) WHERE industry = 'vehicles';
CREATE INDEX idx_form_data_vehicle_year ON form_data (vehicle_year) WHERE industry = 'vehicles';
CREATE INDEX idx_form_data_metal_type ON form_data (metal_type) WHERE industry = 'jewellery';
CREATE INDEX idx_form_data_book_author ON form_data (book_author) WHERE industry = 'books';
CREATE INDEX idx_form_data_artist_name ON form_data (artist_name) WHERE industry = 'art';

-- Create GIN index on JSONB for efficient form data queries
CREATE INDEX idx_form_data_jsonb ON form_data USING GIN (form_data);
CREATE INDEX idx_form_data_uploaded_files ON form_data USING GIN (uploaded_files);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_form_data_updated_at
BEFORE UPDATE ON form_data
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Function to fetch form data for contract generation
CREATE OR REPLACE FUNCTION get_form_data_for_contract(
  p_user_id UUID,
  p_industry TEXT,
  p_annexure_code TEXT DEFAULT NULL
) 
RETURNS TABLE (
  id UUID,
  form_data JSONB,
  product_name TEXT,
  sale_price DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fd.id,
    fd.form_data,
    fd.product_name,
    fd.sale_price,
    fd.created_at
  FROM form_data fd
  WHERE fd.user_id = p_user_id 
    AND fd.industry = p_industry
    AND (p_annexure_code IS NULL OR fd.annexure_code = p_annexure_code)
    AND fd.status = 'saved'
  ORDER BY fd.created_at DESC;
END;
$$;

-- Function to create contract from saved form data
CREATE OR REPLACE FUNCTION create_contract_from_form_data(
  p_form_data_id UUID,
  p_buyer_id UUID,
  p_seller_id UUID
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_transaction_id UUID;
  v_contract_id UUID;
  v_form_data JSONB;
BEGIN
  -- Get form data
  SELECT fd.form_data INTO v_form_data
  FROM form_data fd
  WHERE fd.id = p_form_data_id;
  
  IF v_form_data IS NULL THEN
    RAISE EXCEPTION 'Form data not found';
  END IF;
  
  -- Create transaction
  INSERT INTO transactions (
    title,
    amount,
    description,
    buyer_id,
    seller_id,
    status
  ) VALUES (
    (v_form_data->>'product_name')::TEXT,
    COALESCE((v_form_data->>'price')::DECIMAL, (v_form_data->>'sale_price')::DECIMAL, 0),
    (v_form_data->>'description')::TEXT,
    p_buyer_id,
    p_seller_id,
    'created'
  ) RETURNING id INTO v_transaction_id;
  
  -- Create contract
  INSERT INTO contracts (
    transaction_id,
    contract_content,
    terms,
    created_by,
    status
  ) VALUES (
    v_transaction_id,
    'Contract generated from form data',
    'Terms based on ' || (v_form_data->>'industry')::TEXT || ' annexure ' || (v_form_data->>'annexure')::TEXT,
    COALESCE(p_seller_id, p_buyer_id),
    'draft'
  ) RETURNING id INTO v_contract_id;
  
  -- Update form data status
  UPDATE form_data 
  SET status = 'used_in_contract'
  WHERE id = p_form_data_id;
  
  RETURN v_contract_id;
END;
$$;
-- Create early_access table
CREATE TABLE IF NOT EXISTS early_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  business_type VARCHAR(100),
  interested_as VARCHAR(50), -- 'buyer', 'seller', or 'both'
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_early_access_email ON early_access(email);

-- RLS Policies
ALTER TABLE early_access ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for early access signups)
CREATE POLICY "Allow anyone to insert early access" ON early_access
  FOR INSERT
  WITH CHECK (true);

-- Allow authenticated users to read all early access records
CREATE POLICY "Allow authenticated users to read early access" ON early_access
  FOR SELECT
  USING (auth.role() = 'authenticated');

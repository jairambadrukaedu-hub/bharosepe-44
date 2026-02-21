/**
 * DATABASE SETUP UTILITY
 * Run this to create the form_submissions table manually
 */

import { supabase } from '@/integrations/supabase/client';

const createFormSubmissionsTable = async () => {
  console.log('🚀 Creating form_submissions table...');
  
  try {
    // Execute the migration SQL
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_query: `
        -- Drop existing table if it exists
        DROP TABLE IF EXISTS form_submissions CASCADE;

        -- Create the comprehensive form submissions table
        CREATE TABLE form_submissions (
            -- Primary identifiers
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            user_id UUID NOT NULL,
            transaction_id TEXT UNIQUE NOT NULL,
            
            -- Industry categorization
            industry_category TEXT NOT NULL CHECK (industry_category IN (
                'electronics', 'mobile', 'furniture', 'vehicles', 'jewellery', 
                'fashion-apparel', 'building_material', 'collectibles', 
                'industrial', 'books', 'art'
            )),
            annexure_code TEXT NOT NULL CHECK (annexure_code IN (
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'
            )),
            
            -- Basic information fields
            product_name TEXT,
            item_title TEXT,
            item_name TEXT,
            machine_name TEXT,
            book_title TEXT,
            brand TEXT,
            make TEXT,
            model TEXT,
            model_name TEXT,
            model_number TEXT,
            model_edition TEXT,
            variant TEXT,
            variant_ram_storage TEXT,
            category TEXT,
            jewellery_category TEXT,
            device_type TEXT,
            description TEXT,
            authors TEXT,
            publisher TEXT,
            
            -- Pricing & delivery information
            price DECIMAL(12,2),
            sale_price DECIMAL(12,2),
            expected_delivery_date DATE,
            inspection_window_hours INTEGER,
            return_policy TEXT,
            delivery_mode TEXT,
            weight_category TEXT,
            
            -- Categorized JSONB fields for flexibility
            technical_specs JSONB DEFAULT '{}'::jsonb,
            identification_data JSONB DEFAULT '{}'::jsonb,
            condition_data JSONB DEFAULT '{}'::jsonb,
            functionality_data JSONB DEFAULT '{}'::jsonb,
            measurements JSONB DEFAULT '{}'::jsonb,
            material_data JSONB DEFAULT '{}'::jsonb,
            accessories_data JSONB DEFAULT '{}'::jsonb,
            warranty_legal_data JSONB DEFAULT '{}'::jsonb,
            documentation_data JSONB DEFAULT '{}'::jsonb,
            usage_history_data JSONB DEFAULT '{}'::jsonb,
            media_files JSONB DEFAULT '{}'::jsonb,
            buyer_requirements JSONB DEFAULT '{}'::jsonb,
            category_specific_data JSONB DEFAULT '{}'::jsonb,
            delivery_data JSONB DEFAULT '{}'::jsonb,
            
            -- Form metadata
            form_status TEXT DEFAULT 'draft' CHECK (form_status IN ('draft', 'completed', 'submitted', 'reviewed')),
            completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
            required_fields_completed INTEGER DEFAULT 0,
            total_fields_filled INTEGER DEFAULT 0,
            
            -- Timestamps
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            submitted_at TIMESTAMPTZ
        );

        -- Create indexes for performance
        CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON form_submissions(user_id);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_transaction_id ON form_submissions(transaction_id);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_industry_category ON form_submissions(industry_category);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_form_status ON form_submissions(form_status);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_user_industry ON form_submissions(user_id, industry_category);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_user_status ON form_submissions(user_id, form_status);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

        -- JSONB indexes for fast searches
        CREATE INDEX IF NOT EXISTS idx_form_submissions_technical_specs ON form_submissions USING GIN(technical_specs);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_condition_data ON form_submissions USING GIN(condition_data);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_material_data ON form_submissions USING GIN(material_data);
        CREATE INDEX IF NOT EXISTS idx_form_submissions_media_files ON form_submissions USING GIN(media_files);

        -- Enable RLS
        ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

        -- Create RLS policies
        CREATE POLICY "Users can view their own form submissions"
            ON form_submissions FOR SELECT
            USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own form submissions"
            ON form_submissions FOR INSERT
            WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own form submissions"
            ON form_submissions FOR UPDATE
            USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete their own form submissions"
            ON form_submissions FOR DELETE
            USING (auth.uid() = user_id);

        -- Create trigger function for updated_at
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        -- Create trigger
        CREATE TRIGGER update_form_submissions_updated_at
            BEFORE UPDATE ON form_submissions
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
      `
    });

    if (error) {
      console.error('❌ Error creating table:', error);
      return false;
    }

    console.log('✅ form_submissions table created successfully!');
    return true;

  } catch (error) {
    console.error('❌ Failed to create table:', error);
    return false;
  }
};

// Auto-run if this file is executed directly
if (typeof window !== 'undefined') {
  (window as any).createFormSubmissionsTable = createFormSubmissionsTable;
}

export { createFormSubmissionsTable };
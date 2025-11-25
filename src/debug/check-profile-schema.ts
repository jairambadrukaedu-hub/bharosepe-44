/**
 * Check Profile Table Schema
 * Place in src/debug/check-profile-schema.ts
 * Call this function to see what fields exist in your profiles table
 */

import { supabase } from '@/integrations/supabase/client';

export const REQUIRED_PROFILE_FIELDS = [
  'id',
  'full_name',
  'email',
  'phone',
  'address',
  'city',
  'state',
  'pincode',
  'pan_number',
  'gst_number',
  'business_name',
  'business_type',
  'verified_phone',
  'created_at',
  'updated_at',
];

interface FieldStatus {
  field: string;
  exists: boolean;
  required: boolean;
}

export async function checkProfileTableSchema(): Promise<{
  allFieldsPresent: boolean;
  fields: FieldStatus[];
  missingFields: string[];
}> {
  console.log('🔍 Checking profile table schema...');

  try {
    // Try to get a profile to inspect its structure
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Error querying profiles:', error);
      throw error;
    }

    if (!profiles || profiles.length === 0) {
      console.warn('⚠️  No profiles exist yet. Getting empty schema...');
      
      // Try to get schema info from information_schema
      const { data: schemaData, error: schemaError } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_name', 'profiles')
        .eq('table_schema', 'public');

      if (schemaError) {
        console.error('Cannot access schema info:', schemaError);
        return {
          allFieldsPresent: false,
          fields: [],
          missingFields: REQUIRED_PROFILE_FIELDS,
        };
      }

      if (!schemaData) {
        return {
          allFieldsPresent: false,
          fields: [],
          missingFields: REQUIRED_PROFILE_FIELDS,
        };
      }

      const existingFields = schemaData.map((col: any) => col.column_name);
      return analyzeFields(existingFields);
    }

    // Profile exists, get its fields
    const existingFields = Object.keys(profiles[0]);
    return analyzeFields(existingFields);
  } catch (err) {
    console.error('❌ Error checking schema:', err);
    throw err;
  }
}

function analyzeFields(existingFields: string[]): {
  allFieldsPresent: boolean;
  fields: FieldStatus[];
  missingFields: string[];
} {
  const fields: FieldStatus[] = REQUIRED_PROFILE_FIELDS.map((field) => ({
    field,
    exists: existingFields.includes(field),
    required: true,
  }));

  const missingFields = fields
    .filter((f) => !f.exists && f.required)
    .map((f) => f.field);

  const allFieldsPresent = missingFields.length === 0;

  // Log results
  console.log('\n📊 Profile Table Field Status:');
  console.log(''.padEnd(60, '═'));

  fields.forEach((field) => {
    const symbol = field.exists ? '✅' : '❌';
    console.log(`${symbol} ${field.field.padEnd(25)} ${field.exists ? 'Present' : 'MISSING'}`);
  });

  console.log(''.padEnd(60, '═'));

  if (allFieldsPresent) {
    console.log('✅ SUCCESS: All required fields are present!');
    console.log('   Migration has been successfully applied.');
  } else {
    console.log(`❌ MISSING FIELDS: ${missingFields.length}`);
    console.log(`   Missing: ${missingFields.join(', ')}`);
    console.log('   Run migration: supabase db push');
  }

  return {
    allFieldsPresent,
    fields,
    missingFields,
  };
}

// Usage in your component:
/*
import { checkProfileTableSchema } from '@/debug/check-profile-schema';

useEffect(() => {
  checkProfileTableSchema()
    .then((result) => {
      console.log('Schema check result:', result);
      if (!result.allFieldsPresent) {
        // Show warning to user
        toast.error(
          `Missing profile fields: ${result.missingFields.join(', ')}`
        );
      }
    })
    .catch((err) => {
      console.error('Schema check failed:', err);
    });
}, []);
*/

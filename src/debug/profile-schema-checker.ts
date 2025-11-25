/**
 * Quick Inspection: Check Profile Table Fields
 * 
 * Run this in your browser console or add to a component useEffect:
 * 
 * const { data, error } = await supabase.from('profiles').select('*').limit(1);
 * if (data?.[0]) console.table(Object.keys(data[0]).sort());
 * 
 */

// Paste this in browser console (F12 Developer Tools):
const checkProfileFields = async () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  console.log('🔍 Fetching profile table schema...\n');
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  
  if (!data?.[0]) {
    console.log('⚠️  No profiles in database');
    return;
  }
  
  const fields = Object.keys(data[0]).sort();
  const REQUIRED = [
    'id', 'full_name', 'email', 'phone', 'address',
    'city', 'state', 'pincode', 'pan_number', 'gst_number',
    'business_name', 'business_type', 'verified_phone',
    'created_at', 'updated_at'
  ];
  
  console.log('📊 FIELDS PRESENT:');
  console.log('═'.repeat(50));
  fields.forEach(field => {
    const isRequired = REQUIRED.includes(field);
    const icon = isRequired ? '✅' : '⚠️';
    console.log(`${icon} ${field}`);
  });
  
  console.log('\n' + '═'.repeat(50));
  console.log('🔍 REQUIRED FIELDS CHECK:');
  console.log('═'.repeat(50));
  
  let missing = [];
  REQUIRED.forEach(field => {
    if (fields.includes(field)) {
      console.log(`✅ ${field}`);
    } else {
      console.log(`❌ ${field} - MISSING`);
      missing.push(field);
    }
  });
  
  console.log('\n' + '═'.repeat(50));
  if (missing.length === 0) {
    console.log('✅ SUCCESS: All required fields present!');
  } else {
    console.log(`❌ MISSING: ${missing.length} fields`);
    console.log('Missing:', missing.join(', '));
    console.log('\nTo fix: supabase db push');
  }
};

// Run it:
// await checkProfileFields();

export { checkProfileFields };

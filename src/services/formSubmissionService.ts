/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORM SUBMISSION SERVICE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Handles saving and managing form submissions to the database
 * - Save form data to form_submissions table
 * - Update form submissions
 * - Retrieve form submissions
 * - Track form completion status
 */

import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface FormSubmissionPayload {
  user_id: string;
  form_id: string;
  industry_category: string;
  annexure_code: string;
  form_data: Record<string, any>;
  status?: 'draft' | 'completed' | 'submitted';
}

export interface FormSubmissionResponse {
  id: number;
  user_id: string;
  form_id: string;
  industry_category: string;
  annexure_code: string;
  form_status: string;
  created_at: string;
  updated_at: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CORE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * COMPREHENSIVE FIELD TO COLUMN MAPPING
 * Maps all form fields to their corresponding database columns
 */
const COMPREHENSIVE_FIELD_MAPPING: Record<string, string> = {
  // ═ ELECTRONICS & MOBILE
  storage: 'storage',
  ram: 'ram',
  display_size: 'display_size',
  processor: 'processor',
  graphics_card: 'graphics_card',
  battery_capacity: 'battery_capacity',
  manufactured_year: 'manufactured_year',
  battery_cycle_count: 'battery_cycle_count',
  battery_health_percent: 'battery_health_percent',
  laptop_battery_backup: 'laptop_battery_backup',
  screen_condition: 'screen_condition',
  charging_issues: 'charging_issues',
  charging_port_issues: 'charging_port_issues',
  known_defects: 'known_defects',
  buttons_ports_issues: 'buttons_ports_issues',
  screen_issues: 'screen_issues',
  speaker_mic_issues: 'speaker_mic_issues',
  battery_performance_issues: 'battery_performance_issues',
  odor_assessment: 'odor_assessment',

  // ═ FURNITURE
  torn_upholstery: 'torn_upholstery',
  sun_fading: 'sun_fading',
  loose_stone: 'loose_stone',
  missing_stone: 'missing_stone',
  loose_legs: 'loose_legs',
  length_cm: 'length_cm',
  breadth_cm: 'breadth_cm',
  height_cm: 'height_cm',
  width_cm: 'width_cm',
  depth_cm: 'depth_cm',

  // ═ VEHICLES
  fuel_type: 'fuel_type',
  registration_number: 'registration_number',
  engine_number: 'engine_number',
  chassis_number: 'chassis_number',
  imei: 'imei',
  rc_status: 'rc_status',
  ownership: 'ownership',
  insurance_status: 'insurance_status',
  puc_valid_till: 'puc_valid_till',
  make: 'make',
  model: 'model',
  model_number: 'model_number',
  model_name: 'model_name',
  odometer_reading: 'odometer_reading',
  transmission_type: 'transmission_type',
  engine_capacity_cc: 'engine_capacity_cc',
  mileage_kmpl: 'mileage_kmpl',
  insurance_valid_till: 'insurance_valid_till',
  engine_condition: 'engine_condition',
  transmission_condition: 'transmission_condition',
  ac_working: 'ac_working',
  power_windows: 'power_windows',
  power_steering: 'power_steering',
  power_locks: 'power_locks',
  sunroof: 'sunroof',
  alloy_wheels: 'alloy_wheels',
  airbags_present: 'airbags_present',
  abs_system_working: 'abs_system_working',

  // ═ FASHION & APPAREL
  size_label: 'size_label',
  material_type: 'material_type',
  wear_level: 'wear_level',
  pattern: 'pattern',
  zipper_working: 'zipper_working',
  buttons_status: 'buttons_status',
  alterations_done: 'alterations_done',
  gender: 'gender',
  fabric_composition: 'fabric_composition',
  sleeve_type: 'sleeve_type',
  neckline: 'neckline',
  fit_type: 'fit_type',
  weight_grams: 'weight_grams',
  fading_level: 'fading_level',
  collar_condition: 'collar_condition',
  hem_condition: 'hem_condition',
  seam_condition: 'seam_condition',
  stains_present: 'stains_present',
  torn_present: 'torn_present',

  // ═ JEWELLERY
  jewellery_category: 'jewellery_category',
  metal_type: 'metal_type',
  purity: 'purity',
  gross_weight_grams: 'gross_weight_grams',
  net_weight_grams: 'net_weight_grams',
  stone_count: 'stone_count',
  stone_type: 'stone_type',
  carat_weight: 'carat_weight',
  clarity: 'clarity',
  color_grade: 'color_grade',
  hallmark_available: 'hallmark_available',
  authenticity_guaranteed: 'authenticity_guaranteed',
  purchase_receipt_available: 'purchase_receipt_available',
  certificate_available: 'certificate_available',

  // ═ BUILDING MATERIALS
  material_category: 'material_category',
  quantity_value: 'quantity_value',
  quantity_unit: 'quantity_unit',
  grade_quality: 'grade_quality',
  installation_cost: 'installation_cost',
  warranty_valid_until: 'warranty_valid_until',

  // ═ COLLECTIBLES
  collectible_type: 'collectible_type',
  rarity_level: 'rarity_level',
  age_years: 'age_years',
  provenance: 'provenance',
  condition_grading: 'condition_grading',
  authenticity_certificate: 'authenticity_certificate',
  appraised_value: 'appraised_value',

  // ═ INDUSTRIAL MACHINERY
  voltage_required: 'voltage_required',
  phase: 'phase',
  power_rating: 'power_rating',
  wattage: 'wattage',
  load_capacity: 'load_capacity',
  rpm_output_capacity: 'rpm_output_capacity',
  air_pressure: 'air_pressure',
  electrical_quality_grade: 'electrical_quality_grade',
  certification_standard: 'certification_standard',
  machine_name: 'machine_name',

  // ═ BOOKS
  book_title: 'book_title',
  authors: 'authors',
  publisher: 'publisher',
  edition_number: 'edition_number',
  publication_year: 'publication_year',
  isbn: 'isbn',
  pages: 'pages',
  condition_rating: 'condition_rating',
  rarity_index: 'rarity_index',
  collectibility_value: 'collectibility_value',

  // ═ ART & PAINTINGS
  artist: 'artist',
  artwork_type: 'artwork_type',
  medium: 'medium',
  dimensions_height_cm: 'dimensions_height_cm',
  dimensions_width_cm: 'dimensions_width_cm',
  year_created: 'year_created',
  authenticity_verification: 'authenticity_verification',
  appraisal_certificate: 'appraisal_certificate',
  provenance_documentation: 'provenance_documentation',
  insurance_value: 'insurance_value',

  // ═ INSTAGRAM/WHATSAPP SELLERS
  seller_username: 'seller_username',
  follower_count: 'follower_count',
  seller_rating: 'seller_rating',
  average_response_time_hours: 'average_response_time_hours',
  dispute_rate_percent: 'dispute_rate_percent',

  // ═ SERVICES
  service_type: 'service_type',
  scope_description: 'scope_description',
  project_duration_days: 'project_duration_days',
  team_size: 'team_size',
  support_duration_months: 'support_duration_months',
  documentation_included: 'documentation_included',
  source_code_delivery: 'source_code_delivery',
  testing_scope: 'testing_scope',

  // ═ UNIVERSAL FIELDS
  product_name: 'product_name',
  brand: 'brand',
  description: 'description',
  sale_price: 'sale_price',
  condition: 'condition',
  color: 'color',
  expected_delivery_date: 'expected_delivery_date',
  delivery_mode: 'delivery_mode',
  return_policy: 'return_policy',
  inspection_window_hours: 'inspection_window_hours',
};

/**
 * Save form submission to database
 * 
 * NOTE: This function is called ONLY on manual actions (Save Draft, Generate Contract)
 * NOT on every keystroke/form change. Form changes auto-save to localStorage only.
 * 
 * Architecture for 1M+ concurrent users:
 * 1. Keystroke → localStorage auto-save (instant, zero server cost)
 * 2. Save Draft button → Database save (manual)
 * 3. Generate Contract button → Database save (manual)
 * 4. Clear Draft → localStorage clear (local only)
 * 
 * This prevents server overload at scale.
 */
export const saveFormSubmission = async (
  payload: FormSubmissionPayload
): Promise<FormSubmissionResponse | null> => {
  try {
    console.log('💾 Saving form submission to database:', {
      form_id: payload.form_id,
      industry: payload.industry_category,
      annexure: payload.annexure_code,
      fieldsCount: Object.keys(payload.form_data).length,
    });

    // Start with mandatory fields
    const directColumns: Record<string, any> = {
      user_id: payload.user_id,
      form_id: payload.form_id,
      industry_category: payload.industry_category,
      annexure_code: payload.annexure_code,
      form_status: payload.status || 'draft',
    };

    // Initialize JSONB containers
    const jsonbFields: Record<string, Record<string, any>> = {
      technical_specs: {},
      condition_data: {},
      functionality_data: {},
      measurements: {},
      material_data: {},
      accessories_data: {},
      warranty_legal_data: {},
      documentation_data: {},
      usage_history_data: {},
      media_files: {},
      buyer_requirements: {},
      category_specific_data: {},
      delivery_data: {},
      uploaded_photos: [],
      uploaded_images: [],
      custom_fields: {},
    };

    // Map all form fields to database columns
    Object.entries(payload.form_data).forEach(([key, value]) => {
      if (!value) return; // Skip empty values
      
      // Skip transaction_id as it's not a valid column
      if (key === 'transaction_id') return;

      // Check if field maps to a direct column
      if (COMPREHENSIVE_FIELD_MAPPING[key]) {
        const columnName = COMPREHENSIVE_FIELD_MAPPING[key];
        
        // Type conversion for numeric fields
        if (
          columnName.includes('count') ||
          columnName.includes('year') ||
          columnName.includes('hours') ||
          columnName.includes('grams') ||
          columnName.includes('pages') ||
          columnName === 'ram' ||
          columnName === 'storage' ||
          columnName === 'battery_capacity' ||
          columnName === 'odometer_reading' ||
          columnName === 'team_size' ||
          columnName === 'project_duration_days' ||
          columnName === 'support_duration_months' ||
          columnName === 'follower_count' ||
          columnName === 'engine_capacity_cc'
        ) {
          directColumns[columnName] = parseInt(value) || null;
        } else if (
          columnName === 'sale_price' ||
          columnName === 'installation_cost' ||
          columnName === 'appraised_value' ||
          columnName === 'insurance_value' ||
          columnName === 'seller_rating' ||
          columnName === 'dispute_rate_percent' ||
          columnName === 'mileage_kmpl' ||
          columnName === 'carat_weight' ||
          columnName === 'gross_weight_grams' ||
          columnName === 'net_weight_grams' ||
          columnName === 'display_size' ||
          columnName === 'length_cm' ||
          columnName === 'breadth_cm' ||
          columnName === 'height_cm' ||
          columnName === 'width_cm' ||
          columnName === 'depth_cm' ||
          columnName === 'dimensions_height_cm' ||
          columnName === 'dimensions_width_cm' ||
          columnName === 'quantity_value'
        ) {
          directColumns[columnName] = parseFloat(value) || null;
        } else if (
          columnName === 'missing_stone' ||
          columnName === 'zipper_working' ||
          columnName === 'ac_working' ||
          columnName === 'power_windows' ||
          columnName === 'power_steering' ||
          columnName === 'power_locks' ||
          columnName === 'sunroof' ||
          columnName === 'alloy_wheels' ||
          columnName === 'airbags_present' ||
          columnName === 'abs_system_working' ||
          columnName === 'hallmark_available' ||
          columnName === 'authenticity_guaranteed' ||
          columnName === 'purchase_receipt_available' ||
          columnName === 'certificate_available' ||
          columnName === 'authenticity_certificate' ||
          columnName === 'appraisal_certificate' ||
          columnName === 'stains_present' ||
          columnName === 'torn_present' ||
          columnName === 'documentation_included'
        ) {
          directColumns[columnName] = Boolean(value);
        } else if (columnName === 'expected_delivery_date' || columnName === 'puc_valid_till' || columnName === 'insurance_valid_till') {
          // Date fields - ensure proper format
          directColumns[columnName] = value;
        } else {
          // String fields
          directColumns[columnName] = String(value);
        }
      } else {
        // Map unmatched fields to appropriate JSONB containers
        const lowerKey = key.toLowerCase();

        if (lowerKey.includes('photo') || lowerKey.includes('image')) {
          if (Array.isArray(value)) {
            if (lowerKey.includes('photo')) {
              jsonbFields.uploaded_photos = value;
            } else {
              jsonbFields.uploaded_images = value;
            }
          }
        } else if (lowerKey.includes('technical') || lowerKey.includes('spec') || lowerKey.includes('processor') || lowerKey.includes('ram')) {
          jsonbFields.technical_specs[key] = value;
        } else if (lowerKey.includes('condition') || lowerKey.includes('damage') || lowerKey.includes('wear')) {
          jsonbFields.condition_data[key] = value;
        } else if (lowerKey.includes('function') || lowerKey.includes('working') || lowerKey.includes('test')) {
          jsonbFields.functionality_data[key] = value;
        } else if (lowerKey.includes('dimension') || lowerKey.includes('measurement') || lowerKey.includes('size')) {
          jsonbFields.measurements[key] = value;
        } else if (lowerKey.includes('material') || lowerKey.includes('fabric') || lowerKey.includes('composition')) {
          jsonbFields.material_data[key] = value;
        } else if (lowerKey.includes('accessory') || lowerKey.includes('included') || lowerKey.includes('box')) {
          jsonbFields.accessories_data[key] = value;
        } else if (lowerKey.includes('warranty') || lowerKey.includes('guarantee') || lowerKey.includes('legal')) {
          jsonbFields.warranty_legal_data[key] = value;
        } else if (lowerKey.includes('document') || lowerKey.includes('receipt') || lowerKey.includes('certificate')) {
          jsonbFields.documentation_data[key] = value;
        } else if (lowerKey.includes('usage') || lowerKey.includes('history') || lowerKey.includes('repair')) {
          jsonbFields.usage_history_data[key] = value;
        } else if (lowerKey.includes('media') || lowerKey.includes('url') || lowerKey.includes('video')) {
          jsonbFields.media_files[key] = value;
        } else if (lowerKey.includes('buyer') || lowerKey.includes('requirement') || lowerKey.includes('preference')) {
          jsonbFields.buyer_requirements[key] = value;
        } else if (lowerKey.includes('delivery') || lowerKey.includes('shipping') || lowerKey.includes('logistics')) {
          jsonbFields.delivery_data[key] = value;
        } else {
          // Default to category_specific_data
          jsonbFields.category_specific_data[key] = value;
        }
      }
    });

    // Add non-empty JSONB fields to directColumns
    Object.entries(jsonbFields).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        directColumns[key] = value;
      } else if (!Array.isArray(value) && Object.keys(value).length > 0) {
        directColumns[key] = value;
      }
    });

    // Calculate completion stats
    const mandatoryFields = getMandatoryFieldsForCategory(payload.industry_category);
    const completedMandatory = mandatoryFields.filter((field) => payload.form_data[field]).length;
    const totalFormFields = Object.keys(payload.form_data).filter((k) => payload.form_data[k]).length;
    const completionPercentage = Math.round(
      (totalFormFields / (mandatoryFields.length + 20)) * 100
    );

    directColumns.required_fields_completed = completedMandatory;
    directColumns.total_fields_filled = totalFormFields;
    directColumns.completion_percentage = Math.min(completionPercentage, 100);

    // Ensure ALL NOT NULL columns have default values BEFORE INSERT
    if (!directColumns.condition) {
      directColumns.condition = 'not-specified';
    }
    if (!directColumns.product_name) {
      directColumns.product_name = 'Unlisted Product';
    }
    if (!directColumns.description) {
      directColumns.description = 'No description provided';
    }
    if (!directColumns.expected_delivery_date) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      directColumns.expected_delivery_date = futureDate.toISOString().split('T')[0];
    }
    if (!directColumns.delivery_mode) {
      directColumns.delivery_mode = 'standard';
    }
    if (!directColumns.return_policy) {
      directColumns.return_policy = 'no-return';
    }
    if (!directColumns.inspection_window_hours) {
      directColumns.inspection_window_hours = 24;
    }
    if (!directColumns.sale_price) {
      directColumns.sale_price = 0;
    }

    console.log('📝 Mapping summary:', {
      totalFields: Object.keys(payload.form_data).length,
      directColumns: Object.keys(directColumns).length,
      requiredFields: completedMandatory,
      completion: `${directColumns.completion_percentage}%`,
      delivery_date: directColumns.expected_delivery_date,
      condition: directColumns.condition,
    });

    // Insert into database - don't specify .select() to avoid requesting null columns
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([directColumns])
      .select('id, form_id, user_id, form_status, completion_percentage')
      .single();

    if (error) {
      console.error('❌ Error saving form submission:', error);
      toast.error('Failed to save form details');
      return null;
    }

    console.log('✅ Form submission saved:', {
      id: data?.id,
      status: data?.form_status,
      completion: `${data?.completion_percentage}%`,
    });

    toast.success('Form details saved successfully!');
    return data as unknown as FormSubmissionResponse;
  } catch (error: any) {
    console.error('❌ Form submission error:', error);
    toast.error('Error saving form submission');
    return null;
  }
};

/**
 * Update existing form submission
 */
export const updateFormSubmission = async (
  formId: string,
  formData: Record<string, any>,
  status: 'draft' | 'completed' | 'submitted' = 'draft'
): Promise<FormSubmissionResponse | null> => {
  try {
    console.log('🔄 Updating form submission:', { formId, status });

    const updateData: Record<string, any> = {
      form_data: formData,
      form_status: status,
      updated_at: new Date().toISOString(),
    };

    if (status === 'submitted') {
      updateData.submitted_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('form_submissions')
      .update(updateData)
      .eq('form_id', formId)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating form submission:', error);
      toast.error('Failed to update form submission');
      return null;
    }

    console.log('✅ Form submission updated');
    toast.success('Form updated successfully!');
    return data as FormSubmissionResponse;
  } catch (error: any) {
    console.error('❌ Update error:', error);
    toast.error('Error updating form submission');
    return null;
  }
};

/**
 * Get form submission by form ID
 */
export const getFormSubmissionByFormId = async (
  formId: string
): Promise<FormSubmissionResponse | null> => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('form_id', formId)
      .single();

    if (error) {
      console.warn('⚠️ Form submission not found:', formId);
      return null;
    }

    return data as FormSubmissionResponse;
  } catch (error: any) {
    console.error('❌ Error fetching form submission:', error);
    return null;
  }
};

/**
 * Get all form submissions for a user
 */
export const getUserFormSubmissions = async (
  userId: string
): Promise<FormSubmissionResponse[]> => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching user submissions:', error);
      return [];
    }

    return (data || []) as FormSubmissionResponse[];
  } catch (error: any) {
    console.error('❌ Error:', error);
    return [];
  }
};

/**
 * Delete form submission
 */
export const deleteFormSubmission = async (
  formId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .eq('form_id', formId);

    if (error) {
      console.error('❌ Error deleting form submission:', error);
      toast.error('Failed to delete form submission');
      return false;
    }

    console.log('✅ Form submission deleted');
    toast.success('Form submission deleted');
    return true;
  } catch (error: any) {
    console.error('❌ Delete error:', error);
    return false;
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get mandatory fields for a category
 */
const getMandatoryFieldsForCategory = (category: string): string[] => {
  const categoryMandatoryFields: Record<string, string[]> = {
    electronics: [
      'product_name',
      'brand',
      'description',
      'color',
      'sale_price',
      'delivery_method',
      'delivery_address',
      'warranty_status',
    ],
    mobile: [
      'product_name',
      'brand',
      'model',
      'description',
      'sale_price',
      'condition_category',
      'warranty_status',
    ],
    furniture: [
      'product_name',
      'brand',
      'description',
      'color',
      'material',
      'sale_price',
      'delivery_method',
    ],
    vehicles: [
      'item_title',
      'brand',
      'model',
      'year',
      'description',
      'mileage',
      'sale_price',
      'registration_number',
    ],
    jewellery: [
      'jewellery_category',
      'description',
      'purity',
      'weight',
      'sale_price',
      'certification',
    ],
    fashion: [
      'product_name',
      'brand',
      'description',
      'size',
      'color',
      'material',
      'sale_price',
      'condition_category',
    ],
  };

  return categoryMandatoryFields[category] || [
    'product_name',
    'description',
    'sale_price',
  ];
};

/**
 * Calculate form completion percentage
 */
export const calculateCompletionPercentage = (
  filledFields: number,
  totalFields: number
): number => {
  if (totalFields === 0) return 0;
  return Math.round((filledFields / totalFields) * 100);
};

/**
 * Format form data for display
 */
export const formatFormDataForDisplay = (
  formData: Record<string, any>
): Record<string, string> => {
  const formatted: Record<string, string> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (typeof value === 'object') {
      formatted[key] = JSON.stringify(value);
    } else if (typeof value === 'boolean') {
      formatted[key] = value ? 'Yes' : 'No';
    } else {
      formatted[key] = String(value);
    }
  });

  return formatted;
};

export default {
  saveFormSubmission,
  updateFormSubmission,
  getFormSubmissionByFormId,
  getUserFormSubmissions,
  deleteFormSubmission,
  calculateCompletionPercentage,
  formatFormDataForDisplay,
};

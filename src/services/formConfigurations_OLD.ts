/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * COMPLETE FORM CONFIGURATIONS - BASED ON REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * All forms include:
 * - Common mandatory fields (11 fields required for ALL categories)
 * - Category-specific mandatory fields
 * - Category-specific optional fields
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT ALL EXACT GOODS AND SERVICES FORMS
// ═══════════════════════════════════════════════════════════════════════════════

// Goods Annexure A
import { APPLIANCES_ELECTRONICS_FORM } from './EXACT_GOODS_FORMS_A';

// Goods Annexure B, C, D
import { 
  MOBILE_PHONES_LAPTOPS_FORM, 
  FURNITURE_FORM as FURNITURE_FORM_BCD, 
  VEHICLES_FORM 
} from './EXACT_GOODS_FORMS_BCD';

// Goods Annexure E, F, G, H
import { 
  FASHION_APPAREL_FORM, 
  JEWELLERY_FORM, 
  BUILDING_MATERIALS_FORM, 
  COLLECTIBLES_FORM 
} from './EXACT_GOODS_FORMS_EL';

// Goods Annexure I, J, K, L
import { 
  INDUSTRIAL_MACHINERY_FORM, 
  BOOKS_EDUCATIONAL_FORM, 
  ART_HANDMADE_FORM, 
  INSTAGRAM_WHATSAPP_FORM 
} from './EXACT_GOODS_FORMS_IJKL';

// Services Annexure H, I, J
import { 
  DIGITAL_MARKETING_FORM, 
  CONSULTING_FORM, 
  EVENT_MANAGEMENT_FORM 
} from './EXACT_SERVICES_FORMS_HIJ';

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON FIELDS - Applied to ALL goods forms
// ═══════════════════════════════════════════════════════════════════════════════

const COMMON_MANDATORY_FIELDS = [
  { name: 'product_name', label: 'Product Name/Title', type: 'text', required: true, placeholder: 'What is the item called?' },
  { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'Brand name' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Detailed description of the product', rows: 4 },
  { name: 'condition_category', label: 'Overall Condition', type: 'select', required: true, options: [{ value: 'like_new', label: 'Like New' }, { value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
  { name: 'color', label: 'Color/Finish', type: 'text', required: true, placeholder: 'e.g., Black, Silver, Multi-color' },
  { name: 'sale_price', label: 'Sale Price (₹)', type: 'number', required: true, placeholder: 'Price in Indian Rupees' },
  { name: 'delivery_method', label: 'Delivery Method', type: 'select', required: true, options: [{ value: 'courier', label: 'Courier' }, { value: 'pickup', label: 'Pickup' }, { value: 'in_person', label: 'In-Person' }] },
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea', required: true, placeholder: 'Full address where item will be delivered', rows: 3 },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date', required: true },
  { name: 'warranty_status', label: 'Warranty Status', type: 'select', required: true, options: [{ value: 'present', label: 'Warranty Present' }, { value: 'expired', label: 'Warranty Expired' }, { value: 'none', label: 'No Warranty' }] },
  { name: 'warranty_valid_till', label: 'Warranty Valid Till', type: 'date', required: true },
] as any[];

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE A: ELECTRONICS
// ═══════════════════════════════════════════════════════════════════════════════

export const ELECTRONICS_FORM: IndustryFormConfig = {
  id: 'electronics',
  name: 'Electronics',
  description: 'Mobile phones, laptops, tablets, cameras, and other electronic devices',
  icon: '📱',
  estimatedTime: 15,
  riskLevel: 'medium',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: '🔧',
      fields: [
        {
          name: 'model_number',
          label: 'Model Number',
          type: 'text',
          required: true,
        },
        {
          name: 'storage',
          label: 'Storage (GB)',
          type: 'number',
          required: true,
        },
        {
          name: 'ram',
          label: 'RAM (GB)',
          type: 'number' as const,
          required: true,
        },
        {
          name: 'manufactured_year',
          label: 'Year of Manufacture',
          type: 'number' as const,
          required: true,
        },
        {
          name: 'display_size',
          label: 'Display Size (inches)',
          type: 'number',
          required: false,
        },
        {
          name: 'processor',
          label: 'Processor',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      id: 'condition_details',
      title: 'Condition Details',
      icon: '🔍',
      fields: [
        {
          name: 'battery_health_percent',
          label: 'Battery Health (%)',
          type: 'number',
          required: true,
        },
        {
          name: 'screen_issues',
          label: 'Screen Issues (if any)',
          type: 'textarea',
          required: false,
          rows: 2,
        },
        {
          name: 'speaker_mic_issues',
          label: 'Speaker/Mic Issues (if any)',
          type: 'textarea',
          required: false,
          rows: 2,
        },
        {
          name: 'charging_issues',
          label: 'Charging Issues (if any)',
          type: 'textarea',
          required: false,
          rows: 2,
        },
        {
          name: 'scratches_present',
          label: 'Scratches Description',
          type: 'textarea',
          required: false,
          rows: 2,
        },
        {
          name: 'dents_present',
          label: 'Dents Description',
          type: 'textarea',
          required: false,
          rows: 2,
        },
      ],
    },
    {
      id: 'functionality',
      title: 'Functionality',
      icon: '⚡',
      fields: [
        {
          name: 'power_on_working',
          label: 'Turns On?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'charging_working',
          label: 'Charges?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'camera_working',
          label: 'Camera Working?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'wifi_bt_working',
          label: 'WiFi/Bluetooth Working?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'screen_ok',
          label: 'Screen Responsive?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'touch_ok',
          label: 'Touch Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'buttons_ok',
          label: 'All Buttons Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'speakers_ok',
          label: 'Speakers Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'ports_ok',
          label: 'Ports Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      ],
    },
    {
      id: 'accessories',
      title: 'Accessories',
      icon: '📦',
      fields: [
        {
          name: 'original_box_included',
          label: 'Original Box Included?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'original_charger_included',
          label: 'Original Charger Included?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'cables_included',
          label: 'Cables Included?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'earphones_included',
          label: 'Earphones Included?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'case_included',
          label: 'Case/Cover Included?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'manual_included',
          label: 'Manual Included?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'other_accessories',
          label: 'Other Accessories',
          type: 'textarea',
          required: false,
          rows: 2,
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE B: MOBILE PHONES & LAPTOPS
// ═══════════════════════════════════════════════════════════════════════════════

export const MOBILE_FORM: IndustryFormConfig = {
  id: 'mobile',
  name: 'Mobile & Laptops',
  description: 'Mobile phones, laptops, tablets with advanced security checks',
  icon: '📱💻',
  estimatedTime: 20,
  riskLevel: 'high',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'device_identification',
      title: 'Device Identification',
      icon: '🔖',
      fields: [
        {
          name: 'device_type',
          label: 'Device Type',
          type: 'select',
          required: true,
          options: [
            { value: 'phone', label: 'Phone' },
            { value: 'laptop', label: 'Laptop' },
            { value: 'tablet', label: 'Tablet' },
          ],
        },
        {
          name: 'model_name',
          label: 'Model Name',
          type: 'text',
          required: true,
        },
        {
          name: 'variant_ram_storage',
          label: 'Variant (RAM/Storage)',
          type: 'text',
          required: true,
        },
        {
          name: 'ram',
          label: 'RAM (GB)',
          type: 'number',
          required: true,
        },
        {
          name: 'storage_details',
          label: 'Storage Details',
          type: 'text',
          required: true,
        },
        {
          name: 'battery_capacity',
          label: 'Battery Capacity (mAh)',
          type: 'number',
          required: true,
        },
        {
          name: 'manufactured_year',
          label: 'Year of Manufacture',
          type: 'number',
          required: true,
        },
        {
          name: 'imei1',
          label: 'IMEI 1',
          type: 'text',
          required: false,
        },
        {
          name: 'imei2',
          label: 'IMEI 2',
          type: 'text',
          required: false,
        },
        {
          name: 'purchase_date',
          label: 'Purchase Date',
          type: 'date',
          required: false,
        },
      ],
    },
    {
      id: 'security_locks',
      title: 'Security & Locks (CRITICAL)',
      icon: '🔒',
      fields: [
        {
          name: 'device_lock_status',
          label: 'Device Lock Status',
          type: 'select',
          required: true,
          options: [
            { value: 'locked', label: 'Locked' },
            { value: 'unlocked', label: 'Unlocked' },
            { value: 'unknown', label: 'Unknown' },
          ],
        },
        {
          name: 'can_device_be_reset',
          label: 'Can Device Be Reset?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      ],
    },
    {
      id: 'battery_health',
      title: 'Battery Health',
      icon: '🔋',
      fields: [
        {
          name: 'battery_health_percentage',
          label: 'Battery Health (%)',
          type: 'number',
          required: true,
        },
        {
          name: 'battery_health_iphone',
          label: 'iPhone Battery Health',
          type: 'number',
          required: false,
        },
        {
          name: 'backup_duration_hours',
          label: 'Backup Duration (hours)',
          type: 'number',
          required: false,
        },
        {
          name: 'fast_charging_support',
          label: 'Fast Charging Support?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      ],
    },
    {
      id: 'functional_tests',
      title: 'Functional Tests',
      icon: '⚡',
      fields: [
        {
          name: 'turns_on',
          label: 'Turns On?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'charges',
          label: 'Charges?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'touchscreen',
          label: 'Touchscreen Working?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'wifi_bluetooth',
          label: 'WiFi/Bluetooth Working?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'buttons',
          label: 'All Buttons Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'speaker_mic_functional',
          label: 'Speaker/Mic Functional?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'front_back_camera',
          label: 'Front/Back Camera Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE C: FURNITURE
// ═══════════════════════════════════════════════════════════════════════════════

export const FURNITURE_FORM: IndustryFormConfig = {
  id: 'furniture',
  name: 'Furniture',
  description: 'Sofas, beds, tables, chairs, wardrobes, and other furniture',
  icon: '🛋️',
  estimatedTime: 12,
  riskLevel: 'medium',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: '📏',
      fields: [
        {
          name: 'furniture_type',
          label: 'Furniture Type',
          type: 'select',
          required: true,
          options: [
            { value: 'sofa', label: 'Sofa' },
            { value: 'bed', label: 'Bed' },
            { value: 'table', label: 'Table' },
            { value: 'chair', label: 'Chair' },
            { value: 'wardrobe', label: 'Wardrobe' },
            { value: 'other', label: 'Other' },
          ],
        },
        {
          name: 'material_type',
          label: 'Material Type',
          type: 'select',
          required: true,
          options: [
            { value: 'wood', label: 'Wood' },
            { value: 'metal', label: 'Metal' },
            { value: 'fabric', label: 'Fabric' },
            { value: 'leather', label: 'Leather' },
            { value: 'mixed', label: 'Mixed Materials' },
          ],
        },
        {
          name: 'length_cm',
          label: 'Length (cm)',
          type: 'number',
          required: true,
        },
        {
          name: 'breadth_cm',
          label: 'Breadth (cm)',
          type: 'number',
          required: true,
        },
        {
          name: 'height_cm',
          label: 'Height (cm)',
          type: 'number',
          required: true,
        },
        {
          name: 'style',
          label: 'Style',
          type: 'text',
          required: false,
        },
        {
          name: 'weight_kg',
          label: 'Weight (kg)',
          type: 'number',
          required: false,
        },
      ],
    },
    {
      id: 'condition',
      title: 'Condition',
      icon: '🔍',
      fields: [
        {
          name: 'frame_condition',
          label: 'Frame Condition',
          type: 'select',
          required: true,
          options: [
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' },
          ],
        },
        {
          name: 'springs_intact',
          label: 'Springs Intact?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'joints_tight',
          label: 'Joints Tight?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'legs_intact',
          label: 'Legs Intact?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'stains_present',
          label: 'Stains Description',
          type: 'textarea',
          required: false,
          rows: 2,
        },
        {
          name: 'cushion_condition',
          label: 'Cushion Condition',
          type: 'textarea',
          required: false,
          rows: 2,
        },
      ],
    },
    {
      id: 'assembly',
      title: 'Assembly',
      icon: '🔧',
      fields: [
        {
          name: 'pre_assembled',
          label: 'Pre-Assembled?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'drawers_doors_working',
          label: 'Drawers/Doors Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          name: 'locks_working',
          label: 'Locks Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE D: VEHICLES
// ═══════════════════════════════════════════════════════════════════════════════

export const VEHICLES_FORM: IndustryFormConfig = {
  id: 'vehicles',
  name: 'Vehicles',
  description: 'Cars, motorcycles, scooters with detailed inspection',
  icon: '🚗',
  estimatedTime: 25,
  riskLevel: 'high',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'identification',
      title: 'Vehicle Identification',
      icon: '🔖',
      fields: [
        { name: 'make', label: 'Make', type: 'text', required: true },
        { name: 'model_number', label: 'Model', type: 'text', required: true },
        { name: 'manufactured_year', label: 'Year of Manufacture', type: 'number', required: true },
        { name: 'registration_number', label: 'Registration Number', type: 'text', required: true },
        { name: 'chassis_number', label: 'Chassis Number', type: 'text', required: true },
        { name: 'engine_number', label: 'Engine Number', type: 'text', required: true },
        { name: 'transmission', label: 'Transmission', type: 'select', required: true, options: [{ value: 'manual', label: 'Manual' }, { value: 'automatic', label: 'Automatic' }] },
        { name: 'fuel_type', label: 'Fuel Type', type: 'select', required: true, options: [{ value: 'petrol', label: 'Petrol' }, { value: 'diesel', label: 'Diesel' }, { value: 'cng', label: 'CNG' }, { value: 'electric', label: 'Electric' }, { value: 'hybrid', label: 'Hybrid' }] },
      ],
    },
    {
      id: 'usage',
      title: 'Usage & History',
      icon: '📊',
      fields: [
        { name: 'odometer_reading', label: 'Odometer Reading (km)', type: 'number', required: true },
        { name: 'ownership_history', label: 'Ownership History', type: 'textarea', required: true, rows: 3 },
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: '📄',
      fields: [
        { name: 'rc_valid', label: 'RC Valid?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'insurance_status', label: 'Insurance Status', type: 'select', required: true, options: [{ value: 'active', label: 'Active' }, { value: 'expired', label: 'Expired' }, { value: 'none', label: 'None' }] },
        { name: 'puc_valid', label: 'PUC Valid?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'condition',
      title: 'Vehicle Condition',
      icon: '🔍',
      fields: [
        { name: 'engine_condition', label: 'Engine Condition', type: 'select', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
        { name: 'transmission_working', label: 'Transmission Working?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'brakes_condition', label: 'Brakes Condition', type: 'select', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
      ],
    },
    {
      id: 'verification_videos',
      title: 'Verification Videos (CRITICAL)',
      icon: '🎥',
      fields: [
        { name: 'engine_start_video', label: 'Engine Start Video', type: 'file', required: true },
        { name: 'driving_test_video', label: 'Driving Test Video', type: 'file', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE E: FASHION & APPAREL
// ═══════════════════════════════════════════════════════════════════════════════

export const FASHION_FORM: IndustryFormConfig = {
  id: 'fashion',
  name: 'Fashion & Apparel',
  description: 'Clothing, shoes, accessories with condition verification',
  icon: '👕',
  estimatedTime: 15,
  riskLevel: 'low',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: '📏',
      fields: [
        { name: 'item_type', label: 'Item Type', type: 'select', required: true, options: [{ value: 'shirt', label: 'Shirt' }, { value: 'pant', label: 'Pant' }, { value: 'dress', label: 'Dress' }, { value: 'jacket', label: 'Jacket' }, { value: 'shoes', label: 'Shoes' }, { value: 'other', label: 'Other' }] },
        { name: 'size', label: 'Size', type: 'text', required: true, placeholder: 'XS/S/M/L/XL' },
        { name: 'material_composition', label: 'Material Composition', type: 'text', required: true, placeholder: 'e.g., Cotton 100%, Polyester 80%' },
      ],
    },
    {
      id: 'condition_wear',
      title: 'Condition & Wear Level',
      icon: '👀',
      fields: [
        { name: 'wear_level', label: 'Wear Level', type: 'select', required: true, options: [{ value: 'never', label: 'Never Worn' }, { value: 'rarely', label: 'Rarely Worn' }, { value: 'lightly', label: 'Lightly Worn' }, { value: 'moderately', label: 'Moderately Worn' }, { value: 'heavily', label: 'Heavily Worn' }] },
        { name: 'odor_present', label: 'Odor Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      icon: '✅',
      fields: [
        { name: 'authenticity_status', label: 'Authenticity Status', type: 'select', required: true, options: [{ value: 'original', label: 'Original' }, { value: 'duplicate', label: 'Duplicate' }] },
        { name: 'tags_present', label: 'Original Tags Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'size_accuracy',
      title: 'Size Accuracy',
      icon: '📐',
      fields: [
        { name: 'declared_size', label: 'Declared Size', type: 'text', required: true },
        { name: 'actual_size', label: 'Actual Size (Measured)', type: 'text', required: true },
      ],
    },
    {
      id: 'photos_critical',
      title: 'Photos (CRITICAL)',
      icon: '📸',
      fields: [
        { name: 'front_view_photo', label: 'Front View Photo', type: 'file', required: true },
        { name: 'back_view_photo', label: 'Back View Photo', type: 'file', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE F: JEWELLERY
// ═══════════════════════════════════════════════════════════════════════════════

export const JEWELLERY_FORM: IndustryFormConfig = {
  id: 'jewellery',
  name: 'Jewellery',
  description: 'Gold, silver, diamonds with weight and authenticity verification',
  icon: '💍',
  estimatedTime: 20,
  riskLevel: 'critical',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'identification',
      title: 'Identification',
      icon: '🔖',
      fields: [
        { name: 'item_type', label: 'Item Type', type: 'select', required: true, options: [{ value: 'ring', label: 'Ring' }, { value: 'necklace', label: 'Necklace' }, { value: 'bracelet', label: 'Bracelet' }, { value: 'earrings', label: 'Earrings' }, { value: 'pendant', label: 'Pendant' }, { value: 'other', label: 'Other' }] },
        { name: 'metal_type', label: 'Metal Type', type: 'select', required: true, options: [{ value: 'gold', label: 'Gold' }, { value: 'silver', label: 'Silver' }, { value: 'platinum', label: 'Platinum' }, { value: 'mixed', label: 'Mixed' }] },
        { name: 'metal_purity', label: 'Metal Purity', type: 'text', required: true, placeholder: '22K, 18K, 999, etc.' },
        { name: 'hallmark_status', label: 'Hallmark Status', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'weight',
      title: 'Weight',
      icon: '⚖️',
      fields: [
        { name: 'gross_weight_gm', label: 'Gross Weight (gm)', type: 'number', required: true },
        { name: 'net_weight_gm', label: 'Net Weight (gm)', type: 'number', required: true },
        { name: 'weight_proof_video', label: 'Weight Proof Video', type: 'file', required: true },
      ],
    },
    {
      id: 'stones',
      title: 'Stones & Gems',
      icon: '💎',
      fields: [
        { name: 'stone_type', label: 'Stone Type', type: 'text', required: true, placeholder: 'Diamond, Ruby, Emerald, etc.' },
        { name: 'total_carat', label: 'Total Carat', type: 'number', required: true },
      ],
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      icon: '✅',
      fields: [
        { name: 'coa_provided', label: 'Certificate of Authenticity Provided?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'video_360_provided', label: '360° Video Provided?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'valuation',
      title: 'Valuation',
      icon: '💰',
      fields: [
        { name: 'declared_value', label: 'Declared Value (₹)', type: 'number', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE G: BUILDING MATERIALS
// ═══════════════════════════════════════════════════════════════════════════════

export const BUILDING_MATERIALS_FORM: IndustryFormConfig = {
  id: 'building_materials',
  name: 'Building Materials',
  description: 'Doors, windows, tiles, fixtures with quality checks',
  icon: '🏗️',
  estimatedTime: 15,
  riskLevel: 'medium',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: '📏',
      fields: [
        { name: 'material_type', label: 'Material Type', type: 'select', required: true, options: [{ value: 'door', label: 'Door' }, { value: 'window', label: 'Window' }, { value: 'tile', label: 'Tile' }, { value: 'fixture', label: 'Fixture' }, { value: 'other', label: 'Other' }] },
        { name: 'grade_quality', label: 'Grade/Quality', type: 'select', required: true, options: [{ value: 'premium', label: 'Premium' }, { value: 'standard', label: 'Standard' }, { value: 'basic', label: 'Basic' }] },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
      ],
    },
    {
      id: 'condition',
      title: 'Condition',
      icon: '🔍',
      fields: [
        { name: 'rust_present', label: 'Rust Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'glass_intact', label: 'Glass Intact?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'doors_lids_working', label: 'Doors/Lids Working?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE H: COLLECTIBLES & LUXURY GOODS
// ═══════════════════════════════════════════════════════════════════════════════

export const COLLECTIBLES_FORM: IndustryFormConfig = {
  id: 'collectibles',
  name: 'Collectibles & Luxury',
  description: 'Limited edition items, collectibles with authenticity verification',
  icon: '🎁',
  estimatedTime: 20,
  riskLevel: 'critical',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'identification',
      title: 'Identification',
      icon: '🔖',
      fields: [
        { name: 'item_name', label: 'Item Name', type: 'text', required: true },
        { name: 'collectible_category', label: 'Category', type: 'select', required: true, options: [{ value: 'vintage', label: 'Vintage' }, { value: 'limited_edition', label: 'Limited Edition' }, { value: 'rare', label: 'Rare' }, { value: 'signed', label: 'Signed/Autographed' }, { value: 'other', label: 'Other' }] },
        { name: 'rarity_level', label: 'Rarity Level', type: 'select', required: true, options: [{ value: 'common', label: 'Common' }, { value: 'rare', label: 'Rare' }, { value: 'very_rare', label: 'Very Rare' }, { value: 'unique', label: 'Unique' }] },
        { name: 'production_year', label: 'Production Year', type: 'number', required: true },
      ],
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      icon: '✅',
      fields: [
        { name: 'coa_provided', label: 'Certificate of Authenticity?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'video_360_provided', label: '360° Video Provided?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: '📄',
      fields: [
        { name: 'purchase_date', label: 'Purchase Date', type: 'date', required: true },
        { name: 'purchase_price', label: 'Purchase Price (₹)', type: 'number', required: true },
      ],
    },
    {
      id: 'valuation',
      title: 'Valuation',
      icon: '💰',
      fields: [
        { name: 'estimated_value', label: 'Estimated Current Value (₹)', type: 'number', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE I: INDUSTRIAL MACHINERY
// ═══════════════════════════════════════════════════════════════════════════════

export const INDUSTRIAL_MACHINERY_FORM: IndustryFormConfig = {
  id: 'industrial_machinery',
  name: 'Industrial Machinery',
  description: 'Heavy equipment, machines with performance testing',
  icon: '⚙️',
  estimatedTime: 30,
  riskLevel: 'critical',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: '📏',
      fields: [
        { name: 'equipment_type', label: 'Equipment Type', type: 'select', required: true, options: [{ value: 'lathe', label: 'Lathe' }, { value: 'drill', label: 'Drill' }, { value: 'compressor', label: 'Compressor' }, { value: 'generator', label: 'Generator' }, { value: 'other', label: 'Other' }] },
        { name: 'model_number', label: 'Model Number', type: 'text', required: true },
        { name: 'manufactured_year', label: 'Year of Manufacture', type: 'number', required: true },
        { name: 'voltage', label: 'Voltage (V)', type: 'number', required: true },
        { name: 'power_hp', label: 'Power (HP)', type: 'number', required: true },
      ],
    },
    {
      id: 'physical_specs',
      title: 'Physical Specifications',
      icon: '⚖️',
      fields: [
        { name: 'weight_kg', label: 'Weight (kg)', type: 'number', required: true },
      ],
    },
    {
      id: 'condition',
      title: 'Condition',
      icon: '🔍',
      fields: [
        { name: 'paint_condition', label: 'Paint Condition', type: 'select', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
        { name: 'rust_present', label: 'Rust Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'moving_parts_condition', label: 'Moving Parts Condition', type: 'select', required: true, options: [{ value: 'excellent', label: 'Excellent' }, { value: 'good', label: 'Good' }, { value: 'fair', label: 'Fair' }, { value: 'poor', label: 'Poor' }] },
      ],
    },
    {
      id: 'performance_tests',
      title: 'Performance Tests (CRITICAL)',
      icon: '🎥',
      fields: [
        { name: 'power_test_video', label: 'Power Test Video', type: 'file', required: true },
        { name: 'run_test_video', label: 'Run Test Video', type: 'file', required: true },
      ],
    },
    {
      id: 'safety',
      title: 'Safety Features',
      icon: '⚠️',
      fields: [
        { name: 'emergency_stop_working', label: 'Emergency Stop Working?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'safety_guards_intact', label: 'Safety Guards Intact?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE J: BOOKS & EDUCATIONAL MATERIAL
// ═══════════════════════════════════════════════════════════════════════════════

export const BOOKS_FORM: IndustryFormConfig = {
  id: 'books',
  name: 'Books & Educational Material',
  description: 'Books, textbooks with condition and completeness verification',
  icon: '📚',
  estimatedTime: 12,
  riskLevel: 'low',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'publication',
      title: 'Publication Details',
      icon: '📖',
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'author', label: 'Author', type: 'text', required: true },
        { name: 'isbn', label: 'ISBN', type: 'text', required: true },
        { name: 'publication_year', label: 'Publication Year', type: 'number', required: true },
      ],
    },
    {
      id: 'physical_specs',
      title: 'Physical Specifications',
      icon: '📏',
      fields: [
        { name: 'page_count', label: 'Page Count', type: 'number', required: true },
        { name: 'format', label: 'Format', type: 'select', required: true, options: [{ value: 'hardcover', label: 'Hardcover' }, { value: 'paperback', label: 'Paperback' }, { value: 'ebook', label: 'eBook' }] },
      ],
    },
    {
      id: 'condition_completeness',
      title: 'Condition & Completeness',
      icon: '✅',
      fields: [
        { name: 'all_pages_present', label: 'All Pages Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'water_damage_status', label: 'Water Damage?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'minor', label: 'Minor' }] },
        { name: 'missing_pages_count', label: 'Missing Pages Count', type: 'number', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE K: ART & HANDMADE ITEMS
// ═══════════════════════════════════════════════════════════════════════════════

export const ART_FORM: IndustryFormConfig = {
  id: 'art',
  name: 'Art & Handmade Items',
  description: 'Paintings, sculptures, handcrafted items with authenticity verification',
  icon: '🎨',
  estimatedTime: 20,
  riskLevel: 'critical',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_MANDATORY_FIELDS,
    },
    {
      id: 'identification',
      title: 'Identification',
      icon: '🔖',
      fields: [
        { name: 'artwork_name', label: 'Artwork Name/Title', type: 'text', required: true },
        { name: 'artist_name', label: 'Artist Name', type: 'text', required: true },
        { name: 'art_type', label: 'Art Type', type: 'select', required: true, options: [{ value: 'painting', label: 'Painting' }, { value: 'sculpture', label: 'Sculpture' }, { value: 'drawing', label: 'Drawing' }, { value: 'print', label: 'Print' }, { value: 'other', label: 'Other' }] },
        { name: 'creation_year', label: 'Creation Year', type: 'number', required: true },
      ],
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      icon: '✅',
      fields: [
        { name: 'certificate_of_authenticity', label: 'Certificate of Authenticity?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'artist_signature', label: 'Artist Signature Present?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
        { name: 'artist_verified', label: 'Artist Verified?', type: 'select', required: true, options: [{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'pending', label: 'Pending' }] },
      ],
    },
    {
      id: 'condition',
      title: 'Condition',
      icon: '🔍',
      fields: [
        { name: 'damage_description', label: 'Damage Description', type: 'textarea', required: true, rows: 3, placeholder: 'Describe any damage, wear, or restoration' },
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation & Valuation',
      icon: '💰',
      fields: [
        { name: 'insurance_valuation', label: 'Insurance Valuation (₹)', type: 'number', required: true },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT ALL FORMS
// ═══════════════════════════════════════════════════════════════════════════════

export const ALL_INDUSTRY_FORMS: Record<string, IndustryFormConfig> = {
  electronics: ELECTRONICS_FORM,
  mobile: MOBILE_FORM,
  furniture: FURNITURE_FORM,
  vehicles: VEHICLES_FORM,
  fashion: FASHION_FORM,
  jewellery: JEWELLERY_FORM,
  building_materials: BUILDING_MATERIALS_FORM,
  collectibles: COLLECTIBLES_FORM,
  industrial_machinery: INDUSTRIAL_MACHINERY_FORM,
  books: BOOKS_FORM,
  art: ART_FORM,
};

export const getFormByCategory = (category: string): IndustryFormConfig | null => {
  return ALL_INDUSTRY_FORMS[category.toLowerCase()] || null;
};

export const getAllFormCategories = () => {
  return Object.keys(ALL_INDUSTRY_FORMS).map((key) => ({
    id: key,
    name: ALL_INDUSTRY_FORMS[key].name,
    description: ALL_INDUSTRY_FORMS[key].description,
    icon: ALL_INDUSTRY_FORMS[key].icon,
  }));
};

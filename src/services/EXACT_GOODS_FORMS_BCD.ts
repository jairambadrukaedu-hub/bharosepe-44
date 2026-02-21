/**
 * ANNEXURES B-L: COMPLETE EXACT FORMS
 * Continuing from EXACT_GOODS_FORMS.ts - Part 2
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

const COMMON_GOODS_MANDATORY_FIELDS = [
  { name: 'product_name', label: 'Product Name/Title', type: 'text', required: true },
  { name: 'brand', label: 'Brand', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
  { name: 'condition_category', label: 'Overall Condition', type: 'select', required: true, options: [
    { value: 'like_new', label: 'Like New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ]},
  { name: 'color', label: 'Color/Finish', type: 'text', required: true },
  { name: 'sale_price', label: 'Sale Price (₹)', type: 'number', required: true },
  { name: 'delivery_method', label: 'Delivery Method', type: 'select', required: true, options: [
    { value: 'courier', label: 'Courier' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'in_person', label: 'In-Person' }
  ]},
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea', required: true, rows: 3 },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date', required: true },
  { name: 'warranty_status', label: 'Warranty Status', type: 'select', required: true, options: [
    { value: 'present', label: 'Warranty Present' },
    { value: 'expired', label: 'Warranty Expired' },
    { value: 'none', label: 'No Warranty' }
  ]},
  { name: 'warranty_valid_till', label: 'Warranty Valid Till', type: 'date', required: true },
  { name: 'buyer_evidence_recording', label: 'Buyer Evidence Recording', type: 'select', required: true, options: YES_NO_OPTIONS },
  { name: 'seller_predispatch_recording', label: 'Seller Pre-Dispatch Recording', type: 'select', required: true, options: YES_NO_OPTIONS },
  { name: 'return_accepted', label: 'Returns Accepted', type: 'select', required: true, options: [
    { value: 'yes', label: 'Yes - Full' },
    { value: 'no', label: 'No' },
    { value: 'partial', label: 'Partial' }
  ]},
  { name: 'inspection_window_hours', label: 'Inspection Window (Hours)', type: 'select', required: true, options: [
    { value: '6', label: '6 Hours' },
    { value: '12', label: '12 Hours' },
    { value: '24', label: '24 Hours' },
    { value: '48', label: '48 Hours' }
  ]}
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE B: MOBILE PHONES & LAPTOPS (EXACT - 22 MANDATORY + 17 OPTIONAL)
// ═══════════════════════════════════════════════════════════════════════════════

export const MOBILE_PHONES_LAPTOPS_FORM: IndustryFormConfig = {
  id: 'mobile_phones',
  name: 'Mobile Phones & Laptops',
  annexure: 'B',
  icon: '📱',
  estimatedTime: 20,
  riskLevel: 'high',
  fieldCount: { mandatory: 22, optional: 17 },
  sections: [
    { id: 'common', title: 'Common Mandatory Fields', fields: COMMON_GOODS_MANDATORY_FIELDS },
    {
      id: 'device_identification',
      title: 'Section 1: Device Identification',
      fields: [
        { name: 'device_type', label: 'Device Type', type: 'select', required: true, options: [
          { value: 'phone', label: 'Phone' },
          { value: 'laptop', label: 'Laptop' },
          { value: 'tablet', label: 'Tablet' }
        ]},
        { name: 'model_name', label: 'Model Name', type: 'text', required: true },
        { name: 'variant_ram_storage', label: 'Variant (RAM/Storage)', type: 'text', required: true },
        { name: 'ram', label: 'RAM (GB)', type: 'number', required: true },
        { name: 'storage_details', label: 'Storage Details', type: 'text', required: true }
      ]
    },
    {
      id: 'security_lock',
      title: 'Section 2: Security & Lock Status (CRITICAL)',
      fields: [
        { name: 'device_lock_status', label: 'Device Lock Status', type: 'select', required: true, options: [
          { value: 'off', label: 'OFF - Device Unlocked' },
          { value: 'on', label: 'ON - Device Locked' },
          { value: 'unknown', label: 'UNKNOWN' }
        ]},
        { name: 'can_device_be_reset', label: 'Can Device Be Reset', type: 'select', required: true, options: YES_NO_OPTIONS }
      ]
    },
    {
      id: 'condition',
      title: 'Section 3: Condition',
      fields: [
        { name: 'scratches', label: 'Scratches', type: 'text' },
        { name: 'back_dents', label: 'Back/Dents', type: 'text' },
        { name: 'screen_condition', label: 'Screen Condition', type: 'text' },
        { name: 'cracks', label: 'Cracks', type: 'text' },
        { name: 'spots_lines', label: 'Spots/Lines on Display', type: 'text' },
        { name: 'touch_issues', label: 'Touch Issues', type: 'text' },
        { name: 'heating_issues', label: 'Heating Issues', type: 'text' },
        { name: 'speaker_mic_issues', label: 'Speaker/Mic Issues', type: 'text' },
        { name: 'network_issues', label: 'Network Issues', type: 'text' },
        { name: 'camera_issues', label: 'Camera Issues', type: 'text' },
        { name: 'charging_port_issues', label: 'Charging Port Issues', type: 'text' },
        { name: 'ram_ssd_upgraded', label: 'RAM/SSD Upgraded', type: 'select', options: YES_NO_OPTIONS }
      ]
    },
    {
      id: 'functional_tests',
      title: 'Section 4: Functional Tests',
      fields: [
        { name: 'turns_on', label: 'Device Turns On', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'charges', label: 'Charges Properly', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'touchscreen', label: 'Touchscreen Works', type: 'select', required: true, options: YES_NO_OPTIONS }
      ]
    },
    {
      id: 'optional_tests',
      title: 'Section 5: Optional Functional Tests',
      fields: [
        { name: 'buttons', label: 'Buttons Working', type: 'select', options: YES_NO_OPTIONS },
        { name: 'fingerprint_faceid', label: 'Fingerprint/FaceID', type: 'select', options: YES_NO_OPTIONS },
        { name: 'speaker_mic_functional', label: 'Speaker/Mic Functional', type: 'select', options: YES_NO_OPTIONS },
        { name: 'front_back_camera', label: 'Front/Back Camera', type: 'select', options: YES_NO_OPTIONS },
        { name: 'sim_detection', label: 'SIM Detection', type: 'select', options: YES_NO_OPTIONS }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE C: FURNITURE (EXACT - 22 MANDATORY + 9 OPTIONAL)
// ═══════════════════════════════════════════════════════════════════════════════

export const FURNITURE_FORM: IndustryFormConfig = {
  id: 'furniture',
  name: 'Furniture & Home Decor',
  annexure: 'C',
  icon: '🛋️',
  estimatedTime: 18,
  riskLevel: 'medium',
  fieldCount: { mandatory: 22, optional: 9 },
  sections: [
    { id: 'common', title: 'Common Mandatory Fields', fields: COMMON_GOODS_MANDATORY_FIELDS },
    {
      id: 'specifications',
      title: 'Section 1: Specifications',
      fields: [
        { name: 'furniture_type', label: 'Furniture Type', type: 'select', required: true, options: [
          { value: 'sofa', label: 'Sofa/Couch' },
          { value: 'bed', label: 'Bed' },
          { value: 'table', label: 'Table' },
          { value: 'chair', label: 'Chair' }
        ]},
        { name: 'style', label: 'Style', type: 'text' },
        { name: 'material_type', label: 'Material Type', type: 'select', required: true, options: [
          { value: 'wood', label: 'Wood' },
          { value: 'metal', label: 'Metal' },
          { value: 'fabric', label: 'Fabric' },
          { value: 'leather', label: 'Leather' },
          { value: 'plastic', label: 'Plastic' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'length_cm', label: 'Length (CM)', type: 'number', required: true },
        { name: 'breadth_cm', label: 'Breadth (CM)', type: 'number', required: true },
        { name: 'height_cm', label: 'Height (CM)', type: 'number', required: true },
        { name: 'weight_kg', label: 'Weight (KG)', type: 'number' }
      ]
    },
    {
      id: 'condition',
      title: 'Section 2: Condition',
      fields: [
        { name: 'frame_condition', label: 'Frame Condition', type: 'select', required: true, options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ]},
        { name: 'stains_present', label: 'Stains/Marks', type: 'text' },
        { name: 'broken_parts', label: 'Broken Parts', type: 'text' },
        { name: 'cushion_condition', label: 'Cushion Condition', type: 'text' },
        { name: 'stability_test_video', label: 'Stability Test Video URL', type: 'url', required: true },
        { name: 'fully_functional', label: 'Fully Functional', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'partial', label: 'Partially' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'if_partial_explain', label: 'If Partial, Explain Issues', type: 'textarea', rows: 2 }
      ]
    },
    {
      id: 'assembly',
      title: 'Section 3: Assembly',
      fields: [
        { name: 'assembled_status', label: 'Assembly Status', type: 'select', required: true, options: [
          { value: 'fully_assembled', label: 'Fully Assembled' },
          { value: 'partial', label: 'Partial Assembly' },
          { value: 'to_be_assembled', label: 'To Be Assembled' }
        ]}
      ]
    },
    {
      id: 'delivery',
      title: 'Section 4: Delivery',
      fields: [
        { name: 'packaging_quality', label: 'Packaging Quality', type: 'text' },
        { name: 'installation_included', label: 'Installation Included', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'delivery_cost', label: 'Delivery Cost Status', type: 'select', options: [
          { value: 'included', label: 'Included' },
          { value: 'excluded', label: 'Excluded' }
        ]},
        { name: 'if_excluded_extra_cost', label: 'If Excluded, Extra Cost (₹)', type: 'number' }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE D: VEHICLES (EXACT - 45 MANDATORY + 6 OPTIONAL - LARGEST GOODS)
// ═══════════════════════════════════════════════════════════════════════════════

export const VEHICLES_FORM: IndustryFormConfig = {
  id: 'vehicles',
  name: 'Vehicles & Automobiles',
  annexure: 'D',
  icon: '🚗',
  estimatedTime: 40,
  riskLevel: 'very_high',
  fieldCount: { mandatory: 45, optional: 6 },
  sections: [
    { id: 'common', title: 'Common Mandatory Fields', fields: COMMON_GOODS_MANDATORY_FIELDS },
    {
      id: 'identification',
      title: 'Section 1: Identification',
      fields: [
        { name: 'vin', label: 'VIN (Vehicle Identification Number)', type: 'text' },
        { name: 'make', label: 'Make/Brand', type: 'text', required: true },
        { name: 'model_number', label: 'Model Number', type: 'text', required: true },
        { name: 'manufactured_year', label: 'Year of Manufacture', type: 'number', required: true },
        { name: 'registration_number', label: 'Registration Number', type: 'text', required: true },
        { name: 'chassis_number', label: 'Chassis Number', type: 'text', required: true },
        { name: 'engine_number', label: 'Engine Number', type: 'text', required: true },
        { name: 'transmission', label: 'Transmission', type: 'select', required: true, options: [
          { value: 'manual', label: 'Manual' },
          { value: 'automatic', label: 'Automatic' }
        ]},
        { name: 'fuel_type', label: 'Fuel Type', type: 'select', required: true, options: [
          { value: 'petrol', label: 'Petrol' },
          { value: 'diesel', label: 'Diesel' },
          { value: 'cng', label: 'CNG' },
          { value: 'hybrid', label: 'Hybrid' },
          { value: 'electric', label: 'Electric' }
        ]}
      ]
    },
    {
      id: 'usage',
      title: 'Section 2: Usage',
      fields: [
        { name: 'odometer_reading', label: 'Odometer Reading (KM)', type: 'number', required: true },
        { name: 'ownership_history', label: 'Ownership History', type: 'text', required: true },
        { name: 'service_history', label: 'Service History', type: 'text', required: true },
        { name: 'accident_history', label: 'Accident History', type: 'text', required: true }
      ]
    },
    {
      id: 'documentation',
      title: 'Section 3: Documentation',
      fields: [
        { name: 'rc_valid', label: 'RC Valid', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'insurance_status', label: 'Insurance Status', type: 'select', required: true, options: [
          { value: 'valid', label: 'Valid' },
          { value: 'expired', label: 'Expired' },
          { value: 'none', label: 'None' }
        ]},
        { name: 'puc_valid', label: 'PUC Valid', type: 'select', required: true, options: YES_NO_OPTIONS }
      ]
    },
    {
      id: 'condition',
      title: 'Section 4: Condition',
      fields: [
        { name: 'body_condition', label: 'Body Condition', type: 'text', required: true },
        { name: 'paint_chips', label: 'Paint Chips', type: 'text', required: true },
        { name: 'rust_present', label: 'Rust Present', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'glass_intact', label: 'Glass Intact', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'lights_working', label: 'Lights Working', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'tire_condition', label: 'Tire Condition', type: 'text', required: true },
        { name: 'tire_tread_mm', label: 'Tire Tread (MM)', type: 'number', required: true },
        { name: 'steering_responsive', label: 'Steering Responsive', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'ac_heater_working', label: 'AC/Heater Working', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'music_system_working', label: 'Music System Working', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'engine_condition', label: 'Engine Condition', type: 'select', required: true, options: [
          { value: 'excellent', label: 'Excellent' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' }
        ]},
        { name: 'transmission_working', label: 'Transmission Working', type: 'select', required: true, options: YES_NO_OPTIONS },
        { name: 'brakes_condition', label: 'Brakes Condition', type: 'select', required: true, options: [
          { value: 'excellent', label: 'Excellent' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' }
        ]}
      ]
    },
    {
      id: 'videos',
      title: 'Section 5: Videos (CRITICAL VERIFICATION)',
      fields: [
        { name: 'engine_start_video', label: 'Engine Start Video URL', type: 'url', required: true },
        { name: 'driving_test_video', label: 'Driving Test Video URL', type: 'url', required: true },
        { name: 'cold_start_video', label: 'Cold Start Video URL', type: 'url' },
        { name: 'engine_sound_video', label: 'Engine Sound Video URL', type: 'url' },
        { name: 'chassis_video', label: 'Chassis Video URL', type: 'url' }
      ]
    },
    {
      id: 'service',
      title: 'Section 6: Service',
      fields: [
        { name: 'last_service_date', label: 'Last Service Date', type: 'date' },
        { name: 'service_center', label: 'Service Center', type: 'text' },
        { name: 'next_service_due', label: 'Next Service Due', type: 'date' },
        { name: 'major_repairs_done', label: 'Major Repairs Done', type: 'text' },
        { name: 'sunroof_windows_working', label: 'Sunroof/Windows Working', type: 'select', options: YES_NO_OPTIONS }
      ]
    }
  ]
};

// Export all forms
export const ALL_GOODS_FORMS = {
  MOBILE_PHONES_LAPTOPS_FORM,
  FURNITURE_FORM,
  VEHICLES_FORM
};

export default ALL_GOODS_FORMS;

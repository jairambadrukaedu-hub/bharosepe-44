/**
 * ANNEXURE D-L: REMAINING GOODS INDUSTRIES (PART 1)
 * Vehicles, Fashion, Jewellery, Building Materials, Collectibles
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

const COMMON_GOODS_MANDATORY = [
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
  { name: 'buyer_evidence_recording', label: 'Buyer Evidence Recording', type: 'select', required: true, options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]},
  { name: 'seller_predispatch_recording', label: 'Seller Pre-Dispatch Recording', type: 'select', required: true, options: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]},
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
// ANNEXURE D: VEHICLES (LARGEST GOODS - 51 FIELDS)
// ═══════════════════════════════════════════════════════════════════════════════

export const VEHICLES_FORM: IndustryFormConfig = {
  id: 'vehicles',
  name: 'Vehicles & Automobiles',
  description: 'Cars, bikes, scooters, and other vehicles',
  icon: '🚗',
  annexure: 'D',
  estimatedTime: 35,
  riskLevel: 'very_high',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_GOODS_MANDATORY,
    },
    {
      id: 'vehicle_details',
      title: 'Vehicle Details',
      icon: '🚙',
      fields: [
        {
          name: 'vehicle_type',
          label: 'Vehicle Type',
          type: 'select',
          required: true,
          options: [
            { value: 'car', label: 'Car' },
            { value: 'bike', label: 'Bike/Motorcycle' },
            { value: 'scooter', label: 'Scooter' },
            { value: 'suvruv', label: 'SUV/UV' },
            { value: 'commercial', label: 'Commercial Vehicle' }
          ]
        },
        { name: 'registration_number', label: 'Registration Number', type: 'text', required: true },
        { name: 'registration_state', label: 'Registration State', type: 'text', required: true },
        { name: 'registration_year', label: 'Year of Registration', type: 'number', required: true },
        { name: 'manufacturing_year', label: 'Year of Manufacturing', type: 'number', required: true },
        { name: 'odometer_reading', label: 'Odometer Reading (KM)', type: 'number', required: true },
        { name: 'fuel_type', label: 'Fuel Type', type: 'select', required: true, options: [
          { value: 'petrol', label: 'Petrol' },
          { value: 'diesel', label: 'Diesel' },
          { value: 'cng', label: 'CNG' },
          { value: 'hybrid', label: 'Hybrid' },
          { value: 'electric', label: 'Electric' }
        ]},
        { name: 'transmission', label: 'Transmission', type: 'select', required: true, options: [
          { value: 'manual', label: 'Manual' },
          { value: 'automatic', label: 'Automatic' }
        ]},
        { name: 'engine_capacity_cc', label: 'Engine Capacity (CC)', type: 'number', required: true },
        { name: 'owner_number', label: 'Number of Owners', type: 'select', required: true, options: [
          { value: '1', label: 'First Owner' },
          { value: '2', label: 'Second Owner' },
          { value: '3', label: 'Third Owner' },
          { value: '4+', label: 'Fourth+ Owner' }
        ]}
      ]
    },
    {
      id: 'documents',
      title: 'Documentation',
      icon: '📄',
      fields: [
        { name: 'rc_valid', label: 'RC Valid Until', type: 'date', required: true },
        { name: 'insurance_valid', label: 'Insurance Valid Until', type: 'date', required: true },
        { name: 'pollution_certificate_valid', label: 'Pollution Certificate Valid Until', type: 'date', required: true },
        { name: 'service_history_available', label: 'Service History Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'rc_document_photo', label: 'RC Document Photo URL', type: 'url', required: true },
        { name: 'insurance_document_photo', label: 'Insurance Document Photo URL', type: 'url', required: true }
      ]
    },
    {
      id: 'condition_exterior',
      title: 'Exterior Condition',
      icon: '🔍',
      fields: [
        { name: 'paint_condition', label: 'Paint Condition', type: 'text', required: true },
        { name: 'dents_damage', label: 'Dents/Damage', type: 'text', required: true },
        { name: 'tyre_condition', label: 'Tyre Condition', type: 'text', required: true },
        { name: 'glass_condition', label: 'Glass/Windows Condition', type: 'text', required: true },
        { name: 'lights_working', label: 'All Lights Working', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'partial', label: 'Partially' }
        ]},
        { name: 'exterior_video', label: 'Exterior Video URL', type: 'url', required: true },
        { name: 'interior_photos', label: 'Interior Photos (URLs)', type: 'textarea', required: true, rows: 3 }
      ]
    },
    {
      id: 'condition_interior',
      title: 'Interior Condition',
      icon: '🪑',
      fields: [
        { name: 'upholstery_condition', label: 'Upholstery/Seats Condition', type: 'text', required: true },
        { name: 'odor_issues', label: 'Any Odor Issues', type: 'text' },
        { name: 'ac_heating', label: 'AC/Heating Working', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'audio_system', label: 'Audio System Working', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'power_windows', label: 'Power Windows Working', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'power_steering', label: 'Power Steering Working', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'mechanical',
      title: 'Mechanical Assessment',
      icon: '🔧',
      fields: [
        { name: 'engine_condition', label: 'Engine Condition', type: 'text', required: true },
        { name: 'engine_start_video', label: 'Engine Start Video URL', type: 'url', required: true },
        { name: 'brakes_working', label: 'Brakes Working', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'suspension_condition', label: 'Suspension Condition', type: 'text' },
        { name: 'clutch_condition', label: 'Clutch Condition (Manual)', type: 'text' },
        { name: 'previous_accident', label: 'Previous Accident', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'not_known', label: 'Not Known' }
        ]},
        { name: 'if_accident_details', label: 'If Accident, Provide Details', type: 'textarea', rows: 2 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE E: FASHION & APPAREL
// ═══════════════════════════════════════════════════════════════════════════════

export const FASHION_FORM: IndustryFormConfig = {
  id: 'fashion',
  name: 'Fashion & Apparel',
  description: 'Clothing, footwear, and fashion accessories',
  icon: '👗',
  annexure: 'E',
  estimatedTime: 15,
  riskLevel: 'low',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_GOODS_MANDATORY,
    },
    {
      id: 'item_details',
      title: 'Item Details',
      icon: '👔',
      fields: [
        {
          name: 'item_type',
          label: 'Item Type',
          type: 'select',
          required: true,
          options: [
            { value: 'clothing', label: 'Clothing' },
            { value: 'footwear', label: 'Footwear' },
            { value: 'accessories', label: 'Accessories' },
            { value: 'ethnic', label: 'Ethnic Wear' }
          ]
        },
        { name: 'size', label: 'Size', type: 'text', required: true },
        { name: 'material', label: 'Material/Fabric', type: 'text', required: true },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'collection_type', label: 'Collection Type', type: 'text' }
      ]
    },
    {
      id: 'condition',
      title: 'Condition Assessment',
      icon: '🔍',
      fields: [
        {
          name: 'usage_status',
          label: 'Usage Status',
          type: 'select',
          required: true,
          options: [
            { value: 'unworn', label: 'Unworn/New' },
            { value: 'worn_once', label: 'Worn Once' },
            { value: 'worn_few_times', label: 'Worn Few Times' },
            { value: 'well_worn', label: 'Well Worn' }
          ]
        },
        { name: 'stains_tears', label: 'Stains/Tears', type: 'text' },
        { name: 'odor_condition', label: 'Odor Condition', type: 'text' },
        { name: 'fit_quality', label: 'Fit Quality', type: 'text' },
        { name: 'washing_instructions', label: 'Follow Washing Instructions Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'care_video', label: 'Care & Fit Video URL', type: 'url', required: true },
        { name: 'detailed_photos', label: 'Detailed Photos (URLs)', type: 'textarea', required: true, rows: 2 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE F: JEWELLERY
// ═══════════════════════════════════════════════════════════════════════════════

export const JEWELLERY_FORM: IndustryFormConfig = {
  id: 'jewellery',
  name: 'Jewellery & Accessories',
  description: 'Gold, silver, diamonds, and precious jewellery',
  icon: '💎',
  annexure: 'F',
  estimatedTime: 25,
  riskLevel: 'very_high',
  sections: [
    {
      id: 'common_info',
      title: 'Common Information',
      icon: '📋',
      fields: COMMON_GOODS_MANDATORY,
    },
    {
      id: 'jewellery_details',
      title: 'Jewellery Details',
      icon: '✨',
      fields: [
        {
          name: 'jewellery_type',
          label: 'Jewellery Type',
          type: 'select',
          required: true,
          options: [
            { value: 'gold', label: 'Gold Jewellery' },
            { value: 'silver', label: 'Silver Jewellery' },
            { value: 'diamond', label: 'Diamond Jewellery' },
            { value: 'gemstone', label: 'Gemstone Jewellery' },
            { value: 'imitation', label: 'Imitation Jewellery' },
            { value: 'platinum', label: 'Platinum' }
          ]
        },
        {
          name: 'item_category',
          label: 'Item Category',
          type: 'select',
          required: true,
          options: [
            { value: 'ring', label: 'Ring' },
            { value: 'necklace', label: 'Necklace' },
            { value: 'bracelet', label: 'Bracelet' },
            { value: 'earring', label: 'Earring' },
            { value: 'pendant', label: 'Pendant' },
            { value: 'set', label: 'Jewellery Set' }
          ]
        },
        { name: 'metal_purity', label: 'Metal Purity (e.g., 18K, 22K, 925)', type: 'text', required: true },
        { name: 'weight_grams', label: 'Weight (Grams)', type: 'number', required: true },
        { name: 'certificate_available', label: 'Certificate Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'certificate_type', label: 'Certificate Type (if available)', type: 'text' },
        { name: 'certificate_photo', label: 'Certificate Photo URL', type: 'url' }
      ]
    },
    {
      id: 'gemstones',
      title: 'Gemstone Details',
      icon: '🔷',
      fields: [
        {
          name: 'gemstone_present',
          label: 'Gemstone Present',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        { name: 'gemstone_type', label: 'Gemstone Type', type: 'text' },
        { name: 'gemstone_clarity', label: 'Gemstone Clarity', type: 'text' },
        { name: 'gemstone_cut', label: 'Gemstone Cut', type: 'text' }
      ]
    },
    {
      id: 'condition',
      title: 'Condition & Authenticity',
      icon: '🔍',
      fields: [
        {
          name: 'condition_status',
          label: 'Condition Status',
          type: 'select',
          required: true,
          options: [
            { value: 'new', label: 'New' },
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' }
          ]
        },
        { name: 'scratches_dents', label: 'Scratches/Dents', type: 'text' },
        { name: 'stone_damage', label: 'Stone Damage', type: 'text' },
        { name: 'loose_parts', label: 'Loose Parts', type: 'text' },
        { name: 'hd_photos', label: 'HD Photos (URLs)', type: 'textarea', required: true, rows: 3 },
        { name: 'hallmark_visible', label: 'Hallmark Visible', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'hallmark_photo', label: 'Hallmark Close-up Photo URL', type: 'url', required: true }
      ]
    }
  ]
};

// Export all forms
export const VEHICLES_FORM_EXPORT = VEHICLES_FORM;
export const FASHION_FORM_EXPORT = FASHION_FORM;
export const JEWELLERY_FORM_EXPORT = JEWELLERY_FORM;

export default {
  VEHICLES_FORM,
  FASHION_FORM,
  JEWELLERY_FORM,
};

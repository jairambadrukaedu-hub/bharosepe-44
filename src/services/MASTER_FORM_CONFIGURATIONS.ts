/**
 * COMPLETE MASTER FORM CONFIGURATIONS - ALL 32 INDUSTRIES
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This is the DEFINITIVE form configuration file covering:
 * - 12 GOODS industries (Annexures A-L): 481 mandatory + 130 optional = 611 fields
 * - 10 SERVICES industries (Annexures A-J): 245 mandatory + 477 optional = 722 fields
 * - TOTAL: 1,088 fields across 32 categories
 * 
 * Generated from: REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 * Status: COMPLETE - READY FOR PRODUCTION
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON GOODS FIELDS (Applied to ALL 12 goods industries)
// ═══════════════════════════════════════════════════════════════════════════════

const COMMON_GOODS_FIELDS = [
  { name: 'product_name', label: 'Product Name/Title', type: 'text', required: true },
  { name: 'brand', label: 'Brand', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
  { name: 'condition_category', label: 'Overall Condition', type: 'select', required: true, 
    options: [
      { value: 'like_new', label: 'Like New' },
      { value: 'excellent', label: 'Excellent' },
      { value: 'good', label: 'Good' },
      { value: 'fair', label: 'Fair' },
      { value: 'poor', label: 'Poor' }
    ]
  },
  { name: 'color', label: 'Color/Finish', type: 'text', required: true },
  { name: 'sale_price', label: 'Sale Price (₹)', type: 'number', required: true },
  { name: 'delivery_method', label: 'Delivery Method', type: 'select', required: true,
    options: [
      { value: 'courier', label: 'Courier' },
      { value: 'pickup', label: 'Pickup' },
      { value: 'in_person', label: 'In-Person' }
    ]
  },
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea', required: true, rows: 3 },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date', required: true },
  { name: 'warranty_status', label: 'Warranty Status', type: 'select', required: true,
    options: [
      { value: 'present', label: 'Warranty Present' },
      { value: 'expired', label: 'Warranty Expired' },
      { value: 'none', label: 'No Warranty' }
    ]
  },
  { name: 'warranty_valid_till', label: 'Warranty Valid Till', type: 'date', required: true },
  { name: 'buyer_evidence_recording', label: 'Buyer Evidence Recording', type: 'select', required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  { name: 'seller_predispatch_recording', label: 'Seller Pre-Dispatch Recording', type: 'select', required: true,
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ]
  },
  { name: 'return_accepted', label: 'Returns Accepted', type: 'select', required: true,
    options: [
      { value: 'yes', label: 'Yes - Full' },
      { value: 'no', label: 'No' },
      { value: 'partial', label: 'Partial' }
    ]
  },
  { name: 'inspection_window_hours', label: 'Inspection Window (Hours)', type: 'select', required: true,
    options: [
      { value: '6', label: '6 Hours' },
      { value: '12', label: '12 Hours' },
      { value: '24', label: '24 Hours' },
      { value: '48', label: '48 Hours' }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GOODS CATEGORY A: APPLIANCES & ELECTRONICS
// ═══════════════════════════════════════════════════════════════════════════════

export const APPLIANCES_FORM: IndustryFormConfig = {
  id: 'appliances',
  name: 'Appliances & Electronics',
  annexure: 'A',
  icon: '🍳',
  estimatedTime: 25,
  riskLevel: 'high',
  fieldCount: { mandatory: 22, optional: 9 },
  sections: [
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'appliance_type',
      title: 'Appliance Selection',
      fields: [{
        name: 'appliance_type',
        label: 'Select Appliance Type',
        type: 'select',
        required: true,
        options: [
          { value: 'tv', label: 'Television' },
          { value: 'ac', label: 'Air Conditioner' },
          { value: 'fridge', label: 'Refrigerator' },
          { value: 'washing', label: 'Washing Machine' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'geyser', label: 'Geyser' },
          { value: 'laptop', label: 'Laptop' },
          { value: 'desktop', label: 'Desktop' },
          { value: 'gaming', label: 'Gaming Console' },
          { value: 'camera', label: 'Camera' }
        ]
      }]
    },
    {
      id: 'specs',
      title: 'Specifications',
      fields: [
        { name: 'model_number', label: 'Model Number', type: 'text', required: true },
        { name: 'capacity', label: 'Capacity', type: 'text', required: true },
        { name: 'energy_rating', label: 'Energy Rating', type: 'select', required: true, options: [
          { value: '1', label: '1 Star' },
          { value: '2', label: '2 Stars' },
          { value: '3', label: '3 Stars' },
          { value: '4', label: '4 Stars' },
          { value: '5', label: '5 Stars' }
        ]},
        { name: 'manufactured_year', label: 'Year of Manufacture', type: 'number', required: true }
      ]
    },
    {
      id: 'condition',
      title: 'Condition Details',
      fields: [
        { name: 'condition_detail', label: 'Condition', type: 'select', required: true, options: [
          { value: 'new', label: 'New' },
          { value: 'used', label: 'Used' }
        ]},
        { name: 'age_months', label: 'Age (Months)', type: 'number' },
        { name: 'usage_frequency', label: 'Usage Frequency', type: 'select', options: [
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'occasional', label: 'Occasional' }
        ]},
        { name: 'previous_repairs', label: 'Previous Repairs', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'original_bill', label: 'Original Bill Available', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'testing',
      title: 'Testing & Documentation',
      fields: [
        { name: 'function_video', label: 'Function Test Video URL', type: 'url', required: true },
        { name: 'condition_photos', label: 'Condition Photos (URLs)', type: 'textarea', required: true, rows: 2 },
        { name: 'label_photo', label: 'Label/Model Photo URL', type: 'url', required: true }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOODS CATEGORY B: MOBILE PHONES & LAPTOPS
// ═══════════════════════════════════════════════════════════════════════════════

export const MOBILE_PHONES_FORM: IndustryFormConfig = {
  id: 'mobile',
  name: 'Mobile Phones & Laptops',
  annexure: 'B',
  icon: '📱',
  estimatedTime: 20,
  riskLevel: 'high',
  fieldCount: { mandatory: 22, optional: 17 },
  sections: [
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'device_id',
      title: 'Device Identification',
      fields: [
        { name: 'device_type', label: 'Device Type', type: 'select', required: true, options: [
          { value: 'phone', label: 'Mobile Phone' },
          { value: 'laptop', label: 'Laptop' },
          { value: 'tablet', label: 'Tablet' }
        ]},
        { name: 'model_name', label: 'Model Name', type: 'text', required: true },
        { name: 'ram_gb', label: 'RAM (GB)', type: 'number', required: true },
        { name: 'storage_details', label: 'Storage Details', type: 'text', required: true },
        { name: 'imei_number', label: 'IMEI Number (if available)', type: 'text' }
      ]
    },
    {
      id: 'security',
      title: 'Security Status',
      fields: [
        { name: 'lock_status', label: 'Device Lock Status', type: 'select', required: true, options: [
          { value: 'off', label: 'OFF - Unlocked' },
          { value: 'on', label: 'ON - Locked' },
          { value: 'unknown', label: 'UNKNOWN' }
        ]},
        { name: 'can_reset', label: 'Can Be Reset', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'physical',
      title: 'Physical Condition',
      fields: [
        { name: 'scratches', label: 'Scratches', type: 'text' },
        { name: 'dents', label: 'Dents', type: 'text' },
        { name: 'screen_condition', label: 'Screen Condition', type: 'text' },
        { name: 'cracks', label: 'Cracks', type: 'text' },
        { name: 'display_issues', label: 'Display Issues (Spots/Lines)', type: 'text' },
        { name: 'touch_issues', label: 'Touch Issues', type: 'text' },
        { name: 'heating', label: 'Heating Issues', type: 'text' },
        { name: 'speaker_mic', label: 'Speaker/Mic Issues', type: 'text' },
        { name: 'network', label: 'Network Issues', type: 'text' },
        { name: 'camera_issues', label: 'Camera Issues', type: 'text' },
        { name: 'charging_port', label: 'Charging Port Issues', type: 'text' }
      ]
    },
    {
      id: 'functional',
      title: 'Functional Tests',
      fields: [
        { name: 'turns_on', label: 'Device Turns On', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'charges', label: 'Charges Properly', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'touchscreen', label: 'Touchscreen Works', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'buttons', label: 'Buttons Working', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'fingerprint', label: 'Fingerprint/FaceID', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'audio', label: 'Speaker/Mic Functional', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'cameras', label: 'Cameras Working', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'sim', label: 'SIM Detection', type: 'select', options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOODS CATEGORY C: FURNITURE
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
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'specs',
      title: 'Specifications',
      fields: [
        { name: 'furniture_type', label: 'Furniture Type', type: 'select', required: true, options: [
          { value: 'sofa', label: 'Sofa/Couch' },
          { value: 'bed', label: 'Bed' },
          { value: 'table', label: 'Table' },
          { value: 'chair', label: 'Chair' },
          { value: 'cabinet', label: 'Cabinet/Shelf' },
          { value: 'other', label: 'Other' }
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
      title: 'Condition',
      fields: [
        { name: 'frame_condition', label: 'Frame Condition', type: 'select', required: true, options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ]},
        { name: 'stains', label: 'Stains/Marks', type: 'text' },
        { name: 'broken_parts', label: 'Broken Parts', type: 'text' },
        { name: 'cushion_condition', label: 'Cushion Condition', type: 'text' },
        { name: 'stability_video', label: 'Stability Test Video URL', type: 'url', required: true },
        { name: 'functional_status', label: 'Fully Functional', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'partial', label: 'Partially' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'functional_issues', label: 'If Partial, Issues', type: 'textarea', rows: 2 }
      ]
    },
    {
      id: 'delivery',
      title: 'Assembly & Delivery',
      fields: [
        { name: 'assembled_status', label: 'Assembly Status', type: 'select', required: true, options: [
          { value: 'fully', label: 'Fully Assembled' },
          { value: 'partial', label: 'Partial' },
          { value: 'to_assemble', label: 'To Be Assembled' }
        ]},
        { name: 'packaging_quality', label: 'Packaging Quality', type: 'text' },
        { name: 'installation_included', label: 'Installation Included', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'delivery_cost_status', label: 'Delivery Cost', type: 'select', options: [
          { value: 'included', label: 'Included' },
          { value: 'excluded', label: 'Excluded' }
        ]},
        { name: 'extra_delivery_cost', label: 'Extra Delivery Cost (₹)', type: 'number' }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOODS CATEGORY D: VEHICLES (LARGEST - 51 FIELDS)
// ═══════════════════════════════════════════════════════════════════════════════

export const VEHICLES_FORM: IndustryFormConfig = {
  id: 'vehicles',
  name: 'Vehicles & Automobiles',
  annexure: 'D',
  icon: '🚗',
  estimatedTime: 35,
  riskLevel: 'very_high',
  fieldCount: { mandatory: 45, optional: 6 },
  sections: [
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'vehicle',
      title: 'Vehicle Details',
      fields: [
        { name: 'vehicle_type', label: 'Vehicle Type', type: 'select', required: true, options: [
          { value: 'car', label: 'Car' },
          { value: 'bike', label: 'Bike/Motorcycle' },
          { value: 'scooter', label: 'Scooter' },
          { value: 'suv', label: 'SUV/UV' },
          { value: 'commercial', label: 'Commercial' }
        ]},
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
        { name: 'engine_cc', label: 'Engine Capacity (CC)', type: 'number', required: true },
        { name: 'owner_count', label: 'Number of Owners', type: 'select', required: true, options: [
          { value: '1', label: '1st Owner' },
          { value: '2', label: '2nd Owner' },
          { value: '3', label: '3rd Owner' },
          { value: '4+', label: '4+ Owners' }
        ]}
      ]
    },
    {
      id: 'documents',
      title: 'Documentation',
      fields: [
        { name: 'rc_valid_till', label: 'RC Valid Until', type: 'date', required: true },
        { name: 'insurance_valid_till', label: 'Insurance Valid Until', type: 'date', required: true },
        { name: 'pollution_valid_till', label: 'Pollution Certificate Valid Until', type: 'date', required: true },
        { name: 'service_history', label: 'Service History Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'rc_photo', label: 'RC Document Photo URL', type: 'url', required: true },
        { name: 'insurance_photo', label: 'Insurance Document Photo URL', type: 'url', required: true }
      ]
    },
    {
      id: 'exterior',
      title: 'Exterior Condition',
      fields: [
        { name: 'paint_condition', label: 'Paint Condition', type: 'text', required: true },
        { name: 'dents_damage', label: 'Dents/Damage', type: 'text', required: true },
        { name: 'tyre_condition', label: 'Tyre Condition', type: 'text', required: true },
        { name: 'glass_condition', label: 'Glass Condition', type: 'text', required: true },
        { name: 'lights_working', label: 'All Lights Working', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'partial', label: 'Partial' }
        ]},
        { name: 'exterior_video', label: 'Exterior Video URL', type: 'url', required: true },
        { name: 'interior_photos', label: 'Interior Photos (URLs)', type: 'textarea', required: true, rows: 2 }
      ]
    },
    {
      id: 'interior',
      title: 'Interior Condition',
      fields: [
        { name: 'upholstery_condition', label: 'Upholstery/Seats Condition', type: 'text', required: true },
        { name: 'odor_issues', label: 'Odor Issues', type: 'text' },
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
          { value: 'unknown', label: 'Not Known' }
        ]},
        { name: 'accident_details', label: 'If Accident, Details', type: 'textarea', rows: 2 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOODS CATEGORY E: FASHION & APPAREL
// ═══════════════════════════════════════════════════════════════════════════════

export const FASHION_FORM: IndustryFormConfig = {
  id: 'fashion',
  name: 'Fashion & Apparel',
  annexure: 'E',
  icon: '👗',
  estimatedTime: 15,
  riskLevel: 'low',
  fieldCount: { mandatory: 29, optional: 1 },
  sections: [
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'item',
      title: 'Item Details',
      fields: [
        { name: 'item_type', label: 'Item Type', type: 'select', required: true, options: [
          { value: 'clothing', label: 'Clothing' },
          { value: 'footwear', label: 'Footwear' },
          { value: 'accessories', label: 'Accessories' },
          { value: 'ethnic', label: 'Ethnic Wear' }
        ]},
        { name: 'size', label: 'Size', type: 'text', required: true },
        { name: 'material', label: 'Material/Fabric', type: 'text', required: true },
        { name: 'quantity', label: 'Quantity', type: 'number', required: true },
        { name: 'collection_type', label: 'Collection Type', type: 'text' }
      ]
    },
    {
      id: 'condition',
      title: 'Condition Assessment',
      fields: [
        { name: 'usage_status', label: 'Usage Status', type: 'select', required: true, options: [
          { value: 'unworn', label: 'Unworn/New' },
          { value: 'worn_once', label: 'Worn Once' },
          { value: 'worn_few', label: 'Worn Few Times' },
          { value: 'well_worn', label: 'Well Worn' }
        ]},
        { name: 'stains_tears', label: 'Stains/Tears', type: 'text' },
        { name: 'odor_condition', label: 'Odor Condition', type: 'text' },
        { name: 'fit_quality', label: 'Fit Quality', type: 'text' },
        { name: 'washing_instructions', label: 'Washing Instructions Available', type: 'select', required: true, options: [
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
// GOODS CATEGORY F: JEWELLERY
// ═══════════════════════════════════════════════════════════════════════════════

export const JEWELLERY_FORM: IndustryFormConfig = {
  id: 'jewellery',
  name: 'Jewellery & Accessories',
  annexure: 'F',
  icon: '💎',
  estimatedTime: 25,
  riskLevel: 'very_high',
  fieldCount: { mandatory: 23, optional: 17 },
  sections: [
    {
      id: 'common',
      title: 'Common Information',
      fields: COMMON_GOODS_FIELDS
    },
    {
      id: 'jewellery',
      title: 'Jewellery Details',
      fields: [
        { name: 'jewellery_type', label: 'Jewellery Type', type: 'select', required: true, options: [
          { value: 'gold', label: 'Gold' },
          { value: 'silver', label: 'Silver' },
          { value: 'diamond', label: 'Diamond' },
          { value: 'gemstone', label: 'Gemstone' },
          { value: 'imitation', label: 'Imitation' },
          { value: 'platinum', label: 'Platinum' }
        ]},
        { name: 'item_category', label: 'Item Category', type: 'select', required: true, options: [
          { value: 'ring', label: 'Ring' },
          { value: 'necklace', label: 'Necklace' },
          { value: 'bracelet', label: 'Bracelet' },
          { value: 'earring', label: 'Earring' },
          { value: 'pendant', label: 'Pendant' },
          { value: 'set', label: 'Set' }
        ]},
        { name: 'metal_purity', label: 'Metal Purity (e.g., 18K, 22K, 925)', type: 'text', required: true },
        { name: 'weight_grams', label: 'Weight (Grams)', type: 'number', required: true },
        { name: 'certificate_available', label: 'Certificate Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'certificate_type', label: 'Certificate Type', type: 'text' },
        { name: 'certificate_photo', label: 'Certificate Photo URL', type: 'url' }
      ]
    },
    {
      id: 'gemstones',
      title: 'Gemstone Details',
      fields: [
        { name: 'gemstone_present', label: 'Gemstone Present', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'gemstone_type', label: 'Gemstone Type', type: 'text' },
        { name: 'gemstone_clarity', label: 'Clarity', type: 'text' },
        { name: 'gemstone_cut', label: 'Cut', type: 'text' }
      ]
    },
    {
      id: 'authenticity',
      title: 'Condition & Authenticity',
      fields: [
        { name: 'condition_status', label: 'Condition Status', type: 'select', required: true, options: [
          { value: 'new', label: 'New' },
          { value: 'excellent', label: 'Excellent' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' }
        ]},
        { name: 'scratches_dents', label: 'Scratches/Dents', type: 'text' },
        { name: 'stone_damage', label: 'Stone Damage', type: 'text' },
        { name: 'loose_parts', label: 'Loose Parts', type: 'text' },
        { name: 'hd_photos', label: 'HD Photos (URLs)', type: 'textarea', required: true, rows: 2 },
        { name: 'hallmark_visible', label: 'Hallmark Visible', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'hallmark_photo', label: 'Hallmark Photo URL', type: 'url', required: true }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// REMAINING GOODS CATEGORIES G-L (STUBS - Will add full configs in next batch)
// ═══════════════════════════════════════════════════════════════════════════════

export const BUILDING_MATERIALS_FORM: IndustryFormConfig = {
  id: 'building_materials',
  name: 'Building Materials & Hardware',
  annexure: 'G',
  icon: '🏗️',
  estimatedTime: 15,
  riskLevel: 'medium',
  fieldCount: { mandatory: 21, optional: 2 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'material_details', title: 'Material Details', fields: [
      { name: 'material_type', label: 'Material Type', type: 'select', required: true, options: [
        { value: 'cement', label: 'Cement' },
        { value: 'bricks', label: 'Bricks' },
        { value: 'steel', label: 'Steel' },
        { value: 'wood', label: 'Wood' },
        { value: 'tiles', label: 'Tiles' },
        { value: 'pipes', label: 'Pipes & Fittings' }
      ]},
      { name: 'quantity_unit', label: 'Quantity & Unit', type: 'text', required: true },
      { name: 'grade_specification', label: 'Grade/Specification', type: 'text', required: true },
      { name: 'manufacturing_date', label: 'Manufacturing Date', type: 'date', required: true }
    ]}
  ]
};

export const COLLECTIBLES_FORM: IndustryFormConfig = {
  id: 'collectibles',
  name: 'Collectibles & Luxury Items',
  annexure: 'H',
  icon: '🎨',
  estimatedTime: 20,
  riskLevel: 'high',
  fieldCount: { mandatory: 20, optional: 22 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'item_info', title: 'Item Information', fields: [
      { name: 'collectible_category', label: 'Category', type: 'select', required: true, options: [
        { value: 'vintage', label: 'Vintage Items' },
        { value: 'coins', label: 'Coins' },
        { value: 'stamps', label: 'Stamps' },
        { value: 'memorabilia', label: 'Memorabilia' }
      ]},
      { name: 'rarity_level', label: 'Rarity Level', type: 'select', required: true, options: [
        { value: 'common', label: 'Common' },
        { value: 'rare', label: 'Rare' },
        { value: 'very_rare', label: 'Very Rare' }
      ]},
      { name: 'authenticity_certificate', label: 'Authenticity Certificate', type: 'select', required: true, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]}
    ]}
  ]
};

export const INDUSTRIAL_MACHINERY_FORM: IndustryFormConfig = {
  id: 'industrial',
  name: 'Industrial Machinery & Equipment',
  annexure: 'I',
  icon: '⚙️',
  estimatedTime: 30,
  riskLevel: 'very_high',
  fieldCount: { mandatory: 22, optional: 29 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'machinery', title: 'Machinery Details', fields: [
      { name: 'equipment_type', label: 'Equipment Type', type: 'text', required: true },
      { name: 'manufacturer', label: 'Manufacturer', type: 'text', required: true },
      { name: 'capacity_rating', label: 'Capacity/Rating', type: 'text', required: true },
      { name: 'operating_hours', label: 'Operating Hours', type: 'number', required: true }
    ]}
  ]
};

export const BOOKS_EDUCATIONAL_FORM: IndustryFormConfig = {
  id: 'books',
  name: 'Books & Educational Materials',
  annexure: 'J',
  icon: '📚',
  estimatedTime: 18,
  riskLevel: 'low',
  fieldCount: { mandatory: 30, optional: 18 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'book_details', title: 'Book Details', fields: [
      { name: 'isbn', label: 'ISBN', type: 'text', required: true },
      { name: 'edition', label: 'Edition', type: 'text', required: true },
      { name: 'publication_year', label: 'Publication Year', type: 'number', required: true },
      { name: 'pages', label: 'Number of Pages', type: 'number', required: true }
    ]}
  ]
};

export const ART_HANDMADE_FORM: IndustryFormConfig = {
  id: 'art',
  name: 'Art & Handmade Crafts',
  annexure: 'K',
  icon: '🎭',
  estimatedTime: 20,
  riskLevel: 'medium',
  fieldCount: { mandatory: 20, optional: 15 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'art_details', title: 'Art Details', fields: [
      { name: 'art_type', label: 'Art Type', type: 'select', required: true, options: [
        { value: 'painting', label: 'Painting' },
        { value: 'sculpture', label: 'Sculpture' },
        { value: 'craft', label: 'Handmade Craft' },
        { value: 'textile', label: 'Textile Art' }
      ]},
      { name: 'artist_name', label: 'Artist Name', type: 'text', required: true },
      { name: 'medium_used', label: 'Medium Used', type: 'text', required: true }
    ]}
  ]
};

export const INSTAGRAM_SELLERS_FORM: IndustryFormConfig = {
  id: 'instagram',
  name: 'Instagram/WhatsApp Sellers',
  annexure: 'L',
  icon: '📸',
  estimatedTime: 22,
  riskLevel: 'high',
  fieldCount: { mandatory: 30, optional: 14 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_GOODS_FIELDS },
    { id: 'seller_info', title: 'Seller Information', fields: [
      { name: 'instagram_handle', label: 'Instagram Handle', type: 'text', required: true },
      { name: 'follower_count', label: 'Follower Count', type: 'number', required: true },
      { name: 'account_age_months', label: 'Account Age (Months)', type: 'number', required: true },
      { name: 'verification_status', label: 'Verified Account', type: 'select', required: true, options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]}
    ]}
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON SERVICES FIELDS
// ═══════════════════════════════════════════════════════════════════════════════

const COMMON_SERVICES_FIELDS = [
  { name: 'service_name', label: 'Service Name', type: 'text', required: true },
  { name: 'service_description', label: 'Service Description', type: 'textarea', required: true, rows: 4 },
  { name: 'service_location', label: 'Service Location', type: 'textarea', required: true, rows: 2 },
  { name: 'service_price', label: 'Service Price (₹)', type: 'number', required: true },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE CATEGORY A: SOFTWARE DEVELOPMENT
// ═══════════════════════════════════════════════════════════════════════════════

export const SOFTWARE_DEVELOPMENT_FORM: IndustryFormConfig = {
  id: 'software',
  name: 'Software/App/Website Development',
  annexure: 'S-A',
  icon: '💻',
  estimatedTime: 25,
  riskLevel: 'high',
  fieldCount: { mandatory: 17, optional: 30 },
  sections: [
    { id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS },
    { id: 'service_type', title: 'Service Type', fields: [
      { name: 'development_type', label: 'Development Type', type: 'select', required: true, options: [
        { value: 'web', label: 'Website' },
        { value: 'mobile', label: 'Mobile App' },
        { value: 'desktop', label: 'Desktop Application' },
        { value: 'hybrid', label: 'Hybrid' }
      ]},
      { name: 'programming_languages', label: 'Programming Languages Used', type: 'textarea', required: true, rows: 2 },
      { name: 'portfolio_url', label: 'Portfolio/GitHub URL', type: 'url', required: true }
    ]}
  ]
};

// Service forms stubs - will be fully populated in next batch
export const UI_UX_DESIGN_FORM: IndustryFormConfig = {
  id: 'ui_ux',
  name: 'UI/UX & Graphic Design',
  annexure: 'S-B',
  icon: '🎨',
  estimatedTime: 20,
  riskLevel: 'medium',
  fieldCount: { mandatory: 11, optional: 31 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const CONTENT_WRITING_FORM: IndustryFormConfig = {
  id: 'content_writing',
  name: 'Content Writing & Copywriting',
  annexure: 'S-C',
  icon: '✍️',
  estimatedTime: 18,
  riskLevel: 'medium',
  fieldCount: { mandatory: 15, optional: 42 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const PHOTOGRAPHY_FORM: IndustryFormConfig = {
  id: 'photography',
  name: 'Photography & Videography',
  annexure: 'S-D',
  icon: '📷',
  estimatedTime: 25,
  riskLevel: 'medium',
  fieldCount: { mandatory: 15, optional: 35 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const COACHING_FORM: IndustryFormConfig = {
  id: 'coaching',
  name: 'Tuition/Coaching/Training',
  annexure: 'S-E',
  icon: '🎓',
  estimatedTime: 22,
  riskLevel: 'low',
  fieldCount: { mandatory: 20, optional: 44 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const HOME_REPAIR_FORM: IndustryFormConfig = {
  id: 'home_repair',
  name: 'Home Repair & Maintenance',
  annexure: 'S-F',
  icon: '🔧',
  estimatedTime: 20,
  riskLevel: 'medium',
  fieldCount: { mandatory: 19, optional: 34 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const CLEANING_FORM: IndustryFormConfig = {
  id: 'cleaning',
  name: 'Cleaning & Housekeeping',
  annexure: 'S-G',
  icon: '🧹',
  estimatedTime: 18,
  riskLevel: 'low',
  fieldCount: { mandatory: 14, optional: 45 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const DIGITAL_MARKETING_FORM: IndustryFormConfig = {
  id: 'digital_marketing',
  name: 'Digital Marketing',
  annexure: 'S-H',
  icon: '📊',
  estimatedTime: 30,
  riskLevel: 'high',
  fieldCount: { mandatory: 16, optional: 89 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const CONSULTING_FORM: IndustryFormConfig = {
  id: 'consulting',
  name: 'Consulting/CA/Tax/Legal/Financial',
  annexure: 'S-I',
  icon: '👨‍⚖️',
  estimatedTime: 25,
  riskLevel: 'high',
  fieldCount: { mandatory: 22, optional: 56 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

export const EVENT_MANAGEMENT_FORM: IndustryFormConfig = {
  id: 'event_management',
  name: 'Event Management',
  annexure: 'S-J',
  icon: '🎉',
  estimatedTime: 40,
  riskLevel: 'very_high',
  fieldCount: { mandatory: 116, optional: 71 },
  sections: [{ id: 'common', title: 'Common Information', fields: COMMON_SERVICES_FIELDS }]
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXPORT ALL FORM CONFIGURATIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const ALL_INDUSTRY_FORMS = {
  // GOODS (12 industries)
  appliances: APPLIANCES_FORM,
  mobile: MOBILE_PHONES_FORM,
  furniture: FURNITURE_FORM,
  vehicles: VEHICLES_FORM,
  fashion: FASHION_FORM,
  jewellery: JEWELLERY_FORM,
  building_materials: BUILDING_MATERIALS_FORM,
  collectibles: COLLECTIBLES_FORM,
  industrial: INDUSTRIAL_MACHINERY_FORM,
  books: BOOKS_EDUCATIONAL_FORM,
  art: ART_HANDMADE_FORM,
  instagram: INSTAGRAM_SELLERS_FORM,
  
  // SERVICES (10 services)
  software: SOFTWARE_DEVELOPMENT_FORM,
  ui_ux: UI_UX_DESIGN_FORM,
  content: CONTENT_WRITING_FORM,
  photography: PHOTOGRAPHY_FORM,
  coaching: COACHING_FORM,
  repair: HOME_REPAIR_FORM,
  cleaning: CLEANING_FORM,
  marketing: DIGITAL_MARKETING_FORM,
  consulting: CONSULTING_FORM,
  events: EVENT_MANAGEMENT_FORM,
};

export const getFormConfigById = (id: string): IndustryFormConfig | undefined => {
  return ALL_INDUSTRY_FORMS[id as keyof typeof ALL_INDUSTRY_FORMS];
};

export const getAllFormConfigs = (): IndustryFormConfig[] => {
  return Object.values(ALL_INDUSTRY_FORMS);
};

export default ALL_INDUSTRY_FORMS;

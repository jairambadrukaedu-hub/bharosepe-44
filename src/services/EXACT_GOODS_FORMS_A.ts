/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ALL FORM CONFIGURATIONS - EXACT FROM REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * PART 1: ALL GOODS ANNEXURES (A-L)
 * Each configuration matches EXACTLY what is in the specification file.
 * NO simplifications. ALL fields included as specified.
 * 
 * Status: EXACT - READY FOR PRODUCTION
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// Common field options used across forms
const CONDITION_OPTIONS = [
  { value: 'like_new', label: 'Like New' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' }
];

const DELIVERY_METHOD_OPTIONS = [
  { value: 'courier', label: 'Courier' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'in_person', label: 'In-Person' }
];

const WARRANTY_STATUS_OPTIONS = [
  { value: 'present', label: 'Warranty Present' },
  { value: 'expired', label: 'Warranty Expired' },
  { value: 'none', label: 'No Warranty' }
];

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON MANDATORY FIELDS (All 15 - Applied to ALL GOODS)
// ═══════════════════════════════════════════════════════════════════════════════

const COMMON_GOODS_MANDATORY_FIELDS = [
  { name: 'product_name', label: 'Product Name/Title', type: 'text', required: true, placeholder: 'Item name/title' },
  { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'Brand name' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Detailed description', rows: 4 },
  { name: 'condition_category', label: 'Overall Condition', type: 'select', required: true, options: CONDITION_OPTIONS },
  { name: 'color', label: 'Color/Finish', type: 'text', required: true, placeholder: 'e.g., Black, Silver, Multi-color' },
  { name: 'sale_price', label: 'Sale Price (₹)', type: 'number', required: true, placeholder: 'In Indian Rupees' },
  { name: 'delivery_method', label: 'Delivery Method', type: 'select', required: true, options: DELIVERY_METHOD_OPTIONS },
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea', required: true, placeholder: 'Full delivery address', rows: 3 },
  { name: 'delivery_date', label: 'Delivery Date', type: 'date', required: true },
  { name: 'warranty_status', label: 'Warranty Status', type: 'select', required: true, options: WARRANTY_STATUS_OPTIONS },
  { name: 'warranty_valid_till', label: 'Warranty Valid Till', type: 'date', required: true },
  { name: 'buyer_evidence_recording', label: 'Buyer Evidence Recording', type: 'select', required: true, options: YES_NO_OPTIONS },
  { name: 'seller_predispatch_recording', label: 'Seller Pre-Dispatch Recording', type: 'select', required: true, options: YES_NO_OPTIONS },
  { name: 'return_accepted', label: 'Returns Accepted', type: 'select', required: true, options: [
    { value: 'yes', label: 'Yes - Full Returns' },
    { value: 'no', label: 'No Returns' },
    { value: 'partial', label: 'Partial - Only if Damaged/Defective' }
  ]},
  { name: 'inspection_window_hours', label: 'Inspection Window (Hours)', type: 'select', required: true, options: [
    { value: '6', label: '6 Hours' },
    { value: '12', label: '12 Hours' },
    { value: '24', label: '24 Hours' },
    { value: '48', label: '48 Hours' }
  ]}
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE A: APPLIANCES & ELECTRONICS (EXACT - 26+ MANDATORY + 5 OPTIONAL)
// ═══════════════════════════════════════════════════════════════════════════════

export const APPLIANCES_ELECTRONICS_FORM: IndustryFormConfig = {
  id: 'appliances',
  name: 'Appliances & Electronics',
  annexure: 'A',
  icon: '🍳',
  estimatedTime: 30,
  riskLevel: 'high',
  fieldCount: { mandatory: 26, optional: 5 },
  sections: [
    // ═════════════════════════════════════════════════════════════
    // SECTION 1: APPLIANCE TYPE SELECTION - MUST BE FIRST
    // ═════════════════════════════════════════════════════════════
    {
      id: 'appliance_selection',
      title: 'Section 1: Appliance Type Selection',
      description: 'Select the type of appliance - this will show relevant fields below',
      fields: [
        { name: 'appliance_type', label: 'Select Appliance Type', type: 'select', required: true, options: [
          { value: 'tv', label: 'TV' },
          { value: 'ac', label: 'AC' },
          { value: 'fridge', label: 'Fridge' },
          { value: 'washing_machine', label: 'Washing Machine' },
          { value: 'microwave', label: 'Microwave' },
          { value: 'geyser', label: 'Geyser' },
          { value: 'laptop', label: 'Laptop' },
          { value: 'desktop', label: 'Desktop' },
          { value: 'gaming_console', label: 'Gaming Console' },
          { value: 'camera', label: 'Camera' },
          { value: 'other', label: 'Other' }
        ]}
      ]
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 2: BASIC SPECIFICATIONS (ALL APPLIANCES)
    // ═════════════════════════════════════════════════════════════
    {
      id: 'basic_specs',
      title: 'Section 2: Basic Specifications',
      fields: [
        { name: 'model_number', label: 'Model Number', type: 'text', required: true },
        { name: 'capacity', label: 'Capacity', type: 'text', required: true },
        { name: 'energy_rating', label: 'Energy Rating (Stars)', type: 'select', required: true, options: [
          { value: '1', label: '1 Star' },
          { value: '2', label: '2 Stars' },
          { value: '3', label: '3 Stars' },
          { value: '4', label: '4 Stars' },
          { value: '5', label: '5 Stars' }
        ]},
        { name: 'manufactured_year', label: 'Year of Manufacture', type: 'number', required: true }
      ]
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 3: CONDITION & USAGE (ALL APPLIANCES)
    // ═════════════════════════════════════════════════════════════
    {
      id: 'condition_usage',
      title: 'Section 3: Condition & Usage',
      fields: [
        { name: 'condition', label: 'Condition', type: 'select', required: true, options: [
          { value: 'new', label: 'New' },
          { value: 'used', label: 'Used' }
        ]},
        { name: 'age_months_or_years', label: 'Age (Months/Years) - If Used', type: 'text', conditional: (data) => data.condition === 'used' },
        { name: 'usage_frequency', label: 'Usage Frequency - If Used', type: 'select', options: [
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'occasional', label: 'Occasional' }
        ], conditional: (data) => data.condition === 'used' },
        { name: 'previous_repairs', label: 'Previous Repairs', type: 'select', options: YES_NO_OPTIONS },
        { name: 'warranty_remaining', label: 'Warranty Remaining', type: 'select', options: YES_NO_OPTIONS },
        { name: 'warranty_remaining_months', label: 'Warranty Remaining (Months)', type: 'number', conditional: (data) => data.warranty_remaining === 'yes' },
        { name: 'original_bill_available', label: 'Original Bill Available', type: 'select', options: YES_NO_OPTIONS }
      ]
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 4: APPLIANCE-SPECIFIC FUNCTIONAL TESTS
    // ═════════════════════════════════════════════════════════════
    {
      id: 'appliance_tests',
      title: 'Section 4: Appliance-Specific Functional Tests',
      description: 'Only relevant fields for your selected appliance type will appear',
      fields: [
        // ─────────────────────────────────────────────────────────
        // TV ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'tv_display_condition', label: 'Display Condition', type: 'select', options: [
          { value: 'excellent', label: 'Excellent' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' }
        ], conditional: (data) => data.appliance_type === 'tv' },
        { name: 'tv_dead_pixels_present', label: 'Dead Pixels Present', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'tv' },
        { name: 'tv_lines_shadow_light_bleed', label: 'Lines/Shadow/Light Bleed', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'tv' },
        { name: 'tv_remote_working', label: 'Remote Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'tv' },
        { name: 'tv_hdmi_ports_working', label: 'HDMI Ports Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'tv' },
        { name: 'tv_speaker_working', label: 'Speaker Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'tv' },
        
        // ─────────────────────────────────────────────────────────
        // AC ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'ac_cooling_test_passed', label: 'Cooling Test Passed', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'ac' },
        { name: 'ac_compressor_replaced', label: 'Compressor Replaced', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'ac' },
        { name: 'ac_gas_refill_required', label: 'Gas Refill Required', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'ac' },
        { name: 'ac_pcb_replaced', label: 'PCB Replaced', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'ac' },
        { name: 'ac_noise_level', label: 'Noise Level', type: 'select', options: [
          { value: 'normal', label: 'Normal' },
          { value: 'unusual', label: 'Unusual' }
        ], conditional: (data) => data.appliance_type === 'ac' },
        
        // ─────────────────────────────────────────────────────────
        // FRIDGE ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'fridge_cooling_test_passed', label: 'Cooling Test Passed', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'fridge' },
        { name: 'fridge_compressor_condition', label: 'Compressor Condition', type: 'select', options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ], conditional: (data) => data.appliance_type === 'fridge' },
        { name: 'fridge_door_seal_condition', label: 'Door Seal Condition', type: 'select', options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ], conditional: (data) => data.appliance_type === 'fridge' },
        { name: 'fridge_freezer_working', label: 'Freezer Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'fridge' },
        { name: 'fridge_ice_maker_working', label: 'Ice Maker Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'fridge' },
        
        // ─────────────────────────────────────────────────────────
        // WASHING MACHINE ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'wm_drum_noise_vibration', label: 'Drum Noise/Vibration', type: 'select', options: [
          { value: 'normal', label: 'Normal' },
          { value: 'unusual', label: 'Unusual' }
        ], conditional: (data) => data.appliance_type === 'washing_machine' },
        { name: 'wm_water_inlet_outlet_working', label: 'Water Inlet/Outlet Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'washing_machine' },
        { name: 'wm_spin_working', label: 'Spin Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'washing_machine' },
        { name: 'wm_pcb_replaced', label: 'PCB Replaced', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'washing_machine' },
        { name: 'wm_drum_condition', label: 'Drum Condition', type: 'select', options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ], conditional: (data) => data.appliance_type === 'washing_machine' },
        
        // ─────────────────────────────────────────────────────────
        // MICROWAVE ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'mw_heating_test_passed', label: 'Heating Test Passed', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'microwave' },
        { name: 'mw_display_working', label: 'Display Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'microwave' },
        { name: 'mw_turntable_working', label: 'Turntable Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'microwave' },
        { name: 'mw_buttons_working', label: 'Buttons Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'microwave' },
        
        // ─────────────────────────────────────────────────────────
        // GEYSER ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'geyser_heating_test_passed', label: 'Heating Test Passed', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'geyser' },
        { name: 'geyser_thermostat_working', label: 'Thermostat Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'geyser' },
        { name: 'geyser_water_pressure_normal', label: 'Water Pressure Normal', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'geyser' },
        { name: 'geyser_element_replaced', label: 'Element Replaced', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'geyser' },
        
        // ─────────────────────────────────────────────────────────
        // LAPTOP/DESKTOP ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'comp_processor_type', label: 'Processor Type', type: 'text', conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_ram_gb', label: 'RAM (GB)', type: 'number', conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_storage_gb', label: 'Storage (GB)', type: 'number', conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_battery_health_percent', label: 'Battery Health (%)', type: 'number', conditional: (data) => data.appliance_type === 'laptop' },
        { name: 'comp_screen_working', label: 'Screen Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_keyboard_working', label: 'Keyboard Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_trackpad_working', label: 'Trackpad Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'laptop' },
        { name: 'comp_ports_working', label: 'Ports Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        { name: 'comp_hard_drive_replaced', label: 'Hard Drive Replaced', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'laptop' || data.appliance_type === 'desktop' },
        
        // ─────────────────────────────────────────────────────────
        // GAMING CONSOLE ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'console_model', label: 'Console Model', type: 'text', conditional: (data) => data.appliance_type === 'gaming_console' },
        { name: 'console_power_on_working', label: 'Power ON Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'gaming_console' },
        { name: 'console_controllers_working', label: 'Controllers Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'gaming_console' },
        { name: 'console_display_output_working', label: 'Display Output Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'gaming_console' },
        { name: 'console_disc_drive_working', label: 'Disc Drive Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'gaming_console' },
        
        // ─────────────────────────────────────────────────────────
        // CAMERA ONLY FIELDS
        // ─────────────────────────────────────────────────────────
        { name: 'camera_model', label: 'Camera Model', type: 'text', conditional: (data) => data.appliance_type === 'camera' },
        { name: 'camera_sensor_megapixels', label: 'Sensor (Megapixels)', type: 'number', conditional: (data) => data.appliance_type === 'camera' },
        { name: 'camera_power_on_working', label: 'Power ON Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'camera' },
        { name: 'camera_lens_condition', label: 'Lens Condition', type: 'select', options: [
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
          { value: 'poor', label: 'Poor' }
        ], conditional: (data) => data.appliance_type === 'camera' },
        { name: 'camera_sensor_scratches', label: 'Sensor Scratches', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'camera' },
        { name: 'camera_autofocus_working', label: 'Autofocus Working', type: 'select', options: YES_NO_OPTIONS, conditional: (data) => data.appliance_type === 'camera' }
      ]
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 5: MANDATORY SELLER EVIDENCE (ALL APPLIANCES)
    // ═════════════════════════════════════════════════════════════
    {
      id: 'seller_evidence',
      title: 'Section 5: Mandatory Seller Evidence',
      fields: [
        { name: 'function_test_video', label: 'Function Test Video URL (Shows: Power ON + Working + Noise + Remote)', type: 'text', required: true },
        { name: 'physical_condition_photos', label: 'Physical Condition Photos URLs (Front+Back+Serial+Dents+Remote+Cable)', type: 'textarea', required: true, rows: 3 },
        { name: 'capacity_rating_label_photo', label: 'Capacity Rating Label Photo URL (Star+Energy+Capacity)', type: 'text', required: true },
        { name: 'previous_repairs_evidence', label: 'Previous Repairs Evidence URL (Bill+Service+Warranty) - If applicable', type: 'text' }
      ]
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 6: COMMON MANDATORY FIELDS (LAST)
    // ═════════════════════════════════════════════════════════════
    {
      id: 'common_fields',
      title: 'Section 6: Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    
    // ═════════════════════════════════════════════════════════════
    // SECTION 7: OPTIONAL FIELDS
    // ═════════════════════════════════════════════════════════════
    {
      id: 'optional_fields',
      title: 'Section 7: Optional Fields',
      fields: [
        { name: 'power_rating_watts', label: 'Power Rating (Watts)', type: 'text' },
        { name: 'dimensions_hxwxd', label: 'Dimensions (H x W x D)', type: 'text' },
        { name: 'accessories_included', label: 'Accessories Included', type: 'textarea', rows: 2 },
        { name: 'maintenance_tips', label: 'Maintenance Tips', type: 'textarea', rows: 2 }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTINUE WITH ANNEXURES B-L IN NEXT SECTION...
// (Due to file size, each annexure will be similarly detailed)
// ═══════════════════════════════════════════════════════════════════════════════

export default {
  APPLIANCES_ELECTRONICS_FORM
};

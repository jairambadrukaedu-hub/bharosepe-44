/**
 * EXACT GOODS FORMS - ANNEXURES I, J, K, L (FINAL GOODS)
 * INDUSTRIAL MACHINERY, BOOKS, ART, INSTAGRAM/WHATSAPP SELLERS
 * Total remaining goods: 102 mandatory + 89 optional = 191 fields
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON MANDATORY FIELDS (All 15 - Applied to ALL GOODS)
// ═══════════════════════════════════════════════════════════════════════════════

const COMMON_GOODS_MANDATORY_FIELDS = [
  { name: 'product_name', label: 'Product Name/Title', type: 'text', required: true, placeholder: 'Item name/title' },
  { name: 'brand', label: 'Brand', type: 'text', required: true, placeholder: 'Brand name' },
  { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Detailed description', rows: 4 },
  { name: 'condition_category', label: 'Overall Condition', type: 'select', required: true, options: [
    { value: 'like_new', label: 'Like New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ]},
  { name: 'color', label: 'Color/Finish', type: 'text', required: true, placeholder: 'e.g., Black, Silver, Multi-color' },
  { name: 'sale_price', label: 'Sale Price (₹)', type: 'number', required: true, placeholder: 'In Indian Rupees' },
  { name: 'delivery_method', label: 'Delivery Method', type: 'select', required: true, options: [
    { value: 'courier', label: 'Courier' },
    { value: 'pickup', label: 'Pickup' },
    { value: 'in_person', label: 'In-Person' }
  ]},
  { name: 'delivery_address', label: 'Delivery Address', type: 'textarea', required: true, placeholder: 'Full delivery address', rows: 3 },
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
// ANNEXURE I: INDUSTRIAL MACHINERY (22 mandatory + 29 optional)
// ═══════════════════════════════════════════════════════════════════════════════

export const INDUSTRIAL_MACHINERY_FORM: IndustryFormConfig = {
  id: 'industrial',
  name: 'Industrial Machinery',
  annexure: 'I',
  fieldCount: { mandatory: 22, optional: 29 },
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'specifications',
      title: 'Equipment Specifications',
      fields: [
        {
          name: 'equipment_type',
          label: 'Equipment Type',
          type: 'select',
          required: true,
          options: [
            { value: 'hydraulic_press', label: 'Hydraulic Press' },
            { value: 'cnc_machine', label: 'CNC Machine' },
            { value: 'welding_machine', label: 'Welding Machine' },
            { value: 'lathe', label: 'Lathe' },
            { value: 'compressor', label: 'Compressor' },
            { value: 'generator', label: 'Generator' },
            { value: 'motor', label: 'Motor' },
            { value: 'pump', label: 'Pump' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'model_number',
          label: 'Model Number',
          type: 'text',
          required: true,
          placeholder: 'Exact model number'
        },
        {
          name: 'weight_kg',
          label: 'Weight (kg)',
          type: 'number',
          required: true,
          placeholder: '0.00'
        },
        {
          name: 'paint_condition',
          label: 'Paint Condition',
          type: 'select',
          required: true,
          options: [
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' }
          ]
        },
        {
          name: 'rust_present',
          label: 'Rust Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_rust', label: 'No rust' },
            { value: 'minor_rust', label: 'Minor rust' },
            { value: 'significant_rust', label: 'Significant rust' }
          ]
        },
        {
          name: 'moving_parts_condition',
          label: 'Moving Parts Condition',
          type: 'select',
          required: true,
          options: [
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'needs_maintenance', label: 'Needs Maintenance' }
          ]
        },
        {
          name: 'power_test_video',
          label: 'Power Test Video (URL)',
          type: 'url',
          required: true,
          placeholder: 'Video of power on test'
        },
        {
          name: 'run_test_video',
          label: 'Run Test Video (URL)',
          type: 'url',
          required: true,
          placeholder: 'Video of equipment running'
        },
        {
          name: 'installation_support_included',
          label: 'Installation Support Included?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'training_provided',
          label: 'Training Provided?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    {
      id: 'optional_specifications',
      title: 'Optional Specifications',
      fields: [
        {
          name: 'manufactured_year',
          label: 'Year of Manufacture',
          type: 'number',
          required: false,
          placeholder: '2010'
        },
        {
          name: 'voltage',
          label: 'Voltage (V)',
          type: 'number',
          required: false,
          placeholder: '230/415'
        },
        {
          name: 'power_hp',
          label: 'Power (HP)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'serial_number',
          label: 'Serial Number',
          type: 'text',
          required: false,
          placeholder: 'Unique serial number'
        },
        {
          name: 'phase',
          label: 'Phase',
          type: 'text',
          required: false,
          placeholder: 'Single/Three phase'
        },
        {
          name: 'frequency',
          label: 'Frequency (Hz)',
          type: 'number',
          required: false,
          placeholder: '50/60'
        },
        {
          name: 'power_kw',
          label: 'Power (kW)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'amperage',
          label: 'Amperage (A)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        }
      ]
    },
    {
      id: 'physical_specs',
      title: 'Physical Specifications',
      fields: [
        {
          name: 'dimensions_specified',
          label: 'Dimensions',
          type: 'text',
          required: false,
          placeholder: 'L x W x H (mm or cm)'
        },
        {
          name: 'length_mm',
          label: 'Length (mm)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'breadth_mm',
          label: 'Breadth (mm)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'height_mm',
          label: 'Height (mm)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        }
      ]
    },
    {
      id: 'tests',
      title: 'Performance Tests',
      fields: [
        {
          name: 'cold_start_video',
          label: 'Cold Start Video (URL)',
          type: 'url',
          required: false,
          placeholder: 'Video from cold start'
        },
        {
          name: 'load_test_video',
          label: 'Load Test Video (URL)',
          type: 'url',
          required: false,
          placeholder: 'Video under load'
        },
        {
          name: 'noise_level_db',
          label: 'Noise Level (dB)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'vibration_level',
          label: 'Vibration Level Video (URL)',
          type: 'url',
          required: false,
          placeholder: 'Video showing vibration'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety Features',
      fields: [
        {
          name: 'emergency_stop_working',
          label: 'Emergency Stop Working?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'safety_guards_intact',
          label: 'Safety Guards Intact?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'interlocks_functional',
          label: 'Interlocks Functional?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    {
      id: 'maintenance',
      title: 'Maintenance History',
      fields: [
        {
          name: 'repair_history',
          label: 'Repair History',
          type: 'textarea',
          required: false,
          placeholder: 'Any repairs done?'
        },
        {
          name: 'major_repairs_done',
          label: 'Major Repairs Done',
          type: 'textarea',
          required: false,
          placeholder: 'Describe major repairs'
        },
        {
          name: 'last_service_date',
          label: 'Last Service Date',
          type: 'date',
          required: false
        },
        {
          name: 'service_manual_provided',
          label: 'Service Manual Provided?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'spare_parts_available',
          label: 'Spare Parts Available?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Certification',
      fields: [
        {
          name: 'iso_certified',
          label: 'ISO Certified?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'ce_mark_present',
          label: 'CE Mark Present?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'factory_certified',
          label: 'Factory Certified?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'testing_certs_provided',
          label: 'Testing Certificates Provided?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    },
    {
      id: 'delivery_notes',
      title: 'Delivery Notes',
      fields: [
        {
          name: 'if_no_extra_cost',
          label: 'If Installation Not Included, Extra Cost (₹)',
          type: 'number',
          required: false,
          placeholder: '₹'
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE J: BOOKS & EDUCATIONAL MATERIAL (30 mandatory + 18 optional = 48 fields)
// ═══════════════════════════════════════════════════════════════════════════════

export const BOOKS_EDUCATIONAL_FORM: IndustryFormConfig = {
  id: 'books',
  name: 'Books & Educational Material',
  description: 'Books, textbooks, and educational materials',
  icon: '📚',
  estimatedTime: 20,
  riskLevel: 'low',
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'publication',
      title: 'Publication Information',
      fields: [
        {
          name: 'title',
          label: 'Book Title',
          type: 'text',
          required: true,
          placeholder: 'Full title of the book'
        },
        {
          name: 'author',
          label: 'Author',
          type: 'text',
          required: true,
          placeholder: 'Author name'
        },

        {
          name: 'publisher',
          label: 'Publisher',
          type: 'text',
          required: true,
          placeholder: 'Publisher name'
        },
        {
          name: 'publication_year',
          label: 'Publication Year',
          type: 'number',
          required: true,
          placeholder: '2020'
        },
        {
          name: 'language',
          label: 'Language',
          type: 'select',
          required: true,
          options: [
            { value: 'english', label: 'English' },
            { value: 'hindi', label: 'Hindi' },
            { value: 'spanish', label: 'Spanish' },
            { value: 'french', label: 'French' },
            { value: 'german', label: 'German' },
            { value: 'other', label: 'Other' }
          ]
        }
      ]
    },
    {
      id: 'physical_specs',
      title: 'Physical Specifications',
      fields: [
        {
          name: 'page_count',
          label: 'Page Count',
          type: 'number',
          required: true,
          placeholder: '0'
        },
        {
          name: 'format',
          label: 'Format',
          type: 'select',
          required: true,
          options: [
            { value: 'hardcover', label: 'Hardcover' },
            { value: 'paperback', label: 'Paperback' },
            { value: 'leather_bound', label: 'Leather Bound' },
            { value: 'cloth', label: 'Cloth' }
          ]
        },
      ]
    },
    {
      id: 'condition',
      title: 'Condition Assessment',
      fields: [
        {
          name: 'all_pages_present',
          label: 'All Pages Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'water_damage_status',
          label: 'Water Damage Status',
          type: 'select',
          required: true,
          options: [
            { value: 'no_damage', label: 'No water damage' },
            { value: 'minor_damage', label: 'Minor damage' },
            { value: 'significant_damage', label: 'Significant damage' }
          ]
        },
        {
          name: 'missing_pages_count',
          label: 'Missing Pages Count',
          type: 'number',
          required: true,
          placeholder: '0'
        },
        {
          name: 'markings_present',
          label: 'Markings/Annotations Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_markings', label: 'No markings' },
            { value: 'minor_markings', label: 'Minor markings' },
            { value: 'extensive_markings', label: 'Extensive markings' }
          ]
        },
        {
          name: 'cover_condition',
          label: 'Cover Condition',
          type: 'text',
          required: false,
          placeholder: 'Describe cover condition'
        },
        {
          name: 'pages_condition',
          label: 'Pages Condition',
          type: 'text',
          required: false,
          placeholder: 'Describe page condition'
        },
        {
          name: 'binding_condition',
          label: 'Binding Condition',
          type: 'text',
          required: false,
          placeholder: 'Describe binding condition'
        },
        {
          name: 'spine_condition',
          label: 'Spine Condition',
          type: 'text',
          required: false,
          placeholder: 'Describe spine condition'
        }
      ]
    },
    {
      id: 'damage',
      title: 'Damage & Issues',
      fields: [
        {
          name: 'torn_pages_count',
          label: 'Torn Pages Count',
          type: 'number',
          required: false,
          placeholder: '0'
        },
        {
          name: 'stains_present',
          label: 'Stains Present?',
          type: 'select',
          required: false,
          options: [
            { value: 'no_stains', label: 'No stains' },
            { value: 'minor_stains', label: 'Minor stains' },
            { value: 'significant_stains', label: 'Significant stains' }
          ]
        },
        {
          name: 'page_discoloration_present',
          label: 'Page Discoloration?',
          type: 'select',
          required: false,
          options: [
            { value: 'no_discoloration', label: 'No discoloration' },
            { value: 'minor_discoloration', label: 'Minor discoloration' },
            { value: 'significant_discoloration', label: 'Significant discoloration' }
          ]
        },
        {
          name: 'odor_declaration',
          label: 'Odor Declaration',
          type: 'text',
          required: false,
          placeholder: 'Describe any odor'
        }
      ]
    },
    {
      id: 'prior_use',
      title: 'Prior Use Markings',
      fields: [
        {
          name: 'highlighting_extent',
          label: 'Highlighting Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_highlighting', label: 'No highlighting' },
            { value: 'minor', label: 'Minor highlighting' },
            { value: 'extensive', label: 'Extensive highlighting' }
          ]
        },
        {
          name: 'underlines_extent',
          label: 'Underlines Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_underlines', label: 'No underlines' },
            { value: 'minor', label: 'Minor underlines' },
            { value: 'extensive', label: 'Extensive underlines' }
          ]
        },
        {
          name: 'marginalia_description',
          label: 'Marginalia Description',
          type: 'textarea',
          required: false,
          placeholder: 'Describe any margin notes'
        },
        {
          name: 'stamps_present',
          label: 'Stamps/Library Markings?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_stamps', label: 'No stamps' },
            { value: 'minor_stamps', label: 'Minor stamps' },
            { value: 'significant_stamps', label: 'Significant stamps' }
          ]
        }
      ]
    },
    {
      id: 'content',
      title: 'Content Verification',
      fields: [
        {
          name: 'plates_intact',
          label: 'Plates Intact?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_applicable', label: 'Not Applicable' }
          ]
        },
        {
          name: 'maps_intact',
          label: 'Maps Intact?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_applicable', label: 'Not Applicable' }
          ]
        },
        {
          name: 'index_intact',
          label: 'Index Intact?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_applicable', label: 'Not Applicable' }
          ]
        },
        {
          name: 'dust_jacket_included',
          label: 'Dust Jacket Included?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'partial', label: 'Partial' }
          ]
        }
      ]
    },
    {
      id: 'edition',
      title: 'Edition Information',
      fields: [
        {
          name: 'edition_type',
          label: 'Edition Type',
          type: 'select',
          required: true,
          options: [
            { value: 'regular_edition', label: 'Regular Edition' },
            { value: 'first_edition', label: 'First Edition' },
            { value: 'limited_edition', label: 'Limited Edition' },
            { value: 'signed_copy', label: 'Signed Copy' }
          ]
        },
        {
          name: 'edition_speciality',
          label: 'Edition Speciality (if applicable)',
          type: 'text',
          required: false,
          placeholder: 'e.g., Signed by author, Numbered edition'
        }
      ]
    },
    {
      id: 'media',
      title: 'Media (Photos & Videos)',
      fields: [
        {
          name: 'isbn',
          label: 'ISBN',
          type: 'text',
          required: true,
          placeholder: 'ISBN-10 or ISBN-13'
        },
        {
          name: 'cover_page_photo',
          label: 'Cover Page Photo (URL)',
          type: 'text',
          required: true,
          placeholder: 'Photo of book cover'
        },
        {
          name: 'pages_video',
          label: 'Pages Video (URL)',
          type: 'text',
          required: true,
          placeholder: 'Video showing pages'
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE K: ART & HANDMADE ITEMS (20 mandatory + 15 optional = 35 fields)
// ═══════════════════════════════════════════════════════════════════════════════

export const ART_HANDMADE_FORM: IndustryFormConfig = {
  id: 'art',
  name: 'Art & Handmade Items',
  description: 'Original artwork, paintings, sculptures, and handmade creations',
  icon: '🎨',
  estimatedTime: 25,
  riskLevel: 'high',
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'identification',
      title: 'Identification',
      fields: [
        {
          name: 'style',
          label: 'Style/School',
          type: 'text',
          required: true,
          placeholder: 'e.g., Modern, Abstract, Contemporary'
        },
        {
          name: 'artwork_name',
          label: 'Artwork Name',
          type: 'text',
          required: true,
          placeholder: 'Title of the artwork'
        },
        {
          name: 'artist_name',
          label: 'Artist Name',
          type: 'text',
          required: true,
          placeholder: 'Name of the artist'
        },
        {
          name: 'art_type',
          label: 'Art Type',
          type: 'select',
          required: true,
          options: [
            { value: 'painting', label: 'Painting' },
            { value: 'sculpture', label: 'Sculpture' },
            { value: 'drawing', label: 'Drawing' },
            { value: 'printwork', label: 'Printwork' },
            { value: 'mixed_media', label: 'Mixed Media' },
            { value: 'photography', label: 'Photography' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'creation_year',
          label: 'Year of Creation',
          type: 'number',
          required: true,
          placeholder: '2020'
        },
        {
          name: 'dimensions_specified',
          label: 'Dimensions',
          type: 'text',
          required: false,
          placeholder: 'e.g., 24 x 36 inches'
        },
        {
          name: 'weight_specified',
          label: 'Weight',
          type: 'number',
          required: false,
          placeholder: 'Weight in kg'
        }
      ]
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      fields: [
        {
          name: 'certificate_of_authenticity',
          label: 'Certificate of Authenticity?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'if_yes_authority_name',
          label: 'If Yes, Issued by (Authority)',
          type: 'text',
          required: false,
          placeholder: 'Authority name'
        },
        {
          name: 'artist_signature',
          label: 'Artist Signature Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'artist_verified',
          label: 'Artist Verified?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'not_applicable', label: 'Not Applicable' }
          ]
        }
      ]
    },
    {
      id: 'condition',
      title: 'Condition',
      fields: [
        {
          name: 'damage_description',
          label: 'Damage Description (if any)',
          type: 'textarea',
          required: true,
          placeholder: 'Describe any damage'
        },
        {
          name: 'restoration_history',
          label: 'Restoration History',
          type: 'text',
          required: false,
          placeholder: 'Any restoration done?'
        },
        {
          name: 'conservation_status',
          label: 'Conservation Status',
          type: 'text',
          required: false,
          placeholder: 'e.g., Excellent, Good, Fair'
        }
      ]
    },
    {
      id: 'documentation',
      title: 'Documentation',
      fields: [
        {
          name: 'insurance_valuation',
          label: 'Insurance Valuation (₹)',
          type: 'number',
          required: true,
          placeholder: '₹'
        }
      ]
    },
    {
      id: 'specifications',
      title: 'Specifications',
      fields: [
        {
          name: 'materials_used',
          label: 'Materials Used',
          type: 'text',
          required: true,
          placeholder: 'e.g., Oil on canvas, Bronze, Acrylic'
        },
        {
          name: 'color_palette',
          label: 'Color Palette',
          type: 'text',
          required: false,
          placeholder: 'Dominant colors'
        }
      ]
    },
    {
      id: 'storage',
      title: 'Storage & Care',
      fields: [
        {
          name: 'storage_requirements',
          label: 'Storage Requirements',
          type: 'text',
          required: false,
          placeholder: 'Special storage conditions'
        },
        {
          name: 'special_care_instructions',
          label: 'Special Care Instructions',
          type: 'textarea',
          required: false,
          placeholder: 'Handling and maintenance'
        }
      ]
    },
    {
      id: 'verification',
      title: 'Expert Verification',
      fields: [
        {
          name: 'photos_provided',
          label: 'Photos Provided (URL)',
          type: 'text',
          required: false,
          placeholder: 'Link to detailed photos'
        },
        {
          name: 'video_provided',
          label: 'Video Provided (URL)',
          type: 'text',
          required: false,
          placeholder: 'Link to video'
        },
        {
          name: 'expert_verification_done',
          label: 'Expert Verification Done?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE L: INSTAGRAM/WHATSAPP SELLERS (30 mandatory + 14 optional = 44 fields)
// ═══════════════════════════════════════════════════════════════════════════════

export const INSTAGRAM_WHATSAPP_FORM: IndustryFormConfig = {
  id: 'instagram',
  name: 'Instagram/WhatsApp Sellers',
  description: 'Products sold through Instagram, WhatsApp, and social media channels',
  icon: '📱',
  estimatedTime: 20,
  riskLevel: 'medium',
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'product_details',
      title: 'Product Details',
      fields: [
        {
          name: 'product_category',
          label: 'Product Category',
          type: 'select',
          required: true,
          options: [
            { value: 'fashion', label: 'Fashion' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'home_decor', label: 'Home Decor' },
            { value: 'beauty', label: 'Beauty & Personal Care' },
            { value: 'handmade', label: 'Handmade' },
            { value: 'books', label: 'Books' },
            { value: 'toys', label: 'Toys & Games' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'product_material',
          label: 'Product Material',
          type: 'text',
          required: true,
          placeholder: 'Material composition'
        },
        {
          name: 'product_dimensions',
          label: 'Product Dimensions',
          type: 'text',
          required: false,
          placeholder: 'L x W x H'
        },
        {
          name: 'product_weight',
          label: 'Product Weight',
          type: 'text',
          required: false,
          placeholder: 'e.g., 500g, 2kg'
        },
        {
          name: 'authenticity_claim',
          label: 'Authenticity Claim',
          type: 'select',
          required: false,
          options: [
            { value: 'original', label: 'Original' },
            { value: 'replica', label: 'Replica' },
            { value: 'not_applicable', label: 'Not Applicable' }
          ]
        },
        {
          name: 'quantity',
          label: 'Quantity Available',
          type: 'number',
          required: true,
          placeholder: '1'
        }
      ]
    },
    {
      id: 'shown_media',
      title: 'Shown Media (What Seller Showed Online)',
      fields: [
        {
          name: 'shown_photos',
          label: 'Shown Photos (URL - Multiple)',
          type: 'text',
          required: true,
          placeholder: 'Photos as shown online'
        },
        {
          name: 'shown_video',
          label: 'Shown Video (URL)',
          type: 'text',
          required: false,
          placeholder: 'Video as shown online'
        },
        {
          name: 'shown_description_text',
          label: 'Shown Description Text',
          type: 'textarea',
          required: true,
          placeholder: 'Exact description shown online'
        },
        {
          name: 'color_variation_disclaimer_accepted',
          label: 'Color Variation Disclaimer Accepted?',
          type: 'checkbox',
          required: true
        },
        {
          name: 'handmade_variation_disclaimer',
          label: 'Handmade Variation Disclaimer',
          type: 'checkbox',
          required: false
        }
      ]
    },
    {
      id: 'custom_orders',
      title: 'Custom Orders / Personalized Items',
      fields: [
        {
          name: 'is_custom_order',
          label: 'Is This a Custom Order?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'custom_requirements_description',
          label: 'Custom Requirements Description',
          type: 'textarea',
          required: false,
          placeholder: 'Detailed custom requirements'
        },
        {
          name: 'custom_reference_images',
          label: 'Custom Reference Images (URL)',
          type: 'text',
          required: false,
          placeholder: 'Reference photos'
        },
        {
          name: 'text_or_name_customization',
          label: 'Text/Name Customization',
          type: 'text',
          required: false,
          placeholder: 'Text to be customized'
        },
        {
          name: 'custom_variation_tolerance',
          label: 'Custom Variation Tolerance',
          type: 'text',
          required: false,
          placeholder: 'Acceptable variations'
        },
        {
          name: 'custom_order_non_returnable',
          label: 'Custom Order Non-Returnable?',
          type: 'checkbox',
          required: false
        }
      ]
    },
    {
      id: 'risk_variation',
      title: 'Risk & Variation Acceptance',
      fields: [
        {
          name: 'minor_color_variation_accepted',
          label: 'Minor Color Variation Accepted?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'handmade_variation_accepted',
          label: 'Handmade Variation Accepted?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'measurement_tolerance_accepted',
          label: 'Measurement Tolerance',
          type: 'text',
          required: false,
          placeholder: 'e.g., ±2cm, ±10%'
        }
      ]
    },
    {
      id: 'others',
      title: 'Additional Information',
      fields: [
        {
          name: 'gift_wrapping_available',
          label: 'Gift Wrapping Available?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'invoice_provided',
          label: 'Invoice Provided?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'similar_product_substitution_allowed',
          label: 'Similar Product Substitution Allowed?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER EXPORT - INDUSTRIAL + PLACEHOLDERS
// ═══════════════════════════════════════════════════════════════════════════════

export const ALL_GOODS_FORMS_IJL = {
  I: INDUSTRIAL_MACHINERY_FORM,
  J: BOOKS_EDUCATIONAL_FORM,
  K: ART_HANDMADE_FORM,
  L: INSTAGRAM_WHATSAPP_FORM
};

export default ALL_GOODS_FORMS_IJL;

/**
 * EXACT GOODS FORM CONFIGURATIONS - ANNEXURES E-L
 * FASHION, JEWELLERY, BUILDING MATERIALS, COLLECTIBLES, INDUSTRIAL, BOOKS, ART, INSTAGRAM/WHATSAPP
 * Total: 255 fields (217 mandatory category-specific + 130 optional)
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
// ANNEXURE E: FASHION & APPAREL (29 mandatory + 1 optional)
// ═══════════════════════════════════════════════════════════════════════════════

export const FASHION_APPAREL_FORM: IndustryFormConfig = {
  id: 'fashion',
  name: 'Fashion & Apparel',
  annexure: 'E',
  fieldCount: { mandatory: 29, optional: 1 },
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'specifications',
      title: 'Specifications',
      fields: [
        {
          name: 'item_type',
          label: 'Item Type',
          type: 'text',
          required: true,
          placeholder: 'e.g., Saree, Dress, Shirt, Jeans'
        },
        {
          name: 'size',
          label: 'Size',
          type: 'select',
          required: true,
          options: [
            { value: 'xs', label: 'XS' },
            { value: 's', label: 'S' },
            { value: 'm', label: 'M' },
            { value: 'l', label: 'L' },
            { value: 'xl', label: 'XL' },
            { value: 'xxl', label: 'XXL' },
            { value: 'custom', label: 'Custom' }
          ]
        },
        {
          name: 'size_chart_reference',
          label: 'Size Chart Reference Image (URL)',
          type: 'url',
          required: true,
          placeholder: 'Link to size chart image'
        },
        {
          name: 'material_composition',
          label: 'Material Composition',
          type: 'text',
          required: true,
          placeholder: 'e.g., 100% Cotton, Silk Blend'
        }
      ]
    },
    {
      id: 'condition',
      title: 'Condition Assessment',
      fields: [
        {
          name: 'wear_level',
          label: 'Wear Level',
          type: 'select',
          required: true,
          options: [
            { value: 'never_worn', label: 'Never worn' },
            { value: 'rarely_worn', label: 'Rarely worn' },
            { value: 'lightly_worn', label: 'Lightly worn' },
            { value: 'moderately_worn', label: 'Moderately worn' },
            { value: 'heavily_worn', label: 'Heavily worn' }
          ]
        },
        {
          name: 'odor_present',
          label: 'Odor Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_odor', label: 'No odor' },
            { value: 'minor_odor', label: 'Minor odor' },
            { value: 'strong_odor', label: 'Strong odor' }
          ]
        },
        {
          name: 'stains_marks',
          label: 'Stains or Marks Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_stains', label: 'No stains' },
            { value: 'minor_stains', label: 'Minor stains' },
            { value: 'removable_stains', label: 'Removable stains' },
            { value: 'permanent_stains', label: 'Permanent stains' }
          ]
        },
        {
          name: 'fading_present',
          label: 'Fading Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_fading', label: 'No fading' },
            { value: 'minor_fading', label: 'Minor fading' },
            { value: 'significant_fading', label: 'Significant fading' }
          ]
        },
        {
          name: 'loose_buttons',
          label: 'Loose Buttons?',
          type: 'select',
          required: true,
          options: [
            { value: 'all_secure', label: 'All buttons secure' },
            { value: 'some_loose', label: 'Some loose' },
            { value: 'missing', label: 'Missing' }
          ]
        },
        {
          name: 'zipper_functional',
          label: 'Zipper Functional?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes_smooth', label: 'Yes, smooth' },
            { value: 'yes_sticky', label: 'Yes, but sticky' },
            { value: 'partially_working', label: 'Partially working' },
            { value: 'broken', label: 'Broken' },
            { value: 'no_zipper', label: 'No zipper' }
          ]
        },
        {
          name: 'alterations_made',
          label: 'Alterations Made?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_alterations', label: 'No alterations' },
            { value: 'minor_alterations', label: 'Minor alterations' },
            { value: 'significant_alterations', label: 'Significant alterations' }
          ]
        }
      ]
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      fields: [
        {
          name: 'authenticity_status',
          label: 'Authenticity Status',
          type: 'select',
          required: true,
          options: [
            { value: 'original', label: 'Original' },
            { value: 'duplicate', label: 'Duplicate' },
            { value: 'not_sure', label: 'Not sure' }
          ]
        },
        {
          name: 'tags_present',
          label: 'Original Tags Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'all_tags_present', label: 'All tags present' },
            { value: 'some_tags_present', label: 'Some tags present' },
            { value: 'no_tags', label: 'No tags' }
          ]
        }
      ]
    },
    {
      id: 'photos_videos',
      title: 'Photos & Videos (CRITICAL)',
      fields: [
        {
          name: 'front_view_photo',
          label: 'Front View Photo (URL)',
          type: 'url',
          required: true,
          placeholder: 'Photo of front side'
        },
        {
          name: 'back_view_photo',
          label: 'Back View Photo (URL)',
          type: 'url',
          required: true,
          placeholder: 'Photo of back side'
        },
        {
          name: 'product_video',
          label: 'Product Video (URL)',
          type: 'url',
          required: true,
          placeholder: 'Video of item'
        }
      ]
    },
    {
      id: 'purchase_info',
      title: 'Purchase Information',
      fields: [
        {
          name: 'purchase_date',
          label: 'Purchase Date',
          type: 'date',
          required: false,
          placeholder: 'When was this purchased?'
        },
        {
          name: 'invoice_available',
          label: 'Invoice Available?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'partial', label: 'Partial documentation' }
          ]
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE F: JEWELLERY (23 mandatory + 17 optional)
// ═══════════════════════════════════════════════════════════════════════════════

export const JEWELLERY_FORM: IndustryFormConfig = {
  id: 'jewellery',
  name: 'Jewellery',
  annexure: 'F',
  fieldCount: { mandatory: 23, optional: 17 },
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
          name: 'item_type',
          label: 'Item Type',
          type: 'select',
          required: true,
          options: [
            { value: 'ring', label: 'Ring' },
            { value: 'necklace', label: 'Necklace' },
            { value: 'bracelet', label: 'Bracelet' },
            { value: 'earrings', label: 'Earrings' },
            { value: 'pendant', label: 'Pendant' },
            { value: 'anklet', label: 'Anklet' },
            { value: 'bangle', label: 'Bangle' },
            { value: 'brooch', label: 'Brooch' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'metal_type',
          label: 'Metal Type',
          type: 'select',
          required: true,
          options: [
            { value: 'gold', label: 'Gold' },
            { value: 'silver', label: 'Silver' },
            { value: 'platinum', label: 'Platinum' },
            { value: 'copper', label: 'Copper' },
            { value: 'brass', label: 'Brass' },
            { value: 'mixed', label: 'Mixed Metals' }
          ]
        },
        {
          name: 'metal_purity',
          label: 'Metal Purity',
          type: 'text',
          required: true,
          placeholder: 'e.g., mixed metal,22K, 18K, 925 (Silver)'
        },
        {
          name: 'hallmark_status',
          label: 'Hallmark Status',
          type: 'select',
          required: true,
          options: [
            { value: 'hallmarked', label: 'Hallmarked' },
            { value: 'not_hallmarked', label: 'Not hallmarked' },
            { value: 'partially_hallmarked', label: 'Partially hallmarked' }
          ]
        }
      ]
    },
    {
      id: 'weight_dimensions',
      title: 'Weight & Dimensions',
      fields: [
        {
          name: 'gross_weight_gm',
          label: 'Gross Weight (grams)',
          type: 'number',
          required: true,
          placeholder: '0.00'
        },
        {
          name: 'net_weight_gm',
          label: 'Net Weight (grams)',
          type: 'number',
          required: true,
          placeholder: '0.00'
        },
        {
          name: 'weight_proof_video',
          label: 'Weight Proof Video (URL)',
          type: 'url',
          required: true,
          placeholder: 'Video showing weighing'
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
      id: 'stones',
      title: 'Stones & Gems',
      fields: [
        {
          name: 'stone_type',
          label: 'Stone Type',
          type: 'text',
          required: true,
          placeholder: 'e.g., Diamond, Ruby, Sapphire, CZ'
        },
        {
          name: 'total_carat',
          label: 'Total Carat Weight',
          type: 'number',
          required: true,
          placeholder: '0.00'
        },
        {
          name: 'stone_count',
          label: 'Stone Count',
          type: 'number',
          required: false,
          placeholder: '0'
        },
        {
          name: 'gem_certificate',
          label: 'Gem Certificate Available?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'certification_lab',
          label: 'Certification Lab',
          type: 'text',
          required: false,
          placeholder: 'e.g., IGI, GIA, SGL'
        },
        {
          name: 'color_grade',
          label: 'Color Grade',
          type: 'text',
          required: false,
          placeholder: 'e.g., D, E, F (for diamonds)'
        },
        {
          name: 'clarity_grade',
          label: 'Clarity Grade',
          type: 'text',
          required: false,
          placeholder: 'e.g., FL, IF, VVS1'
        },
        {
          name: 'loose_stones',
          label: 'Loose Stones Present?',
          type: 'select',
          required: false,
          options: [
            { value: 'no_loose', label: 'No loose stones' },
            { value: 'minor_loose', label: 'Minor loose stones' },
            { value: 'significant_loose', label: 'Significant loose stones' }
          ]
        },
        {
          name: 'broken_settings',
          label: 'Broken Settings?',
          type: 'select',
          required: false,
          options: [
            { value: 'no_broken', label: 'No broken settings' },
            { value: 'minor_broken', label: 'Minor damage' },
            { value: 'significant_broken', label: 'Significant damage' }
          ]
        },
        {
          name: 'polish_condition',
          label: 'Polish Condition',
          type: 'text',
          required: false,
          placeholder: 'e.g., Excellent, Good, Fair'
        }
      ]
    },
    {
      id: 'authenticity',
      title: 'Authenticity',
      fields: [
        {
          name: 'coa_provided',
          label: 'Certificate of Authenticity Provided?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'video_360_provided',
          label: '360° Video Provided?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'lab_report_provided',
          label: 'Lab Report Provided?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'maker_mark',
          label: 'Maker\'s Mark Present?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'maker_location',
          label: 'Maker Location',
          type: 'text',
          required: false,
          placeholder: 'e.g., Jaipur, Mumbai'
        }
      ]
    },
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE G: BUILDING MATERIALS (21 mandatory + 2 optional)
// ═══════════════════════════════════════════════════════════════════════════════

export const BUILDING_MATERIALS_FORM: IndustryFormConfig = {
  id: 'building-materials',
  name: 'Building Materials',
  annexure: 'G',
  fieldCount: { mandatory: 21, optional: 2 },
  sections: [
    {
      id: 'common_fields',
      title: 'Common Mandatory Fields',
      fields: COMMON_GOODS_MANDATORY_FIELDS
    },
    {
      id: 'specifications',
      title: 'Specifications',
      fields: [
        {
          name: 'material_type',
          label: 'Material Type',
          type: 'text',
          required: true,
          placeholder: 'e.g., Cement, Steel, Bricks, Tiles'
        },
        {
          name: 'grade_quality',
          label: 'Grade/Quality',
          type: 'select',
          required: true,
          options: [
            { value: 'premium', label: 'Premium' },
            { value: 'standard', label: 'Standard' },
            { value: 'economy', label: 'Economy' }
          ]
        },
        {
          name: 'quantity',
          label: 'Quantity',
          type: 'number',
          required: true,
          placeholder: 'Total quantity'
        }
      ]
    },
    {
      id: 'condition',
      title: 'Condition',
      fields: [
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
          name: 'fully_functional',
          label: 'Fully Functional?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'discoloration',
          label: 'Discoloration Present?',
          type: 'select',
          required: true,
          options: [
            { value: 'no_discoloration', label: 'No discoloration' },
            { value: 'minor_discoloration', label: 'Minor discoloration' },
            { value: 'significant_discoloration', label: 'Significant discoloration' }
          ]
        }
      ]
    },
    {
      id: 'installation',
      title: 'Installation & Support',
      fields: [
        {
          name: 'installation_required',
          label: 'Installation Required?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'installation_type',
          label: 'Type of Installation',
          type: 'text',
          required: false,
          placeholder: 'Describe installation needed'
        },
        {
          name: 'technical_support_included',
          label: 'Technical Support Included?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'is_installation_included',
          label: 'Is Installation Included in Price?',
          type: 'select',
          required: true,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'if_not_extra_cost',
          label: 'If Not Included, Extra Cost (₹)',
          type: 'number',
          required: false,
          placeholder: '₹',
          '[CONDITIONAL IF is_installation_included = "no"]': true
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANNEXURE H: COLLECTIBLES & LUXURY GOODS (20 mandatory + 22 optional)
// ═══════════════════════════════════════════════════════════════════════════════

export const COLLECTIBLES_FORM: IndustryFormConfig = {
  id: 'collectibles',
  name: 'Collectibles & Luxury Goods',
  annexure: 'H',
  fieldCount: { mandatory: 20, optional: 22 },
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
          name: 'item_name',
          label: 'Item Name',
          type: 'text',
          required: true,
          placeholder: 'Full name of collectible'
        },
        {
          name: 'collectible_category',
          label: 'Collectible Category',
          type: 'select',
          required: true,
          options: [
            { value: 'rare_books', label: 'Rare Books' },
            { value: 'antiques', label: 'Antiques' },
            { value: 'memorabilia', label: 'Memorabilia' },
            { value: 'coins', label: 'Coins' },
            { value: 'stamps', label: 'Stamps' },
            { value: 'vintage_toys', label: 'Vintage Toys' },
            { value: 'artworks', label: 'Artworks' },
            { value: 'collectible_cards', label: 'Collectible Cards' },
            { value: 'other', label: 'Other' }
          ]
        },
        {
          name: 'rarity_level',
          label: 'Rarity Level',
          type: 'select',
          required: true,
          options: [
            { value: 'common', label: 'Common' },
            { value: 'rare', label: 'Rare' },
            { value: 'very_rare', label: 'Very Rare' },
            { value: 'extremely_rare', label: 'Extremely Rare' },
            { value: 'one_of_a_kind', label: 'One of a Kind' }
          ]
        },
        {
          name: 'production_year',
          label: 'Year of Production/Release',
          type: 'number',
          required: true,
          placeholder: '1950'
        },
        {
          name: 'serial_number',
          label: 'Serial Number/Identifying Number',
          type: 'text',
          required: false,
          placeholder: 'Unique identifier'
        },
        {
          name: 'edition_number',
          label: 'Edition Number',
          type: 'text',
          required: false,
          placeholder: 'e.g., Limited Edition #5 of 100'
        },
        {
          name: 'limited_edition',
          label: 'Is This Limited Edition?',
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
      id: 'authenticity',
      title: 'Authenticity',
      fields: [
        {
          name: 'coa_provided',
          label: 'Certificate of Authenticity Provided?',
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
          placeholder: 'e.g., Christie\'s, Sotheby\'s',
          '[CONDITIONAL IF coa_provided = "yes"]': true
        },
        {
          name: 'issuing_authority',
          label: 'Issuing Authority',
          type: 'text',
          required: false,
          placeholder: 'Name of authority'
        },
        {
          name: 'video_360_provided',
          label: '360° Video Provided?',
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
      id: 'documentation',
      title: 'Documentation',
      fields: [
        {
          name: 'purchase_date',
          label: 'Date of Acquisition/Purchase',
          type: 'date',
          required: true
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
          required: false,
          placeholder: 'Describe any damage'
        },
        {
          name: 'restoration_done',
          label: 'Has Restoration Been Done?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'conservation_status',
          label: 'Conservation Status',
          type: 'text',
          required: false,
          placeholder: 'e.g., Excellent, Good, Fair'
        },
        {
          name: 'environmental_factors',
          label: 'Environmental Factors Affecting Item',
          type: 'text',
          required: false,
          placeholder: 'e.g., Age, light exposure, humidity'
        }
      ]
    },
    {
      id: 'valuation',
      title: 'Valuation',
      fields: [
        {
          name: 'insurance_value',
          label: 'Insurance/Appraised Value (₹)',
          type: 'number',
          required: false,
          placeholder: '₹'
        }
      ]
    },
    {
      id: 'inspection',
      title: 'Inspection & Verification',
      fields: [
        {
          name: 'closeup_photos_provided',
          label: 'Close-up Photos Provided (URL)',
          type: 'url',
          required: false,
          placeholder: 'Link to detailed photos'
        },
        {
          name: 'expert_inspection_done',
          label: 'Expert Inspection Done?',
          type: 'select',
          required: false,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ]
        },
        {
          name: 'inspector_name',
          label: 'Inspector Name',
          type: 'text',
          required: false,
          placeholder: 'Name of expert who inspected'
        }
      ]
    },
    {
      id: 'specifications',
      title: 'Specifications',
      fields: [
        {
          name: 'dimensions_specified',
          label: 'Dimensions',
          type: 'text',
          required: false,
          placeholder: 'e.g., 20cm x 15cm x 10cm'
        },
        {
          name: 'weight_specified',
          label: 'Weight (grams/kg)',
          type: 'number',
          required: false,
          placeholder: '0.00'
        },
        {
          name: 'material_type',
          label: 'Material Type',
          type: 'text',
          required: false,
          placeholder: 'e.g., Porcelain, Wood, Metal'
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
          name: 'temperature_range',
          label: 'Temperature Range (°C)',
          type: 'text',
          required: false,
          placeholder: 'e.g., 18-22°C'
        },
        {
          name: 'humidity_range',
          label: 'Humidity Range (%)',
          type: 'text',
          required: false,
          placeholder: 'e.g., 45-55%'
        },
        {
          name: 'special_care_instructions',
          label: 'Special Care Instructions',
          type: 'textarea',
          required: false,
          placeholder: 'Handling and maintenance instructions'
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTINUE: ANNEXURES I, J, K, L (TODO - Due to file size)
// These will be created in a separate file: EXACT_GOODS_FORMS_IL.ts
// ═══════════════════════════════════════════════════════════════════════════════

export const INDUSTRIAL_PLACEHOLDER: IndustryFormConfig = {
  id: 'industrial',
  name: 'Industrial Machinery',
  type: 'goods',
  annexure: 'I',
  fieldCount: { mandatory: 22, optional: 29 },
  sections: [
    {
      id: 'placeholder',
      title: 'PLACEHOLDER - See EXACT_GOODS_FORMS_IL.ts',
      fields: [
        {
          name: 'note',
          label: 'Full form is in EXACT_GOODS_FORMS_IL.ts',
          type: 'text',
          required: false
        }
      ]
    }
  ]
};

export const BOOKS_PLACEHOLDER: IndustryFormConfig = {
  id: 'books',
  name: 'Books & Educational Material',
  type: 'goods',
  annexure: 'J',
  fieldCount: { mandatory: 30, optional: 18 },
  sections: [
    {
      id: 'placeholder',
      title: 'PLACEHOLDER - See EXACT_GOODS_FORMS_IL.ts',
      fields: []
    }
  ]
};

export const ART_PLACEHOLDER: IndustryFormConfig = {
  id: 'art',
  name: 'Art & Handmade Items',
  type: 'goods',
  annexure: 'K',
  fieldCount: { mandatory: 20, optional: 15 },
  sections: [
    {
      id: 'placeholder',
      title: 'PLACEHOLDER - See EXACT_GOODS_FORMS_IL.ts',
      fields: []
    }
  ]
};

export const INSTAGRAM_PLACEHOLDER: IndustryFormConfig = {
  id: 'instagram',
  name: 'Instagram/WhatsApp Sellers',
  type: 'goods',
  annexure: 'L',
  fieldCount: { mandatory: 30, optional: 14 },
  sections: [
    {
      id: 'placeholder',
      title: 'PLACEHOLDER - See EXACT_GOODS_FORMS_IL.ts',
      fields: []
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER EXPORT - GOODS E-L
// ═══════════════════════════════════════════════════════════════════════════════

export const ALL_GOODS_FORMS_EL = {
  E: FASHION_APPAREL_FORM,
  F: JEWELLERY_FORM,
  G: BUILDING_MATERIALS_FORM,
  H: COLLECTIBLES_FORM,
  I: INDUSTRIAL_PLACEHOLDER,
  J: BOOKS_PLACEHOLDER,
  K: ART_PLACEHOLDER,
  L: INSTAGRAM_PLACEHOLDER
};

export default ALL_GOODS_FORMS_EL;

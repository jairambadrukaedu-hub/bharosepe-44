/**
 * FORM FIELD DEFINITIONS - Comprehensive Version
 * Provides detailed form field definitions for all 11 product categories
 * Each category has specialized sections with extensive field validation
 */

export interface FormFieldGroup {
  title: string;
  icon: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea' | 'file' | 'checkbox' | 'pricing-calculator' | 'checkboxgroup';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  helpText?: string;
  readOnly?: boolean;
  category?: string;
  platformFeeRate?: number;
  escrowRate?: number;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════════
// UNIVERSAL FIELDS (Common to all categories)
// ═══════════════════════════════════════════════════════════════════════════════════

const commonFields: FormFieldGroup[] = [
  {
    title: '📋 Basic Details',
    icon: '📦',
    fields: [
      {
        name: 'product_name',
        label: 'Product/Item Name',
        type: 'text',
        required: true,
        placeholder: 'Enter item name',
        helpText: 'Be specific and descriptive',
      },
      {
        name: 'brand',
        label: 'Brand',
        type: 'text',
        required: true,
        placeholder: 'Brand name',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        placeholder: 'Detailed description of the item',
        helpText: 'Include condition, features, and any important details',
      },
    ],
  },

  {
    title: '💰 Pricing & Delivery',
    icon: '💵',
    fields: [
      {
        name: 'price',
        label: 'Price ₹',
        type: 'pricing-calculator',
        required: true,
        placeholder: 'Enter price',
        category: 'general',
        platformFeeRate: 0.01,
      },
      {
        name: 'expected_delivery_date',
        label: 'Expected Delivery Date',
        type: 'date',
        required: true,
        helpText: 'When will buyer receive the item',
      },
      {
        name: 'delivery_mode',
        label: 'Delivery Mode',
        type: 'select',
        required: true,
        options: [
          { value: 'pickup', label: 'Buyer Pickup' },
          { value: 'delivery', label: 'Home Delivery' },
          { value: 'courier', label: 'Courier Service' },
          { value: 'shipping', label: 'Postal/Shipping' },
        ],
      },
    ],
  },

  {
    title: '✅ Condition & Inspection',
    icon: '🔍',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        required: true,
        options: [
          { value: 'brand_new', label: 'Brand New' },
          { value: 'like_new', label: 'Like New' },
          { value: 'excellent', label: 'Excellent' },
          { value: 'very_good', label: 'Very Good' },
          { value: 'good', label: 'Good' },
          { value: 'fair', label: 'Fair' },
        ],
      },
      {
        name: 'inspection_window_hours',
        label: 'Inspection Window (Hours)',
        type: 'select',
        required: true,
        options: [
          { value: '6', label: '6 Hours' },
          { value: '12', label: '12 Hours' },
          { value: '24', label: '24 Hours' },
          { value: '48', label: '48 Hours' },
          { value: '72', label: '72 Hours' },
        ],
        helpText: 'How long buyer has to inspect item after delivery',
      },
      {
        name: 'return_policy',
        label: 'Return Policy',
        type: 'select',
        required: true,
        options: [
          { value: 'no_returns', label: 'No Returns' },
          { value: 'defects_only', label: 'Defects Only' },
          { value: 'not_as_described', label: 'Not As Described' },
          { value: 'flexible', label: 'Flexible' },
        ],
      },
    ],
  },

  {
    title: '📄 Warranty & Documentation',
    icon: '📋',
    fields: [
      {
        name: 'warranty',
        label: 'Warranty Status',
        type: 'select',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'expired', label: 'Expired' },
          { value: 'none', label: 'No Warranty' },
        ],
      },
      {
        name: 'warranty_info',
        label: 'Warranty Details',
        type: 'textarea',
        placeholder: 'Warranty period, coverage details, etc.',
      },
    ],
  },
];

// Category-specific field additions
const electronicsAdditional: FormFieldGroup[] = [
  {
    title: '⚙️ Specifications',
    icon: '🔧',
    fields: [
      {
        name: 'model_number',
        label: 'Model Number',
        type: 'text',
        placeholder: 'Exact model number',
      },
      {
        name: 'storage',
        label: 'Storage/Memory',
        type: 'text',
        placeholder: 'e.g., 256GB, 512GB',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'text',
        placeholder: 'Product color',
      },
    ],
  },
];

const mobileAdditional: FormFieldGroup[] = [
  {
    title: '📱 Mobile Specifications',
    icon: '📱',
    fields: [
      {
        name: 'imei_1',
        label: 'IMEI 1',
        type: 'text',
        required: true,
        placeholder: '15-digit IMEI number',
      },
      {
        name: 'battery_health_percent',
        label: 'Battery Health %',
        type: 'number',
        placeholder: '80-100',
      },
      {
        name: 'storage',
        label: 'Storage',
        type: 'text',
        placeholder: '128GB, 256GB, etc.',
      },
    ],
  },
];

const furnitureAdditional: FormFieldGroup[] = [
  {
    title: '📏 Furniture Details',
    icon: '📐',
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
          { value: 'cabinet', label: 'Cabinet' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'material',
        label: 'Material',
        type: 'text',
        placeholder: 'Wood, metal, fabric, etc.',
      },
      {
        name: 'dimensions',
        label: 'Dimensions (L x W x H)',
        type: 'text',
        placeholder: 'e.g., 200x90x80 cm',
      },
    ],
  },
];

const vehiclesAdditional: FormFieldGroup[] = [
  {
    title: '🚗 Vehicle Details',
    icon: '🏍️',
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
          { value: 'truck', label: 'Truck' },
        ],
      },
      {
        name: 'registration_number',
        label: 'Registration Number',
        type: 'text',
        required: true,
        placeholder: 'License plate number',
      },
      {
        name: 'fuel_type',
        label: 'Fuel Type',
        type: 'select',
        options: [
          { value: 'petrol', label: 'Petrol' },
          { value: 'diesel', label: 'Diesel' },
          { value: 'electric', label: 'Electric' },
          { value: 'hybrid', label: 'Hybrid' },
        ],
      },
    ],
  },
];

const fashionAdditional: FormFieldGroup[] = [
  {
    title: '👕 Apparel Details',
    icon: '👔',
    fields: [
      {
        name: 'size',
        label: 'Size',
        type: 'text',
        required: true,
        placeholder: 'XS, S, M, L, XL',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'text',
        required: true,
      },
      {
        name: 'material_composition',
        label: 'Material',
        type: 'text',
        placeholder: 'Cotton, Polyester, Wool, etc.',
      },
      {
        name: 'wear_status',
        label: 'Wear Status',
        type: 'select',
        options: [
          { value: 'never_worn', label: 'Never Worn' },
          { value: 'rarely', label: 'Rarely Worn' },
          { value: 'lightly', label: 'Lightly Worn' },
          { value: 'moderately', label: 'Moderately Worn' },
          { value: 'heavily', label: 'Heavily Worn' },
        ],
      },
    ],
  },
];

const jeweleryAdditional: FormFieldGroup[] = [
  {
    title: '💎 Jewelry Details',
    icon: '💍',
    fields: [
      {
        name: 'jewelry_type',
        label: 'Jewelry Type',
        type: 'select',
        required: true,
        options: [
          { value: 'ring', label: 'Ring' },
          { value: 'necklace', label: 'Necklace' },
          { value: 'bracelet', label: 'Bracelet' },
          { value: 'earring', label: 'Earring' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'material',
        label: 'Material',
        type: 'text',
        placeholder: 'Gold, Silver, Diamond, etc.',
      },
      {
        name: 'purity',
        label: 'Purity',
        type: 'text',
        placeholder: '22K, 18K, 14K, etc.',
      },
      {
        name: 'weight_grams',
        label: 'Weight (grams)',
        type: 'number',
        placeholder: 'Total weight',
      },
    ],
  },
];

const buildingAdditional: FormFieldGroup[] = [
  {
    title: '🏗️ Building Material Details',
    icon: '🏗️',
    fields: [
      {
        name: 'material_type',
        label: 'Material Type',
        type: 'select',
        required: true,
        options: [
          { value: 'door', label: 'Door' },
          { value: 'window', label: 'Window' },
          { value: 'tile', label: 'Tile' },
          { value: 'wood', label: 'Wood' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'dimensions',
        label: 'Dimensions',
        type: 'text',
        placeholder: 'Length x Width x Height',
      },
      {
        name: 'quality_grade',
        label: 'Quality Grade',
        type: 'select',
        options: [
          { value: 'premium', label: 'Premium' },
          { value: 'standard', label: 'Standard' },
          { value: 'economy', label: 'Economy' },
        ],
      },
    ],
  },
];

const collectiblesAdditional: FormFieldGroup[] = [
  {
    title: '🎨 Collectible Details',
    icon: '🎨',
    fields: [
      {
        name: 'item_type',
        label: 'Collectible Type',
        type: 'select',
        required: true,
        options: [
          { value: 'watch', label: 'Watch' },
          { value: 'vintage', label: 'Vintage Item' },
          { value: 'memorabilia', label: 'Memorabilia' },
          { value: 'art', label: 'Art/Painting' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'authenticity',
        label: 'Authenticity',
        type: 'select',
        options: [
          { value: 'genuine', label: 'Genuine' },
          { value: 'certified', label: 'Certified' },
          { value: 'unverified', label: 'Unverified' },
        ],
      },
      {
        name: 'rarity',
        label: 'Rarity',
        type: 'text',
        placeholder: 'Limited edition, rare, common, etc.',
      },
    ],
  },
];

const industrialAdditional: FormFieldGroup[] = [
  {
    title: '⚙️ Industrial Equipment Details',
    icon: '⚙️',
    fields: [
      {
        name: 'equipment_type',
        label: 'Equipment Type',
        type: 'select',
        required: true,
        options: [
          { value: 'machinery', label: 'Machinery' },
          { value: 'tools', label: 'Tools' },
          { value: 'equipment', label: 'Equipment' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'condition_status',
        label: 'Working Condition',
        type: 'select',
        options: [
          { value: 'working', label: 'Working' },
          { value: 'needs_repair', label: 'Needs Repair' },
          { value: 'parts_only', label: 'Parts Only' },
        ],
      },
      {
        name: 'usage_hours',
        label: 'Usage Hours/Age',
        type: 'text',
        placeholder: 'Hours of operation or age',
      },
    ],
  },
];

const booksAdditional: FormFieldGroup[] = [
  {
    title: '📚 Book Details',
    icon: '📖',
    fields: [
      {
        name: 'author',
        label: 'Author',
        type: 'text',
        required: true,
        placeholder: 'Author name',
      },
      {
        name: 'isbn',
        label: 'ISBN',
        type: 'text',
        placeholder: '13-digit ISBN',
      },
      {
        name: 'edition',
        label: 'Edition',
        type: 'text',
        placeholder: '1st edition, revised, etc.',
      },
      {
        name: 'pages',
        label: 'Number of Pages',
        type: 'number',
      },
    ],
  },
];

const artAdditional: FormFieldGroup[] = [
  {
    title: '🎭 Art & Handmade Details',
    icon: '🎭',
    fields: [
      {
        name: 'artist_name',
        label: 'Artist/Maker Name',
        type: 'text',
        required: true,
      },
      {
        name: 'art_type',
        label: 'Art Type',
        type: 'select',
        options: [
          { value: 'painting', label: 'Painting' },
          { value: 'sculpture', label: 'Sculpture' },
          { value: 'handmade', label: 'Handmade' },
          { value: 'digital', label: 'Digital Art' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'medium',
        label: 'Medium/Technique',
        type: 'text',
        placeholder: 'Oil, Acrylic, Digital, etc.',
      },
      {
        name: 'dimensions',
        label: 'Dimensions',
        type: 'text',
        placeholder: 'Width x Height (in inches/cm)',
      },
    ],
  },
];

// Build complete form field sets for each category
const electronicsFields: FormFieldGroup[] = [...commonFields, ...electronicsAdditional];
const mobileFields: FormFieldGroup[] = [...commonFields, ...mobileAdditional];
const furnitureFields: FormFieldGroup[] = [...commonFields, ...furnitureAdditional];
const vehiclesFields: FormFieldGroup[] = [...commonFields, ...vehiclesAdditional];
const fashionFields: FormFieldGroup[] = [...commonFields, ...fashionAdditional];
const jewelleryFields: FormFieldGroup[] = [...commonFields, ...jeweleryAdditional];
const buildingMaterialFields: FormFieldGroup[] = [...commonFields, ...buildingAdditional];
const collectiblesFields: FormFieldGroup[] = [...commonFields, ...collectiblesAdditional];
const industrialFields: FormFieldGroup[] = [...commonFields, ...industrialAdditional];
const booksFields: FormFieldGroup[] = [...commonFields, ...booksAdditional];
const artFields: FormFieldGroup[] = [...commonFields, ...artAdditional];

// Export field mapping and getter function
export const fieldDefinitionsByCategory = {
  electronics: electronicsFields,
  mobile: mobileFields,
  furniture: furnitureFields,
  vehicles: vehiclesFields,
  'fashion-apparel': fashionFields,
  jewellery: jewelleryFields,
  building_material: buildingMaterialFields,
  collectibles: collectiblesFields,
  industrial: industrialFields,
  books: booksFields,
  art: artFields,
};

export function getFieldsForCategory(category: string): FormFieldGroup[] {
  return (
    fieldDefinitionsByCategory[category as keyof typeof fieldDefinitionsByCategory] ||
    commonFields
  );
}

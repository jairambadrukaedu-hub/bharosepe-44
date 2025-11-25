/**
 * COMPREHENSIVE INDUSTRY FIELD TEMPLATES
 * All 12 GOODS categories + dispute-driven fields
 * India-specific field requirements
 */

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'checkbox' | 'checkboxgroup' | 'file';
  placeholder?: string;
  required: boolean;
  info: string;
  legalReferenceActs?: string[];
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{ value: string; label: string }>;
}

export interface IndustryTemplate {
  id: string;
  name: string;
  category: 'goods' | 'services';
  description: string;
  fields: FieldDefinition[];
  mandatoryFieldsForContract: string[];
  escrowReleaseConditions: string[];
  disputeDrivers: string[]; // Common dispute reasons in India
}

// ============================================================================
// UNIVERSAL FIELDS (All Goods)
// ============================================================================

export const UNIVERSAL_GOODS_FIELDS: Record<string, FieldDefinition> = {
  itemTitle: {
    name: 'itemTitle',
    label: 'Item Name/Title',
    type: 'text',
    required: true,
    placeholder: 'e.g., iPhone 15 Pro Max, Teak Wooden Sofa, Hero Honda Bike',
    info: 'Clear, specific name helps prevent "not as described" disputes',
    legalReferenceActs: ['Sale of Goods Act 1930']
  },
  itemDescription: {
    name: 'itemDescription',
    label: 'Detailed Description',
    type: 'textarea',
    required: true,
    placeholder: 'Complete details about condition, features, what\'s included',
    info: 'Detailed description prevents 70% of disputes in India',
    legalReferenceActs: ['Consumer Protection Act 2019', 'Indian Contract Act 1872']
  },
  quantity: {
    name: 'quantity',
    label: 'Quantity',
    type: 'number',
    required: true,
    placeholder: '1',
    info: 'How many items are being sold',
    legalReferenceActs: ['Indian Contract Act 1872']
  },
  price: {
    name: 'price',
    label: 'Price (₹)',
    type: 'number',
    required: true,
    placeholder: '5000',
    info: 'Total price - this becomes escrow amount',
    legalReferenceActs: ['Indian Contract Act 1872 (Consideration)', 'RBI Regulations']
  },
  deliveryDate: {
    name: 'deliveryDate',
    label: 'Delivery Date',
    type: 'date',
    required: true,
    info: 'When buyer will receive item',
    legalReferenceActs: ['Consumer Protection Act 2019']
  },
  deliveryMode: {
    name: 'deliveryMode',
    label: 'Delivery Mode',
    type: 'select',
    required: true,
    info: 'How item will be delivered',
    options: [
      { value: 'in_person', label: 'In-Person Handover' },
      { value: 'shipping', label: 'Courier/Shipping' },
      { value: 'pickup', label: 'Buyer Pickup' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019']
  },
  returnPolicy: {
    name: 'returnPolicy',
    label: 'Return Policy',
    type: 'select',
    required: true,
    info: 'Can buyer return the item? Critical for dispute resolution',
    options: [
      { value: 'no_return', label: 'No Returns' },
      { value: '7_days', label: '7 Days (Refundable)' },
      { value: '14_days', label: '14 Days (Refundable)' },
      { value: '30_days', label: '30 Days (Refundable)' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019']
  },
  warranty: {
    name: 'warranty',
    label: 'Warranty Period',
    type: 'select',
    required: true,
    info: 'Seller warranty against defects',
    options: [
      { value: 'no_warranty', label: 'As-Is (No Warranty)' },
      { value: '1_month', label: '1 Month' },
      { value: '3_months', label: '3 Months' },
      { value: '6_months', label: '6 Months' },
      { value: '1_year', label: '1 Year' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019']
  },
  inspectionWindow: {
    name: 'inspectionWindow',
    label: 'Inspection Window (Hours)',
    type: 'select',
    required: true,
    info: 'Time to inspect after delivery. Disputes must be raised within this window',
    options: [
      { value: '24', label: '24 Hours' },
      { value: '48', label: '48 Hours' },
      { value: '72', label: '72 Hours' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019']
  }
};

// ============================================================================
// 1. ELECTRONICS (GENERAL)
// ============================================================================

export const ELECTRONICS_GOODS: IndustryTemplate = {
  id: 'electronics',
  name: 'Electronics (General)',
  category: 'goods',
  description: 'General electronic items - keyboards, mouse, monitors, cables, etc.',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'brand',
      label: 'Brand & Model Number',
      type: 'text',
      required: true,
      placeholder: 'e.g., Dell KB123, Logitech MX Master 3',
      info: 'Exact brand and model for authenticity verification',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'serialNumber',
      label: 'Serial/Product Number (if available)',
      type: 'text',
      required: false,
      placeholder: 'Serial number or product code',
      info: 'Helps verify authenticity and identify counterfeits',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      info: 'CRITICAL: Misrepresenting condition is #1 dispute cause in India',
      options: [
        { value: 'brand_new', label: 'Brand New (Factory Sealed, Unopened)' },
        { value: 'new_unused', label: 'New (Unopened Box but Opened Outer Packaging)' },
        { value: 'like_new', label: 'Like New (Used Once)' },
        { value: 'used_good', label: 'Used (Good Condition)' },
        { value: 'used_fair', label: 'Used (Fair - Some Marks)' },
        { value: 'refurbished', label: 'Refurbished' }
      ],
      legalReferenceActs: ['Consumer Protection Act 2019', 'Sale of Goods Act 1930']
    },
    {
      name: 'functionalChecklist',
      label: 'Functional Status (Tick all working)',
      type: 'checkboxgroup',
      required: true,
      info: 'IMPORTANT: List what works. Disputes arise when items don\'t match checklist',
      options: [
        { value: 'powers_on', label: '✓ Powers On' },
        { value: 'charging', label: '✓ Charging/Power' },
        { value: 'buttons', label: '✓ Buttons Responsive' },
        { value: 'display', label: '✓ Display/Screen' },
        { value: 'ports', label: '✓ Ports Working' },
        { value: 'connectivity', label: '✓ Wifi/Bluetooth' },
        { value: 'speakers', label: '✓ Speakers/Audio' }
      ],
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'accessories',
      label: 'Accessories Included',
      type: 'textarea',
      required: true,
      placeholder: 'Charger, cable, box, manual, warranty card, etc. List ALL items',
      info: 'Missing accessories are VERY common dispute reason. Be exact.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'defects',
      label: 'Any Known Defects or Issues',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Minor scratch on corner / Loud fan noise',
      info: 'MANDATORY DISCLOSURE: Full honesty prevents fraud claims. Concealment = legal liability',
      legalReferenceActs: ['Indian Contract Act 1872 (Fraud)', 'Consumer Protection Act 2019']
    },
    {
      name: 'warranty',
      label: 'Warranty Type',
      type: 'select',
      required: true,
      options: [
        { value: 'manufacturer_active', label: 'Manufacturer Warranty (Active)' },
        { value: 'manufacturer_expired', label: 'Manufacturer Warranty (Expired)' },
        { value: 'no_warranty', label: 'No Warranty' }
      ],
      info: 'Affects resale value and buyer confidence',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.deliveryMode,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'brand', 'condition', 'functionalChecklist', 'accessories', 'defects', 'price', 'deliveryDate', 'returnPolicy'
  ],
  escrowReleaseConditions: [
    'Item delivered and received',
    'Item powers on and all checklist items work',
    'Condition matches description',
    'All accessories present',
    'No defects beyond disclosed',
    'Inspection window expires without dispute'
  ],
  disputeDrivers: [
    'Item doesn\'t power on',
    'Not same condition as described',
    'Missing accessories',
    'Hidden defects discovered after delivery',
    'Seller false warranty claim'
  ]
};

// ============================================================================
// 2. MOBILE PHONES & LAPTOPS
// ============================================================================

export const MOBILE_PHONES_LAPTOPS: IndustryTemplate = {
  id: 'mobile_phones_laptops',
  name: 'Mobile Phones & Laptops',
  category: 'goods',
  description: 'Smartphones, tablets, laptops - high-value electronics requiring strict verification',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'brand',
      label: 'Brand & Model',
      type: 'text',
      required: true,
      placeholder: 'e.g., iPhone 15 Pro Max, Samsung S24 Ultra, MacBook Pro 16"',
      info: 'Exact model - different variants have different values',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'imei1',
      label: 'IMEI 1 (Phone) or Serial Number (Laptop)',
      type: 'text',
      required: true,
      placeholder: 'IMEI or Serial number for authenticity',
      info: 'CRITICAL: IMEI mismatch is #1 fraud indicator. Used to check if phone is blacklisted',
      legalReferenceActs: ['IT Act 2000', 'Consumer Protection Act 2019']
    },
    {
      name: 'imei2',
      label: 'IMEI 2 (Dual SIM phones)',
      type: 'text',
      required: false,
      placeholder: 'For dual SIM phones only',
      info: 'If dual SIM, provide both IMEI numbers',
      legalReferenceActs: ['IT Act 2000']
    },
    {
      name: 'storage',
      label: 'Storage Capacity',
      type: 'text',
      required: true,
      placeholder: '256GB, 512GB, 1TB',
      info: 'Storage variant affects price significantly',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'ram',
      label: 'RAM (if applicable)',
      type: 'text',
      required: false,
      placeholder: '8GB, 12GB, 16GB',
      info: 'RAM variant affects performance and price',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      info: 'MOST DISPUTED: Always err on honest side. Buyer can verify with naked eye',
      options: [
        { value: 'brand_new', label: 'Brand New (Factory Sealed)' },
        { value: 'new_unused', label: 'New (Unopened Box)' },
        { value: 'like_new', label: 'Like New (Used <1 week)' },
        { value: 'used_excellent', label: 'Used (Excellent - Minimal Wear)' },
        { value: 'used_good', label: 'Used (Good - Normal Wear)' },
        { value: 'used_fair', label: 'Used (Fair - Visible Marks)' },
        { value: 'refurbished', label: 'Refurbished (Official)' }
      ],
      legalReferenceActs: ['Consumer Protection Act 2019', 'Sale of Goods Act 1930']
    },
    {
      name: 'batteryHealth',
      label: 'Battery Health (%)',
      type: 'number',
      required: true,
      placeholder: '95',
      info: 'IMPORTANT: Battery health is major dispute point. Show proof if possible',
      validationRules: { min: 0, max: 100 },
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'screenCondition',
      label: 'Screen Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'pristine', label: 'Pristine (No scratches)' },
        { value: 'minimal', label: 'Minimal Scratches (Only visible at angle)' },
        { value: 'minor', label: 'Minor Scratches (Visible in sunlight)' },
        { value: 'visible', label: 'Visible Damage' },
        { value: 'replaced', label: 'Screen Replaced' }
      ],
      info: 'Screen is most visible component. Buyers ALWAYS check this first',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'physicalDamage',
      label: 'Physical Damage Notes',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Minor scratches on back / Small dent on corner',
      info: 'Describe ALL visible damage. Photos help reduce disputes by 80%',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'lockStatus',
      label: 'Lock Status (iCloud/Google/FRP)',
      type: 'select',
      required: true,
      options: [
        { value: 'unlocked', label: 'Completely Unlocked' },
        { value: 'requires_password', label: 'Requires Seller Password (Will provide)' },
        { value: 'locked', label: 'Locked (Cannot be unlocked)' }
      ],
      info: 'CRITICAL DISPUTE POINT: Locked phones are worthless. Be honest',
      legalReferenceActs: ['IT Act 2000', 'Consumer Protection Act 2019']
    },
    {
      name: 'charger',
      label: 'Charger Status',
      type: 'select',
      required: true,
      options: [
        { value: 'original', label: 'Original Charger Included' },
        { value: 'third_party', label: 'Third-Party Charger' },
        { value: 'no_charger', label: 'No Charger' }
      ],
      info: 'Original charger adds ₹1000-2000 value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'previousRepairs',
      label: 'Previous Repairs/Replacements',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., None / Battery replaced 6 months ago / Screen replaced 1 year ago',
      info: 'Disclose any previous repairs. Buyers often claim these cause issues',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.deliveryMode,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'brand', 'imei1', 'storage', 'condition', 'batteryHealth', 'screenCondition', 'physicalDamage', 'lockStatus', 'charger', 'price', 'deliveryDate'
  ],
  escrowReleaseConditions: [
    'IMEI verified and not blacklisted',
    'Device powers on immediately',
    'Screen works and touch responsive',
    'Battery health matches claim',
    'No hidden locks or activations',
    'Physical condition matches description',
    'Charger works (if included)',
    'Inspection window expires without complaint'
  ],
  disputeDrivers: [
    'Device locked after delivery',
    'IMEI doesn\'t match claim',
    'Battery health much lower than stated',
    'Hidden screen damage',
    'Device powered off/won\'t charge',
    'Charger doesn\'t work or missing',
    'Previous repairs causing issues'
  ]
};

// ============================================================================
// 3. FURNITURE & HOME ITEMS
// ============================================================================

export const FURNITURE_HOME_ITEMS: IndustryTemplate = {
  id: 'furniture_home_items',
  name: 'Furniture & Home Items',
  category: 'goods',
  description: 'Sofas, beds, tables, cabinets, doors, windows - large items prone to color/size disputes',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'material',
      label: 'Material Type',
      type: 'select',
      required: true,
      info: 'Material quality affects price significantly. Teak ≠ Engineered wood',
      options: [
        { value: 'solid_wood', label: 'Solid Wood (Teak/Oak/Sheesham)' },
        { value: 'engineered_wood', label: 'Engineered Wood' },
        { value: 'particle_board', label: 'Particle Board' },
        { value: 'plywood', label: 'Plywood' },
        { value: 'metal', label: 'Metal' },
        { value: 'fabric', label: 'Fabric/Upholstery' },
        { value: 'mixed', label: 'Mixed Materials' }
      ],
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'dimensions',
      label: 'Exact Dimensions (L × W × H in inches/cm)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 72" × 36" × 32" (Length × Width × Height)',
      info: 'CRITICAL: Size mismatch is #2 furniture dispute in India. Measure accurately',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'color',
      label: 'Color',
      type: 'text',
      required: true,
      placeholder: 'e.g., Natural Teak, Walnut Brown, Black',
      info: 'VERY DISPUTED: "Color looks different in person" is most common complaint. Recommend video call before delivery',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'colorDisclaimer',
      label: 'Color Variation Disclaimer',
      type: 'checkbox',
      required: true,
      info: 'Confirm: Photos may vary in color due to lighting',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'brand_new', label: 'Brand New' },
        { value: 'unused', label: 'Unused (Old Stock)' },
        { value: 'like_new', label: 'Like New' },
        { value: 'used_excellent', label: 'Used (Excellent Condition)' },
        { value: 'used_good', label: 'Used (Good Condition)' },
        { value: 'used_fair', label: 'Used (Fair - Visible Wear)' }
      ],
      info: 'Heavily impacts disputes and return eligibility',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'damageNotes',
      label: 'Any Damage/Scratches/Marks',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Small scratch on left arm / Minor water mark on table top',
      info: 'FULL DISCLOSURE required. Concealed damage = fraud. Photos prevent disputes',
      legalReferenceActs: ['Indian Contract Act 1872', 'Consumer Protection Act 2019']
    },
    {
      name: 'assembly',
      label: 'Assembly Required',
      type: 'select',
      required: true,
      options: [
        { value: 'none', label: 'None - Ready to Use' },
        { value: 'minimal', label: 'Minimal (Legs/Hardware only)' },
        { value: 'moderate', label: 'Moderate (Few hours)' },
        { value: 'complex', label: 'Complex (Professional needed)' }
      ],
      info: 'Assembly disputes are common. Be clear about responsibility',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'weightCapacity',
      label: 'Weight Capacity (if applicable)',
      type: 'text',
      required: false,
      placeholder: 'e.g., 300kg',
      info: 'Important for sofas, beds, chairs',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'delivery',
      label: 'Delivery & Installation',
      type: 'select',
      required: true,
      options: [
        { value: 'seller_delivers_installs', label: 'Seller Delivers & Installs' },
        { value: 'seller_delivers_only', label: 'Seller Delivers Only' },
        { value: 'buyer_arranges', label: 'Buyer Arranges Delivery' },
        { value: 'courier', label: 'Courier/3rd Party' }
      ],
      info: 'Damage during delivery is MAJOR dispute point. Clear responsibility is critical',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'damageResponsibility',
      label: 'Damage Responsibility',
      type: 'select',
      required: true,
      options: [
        { value: 'seller_liable', label: 'Seller Liable (Delivery damage)' },
        { value: 'shared', label: 'Shared (Buyer sign-off required)' },
        { value: 'buyer_liable', label: 'Buyer Liable (After delivery)' }
      ],
      info: 'Prevents disputes about who pays for delivery damage',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'material', 'dimensions', 'color', 'condition', 'damageNotes', 'assembly', 'delivery', 'price', 'deliveryDate'
  ],
  escrowReleaseConditions: [
    'Furniture delivered safely',
    'Dimensions match specification',
    'Color acceptable to buyer',
    'Condition matches description',
    'No transport damage',
    'Assembly completed (if included)',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Color looks different in person (lighting variation)',
    'Dimensions not as expected',
    'Damage during delivery',
    'Hidden scratches/marks',
    'Assembly issues',
    'Material quality mismatch',
    'Wrong item delivered'
  ]
};

// ============================================================================
// 4. VEHICLES (2W/4W)
// ============================================================================

export const VEHICLES: IndustryTemplate = {
  id: 'vehicles',
  name: 'Vehicles (2W/4W)',
  category: 'goods',
  description: 'Bikes, scooters, cars, trucks - high-value items requiring legal verification',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'vehicleType',
      label: 'Vehicle Type',
      type: 'select',
      required: true,
      options: [
        { value: 'bike', label: 'Bike/Motorcycle' },
        { value: 'scooter', label: 'Scooter' },
        { value: 'car', label: 'Car' },
        { value: 'truck', label: 'Truck/Commercial' },
        { value: 'auto', label: 'Auto Rickshaw' }
      ],
      info: 'Type of vehicle affects legal requirements',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'registrationNumber',
      label: 'Registration Number',
      type: 'text',
      required: true,
      placeholder: 'e.g., KA-01-AB-1234',
      info: 'Used to verify registration and check accident history',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'rcStatus',
      label: 'RC (Registration Certificate) Status',
      type: 'select',
      required: true,
      options: [
        { value: 'original', label: 'Original RC' },
        { value: 'duplicate', label: 'Duplicate RC' },
        { value: 'not_available', label: 'Not Available' }
      ],
      info: 'Duplicate RC can cause legal issues. Buyer should verify at RTO',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'hypothecation',
      label: 'Hypothecation (Loan Status)',
      type: 'select',
      required: true,
      options: [
        { value: 'clear', label: 'Clear (No Loan)' },
        { value: 'hypothecated', label: 'Hypothecated (Bank owns)' }
      ],
      info: 'CRITICAL: If hypothecated, bank must release before delivery. Major dispute point',
      legalReferenceActs: ['Motor Vehicles Act 1988', 'RBI Regulations']
    },
    {
      name: 'chassisNumber',
      label: 'Chassis Number',
      type: 'text',
      required: true,
      placeholder: 'From RC',
      info: 'Used to identify vehicle uniquely',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'engineNumber',
      label: 'Engine Number',
      type: 'text',
      required: true,
      placeholder: 'From RC',
      info: 'Must match vehicle for verification',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'odometer',
      label: 'Odometer Reading (km)',
      type: 'number',
      required: true,
      placeholder: '45000',
      info: 'DISPUTED: Buyers claim odometer was rolled back. Get verification at service center',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'accidentHistory',
      label: 'Accident History',
      type: 'select',
      required: true,
      options: [
        { value: 'no_accidents', label: 'No Accidents' },
        { value: 'minor_accident', label: 'Minor Accident (disclosed)' },
        { value: 'major_accident', label: 'Major Accident (disclosed)' },
        { value: 'unknown', label: 'Unknown' }
      ],
      info: 'MANDATORY: Non-disclosure of accidents is fraud and voids insurance',
      legalReferenceActs: ['Indian Contract Act 1872 (Fraud)', 'Insurance Act 1938']
    },
    {
      name: 'insurance',
      label: 'Insurance Valid Till',
      type: 'date',
      required: true,
      info: 'Insurance must be valid for at least 6 months for resale',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'puc',
      label: 'Pollution Certificate (PUC) Valid Till',
      type: 'date',
      required: true,
      info: 'PUC needed for vehicle to be on road legally',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'serviceHistory',
      label: 'Service History Available',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes (With service book)' },
        { value: 'partial', label: 'Partial (Some records)' },
        { value: 'no', label: 'No' }
      ],
      info: 'Regular service history improves buyer confidence and resale value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'tyreCondition',
      label: 'Tyre Condition (%)',
      type: 'number',
      required: true,
      placeholder: '60',
      validationRules: { min: 0, max: 100 },
      info: 'Tyre replacement can cost ₹3000-8000. Important for buyer budgeting',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'batteryAge',
      label: 'Battery Age (months)',
      type: 'number',
      required: true,
      placeholder: '6',
      info: 'Battery replacement cost ranges ₹2000-5000',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'modifications',
      label: 'Modifications/Aftermarket Parts',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., None / Alloy wheels / Body kit / Sound system',
      info: 'Modifications affect insurance and resale value',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    {
      name: 'form28To30',
      label: 'Form 28/29/30 Available',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Will provide on delivery' },
        { value: 'no', label: 'No - Buyer must use online transfer' }
      ],
      info: 'Forms needed for ownership transfer at RTO. Online transfer now common',
      legalReferenceActs: ['Motor Vehicles Act 1988']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'registrationNumber', 'rcStatus', 'hypothecation', 'chassisNumber', 'engineNumber', 'odometer', 'accidentHistory', 'insurance', 'puc'
  ],
  escrowReleaseConditions: [
    'RC verified and original',
    'No hypothecation or bank clearance obtained',
    'Insurance and PUC valid',
    'Chassis and engine numbers match RC',
    'Test drive successful',
    'No accident history (or disclosed)',
    'Legal ownership transfer initiated',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Hidden accident history',
    'Odometer rolled back',
    'Vehicle still hypothecated to bank',
    'Insurance invalid or lapsed',
    'Accident damage discovered',
    'Engine/mechanical issues',
    'RC not available or duplicate',
    'Ownership transfer issues'
  ]
};

// ============================================================================
// 5. FASHION & APPAREL
// ============================================================================

export const FASHION_APPAREL: IndustryTemplate = {
  id: 'fashion_apparel',
  name: 'Fashion & Apparel',
  category: 'goods',
  description: 'Clothing, shoes, accessories - size and fit disputes are most common',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'brand',
      label: 'Brand',
      type: 'text',
      required: true,
      placeholder: 'e.g., Nike, Zara, Levis',
      info: 'Brand affects authenticity and value',
      legalReferenceActs: ['Consumer Protection Act 2019', 'Trade Marks Act 1999']
    },
    {
      name: 'size',
      label: 'Size (Label Size)',
      type: 'text',
      required: true,
      placeholder: 'e.g., M, L, XL, 32',
      info: 'MOST DISPUTED: Size varies by brand. Recommend buyer check brand size chart',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'actualMeasurements',
      label: 'Actual Measurements (if different from label)',
      type: 'text',
      required: false,
      placeholder: 'e.g., Chest 42", Length 28"',
      info: 'Prevents "doesn\'t fit" disputes. More helpful than label size',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'fitType',
      label: 'Fit Type',
      type: 'select',
      required: true,
      options: [
        { value: 'slim', label: 'Slim Fit' },
        { value: 'regular', label: 'Regular Fit' },
        { value: 'relaxed', label: 'Relaxed/Oversized' },
        { value: 'fitted', label: 'Fitted' }
      ],
      info: 'Fit varies between brands significantly',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'material',
      label: 'Material/Fabric',
      type: 'text',
      required: true,
      placeholder: 'e.g., 100% Cotton, Polyester, Linen',
      info: 'Material affects comfort and durability',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'color',
      label: 'Color',
      type: 'text',
      required: true,
      placeholder: 'e.g., Navy Blue, Black',
      info: 'Color can vary due to lighting in photos. Buyers often complain',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'colorNote',
      label: 'Color Disclaimer',
      type: 'checkbox',
      required: true,
      info: 'Acknowledge: Photos may vary in color due to lighting and camera'
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'new_tags', label: 'New with Tags' },
        { value: 'new_no_tags', label: 'New (Never Worn)' },
        { value: 'tried_once', label: 'Tried On Once' },
        { value: 'gently_used', label: 'Gently Used' },
        { value: 'used', label: 'Used (Normal Wear)' }
      ],
      info: 'Condition heavily affects whether buyer considers item "new"',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'defects',
      label: 'Any Defects/Damage',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Small stain on hem (washable) / Button loose',
      info: 'MANDATORY: Disclose all issues. Buyers hate hidden defects',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'originalBill',
      label: 'Original Bill/Receipt Available',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      info: 'Bill helps with authenticity verification',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'hygiene',
      label: 'Hygiene Notice',
      type: 'checkbox',
      required: true,
      info: 'Confirm: Not returnable if worn close to skin (intimate wear)'
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'brand', 'size', 'fitType', 'material', 'color', 'condition', 'defects', 'price'
  ],
  escrowReleaseConditions: [
    'Item delivered in original packaging',
    'Size and fit match description',
    'Condition matches claim',
    'Color acceptable',
    'No undisclosed defects',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Size mismatch or doesn\'t fit',
    'Color different from photos',
    'Defects or damage discovered',
    'Item doesn\'t match description',
    'Quality lower than expected',
    'Material not as promised'
  ]
};

// ============================================================================
// 6. JEWELLERY & PRECIOUS ITEMS
// ============================================================================

export const JEWELLERY_PRECIOUS: IndustryTemplate = {
  id: 'jewellery_precious',
  name: 'Jewellery & Precious Items',
  category: 'goods',
  description: 'Gold, silver, diamonds, gemstones - purity and authenticity are critical',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'metalType',
      label: 'Metal Type',
      type: 'select',
      required: true,
      options: [
        { value: 'gold', label: 'Gold' },
        { value: 'silver', label: 'Silver' },
        { value: 'platinum', label: 'Platinum' },
        { value: 'copper', label: 'Copper' },
        { value: 'mixed', label: 'Mixed Metals' }
      ],
      info: 'Metal type determines value',
      legalReferenceActs: ['Bureau of Indian Standards 1418']
    },
    {
      name: 'purity',
      label: 'Purity (if applicable)',
      type: 'select',
      required: false,
      options: [
        { value: '22k', label: '22 Karat' },
        { value: '18k', label: '18 Karat' },
        { value: '14k', label: '14 Karat' },
        { value: '999', label: '99.9% Pure Silver' },
        { value: '925', label: '92.5% Sterling Silver' }
      ],
      info: 'CRITICAL: Purity mismatch is #1 jewellery dispute. Lab test can verify',
      legalReferenceActs: ['Bureau of Indian Standards 1418', 'Hallmarking Scheme 2000']
    },
    {
      name: 'grossWeight',
      label: 'Gross Weight (grams)',
      type: 'number',
      required: true,
      placeholder: '10.5',
      info: 'Total weight including stones and setting',
      legalReferenceActs: ['Bureau of Indian Standards 1418']
    },
    {
      name: 'netWeight',
      label: 'Net Weight (grams) - Metal only',
      type: 'number',
      required: false,
      placeholder: '8.2',
      info: 'Weight of pure metal only (without stones)',
      legalReferenceActs: ['Bureau of Indian Standards 1418']
    },
    {
      name: 'stones',
      label: 'Stones/Gemstones Details',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., None / 2 Diamonds (0.5 carat total) / Natural rubies',
      info: 'Type, quality, and certification of stones affects value significantly',
      legalReferenceActs: ['Gemological Institute of India Standards']
    },
    {
      name: 'hallmark',
      label: 'Hallmark Present',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Hallmarked' },
        { value: 'no', label: 'No - Not Hallmarked' }
      ],
      info: 'Indian government hallmark guarantees purity. Increases value ₹500-2000',
      legalReferenceActs: ['Hallmarking Scheme 2000']
    },
    {
      name: 'invoice',
      label: 'Original Invoice/Certificate from Jeweller',
      type: 'file',
      required: true,
      info: 'MANDATORY: Invoice is proof of purity claim and helps insurance',
      legalReferenceActs: ['Hallmarking Scheme 2000']
    },
    {
      name: 'makingCharges',
      label: 'Making Charges (if known)',
      type: 'number',
      required: false,
      placeholder: '500',
      info: 'Original making charges for buyer reference',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'marketValue',
      label: 'Current Market Value (optional)',
      type: 'number',
      required: false,
      placeholder: '5000',
      info: 'Reference value. Actual depends on spot rate at time of sale',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'brand_new', label: 'Brand New' },
        { value: 'unused', label: 'Unused/Never Worn' },
        { value: 'excellent', label: 'Excellent Condition' },
        { value: 'good', label: 'Good Condition' },
        { value: 'fair', label: 'Fair (Worn)' }
      ],
      info: 'Cosmetic condition affects buyer perception',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'Returns only for purity mismatch (requires lab test)' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'metalType', 'purity', 'grossWeight', 'hallmark', 'invoice', 'condition', 'price'
  ],
  escrowReleaseConditions: [
    'Purity certificate provided and verified',
    'Gross weight matches claim',
    'Hallmark verified (if claimed)',
    'Invoice provided',
    'No hidden defects',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Purity claim false - lab test differs',
    'Weight mismatch',
    'Missing hallmark despite claim',
    'Stones not as described',
    'Hidden damage or repair marks',
    'Certificate not authentic'
  ]
};

// ============================================================================
// 7. HOME APPLIANCES (TV, AC, Fridge, Washing Machine, etc.)
// ============================================================================

export const HOME_APPLIANCES: IndustryTemplate = {
  id: 'home_appliances',
  name: 'Home Appliances',
  category: 'goods',
  description: 'TVs, ACs, Fridges, Washing Machines - high-value functional items',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'brand',
      label: 'Brand & Model',
      type: 'text',
      required: true,
      placeholder: 'e.g., LG 55" OLED TV, Daikin 1.5 Ton AC',
      info: 'Exact model for parts availability and warranty verification',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'appliance Type',
      label: 'Appliance Type',
      type: 'select',
      required: true,
      options: [
        { value: 'tv', label: 'Television' },
        { value: 'ac', label: 'Air Conditioner' },
        { value: 'refrigerator', label: 'Refrigerator' },
        { value: 'washing_machine', label: 'Washing Machine' },
        { value: 'microwave', label: 'Microwave' },
        { value: 'oven', label: 'Oven/Cooktop' },
        { value: 'water_heater', label: 'Water Heater' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Type determines specific functional checks needed',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'capacity',
      label: 'Capacity (Litres/Tonnage/kg)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 1.5 Ton (AC), 300L (Fridge), 7kg (Washing Machine)',
      info: 'Capacity is key specification buyers verify',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'powerRating',
      label: 'Power Rating (Watts)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 1800W',
      info: 'Affects electricity bill and power requirements',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'purchaseDate',
      label: 'Original Purchase Date',
      type: 'date',
      required: true,
      info: 'Helps determine warranty eligibility',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'warranty',
      label: 'Warranty Status',
      type: 'select',
      required: true,
      options: [
        { value: 'manufacturer_active', label: 'Manufacturer Warranty (Active)' },
        { value: 'manufacturer_expired', label: 'Manufacturer Warranty (Expired)' },
        { value: 'extended_warranty', label: 'Extended Warranty' },
        { value: 'no_warranty', label: 'As-Is (No Warranty)' }
      ],
      info: 'Warranty status affects buyer confidence and resale value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'functionalTests',
      label: 'Functional Testing Checklist',
      type: 'checkboxgroup',
      required: true,
      info: 'CRITICAL: Verify all functions work before delivery',
      options: [
        { value: 'powers_on', label: '✓ Powers On & Remote Works' },
        { value: 'primary_function', label: '✓ Primary Function Works (Cooling/Heating/Washing)' },
        { value: 'secondary_function', label: '✓ Secondary Functions Work' },
        { value: 'noise_level', label: '✓ Noise Level Normal' },
        { value: 'vibration', label: '✓ No Excessive Vibration' },
        { value: 'temperature_control', label: '✓ Temperature Control Works' },
        { value: 'all_modes', label: '✓ All Modes Functional' }
      ],
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'accessories',
      label: 'Accessories Included',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Remote, Manual, Power Cord, Water Inlet Hose, etc.',
      info: 'List all included accessories. Missing accessories = common dispute',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'repairHistory',
      label: 'Repair History',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., None / Compressor repaired 1 year ago / Drum seal replaced',
      info: 'Disclose any previous repairs. Buyers worry about recurring issues',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'specialMaintenance',
      label: 'Special Maintenance (if applicable)',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., AC requires gas refill every 2 years / Fridge needs door seal replacement',
      info: 'Helps buyer understand maintenance requirements',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Cosmetic Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'brand_new', label: 'Brand New' },
        { value: 'like_new', label: 'Like New' },
        { value: 'excellent', label: 'Excellent (Minimal marks)' },
        { value: 'good', label: 'Good (Some wear)' },
        { value: 'fair', label: 'Fair (Visible wear)' }
      ],
      info: 'Cosmetic condition affects buyer perception',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'damages',
      label: 'Any Visible Damage/Dents',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Minor dent on side / Scratch on screen',
      info: 'Disclose all visible damage. Photos prevent disputes',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.deliveryMode,
    UNIVERSAL_GOODS_FIELDS.returnPolicy,
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'brand', 'appliance Type', 'capacity', 'powerRating', 'warranty', 'functionalTests', 'accessories', 'price'
  ],
  escrowReleaseConditions: [
    'Appliance powers on',
    'All checked functions work normally',
    'Accessories included and working',
    'Cosmetic condition acceptable',
    'No undisclosed defects',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Not functioning as described',
    'Weak cooling/heating performance',
    'Excessive noise or vibration',
    'Missing accessories',
    'Previous repair issues recurring',
    'Damage not disclosed',
    'Incorrect capacity or model'
  ]
};

// ============================================================================
// 8. REAL ESTATE FIXTURES / USED BUILDING MATERIAL
// ============================================================================

export const REAL_ESTATE_FIXTURES: IndustryTemplate = {
  id: 'real_estate_fixtures',
  name: 'Real Estate Fixtures & Building Materials',
  category: 'goods',
  description: 'Doors, Windows, Tiles, Countertops, Flooring - material quality dependent',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'fixtureType',
      label: 'Fixture Type',
      type: 'select',
      required: true,
      options: [
        { value: 'door', label: 'Door' },
        { value: 'window', label: 'Window' },
        { value: 'tile', label: 'Tile/Flooring' },
        { value: 'countertop', label: 'Countertop' },
        { value: 'wood_panel', label: 'Wood Panelling' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Type determines inspection standards',
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'material',
      label: 'Material Type',
      type: 'select',
      required: true,
      options: [
        { value: 'granite', label: 'Granite (Grade A/B/C)' },
        { value: 'marble', label: 'Marble' },
        { value: 'ceramic', label: 'Ceramic' },
        { value: 'porcelain', label: 'Porcelain' },
        { value: 'wood', label: 'Wood' },
        { value: 'glass', label: 'Glass' },
        { value: 'steel', label: 'Steel/Aluminum' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Material grade affects durability and price',
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'dimensions',
      label: 'Dimensions (L×W×H or as applicable)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 2000mm × 900mm for door, 1200mm × 600mm for tile',
      info: 'Exact dimensions critical for fit',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'quantity',
      label: 'Number of Units',
      type: 'number',
      required: true,
      placeholder: '10 tiles, 2 doors',
      info: 'Total quantity available',
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'grade',
      label: 'Quality Grade',
      type: 'select',
      required: true,
      options: [
        { value: 'premium', label: 'Premium/Grade A' },
        { value: 'standard', label: 'Standard/Grade B' },
        { value: 'economy', label: 'Economy/Grade C' }
      ],
      info: 'Grade determines durability and finish quality',
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'color',
      label: 'Color/Finish',
      type: 'text',
      required: true,
      placeholder: 'e.g., Black Granite, Light Pink Marble, Cream Tile',
      info: 'Color consistency may vary between batches',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'colorBatchNote',
      label: 'Color Batch Variation Disclaimer',
      type: 'checkbox',
      required: true,
      info: 'Confirm: Natural stone/material color may vary slightly between batches'
    },
    {
      name: 'defects',
      label: 'Defects/Damage',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Small chip on corner / Hairline crack',
      info: 'Disclose all defects. Buyers inspect closely',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'originSource',
      label: 'Origin/Source (if known)',
      type: 'text',
      required: false,
      placeholder: 'e.g., Indian granite, Italian marble, Local supplier',
      info: 'Origin affects authenticity and quality perception',
      legalReferenceActs: ['Sale of Goods Act 1930']
    },
    {
      name: 'installation',
      label: 'Installation Requirements',
      type: 'select',
      required: true,
      options: [
        { value: 'ready_to_use', label: 'Ready to Install' },
        { value: 'professional_needed', label: 'Professional Installation Needed' },
        { value: 'minor_prep', label: 'Minor Prep Required' }
      ],
      info: 'Helps buyer budget for installation',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    UNIVERSAL_GOODS_FIELDS.deliveryMode,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'Returns may be limited for building materials' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'fixtureType', 'material', 'dimensions', 'quantity', 'grade', 'color', 'defects', 'price'
  ],
  escrowReleaseConditions: [
    'Material grade matches claim',
    'Dimensions accurate',
    'Color acceptable',
    'No undisclosed defects',
    'Quantity correct',
    'Delivery successful',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Color doesn\'t match batch',
    'Dimensions incorrect',
    'Grade lower than specified',
    'Hidden damage discovered',
    'Material quality poor',
    'Quantity short'
  ]
};

// ============================================================================
// 9. COLLECTIBLES / LUXURY ITEMS
// ============================================================================

export const COLLECTIBLES_LUXURY: IndustryTemplate = {
  id: 'collectibles_luxury',
  name: 'Collectibles & Luxury Items',
  category: 'goods',
  description: 'Limited editions, art, memorabilia - authenticity is paramount',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'itemCategory',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'limited_edition', label: 'Limited Edition' },
        { value: 'signed', label: 'Signed/Autographed' },
        { value: 'memorabilia', label: 'Sports/Entertainment Memorabilia' },
        { value: 'vintage', label: 'Vintage Item' },
        { value: 'collectible_toy', label: 'Collectible Toy/Figure' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Category determines authentication standards',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'edition',
      label: 'Edition Number (if applicable)',
      type: 'text',
      required: false,
      placeholder: 'e.g., 5/500, Limited Edition #123',
      info: 'Edition number affects rarity and value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'authenticCertificate',
      label: 'Certificate of Authenticity',
      type: 'file',
      required: true,
      info: 'MANDATORY: Required for high-value collectibles. Upload scan of certificate',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'originalPackaging',
      label: 'Original Packaging Status',
      type: 'select',
      required: true,
      options: [
        { value: 'unopened', label: 'Unopened (Sealed Original Box)' },
        { value: 'original_opened', label: 'Original Box (Opened)' },
        { value: 'no_original', label: 'No Original Packaging' }
      ],
      info: 'Unopened items command 20-50% price premium',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition Rating (1-10)',
      type: 'number',
      required: true,
      placeholder: '9',
      validationRules: { min: 1, max: 10 },
      info: 'Collector standard grading. 10 = mint/flawless, 1 = damaged',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'conditionDescription',
      label: 'Condition Details',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Mint condition with light dust only / Factory seals intact / Slight box wear',
      info: 'Detailed description helps justify rating',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'ownershipHistory',
      label: 'Ownership History',
      type: 'select',
      required: true,
      options: [
        { value: '1st_owner', label: '1st Owner' },
        { value: '2nd_owner', label: '2nd Owner' },
        { value: '3rd_plus', label: '3rd or More Owners' }
      ],
      info: '1st owner items command premium. Multiple owners reduce value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'restorationStatus',
      label: 'Restoration/Repair Status',
      type: 'select',
      required: true,
      options: [
        { value: 'never', label: 'Never Restored' },
        { value: 'professional', label: 'Professional Restoration' },
        { value: 'minor_repair', label: 'Minor Repair Only' },
        { value: 'unknown', label: 'Unknown' }
      ],
      info: 'Professional restoration documented increases value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'provenance',
      label: 'Provenance/Purchase Record',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., Original receipt from authorized dealer, Certificate with purchase proof',
      info: 'Provenance documentation increases buyer confidence',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'No returns for collectibles - condition final' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'itemCategory', 'edition', 'authenticCertificate', 'condition', 'conditionDescription', 'ownershipHistory', 'price'
  ],
  escrowReleaseConditions: [
    'Certificate of authenticity verified',
    'Condition matches claim (1-10 rating)',
    'Packaging status matches description',
    'Item received safely',
    'No tampering or damage',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Authenticity certificate fake or invalid',
    'Condition lower than claimed',
    'Item damaged in transit',
    'Packaging not as described',
    'Hidden restoration or repair',
    'Fake or forgery discovered'
  ]
};

// ============================================================================
// 10. INDUSTRIAL GOODS / MACHINERY
// ============================================================================

export const INDUSTRIAL_MACHINERY: IndustryTemplate = {
  id: 'industrial_machinery',
  name: 'Industrial Goods & Machinery',
  category: 'goods',
  description: 'Machinery, equipment, tools - performance and maintenance history critical',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'machineType',
      label: 'Machine Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cnc_machine', label: 'CNC Machine' },
        { value: 'printing_machine', label: 'Printing Machine' },
        { value: 'textile_machine', label: 'Textile Machine' },
        { value: 'heavy_equipment', label: 'Heavy Equipment' },
        { value: 'power_tool', label: 'Power Tool/Equipment' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Machine type determines inspection and certification requirements',
      legalReferenceActs: ['Factories Act 1948']
    },
    {
      name: 'brand',
      label: 'Brand & Model Number',
      type: 'text',
      required: true,
      placeholder: 'Exact model for parts availability',
      info: 'Model determines spare parts availability',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'seriesNumber',
      label: 'Serial/Series Number',
      type: 'text',
      required: true,
      placeholder: 'For identification and verification',
      info: 'Unique identification for each machine',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'loadRating',
      label: 'Load Rating/Capacity',
      type: 'text',
      required: true,
      placeholder: 'e.g., 500kg, 10 Ton, 5000 rpm',
      info: 'Maximum safe operating capacity',
      legalReferenceActs: ['Factories Act 1948']
    },
    {
      name: 'powerRating',
      label: 'Power Rating (kW/HP)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 5 kW, 10 HP',
      info: 'Power consumption and output capacity',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'yearOfManufacture',
      label: 'Year of Manufacture',
      type: 'number',
      required: true,
      placeholder: '2015',
      info: 'Machine age affects value and performance',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'hoursOfUse',
      label: 'Hours of Use (Approx)',
      type: 'number',
      required: true,
      placeholder: '5000',
      info: 'Operating hours indicate wear. Critical for machinery',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'maintenanceHistory',
      label: 'Maintenance History (Upload Document)',
      type: 'file',
      required: true,
      info: 'MANDATORY: Maintenance logs/service records help buyer assess condition',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'lastServiceDate',
      label: 'Last Service Date',
      type: 'date',
      required: true,
      info: 'Recent service = better condition',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Operating Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent (Recently serviced)' },
        { value: 'good', label: 'Good (Normal working)' },
        { value: 'fair', label: 'Fair (Needs maintenance soon)' },
        { value: 'poor', label: 'Poor (Major repair needed)' }
      ],
      info: 'Operating condition affects immediate usability',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'operationalTest',
      label: 'Operational Test Video',
      type: 'file',
      required: true,
      info: 'MANDATORY: Video showing machine working under load',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'trainingRequired',
      label: 'Training Required',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Will provide training' },
        { value: 'no', label: 'No - Ready to use' }
      ],
      info: 'Complex machines may need operator training',
      legalReferenceActs: ['Factories Act 1948']
    },
    {
      name: 'certificates',
      label: 'Safety/Compliance Certificates',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., ISO certified / CE marked / BIS compliant',
      info: 'Safety certifications increase buyer confidence',
      legalReferenceActs: ['Factories Act 1948']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'Typically no returns for used machinery' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'machineType', 'brand', 'seriesNumber', 'loadRating', 'powerRating', 'yearOfManufacture', 'hoursOfUse', 'maintenanceHistory', 'lastServiceDate', 'operationalTest', 'price'
  ],
  escrowReleaseConditions: [
    'Machine tested and operating normally',
    'Operational test video verified',
    'Maintenance history reviewed',
    'Load rating capacity verified',
    'Safety certificates provided',
    'Training completed (if applicable)',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Machine doesn\'t perform at rated capacity',
    'Hidden mechanical issues',
    'Poor maintenance history',
    'Hours of use misrepresented',
    'Safety issues discovered',
    'Spare parts unavailable'
  ]
};

// ============================================================================
// 11. BOOKS & EDUCATIONAL MATERIAL
// ============================================================================

export const BOOKS_EDUCATIONAL: IndustryTemplate = {
  id: 'books_educational',
  name: 'Books & Educational Material',
  category: 'goods',
  description: 'Books, textbooks, study material - edition and authenticity matter',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
      placeholder: 'e.g., Stephen King, NCERT',
      info: 'Author name verification',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'isbn',
      label: 'ISBN Number',
      type: 'text',
      required: true,
      placeholder: 'ISBN-13 or ISBN-10',
      info: 'ISBN helps verify genuine publication',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'edition',
      label: 'Edition Number',
      type: 'text',
      required: true,
      placeholder: '1st Edition, 3rd Edition, 2024 Edition',
      info: 'Edition number affects value. Older editions may have outdated info',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'publicationYear',
      label: 'Publication Year',
      type: 'number',
      required: true,
      placeholder: '2023',
      info: 'Recent publications have updated content',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'format',
      label: 'Format',
      type: 'select',
      required: true,
      options: [
        { value: 'hardcover', label: 'Hardcover' },
        { value: 'paperback', label: 'Paperback' },
        { value: 'ebook', label: 'eBook/Digital' }
      ],
      info: 'Format affects durability and cost',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'binding',
      label: 'Binding Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'pristine', label: 'Pristine/Sealed' },
        { value: 'excellent', label: 'Excellent (New condition)' },
        { value: 'good', label: 'Good (Light wear)' },
        { value: 'fair', label: 'Fair (Binding loose/weak)' },
        { value: 'poor', label: 'Poor (Pages loose)' }
      ],
      info: 'Binding quality affects usability',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'pagesCondition',
      label: 'Pages Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'pristine', label: 'Pristine (No marks)' },
        { value: 'clean', label: 'Clean (No highlighting)' },
        { value: 'marked', label: 'Marked (Minimal highlighting)' },
        { value: 'highlighted', label: 'Heavily Highlighted' },
        { value: 'damaged', label: 'Pages Damaged/Missing' }
      ],
      info: 'Page condition matters for study books',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'original',
      label: 'Original or Reproduction',
      type: 'select',
      required: true,
      options: [
        { value: 'original', label: 'Original Publication' },
        { value: 'reprint', label: 'Reprint/New Print' },
        { value: 'reproduction', label: 'Reproduction/Photocopy' }
      ],
      info: 'CRITICAL: Photocopied books violate copyright and have no legal value',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'highlights',
      label: 'Highlighting/Annotations Present',
      type: 'checkbox',
      required: false,
      info: 'Confirm if book has student notes/highlights'
    },
    {
      name: 'missingPages',
      label: 'Missing Pages or Content',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Pages 100-105 missing / Cover partially torn',
      info: 'MANDATORY: Missing pages render book unusable',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'Books: Usually no returns if used' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'author', 'isbn', 'edition', 'format', 'original', 'missingPages', 'price'
  ],
  escrowReleaseConditions: [
    'ISBN verified (original publication)',
    'Edition and year match claim',
    'No missing pages',
    'Binding intact and functional',
    'Photocopied books rejected',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Book is photocopy (illegal)',
    'Missing pages or content',
    'Edition different from described',
    'Binding broken/pages falling',
    'Heavily marked/highlighted (for study use)',
    'ISBN doesn\'t match book'
  ]
};

// ============================================================================
// 12. ART & HANDMADE ITEMS
// ============================================================================

export const ART_HANDMADE: IndustryTemplate = {
  id: 'art_handmade',
  name: 'Art & Handmade Items',
  category: 'goods',
  description: 'Paintings, sculptures, crafts - authenticity and condition critical',
  fields: [
    UNIVERSAL_GOODS_FIELDS.itemTitle,
    UNIVERSAL_GOODS_FIELDS.itemDescription,
    {
      name: 'artist',
      label: 'Artist Name',
      type: 'text',
      required: true,
      placeholder: 'e.g., Raja Ravi Varma, Local artisan name',
      info: 'Artist reputation affects value significantly',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'medium',
      label: 'Medium/Technique',
      type: 'select',
      required: true,
      options: [
        { value: 'oil_painting', label: 'Oil Painting' },
        { value: 'acrylic', label: 'Acrylic' },
        { value: 'watercolor', label: 'Watercolor' },
        { value: 'pencil_drawing', label: 'Pencil Drawing' },
        { value: 'sculpture', label: 'Sculpture' },
        { value: 'pottery', label: 'Pottery/Ceramic' },
        { value: 'mixed_media', label: 'Mixed Media' },
        { value: 'digital', label: 'Digital Art' },
        { value: 'other', label: 'Other' }
      ],
      info: 'Medium determines care requirements and preservation needs',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'dimensions',
      label: 'Dimensions (Height × Width in inches/cm)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 24" × 36"',
      info: 'Size affects value and placement',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'yearCreated',
      label: 'Year Created',
      type: 'number',
      required: false,
      placeholder: '2020',
      info: 'Older art generally more valuable',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'authenticCertificate',
      label: 'Certificate of Authenticity',
      type: 'file',
      required: true,
      info: 'MANDATORY: Upload certificate or artist letter of authenticity',
      legalReferenceActs: ['Copyright Act 1957']
    },
    {
      name: 'colors',
      label: 'Color Description',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Oil painting with blue, gold, and red tones - vibrant',
      info: 'Colors may appear different on screens vs. real art',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent (Perfect)' },
        { value: 'very_good', label: 'Very Good (Minor wear)' },
        { value: 'good', label: 'Good (Some wear)' },
        { value: 'fair', label: 'Fair (Visible damage)' },
        { value: 'poor', label: 'Poor (Significant damage)' }
      ],
      info: 'Condition significantly affects value',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'damage',
      label: 'Any Damage/Restoration',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., None / Small tear on corner / Professional restoration 2022',
      info: 'Disclose all damage and restoration work',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'fragility',
      label: 'Fragility Rating',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low (Durable, easy to ship)' },
        { value: 'medium', label: 'Medium (Some care needed)' },
        { value: 'high', label: 'High (Very delicate, professional packing)' }
      ],
      info: 'Fragility determines shipping method and insurance needs',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'specialCare',
      label: 'Special Care Instructions',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., Avoid direct sunlight / Store in dry place / Requires UV glass',
      info: 'Help buyer maintain artwork properly',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'provenance',
      label: 'Provenance/Ownership History',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., Acquired directly from artist / From estate collection',
      info: 'Provenance documentation increases value',
      legalReferenceActs: ['Copyright Act 1957']
    },
    UNIVERSAL_GOODS_FIELDS.quantity,
    UNIVERSAL_GOODS_FIELDS.price,
    UNIVERSAL_GOODS_FIELDS.deliveryDate,
    { ...UNIVERSAL_GOODS_FIELDS.returnPolicy, info: 'Art typically non-returnable after delivery' },
    UNIVERSAL_GOODS_FIELDS.inspectionWindow
  ],
  mandatoryFieldsForContract: [
    'artist', 'medium', 'dimensions', 'authenticCertificate', 'colors', 'condition', 'damage', 'fragility', 'price'
  ],
  escrowReleaseConditions: [
    'Certificate of authenticity verified',
    'Condition matches description',
    'Art delivered safely without damage',
    'Colors/appearance acceptable',
    'Fragility rating appropriate',
    'No tampering or restoration without disclosure',
    'Inspection window expires'
  ],
  disputeDrivers: [
    'Authenticity certificate fake or invalid',
    'Colors appear different than photos',
    'Hidden damage discovered',
    'Condition lower than claimed',
    'Damage during shipping',
    'Artist authentication fails'
  ]
};

// ============================================================================
// EXPORT ALL 12 TEMPLATES
// ============================================================================

export const GOODS_INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  electronics: ELECTRONICS_GOODS,
  mobile_phones_laptops: MOBILE_PHONES_LAPTOPS,
  furniture_home_items: FURNITURE_HOME_ITEMS,
  vehicles: VEHICLES,
  fashion_apparel: FASHION_APPAREL,
  jewellery_precious: JEWELLERY_PRECIOUS,
  home_appliances: HOME_APPLIANCES,
  real_estate_fixtures: REAL_ESTATE_FIXTURES,
  collectibles_luxury: COLLECTIBLES_LUXURY,
  industrial_machinery: INDUSTRIAL_MACHINERY,
  books_educational: BOOKS_EDUCATIONAL,
  art_handmade: ART_HANDMADE
};

export const GOODS_INDUSTRIES = [
  { id: 'electronics', name: '⚡ Electronics' },
  { id: 'mobile_phones_laptops', name: '📱 Mobile Phones & Laptops' },
  { id: 'furniture_home_items', name: '🛋️ Furniture & Home Items' },
  { id: 'vehicles', name: '🏍️ Vehicles (2W/4W)' },
  { id: 'fashion_apparel', name: '👕 Fashion & Apparel' },
  { id: 'jewellery_precious', name: '💎 Jewellery & Precious Items' },
  { id: 'home_appliances', name: '❄️ Home Appliances' },
  { id: 'real_estate_fixtures', name: '🏠 Real Estate Fixtures' },
  { id: 'collectibles_luxury', name: '🎨 Collectibles & Luxury' },
  { id: 'industrial_machinery', name: '⚙️ Industrial Machinery' },
  { id: 'books_educational', name: '📚 Books & Educational' },
  { id: 'art_handmade', name: '🎭 Art & Handmade Items' }
];

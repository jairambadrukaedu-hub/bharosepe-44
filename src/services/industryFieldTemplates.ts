/**
 * Industry-Specific Field Templates
 * Contains all field definitions with info/guidance for each industry
 * Used to build dynamic forms and AI contract generation
 */

export interface FieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'checkbox';
  placeholder?: string;
  required: boolean;
  info: string; // Guidance text shown in info button
  legalReferenceActs?: string[]; // Indian acts this field relates to
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
  category: string;
  industryType: string;
  description: string;
  fields: FieldDefinition[];
  mandatoryFieldsForContract: string[]; // Fields that MUST be in contract
  escrowReleaseConditions: string[];
  standardTerms: Record<string, string>; // Default terms for this industry
}

// ============================================================================
// UNIVERSAL FIELDS (All Industries)
// ============================================================================

export const UNIVERSAL_FIELDS: Record<string, FieldDefinition> = {
  itemDescription: {
    name: 'itemDescription',
    label: 'Item/Service Description',
    type: 'textarea',
    required: true,
    placeholder: 'Provide a detailed description of what is being sold/serviced',
    info: 'Clear description helps in dispute resolution. Include all relevant details about the product/service being transacted.',
    legalReferenceActs: ['Indian Contract Act 1872 Section 1 (Offer and Acceptance)']
  },
  quantity: {
    name: 'quantity',
    label: 'Quantity',
    type: 'number',
    required: true,
    placeholder: 'Enter quantity',
    info: 'Number of items or scope of service. Critical for contract enforcement under Indian Contract Act.',
    legalReferenceActs: ['Indian Contract Act 1872']
  },
  totalPrice: {
    name: 'totalPrice',
    label: 'Total Price (₹)',
    type: 'number',
    required: true,
    placeholder: 'Enter total price',
    info: 'Final price after all charges. This becomes the escrow amount. Platform fee is 1% of this amount.',
    legalReferenceActs: ['Indian Contract Act 1872 (Consideration)', 'RBI Regulations']
  },
  deliveryDate: {
    name: 'deliveryDate',
    label: 'Delivery/Completion Date',
    type: 'date',
    required: true,
    info: 'Expected delivery date. Delays beyond this trigger penalties per contract terms. Must be realistic.',
    legalReferenceActs: ['Indian Contract Act 1872 Section 43 (Warranty)', 'Consumer Protection Act 2019']
  },
  deliveryMode: {
    name: 'deliveryMode',
    label: 'Delivery/Execution Mode',
    type: 'select',
    required: true,
    info: 'How the product/service will be delivered. Critical for defining buyer/seller obligations.',
    options: [
      { value: 'in_person', label: 'In-Person Handover' },
      { value: 'shipping', label: 'Courier/Shipping' },
      { value: 'digital', label: 'Digital Delivery' },
      { value: 'service_location', label: 'At Service Location' },
      { value: 'buyer_location', label: 'At Buyer\'s Location' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019']
  },
  returnPolicy: {
    name: 'returnPolicy',
    label: 'Return Policy',
    type: 'select',
    required: true,
    info: 'Buyer\'s right to return within specified days. Non-refundable/refundable affects escrow release.',
    options: [
      { value: 'no_return', label: 'No Returns' },
      { value: '7_days', label: '7 Days (Refundable)' },
      { value: '14_days', label: '14 Days (Refundable)' },
      { value: '30_days', label: '30 Days (Refundable)' },
      { value: 'custom', label: 'Custom Terms' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019 Chapter VII (Right to Return)', 'Goods and Services Tax']
  },
  warrantyPeriod: {
    name: 'warrantyPeriod',
    label: 'Warranty/Guarantee Period',
    type: 'select',
    required: true,
    info: 'Seller\'s warranty against defects. Required by Consumer Protection Act for most goods.',
    options: [
      { value: 'no_warranty', label: 'As-Is (No Warranty)' },
      { value: '1_month', label: '1 Month' },
      { value: '3_months', label: '3 Months' },
      { value: '6_months', label: '6 Months' },
      { value: '1_year', label: '1 Year' },
      { value: 'custom', label: 'Custom Period' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019 Section 4.3', 'Indian Sales of Goods Act 1930']
  },
  inspectionWindow: {
    name: 'inspectionWindow',
    label: 'Inspection/Review Window (Hours)',
    type: 'select',
    required: true,
    info: 'Time given to buyer to inspect after delivery. Dispute must be raised within this window.',
    options: [
      { value: '24', label: '24 Hours' },
      { value: '48', label: '48 Hours' },
      { value: '72', label: '72 Hours' },
      { value: '7_days', label: '7 Days' }
    ],
    legalReferenceActs: ['Consumer Protection Act 2019 (Inspection Rights)']
  },
  buyerResponsibilities: {
    name: 'buyerResponsibilities',
    label: 'Buyer\'s Key Responsibilities',
    type: 'textarea',
    required: true,
    placeholder: 'e.g., Pay on time, collect in good condition, raise disputes on time, provide proper storage',
    info: 'Define what buyer must do. Breach of these can result in liability.',
    legalReferenceActs: ['Indian Contract Act 1872 (Consideration and Acceptance)']
  },
  sellerResponsibilities: {
    name: 'sellerResponsibilities',
    label: 'Seller\'s Key Responsibilities',
    type: 'textarea',
    required: true,
    placeholder: 'e.g., Deliver on time, deliver in promised condition, handle returns, provide support',
    info: 'Define what seller must do. Seller is liable for breach.',
    legalReferenceActs: ['Consumer Protection Act 2019 (Seller Liability)']
  },
  disputeResolutionMethod: {
    name: 'disputeResolutionMethod',
    label: 'Dispute Resolution Method',
    type: 'select',
    required: true,
    info: 'How disputes will be resolved. Mediation is recommended to avoid litigation costs.',
    options: [
      { value: 'mediation', label: 'Mediation (Bharose Platform)' },
      { value: 'arbitration', label: 'Arbitration' },
      { value: 'litigation', label: 'Court Litigation' }
    ],
    legalReferenceActs: ['Mediation Act 2023', 'Arbitration and Conciliation Act 1996']
  },
  jurisdiction: {
    name: 'jurisdiction',
    label: 'Jurisdiction (State)',
    type: 'select',
    required: true,
    info: 'Which state\'s laws govern this contract. Affects where disputes are filed.',
    options: [
      { value: 'karnataka', label: 'Karnataka' },
      { value: 'maharashtra', label: 'Maharashtra' },
      { value: 'delhi', label: 'Delhi' },
      { value: 'tamil_nadu', label: 'Tamil Nadu' },
      { value: 'telangana', label: 'Telangana' },
      { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
      { value: 'other', label: 'Other' }
    ],
    legalReferenceActs: ['Indian Contract Act 1872 (Jurisdiction)', 'CPC (Civil Procedure Code)']
  }
};

// ============================================================================
// ELECTRONICS (Goods)
// ============================================================================

export const ELECTRONICS_TEMPLATE: IndustryTemplate = {
  category: 'goods',
  industryType: 'electronics',
  description: 'Mobile phones, laptops, tablets, cameras, and other electronic devices',
  fields: [
    UNIVERSAL_FIELDS.itemDescription,
    {
      name: 'brand',
      label: 'Brand & Model',
      type: 'text',
      required: true,
      placeholder: 'e.g., iPhone 15 Pro Max, Dell XPS 13',
      info: 'Exact brand and model number. Critical for identifying defects and returns.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Product Identity)']
    },
    {
      name: 'serialNumber',
      label: 'Serial/IMEI Number',
      type: 'text',
      required: false,
      placeholder: 'Device IMEI or Serial Number (if available)',
      info: 'Used to verify device authenticity and check for reported stolen devices. Optional but recommended.',
      legalReferenceActs: ['Anti-Theft Device Tracking']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      info: 'Affects warranty and return eligibility. Must be accurately represented.',
      options: [
        { value: 'brand_new', label: 'Brand New (Factory Sealed)' },
        { value: 'new_unused', label: 'New (Unused, Opened Box)' },
        { value: 'refurbished', label: 'Refurbished' },
        { value: 'used_excellent', label: 'Used (Excellent Condition)' },
        { value: 'used_good', label: 'Used (Good Condition)' },
        { value: 'used_fair', label: 'Used (Fair Condition)' }
      ],
      legalReferenceActs: ['Consumer Protection Act 2019 (Misrepresentation)', 'Sale of Goods Act 1930']
    },
    {
      name: 'batteryHealth',
      label: 'Battery Health (if applicable)',
      type: 'text',
      required: false,
      placeholder: 'e.g., 95%, Good, Excellent',
      info: 'For phones/laptops - significant factor in device value. State clearly for used devices.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Full Disclosure)']
    },
    {
      name: 'functionalIssues',
      label: 'Any Known Issues/Defects',
      type: 'textarea',
      required: true,
      placeholder: 'List any issues. If none, write "None" or "Fully Functional"',
      info: 'Full disclosure prevents disputes. Must list all known defects. Concealment is fraud.',
      legalReferenceActs: ['Indian Contract Act 1872 (Fraud)', 'Consumer Protection Act 2019']
    },
    {
      name: 'accessories',
      label: 'Included Accessories',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Original charger, cable, earphones, box, manual. If used device, what\'s included.',
      info: 'List all items included in the package. Missing items are common dispute causes.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Complete Delivery)']
    },
    {
      name: 'warranty',
      label: 'Manufacturer/Seller Warranty Details',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., 1 year Apple warranty (international), No warranty for used device',
      info: 'Specify if warranty is available and its terms. Affects resale value.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Warranty Terms)']
    },
    UNIVERSAL_FIELDS.quantity,
    UNIVERSAL_FIELDS.totalPrice,
    UNIVERSAL_FIELDS.deliveryDate,
    UNIVERSAL_FIELDS.deliveryMode,
    UNIVERSAL_FIELDS.returnPolicy,
    UNIVERSAL_FIELDS.warrantyPeriod,
    UNIVERSAL_FIELDS.inspectionWindow,
    UNIVERSAL_FIELDS.buyerResponsibilities,
    UNIVERSAL_FIELDS.sellerResponsibilities,
    UNIVERSAL_FIELDS.disputeResolutionMethod,
    UNIVERSAL_FIELDS.jurisdiction
  ],
  mandatoryFieldsForContract: [
    'brand', 'condition', 'functionalIssues', 'accessories', 'totalPrice', 'deliveryDate', 'returnPolicy', 'warrantyPeriod'
  ],
  escrowReleaseConditions: [
    'Device delivered and received',
    'Buyer confirms device works and matches description',
    'Inspection window expires without dispute',
    'All defects disclosed match reality',
    'Serial number verified (if applicable)',
    'Buyer rates transaction'
  ],
  standardTerms: {
    returnWindow: '7 days',
    warrantyClauses: 'Manufacturer warranty valid as mentioned. Seller provides 30 days return window for defects.',
    liabilityLimit: '₹1,000 or 1% of transaction value (as per platform policy)',
    defectDefinition: 'Any malfunction preventing normal operation or cosmetic damage beyond normal wear'
  }
};

// ============================================================================
// FURNITURE (Goods)
// ============================================================================

export const FURNITURE_TEMPLATE: IndustryTemplate = {
  category: 'goods',
  industryType: 'furniture',
  description: 'Sofas, beds, tables, chairs, cabinets, and other furniture items',
  fields: [
    UNIVERSAL_FIELDS.itemDescription,
    {
      name: 'dimensions',
      label: 'Dimensions (L x W x H in inches or cm)',
      type: 'text',
      required: true,
      placeholder: 'e.g., 78" x 36" x 32" (Length x Width x Height)',
      info: 'Exact dimensions critical for placement and disputes. Measure carefully.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Specification)']
    },
    {
      name: 'materials',
      label: 'Materials Used',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Sheesham wood, cotton upholstery, metal legs, teak finish',
      info: 'Material composition affects price and quality perception. Be specific.',
      legalReferenceActs: ['Sale of Goods Act 1930 (Quality and Fitness)']
    },
    {
      name: 'condition',
      label: 'Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'brand_new', label: 'Brand New' },
        { value: 'unused_old_stock', label: 'Unused (Old Stock)' },
        { value: 'used_excellent', label: 'Used (Like New)' },
        { value: 'used_good', label: 'Used (Good)' },
        { value: 'used_fair', label: 'Used (Fair - Signs of Use)' }
      ],
      info: 'Heavily impacts price and return eligibility.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'damages',
      label: 'Any Damage/Wear/Stains',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Small scratch on left arm, slight stain on seat, missing one screw (provided)',
      info: 'Full disclosure essential. Buyers often claim undisclosed damage. List everything.',
      legalReferenceActs: ['Indian Contract Act 1872 (Full Disclosure)']
    },
    {
      name: 'assembly',
      label: 'Assembly Required',
      type: 'select',
      required: true,
      options: [
        { value: 'none', label: 'None - Ready to Use' },
        { value: 'minimal', label: 'Minimal (Legs/Hardware)' },
        { value: 'moderate', label: 'Moderate (½ day)' },
        { value: 'complex', label: 'Complex (Professional Needed)' }
      ],
      info: 'Affects buyer experience. Complex assembly disputes are common.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Clear Terms)']
    },
    {
      name: 'returnableCondition',
      label: 'Can be Returned If',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Unopened/unused, defective on arrival, does not match photos',
      info: 'Define return eligibility. Furniture returns are highly disputable.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Right of Return)']
    },
    UNIVERSAL_FIELDS.quantity,
    UNIVERSAL_FIELDS.totalPrice,
    UNIVERSAL_FIELDS.deliveryDate,
    {
      name: 'deliveryAndInstallation',
      label: 'Delivery & Installation',
      type: 'select',
      required: true,
      options: [
        { value: 'seller_delivers', label: 'Seller Delivers & Installs' },
        { value: 'seller_delivers_only', label: 'Seller Delivers Only' },
        { value: 'buyer_arranges', label: 'Buyer Arranges' },
        { value: 'third_party', label: 'Third-Party Courier' }
      ],
      info: 'Critical for furniture. Damage during delivery is common dispute cause.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Delivery Obligations)']
    },
    UNIVERSAL_FIELDS.returnPolicy,
    UNIVERSAL_FIELDS.warrantyPeriod,
    UNIVERSAL_FIELDS.inspectionWindow,
    UNIVERSAL_FIELDS.buyerResponsibilities,
    UNIVERSAL_FIELDS.sellerResponsibilities,
    UNIVERSAL_FIELDS.disputeResolutionMethod,
    UNIVERSAL_FIELDS.jurisdiction
  ],
  mandatoryFieldsForContract: [
    'dimensions', 'materials', 'condition', 'damages', 'assembly', 'totalPrice', 'deliveryDate', 'returnPolicy'
  ],
  escrowReleaseConditions: [
    'Furniture delivered safely',
    'Dimensions match specification',
    'Condition matches description',
    'All included items present',
    'No transport damage',
    'Inspection period expires without complaint'
  ],
  standardTerms: {
    deliveryDamage: 'Seller liable for damage during delivery. Photos required for claims.',
    assembly: 'Basic assembly included if mentioned. Professional assembly extra.',
    returnsPolicy: 'Unopened items returnable within window. Used furniture non-returnable unless defective.',
    inspectionPeriod: '48 hours to identify damage after delivery'
  }
};

// ============================================================================
// SOFTWARE DEVELOPMENT (Services)
// ============================================================================

export const SOFTWAREDEV_TEMPLATE: IndustryTemplate = {
  category: 'services',
  industryType: 'software_development',
  description: 'Custom software development, web apps, mobile apps, plugins, and technical solutions',
  fields: [
    UNIVERSAL_FIELDS.itemDescription,
    {
      name: 'projectScope',
      label: 'Project Scope & Deliverables',
      type: 'textarea',
      required: true,
      placeholder: 'Detailed list of what will be delivered. Be specific about features, pages, functions.',
      info: 'Scope creep is #1 source of disputes. Define EXACTLY what\'s included.',
      legalReferenceActs: ['Indian Contract Act 1872 (Clear Terms)', 'IT Act 2000']
    },
    {
      name: 'technologies',
      label: 'Technologies/Stack',
      type: 'text',
      required: true,
      placeholder: 'e.g., React, Node.js, MongoDB, AWS',
      info: 'Specific tech stack matters for maintenance and future changes.',
      legalReferenceActs: ['IT Act 2000 (Technical Specifications)']
    },
    {
      name: 'revisions',
      label: 'Number of Revision Rounds Included',
      type: 'number',
      required: true,
      placeholder: '2',
      info: 'How many times client can request changes. Each additional revision costs extra.',
      legalReferenceActs: ['Indian Contract Act 1872 (Scope Definition)']
    },
    {
      name: 'ipOwnership',
      label: 'Intellectual Property Ownership',
      type: 'select',
      required: true,
      options: [
        { value: 'client_full', label: 'Full Ownership to Client' },
        { value: 'developer_retained', label: 'Developer Retains (with Client License)' },
        { value: 'shared', label: 'Shared Ownership' }
      ],
      info: 'Critical for future use and resale rights. Can\'t be changed after delivery.',
      legalReferenceActs: ['Copyright Act 1957', 'IT Act 2000 (IP Rights)']
    },
    {
      name: 'sourceCodeDelivery',
      label: 'Source Code Delivery',
      type: 'select',
      required: true,
      options: [
        { value: 'yes_full', label: 'Yes - Full Source Code' },
        { value: 'yes_partial', label: 'Yes - Partial (with Restrictions)' },
        { value: 'no', label: 'No - Compiled/Binary Only' },
        { value: 'escrow', label: 'Source Code Escrow (3rd party holds)' }
      ],
      info: 'Whether client gets source code. Affects maintenance and future development.',
      legalReferenceActs: ['Software Escrow Regulations', 'Copyright Act 1957']
    },
    {
      name: 'supportPeriod',
      label: 'Post-Delivery Support Period (days)',
      type: 'select',
      required: true,
      options: [
        { value: '0', label: 'None' },
        { value: '30', label: '30 Days' },
        { value: '90', label: '90 Days' },
        { value: '180', label: '6 Months' },
        { value: '365', label: '1 Year' }
      ],
      info: 'Bug fixing and minor fixes provided free during this period.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'maintenanceTerms',
      label: 'Maintenance & Upgrade Terms',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Bug fixes free for 30 days, new features charged at ₹X per hour, server costs separate',
      info: 'Post-support costs and responsibilities. Prevents future disputes.',
      legalReferenceActs: ['IT Act 2000']
    },
    {
      name: 'timeline',
      label: 'Project Timeline & Milestones',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Design by Day 5, Dev by Day 15, Testing by Day 20, Delivery by Day 25',
      info: 'Key dates and checkpoints. Delays trigger penalties.',
      legalReferenceActs: ['Indian Contract Act 1872 (Timely Performance)']
    },
    UNIVERSAL_FIELDS.totalPrice,
    {
      name: 'paymentSchedule',
      label: 'Escrow Payment Release Schedule',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., 30% on design approval, 40% on development completion, 30% on final delivery',
      info: 'Escrow releases at milestones. Protects both buyer and seller.',
      legalReferenceActs: ['Bharose PE Escrow Policy']
    },
    UNIVERSAL_FIELDS.deliveryDate,
    UNIVERSAL_FIELDS.warrantyPeriod,
    {
      name: 'acceptanceCriteria',
      label: 'Acceptance Criteria/Testing',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., No critical bugs, all features work as per specification, performance < 2s load time',
      info: 'Defines what "complete" means. Essential for final payment approval.',
      legalReferenceActs: ['Indian Contract Act 1872']
    },
    UNIVERSAL_FIELDS.buyerResponsibilities,
    UNIVERSAL_FIELDS.sellerResponsibilities,
    UNIVERSAL_FIELDS.disputeResolutionMethod,
    UNIVERSAL_FIELDS.jurisdiction
  ],
  mandatoryFieldsForContract: [
    'projectScope', 'technologies', 'revisions', 'ipOwnership', 'timeline', 'totalPrice', 'paymentSchedule', 'acceptanceCriteria'
  ],
  escrowReleaseConditions: [
    'Milestone deliverables completed',
    'Code reviewed and tested',
    'Acceptance criteria met',
    'All revisions incorporated',
    'Support period started',
    'Buyer confirms satisfaction'
  ],
  standardTerms: {
    scopeChangeProcess: 'Scope changes require written amendment and may delay timeline.',
    delayPenalty: '2% of milestone amount per week delay',
    IPProtection: 'Client indemnifies developer from IP infringement claims',
    SLA: 'Critical bugs fixed within 24 hours, major bugs within 48 hours'
  }
};

// ============================================================================
// HOME REPAIR SERVICES
// ============================================================================

export const HOMEREPAIR_TEMPLATE: IndustryTemplate = {
  category: 'services',
  industryType: 'home_repair',
  description: 'Plumbing, electrical, carpentry, painting, AC repair, and other home maintenance services',
  fields: [
    UNIVERSAL_FIELDS.itemDescription,
    {
      name: 'workScope',
      label: 'Exact Work Scope & Materials',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Replace 10 ceramic tiles (2x2), apply waterproofing, grout, polish. Material cost included.',
      info: 'Define exactly what work will be done and what materials are included.',
      legalReferenceActs: ['Indian Contract Act 1872 (Services)']
    },
    {
      name: 'materialsIncluded',
      label: 'What\'s Included / What\'s Extra',
      type: 'textarea',
      required: true,
      placeholder: 'Included: Labor + basic materials. Extra: Premium paint (₹50/L more), import tiles (₹200 more)',
      info: 'Prevents disputes over material costs. Itemize everything.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'workDuration',
      label: 'Expected Work Duration',
      type: 'select',
      required: true,
      options: [
        { value: 'half_day', label: 'Half Day (2-4 hours)' },
        { value: 'full_day', label: 'Full Day (6-8 hours)' },
        { value: 'multiple_days', label: 'Multiple Days' },
        { value: 'custom', label: 'Custom Duration' }
      ],
      info: 'Helps buyer plan. If exceeds, discuss before extending.',
      legalReferenceActs: ['Indian Contract Act 1872']
    },
    {
      name: 'warranty',
      label: 'Warranty on Work',
      type: 'select',
      required: true,
      options: [
        { value: '7_days', label: '7 Days' },
        { value: '30_days', label: '30 Days' },
        { value: '90_days', label: '90 Days' },
        { value: '6_months', label: '6 Months' },
        { value: 'no_warranty', label: 'No Warranty' }
      ],
      info: 'Period when contractor will fix issues free of cost.',
      legalReferenceActs: ['Consumer Protection Act 2019 (Service Warranty)']
    },
    {
      name: 'qualifications',
      label: 'Contractor Qualifications/License',
      type: 'textarea',
      required: false,
      placeholder: 'e.g., Electrician License #12345, 15 years experience, NASSCOM certified',
      info: 'Helps verify credibility. Important for technical work.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    {
      name: 'beforeAfterPhotos',
      label: 'Before/After Photo Documentation Required',
      type: 'select',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - Both Required' },
        { value: 'after_only', label: 'After Only' },
        { value: 'no', label: 'Not Required' }
      ],
      info: 'Photos prove work quality. Highly recommended for disputes.',
      legalReferenceActs: ['Evidence Collection Requirements']
    },
    {
      name: 'visitDate',
      label: 'Service Date',
      type: 'date',
      required: true,
      info: 'When contractor will visit and complete work.',
      legalReferenceActs: ['Indian Contract Act 1872']
    },
    {
      name: 'location',
      label: 'Work Location (Address)',
      type: 'textarea',
      required: true,
      placeholder: 'Full address where work will be done',
      info: 'Contractor needs exact location for planning and travel.',
      legalReferenceActs: ['Consumer Protection Act 2019']
    },
    UNIVERSAL_FIELDS.totalPrice,
    {
      name: 'paymentTerms',
      label: 'Payment Terms (Escrow Release)',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., 50% before work starts, 50% after completion and acceptance',
      info: 'When payment is released from escrow. Protects both parties.',
      legalReferenceActs: ['Bharose PE Escrow Policy']
    },
    UNIVERSAL_FIELDS.inspectionWindow,
    {
      name: 'cancellationTerms',
      label: 'Cancellation Policy',
      type: 'textarea',
      required: true,
      placeholder: 'e.g., Free cancellation up to 24 hours. After that, ₹500 cancellation fee.',
      info: 'What happens if either party cancels.',
      legalReferenceActs: ['Indian Contract Act 1872 (Termination)']
    },
    UNIVERSAL_FIELDS.buyerResponsibilities,
    UNIVERSAL_FIELDS.sellerResponsibilities,
    UNIVERSAL_FIELDS.disputeResolutionMethod,
    UNIVERSAL_FIELDS.jurisdiction
  ],
  mandatoryFieldsForContract: [
    'workScope', 'materialsIncluded', 'warranty', 'visitDate', 'location', 'totalPrice', 'paymentTerms'
  ],
  escrowReleaseConditions: [
    'Work completed as per scope',
    'Before/after photos acceptable',
    'Buyer inspects and approves',
    'Inspection window expires',
    'No defects reported during warranty period (or resolved)'
  ],
  standardTerms: {
    scopeChanges: 'Additional work charged at ₹X per hour or per piece',
    damages: 'Contractor liable for any property damage during work',
    materials: 'Contractor liable for quality of materials used',
    noShow: 'Cancellation fee applies if contractor doesn\'t show up'
  }
};

// ============================================================================
// EXPORT ALL TEMPLATES
// ============================================================================

export const INDUSTRY_TEMPLATES: Record<string, IndustryTemplate> = {
  electronics: ELECTRONICS_TEMPLATE,
  furniture: FURNITURE_TEMPLATE,
  software_development: SOFTWAREDEV_TEMPLATE,
  home_repair: HOMEREPAIR_TEMPLATE
};

export const INDUSTRY_CATEGORIES = {
  goods: ['electronics', 'furniture', 'clothing', 'vehicles', 'appliances'],
  services: ['software_development', 'home_repair', 'design', 'photography', 'events', 'cleaning', 'tutoring']
};

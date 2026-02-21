/**
 * Annexure L — Art & Handmade Items
 * Exact specifications as provided
 */

export const ANNEXURE_L_ART_HANDMADE = {
  id: 'art_handmade',
  annexure_code: 'L',
  title: 'Art & Handmade Items',
  description: 'Paintings, Drawings, Prints, Sculptures, Handmade Crafts, Custom Artwork',
  
  scope: [
    'Original paintings',
    'Prints (digital, lithographic, giclée)',
    'Sketches, drawings',
    'Handmade crafts',
    'Resin art',
    'Clay/ceramic items',
    'Sculptures',
    'Textile art',
    'Crochet/knitting handmade products',
    'Customized portrait orders',
    'Calligraphy art',
    'Pottery'
  ],

  commonDisputes: [
    'Size mismatch',
    'Color mismatch',
    'Not same as picture',
    'Custom orders: buyer dissatisfaction',
    'Artist originality disputes',
    'Damaged delivery',
    'Missing certificate of authenticity'
  ],

  inspectionWindowHours: 6,

  // SECTION 1 — Basic Info
  section1_basicInfo: {
    itemTitle: {
      label: 'Item Title',
      type: 'text',
      required: true,
      fieldName: 'itemTitle',
      fetchFrom: 'USER_INPUT'
    },
    category: {
      label: 'Category',
      type: 'select',
      required: true,
      fieldName: 'category',
      fetchFrom: 'USER_INPUT',
      options: [
        'Painting',
        'Sculpture',
        'Craft',
        'Print',
        'Custom Artwork'
      ]
    }
  },

  // SECTION 2 — Artwork Details
  section2_artworkDetails: {
    artworkType: {
      label: 'Artwork Type',
      type: 'select',
      required: true,
      fieldName: 'artworkType',
      fetchFrom: 'USER_INPUT',
      options: [
        'Original',
        'Print',
        'Handmade',
        'Custom',
        'Resin',
        'Clay'
      ]
    },
    medium: {
      label: 'Medium',
      type: 'select',
      required: true,
      fieldName: 'medium',
      fetchFrom: 'USER_INPUT',
      options: [
        'Oil',
        'Acrylic',
        'Watercolor',
        'Gouache',
        'Mixed media',
        'Charcoal/Pencil',
        'Digital print',
        'Resin',
        'Clay/Ceramic',
        'Wood',
        'Metal'
      ]
    },
    surface: {
      label: 'Surface',
      type: 'select',
      required: true,
      fieldName: 'surface',
      fetchFrom: 'USER_INPUT',
      options: [
        'Canvas',
        'Canvas board',
        'Handmade paper',
        'Cartridge paper',
        'MDF',
        'Woodboard',
        'Clay base',
        'Resin base'
      ]
    }
  },

  // SECTION 3 — Dimensions (Mandatory)
  section3_dimensions: {
    heightCm: {
      label: 'Height (cm)',
      type: 'number',
      required: true,
      fieldName: 'heightCm',
      fetchFrom: 'USER_INPUT',
      placeholder: 'Enter height in centimeters'
    },
    widthCm: {
      label: 'Width (cm)',
      type: 'number',
      required: true,
      fieldName: 'widthCm',
      fetchFrom: 'USER_INPUT',
      placeholder: 'Enter width in centimeters'
    },
    depthCm: {
      label: 'Depth (cm) - For sculptures only',
      type: 'number',
      required: false,
      fieldName: 'depthCm',
      fetchFrom: 'USER_INPUT',
      placeholder: 'Enter depth in centimeters (if applicable)'
    },
    measurementPhoto: {
      label: 'Upload Measurement Photo (Mandatory)',
      type: 'file',
      required: true,
      fieldName: 'measurementPhoto',
      fetchFrom: 'USER_INPUT',
      fileType: 'image',
      note: 'Tape/scale MUST be visible in photo'
    }
  },

  // SECTION 4 — Condition & Defects
  section4_conditionDefects: {
    condition: {
      label: 'Condition',
      type: 'select',
      required: true,
      fieldName: 'condition',
      fetchFrom: 'USER_INPUT',
      options: [
        'New',
        'Like New',
        'Used',
        'Displayed',
        'Minor defects'
      ]
    },
    defectsDeclaration: {
      type: 'group',
      fieldName: 'defectsDeclaration',
      fetchFrom: 'USER_INPUT',
      items: [
        {
          label: 'Scratches',
          type: 'checkbox',
          fieldName: 'scratches'
        },
        {
          label: 'Cracks',
          type: 'checkbox',
          fieldName: 'cracks'
        },
        {
          label: 'Dents',
          type: 'checkbox',
          fieldName: 'dents'
        },
        {
          label: 'Frame damage',
          type: 'checkbox',
          fieldName: 'frameDamage'
        },
        {
          label: 'Resin bubbles',
          type: 'checkbox',
          fieldName: 'resinBubbles'
        },
        {
          label: 'Uneven gloss',
          type: 'checkbox',
          fieldName: 'unevenGloss'
        }
      ]
    },
    defectPhotos: {
      label: 'Upload Defect Photos',
      type: 'file',
      required: false,
      fieldName: 'defectPhotos',
      fetchFrom: 'USER_INPUT',
      fileType: 'image',
      note: 'Close-ups of any defects declared'
    }
  },

  // SECTION 5 — Certificate of Authenticity
  section5_coa: {
    coaProvided: {
      label: 'Certificate of Authenticity (COA) Provided?',
      type: 'select',
      required: true,
      fieldName: 'coaProvided',
      fetchFrom: 'USER_INPUT',
      options: ['Yes', 'No']
    },
    coaDocument: {
      label: 'Upload COA (if provided)',
      type: 'file',
      required: false,
      fieldName: 'coaDocument',
      fetchFrom: 'USER_INPUT',
      fileType: 'image',
      conditionalOn: 'coaProvided',
      conditionalValue: 'Yes'
    }
  },

  // SECTION 6 — Mandatory Seller Evidence
  section6_mandatoryEvidence: {
    frontViewPhoto: {
      label: 'Front View Photo',
      type: 'file',
      required: true,
      fieldName: 'frontViewPhoto',
      fetchFrom: 'USER_INPUT',
      fileType: 'image'
    },
    backViewPhoto: {
      label: 'Back View Photo',
      type: 'file',
      required: true,
      fieldName: 'backViewPhoto',
      fetchFrom: 'USER_INPUT',
      fileType: 'image'
    },
    textureCloseup: {
      label: 'Texture Close-up Photo',
      type: 'file',
      required: true,
      fieldName: 'textureCloseup',
      fetchFrom: 'USER_INPUT',
      fileType: 'image'
    },
    frameEdgeCondition: {
      label: 'Frame/Edge Condition Photo',
      type: 'file',
      required: true,
      fieldName: 'frameEdgeCondition',
      fetchFrom: 'USER_INPUT',
      fileType: 'image'
    },
    packagingPhotos: {
      label: 'Packaging Photos',
      type: 'file',
      required: true,
      fieldName: 'packagingPhotos',
      fetchFrom: 'USER_INPUT',
      fileType: 'image',
      note: 'Before dispatch: bubble wrap, corners protection, outer box'
    },
    artistSignature: {
      label: 'Artist Signature Photo',
      type: 'file',
      required: false,
      fieldName: 'artistSignature',
      fetchFrom: 'USER_INPUT',
      fileType: 'image'
    }
  },

  // SECTION 7 — Buyer Requirements
  section7_buyerRequirements: {
    unboxingVideo: {
      label: 'Unboxing Video',
      type: 'file',
      required: true,
      fieldName: 'unboxingVideo',
      fetchFrom: 'USER_INPUT',
      fileType: 'video',
      note: 'Continuous recording showing package opening, artwork, corners, texture, measurement'
    },
    measurementCheck: {
      label: 'Measurement Check Confirmation',
      type: 'checkbox',
      required: true,
      fieldName: 'measurementCheck',
      fetchFrom: 'USER_INPUT',
      note: 'Buyer confirms measurements match seller description'
    }
  },

  // SECTION 8 — Price & Escrow
  section8_priceEscrow: {
    price: {
      label: 'Price',
      type: 'number',
      required: true,
      fieldName: 'price',
      fetchFrom: 'USER_INPUT',
      prefix: '₹',
      note: '(Auto-calc fee 1% + escrow amount)'
    }
  },

  // ============================================================================
  // AUTO-FETCHED FIELDS (System generates automatically from Master Agreement)
  // ============================================================================
  autoFetchedFields: {
    transactionId: {
      label: 'Transaction ID',
      fieldName: 'transactionId',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system',
      note: 'Generated by platform'
    },
    contractGeneratedAt: {
      label: 'Contract Generated At',
      fieldName: 'contractGeneratedAt',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system',
      note: 'Auto-timestamp'
    },
    sellerKycStatus: {
      label: 'Seller KYC Status',
      fieldName: 'sellerKycStatus',
      fetchFrom: 'AUTO-FETCHED',
      source: 'user_profile_db',
      note: 'From seller profile verification'
    },
    buyerKycStatus: {
      label: 'Buyer KYC Status',
      fieldName: 'buyerKycStatus',
      fetchFrom: 'AUTO-FETCHED',
      source: 'user_profile_db',
      note: 'From buyer profile verification'
    },
    escrowPaymentReference: {
      label: 'Escrow Payment Reference',
      fieldName: 'escrowPaymentReference',
      fetchFrom: 'AUTO-FETCHED',
      source: 'payment_gateway',
      note: 'From payment processor'
    },
    paymentUtr: {
      label: 'Payment UTR',
      fieldName: 'paymentUtr',
      fetchFrom: 'AUTO-FETCHED',
      source: 'payment_gateway',
      note: 'Unique transaction reference'
    },
    platformFee: {
      label: 'Platform Fee (1%)',
      fieldName: 'platformFee',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system_calculation',
      note: 'Auto-calculated as 1% of price'
    },
    escrowAmount: {
      label: 'Escrow Amount',
      fieldName: 'escrowAmount',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system_calculation',
      note: 'Price - Platform Fee'
    },
    acceptanceIpAddress: {
      label: 'Acceptance IP Address',
      fieldName: 'acceptanceIpAddress',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system',
      note: 'Recorded at contract acceptance'
    },
    deviceMetadata: {
      label: 'Device Metadata',
      fieldName: 'deviceMetadata',
      fetchFrom: 'AUTO-FETCHED',
      source: 'system',
      note: 'Browser, OS, device info'
    }
  },

  // ============================================================================
  // PLATFORM-DEFAULT FIELDS (Non-editable legal clauses from Master Agreement)
  // ============================================================================
  platformDefaultFields: {
    inspectionWindow: {
      label: 'Inspection Window',
      value: '6 hours',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'annexure_L',
      note: 'Non-editable, fixed for Art & Handmade'
    },
    escrowRulesAndConditions: {
      label: 'Escrow Rules & Release Conditions',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_G',
      note: 'Part G of Master Agreement'
    },
    disputeResolutionProcess: {
      label: 'Dispute Resolution Process (4-Step)',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_J',
      note: 'AI Triage → Human Review → Mediation → Arbitration'
    },
    evidenceRequirements: {
      label: 'Evidence Requirements & Hierarchy',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_I',
      note: 'Photo specs, video specs, document formats'
    },
    liabilityCap: {
      label: 'Liability Cap',
      value: '₹1,000 or 1% of transaction value (whichever greater)',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_N',
      note: 'Non-editable, applies to all transactions'
    },
    mandatoryMediation: {
      label: 'Mandatory Mediation',
      value: 'Yes (before arbitration)',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_J',
      note: 'Per Mediation Act 2023'
    },
    dpdpConsent: {
      label: 'DPDP Consent & Data Retention',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_M',
      note: 'Data retained 7 years minimum'
    },
    fraudIndicators: {
      label: 'Fraud Indicators Monitored',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_fraud',
      note: 'Platform AI monitors for artist originality disputes, COA missing, size mismatch, etc.'
    },
    validDisputes: {
      label: 'Valid Dispute Types for Art & Handmade',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_5',
      value: [
        'Wrong size',
        'Damaged artwork (undisclosed)',
        'Color drastically different',
        'Wrong item delivered',
        'Sculpture cracked/broken',
        'COA missing (if promised)',
        'Custom order not matching'
      ]
    },
    invalidDisputes: {
      label: 'Invalid Dispute Types for Art & Handmade',
      fetchFrom: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_6',
      value: [
        'Color difference due to screen/lighting',
        'Subjective dissatisfaction',
        'Texture variation',
        'Buyer changed mind',
        'Custom order buyer regret',
        'Minor imperfections visible in seller photos',
        'Handmade slight asymmetry'
      ]
    }
  },

  // VALID DISPUTES
  validDisputes: [
    {
      type: 'Wrong size',
      condition: 'Not matching seller description',
      proof: 'Before (Seller) vs. After (Buyer) photos with measurement'
    },
    {
      type: 'Damaged artwork (undisclosed)',
      condition: 'Scratches, dents, tears, broken frame',
      proof: 'Unboxing video showing damage, close-up photos'
    },
    {
      type: 'Color drastically different',
      condition: 'Not minor lighting variation — actual color mismatch',
      proof: 'Unboxing video, seller pre-dispatch photos comparison'
    },
    {
      type: 'Wrong item delivered',
      condition: 'Different artwork received',
      proof: 'Unboxing video showing different item'
    },
    {
      type: 'Sculpture cracked/broken',
      condition: 'If packaging was proper',
      proof: 'Unboxing video, close-up of crack, packaging photos'
    },
    {
      type: 'COA missing',
      condition: 'If promised by seller',
      proof: 'Seller evidence vs. Buyer unboxing showing no COA'
    },
    {
      type: 'Custom order not matching',
      condition: 'Clear difference from seller sample/preview',
      proof: 'Unboxing video vs. seller preview/sample'
    }
  ],

  // INVALID DISPUTES
  invalidDisputes: [
    'Color difference due to screen/lighting',
    'Subjective dissatisfaction (does not look good)',
    'Texture variation',
    'Buyer changed mind',
    'Custom order buyer regret',
    'Minor imperfections visible in seller photos',
    'Handmade slight asymmetry (normal for crafts)'
  ],

  // ESCROW RELEASE CONDITIONS
  escrowReleaseConditions: [
    {
      condition: 'Buyer misses inspection deadline (6 hours)',
      releaseTo: 'SELLER'
    },
    {
      condition: 'Buyer complains subjectively (not valid dispute)',
      releaseTo: 'SELLER'
    },
    {
      condition: 'Minor imperfections already disclosed in seller photos',
      releaseTo: 'SELLER'
    },
    {
      condition: 'Custom order delivered as described',
      releaseTo: 'SELLER'
    },
    {
      condition: 'Buyer provides no unboxing video',
      releaseTo: 'SELLER'
    },
    {
      condition: 'Wrong item delivered',
      releaseTo: 'BUYER'
    },
    {
      condition: 'Size mismatch with proof',
      releaseTo: 'BUYER'
    },
    {
      condition: 'Undisclosed damage in unboxing video',
      releaseTo: 'BUYER'
    },
    {
      condition: 'COA missing (if promised)',
      releaseTo: 'BUYER'
    },
    {
      condition: 'Sculpture cracked during transit (proper packaging from seller)',
      releaseTo: 'BUYER'
    }
  ],

  // CUSTOM ARTWORK SPECIAL RULES
  customArtworkRules: {
    mandatoryFromSeller: [
      'Sketch/preview',
      'Color draft',
      'Final video',
      'Packaging video'
    ],
    buyerCannotRefundFor: [
      'Personal taste',
      'Not matching subjective expectation'
    ],
    buyerCanRefundFor: [
      'Wrong likeness',
      'Wrong size',
      'Wrong theme',
      'Poor-quality delivery damage'
    ]
  },

  // LEGAL CONSEQUENCES
  legalConsequences: {
    ifSellerMisrepresentsOriginality: [
      'Full refund',
      'Blacklist',
      'Artist copyright claims possible',
      'FIR under IPC 420 & IT Act 66D',
      'Consumer Protection Act penalties'
    ]
  }
};

export default ANNEXURE_L_ART_HANDMADE;

/**
 * ANNEXURE L — DATA SOURCE MAPPING & UI/UX TEMPLATE
 * 
 * This file defines exactly where each field comes from and how to populate the contract
 */

export const ANNEXURE_L_DATA_FLOW = {
  industry: 'art_handmade',
  annexure_code: 'L',
  inspectionWindowHours: 6,

  // ============================================================================
  // FORM SECTIONS (What user fills)
  // ============================================================================
  formSections: [
    {
      sectionId: 'section1_basicInfo',
      sectionTitle: 'Basic Information',
      description: 'Item title and category',
      fields: [
        {
          fieldName: 'itemTitle',
          label: 'Item Title',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Abstract Oil Painting - Sunset Dreams"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{product_title}}'
        },
        {
          fieldName: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          options: ['Painting', 'Sculpture', 'Craft', 'Print', 'Custom Artwork'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{artwork_category}}'
        }
      ]
    },
    {
      sectionId: 'section2_artworkDetails',
      sectionTitle: 'Artwork Details',
      description: 'Type, medium, and surface material',
      fields: [
        {
          fieldName: 'artworkType',
          label: 'Artwork Type',
          type: 'select',
          required: true,
          options: ['Original', 'Print', 'Handmade', 'Custom', 'Resin', 'Clay'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{artwork_type}}'
        },
        {
          fieldName: 'medium',
          label: 'Medium',
          type: 'select',
          required: true,
          options: ['Oil', 'Acrylic', 'Watercolor', 'Gouache', 'Mixed media', 'Charcoal/Pencil', 'Digital print', 'Resin', 'Clay/Ceramic', 'Wood', 'Metal'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{medium}}'
        },
        {
          fieldName: 'surface',
          label: 'Surface',
          type: 'select',
          required: true,
          options: ['Canvas', 'Canvas board', 'Handmade paper', 'Cartridge paper', 'MDF', 'Woodboard', 'Clay base', 'Resin base'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{surface}}'
        }
      ]
    },
    {
      sectionId: 'section3_dimensions',
      sectionTitle: 'Dimensions (Critical)',
      description: 'Height, Width, Depth with measurement photo',
      fields: [
        {
          fieldName: 'heightCm',
          label: 'Height (cm)',
          type: 'number',
          required: true,
          placeholder: '30',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{height_cm}}'
        },
        {
          fieldName: 'widthCm',
          label: 'Width (cm)',
          type: 'number',
          required: true,
          placeholder: '40',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{width_cm}}'
        },
        {
          fieldName: 'depthCm',
          label: 'Depth (cm) - Sculptures only',
          type: 'number',
          required: false,
          placeholder: '15',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{depth_cm}}'
        },
        {
          fieldName: 'measurementPhoto',
          label: 'Upload Measurement Photo with Scale/Tape',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Scale/tape must be visible. This is MANDATORY for dispute prevention.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{measurement_photo_hash}}'
        }
      ]
    },
    {
      sectionId: 'section4_condition',
      sectionTitle: 'Condition & Defects Declaration',
      description: 'Full transparency about any damage or wear',
      fields: [
        {
          fieldName: 'condition',
          label: 'Condition',
          type: 'select',
          required: true,
          options: ['New', 'Like New', 'Used', 'Displayed', 'Minor defects'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{condition}}'
        },
        {
          fieldName: 'scratches',
          label: 'Has Scratches?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_scratches}}'
        },
        {
          fieldName: 'cracks',
          label: 'Has Cracks?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_cracks}}'
        },
        {
          fieldName: 'dents',
          label: 'Has Dents?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_dents}}'
        },
        {
          fieldName: 'frameDamage',
          label: 'Frame Damaged?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_frame_damage}}'
        },
        {
          fieldName: 'resinBubbles',
          label: 'Resin Bubbles?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_resin_bubbles}}'
        },
        {
          fieldName: 'unevenGloss',
          label: 'Uneven Gloss?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_uneven_gloss}}'
        },
        {
          fieldName: 'defectPhotos',
          label: 'Upload Photos of Any Defects',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Close-up photos of scratches, cracks, or damage',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{defect_photos_hash}}'
        }
      ]
    },
    {
      sectionId: 'section5_coa',
      sectionTitle: 'Certificate of Authenticity',
      description: 'If artwork includes a COA',
      fields: [
        {
          fieldName: 'coaProvided',
          label: 'Certificate of Authenticity (COA) Provided?',
          type: 'select',
          required: true,
          options: ['Yes', 'No'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{coa_provided}}'
        },
        {
          fieldName: 'coaDocument',
          label: 'Upload COA',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 If COA provided, upload clear photo',
          conditionalOn: 'coaProvided',
          conditionalValue: 'Yes',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{coa_document_hash}}'
        }
      ]
    },
    {
      sectionId: 'section6_evidence',
      sectionTitle: 'Mandatory Seller Evidence',
      description: 'Required photos and videos before dispatch',
      fields: [
        {
          fieldName: 'frontViewPhoto',
          label: 'Front View Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Clear front view of artwork',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{front_view_photo_hash}}'
        },
        {
          fieldName: 'backViewPhoto',
          label: 'Back View Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Back side, showing backing, frame, etc.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{back_view_photo_hash}}'
        },
        {
          fieldName: 'textureCloseup',
          label: 'Texture Close-up Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Close-up showing texture details',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{texture_closeup_hash}}'
        },
        {
          fieldName: 'frameEdgeCondition',
          label: 'Frame/Edge Condition Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show frame condition and edges',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{frame_edge_condition_hash}}'
        },
        {
          fieldName: 'packagingPhotos',
          label: 'Packaging Photos',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Bubble wrap, corners, outer box before dispatch',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{packaging_photos_hash}}'
        },
        {
          fieldName: 'artistSignature',
          label: 'Artist Signature Photo',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Close-up of artist signature (if applicable)',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{artist_signature_hash}}'
        }
      ]
    },
    {
      sectionId: 'section7_buyer',
      sectionTitle: 'Buyer Inspection Requirements',
      description: 'What buyer must provide after delivery',
      fields: [
        {
          fieldName: 'unboxingVideo',
          label: 'Unboxing Video',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Continuous (no cuts) showing package opening, artwork, corners, texture, measurement. Duration: 5+ minutes',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{unboxing_video_hash}}'
        },
        {
          fieldName: 'measurementCheck',
          label: 'I confirm measurements match seller description',
          type: 'checkbox',
          required: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{buyer_measurement_check}}'
        }
      ]
    },
    {
      sectionId: 'section8_price',
      sectionTitle: 'Price & Escrow',
      description: 'Transaction amount',
      fields: [
        {
          fieldName: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          prefix: '₹',
          placeholder: '5000',
          note: 'Platform Fee (1%) will be auto-calculated. Remaining goes to escrow.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{price}}'
        }
      ]
    }
  ],

  // ============================================================================
  // AUTO-FETCHED FIELDS (System automatically populates)
  // ============================================================================
  autoFetchedFields: [
    {
      fieldName: 'transactionId',
      label: 'Transaction ID',
      dataSource: 'AUTO-FETCHED',
      source: 'system_generation',
      example: 'TXN-2025-001234567',
      contractPlaceholder: '{{transaction_id}}'
    },
    {
      fieldName: 'contractGeneratedAt',
      label: 'Contract Generated At',
      dataSource: 'AUTO-FETCHED',
      source: 'system_timestamp',
      example: '2025-11-26T14:30:00Z',
      contractPlaceholder: '{{contract_generated_at}}'
    },
    {
      fieldName: 'sellerName',
      label: 'Seller Name',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      note: 'From authenticated user profile',
      contractPlaceholder: '{{seller_name}}'
    },
    {
      fieldName: 'sellerEmail',
      label: 'Seller Email',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{seller_email}}'
    },
    {
      fieldName: 'sellerPhone',
      label: 'Seller Phone',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{seller_phone}}'
    },
    {
      fieldName: 'sellerAddress',
      label: 'Seller Address',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{seller_address}}'
    },
    {
      fieldName: 'sellerKycStatus',
      label: 'Seller KYC Status',
      dataSource: 'AUTO-FETCHED',
      source: 'kyc_verification_db',
      example: '✓ Verified',
      contractPlaceholder: '{{seller_kyc_status}}'
    },
    {
      fieldName: 'buyerName',
      label: 'Buyer Name',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{buyer_name}}'
    },
    {
      fieldName: 'buyerEmail',
      label: 'Buyer Email',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{buyer_email}}'
    },
    {
      fieldName: 'buyerPhone',
      label: 'Buyer Phone',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{buyer_phone}}'
    },
    {
      fieldName: 'buyerAddress',
      label: 'Buyer Address',
      dataSource: 'AUTO-FETCHED',
      source: 'user_profile_db',
      contractPlaceholder: '{{buyer_address}}'
    },
    {
      fieldName: 'buyerKycStatus',
      label: 'Buyer KYC Status',
      dataSource: 'AUTO-FETCHED',
      source: 'kyc_verification_db',
      example: '✓ Verified',
      contractPlaceholder: '{{buyer_kyc_status}}'
    },
    {
      fieldName: 'platformFee',
      label: 'Platform Fee (1%)',
      dataSource: 'AUTO-FETCHED',
      source: 'system_calculation',
      formula: 'price * 0.01',
      example: 'If price = ₹5000, fee = ₹50',
      contractPlaceholder: '{{platform_fee}}'
    },
    {
      fieldName: 'escrowAmount',
      label: 'Escrow Amount',
      dataSource: 'AUTO-FETCHED',
      source: 'system_calculation',
      formula: 'price - platform_fee',
      example: 'If price = ₹5000, escrow = ₹4950',
      contractPlaceholder: '{{escrow_amount}}'
    },
    {
      fieldName: 'escrowPaymentReference',
      label: 'Escrow Payment Reference',
      dataSource: 'AUTO-FETCHED',
      source: 'payment_gateway_api',
      example: 'PAY-9876543210',
      contractPlaceholder: '{{escrow_payment_reference}}'
    },
    {
      fieldName: 'paymentUtr',
      label: 'Payment UTR',
      dataSource: 'AUTO-FETCHED',
      source: 'payment_gateway_api',
      example: 'UTR202511261430123',
      contractPlaceholder: '{{payment_utr}}'
    },
    {
      fieldName: 'acceptanceIpAddress',
      label: 'IP Address at Acceptance',
      dataSource: 'AUTO-FETCHED',
      source: 'system_client_info',
      example: '192.168.1.1',
      contractPlaceholder: '{{acceptance_ip_address}}'
    },
    {
      fieldName: 'deviceMetadata',
      label: 'Device Metadata',
      dataSource: 'AUTO-FETCHED',
      source: 'system_client_info',
      example: 'Chrome 120.0 on Windows 10',
      contractPlaceholder: '{{device_metadata}}'
    }
  ],

  // ============================================================================
  // PLATFORM-DEFAULT FIELDS (Non-editable, from Master Agreement + Annexure L)
  // ============================================================================
  platformDefaultFields: [
    {
      fieldName: 'inspectionWindow',
      label: 'Inspection Window',
      value: '6 hours',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_3',
      description: 'Buyer has 6 hours from delivery to inspect and raise disputes',
      contractSection: 'PART H — DELIVERY & INSPECTION PROTOCOL'
    },
    {
      fieldName: 'escrowRules',
      label: 'Escrow Release Conditions',
      value: 'See Annexure L Section 7',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_G + annexure_L_section_7',
      conditions: [
        'Buyer misses inspection deadline → Release to SELLER',
        'Buyer complains subjectively (invalid) → Release to SELLER',
        'Custom order delivered as described → Release to SELLER',
        'Wrong item delivered → Release to BUYER',
        'Size mismatch proven → Release to BUYER',
        'Undisclosed damage → Release to BUYER',
        'COA missing (if promised) → Release to BUYER'
      ]
    },
    {
      fieldName: 'validDisputes',
      label: 'Valid Dispute Types',
      value: '7 types (Art & Handmade specific)',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_5',
      types: [
        'Wrong size (not matching description)',
        'Damaged artwork (undisclosed)',
        'Color drastically different',
        'Wrong item delivered',
        'Sculpture cracked/broken',
        'COA missing (if promised)',
        'Custom order not matching agreed design'
      ]
    },
    {
      fieldName: 'invalidDisputes',
      label: 'Invalid Dispute Types',
      value: '7 types (Art & Handmade specific)',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_L_section_6',
      types: [
        'Color difference due to screen/lighting',
        'Subjective dissatisfaction',
        'Texture variation',
        'Buyer changed mind',
        'Custom order buyer regret',
        'Minor imperfections visible in seller photos',
        'Handmade slight asymmetry (normal)'
      ]
    },
    {
      fieldName: 'disputeResolution',
      label: 'Dispute Resolution Process',
      value: '4-Step: AI Triage → Human Review → Mediation → Arbitration',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_J',
      steps: [
        'AI Triage (0-2 hours): Analyze evidence',
        'Human Review (24-72 hours): Panel decision',
        'Mediation (Mediation Act 2023): Optional negotiation',
        'Arbitration/Courts: Final resolution'
      ]
    },
    {
      fieldName: 'evidenceRequirements',
      label: 'Evidence Requirements',
      value: 'Photos, videos, documents per Master Agreement Part I',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_I',
      requirements: {
        photos: 'Min 2MP, EXIF timestamp preserved, 3+ angles',
        videos: 'Continuous (no cuts), min 720p, max 2GB, timestamp visible',
        documents: 'PDF only, official letterhead'
      }
    },
    {
      fieldName: 'liabilityCap',
      label: 'Platform Liability Cap',
      value: 'Lesser of: Escrow Amount OR ₹1,000',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_N.14.1'
    },
    {
      fieldName: 'mandatoryMediation',
      label: 'Mandatory Mediation',
      value: 'Yes (before arbitration)',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_J.10.3'
    },
    {
      fieldName: 'dpdpConsent',
      label: 'Data Protection (DPDP Act 2023)',
      value: 'Data retained minimum 7 years',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_M'
    },
    {
      fieldName: 'fraudIndicators',
      label: 'Fraud Indicators (Art & Handmade Specific)',
      value: 'Monitored by Platform AI',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_L_implied',
      indicators: [
        'Artist originality disputes',
        'COA missing when promised',
        'Size mismatch with proof',
        'Identical buyer/seller accounts',
        'Doctored/deepfake evidence'
      ]
    }
  ],

  // ============================================================================
  // CONTRACT POPULATION FLOWCHART
  // ============================================================================
  contractPopulationFlow: {
    step1_gatherUserInput: {
      description: 'User fills all form sections (Sections 1-8)',
      dataSource: 'USER_INPUT',
      output: 'formData object with all 20+ fields'
    },
    step2_fetchAutoFields: {
      description: 'System automatically fetches from databases',
      queries: [
        'SELECT * FROM users WHERE id = seller_id (for seller details)',
        'SELECT * FROM users WHERE id = buyer_id (for buyer details)',
        'SELECT * FROM kyc_verification WHERE user_id IN (seller_id, buyer_id)',
        'GENERATE UUID for transaction_id',
        'GENERATE timestamp for contract_generated_at',
        'CALCULATE platform_fee and escrow_amount'
      ],
      output: 'autoFetchedFields object with 18 fields'
    },
    step3_loadPlatformDefaults: {
      description: 'Load non-editable legal clauses',
      source: 'Master Agreement (Part A-T) + Annexure L (Section 1-9)',
      output: 'platformDefaultFields object with 10 sections'
    },
    step4_combineAndPopulate: {
      description: 'Merge all three sources and populate contract placeholders',
      process: [
        '1. Load Master Agreement template from DB',
        '2. Load Annexure L template from DB',
        '3. Create merged contract (Master + Annexure)',
        '4. Replace all {{placeholders}} with values from formData + autoFetchedFields',
        '5. Inject platformDefaultFields into legal clauses'
      ],
      output: 'Fully populated contract document ready for display'
    },
    step5_displayInModal: {
      description: 'Show contract in ContractModal component',
      features: [
        'Tab-based viewing: Full / Master / Annexure L',
        'Copy to clipboard',
        'Print functionality',
        'Seller & Buyer acceptance tracking',
        'Digital signature recording'
      ],
      output: 'Legally binding contract accepted by both parties'
    }
  }
};

export default ANNEXURE_L_DATA_FLOW;

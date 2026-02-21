/**
 * ANNEXURE K — BOOKS & EDUCATIONAL MATERIAL
 * 
 * Covers: School books, textbooks, competitive exam prep, study material, photocopies
 * Data Sources: USER_INPUT (form) | AUTO_FETCHED (system/DB) | PLATFORM_DEFAULT (legal)
 */

export const ANNEXURE_K_DATA_FLOW = {
  industry: 'books_educational',
  annexure_code: 'K',
  inspectionWindowHours: 6,

  // ============================================================================
  // FORM SECTIONS (What user fills) — 5 SECTIONS
  // ============================================================================
  formSections: [
    {
      sectionId: 'section1_basicDetails',
      sectionTitle: 'Basic Details',
      description: 'Book identification information',
      fields: [
        {
          fieldName: 'bookTitle',
          label: 'Book Title',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Physics for Class 12 NCERT"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{book_title}}'
        },
        {
          fieldName: 'authors',
          label: 'Author(s)',
          type: 'text',
          required: true,
          placeholder: 'e.g., "H.C. Verma, Pradeep Kumar"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{authors}}'
        },
        {
          fieldName: 'publisher',
          label: 'Publisher',
          type: 'text',
          required: true,
          placeholder: 'e.g., "NCERT, Arihant, MTG"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{publisher}}'
        },
        {
          fieldName: 'editionNumber',
          label: 'Edition Number',
          type: 'text',
          required: true,
          placeholder: 'e.g., "1st", "2nd Revised", "3rd"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{edition_number}}'
        },
        {
          fieldName: 'yearOfPublishing',
          label: 'Year of Publishing',
          type: 'number',
          required: true,
          placeholder: '2024',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{year_of_publishing}}'
        },
        {
          fieldName: 'isbn',
          label: 'ISBN Number',
          type: 'text',
          required: false,
          placeholder: 'e.g., "978-8-121-92844-0"',
          note: '📌 Optional but helps verify authenticity',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{isbn}}'
        }
      ]
    },
    {
      sectionId: 'section2_condition',
      sectionTitle: 'Condition & Markings Declaration',
      description: 'Full transparency about book condition',
      fields: [
        {
          fieldName: 'conditionCategory',
          label: 'Condition Category',
          type: 'select',
          required: true,
          options: [
            'New (unopened)',
            'Like New',
            'Used - Minimal markings',
            'Used - Moderate markings',
            'Used - Heavy markings',
            'Photocopy / Xerox (MUST be disclosed)',
            'Torn / Damaged condition'
          ],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{condition_category}}'
        },
        {
          fieldName: 'hasHighlighting',
          label: 'Has Highlighting?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_highlighting}}'
        },
        {
          fieldName: 'hasUnderlining',
          label: 'Has Underlining?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_underlining}}'
        },
        {
          fieldName: 'hasWritingInMargins',
          label: 'Has Writing in Margins?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_writing_in_margins}}'
        },
        {
          fieldName: 'hasNameWritten',
          label: 'Name Written Inside?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_name_written}}'
        },
        {
          fieldName: 'hasTornPages',
          label: 'Has Torn Pages?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_torn_pages}}'
        },
        {
          fieldName: 'hasMissingPages',
          label: 'Has Missing Pages?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Critical - Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_missing_pages}}'
        },
        {
          fieldName: 'hasLooseBinding',
          label: 'Has Loose Binding?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_loose_binding}}'
        },
        {
          fieldName: 'hasWaterDamage',
          label: 'Has Water Damage?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_water_damage}}'
        },
        {
          fieldName: 'hasSpiralBind',
          label: 'Spiral Bind Added?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_spiral_bind}}'
        },
        {
          fieldName: 'hasStickersOrTape',
          label: 'Stickers/Tape on Cover?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_stickers_or_tape}}'
        },
        {
          fieldName: 'hasCoverDamage',
          label: 'Cover Damage?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_cover_damage}}'
        }
      ]
    },
    {
      sectionId: 'section3_sellerEvidence',
      sectionTitle: 'Mandatory Seller Evidence',
      description: 'Required photos before dispatch (7 mandatory uploads)',
      fields: [
        {
          fieldName: 'frontCoverPhoto',
          label: 'Front Cover Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Clear, well-lit photo showing title, author, condition',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{front_cover_photo_hash}}'
        },
        {
          fieldName: 'backCoverPhoto',
          label: 'Back Cover Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show synopsis, barcode, condition',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{back_cover_photo_hash}}'
        },
        {
          fieldName: 'spineBindingPhoto',
          label: 'Spine / Binding Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show binding condition, wear level',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{spine_binding_photo_hash}}'
        },
        {
          fieldName: 'interiorPages',
          label: 'Random Interior Pages (5 photos minimum)',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show highlighting, writing, condition. Should clearly demonstrate marking status.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{interior_pages_hashes}}'
        },
        {
          fieldName: 'editionPublisherPage',
          label: 'Edition & Publisher Page Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Shows edition, publishing year, confirms authenticity',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{edition_publisher_page_hash}}'
        },
        {
          fieldName: 'isbnPage',
          label: 'ISBN Page Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Shows ISBN, price, publisher details',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{isbn_page_hash}}'
        },
        {
          fieldName: 'defectPhotos',
          label: 'Defect Photos (if applicable)',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Close-ups of torn pages, water damage, binding issues, etc.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{defect_photos_hashes}}'
        }
      ]
    },
    {
      sectionId: 'section4_buyerInspection',
      sectionTitle: 'Buyer Inspection Requirements',
      description: 'What buyer must provide after delivery',
      fields: [
        {
          fieldName: 'unboxingVideo',
          label: 'Unboxing Video (MANDATORY)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Continuous (no cuts), min 720p. Show: book removal, page flipping, binding, ISBN page. Min 3 minutes.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{unboxing_video_hash}}'
        },
        {
          fieldName: 'pageFlippingVideo',
          label: 'Page Flipping Video',
          type: 'file',
          fileType: 'video',
          required: false,
          note: '🎥 Show all pages to verify missing/torn pages',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{page_flipping_video_hash}}'
        },
        {
          fieldName: 'inspectionConfirm',
          label: 'I confirm inspection completed within 6-hour window',
          type: 'checkbox',
          required: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{buyer_inspection_confirm}}'
        }
      ]
    },
    {
      sectionId: 'section5_pricing',
      sectionTitle: 'Price & Escrow',
      description: 'Transaction amount',
      fields: [
        {
          fieldName: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          prefix: '₹',
          placeholder: '500',
          note: 'Platform Fee (1%) will be auto-calculated',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{price}}'
        }
      ]
    }
  ],

  // ============================================================================
  // AUTO-FETCHED FIELDS (System automatically populates) — 18 FIELDS
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
      example: 'If price = ₹500, fee = ₹5',
      contractPlaceholder: '{{platform_fee}}'
    },
    {
      fieldName: 'escrowAmount',
      label: 'Escrow Amount',
      dataSource: 'AUTO-FETCHED',
      source: 'system_calculation',
      formula: 'price - platform_fee',
      example: 'If price = ₹500, escrow = ₹495',
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
  // PLATFORM-DEFAULT FIELDS (Non-editable legal clauses) — 10 SECTIONS
  // ============================================================================
  platformDefaultFields: [
    {
      fieldName: 'inspectionWindow',
      label: 'Inspection Window',
      value: '6 hours',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_4',
      description: 'Buyer has 6 hours from delivery to inspect and raise disputes. After expiry → auto-accept.',
      contractSection: 'PART H — DELIVERY & INSPECTION PROTOCOL'
    },
    {
      fieldName: 'mandatorySellerDisclosures',
      label: 'Mandatory Seller Disclosures',
      value: '12 checkboxes + 7 evidence photos',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_2_3',
      requirements: [
        'Book identification (Title, Author, Publisher, Edition, Year, ISBN)',
        'Condition category (New → Damaged)',
        '12 marking/defect checkboxes (highlighting, underlining, torn, etc.)',
        'Failure to disclose = MISREPRESENTATION = Full refund + Blacklist'
      ]
    },
    {
      fieldName: 'photocopyCritical',
      label: 'Photocopy / Xerox Rule (HIGH RISK)',
      value: 'Must be explicitly disclosed',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_2D',
      rules: [
        'If photocopy: MUST clearly mark as "Photocopy/Xerox"',
        'MUST upload cover AND interior pages',
        'Cannot claim "original"',
        'Cannot use publisher images',
        'Violation = FIR under Copyright Act 1957'
      ]
    },
    {
      fieldName: 'validDisputes',
      label: 'Valid Dispute Types (Books)',
      value: '6 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_5',
      types: [
        '✔ Wrong edition delivered',
        '✔ Missing pages (with proof)',
        '✔ Torn/damaged pages not disclosed',
        '✔ Heavy writing/highlights not disclosed',
        '✔ Fake/photocopy delivered as original',
        '✔ Wrong book or different author delivered',
        '✔ Missing supplements (CDs, codes, answer keys)'
      ]
    },
    {
      fieldName: 'invalidDisputes',
      label: 'Invalid Dispute Types (Books)',
      value: '7 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_6',
      types: [
        '❌ Buyer complaining about syllabus differences',
        '❌ Minor wear already shown by seller photos',
        '❌ "Book smells old" (common for used books)',
        '❌ Buyer finished reading and wants return',
        '❌ Small corner folds (if photographed)',
        '❌ Binding tightness (subjective)',
        '❌ Buyer complains after 6-hour window'
      ]
    },
    {
      fieldName: 'escrowRules',
      label: 'Escrow Release Conditions',
      value: 'Seller-favorable for books',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_7 + master_agreement_part_G',
      conditions: {
        releaseToSeller: [
          '→ Buyer provides no unboxing video',
          '→ Buyer claims missing pages without video proof',
          '→ Only minor wear seller already disclosed',
          '→ Buyer changed mind after inspection',
          '→ Buyer scanned book then claims defect'
        ],
        releaseToBuyer: [
          '→ Wrong edition delivered',
          '→ Wrong book entirely',
          '→ Missing pages proven',
          '→ Torn binding not disclosed',
          '→ Photocopy delivered instead of original',
          '→ Heavy writing/highlights not disclosed'
        ]
      }
    },
    {
      fieldName: 'evidenceHierarchy',
      label: 'Evidence Hierarchy',
      value: '1. Video (highest) > 2. Photos > 3. Claims',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_I',
      evidence: {
        videos: 'Unboxing video (no cuts) = strongest proof',
        photos: 'Seller pre-delivery + buyer unboxing photos',
        documents: 'ISBN page, edition verification',
        claims: 'Unsupported claims = NOT accepted'
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
      fieldName: 'fraudConsequences',
      label: 'Legal Consequences (Fraud)',
      value: 'If seller delivers fake/photocopy as original',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_9',
      consequences: [
        '→ Full refund to buyer',
        '→ Immediate seller blacklist',
        '→ FIR under IPC 420 (criminal fraud)',
        '→ Copyright Act 1957 violation (for photocopies)',
        '→ Permanent account suspension',
        '→ Civil liability ₹10,000 minimum'
      ]
    },
    {
      fieldName: 'handwrittenNotesRule',
      label: 'Handwritten Notes Special Rule',
      value: 'If seller list includes notes',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_K_section_8',
      requirements: [
        'MUST upload sample pages of notes',
        'MUST declare page count',
        'MUST declare bound/unbound status',
        'Failure = misrepresentation dispute'
      ]
    }
  ],

  // ============================================================================
  // DISPUTE LOGIC REFERENCE
  // ============================================================================
  disputeLogic: {
    aiTriageFactors: [
      'Video evidence present? (YES = higher accuracy)',
      'Seller provided 7 mandatory photos? (NO = seller negligent)',
      'Buyer unboxing video shows defect? (YES = strong proof)',
      'Missing pages claim: Buyer showed specific page numbers in video? (YES = valid)',
      'Wrong edition: ISBN/edition page photos match? (NO = seller at fault)',
      'Photocopy claim: Publisher images used? (YES = fraud detected)',
      'Heavy markings: Seller disclosed checkbox + photos shown minor? (Contradiction = fraud)'
    ],
    mediation: 'Mandatory before arbitration (Mediation Act 2023)',
    arbitration: 'Final decision by arbitrator'
  },

  // ============================================================================
  // CONTRACT POPULATION FLOWCHART
  // ============================================================================
  contractPopulationFlow: {
    step1_gatherUserInput: {
      description: 'User fills all 5 form sections (65+ fields)',
      dataSource: 'USER_INPUT',
      output: 'formData object with all book details'
    },
    step2_fetchAutoFields: {
      description: 'System automatically fetches 18 fields',
      queries: [
        'SELECT * FROM users WHERE id = seller_id',
        'SELECT * FROM users WHERE id = buyer_id',
        'SELECT * FROM kyc_verification WHERE user_id IN (seller_id, buyer_id)',
        'GENERATE UUID for transaction_id',
        'CALCULATE platform_fee and escrow_amount'
      ],
      output: 'autoFetchedFields object'
    },
    step3_loadPlatformDefaults: {
      description: 'Load 10 sections of non-editable legal clauses',
      source: 'Master Agreement + Annexure K',
      output: 'platformDefaultFields with full dispute logic'
    },
    step4_combineAndPopulate: {
      description: 'Merge Master + Annexure K and populate placeholders',
      process: [
        '1. Load Master Agreement from DB',
        '2. Load Annexure K from DB',
        '3. Merge into single document',
        '4. Replace {{book_title}}, {{price}}, {{isbn}}, etc.',
        '5. Inject platform defaults into legal sections'
      ],
      output: 'Complete contract ready for display'
    },
    step5_displayAndAcceptance: {
      description: 'Show in ContractModal with acceptance tracking',
      features: [
        'Tab-based: Full / Master / Annexure K',
        'Digital signature',
        'Seller & Buyer separate acceptance',
        'Audit trail (IP, device, timestamp)'
      ]
    }
  }
};

export default ANNEXURE_K_DATA_FLOW;

/**
 * ANNEXURE I — COLLECTIBLES & LUXURY GOODS
 * 
 * Covers: Watches, Handbags, Sneakers, Memorabilia, Coins, Stamps, Cards, Limited Editions
 * HIGHEST FRAUD RISK - Counterfeit goods, fake certificates, serial mismatches
 * Data Sources: USER_INPUT (form) | AUTO_FETCHED (system/DB) | PLATFORM_DEFAULT (legal)
 */

export const ANNEXURE_I_DATA_FLOW = {
  industry: 'collectibles_luxury_goods',
  annexure_code: 'I',
  riskLevel: 'CRITICAL',
  inspectionWindowHours: 2,
  note: 'Fastest inspection window (2 hours) due to counterfeit risk',

  // ============================================================================
  // FORM SECTIONS (What user fills) — 8 SECTIONS
  // ============================================================================
  formSections: [
    {
      sectionId: 'section1_itemDetails',
      sectionTitle: 'Item Details',
      description: 'Complete item identification',
      fields: [
        {
          fieldName: 'itemName',
          label: 'Item Name / Display Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Rolex Submariner Gold", "Louis Vuitton Speedy 30", "Nike Jordan 1 Retro"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{item_name}}'
        },
        {
          fieldName: 'brand',
          label: 'Brand',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Rolex", "Chanel", "Adidas"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{brand}}'
        },
        {
          fieldName: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          options: [
            'Luxury Watch',
            'Premium Handbag',
            'Limited Edition Sneakers',
            'Autographed Memorabilia',
            'Celebrity / Bollywood Item',
            'Sports Memorabilia',
            'Collectible Card',
            'Coin',
            'Stamp',
            'Antique / Artifact',
            'Other Collectible'
          ],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{category}}'
        },
        {
          fieldName: 'modelOrEdition',
          label: 'Model Name / Edition Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Submariner 14060M", "Air Jordan 1 Chicago", "Pokemon Base Set Charizard"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{model_or_edition}}'
        },
        {
          fieldName: 'releaseYear',
          label: 'Release Year / Collection Year',
          type: 'number',
          required: true,
          placeholder: '2020',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{release_year}}'
        }
      ]
    },
    {
      sectionId: 'section2_identification',
      sectionTitle: 'Identification & Authenticity',
      description: 'Critical for fraud detection',
      fields: [
        {
          fieldName: 'serialNumber',
          label: 'Serial Number / Production Number',
          type: 'text',
          required: true,
          placeholder: 'e.g., "X123456", "LL0123456"',
          note: '⚠️ CRITICAL: Serial number mismatch = top counterfeit indicator. Must be clearly visible in photos.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{serial_number}}'
        },
        {
          fieldName: 'editionNumber',
          label: 'Edition Number (if Limited Edition)',
          type: 'text',
          required: false,
          placeholder: 'e.g., "322 of 500", "1st Edition", "#47"',
          note: 'For limited edition items only',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{edition_number}}'
        },
        {
          fieldName: 'authenticityStatus',
          label: 'Authenticity Status',
          type: 'select',
          required: true,
          options: [
            '100% Genuine / Original',
            'Restored / Refurbished',
            'Replica (MUST BE DISCLOSED)',
            'Unknown authenticity'
          ],
          note: '⚠️ Claiming genuine without proof = FRAUD. Replicas must be explicitly labeled.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{authenticity_status}}'
        },
        {
          fieldName: 'originalBillCertificate',
          label: 'Original Bill / Purchase Receipt Available?',
          type: 'checkbox',
          required: false,
          note: '✓ Increases buyer confidence',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_original_bill}}'
        }
      ]
    },
    {
      sectionId: 'section3_condition',
      sectionTitle: 'Condition (Very Strict)',
      description: 'Comprehensive condition disclosure for luxury goods',
      fields: [
        {
          fieldName: 'conditionCategory',
          label: 'Condition Category',
          type: 'select',
          required: true,
          options: [
            'Brand New (Unopened)',
            'Unused with box',
            'Like New',
            'Used (minor signs of wear)',
            'Heavily Used',
            'Vintage Used',
            'Restored / Repaired (must provide proof)'
          ],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{condition_category}}'
        },
        {
          fieldName: 'hasScratches',
          label: 'Scratches Present?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_scratches}}'
        },
        {
          fieldName: 'hasDents',
          label: 'Dents / Dings?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_dents}}'
        },
        {
          fieldName: 'cornersWorn',
          label: 'Corners Worn?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Common for handbags/bags',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{corners_worn}}'
        },
        {
          fieldName: 'hasDiscoloration',
          label: 'Discoloration / Fading?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_discoloration}}'
        },
        {
          fieldName: 'hasMissingParts',
          label: 'Missing Parts / Components?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Critical - list items missing',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_missing_parts}}'
        },
        {
          fieldName: 'missingPartsDescription',
          label: 'Describe Missing Parts',
          type: 'text',
          required: false,
          placeholder: 'e.g., "Missing original strap", "No box"',
          conditionalOn: 'hasMissingParts',
          conditionalValue: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{missing_parts_description}}'
        },
        {
          fieldName: 'defectPhotos',
          label: 'Upload Defect / Wear Photos',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Close-ups of all disclosed wear/defects',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{defect_photos_hashes}}'
        }
      ]
    },
    {
      sectionId: 'section4_certificates',
      sectionTitle: 'Certificates & Packaging',
      description: 'Authenticity verification documents',
      fields: [
        {
          fieldName: 'certificateOfAuthenticity',
          label: 'Certificate of Authenticity (COA) Available?',
          type: 'checkbox',
          required: false,
          note: '✓ Highly recommended for watches, handbags, memorabilia',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_coa}}'
        },
        {
          fieldName: 'coaDocument',
          label: 'Upload COA / Brand Authenticity Card',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📄 Clear photos of certificate/card. Missing when promised = buyer dispute.',
          conditionalOn: 'certificateOfAuthenticity',
          conditionalValue: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{coa_document_hash}}'
        },
        {
          fieldName: 'originalPackaging',
          label: 'Original Packaging / Box Available?',
          type: 'checkbox',
          required: false,
          note: '✓ Increases authenticity perception',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_original_packaging}}'
        },
        {
          fieldName: 'boxPhotos',
          label: 'Upload Original Box / Packaging Photos',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Show outside, inside, label, condition',
          conditionalOn: 'originalPackaging',
          conditionalValue: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{box_photos_hashes}}'
        }
      ]
    },
    {
      sectionId: 'section5_categorySpecific',
      sectionTitle: 'Category-Specific Information',
      description: 'Additional fields based on item category',
      fields: [
        {
          fieldName: 'watchMovementType',
          label: '[WATCHES ONLY] Movement Type',
          type: 'select',
          required: false,
          options: ['Automatic', 'Manual', 'Quartz', 'Solar', 'Unknown'],
          note: 'Specify movement for watch authenticity',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{watch_movement_type}}'
        },
        {
          fieldName: 'watchLastServiceDate',
          label: '[WATCHES ONLY] Last Service Date',
          type: 'date',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{watch_last_service_date}}'
        },
        {
          fieldName: 'watchWaterproofTest',
          label: '[WATCHES ONLY] Waterproof Test Done?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{watch_waterproof_test}}'
        },
        {
          fieldName: 'watchMovementVideo',
          label: '[WATCHES ONLY] Upload Movement / Ticking Video',
          type: 'file',
          fileType: 'video',
          required: false,
          note: '🎥 Proof that watch is working',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{watch_movement_video_hash}}'
        },
        {
          fieldName: 'sneakersSize',
          label: '[SNEAKERS ONLY] Size',
          type: 'text',
          required: false,
          placeholder: 'e.g., "US 10", "UK 8"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{sneakers_size}}'
        },
        {
          fieldName: 'sneakersSoleWearPercent',
          label: '[SNEAKERS ONLY] Sole Wear (%)',
          type: 'number',
          required: false,
          placeholder: '10',
          note: '0% = pristine, 100% = completely worn',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{sneakers_sole_wear_percent}}'
        },
        {
          fieldName: 'sneakersCreasing',
          label: '[SNEAKERS ONLY] Creasing Level',
          type: 'select',
          required: false,
          options: ['None', 'Minor', 'Moderate', 'Heavy'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{sneakers_creasing_level}}'
        },
        {
          fieldName: 'sneakersSoleCloseup',
          label: '[SNEAKERS ONLY] Upload Sole Close-up Photo',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Shows authentic outsole design',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{sneakers_sole_closeup_hash}}'
        },
        {
          fieldName: 'handbagLeatherType',
          label: '[HANDBAGS ONLY] Leather Type',
          type: 'select',
          required: false,
          options: ['Genuine Leather', 'Canvas', 'Mixed', 'Synthetic', 'Unknown'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{handbag_leather_type}}'
        },
        {
          fieldName: 'handbagSerialCode',
          label: '[HANDBAGS ONLY] Serial / Date Code',
          type: 'text',
          required: false,
          placeholder: 'e.g., "MI0123 LL0056"',
          note: '⚠️ Serial/date code mismatch = counterfeit',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{handbag_serial_code}}'
        },
        {
          fieldName: 'handbagStitchingCondition',
          label: '[HANDBAGS ONLY] Stitching Condition',
          type: 'select',
          required: false,
          options: ['Perfect', 'Minor loose threads', 'Loose stitching', 'Torn stitching'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{handbag_stitching_condition}}'
        },
        {
          fieldName: 'handbagStitchingCloseup',
          label: '[HANDBAGS ONLY] Upload Stitching Close-up Photo',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Shows authentic stitching pattern',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{handbag_stitching_closeup_hash}}'
        },
        {
          fieldName: 'memorabiliaCoaAvailable',
          label: '[MEMORABILIA ONLY] COA Available?',
          type: 'checkbox',
          required: false,
          note: 'Mandatory for autographed items',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{memorabilia_coa_available}}'
        },
        {
          fieldName: 'memorabiliaFrameCondition',
          label: '[MEMORABILIA ONLY] Frame / Glass Condition',
          type: 'select',
          required: false,
          options: ['Perfect', 'Minor dust', 'Scratches', 'Cracks'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{memorabilia_frame_condition}}'
        },
        {
          fieldName: 'memorabiliaSignatureClarity',
          label: '[MEMORABILIA ONLY] Signature Clarity',
          type: 'select',
          required: false,
          options: ['Very clear', 'Clear', 'Faded', 'Unclear'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{memorabilia_signature_clarity}}'
        }
      ]
    },
    {
      sectionId: 'section6_sellerEvidence',
      sectionTitle: 'Mandatory Seller Evidence',
      description: 'Required for fraud prevention (6 mandatory uploads)',
      fields: [
        {
          fieldName: 'item360Video',
          label: '360° Continuous Video (MANDATORY)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 No cuts or edits. Show entire item, serial number, logos, hologram, packaging. Min 2 minutes.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{item_360_video_hash}}'
        },
        {
          fieldName: 'serialNumberCloseup',
          label: 'Serial Number Close-up Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Crystal clear, well-lit, full serial visible',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{serial_number_closeup_hash}}'
        },
        {
          fieldName: 'logoCloseup',
          label: 'Logo / Brand Mark Close-up Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show authenticity indicators (font, positioning, quality)',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{logo_closeup_hash}}'
        },
        {
          fieldName: 'editionNumberCloseup',
          label: 'Edition Number Close-up Photo (if applicable)',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 For limited editions, clearly show the edition number',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{edition_number_closeup_hash}}'
        },
        {
          fieldName: 'holoSticker',
          label: 'Hologram / Security Feature Photo (if applicable)',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Show hologram, authentication labels, security features',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{holo_sticker_hash}}'
        },
        {
          fieldName: 'packagingPhotos',
          label: 'Original Packaging / Box Photos',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Show box exterior, interior, labels',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{packaging_photos_hashes}}'
        }
      ]
    },
    {
      sectionId: 'section7_buyerInspection',
      sectionTitle: 'Buyer Inspection Requirements',
      description: 'What buyer must provide (ULTRA-FAST 2-hour window)',
      fields: [
        {
          fieldName: 'unboxingVideo',
          label: 'Unboxing Video (MANDATORY)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Continuous (no cuts). Show package opening, serial number, comparing to seller video. Min 3 minutes. ⏰ MUST be uploaded within 2 hours!',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{unboxing_video_hash}}'
        },
        {
          fieldName: 'serialNumberVerificationVideo',
          label: 'Serial Number Matching Video',
          type: 'file',
          fileType: 'video',
          required: false,
          note: '🎥 Buyer holds item next to seller video, confirming serial match',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{serial_verification_video_hash}}'
        },
        {
          fieldName: 'inspectionWindowConfirm',
          label: 'Inspection completed within 2-hour window',
          type: 'checkbox',
          required: true,
          note: '⚠️ CRITICAL: After 2 hours → auto-accept, no disputes possible',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{buyer_inspection_window_confirm}}'
        }
      ]
    },
    {
      sectionId: 'section8_pricing',
      sectionTitle: 'Price & Escrow',
      description: 'Transaction amount',
      fields: [
        {
          fieldName: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          prefix: '₹',
          placeholder: '75000',
          note: 'Platform Fee (1%) calculated. If >₹50,000: Extended AI verification + optional 12-hour escrow hold.',
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
      example: 'If price = ₹75,000, fee = ₹750',
      contractPlaceholder: '{{platform_fee}}'
    },
    {
      fieldName: 'escrowAmount',
      label: 'Escrow Amount',
      dataSource: 'AUTO-FETCHED',
      source: 'system_calculation',
      formula: 'price - platform_fee',
      example: 'If price = ₹75,000, escrow = ₹74,250',
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
  // PLATFORM-DEFAULT FIELDS (Non-editable legal clauses) — 12 SECTIONS
  // ============================================================================
  platformDefaultFields: [
    {
      fieldName: 'inspectionWindow',
      label: 'Inspection Window (FASTEST)',
      value: '2 hours only',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_4',
      description: 'Highest risk category = fastest inspection window. After 2 hours → auto-accept, no disputes allowed.',
      contractSection: 'PART H — DELIVERY & INSPECTION PROTOCOL'
    },
    {
      fieldName: 'mandatorySellerDisclosures',
      label: 'Mandatory Seller Disclosures (STRICT)',
      value: '6 critical fields',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_2_3',
      requirements: [
        'Item identification: Brand, Model, Serial, Edition, Release Year',
        'Authenticity: 100% Genuine / Restored / Replica / Unknown (NO vague claims)',
        'Certificates: COA, packaging, brand cards',
        'Condition: Comprehensive (scratches, dents, wear, missing parts)',
        'Category-specific: Movement for watches, size for sneakers, serial codes for handbags',
        'Failure = FRAUD = Full refund + Blacklist + FIR IPC 420 + IPC 489'
      ]
    },
    {
      fieldName: 'serialNumberCritical',
      label: 'Serial Number Verification (CRITICAL)',
      value: 'Top counterfeit detection method',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_implied',
      protections: [
        'Seller must show serial clearly in 360° video',
        'Close-up photo mandatory',
        'Buyer must verify serial match in unboxing video',
        'Serial mismatch = immediate buyer victory',
        'No serial visible = assumed counterfeit'
      ]
    },
    {
      fieldName: 'validDisputes',
      label: 'Valid Dispute Types (Collectibles)',
      value: '8 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_5',
      types: [
        '✔ Counterfeit / Fake product (verified via serial/logo mismatch)',
        '✔ Wrong item delivered (different model/edition)',
        '✔ Serial number mismatch',
        '✔ Missing certificates promised by seller',
        '✔ Severe scratches / defects not disclosed',
        '✔ Wrong size delivered (sneakers)',
        '✔ Damaged display box (value-affecting)',
        '✔ Edition number mismatch (e.g., claimed 322/500 but got 199/500)'
      ]
    },
    {
      fieldName: 'invalidDisputes',
      label: 'Invalid Dispute Types (Collectibles)',
      value: '8 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_6',
      types: [
        '❌ "I don\'t like it after receiving"',
        '❌ Leather/gloss looks different in lighting',
        '❌ Minor wear already shown in seller photos',
        '❌ Buyer damaged item while opening',
        '❌ Packaging torn by courier (item intact)',
        '❌ Buyer comparing to YouTube video',
        '❌ Buyer claiming "I think it\'s fake" without evidence',
        '❌ Buyer wore sneakers outside then complaints'
      ]
    },
    {
      fieldName: 'escrowRules',
      label: 'Escrow Release Conditions',
      value: 'Evidence-based for luxury items',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_7 + master_agreement_part_G',
      conditions: {
        releaseToSeller: [
          '→ Buyer fails to upload unboxing video',
          '→ Buyer\' s evidence insufficient (blurry, incomplete)',
          '→ Item condition matches seller 360° video',
          '→ Serial/edition numbers match perfectly',
          '→ Only cosmetic differences already disclosed',
          '→ Buyer tries to return after using/wearing'
        ],
        releaseToBuyer: [
          '→ Item is counterfeit / fake',
          '→ Serial number mismatch (fraud)',
          '→ Edition number mismatch',
          '→ COA missing but promised',
          '→ Wrong item delivered',
          '→ Major undisclosed defects',
          '→ Watch movement dead',
          '→ Handbag serial/date code mismatch'
        ]
      }
    },
    {
      fieldName: 'evidenceHierarchy',
      label: 'Evidence Hierarchy (Collectibles)',
      value: '360° Video (highest) > Close-ups > Claims',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_I',
      hierarchy: {
        video360: 'STRONGEST - Shows entire item, serial, logos, hologram in one take',
        unboxingVideo: 'STRONG - Buyer verifies serial, compares to seller video',
        serialCloseup: 'HIGH - Crystal clear proof of authenticity',
        logoCloseup: 'HIGH - Font, positioning, quality indicators',
        claims: 'LOW - Unsupported claims rejected'
      }
    },
    {
      fieldName: 'highValueRule',
      label: 'High Value Items Rule (₹50,000+)',
      value: 'Enhanced AI verification',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_8',
      requirements: [
        'Platform may request additional photos from seller',
        'Serial number verification against brand database (if available)',
        'AI counterfeit detection analysis',
        'Optional escrow hold extended 12 hours for verification',
        'Buyer condition verification video may be requested'
      ]
    },
    {
      fieldName: 'counterferitConsequences',
      label: 'Legal Consequences (Counterfeit Goods)',
      value: 'Criminal + Civil penalties',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_9',
      consequences: [
        '→ 100% refund to buyer',
        '→ Seller blacklisted permanently',
        '→ FIR filed under IPC 420 (Cheating)',
        '→ FIR filed under IPC 489 (Counterfeiting marks)',
        '→ Copyright Act 1957 violation (trademark)',
        '→ Consumer Protection Act 2019 penalties',
        '→ Civil lawsuit for damages',
        '→ Criminal prosecution with jail time possible'
      ]
    },
    {
      fieldName: 'watchMovementRule',
      label: 'Watch Movement Verification',
      value: 'For luxury watch authenticity',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_5',
      requirements: [
        'Seller must declare movement type: Automatic/Manual/Quartz/Solar',
        'Movement video (ticking) proves working condition',
        'Last service date critical (not serviced = suspect)',
        'Replaced parts must be disclosed',
        'Waterproof test status required'
      ]
    },
    {
      fieldName: 'sneakerAuthenticityRule',
      label: 'Sneaker Authenticity Indicators',
      value: 'Specific markers for shoe fraud',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_5',
      indicators: [
        'Box label text quality (replicas have printing defects)',
        'Outsole pattern (exact match to authentic design)',
        'Stitching consistency (authentic = perfect)',
        'Logo placement and stitching (critical)',
        'Toe box shape (authentic vs replica)',
        'Size tag printing quality'
      ]
    },
    {
      fieldName: 'handbagAuthenticityRule',
      label: 'Handbag Authenticity Indicators',
      value: 'Luxury bag fraud prevention',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_I_section_5',
      indicators: [
        'Serial/Date code (e.g., "MI0123") = format specific to brand',
        'Stitching pattern (authentic = impeccable)',
        'Hardware weight and finish (replicas use cheap metal)',
        'Leather quality (touch test)',
        'Logo placement, font, spacing',
        'Stamp clarity (authentic = deep, clear)'
      ]
    }
  ],

  // ============================================================================
  // DISPUTE LOGIC REFERENCE
  // ============================================================================
  disputeLogic: {
    aiTriageFactors: [
      'Seller 360° video present? (NO = high fraud risk)',
      'Serial number visible and clear in photos? (NO = suspicious)',
      'Logo/brand mark matches known authentic? (NO = counterfeit)',
      'Buyer unboxing video shows serial match? (NO = wrong item)',
      'Buyer provided unboxing within 2-hour window? (NO = missed deadline)',
      'COA present when promised? (NO = breach of contract)',
      'Condition matches seller 360° video? (NO = damage during transit)',
      'Edition number matches seller listing? (NO = fraud)',
      'Certificate of authenticity verified? (YES = increases legitimacy)'
    ],
    counterferitDetection: [
      'Serial number format mismatch = counterfeit',
      'Logo text quality poor = replica',
      'Hologram missing or damaged = fake',
      'Stitching imperfect = fake (luxury goods)',
      'Hardware cheap/light = counterfeit'
    ],
    mediation: 'Mandatory before arbitration (Mediation Act 2023)',
    arbitration: 'Final decision by arbitrator with product expertise'
  },

  // ============================================================================
  // CONTRACT POPULATION FLOWCHART
  // ============================================================================
  contractPopulationFlow: {
    step1_gatherUserInput: {
      description: 'Seller fills all 8 form sections (100+ fields)',
      dataSource: 'USER_INPUT',
      output: 'formData with item identity, authenticity, condition, category-specific fields'
    },
    step2_fetchAutoFields: {
      description: 'System automatically fetches 18 fields',
      queries: [
        'SELECT * FROM users WHERE id = seller_id',
        'SELECT * FROM users WHERE id = buyer_id',
        'SELECT * FROM kyc_verification WHERE user_id IN (seller_id, buyer_id)',
        'GENERATE UUID for transaction_id',
        'CALCULATE platform_fee and escrow_amount',
        'IF price > 50000 THEN flag for AI verification'
      ],
      output: 'autoFetchedFields object'
    },
    step3_loadPlatformDefaults: {
      description: 'Load 12 sections of non-editable legal clauses',
      source: 'Master Agreement + Annexure I',
      output: 'platformDefaultFields with counterfeit detection + serial verification'
    },
    step4_combineAndPopulate: {
      description: 'Merge Master + Annexure I and populate placeholders',
      process: [
        '1. Load Master Agreement from DB',
        '2. Load Annexure I from DB',
        '3. Merge into single document',
        '4. Replace {{item_name}}, {{serial_number}}, {{authenticity_status}}, {{price}}, etc.',
        '5. Inject platform defaults with 2-hour inspection window',
        '6. Highlight serial number verification requirements',
        '7. If price > ₹50,000: Flag for extended AI verification'
      ],
      output: 'Complete luxury goods contract with anti-fraud protections'
    },
    step5_displayAndAcceptance: {
      description: 'Show in ContractModal with CRITICAL warnings',
      features: [
        'Tab-based: Full / Master / Annexure I',
        'PROMINENT: Serial number + Edition number verification requirement',
        'HIGHLIGHTED: 2-hour inspection window (fastest)',
        'Seller warning: "Counterfeit goods = Criminal penalties + FIR"',
        'Buyer reminder: "Verify serial match before accepting"',
        'Digital signature with timestamp',
        'Extended audit trail (IP, device, location, browser)'
      ]
    }
  }
};

export default ANNEXURE_I_DATA_FLOW;

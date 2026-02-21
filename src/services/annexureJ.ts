/**
 * ANNEXURE J — INDUSTRIAL GOODS & MACHINERY
 * 
 * Covers: Industrial machines, CNC, hydraulic presses, compressors, generators, power tools, commercial equipment
 * HIGH RISK CATEGORY - Highest monetary fraud + technical defects
 * Data Sources: USER_INPUT (form) | AUTO_FETCHED (system/DB) | PLATFORM_DEFAULT (legal)
 */

export const ANNEXURE_J_DATA_FLOW = {
  industry: 'industrial_machinery',
  annexure_code: 'J',
  riskLevel: 'HIGH',
  inspectionWindowHours: {
    smallTools: 6,
    mediumMachines: 12,
    heavyMachinery: 24
  },

  // ============================================================================
  // FORM SECTIONS (What user fills) — 7 SECTIONS
  // ============================================================================
  formSections: [
    {
      sectionId: 'section1_machineBasics',
      sectionTitle: 'Machine Basics',
      description: 'Complete machine identification',
      fields: [
        {
          fieldName: 'machineName',
          label: 'Machine Name',
          type: 'text',
          required: true,
          placeholder: 'e.g., "CNC Milling Machine", "Industrial Compressor"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{machine_name}}'
        },
        {
          fieldName: 'category',
          label: 'Category',
          type: 'select',
          required: true,
          options: [
            'Lathe Machine',
            'Drill Machine',
            'Milling Machine',
            'CNC Machine',
            'Hydraulic Press',
            'Compressor',
            'Generator',
            'Industrial Pump',
            'Packaging Machine',
            'Conveyor Belt',
            'Welding Unit',
            'Grinder',
            'Saw / Cutter',
            'Bakery Equipment',
            'Restaurant Equipment',
            'Refrigeration Unit',
            'Water Plant',
            'Pneumatic Tools',
            'Electric Tools',
            'Other Industrial Equipment'
          ],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{machine_category}}'
        },
        {
          fieldName: 'brand',
          label: 'Brand',
          type: 'text',
          required: true,
          placeholder: 'e.g., "Kirloskar", "Atlas Copco", "Siemens"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{brand}}'
        },
        {
          fieldName: 'modelNumber',
          label: 'Model Number',
          type: 'text',
          required: true,
          placeholder: 'e.g., "AC-250", "CNC-3000"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{model_number}}'
        },
        {
          fieldName: 'serialNumber',
          label: 'Serial Number',
          type: 'text',
          required: true,
          placeholder: 'e.g., "SN-2019-45678"',
          note: '⚠️ CRITICAL: Serial number mismatch = top fraud indicator',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{serial_number}}'
        },
        {
          fieldName: 'manufacturingYear',
          label: 'Manufacturing Year',
          type: 'number',
          required: true,
          placeholder: '2018',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{manufacturing_year}}'
        },
        {
          fieldName: 'purchaseYear',
          label: 'Year of Purchase',
          type: 'number',
          required: true,
          placeholder: '2020',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{purchase_year}}'
        },
        {
          fieldName: 'usageType',
          label: 'Usage Type',
          type: 'select',
          required: true,
          options: ['Industrial', 'Commercial', 'Light Usage', 'Heavy Usage'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{usage_type}}'
        }
      ]
    },
    {
      sectionId: 'section2_technicalSpecs',
      sectionTitle: 'Technical Specifications',
      description: 'Critical electrical and operational specs',
      fields: [
        {
          fieldName: 'voltageRequired',
          label: 'Voltage Required (V)',
          type: 'select',
          required: true,
          options: ['110V', '220V', '440V', '380V', '3-phase available'],
          note: '⚠️ Voltage mismatch = buyer cannot use',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{voltage_required}}'
        },
        {
          fieldName: 'phase',
          label: 'Phase',
          type: 'select',
          required: true,
          options: ['Single Phase', '3-Phase'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{phase}}'
        },
        {
          fieldName: 'powerRating',
          label: 'Power Rating (kW or HP)',
          type: 'text',
          required: true,
          placeholder: 'e.g., "5 kW" or "7.5 HP"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{power_rating}}'
        },
        {
          fieldName: 'loadCapacity',
          label: 'Load Capacity',
          type: 'text',
          required: true,
          placeholder: 'e.g., "500 kg", "1 ton"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{load_capacity}}'
        },
        {
          fieldName: 'rpmOrOutput',
          label: 'RPM / Output Capacity',
          type: 'text',
          required: true,
          placeholder: 'e.g., "1500 RPM" or "100 units/hour"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{rpm_or_output}}'
        },
        {
          fieldName: 'fuelType',
          label: 'Fuel Type (if applicable)',
          type: 'select',
          required: false,
          options: ['Diesel', 'Petrol', 'LPG', 'Electric', 'N/A'],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{fuel_type}}'
        },
        {
          fieldName: 'airPressure',
          label: 'Air Pressure (bar/psi) - Compressors only',
          type: 'text',
          required: false,
          placeholder: 'e.g., "8 bar", "120 psi"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{air_pressure}}'
        }
      ]
    },
    {
      sectionId: 'section3_condition',
      sectionTitle: 'Condition & Known Issues',
      description: 'Comprehensive condition disclosure (HIGH RISK AREA)',
      fields: [
        {
          fieldName: 'conditionCategory',
          label: 'Condition Category',
          type: 'select',
          required: true,
          options: [
            'New (unopened)',
            'Like New',
            'Used',
            'Heavy Used',
            'Overhauled',
            'Refurbished',
            'Non-Working (MUST disclose reason)'
          ],
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{condition_category}}'
        },
        {
          fieldName: 'hasInternalWear',
          label: 'Internal Wear Present?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_internal_wear}}'
        },
        {
          fieldName: 'hasBearingIssues',
          label: 'Bearing Issues / Noise?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_bearing_issues}}'
        },
        {
          fieldName: 'hasGearboxNoise',
          label: 'Gearbox Noise / Grinding?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_gearbox_noise}}'
        },
        {
          fieldName: 'hasMotorHeating',
          label: 'Motor Heating Issue?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_motor_heating}}'
        },
        {
          fieldName: 'hasOilLeakage',
          label: 'Oil Leakage?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_oil_leakage}}'
        },
        {
          fieldName: 'hasMissingAttachments',
          label: 'Missing Attachments/Accessories?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Mandatory disclosure',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_missing_attachments}}'
        },
        {
          fieldName: 'electricalRewiringDone',
          label: 'Electrical Rewiring Done?',
          type: 'checkbox',
          required: false,
          note: '⚠️ Safety hazard - must disclose',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{electrical_rewiring_done}}'
        },
        {
          fieldName: 'replacedParts',
          label: 'Major Parts Replaced?',
          type: 'text',
          required: false,
          placeholder: 'e.g., "Motor rewound", "Gearbox replaced", "PCB changed"',
          note: '⚠️ List all major repairs/replacements',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{replaced_parts}}'
        },
        {
          fieldName: 'defectPhotos',
          label: 'Defect/Issue Photos',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Close-ups of any issues mentioned above',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{defect_photos_hashes}}'
        }
      ]
    },
    {
      sectionId: 'section4_repairsService',
      sectionTitle: 'Service & Repair History',
      description: 'Complete service disclosure (FRAUD PREVENTION)',
      fields: [
        {
          fieldName: 'lastServiceDate',
          label: 'Last Service Date',
          type: 'date',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{last_service_date}}'
        },
        {
          fieldName: 'serviceProvider',
          label: 'Service Provider',
          type: 'text',
          required: false,
          placeholder: 'e.g., "Official service center", "Local technician"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{service_provider}}'
        },
        {
          fieldName: 'hasServiceBills',
          label: 'Service Bills Available?',
          type: 'checkbox',
          required: false,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{has_service_bills}}'
        },
        {
          fieldName: 'serviceBillsDocument',
          label: 'Upload Service Bills',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📄 Clear photos of official service bills',
          conditionalOn: 'hasServiceBills',
          conditionalValue: true,
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{service_bills_hashes}}'
        },
        {
          fieldName: 'majorRepairs',
          label: 'Major Repairs Done',
          type: 'multicheck',
          required: false,
          options: [
            'Motor rewinding',
            'Gearbox repaired/replaced',
            'PCB replaced',
            'Bearing replacement',
            'Oil seal replacement',
            'Belt/chain replacement',
            'Electrical rewiring',
            'Other'
          ],
          note: '⚠️ Check all applicable - non-disclosure = fraud',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{major_repairs}}'
        },
        {
          fieldName: 'repairBills',
          label: 'Upload Repair Bills/Invoices',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📄 Mandatory if major repairs selected',
          conditionalOn: 'majorRepairs',
          conditionalValue: 'hasAny',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{repair_bills_hashes}}'
        },
        {
          fieldName: 'warrantyLeft',
          label: 'Warranty Left (if any)',
          type: 'text',
          required: false,
          placeholder: 'e.g., "6 months", "None"',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{warranty_left}}'
        }
      ]
    },
    {
      sectionId: 'section5_sellerEvidence',
      sectionTitle: 'Mandatory Seller Evidence',
      description: 'Required videos and photos (7 mandatory uploads)',
      fields: [
        {
          fieldName: 'machineWalkaroundVideo',
          label: 'Full Machine Walkaround Video (MANDATORY)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Continuous (no cuts), min 720p. Show all sides, control panel, wiring, motor, serial plate close-up, fuel tank if applicable. Min 3 minutes.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{machine_walkaround_video_hash}}'
        },
        {
          fieldName: 'workingTestVideo',
          label: 'Working Test Video (MOST IMPORTANT)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Show: Machine turning ON, noise level, vibration, operational demo, output quality (sample), emergency stop test, temperature check. If unable to test → state reason in writing.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{working_test_video_hash}}'
        },
        {
          fieldName: 'nameplatePhoto',
          label: 'Nameplate/Serial Plate Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Close-up of nameplate showing brand, model, serial, voltage, power specs',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{nameplate_photo_hash}}'
        },
        {
          fieldName: 'motorPhoto',
          label: 'Motor Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show motor condition, wiring, any damage',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{motor_photo_hash}}'
        },
        {
          fieldName: 'gearboxPhoto',
          label: 'Gearbox / Main Mechanical Part Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show condition, any leakage, noise indicators',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{gearbox_photo_hash}}'
        },
        {
          fieldName: 'controlPanelPhoto',
          label: 'Control Panel Photo',
          type: 'file',
          fileType: 'image',
          required: true,
          note: '📸 Show all buttons, switches, display, LED indicators',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{control_panel_photo_hash}}'
        },
        {
          fieldName: 'accessoriesPhoto',
          label: 'Accessories / Tools Included Photo',
          type: 'file',
          fileType: 'image',
          required: false,
          note: '📸 Show all included items laid out',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{accessories_photo_hash}}'
        }
      ]
    },
    {
      sectionId: 'section6_buyerInspection',
      sectionTitle: 'Buyer Inspection Requirements',
      description: 'What buyer must provide after delivery',
      fields: [
        {
          fieldName: 'deliveryInspectionVideo',
          label: 'Delivery-Time Inspection Video (MANDATORY)',
          type: 'file',
          fileType: 'video',
          required: true,
          note: '🎥 Show: Unboxing/unloading, serial number verification, physical inspection, control panel, power-on attempt. Min 5 minutes.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{delivery_inspection_video_hash}}'
        },
        {
          fieldName: 'functionalTestVideo',
          label: 'Functional Test Video (if power available)',
          type: 'file',
          fileType: 'video',
          required: false,
          note: '🎥 Light load test, noise test, temperature check, safety switches. Helps prove working condition.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{functional_test_video_hash}}'
        },
        {
          fieldName: 'inspectionWindowConfirm',
          label: 'Inspection completed within window',
          type: 'checkbox',
          required: true,
          note: 'Confirm inspection within 6/12/24 hrs based on machine type',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{buyer_inspection_window_confirm}}'
        }
      ]
    },
    {
      sectionId: 'section7_pricing',
      sectionTitle: 'Price & Escrow',
      description: 'Transaction amount',
      fields: [
        {
          fieldName: 'price',
          label: 'Price',
          type: 'number',
          required: true,
          prefix: '₹',
          placeholder: '50000',
          note: 'Platform Fee (1%) will be auto-calculated. Remaining goes to escrow. HIGH VALUE = Extended escrow hold period.',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{price}}'
        },
        {
          fieldName: 'machineWeight',
          label: 'Approximate Weight (kg)',
          type: 'number',
          required: false,
          placeholder: '500',
          note: 'If >100kg: Additional verification + transport insurance required',
          dataSource: 'USER_INPUT',
          contractPlaceholder: '{{machine_weight}}'
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
      example: 'If price = ₹50,000, fee = ₹500',
      contractPlaceholder: '{{platform_fee}}'
    },
    {
      fieldName: 'escrowAmount',
      label: 'Escrow Amount',
      dataSource: 'AUTO-FETCHED',
      source: 'system_calculation',
      formula: 'price - platform_fee',
      example: 'If price = ₹50,000, escrow = ₹49,500',
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
      fieldName: 'inspectionWindowVariable',
      label: 'Inspection Window (Variable by Machine Type)',
      value: '6/12/24 hours',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_4',
      breakdown: {
        smallTools: '6 hours (small power tools, grinders)',
        mediumMachines: '12 hours (compressors, pumps, welders)',
        heavyMachinery: '24 hours (CNC, hydraulic press, industrial equipment, >100kg)'
      },
      contractSection: 'PART H — DELIVERY & INSPECTION PROTOCOL'
    },
    {
      fieldName: 'mandatorySellerDisclosures',
      label: 'Mandatory Seller Disclosures (HIGH RISK)',
      value: '9 critical fields',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_2_3',
      requirements: [
        'Machine identification: Name, Brand, Model, Serial (NON-NEGOTIABLE)',
        'Technical specs: Voltage, Phase, Power, Load, RPM',
        'Condition: Category + 8 checkbox items (wear, bearing, gearbox, heating, leakage, rewiring)',
        'Service history: Last service, repairs, bills',
        'Failure to disclose = FRAUD = Full refund + Blacklist + FIR'
      ]
    },
    {
      fieldName: 'serialNumberCritical',
      label: 'Serial Number Verification (CRITICAL)',
      value: 'Top industrial fraud indicator',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_implied',
      protections: [
        'Serial number must match nameplate photo',
        'Buyer must verify in delivery video',
        'Mismatch → immediate dispute favor to buyer',
        'Used to identify stolen/leased machines'
      ]
    },
    {
      fieldName: 'validDisputes',
      label: 'Valid Dispute Types (Industrial)',
      value: '7 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_5',
      types: [
        '✔ Machine does NOT turn on (dead motor, PCB failure)',
        '✔ Output not functioning (e.g., sealing machine not sealing)',
        '✔ Wrong model delivered (seller fraud)',
        '✔ Serial number mismatch (identity fraud)',
        '✔ Hidden defects: overheating, abnormal vibration, excessive noise, oil leakage',
        '✔ Incorrect voltage/phase not matching listing',
        '✔ Missing accessories (handles, drill bits, tool kits, manuals)'
      ]
    },
    {
      fieldName: 'invalidDisputes',
      label: 'Invalid Dispute Types (Industrial)',
      value: '7 types',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_6',
      types: [
        '❌ Buyer used wrong voltage/phase connection',
        '❌ Buyer overloaded machine beyond capacity',
        '❌ Buyer connected without stabilizer (voltage drop damage)',
        '❌ Cosmetic scratches already disclosed',
        '❌ Buyer operated incorrectly (user error)',
        '❌ Output test failed due to wrong raw material',
        '❌ Noise within normal operating limits'
      ]
    },
    {
      fieldName: 'escrowRules',
      label: 'Escrow Release Conditions',
      value: 'Fact-dependent for high-value items',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_7 + master_agreement_part_G',
      conditions: {
        releaseToSeller: [
          '→ Buyer fails to inspect within window',
          '→ Machine condition matches seller walkaround/working video',
          '→ Only cosmetic issues, no functional defects',
          '→ Buyer used machine incorrectly (evidence in videos)',
          '→ Buyer damaged during unloading (visible in delivery video)',
          '→ Buyer refuses to provide working test evidence'
        ],
        releaseToBuyer: [
          '→ Machine dead (won\'t power on)',
          '→ Serial/model mismatch (identity fraud)',
          '→ Heavy defects not disclosed (e.g., gearbox grinding)',
          '→ Wrong voltage or phase delivered',
          '→ Output not working (operational demo failed)',
          '→ Major mechanical issues (broken bearings, bent shafts, cracked body)'
        ]
      }
    },
    {
      fieldName: 'evidenceHierarchy',
      label: 'Evidence Hierarchy (Industrial)',
      value: 'Video (highest) > Photos > Claims',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'master_agreement_part_I + annexure_J',
      hierarchy: {
        workingTestVideo: 'STRONGEST evidence - seller walkaround + working demo proves condition',
        deliveryVideo: 'STRONG - buyer unboxing + serial verification + power-on test',
        nameplatePhotos: 'HIGH - serial number verification critical for fraud detection',
        claims: 'LOW - unsupported claims rejected. Must have video/photo proof.'
      }
    },
    {
      fieldName: 'heavyMachineryRule',
      label: 'Heavy Machinery Rule (>100kg)',
      value: 'Enhanced verification required',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_8',
      requirements: [
        'Platform requires additional seller verification photos',
        'Optional inspection at seller location (buyer arranged)',
        'Transport insurance mandatory (buyer or seller responsibility)',
        'Escrow hold extended 24-48 hours',
        'AI fraud detection triggered'
      ]
    },
    {
      fieldName: 'voltagePhaseProtection',
      label: 'Voltage & Phase Mismatch Protection',
      value: 'Critical for industrial items',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_2',
      protection: [
        'Voltage mismatch = buyer cannot use machine',
        'Phase mismatch (single vs 3-phase) = useless to buyer',
        'Seller must declare exact voltage/phase in listing',
        'Buyer can dispute if different from listing',
        'Proof: Nameplate photo + working test video'
      ]
    },
    {
      fieldName: 'fraudConsequences',
      label: 'Legal Consequences (Fraud)',
      value: 'If seller misrepresents condition/specs',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_9',
      consequences: [
        '→ Full refund to buyer',
        '→ Permanent seller blacklist',
        '→ Legal action under IPC 420 (criminal fraud)',
        '→ Compensation under Consumer Protection Act 2019',
        '→ Criminal case for serial misrepresentation',
        '→ Blacklist from all B2B platforms'
      ]
    },
    {
      fieldName: 'workingVideoMandatory',
      label: 'Working Video Mandatory',
      value: 'Most important seller evidence',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_3B',
      mustShow: [
        'Machine turning ON (proves power delivery works)',
        'Noise level (abnormal = defect)',
        'Vibration (abnormal = bearing/balance issue)',
        'Operational demonstration (proves functionality)',
        'Output quality (sample cutting/drilling/sealing)',
        'Emergency stop button test (safety critical)',
        'Temperature check (motor not overheating)'
      ],
      exception: 'If machine cannot be tested → seller must state reason in writing + full disclosure of issue'
    },
    {
      fieldName: 'buyerMisuse Protection',
      label: 'Buyer Misuse Protection',
      value: 'Prevents false claims after buyer error',
      dataSource: 'PLATFORM-DEFAULT',
      source: 'annexure_J_section_6 (invalid disputes)',
      protection: [
        'Seller walkaround + working video = baseline proof',
        'Buyer using wrong voltage → NOT seller fault',
        'Buyer overloading beyond capacity → NOT seller fault',
        'Buyer without stabilizer (voltage drop) → NOT seller fault',
        'Buyer delivery video proves condition on arrival',
        'Disputes inconsistent with seller video = rejected'
      ]
    }
  ],

  // ============================================================================
  // DISPUTE LOGIC REFERENCE
  // ============================================================================
  disputeLogic: {
    aiTriageFactors: [
      'Seller working video present? (NO = high fraud risk)',
      'Machine powers on in seller video? (NO = dead machine)',
      'Serial number visible in nameplate photo? (NO = suspicious)',
      'Buyer delivery video shows serial matches? (NO = wrong machine)',
      'Voltage/phase matches seller listing? (NO = buyer cannot use)',
      'Buyer delivery video within inspection window? (NO = missed deadline)',
      'Buyer damaged during transport? (Visible in delivery video)',
      'Machine operates in seller demo but not in buyer video? (Buyer misuse likely)',
      'Repair bills provided for claimed repairs? (YES = credible history)'
    ],
    fraudDetection: [
      'New serial number not matching old serial = stolen machine',
      'Model mismatch between listing and nameplate = wrong item',
      'Voltage different from listing = intentional fraud',
      'Heavy machinery without pre-inspection = high risk',
      'Missing working video = assumed non-working'
    ],
    mediation: 'Mandatory before arbitration (Mediation Act 2023)',
    arbitration: 'Final decision by arbitrator with technical knowledge'
  },

  // ============================================================================
  // CONTRACT POPULATION FLOWCHART
  // ============================================================================
  contractPopulationFlow: {
    step1_gatherUserInput: {
      description: 'Seller fills all 7 form sections (80+ fields)',
      dataSource: 'USER_INPUT',
      output: 'formData object with machine identity, specs, condition, repairs, evidence'
    },
    step2_fetchAutoFields: {
      description: 'System automatically fetches 18 fields',
      queries: [
        'SELECT * FROM users WHERE id = seller_id',
        'SELECT * FROM users WHERE id = buyer_id',
        'SELECT * FROM kyc_verification WHERE user_id IN (seller_id, buyer_id)',
        'GENERATE UUID for transaction_id',
        'CALCULATE platform_fee and escrow_amount',
        'Determine inspection window based on machine_weight'
      ],
      output: 'autoFetchedFields object'
    },
    step3_loadPlatformDefaults: {
      description: 'Load 12 sections of non-editable legal clauses',
      source: 'Master Agreement + Annexure J',
      output: 'platformDefaultFields with fraud detection + buyer misuse protection'
    },
    step4_combineAndPopulate: {
      description: 'Merge Master + Annexure J and populate placeholders',
      process: [
        '1. Load Master Agreement from DB',
        '2. Load Annexure J from DB',
        '3. Merge into single document',
        '4. Replace {{machine_name}}, {{price}}, {{serial_number}}, {{voltage_required}}, etc.',
        '5. Inject platform defaults with inspection window (6/12/24hrs based on weight)',
        '6. Calculate escrow hold period based on price/weight'
      ],
      output: 'Complete industrial contract with all safety/fraud protections'
    },
    step5_displayAndAcceptance: {
      description: 'Show in ContractModal with enhanced buyer protection',
      features: [
        'Tab-based: Full / Master / Annexure J',
        'Highlighted: Serial number, voltage, working video confirmation',
        'Buyer warning: "Verify serial before accepting"',
        'Seller acknowledgment: "I confirm no misrepresentation"',
        'Digital signature with timestamp',
        'Audit trail (IP, device, location)'
      ]
    }
  }
};

export default ANNEXURE_J_DATA_FLOW;

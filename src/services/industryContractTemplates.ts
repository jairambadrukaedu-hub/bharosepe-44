/**
 * INDUSTRY-SPECIFIC CONTRACT TEMPLATE GENERATOR
 * Generates contracts tailored to 6 industries with compliance to Indian law
 * Each template includes mandatory clauses, optional clauses, and evidence requirements
 */

import { IndustryType } from './industryDetectionService';

export interface ContractTemplate {
  industry: IndustryType;
  title: string;
  sections: ContractSection[];
  mandatoryClauses: string[];
  optionalClauses: string[];
  evidenceRequirements: EvidenceRequirement[];
  escrowConditions: EscrowCondition;
  nonReturnableItems?: string[];
  returnWindowDays?: number;
  warrantyDays?: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface ContractSection {
  heading: string;
  content: string;
  mandatoryForLegal: boolean;
}

export interface EvidenceRequirement {
  type: string;
  submittedBy: 'seller' | 'buyer';
  description: string;
  isRequired: boolean;
  timing: string;
}

export interface EscrowCondition {
  holdDays: number;
  autoReleaseHours: number;
  requiredEvidenceTypes: string[];
  releaseConditions: string[];
}

/**
 * ============================================================================
 * INDUSTRY 1: PHYSICAL PRODUCTS
 * ============================================================================
 */
export const PHYSICAL_PRODUCTS_TEMPLATE: ContractTemplate = {
  industry: 'physical_products',
  title: 'Agreement for Sale of Physical Product',
  riskLevel: 'high',
  returnWindowDays: 7,
  warrantyDays: 30,
  nonReturnableItems: [
    'Innerwear and personal hygiene items',
    'Opened cosmetics and perishable items',
    'Customized or personalized products',
    'Used or installed items',
    'Items without original packaging'
  ],

  sections: [
    {
      heading: '1. PARTIES AND IDENTIFICATION',
      content: `
        This Agreement is between:
        - Seller: ${'{seller_name}'} (Legal Name), verified PAN: ${'{seller_pan}'}
        - Buyer: ${'{buyer_name}'} (Legal Name), verified Mobile: ${'{buyer_mobile}'}
        - Platform: Bharose Pe Private Limited (Intermediary under IT Act Sec 79)
        
        Both parties confirm they are competent under Indian Contract Act, 1872 Section 11.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. PRODUCT DESCRIPTION AND AUTHENTICITY',
      content: `
        2.1 Product Details:
        - Model/Version: ${'{product_model}'}
        - Serial Number: ${'{serial_number}'}
        - Condition: ${'{condition}'} (New/Like-New/Refurbished/Used Grade A/B/C)
        - Accessories Included: ${'{accessories}'}
        - Certifications: ${'{certifications}'}
        
        2.2 Authenticity Declaration:
        Seller certifies and warrants that:
        (a) The product is genuine and not counterfeit
        (b) The product is not stolen, blacklisted, or flagged in any system
        (c) The product has not been tampered with or hacked
        (d) For phones: IMEI number is valid and not blocked
        
        Breach of authenticity warranty = Full refund + ₹5,000 penalty under Section 19 (1)(d), 
        Consumer Protection Act 2019.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. PRICING AND PAYMENT TERMS',
      content: `
        3.1 Total Amount: ₹${'{total_amount}'} inclusive of GST
        3.2 Platform Fee (1%): ₹${'{platform_fee}'}
        3.3 Escrow Hold: ₹${'{escrow_amount}'}
        
        3.4 Payment Method:
        - All payments via Bharose Pe escrow (no cash transactions)
        - Buyer's funds held in neutral escrow account per RBI guidelines
        
        3.5 GST:
        - Seller is registered with GST ID: ${'{gst_id}'}
        - Invoice will be issued post-transaction
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. DELIVERY TERMS',
      content: `
        4.1 Delivery Method: ${'{delivery_type}'} (Courier/Pickup/In-person)
        4.2 Expected Delivery Date: ${'{expected_delivery}'} (±2 days)
        
        4.3 Transit Risk:
        - Seller bears transit risk unless courier insurance is opted
        - Buyer assumes possession and risk upon OTP-verified delivery
        
        4.4 Proof of Delivery:
        - OTP-based acceptance by buyer
        - Video recording of handover (recommended for items >₹5,000)
        - Buyer must verify item at delivery time
        
        4.5 Delayed Delivery:
        - Beyond 7 days: Buyer may cancel and seek full refund
        - Beyond 15 days: Auto-cancellation with full refund + ₹500 compensation
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. UNBOXING AND INSPECTION PROTOCOL',
      content: `
        5.1 Buyer's Responsibilities:
        (a) Record continuous unboxing video (no cuts/edits) within 24 hours
        (b) Check serial number matches listing
        (c) Report defects within 24 hours of delivery
        (d) Without unboxing video, damage claims are invalid
        
        5.2 Damage Claims Procedure:
        - Buyer uploads unboxing video + defect photos within 24 hours
        - Seller has 48 hours to respond
        - Bharose Pe admin reviews evidence and decides
        
        5.3 False Damage Claims:
        - If buyer falsely claims damage after using product for 3+ days: 
          Claim rejected + no refund + seller retains amount
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. RETURN AND REFUND CONDITIONS',
      content: `
        6.1 Valid Return Reasons:
        (a) Product received does not match listing
        (b) Wrong item sent instead of ordered item
        (c) Visible damage during unboxing (within 24 hours)
        (d) Manufacturing defect confirmed via photos
        (e) Missing parts or incomplete package
        
        6.2 Non-Returnable Categories:
        - Innerwear, personal hygiene items
        - Opened cosmetics, perishable items
        - Custom or personalized products
        - Items showing signs of usage
        - Products installed or modified
        - Items without original packaging/serial number
        
        6.3 Return Process:
        (a) Buyer initiates return request within 7 days
        (b) Seller sends reverse courier link
        (c) Item must be in original condition with all accessories
        (d) Seller inspects received item within 2 days
        (e) Refund processed within 5 business days
        
        6.4 Refund Timeline:
        - Return approved: 5-7 business days
        - Return rejected: Buyer loses right to return after 7 days
        
        6.5 Return Fraud Prevention:
        - Seller may reject return if:
          • Different item is returned (serial number mismatch)
          • Product shows signs of usage
          • Original seals are broken
          • Items are missing/swapped
      `,
      mandatoryForLegal: true
    },
    {
      heading: '7. WARRANTY AND GUARANTEE',
      content: `
        7.1 Manufacturer Warranty:
        - Duration: ${'{warranty_period}'}
        - Coverage: Manufacturing defects per manufacturer terms
        - Excludes: Physical damage, water damage, misuse
        
        7.2 Seller Warranty:
        - Seller warrants product matches description
        - If defect found, replacement or refund within 7 days
        
        7.3 What Voids Warranty:
        (a) Unauthorized repairs or modifications
        (b) Water or physical damage
        (c) Using non-standard chargers/accessories
        (d) Third-party servicing
      `,
      mandatoryForLegal: true
    },
    {
      heading: '8. INDEMNITY AND LIABILITY',
      content: `
        8.1 Seller Indemnity:
        Seller indemnifies Buyer and Platform for:
        (a) Counterfeit or fake products
        (b) Safety hazards or defective products
        (c) Non-compliance with safety standards
        (d) False description or misrepresentation
        
        Amount: Full refund + ₹5,000-10,000 per Consumer Protection Act 2019
        
        8.2 Buyer Indemnity:
        Buyer indemnifies Seller and Platform for:
        (a) False damage claims
        (b) Non-cooperation during delivery
        (c) Refusing to receive item without valid reason
        (d) Product swap/replacement fraud
        
        8.3 Platform Liability Cap (IT Act Sec 79):
        - Platform is NOT liable for:
          • Quality of product
          • Delivery delays
          • Defects or damage
          • Disputes between parties
        
        - Platform's liability capped at: 1% of transaction amount OR ₹1,000 (whichever lower)
      `,
      mandatoryForLegal: true
    },
    {
      heading: '9. DISPUTE RESOLUTION (Mediation Act 2023)',
      content: `
        9.1 Escalation Hierarchy:
        Step 1: AI Review by Bharose Pe (48 hours)
        Step 2: Manual Review by Admin (24 hours)
        Step 3: Online Mediation (per The Mediation Act 2023)
        Step 4: Court proceedings (as last resort)
        
        9.2 Evidence for Dispute:
        - Unboxing video (if damage claim)
        - Chat/communication history
        - Proof of delivery (OTP/signature)
        - Photos with timestamps
        
        9.3 Binding Resolution:
        - Mediation decision is binding on both parties
        - Enforceable in court under Mediation Act 2023
        - Losing party bears mediation costs
      `,
      mandatoryForLegal: true
    },
    {
      heading: '10. LEGAL COMPLIANCE',
      content: `
        10.1 Governing Law:
        - Indian Contract Act, 1872
        - Sale of Goods Act, 1930
        - Consumer Protection Act, 2019
        - Information Technology Act, 2000 (Safe Harbor - Sec 79)
        - Legal Metrology Act (for weight/measurement accuracy)
        
        10.2 Applicable Standards:
        ${'{applicable_standards}'}
        
        10.3 Force Majeure:
        Seller not liable if delivery delayed due to:
        - Natural calamities (flood, earthquake)
        - Political unrest, strikes, curfew
        - Courier company issues beyond seller's control
        - Pandemic or government lockdown
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Product Description & Authenticity',
    'Pricing & GST Compliance',
    'Delivery Terms',
    'Unboxing Protocol',
    'Return Conditions',
    'Warranty',
    'Indemnity & Liability',
    'Dispute Resolution',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Extended Warranty (additional cost)',
    'Courier Insurance (additional cost)',
    'Priority Customer Support',
    'Trade-in Option',
    'Color/Size Variants Guarantee'
  ],

  evidenceRequirements: [
    {
      type: 'pre_dispatch_video',
      submittedBy: 'seller',
      description: '360° video of sealed product with visible serial number',
      isRequired: true,
      timing: 'Before dispatch (within 2 hours)'
    },
    {
      type: 'dispatch_photo',
      submittedBy: 'seller',
      description: 'Serial number clearly visible + courier receipt',
      isRequired: true,
      timing: 'At time of dispatch'
    },
    {
      type: 'unboxing_video',
      submittedBy: 'buyer',
      description: 'Continuous video recording entire unboxing process',
      isRequired: true,
      timing: 'Within 24 hours of delivery'
    },
    {
      type: 'defect_photo',
      submittedBy: 'buyer',
      description: 'Clear photos of defect with timestamp if damage claim',
      isRequired: false,
      timing: 'Within 24 hours of discovery'
    },
    {
      type: 'serial_number_photo',
      submittedBy: 'buyer',
      description: 'Serial number photo matching dispatch video',
      isRequired: true,
      timing: 'During unboxing video'
    }
  ],

  escrowConditions: {
    holdDays: 3,
    autoReleaseHours: 72,
    requiredEvidenceTypes: ['unboxing_video', 'serial_number_photo'],
    releaseConditions: [
      'Buyer OTP confirms delivery',
      'No damage claim within 24 hours',
      '72 hours passed with no dispute'
    ]
  }
};

/**
 * ============================================================================
 * INDUSTRY 2: SERVICES
 * ============================================================================
 */
export const SERVICES_TEMPLATE: ContractTemplate = {
  industry: 'services',
  title: 'Service Agreement',
  riskLevel: 'medium',
  returnWindowDays: 0,
  warrantyDays: 7,

  sections: [
    {
      heading: '1. PARTIES AND SERVICE DEFINITION',
      content: `
        Service Provider: ${'{provider_name}'}
        Service Category: ${'{service_category}'}
        Client: ${'{client_name}'}
        
        Scope of Work (SOW): ${'{scope_of_work}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. DELIVERABLES AND MILESTONES',
      content: `
        2.1 Deliverables:
        ${'{deliverables}'}
        
        2.2 Timeline:
        - Start Date: ${'{start_date}'}
        - Completion Date: ${'{completion_date}'}
        - Delivery Method: ${'{delivery_method}'}
        
        2.3 Revisions:
        - Number of included revisions: ${'{revision_count}'}
        - Additional revisions: ₹${'{revision_cost}'} each
        
        2.4 Exclusions:
        Work NOT included in scope:
        ${'{exclusions}'}
        
        Any work beyond SOW requires signed amendment and additional payment.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. SERVICE COMPLETION CRITERIA',
      content: `
        Service is considered complete when:
        (a) All deliverables as per SOW are submitted
        (b) Client reviews and approves OR
        (c) 7 days pass since submission without client objection
        
        Client must provide acceptance/rejection in writing within 7 days.
        Silence = acceptance.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. PAYMENT TERMS (MILESTONE-BASED)',
      content: `
        4.1 Total Service Fee: ₹${'{total_fee}'}
        4.2 Platform Fee (1%): ₹${'{platform_fee}'}
        
        4.3 Milestone Payments:
        ${'{milestone_payments}'}
        
        4.4 Payment Method:
        - Via Bharose Pe escrow (no direct payments)
        - Client payment held in escrow until completion
        - Released to provider upon milestone completion
        
        4.5 Payment Timeline:
        - Milestone reached → Platform holds payment
        - Provider submits proof → Payment released within 24 hours
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. CLIENT RESPONSIBILITIES',
      content: `
        5.1 Client must provide:
        (a) All required information, content, or materials
        (b) Timely feedback and approvals (within 3 days)
        (c) Safe working environment (if on-site service)
        (d) Clear instructions and specifications
        
        5.2 Delays caused by client:
        - Service provider may request timeline extension
        - Additional delays beyond 14 days = cancellation + partial refund
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. INTELLECTUAL PROPERTY AND CONFIDENTIALITY',
      content: `
        6.1 IP Rights:
        ${'{ip_terms}'}
        
        6.2 Confidentiality:
        Both parties agree to keep sensitive information confidential.
        
        6.3 Non-Compete (if applicable):
        ${'{non_compete_terms}'}
      `,
      mandatoryForLegal: false
    },
    {
      heading: '7. REFUND POLICY',
      content: `
        7.1 Refund Eligible ONLY Before Work Begins:
        - If cancelled before start date: Full refund
        
        7.2 Partial Refund (Work In Progress):
        - If cancelled after 25% completion: 75% refund
        - If cancelled after 50% completion: 50% refund
        - If cancelled after 75% completion: 25% refund
        
        7.3 No Refund After Completion:
        - Service completed = No refund
        - Client must provide feedback within 7 days for modifications
      `,
      mandatoryForLegal: true
    },
    {
      heading: '8. DISPUTE RESOLUTION',
      content: `
        8.1 Quality Disputes:
        - Client disputes quality → Evidence required (screenshots, feedback)
        - Provider can request revision (within included revision count)
        - If client not satisfied after revisions → Escalate to mediation
        
        8.2 Payment Disputes:
        - If provider not paid → Auto-escalate after 5 days
        - If client claims non-delivery → Evidence review within 48 hours
      `,
      mandatoryForLegal: true
    },
    {
      heading: '9. LEGAL COMPLIANCE',
      content: `
        9.1 Governing Law: Indian Contract Act, 1872
        9.2 GST Compliance: 18% GST on services >₹5,000 (if applicable)
        9.3 Labor Laws: Service provider confirms compliance with labor regulations
        9.4 Safety Compliance: For on-site services, follows safety guidelines
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Service Definition & SOW',
    'Deliverables & Timeline',
    'Completion Criteria',
    'Milestone-Based Payment',
    'Client Responsibilities',
    'Refund Policy',
    'Dispute Resolution',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Intellectual Property Transfer',
    'Confidentiality/NDA',
    'Non-Compete Clause',
    'Extended Support Period',
    'Service Level Agreement (SLA)'
  ],

  evidenceRequirements: [
    {
      type: 'work_checklist',
      submittedBy: 'seller',
      description: 'Completed task checklist confirming all SOW items done',
      isRequired: true,
      timing: 'Upon completion'
    },
    {
      type: 'service_completion_video',
      submittedBy: 'seller',
      description: 'Video/screenshots showing completed work',
      isRequired: true,
      timing: 'Upon completion'
    },
    {
      type: 'before_after_photo',
      submittedBy: 'seller',
      description: 'Before and after photos for visibility',
      isRequired: false,
      timing: 'Upon completion'
    },
    {
      type: 'signature_slip',
      submittedBy: 'buyer',
      description: 'Client sign-off or written acceptance',
      isRequired: true,
      timing: 'Within 7 days of completion'
    }
  ],

  escrowConditions: {
    holdDays: 7,
    autoReleaseHours: 168,
    requiredEvidenceTypes: ['work_checklist', 'service_completion_video'],
    releaseConditions: [
      'All SOW deliverables submitted',
      'Client does not object within 7 days',
      'Work quality passes initial review'
    ]
  }
};

/**
 * ============================================================================
 * INDUSTRY 3: DIGITAL GOODS
 * ============================================================================
 */
export const DIGITAL_GOODS_TEMPLATE: ContractTemplate = {
  industry: 'digital_goods',
  title: 'Digital Goods License Agreement',
  riskLevel: 'low',

  sections: [
    {
      heading: '1. DIGITAL PRODUCT DETAILS',
      content: `
        Product: ${'{product_name}'}
        Format: ${'{format}'} (PDF, Video, Software, Template, etc.)
        License Type: ${'{license_type}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. NO REFUND POLICY',
      content: `
        IMPORTANT: Digital goods cannot be refunded once accessed or downloaded.
        
        By proceeding with purchase, you acknowledge:
        ✓ Product cannot be returned
        ✓ No refund after download/access
        ✓ This is final and non-negotiable
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. LICENSE GRANT',
      content: `
        3.1 License Type: ${'{license_scope}'} (Personal/Commercial)
        
        3.2 You are licensed to:
        ✓ Download and use for personal/commercial purposes
        ✓ Use on ${'{device_count}'} device(s)
        ✓ Access for ${'{duration}'}
        
        3.3 You are NOT licensed to:
        ✗ Resell, redistribute, or share
        ✗ Upload to public platforms
        ✗ Use for mass production
        ✗ Reverse engineer or modify
        ✗ Claim authorship
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. INTELLECTUAL PROPERTY PROTECTION',
      content: `
        4.1 IP Ownership:
        All intellectual property rights remain with seller.
        
        4.2 Anti-Piracy:
        Violation = ₹50,000+ penalty per Copyright Act 1957 Section 51
        + Criminal prosecution possible
        
        4.3 Unauthorized Distribution Consequences:
        - Notice to remove from illegal platforms
        - DMCA takedown enforcement
        - Legal action under IT Act 2000
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. DELIVERY AND ACCESS',
      content: `
        5.1 Instant Access:
        Download link emailed immediately upon payment.
        
        5.2 Access Duration:
        ${'{access_duration}'}
        
        5.3 File Corruption:
        If file corrupted, seller provides replacement download once.
        
        5.4 No Liability for Incompatibility:
        Seller not liable if product doesn't work with your device/software.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. LEGAL COMPLIANCE',
      content: `
        Governed by:
        - Copyright Act, 1957
        - Information Technology Act, 2000
        - Consumer Protection Act, 2019
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Product Details',
    'No Refund Policy',
    'License Grant',
    'IP Protection',
    'Delivery & Access',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Extended License Duration',
    'Commercial Use Rights',
    'Group License Pricing'
  ],

  evidenceRequirements: [
    {
      type: 'other_document',
      submittedBy: 'seller',
      description: 'Download link delivery confirmation',
      isRequired: true,
      timing: 'Immediately after payment'
    }
  ],

  escrowConditions: {
    holdDays: 1,
    autoReleaseHours: 24,
    requiredEvidenceTypes: [],
    releaseConditions: [
      'Download link accessed by buyer',
      '24 hours passed'
    ]
  }
};

/**
 * ============================================================================
 * INDUSTRY 4: CUSTOM/MADE-TO-ORDER
 * ============================================================================
 */
export const CUSTOM_MADE_ORDER_TEMPLATE: ContractTemplate = {
  industry: 'custom_made_order',
  title: 'Custom Product Manufacturing Agreement',
  riskLevel: 'high',
  returnWindowDays: 0,

  sections: [
    {
      heading: '1. PRODUCT SPECIFICATIONS',
      content: `
        Custom Product: ${'{product_description}'}
        Specifications:
        ${'{specifications}'}
        
        Customer has reviewed and approved sample/mockup.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. DESIGN APPROVAL PROCESS',
      content: `
        2.1 Design Process:
        - Designer submits initial design
        - Customer reviews within 3 days
        - Up to ${'{revision_count}'} revisions included
        
        2.2 Design Approval:
        - FINAL approved design = binding commitment
        - No changes after approval unless additional payment
        
        2.3 Design Ownership:
        - Until paid in full, design rights remain with seller
        - After payment, design rights transfer to buyer (unless stipulated)
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. PAYMENT TERMS',
      content: `
        3.1 Total Cost: ₹${'{total_cost}'}
        
        3.2 Payment Schedule:
        - Advance (Non-refundable): ₹${'{advance_payment}'} (${'{advance_percent}'}%)
        - On Approval: ₹${'{approval_payment}'} (${'{approval_percent}'}%)
        - On Delivery: ₹${'{delivery_payment}'} (${'{delivery_percent}'}%)
        
        3.3 Important:
        Advance payment is NON-REFUNDABLE once production begins.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. MANUFACTURING TIMELINE',
      content: `
        4.1 Production Timeline:
        - Design Approval: ${'{design_timeline}'}
        - Manufacturing Start: ${'{production_start}'}
        - Expected Delivery: ${'{delivery_date}'} (±${'{delivery_buffer}'} days)
        
        4.2 Delays:
        - Seller must notify if delay expected
        - Delays >14 days: Customer may cancel with ${'{refund_percent}'}% refund
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. CANCELLATION & NO-RETURN POLICY',
      content: `
        5.1 NO CANCELLATION AFTER PRODUCTION BEGINS:
        ✗ Once manufacturing starts, NO cancellation allowed
        ✗ Customer must accept delivery
        
        5.2 Cancellation Before Production:
        - Can cancel if approved within 48 hours
        - 100% refund of payment
        
        5.3 NO RETURNS:
        This is a custom product. Returns not applicable.
        Customer may not refuse delivery due to:
        - Change of mind
        - Finding lower price elsewhere
        - Minor color/texture variation within tolerance
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. QUALITY AND DEFECTS',
      content: `
        6.1 Material Defects:
        If product has manufacturing defect:
        - Must be reported within 3 days of delivery
        - Seller provides replacement or refund
        
        6.2 Acceptable Variations:
        - Color shade ±5% variation acceptable
        - Texture slight variations acceptable
        - Size ±2mm tolerance acceptable
        
        6.3 Minor Imperfections:
        Handmade products may have minor imperfections.
        This is NORMAL and NOT grounds for return.
      `,
      mandatoryForLegal: true
    },
    {
      heading: '7. DELIVERY AND ACCEPTANCE',
      content: `
        7.1 Customer must accept delivery within ${'{delivery_window}'} days.
        
        7.2 If rejected without valid reason:
        - Seller retains full payment
        - OR customer pays for storage
        
        7.3 Delivery method: ${'{delivery_method}'}
        Delivery cost: ₹${'{delivery_cost}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '8. LEGAL COMPLIANCE',
      content: `
        Governed by:
        - Indian Contract Act, 1872
        - Consumer Protection Act, 2019 (with custom goods exceptions)
        - Sale of Goods Act, 1930
        
        Note: Custom goods have limited consumer protection per CPA 2019 Sec 2(3).
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Product Specifications',
    'Design Approval',
    'Payment Terms',
    'Manufacturing Timeline',
    'No Cancellation Policy',
    'Quality Standards',
    'Delivery & Acceptance',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Expedited Production (additional cost)',
    'Unlimited Revisions (additional cost)',
    'Design Ownership Transfer',
    'Bulk Customization Pricing'
  ],

  evidenceRequirements: [
    {
      type: 'service_completion_video',
      submittedBy: 'seller',
      description: 'Video showing completed custom product',
      isRequired: true,
      timing: 'Before dispatch'
    },
    {
      type: 'before_after_photo',
      submittedBy: 'seller',
      description: 'Before and after photos of custom work',
      isRequired: true,
      timing: 'Before dispatch'
    },
    {
      type: 'signature_slip',
      submittedBy: 'buyer',
      description: 'Delivery acceptance or OTP confirmation',
      isRequired: true,
      timing: 'At delivery'
    }
  ],

  escrowConditions: {
    holdDays: 5,
    autoReleaseHours: 120,
    requiredEvidenceTypes: ['service_completion_video', 'signature_slip'],
    releaseConditions: [
      'Product delivered and accepted',
      'Delivery confirmation received',
      'No defect claims within 3 days'
    ]
  }
};

/**
 * ============================================================================
 * INDUSTRY 5: LOGISTICS / DELIVERY SERVICES
 * ============================================================================
 */
export const LOGISTICS_TEMPLATE: ContractTemplate = {
  industry: 'logistics',
  title: 'Courier & Logistics Services Agreement',
  riskLevel: 'medium',

  sections: [
    {
      heading: '1. SHIPMENT DETAILS',
      content: `
        Shipper: ${'{shipper_name}'}
        Recipient: ${'{recipient_name}'}
        Courier Provider: ${'{courier_name}'}
        
        Shipment Details:
        - Contents: ${'{contents}'}
        - Weight: ${'{weight}'} kg
        - Dimensions: ${'{dimensions}'}
        - Value: ₹${'{value}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. DELIVERY TERMS',
      content: `
        2.1 Pick-up Location: ${'{pickup_location}'}
        Pick-up Date: ${'{pickup_date}'}
        
        2.2 Drop-off Location: ${'{dropoff_location}'}
        Expected Delivery: ${'{expected_delivery}'} business days
        
        2.3 Handling:
        - Fragile items marked and handled carefully
        - Perishables: Special handling (${'{special_handling_cost}'} extra)
        - Hazardous items: Not accepted
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. LIABILITY AND DAMAGE',
      content: `
        3.1 Courier Liability:
        - Damage claims limited to insurance coverage
        - No liability for delays due to traffic/weather
        - Declared value maximum: ₹${'{max_liability}'}
        
        3.2 Insurance Options:
        - Basic (No insurance): ₹0 extra
        - Standard Insurance: ₹${'{std_insurance}'}} (covers ₹${'{std_coverage}'})
        - Full Insurance: ₹${'{full_insurance}'}} (covers 100% value)
        
        3.3 Damage Claim Procedure:
        - Report within 24 hours
        - Provide photos + original invoice
        - Claim approved within 48 hours
        - Payment within 5 business days
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. DELIVERY CONFIRMATION',
      content: `
        4.1 Successful Delivery Proof:
        - OTP verification OR
        - Recipient signature OR
        - Photo of delivered item
        
        4.2 Attempted Delivery:
        - If recipient unavailable, ${'{reattempt_policy}'}
        - Return-to-origin charges: ₹${'{rto_charges}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. PAYMENT TERMS',
      content: `
        Shipping Cost: ₹${'{shipping_cost}'}
        Insurance (if opted): ₹${'{insurance_cost}'}
        Total: ₹${'{total_cost}'}
        
        Payment: Via Bharose Pe escrow OR prepaid
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. LEGAL COMPLIANCE',
      content: `
        - Motor Vehicles Act, 1988
        - Courier & Logistics regulations
        - GST compliance (if applicable)
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Shipment Details',
    'Delivery Terms',
    'Liability & Damage',
    'Delivery Confirmation',
    'Payment Terms',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Insurance Coverage',
    'Scheduled Delivery Time',
    'Premium Packaging',
    'Real-time Tracking'
  ],

  evidenceRequirements: [
    {
      type: 'signature_slip',
      submittedBy: 'buyer',
      description: 'OTP-confirmed delivery or signed receipt',
      isRequired: true,
      timing: 'At delivery'
    },
    {
      type: 'other_document',
      submittedBy: 'seller',
      description: 'Tracking number and courier receipt',
      isRequired: true,
      timing: 'At dispatch'
    }
  ],

  escrowConditions: {
    holdDays: 2,
    autoReleaseHours: 48,
    requiredEvidenceTypes: ['signature_slip'],
    releaseConditions: [
      'OTP delivery confirmation received',
      '48 hours passed',
      'No damage claim filed'
    ]
  }
};

/**
 * ============================================================================
 * INDUSTRY 6: HOME SERVICES
 * ============================================================================
 */
export const HOME_SERVICES_TEMPLATE: ContractTemplate = {
  industry: 'home_services',
  title: 'Home Services Agreement',
  riskLevel: 'medium',

  sections: [
    {
      heading: '1. SERVICE PROVIDER AND HOMEOWNER',
      content: `
        Service Provider: ${'{provider_name}'} (License: ${'{license_number}'})
        Homeowner/Client: ${'{client_name}'}
        Property Address: ${'{property_address}'}
      `,
      mandatoryForLegal: true
    },
    {
      heading: '2. SERVICE SCOPE',
      content: `
        Service Type: ${'{service_type}'}
        Service Description: ${'{service_description}'}
        
        Schedule:
        Date: ${'{service_date}'}
        Time: ${'{service_time}'}
        Duration: ${'{duration}'} hours
      `,
      mandatoryForLegal: true
    },
    {
      heading: '3. TOOLS AND MATERIALS',
      content: `
        3.1 Provider Brings:
        ${'{provider_supplies}'}
        
        3.2 Client Must Provide:
        ${'{client_supplies}'}
        
        3.3 Materials Not Included:
        Any additional materials required → ₹${'{additional_cost}'} extra
      `,
      mandatoryForLegal: true
    },
    {
      heading: '4. PRICING AND PAYMENT',
      content: `
        Service Cost: ₹${'{service_cost}'}}
        Material Cost: ₹${'{material_cost}'}} (if applicable)
        Total: ₹${'{total_cost}'}
        
        Payment method: ${'{payment_method}'} OR cash on completion
      `,
      mandatoryForLegal: true
    },
    {
      heading: '5. DAMAGE LIABILITY',
      content: `
        5.1 Provider Liability:
        Provider responsible for damage caused by negligence.
        Provider must have personal injury/property damage insurance.
        
        5.2 Client Responsibility:
        Client responsible for:
        - Clearing workspace
        - Providing safe access
        - Protecting valuables
        
        5.3 Damage Claim Procedure:
        - Report within 24 hours
        - Provide photos/evidence
        - Insurance claim filed within 48 hours
      `,
      mandatoryForLegal: true
    },
    {
      heading: '6. HEALTH AND SAFETY',
      content: `
        6.1 Provider confirms:
        ✓ Vaccinated against COVID-19 (if applicable)
        ✓ Will use mask/PPE if required
        ✓ Will follow hygiene protocols
        ✓ No smoking/alcohol during service
        
        6.2 Client confirms:
        ✓ Property is safe for service
        ✓ No hazardous conditions
        ✓ Will not interfere with work
      `,
      mandatoryForLegal: true
    },
    {
      heading: '7. SERVICE QUALITY AND ACCEPTANCE',
      content: `
        7.1 Service Completion:
        Client must verify work within 24 hours.
        If satisfied → no refund (service consumed).
        
        7.2 Defects:
        If poor quality discovered:
        - Report within 3 days
        - Provider has 5 days to fix
        - If not fixed → partial refund ₹${'{refund_amount}'}
        
        7.3 No Refund After Completion:
        Service provided = consumed (no refund).
      `,
      mandatoryForLegal: true
    },
    {
      heading: '8. LEGAL COMPLIANCE',
      content: `
        - Indian Labor Laws
        - Safety compliance per industry standards
        - GST compliance (services > ₹5,000)
        - Municipal licensing requirements
      `,
      mandatoryForLegal: true
    }
  ],

  mandatoryClauses: [
    'Service Provider & Client',
    'Service Scope',
    'Tools & Materials',
    'Pricing',
    'Damage Liability',
    'Health & Safety',
    'Service Quality',
    'Legal Compliance'
  ],

  optionalClauses: [
    'Extended Warranty on Work',
    'Premium Service Level',
    'Periodic Maintenance Plan',
    'Material Upgrade Options'
  ],

  evidenceRequirements: [
    {
      type: 'before_after_photo',
      submittedBy: 'seller',
      description: 'Before and after photos of completed work',
      isRequired: true,
      timing: 'Upon completion'
    },
    {
      type: 'signature_slip',
      submittedBy: 'buyer',
      description: 'Client sign-off confirming service completion',
      isRequired: true,
      timing: 'Upon completion'
    }
  ],

  escrowConditions: {
    holdDays: 1,
    autoReleaseHours: 24,
    requiredEvidenceTypes: ['before_after_photo', 'signature_slip'],
    releaseConditions: [
      'Before/after photos submitted',
      'Client sign-off received',
      '24 hours passed without complaint'
    ]
  }
};

/**
 * TEMPLATE MAPPING
 */
export const INDUSTRY_TEMPLATES: Record<IndustryType, ContractTemplate> = {
  physical_products: PHYSICAL_PRODUCTS_TEMPLATE,
  services: SERVICES_TEMPLATE,
  digital_goods: DIGITAL_GOODS_TEMPLATE,
  custom_made_order: CUSTOM_MADE_ORDER_TEMPLATE,
  logistics: LOGISTICS_TEMPLATE,
  home_services: HOME_SERVICES_TEMPLATE
};

/**
 * Get contract template for industry
 */
export function getContractTemplate(industry: IndustryType): ContractTemplate {
  return INDUSTRY_TEMPLATES[industry];
}

/**
 * Generate contract HTML from template with data substitution
 */
export function generateContractHTML(
  industry: IndustryType,
  contractData: Record<string, any>
): string {
  const template = getContractTemplate(industry);
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${template.title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 900px; margin: 20px; }
        h1 { text-align: center; color: #333; }
        h2 { color: #2c3e50; margin-top: 20px; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        .disclaimer { background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107; margin: 15px 0; }
        .footer { margin-top: 40px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <h1>${template.title}</h1>
  `;

  // Add all sections with data substitution
  template.sections.forEach(section => {
    let content = section.content;
    
    // Replace all ${'{key}'} placeholders with actual data
    Object.entries(contractData).forEach(([key, value]) => {
      const regex = new RegExp(`\\$\\{\\s*'${key}'\\s*\\}`, 'g');
      content = content.replace(regex, String(value || ''));
    });

    html += `
      <h2>${section.heading}</h2>
      <p>${content}</p>
    `;
  });

  html += `
    <div class="footer">
      <p><strong>Generated by Bharose Pe</strong></p>
      <p>This is a binding legal agreement. Both parties must read and understand all terms before signing.</p>
      <p>For disputes, mediation will be conducted per The Mediation Act, 2023.</p>
    </div>
    </body>
    </html>
  `;

  return html;
}

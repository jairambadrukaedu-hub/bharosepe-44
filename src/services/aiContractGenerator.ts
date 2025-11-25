/**
 * AI Contract Generator
 * Generates professional contracts using AI based on Indian laws
 * Integrates with all industry templates
 */

import { GOODS_INDUSTRY_TEMPLATES, IndustryTemplate } from './goodsIndustryTemplates';
import { UserProfile } from './profileService';

export interface ContractGenerationRequest {
  buyerProfile: UserProfile | null;
  sellerProfile: UserProfile | null;
  transactionTitle: string;
  transactionDescription: string;
  industryType: string;
  formData: Record<string, any>;
  template: IndustryTemplate;
}

export interface GeneratedContract {
  contractId: string;
  title: string;
  generatedAt: string;
  content: string;
  summary: string;
  mandatoryClauses: string[];
  applicableLaws: string[];
}

/**
 * Generate AI-powered contract based on collected data and Indian laws
 */
export const generateContractFromTemplate = async (request: ContractGenerationRequest): Promise<GeneratedContract> => {
  const {
    buyerProfile,
    sellerProfile,
    transactionTitle,
    transactionDescription,
    industryType,
    formData,
    template
  } = request;

  const priceValue = formData.price || formData.totalPrice || formData.amount || 0;
  console.log('🔄 Generating contract with request:', {
    transactionTitle,
    industryType,
    price: priceValue,
    priceFields: { price: formData.price, totalPrice: formData.totalPrice, amount: formData.amount },
    hasFormData: !!formData,
    hasTemplate: !!template,
    buyerEmail: buyerProfile?.email,
    sellerEmail: sellerProfile?.email
  });

  try {
    // Build contract content
    const contractContent = buildContractDocument(
      buyerProfile,
      sellerProfile,
      transactionTitle,
      transactionDescription,
      industryType,
      formData,
      template
    );

    console.log('✅ Contract content built successfully');

    // Extract mandatory clauses and applicable laws
    const mandatoryClauses = extractMandatoryClauses(template, formData);
    const applicableLaws = extractApplicableLaws(template);

    console.log('✅ Extracted clauses and laws');

    // Generate summary
    const summary = generateContractSummary(transactionTitle, formData, template);

    console.log('✅ Contract summary generated');

    return {
      contractId: `CONTRACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${transactionTitle} - Contract Agreement`,
      generatedAt: new Date().toISOString(),
      content: contractContent,
      summary,
      mandatoryClauses,
      applicableLaws
    };
  } catch (error: any) {
    console.error('❌ Error in generateContractFromTemplate:', error);
    throw new Error(`Contract generation failed: ${error?.message || 'Unknown error'}`);
  }
};

/**
 * Build professional contract document
 */
const buildContractDocument = (
  buyerProfile: UserProfile | null,
  sellerProfile: UserProfile | null,
  transactionTitle: string,
  transactionDescription: string,
  industryType: string,
  formData: Record<string, any>,
  template: IndustryTemplate
): string => {
  const contractDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let contract = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                    PROFESSIONAL SERVICE AGREEMENT                              ║
║                         BHAROSE PE PLATFORM                                    ║
╚════════════════════════════════════════════════════════════════════════════════╝

Date: ${contractDate}
Contract Type: ${template.name.toUpperCase()}
Governed by: Indian Contract Act 1872 & Consumer Protection Act 2019

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 1: PARTIES TO THE CONTRACT

SELLER (Service Provider/Seller):
${formatPartyDetails(sellerProfile, 'seller')}

BUYER (Client/Buyer):
${formatPartyDetails(buyerProfile, 'buyer')}

TRANSACTION IDENTIFIER:
   Title: ${transactionTitle}
   Description: ${transactionDescription}
   Platform Reference: BHAROSE-PE-${Date.now()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 2: SUBJECT MATTER & SCOPE

ITEM/SERVICE DESCRIPTION:
${formData.itemDescription || 'As per transaction details'}

SCOPE & SPECIFICATIONS:
${buildScopeSection(formData, template)}

DELIVERABLES/DELIVERIES:
${buildDeliverablesSection(formData, template)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 3: FINANCIAL TERMS & ESCROW

TOTAL TRANSACTION VALUE: ₹ ${formatCurrency(formData.price || formData.totalPrice || formData.amount || 0)}

ESCROW DETAILS:
   • Entire transaction amount shall be held in escrow by Bharose PE platform
   • Platform Fee: 1% of transaction value = ₹ ${formatCurrency(Math.floor((parseFloat(formData.price || formData.totalPrice || formData.amount || 0)) * 0.01))}
   • Escrow Amount: ₹ ${formatCurrency(parseFloat(formData.price || formData.totalPrice || formData.amount || 0) - Math.floor((parseFloat(formData.price || formData.totalPrice || formData.amount || 0)) * 0.01))}
   • Liability Cap: ₹ 1,000 or 1% of transaction value (whichever is higher)

ESCROW RELEASE CONDITIONS:
${buildEscrowReleaseConditions(template, formData)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 4: TIMELINE & DELIVERY OBLIGATIONS

DELIVERY/COMPLETION DATE: ${formData.deliveryDate || 'As per discussions'}

DELIVERY MODE: ${formatDeliveryMode(formData.deliveryMode)}

TIMELINES & MILESTONES:
${buildTimelineSection(formData, template)}

DELAY PENALTY (if applicable):
If delivery is delayed beyond the agreed date, the following shall apply:
   • Seller is liable for breach of contract under Indian Contract Act 1872 Section 73
   • Buyer may claim damages as per contract
   • Disputes will be resolved through platform mediation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 5: TERMS & CONDITIONS

INSPECTION WINDOW:
   • Buyer has ${formData.inspectionWindow || '24'} hours after delivery to inspect
   • Disputes must be raised within this period with photographic evidence
   • After window expires, product/service is deemed accepted

RETURN POLICY:
${buildReturnPolicySection(formData)}

WARRANTY & GUARANTEES:
${buildWarrantySection(formData, template)}

BUYER RESPONSIBILITIES:
${formData.buyerResponsibilities || buildDefaultBuyerResponsibilities(template)}

SELLER RESPONSIBILITIES:
${formData.sellerResponsibilities || buildDefaultSellerResponsibilities(template)}

SPECIAL TERMS & CONDITIONS:
${buildAllFormFields(formData)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 6: MANDATORY LEGAL CLAUSES (INDIAN CONTRACT LAW)

1. OFFERS & ACCEPTANCE (Indian Contract Act 1872, Section 1-7)
   This contract constitutes an offer by the Seller and acceptance by the Buyer.
   All terms herein are binding unless modified in writing by both parties.

2. CONSIDERATION (Indian Contract Act 1872, Section 2)
   For the Seller: Receiving the agreed consideration (₹ ${formatCurrency(formData.price || formData.totalPrice || formData.amount || 0)})
   For the Buyer: Receiving the item/service as described

3. CAPACITY (Indian Contract Act 1872, Section 11)
   Both parties confirm they are of sound mind, legal age, and authorized to enter this contract.

4. LEGALITY & PUBLIC POLICY (Indian Contract Act 1872, Section 23-24)
   This contract is for lawful purpose and does not violate public policy.

5. FREE CONSENT (Indian Contract Act 1872, Section 13-15)
   This contract is entered into with free consent, without coercion or undue influence.

6. WARRANTY OF TITLE & QUALITY (Sale of Goods Act 1930)
   Seller warrants that goods/services are as described and free from defects.
   Seller warrants that they have rights to sell/provide the item/service.

7. CONSUMER PROTECTION (Consumer Protection Act 2019)
   ${buildConsumerProtectionClause(template)}

8. FORCE MAJEURE CLAUSE
   Neither party is liable for failure to perform due to:
   • Natural disasters, earthquakes, floods
   • War, terrorism, civil unrest
   • Pandemics or government restrictions
   • Events beyond reasonable control
   
   The affected party must notify within 24 hours and provide evidence.

9. LIABILITY LIMITATION (Bharose PE Platform Policy)
   Total liability capped at ₹ 1,000 or 1% of transaction value.
   This protects both parties from unlimited damages.
   Platform bears no liability for losses unless caused by platform negligence.

10. DISPUTE RESOLUTION (Mediation Act 2023)
    First attempt: Mediation through Bharose PE platform (free)
    If mediation fails: Arbitration as per Arbitration and Conciliation Act 1996
    Jurisdiction: ${formData.jurisdiction || 'State courts in transaction location'}

11. TERMINATION & BREACH (Indian Contract Act 1872, Section 37-40)
    • Either party may terminate if other party breaches material terms
    • 7-day notice period must be given to cure breach
    • Breach of escrow terms results in immediate dispute escalation

12. INDEMNITY & LIABILITY
    Each party indemnifies the other against claims arising from their breach.
    Seller indemnifies Buyer against IP infringement claims (if applicable).

13. MODIFICATION & AMENDMENTS
    Any changes to this contract must be in writing and signed by both parties.
    Verbal agreements are not binding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 7: EVIDENCE & PROOF REQUIREMENTS

For Dispute Resolution, the following proof is MANDATORY:

PHOTOGRAPHIC EVIDENCE:
${buildEvidenceRequirements(template, formData)}

OTHER PROOF:
   • SMS/Chat conversations between parties
   • Transaction receipts and payment confirmations
   • Delivery receipts or shipping proofs
   • Any written communications regarding the transaction

PURPOSE:
   Evidence proves the transaction occurred, terms were agreed, and delivery status.
   This protects both parties in case of disputes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART 8: SIGNATURES & ACCEPTANCE

By clicking "Accept & Create Contract" on Bharose PE platform, both parties:

1. Confirm they have read and understood all terms
2. Agree to be bound by this contract
3. Acknowledge receipt of a copy (available in dashboard)
4. Accept the escrow arrangement
5. Agree to submit disputes through platform mediation
6. Confirm all information provided is true and accurate

SELLER SIGNATURE/ACCEPTANCE:
{{seller_name}} ..............................
Verified on: Bharose PE Platform

BUYER SIGNATURE/ACCEPTANCE:
{{buyer_name}} ..............................
Verified on: Bharose PE Platform

PLATFORM WITNESS:
Bharose PE Limited ..............................
Registered Date: {{contract_generated_at}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT NOTICES

1. PRESERVE THIS CONTRACT: Download and save a copy for your records.

2. ESCROW SAFETY: Your money is safe in escrow until you confirm receipt.

3. MEDIATION IS FREE: If dispute arises, use platform mediation first (no fees).

4. MANDATORY PROOF: Keep photos/videos during delivery. Share on platform if needed.

5. TIME SENSITIVE: All disputes must be raised within inspection window.

6. DISPUTE ESCALATION: After mediation fails, disputes go to arbitration (as per Mediation Act 2023).

╔════════════════════════════════════════════════════════════════════════════════╗
║                  END OF CONTRACT - LEGALLY BINDING AGREEMENT                   ║
╚════════════════════════════════════════════════════════════════════════════════╝
`;

    return contract;
  };

/**
 * Helper: Format party details with template variables
 */
const formatPartyDetails = (profile: UserProfile | null, role: string): string => {
  const prefix = role === 'seller' ? 'seller' : 'buyer';
  
  // Clean formatting with proper line breaks and indentation
  const lines = [
    'Name: {{' + prefix + '_name}}',
    'Email: {{' + prefix + '_email}}',
    'Phone: {{' + prefix + '_phone}}',
    'Address: {{' + prefix + '_address}}',
    'Verification: ' + (profile?.verified ? '✓ Phone Verified' : '⚠ Unverified')
  ];
  
  return lines.join('\n');
};

/**
 * Helper: Format currency
 */
const formatCurrency = (amount: any): string => {
  // Handle undefined, null, or non-numeric values
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0';
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

/**
 * Helper: Format delivery mode
 */
const formatDeliveryMode = (mode: string): string => {
  const modes: Record<string, string> = {
    in_person: 'In-Person Handover (Both parties meet)',
    shipping: 'Courier/Shipping to buyer address',
    digital: 'Digital Delivery via email/download',
    service_location: 'Service performed at seller\'s location',
    buyer_location: 'Service performed at buyer\'s location'
  };
  return modes[mode] || mode;
};

/**
 * Build scope section
 */
const buildScopeSection = (formData: Record<string, any>, template: IndustryTemplate): string => {
  const scope = formData.projectScope || formData.workScope || formData.itemDescription || 'As per description';
  const details = formData.materialsIncluded || formData.technologies || formData.brand || '';
  
  return `${scope}${details ? `\nDetails: ${details}` : ''}`;
};

/**
 * Build deliverables section
 */
const buildDeliverablesSection = (formData: Record<string, any>, template: IndustryTemplate): string => {
  const deliverables: string[] = [];

  if (formData.brand) deliverables.push(`• Product: ${formData.brand}`);
  if (formData.condition) deliverables.push(`• Condition: ${formData.condition}`);
  if (formData.accessories) deliverables.push(`• Accessories: ${formData.accessories}`);
  if (formData.sourceCodeDelivery) deliverables.push(`• Source Code: ${formData.sourceCodeDelivery}`);
  if (formData.revisions) deliverables.push(`• Revisions Included: ${formData.revisions}`);
  if (formData.dimensions) deliverables.push(`• Dimensions: ${formData.dimensions}`);

  return deliverables.length > 0 ? deliverables.join('\n') : '• As per transaction description';
};

/**
 * Build escrow release conditions
 */
const buildEscrowReleaseConditions = (template: IndustryTemplate, formData: Record<string, any>): string => {
  return template.escrowReleaseConditions
    .map(condition => `• ✓ ${condition}`)
    .join('\n') + '\n\nAfter ALL conditions met, escrow is released to seller within 24 hours.';
};

/**
 * Build timeline section
 */
const buildTimelineSection = (formData: Record<string, any>, template: IndustryTemplate): string => {
  if (formData.timeline) {
    return formData.timeline;
  }
  if (formData.paymentSchedule) {
    return `Payment Milestones:\n${formData.paymentSchedule}`;
  }
  return `• Delivery by: ${formData.deliveryDate || 'As agreed'}\n• Inspection window: ${formData.inspectionWindow || 24} hours`;
};

/**
 * Build return policy section
 */
const buildReturnPolicySection = (formData: Record<string, any>): string => {
  const policies: Record<string, string> = {
    no_return: 'NO RETURNS ACCEPTED - This is final sale.',
    '7_days': 'Items can be returned within 7 days of delivery for full refund if unused/unopened.',
    '14_days': 'Items can be returned within 14 days of delivery. 10% restocking fee applies.',
    '30_days': 'Items can be returned within 30 days of delivery. Condition must be good.',
    custom: formData.returnableCondition || 'Custom return terms as specified'
  };

  const policy = policies[formData.returnPolicy] || policies['7_days'];
  return `${policy}\n\nReturn Initiation: Must be initiated within inspection window with proof.`;
};

/**
 * Build warranty section
 */
const buildWarrantySection = (formData: Record<string, any>, template: IndustryTemplate): string => {
  const warranties: Record<string, string> = {
    no_warranty: 'This item is sold AS-IS without any warranty or guarantee.',
    '1_month': 'Seller warrants the item is free from defects for 1 month from delivery.',
    '3_months': 'Seller warrants the item is free from defects for 3 months from delivery.',
    '6_months': 'Seller warrants the item is free from defects for 6 months from delivery.',
    '1_year': 'Seller warrants the item is free from defects for 1 year from delivery.'
  };

  const warranty = warranties[formData.warrantyPeriod] || 'As per Consumer Protection Act 2019';
  return `${warranty}\n\nDefect must be reported within warranty period with evidence.`;
};

/**
 * Build consumer protection clause
 */
const buildConsumerProtectionClause = (template: IndustryTemplate): string => {
  return `This transaction is governed by Consumer Protection Act 2019.
Under this act:
• Consumer (Buyer) has right to return, refund, and replacement
• Seller is liable for defects, misrepresentation, or non-performance
• Consumer disputes are heard through consumer commissions in India
• Both parties waive jury trial and agree to mediation/arbitration first`;
};

/**
 * Build evidence requirements
 */
const buildEvidenceRequirements = (template: IndustryTemplate, formData: Record<string, any>): string => {
  const evidence: string[] = [];

  if (template.id === 'electronics' || template.id === 'mobile_phones_laptops') {
    evidence.push('• Photos of device (front, back, sides, screen working)');
    evidence.push('• Photos of IMEI/Serial number (if applicable)');
    evidence.push('• Battery health screenshot (if applicable)');
    evidence.push('• Box and accessories (if applicable)');
    evidence.push('• Any damage or defects visible in photos');
  } else if (template.id === 'furniture_home_items') {
    evidence.push('• Photos of furniture in good condition');
    evidence.push('• Dimension verification (tape measure visible)');
    evidence.push('• Any damage or stains documented');
    evidence.push('• Delivery and placement photos');
  } else if (template.id === 'software_development') {
    evidence.push('• Screenshots of working software/features');
    evidence.push('• Code review reports (if applicable)');
    evidence.push('• Testing results and acceptance certification');
    evidence.push('• Documentation delivery proof');
  } else if (template.id === 'home_repair') {
    evidence.push('• Before and after photos of work area');
    evidence.push('• Photos of completed work from multiple angles');
    evidence.push('• Photos of materials used (if significant)');
    evidence.push('• Completion certificate from contractor');
  }

  return evidence.length > 0 ? evidence.join('\n') : '• Transaction completion proof\n• Delivery/Service confirmation photos';
};

/**
 * Build default buyer responsibilities
 */
const buildDefaultBuyerResponsibilities = (template: IndustryTemplate): string => {
  return `• Pay the agreed amount in time
• Inspect within the inspection window and raise disputes immediately
• Handle the item/service with reasonable care
• Provide feedback within agreed timelines
• Cooperate in dispute resolution`;
};

/**
 * Build default seller responsibilities
 */
const buildDefaultSellerResponsibilities = (template: IndustryTemplate): string => {
  return `• Deliver on agreed date
• Deliver in promised condition
• Respond to buyer inquiries promptly
• Handle disputes professionally
• Cooperate in mediation if needed`;
};

/**
 * Build all form fields into contract - includes all filled tabs/templates
 */
const buildAllFormFields = (formData: Record<string, any>): string => {
  // Fields to skip (already covered in main contract sections)
  const skippedFields = new Set([
    'itemDescription', 'deliveryDate', 'inspectionWindow', 'returnPolicy',
    'warrantyPeriod', 'buyerResponsibilities', 'sellerResponsibilities',
    'jurisdiction', 'deliveryMode', 'projectScope', 'workScope',
    'materialsIncluded', 'price', 'totalPrice', 'amount'
  ]);

  const customTerms: string[] = [];

  Object.entries(formData).forEach(([key, value]) => {
    // Skip empty values, null, undefined, and known skipped fields
    if (!value || skippedFields.has(key)) return;
    if (typeof value === 'string' && value.trim() === '') return;

    // Format key to readable label
    const label = key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();

    // Format value
    let displayValue = value;
    if (typeof value === 'object') {
      displayValue = JSON.stringify(value, null, 2);
    } else if (Array.isArray(value)) {
      displayValue = value.join(', ');
    }

    customTerms.push(`• **${label}**: ${displayValue}`);
  });

  if (customTerms.length === 0) {
    return 'All terms as per transaction discussion.';
  }

  return `ADDITIONAL TRANSACTION DETAILS:\n${customTerms.join('\n')}\n\nThese terms are binding and part of this contract.`;
};

/**
 * Extract mandatory clauses for this transaction
 */
const extractMandatoryClauses = (template: IndustryTemplate, formData: Record<string, any>): string[] => {
  const clauses: string[] = [
    'Offers & Acceptance (Indian Contract Act 1872)',
    'Consideration (Indian Contract Act 1872)',
    'Consumer Protection (Consumer Protection Act 2019)',
    'Force Majeure',
    'Liability Limitation',
    'Dispute Resolution (Mediation Act 2023)'
  ];

  // Add industry-specific mandatory clauses
  if (template.id === 'electronics' || template.id === 'mobile_phones_laptops') {
    clauses.push('Warranty of Title & Quality (Sale of Goods Act 1930)');
    clauses.push('Anti-Theft & Serial Verification');
  } else if (template.id === 'software_development') {
    clauses.push('Intellectual Property Rights (Copyright Act 1957)');
    clauses.push('Confidentiality & Non-Disclosure');
  } else if (template.id === 'home_repair') {
    clauses.push('Warranty of Workmanship');
    clauses.push('Liability for Property Damage');
  }

  return clauses;
};

/**
 * Extract applicable laws
 */
const extractApplicableLaws = (template: IndustryTemplate): string[] => {
  const laws: string[] = [
    'Indian Contract Act 1872',
    'Consumer Protection Act 2019',
    'Bharose PE Platform Escrow Policy'
  ];

  // Add industry-specific laws
  if (template.category === 'goods') {
    laws.push('Sale of Goods Act 1930');
    laws.push('Goods and Services Tax Act 2017');
  } else if (template.category === 'services') {
    laws.push('IT Act 2000 (for tech services)');
    laws.push('Professional Standards Act (where applicable)');
  }

  if (template.id === 'software_development') {
    laws.push('Copyright Act 1957');
    laws.push('Patents Act 1970');
  }

  return laws;
};

/**
 * Generate contract summary (for preview)
 */
const generateContractSummary = (title: string, formData: Record<string, any>, template: IndustryTemplate): string => {
  return `
TRANSACTION SUMMARY:
• Item/Service: ${title}
• Type: ${template.name.toUpperCase()}
• Amount: ₹ ${formatCurrency(formData.price || formData.totalPrice)}
• Escrow Amount: ₹ ${formatCurrency(formData.totalPrice - Math.floor(formData.totalPrice * 0.01))}
• Delivery Date: ${formData.deliveryDate || 'As agreed'}
• Inspection Window: ${formData.inspectionWindow || 24} hours
• Return Policy: ${formData.returnPolicy || '7 days'}
• Warranty: ${formData.warrantyPeriod || '3 months'}
• Dispute Resolution: ${formData.disputeResolutionMethod || 'Mediation'}

KEY TERMS:
${Object.entries(formData)
  .slice(0, 5)
  .map(([key, value]) => `• ${key}: ${value}`)
  .join('\n')}

This contract is fully compliant with Indian laws and Bharose PE policies.
  `.trim();
};

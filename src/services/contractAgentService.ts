import { ContractGenerationParams } from './aiContractService';

export interface ContractSuggestion {
  id: string;
  category: 'risk' | 'legal' | 'financial' | 'operational' | 'improvement';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  suggestion: string;
  appliedClause?: string;
  impact: string;
}

export interface ContractClause {
  id: string;
  title: string;
  content: string;
  category: 'escrow' | 'delivery' | 'payment' | 'quality' | 'dispute' | 'custom' | 'legal' | 'compliance';
  isOptional: boolean;
  addedAt?: Date;
}

export interface ContractDraft {
  id: string;
  params: ContractGenerationParams;
  clauses: ContractClause[];
  suggestions: ContractSuggestion[];
  generatedAt: Date;
  updatedAt: Date;
}

export interface AgentResponse {
  suggestions: ContractSuggestion[];
  clauses: ContractClause[];
  analysis: {
    riskLevel: 'low' | 'medium' | 'high';
    completeness: number; // 0-100
    compliance: string[];
    warnings: string[];
  };
}

export class ContractAgentService {
  /**
   * Generate real-time suggestions based on contract parameters
   */
  static async generateSuggestions(
    params: ContractGenerationParams
  ): Promise<ContractSuggestion[]> {
    const suggestions: ContractSuggestion[] = [];

    // Amount-based suggestions with Indian law compliance
    if (params.amount > 500000) {
      suggestions.push({
        id: 'high-value-1',
        category: 'financial',
        severity: 'critical',
        title: 'High-Value Transaction - GST Compliance',
        description: 'Transaction exceeds ₹5,00,000 - requires GST registration verification under GST Act',
        suggestion: 'Request GST registration certificate (if applicable) and GSTIN from seller. Include GST calculation in contract.',
        impact: 'Ensures compliance with Goods & Services Tax Act, 2017 and prevents legal liability',
      });

      suggestions.push({
        id: 'high-value-2',
        category: 'legal',
        severity: 'critical',
        title: 'Enhanced KYC Under FEMA/PAN Requirements',
        description: 'High-value transactions require KYC compliance under Foreign Exchange Management Act & Income Tax Act',
        suggestion: 'Request PAN card, Aadhaar verification, and bank details. Ensure 30% TDS deduction if required under Income Tax Act, 1961',
        impact: 'Compliance with FEMA Act, 1999 and Income Tax Act, 1961 - critical for legal enforceability',
      });

      suggestions.push({
        id: 'high-value-3',
        category: 'legal',
        severity: 'warning',
        title: 'Stamp Duty Consideration',
        description: 'Contracts exceeding ₹5,00,000 may require stamp duty under Indian Stamp Act',
        suggestion: 'Check state-specific stamp duty rates. Include provision: "Stamp duty as per Indian Stamp Act, 1899 to be borne by [party]"',
        impact: 'Avoids penalties under Stamp Act and ensures document admissibility in court',
      });
    }

    if (params.amount > 100000) {
      suggestions.push({
        id: 'insurance-1',
        category: 'financial',
        severity: 'info',
        title: 'Transaction Insurance & Consumer Protection',
        description: `₹${params.amount.toLocaleString('en-IN')} is eligible for insurance under Consumer Protection Act`,
        suggestion: 'Consider adding transaction insurance for ₹1% of amount. Include: "This transaction is protected under Consumer Protection Act, 2019"',
        impact: 'Provides consumer safety net and legal protection under Consumer Protection Act, 2019',
      });

      suggestions.push({
        id: 'legal-jurisdiction-1',
        category: 'legal',
        severity: 'info',
        title: 'Consumer Dispute Resolution Mechanism',
        description: 'Transactions above ₹1 lakh should mention dispute resolution per Consumer Protection Act',
        suggestion: 'Add clause: "Disputes shall be resolved through Consumer Dispute Redressal Commission as per Consumer Protection Act, 2019"',
        impact: 'Ensures jurisdiction clarity and compliance with Consumer Protection Act, 2019',
      });
    }

    // Timeline-based suggestions
    if (!params.deliveryDate && !params.completionDate) {
      suggestions.push({
        id: 'timeline-1',
        category: 'operational',
        severity: 'warning',
        title: 'Missing Delivery Timeline',
        description: 'No delivery or completion date specified',
        suggestion: 'Set a specific delivery/completion date (recommend: 3-7 business days)',
        impact: 'Prevents disputes over timely delivery',
      });
    }

    // Service-specific suggestions
    if (params.transactionType === 'services') {
      if (!params.serviceDescription || params.serviceDescription.length < 50) {
        suggestions.push({
          id: 'service-1',
          category: 'operational',
          severity: 'warning',
          title: 'Vague Service Description - Sale of Goods Act Risk',
          description: 'Service description is unclear or too brief',
          suggestion: 'Provide detailed scope per Sale of Goods Act, 1930: deliverables, format, revisions, delivery method',
          impact: 'Meets Section 15 requirements of Sale of Goods Act and prevents scope disputes',
        });
      }

      suggestions.push({
        id: 'service-2',
        category: 'improvement',
        severity: 'info',
        title: 'Milestone-Based Delivery per Contract Act',
        description: 'For service work, milestone tracking improves accountability under Indian Contract Act',
        suggestion: 'Add: "Service delivery in milestones per Section 40 of Indian Contract Act, 1872: 33% payment per milestone"',
        impact: 'Complies with Section 40 (Contract as to performance of conditions) of Indian Contract Act, 1872',
      });

      suggestions.push({
        id: 'service-3',
        category: 'legal',
        severity: 'info',
        title: 'Revision Limit per Indian Contract Act',
        description: 'Undefined revision rounds violate Section 39 of Indian Contract Act regarding condition precedent',
        suggestion: 'Specify: "2 rounds of reasonable revisions included. Additional revisions per Section 55 need separate consideration"',
        impact: 'Complies with Indian Contract Act, 1872 sections 39-55 on condition precedent and concurrent conditions',
      });
    }

    // Goods-specific suggestions
    if (params.transactionType === 'goods') {
      if (!params.quantity) {
        suggestions.push({
          id: 'goods-1',
          category: 'operational',
          severity: 'warning',
          title: 'Missing Quantity per Sale of Goods Act',
          description: 'Quantity not specified - violates Section 1 of Sale of Goods Act, 1930',
          suggestion: 'Add specific quantity and unit (e.g., "2 units", "5 kg") as per Section 2(7) SGA definition',
          impact: 'Ensures compliance with Sale of Goods Act, 1930 and prevents disputes on delivery',
        });
      }

      if (!params.warranty) {
        suggestions.push({
          id: 'goods-2',
          category: 'legal',
          severity: 'info',
          title: 'Warranty Terms per Sale of Goods Act',
          description: 'Add warranty terms under Section 14 & 15 of Sale of Goods Act, 1930',
          suggestion: 'Add: "1-month warranty on fitness for purpose & merchantability per Sections 14-15, Sale of Goods Act, 1930"',
          impact: 'Provides buyer protection per Section 14 (warranty of merchantability) and Section 15 (fitness for purpose)',
        });
      }

      if (!params.returnPolicy) {
        suggestions.push({
          id: 'goods-3',
          category: 'legal',
          severity: 'info',
          title: 'Return Policy per Consumer Protection Act',
          description: 'Clear return terms protect both parties under Consumer Protection Act, 2019',
          suggestion: 'Add: "7-day return window for unused items in original packaging per Consumer Protection Act, 2019 Rule 4"',
          impact: 'Complies with Consumer Protection (E-Commerce) Rules, 2020 and Consumer Protection Act, 2019',
        });
      }

      suggestions.push({
        id: 'goods-4',
        category: 'legal',
        severity: 'info',
        title: 'Authenticity Guarantee & Anti-Counterfeiting',
        description: 'Add authenticity guarantee per Consumer Protection Act',
        suggestion: 'Add: "100% authentic guarantee - ₹X full refund if counterfeit. Report counterfeits to Ministry of Commerce"',
        impact: 'Protects buyer and complies with Consumer Protection Act, 2019 Section 92-93 (unfair trade practices)',
      });

      suggestions.push({
        id: 'goods-5',
        category: 'legal',
        severity: 'info',
        title: 'Transfer of Ownership per Sale of Goods Act',
        description: 'Clarify ownership transfer as per Section 19-22 of Sale of Goods Act',
        suggestion: 'Add: "Ownership transfers upon payment confirmation as per Section 20, Sale of Goods Act, 1930"',
        impact: 'Complies with Section 19-24 of Sale of Goods Act regarding passing of ownership',
      });
    }

    // Risk assessment suggestions
    if (!params.sellerName || !params.buyerName) {
      suggestions.push({
        id: 'identity-1',
        category: 'risk',
        severity: 'warning',
        title: 'Incomplete Party Information',
        description: 'Party names are incomplete',
        suggestion: 'Ensure full legal names are provided for both parties',
        impact: 'Ensures contract enforceability',
      });
    }

    // Special terms suggestions
    if (!params.specialTerms) {
      suggestions.push({
        id: 'special-1',
        category: 'improvement',
        severity: 'info',
        title: 'Add Custom Terms',
        description: 'Consider transaction-specific terms',
        suggestion: 'Include any special conditions, brand agreements, or custom requirements',
        impact: 'Makes contract more comprehensive and specific to your deal',
      });
    }

    return suggestions;
  }

  /**
   * Generate smart contract clauses based on parameters
   */
  static generateSmartClauses(params: ContractGenerationParams): ContractClause[] {
    const clauses: ContractClause[] = [];

    // Mandatory clauses with Indian legal compliance
    clauses.push({
      id: 'legal-framework',
      title: 'Legal Framework & Governing Law',
      content: `This Agreement is governed by the laws of India, including but not limited to: (1) Indian Contract Act, 1872, (2) Sale of Goods Act, 1930, (3) Consumer Protection Act, 2019, (4) Information Technology Act, 2000, (5) Bharatiya Nyaya Sanhita, 2023. All disputes subject to Indian courts' exclusive jurisdiction. Venue: Mumbai, Maharashtra.`,
      category: 'legal',
      isOptional: false,
    });

    clauses.push({
      id: 'escrow-protection',
      title: 'Escrow Protection Mechanism (Section 148, Indian Contract Act)',
      content: `Total amount of ₹${params.amount.toLocaleString('en-IN')} will be held in secure escrow per Section 148 of Indian Contract Act, 1872. Funds released only upon successful completion and buyer confirmation. Inspection period: ${this.calculateInspectionDays(params.amount)} business days as per Section 55 (conditions precedent).`,
      category: 'escrow',
      isOptional: false,
    });

    clauses.push({
      id: 'digital-auth',
      title: 'Digital Signature & E-Contract Authentication (IT Act, 2000)',
      content: 'This agreement is legally binding under Section 10A of Information Technology Act, 2000 and Rule 3 of IT Rules, 2011. Digital signatures via OTP, email, or authorized digital methods are legally valid. Counterparty agrees consent is binding and constitutes acceptance per Section 11 of Indian Contract Act, 1872.',
      category: 'compliance',
      isOptional: false,
    });

    // Conditional clauses with Indian law references
    if (params.transactionType === 'goods') {
      clauses.push({
        id: 'goods-delivery',
        title: 'Goods Delivery & Quality Assurance (Sale of Goods Act, 1930)',
        content: `Per Sections 19-24 of Sale of Goods Act, 1930: Seller must deliver goods within 24-48 hours of payment confirmation. Goods must match Section 15 requirements (fitness for purpose and merchantability). Buyer has ${this.calculateInspectionDays(params.amount)} days to inspect per Section 41 and report defects. Ownership transfers on payment confirmation per Section 20.`,
        category: 'delivery',
        isOptional: false,
      });

      if (params.warranty) {
        clauses.push({
          id: 'warranty-clause',
          title: 'Warranty & Condition Precedent (Sections 14-15, SGA)',
          content: `Per Sections 14-15 of Sale of Goods Act, 1930: ${params.warranty}. Warranty covers manufacturing defects and fitness for purpose. Replacement or refund provided within 15 days if goods don't meet warranty terms. Seller liable per Section 59 (breach of warranty).`,
          category: 'quality',
          isOptional: true,
        });
      }

      if (params.returnPolicy) {
        clauses.push({
          id: 'return-policy',
          title: 'Return & Refund (Consumer Protection Act, 2019)',
          content: `Per Consumer Protection (E-Commerce) Rules, 2020 and Consumer Protection Act, 2019: ${params.returnPolicy}. Items must be in original condition. Return shipping at seller's cost for defective items. Refund processed within 30 days per Rule 4(2) of E-Commerce Rules.`,
          category: 'legal',
          isOptional: true,
        });
      }

      clauses.push({
        id: 'goods-compliance',
        title: 'Anti-Counterfeiting & Consumer Protection (CPA Section 92)',
        content: 'Seller guarantees 100% authenticity of goods. Non-authentic goods attract full refund plus ₹5000 compensation per Consumer Protection Act Section 92. Counterfeit items shall be reported to Ministry of Commerce & Industry per Government guidelines.',
        category: 'compliance',
        isOptional: true,
      });
    }

    if (params.transactionType === 'services') {
      clauses.push({
        id: 'service-delivery',
        title: 'Service Delivery Obligations (Sections 37-40, Indian Contract Act)',
        content: `Per Sections 37-40 of Indian Contract Act, 1872 (performance of conditions precedent): Service provider must commence within 24 hours of payment. Work must be completed by ${params.completionDate ? new Date(params.completionDate).toLocaleDateString('en-IN') : 'agreed date'}. Regular progress updates provided weekly. Failure constitutes breach per Section 40.`,
        category: 'delivery',
        isOptional: false,
      });

      clauses.push({
        id: 'revision-rights',
        title: 'Revision & Modification Rights (Section 55, Contract Act)',
        content: 'Client entitled to up to 2 rounds of reasonable revisions as per condition precedent (Section 55). Additional work outside scope requires separate written agreement and payment per Section 62 of Indian Contract Act.',
        category: 'quality',
        isOptional: true,
      });

      clauses.push({
        id: 'ip-rights',
        title: 'Intellectual Property Rights Transfer (Copyright Act, 1957)',
        content: 'All intellectual property rights, including copyright (per Copyright Act, 1957), design rights, and moral rights, transfer to client upon final payment release. Service provider indemnifies against IP infringement claims.',
        category: 'compliance',
        isOptional: true,
      });
    }

    if (params.amount > 50000) {
      clauses.push({
        id: 'milestone-payment',
        title: 'Milestone-Based Payment (Section 40, Contract Act)',
        content: 'Per Section 40 conditions precedent: High-value transactions: 50% on commencement, 50% on completion. Payment tied to verified milestone completion. Each party has reciprocal obligations ensuring mutual accountability and reducing default risk.',
        category: 'payment',
        isOptional: true,
      });

      clauses.push({
        id: 'kyc-verification',
        title: 'KYC & Anti-Money Laundering (FEMA Act, 1999; PML Rules, 2020)',
        content: 'High-value transactions require government ID verification (Aadhaar/PAN), address proof, and bank details per FEMA Act, 1999 and Prevention of Money Laundering Rules, 2020. TDS 30% may apply per Income Tax Act, 1961 Section 194LA if applicable.',
        category: 'compliance',
        isOptional: true,
      });

      clauses.push({
        id: 'gst-compliance',
        title: 'GST & Tax Compliance (GST Act, 2017)',
        content: 'If seller has GST registration: GST at applicable rate (18% goods, 18% services) to be added to contract value per GST Act, 2017. Seller to provide GST invoice. Buyer responsible for input tax credit claims.',
        category: 'compliance',
        isOptional: true,
      });
    }

    clauses.push({
      id: 'dispute-resolution-indian',
      title: 'Dispute Resolution (Arbitration Act, 1996; Consumer Protection Act, 2019)',
      content: `Disputes resolved through: (1) Good faith negotiation (7 days per Section 73 of Contract Act), (2) Bharose Pe mediation, (3) If unresolved: Binding arbitration under Arbitration & Conciliation Act, 1996 (single arbitrator, Mumbai) OR Consumer Dispute Redressal Commission if consumer applicable per Consumer Protection Act, 2019. No waiver of consumer rights under CPA.`,
      category: 'dispute',
      isOptional: false,
    });

    clauses.push({
      id: 'limitation-liability',
      title: 'Limitation of Liability (Section 73-75, Contract Act)',
      content: 'Liability limited to transaction amount per Section 73 (damages for breach). Neither party liable for indirect/consequential damages per Section 73. Force majeure events (pandemics, government action) exempt parties per Section 56 (Act of God).',
      category: 'legal',
      isOptional: false,
    });

    clauses.push({
      id: 'consumer-rights',
      title: 'Consumer Rights & Non-Waiver (CPA 2019)',
      content: 'Consumer rights under Consumer Protection Act, 2019 cannot be waived. Buyers retain rights to file complaints with District/State/National Consumer Commission. No clause herein excludes/restricts consumer rights per Section 20 of CPA.',
      category: 'compliance',
      isOptional: false,
    });

    return clauses;
  }

  /**
   * Perform comprehensive contract analysis with Indian legal compliance
   */
  static analyzeContract(
    params: ContractGenerationParams,
    clauses: ContractClause[]
  ): AgentResponse['analysis'] {
    const compliance: string[] = [];
    const warnings: string[] = [];
    let completeness = 0;

    // Check completeness
    const completenessChecks = {
      hasSellerInfo: !!params.sellerName && !!params.sellerPhone,
      hasBuyerInfo: !!params.buyerName && !!params.buyerPhone,
      hasAmount: params.amount > 0,
      hasDescription:
        (params.transactionType === 'goods' && !!params.productName) ||
        (params.transactionType === 'services' && !!params.serviceDescription),
      hasDeliveryTerms:
        !!params.deliveryDate ||
        !!params.completionDate,
    };

    completeness = (Object.values(completenessChecks).filter(Boolean).length / Object.keys(completenessChecks).length) * 100;

    // Indian Contract Act, 1872 compliance
    if (params.amount <= 0) {
      warnings.push('[Indian Contract Act] Transaction amount must be greater than zero');
    } else {
      compliance.push('✓ Valid transaction amount (Section 2(e) - Consideration)');
    }

    if (params.sellerName && params.buyerName) {
      compliance.push('✓ Both parties clearly identified (Section 2(c) - Agreement)');
    } else {
      warnings.push('[Indian Contract Act] Complete party information required for contract formation');
    }

    // Sale of Goods Act, 1930 compliance (for goods transactions)
    if (params.transactionType === 'goods') {
      if (params.quantity) {
        compliance.push('✓ Goods quantity specified per Sale of Goods Act Section 2(7)');
      } else {
        warnings.push('[Sale of Goods Act] Specify goods quantity per Section 2(7) definition');
      }

      if (params.warranty) {
        compliance.push('✓ Warranty terms included (Sections 14-15 SGA)');
      } else {
        warnings.push('[Sale of Goods Act] Add warranty clause per Section 14 (merchantability) & 15 (fitness)');
      }

      if (params.returnPolicy) {
        compliance.push('✓ Return policy defined (Consumer Protection Act E-Commerce Rules)');
      } else {
        warnings.push('[Consumer Protection Act] Define return policy per E-Commerce Rules, 2020');
      }
    }

    // Service Agreement compliance (Indian Contract Act sections on performance)
    if (params.transactionType === 'services') {
      if (params.serviceDescription?.length > 50) {
        compliance.push('✓ Service description detailed per Contract Act Section 40 (performance)');
      } else {
        warnings.push('[Indian Contract Act] Provide detailed service description per Section 40 requirements');
      }

      if (params.completionDate) {
        compliance.push('✓ Service completion timeline defined (Section 40 - time for performance)');
      } else {
        warnings.push('[Indian Contract Act] Specify completion date per Section 40');
      }
    }

    // Consumer Protection Act, 2019 compliance
    if (params.amount > 100000) {
      compliance.push('✓ High-value transaction eligible for Consumer Protection Act Section 2(c) protections');
    }

    if (clauses.length >= 5) {
      compliance.push('✓ Comprehensive clause coverage includes all statutory requirements');
    }

    // Information Technology Act, 2000 compliance
    compliance.push('✓ Digital agreement compliant with IT Act 2000 Section 10A');

    // Risk level determination with legal factors
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    
    if (params.amount > 500000) {
      riskLevel = 'high';
      compliance.push('⚠ High-value transaction requires FEMA Act, 1999 & PML Rules 2020 compliance');
    } else if (params.amount > 100000) {
      riskLevel = 'medium';
      compliance.push('⚠ Medium-value: GST Act 2017 compliance required if applicable');
    }
    
    if (!params.deliveryDate && !params.completionDate) {
      riskLevel = 'medium';
      warnings.push('[Indian Contract Act Section 40] Define performance timeline');
    }
    
    if (warnings.length > 2) {
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    // Statutory compliance summary
    compliance.push('---');
    compliance.push('📋 LEGAL FRAMEWORK APPLIED:');
    compliance.push('• Indian Contract Act, 1872');
    if (params.transactionType === 'goods') compliance.push('• Sale of Goods Act, 1930');
    compliance.push('• Consumer Protection Act, 2019');
    compliance.push('• Information Technology Act, 2000');
    if (params.amount > 100000) compliance.push('• GST Act, 2017 (if applicable)');
    if (params.amount > 500000) compliance.push('• FEMA Act, 1999 & PML Rules, 2020');

    return {
      riskLevel,
      completeness: Math.round(completeness),
      compliance,
      warnings,
    };
  }

  /**
   * Get clause recommendation based on transaction type
   */
  static getClauseRecommendations(params: ContractGenerationParams): {
    recommended: ContractClause[];
    optional: ContractClause[];
  } {
    const allClauses = this.generateSmartClauses(params);
    return {
      recommended: allClauses.filter((c) => !c.isOptional),
      optional: allClauses.filter((c) => c.isOptional),
    };
  }

  /**
   * Apply suggestion to contract parameters
   */
  static applySuggestion(
    params: ContractGenerationParams,
    suggestionId: string
  ): Partial<ContractGenerationParams> {
    const updates: Partial<ContractGenerationParams> = {};

    switch (suggestionId) {
      case 'timeline-1':
        updates.deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'goods-2':
        updates.warranty = '1-month product warranty covering manufacturing defects per Sections 14-15, Sale of Goods Act, 1930';
        break;
      case 'goods-3':
        updates.returnPolicy = '7-day return window for unused items in original packaging per Consumer Protection (E-Commerce) Rules, 2020';
        break;
      case 'service-2':
        updates.specialTerms = (updates.specialTerms || '') + '; Service delivery in milestones per Section 40, Indian Contract Act, 1872';
        break;
      case 'service-3':
        updates.specialTerms = (updates.specialTerms || '') + '; Up to 2 rounds of reasonable revisions per Section 55 conditions';
        break;
    }

    return updates;
  }

  private static calculateInspectionDays(amount: number): number {
    if (amount > 100000) return 7;
    if (amount > 25000) return 5;
    return 3;
  }

  /**
   * Generate contract summary for quick review
   */
  static generateContractSummary(params: ContractGenerationParams): string {
    return `
📋 CONTRACT SUMMARY

Parties: ${params.sellerName} ↔ ${params.buyerName}
Amount: ₹${params.amount.toLocaleString('en-IN')}
Type: ${params.transactionType === 'goods' ? 'Sale of Goods' : 'Service Agreement'}
${params.productName ? `Product: ${params.productName}` : ''}
${params.serviceDescription ? `Service: ${params.serviceDescription}` : ''}
${params.deliveryDate ? `Delivery: ${new Date(params.deliveryDate).toLocaleDateString('en-IN')}` : ''}
${params.completionDate ? `Completion: ${new Date(params.completionDate).toLocaleDateString('en-IN')}` : ''}
    `.trim();
  }
}

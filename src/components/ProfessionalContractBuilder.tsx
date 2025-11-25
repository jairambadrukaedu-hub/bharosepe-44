import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, ChevronRight, CheckCircle2, AlertCircle, Phone, MapPin,
  DollarSign, Calendar, Shield, Paperclip, Lightbulb, ArrowLeft
} from 'lucide-react';
import { useTransactions } from '@/hooks/use-transactions';
import { useUserModeContext } from '@/components/UserModeContext';
import { useContracts } from '@/hooks/use-contracts';
import { toast } from 'sonner';

interface ProfessionalContractBuilderProps {
  transactionId: string;
  recipient: { id: string; name: string; phone: string };
  onComplete?: () => void;
}

const ProfessionalContractBuilder: React.FC<ProfessionalContractBuilderProps> = ({
  transactionId,
  recipient,
  onComplete
}) => {
  const { userMode } = useUserModeContext();
  const { transactions } = useTransactions(userMode);
  const { createContract } = useContracts();
  const transaction = transactions.find(t => t.id === transactionId);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [contractData, setContractData] = useState({
    // ===== PARTY DETAILS =====
    buyerName: '',
    buyerAddress: '',
    buyerPhone: '',
    buyerEmail: '',
    buyerPAN: '',
    sellerName: '',
    sellerAddress: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerPAN: '',

    // ===== TRANSACTION DETAILS =====
    transactionType: 'goods',
    industry: '',

    // ===== PRICING =====
    basePrice: transaction?.amount?.toString() || '0',
    taxes: '0',
    deliveryCharges: '0',
    totalPrice: transaction?.amount || 0,
    paymentMode: 'upi',
    advancePayment: '0',

    // ===== TIMELINE =====
    deliveryDate: transaction?.delivery_date || '',
    milestones: '',
    delayPenalty: '0',

    // ===== POLICIES =====
    returnPolicy: '7_days',
    warrantyPeriod: '3_months',
    revisionPolicy: '2_rounds',
    cancellationRules: '',
    inspectionWindow: '24_hours',
    disputeResolution: 'mediation',

    // ===== INDUSTRY-SPECIFIC (Goods) =====
    brand: '',
    model: '',
    condition: 'new',
    imeiSerial: '',
    batteryHealth: '',
    accessories: '',
    manufacturingYear: '',
    functionalIssues: '',

    // ===== INDUSTRY-SPECIFIC (Services) =====
    scopeOfWork: '',
    revisionsIncluded: 2,
    ipOwnership: 'client',
    sourceCodeDelivery: 'yes',
    maintenanceDuration: '30_days',
    conceptsIncluded: 3,
    fileFormats: [],
    commercialRights: 'yes',

    // ===== LEGAL =====
    jurisdiction: '',
    forceMAjeure: 'yes',
    indemnity: 'yes',

    // ===== EVIDENCE =====
    photosBefore: '',
    workSamples: '',
    proofOfDelivery: '',
    proofOfCompletion: ''
  });

  const steps = [
    { id: 1, title: '👥 Party Details', description: 'Buyer & Seller Information' },
    { id: 2, title: '💰 Pricing & Payment', description: 'Financial Terms' },
    { id: 3, title: '📅 Timeline & Policies', description: 'Dates & Conditions' },
    { id: 4, title: '🏭 Industry-Specific', description: 'Category Details' },
    { id: 5, title: '⚖️ Legal Clauses', description: 'Legal Protection' },
    { id: 6, title: '📸 Evidence & Review', description: 'Proof & Final Check' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setContractData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-calculate total price
      if (['basePrice', 'taxes', 'deliveryCharges'].includes(field)) {
        updated.totalPrice = (Number(updated.basePrice) || 0) +
          (Number(updated.taxes) || 0) +
          (Number(updated.deliveryCharges) || 0);
      }
      return updated;
    });
  };

  const generateContractDocument = () => {
    const platformFee = Math.floor(contractData.totalPrice * 0.01);
    const escrowAmount = contractData.totalPrice - platformFee;

    return `
═══════════════════════════════════════════════════════════════════════════════
                         PROFESSIONAL CONTRACT AGREEMENT
                              BHAROSE PE PLATFORM
═══════════════════════════════════════════════════════════════════════════════

Transaction ID: ${transactionId}
Contract Date: ${new Date().toLocaleDateString('en-IN')}
Jurisdiction: ${contractData.jurisdiction || 'India'}

───────────────────────────────────────────────────────────────────────────────
PART A: PARTIES TO THE CONTRACT
───────────────────────────────────────────────────────────────────────────────

SELLER:
  Name: ${contractData.sellerName}
  Address: ${contractData.sellerAddress}
  Phone: ${contractData.sellerPhone}
  Email: ${contractData.sellerEmail}
  PAN/GST: ${contractData.sellerPAN}

BUYER:
  Name: ${contractData.buyerName}
  Address: ${contractData.buyerAddress}
  Phone: ${contractData.buyerPhone}
  Email: ${contractData.buyerEmail}
  PAN: ${contractData.buyerPAN}

PLATFORM INTERMEDIARY:
  Name: Bharose Pe
  Role: Escrow Manager & Dispute Resolver
  Platform Fee: ${platformFee} (1% of transaction amount)

───────────────────────────────────────────────────────────────────────────────
PART B: TRANSACTION DETAILS
───────────────────────────────────────────────────────────────────────────────

Transaction Type: ${contractData.transactionType.toUpperCase()}
Industry Category: ${contractData.industry}
Item/Service: ${transaction?.title}
Description: ${transaction?.description}

───────────────────────────────────────────────────────────────────────────────
PART C: FINANCIAL TERMS
───────────────────────────────────────────────────────────────────────────────

Base Price:           ₹ ${Number(contractData.basePrice)?.toLocaleString('en-IN')}
Taxes (if any):       ₹ ${Number(contractData.taxes)?.toLocaleString('en-IN')}
Delivery Charges:     ₹ ${Number(contractData.deliveryCharges)?.toLocaleString('en-IN')}
─────────────────────────────────────────
TOTAL PRICE:          ₹ ${contractData.totalPrice?.toLocaleString('en-IN')}

Platform Fee (1%):    ₹ ${platformFee?.toLocaleString('en-IN')}
Escrow Amount:        ₹ ${escrowAmount?.toLocaleString('en-IN')}

Payment Mode: ${contractData.paymentMode.toUpperCase()}
Advance Payment: ₹ ${Number(contractData.advancePayment)?.toLocaleString('en-IN')}
Remaining Payment: ₹ ${(Number(contractData.totalPrice) - Number(contractData.advancePayment))?.toLocaleString('en-IN')}

ESCROW RELEASE CONDITIONS:
  ✓ Buyer confirms delivery/completion
  ✓ All evidence verified by platform
  ✓ 7-day dispute window expires
  ✓ Manual admin approval (if flagged)

───────────────────────────────────────────────────────────────────────────────
PART D: TIMELINE & DELIVERY
───────────────────────────────────────────────────────────────────────────────

Delivery/Completion Date: ${contractData.deliveryDate}
${contractData.delayPenalty ? `Delay Penalty: ₹${contractData.delayPenalty}/day` : 'No delay penalty'}
Inspection Window: ${contractData.inspectionWindow}

MILESTONES (if applicable):
${contractData.milestones || 'N/A'}

───────────────────────────────────────────────────────────────────────────────
PART E: POLICIES & CONDITIONS
───────────────────────────────────────────────────────────────────────────────

RETURN/REFUND POLICY:
${getReturnPolicyText(contractData.returnPolicy)}

WARRANTY PERIOD:
${getWarrantyText(contractData.warrantyPeriod)}

REVISION/REDO POLICY:
${getRevisionPolicyText(contractData.revisionPolicy)}

CANCELLATION RULES:
${contractData.cancellationRules || 'Only refundable if work has not started'}

DISPUTE RESOLUTION:
Preferred Method: ${contractData.disputeResolution.toUpperCase()}
  • Step 1: Direct communication between parties (24 hours)
  • Step 2: Mediation through Bharose Pe (5-7 days)
  • Step 3: Evidence review & admin decision (5 business days)

───────────────────────────────────────────────────────────────────────────────
PART F: INDUSTRY-SPECIFIC DETAILS
───────────────────────────────────────────────────────────────────────────────

${getIndustrySpecificDetails(contractData)}

───────────────────────────────────────────────────────────────────────────────
PART G: LEGAL CLAUSES & PROTECTION
───────────────────────────────────────────────────────────────────────────────

INDEMNITY CLAUSE:
Both parties agree to indemnify Bharose Pe from any claims, damages, or losses
arising from breach of this agreement or violation of laws.

LIMITATION OF LIABILITY:
Bharose Pe's maximum liability is limited to 1% of the transaction amount or
₹1,000 (whichever is higher).

FORCE MAJEURE:
If either party is unable to perform due to unforeseen circumstances (natural
disasters, war, pandemics), the party must notify immediately and provide proof.

JURISDICTION:
This contract is governed by Indian law and shall be interpreted per:
  • Indian Contract Act, 1872
  • Consumer Protection Act, 2019
  • Information Technology Act, 2000
  • RBI Payment Regulations

GOVERNING LAW:
${contractData.jurisdiction ? `Jurisdiction: ${contractData.jurisdiction}` : 'Default: Seller\'s City or Neutral Indian Court'}

───────────────────────────────────────────────────────────────────────────────
PART H: EVIDENCE & PROOF REQUIREMENTS
───────────────────────────────────────────────────────────────────────────────

SELLER TO PROVIDE:
  ☐ Photos of item before shipping (if goods)
  ☐ Proof of dispatch with tracking
  ☐ Work samples (if services)
  
BUYER TO PROVIDE:
  ☐ Unboxing video/photos (if goods)
  ☐ Inspection report
  ☐ Completion confirmation (if services)

───────────────────────────────────────────────────────────────────────────────
PART I: ACKNOWLEDGEMENT & CONSENT
───────────────────────────────────────────────────────────────────────────────

✓ Both parties have read and understood this entire contract
✓ Both parties agree to all terms and conditions
✓ Both parties consent to escrow payment management
✓ Both parties agree to provide evidence as required
✓ Both parties acknowledge OTP verification requirement

SELLER SIGNATURE: ________________________  DATE: ______________
BUYER SIGNATURE:  ________________________  DATE: ______________

This is a legally binding digital contract issued by Bharose Pe platform.
OTP verification required before finalization.

═══════════════════════════════════════════════════════════════════════════════
Generated: ${new Date().toLocaleString('en-IN')}
═══════════════════════════════════════════════════════════════════════════════
    `;
  };

  const getReturnPolicyText = (policy: string) => {
    const policies: Record<string, string> = {
      'no_return': '❌ NO RETURNS - Item is final sale. No refunds after delivery.',
      '7_days': '↩️ 7 DAYS - Full refund if item returned in original condition within 7 days.',
      '15_days': '↩️ 15 DAYS - Full refund within 15 days if unused. Return shipping on buyer.',
      '30_days': '↩️ 30 DAYS - Generous 30-day return window. Slight wear acceptable.'
    };
    return policies[policy] || policies.no_return;
  };

  const getWarrantyText = (warranty: string) => {
    const warranties: Record<string, string> = {
      'none': '❌ NO WARRANTY - Item sold AS-IS with no guarantees.',
      '3_months': '🛡️ 3 MONTHS - Manufacturing defects only. Normal wear not covered.',
      '6_months': '🛡️ 6 MONTHS - Manufacturing defects & basic functionality.',
      '1_year': '🛡️ 1 YEAR - Full manufacturing warranty for 12 months.',
      '2_years': '🛡️ 2 YEARS - Extended 2-year warranty for major defects.'
    };
    return warranties[warranty] || warranties.none;
  };

  const getRevisionPolicyText = (policy: string) => {
    const policies: Record<string, string> = {
      '1_round': '1 Revision Round - One complete rework included.',
      '2_rounds': '2 Revision Rounds - Up to 2 revisions for corrections.',
      '3_rounds': '3 Revision Rounds - 3 complete revision rounds.',
      'unlimited': 'Unlimited Revisions - Until satisfaction (max 10 days).'
    };
    return policies[policy] || policies['2_rounds'];
  };

  const getIndustrySpecificDetails = (data: any) => {
    if (data.transactionType === 'goods') {
      return `
PRODUCT SPECIFICATIONS:
  Brand/Model: ${data.brand} ${data.model}
  Condition: ${data.condition}
  IMEI/Serial: ${data.imeiSerial}
  Battery Health: ${data.batteryHealth || 'N/A'}%
  Manufacturing Year: ${data.manufacturingYear}
  Accessories: ${data.accessories || 'None specified'}
  Functional Issues: ${data.functionalIssues || 'None declared'}
      `;
    } else {
      return `
SERVICE SPECIFICATIONS:
  Scope of Work: ${data.scopeOfWork}
  Revisions: ${data.revisionsIncluded} included
  IP Ownership: ${data.ipOwnership}
  Source Code: ${data.sourceCodeDelivery}
  Concepts Provided: ${data.conceptsIncluded}
  File Formats: ${data.fileFormats?.join(', ') || 'Standard formats'}
  Commercial Rights: ${data.commercialRights}
  Maintenance: ${data.maintenanceDuration}
      `;
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!contractData.buyerName || !contractData.sellerName) {
      toast.error('Please fill in buyer and seller names');
      return;
    }

    setLoading(true);
    try {
      const contractContent = generateContractDocument();
      const initiatorRole = userMode === 'Seller' ? 'seller' : 'buyer';

      await createContract({
        transaction_id: transactionId,
        contract_content: contractContent,
        recipient_id: recipient.id,
        initiator_role: initiatorRole
      });

      toast.success('Professional contract created & sent! 🎉');
      onComplete?.();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create contract');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1PartyDetails data={contractData} onChange={handleInputChange} />;
      case 2:
        return <Step2Pricing data={contractData} onChange={handleInputChange} transaction={transaction} />;
      case 3:
        return <Step3TimelineAndPolicies data={contractData} onChange={handleInputChange} />;
      case 4:
        return <Step4IndustrySpecific data={contractData} onChange={handleInputChange} />;
      case 5:
        return <Step5LegalClauses data={contractData} onChange={handleInputChange} />;
      case 6:
        return <Step6Review data={contractData} transaction={transaction} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* PROGRESS INDICATOR */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center transition-all flex-shrink-0 ${
                  currentStep >= step.id ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-500 text-white scale-110 shadow-lg'
                    : currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="h-6 w-6" /> : step.id}
                </div>
                <span className="text-xs font-medium text-center mt-2 w-20">{step.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className={`h-1 w-8 rounded transition-all ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg border-2 border-gray-200 p-6 mb-6"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-900">{steps[currentStep - 1].title}</h2>
          <p className="text-gray-600 mb-6">{steps[currentStep - 1].description}</p>
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < 6 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Contract
              </>
            )}
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">OTP verification required before finalization</p>
    </div>
  );
};

// ============================================================================
// STEP COMPONENTS
// ============================================================================

const Step1PartyDetails = ({ data, onChange }: any) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p className="text-sm text-blue-900"><strong>👤 SELLER INFORMATION</strong></p>
    </div>
    {['Name', 'Address', 'Phone', 'Email', 'PAN'].map(field => (
      <div key={`seller${field}`}>
        <label className="block text-sm font-semibold mb-2 text-gray-700">Seller {field}</label>
        <input
          type="text"
          value={data[`seller${field}`] || ''}
          onChange={(e) => onChange(`seller${field}`, e.target.value)}
          placeholder={`Enter seller ${field.toLowerCase()}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
    ))}

    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-8">
      <p className="text-sm text-green-900"><strong>👤 BUYER INFORMATION</strong></p>
    </div>
    {['Name', 'Address', 'Phone', 'Email', 'PAN'].map(field => (
      <div key={`buyer${field}`}>
        <label className="block text-sm font-semibold mb-2 text-gray-700">Buyer {field}</label>
        <input
          type="text"
          value={data[`buyer${field}`] || ''}
          onChange={(e) => onChange(`buyer${field}`, e.target.value)}
          placeholder={`Enter buyer ${field.toLowerCase()}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>
    ))}
  </div>
);

const Step2Pricing = ({ data, onChange, transaction }: any) => (
  <div className="space-y-6">
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <p className="text-sm text-amber-900"><strong>💰 PRICE BREAKDOWN</strong></p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {[
        { label: 'Base Price', key: 'basePrice' },
        { label: 'Taxes (₹)', key: 'taxes' },
        { label: 'Delivery Charges (₹)', key: 'deliveryCharges' },
        { label: 'Advance Payment (₹)', key: 'advancePayment' }
      ].map(item => (
        <div key={item.key}>
          <label className="block text-sm font-semibold mb-2 text-gray-700">{item.label}</label>
          <input
            type="number"
            value={data[item.key] || 0}
            onChange={(e) => onChange(item.key, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none"
          />
        </div>
      ))}
    </div>

    <div className="bg-amber-100 rounded-lg p-4 border-l-4 border-amber-500">
      <p className="text-sm font-bold text-amber-900">
        Total Price: <span className="text-xl">₹{data.totalPrice?.toLocaleString('en-IN')}</span>
      </p>
      <p className="text-xs text-amber-800 mt-2">Platform Fee (1%): ₹{Math.floor(data.totalPrice * 0.01)?.toLocaleString('en-IN')}</p>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Payment Mode</label>
      <select
        value={data.paymentMode}
        onChange={(e) => onChange('paymentMode', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
      >
        <option value="upi">UPI</option>
        <option value="bank">Bank Transfer</option>
        <option value="card">Card</option>
        <option value="wallet">Wallet</option>
      </select>
    </div>
  </div>
);

const Step3TimelineAndPolicies = ({ data, onChange }: any) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Delivery/Completion Date</label>
      <input
        type="date"
        value={data.deliveryDate}
        onChange={(e) => onChange('deliveryDate', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Return Policy</label>
      <select
        value={data.returnPolicy}
        onChange={(e) => onChange('returnPolicy', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="no_return">❌ No Returns</option>
        <option value="7_days">↩️ 7 Days Return</option>
        <option value="15_days">↩️ 15 Days Return</option>
        <option value="30_days">↩️ 30 Days Return</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Warranty Period</label>
      <select
        value={data.warrantyPeriod}
        onChange={(e) => onChange('warrantyPeriod', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="none">❌ No Warranty</option>
        <option value="3_months">3 Months</option>
        <option value="6_months">6 Months</option>
        <option value="1_year">1 Year</option>
        <option value="2_years">2 Years</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Inspection Window</label>
      <select
        value={data.inspectionWindow}
        onChange={(e) => onChange('inspectionWindow', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="12_hours">12 Hours</option>
        <option value="24_hours">24 Hours</option>
        <option value="48_hours">48 Hours</option>
        <option value="3_days">3 Days</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Dispute Resolution Method</label>
      <select
        value={data.disputeResolution}
        onChange={(e) => onChange('disputeResolution', e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="mediation">Mediation (Recommended)</option>
        <option value="arbitration">Arbitration</option>
        <option value="direct">Direct Communication</option>
      </select>
    </div>
  </div>
);

const Step4IndustrySpecific = ({ data, onChange }: any) => (
  <div className="space-y-6">
    {data.transactionType === 'goods' ? (
      <>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-900"><strong>📦 PRODUCT DETAILS</strong></p>
        </div>
        {['brand', 'model', 'imeiSerial', 'manufacturingYear', 'batteryHealth', 'accessories', 'functionalIssues'].map(field => (
          <div key={field}>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              value={data[field] || ''}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Condition</label>
          <select
            value={data.condition}
            onChange={(e) => onChange('condition', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="new">New</option>
            <option value="like_new">Like New</option>
            <option value="refurbished">Refurbished</option>
            <option value="used">Used</option>
          </select>
        </div>
      </>
    ) : (
      <>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-sm text-indigo-900"><strong>💼 SERVICE DETAILS</strong></p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Scope of Work</label>
          <textarea
            value={data.scopeOfWork}
            onChange={(e) => onChange('scopeOfWork', e.target.value)}
            placeholder="Describe the service in detail"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[100px]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Revisions Included</label>
          <input
            type="number"
            value={data.revisionsIncluded}
            onChange={(e) => onChange('revisionsIncluded', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">IP Ownership</label>
          <select
            value={data.ipOwnership}
            onChange={(e) => onChange('ipOwnership', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="client">Client Owns</option>
            <option value="shared">Shared</option>
            <option value="provider">Provider Owns</option>
          </select>
        </div>
      </>
    )}
  </div>
);

const Step5LegalClauses = ({ data, onChange }: any) => (
  <div className="space-y-6">
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <p className="text-sm text-red-900"><strong>⚖️ LEGAL PROTECTION</strong></p>
    </div>

    <div className="space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.indemnity === 'yes'}
          onChange={(e) => onChange('indemnity', e.target.checked ? 'yes' : 'no')}
          className="w-5 h-5 rounded"
        />
        <span className="text-sm font-medium text-gray-700">Include Indemnity Clause (liability protection)</span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={data.forceMAjeure === 'yes'}
          onChange={(e) => onChange('forceMAjeure', e.target.checked ? 'yes' : 'no')}
          className="w-5 h-5 rounded"
        />
        <span className="text-sm font-medium text-gray-700">Include Force Majeure Clause (unforeseen events)</span>
      </label>
    </div>

    <div>
      <label className="block text-sm font-semibold mb-2 text-gray-700">Jurisdiction / City</label>
      <input
        type="text"
        value={data.jurisdiction}
        onChange={(e) => onChange('jurisdiction', e.target.value)}
        placeholder="e.g., Delhi, Mumbai, Bangalore"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
      <p className="text-xs text-gray-500 mt-1">Defaults to Seller's city if left blank</p>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
      <p className="font-semibold mb-2">📋 Legal Compliance:</p>
      <ul className="text-xs space-y-1">
        <li>✓ Indian Contract Act, 1872</li>
        <li>✓ Consumer Protection Act, 2019</li>
        <li>✓ Information Technology Act, 2000</li>
        <li>✓ Mediation Act, 1996</li>
        <li>✓ RBI Payment & Settlement Guidelines</li>
      </ul>
    </div>
  </div>
);

const Step6Review = ({ data, transaction }: any) => (
  <div className="space-y-6">
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <CheckCircle2 className="h-5 w-5 text-green-600 mb-2" />
      <p className="text-sm text-green-900"><strong>Review & Send</strong></p>
      <p className="text-xs text-green-800 mt-1">Your contract is ready to send. Review the details below:</p>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="font-semibold text-gray-700">Seller</p>
        <p className="text-gray-600">{data.sellerName}</p>
        <p className="text-xs text-gray-500">{data.sellerPhone}</p>
      </div>
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="font-semibold text-gray-700">Buyer</p>
        <p className="text-gray-600">{data.buyerName}</p>
        <p className="text-xs text-gray-500">{data.buyerPhone}</p>
      </div>
      <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
        <p className="font-semibold text-amber-900">Total Amount</p>
        <p className="text-amber-900 font-bold text-lg">₹{data.totalPrice?.toLocaleString('en-IN')}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="font-semibold text-blue-900">Delivery Date</p>
        <p className="text-blue-900">{data.deliveryDate || 'Not set'}</p>
      </div>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <AlertCircle className="h-5 w-5 text-yellow-600 mb-2" />
      <p className="text-sm text-yellow-900"><strong>Important:</strong></p>
      <ul className="text-xs text-yellow-800 mt-2 space-y-1">
        <li>✓ Verify all details are correct before sending</li>
        <li>✓ OTP confirmation required after sending</li>
        <li>✓ Both parties must agree to finalize</li>
        <li>✓ Contract is legally binding once accepted</li>
      </ul>
    </div>
  </div>
);

export default ProfessionalContractBuilder;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, FileText, ArrowRight, CheckCircle2, AlertCircle, 
  Shield, DollarSign, Calendar, FileCheck
} from 'lucide-react';
import { useTransactions } from '@/hooks/use-transactions';
import { useUserModeContext } from '@/components/UserModeContext';
import { useContracts } from '@/hooks/use-contracts';
import PricingFormField from './PricingFormField';
import { toast } from 'sonner';

interface ContractBuilderProps {
  transactionId: string;
  recipient: { id: string; name: string; phone: string };
  onComplete?: () => void;
}

const ContractBuilder: React.FC<ContractBuilderProps> = ({ 
  transactionId, 
  recipient, 
  onComplete 
}) => {
  const { userMode } = useUserModeContext();
  const { transactions } = useTransactions(userMode);
  const { createContract } = useContracts();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState({
    paymentTerms: 'full_upfront',
    deliveryDays: 7,
    returnPolicy: '7_days',
    warranty: 'none',
    cancelPolicy: 'non_refundable_after_work',
    securityDeposit: 0,
    additionalTerms: ''
  });
  const [pricingData, setPricingData] = useState({
    baseAmount: 0,
    platformFee: 0,
    escrowAmount: 0
  });

  const transaction = transactions.find(t => t.id === transactionId);

  const steps = [
    { id: 1, title: '💰 Payment Terms', icon: DollarSign },
    { id: 2, title: '📅 Delivery Terms', icon: Calendar },
    { id: 3, title: '↩️ Return Policy', icon: FileCheck },
    { id: 4, title: '🛡️ Additional Terms', icon: Shield }
  ];

  const handlePaymentTermsChange = (value: string) => {
    setContract(prev => ({ ...prev, paymentTerms: value }));
  };

  const handlePlatformFeeCalculated = (fee: number) => {
    setPricingData(prev => ({ ...prev, platformFee: fee }));
  };

  const handleEscrowCalculated = (escrow: number) => {
    setPricingData(prev => ({ ...prev, escrowAmount: escrow }));
  };

  const handleBaseAmountChange = (amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    setPricingData(prev => ({ ...prev, baseAmount: numAmount }));
  };

  const handleCreateContract = async () => {
    if (!transaction) {
      toast.error('Transaction not found');
      return;
    }

    setLoading(true);
    try {
      const contractContent = generateContractContent();
      
      const initiatorRole = userMode === 'Seller' ? 'seller' : 'buyer';
      
      await createContract({
        transaction_id: transactionId,
        contract_content: contractContent,
        recipient_id: recipient.id,
        initiator_role: initiatorRole
      });

      toast.success('Contract sent successfully! 🎉');
      onComplete?.();
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create contract');
      console.error('Contract creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateContractContent = () => {
    // Use pricing data from our new calculator, fallback to transaction amount
    const amount = pricingData.baseAmount || transaction?.amount || 0;
    const platformFee = pricingData.platformFee || Math.floor(amount * 0.01);
    const escrowAmount = pricingData.escrowAmount || (amount - platformFee);

    return `
╔════════════════════════════════════════════════════════════╗
║                    TRANSACTION AGREEMENT                   ║
║                    BHAROSE PE PLATFORM                     ║
╚════════════════════════════════════════════════════════════╝

Transaction ID: ${transactionId}
Date: ${new Date().toLocaleDateString('en-IN')}

PARTIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Seller: [${userMode === 'Seller' ? 'YOU' : recipient.name}]
Buyer:  [${userMode === 'Buyer' ? 'YOU' : recipient.name}]
Platform: Bharose Pe (1% fee collected as platform charge)

TRANSACTION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Item/Service: ${transaction?.title || 'N/A'}
Description: ${transaction?.description || 'As mutually agreed'}
Total Amount: ₹${amount?.toLocaleString('en-IN')}
Platform Fee (1%): ₹${platformFee?.toLocaleString('en-IN')}
Escrow Amount: ₹${escrowAmount?.toLocaleString('en-IN')}

PAYMENT TERMS: ${getPaymentTermsText()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${getPaymentTermsDescription()}

DELIVERY TERMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Delivery/Completion Date: ${getDeliveryDate()}
• Timeline: ${contract.deliveryDays} days from order confirmation
• Location: As agreed between parties
• Proof of Delivery: Photo/Video evidence required

RETURN & REFUND POLICY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${getReturnPolicyText()}

WARRANTY & GUARANTEES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${getWarrantyText()}

CANCELLATION POLICY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${getCancellationPolicyText()}

DISPUTE RESOLUTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. In case of dispute, both parties agree to provide evidence
2. Platform will mediate using submitted photos/videos
3. Decisions will be made within 7 business days
4. Maximum platform liability: ₹${Math.max(platformFee, 1000)?.toLocaleString('en-IN')}

ADDITIONAL TERMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${contract.additionalTerms || 'None'}

LEGAL COMPLIANCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This agreement is governed by:
• Indian Contract Act, 1872
• Consumer Protection Act, 2019
• Information Technology Act, 2000
• Reserve Bank of India (RBI) Payment Guidelines
• Bharose Pe Terms of Service

ACKNOWLEDGMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Both parties acknowledge that they have read and understood
this agreement and agree to its terms. Payment will be held
in escrow by Bharose Pe platform until delivery confirmation
and dispute resolution (if any) is complete.

This is a digital contract issued by Bharose Pe platform.
OTP verification required before final confirmation.

Generated: ${new Date().toLocaleString('en-IN')}
    `;
  };

  const getPaymentTermsText = () => {
    const terms: Record<string, string> = {
      'full_upfront': 'FULL PAYMENT UPFRONT',
      '50_50': '50% ADVANCE, 50% ON DELIVERY',
      'milestone': 'MILESTONE-BASED PAYMENTS',
      'on_delivery': 'PAYMENT ON DELIVERY'
    };
    return terms[contract.paymentTerms] || terms.full_upfront;
  };

  const getPaymentTermsDescription = () => {
    const desc: Record<string, string> = {
      'full_upfront': 'Full payment will be held in escrow until delivery and buyer confirmation.',
      '50_50': '50% paid now to seller, 50% released after delivery confirmation.',
      'milestone': 'Payment released in stages as agreed milestones are completed.',
      'on_delivery': 'Payment held in full escrow until buyer confirms delivery/completion.'
    };
    return desc[contract.paymentTerms] || desc.full_upfront;
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + contract.deliveryDays);
    return date.toLocaleDateString('en-IN');
  };

  const getReturnPolicyText = () => {
    const policies: Record<string, string> = {
      'no_return': `No returns accepted. Item/Service is final sale.`,
      '7_days': `Items can be returned within 7 days of delivery in original condition.
  - Buyer initiates return and covers return shipping.
  - Refund processed after seller inspects returned item.`,
      '15_days': `Items can be returned within 15 days of delivery in original/unused condition.
  - Buyer initiates return request with reason.
  - Refund includes return shipping reimbursement.`,
      '30_days': `Items can be returned within 30 days of delivery.
  - Slight wear and tear acceptable.
  - Full refund minus platform fees processed within 3 days.`
    };
    return policies[contract.returnPolicy] || policies.no_return;
  };

  const getWarrantyText = () => {
    const warranties: Record<string, string> = {
      'none': 'No warranty provided. Item sold AS-IS.',
      '3_months': 'Manufacturing defects covered for 3 months from delivery.',
      '6_months': 'Manufacturing defects covered for 6 months from delivery.',
      '1_year': 'Full manufacturing warranty for 1 year from delivery.'
    };
    return warranties[contract.warranty] || warranties.none;
  };

  const getCancellationPolicyText = () => {
    const policies: Record<string, string> = {
      'non_refundable_after_work': 'Non-refundable after work has begun. 50% refundable before work starts.',
      'full_refund_7_days': 'Full refund available within 7 days of order. 50% refund after.',
      'custom': 'Custom cancellation policy as agreed between parties.'
    };
    return policies[contract.cancelPolicy] || policies.non_refundable_after_work;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-900">💡 How will payment be handled?</p>
            </div>

            {/* Pricing Calculator Section */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <PricingFormField
                label="💰 Transaction Amount"
                value={pricingData.baseAmount || transaction?.amount || 0}
                onChange={handleBaseAmountChange}
                category={transaction?.category || 'Electronics'}
                placeholder="Enter transaction amount"
                onPlatformFeeCalculated={handlePlatformFeeCalculated}
                onEscrowCalculated={handleEscrowCalculated}
              />
            </div>
            
            {[
              { value: 'full_upfront', label: '💰 Full Payment Upfront', desc: 'All money held in escrow until delivery' },
              { value: '50_50', label: '↔️ 50-50 Split', desc: 'Half now, half after delivery' },
              { value: 'milestone', label: '📊 Milestone Based', desc: 'Pay as work completes' },
              { value: 'on_delivery', label: '📦 Payment on Delivery', desc: 'Pay only when you receive it' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => handlePaymentTermsChange(option.value)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  contract.paymentTerms === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                  {contract.paymentTerms === option.value && (
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <p className="text-sm font-medium text-green-900">📅 How many days for delivery?</p>
            </div>

            <div className="space-y-3">
              <input
                type="number"
                min="1"
                max="90"
                value={contract.deliveryDays}
                onChange={(e) => setContract(prev => ({ ...prev, deliveryDays: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              />
              <p className="text-sm text-gray-600">
                ✅ Delivery by: <span className="font-semibold text-gray-900">{getDeliveryDate()}</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {[3, 7, 14].map(days => (
                <button
                  key={days}
                  onClick={() => setContract(prev => ({ ...prev, deliveryDays: days }))}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    contract.deliveryDays === days
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <p className="text-sm font-medium text-purple-900">↩️ What's your return policy?</p>
            </div>

            {[
              { value: 'no_return', label: '❌ No Returns', desc: 'Final sale, no returns accepted' },
              { value: '7_days', label: '↩️ 7 Days Return', desc: 'Return within 7 days for full refund' },
              { value: '15_days', label: '📦 15 Days Return', desc: 'Return within 15 days in good condition' },
              { value: '30_days', label: '✅ 30 Days Return', desc: 'Generous 30-day return window' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setContract(prev => ({ ...prev, returnPolicy: option.value }))}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  contract.returnPolicy === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                  {contract.returnPolicy === option.value && (
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
              <p className="text-sm font-medium text-amber-900">🛡️ Any additional terms?</p>
            </div>

            <textarea
              value={contract.additionalTerms}
              onChange={(e) => setContract(prev => ({ ...prev, additionalTerms: e.target.value }))}
              placeholder="Add any special conditions, warranty details, or custom terms here..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none min-h-32 resize-none"
            />

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-900">
                <strong>📋 Contract Summary:</strong>
              </p>
              <ul className="text-sm text-amber-800 mt-2 space-y-1">
                <li>✓ Payment: {getPaymentTermsText()}</li>
                <li>✓ Delivery: {contract.deliveryDays} days</li>
                <li>✓ Return Policy: {contract.returnPolicy}</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex flex-col items-center transition-all ${
                  currentStep >= step.id ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-500 text-white scale-110'
                    : currentStep > step.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                </div>
                <span className="text-xs font-medium text-center">{step.title}</span>
              </button>
              {idx < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-lg p-6 border border-gray-200 mb-6"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="flex-1 py-3 border-2 border-gray-200 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            Next → <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleCreateContract}
            disabled={loading}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      <p className="text-xs text-gray-500 mt-4 text-center">
        OTP verification will be required before finalizing
      </p>
    </div>
  );
};

export default ContractBuilder;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ContactSearch from '@/components/ContactSearch';
import SmartContractBuilder from '@/components/SmartContractBuilder';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { useTransactions } from '@/hooks/use-transactions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type TransactionRole = 'buyer' | 'seller';

export interface ContactInfo {
  id: string;
  name: string;
  phone: string;
}

export interface TransactionData {
  contact: ContactInfo | null;
  role: TransactionRole | null;
  details: any;
}

const TransactionSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { createTransaction } = useTransactions(userMode);
  const [currentStep, setCurrentStep] = useState(1);
  const [createdTransactionId, setCreatedTransactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Allow both sellers and buyers to create contracts/transactions
  const autoRole: TransactionRole = userMode === 'Seller' ? 'seller' : 'buyer';
  
  const [transactionData, setTransactionData] = useState<TransactionData>({
    contact: null,
    role: autoRole,
    details: {}
  });

  // Restore transaction state from sessionStorage on mount
  useEffect(() => {
    const savedTransactionId = sessionStorage.getItem('currentTransactionId');
    const savedStep = sessionStorage.getItem('transactionSetupStep');
    
    if (savedTransactionId) {
      console.log('✅ Restored transaction from session:', savedTransactionId);
      setCreatedTransactionId(savedTransactionId);
      
      if (savedStep === '2') {
        console.log('✅ Restored to step 2 (contract builder)');
        setCurrentStep(2);
      }
    }
  }, []);

  // Save transaction state to sessionStorage whenever it changes
  useEffect(() => {
    if (createdTransactionId) {
      sessionStorage.setItem('currentTransactionId', createdTransactionId);
      sessionStorage.setItem('transactionSetupStep', currentStep.toString());
      console.log('💾 Saved transaction state:', { createdTransactionId, currentStep });
    }
  }, [createdTransactionId, currentStep]);

  const steps = [
    { 
      id: 1, 
      title: userMode === 'Seller' ? 'Select Buyer' : 'Select Seller', 
      component: 'contact' 
    },
    { id: 2, title: 'Create Smart Contract', component: 'contract' }
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      // Create empty transaction when moving to contract step
      if (!user || !transactionData.contact) {
        toast.error('Please select a contact');
        return;
      }

      setLoading(true);
      try {
        const isSeller = userMode === 'Seller';
        
        // Create transaction with placeholder amount (will be updated when form is submitted)
        const { data, error } = await supabase
          .from('transactions')
          .insert([{
            title: 'Transaction (Details in Contract)',
            amount: 1, // Placeholder amount, will be updated in SmartContractBuilder
            description: '',
            seller_id: isSeller ? user.id : transactionData.contact.id,
            seller_phone: isSeller ? (user.user_metadata?.phone || user.phone) : transactionData.contact.phone,
            delivery_date: new Date().toISOString(),
            buyer_id: isSeller ? transactionData.contact.id : user.id,
            status: 'created'
          }])
          .select('id')
          .single();

        if (error) throw error;

        if (data?.id) {
          setCreatedTransactionId(data.id);
          setCurrentStep(2);
          toast.success('Ready to fill contract details');
        }
      } catch (error: any) {
        console.error('❌ Transaction creation failed:', error);
        toast.error(error?.message || 'Failed to create transaction');
      } finally {
        setLoading(false);
      }
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Clear session when going back to dashboard
      sessionStorage.removeItem('currentTransactionId');
      sessionStorage.removeItem('transactionSetupStep');
      navigate('/dashboard');
    }
  };

  const updateTransactionData = (field: keyof TransactionData, value: any) => {
    setTransactionData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bharose-card">
              <h3 className="font-medium mb-2">Your Role</h3>
              <p className="text-sm text-muted-foreground">
                You are creating this transaction as a <span className="font-medium text-bharose-primary">{userMode}</span>
              </p>
            </div>
            <ContactSearch
              selectedContact={transactionData.contact}
              onContactSelect={(contact) => updateTransactionData('contact', contact)}
            />
          </div>
        );
      case 2:
        return createdTransactionId ? (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg">📜 Smart Contract Builder</h3>
              <p className="text-sm text-muted-foreground">
                Select transaction type and fill industry-specific details to generate your contract
              </p>
            </div>

            <SmartContractBuilder
              transaction={{
                id: createdTransactionId,
                title: 'Transaction',
                description: '',
                seller_id: transactionData.role === 'seller' ? user?.id || '' : transactionData.contact?.id || '',
                buyer_id: transactionData.role === 'buyer' ? user?.id || '' : transactionData.contact?.id || '',
                amount: 0,
                industry: '',
                type: ''
              }}
              onContractGenerated={() => {
                toast.success('Contract generated successfully! 🎉');
                // Clear session before navigating
                sessionStorage.removeItem('currentTransactionId');
                sessionStorage.removeItem('transactionSetupStep');
                navigate('/contracts');
              }}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Creating transaction...</p>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return transactionData.contact;
      case 2:
        return createdTransactionId;
      default:
        return false;
    }
  };

  return (
    <div className="bharose-container pb-8">
      <Header 
        title="Create Transaction & Contract" 
        showBack 
        onBack={handleBack} 
      />
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step.id 
                ? 'bg-bharose-primary text-white' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2">
                <div className={`h-1 rounded ${
                  currentStep > step.id ? 'bg-bharose-primary' : 'bg-muted'
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">{steps[currentStep - 1].title}</h2>
        
        {renderStepContent()}

        <div className="flex gap-3 mt-8">
          <button
            onClick={handleBack}
            className="flex-1 py-3 border border-border rounded-lg font-medium"
          >
            Back
          </button>
          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              className="flex-1 bharose-primary-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {currentStep === 3 ? 'Creating Transaction...' : 'Loading...'}
                </span>
              ) : (
                currentStep === 3 ? 'Create Transaction' : 'Next'
              )}
            </button>
          ) : (
            <div className="flex-1 text-center text-sm text-muted-foreground">
              Use the contract form above to complete the process
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionSetup;

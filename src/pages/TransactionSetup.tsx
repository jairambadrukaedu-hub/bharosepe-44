
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ContactSearch from '@/components/ContactSearch';
import TransactionTypeSelection from '@/components/TransactionTypeSelection';
import TransactionDetails from '@/components/TransactionDetails';
import ContractSender from '@/components/ContractSender';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { useTransactions } from '@/hooks/use-transactions';
import { toast } from 'sonner';

export type TransactionRole = 'buyer' | 'seller';
export type TransactionType = 'goods' | 'services';

export interface ContactInfo {
  id: string;
  name: string;
  phone: string;
}

export interface TransactionData {
  contact: ContactInfo | null;
  role: TransactionRole | null;
  type: TransactionType | null;
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
    type: null,
    details: {}
  });

  const steps = [
    { 
      id: 1, 
      title: userMode === 'Seller' ? 'Select Buyer' : 'Select Seller', 
      component: 'contact' 
    },
    { id: 2, title: 'Transaction Type', component: 'type' },
    { id: 3, title: 'Transaction Details', component: 'details' },
    { id: 4, title: 'Send Contract', component: 'contract' }
  ];

  const handleNext = async () => {
    if (currentStep === 3) {
      // Create transaction before going to contract step
      await createTransactionAndProceed();
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const createTransactionAndProceed = async () => {
    if (!user || !transactionData.contact || !transactionData.type || !transactionData.details) {
      toast.error('Missing required information');
      return;
    }

    // Calculate amount based on transaction details
    // Parse as integer to avoid floating-point precision issues
    const amount = parseInt(transactionData.details.price || '0', 10);
    if (amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      console.log('📤 Creating transaction with payload:', {
        title: transactionData.details.productName || transactionData.details.serviceDescription || 'Transaction',
        amount,
        description: transactionData.details.description,
        seller_id: userMode === 'Seller' ? user.id : transactionData.contact.id,
        buyer_id: userMode === 'Buyer' ? user.id : transactionData.contact.id,
        seller_phone: userMode === 'Seller' ? (user.user_metadata?.phone || user.phone) : transactionData.contact.phone,
        delivery_date: transactionData.details.deliveryDate || transactionData.details.completionDate
      });

      const isSeller = userMode === 'Seller';
      const transactionId = await createTransaction({
        title: transactionData.details.productName || transactionData.details.serviceDescription || 'Transaction',
        amount,
        description: transactionData.details.description || '',
        seller_id: isSeller ? user.id : transactionData.contact.id,
        seller_phone: isSeller ? (user.user_metadata?.phone || user.phone) : transactionData.contact.phone,
        delivery_date: transactionData.details.deliveryDate || transactionData.details.completionDate,
        buyer_id: isSeller ? transactionData.contact.id : user.id
      });

      console.log('✅ Transaction created successfully with ID:', transactionId);
      
      if (transactionId) {
        setCreatedTransactionId(transactionId);
        setCurrentStep(4);
        toast.success('Transaction created! Now create and send a contract.');
      } else {
        throw new Error('Transaction was created but no ID was returned');
      }
    } catch (error: any) {
      console.error('❌ Transaction creation failed:', error);
      toast.error(error?.message || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
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
        return (
          <TransactionTypeSelection
            selectedType={transactionData.type}
            onTypeSelect={(type) => updateTransactionData('type', type)}
          />
        );
      case 3:
        return (
          <TransactionDetails
            transactionType={transactionData.type}
            details={transactionData.details}
            onDetailsUpdate={(details) => updateTransactionData('details', details)}
          />
        );
      case 4:
        return createdTransactionId ? (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg">Send Contract</h3>
              <p className="text-sm text-muted-foreground">
                Create and send a contract to formalize the transaction terms
              </p>
            </div>

            <ContractSender
              transactionId={createdTransactionId}
              onContractSent={() => {
                toast.success('Contract sent successfully! 🎉');
                navigate('/contracts');
              }}
              preSelectedRecipient={{
                id: transactionData.contact!.id,
                name: transactionData.contact!.name,
                phone: transactionData.contact!.phone
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
        return transactionData.type;
      case 3:
        return Object.keys(transactionData.details).length > 0 && transactionData.details.price;
      case 4:
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

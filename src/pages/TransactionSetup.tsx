
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ContactSearch from '@/components/ContactSearch';
import ContractGenerationUI from '@/components/ContractGenerationUI';
import { FormFlow } from '@/components/forms/FormAppNewFlow';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { useTransactions } from '@/hooks/use-transactions';
import { saveFormSubmission } from '@/services/formSubmissionService';
import { getAllFormCategories } from '@/services/formConfigurations';
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
  formSubmissionData: {
    industryId: string | null;
    formData: Record<string, any>;
  };
  details: any;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Map industry ID to annexure code
 */
const getAnnexureCode = (industryId: string): string => {
  const annexureMap: Record<string, string> = {
    electronics: 'A',
    mobile: 'B',
    furniture: 'C',
    vehicles: 'D',
    jewellery: 'E',
    'fashion-apparel': 'F',
    books: 'G',
    'building-materials': 'H',
    collectibles: 'I',
    industrial: 'J',
    appliances: 'K',
    'home-repair': 'L',
    design: 'M',
    consulting: 'N',
    tutoring: 'O',
    photography: 'P',
    cleaning: 'Q',
    events: 'R',
  };

  return annexureMap[industryId] || 'A';
};

const TransactionSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { createTransaction } = useTransactions(userMode);
  const [currentStep, setCurrentStep] = useState(1);
  const [createdTransactionId, setCreatedTransactionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formId, setFormId] = useState<string>(() => {
    // Generate formId once on component mount and reuse it
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `FORM-${timestamp}-${random}`;
  });
  
  // Allow both sellers and buyers to create contracts/transactions
  const autoRole: TransactionRole = userMode === 'Seller' ? 'seller' : 'buyer';
  
  const [transactionData, setTransactionData] = useState<TransactionData>({
    contact: null,
    role: autoRole,
    formSubmissionData: {
      industryId: null,
      formData: {}
    },
    details: {}
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  // Restore transaction state from storage on mount
  useEffect(() => {
    // Load all categories
    setCategories(getAllFormCategories());
    
    // Try sessionStorage first (current session), then localStorage (fallback)
    let savedState = sessionStorage.getItem('transactionSetupState');
    if (!savedState) {
      savedState = localStorage.getItem('transactionSetupState');
      if (savedState) {
        console.log('📦 Restored from localStorage (sessionStorage was cleared)');
      }
    }
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        console.log('✅ Restored full transaction state:', parsedState);
        console.log('📍 Current step being restored:', parsedState.currentStep);
        
        // Restore all state - use a small delay to ensure state updates properly
        setTimeout(() => {
          setCurrentStep(parsedState.currentStep || 1);
          setCreatedTransactionId(parsedState.createdTransactionId);
          setTransactionData(parsedState.transactionData || {
            contact: null,
            role: autoRole,
            formSubmissionData: { industryId: null, formData: {} },
            details: {}
          });
          setSelectedCategory(parsedState.selectedCategory);
          setSelectedIndustry(parsedState.selectedIndustry);
          
          console.log('✅ State restored and applied successfully');
        }, 0);
      } catch (error) {
        console.error('❌ Failed to restore transaction state:', error);
        // Clear bad data
        sessionStorage.removeItem('transactionSetupState');
        localStorage.removeItem('transactionSetupState');
      }
    } else {
      console.log('📝 No saved state found - starting fresh');
    }
  }, []);

  // Save FULL transaction state to BOTH sessionStorage and localStorage on any change
  useEffect(() => {
    const stateToSave = {
      currentStep,
      createdTransactionId,
      transactionData,
      selectedCategory,
      selectedIndustry
    };
    
    try {
      sessionStorage.setItem('transactionSetupState', JSON.stringify(stateToSave));
      localStorage.setItem('transactionSetupState', JSON.stringify(stateToSave));
      console.log('💾 Saved transaction state to both storages - Step:', currentStep);
    } catch (error) {
      console.error('❌ Failed to save transaction state:', error);
    }
  }, [currentStep, createdTransactionId, transactionData, selectedCategory, selectedIndustry]);

  const steps = [
    { 
      id: 1, 
      title: userMode === 'Seller' ? 'Search Buyer' : 'Search Seller', 
      component: 'contact' 
    },
    { 
      id: 2, 
      title: 'Select Category', 
      component: 'category' 
    },
    { 
      id: 3, 
      title: 'Select Industry & Fill Details', 
      component: 'form' 
    }
  ];

  const handleNext = async () => {
    if (currentStep === 1) {
      // Move from contact search to category selection
      if (!transactionData.contact) {
        toast.error('Please select a contact');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Move from category selection to form (industry selection + form filling)
      if (!selectedCategory) {
        toast.error('Please select a category');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Move to contract generation after form filled
      if (!transactionData.formSubmissionData.industryId) {
        toast.error('Please select an industry and fill the form');
        return;
      }

      setLoading(true);
      try {
        const isSeller = userMode === 'Seller';
        
        // Create transaction with placeholder amount (will be updated when contract is generated)
        const { data, error } = await supabase
          .from('transactions')
          .insert([{
            title: 'Transaction (Details in Contract)',
            amount: 1, // Placeholder amount, will be updated in contract generation
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
          sessionStorage.setItem('currentTransactionId', data.id);
          // Navigate to contract generation
          navigate(`/contract/${data.id}`, {
            state: { transactionData }
          });
        }
      } catch (error: any) {
        console.error('❌ Transaction creation failed:', error);
        toast.error(error?.message || 'Failed to create transaction');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Clear all storage when going back to dashboard
      sessionStorage.removeItem('transactionSetupState');
      sessionStorage.removeItem('currentTransactionId');
      sessionStorage.removeItem('transactionSetupStep');
      localStorage.removeItem('transactionSetupState');
      console.log('🧹 Cleared transaction state storage');
      navigate('/dashboard');
    }
  };

  const updateTransactionData = (field: keyof TransactionData, value: any) => {
    console.log(`🔄 Updating transaction data - ${field}:`, value);
    console.log('👤 Current user mode:', userMode);
    
    if (field === 'contact') {
      console.log('✅ Contact selected for transaction');
      console.log('📋 Contact details:', {
        id: value?.id,
        name: value?.name,
        phone: value?.phone
      });
    }
    
    setTransactionData(prev => {
      const updated = { ...prev, [field]: value };
      console.log('💾 Updated transaction data:', updated);
      return updated;
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <ContactSearch
              selectedContact={transactionData.contact}
              onContactSelect={(contact) => updateTransactionData('contact', contact)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              What type are you trading?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setSelectedCategory('goods');
                }}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all text-center ${
                  selectedCategory === 'goods'
                    ? 'border-bharose-primary bg-bharose-primary/5'
                    : 'border-border hover:border-bharose-primary/50'
                }`}
              >
                <div className="text-4xl mb-2">📦</div>
                <h4 className="font-medium">Goods</h4>
              </div>
              <div
                onClick={() => {
                  setSelectedCategory('services');
                }}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all text-center ${
                  selectedCategory === 'services'
                    ? 'border-bharose-primary bg-bharose-primary/5'
                    : 'border-border hover:border-bharose-primary/50'
                }`}
              >
                <div className="text-4xl mb-2">🔧</div>
                <h4 className="font-medium">Services</h4>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bharose-card">
              <h3 className="font-medium mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                {transactionData.contact?.name} • {transactionData.contact?.phone}
              </p>
              <h3 className="font-medium mt-4 mb-2">Category</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedCategory}
              </p>
            </div>
            <FormFlow
              formId={formId}
              categoryFilter={selectedCategory}
              onSubmit={async (industryId: string, formData: Record<string, any>) => {
                console.log('✅ Form submitted:', { industryId, formData, formId });
                
                // Save form data to database
                if (user) {
                  const saved = await saveFormSubmission({
                    user_id: user.id,
                    form_id: formId, // Use the consistent formId
                    industry_category: industryId,
                    annexure_code: getAnnexureCode(industryId),
                    form_data: formData,
                    status: 'completed'
                  });

                  if (saved) {
                    updateTransactionData('formSubmissionData', {
                      industryId,
                      formData
                    });
                    toast.success('Form details saved! Creating transaction...');
                    handleNext();
                  } else {
                    toast.error('Failed to save form details');
                  }
                }
              }}
              onSaveDraft={async (industryId: string, formData: Record<string, any>) => {
                console.log('💾 Form saved as draft:', { industryId, formData, formId });
                
                if (user) {
                  await saveFormSubmission({
                    user_id: user.id,
                    form_id: formId, // Use the consistent formId, not a new one
                    industry_category: industryId,
                    annexure_code: getAnnexureCode(industryId),
                    form_data: formData,
                    status: 'draft'
                  });
                }
              }}
              onClose={() => {
                setCurrentStep(2);
              }}
            />
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
        return selectedCategory;
      case 3:
        return transactionData.formSubmissionData.industryId;
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
        <h2 className="text-xl font-semibold mb-2">
          {steps && steps[currentStep - 1] ? steps[currentStep - 1].title : 'Loading...'}
        </h2>
        
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

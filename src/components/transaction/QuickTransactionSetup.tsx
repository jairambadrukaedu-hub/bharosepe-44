import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Search, X, IndianRupee, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactSearch } from '@/hooks/use-contact-search';
import { useTransactions } from '@/hooks/use-transactions';
import { useContracts } from '@/hooks/use-contracts';
import ContractSender from '@/components/ContractSender';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface QuickTransactionData {
  sellerPhone: string;
  title: string;
  amount: string;
  description: string;
  deliveryDate: string;
}

const QuickTransactionSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { searchByPhone, findUserByPhone, contacts, loading: searchLoading } = useContactSearch();
  const { createTransaction } = useTransactions('Buyer');
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [createdTransactionId, setCreatedTransactionId] = useState<string | null>(null);
  
  const [data, setData] = useState<QuickTransactionData>({
    sellerPhone: '',
    title: '',
    amount: '',
    description: '',
    deliveryDate: ''
  });

  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (data.sellerPhone.length >= 3) {
      searchByPhone(data.sellerPhone);
    }
  }, [data.sellerPhone]);

  const handlePhoneComplete = async () => {
    console.log('🔍 Looking for user with phone:', data.sellerPhone);
    
    if (data.sellerPhone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }
    
    setLoading(true);
    
    try {
      const seller = await findUserByPhone(data.sellerPhone);
      console.log('👤 Found seller:', seller);
      
      if (seller) {
        // Check if user is trying to create transaction with themselves
        if (seller.id === user.id) {
          toast.error('You cannot create a transaction with yourself');
          return;
        }
        
        setSelectedSeller(seller);
        setStep(2);
        toast.success(`Found user: ${seller.full_name}`);
      } else {
        toast.error('No registered user found with this phone number. They need to sign up first.');
      }
    } catch (error) {
      console.error('❌ Error finding user:', error);
      toast.error('Error searching for user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (contact: any) => {
    setSelectedSeller(contact);
    setData(prev => ({ ...prev, sellerPhone: contact.phone }));
    setStep(2);
  };

  const handleSubmit = async () => {
    console.log('🚀 Form submission started with comprehensive data:', { 
      title: data.title, 
      amount: data.amount, 
      seller: selectedSeller,
      user: user?.id 
    });
    
    if (!user) {
      console.error('❌ User not authenticated');
      toast.error('Please log in to continue');
      return;
    }
    
    if (!data.title?.trim()) {
      console.error('❌ Title validation failed');
      toast.error('Please enter a transaction title');
      return;
    }
    
    if (!data.amount || parseFloat(data.amount) <= 0) {
      console.error('❌ Amount validation failed:', data.amount);
      toast.error('Please enter a valid amount');
      return;
    }
    
    if (!selectedSeller) {
      console.error('❌ No seller selected');
      toast.error('Please select a seller');
      return;
    }

    setLoading(true);
    
    try {
      console.log('📤 Creating transaction with payload:', {
        title: data.title.trim(),
        amount: parseFloat(data.amount),
        description: data.description?.trim() || undefined,
        seller_id: selectedSeller.id,
        seller_phone: selectedSeller.phone,
        delivery_date: data.deliveryDate || undefined
      });

      const transactionId = await createTransaction({
        title: data.title.trim(),
        amount: parseFloat(data.amount),
        description: data.description?.trim() || undefined,
        seller_id: selectedSeller.id,
        seller_phone: selectedSeller.phone,
        delivery_date: data.deliveryDate || undefined
      });

      console.log('✅ Transaction created successfully with ID:', transactionId);
      
      if (transactionId) {
        setCreatedTransactionId(transactionId);
        setStep(3); // Move to contract step
        toast.success('Transaction created! Now create and send a contract.');
      } else {
        console.error('❌ No transaction ID returned from createTransaction');
        throw new Error('Transaction was created but no ID was returned');
      }
    } catch (error: any) {
      console.error('❌ Transaction creation failed:', {
        error,
        message: error?.message,
        stack: error?.stack
      });
      
      // Show user-friendly error message
      const errorMessage = error?.message || 'Failed to create transaction';
      toast.error(errorMessage);
      
      // Log additional debugging info
      console.log('🔍 Debug info:', {
        userAuthenticated: !!user,
        userID: user?.id,
        sellerSelected: !!selectedSeller,
        sellerID: selectedSeller?.id,
        formData: data
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContractSent = () => {
    console.log('✅ Contract sent successfully! Navigating to transactions page...');
    toast.success('Contract sent successfully! 🎉');
    navigate('/transactions');
  };

  const handleSkipContract = () => {
    console.log('⏭️ User chose to skip contract creation');
    toast.info('Proceeding without contract. You can create one later.');
    navigate('/transactions');
  };

  const updateField = (field: keyof QuickTransactionData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bharose-card max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Quick Transaction</h2>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className={`w-2 h-2 rounded-full ${
                step >= i ? 'bg-bharose-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 3: Send Contract */}
        {step === 3 && createdTransactionId && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg">Send Contract</h3>
              <p className="text-sm text-muted-foreground">
                Send a contract to formalize the transaction terms
              </p>
            </div>

            <ContractSender
              transactionId={createdTransactionId}
              onContractSent={handleContractSent}
              preSelectedRecipient={selectedSeller ? {
                id: selectedSeller.id,
                name: selectedSeller.full_name,
                phone: selectedSeller.phone
              } : undefined}
            />

            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleSkipContract}
                className="flex-1"
              >
                Skip & Proceed to Payment
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">
                Seller's Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={data.sellerPhone}
                  onChange={(e) => updateField('sellerPhone', e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  className="bharose-input pr-8"
                />
                {data.sellerPhone && (
                  <button
                    onClick={() => updateField('sellerPhone', '')}
                    className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              {/* Test numbers hint */}
              <div className="mt-2 text-xs text-muted-foreground">
                Search for registered users by phone number
              </div>
            </div>

            {/* Contact Suggestions */}
            {contacts.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-bharose-primary">Registered Users:</p>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {contacts.slice(0, 3).map(contact => (
                    <button
                      key={contact.id}
                      onClick={() => handleSelectSuggestion(contact)}
                      className="w-full text-left p-2 rounded border hover:bg-muted transition-colors"
                    >
                      <div className="font-medium text-sm">{contact.full_name}</div>
                      <div className="text-xs text-bharose-primary">{contact.phone} • {contact.role}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {data.sellerPhone.length >= 10 && contacts.length === 0 && !searchLoading && (
              <div className="mt-4 p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <p className="text-sm text-yellow-800">
                  No registered user found with this phone number. They need to sign up on Bharosepe first.
                </p>
              </div>
            )}

            <Button 
              onClick={handlePhoneComplete}
              className="w-full bharose-primary-button"
              disabled={data.sellerPhone.length !== 10 || loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </span>
              ) : (
                <>Continue <ArrowRight size={16} className="ml-2" /></>
              )}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Transaction Title *</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. iPhone 13 Purchase"
                className="bharose-input"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Amount (₹) *</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={data.amount}
                  onChange={(e) => updateField('amount', e.target.value.replace(/\D/g, ''))}
                  placeholder="0"
                  className="bharose-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Expected Delivery</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  value={data.deliveryDate}
                  onChange={(e) => updateField('deliveryDate', e.target.value)}
                  className="bharose-input pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                value={data.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Brief description of the transaction"
                className="bharose-input min-h-[60px] resize-none"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={loading || !data.title || !data.amount}
                className="flex-1 bharose-primary-button"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </span>
                ) : (
                  'Create & Send Contract'
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickTransactionSetup;
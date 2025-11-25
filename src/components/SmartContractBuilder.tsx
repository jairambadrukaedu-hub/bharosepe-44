import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Info, AlertCircle, CheckCircle2, FileText, Download, Share2, Copy, Clock, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import GoodsIndustrySelector from '@/components/GoodsIndustrySelector';
import { IndustryTemplate, GOODS_INDUSTRY_TEMPLATES } from '@/services/goodsIndustryTemplates';
import { generateContractFromTemplate } from '@/services/aiContractGenerator';
import { getCurrentUserProfile, getUserProfileById } from '@/services/profileService';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

interface SmartContractBuilderProps {
  transaction: {
    id: string;
    title: string;
    description: string;
    seller_id: string;
    buyer_id: string;
    amount: number;
    industry?: string;
    type?: string;
  };
  onContractGenerated?: (contract: any) => void;
}

interface FieldValue {
  [key: string]: any;
}

interface InfoButtonState {
  [key: string]: boolean;
}

const SmartContractBuilder: React.FC<SmartContractBuilderProps> = ({
  transaction,
  onContractGenerated
}) => {
  const { user } = useAuth();
  const [transactionType, setTransactionType] = useState<'goods' | 'services' | null>(transaction.type as 'goods' | 'services');
  const [template, setTemplate] = useState<IndustryTemplate | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(transaction.industry || '');
  const [formData, setFormData] = useState<FieldValue>({});
  const [buyerProfile, setBuyerProfile] = useState<any>(null);
  const [sellerProfile, setSellerProfile] = useState<any>(null);
  const [showInfoButtons, setShowInfoButtons] = useState<InfoButtonState>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContract, setGeneratedContract] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<'type' | 'industry' | 'form' | 'preview'>('type');
  const [loading, setLoading] = useState(true);
  const [restoredFromStorage, setRestoredFromStorage] = useState(false);

  // Restore contract AND step from localStorage on mount - ONLY ONCE
  useEffect(() => {
    console.log('🔍 Checking localStorage for transaction:', transaction.id);
    const savedContract = localStorage.getItem(`contract_preview_${transaction.id}`);
    const savedStep = localStorage.getItem(`contract_step_${transaction.id}`);
    const savedFormData = localStorage.getItem(`contract_formdata_${transaction.id}`);
    
    console.log('💾 Saved contract exists:', !!savedContract);
    console.log('💾 Saved step:', savedStep);
    console.log('💾 Saved formData exists:', !!savedFormData);
    
    if (savedContract && !restoredFromStorage) {
      try {
        const contract = JSON.parse(savedContract);
        console.log('✅ Parsed contract from localStorage:', contract.contractId);
        setGeneratedContract(contract);
        
        // Restore formData if available
        if (savedFormData) {
          try {
            const formDataRestored = JSON.parse(savedFormData);
            setFormData(formDataRestored);
            console.log('✅ FormData restored from localStorage');
          } catch (err) {
            console.warn('⚠️ Failed to restore formData:', err);
          }
        }
        
        // Restore the step, defaulting to 'preview' if not saved
        const stepToRestore = (savedStep || 'preview') as 'type' | 'industry' | 'form' | 'preview';
        console.log('📍 Restoring to step:', stepToRestore);
        
        setCurrentStep(stepToRestore);
        setRestoredFromStorage(true);
        console.log('✅ Contract and step restored from localStorage');
      } catch (error) {
        console.error('❌ Failed to restore contract from localStorage:', error);
        localStorage.removeItem(`contract_preview_${transaction.id}`);
        localStorage.removeItem(`contract_step_${transaction.id}`);
        localStorage.removeItem(`contract_formdata_${transaction.id}`);
        setRestoredFromStorage(true);
      }
    } else if (!savedContract) {
      setRestoredFromStorage(true);
    }
  }, [transaction.id]);

  // Persist current step to localStorage only after restoration is complete
  useEffect(() => {
    if (restoredFromStorage) {
      localStorage.setItem(`contract_step_${transaction.id}`, currentStep);
      console.log('💾 Saved current step to localStorage:', currentStep);
    }
  }, [currentStep, transaction.id, restoredFromStorage]);

  // Persist formData to localStorage whenever it changes
  useEffect(() => {
    if (restoredFromStorage && Object.keys(formData).length > 0) {
      localStorage.setItem(`contract_formdata_${transaction.id}`, JSON.stringify(formData));
      console.log('💾 Saved formData to localStorage');
    }
  }, [formData, transaction.id, restoredFromStorage]);

  // Load profiles on mount
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        if (user) {
          console.log('📥 Loading profiles for transaction:', {
            userId: user.id,
            sellerId: transaction.seller_id,
            buyerId: transaction.buyer_id,
            isCurrentUserSeller: transaction.seller_id === user.id
          });

          // Load current user profile
          const currentProfile = await getCurrentUserProfile(user.id);
          if (!currentProfile) {
            console.error('❌ Current profile not found');
            toast.error('Failed to load your profile');
            setLoading(false);
            return;
          }
          console.log('✅ Current profile loaded:', {
            name: currentProfile.name,
            email: currentProfile.email,
            phone: currentProfile.phone,
            address: currentProfile.address
          });

          // Determine who is seller and who is buyer based on transaction
          if (transaction.seller_id && transaction.seller_id === user.id) {
            // Current user is SELLER
            console.log('👤 Current user is SELLER');
            setSellerProfile(currentProfile);
            
            // Load BUYER profile from database
            if (transaction.buyer_id) {
              try {
                const buyerProfileData = await getUserProfileById(transaction.buyer_id);
                if (buyerProfileData) {
                  console.log('✅ Buyer profile loaded:', {
                    name: buyerProfileData.name,
                    email: buyerProfileData.email,
                    phone: buyerProfileData.phone,
                    address: buyerProfileData.address
                  });
                  setBuyerProfile(buyerProfileData);
                } else {
                  console.warn('⚠️ Buyer profile not found, will show placeholder');
                }
              } catch (err) {
                console.warn('⚠️ Error loading buyer profile, will show placeholder:', err);
              }
            }
          } else if (transaction.buyer_id && transaction.buyer_id === user.id) {
            // Current user is BUYER
            console.log('👤 Current user is BUYER');
            setBuyerProfile(currentProfile);
            
            // Load SELLER profile from database
            if (transaction.seller_id) {
              try {
                const sellerProfileData = await getUserProfileById(transaction.seller_id);
                if (sellerProfileData) {
                  console.log('✅ Seller profile loaded:', {
                    name: sellerProfileData.name,
                    email: sellerProfileData.email,
                    phone: sellerProfileData.phone,
                    address: sellerProfileData.address
                  });
                  setSellerProfile(sellerProfileData);
                } else {
                  console.warn('⚠️ Seller profile not found, will show placeholder');
                }
              } catch (err) {
                console.warn('⚠️ Error loading seller profile, will show placeholder:', err);
              }
            }
          } else {
            console.warn('⚠️ Current user role cannot be determined from transaction IDs');
            // Set current user as one of the parties for display purposes
            setBuyerProfile(currentProfile);
          }
          
          console.log('✅ Profiles loaded (with fallbacks to placeholders)');
        }
        setLoading(false);
      } catch (error: any) {
        console.error('❌ Error loading profiles:', error);
        console.warn('⚠️ Continuing with current profile only');
        // Set current user profile so at least something is displayed
        if (user) {
          setBuyerProfile({
            name: user.user_metadata?.full_name || 'Current User',
            email: user.email || '',
            phone: user.user_metadata?.phone || '',
            address: ''
          });
        }
        setLoading(false);
      }
    };

    loadProfiles();
  }, [user, transaction]);

  // Load template when industry changes
  useEffect(() => {
    if (selectedIndustry && transactionType === 'goods') {
      const newTemplate = GOODS_INDUSTRY_TEMPLATES[selectedIndustry];
      if (newTemplate) {
        setTemplate(newTemplate);
        // Initialize form data with empty values for all fields
        const initialData: FieldValue = {};
        newTemplate.fields.forEach(field => {
          initialData[field.name] = '';
        });
        setFormData(initialData);
      }
    }
  }, [selectedIndustry, transactionType]);

  const handleSelectIndustry = (industryId: string, industryTemplate: IndustryTemplate) => {
    setSelectedIndustry(industryId);
    setTemplate(industryTemplate);
    setCurrentStep('form');
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const toggleInfoButton = (fieldName: string) => {
    setShowInfoButtons(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const validateForm = (): boolean => {
    if (!template) return false;

    const requiredFields = template.mandatoryFieldsForContract;
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');

    if (missingFields.length > 0) {
      toast.error(`Please fill required fields: ${missingFields.join(', ')}`);
      return false;
    }

    return true;
  };

  const generateContract = async () => {
    if (!validateForm() || !template) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsGenerating(true);
    try {
      // Update transaction with amount and details before generating contract
      const priceAmount = parseFloat(formData.price || '0');
      
      if (priceAmount <= 0) {
        toast.error('Please enter a valid price/amount');
        setIsGenerating(false);
        return;
      }

      console.log('💾 Updating transaction with amount:', priceAmount);

      // Update the transaction in database with the price/amount
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          amount: priceAmount,
          description: formData.itemDescription || formData.itemTitle || '',
          title: formData.itemTitle || transaction.title
        })
        .eq('id', transaction.id);

      if (updateError) {
        console.error('❌ Error updating transaction:', updateError);
        toast.error(`Failed to update transaction: ${updateError.message}`);
        setIsGenerating(false);
        return;
      }

      console.log('✅ Transaction updated, generating contract...');
      console.log('📋 Contract generation params:', {
        selectedIndustry,
        hasTemplate: !!template,
        hasBuyerProfile: !!buyerProfile,
        hasSellerProfile: !!sellerProfile,
        formDataKeys: Object.keys(formData)
      });

      const contract = await generateContractFromTemplate({
        buyerProfile: buyerProfile || null,
        sellerProfile: sellerProfile || null,
        transactionTitle: formData.itemTitle || transaction.title,
        transactionDescription: formData.itemDescription || transaction.description,
        industryType: selectedIndustry,
        formData,
        template
      });

      console.log('✅ Contract generated successfully:', contract);

      setGeneratedContract(contract);
      setCurrentStep('preview');

      // Save contract to localStorage for persistence across page reloads
      try {
        localStorage.setItem(`contract_preview_${transaction.id}`, JSON.stringify(contract));
        localStorage.setItem(`contract_step_${transaction.id}`, 'preview');
        localStorage.setItem(`contract_formdata_${transaction.id}`, JSON.stringify(formData));
        console.log('✅ Contract, step, and formData saved to localStorage');
      } catch (error) {
        console.warn('Failed to save contract to localStorage:', error);
      }

      // Save contract to database
      if (user && contract) {
        console.log('💾 Saving contract to database...');
        
        // Determine if current user is buyer or seller
        let userRole: 'buyer' | 'seller' = 'buyer';
        if (transaction.seller_id === user.id) {
          userRole = 'seller';
        } else if (transaction.buyer_id === user.id) {
          userRole = 'buyer';
        }
        
        const { error: contractError } = await supabase.from('contracts').insert([
          {
            transaction_id: transaction.id,
            created_by: user.id,
            contract_content: contract.content,
            terms: contract.summary || '',
            amount: parseFloat(formData.price || '0'),
            status: 'draft',
            initiator_role: userRole,
            counterparty_role: userRole === 'seller' ? 'buyer' : 'seller'
          }
        ])
        .select('id')
        .single();

        if (contractError) {
          console.error('⚠️ Warning: Contract saved to preview but not to database:', contractError);
          // Don't fail if contract save fails - it's already generated
        } else {
          console.log('✅ Contract saved to database');
        }
      }

      toast.success('Contract generated! Review below.');
    } catch (error: any) {
      console.error('❌ Error generating contract:', error);
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        cause: error?.cause
      });
      toast.error(`Failed to generate contract: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin">⏳</div>
        <p className="ml-2">Loading profiles...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* STEP 1: TRANSACTION TYPE SELECTION */}
      {currentStep === 'type' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bharose-card">
            <h2 className="text-2xl font-bold mb-6">Select Transaction Type</h2>

            <div className="space-y-4">
              {[
                { value: 'goods', label: '📦 Goods', description: 'Physical products to buy/sell' },
                { value: 'services', label: '🔧 Services', description: 'Services to be provided' }
              ].map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setTransactionType(option.value as 'goods' | 'services');
                    setCurrentStep('industry');
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    transactionType === option.value
                      ? 'border-bharose-primary bg-bharose-primary/5'
                      : 'border-gray-200 hover:border-bharose-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{option.label}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {transactionType === option.value && (
                      <CheckCircle2 className="w-6 h-6 text-bharose-primary" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: INDUSTRY SELECTION (FOR GOODS) */}
      {currentStep === 'industry' && transactionType === 'goods' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <GoodsIndustrySelector onSelectIndustry={handleSelectIndustry} />

          <Button
            variant="outline"
            onClick={() => setCurrentStep('type')}
            className="w-full"
          >
            ← Back to Type Selection
          </Button>
        </motion.div>
      )}

      {/* STEP 3: DYNAMIC FORM WITH INFO BUTTONS */}
      {currentStep === 'form' && template && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bharose-card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                Fill {template.name} Details
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedIndustry('');
                  setCurrentStep('industry');
                }}
              >
                Change Industry
              </Button>
            </div>

            <div className="space-y-6">
              {template.fields.map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <motion.button
                      onClick={() => toggleInfoButton(field.name)}
                      className="text-bharose-primary hover:bg-bharose-primary/10 p-1 rounded transition-all"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Info size={18} />
                    </motion.button>
                  </div>

                  {/* INFO POPUP */}
                  <AnimatePresence>
                    {showInfoButtons[field.name] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4"
                      >
                        <p className="text-sm text-blue-900 mb-2">{field.info}</p>
                        {field.legalReferenceActs && field.legalReferenceActs.length > 0 && (
                          <div className="text-xs text-blue-700 mt-2">
                            <strong>Legal Reference:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {field.legalReferenceActs.map((act, idx) => (
                                <li key={idx}>{act}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INPUT FIELDS */}
                  {field.type === 'text' && (
                    <Input
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full"
                    />
                  )}

                  {field.type === 'number' && (
                    <div className="space-y-3">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          handleInputChange(field.name, value);
                        }}
                        className="w-full"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'textfield',
                        }}
                      />
                      {/* Only show platform fee for price-related fields */}
                      {formData[field.name] && (field.name === 'totalPrice' || field.name === 'price') && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Platform Fee — Auto Calculated (1%)</p>
                          <p className="text-lg font-bold text-blue-900 mt-1">₹ {Math.floor(parseInt(formData[field.name]) * 0.01).toLocaleString('en-IN')}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {field.type === 'date' && (
                    <Input
                      type="date"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <Textarea
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full min-h-20"
                    />
                  )}

                  {field.type === 'select' && field.options && (
                    <Select
                      value={formData[field.name] || ''}
                      onValueChange={(value) => handleInputChange(field.name, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.type === 'checkbox' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) => handleInputChange(field.name, e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-sm">{field.label}</label>
                    </div>
                  )}

                  {field.type === 'checkboxgroup' && field.options && (
                    <div className="space-y-2">
                      {field.options.map((option) => (
                        <div key={option.value} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={(formData[field.name] || []).includes(option.value)}
                            onChange={(e) => {
                              const current = formData[field.name] || [];
                              if (e.target.checked) {
                                handleInputChange(field.name, [...current, option.value]);
                              } else {
                                handleInputChange(field.name, current.filter((v: string) => v !== option.value));
                              }
                            }}
                            className="w-4 h-4"
                          />
                          <label className="text-sm">{option.label}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('industry')}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={generateContract}
                disabled={isGenerating}
                className="flex-1 bg-bharose-primary hover:bg-bharose-primary/90"
              >
                {isGenerating ? '🔄 Generating Contract...' : '✨ Generate Contract'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 4: CONTRACT PREVIEW - PREMIUM LEGAL DOCUMENT VIEWER */}
      {currentStep === 'preview' && generatedContract && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col gap-0 bg-gray-100 min-h-screen pb-12 overflow-x-hidden"
        >
          {/* Profile Loading Status */}
          {(!buyerProfile || !sellerProfile) && (
            <div className="bg-yellow-50 border-b border-yellow-200 px-4 sm:px-8 py-4">
              <p className="text-sm text-yellow-800">
                ⚠️ Note: Some party details may not be available. Buyer profile: {buyerProfile ? '✓' : '✗'} | Seller profile: {sellerProfile ? '✓' : '✗'}
              </p>
            </div>
          )}
          {/* Sticky Top Bar */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-sm overflow-x-hidden">
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-full w-full gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-bharose-primary flex-shrink-0" />
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">Contract Preview</h2>
                  <p className="text-xs text-gray-500 truncate">ID: {generatedContract.contractId?.substring(0, 12)}...</p>
                </div>
              </div>
              <div className="flex gap-1 sm:gap-2 items-center flex-shrink-0" onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Simple refresh - just show toast (contract is already displayed)
                    toast.success('Contract refreshed!');
                    return false;
                  }}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Refresh Contract Preview"
                  type="button"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard.writeText(generatedContract.contractId);
                    toast.success('Contract ID copied!');
                    return false;
                  }}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Copy Contract ID"
                  type="button"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast.info('Share feature coming soon');
                    return false;
                  }}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Share Contract"
                  type="button"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const element = document.createElement('a');
                    const file = new Blob([generatedContract.content], { type: 'text/plain' });
                    element.href = URL.createObjectURL(file);
                    element.download = `contract-${generatedContract.contractId}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    toast.success('Contract downloaded!');
                    return false;
                  }}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Download Contract"
                  type="button"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Document Viewer Container */}
          <div className="flex-1 px-2 sm:px-4 py-6 sm:py-8 overflow-x-hidden w-full flex justify-center">
            <div className="w-full max-w-4xl overflow-x-hidden">
              {/* Premium White Document Container */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl overflow-hidden border border-gray-200 mx-auto">
                {/* Document Header Section */}
                <div className="px-5 sm:px-8 md:px-12 py-8 sm:py-12 border-b-2 border-gray-300 bg-white">
                  <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 text-center mb-2 break-words line-clamp-3">Professional Service Agreement</h1>
                  <p className="text-center text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8 break-words font-medium">Bharose PE Platform — Escrow Protected Transaction</p>
                  
                  {/* Metadata - Contract Summary Section */}
                  <div style={{ textAlign: 'center', marginBottom: '24px', borderTop: '2px solid #e5e7eb', paddingTop: '20px' }}>
                    {/* Contract ID and Generated Date */}
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '700', color: '#374151' }}>
                        Contract ID: <span style={{ fontFamily: 'monospace', color: '#1f2937', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>{generatedContract.contractId?.substring(0, 20) || 'N/A'}</span>
                      </p>
                      <p style={{ margin: '0', fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                        Generated On: {new Date(generatedContract.generatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Amount Cards */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                      {/* Transaction Amount Card */}
                      <div style={{ width: '220px', padding: '20px', borderRadius: '12px', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#eff6ff', border: '2px solid #bfdbfe' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '700', color: '#1e40af', whiteSpace: 'nowrap', margin: '0 0 10px 0' }}>
                          Transaction Amount
                        </h4>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e3a8a', margin: '0' }}>
                          ₹ {(parseFloat(formData.price) || 0).toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Platform Fee Card */}
                      <div style={{ width: '220px', padding: '20px', borderRadius: '12px', textAlign: 'center', boxSizing: 'border-box', backgroundColor: '#fef3c7', border: '2px solid #fde047' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '15px', fontWeight: '700', color: '#b45309', whiteSpace: 'nowrap', margin: '0 0 10px 0' }}>
                          Platform Fee (1%)
                        </h4>
                        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e', margin: '0' }}>
                          ₹ {Math.floor((parseFloat(formData.price) || 0) * 0.01).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Content - Professional Layout */}
                <div className="max-h-[65vh] overflow-y-auto overflow-x-hidden bg-white">
                  <div className="px-5 sm:px-7 md:px-12 py-7 sm:py-10 prose prose-sm max-w-none leading-relaxed"
                    style={{ wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto' }}>
                    {/* Dynamically render contract with proper formatting */}
                    {(() => {
                      // Use formData.price as the actual transaction amount
                      const transactionAmount = parseFloat(formData.price) || 0;
                      const platformFee = Math.floor(transactionAmount * 0.01);
                      const escrowAmount = transactionAmount - platformFee;
                      
                      // Buyer and Seller details - with detailed logging
                      console.log('📊 Contract Preview - Buyer Profile:', buyerProfile);
                      console.log('📊 Contract Preview - Seller Profile:', sellerProfile);
                      
                      const buyerName = buyerProfile?.name || 'Buyer Information Not Available';
                      const buyerEmail = buyerProfile?.email || 'Email not provided';
                      const buyerPhone = buyerProfile?.phone || 'Phone not provided';
                      const buyerAddress = (buyerProfile && [buyerProfile?.address, buyerProfile?.city, buyerProfile?.state, buyerProfile?.pincode]
                        .filter(Boolean)
                        .join(', ')) || 'Address not provided';
                      
                      const sellerName = sellerProfile?.name || 'Seller Information Not Available';
                      const sellerEmail = sellerProfile?.email || 'Email not provided';
                      const sellerPhone = sellerProfile?.phone || 'Phone not provided';
                      const sellerAddress = (sellerProfile && [sellerProfile?.address, sellerProfile?.city, sellerProfile?.state, sellerProfile?.pincode]
                        .filter(Boolean)
                        .join(', ')) || 'Address not provided';
                      
                      console.log('✅ Replacements ready:', {
                        buyerName, buyerEmail, buyerPhone, buyerAddress,
                        sellerName, sellerEmail, sellerPhone, sellerAddress,
                        transactionAmount, platformFee, escrowAmount
                      });
                      
                      const content = generatedContract.content
                        .replace(/{{transaction_id}}/g, transaction.id || 'N/A')
                        .replace(/{{buyer_id}}/g, transaction.buyer_id || 'N/A')
                        .replace(/{{seller_id}}/g, transaction.seller_id || 'N/A')
                        .replace(/{{buyer_name}}/g, buyerName)
                        .replace(/{{buyer_email}}/g, buyerEmail)
                        .replace(/{{buyer_phone}}/g, buyerPhone)
                        .replace(/{{buyer_address}}/g, buyerAddress)
                        .replace(/{{seller_name}}/g, sellerName)
                        .replace(/{{seller_email}}/g, sellerEmail)
                        .replace(/{{seller_phone}}/g, sellerPhone)
                        .replace(/{{seller_address}}/g, sellerAddress)
                        .replace(/{{escrow_id}}/g, 'ESC-' + (transaction.id || 'N/A'))
                        .replace(/{{contract_generated_at}}/g, new Date(generatedContract.generatedAt).toLocaleDateString('en-IN'))
                        .replace(/{{service_or_product_title}}/g, transaction.title || 'Service/Product')
                        .replace(/{{delivery_date}}/g, formData.deliveryDate || 'As per agreement')
                        .replace(/{{amount}}/g, transactionAmount.toLocaleString('en-IN'))
                        .replace(/{{platform_fee}}/g, platformFee.toLocaleString('en-IN'))
                        .replace(/{{escrow_amount}}/g, escrowAmount.toLocaleString('en-IN'))
                        .replace(/{{liability_cap}}/g, Math.max(1000, Math.floor(transactionAmount * 0.01)).toLocaleString('en-IN'))
                        .replace(/{{completion_date}}/g, formData.completionDate || 'As per agreement');

                      return content.split('\n\n').map((section, idx) => {
                        // Skip ASCII borders and decorative lines
                        if (section.match(/^[╔╗╚╝═║─]+$/)) return null;
                        if (section.includes('═') && section.includes('╔')) return null;
                        // Skip lines with only underscores, dashes, or spaces (including Unicode variants)
                        if (section.match(/^[\s_\-─═¯]+$/)) return null;
                        // Skip completely whitespace sections
                        if (!section.trim()) return null;

                        // Filter out completely empty or decoration-only lines
                        const lines = section.split('\n')
                          .filter(l => l.trim())
                          .filter(l => !l.match(/^[\s_\-─═¯]+$/));
                        
                        if (lines.length === 0) return null;

                        const firstLine = lines[0];

                        // Section headers (PART 1, PART 2, etc.)
                        if (firstLine.includes('PART') && firstLine.match(/PART \d+/)) {
                          return (
                            <div key={idx} className="mt-8 mb-6">
                              <h2 className="text-2xl font-bold text-gray-900 mb-3">{firstLine.replace(/[█|║]/g, '').trim()}</h2>
                              <div className="h-1.5 w-20 bg-bharose-primary rounded-full"></div>
                            </div>
                          );
                        }

                        // SELLER and BUYER sections - center aligned vertical layout
                        if (firstLine.includes('SELLER') || firstLine.includes('BUYER')) {
                          const isSeller = firstLine.includes('SELLER');
                          const bgColor = isSeller ? 'bg-blue-50' : 'bg-green-50';
                          const borderColor = isSeller ? 'border-blue-300' : 'border-green-300';
                          const textColor = isSeller ? 'text-blue-900' : 'text-green-900';
                          const accentColor = isSeller ? 'bg-blue-100' : 'bg-green-100';
                          
                          return (
                            <div key={idx} className={`mt-7 mb-7 p-6 rounded-xl border-2 ${borderColor} ${bgColor}`}>
                              <h4 className={`text-xl font-bold ${textColor} text-center mb-5 uppercase tracking-wider`}>
                                {firstLine.replace(/:/g, '').trim()}
                              </h4>
                              <div className="space-y-3 text-center">
                                {lines.slice(1).map((line, i) => {
                                  const trimmed = line.trim();
                                  if (!trimmed) return null;
                                  
                                  // Check if it's a label:value format
                                  if (trimmed.includes(':')) {
                                    const [label, ...valueParts] = trimmed.split(':');
                                    const value = valueParts.join(':').trim();
                                    return (
                                      <div key={i} className="text-sm py-2">
                                        <span className="font-bold text-gray-700">{label.trim()}:</span>
                                        <span className={`ml-2 ${textColor} font-medium block sm:inline`}>{value}</span>
                                      </div>
                                    );
                                  }
                                  
                                  // Verification line
                                  if (trimmed.includes('Verification')) {
                                    const icon = trimmed.includes('✓') ? '✓' : '⚠';
                                    const status = trimmed.includes('Verified') ? 'Phone Verified' : 'Unverified';
                                    return (
                                      <div key={i} className="text-sm mt-4 pt-3 border-t-2 border-gray-300">
                                        <span className={`${icon === '✓' ? 'text-green-600' : 'text-orange-600'} font-bold mr-2 text-lg`}>{icon}</span>
                                        <span className={`${textColor} font-semibold`}>{status}</span>
                                      </div>
                                    );
                                  }
                                  
                                  return (
                                    <div key={i} className={`text-sm py-1 ${textColor}`}>
                                      {trimmed}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }

                        // Subsection headers
                        if (firstLine.match(/^[A-Z][A-Z\s]+:?$/) && !firstLine.includes('PART')) {
                          return (
                            <div key={idx} className="mt-6 mb-4">
                              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{firstLine.replace(/:/g, '')}</h3>
                              <div className="h-0.5 w-16 bg-gray-400 mt-2"></div>
                            </div>
                          );
                        }

                        // Numbered list items (1., 2., 3., etc.)
                        if (firstLine.match(/^\d+\./)) {
                          return (
                            <ol key={idx} className="list-decimal list-inside mb-5 text-gray-800 leading-relaxed space-y-2 px-3">
                              {lines.map((line, i) => (
                                <li key={i} className="ml-2 sm:ml-4 text-xs sm:text-sm break-words font-medium" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  {line.replace(/^\d+\.\s*/, '')}
                                </li>
                              ))}
                            </ol>
                          );
                        }

                        // Bullet points
                        if (firstLine.startsWith('•')) {
                          return (
                            <ul key={idx} className="list-disc list-inside mb-5 text-gray-800 leading-relaxed space-y-2 px-3">
                              {lines.map((line, i) => (
                                <li key={i} className="ml-2 sm:ml-4 text-xs sm:text-sm break-words font-medium" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                  {line.replace(/^•\s*/, '')}
                                </li>
                              ))}
                            </ul>
                          );
                        }

                        // Skip paragraphs that are just underscores or decorative content
                        const cleanedSection = section.replace(/\n/g, ' ').trim();
                        if (cleanedSection.match(/^[_\s]+$/) || cleanedSection.match(/^[\-\s]+$/) || cleanedSection.match(/^[─═¯\s]+$/)) {
                          return null;
                        }

                        // Regular paragraph
                        return (
                          <p key={idx} className="text-gray-800 leading-relaxed mb-5 text-sm">
                            {cleanedSection}
                          </p>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Document Footer */}
                <div className="px-6 sm:px-8 md:px-12 py-8 sm:py-10 bg-gray-50 border-t-2 border-gray-300 text-center text-xs sm:text-sm text-gray-600 space-y-3">
                  <p className="italic break-words font-medium">This contract is auto-generated by Bharose PE's Escrow Engine — {new Date(generatedContract.generatedAt).toLocaleDateString('en-IN')}</p>
                  <p className="font-semibold text-gray-800 break-words">This is a legally binding document. Please review carefully before proceeding.</p>
                </div>
              </div>

              {/* Info Cards Below Document */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">⚖️</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 break-words">Legally Compliant</p>
                      <p className="text-xs text-gray-600 mt-1 break-words">Indian Contract Act 1872 & Consumer Protection Act 2019</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">🛡️</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 break-words">Escrow Protected</p>
                      <p className="text-xs text-gray-600 mt-1 break-words">Both parties funds held safely until delivery</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition overflow-hidden sm:col-span-2 lg:col-span-1">
                  <div className="flex items-start gap-3">
                    <div className="text-xl sm:text-2xl flex-shrink-0">✓</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900 break-words">Dispute Free</p>
                      <p className="text-xs text-gray-600 mt-1 break-words">Full mediation & arbitration support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end pb-4 w-full">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('form')}
                  className="px-4 sm:px-6 py-2.5 text-sm border border-gray-400 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition w-full sm:w-auto"
                >
                  Edit & Regenerate
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Contract sent to other party!');
                    onContractGenerated?.(generatedContract);
                  }}
                  className="px-4 sm:px-8 py-2.5 text-sm bg-bharose-primary hover:bg-bharose-primary/90 text-white font-semibold rounded-lg shadow-md transition hover:shadow-lg w-full sm:w-auto"
                >
                  Send Contract
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartContractBuilder;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertCircle, 
  Send, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Edit3,
  RefreshCw,
  Settings,
  Calendar,
  MapPin,
  Package,
  IndianRupee
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Contract, useContracts } from '@/hooks/use-contracts';
import { useTransactions } from '@/hooks/use-transactions';
import { toast } from 'sonner';

interface ContractRevisionEditorProps {
  originalContract: Contract;
  onClose: () => void;
  onRevisionSent?: () => void;
}

export const ContractRevisionEditor = ({ 
  originalContract, 
  onClose, 
  onRevisionSent 
}: ContractRevisionEditorProps) => {
  const { createRevisedContract } = useContracts();
  const [activeTab, setActiveTab] = useState<'contract' | 'structured'>('contract');
  const [revisedContent, setRevisedContent] = useState(originalContract.contract_content);
  const [revisedTerms, setRevisedTerms] = useState(originalContract.terms || '');
  const [revisedAmount, setRevisedAmount] = useState(
    originalContract.amount || originalContract.transaction?.amount || 0
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);
  
  // Structured contract data that affects the actual transaction behavior
  const [structuredData, setStructuredData] = useState({
    title: originalContract.transaction?.title || '',
    amount: originalContract.transaction?.amount || revisedAmount,
    delivery_date: '',
    description: '',
    payment_schedule: 'full_upfront', // full_upfront, milestone_based, on_delivery
    milestones: [] as Array<{id: string, description: string, amount: number, due_date: string}>,
    warranty_period: '',
    return_policy: '',
    service_location: '',
    deliverables: '',
    completion_criteria: ''
  });
  
  // Parse contract content to extract structured data if possible
  useEffect(() => {
    const content = originalContract.contract_content;
    
    // Extract amount from contract text
    const amountMatch = content.match(/(?:₹|Rs\.?|INR)\s*([0-9,]+)/i);
    if (amountMatch) {
      const extractedAmount = parseInt(amountMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(extractedAmount)) {
        setRevisedAmount(extractedAmount);
        setStructuredData(prev => ({ ...prev, amount: extractedAmount }));
      }
    }
    
    // Extract delivery/completion date
    const dateMatch = content.match(/(?:delivery|completion).*?(\d{4}-\d{2}-\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/i);
    if (dateMatch) {
      setStructuredData(prev => ({ ...prev, delivery_date: dateMatch[1] }));
    }
    
    // Extract warranty period
    const warrantyMatch = content.match(/warranty.*?(\d+\s*(?:days?|months?|years?))/i);
    if (warrantyMatch) {
      setStructuredData(prev => ({ ...prev, warranty_period: warrantyMatch[1] }));
    }
    
    // Extract return policy
    const returnMatch = content.match(/return.*?(\d+\s*days?)/i);
    if (returnMatch) {
      setStructuredData(prev => ({ ...prev, return_policy: returnMatch[1] }));
    }
    
  }, [originalContract.contract_content]);

  const handleStructuredDataChange = (field: string, value: any) => {
    setStructuredData(prev => ({ ...prev, [field]: value }));
    
    // Sync amount between structured data and contract amount
    if (field === 'amount') {
      setRevisedAmount(value);
    }
  };

  const addMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      description: '',
      amount: 0,
      due_date: ''
    };
    setStructuredData(prev => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone]
    }));
  };

  const updateMilestone = (id: string, field: string, value: any) => {
    setStructuredData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === id ? { ...m, [field]: value } : m
      )
    }));
  };

  const removeMilestone = (id: string) => {
    setStructuredData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== id)
    }));
  };

  // Debug logging
  console.log('📝 ContractRevisionEditor mounted with:', {
    contractId: originalContract.id,
    contractStatus: originalContract.status,
    createdBy: originalContract.created_by,
    revisionNumber: originalContract.revision_number
  });

  const handleSubmit = async () => {
    console.log('🚀 Submitting contract revision...');
    console.log('📄 Original contract details:', {
      id: originalContract.id,
      status: originalContract.status,
      created_by: originalContract.created_by,
      recipient_id: originalContract.recipient_id,
      revision_number: originalContract.revision_number,
      parent_contract_id: originalContract.parent_contract_id,
      is_active: originalContract.is_active
    });
    
    if (!revisedContent.trim()) {
      console.error('❌ Revised content is empty');
      toast.error('Contract content cannot be empty');
      return;
    }

    if (!hasChanges) {
      console.error('❌ No changes detected');
      toast.error('Please make changes before sending revision');
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate enhanced contract content that includes structured data
      let enhancedContent = revisedContent;
      
      // If structured data has been modified, regenerate parts of the contract
      if (structuredData.milestones.length > 0) {
        const milestonesText = structuredData.milestones.map((m, index) => 
          `Milestone ${index + 1}: ${m.description} - ₹${m.amount.toLocaleString()} (Due: ${m.due_date})`
        ).join('\n');
        
        enhancedContent += `\n\n**PAYMENT SCHEDULE:**\n${milestonesText}`;
      }
      
      if (structuredData.warranty_period) {
        enhancedContent += `\n\n**WARRANTY:** ${structuredData.warranty_period}`;
      }
      
      if (structuredData.return_policy) {
        enhancedContent += `\n\n**RETURN POLICY:** ${structuredData.return_policy}`;
      }
      
      if (structuredData.deliverables) {
        enhancedContent += `\n\n**DELIVERABLES:** ${structuredData.deliverables}`;
      }
      
      if (structuredData.completion_criteria) {
        enhancedContent += `\n\n**COMPLETION CRITERIA:** ${structuredData.completion_criteria}`;
      }
      
      // Add structured data as terms
      const structuredTerms = JSON.stringify({
        ...structuredData,
        // Include revision metadata
        revision_type: 'enhanced',
        structured_data_version: '1.0',
        last_modified: new Date().toISOString()
      });
      
      console.log('📤 Calling createRevisedContract with enhanced data:', {
        revisedContent: enhancedContent.substring(0, 100) + '...',
        revisedTerms: 'Enhanced with structured data',
        revisedAmount: revisedAmount,
        structuredData: structuredData,
        hasChanges
      });
      
      const newContractId = await createRevisedContract(
        originalContract,
        enhancedContent,
        structuredTerms, // Store structured data in terms field
        revisedAmount
      );
      
      console.log('✅ Contract revision successful, new contract ID:', newContractId);
      toast.success('Revised contract with structured data sent successfully!');
      onRevisionSent?.();
      onClose();
    } catch (error: any) {
      console.error('❌ Error creating revised contract:', error);
      console.error('❌ Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        stack: error.stack
      });
      
      // More specific error messages
      let errorMessage = 'Failed to send revised contract';
      if (error.message?.includes('not authenticated')) {
        errorMessage = 'Please log in again to send the revision';
      } else if (error.message?.includes('not the contract creator')) {
        errorMessage = 'Only the contract creator can send revisions';
      } else if (error.message?.includes('not in rejected status')) {
        errorMessage = 'This contract cannot be revised (not rejected)';
      } else if (error.message?.includes('Database error')) {
        errorMessage = 'Database error - please try again';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges = 
    revisedContent.trim() !== originalContract.contract_content.trim() ||
    (revisedTerms || '').trim() !== (originalContract.terms || '').trim() ||
    // Check amount changes
    (originalContract.amount && revisedAmount !== originalContract.amount) ||
    (originalContract.transaction?.amount && !originalContract.amount && revisedAmount !== originalContract.transaction.amount) ||
    // Check structured data changes
    structuredData.title !== (originalContract.transaction?.title || '') ||
    structuredData.delivery_date !== '' ||
    structuredData.milestones.length > 0 ||
    structuredData.warranty_period !== '' ||
    structuredData.return_policy !== '' ||
    structuredData.service_location !== '' ||
    structuredData.deliverables !== '' ||
    structuredData.completion_criteria !== '' ||
    structuredData.payment_schedule !== 'full_upfront';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-bharose-primary" />
                Revise Contract
              </h2>
              <p className="text-sm text-muted-foreground">
                Address the rejection and send an updated contract
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-red-600 border-red-200">
            Revision {(originalContract.revision_number || 1) + 1}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
          {/* Rejection Reason */}
          {originalContract.response_message && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-red-800">
                  <AlertCircle className="h-4 w-4" />
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-red-700 whitespace-pre-wrap">
                  {originalContract.response_message}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tabs for editing mode */}
          <div className="flex justify-center space-x-1 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('contract')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'contract'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Contract Text
            </button>
            <button
              onClick={() => setActiveTab('structured')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'structured'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Structured Data
            </button>
          </div>

          {/* Original vs Revised View Toggle */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="flex items-center gap-2"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Original
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Original
                </>
              )}
            </Button>
          </div>

          {activeTab === 'contract' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Content */}
              {showOriginal && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Original Contract</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Contract Content
                      </Label>
                      <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm max-h-40 overflow-y-auto">
                        <p className="whitespace-pre-wrap">{originalContract.contract_content}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">
                        Original Amount
                      </Label>
                      <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm">
                        <p className="font-semibold">₹{(originalContract.amount || originalContract.transaction?.amount || 0).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {originalContract.terms && (
                      <div>
                        <Label className="text-xs font-medium text-muted-foreground">
                          Terms
                        </Label>
                        <div className="mt-1 p-3 bg-muted/30 rounded-lg border text-sm max-h-20 overflow-y-auto">
                          <p className="whitespace-pre-wrap">{originalContract.terms}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Revised Content */}
              <Card className={showOriginal ? '' : 'lg:col-span-2'}>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-bharose-primary" />
                    Revised Contract
                    {hasChanges && (
                      <Badge variant="outline" className="text-xs">
                        Modified
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="revised-content" className="text-sm font-medium">
                      Contract Content *
                    </Label>
                    <Textarea
                      id="revised-content"
                      value={revisedContent}
                      onChange={(e) => setRevisedContent(e.target.value)}
                      className="mt-1 min-h-[200px] resize-none"
                      placeholder="Enter the revised contract content..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="revised-amount" className="text-sm font-medium">
                      Contract Amount (₹) *
                    </Label>
                    <input
                      id="revised-amount"
                      type="number"
                      min="0"
                      value={revisedAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          setRevisedAmount(0);
                          return;
                        }
                        const parsedValue = parseInt(value, 10);
                        if (!isNaN(parsedValue) && parsedValue >= 0) {
                          setRevisedAmount(parsedValue);
                          handleStructuredDataChange('amount', parsedValue);
                        }
                      }}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter contract amount (whole rupees only)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="revised-terms" className="text-sm font-medium">
                      Additional Terms (Optional)
                    </Label>
                    <Textarea
                      id="revised-terms"
                      value={revisedTerms}
                      onChange={(e) => setRevisedTerms(e.target.value)}
                      className="mt-1 min-h-[100px] resize-none"
                      placeholder="Enter any additional terms or conditions..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Settings className="h-4 w-4 text-bharose-primary" />
                    Edit Structured Data
                    <Badge variant="outline" className="text-xs">
                      Affects Dashboard & Analytics
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Changes here will update the actual transaction data, affecting payments, milestones, and dashboard analytics.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Transaction Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-sm font-medium">
                        Transaction Title
                      </Label>
                      <input
                        id="title"
                        type="text"
                        value={structuredData.title}
                        onChange={(e) => handleStructuredDataChange('title', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="e.g. iPhone 15 Pro Purchase"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="structured-amount" className="text-sm font-medium">
                        Total Amount (₹)
                      </Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input
                          id="structured-amount"
                          type="number"
                          min="0"
                          value={structuredData.amount}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10) || 0;
                            handleStructuredDataChange('amount', value);
                          }}
                          className="mt-1 w-full px-3 py-2 pl-10 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                          placeholder="50000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Schedule */}
                  <div>
                    <Label className="text-sm font-medium">Payment Schedule</Label>
                    <select
                      value={structuredData.payment_schedule}
                      onChange={(e) => handleStructuredDataChange('payment_schedule', e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="full_upfront">Full Payment Upfront</option>
                      <option value="milestone_based">Milestone-based Payments</option>
                      <option value="on_delivery">Payment on Delivery/Completion</option>
                    </select>
                  </div>

                  {/* Milestones Section */}
                  {structuredData.payment_schedule === 'milestone_based' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Payment Milestones</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addMilestone}
                          className="text-xs"
                        >
                          Add Milestone
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {structuredData.milestones.map((milestone, index) => (
                          <div key={milestone.id} className="p-3 border border-input rounded-md bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Milestone {index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMilestone(milestone.id)}
                                className="text-xs text-red-600 hover:text-red-800"
                              >
                                Remove
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <input
                                type="text"
                                value={milestone.description}
                                onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                                placeholder="Milestone description"
                                className="px-2 py-1 border border-input rounded text-sm"
                              />
                              <div className="relative">
                                <IndianRupee className="absolute left-2 top-1.5 h-3 w-3 text-muted-foreground" />
                                <input
                                  type="number"
                                  value={milestone.amount}
                                  onChange={(e) => updateMilestone(milestone.id, 'amount', parseInt(e.target.value, 10) || 0)}
                                  placeholder="Amount"
                                  className="px-2 py-1 pl-6 border border-input rounded text-sm w-full"
                                />
                              </div>
                              <input
                                type="date"
                                value={milestone.due_date}
                                onChange={(e) => updateMilestone(milestone.id, 'due_date', e.target.value)}
                                className="px-2 py-1 border border-input rounded text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {structuredData.milestones.length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Total milestone amount: ₹{structuredData.milestones.reduce((sum, m) => sum + m.amount, 0).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Delivery/Completion Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="delivery-date" className="text-sm font-medium">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Delivery/Completion Date
                      </Label>
                      <input
                        id="delivery-date"
                        type="date"
                        value={structuredData.delivery_date}
                        onChange={(e) => handleStructuredDataChange('delivery_date', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="service-location" className="text-sm font-medium">
                        <MapPin className="inline h-4 w-4 mr-1" />
                        Service Location
                      </Label>
                      <input
                        id="service-location"
                        type="text"
                        value={structuredData.service_location}
                        onChange={(e) => handleStructuredDataChange('service_location', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Remote, Mumbai, Client site, etc."
                      />
                    </div>
                  </div>

                  {/* Additional Terms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="warranty" className="text-sm font-medium">
                        Warranty Period
                      </Label>
                      <select
                        id="warranty"
                        value={structuredData.warranty_period}
                        onChange={(e) => handleStructuredDataChange('warranty_period', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">No Warranty</option>
                        <option value="3 months">3 Months</option>
                        <option value="6 months">6 Months</option>
                        <option value="1 year">1 Year</option>
                        <option value="2 years">2 Years</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="return-policy" className="text-sm font-medium">
                        Return Policy
                      </Label>
                      <select
                        id="return-policy"
                        value={structuredData.return_policy}
                        onChange={(e) => handleStructuredDataChange('return_policy', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">No Returns</option>
                        <option value="7 days">7 Days Return</option>
                        <option value="15 days">15 Days Return</option>
                        <option value="30 days">30 Days Return</option>
                      </select>
                    </div>
                  </div>

                  {/* Deliverables & Completion Criteria */}
                  <div>
                    <Label htmlFor="deliverables" className="text-sm font-medium">
                      <Package className="inline h-4 w-4 mr-1" />
                      Deliverables
                    </Label>
                    <Textarea
                      id="deliverables"
                      value={structuredData.deliverables}
                      onChange={(e) => handleStructuredDataChange('deliverables', e.target.value)}
                      className="mt-1 min-h-[80px] resize-none"
                      placeholder="List what will be delivered (files, products, services, etc.)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="completion-criteria" className="text-sm font-medium">
                      Completion Criteria
                    </Label>
                    <Textarea
                      id="completion-criteria"
                      value={structuredData.completion_criteria}
                      onChange={(e) => handleStructuredDataChange('completion_criteria', e.target.value)}
                      className="mt-1 min-h-[80px] resize-none"
                      placeholder="Define when the work/delivery is considered complete"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Changes Summary */}
          {hasChanges && (
            <Card className="border-bharose-primary/20 bg-bharose-primary/5">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-bharose-primary rounded-full"></div>
                  <span className="font-medium">Changes detected</span>
                  <span className="text-muted-foreground">
                    Your revisions will be sent to the recipient for review
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer - Always Visible */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/30 mt-auto shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            {/* Debug info for development */}
            {import.meta.env.DEV && (
              <div className="text-xs text-muted-foreground">
                <div>Status: {originalContract.status}</div>
                <div>Creator: {originalContract.created_by}</div>
                <div>HasChanges: {hasChanges ? 'Yes' : 'No'}</div>
                <div>ContentEmpty: {!revisedContent.trim() ? 'Yes' : 'No'}</div>
                <div>StructuredChanges: {structuredData.milestones.length > 0 || structuredData.delivery_date ? 'Yes' : 'No'}</div>
                <div>ActiveTab: {activeTab}</div>
                <div>ButtonDisabled: {(isSubmitting || !hasChanges || !revisedContent.trim()) ? 'Yes' : 'No'}</div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            {hasChanges && (
              <div className="text-xs text-green-600 font-medium px-2 py-1 bg-green-50 rounded">
                Changes Detected ✓
              </div>
            )}
            
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !hasChanges || !revisedContent.trim()}
              className="flex items-center gap-2"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending Revision...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Revised Contract
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Floating Send Button - Backup for visibility */}
        {hasChanges && !isSubmitting && (
          <div className="fixed bottom-6 right-6 z-10">
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 shadow-lg"
              size="lg"
            >
              <Send className="h-4 w-4" />
              Send Revised Contract
            </Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContractRevisionEditor;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useContracts } from '@/hooks/use-contracts';
import { useContactSearch } from '@/hooks/use-contact-search';
import ContactSearch from '@/components/ContactSearch';
import { useTransactions } from '@/hooks/use-transactions';
import { useUserModeContext } from '@/components/UserModeContext';

interface ContractSenderProps {
  transactionId: string;
  onContractSent?: () => void;
  onCancel?: () => void;
  preSelectedRecipient?: {
    id: string;
    name: string;
    phone: string;
  };
}

export default function ContractSender({ 
  transactionId, 
  onContractSent, 
  onCancel, 
  preSelectedRecipient 
}: ContractSenderProps) {
  const { createContract } = useContracts();
  const { userMode } = useUserModeContext();
  const { transactions } = useTransactions(userMode);
  const [selectedContact, setSelectedContact] = useState<any>(preSelectedRecipient || null);
  const [contractContent, setContractContent] = useState('');
  const [terms, setTerms] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-populate contract content based on transaction
  useEffect(() => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction && !contractContent) {
      const defaultContent = `Transaction Agreement for: ${transaction.title}

Amount: ₹${transaction.amount?.toLocaleString() || '0'}
${transaction.description ? `Description: ${transaction.description}` : ''}
${transaction.delivery_date ? `Expected Delivery: ${new Date(transaction.delivery_date).toLocaleDateString()}` : ''}

Terms and Conditions:
1. Payment will be held in escrow until delivery confirmation
2. Seller must deliver the item/service as described
3. Buyer must confirm receipt within 48 hours of delivery
4. Any disputes will be resolved through the Bharose Pe platform

Both parties agree to the terms outlined above and commit to completing this transaction in good faith.`;
      
      setContractContent(defaultContent);
    }
  }, [transactionId, transactions, contractContent]);

  const handleSendContract = async () => {
    if (!selectedContact || !contractContent.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      // Determine initiator role based on user mode
      const initiatorRole = userMode === 'Seller' ? 'seller' : 'buyer';
      
      await createContract({
        transaction_id: transactionId,
        contract_content: contractContent,
        terms: terms || undefined,
        recipient_id: selectedContact.id,
        initiator_role: initiatorRole
      });

      onContractSent?.();
    } catch (error) {
      console.error('Error sending contract:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-bharose-primary" />
        <h3 className="text-lg font-semibold">Send Contract</h3>
      </div>

      {/* Contact Selection */}
      <div className="space-y-3">
        <Label>Select Recipient</Label>
        <ContactSearch
          selectedContact={selectedContact}
          onContactSelect={setSelectedContact}
        />
      </div>

      {/* Contract Content */}
      <div className="space-y-3">
        <Label htmlFor="contract-content">Contract Details *</Label>
        <Textarea
          id="contract-content"
          value={contractContent}
          onChange={(e) => setContractContent(e.target.value)}
          placeholder="Enter the contract details, terms, and conditions..."
          className="min-h-32 resize-none"
          required
        />
        <p className="text-xs text-muted-foreground">
          Describe the agreement, payment terms, delivery conditions, and any other important details.
        </p>
      </div>

      {/* Additional Terms */}
      <div className="space-y-3">
        <Label htmlFor="terms">Additional Terms (Optional)</Label>
        <Textarea
          id="terms"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
          placeholder="Any additional terms or special conditions..."
          className="min-h-20 resize-none"
        />
      </div>

      {/* Success Message */}
      {selectedContact && contractContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
        >
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm text-green-800">Ready to Send</p>
            <p className="text-sm text-green-700">
              Contract will be sent to <strong>{selectedContact.name}</strong> ({selectedContact.phone})
            </p>
          </div>
        </motion.div>
      )}

      {/* Preview */}
      {selectedContact && contractContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-muted/50 border border-dashed border-muted-foreground/30 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-bharose-primary mt-0.5" />
            <div>
              <p className="font-medium text-sm">Contract Preview</p>
              <p className="text-sm text-muted-foreground">
                This contract will be sent to <strong>{selectedContact.name}</strong> ({selectedContact.phone})
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSendContract}
          disabled={!selectedContact || !contractContent.trim() || isLoading}
          className="flex-1 flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isLoading ? 'Sending...' : 'Send Contract'}
        </Button>
        
        {onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </motion.div>
  );
}
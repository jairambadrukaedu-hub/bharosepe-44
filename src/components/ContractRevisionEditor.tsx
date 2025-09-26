import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertCircle, 
  Send, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Edit3,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Contract, useContracts } from '@/hooks/use-contracts';
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
  const [revisedContent, setRevisedContent] = useState(originalContract.contract_content);
  const [revisedTerms, setRevisedTerms] = useState(originalContract.terms || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOriginal, setShowOriginal] = useState(true);

  // Debug logging
  console.log('📝 ContractRevisionEditor mounted with:', {
    contractId: originalContract.id,
    contractStatus: originalContract.status,
    createdBy: originalContract.created_by,
    revisionNumber: originalContract.revision_number
  });

  const handleSubmit = async () => {
    console.log('🚀 Submitting contract revision...');
    
    if (!revisedContent.trim()) {
      toast.error('Contract content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('📤 Calling createRevisedContract...');
      await createRevisedContract(
        originalContract,
        revisedContent,
        revisedTerms || undefined
      );
      
      console.log('✅ Contract revision successful');
      toast.success('Revised contract sent successfully!');
      onRevisionSent?.();
      onClose();
    } catch (error: any) {
      console.error('❌ Error creating revised contract:', error);
      toast.error(error.message || 'Failed to send revised contract');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanges = 
    revisedContent.trim() !== originalContract.contract_content.trim() ||
    (revisedTerms || '').trim() !== (originalContract.terms || '').trim();

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
        className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !hasChanges || !revisedContent.trim()}
            className="flex items-center gap-2"
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
      </motion.div>
    </motion.div>
  );
};

export default ContractRevisionEditor;
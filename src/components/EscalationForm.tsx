import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, File, AlertTriangle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useEscalations } from '@/hooks/use-escalations';

interface EscalationFormProps {
  transactionId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const EscalationForm: React.FC<EscalationFormProps> = ({
  transactionId,
  onClose,
  onSuccess
}) => {
  const { createEscalation, loading } = useEscalations();
  const [escalationReason, setEscalationReason] = useState('');
  const [escalationNotes, setEscalationNotes] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setEvidenceFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!escalationReason.trim()) {
      return;
    }

    const success = await createEscalation(
      transactionId,
      escalationReason,
      escalationNotes,
      evidenceFiles
    );

    if (success) {
      onSuccess();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <AlertTriangle className="text-orange-500 mr-2" size={20} />
              <h3 className="text-lg font-semibold">Escalate to Customer Care</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Reason for Escalation *
              </label>
              <Textarea
                value={escalationReason}
                onChange={(e) => setEscalationReason(e.target.value)}
                placeholder="Please describe why you're escalating this dispute to customer care..."
                className="min-h-[80px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Additional Notes
              </label>
              <Textarea
                value={escalationNotes}
                onChange={(e) => setEscalationNotes(e.target.value)}
                placeholder="Any additional information that might help resolve this issue..."
                className="min-h-[60px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Evidence Files (Optional)
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="evidence-upload"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="evidence-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="text-muted-foreground mb-2" size={24} />
                  <span className="text-sm text-muted-foreground">
                    Click to upload screenshots or documents
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Max 5 files, 10MB each
                  </span>
                </label>
              </div>

              {evidenceFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {evidenceFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-muted p-2 rounded"
                    >
                      <div className="flex items-center">
                        <File size={16} className="mr-2 text-muted-foreground" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Escalating to Customer Care will freeze this transaction 
                until resolved. Both parties will be unable to make changes or release funds.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading || !escalationReason.trim()}
              >
                {loading ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Submit Escalation
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </motion.div>
  );
};
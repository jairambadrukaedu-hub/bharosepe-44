
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AiAgreementGenerator from '@/components/AiAgreementGenerator';
import AgreementEditor from '@/components/AgreementEditor';
import { useEnhancedTransactionStore } from '@/utils/enhancedTransactionState';
import { useAuth } from '@/hooks/use-auth';
import { useUserModeContext } from '@/components/UserModeContext';
import { toast } from 'sonner';

const AiAgreementGeneration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userMode } = useUserModeContext();
  const { addAgreement } = useEnhancedTransactionStore();
  
  const [stage, setStage] = useState<'generating' | 'editing'>('generating');
  const [generatedAgreement, setGeneratedAgreement] = useState('');
  
  const transactionData = location.state?.transactionData;

  if (!transactionData) {
    navigate('/transaction-setup');
    return null;
  }

  const handleAgreementComplete = (agreement: string) => {
    setGeneratedAgreement(agreement);
    setStage('editing');
  };

  const handleSaveAgreement = (editedAgreement: string) => {
    setGeneratedAgreement(editedAgreement);
    toast.success('Agreement saved successfully!');
  };

  const handleSendAgreement = (finalAgreement: string) => {
    // Create the agreement record with proper sender/receiver identification
    const agreementId = addAgreement({
      transactionTitle: transactionData.details.productName || transactionData.details.serviceDescription || 'Transaction Agreement',
      amount: parseInt(transactionData.details.price || '0', 10),
      type: transactionData.type,
      description: finalAgreement,
      terms: 'Standard escrow terms with AI-generated clauses',
      senderProfileId: user?.id || '',
      senderName: user?.user_metadata?.full_name || user?.email || 'User',
      senderPhone: user?.user_metadata?.phone || '',
      receiverProfileId: transactionData.contact.id,
      receiverName: transactionData.contact.name,
      receiverPhone: transactionData.contact.phone,
      status: 'pending',
    });

    toast.success(`Agreement sent to ${transactionData.contact.name}!`);
    navigate('/agreement-sent', { 
      state: { 
        agreementId,
        recipientName: transactionData.contact.name,
        transactionData 
      } 
    });
  };

  const handleRegenerateAgreement = () => {
    setStage('generating');
    setGeneratedAgreement('');
  };

  if (stage === 'generating') {
    return (
      <AiAgreementGenerator
        transactionData={transactionData}
        onComplete={handleAgreementComplete}
      />
    );
  }

  return (
    <AgreementEditor
      agreement={generatedAgreement}
      onSave={handleSaveAgreement}
      onSend={handleSendAgreement}
      onRegenerate={handleRegenerateAgreement}
      transactionData={transactionData}
    />
  );
};

export default AiAgreementGeneration;

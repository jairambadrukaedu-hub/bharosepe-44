import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContractViewer from '@/components/ContractViewer';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserModeContext } from '@/components/UserModeContext';

export default function ContractDetail() {
  const { contractId } = useParams<{ contractId: string }>();
  const navigate = useNavigate();
  const { userMode } = useUserModeContext();

  if (!contractId) {
    return (
      <div className="bharose-container">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Contract not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bharose-container pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 py-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Contract</h1>
      </div>

      {/* Contract Content */}
      <div className="mt-6">
        <ContractViewer contractId={contractId} />
      </div>

      <BottomNavigation userMode={userMode} />
    </div>
  );
}
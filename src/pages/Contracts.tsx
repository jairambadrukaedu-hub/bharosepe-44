import React from 'react';
import { useContracts } from '@/hooks/use-contracts';
import HeaderWithRoleToggle from '@/components/HeaderWithRoleToggle';
import BottomNavigation from '@/components/BottomNavigation';
import { useUserModeContext } from '@/components/UserModeContext';
import { FileText, ShoppingBag, Store, Plus, XCircle } from 'lucide-react';
import ContractSummaryCard from '@/components/ContractSummaryCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Contracts = () => {
  const { userMode } = useUserModeContext();
  const navigate = useNavigate();
  const { 
    contracts, 
    loading, 
    getSentContracts, 
    getReceivedContracts, 
    getPendingContracts,
    getContractsAsBuyer,
    getContractsAsSeller,
    getPendingContractsAsBuyer,
    getPendingContractsAsSeller,
    getUserRoleInContract
  } = useContracts();
  
  if (loading) {
    return (
      <div className="bharose-container pb-20">
        <HeaderWithRoleToggle 
          title="Contracts"
          showBack={true}
          showNotifications={false}
          showUserToggle={false}
        />
        
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bharose-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading contracts...</p>
        </div>
        
        <BottomNavigation userMode={userMode} />
      </div>
    );
  }

  const sentContracts = getSentContracts();
  const receivedContracts = getReceivedContracts();
  const pendingContracts = getPendingContracts();
  
  // Role-based contracts
  const buyerContracts = getContractsAsBuyer();
  const sellerContracts = getContractsAsSeller();
  const pendingBuyerContracts = getPendingContractsAsBuyer();
  const pendingSellerContracts = getPendingContractsAsSeller();
  const rejectedBuyerContracts = buyerContracts.filter(c => c.status === 'rejected');
  const rejectedSellerContracts = sellerContracts.filter(c => c.status === 'rejected');
  return (
    <div className="bharose-container pb-20">
      <HeaderWithRoleToggle 
        title="Contracts"
        showBack={true}
        showNotifications={false}
        showUserToggle={false}
      />

      <div className="space-y-4">
        {/* Show only the current role's contracts */}
        {userMode === 'Buyer' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={20} className="text-bharose-primary" />
              <h2 className="text-lg font-medium">Purchase Contracts</h2>
              <Badge variant="secondary" className="ml-1">
                {buyerContracts.length}
              </Badge>
            </div>

            {buyerContracts.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No purchase contracts</h3>
                <p className="text-muted-foreground mb-4">You haven't created or received any purchase contracts yet.</p>
                <Button onClick={() => navigate('/transaction-setup')} className="flex items-center gap-2">
                  <Plus size={16} />
                  Start Purchase
                </Button>
              </div>
            ) : (
              <>
                {pendingBuyerContracts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <FileText size={14} />
                      Awaiting Your Response ({pendingBuyerContracts.length})
                    </h4>
                    <div className="space-y-3">
                      {pendingBuyerContracts.map((contract) => (
                        <ContractSummaryCard
                          key={contract.id}
                          contract={contract}
                          type="received"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {rejectedBuyerContracts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <XCircle size={14} />
                      Rejected Contracts ({rejectedBuyerContracts.length})
                    </h4>
                    <div className="space-y-3">
                      {rejectedBuyerContracts.map((contract) => {
                        const isCreatedByUser = contract.created_by === contract.transaction?.buyer_id;
                        return (
                          <ContractSummaryCard
                            key={contract.id}
                            contract={contract}
                            type={isCreatedByUser ? 'sent' : 'received'}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">All Purchase Contracts</h4>
                  {buyerContracts.map((contract) => {
                    const isCreatedByUser = contract.created_by === contract.transaction?.buyer_id;
                    return (
                      <ContractSummaryCard
                        key={contract.id}
                        contract={contract}
                        type={isCreatedByUser ? 'sent' : 'received'}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Store size={20} className="text-bharose-primary" />
              <h2 className="text-lg font-medium">Sales Contracts</h2>
              <Badge variant="secondary" className="ml-1">
                {sellerContracts.length}
              </Badge>
            </div>
            
            {sellerContracts.length === 0 ? (
              <div className="text-center py-8">
                <Store className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No sales contracts</h3>
                <p className="text-muted-foreground mb-4">You haven't created or received any sales contracts yet.</p>
                <Button onClick={() => navigate('/transaction-setup')} className="flex items-center gap-2">
                  <Plus size={16} />
                  Create Sale
                </Button>
              </div>
            ) : (
              <>
                {pendingSellerContracts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <FileText size={14} />
                      Awaiting Your Response ({pendingSellerContracts.length})
                    </h4>
                    <div className="space-y-3">
                      {pendingSellerContracts.map((contract) => (
                        <ContractSummaryCard
                          key={contract.id}
                          contract={contract}
                          type="received"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {rejectedSellerContracts.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <XCircle size={14} />
                      Rejected Contracts ({rejectedSellerContracts.length})
                    </h4>
                    <div className="space-y-3">
                      {rejectedSellerContracts.map((contract) => {
                        const isCreatedByUser = contract.created_by === contract.transaction?.seller_id;
                        return (
                          <ContractSummaryCard
                            key={contract.id}
                            contract={contract}
                            type={isCreatedByUser ? 'sent' : 'received'}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground">All Sales Contracts</h4>
                  {sellerContracts.map((contract) => {
                    const isCreatedByUser = contract.created_by === contract.transaction?.seller_id;
                    return (
                      <ContractSummaryCard
                        key={contract.id}
                        contract={contract}
                        type={isCreatedByUser ? 'sent' : 'received'}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
        
        {/* Debug Info */}
        <div className="mt-8 p-4 bg-muted rounded-lg text-xs">
          <p>Debug Info:</p>
          <p>Total contracts: {contracts.length}</p>
          <p>As Buyer: {buyerContracts.length} | As Seller: {sellerContracts.length}</p>
          <p>Pending as Buyer: {pendingBuyerContracts.length} | Pending as Seller: {pendingSellerContracts.length}</p>
          <details className="mt-2">
            <summary>Raw contracts data</summary>
            <pre className="mt-2 text-xs overflow-auto">
              {JSON.stringify(contracts, null, 2)}
            </pre>
          </details>
        </div>
      </div>
      
      <BottomNavigation userMode={userMode} />
    </div>
  );
};

export default Contracts;
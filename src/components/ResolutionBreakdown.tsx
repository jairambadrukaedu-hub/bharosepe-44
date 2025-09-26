import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, ArrowRight, Users } from 'lucide-react';

interface ResolutionBreakdownProps {
  resolutionData: {
    buyer_refund: number;
    seller_release: number;
    resolution_type: string;
    total_amount: number;
  };
  userRole?: 'buyer' | 'seller';
  compact?: boolean;
}

export const ResolutionBreakdown: React.FC<ResolutionBreakdownProps> = ({
  resolutionData,
  userRole,
  compact = false
}) => {
  const { buyer_refund, seller_release, resolution_type, total_amount } = resolutionData;

  const getResolutionTypeText = (type: string) => {
    switch (type) {
      case 'release_full': return 'Full Payment Released';
      case 'release_partial': return 'Partial Payment Released';
      case 'refund_full': return 'Full Refund Issued';
      case 'refund_partial': return 'Partial Refund Issued';
      default: return 'Dispute Resolved';
    }
  };

  const getResolutionColor = (type: string) => {
    if (type.includes('release')) return 'bg-green-100 text-green-800 border-green-200';
    if (type.includes('refund')) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (compact) {
    return (
      <Card className="border-l-4 border-l-primary bg-muted/20">
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={getResolutionColor(resolution_type)}>
              {getResolutionTypeText(resolution_type)}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Buyer:</span>
              <span className="font-medium">₹{buyer_refund.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Seller:</span>
              <span className="font-medium">₹{seller_release.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5" />
            Dispute Resolution Summary
          </CardTitle>
          <Badge variant="outline" className={getResolutionColor(resolution_type)}>
            {getResolutionTypeText(resolution_type)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">Total Escrow Amount</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            ₹{total_amount.toLocaleString()}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className={`${buyer_refund > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-blue-700 mb-1">Buyer Refund</div>
              <div className={`text-xl font-bold ${buyer_refund > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                ₹{buyer_refund.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {buyer_refund > 0 ? 'Amount refunded to buyer' : 'No refund issued'}
              </div>
              {userRole === 'buyer' && buyer_refund > 0 && (
                <Badge variant="outline" className="mt-2 text-xs bg-blue-100 text-blue-700 border-blue-300">
                  You received this amount
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className={`${seller_release > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <CardContent className="p-4">
              <div className="text-sm font-medium text-green-700 mb-1">Seller Release</div>
              <div className={`text-xl font-bold ${seller_release > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                ₹{seller_release.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {seller_release > 0 ? 'Amount released to seller' : 'No amount released'}
              </div>
              {userRole === 'seller' && seller_release > 0 && (
                <Badge variant="outline" className="mt-2 text-xs bg-green-100 text-green-700 border-green-300">
                  You received this amount
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {buyer_refund > 0 && seller_release > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30 p-2 rounded">
            <span>₹{buyer_refund.toLocaleString()}</span>
            <ArrowRight className="w-4 h-4" />
            <span>Buyer</span>
            <span className="mx-2">•</span>
            <span>₹{seller_release.toLocaleString()}</span>
            <ArrowRight className="w-4 h-4" />
            <span>Seller</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
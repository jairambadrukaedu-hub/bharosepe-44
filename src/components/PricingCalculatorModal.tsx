import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrice?: number;
  category?: string;
  onConfirm: (calculations: PricingCalculations) => void;
}

export interface PricingCalculations {
  basePrice: number;
  platformFeeAmount: number;
  platformFeePercentage: number;
  escrowAmount: number;
  totalForBuyer: number;
  sellerReceives: number;
}

// Platform fee structure - flat 1% for all categories
const PLATFORM_FEES = {
  electronics: 1.0,        // 1%
  mobile: 1.0,            // 1%
  furniture: 1.0,         // 1%
  vehicles: 1.0,          // 1%
  'fashion-apparel': 1.0, // 1%
  jewellery: 1.0,         // 1%
  'building-material': 1.0, // 1%
  collectibles: 1.0,      // 1%
  industrial: 1.0,        // 1%
  books: 1.0,             // 1%
  art: 1.0,               // 1%
  default: 1.0            // 1% default
} as const;

export const PricingCalculatorModal: React.FC<PricingCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPrice = 0,
  category = 'default',
  onConfirm,
}) => {
  const [price, setPrice] = useState<string>(initialPrice.toString());
  const [calculations, setCalculations] = useState<PricingCalculations | null>(null);

  const calculatePricing = (basePrice: number): PricingCalculations => {
    const platformFeePercentage = PLATFORM_FEES[category as keyof typeof PLATFORM_FEES] || PLATFORM_FEES.default;
    const platformFeeAmount = Math.round(basePrice * (platformFeePercentage / 100));
    const escrowAmount = basePrice + platformFeeAmount;
    const totalForBuyer = basePrice + platformFeeAmount; // Buyer pays listing price + platform fee
    const sellerReceives = basePrice; // Seller receives the full listed price

    return {
      basePrice,
      platformFeeAmount,
      platformFeePercentage,
      escrowAmount,
      totalForBuyer,
      sellerReceives,
    };
  };

  useEffect(() => {
    const numericPrice = parseFloat(price) || 0;
    if (numericPrice > 0) {
      setCalculations(calculatePricing(numericPrice));
    } else {
      setCalculations(null);
    }
  }, [price, category]);

  const handleConfirm = () => {
    if (calculations && calculations.basePrice > 0) {
      onConfirm(calculations);
      onClose();
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Pricing Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Price Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Selling Price ₹ *
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price in rupees"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              min="1"
              step="1"
            />
          </div>

          {/* Category Info */}
          {category !== 'default' && (
            <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded">
              <span>
                Platform fee for {category}: {PLATFORM_FEES[category as keyof typeof PLATFORM_FEES]}%
              </span>
            </div>
          )}

          {/* Calculations Display */}
          {calculations && calculations.basePrice > 0 && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed Price:</span>
                  <span className="font-medium">{formatCurrency(calculations.basePrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Platform Fee ({calculations.platformFeePercentage}%):
                  </span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(calculations.platformFeeAmount)}
                  </span>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Escrow Amount:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(calculations.escrowAmount)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-2 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Buyer Pays:</span>
                    <span className="text-gray-900">
                      {formatCurrency(calculations.totalForBuyer)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Seller Receives:</span>
                    <span className="text-green-600">
                      {formatCurrency(calculations.sellerReceives)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-800">
                <strong>Note:</strong> The escrow amount ({formatCurrency(calculations.escrowAmount)}) 
                will be held securely until delivery completion and inspection window expires.
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!calculations || calculations.basePrice <= 0}
          >
            Apply Calculations
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PricingCalculatorModal;
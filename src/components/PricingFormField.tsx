import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import PricingCalculatorModal from './PricingCalculatorModal';
import { usePricingCalculator } from '@/hooks/usePricingCalculator';

interface PricingFormFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  category: string;
  placeholder?: string;
  onPlatformFeeCalculated?: (fee: number) => void;
  onEscrowCalculated?: (escrow: number) => void;
}

const PricingFormField: React.FC<PricingFormFieldProps> = ({
  label,
  value,
  onChange,
  category,
  placeholder,
  onPlatformFeeCalculated,
  onEscrowCalculated,
}) => {
  const { 
    isCalculatorOpen, 
    openPricingCalculator, 
    closePricingCalculator, 
    handleCalculationConfirm 
  } = usePricingCalculator();

  const [calculations, setCalculations] = useState<{
    platformFee: number;
    escrowAmount: number;
  } | null>(null);

  const handlePricingConfirm = (pricingData: any) => {
    setCalculations({
      platformFee: pricingData.platformFeeAmount,
      escrowAmount: pricingData.escrowAmount,
    });
    
    // Notify parent components about calculated values
    if (onPlatformFeeCalculated) {
      onPlatformFeeCalculated(pricingData.platformFeeAmount);
    }
    if (onEscrowCalculated) {
      onEscrowCalculated(pricingData.escrowAmount);
    }
    
    handleCalculationConfirm(pricingData);
  };

  // Auto-calculate when price changes
  useEffect(() => {
    if (value && parseFloat(value.toString()) > 0) {
      const basePrice = parseFloat(value.toString());
      // Flat 1% platform fee for all industries
      const platformFee = Math.round(basePrice * 0.01);
      const totalCost = basePrice + platformFee; // Additive: Sale Price + Platform Fee

      setCalculations({
        platformFee,
        escrowAmount: totalCost, // Total that buyer pays
      });

      if (onPlatformFeeCalculated) {
        onPlatformFeeCalculated(platformFee);
      }
      if (onEscrowCalculated) {
        onEscrowCalculated(totalCost); // Pass total cost to buyer
      }
    }
  }, [value, category, onPlatformFeeCalculated, onEscrowCalculated]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="price-field">{label}</Label>
        <div className="flex gap-2">
          <Input
            id="price-field"
            type="number"
            placeholder={placeholder || "Enter price"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openPricingCalculator}
            className="shrink-0"
          >
            <Calculator className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Show calculated values */}
      {calculations && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 space-y-2">
            <h4 className="text-sm font-medium text-blue-900">Pricing Breakdown</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-blue-700">Sale Price:</span>
                <span className="font-medium text-blue-900">₹{parseFloat(value?.toString() || '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Platform Fee (1%):</span>
                <span className="font-medium text-blue-900">₹{calculations.platformFee}</span>
              </div>
            <div className="flex justify-between border-t border-blue-200 pt-1">
              <span className="text-blue-700 font-medium">Total for Buyer:</span>
              <span className="font-bold text-blue-900">₹{calculations.escrowAmount}</span>
            </div>
          </div>
        </div>
      )}

      <PricingCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={closePricingCalculator}
        onConfirm={handlePricingConfirm}
        category={category}
        basePrice={parseFloat(value?.toString() || '0')}
      />
    </div>
  );
};

export default PricingFormField;
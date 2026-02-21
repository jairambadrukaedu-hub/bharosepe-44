import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PricingCalculatorModal from './PricingCalculatorModal';
import { usePricingCalculator } from '@/hooks/usePricingCalculator';
import type { FormField } from '@/services/formFieldDefinitions';

interface PricingFieldProps {
  field: FormField;
  value: string | number;
  onChange: (value: string) => void;
  onPlatformFeeCalculated?: (fee: number) => void;
  onEscrowCalculated?: (escrow: number) => void;
}

export const PricingField: React.FC<PricingFieldProps> = ({
  field,
  value,
  onChange,
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

  // Auto-calculate when price changes
  useEffect(() => {
    if (value && parseFloat(value.toString()) > 0) {
      const basePrice = parseFloat(value.toString());
      const platformFeeRate = field.platformFeeRate || 0.01; // Default 1%
      
      const platformFee = Math.round(basePrice * platformFeeRate);
      const totalCost = basePrice + platformFee; // Price + Platform Fee = Total

      setCalculations({
        platformFee,
        escrowAmount: totalCost, // This is actually the total cost
      });

      // Notify parent components about calculated values
      if (onPlatformFeeCalculated) {
        onPlatformFeeCalculated(platformFee);
      }
      if (onEscrowCalculated) {
        onEscrowCalculated(totalCost); // Pass total cost
      }
    } else {
      setCalculations(null);
    }
  }, [value, field.platformFeeRate, onPlatformFeeCalculated, onEscrowCalculated]);

  const handlePricingConfirm = (pricingData: any) => {
    setCalculations({
      platformFee: pricingData.platformFeeAmount,
      escrowAmount: pricingData.escrowAmount,
    });
    
    // Update the main price field
    onChange(pricingData.basePrice.toString());
    
    handleCalculationConfirm(pricingData);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-80 space-y-4 text-center">
        {/* Price Input */}
        <div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter price"
            className="w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-lg text-center"
          />
        </div>

        {/* Platform Fee - Always Visible */}
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-sm text-gray-600 mb-1">Platform Fee (1%)</div>
          <div className="font-semibold text-lg">
            ₹{calculations ? calculations.platformFee : '0'}
          </div>
        </div>

        {/* Total Amount - Always Visible */}
        <div className="p-3 bg-green-50 rounded border border-green-200 text-center">
          <div className="text-sm text-gray-600 mb-1">Total Amount</div>
          <div className="font-bold text-green-600 text-xl">
            ₹{calculations ? calculations.escrowAmount : '0'}
          </div>
        </div>
      </div>

      <style>{`
        input[type="text"]::-webkit-outer-spin-button,
        input[type="text"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>

      {/* Pricing Calculator Modal */}
      <PricingCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={closePricingCalculator}
        onConfirm={handlePricingConfirm}
        category={field.category || 'general'}
        initialPrice={parseFloat(value?.toString() || '0')}
      />
    </div>
  );
};
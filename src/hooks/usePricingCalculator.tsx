import { useState, useCallback } from 'react';
import { PricingCalculations } from '@/components/PricingCalculatorModal';

export const usePricingCalculator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pricingData, setPricingData] = useState<PricingCalculations | null>(null);

  const openCalculator = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeCalculator = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCalculationConfirm = useCallback((calculations: PricingCalculations) => {
    setPricingData(calculations);
  }, []);

  const resetCalculations = useCallback(() => {
    setPricingData(null);
  }, []);

  return {
    isModalOpen,
    pricingData,
    openCalculator,
    closeCalculator,
    handleCalculationConfirm,
    resetCalculations,
  };
};

export default usePricingCalculator;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GOODS_INDUSTRIES, GOODS_INDUSTRY_TEMPLATES, IndustryTemplate } from '@/services/goodsIndustryTemplates';

interface GoodsIndustrySelectorProps {
  onSelectIndustry: (industryId: string, template: IndustryTemplate) => void;
}

const GoodsIndustrySelector: React.FC<GoodsIndustrySelectorProps> = ({ onSelectIndustry }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [showDisputes, setShowDisputes] = useState<string | null>(null);

  const handleSelectIndustry = (industryId: string) => {
    const template = GOODS_INDUSTRY_TEMPLATES[industryId];
    if (template) {
      setSelectedIndustry(industryId);
      onSelectIndustry(industryId, template);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bharose-card mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Goods Industry</h2>
        <p className="text-muted-foreground">
          Choose the category that best matches your item. Each has specific fields to prevent common disputes in India.
        </p>
      </div>

      <div className="space-y-3">
        {GOODS_INDUSTRIES.map((industry) => {
          const template = GOODS_INDUSTRY_TEMPLATES[industry.id];
          const isSelected = selectedIndustry === industry.id;

          return (
            <motion.div
              key={industry.id}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleSelectIndustry(industry.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? 'border-bharose-primary bg-bharose-primary/5 shadow-md'
                  : 'border-gray-200 hover:border-bharose-primary/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {template.description}
                  </p>

                  {/* Dispute Drivers */}
                  <div className="mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDisputes(showDisputes === industry.id ? null : industry.id);
                      }}
                      className="flex items-center gap-1 text-xs text-bharose-primary hover:underline"
                    >
                      <Info size={14} />
                      {showDisputes === industry.id ? 'Hide' : 'Show'} Common Disputes
                    </button>

                    {showDisputes === industry.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 pl-4 border-l-2 border-orange-300 bg-orange-50 p-3 rounded"
                      >
                        <p className="text-xs font-semibold text-orange-900 mb-2">
                          💥 Common Disputes in India:
                        </p>
                        <ul className="text-xs text-orange-800 space-y-1">
                          {template.disputeDrivers.map((dispute, idx) => (
                            <li key={idx}>• {dispute}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* Fields Count */}
                  <div className="text-xs text-gray-500 mt-2">
                    📋 {template.fields.length} fields to fill • {template.mandatoryFieldsForContract.length} mandatory
                  </div>
                </div>

                {isSelected && (
                  <div className="flex-shrink-0 text-bharose-primary">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedIndustry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex gap-3"
        >
          <Button
            onClick={() => setSelectedIndustry(null)}
            variant="outline"
            className="flex-1"
          >
            Change Industry
          </Button>
          <Button
            onClick={() => {
              const template = GOODS_INDUSTRY_TEMPLATES[selectedIndustry];
              onSelectIndustry(selectedIndustry, template);
            }}
            className="flex-1 bg-bharose-primary hover:bg-bharose-primary/90"
          >
            Proceed to Form →
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default GoodsIndustrySelector;

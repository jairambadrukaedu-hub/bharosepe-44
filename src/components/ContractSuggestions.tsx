import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Info,
  Zap,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContractSuggestion, ContractAgentService } from '@/services/contractAgentService';
import { ContractGenerationParams } from '@/services/aiContractService';

interface ContractSuggestionsProps {
  params: ContractGenerationParams;
  onApplySuggestion?: (suggestionId: string, update: Partial<ContractGenerationParams>) => void;
  autoRefresh?: number; // ms to refresh suggestions
}

export const ContractSuggestions: React.FC<ContractSuggestionsProps> = ({
  params,
  onApplySuggestion,
  autoRefresh = 2000,
}) => {
  const [suggestions, setSuggestions] = useState<ContractSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadSuggestions = async () => {
      setLoading(true);
      const newSuggestions = await ContractAgentService.generateSuggestions(params);
      setSuggestions(newSuggestions);
      setLoading(false);
    };

    loadSuggestions();
    const interval = setInterval(loadSuggestions, autoRefresh);
    return () => clearInterval(interval);
  }, [params, autoRefresh]);

  const handleApplySuggestion = (suggestion: ContractSuggestion) => {
    const update = ContractAgentService.applySuggestion(params, suggestion.id);
    if (Object.keys(update).length > 0) {
      onApplySuggestion?.(suggestion.id, update);
      setAppliedSuggestions((prev) => new Set(prev).add(suggestion.id));
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'warning':
        return 'bg-amber-50 border-amber-200 hover:bg-amber-100';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'risk':
        return '⚠️';
      case 'legal':
        return '⚖️';
      case 'financial':
        return '💰';
      case 'operational':
        return '⚙️';
      case 'improvement':
        return '✨';
      default:
        return '📌';
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, ContractSuggestion[]>);

  const criticalCount = suggestions.filter((s) => s.severity === 'critical').length;
  const warningCount = suggestions.filter((s) => s.severity === 'warning').length;

  return (
    <div className="space-y-4">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">AI Suggestions Agent</h3>
              <p className="text-sm text-gray-600">
                {loading ? 'Analyzing contract...' : `${suggestions.length} suggestions to enhance your contract`}
              </p>
            </div>
          </div>
          {loading && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
        </div>

        {/* Quick Stats */}
        {!loading && suggestions.length > 0 && (
          <div className="mt-3 flex gap-4 text-sm">
            {criticalCount > 0 && (
              <div className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded">
                <AlertCircle className="h-4 w-4" />
                <span>{criticalCount} Critical</span>
              </div>
            )}
            {warningCount > 0 && (
              <div className="flex items-center gap-1 text-amber-700 bg-amber-100 px-2 py-1 rounded">
                <TrendingUp className="h-4 w-4" />
                <span>{warningCount} Warnings</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded">
              <Zap className="h-4 w-4" />
              <span>{suggestions.length - criticalCount - warningCount} Tips</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions by Category */}
      <AnimatePresence mode="wait">
        {!loading && Object.entries(groupedSuggestions).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedSuggestions).map(([category, categoryItems]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{getCategoryIcon(category)}</span>
                  <h4 className="font-medium text-gray-800 capitalize">{category} Suggestions</h4>
                  <Badge variant="outline">{categoryItems.length}</Badge>
                </div>

                <div className="space-y-2">
                  {categoryItems.map((suggestion, index) => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${getSeverityColor(suggestion.severity)}`}
                      onClick={() => setExpandedId(expandedId === suggestion.id ? null : suggestion.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{getSeverityIcon(suggestion.severity)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-gray-900">{suggestion.title}</h5>
                            {appliedSuggestions.has(suggestion.id) && (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{suggestion.description}</p>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedId === suggestion.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t space-y-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">Suggestion:</p>
                            <p className="text-sm text-gray-700 mt-1 bg-white/50 rounded p-2">
                              {suggestion.suggestion}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="font-medium text-gray-800">Impact:</p>
                              <p className="text-gray-700">{suggestion.impact}</p>
                            </div>
                            {suggestion.appliedClause && (
                              <div>
                                <p className="font-medium text-gray-800">Clause:</p>
                                <p className="text-gray-700">{suggestion.appliedClause}</p>
                              </div>
                            )}
                          </div>

                          {onApplySuggestion && !appliedSuggestions.has(suggestion.id) && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApplySuggestion(suggestion);
                              }}
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            >
                              <Zap className="h-4 w-4 mr-2" />
                              Apply This Suggestion
                            </Button>
                          )}

                          {appliedSuggestions.has(suggestion.id) && (
                            <div className="flex items-center gap-2 text-green-700 bg-green-50 p-2 rounded">
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="text-sm font-medium">Applied</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-600">Analyzing contract parameters...</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            <p>No suggestions at this time. Your contract looks complete!</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContractSuggestions;

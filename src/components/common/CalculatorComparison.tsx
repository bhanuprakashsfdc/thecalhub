import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Plus, X, Info } from 'lucide-react';

interface CalculatorOption {
  id: string;
  name: string;
  description?: string;
}

interface ComparisonResult {
  calculatorId: string;
  values: Record<string, string | number>;
}

interface CalculatorComparisonProps {
  calculators: CalculatorOption[];
  maxCompare?: number;
  onCompare?: (results: ComparisonResult[]) => void;
}

export const CalculatorComparison: React.FC<CalculatorComparisonProps> = ({
  calculators,
  maxCompare = 3,
  onCompare,
}) => {
  const [selected, setSelected] = useState<CalculatorOption[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const addCalculator = useCallback((calc: CalculatorOption) => {
    if (selected.length < maxCompare && !selected.find(s => s.id === calc.id)) {
      setSelected(prev => [...prev, calc]);
    }
    setShowDropdown(false);
  }, [selected, maxCompare]);

  const removeCalculator = useCallback((id: string) => {
    setSelected(prev => prev.filter(s => s.id !== id));
  }, []);

  const availableCalculators = calculators.filter(
    c => !selected.find(s => s.id === c.id)
  );

  const handleCompare = () => {
    if (onCompare) {
      onCompare(selected.map(s => ({
        calculatorId: s.id,
        values: {},
      })));
    }
  };

  return (
    <div className="bg-surface-container-low rounded-xl border border-white/5 p-6">
      <div className="flex items-center gap-2 mb-6">
        <ArrowLeftRight className="w-5 h-5 text-primary-fixed" />
        <h3 className="text-lg font-bold text-on-surface">Compare Calculators</h3>
      </div>

      <div className="mb-6">
        <p className="text-sm text-on-surface-variant mb-3">
          Compare up to {maxCompare} calculators side by side
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((calc, index) => (
            <motion.div
              key={calc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary-fixed/10 text-primary-fixed px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <span className="text-primary-fixed/60">{index + 1}.</span>
              {calc.name}
              <button
                onClick={() => removeCalculator(calc.id)}
                className="p-0.5 hover:bg-primary-fixed/20 rounded transition-colors"
                aria-label={`Remove ${calc.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}

          {selected.length < maxCompare && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-surface-variant hover:bg-surface-variant/80 text-on-surface-variant px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add calculator
              </button>

              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 bg-surface-variant rounded-xl border border-white/10 shadow-xl z-10 min-w-[200px] max-h-[240px] overflow-y-auto"
                >
                  {availableCalculators.length === 0 ? (
                    <div className="p-4 text-sm text-on-surface-variant text-center">
                      No more calculators to add
                    </div>
                  ) : (
                    availableCalculators.map(calc => (
                      <button
                        key={calc.id}
                        onClick={() => addCalculator(calc)}
                        className="w-full px-4 py-2.5 text-left hover:bg-primary-fixed/10 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="text-sm font-medium text-on-surface">{calc.name}</div>
                        {calc.description && (
                          <div className="text-xs text-on-surface-variant mt-0.5">{calc.description}</div>
                        )}
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-primary-fixed/5 rounded-xl border border-primary-fixed/20">
        <Info className="w-5 h-5 text-primary-fixed flex-shrink-0" />
        <p className="text-sm text-on-surface-variant">
          Select calculators to compare their inputs and outputs side by side for better decision-making.
        </p>
      </div>

      {selected.length >= 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-white/5"
        >
          <button
            onClick={handleCompare}
            className="w-full bg-primary-fixed hover:bg-primary-fixed/90 text-on-primary-fixed py-3 rounded-xl font-semibold transition-colors"
          >
            Compare {selected.length} Calculators
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CalculatorComparison;
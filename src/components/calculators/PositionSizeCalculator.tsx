import { useState, useMemo } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export function PositionSizeCalculator() {
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(95);
  const [leverage, setLeverage] = useState(1);

  const calculation = useMemo(() => {
    const riskAmount = accountSize * (riskPercent / 100);
    const priceRisk = Math.abs(entryPrice - stopLoss);
    const positionSize = priceRisk > 0 ? riskAmount / priceRisk : 0;
    const positionValue = positionSize * entryPrice;
    const requiredMargin = positionValue / leverage;
    const actualRiskPercent = ((positionSize * priceRisk) / accountSize) * 100;
    
    return {
      positionSize: positionSize.toFixed(4),
      positionValue: positionValue.toFixed(2),
      requiredMargin: requiredMargin.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      actualRiskPercent: actualRiskPercent.toFixed(2),
      isValid: priceRisk > 0,
    };
  }, [accountSize, riskPercent, entryPrice, stopLoss, leverage]);

  const units = [100, 1000, 10000, 100000];
  const [unitSize, setUnitSize] = useState(100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Account Size</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Risk (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Unit Size</label>
              <div className="grid grid-cols-4 gap-2">
                {units.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnitSize(u)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      unitSize === u
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {u >= 1000 ? `${u/1000}K` : u}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Entry Price</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.01"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Stop Loss</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.01"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Leverage</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span>
          </div>

          {!calculation.isValid && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">Entry price and stop loss cannot be the same</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Position Size</p>
              <p className="text-2xl font-bold text-white mono">{calculation.positionSize}</p>
              <p className="text-neutral-500 text-sm">units</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Position Value</p>
              <p className="text-2xl font-bold text-white mono">${Number(calculation.positionValue).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Required Margin</p>
              <p className="text-2xl font-bold text-white mono">${Number(calculation.requiredMargin).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk Amount</p>
              <p className="text-2xl font-bold text-white mono">${Number(calculation.riskAmount).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Actual Risk</p>
              <p className="text-lg font-bold text-white mono">{calculation.actualRiskPercent}%</p>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className="bg-primary-fixed h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(Number(calculation.actualRiskPercent), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PositionSizeCalculator;
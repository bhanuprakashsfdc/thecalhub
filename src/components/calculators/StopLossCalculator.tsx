import { useState, useMemo } from 'react';
import { TrendingDown, AlertTriangle } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function StopLossCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [riskPercent, setRiskPercent] = useState(2);
  const [isLong, setIsLong] = useState(true);

  const calculation = useMemo(() => {
    const riskAmount = entryPrice * (riskPercent / 100);
    const stopLoss = isLong 
      ? entryPrice - riskAmount 
      : entryPrice + riskAmount;
    const stopPercent = ((Math.abs(entryPrice - stopLoss) / entryPrice) * 100).toFixed(2);
    
    return {
      stopLoss: stopLoss.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      stopPercent,
    };
  }, [entryPrice, riskPercent, isLong]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Position Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsLong(true)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    isLong
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setIsLong(false)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    !isLong
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Short
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Entry Price</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
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
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Stop Loss Levels</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Stop Loss Price</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{calculation.stopLoss}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk Amount</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.riskAmount).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Stop Loss %</p>
              <p className="text-2xl font-bold text-white mono">{calculation.stopPercent}%</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Price Levels</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Entry</span>
                <span className="text-white mono">{symbol}{entryPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-400">Stop Loss</span>
                <span className="text-red-400 mono">{symbol}{calculation.stopLoss}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StopLossCalculator;
import { useState, useMemo } from 'react';
import { GitCommit } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function BreakevenCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [isLong, setIsLong] = useState(true);
  const [numberOfTrades, setNumberOfTrades] = useState(1);
  const [fees, setFees] = useState(10);

  const calculation = useMemo(() => {
    const breakeven = isLong 
      ? entryPrice + (fees / numberOfTrades)
      : entryPrice - (fees / numberOfTrades);
    const breakevenPercent = ((Math.abs(breakeven - entryPrice) / entryPrice) * 100).toFixed(3);
    const feesPerTrade = (fees / numberOfTrades).toFixed(2);
    
    return {
      breakeven: breakeven.toFixed(2),
      breakevenPercent,
      feesPerTrade,
      moveNeeded: Math.abs(breakeven - entryPrice).toFixed(2),
    };
  }, [entryPrice, isLong, numberOfTrades, fees]);

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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number of Trades</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={numberOfTrades}
                onChange={(e) => setNumberOfTrades(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Total Fees</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <GitCommit className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Breakeven Point</span>
          </div>

          <div className="bg-primary-fixed/10 border border-primary-fixed/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <GitCommit className="w-8 h-8 text-primary-fixed" />
              <div>
                <p className="text-primary-fixed text-xs uppercase tracking-wider mb-1">Breakeven Price</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{calculation.breakeven}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Price Move Needed</p>
              <p className="text-2xl font-bold text-white mono">
                {isLong ? '+' : '-'}{symbol}{calculation.moveNeeded}
              </p>
              <p className="text-neutral-500 text-sm">({calculation.breakevenPercent}%)</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Fee Per Trade</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.feesPerTrade}</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Price Levels</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Entry</span>
                <span className="text-white mono">{symbol}{entryPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-primary-fixed">Breakeven</span>
                <span className="text-primary-fixed mono">{symbol}{calculation.breakeven}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreakevenCalculator;
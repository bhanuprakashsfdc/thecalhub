import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function PnLCalculator() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [exitPrice, setExitPrice] = useState(110);
  const [quantity, setQuantity] = useState(100);
  const [isLong, setIsLong] = useState(true);
  const [fees, setFees] = useState(0);

  const calculation = useMemo(() => {
    const direction = isLong ? 1 : -1;
    const priceDiff = (exitPrice - entryPrice) * direction;
    const grossPnL = priceDiff * quantity;
    const netPnL = grossPnL - fees;
    const pnlPercent = entryPrice > 0 ? (priceDiff / entryPrice) * 100 : 0;
    const roi = grossPnL > 0 ? 'profit' : 'loss';
    
    return {
      grossPnL: grossPnL.toFixed(2),
      netPnL: netPnL.toFixed(2),
      pnlPercent: pnlPercent.toFixed(2),
      isProfit: grossPnL >= 0,
      roi,
    };
  }, [entryPrice, exitPrice, quantity, isLong, fees]);

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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Exit Price</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={exitPrice}
                onChange={(e) => setExitPrice(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Quantity</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Trading Fees</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
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
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">P&L Results</span>
          </div>

          <div className={`p-6 rounded-xl mb-6 ${calculation.isProfit ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              {calculation.isProfit ? (
                <TrendingUp className="w-8 h-8 text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-400" />
              )}
              <div>
                <p className="text-neutral-400 text-sm">Net P&L</p>
                <p className={`text-3xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {calculation.isProfit ? '+' : '-'}${Math.abs(Number(calculation.netPnL)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Gross P&L</p>
              <p className={`text-2xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? '+' : '-'}${Math.abs(Number(calculation.grossPnL)).toLocaleString()}
              </p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">P&L %</p>
              <p className={`text-2xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? '+' : '-'}{calculation.pnlPercent}%
              </p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Return on Investment</p>
              <p className={`text-lg font-bold ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? 'Profit' : 'Loss'}
              </p>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all ${calculation.isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(Number(calculation.pnlPercent)), 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PnLCalculator;
import { useState, useMemo } from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function LiquidationCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [leverage, setLeverage] = useState(10);
  const [isLong, setIsLong] = useState(true);
  const [maintenanceMargin, setMaintenanceMargin] = useState(0.5);

  const calculation = useMemo(() => {
    const marginRatio = 1 / leverage;
    const liquidationDistance = marginRatio - maintenanceMargin / 100;
    const liquidationPrice = isLong 
      ? entryPrice * (1 - liquidationDistance)
      : entryPrice * (1 + liquidationDistance);
    const liquidationPercent = (liquidationDistance * 100);
    
    return {
      liquidationPrice: liquidationPrice.toFixed(2),
      liquidationPercent: liquidationPercent.toFixed(2),
      marginRatio: (marginRatio * 100).toFixed(2),
      distancePoints: Math.abs(entryPrice - liquidationPrice).toFixed(2),
    };
  }, [entryPrice, leverage, isLong, maintenanceMargin]);

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
              <div className="grid grid-cols-5 gap-2 mt-2">
                {[2, 5, 10, 20, 50].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLeverage(l)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      leverage === l
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {l}x
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Maintenance Margin (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={maintenanceMargin}
                  onChange={(e) => setMaintenanceMargin(Number(e.target.value))}
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
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Liquidation Levels</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Liquidation Price</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{calculation.liquidationPrice}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Distance to Liquidation</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.distancePoints}</p>
              <p className="text-neutral-500 text-sm">({calculation.liquidationPercent}%)</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Margin Required</p>
              <p className="text-2xl font-bold text-white mono">{calculation.marginRatio}%</p>
              <p className="text-neutral-500 text-sm">of position</p>
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
                <span className="text-red-400">Liquidation</span>
                <span className="text-red-400 mono">{symbol}{calculation.liquidationPrice}</span>
              </div>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(leverage * 2, 100)}%` }}
              />
            </div>
            <p className="text-neutral-500 text-xs mt-2">Higher leverage = smaller margin = closer to liquidation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiquidationCalculator;
import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

export function CAGRCalculator() {
  const [initialValue, setInitialValue] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(5);

  const calculation = useMemo(() => {
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
    const totalReturn = ((finalValue - initialValue) / initialValue) * 100;
    const annualizedReturn = totalReturn / years;
    
    return {
      cagr: cagr.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      annualizedReturn: annualizedReturn.toFixed(2),
      multiplier: (finalValue / initialValue).toFixed(2),
    };
  }, [initialValue, finalValue, years]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Initial Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Final Value</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time Period (Years)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[1, 3, 5, 10].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      years === y
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {y}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">CAGR Results</span>
          </div>

          <div className={`p-6 rounded-xl mb-6 ${Number(calculation.cagr) >= 0 ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              <TrendingUp className={`w-8 h-8 ${Number(calculation.cagr) >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-neutral-400 text-sm">CAGR</p>
                <p className={`text-3xl font-bold mono ${Number(calculation.cagr) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Number(calculation.cagr) >= 0 ? '+' : ''}{calculation.cagr}%
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Return</p>
              <p className={`text-2xl font-bold mono ${Number(calculation.totalReturn) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {Number(calculation.totalReturn) >= 0 ? '+' : ''}{calculation.totalReturn}%
              </p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Multiplier</p>
              <p className="text-2xl font-bold text-white mono">{calculation.multiplier}x</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Growth Projection</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-400">Initial</span>
              <span className="text-white mono">${initialValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-neutral-400">{years} years later</span>
              <span className="text-white mono">${finalValue.toLocaleString()}</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all ${Number(calculation.cagr) >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(Number(calculation.cagr)) / 50 * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CAGRCalculator;
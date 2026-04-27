import { useState, useMemo } from 'react';
import { Percent, AlertTriangle } from 'lucide-react';

export function KellyCriterionCalculator() {
  const [winRate, setWinRate] = useState(50);
  const [winLossRatio, setWinLossRatio] = useState(2);
  const [accountSize, setAccountSize] = useState(10000);
  const [fractionType, setFractionType] = useState('full');

  const calculation = useMemo(() => {
    const p = winRate / 100;
    const q = 1 - p;
    const b = winLossRatio;
    
    const kellyPercent = (p * b - q) / b;
    const halfKelly = kellyPercent / 2;
    const quarterKelly = kellyPercent / 4;
    
    let recommendedFraction = kellyPercent;
    if (fractionType === 'half') recommendedFraction = halfKelly;
    if (fractionType === 'quarter') recommendedFraction = quarterKelly;
    
    const positionSize = accountSize * recommendedFraction;
    const maxPositionSize = accountSize * kellyPercent;
    
    let recommendation = '';
    if (kellyPercent <= 0) {
      recommendation = 'No trade - Negative Expected Value';
    } else if (kellyPercent > 0.25) {
      recommendation = 'Consider Half-Kelly for stability';
    } else {
      recommendation = 'Full Kelly is reasonable';
    }
    
    return {
      kellyPercent: (kellyPercent * 100).toFixed(2),
      halfKelly: (halfKelly * 100).toFixed(2),
      quarterKelly: (quarterKelly * 100).toFixed(2),
      positionSize: positionSize.toFixed(2),
      maxPositionSize: maxPositionSize.toFixed(2),
      recommendation,
      isPositive: kellyPercent > 0,
    };
  }, [winRate, winLossRatio, accountSize, fractionType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Win Rate (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[25, 50, 75, 100].map((r) => (
                  <button
                    key={r}
                    onClick={() => setWinRate(r)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      winRate === r
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Win/Loss Ratio</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={winLossRatio}
                  onChange={(e) => setWinLossRatio(Number(e.target.value))}
                />
              </div>
            </div>

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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Kelly Fraction</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Full', value: 'full' },
                  { label: 'Half', value: 'half' },
                  { label: 'Quarter', value: 'quarter' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFractionType(f.value)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      fractionType === f.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {f.label}
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
            <Percent className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Kelly Criterion</span>
          </div>

          {!calculation.isPositive && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">System has negative expected value</span>
            </div>
          )}

          <div className="bg-surface-container-highest p-6 rounded-xl mb-6">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Recommended Position Size</p>
            <p className="text-3xl font-bold text-white mono">${Number(calculation.positionSize).toLocaleString()}</p>
            <p className="text-neutral-400 text-sm mt-2">{calculation.recommendation}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-fixed/10 p-4 rounded-xl text-center">
              <p className="text-primary-fixed text-xs uppercase tracking-wider mb-2">Full Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.kellyPercent}%</p>
            </div>
            <div className="bg-surface-container-highest p-4 rounded-xl text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Half Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.halfKelly}%</p>
            </div>
            <div className="bg-surface-container-highest p-4 rounded-xl text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Quarter Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.quarterKelly}%</p>
            </div>
          </div>

          <div className="bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Expected Value</p>
            <p className={`text-xl font-bold mono ${calculation.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {calculation.isPositive ? 'Positive' : 'Negative'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KellyCriterionCalculator;
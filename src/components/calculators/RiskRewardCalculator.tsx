import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function RiskRewardCalculator() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(90);
  const [takeProfit, setTakeProfit] = useState(120);

  const calculation = useMemo(() => {
    const risk = Math.abs(entryPrice - stopLoss);
    const reward = Math.abs(takeProfit - entryPrice);
    const ratio = risk > 0 ? reward / risk : 0;
    const riskPercent = (risk / entryPrice) * 100;
    const rewardPercent = (reward / entryPrice) * 100;
    
    return {
      risk: risk.toFixed(2),
      reward: reward.toFixed(2),
      ratio: ratio.toFixed(2),
      riskPercent: riskPercent.toFixed(2),
      rewardPercent: rewardPercent.toFixed(2),
      isValid: risk > 0 && reward > 0,
    };
  }, [entryPrice, stopLoss, takeProfit]);

  const longShort = [
    { label: 'Long', value: 'long' },
    { label: 'Short', value: 'short' },
  ];
  const [positionType, setPositionType] = useState('long');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Position Type</label>
              <div className="grid grid-cols-2 gap-2">
                {longShort.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setPositionType(type.value)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      positionType === type.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Stop Loss</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Take Profit</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Risk / Reward</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <p className="text-red-400 text-xs uppercase tracking-wider">Risk</p>
              </div>
              <p className="text-2xl font-bold text-white mono">${calculation.risk}</p>
              <p className="text-neutral-500 text-sm">({calculation.riskPercent}%)</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <p className="text-green-400 text-xs uppercase tracking-wider">Reward</p>
              </div>
              <p className="text-2xl font-bold text-white mono">${calculation.reward}</p>
              <p className="text-neutral-500 text-sm">({calculation.rewardPercent}%)</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Ratio</p>
              <p className="text-2xl font-bold text-white mono">1:{calculation.ratio}</p>
            </div>
          </div>

          <div className="mt-6 p-6 bg-surface-container-highest rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk/Reward Assessment</p>
            <p className={`text-lg font-bold ${Number(calculation.ratio) >= 2 ? 'text-green-400' : Number(calculation.ratio) >= 1 ? 'text-yellow-400' : 'text-red-400'}`}>
              {Number(calculation.ratio) >= 2 ? 'Excellent (1:2+)' : Number(calculation.ratio) >= 1 ? 'Good (1:1)' : 'Poor (< 1:1)'}
            </p>
            <p className="text-neutral-400 text-sm mt-2">
              {Number(calculation.ratio) >= 2 
                ? 'Great risk/reward ratio for consistent profitability.'
                : Number(calculation.ratio) >= 1 
                ? 'Acceptable ratio for day trading.'
                : 'Consider wider stop loss for better risk/reward.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskRewardCalculator;
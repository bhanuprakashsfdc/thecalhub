import { useState, useMemo } from 'react';
import { Skull } from 'lucide-react';

export function RiskOfRuinCalculator() {
  const [winRate, setWinRate] = useState(50);
  const [riskRewardRatio, setRiskRewardRatio] = useState(2);
  const [totalTrades, setTotalTrades] = useState(100);
  const [riskPerTrade, setRiskPerTrade] = useState(2);

  const calculation = useMemo(() => {
    const p = winRate / 100;
    const q = 1 - p;
    const b = riskRewardRatio;
    
    const expectedValue = (p * b) - q;
    const winLoss = p * b - q;
    
    if (winLoss <= 0) {
      return {
        probabilityOfRuin: 100,
        expectedValue: winLoss.toFixed(4),
        winLossRatio: winLoss.toFixed(4),
        risk: 'Certain Ruin - No Positive EV',
      };
    }
    
    const a = (1 + winLoss) / (1 - winLoss);
    const probabilityRuin = Math.pow(a, (totalTrades * (p - 0.5) * 2));
    
    const ruinatedTrades = Math.log(0.5) / Math.log(a);
    
    return {
      probabilityOfRuin: (probabilityRuin * 100).toFixed(2),
      expectedValue: expectedValue.toFixed(4),
      winLossRatio: winLoss.toFixed(4),
      risk: probabilityRuin < 0.1 ? 'Very Low' : probabilityRuin < 1 ? 'Low' : probabilityRuin < 10 ? 'Moderate' : 'High',
      ruinatedTrades: Math.max(0, Math.floor(ruinatedTrades)),
    };
  }, [winRate, riskRewardRatio, totalTrades]);

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
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Risk/Reward Ratio</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={riskRewardRatio}
                  onChange={(e) => setRiskRewardRatio(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Total Trades</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={totalTrades}
                onChange={(e) => setTotalTrades(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Risk Per Trade (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={riskPerTrade}
                  onChange={(e) => setRiskPerTrade(Number(e.target.value))}
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
            <Skull className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Risk of Ruin</span>
          </div>

          <div className={`p-6 rounded-xl mb-6 ${Number(calculation.probabilityOfRuin) > 10 ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'}`}>
            <div className="flex items-center gap-3">
              <Skull className={`w-8 h-8 ${Number(calculation.probabilityOfRuin) > 10 ? 'text-red-400' : 'text-green-400'}`} />
              <div>
                <p className="text-neutral-400 text-sm">Probability of Ruin</p>
                <p className={`text-3xl font-bold mono ${Number(calculation.probabilityOfRuin) > 10 ? 'text-red-400' : 'text-green-400'}`}>
                  {calculation.probabilityOfRuin}%
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Expected Value</p>
              <p className={`text-2xl font-bold mono ${Number(calculation.expectedValue) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.expectedValue}
              </p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk Level</p>
              <p className={`text-2xl font-bold mono ${
                calculation.risk === 'Very Low' ? 'text-green-400' : 
                calculation.risk === 'Low' ? 'text-green-400' : 
                calculation.risk === 'Moderate' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {calculation.risk}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Analysis</p>
            <p className="text-neutral-300">
              {Number(calculation.probabilityOfRuin) > 10 
                ? 'High risk of ruin. Consider reducing risk per trade or improving win rate.'
                : Number(calculation.probabilityOfRuin) > 1 
                ? 'Moderate risk. Consider reducing position size.'
                : 'Low risk of ruin. System is relatively safe.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskOfRuinCalculator;
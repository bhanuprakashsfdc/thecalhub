import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export function DCACalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(10);

  const calculation = useMemo(() => {
    const months = years * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    const initialValue = initialInvestment * Math.pow(1 + monthlyRate, months);
    
    const futureValueAnnuity = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalInvested = initialInvestment + (monthlyInvestment * months);
    const totalValue = initialValue + futureValueAnnuity;
    const totalReturn = totalValue - totalInvested;
    const returnPercent = (totalReturn / totalInvested) * 100;
    
    return {
      totalValue: totalValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      returnPercent: returnPercent.toFixed(2),
      monthlyReturn: (totalReturn / months).toFixed(2),
    };
  }, [initialInvestment, monthlyInvestment, years, expectedReturn]);

  const yearlyBreakdown = useMemo(() => {
    const breakdown = [];
    const monthlyRate = expectedReturn / 12 / 100;
    
    for (let year = 1; year <= years; year++) {
      const months = year * 12;
      const initialValue = initialInvestment * Math.pow(1 + monthlyRate, months);
      const futureValueAnnuity = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const totalValue = initialValue + futureValueAnnuity;
      const totalInvested = initialInvestment + (monthlyInvestment * months);
      
      breakdown.push({
        year,
        value: totalValue.toFixed(0),
        invested: totalInvested.toFixed(0),
        gain: (totalValue - totalInvested).toFixed(0),
      });
    }
    return breakdown;
  }, [initialInvestment, monthlyInvestment, years, expectedReturn]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Initial Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time Period (Years)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
              <div className="grid grid-cols-5 gap-2 mt-2">
                {[1, 3, 5, 10, 20].map((y) => (
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

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Expected Annual Return</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
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
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">DCA Results</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-neutral-400 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{Number(calculation.totalValue).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Invested</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.totalInvested).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Return</p>
              <p className="text-2xl font-bold text-green-400 mono">+{symbol}{Number(calculation.totalReturn).toLocaleString()}</p>
              <p className="text-neutral-500 text-sm">({calculation.returnPercent}%)</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-4">Yearly Breakdown</p>
            <div className="space-y-3">
              {yearlyBreakdown.map((item) => (
                <div key={item.year} className="flex items-center gap-4">
                  <span className="text-neutral-400 text-sm w-8">Y{item.year}</span>
                  <div className="flex-1 bg-neutral-800 rounded-full h-4 relative">
                    <div 
                      className="bg-primary-fixed h-4 rounded-full"
                      style={{ width: `${(Number(item.value) / Number(calculation.totalValue)) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-sm mono w-24 text-right">{symbol}{Number(item.value).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DCACalculator;
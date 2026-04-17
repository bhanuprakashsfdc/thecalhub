import { useState, useMemo } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const futureValue = monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r);
    const totalContrib = monthlyDeposit * n;
    const interest = futureValue - totalContrib;
    return { futureValue, totalContrib, interest };
  }, [monthlyDeposit, rate, years]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">RD Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your Recurring Deposit returns. Plan your savings with regular monthly deposits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Deposit</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                  <div className="relative">
                    <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Years</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Maturity Amount</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${Math.round(calculation.futureValue).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Deposits</label>
                <p className="text-2xl font-bold text-white mono">${Math.round(calculation.totalContrib).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${Math.round(calculation.interest).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About RD Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">A Recurring Deposit (RD) is a savings scheme offered by banks where you deposit a fixed amount monthly and earn interest at a predetermined rate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

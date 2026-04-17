import { useState, useMemo } from 'react';
import { Sparkles, Wallet, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function PersonalLoanCalculator() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(3);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return { emi: amount / n, total: amount, interest: 0 };
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - amount;
    return { emi, total, interest };
  }, [amount, rate, years]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Personal Loan Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate your personal loan EMI, total interest, and monthly payments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Years</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet className="w-32 h-32" /></div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Monthly EMI</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${calculation.emi.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">${Math.round(calculation.interest).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${Math.round(calculation.total).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Personal Loan Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Calculate your personal loan EMIs, total interest, and total payment over the loan tenure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

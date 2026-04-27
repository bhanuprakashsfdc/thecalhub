import { useState, useMemo } from 'react';
import { Sparkles, Receipt } from 'lucide-react';
import { motion } from 'motion/react';

export default function TaxCalculator() {
  const [income, setIncome] = useState(50000);
  const [status, setStatus] = useState('single');

  const calculation = useMemo(() => {
    const inc = income;
    let tax = 0;

    
    if (inc <= 11600) tax = inc * 0.1;
    else if (inc <= 47150) tax = 1160 + (inc - 11600) * 0.12;
    else if (inc <= 100525) tax = 5426 + (inc - 47150) * 0.22;
    else if (inc <= 191950) tax = 16758 + (inc - 100525) * 0.24;
    else if (inc <= 243725) tax = 38740 + (inc - 191950) * 0.32;
    else if (inc <= 609350) tax = 55328 + (inc - 243725) * 0.35;
    else tax = 181954 + (inc - 609350) * 0.37;

    const effectiveRate = (tax / inc) * 100;
    const takeHome = inc - tax;

    return { tax, effectiveRate, takeHome };
  }, [income, status]);

  const bracketData = useMemo(() => {
    const inc = income;
    const brackets = [
      { limit: 11600, rate: 10, label: '$0 - $11,600' },
      { limit: 47150, rate: 12, label: '$11,601 - $47,150' },
      { limit: 100525, rate: 22, label: '$47,151 - $100,525' },
      { limit: 191950, rate: 24, label: '$100,526 - $191,950' },
      { limit: 243725, rate: 32, label: '$191,951 - $243,725' },
      { limit: 609350, rate: 35, label: '$243,726 - $609,350' },
      { limit: Infinity, rate: 37, label: '$609,351+' },
    ];
    let remaining = inc;
    const data = [];
    
    for (let i = 0; i < brackets.length; i++) {
      const bracket = brackets[i];
      const prevLimit = i === 0 ? 0 : brackets[i - 1].limit;
      const taxableInBracket = Math.min(Math.max(remaining, 0), bracket.limit - prevLimit);
      
      if (taxableInBracket > 0) {
        data.push({
          label: bracket.label,
          rate: bracket.rate,
          amount: taxableInBracket,
          tax: taxableInBracket * (bracket.rate / 100),
        });
        remaining -= taxableInBracket;
      }
    }
    return data;
  }, [income]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Tax Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your estimated federal income tax, effective tax rate, and take-home pay. Our free online calculator helps you plan your finances.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Tax</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Income</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">IRS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Annual Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Filing Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none">
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Receipt className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Estimated Tax</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${Math.round(calculation.tax).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Effective Rate</label>
                <p className="text-2xl font-bold text-white mono">{calculation.effectiveRate.toFixed(1)}%</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Take Home Pay</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${Math.round(calculation.takeHome).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Tax Brackets</label>
            <div className="space-y-3">
              {bracketData.map((bracket, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-container-highest rounded-lg">
                  <div>
                    <span className="text-sm text-white font-medium">{bracket.label}</span>
                    <span className="text-xs text-neutral-500 ml-2">({bracket.rate}%)</span>
                  </div>
                  <span className="text-white mono">${Math.round(bracket.tax).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Tax Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This calculator uses 2024 US federal income tax brackets to estimate your tax liability.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Note:</strong> This is an estimate only. Consult a tax professional for accurate tax advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
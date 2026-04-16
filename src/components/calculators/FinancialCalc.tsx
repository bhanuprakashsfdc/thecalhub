import React, { useState } from 'react';
import { TrendingUp, Percent, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function FinancialCalc() {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);

  const emi = React.useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emiVal = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emiVal);
  }, [amount, rate, tenure]);

  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - amount;

  const inputClass = "w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-xs font-mono text-white focus:border-primary-fixed/50 outline-none transition-colors";
  const labelClass = "text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1 block";

  return (
    <div className="bg-surface-container-low p-4 rounded-xl border border-white/5 flex flex-col gap-4 h-full min-h-[320px]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Financial / EMI</span>
        <TrendingUp className="w-4 h-4 text-primary-fixed" />
      </div>

      <div className="space-y-3">
        <div>
          <label className={labelClass}>Loan Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 text-[10px]">$</span>
            <input 
              type="number" 
              className={cn(inputClass, "pl-6")} 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Rate (%)</label>
            <input 
              type="number" 
              className={inputClass} 
              value={rate} 
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelClass}>Tenure (Yrs)</label>
            <input 
              type="number" 
              className={inputClass} 
              value={tenure} 
              onChange={(e) => setTenure(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-xs text-neutral-400">Monthly EMI</span>
          <span className="text-xl font-bold text-primary-fixed font-mono">${emi.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/20 p-2 rounded border border-white/5">
            <span className="text-[9px] text-neutral-600 block mb-1">Total Interest</span>
            <span className="text-xs font-mono text-white">${totalInterest.toLocaleString()}</span>
          </div>
          <div className="bg-black/20 p-2 rounded border border-white/5">
            <span className="text-[9px] text-neutral-600 block mb-1">Total Payable</span>
            <span className="text-xs font-mono text-white">${totalPayable.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

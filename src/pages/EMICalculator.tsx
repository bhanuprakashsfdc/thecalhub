import React, { useState, useMemo } from 'react';
import { Info, Banknote, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell as BarCell } from 'recharts';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenure, setTenure] = useState(15);

  const calculation = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenure * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    return {
      emi: emi.toFixed(2),
      totalInterest: Math.round(totalInterest).toLocaleString(),
      totalPayment: Math.round(totalPayment).toLocaleString(),
      principalPercent: Math.round((p / totalPayment) * 100),
      interestPercent: Math.round((totalInterest / totalPayment) * 100),
    };
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#D6ED79' },
    { name: 'Interest', value: parseFloat(calculation.totalInterest.replace(/,/g, '')), color: '#BDC2FF' },
  ];

  const barData = Array.from({ length: 6 }, (_, i) => ({
    name: i === 0 ? 'Start' : i === 5 ? 'End' : '',
    principal: 100 - i * 15,
    interest: i * 15,
  }));

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-white tracking-tighter mb-2">EMI Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg">Calculate your Equated Monthly Installments with precision and detailed amortization breakdowns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>
                <div className="mt-4 h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-fixed" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tenure (Years)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 30].map((y) => (
                    <button
                      key={y}
                      onClick={() => setTenure(y)}
                      className={cn(
                        "py-3 rounded-lg text-sm font-medium transition-colors",
                        tenure === y ? "bg-primary-fixed text-on-primary-fixed font-bold" : "bg-surface-container-highest hover:bg-neutral-700"
                      )}
                    >
                      {y}y
                    </button>
                  ))}
                </div>
                <div className="relative mt-4">
                  <input
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">Years</span>
                </div>
              </div>

              <button className="w-full py-4 bg-primary-fixed text-on-primary-fixed rounded-lg font-black uppercase tracking-widest text-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary-fixed/10">
                Update Calculation
              </button>
            </div>
          </div>

          <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/20">
            <div className="flex items-start gap-4">
              <Info className="text-secondary w-5 h-5" />
              <div>
                <h4 className="text-secondary font-bold text-sm mb-1">Developer Tip</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  You can use keyboard shortcuts <kbd className="px-1.5 py-0.5 bg-white/10 rounded mono text-[10px]">CMD+S</kbd> to save this scenario to your history.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Banknote className="w-32 h-32" />
              </div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-2">Monthly EMI</label>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-white mono">${calculation.emi.split('.')[0]}</span>
                <span className="text-neutral-500 mono text-xl">.{calculation.emi.split('.')[1]}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                  <p className="text-2xl font-bold text-white mono">${calculation.totalInterest}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                  <p className="text-2xl font-bold text-white mono">${calculation.totalPayment}</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Principal</span>
                  <span className="text-xl font-black text-white mono">{calculation.principalPercent}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-fixed"></div>
                  <span className="text-xs text-neutral-400">Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-xs text-neutral-400">Interest</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-6">Amortization Projection</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="interest" stackId="a" fill="#D6ED79" radius={[2, 2, 0, 0]} opacity={0.2} />
                    <Bar dataKey="principal" stackId="a" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-[10px] text-neutral-500 mono uppercase">Start</span>
                <span className="text-[10px] text-neutral-500 mono uppercase">End of Tenure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

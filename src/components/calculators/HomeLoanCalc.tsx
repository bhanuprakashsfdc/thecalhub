import { useState, useMemo } from 'react';
import { Sparkles, Home, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';

export default function HomeLoanCalc() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(20);

  const calculation = useMemo(() => {
    const r = rate / 12 / 100;
    const n = time * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    return { emi, totalInterest, totalPayment };
  }, [principal, rate, time]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#D6ED79' },
    { name: 'Interest', value: calculation.totalInterest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 12 / 100;
    for (let i = 1; i <= time; i++) {
      const months = i * 12;
      let balance = principal;
      for (let m = 0; m < months; m++) {
        const interest = balance * r;
        const principalPaid = calculation.emi - interest;
        balance -= principalPaid;
      }
      data.push({ year: `Year ${i}`, balance: Math.max(0, Math.round(balance)) });
    }
    return data;
  }, [principal, rate, time, calculation.emi]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Home Loan EMI Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your home loan EMI, total interest, and total payment. Our free online calculator helps you plan your housing loan with accurate monthly payment calculations.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Housing Loan</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">EMI Calculation</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Compare Rates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tenure (Years)</label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Home className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Monthly EMI</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{symbol}{Math.round(calculation.emi).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.totalInterest).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.round(calculation.totalPayment).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Principal vs Interest</label>
              <div className="relative w-40 h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Principal</span>
                  <span className="text-xl font-black text-white mono">{Math.round((principal / calculation.totalPayment) * 100)}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Loan Balance Over Time</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${((v/100000).toFixed(1))}L`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${Number(v).toLocaleString()}`, 'Balance']} />
                    <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Home Loan EMI</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              EMI (Equated Monthly Installment) is the fixed payment you make to repay your home loan. It includes both principal and interest components.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              <strong>Pro Tip:</strong> Consider making part-prepayments to reduce your total interest burden and shorten your loan tenure.
            </p>
          </div>

          <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="text-secondary w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-secondary font-bold text-sm mb-1">Pro Tip</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  A 20-year loan at 8.5% for ₹50 Lakhs costs ₹1.04 Cr total. Consider a 15-year loan to save ₹18 Lakhs in interest!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
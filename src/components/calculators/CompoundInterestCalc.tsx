import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function CompoundInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(5);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'halfyearly' | 'yearly'>('yearly');

  const calculation = useMemo(() => {
    const nMap = { monthly: 12, quarterly: 4, halfyearly: 2, yearly: 1 };
    const n = nMap[frequency];
    const rDecimal = rate / 100;
    const maturity = principal * Math.pow(1 + rDecimal / n, n * time);
    const interest = maturity - principal;
    return { maturity, interest };
  }, [principal, rate, time, frequency]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const nMap = { monthly: 12, quarterly: 4, halfyearly: 2, yearly: 1 };
    const n = nMap[frequency];
    const rDecimal = rate / 100;
    for (let i = 0; i <= time; i++) {
      const value = principal * Math.pow(1 + rDecimal / n, n * i);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [principal, rate, time, frequency]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Principal Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
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
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time (Years)</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Compounding Frequency</label>
              <div className="grid grid-cols-4 gap-2">
                {(['monthly', 'quarterly', 'halfyearly', 'yearly'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`py-3 rounded-lg text-sm font-medium transition-all ${
                      frequency === f ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'bg-surface-container-highest hover:bg-neutral-700 text-neutral-400'
                    }`}
                  >
                    {f === 'monthly' ? 'Monthly' : f === 'quarterly' ? 'Quarter' : f === 'halfyearly' ? 'Half' : 'Yearly'}
                  </button>
                ))}
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
            <TrendingUp className="w-32 h-32" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Results</label>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono">${calculation.maturity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-white mono">${calculation.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Value</label>
              <p className="text-2xl font-bold text-white mono">${(calculation.maturity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Interest</span>
                <span className="text-xl font-black text-white mono">{Math.round((calculation.interest / calculation.maturity) * 100)}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Growth Over Time</label>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompoundInterestCalc;

import { useState, useMemo } from 'react';
import { Sparkles, Building2, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function NPSCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [rate, setRate] = useState(10);
  const [time, setTime] = useState(30);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = time * 12;
    const maturity = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    const invested = monthlyContribution * n;
    const interest = maturity - invested;
    return { maturity, invested, interest };
  }, [monthlyContribution, rate, time]);

  const pieData = [
    { name: 'Contributions', value: calculation.invested, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 12;
    for (let i = 0; i <= time; i++) {
      const n = i * 12;
      const value = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [monthlyContribution, rate, time]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">NPS Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Estimate your National Pension System (NPS) corpus at retirement. Our free online calculator helps you plan your retirement savings with tax benefits and compound returns.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Pension Planning</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Tax Benefits</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Retirement</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Expected Return (%)</label>
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
              <Building2 className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Estimated NPS Corpus</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${calculation.maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Contributions</label>
                <p className="text-2xl font-bold text-white mono">${calculation.invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${calculation.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Contributions vs Interest</label>
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
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Contributions</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Corpus Growth Over Time</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v/100000).toFixed(1)}L`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Value']} />
                    <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About NPS Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              National Pension System (NPS) is a retirement savings scheme managed by PFRDA. It offers tax benefits under Section 80CCD and helps build a retirement corpus through systematic contributions.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              <strong>Tax Benefits:</strong> Additional deduction up to ₹50,000 under Section 80CCD(1B) over and above Section 80C limits.
            </p>
          </div>

          <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/20">
            <div className="flex items-start gap-4">
              <TrendingUp className="text-secondary w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-secondary font-bold text-sm mb-1">Pro Tip</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Start NPS early! ₹5,000/month for 30 years at 10% return can create a corpus of ₹1.05 Crores. Use 60% of this to purchase annuity for regular pension.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
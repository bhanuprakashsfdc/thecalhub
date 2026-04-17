import { useState, useMemo } from 'react';
import { Sparkles, TrendingUp, Calculator, Banknote } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function SimpleInterestCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(5);

  const calculation = useMemo(() => {
    const interest = (principal * rate * time) / 100;
    const maturity = principal + interest;
    return { interest, maturity };
  }, [principal, rate, time]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= time; i++) {
      const interest = (principal * rate * i) / 100;
      data.push({ year: `Year ${i}`, interest, total: principal + interest });
    }
    return data;
  }, [principal, rate, time]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Simple Interest Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate simple interest for loans, investments, and savings. Our free online calculator provides accurate results for financial planning and comparison with compound interest.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Free Tool</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Instant Results</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Compare SI vs CI</span>
        </div>
      </div>

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
              <span className="text-5xl font-black text-white mono">${calculation.maturity.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">${calculation.interest.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Principal</label>
                <p className="text-2xl font-bold text-white mono">${principal.toLocaleString()}</p>
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
                  <span className="text-xl font-black text-white mono">{Math.round((principal / calculation.maturity) * 100)}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Interest Growth</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
                    <Bar dataKey="total" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Simple vs Compound Interest</h3>
            <div className="space-y-3 text-neutral-400 text-sm">
              <p><strong>Simple Interest:</strong> Interest = P × r × t (linear growth)</p>
              <p><strong>Compound Interest:</strong> Interest compounds periodically (exponential growth)</p>
              <p className="text-primary-fixed">For long-term investments, compound interest typically yields higher returns.</p>
            </div>
          </div>

          <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/20">
            <div className="flex items-start gap-4">
              <Calculator className="text-secondary w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-secondary font-bold text-sm mb-1">Pro Tip</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Compare both! Use our Simple Interest Calculator and Compound Interest Calculator to see which option is better for your specific financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
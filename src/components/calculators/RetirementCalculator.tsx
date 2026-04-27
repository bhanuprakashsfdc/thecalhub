import { useState, useMemo } from 'react';
import { Sparkles, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [returnRate, setReturnRate] = useState(7);

  const calculation = useMemo(() => {
    const years = retireAge - age;
    const rate = returnRate / 100 / 12;
    const months = years * 12;
    
    if (years <= 0) return { futureSavings: 0, totalContrib: 0, totalInterest: 0, years: 0 };
    
    const futureSavings = currentSavings * Math.pow(1 + rate, months) + monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    const totalContrib = currentSavings + monthly * months;
    const totalInterest = futureSavings - totalContrib;

    return { futureSavings, totalContrib, totalInterest, years };
  }, [age, retireAge, currentSavings, monthly, returnRate]);

  const pieData = [
    { name: 'Contributions', value: calculation.totalContrib, color: '#D6ED79' },
    { name: 'Interest', value: calculation.totalInterest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const years = retireAge - age;
    const rate = returnRate / 100 / 12;
    let balance = currentSavings;
    
    for (let i = 1; i <= years; i++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + rate) + monthly;
      }
      data.push({ 
        year: `Year ${i}`, 
        savings: Math.round(balance),
        contribution: Math.round(currentSavings + monthly * 12 * i),
        interest: Math.round(balance - (currentSavings + monthly * 12 * i))
      });
    }
    return data;
  }, [age, retireAge, currentSavings, monthly, returnRate]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Retirement Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Plan your retirement by estimating how much you can save. Our free calculator helps you project your retirement savings based on current savings and contributions.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Retirement</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Savings</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">401k</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Current Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Retirement Age</label>
                  <input type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Current Savings</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Expected Return (%)</label>
                <div className="relative">
                  <input type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PiggyBank className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Projected Savings</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${Math.round(calculation.futureSavings).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Contributions</label>
                <p className="text-2xl font-bold text-white mono">${Math.round(calculation.totalContrib).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${Math.round(calculation.totalInterest).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Contributions vs Interest</label>
              <div className="relative w-40 h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Interest</span>
                  <span className="text-xl font-black text-white mono">{calculation.futureSavings > 0 ? Math.round((calculation.totalInterest / calculation.futureSavings) * 100) : 0}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Contributions</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Savings Growth</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                     <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`$${(v ?? 0).toLocaleString()}`, '']} />
                    <Bar dataKey="savings" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Retirement Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This calculator projects your retirement savings based on your current age, retirement age, current savings, and monthly contributions.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Tip:</strong> Starting early with consistent contributions can significantly grow your retirement fund due to compound interest.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
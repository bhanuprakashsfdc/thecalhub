import { useState, useMemo } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function InvestmentCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(10);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    
    const futureValue = initial * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
    const totalInvested = initial + monthly * n;
    const totalInterest = futureValue - totalInvested;

    return { futureValue, totalInvested, totalInterest };
  }, [initial, monthly, rate, years]);

  const pieData = [
    { name: 'Invested', value: calculation.totalInvested, color: '#D6ED79' },
    { name: 'Interest', value: calculation.totalInterest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 12;
    let balance = initial;
    
    for (let i = 1; i <= years; i++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + monthly;
      }
      data.push({ year: `Year ${i}`, balance: Math.round(balance), invested: Math.round(initial + monthly * 12 * i) });
    }
    return data;
  }, [initial, monthly, rate, years]);

  const faqs = [
    {
      question: "How does compound interest work in this calculator?",
      answer: "Compound interest is calculated on both your initial investment and accumulated interest from previous periods. Our calculator uses the formula FV = P(1+r)^n + PMT × ((1+r)^n - 1) / r, where P is your initial investment, r is the monthly interest rate, n is the number of months, and PMT is your monthly contribution. The power of compounding means your money grows exponentially over time as interest earns interest on itself."
    },
    {
      question: "Should I invest a lump sum or monthly contributions?",
      answer: "Both strategies have merits. Lump sum investing often yields higher returns historically because your money has more time to compound. However, monthly contributions (dollar-cost averaging) reduce timing risk and make investing more manageable. Many financial experts recommend starting with monthly contributions even if you can afford more, then increasing contributions as your income grows."
    },
    {
      question: "What return rate should I use for realistic projections?",
      answer: "Historical stock market returns average around 7-10% annually after inflation. For conservative estimates, use 5-7%. For aggressive projections, 10-12%. Remember that past performance doesn't guarantee future results, and actual returns will vary based on market conditions, fees, and your specific investment choices."
    },
    {
      question: "How does the time horizon affect my investment growth?",
      answer: "Time is the most powerful factor in investing due to compounding. Starting 10 years earlier can mean the difference between doubling your money versus quadrupling it. Use the years slider to see how dramatically your portfolio grows over longer periods. Even small differences in years create massive gaps in final values due to exponential growth."
    },
    {
      question: "Are taxes and fees accounted for in this calculator?",
      answer: "This calculator shows gross returns before taxes and fees. Investment returns are typically subject to capital gains taxes or income taxes depending on your account type (401k, IRA, taxable). Additionally, mutual funds and ETFs have expense ratios that reduce returns. For more accurate projections, consider using after-tax return estimates and subtracting typical fund expenses."
    },
    {
      question: "How much should I invest monthly for a comfortable retirement?",
      answer: "The ideal monthly investment depends on your retirement goals, current age, and existing savings. A common rule is to save 15-20% of your income for retirement. Use our calculator with realistic returns (7-8%) and adjust the years until your target retirement age to see required monthly contributions. Starting early is crucial - doubling your contributions may be less effective than starting 10 years earlier."
    }
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Investment Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your investment growth over time. Our free calculator helps you project future value based on initial investment, monthly contributions, and expected returns. See how compound interest works in your favor with detailed charts and projections.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Investment</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Returns</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Compound</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Initial Investment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                  <input type="number" value={initial} onChange={(e) => setInitial(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                  <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Annual Return (%)</label>
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

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h4 className="text-white font-bold mb-4">Investment Breakdown</h4>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={pieData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={50} 
                    outerRadius={70} 
                    paddingAngle={5} 
                    dataKey="value" 
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Total</span>
                <span className="text-xl font-black text-white mono">{Math.round(calculation.futureValue / 1000)}k</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div>
                  <span className="text-neutral-400 text-sm">Total Invested</span>
                </div>
                <span className="text-white font-mono">{symbol}{Math.round(calculation.totalInvested).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div>
                  <span className="text-neutral-400 text-sm">Interest Earned</span>
                </div>
                <span className="text-primary-fixed font-mono">+{symbol}{Math.round(calculation.totalInterest).toLocaleString()}</span>
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
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Future Value</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{symbol}{Math.round(calculation.futureValue).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Invested</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.totalInvested).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.round(calculation.totalInterest).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Invested vs Interest</label>
              <div className="relative w-40 h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Interest</span>
                  <span className="text-xl font-black text-white mono">{calculation.futureValue > 0 ? Math.round((calculation.totalInterest / calculation.futureValue) * 100) : 0}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Invested</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Investment Growth Over Time</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${(v/1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${Number(v).toLocaleString()}`, '']} />
                    <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <AboutSection 
            title="Investment Calculator"
            description="The Investment Calculator is a powerful financial tool that helps you project the future value of your investments based on compound interest. Whether you're planning for retirement, saving for a down payment, or building wealth, this calculator provides detailed insights into how your money can grow over time. By inputting your initial investment, monthly contributions, expected annual return, and investment timeline, you can visualize the power of compound interest and make informed decisions about your financial future."
            features={[
              "Calculate future value with compound interest and regular contributions",
              "Visualize the breakdown between your contributions and earned interest",
              "See year-by-year growth with interactive bar charts",
              "Compare different scenarios by adjusting return rates and time periods",
              "Understand the true cost of waiting to start investing"
            ]}
            formula="FV = P(1+r)^n + PMT × ((1+r)^n - 1) / r"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
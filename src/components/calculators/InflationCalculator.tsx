import { useState, useMemo } from 'react';
import { TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function InflationCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const calculation = useMemo(() => {
    const futureValue = principal * Math.pow(1 + rate/100, years);
    const inflationLoss = futureValue - principal;
    return { futureValue, inflationLoss };
  }, [principal, rate, years]);

  const pieData = [
    { name: 'Original', value: principal, color: '#D6ED79' },
    { name: 'Purchasing Power Loss', value: Math.abs(calculation.inflationLoss), color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= years; i++) {
      const value = principal * Math.pow(1 + rate/100, i);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [principal, rate, years]);

  const faqs = [
    {
      question: "What is inflation and how does it affect my money?",
      answer: "Inflation is the rate at which prices rise over time, reducing the purchasing power of money. If inflation is 5% annually, something costing 100 today will cost 105 next year. Your money saved under a mattress loses value - 10,000 today might only buy 6,000 worth of goods in 10 years at 5% inflation. This is why keeping all money in low-interest accounts can actually result in loss of real value. Understanding inflation is crucial for financial planning - you need returns higher than inflation to actually grow your wealth."
    },
    {
      question: "How is inflation measured in India?",
      answer: "India measures inflation primarily through two indices: Consumer Price Index (CPI) and Wholesale Price Index (WPI). CPI measures retail price changes across categories like food, housing, clothing, and is used for policy and salary adjustments. WPI tracks wholesale prices. Currently, CPI inflation in India averages 4-6%, though food inflation can be higher. The Reserve Bank of India targets 4% inflation with a tolerance band of 2-6%. Historical inflation has been higher (8-10% in 2000s) but has moderated in recent years."
    },
    {
      question: "How much should I invest to beat inflation?",
      answer: "To maintain your purchasing power, your investments must return at least the inflation rate. Currently, you need minimum 6-7% returns just to break even. However, after taxes and fees, you need even higher returns. Equities have historically returned 10-15%, beating inflation significantly over long periods. Fixed deposits at 7-8% barely beat inflation. Debt funds return 6-8%. The key is asset allocation - use equities for long-term goals (10+ years), debt for short-term (under 3 years), and gold as an inflation hedge. Don't keep too much in cash or low-interest instruments."
    },
    {
      question: "What is the impact of inflation on savings and investments?",
      answer: "Inflation dramatically reduces real returns on investments. If you earn 8% on FDs but inflation is 5%, your real return is only 3%. After 30% tax on interest, real return drops to around 2%. This means your money is barely growing in real terms. Equities have historically provided 10-12% nominal returns, which translates to 6-8% real returns after inflation - significantly better than fixed income. For retirement planning spanning decades, ignoring inflation can leave you with far less than needed. Always calculate real returns, not just nominal returns."
    },
    {
      question: "How does inflation affect loan borrowers and savers differently?",
      answer: "Inflation benefits borrowers and hurts savers. When inflation is high, the real value of debt decreases over time - your 10 lakh loan becomes easier to pay off as your income rises with inflation. However, savers suffer because their fixed returns lose purchasing power. This is why during high inflation, central banks raise interest rates to encourage saving and discourage borrowing. If you have fixed-rate loans and inflation rises, you're effectively repaying less in real terms - a hidden benefit for borrowers."
    },
    {
      question: "How can I protect my investments from inflation?",
      answer: "Several investment options hedge against inflation: equities (direct stocks or mutual funds) historically beat inflation by 6-8% over long periods; real estate benefits from rising property prices and rental income; gold is a traditional inflation hedge though volatile; inflation-indexed bonds provide guaranteed real returns; NPS and PPF offer decent returns with tax benefits. For short-term needs, use high-yield savings or short-term debt funds. The key is diversifying across asset classes and starting early to give your money time to grow beyond inflation."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Current Amount ({symbol})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl outline-none" type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Inflation Rate (%)</label>
              <div className="relative">
                <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Years</label>
              <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Purchasing Power</label>
          <div className="relative w-40 h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Loss</span>
              <span className="text-xl font-black text-white mono">{Math.round((Math.abs(calculation.inflationLoss) / calculation.futureValue) * 100)}%</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Original</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Power Lost</span></div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingDown className="w-32 h-32" />
          </div>
          <div className="flex items-center gap-2 text-primary-fixed mb-6"><TrendingDown className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span></div>
          <div className="bg-surface-container-highest p-6 rounded-xl mb-4">
            <p className="text-4xl font-bold text-white mono">{symbol}{Math.abs(calculation.inflationLoss).toFixed(2)}</p>
            <p className="text-neutral-500 text-sm mt-2">Loss due to inflation</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Future Value</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.futureValue.toFixed(2)}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Purchasing Power Lost</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.abs(calculation.inflationLoss).toFixed(2)}</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Inflation Impact Over Time</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="value" fill="#BDC2FF" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AboutSection 
          title="Inflation Calculator"
          description="The Inflation Calculator helps you understand how inflation erodes the purchasing power of your money over time. Inflation is a critical concept in personal finance that often gets overlooked - while you might focus on growing your savings, the real question is whether your money maintains its value in terms of what it can buy. This calculator shows how much more you'll need in the future to match the purchasing power of your current savings. Understanding inflation is essential for proper financial planning, especially for long-term goals like retirement. If you're saving for something 20 years away, you need to account for the fact that what costs 10 lakhs today might cost 27 lakhs in 20 years at 5% average inflation."
          features={[
            "Calculate future purchasing power loss due to inflation",
            "See how inflation compounds over different time periods",
            "Visualize year-by-year value erosion",
            "Plan for realistic financial goals accounting for inflation",
            "Compare different inflation rate scenarios"
          ]}
          formula="FV = P × (1 + r)^n"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
export default InflationCalculator;
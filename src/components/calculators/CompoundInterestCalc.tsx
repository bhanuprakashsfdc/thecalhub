import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function CompoundInterestCalc() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(5);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'halfyearly' | 'yearly'>('yearly');

  const faqs = [
    {
      question: "What is compound interest and why is it important?",
      answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only earns returns on the original amount, compound interest allows your money to grow exponentially over time. This is why it's often called 'interest on interest.' Albert Einstein reportedly called it the eighth wonder of the world. The key to maximizing compound interest is starting early and being consistent - time is your greatest ally when it comes to compound growth."
    },
    {
      question: "How does compounding frequency affect returns?",
      answer: "The more frequently interest compounds, the higher your returns. For example, 10% annual interest compounded monthly is actually 10.47% effective annual rate, while daily compounding gives 10.52%. This difference becomes significant over long periods. With monthly compounding on 1 lakh at 8% for 10 years, you'll earn 1.19 lakhs vs 1.16 lakhs with annual compounding - a small but meaningful difference. For maximizing returns, choose the highest compounding frequency available."
    },
    {
      question: "What is the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount: SI = P × r × t. Compound interest includes interest on accumulated interest: CI = P × (1 + r/n)^(nt) - P. For a 1 lakh investment at 10% for 5 years: simple interest gives 50,000 total (50% return), while compound interest gives 61,051 total (61% return). The gap widens dramatically with longer periods - over 30 years, simple interest gives 300% return while compound gives 1,644% return on the same principal."
    },
    {
      question: "How can I use compound interest for long-term wealth building?",
      answer: "Start investing as early as possible - even small amounts grow significantly over decades. Consistency matters more than timing: regular monthly investments in diversified assets harness compound growth effectively. Use tax-advantaged accounts like retirement funds to maximize compounding. Avoid withdrawing gains early as that breaks the compounding cycle. Reinvest all returns rather than spending them. The key is patience - the real magic happens in later years when growth becomes exponential."
    },
    {
      question: "What rate of return should I assume for compound interest calculations?",
      answer: "Historical equity market returns are 10-12% annually, but use conservative estimates (7-10%) for planning. Bank FDs give 6-8%, government bonds 7-8%, and equity mutual funds 10-15% historically. Real returns (after inflation) are typically 4-6% for equities. Always consider inflation - a 10% nominal return with 7% inflation means only 3% real growth. Factor in taxes on gains too. Use our calculator with different scenarios to understand the range of possible outcomes."
    },
    {
      question: "Why does compound interest accelerate in later years?",
      answer: "In early years, most growth comes from new contributions. But as your balance grows, the percentage gains become larger in absolute terms. For example, 10% of 10,000 is 1,000, but 10% of 1,00,000 is 10,000. This 'acceleration phase' typically kicks in after 10-15 years. A 5 lakh investment at 10% grows to 13 lakhs in 10 years but reaches 34 lakhs in 20 years - more than double the 10-year value despite equal time periods. This exponential curve is why starting early is crucial."
    }
  ];

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
            <span className="text-5xl font-black text-white mono">{symbol}{calculation.maturity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Value</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{(calculation.maturity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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

          <AboutSection 
            title="Compound Interest Calculator"
            description="The Compound Interest Calculator is a powerful financial tool that helps you understand how your money grows over time when interest is earned on both the initial principal and accumulated interest. Unlike simple interest calculations, compound interest creates exponential growth, making it one of the most important concepts in finance and wealth building. This calculator allows you to input your principal amount, interest rate, time period, and compounding frequency to see exactly how your investment will grow. The power of compound interest is often called the eighth wonder of the world because of its ability to transform small, regular investments into substantial wealth over time. By understanding compound interest, you can make better decisions about savings, investments, and loans. Whether you're planning for retirement, saving for a down payment, or evaluating different investment options, this calculator provides the insights you need to plan your financial future effectively."
            features={[
              "Calculate compound interest with various compounding frequencies",
              "Compare principal vs interest earned over time",
              "Visualize wealth growth year by year",
              "Understand the impact of different interest rates",
              "Plan long-term savings and investment goals"
            ]}
            formula="A = P(1 + r/n)^(nt)"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default CompoundInterestCalc;

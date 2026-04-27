import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function SIPCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [time, setTime] = useState(5);

  const calculation = useMemo(() => {
    const r = expectedReturn / 100 / 12;
    const n = time * 12;
    const futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const invested = monthlyInvestment * n;
    const interest = futureValue - invested;
    return { invested, interest, maturity: futureValue };
  }, [monthlyInvestment, expectedReturn, time]);

  const pieData = [
    { name: 'Invested', value: calculation.invested, color: '#D6ED79' },
    { name: 'Returns', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = expectedReturn / 100 / 12;
    for (let i = 0; i <= time; i++) {
      const n = i * 12;
      const value = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [monthlyInvestment, expectedReturn, time]);

  const faqs = [
    {
      question: "What is SIP and how does it work?",
      answer: "SIP (Systematic Investment Plan) is a method of investing in mutual funds where you invest a fixed amount at regular intervals (monthly, quarterly, etc.) rather than making a lump sum investment. SIP works on the principle of rupee cost averaging - when markets are high, you buy fewer units, and when markets are low, you buy more units. This averages out your cost per unit over time and reduces the impact of market volatility on your investments."
    },
    {
      question: "What is a good return rate for SIP investments?",
      answer: "Historical equity mutual fund SIPs have delivered 10-15% annualized returns over long periods (10+ years). However, returns vary by fund category: equity funds may give 12-15%, hybrid funds 8-12%, and debt funds 6-8%. It's important to note that SIP returns are not guaranteed and depend on market performance. For realistic planning, use 10-12% for equity SIPs."
    },
    {
      question: "How does the power of compounding work in SIP?",
      answer: "The power of compounding in SIP means your money earns returns on previous returns. In the early years, the growth appears slow, but as time passes, the compounding effect accelerates dramatically. For example, in a 20-year SIP, the last 5 years often generate more returns than the first 15 years combined. This is why starting early is crucial - even small monthly investments can grow into substantial wealth over time."
    },
    {
      question: "Should I increase my SIP amount over time?",
      answer: "Yes, it's highly recommended to increase your SIP contributions as your income grows (step-up SIP). Increasing your monthly investment by just 10% annually can significantly boost your final corpus. For instance, increasing from 5000 to 5500 monthly after one year can add several lakhs to your final returns over a 20-year period due to the extra contribution and additional compounding time."
    },
    {
      question: "What is the minimum and maximum tenure for SIP?",
      answer: "Most mutual funds allow SIP investments for periods ranging from 6 months to unlimited tenure. However, SIP works best with long-term horizons of 5+ years to fully benefit from rupee cost averaging and compounding. There's typically no maximum limit, and you can continue SIP as long as you want. Many investors continue their SIPs for decades, especially for retirement planning."
    },
    {
      question: "Can I pause or stop my SIP temporarily?",
      answer: "Yes, most mutual funds allow you to pause SIPs for a certain period (typically 1-6 months) or cancel the SIP entirely. You can also skip individual SIP installments without canceling the entire plan. However, it's generally not recommended to stop SIPs during market downturns as this defeats the purpose of rupee cost averaging. If you need funds, consider pausing rather than completely stopping."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
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
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
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

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Investment Breakdown</h4>
          <div className="relative w-40 h-40 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Returns</span>
              <span className="text-xl font-black text-white mono">{Math.round((calculation.interest / calculation.maturity) * 100)}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div>
                <span className="text-neutral-400 text-sm">Total Invested</span>
              </div>
              <span className="text-white font-mono">{symbol}{Math.round(calculation.invested).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div>
                <span className="text-neutral-400 text-sm">Interest Earned</span>
              </div>
              <span className="text-primary-fixed font-mono">+{symbol}{Math.round(calculation.interest).toLocaleString()}</span>
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
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">SIP Returns</label>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono">{symbol}{calculation.maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Amount Invested</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.invested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{calculation.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Invested vs Returns</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Returns</span>
                <span className="text-xl font-black text-white mono">{Math.round((calculation.interest / calculation.maturity) * 100)}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Invested</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Returns</span></div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Wealth Growth Over Time</label>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <AboutSection 
          title="SIP Calculator"
          description="The SIP (Systematic Investment Plan) Calculator is designed to help you calculate the future value of your mutual fund investments made through regular monthly contributions. SIP is one of the most popular investment methods in India and across the world for building long-term wealth. This calculator shows how small regular investments can grow into a substantial corpus over time through the power of compounding and rupee cost averaging. Whether you're saving for retirement, a child's education, or any long-term financial goal, this calculator helps you plan your investment journey by showing expected returns based on your monthly contribution, expected return rate, and investment tenure."
          features={[
            "Calculate future value of regular monthly investments",
            "See breakdown between amount invested and interest earned",
            "Visualize wealth accumulation year over year",
            "Understand the power of long-term investing",
            "Plan for specific financial goals with targeted returns"
          ]}
          formula="FV = PMT × [((1 + r)^n - 1) / r] × (1 + r)"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}

export default SIPCalculator;
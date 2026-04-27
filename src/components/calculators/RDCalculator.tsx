import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function RDCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const futureValue = monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r);
    const totalContrib = monthlyDeposit * n;
    const interest = futureValue - totalContrib;
    return { futureValue, totalContrib, interest };
  }, [monthlyDeposit, rate, years]);

  const pieData = [
    { name: 'Deposits', value: calculation.totalContrib, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 12;
    for (let i = 0; i <= years; i++) {
      const n = i * 12;
      const value = monthlyDeposit * ((Math.pow(1 + r, n) - 1) / r);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [monthlyDeposit, rate, years]);

  const faqs = [
    {
      question: "What is a Recurring Deposit and how does it work?",
      answer: "A Recurring Deposit (RD) is a term deposit scheme where you deposit a fixed amount monthly for a predetermined period at a fixed interest rate. It's ideal for people who want to save regularly but can't commit to a large lump sum. Each monthly installment earns interest at the RD rate, and the total accumulates until maturity. Unlike Fixed Deposits where you invest once, RDs help build the habit of regular savings. Most banks and post offices offer RDs with tenure options from 6 months to 10 years, with interest paid on maturity for cumulative RDs."
    },
    {
      question: "How is RD interest calculated?",
      answer: "RD uses compound interest formula: A = P × [(1+r)^n - 1] / (1 - (1+r)^(-1/3)), where P is monthly deposit, r is monthly interest rate (annual rate/12/100), and n is total months. However, most banks use a simpler method: interest = Total deposits × Rate × Time / 100 (simple interest on reducing balance). For a 5,000 monthly RD at 8.5% for 1 year, the interest would be approximately 2,700. The effective yield is slightly higher than the nominal rate because of monthly compounding. Compare rates across banks as they vary."
    },
    {
      question: "Can I withdraw my RD prematurely?",
      answer: "Yes, most banks allow premature withdrawal but with penalties. Typically, you get 1-2% lower interest than the contracted rate, plus a processing fee. Partial withdrawal isn't usually allowed - you must break the entire RD. Some banks offer a loan against your RD (up to 90% of value) at slightly higher rates than the RD rate itself, which is better than breaking it. If you anticipate needing funds, consider splitting your RD into multiple accounts with different maturities."
    },
    {
      question: "What is the minimum deposit for RD?",
      answer: "Most banks allow RDs starting from 100-500 per month, with no upper limit. You can choose any amount in multiples of 10 or 100. The key is consistency - pick an amount you can comfortably afford monthly without strain. Many banks offer higher rates for larger deposits or longer tenures. Some also have special RD schemes for senior citizens (extra 0.5%) and students. Post Office RDs require just 10 minimum monthly deposit, making it accessible to all."
    },
    {
      question: "How does RD compare to other investment options?",
      answer: "RD offers guaranteed returns similar to FD but with regular savings discipline. Compared to equity SIPs, RD returns are lower but risk-free. Current RD rates (7-9%) beat most savings accounts but may not beat inflation long-term. For short-term goals (1-3 years), RD is good. For long-term wealth creation, equity mutual funds perform better. Consider your risk tolerance and goal timeline. Use RD for emergency funds and short-term goals, SIP for long-term wealth building."
    },
    {
      question: "What happens if I miss an RD installment?",
      answer: "Missing an RD installment usually results in a penalty - some banks charge 1-2 per month as penalty or reduce the interest rate. After 3-6 consecutive defaults, the RD may be closed and you receive the balance with reduced interest. Some banks allow you to pause RD for 1-2 months (subject to terms) which can be useful during financial difficulties. Avoid defaults as they affect your credit score and future banking relationships."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Deposit</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                <div className="relative">
                  <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time (Years)</label>
                <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Deposits vs Interest</label>
          <div className="relative w-40 h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Interest</span>
              <span className="text-xl font-black text-white mono">{Math.round((calculation.interest / calculation.futureValue) * 100)}%</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Deposits</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Maturity Value</label>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono">{symbol}{Math.round(calculation.futureValue).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Deposits</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.totalContrib).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.round(calculation.interest).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">RD Growth Over Time</label>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AboutSection 
          title="Recurring Deposit Calculator"
          description="The Recurring Deposit (RD) Calculator helps you estimate the maturity value of your monthly deposit investment. Recurring Deposits are popular savings instruments offered by banks and post offices where you commit to depositing a fixed amount each month for a specified period. This calculator uses the compound interest formula to show exactly how your regular monthly deposits will grow over time. RDs are ideal for building a habit of consistent savings and achieving short to medium-term financial goals. Whether you're saving for a vacation, a down payment, or an emergency fund, this calculator helps you plan your savings journey by showing how small monthly contributions can accumulate into a significant corpus over time."
          features={[
            "Calculate RD maturity value with monthly compounding",
            "See breakdown between total deposits and interest earned",
            "Visualize year-by-year savings growth",
            "Plan regular savings goals with estimated returns",
            "Compare different deposit amounts and tenures"
          ]}
          formula="FV = PMT × [(1+r)^n - 1] / r"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}

export default RDCalculator;
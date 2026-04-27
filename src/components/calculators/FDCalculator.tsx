import { useState, useMemo } from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function FDCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [time, setTime] = useState(5);

  const faqs = [
    {
      question: "What is a Fixed Deposit and how does it work?",
      answer: "A Fixed Deposit (FD) is a financial instrument offered by banks and post offices where you deposit a lump sum for a fixed tenure at a predetermined interest rate. Unlike savings accounts, your money is locked for the chosen period, and you receive guaranteed returns. The interest is typically compounded quarterly, meaning you earn interest on your interest. FDs are considered one of the safest investment options because they're insured up to 5 lakhs per depositor per bank and offer guaranteed returns regardless of market fluctuations."
    },
    {
      question: "How is FD interest calculated?",
      answer: "FD interest uses compound interest formula: A = P(1 + r/n)^(nt), where A is maturity amount, P is principal, r is annual rate, n is compounding frequency (usually 4 for quarterly), and t is time in years. Most FDs compound quarterly, so a 1 lakh FD at 7% for 1 year gives maturity of 1,07,186. You can choose simple interest (paid monthly/quarterly) or compound interest (paid at maturity). Cumulative FDs compound interest half-yearly or quarterly, while non-cumulative FDs pay interest out regularly."
    },
    {
      question: "What happens if I withdraw my FD early?",
      answer: "Breaking an FD before maturity incurs a penalty of typically 0.5-1% on the applicable interest rate. You also receive lower interest - often 1-2% less than the contracted rate. For example, if you have a 7% FD and break it after 6 months, you might get only 5-6% interest plus lose the penalty. Additionally, some banks charge a processing fee. However, some banks offer partial withdrawal facilities where you can withdraw up to 50% of the balance without breaking the entire FD. Always check the premature withdrawal terms before investing."
    },
    {
      question: "Should I choose short-term or long-term FD?",
      answer: "Short-term FDs (1-2 years) offer flexibility and are better if you expect interest rates to rise - you can reinvest at higher rates. Long-term FDs (3-5 years) lock in current rates, useful when rates are expected to fall. Currently, shorter tenures (1-2 years) often offer similar or better rates than longer ones due to inverted yield curve. Consider your liquidity needs - shorter terms reduce lock-in. Senior citizens get 0.5% extra rate, which can add up significantly over longer periods."
    },
    {
      question: "What is the minimum and maximum deposit for FD?",
      answer: "Most banks allow FDs starting from 1,000 with no upper limit. Some premium FDs require minimum 5-10 lakh for higher rates. The ideal deposit amount depends on your needs - don't put all eggs in one basket as DICGC insurance covers only 5 lakhs per bank per depositor. If you have larger amounts, consider spreading across multiple banks or using multiple FDs in the same bank under different account numbers to maximize insurance coverage. NRIs can open NRO and NRE FDs with 1 lakh minimum."
    },
    {
      question: "How do tax implications work on FD returns?",
      answer: "FD interest is taxed at your income tax slab rate, and banks deduct TDS at 10% if interest exceeds 40,000 annually (50,000 for senior citizens). If your total income is below taxable limit, you can avoid TDS by submitting Form 15G/15H. The interest is added to your total income, so high earners pay more. For 5-year FDs under Section 80C, you can claim deduction up to 1.5 lakh on interest, but the lock-in is longer and rates typically lower. Plan your FD investments considering tax impact."
    }
  ];

  const calculation = useMemo(() => {
    const maturity = principal * Math.pow(1 + rate / 100 / 4, 4 * time);
    const interest = maturity - principal;
    return { maturity, interest };
  }, [principal, rate, time]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= time; i++) {
      const value = principal * Math.pow(1 + rate / 100 / 4, 4 * i);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [principal, rate, time]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Principal Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
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
                <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Maturity Value</label>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono">{symbol}{Math.round(calculation.maturity).toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.interest).toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Principal</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{principal.toLocaleString()}</p>
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
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">FD Growth</label>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="Fixed Deposit Calculator"
            description="The Fixed Deposit (FD) Calculator is a reliable financial planning tool that helps you calculate the maturity value of your fixed deposit investments. Fixed Deposits are one of the most popular and safest investment options in India, offering guaranteed returns with minimal risk. This calculator uses the compound interest formula to show exactly how your money will grow over the chosen tenure. Whether you're planning for short-term goals like a vacation or long-term objectives like retirement, understanding your FD returns helps you make informed investment decisions. The calculator allows you to adjust principal amount, interest rate, and tenure to see different scenarios and plan your savings effectively. Fixed Deposits remain a preferred choice for risk-averse investors because they offer capital protection, guaranteed returns, and flexible tenure options."
            features={[
              "Calculate FD maturity amount with quarterly compounding",
              "Compare interest earned vs principal over time",
              "Visualize growth trajectory with yearly breakdown",
              "Plan for specific financial goals with estimated returns",
              "Compare different tenure options and their returns"
            ]}
            formula="A = P(1 + r/n)^(nt)"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default FDCalculator;

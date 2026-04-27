import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function SimpleInterestCalc() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(5);

  const faqs = [
    {
      question: "What is simple interest and how is it calculated?",
      answer: "Simple interest is interest calculated only on the original principal amount, not on accumulated interest. The formula is: SI = P × r × t, where P is principal, r is annual interest rate (as decimal), and t is time in years. For example, 1 lakh at 8% for 3 years gives interest = 1,00,000 × 8/100 × 3 = 24,000. The total amount due is 1,24,000. Unlike compound interest, simple interest doesn't add interest on interest, making it easier to calculate but less beneficial for long-term investments."
    },
    {
      question: "When is simple interest used?",
      answer: "Simple interest is commonly used for short-term loans (up to 1 year), treasury bills, bonds, and some fixed deposits. It's also used in consumer loans, auto loans, and education loans where the interest calculation is straightforward. For long-term investments (over 1 year), compound interest is typically used as it better reflects how money actually grows. Many financial products use simple interest for the initial period and may switch to compound for longer terms."
    },
    {
      question: "How does simple interest differ from compound interest?",
      answer: "The key difference is that simple interest is calculated only on the principal, while compound interest is calculated on principal plus accumulated interest. For a 1 lakh investment at 10% for 5 years: simple interest gives total 1,50,000 (50% return), while compound interest gives 1,61,051 (61% return). The gap widens with longer periods - over 20 years, simple interest gives 200% return vs compound gives 573%. For investments, compound is always better; for borrowing, simple interest loans can be cheaper."
    },
    {
      question: "Can simple interest be converted to monthly interest?",
      answer: "Yes, to get monthly simple interest: Monthly Interest = (Principal × Rate × Time in months) / 12. For example, 1 lakh at 12% annual rate for 6 months gives: (1,00,000 × 12 × 6) / 12 = 6,000 interest. The monthly interest is 1,000. This is useful for calculating interest on short-term loans or advances. Some lenders quote annual rates but calculate interest on a daily or monthly basis."
    },
    {
      question: "What is the difference between simple and flat interest?",
      answer: "In practice, simple interest and flat interest are often used interchangeably - both calculate interest on the original principal. However, 'flat rate' sometimes refers to a method where interest is calculated on the full loan amount for the entire tenure, then added to get total payment, which is then divided by months. This results in higher effective interest than simple interest because you're paying interest on principal even as you repay the loan. Always check the effective rate, not just the nominal rate."
    },
    {
      question: "How do I calculate total interest for partial repayments?",
      answer: "For partial repayments with simple interest, calculate interest on remaining principal after each payment. For example, if you repay 50,000 after 1 year on a 1 lakh loan at 10% for 2 years: Year 1 interest = 10,000, remaining principal = 50,000. Year 2 interest = 5,000 (on 50,000). Total interest = 15,000 instead of 20,000. Early repayment reduces total interest significantly. Use our calculator to see savings from extra repayments."
    }
  ];

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
            <TrendingUp className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Results</label>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono">{symbol}{calculation.maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Value</label>
              <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{calculation.maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Principal vs Interest</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie></PieChart>
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
                  <Bar dataKey="total" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="Simple Interest Calculator"
            description="The Simple Interest Calculator helps you calculate interest earned or payable based on the simple interest formula. Unlike compound interest, simple interest is calculated only on the original principal amount throughout the entire period. This makes it one of the most straightforward interest calculation methods and is commonly used for short-term loans, certain fixed deposits, and various financial instruments. Understanding simple interest is essential for making informed decisions about borrowing and investing. Whether you're comparing loan offers, calculating returns on short-term investments, or planning to repay a loan early, this calculator provides accurate calculations to help you understand the total interest involved."
            features={[
              "Calculate simple interest for any principal, rate, and time",
              "See breakdown between principal and interest amounts",
              "Visualize interest accumulation over the period",
              "Compare simple vs compound interest outcomes",
              "Plan loan repayments with accurate interest calculations"
            ]}
            formula="SI = P × r × t"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default SimpleInterestCalc;

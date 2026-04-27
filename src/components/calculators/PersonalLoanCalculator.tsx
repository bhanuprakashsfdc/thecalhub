import { useState, useMemo } from 'react';
import { Sparkles, Wallet } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function PersonalLoanCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(3);

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return { emi: amount / n, total: amount, interest: 0 };
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - amount;
    return { emi, total, interest };
  }, [amount, rate, years]);

  const pieData = [
    { name: 'Principal', value: amount, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 100 / 12;
    let balance = amount;
    for (let i = 1; i <= years; i++) {
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        const principalPaid = calculation.emi - interest;
        balance -= principalPaid;
      }
      data.push({ year: `Year ${i}`, balance: Math.max(0, Math.round(balance)) });
    }
    return data;
  }, [amount, rate, years, calculation.emi]);

  const faqs = [
    {
      question: "What is a personal loan and what can I use it for?",
      answer: "A personal loan is an unsecured loan that doesn't require any collateral - you borrow based on your creditworthiness and income. Unlike home or car loans, there's no specific purpose requirement. Common uses include: debt consolidation (combining high-interest credit card debt), home renovation, wedding expenses, medical emergencies, travel, education fees, or business capital. Since it's unsecured, interest rates are higher (10-22%) than secured loans. The loan amount typically ranges from 50,000 to 25 lakhs with tenure of 1-5 years."
    },
    {
      question: "What determines my personal loan interest rate?",
      answer: "Your personal loan interest rate depends on several factors: credit score (750+ gets 10-14%, below 650 may get rejected or pay 20%+), income level (higher salary = better rates), employment type (salaried with stable job gets better rates than self-employed), existing debt obligations, loan amount and tenure, and relationship with the bank. Banks also consider your Cibil score, repayment history, and credit utilization. Compare rates from multiple banks - even 1% difference saves significant interest over the loan period."
    },
    {
      question: "Should I consolidate my debts into a personal loan?",
      answer: "Debt consolidation can be beneficial if: your personal loan rate is lower than your current debt rates (e.g., consolidating 24% credit card debt into 14% personal loan), you have multiple debts making management difficult, and you can commit to not accumulating new debt. Benefits include single EMI, potentially lower interest, and simplified tracking. However, ensure the total cost of new loan isn't higher and that you don't run up credit cards again. Use our calculator to compare your current total interest vs consolidated loan cost."
    },
    {
      question: "Can I prepay my personal loan? What are the charges?",
      answer: "Most banks allow prepayment after 6-12 months with charges of 2-4% of outstanding principal. However, some banks offer zero prepayment for floating rate loans. Fixed rate loans typically have prepayment penalties. Before prepaying, check if the penalty exceeds the interest you'll save. Also consider if you could invest the money elsewhere for better returns - if your investments give higher returns than your loan interest rate, it's better to invest rather than prepay. Use this calculator to see exactly how much interest you save by prepaying early."
    },
    {
      question: "What is the difference between personal loan and credit card loan?",
      answer: "Personal loans offer fixed interest (typically 10-18%) with regular monthly EMIs, while credit card loans (EMI on credit card) charge 18-24% APR but offer more flexibility. Personal loans have fixed tenure and EMI, while credit card EMIs can be opted for specific transactions with varying tenure. Personal loans are better for large, one-time expenses with clear repayment timeline. Credit card EMIs are convenient for smaller purchases but cost more. Always check the effective interest rate and total cost before choosing."
    },
    {
      question: "How much personal loan can I get based on my salary?",
      answer: "Most banks offer personal loans up to 10-20 times your gross monthly salary, subject to a maximum of 25 lakhs. Your EMI shouldn't exceed 40-50% of your monthly income. For example, with 50,000 monthly salary, you might get 5-10 lakh loan depending on other obligations. Self-employed individuals qualify based on IT returns showing business income. Banks also consider existing EMIs - if you already have ongoing loans, your eligibility reduces. Use this calculator with your salary to understand potential eligibility."
    }
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Personal Loan Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate your personal loan EMI, total interest, and monthly payments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                  <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Interest Rate (%)</label>
                  <div className="relative">
                    <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Years</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Principal vs Interest</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Interest</span>
                <span className="text-xl font-black text-white mono">{Math.round((calculation.interest / calculation.total) * 100)}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Wallet className="w-32 h-32" /></div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Monthly EMI</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{symbol}{calculation.emi.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.interest).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.round(calculation.total).toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Loan Balance Over Time</label>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="year" stroke="#666" fontSize={10} />
                  <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${((v/1000).toFixed(0))}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${Number(v).toLocaleString()}`, 'Balance']} />
                  <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="Personal Loan Calculator"
            description="The Personal Loan Calculator is an essential tool for anyone considering an unsecured loan for various financial needs. Personal loans are versatile financial products that can be used for any purpose - from debt consolidation to home improvements, wedding expenses, or medical emergencies. Unlike secured loans, personal loans don't require collateral, making them accessible but typically carrying higher interest rates. This calculator helps you understand exactly what you'll pay monthly, the total interest over the loan tenure, and how your loan balance will decrease over time. Understanding these details is crucial for making informed borrowing decisions and ensuring the loan fits within your budget without causing financial strain."
            features={[
              "Calculate exact monthly personal loan EMI",
              "See complete breakdown of principal vs total interest",
              "Visualize year-by-year loan balance reduction",
              "Compare different tenure options and their costs",
              "Plan for early repayment and prepayment savings"
            ]}
            formula="EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
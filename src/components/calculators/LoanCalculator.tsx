import { useState, useMemo } from 'react';
import { Sparkles, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function LoanCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);

  const faqs = [
    {
      question: "How is loan EMI calculated?",
      answer: "EMI (Equated Monthly Installment) is calculated using the formula: EMI = P × r × (1+r)^n / [(1+r)^n - 1], where P is principal loan amount, r is monthly interest rate (annual rate/12/100), and n is total number of monthly installments. This formula ensures each EMI includes both principal and interest in an amortizing pattern where early payments are mostly interest and later payments are mostly principal. For example, a 5 lakh loan at 10% for 5 years has EMI of 10,624 and total interest of 1.37 lakh over the loan period."
    },
    {
      question: "What factors affect my loan eligibility?",
      answer: "Loan eligibility depends on several factors: credit score (750+ preferred), income stability, existing debt obligations, age (younger borrowers get longer tenures), employment type (salaried vs self-employed), and property value for secured loans. Banks typically allow EMI up to 40-50% of gross income. A credit score below 700 may result in higher interest rates or rejection. Use this calculator to understand how different loan amounts affect your EMI and plan accordingly before applying."
    },
    {
      question: "Should I choose shorter or longer loan tenure?",
      answer: "Shorter tenure means higher EMI but lower total interest - a 5 lakh loan at 10% for 3 years costs 79,600 interest vs 1.37 lakh for 5 years. Longer tenure reduces monthly burden but significantly increases total interest paid. Consider your cash flow - if you can afford higher EMI without strain, go shorter. However, don't stretch tenure just to reduce EMI if it means paying excessive interest. The ideal tenure balances affordable EMI with minimal total cost."
    },
    {
      question: "Can I prepay my loan? What are the charges?",
      answer: "Most banks allow prepayment after 6-12 months with charges ranging from 2-4% of outstanding principal for floating rate loans (now mostly penalty-free per RBI rules). Fixed rate loans typically charge 2-3% penalty. Prepayment in early years saves maximum interest since most interest is paid early in the tenure. Use this calculator to see how extra payments reduce your total interest. Even small additional payments monthly can save significant interest over the loan period."
    },
    {
      question: "What is the difference between fixed and floating interest rates?",
      answer: "Fixed rates remain constant throughout the loan tenure, giving predictable EMIs regardless of market changes - currently around 8.5-9.5%. Floating rates are linked to a benchmark (MCLR, repo rate) and change when rates change - currently starting from 8.5% but can go lower or higher. Fixed is 1-2% more expensive but offers stability; floating is cheaper but EMIs fluctuate. Choose fixed if you want budget certainty and can afford the higher rate, choose floating if you expect rates to fall."
    },
    {
      question: "How does interest rate affect total loan cost?",
      answer: "Even small rate differences significantly impact total cost. A 10 lakh loan at 9% for 20 years costs 10.9 lakh interest, while at 11% it costs 14 lakh - a 2% difference costs 3.1 lakh more! Always negotiate for better rates, especially if you have good credit. Even 0.5% reduction saves lakhs over long tenure. Compare rates from multiple lenders using this calculator. Remember that the lowest EMI might not mean lowest total cost - always check total interest paid."
    }
  ];

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

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Loan Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your loan monthly payment, total interest, and total cost. Our free online calculator helps you understand your loan payments and plan your budget.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Loan</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">EMI</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Amortization</span>
        </div>
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
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Term (Years)</label>
                  <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Monthly Payment</label>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Principal vs Interest</label>
              <div className="relative w-40 h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Principal</span>
                  <span className="text-xl font-black text-white mono">{Math.round((amount / calculation.total) * 100)}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Loan Balance</label>
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
          </div>

          <AboutSection 
            title="Loan Calculator"
            description="The Loan Calculator is a comprehensive financial tool that helps you understand your loan repayments in detail. Whether you're planning to take a home loan, car loan, personal loan, or any other type of credit, this calculator provides accurate EMI calculations along with a complete breakdown of principal versus interest. Understanding your loan commitments is crucial for financial planning - knowing exactly how much you'll pay each month helps you budget effectively and avoid payment defaults. This calculator allows you to adjust loan amount, interest rate, and tenure to find the optimal combination that fits your budget while minimizing total interest paid."
            features={[
              "Calculate exact monthly EMI for any loan amount",
              "See complete breakdown between principal and total interest",
              "Visualize year-by-year loan balance reduction",
              "Compare different tenure options and their costs",
              "Plan prepayment strategy to save interest"
            ]}
            formula="EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
import { useState, useMemo } from 'react';
import { Sparkles, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function HomeLoanCalc() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [time, setTime] = useState(20);

  const faqs = [
    {
      question: "What is a home loan and how does it work?",
      answer: "A home loan is a secured loan specifically for purchasing residential property - a house, flat, or plot. The property itself serves as collateral, which is why home loans have lower interest rates than personal loans. You borrow 70-80% of the property value and repay over 15-30 years through monthly EMIs. The EMI includes both principal and interest in an amortization pattern where early payments are mostly interest and later payments are mostly principal. Interest rates can be fixed (same throughout) or linked to MCLR/repo rate (floating)."
    },
    {
      question: "What determines my home loan interest rate?",
      answer: "Home loan rates depend on: credit score (750+ gets 8-7.5%, below 650 may not qualify), income stability, property location and type (new property gets better rates), loan amount and tenure, and your relationship with the bank. Cibil score is crucial - even a small reduction can increase your rate by 0.5-1%. Women co-owners often get 0.05% lower rates. Current home loan rates range from 6.5% to 9% depending on profile. Compare rates across banks - even 0.25% difference on 50 lakh saves 7+ lakhs over 20 years."
    },
    {
      question: "How much home loan can I get based on my salary?",
      answer: "Banks typically allow EMI up to 40-50% of monthly income. With 1 lakh salary, your max EMI is 40-50k, which at 8.5% for 20 years gives loan of 45-55 lakh. You can also get approximately 60-80 times your monthly gross salary as loan. However, existing EMIs reduce eligibility. Use this calculator with your salary to estimate eligibility. Salaried individuals need 2-3 years in current job, while self-employed need 3-5 years of stable business with good ITR. Your Cibil report is checked for any past defaults."
    },
    {
      question: "Should I opt forBuilder tie-up loans or go directly to bank?",
      answer: "Builder tie-up loans offer convenience (single window process) and sometimes special rates, but you can't negotiate. Going directly to banks gives room for negotiation - you can get 0.25-0.5% better rates by comparing multiple banks. Builder tie-ups may also have hidden costs or be limited to specific projects. However, for under-construction properties, builder tie-ups can be faster as the bank already has project approval. Always compare the final rate including processing fee, not just the advertised rate."
    },
    {
      question: "What is the minimum down payment for a home loan?",
      answer: "You need to pay 10-25% of property value as down payment. Most banks finance 75-80%, so minimum down payment is 20-25%. Some schemes allow 10-15% for affordable housing. The down payment must come from your savings - cannot be financed. Additional costs include: registration stamp duty (5-8% in most states), GST on under-construction property (5% for affordable, 12% otherwise), and registration/legal charges (1-2%). Budget an additional 5-10% of property value for these costs."
    },
    {
      question: "Can I transfer my home loan to another bank?",
      answer: "Yes, you can balance transfer your home loan to get lower interest rates. Processing fee is 0.5-1% of outstanding amount. Transfer makes sense if the new rate is at least 0.5% lower and you have more than 5 years left - in early years, most payment is interest so transferring saves more. However, check if current bank offers rate reduction instead - some match competitor offers to retain customers. Also consider that resetting the clock means early years are again interest-heavy. Calculate if transfer actually saves money after processing fees."
    }
  ];

  const calculation = useMemo(() => {
    const r = rate / 12 / 100;
    const n = time * 12;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;
    return { emi, totalInterest, totalPayment };
  }, [principal, rate, time]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#D6ED79' },
    { name: 'Interest', value: calculation.totalInterest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    const r = rate / 12 / 100;
    for (let i = 1; i <= time; i++) {
      const months = i * 12;
      let balance = principal;
      for (let m = 0; m < months; m++) {
        const interest = balance * r;
        const principalPaid = calculation.emi - interest;
        balance -= principalPaid;
      }
      data.push({ year: `Year ${i}`, balance: Math.max(0, Math.round(balance)) });
    }
    return data;
  }, [principal, rate, time, calculation.emi]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Home Loan EMI Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your home loan EMI, total interest, and total payment. Our free online calculator helps you plan your housing loan with accurate monthly payment calculations.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Housing Loan</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">EMI Calculation</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Compare Rates</span>
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
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tenure (Years)</label>
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
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Home className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Monthly EMI</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{symbol}{Math.round(calculation.emi).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Interest</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{Math.round(calculation.totalInterest).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Payment</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{Math.round(calculation.totalPayment).toLocaleString()}</p>
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
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Principal</span>
                  <span className="text-xl font-black text-white mono">{Math.round((principal / calculation.totalPayment) * 100)}%</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Principal</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Loan Balance Over Time</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${((v/100000).toFixed(1))}L`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${Number(v).toLocaleString()}`, 'Balance']} />
                    <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <AboutSection 
            title="Home Loan EMI Calculator"
            description="The Home Loan EMI Calculator is an essential tool for anyone planning to purchase a home through financing. A home loan is typically the largest financial commitment in a person's life, and understanding your EMI obligations is crucial for long-term financial planning. This calculator provides accurate monthly payment calculations along with a complete breakdown of principal versus interest over the loan tenure. The visualization helps you understand how much of your total payment goes toward interest versus principal - often surprising for first-time buyers. Seeing the year-by-year reduction in loan balance helps you plan for potential prepayments or refinancing decisions that could save significant interest."
            features={[
              "Calculate exact monthly home loan EMI",
              "See complete breakdown between principal and total interest",
              "Visualize year-by-year loan balance reduction trajectory",
              "Compare different tenure options and their total costs",
              "Plan for early repayment and interest savings strategies"
            ]}
            formula="EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
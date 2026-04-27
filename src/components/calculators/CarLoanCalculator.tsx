import { useState, useMemo } from 'react';
import { Sparkles, Car } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function CarLoanCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(5);

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
      question: "What is a car loan and how does it work?",
      answer: "A car loan is a secured loan where the vehicle serves as collateral. You borrow a specific amount to purchase a car and repay it with interest over a fixed tenure (typically 1-7 years). The interest rate can be fixed or floating, and is determined based on your credit score, income, and the loan amount. Most banks offer loans up to 80-90% of the vehicle's on-road price, requiring you to make the remaining as down payment. The loan is repaid through EMIs that include both principal and interest."
    },
    {
      question: "What is the typical car loan interest rate in India?",
      answer: "Car loan interest rates in India range from 8.5% to 14% depending on the lender, borrower profile, and loan tenure. Public banks typically offer 8.5-10%, private banks 9-12%, and NBFCs 10-14%. New car loans have lower rates than used car loans. Your credit score significantly affects the rate - 750+ gets the best rates, while below 650 may result in rejection or very high rates. Some banks offer festive discounts of 0.25-0.5% off. Always compare rates from multiple lenders before committing."
    },
    {
      question: "How much down payment should I make for a car loan?",
      answer: "Ideally, make 20-30% down payment to get favorable loan terms and lower EMI burden. Banks usually finance 80-90% of the vehicle value, so 10-20% is minimum required. A higher down payment reduces your loan amount, lowering total interest paid and EMI. It also improves your loan-to-value ratio, potentially getting you better interest rates. Avoid 100% financing as it increases total cost significantly. Remember to account for registration, insurance, and accessories costs separately."
    },
    {
      question: "Should I take a longer or shorter car loan tenure?",
      answer: "Shorter tenure (3-5 years) means higher EMI but significantly lower total interest - a 5 lakh loan at 10% for 3 years costs 81,000 interest vs 2.3 lakh for 7 years. Longer tenure (5-7 years) reduces EMI making it more affordable but costs much more in interest. Consider your budget - if you can afford higher EMI without strain, go shorter. Avoid extending beyond 5 years as you may end up paying more in interest than the car's value. Also check if the lender allows prepayment without penalty."
    },
    {
      question: "Can I get a loan for a used car?",
      answer: "Yes, used car loans are available but come with higher interest rates (12-18%) and stricter eligibility. Most banks finance up to 70-80% of the car's current value based on valuation. The loan tenure is usually shorter (3-5 years). Key considerations include: vehicle age limit (usually under 10 years), thorough inspection to avoid lemons, and checking the vehicle's Cibil report for any existing loans. Interest rates are higher due to higher risk and depreciation. Some banks have tie-ups with certified dealers offering better rates."
    },
    {
      question: "What documents are required for a car loan?",
      answer: "Required documents typically include: identity proof (Aadhaar, passport, driving license), address proof (utility bills, bank statements), income proof (salary slips for salaried, IT returns for self-employed), bank statements (6-12 months), and vehicle-related documents (quotation, RC copy). Salaried individuals need Form 16, while self-employed need business registration proof and financial statements. Having all documents ready speeds up approval. Some banks offer instant approval with minimal documentation if you have a good credit score."
    }
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Car Loan Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate your car loan EMI, total interest, and monthly payments.</p>
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
            <div className="absolute top-0 right-0 p-4 opacity-10"><Car className="w-32 h-32" /></div>
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
                  <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${((v/100000).toFixed(1))}L`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${Number(v).toLocaleString()}`, 'Balance']} />
                  <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="Car Loan Calculator"
            description="The Car Loan Calculator helps you understand the complete cost of financing a vehicle. Whether you're buying a new car or a pre-owned vehicle, understanding your EMI obligations is crucial for making a sound financial decision. This calculator uses the standard amortization formula to show your exact monthly payment, total interest over the loan tenure, and the complete breakdown between principal and interest. Buying a car is often the second-largest financial decision after buying a home, and understanding the true cost helps you negotiate better deals and choose the right loan structure. The calculator also shows how your loan balance decreases over time, helping you plan for potential early repayment."
            features={[
              "Calculate exact monthly car loan EMI",
              "See complete breakdown of principal vs interest",
              "Visualize year-by-year loan balance reduction",
              "Compare different tenure and down payment options",
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
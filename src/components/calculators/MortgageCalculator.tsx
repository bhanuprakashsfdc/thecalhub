import { useState, useMemo } from 'react';
import { Home } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function MortgageCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const faqs = [
    {
      question: "What is a mortgage and how does it work?",
      answer: "A mortgage is a loan specifically used to purchase real estate, where the property itself serves as collateral. You borrow a large amount (typically 70-80% of property value) and repay it over 15-30 years with interest. If you default, the lender can foreclose and sell the property to recover their money. The interest rate can be fixed (same EMI throughout) or floating (changes with market rates). Monthly payments include both principal and interest in an amortization schedule where early payments are mostly interest and later payments are mostly principal."
    },
    {
      question: "How much down payment do I need for a mortgage?",
      answer: "In India, down payment typically ranges from 10-25% of property value. Most lenders finance 75-80% of the property value, requiring 20-25% as down payment. Minimum is usually 10-15% but paying more reduces your loan burden and EMI. A 20% down payment also helps avoid additional charges like mortgage insurance. Remember to budget for registration, stamp duty (5-8% of property value in most states), and other closing costs separately. First-time buyers may qualify for lower down payment schemes."
    },
    {
      question: "Should I choose fixed or floating interest rate for my mortgage?",
      answer: "Fixed rates (currently 7-8.5%) give predictable EMIs throughout but are 0.5-1% more expensive than floating rates. Floating rates (currently 6.5-8%) can go up or down based on repo rate changes. Choose fixed if you want budget certainty and can afford the higher rate - useful when rates are expected to rise. Choose floating when rates are stable or expected to fall - current rates are near historic lows. Many people start with floating and switch to fixed when rates rise. Consider your risk tolerance and budget flexibility."
    },
    {
      question: "What is the difference between home loan and mortgage loan?",
      answer: "In India, these terms are often used interchangeably - both refer to loans for purchasing property. However, 'home loan' specifically means loan to buy a house/flat, while 'mortgage loan' can also refer to loans against existing property (loan against property or LAP). For home loans, the property being purchased is the collateral. For LAP, you borrow against property you already own - the property is both collateral and the asset being financed. LAP rates are higher (8-10%) than home loans (6.5-8%) as they're unsecured in nature."
    },
    {
      question: "Can I prepay my mortgage early?",
      answer: "Yes, most banks allow prepayment after 6-12 months with no penalty for floating rate loans (per RBI guidelines). Fixed rate loans may charge 2-4% penalty for prepayment within 3-5 years. Extra payments directly reduce principal and can save significant interest. Even small additional payments monthly make a big difference over 30 years. Use our calculator to see how extra payments reduce your total interest. Consider if investing the extra money elsewhere gives better returns than the interest saved by prepaying."
    },
    {
      question: "What documents do I need for a mortgage?",
      answer: "Required documents include: property documents (title deed, chain documents, approved plan), identity proof (Aadhaar, passport), address proof, income documents (salary slips, IT returns for last 3 years, Form 16), bank statements (6-12 months), and Cibil score report. Self-employed need business registration, audited financial statements, and practice certificates. Additional documents may include power of attorney (if using one), no-objection certificate from builder (for under-construction property), and property insurance. Having documents ready speeds up approval."
    }
  ];

  const calculation = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
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
            <Home className="w-32 h-32" />
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
                  <Bar dataKey="balance" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <AboutSection 
            title="Mortgage Calculator"
            description="The Mortgage Calculator is a comprehensive tool for understanding your home loan commitments. A mortgage is typically the largest financial commitment in a person's life, and understanding the complete cost is crucial for making sound decisions. This calculator shows your exact monthly payment, total interest over the loan tenure, and how your loan balance decreases over time. The pie chart visualization helps you see how much of your total payment goes toward interest versus principal, which is often surprising for new buyers. The bar chart shows your loan balance reducing year by year, helping you plan for potential prepayments or refinancing decisions."
            features={[
              "Calculate exact monthly mortgage payment",
              "See complete breakdown of principal vs total interest",
              "Visualize year-by-year loan balance reduction",
              "Compare different tenure and down payment options",
              "Plan for early repayment and interest savings"
            ]}
            formula="EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default MortgageCalculator;

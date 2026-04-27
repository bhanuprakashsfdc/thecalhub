import { useState, useMemo } from 'react';
import { Sparkles, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export default function PPFCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [contribution, setContribution] = useState(100000);
  const [rate, setRate] = useState(7.1);
  const [time, setTime] = useState(15);

  const faqs = [
    {
      question: "What is PPF and why should I invest in it?",
      answer: "Public Provident Fund (PPF) is a government-backed long-term savings scheme launched in 1968. It's one of the safest investment options with sovereign guarantee, offering tax-free returns currently at 7.1% p.a. (variable, revised quarterly). Key benefits include EEE status (Exempt-Exempt-Exempt) - contributions qualify for tax deduction under 80C, interest is tax-free, and maturity proceeds are tax-exempt. The 15-year lock-in makes it ideal for long-term goals like retirement, children's education, or building a safety fund. It's particularly popular among risk-averse investors looking for stable, guaranteed returns."
    },
    {
      question: "What are the PPF contribution limits?",
      answer: "Minimum annual contribution is 500, maximum is 1.5 lakhs per financial year. You can make multiple contributions throughout the year, but exceeding 1.5 lakhs doesn't earn extra interest and may be rejected. The best strategy is to invest the maximum 1.5 lakhs annually at the start of each financial year to maximize compound growth. Contributions can be made in installments (minimum 100 per installment) or as a lump sum. You can open PPF at any bank or post office with just 500 to start, and set up automatic transfers for consistency."
    },
    {
      question: "Can I withdraw from my PPF before maturity?",
      answer: "Yes, but with restrictions. Partial withdrawal is allowed after completing 5 financial years from the year of account opening (not calendar year). You can withdraw up to 50% of the balance at the end of the 4th year or earlier, whichever is lower. However, making withdrawals reduces your final corpus due to reduced compounding. You can also take a loan against your PPF balance between years 3-6, borrowing up to 25% of previous year balance at concessional rates. Early closure is only allowed in specific cases like critical illness, higher education (abroad), or if the account holder is a minor (by guardian)."
    },
    {
      question: "What happens after 15 years? Can I extend PPF?",
      answer: "After the 15-year maturity, you have three options: 1) Close the account and withdraw the entire amount tax-free, 2) Extend for another 5 years (can be done multiple times) with or without fresh contributions, or 3) Extend in blocks of 5 years indefinitely. If you extend without contributions, you can only withdraw once per year. The best approach is to continue extending if you don't need the money, as the tax-free 7%+ returns beat most fixed income options. Even after extension, you can continue contributing up to 1.5 lakhs yearly and earning tax-free interest."
    },
    {
      question: "How does PPF compare to other tax-saving instruments?",
      answer: "PPF offers the unique EEE status - all stages (investment, interest, maturity) are tax-free. Compare with: ELSS (equity) - higher returns (12-15%) but with market risk and 3-year lock-in; NPS - better returns but partial tax on maturity; FDs - interest taxed as income; Sukanya Samriddhi - higher rate (8.2%) but only for girl child. PPF is ideal for risk-averse investors seeking guaranteed returns with full tax benefits. The 15-year lock-in is long but ensures disciplined saving. The current 7.1% rate beats most bank FDs post-tax, making it attractive despite the long tenure."
    },
    {
      question: "Can I transfer my PPF account to another bank or post office?",
      answer: "Yes, you can transfer your PPF account from one bank/post office to another. The transfer is free and doesn't affect your existing tenure or interest calculation. This is useful if your current institution offers better service or you're moving to a new city. You need to submit a transfer request with KYC documents at the new institution, which will coordinate with the old one. The transfer takes 2-4 weeks. You can also have multiple PPF accounts, but total annual contribution across all accounts cannot exceed 1.5 lakhs."
    }
  ];

  const calculation = useMemo(() => {
    const totalContributions = contribution * time;
    const maturity = contribution * ((Math.pow(1 + rate / 100, time) - 1) / (rate / 100)) * (1 + rate / 100);
    const interest = maturity - totalContributions;
    return { maturity, interest, totalContributions };
  }, [contribution, rate, time]);

  const pieData = [
    { name: 'Contributions', value: calculation.totalContributions, color: '#D6ED79' },
    { name: 'Interest', value: calculation.interest, color: '#BDC2FF' },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= time; i++) {
      const value = contribution * ((Math.pow(1 + rate / 100, i) - 1) / (rate / 100)) * (1 + rate / 100);
      data.push({ year: `Year ${i}`, value: Math.round(value) });
    }
    return data;
  }, [contribution, rate, time]);

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">PPF Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your Public Provident Fund (PPF) returns and maturity amount. Our free online PPF calculator helps you plan your long-term savings with tax-free returns.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Tax-Free Returns</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Secured</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">15 Year Lock-in</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Annual Contribution</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                  <input
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(Number(e.target.value))}
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
              <Building2 className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">PPF Maturity Value</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">{symbol}{calculation.maturity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total Contributions</label>
                <p className="text-2xl font-bold text-white mono">{symbol}{calculation.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
                <p className="text-2xl font-bold text-primary-fixed mono">{symbol}{calculation.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Contributions vs Interest</label>
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
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-fixed"></div><span className="text-xs text-neutral-400">Contributions</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-xs text-neutral-400">Interest</span></div>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">PPF Growth Over Time</label>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `${symbol}${((v/100000).toFixed(1))}L`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }} formatter={(v) => [`${symbol}${(v ?? 0).toLocaleString()}`, 'Value']} />
                    <Bar dataKey="value" fill="#D6ED79" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <AboutSection 
            title="PPF Calculator"
            description="The PPF (Public Provident Fund) Calculator helps you estimate the maturity value of your PPF investments. PPF is one of India's most popular long-term savings schemes, backed by the Government of India with sovereign guarantee. It offers an attractive interest rate (currently 7.1% p.a.) that is fully tax-free, making it an excellent choice for risk-averse investors seeking stable returns with complete tax benefits. This calculator allows you to input your annual contribution, expected interest rate, and investment tenure to see exactly how your PPF balance will grow over time. The power of compound interest combined with tax-free returns makes PPF an exceptional investment vehicle for long-term financial goals like retirement, children's education, or building a substantial emergency fund."
            features={[
              "Calculate PPF maturity value with compound growth",
              "See breakdown between contributions and interest earned",
              "Visualize year-by-year PPF balance growth",
              "Plan annual contribution strategy for maximum returns",
              "Understand tax-free benefits and lock-in periods"
            ]}
            formula="FV = P × [(1+r)^n - 1] / r × (1+r)"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}
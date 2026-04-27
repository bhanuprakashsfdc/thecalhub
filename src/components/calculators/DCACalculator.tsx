import { useState, useMemo } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function DCACalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [years, setYears] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(10);

  const faqs = [
    {
      question: "What is Dollar Cost Averaging (DCA)?",
      answer: "Dollar Cost Averaging is an investment strategy where you invest a fixed amount regularly (monthly) regardless of market conditions, rather than investing a lump sum all at once. This approach reduces the impact of market volatility by buying more units when prices are low and fewer when prices are high, effectively averaging out your cost per unit. DCA is particularly beneficial for retail investors who don't have large lump sums to invest at once. It removes the need to time the market and instills a disciplined savings habit. Research shows DCA often outperforms lump sum investing in volatile markets."
    },
    {
      question: "When should I use DCA vs lump sum investing?",
      answer: "Use DCA when: you receive income gradually (salary), markets are volatile or at all-time highs, you lack confidence in timing the market, or want to reduce emotional decision-making. Use lump sum when: you have a large windfall (inheritance, sale of property), markets are clearly undervalued, or can tolerate short-term volatility. Historically, lump sum often beats DCA in rising markets because more money starts working sooner. However, DCA provides psychological comfort and reduces timing risk. Many experts suggest using lump sum for 50-70% and DCA for the remainder over 6-12 months."
    },
    {
      question: "How does DCA work in a falling market?",
      answer: "In a falling market, DCA actually works in your favour - you accumulate more units at lower prices. For example, if you invest 500 monthly and the unit price drops from 100 to 50, you buy 5 units at 100 and 10 units at 50, averaging 7.5 units at average cost of 66.67 instead of 100. When markets recover, your gains are amplified because you own more units purchased at lower prices. This is the core benefit of DCA - it turns market volatility into advantage. Many successful investors increase their DCA during market downturns to maximize this benefit."
    },
    {
      question: "What is the best frequency for DCA?",
      answer: "Monthly is the most common and practical DCA frequency as it aligns with salary schedules. However, research shows weekly or daily DCA provides marginally better returns in volatile markets due to more frequent buying at varying prices. The difference between monthly and weekly DCA is usually less than 0.5% annually - minimal for most investors. More important than frequency is consistency - investing regularly is more important than optimizing frequency. Choose a frequency that matches your cash flow and doesn't cause administrative burden. Set up automatic transfers for discipline."
    },
    {
      question: "Can I combine DCA with SIP?",
      answer: "Yes, DCA and SIP are essentially the same concept in different contexts. SIP (Systematic Investment Plan) is the term commonly used for mutual fund investments, while DCA is the broader term used globally for any regular investment approach. You can use both terms interchangeably in India. The key is consistency - whether you call it SIP or DCA, regular investing compounds over time. Many investors use both - SIP for mutual funds and direct stock purchases for individual stocks. The combination builds a diversified portfolio with both active (stocks) and passive (mutual funds) exposure."
    },
    {
      question: "How long should I continue DCA?",
      answer: "DCA is a long-term strategy - continue as long as you have investable surplus and believe in the market's long-term growth potential. There's no mandatory duration, but 5-10 years minimum is ideal to see significant compounding benefits. You can pause or stop DCA when: you reach your financial goal, no longer have surplus income, or find better investment opportunities. Many continue DCA throughout their working life for retirement planning. The key is to stay invested - stopping early, especially during downturns, defeats the purpose. Review and rebalance your portfolio annually."
    }
  ];

  const calculation = useMemo(() => {
    const months = years * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    const initialValue = initialInvestment * Math.pow(1 + monthlyRate, months);
    
    const futureValueAnnuity = monthlyInvestment * 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const totalInvested = initialInvestment + (monthlyInvestment * months);
    const totalValue = initialValue + futureValueAnnuity;
    const totalReturn = totalValue - totalInvested;
    const returnPercent = (totalReturn / totalInvested) * 100;
    
    const pieData = [
      { name: 'Invested', value: totalInvested, color: '#D6ED79' },
      { name: 'Returns', value: totalReturn, color: '#BDC2FF' },
    ];
    
    return {
      totalValue: totalValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalReturn: totalReturn.toFixed(2),
      returnPercent: returnPercent.toFixed(2),
      monthlyReturn: (totalReturn / months).toFixed(2),
      pieData,
    };
  }, [initialInvestment, monthlyInvestment, years, expectedReturn]);

  const yearlyBreakdown = useMemo(() => {
    const breakdown = [];
    const monthlyRate = expectedReturn / 12 / 100;
    
    for (let year = 1; year <= years; year++) {
      const months = year * 12;
      const initialValue = initialInvestment * Math.pow(1 + monthlyRate, months);
      const futureValueAnnuity = monthlyInvestment * 
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const totalValue = initialValue + futureValueAnnuity;
      const totalInvested = initialInvestment + (monthlyInvestment * months);
      
      breakdown.push({
        year,
        value: totalValue.toFixed(0),
        invested: totalInvested.toFixed(0),
        gain: (totalValue - totalInvested).toFixed(0),
      });
    }
    return breakdown;
  }, [initialInvestment, monthlyInvestment, years, expectedReturn]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Initial Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Monthly Investment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Time Period (Years)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
              <div className="grid grid-cols-5 gap-2 mt-2">
                {[1, 3, 5, 10, 20].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYears(y)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      years === y
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {y}Y
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Expected Annual Return</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">DCA Results</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-neutral-400 text-sm">Total Value</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{Number(calculation.totalValue).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Invested</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.totalInvested).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Total Return</p>
              <p className="text-2xl font-bold text-green-400 mono">+{symbol}{Number(calculation.totalReturn).toLocaleString()}</p>
              <p className="text-neutral-500 text-sm">({calculation.returnPercent}%)</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Invested vs Returns</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                    {calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Returns</span>
                <span className="text-xl font-black text-white mono">{calculation.returnPercent}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Invested</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Returns</span></div>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-4">Yearly Breakdown</p>
            <div className="space-y-3">
              {yearlyBreakdown.map((item) => (
                <div key={item.year} className="flex items-center gap-4">
                  <span className="text-neutral-400 text-sm w-8">Y{item.year}</span>
                  <div className="flex-1 bg-neutral-800 rounded-full h-4 relative">
                    <div 
                      className="bg-primary-fixed h-4 rounded-full"
                      style={{ width: `${(Number(item.value) / Number(calculation.totalValue)) * 100}%` }}
                    />
                  </div>
                  <span className="text-white text-sm mono w-24 text-right">{symbol}{Number(item.value).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <AboutSection 
            title="Dollar Cost Averaging (DCA) Calculator"
            description="The Dollar Cost Averaging (DCA) Calculator helps you understand how regular investing can build wealth over time. DCA is an investment strategy where you invest a fixed amount at regular intervals regardless of market conditions, rather than trying to time the market with lump sum investments. This approach leverages market volatility to your advantage by buying more units when prices are low and fewer when prices are high. The result is a lower average cost per unit over time. This calculator shows how your wealth grows when you combine an initial investment with regular monthly contributions, demonstrating the powerful effect of consistent investing combined with compound growth."
            features={[
              "Calculate returns from regular monthly investments",
              "Compare total invested vs total returns over time",
              "Visualize year-by-year portfolio growth",
              "Understand the benefit of consistent investing",
              "Plan long-term wealth building with DCA strategy"
            ]}
            formula="FV = PV(1+r)^n + PMT × [((1+r)^n - 1) / r]"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default DCACalculator;
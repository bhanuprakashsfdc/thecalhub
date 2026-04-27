import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function PnLCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [exitPrice, setExitPrice] = useState(110);
  const [quantity, setQuantity] = useState(100);
  const [isLong, setIsLong] = useState(true);
  const [fees, setFees] = useState(0);

  const faqs = [
    { question: "How is profit and loss calculated in trading?", answer: "PnL = (Exit Price - Entry Price) × Quantity for long positions. For short positions, PnL = (Entry Price - Exit Price) × Quantity. Net PnL = Gross PnL - Trading Fees. Positive result is profit, negative is loss. Percentage return = (PnL / Initial Investment) × 100. This is the fundamental calculation that determines trading success." },
    { question: "What is the difference between realized and unrealized PnL?", answer: "Unrealized PnL is profit/loss on open positions - not yet locked in, can change until position is closed. Realized PnL is locked in when you close the position - this is your actual profit or loss. Open positions show unrealized PnL, closed positions show realized PnL. Day traders focus on realized PnL while position traders track unrealized. Both are important for different purposes." },
    { question: "How do fees affect my trading profitability?", answer: "Fees (commission, spread, brokerage) reduce net profits. If you make 1000 profit but pay 50 in fees, net profit is 950. High-frequency traders are most affected by fees - even 0.1% per trade adds up significantly over hundreds of trades. Always factor fees into your PnL calculations. With small profit targets, fees can consume most returns - use this calculator to see true profitability." },
    { question: "What is a good win rate for profitable trading?", answer: "Win rate alone doesn't determine profitability - you need positive expectancy. With 1:2 risk/reward, you only need 34% win rate to break even. With 1:1 ratio, you need 50%. Many profitable traders have 40-50% win rates if their winners are bigger than losers. Focus on expectancy = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). This must be positive regardless of win rate." },
    { question: "Should I track percentage or absolute PnL?", answer: "Percentage PnL is more useful for comparing performance across different position sizes and account balances. 10% return on 10,000 and 10% return on 100,000 are both 10% - comparable. Absolute PnL varies by position size. Track both: absolute for tax/record-keeping, percentage for performance evaluation. Use percentage to compare with benchmarks and track compounding growth." },
    { question: "How do I calculate breakeven price including fees?", answer: "Breakeven = Entry Price + (Total Fees / Quantity) for long positions. For short, breakeven = Entry Price - (Total Fees / Quantity). Example: Buy 100 shares at 100, pay 50 total fees. Breakeven = 100 + (50/100) = 100.50. Price must exceed 100.50 to profit after fees." }
  ];

  const calculation = useMemo(() => {
    const direction = isLong ? 1 : -1;
    const priceDiff = (exitPrice - entryPrice) * direction;
    const grossPnL = priceDiff * quantity;
    const netPnL = grossPnL - fees;
    const pnlPercent = entryPrice > 0 ? (priceDiff / entryPrice) * 100 : 0;
    const pieData = [
      { name: 'Exit Value', value: exitPrice * quantity, color: '#D6ED79' },
      { name: 'Entry Value', value: entryPrice * quantity, color: '#BDC2FF' },
    ];
    return { grossPnL: grossPnL.toFixed(2), netPnL: netPnL.toFixed(2), pnlPercent: pnlPercent.toFixed(2), isProfit: grossPnL >= 0, pieData };
  }, [entryPrice, exitPrice, quantity, isLong, fees]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Position Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsLong(true)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    isLong
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Long
                </button>
                <button
                  onClick={() => setIsLong(false)}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    !isLong
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Short
                </button>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Entry Price</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Exit Price</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.01"
                value={exitPrice}
                onChange={(e) => setExitPrice(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Quantity</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Trading Fees</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={fees}
                  onChange={(e) => setFees(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">P&L Results</span>
          </div>

          <div className={`p-6 rounded-xl mb-6 ${calculation.isProfit ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
            <div className="flex items-center gap-3">
              {calculation.isProfit ? (
                <TrendingUp className="w-8 h-8 text-green-400" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-400" />
              )}
              <div>
                <p className="text-neutral-400 text-sm">Net P&L</p>
                <p className={`text-3xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                  {calculation.isProfit ? '+' : '-'}{symbol}{Math.abs(Number(calculation.netPnL)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Gross P&L</p>
              <p className={`text-2xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? '+' : '-'}{symbol}{Math.abs(Number(calculation.grossPnL)).toLocaleString()}
              </p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">P&L %</p>
              <p className={`text-2xl font-bold mono ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? '+' : '-'}{calculation.pnlPercent}%
              </p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Return on Investment</p>
              <p className={`text-lg font-bold ${calculation.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                {calculation.isProfit ? 'Profit' : 'Loss'}
              </p>
            </div>
<div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all ${Number(calculation.pnlPercent) >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(Math.abs(Number(calculation.pnlPercent)), 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Value Comparison</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">{calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Return</span>
                <span className="text-xl font-black text-white mono">{Math.abs(Number(calculation.pnlPercent)).toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Exit</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Entry</span></div>
            </div>
          </div>

          <AboutSection title="Profit & Loss (PnL) Calculator" description="The PnL Calculator is essential for traders to calculate their profit or loss from any trade. It shows both gross PnL (before fees) and net PnL (after fees), along with the percentage return on investment. Understanding your exact PnL helps you evaluate trade performance, plan your trading strategy, and determine if you're actually profitable after accounting for all costs. This calculator supports both long and short positions, making it versatile for any market direction." features={["Calculate exact profit or loss for any trade", "See both gross and net PnL after fees", "Understand percentage return on investment", "Compare long vs short position outcomes", "Make data-driven trading decisions"]} formula="PnL = (Exit Price - Entry Price) × Quantity" />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default PnLCalculator;
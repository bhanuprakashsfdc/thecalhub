import { useState, useMemo } from 'react';
import { Percent, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function KellyCriterionCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [winRate, setWinRate] = useState(50);
  const [winLossRatio, setWinLossRatio] = useState(2);
  const [accountSize, setAccountSize] = useState(10000);
  const [fractionType, setFractionType] = useState('full');

  const faqs = [
    { question: "What is the Kelly Criterion?", answer: "The Kelly Criterion is a mathematical formula that determines the optimal fraction of your bankroll to risk on each trade to maximize long-term growth. Developed by John L. Kelly in 1956, it's based on probability theory and calculates position size as: K% = W - (1-W)/R, where W is win probability and R is win/loss ratio. It maximizes exponential growth but can be too aggressive for most traders, which is why many use Half-Kelly (half the recommended size) for more manageable volatility." },
    { question: "Why should I use Half-Kelly instead of Full Kelly?", answer: "Full Kelly is extremely aggressive - a 25% Kelly bet means 25% of your bankroll on one trade. If you lose, you lose 25% of your account. This creates huge volatility and emotional stress. Half-Kelly gives similar growth with half the variance - you still capture about 75% of the growth potential with only 50% of the volatility. Many professional traders use Quarter-Kelly for even more stability. The key insight is that you don't need Full Kelly to benefit from the formula." },
    { question: "How do I determine my win rate and win/loss ratio?", answer: "Win rate = winning trades / total trades. Track your last 100+ trades to get accurate data. Win/loss ratio = average win amount / average loss amount. Example: average win is 500, average loss is 300, ratio = 1.67. These should come from actual trading data, not estimates. Many traders overestimate their win rate - be honest. If you don't have 100+ trades tracked, use conservative estimates or paper trade until you have reliable statistics." },
    { question: "What if my Kelly percentage is negative?", answer: "Negative Kelly means your trading strategy has negative expected value - you're expected to lose money over time. Before sizing with Kelly, you must have a profitable strategy. A negative Kelly indicates either your win rate is too low, your win/loss ratio is too small, or both. Instead of sizing up, focus on improving your strategy. No position sizing method can make a losing strategy profitable. Use this as a signal to review and improve your trading approach." },
    { question: "Can Kelly be used for long-term investing?", answer: "Yes, the same principles apply to longer-term allocation. Instead of per-trade position size, use Kelly to determine what percentage of your portfolio should be in an asset based on your conviction and edge. For example, if analysis shows 60% probability of outperformance with 2:1 reward/risk, Kelly tells you how much to allocate. However, for long-term investing, consider using quarter or tenth Kelly due to less frequent rebalancing and the difficulty of estimating probabilities in markets." },
    { question: "What are the limitations of the Kelly Criterion?", answer: "Kelly assumes you can precisely estimate win rate and ratio, which is often impossible in trading. It assumes infinite series of identical bets, which doesn't match real trading. Kelly is most effective for systems with high win rates (60%+) - for lower win rates, the position sizes become very aggressive. It doesn't account for correlation between trades or changing market conditions. Many traders use Kelly as a guide rather than exact prescription, combining it with proper risk management and position sizing rules." }
  ];

  const calculation = useMemo(() => {
    const p = winRate / 100;
    const q = 1 - p;
    const b = winLossRatio;
    
    const kellyPercent = (p * b - q) / b;
    const halfKelly = kellyPercent / 2;
    const quarterKelly = kellyPercent / 4;
    
    let recommendedFraction = kellyPercent;
    if (fractionType === 'half') recommendedFraction = halfKelly;
    if (fractionType === 'quarter') recommendedFraction = quarterKelly;
    
    const positionSize = accountSize * recommendedFraction;
    const maxPositionSize = accountSize * kellyPercent;
    
    let recommendation = '';
    if (kellyPercent <= 0) recommendation = 'No trade - Negative Expected Value';
    else if (kellyPercent > 0.25) recommendation = 'Consider Half-Kelly for stability';
    else recommendation = 'Full Kelly is reasonable';
    
    const pieData = kellyPercent > 0 ? [
      { name: 'Position Size', value: recommendedFraction * 100, color: '#D6ED79' },
      { name: 'Remaining', value: (1 - recommendedFraction) * 100, color: '#BDC2FF' },
    ] : [];
    
    return { kellyPercent: (kellyPercent * 100).toFixed(2), halfKelly: (halfKelly * 100).toFixed(2), quarterKelly: (quarterKelly * 100).toFixed(2), positionSize: positionSize.toFixed(2), maxPositionSize: maxPositionSize.toFixed(2), recommendation, isPositive: kellyPercent > 0, pieData };
  }, [winRate, winLossRatio, accountSize, fractionType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Win Rate (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={winRate}
                  onChange={(e) => setWinRate(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {[25, 50, 75, 100].map((r) => (
                  <button
                    key={r}
                    onClick={() => setWinRate(r)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      winRate === r
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Win/Loss Ratio</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={winLossRatio}
                  onChange={(e) => setWinLossRatio(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Account Size</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={accountSize}
                  onChange={(e) => setAccountSize(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Kelly Fraction</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Full', value: 'full' },
                  { label: 'Half', value: 'half' },
                  { label: 'Quarter', value: 'quarter' },
                ].map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFractionType(f.value)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      fractionType === f.value
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Percent className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Kelly Criterion</span>
          </div>

          {!calculation.isPositive && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">System has negative expected value</span>
            </div>
          )}

          <div className="bg-surface-container-highest p-6 rounded-xl mb-6">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Recommended Position Size</p>
            <p className="text-3xl font-bold text-white mono">{symbol}{Number(calculation.positionSize).toLocaleString()}</p>
            <p className="text-neutral-400 text-sm mt-2">{calculation.recommendation}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-primary-fixed/10 p-4 rounded-xl text-center">
              <p className="text-primary-fixed text-xs uppercase tracking-wider mb-2">Full Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.kellyPercent}%</p>
            </div>
            <div className="bg-surface-container-highest p-4 rounded-xl text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Half Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.halfKelly}%</p>
            </div>
            <div className="bg-surface-container-highest p-4 rounded-xl text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Quarter Kelly</p>
              <p className="text-xl font-bold text-white mono">{calculation.quarterKelly}%</p>
            </div>
          </div>

          <div className="bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Expected Value</p>
            <p className={`text-xl font-bold mono ${calculation.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {calculation.isPositive ? 'Positive' : 'Negative'}
            </p>
          </div>

          {calculation.pieData.length > 0 && (
          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Position Size Allocation</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">{calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Size</span>
                <span className="text-xl font-black text-white mono">{Number(calculation.kellyPercent).toFixed(1)}%</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Position</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Reserved</span></div>
            </div>
          </div>
          )}

          <AboutSection title="Kelly Criterion Calculator" description="The Kelly Criterion Calculator helps traders and investors determine the optimal position size for each trade based on their edge and win rate. Developed by John L. Kelly in 1956, this mathematical formula maximizes long-term capital growth by calculating exactly what percentage of your bankroll should be risked. The calculator shows Full Kelly (maximum growth), Half Kelly (reduced volatility), and Quarter Kelly (ultra-conservative) options. Understanding Kelly helps you avoid the common mistake of over-sizing positions, which is the primary cause of trading account blow-ups." features={["Calculate optimal position size using Kelly formula", "Compare Full, Half, and Quarter Kelly strategies", "Understand expected value of your trading system", "Visualize position allocation as percentage of account", "Make data-driven position sizing decisions"]} formula="K% = W - (1-W)/R" />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default KellyCriterionCalculator;
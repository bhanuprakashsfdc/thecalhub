import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function RiskRewardCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(90);
  const [takeProfit, setTakeProfit] = useState(120);
  const [positionType, setPositionType] = useState('long');

  const calculation = useMemo(() => {
    const risk = Math.abs(entryPrice - stopLoss);
    const reward = Math.abs(takeProfit - entryPrice);
    const ratio = risk > 0 ? reward / risk : 0;
    const riskPercent = (risk / entryPrice) * 100;
    const rewardPercent = (reward / entryPrice) * 100;
    const pieData = [
      { name: 'Risk', value: risk, color: '#FF6B6B' },
      { name: 'Reward', value: reward, color: '#4ADE80' },
    ];
    return { risk: risk.toFixed(2), reward: reward.toFixed(2), ratio: ratio.toFixed(2), riskPercent: riskPercent.toFixed(2), rewardPercent: rewardPercent.toFixed(2), isValid: risk > 0 && reward > 0, pieData };
  }, [entryPrice, stopLoss, takeProfit]);

  const faqs = [
    { question: "What is risk/reward ratio in trading?", answer: "Risk/reward ratio compares the potential profit to potential loss in a trade. A 1:2 ratio means you risk 1 unit to potentially gain 2 units - for every 100 you could lose, you could gain 200. Professional traders generally only take trades with at least 1:2 ratio because it allows profitability even with only 40% wins. The formula: Risk = Entry - Stop Loss, Reward = Take Profit - Entry, Ratio = Reward / Risk." },
    { question: "What is a good risk/reward ratio?", answer: "A ratio of 1:2 or higher is considered good. With 1:2, you only need 34% win rate to break even, and 50% wins become very profitable. Many professionals target 1:3-1:4 for high-conviction trades. However, the ideal ratio depends on your win rate - 70% win rate can be profitable with 1:1, while 30% win rate needs 1:3 or higher. Consistency is key." },
    { question: "How do I calculate position size using risk/reward?", answer: "First determine your risk amount (e.g., 1% of account = 1000). Then calculate stop distance = Entry - Stop Loss. Position size = Risk Amount / Stop Distance. Example: Account 1 lakh, risk 1% = 1000, entry 100, stop 90, stop distance = 10. Position size = 1000/10 = 100 shares. This ensures your loss is always controlled regardless of trade." },
    { question: "Why do many traders fail despite good risk/reward ratios?", answer: "Main reasons: not following trading plan consistently, moving stop losses which defeats the purpose, taking trades with poor ratios, overtrading which increases costs, and not accounting for spread/slippage. Many traders have good ratios on paper but close winners early and let losers run, destroying actual ratio. Track actual executed ratios, not planned ones." },
    { question: "Should I always use the same risk/reward ratio?", answer: "While consistency is important, flexible ratios based on market conditions can improve results. In strong trending markets, aim for 1:3-1:5 as trends often exceed expectations. In ranging markets, 1:1.5-1:2 works better. Adjust based on analysis confidence - high-conviction setups deserve higher ratios. But never go below 1:1 - that's a guaranteed loss over time." },
    { question: "How does risk/reward relate to win rate?", answer: "Required Win Rate = 1 / (1 + Risk/Reward). For 1:1 ratio, you need 50% win rate. For 1:2 ratio, you need only 33%. For 1:3 ratio, you need 25%. This shows why high win rate isn't everything - a 70% win rate with 1:0.5 ratio loses money, while 30% win rate with 1:3 ratio is profitable." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Position Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPositionType('long')} className={`py-3 rounded-lg text-sm font-medium transition-colors ${positionType === 'long' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'bg-surface-container-highest hover:bg-neutral-700 text-neutral-300'}`}>Long</button>
                <button onClick={() => setPositionType('short')} className={`py-3 rounded-lg text-sm font-medium transition-colors ${positionType === 'short' ? 'bg-primary-fixed text-on-primary-fixed font-bold' : 'bg-surface-container-highest hover:bg-neutral-700 text-neutral-300'}`}>Short</button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Entry Price</label>
              <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" type="number" step="0.01" value={entryPrice} onChange={(e) => setEntryPrice(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Stop Loss</label>
              <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" type="number" step="0.01" value={stopLoss} onChange={(e) => setStopLoss(Number(e.target.value))} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Take Profit</label>
              <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed text-xl outline-none" type="number" step="0.01" value={takeProfit} onChange={(e) => setTakeProfit(Number(e.target.value))} />
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Risk vs Reward</label>
          <div className="relative w-40 h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">{calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Ratio</span>
              <span className="text-xl font-black text-white mono">1:{Number(calculation.ratio).toFixed(1)}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div><span className="text-xs text-neutral-400">Risk</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4ADE80]"></div><span className="text-xs text-neutral-400">Reward</span></div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6"><TrendingUp className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.2em] font-bold">Risk / Reward</span></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-400" /><p className="text-red-400 text-xs uppercase tracking-wider">Risk</p></div>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.risk}</p>
              <p className="text-neutral-500 text-sm">({calculation.riskPercent}%)</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-green-400" /><p className="text-green-400 text-xs uppercase tracking-wider">Reward</p></div>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.reward}</p>
              <p className="text-neutral-500 text-sm">({calculation.rewardPercent}%)</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Ratio</p>
              <p className="text-2xl font-bold text-white mono">1:{calculation.ratio}</p>
            </div>
          </div>
          <div className="mt-6 p-6 bg-surface-container-highest rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk/Reward Assessment</p>
            <p className={`text-lg font-bold ${Number(calculation.ratio) >= 2 ? 'text-green-400' : Number(calculation.ratio) >= 1 ? 'text-yellow-400' : 'text-red-400'}`}>{Number(calculation.ratio) >= 2 ? 'Excellent (1:2+)' : Number(calculation.ratio) >= 1 ? 'Good (1:1)' : 'Poor (< 1:1)'}</p>
            <p className="text-neutral-400 text-sm mt-2">{Number(calculation.ratio) >= 2 ? 'Great risk/reward ratio for consistent profitability.' : Number(calculation.ratio) >= 1 ? 'Acceptable ratio for day trading.' : 'Consider wider stop loss for better risk/reward.'}</p>
          </div>
        </div>
        <AboutSection title="Risk/Reward Ratio Calculator" description="The Risk/Reward Calculator is essential for any trader looking to achieve consistent profitability. This tool calculates the ratio between potential profit and potential loss in any trade, helping you determine if a trade is worth taking based on your trading strategy. Understanding risk/reward is fundamental to trading success - it allows you to be profitable even with a low win rate, as long as your winners are bigger than your losers. The calculator shows your risk and reward in both absolute terms and percentages, along with an assessment of whether your ratio meets profitable trading standards." features={["Calculate exact risk/reward ratio for any trade", "See risk and reward in both price and percentage terms", "Visualize risk vs reward with pie chart", "Get assessment of trade quality based on ratio", "Plan position sizing with risk amount in mind"]} formula="R:R = (Take Profit - Entry) / (Entry - Stop Loss)" />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
export default RiskRewardCalculator;
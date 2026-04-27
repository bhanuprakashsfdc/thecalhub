import { useState, useMemo } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function PositionSizeCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(95);
  const [leverage, setLeverage] = useState(1);

  const faqs = [
    { question: "How do I calculate position size in trading?", answer: "Position size = Risk Amount / (Entry Price - Stop Loss). Example: 10000 account, 2% risk = 200 risk amount. Entry 100, Stop 95, risk per share = 5. Position size = 200/5 = 40 shares. This ensures your loss never exceeds your risk amount regardless of position size. The formula can be expressed as: Position Size = (Account Size × Risk %) / Stop Distance." },
    { question: "What is the ideal risk per trade?", answer: "Most professional traders risk 1-2% of account per trade. 2% is the maximum recommended for most strategies - it allows for 50 consecutive losses before losing your account. Beginners should start with 1% or less. Some traders use variable risk: 0.5-1% for normal setups, 2% for high-conviction setups. Never risk more than 3% regardless of confidence - over-leveraged positions lead to blow-ups. The key is consistency over perfection." },
    { question: "Should I adjust position size for leverage?", answer: "No - your risk calculation should remain constant regardless of leverage. If you want to risk 200 on a trade, calculate position size based on that risk, then determine total position value. With 10x leverage, you need only 1/10th of the position value as margin. However, high leverage means your stop loss distance becomes smaller in percentage terms, making liquidation more likely. Many traders use leverage to reduce capital requirements while keeping position size constant." },
    { question: "What is the relationship between stop loss and position size?", answer: "They are inversely related - wider stop loss means smaller position size, tighter stop loss means larger position size for the same risk amount. Example: Risk 200, Entry 100, Stop 90 (10 point stop) = 20 shares. Same risk, Stop 95 (5 point stop) = 40 shares. The key insight is that you should first determine your stop loss based on technical analysis, then calculate position size to fit your risk amount. Never adjust stop loss just to increase position size." },
    { question: "How do I calculate lot size in forex?", answer: "In forex, position size is calculated in lots. Standard lot = 100,000 units. Formula: Position Size = Risk Amount / (Stop Loss in pips × Pip Value). For EUR/USD, 1 pip = 10 for standard lot. Example: Account 10000, risk 2% = 200, stop loss 50 pips, pip value = 10, position size = 200/(50×10) = 0.4 lots or 40,000 units. Use a forex position calculator for precision as pip values vary by currency pair." },
    { question: "Why is proper position sizing important?", answer: "Position sizing is the #1 factor in long-term trading success. Even with a profitable strategy, over-sizing leads to blow-ups, while under-sizing limits growth. Proper position sizing: prevents emotional trading (no need to worry about any single trade), allows recovery from losing streaks (you need many losses to significantly damage account), and achieves compounding growth. The math is simple - preserving capital enables exponential growth over time." }
  ];

  const calculation = useMemo(() => {
    const riskAmount = accountSize * (riskPercent / 100);
    const priceRisk = Math.abs(entryPrice - stopLoss);
    const positionSize = priceRisk > 0 ? riskAmount / priceRisk : 0;
    const positionValue = positionSize * entryPrice;
    const requiredMargin = positionValue / leverage;
    const actualRiskPercent = ((positionSize * priceRisk) / accountSize) * 100;
    const pieData = [
      { name: 'Position Value', value: positionValue, color: '#D6ED79' },
      { name: 'Required Margin', value: requiredMargin, color: '#BDC2FF' },
    ];
    return { positionSize: positionSize.toFixed(4), positionValue: positionValue.toFixed(2), requiredMargin: requiredMargin.toFixed(2), riskAmount: riskAmount.toFixed(2), actualRiskPercent: actualRiskPercent.toFixed(2), isValid: priceRisk > 0, pieData };
  }, [accountSize, riskPercent, entryPrice, stopLoss, leverage]);

  const units = [100, 1000, 10000, 100000];
  const [unitSize, setUnitSize] = useState(100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
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
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Risk (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">%</span>
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Unit Size</label>
              <div className="grid grid-cols-4 gap-2">
                {units.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnitSize(u)}
                    className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                      unitSize === u
                        ? "bg-primary-fixed text-on-primary-fixed font-bold"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {u >= 1000 ? `${u/1000}K` : u}
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Entry Price</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.01"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Stop Loss</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.01"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Leverage</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono">x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Results</span>
          </div>

          {!calculation.isValid && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">Entry price and stop loss cannot be the same</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Position Size</p>
              <p className="text-2xl font-bold text-white mono">{calculation.positionSize}</p>
              <p className="text-neutral-500 text-sm">units</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Position Value</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.positionValue).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Required Margin</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.requiredMargin).toLocaleString()}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Risk Amount</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{Number(calculation.riskAmount).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <div className="flex justify-between items-center">
              <p className="text-neutral-500 text-xs uppercase tracking-wider">Actual Risk</p>
              <p className="text-lg font-bold text-white mono">{calculation.actualRiskPercent}%</p>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className="bg-primary-fixed h-2 rounded-full transition-all" 
                style={{ width: `${Math.min(Number(calculation.actualRiskPercent), 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Position Breakdown</label>
            <div className="relative w-40 h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={calculation.pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">{calculation.pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie></PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Leverage</span>
                <span className="text-xl font-black text-white mono">{leverage}x</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Value</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#BDC2FF]"></div><span className="text-xs text-neutral-400">Margin</span></div>
            </div>
          </div>

          <AboutSection title="Position Size Calculator" description="The Position Size Calculator is critical for risk management in trading. It calculates how many units or shares to buy based on your account size, risk tolerance, and stop loss placement. This is the most important calculation for long-term trading success - proper position sizing prevents blow-ups while allowing compounding growth. The calculator shows you exactly how much to risk per trade to stay within your risk parameters, regardless of which asset you're trading." features={["Calculate exact position size based on risk parameters", "Determine required margin for leveraged trades", "Understand actual risk percentage vs planned", "Visualize position value relative to account", "Make consistent risk-adjusted trading decisions"]} formula="Position Size = (Account × Risk%) / (Entry - Stop)" />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default PositionSizeCalculator;
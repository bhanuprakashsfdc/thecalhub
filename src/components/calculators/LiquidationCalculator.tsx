import { useState, useMemo } from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

export function LiquidationCalculator() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [entryPrice, setEntryPrice] = useState(100);
  const [leverage, setLeverage] = useState(10);
  const [isLong, setIsLong] = useState(true);
  const [maintenanceMargin, setMaintenanceMargin] = useState(0.5);

  const faqs = [
    {
      question: "What is liquidation in trading?",
      answer: "Liquidation occurs when a trader's position is automatically closed by the exchange or broker because the position has lost too much money and can no longer meet margin requirements. When you trade with leverage, you borrow money from the broker to increase your position size. If the trade goes against you and your account equity falls below the maintenance margin requirement, the broker forcibly closes your position to prevent further losses. This is called liquidation or margin call. The trader loses the entire margin initially put up, and sometimes more depending on the shortfall."
    },
    {
      question: "How is liquidation price calculated?",
      answer: "For long positions: Liquidation Price = Entry Price × (1 - (1/Leverage) + Maintenance Margin). For short positions: Liquidation Price = Entry Price × (1 + (1/Leverage) - Maintenance Margin). The key is that leverage determines your required initial margin - at 10x leverage, you need 10% margin. The distance to liquidation shrinks as leverage increases. At 100x leverage, the price only needs to move 1% against you to get liquidated. This is why extremely high leverage is extremely dangerous - small price movements trigger liquidation."
    },
    {
      question: "What is maintenance margin?",
      answer: "Maintenance margin is the minimum account equity you must maintain to keep your position open after opening it. It's typically 50-100% of the initial margin requirement. In crypto, maintenance margin is often 0.5-1% of the position value. If your position loses money and account equity falls below the maintenance margin, you receive a margin call and position is liquidated. Different exchanges have different maintenance margin requirements - some have tiered systems where larger positions have higher maintenance requirements. Always check your exchange's maintenance margin before trading with leverage."
    },
    {
      question: "Why is high leverage dangerous?",
      answer: "Higher leverage means smaller price movements trigger liquidation. At 10x leverage, a 10% adverse move liquidates you; at 100x leverage, only 1% move liquidates you. Markets often swing 1-5% daily, so 100x leverage is extremely risky. Additionally, high leverage accelerates losses - at 100x, a 1% loss equals 100% loss of your margin. Many traders blow up accounts within days using high leverage. The table shows how quickly liquidation approaches with higher leverage. Consider using 2-5x maximum for most trades, with stops placed before liquidation levels."
    },
    {
      question: "How can I avoid liquidation?",
      answer: "Use lower leverage (2-5x is safer), place stop-loss orders below liquidation price, maintain extra buffer in your account beyond required margin, monitor positions actively especially in volatile markets, and avoid holding positions overnight during high volatility events. Calculate your liquidation price before entering any leveraged trade and ensure your stop-loss is at a level that allows some buffer. Many professional traders risk only 1-2% of capital per trade to survive the inevitable losing streaks. Never trade with money you can't afford to lose."
    },
    {
      question: "What happens when a position is liquidated?",
      answer: "When liquidated, your position is automatically closed at the current market price (often worse than expected due to slippage). Your initial margin is lost, and any remaining equity in your account may be used to cover losses. If losses exceed your account equity, you owe the broker money. In extreme cases with insufficient account balance, the position may be left to be liquidated at any price, potentially leaving you with negative balance. Some exchanges have auto-deleveraging systems where profitable traders' positions are reduced to cover losses of liquidated traders."
    }
  ];

  const calculation = useMemo(() => {
    const marginRatio = 1 / leverage;
    const liquidationDistance = marginRatio - maintenanceMargin / 100;
    const liquidationPrice = isLong 
      ? entryPrice * (1 - liquidationDistance)
      : entryPrice * (1 + liquidationDistance);
    const liquidationPercent = (liquidationDistance * 100);
    
    return {
      liquidationPrice: liquidationPrice.toFixed(2),
      liquidationPercent: liquidationPercent.toFixed(2),
      marginRatio: (marginRatio * 100).toFixed(2),
      distancePoints: Math.abs(entryPrice - liquidationPrice).toFixed(2),
    };
  }, [entryPrice, leverage, isLong, maintenanceMargin]);

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
              <div className="grid grid-cols-5 gap-2 mt-2">
                {[2, 5, 10, 20, 50].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLeverage(l)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      leverage === l
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {l}x
                  </button>
                ))}
              </div>
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Maintenance Margin (%)</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  step="0.1"
                  value={maintenanceMargin}
                  onChange={(e) => setMaintenanceMargin(Number(e.target.value))}
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
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Liquidation Levels</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-red-400 text-xs uppercase tracking-wider mb-1">Liquidation Price</p>
                <p className="text-3xl font-bold text-white mono">{symbol}{calculation.liquidationPrice}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Distance to Liquidation</p>
              <p className="text-2xl font-bold text-white mono">{symbol}{calculation.distancePoints}</p>
              <p className="text-neutral-500 text-sm">({calculation.liquidationPercent}%)</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Margin Required</p>
              <p className="text-2xl font-bold text-white mono">{calculation.marginRatio}%</p>
              <p className="text-neutral-500 text-sm">of position</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-3">Price Levels</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Entry</span>
                <span className="text-white mono">{symbol}{entryPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-red-400">Liquidation</span>
                <span className="text-red-400 mono">{symbol}{calculation.liquidationPrice}</span>
              </div>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2 mt-3">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(leverage * 2, 100)}%` }}
              />
            </div>
            <p className="text-neutral-500 text-xs mt-2">Higher leverage = smaller margin = closer to liquidation</p>
          </div>

          <AboutSection 
            title="Liquidation Calculator"
            description="The Liquidation Calculator is essential for any trader using leverage or margin trading. When you trade with leverage, you're borrowing money to amplify your position size, but this also amplifies your risk. This calculator shows exactly what price level will trigger automatic liquidation of your position, helping you understand your risk before entering any trade. Knowing your liquidation price helps you set appropriate stop-loss levels and determine position size. The visualization shows how close your liquidation is based on different leverage levels - a critical factor that many novice traders overlook. Understanding how leverage affects liquidation distance can save you from significant losses."
            features={[
              "Calculate exact liquidation price for leveraged positions",
              "See distance to liquidation in both price and percentage",
              "Understand margin requirements at different leverage levels",
              "Compare long and short position liquidation prices",
              "Plan proper position sizing and stop-loss placement"
            ]}
            formula="Long: LP = EP × (1 - 1/L + M), Short: LP = EP × (1 + 1/L - M)"
          />

          <FAQSection faqs={faqs} />
        </div>
      </div>
    </div>
  );
}

export default LiquidationCalculator;
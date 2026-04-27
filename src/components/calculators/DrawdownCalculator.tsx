import { useState, useMemo } from 'react';
import { TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useI18n } from '../../lib/i18n';
import { FAQSection, AboutSection } from '../../components/common/DonutChart';

function DrawdownCalc() {
  const { getCurrencySymbol } = useI18n();
  const symbol = getCurrencySymbol();
  const [peak, setPeak] = useState(10000);
  const [trough, setTrough] = useState(7000);
  
  const calculation = useMemo(() => {
    const drawdown = ((peak - trough) / peak) * 100;
    const recovery = peak - trough;
    return { drawdown, recovery };
  }, [peak, trough]);

  const pieData = [
    { name: 'Remaining', value: trough, color: '#D6ED79' },
    { name: 'Drawdown', value: peak - trough, color: '#FF6B6B' },
  ];

  const faqs = [
    {
      question: "What is drawdown in investing?",
      answer: "Drawdown is the peak-to-trough decline during a specific period for an investment or portfolio. It measures the maximum loss an investor would have experienced before the investment recovered to its previous peak. For example, if your portfolio goes from 10,000 to 7,000 and back to 10,000, you experienced a 30% drawdown. Drawdowns are crucial because they measure the actual risk you bear - a 50% gain is needed to recover from a 50% loss. Understanding drawdowns helps set realistic expectations about portfolio volatility and potential losses."
    },
    {
      question: "How is drawdown different from loss?",
      answer: "Loss is simply the percentage decrease from your purchase price, while drawdown measures the decline from the highest point (peak) to the lowest point (trough). If you bought at 100, it went up to 150, then down to 100, you have 0% loss but experienced a 33% drawdown (50/150). Drawdown is a more accurate measure of risk because it captures the worst-case scenario during your investment period, not just the change from your entry point. It reflects the volatility and timing risk you actually experienced."
    },
    {
      question: "What is a good maximum drawdown?",
      answer: "Acceptable drawdown depends on your risk tolerance and investment horizon. Conservative portfolios should target maximum drawdowns under 10-15%, moderate portfolios 15-25%, and aggressive portfolios 25-40%. The S&P 500 has experienced drawdowns of 50-80% in major crashes. The key isn't avoiding drawdowns entirely - that's impossible - but ensuring your risk tolerance matches your ability and willingness to withstand them. Younger investors can tolerate larger drawdowns because they have time to recover; retirees need smaller drawdowns."
    },
    {
      question: "How does drawdown affect recovery?",
      answer: "The relationship between drawdown and recovery is nonlinear - larger drawdowns require exponentially larger gains to recover. A 10% drawdown needs 11% gain to recover, but a 50% drawdown needs 100% gain, and a 90% drawdown needs 900% gain. This is why minimizing maximum drawdown is crucial for long-term wealth preservation. Strategies like diversification, asset allocation, and using stop-losses can help limit drawdowns. The table shows how much different drawdowns require to recover to the original peak."
    },
    {
      question: "How can I reduce portfolio drawdown?",
      answer: "Several strategies help reduce drawdown: diversification across asset classes reduces correlation, holding bonds during equity crashes provides stability, using tactical asset allocation adjusts exposure based on conditions, implementing trailing stops locks in gains and limits losses, and maintaining cash reserves allows rebalancing without selling. Regular rebalancing also helps - when stocks fall, bonds often rise, allowing you to rebalance and buy stocks low. The goal isn't eliminating drawdown - impossible - but managing it within comfortable bounds."
    },
    {
      question: "What is the relationship between volatility and drawdown?",
      answer: "Higher volatility generally leads to larger drawdowns. While volatility measures price fluctuation magnitude, drawdown measures the depth of those fluctuations. A highly volatile portfolio can experience 30%+ drawdowns even in sideways markets. However, the relationship isn't perfectly linear - a volatile portfolio that trends upward may have smaller drawdowns than a less volatile one that crashes. Understanding your portfolio's historical drawdowns is more useful than just looking at volatility. Track both to get a complete risk picture."
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Peak Value ({symbol})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl" type="number" value={peak} onChange={(e) => setPeak(Number(e.target.value))} />
              </div>
            </div>
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Trough Value ({symbol})</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">{symbol}</span>
                <input className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl" type="number" value={trough} onChange={(e) => setTrough(Number(e.target.value))} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5 flex flex-col items-center">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-4">Portfolio Composition</label>
          <div className="relative w-40 h-40 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">DD</span>
              <span className="text-xl font-black text-white mono">{calculation.drawdown.toFixed(1)}%</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#D6ED79]"></div><span className="text-xs text-neutral-400">Remaining</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div><span className="text-xs text-neutral-400">Lost</span></div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <TrendingDown className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Drawdown</span>
          </div>
          <div className="bg-surface-container-highest p-6 rounded-xl mb-4">
            <p className="text-neutral-500 text-xs">Maximum Drawdown</p>
            <p className="text-5xl font-bold text-red-400 mono">{calculation.drawdown.toFixed(2)}%</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Peak Value</label>
              <p className="text-2xl font-bold text-white mono">{symbol}{peak.toLocaleString()}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Value Lost</label>
              <p className="text-2xl font-bold text-red-400 mono">{symbol}{calculation.recovery.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <h4 className="text-white font-bold mb-4">Recovery Required</h4>
          <div className="space-y-2">
            {[
              { dd: 10, need: 11.1 },
              { dd: 20, need: 25.0 },
              { dd: 30, need: 42.9 },
              { dd: 50, need: 100.0 },
              { dd: 75, need: 300.0 },
              { dd: 90, need: 900.0 },
            ].map(item => (
              <div key={item.dd} className="flex justify-between text-sm">
                <span className="text-neutral-400">{item.dd}% drawdown</span>
                <span className="text-white mono">{item.need}% gain to recover</span>
              </div>
            ))}
          </div>
        </div>

        <AboutSection 
          title="Drawdown Calculator"
          description="The Drawdown Calculator measures the peak-to-trough decline in your investment portfolio. This is a critical metric for understanding the actual risk you bear as an investor. While returns capture your gains, drawdowns capture your losses and the volatility you experienced. Understanding drawdowns helps you set realistic expectations about portfolio behavior and prepare mentally for market downturns. This calculator shows the percentage decline from your peak portfolio value to the trough, helping you understand how much your investment has fallen and what it needs to recover. The recovery chart shows the non-linear relationship between drawdown size and the gain required to return to the previous peak."
          features={[
            "Calculate maximum drawdown from peak to trough",
            "Visualize portfolio composition at current value",
            "See recovery requirements for different drawdown levels",
            "Understand the non-linear recovery requirement",
            "Make informed risk management decisions"
          ]}
          formula="Drawdown % = (Peak - Trough) / Peak × 100"
        />

        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}
export default DrawdownCalc;
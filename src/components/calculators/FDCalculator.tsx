import { useState } from 'react';
import { Sparkles, Lock, Banknote, TrendingUp, PiggyBank } from 'lucide-react';
import { motion } from 'motion/react';

export default function FDCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('6.5');
  const [time, setTime] = useState('5');
  const [result, setResult] = useState<{ maturity: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) return;

    const maturity = p * Math.pow(1 + r / 100 / 4, 4 * t);
    const interest = maturity - p;

    setResult({ maturity, interest });
  };

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Fixed Deposit (FD) Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate your Fixed Deposit maturity amount and interest earned. Our free online FD calculator helps you plan your savings with accurate returns projection for Indian banks and financial institutions.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Safe Investment</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Guaranteed Returns</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Tax Benefits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Principal Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
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
                      onChange={(e) => setRate(e.target.value)}
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
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                </div>
              </div>

              <button 
                onClick={calculate}
                className="w-full py-4 bg-primary-fixed text-on-primary-fixed rounded-lg font-black uppercase tracking-widest text-sm hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg shadow-primary-fixed/10"
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <PiggyBank className="w-32 h-32" />
              </div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">FD Maturity Details</label>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black text-white mono">${result.maturity.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Interest Earned</label>
                  <p className="text-2xl font-bold text-white mono">${result.interest.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Principal</label>
                  <p className="text-2xl font-bold text-white mono">${parseFloat(principal).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Fixed Deposits</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Fixed Deposits (FD) are one of the safest investment options offering guaranteed returns. Unlike market-linked investments, FDs provide fixed interest rates making them ideal for risk-averse investors seeking stable returns.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              <strong>Key Benefits:</strong> Higher interest rates than savings accounts, guaranteed returns, flexible tenure options (7 days to 10 years), and potential tax benefits under Section 80C.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Current FD Rates (India)</h3>
            <div className="space-y-2 text-sm text-neutral-400">
              <div className="flex justify-between"><span> SBI FD (1 year)</span><span className="text-white">6.80%</span></div>
              <div className="flex justify-between"><span> HDFC Bank (1 year)</span><span className="text-white">6.60%</span></div>
              <div className="flex justify-between"><span> ICICI Bank (1 year)</span><span className="text-white">6.70%</span></div>
              <div className="flex justify-between"><span> PNB (1 year)</span><span className="text-white">6.50%</span></div>
            </div>
          </div>

          <div className="bg-secondary-container/10 p-6 rounded-xl border border-secondary-container/20">
            <div className="flex items-start gap-4">
              <Lock className="text-secondary w-5 h-5 mt-0.5" />
              <div>
                <h4 className="text-secondary font-bold text-sm mb-1">Pro Tip</h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Consider breaking your FD into multiple deposits with different maturities (laddering strategy) to get liquidity while maintaining higher rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
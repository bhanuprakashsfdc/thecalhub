import { useState } from 'react';
import { Sparkles, Building2, Banknote } from 'lucide-react';
import { motion } from 'motion/react';

export default function PPFCalculator() {
  const [contribution, setContribution] = useState('100000');
  const [rate, setRate] = useState('7.1');
  const [time, setTime] = useState('15');
  const [result, setResult] = useState<{ maturity: number; interest: number; totalContributions: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(contribution);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) return;

    const totalContributions = p * t;
    const maturity = p * ((Math.pow(1 + r, t) - 1) / r) * (1 + r);
    const interest = maturity - totalContributions;

    setResult({ maturity, interest, totalContributions });
  };

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">PPF Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate your Public Provident Fund returns and maturity amount.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Annual Contribution</label>
              <div className="relative">
                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="0"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="0"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Time (Years)</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="0"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-primary-fixed text-on-primary-fixed p-4 rounded-lg font-bold hover:shadow-[0_0_20px_rgba(214,237,121,0.3)] transition-all duration-200"
            >
              Calculate
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-surface-container-highest rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-primary-fixed mb-4">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">PPF Maturity</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Total Contributions</span>
                    <span className="text-white font-bold">₹{result.totalContributions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Interest Earned</span>
                    <span className="text-primary-fixed font-bold">₹{result.interest.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Maturity Value</span>
                    <span className="text-2xl font-extrabold text-primary-fixed">₹{result.maturity.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
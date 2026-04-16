import { useState } from 'react';
import { Sparkles, Home, Banknote } from 'lucide-react';
import { motion } from 'motion/react';

export default function HomeLoanCalc() {
  const [principal, setPrincipal] = useState('5000000');
  const [rate, setRate] = useState('8.5');
  const [time, setTime] = useState('20');
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(time) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) return;

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    setResult({ emi, totalInterest, totalPayment });
  };

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Financial</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Home Loan EMI Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate EMI, total interest, and total payment for your home loan.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Loan Amount</label>
              <div className="relative">
                <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
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
                <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Tenure (Years)</label>
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
              Calculate EMI
            </button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-surface-container-highest rounded-xl border border-white/5"
              >
                <div className="flex items-center gap-2 text-primary-fixed mb-4">
                  <Home className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Loan Details</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Monthly EMI</span>
                    <span className="text-2xl font-extrabold text-primary-fixed">₹{Math.round(result.emi).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Total Interest</span>
                    <span className="text-white font-bold">₹{Math.round(result.totalInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Total Payment</span>
                    <span className="text-white font-bold">₹{Math.round(result.totalPayment).toLocaleString()}</span>
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
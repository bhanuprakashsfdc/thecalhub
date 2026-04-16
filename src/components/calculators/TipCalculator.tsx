import { useState } from 'react';
import { Sparkles, CreditCard, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState('15');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);

  const calculate = () => {
    const b = parseFloat(bill);
    const p = parseFloat(tipPercent);
    const c = parseInt(people);

    if (isNaN(b) || isNaN(p) || isNaN(c) || b <= 0 || c <= 0) return;

    const tipAmount = (b * p) / 100;
    const total = b + tipAmount;
    const perPerson = total / c;

    setResult({ tip: tipAmount, total, perPerson });
  };

  const tipAmounts = ['10', '15', '18', '20', '25'];

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Standard</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Tip Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate tips and split bills easily among friends.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Bill Amount</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Tip Percentage</label>
              <div className="flex gap-2">
                {tipAmounts.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipPercent(t)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                      tipPercent === t ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t}%
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">Number of People</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="1"
                  min="1"
                  className="w-full bg-surface-container-highest border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
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
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Breakdown</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Tip Amount</span>
                    <span className="text-white font-bold">${result.tip.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Total</span>
                    <span className="text-white font-bold">${result.total.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <span className="text-neutral-400 text-sm">Per Person</span>
                    <span className="text-primary-fixed font-extrabold text-xl">${result.perPerson.toFixed(2)}</span>
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
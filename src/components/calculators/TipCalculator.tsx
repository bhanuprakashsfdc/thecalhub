import { useState, useMemo } from 'react';
import { Sparkles, CreditCard, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);
  const [people, setPeople] = useState(1);

  const calculation = useMemo(() => {
    const tipAmount = (bill * tipPercent) / 100;
    const total = bill + tipAmount;
    const perPerson = total / people;
    return { tipAmount, total, perPerson };
  }, [bill, tipPercent, people]);

  const tipAmounts = ['10', '15', '18', '20', '25'];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Standard</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Tip Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate tips and split bills easily among friends. Our free calculator helps you determine tip amount and per-person cost.
        </p>
        <div className="flex gap-2 mt-4">
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Tip</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Split</span>
          <span className="text-xs px-2 py-1 bg-white/5 text-neutral-400 rounded">Bill</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Bill Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono">$</span>
                  <input type="number" value={bill} onChange={(e) => setBill(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Tip Percentage</label>
                <div className="flex gap-2">
                  {tipAmounts.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTipPercent(Number(t))}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${
                        tipPercent === Number(t) ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                      }`}
                    >
                      {t}%
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Number of People</label>
                <input type="number" value={people} onChange={(e) => setPeople(Number(e.target.value))} min="1"
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CreditCard className="w-32 h-32" />
            </div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Per Person</label>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono">${calculation.perPerson.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Tip Amount</label>
                <p className="text-2xl font-bold text-white mono">${calculation.tipAmount.toFixed(2)}</p>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total</label>
                <p className="text-2xl font-bold text-primary-fixed mono">${calculation.total.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Tip Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">Tipping is a customary practice to show appreciation for service. Standard tip amounts range from 15-20% for good service.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Tip:</strong> For excellent service, consider tipping 20% or more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
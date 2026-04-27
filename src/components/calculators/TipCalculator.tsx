import { useState, useMemo } from 'react';
import { CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export function TipCalculator() {
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
                      tipPercent === Number(t) ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'
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
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Per Person</label>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-black text-white mono">${calculation.perPerson.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1"> Tip Amount</label>
              <p className="text-2xl font-bold text-white mono">${calculation.tipAmount.toFixed(2)}</p>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Total</label>
              <p className="text-2xl font-bold text-primary-fixed mono">${calculation.total.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TipCalculator;

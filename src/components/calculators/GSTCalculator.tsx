import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

export function GSTCalculator() {
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const resultRef = useRef<HTMLDivElement>(null);

  const calculation = useMemo(() => {
    if (mode === 'add') {
      const gst = (amount * rate) / 100;
      const total = amount + gst;
      return { result: gst, total, original: amount };
    } else {
      const base = amount / (1 + rate / 100);
      const gst = amount - base;
      return { result: gst, total: base, original: base };
    }
  }, [amount, rate, mode]);

  // Screen reader announcement for results
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.textContent = `GST amount: $${calculation.result.toFixed(2)}, Total: $${calculation.total.toFixed(2)}`;
    }
  }, [calculation]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Mode</label>
              <div className="flex gap-2" role="radiogroup" aria-label="GST calculation mode">
                <button onClick={() => setMode('add')} role="radio" aria-checked={mode === 'add'} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'add' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Add GST</button>
                <button onClick={() => setMode('remove')} role="radio" aria-checked={mode === 'remove'} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'remove' ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>Remove GST</button>
              </div>
            </div>
            <div>
              <label htmlFor="gst-amount" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-fixed-dim mono" aria-hidden="true">$</span>
                <input id="gst-amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                  aria-label="Amount to calculate GST on"
                  aria-describedby="gst-amount-desc"
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 pl-10 pr-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
                <span id="gst-amount-desc" className="sr-only">Enter the monetary amount</span>
              </div>
            </div>
            <div>
              <label htmlFor="gst-rate" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">GST Rate (%)</label>
              <input id="gst-rate" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))}
                aria-label="GST percentage rate"
                aria-describedby="gst-rate-desc"
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
              <span id="gst-rate-desc" className="sr-only">Enter GST rate as a percentage</span>
              <div className="flex gap-2 mt-4" role="radiogroup" aria-label="Common GST rates">
                {[5, 12, 18, 28].map(r => (
                  <button key={r} onClick={() => setRate(r)} role="radio" aria-checked={rate === r} className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${rate === r ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>{r}%</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4" id="gst-result-label">{mode === 'add' ? 'GST Amount' : 'GST (Reverse)'}</span>
          <div aria-live="polite" aria-atomic="true" className="sr-only" ref={resultRef}></div>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-white mono" aria-labelledby="gst-result-label">${calculation.result.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4" role="status" aria-live="polite">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">{mode === 'add' ? 'Total with GST' : 'Base Amount'}</span>
              <p className="text-2xl font-bold text-white mono">${mode === 'add' ? calculation.total.toFixed(2) : calculation.original.toFixed(2)}</p>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">GST Rate</span>
              <p className="text-2xl font-bold text-primary-fixed mono">{rate}%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GSTCalculator;

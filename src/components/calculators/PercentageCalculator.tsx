import { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';
import { motion } from 'motion/react';

export function PercentageCalculator() {
  const [value, setValue] = useState(100);
  const [percentage, setPercentage] = useState(15);
  const [mode, setMode] = useState<'percent-of' | 'what-percent' | 'percent-change'>('percent-of');

  const result = useMemo(() => {
    const v = value;
    const p = percentage;
    if (isNaN(v) || isNaN(p)) return { result: 0, display: '' };

    switch (mode) {
      case 'percent-of':
        const res1 = (v * p) / 100;
        return { result: res1, display: `${p}% of ${v} = ${res1.toFixed(2)}` };
      case 'what-percent':
        if (v === 0) return { result: 0, display: 'undefined' };
        const res2 = (p / v) * 100;
        return { result: res2, display: `${p} is ${res2.toFixed(2)}% of ${v}` };
      case 'percent-change':
        if (v === 0) return { result: 0, display: 'undefined' };
        const res3 = ((p - v) / v) * 100;
        return { result: res3, display: `Change from ${v} to ${p}: ${res3.toFixed(2)}%` };
      default:
        return { result: 0, display: '' };
    }
  }, [value, percentage, mode]);

  const modes = [
    { id: 'percent-of', label: 'X% of Y' },
    { id: 'what-percent', label: 'X is what % of Y' },
    { id: 'percent-change', label: '% Change' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Mode</label>
              <div className="flex gap-2">
                {modes.map(m => (
                  <button key={m.id} onClick={() => setMode(m.id as any)}
                    className={`flex-1 py-3 rounded-lg text-xs font-bold transition-all ${mode === m.id ? 'bg-primary-fixed text-on-primary-fixed shadow-lg' : 'bg-surface-container-highest text-neutral-400 hover:text-white'}`}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">First Value</label>
              <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Second Value</label>
              <input type="number" value={percentage} onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono text-xl outline-none focus:ring-1 focus:ring-primary-fixed transition-all" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Percent className="w-32 h-32 text-primary-fixed" />
          </div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4">Result</label>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white mono">{result.result.toFixed(2)}</span>
            {mode === 'percent-of' && <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">USD</span>}
            {mode !== 'percent-of' && <span className="text-neutral-400 font-bold uppercase tracking-widest text-xs">%</span>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PercentageCalculator;

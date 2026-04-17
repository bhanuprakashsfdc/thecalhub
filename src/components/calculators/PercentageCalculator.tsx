import { useState, useMemo, useRef, useEffect } from 'react';
import { Sparkles, Percent, Calculator } from 'lucide-react';
import { motion } from 'motion/react';

export default function PercentageCalculator() {
  const [value, setValue] = useState(100);
  const [percentage, setPercentage] = useState(15);
  const [mode, setMode] = useState<'percent-of' | 'what-percent' | 'percent-change'>('percent-of');
  const resultRef = useRef<HTMLDivElement>(null);

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

  // Screen reader announcement for results
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.textContent = `Result: ${result.display}`;
    }
  }, [result]);

  const modes = [
    { id: 'percent-of', label: 'X% of Y' },
    { id: 'what-percent', label: 'X is what % of Y' },
    { id: 'percent-change', label: '% Change' },
  ];

  return (
    <div className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Math</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Percentage Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
          Calculate percentages, percentage increases/decreases, and find what percent one number is of another.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Mode</label>
                <div className="flex flex-wrap gap-2">
                  {modes.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id as typeof mode)}
                      className={`px-3 py-3 rounded-lg text-sm font-bold transition-all ${
                        mode === m.id
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="percent-value" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                  {mode === 'percent-change' ? 'Old Value' : 'Value'}
                </label>
                <input
                  id="percent-value"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  aria-label={mode === 'percent-change' ? 'Old value' : 'Value to calculate percentage of'}
                  aria-describedby="percent-value-desc"
                  className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                />
                <span id="percent-value-desc" className="sr-only">Enter a numeric value</span>
              </div>

              <div>
                <label htmlFor="percent-percentage" className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">
                  {mode === 'percent-change' ? 'New Value' : 'Percentage'}
                </label>
                <div className="relative">
                  <input
                    id="percent-percentage"
                    type="number"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    aria-label={mode === 'percent-change' ? 'New value' : 'Percentage value'}
                    aria-describedby="percent-percentage-desc"
                    className="w-full bg-surface-container-highest border-none rounded-lg py-4 pr-10 pl-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  />
                  <span id="percent-percentage-desc" className="sr-only">Enter percentage value</span>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 mono" aria-hidden="true">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-surface-container-high to-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Percent className="w-32 h-32" />
            </div>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-fixed font-bold mb-4" id="percent-result-label">Result</span>
            <div aria-live="polite" aria-atomic="true" className="sr-only" ref={resultRef}></div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-white mono" aria-labelledby="percent-result-label">
                {mode === 'what-percent' || mode === 'percent-change' ? `${result.result.toFixed(2)}%` : `$${result.result.toFixed(2)}`}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4" role="status" aria-live="polite">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Calculation</span>
                <p className="text-lg font-bold text-white mono">{result.display}</p>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">Mode</span>
                <p className="text-lg font-bold text-primary-fixed mono">{modes.find(m => m.id === mode)?.label}</p>
              </div>
            </div>
          </motion.div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">About Percentage Calculator</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This calculator handles three common percentage calculations: finding a percentage of a number, finding what percentage one number is of another, and calculating percentage change.</p>
            <p className="text-neutral-400 text-sm leading-relaxed"><strong>Formula:</strong> Percentage = (Part / Whole) × 100</p>
          </div>
        </div>
      </div>
    </div>
  );
}

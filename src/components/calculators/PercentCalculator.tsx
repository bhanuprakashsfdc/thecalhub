import { useState } from 'react';
import { Sparkles, Percent } from 'lucide-react';
import { motion } from 'motion/react';

export default function PercentCalculator() {
  const [value, setValue] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<{ mode: string; value: number; display: string } | null>(null);
  const [mode, setMode] = useState<'percent-of' | 'what-percent' | 'percent-change'>('percent-of');

  const calculate = () => {
    const v = parseFloat(value);
    const p = parseFloat(percentage);
    if (isNaN(v) || isNaN(p)) return;

    let res: number;
    switch (mode) {
      case 'percent-of':
        res = (v * p) / 100;
        setResult({ mode: 'percent-of', value: res, display: `${p}% of ${v} = ${res.toFixed(2)}` });
        break;
      case 'what-percent':
        if (v === 0) return;
        res = (p / v) * 100;
        setResult({ mode: 'what-percent', value: res, display: `${p} is ${res.toFixed(2)}% of ${v}` });
        break;
      case 'percent-change':
        res = ((p - v) / v) * 100;
        setResult({ mode: 'percent-change', value: res, display: `Change from ${v} to ${p}: ${res.toFixed(2)}%` });
        break;
    }
  };

  const modes = [
    { id: 'percent-of', label: 'X% of Y' },
    { id: 'what-percent', label: 'X is what % of Y' },
    { id: 'percent-change', label: '% Change' },
  ];

  return (
    <div className="mt-14 p-6 md:p-10 flex-1 overflow-y-auto">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Math</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Percentage Calculator</h2>
        <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
          Calculate percentages, percentage increases/decreases, and find what percent one number is of another.
        </p>
      </div>

      <div className="max-w-lg">
        <div className="bg-surface-container-low rounded-xl p-6 border border-white/5">
          <div className="flex flex-wrap gap-2 mb-6">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMode(m.id as typeof mode); setResult(null); }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  mode === m.id
                    ? 'bg-primary-fixed text-on-primary-fixed'
                    : 'bg-surface-container-highest text-neutral-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                {mode === 'percent-change' ? 'Old Value' : 'Value'}
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-2">
                {mode === 'percent-change' ? 'New Value' : 'Percentage'}
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="0"
                className="w-full bg-surface-container-highest border border-white/10 rounded-lg p-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary-fixed/50 transition-colors"
              />
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
                  <Percent className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Result</span>
                </div>
                <div className="text-3xl font-extrabold text-white text-center">{result.display}</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
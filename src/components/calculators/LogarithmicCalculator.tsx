import { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

export function LogarithmicCalculator() {
  const [value, setValue] = useState(100);
  const [base, setBase] = useState(10);

  const results = useMemo(() => {
    const ln = Math.log(value);
    const log10 = Math.log10(value);
    const log2 = Math.log2(value);
    const logBase = base > 0 && base !== 1 ? Math.log(value) / Math.log(base) : NaN;
    
    return {
      ln,
      log10,
      log2,
      logBase,
      exp: Math.exp(value),
      pow10: Math.pow(10, value),
      pow2: Math.pow(2, value),
    };
  }, [value, base]);

  const formatNumber = (num: number) => {
    if (!isFinite(num)) return 'Undefined';
    if (isNaN(num)) return 'Undefined';
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 1000000) {
      return num.toExponential(4);
    }
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Value (x)</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.0001"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Custom Base</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="1"
                value={base}
                onChange={(e) => setBase(Number(e.target.value))}
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[2, Math.E, 10].map((b) => (
                  <button
                    key={b}
                    onClick={() => setBase(b)}
                    className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                      base === b
                        ? "bg-primary-fixed text-on-primary-fixed"
                        : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {b === Math.E ? 'e' : b}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setValue(100); setBase(10); }}
              className="w-full py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Logarithmic Results</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">ln(x) - Natural Log</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.ln)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">log₁₀(x)</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.log10)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">log₂(x)</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.log2)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">log<sub>{base}</sub>(x)</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.logBase)}</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-4">Exponential Functions</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-400 text-xs">e^x</p>
                <p className="text-lg text-white mono">{formatNumber(results.exp)}</p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">2^x</p>
                <p className="text-lg text-white mono">{formatNumber(results.pow2)}</p>
              </div>
<div>
                <p className="text-neutral-400 text-xs">e^x</p>
                <p className="text-lg text-white mono">{formatNumber(results.exp)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogarithmicCalculator;
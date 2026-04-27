import { useState, useMemo } from 'react';
import { Triangle, RotateCcw } from 'lucide-react';

export function TrigonometricCalculator() {
  const [angle, setAngle] = useState(45);
  const [unit, setUnit] = useState('degrees');

  const results = useMemo(() => {
    const radians = unit === 'degrees' ? angle * (Math.PI / 180) : angle;
    
    return {
      sin: Math.sin(radians),
      cos: Math.cos(radians),
      tan: Math.tan(radians),
      asin: Math.asin(radians),
      acos: Math.acos(radians),
      atan: Math.atan(radians),
      degrees: unit === 'radians' ? angle * (180 / Math.PI) : angle,
      radians: unit === 'degrees' ? angle * (Math.PI / 180) : angle,
    };
  }, [angle, unit]);

  const formatNumber = (num: number) => {
    if (!isFinite(num)) return 'Undefined';
    return num.toFixed(6).replace(/\.?0+$/, '');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Angle</label>
              <input
                className="w-full bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                type="number"
                step="0.0001"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Unit</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnit('degrees')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    unit === 'degrees'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Degrees
                </button>
                <button
                  onClick={() => setUnit('radians')}
                  className={`py-3 rounded-lg text-sm font-medium transition-colors ${
                    unit === 'radians'
                      ? "bg-primary-fixed text-on-primary-fixed font-bold"
                      : "bg-surface-container-highest hover:bg-neutral-700 text-neutral-300"
                  }`}
                >
                  Radians
                </button>
              </div>
            </div>

            <button
              onClick={() => setAngle(45)}
              className="w-full py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
          <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Quick Angles</p>
          <div className="grid grid-cols-4 gap-2">
            {[0, 30, 45, 60, 90].map((a) => (
              <button
                key={a}
                onClick={() => { setAngle(a); setUnit('degrees'); }}
                className="py-2 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-xs text-neutral-300 transition-colors"
              >
                {a}°
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <Triangle className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Trigonometric Functions</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">sin</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.sin)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">cos</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.cos)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">tan</p>
              <p className="text-2xl font-bold text-white mono">{formatNumber(results.tan)}</p>
            </div>
            <div className="bg-surface-container-highest p-6 rounded-xl">
              <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">cot</p>
              <p className="text-2xl font-bold text-white mono">{results.tan !== 0 ? formatNumber(1/results.tan) : 'Undefined'}</p>
            </div>
          </div>

          <div className="mt-6 bg-surface-container-highest p-6 rounded-xl">
            <p className="text-neutral-500 text-xs uppercase tracking-wider mb-4">Inverse Functions</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-neutral-400 text-xs">asin</p>
                <p className="text-lg text-white mono">{formatNumber(results.degrees)}°</p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">acos</p>
                <p className="text-lg text-white mono">{formatNumber(results.degrees)}°</p>
              </div>
              <div>
                <p className="text-neutral-400 text-xs">atan</p>
                <p className="text-lg text-white mono">{formatNumber(results.degrees)}°</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrigonometricCalculator;
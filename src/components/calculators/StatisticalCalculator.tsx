import { useState, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';

export function StatisticalCalculator() {
  const [data, setData] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
  const [newValue, setNewValue] = useState("");

  const values = useMemo(() => {
    return data.split(/[,,\s]+/).filter(v => v.trim()).map(Number).filter(n => !isNaN(n));
  }, [data]);

  const stats = useMemo(() => {
    const n = values.length;
    if (n === 0) return null;
    
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...values].sort((a, b) => a - b);
    const median = n % 2 === 0 
      ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
      : sorted[Math.floor(n/2)];
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const mode = values.sort((a,b) => values.filter(v=>v===b).length - values.filter(v=>v===a).length)[0] || null;
    
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    const iqr = q3 - q1;

    return { n, sum, mean, median, variance, stdDev, min, max, range, mode, q1, q3, iqr };
  }, [values]);

  const addValue = () => {
    if (newValue.trim()) {
      setData(prev => prev + (prev ? ', ' : '') + newValue);
      setNewValue("");
    }
  };

  const clearData = () => {
    setData("");
  };

  const quickData = [10, 50, 100, 500, 1000];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="space-y-6">
            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Data Values (comma separated)</label>
              <textarea
                className="w-full h-32 bg-surface-container-highest border-none rounded-lg p-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none resize-none"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter numbers separated by commas or spaces"
              />
            </div>

            <div className="group">
              <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-3">Add Single Value</label>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-surface-container-highest border-none rounded-lg py-4 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-xl outline-none"
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addValue()}
                />
                <button
                  onClick={addValue}
                  className="px-6 bg-primary-fixed text-on-primary-fixed font-bold rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={clearData}
                className="flex-1 py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 text-sm font-medium transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setData(quickData.map(String).join(', '))}
                className="flex-1 py-3 bg-surface-container-highest hover:bg-neutral-700 rounded-lg text-neutral-300 text-sm font-medium transition-colors"
              >
                Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-2 text-primary-fixed mb-6">
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Statistical Results</span>
          </div>

          {stats && values.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Count (n)</p>
                  <p className="text-2xl font-bold text-white mono">{stats.n}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Sum (Σx)</p>
                  <p className="text-2xl font-bold text-white mono">{stats.sum}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Mean (x̄)</p>
                  <p className="text-2xl font-bold text-white mono">{stats.mean.toFixed(4)}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Median</p>
                  <p className="text-2xl font-bold text-white mono">{stats.median.toFixed(4)}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Std Dev (σ)</p>
                  <p className="text-2xl font-bold text-white mono">{stats.stdDev.toFixed(4)}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Variance (σ²)</p>
                  <p className="text-2xl font-bold text-white mono">{stats.variance.toFixed(4)}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Min</p>
                  <p className="text-2xl font-bold text-white mono">{stats.min}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Max</p>
                  <p className="text-2xl font-bold text-white mono">{stats.max}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Range</p>
                  <p className="text-2xl font-bold text-white mono">{stats.range}</p>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-xl">
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Mode</p>
                  <p className="text-2xl font-bold text-white mono">{stats.mode}</p>
                </div>
              </div>

              <div className="bg-surface-container-highest p-4 rounded-xl">
                <p className="text-neutral-500 text-xs uppercase tracking-wider mb-2">Quartiles</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-neutral-400 text-xs">Q1 (25%)</p>
                    <p className="text-lg text-white mono">{stats.q1}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs">Q2 (50%)</p>
                    <p className="text-lg text-white mono">{stats.median.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-xs">Q3 (75%)</p>
                    <p className="text-lg text-white mono">{stats.q3}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-neutral-500 text-center py-8">Enter data to calculate statistics</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticalCalculator;
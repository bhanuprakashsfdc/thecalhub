import { useState, useMemo } from 'react';
import { TrendingUp } from 'lucide-react';

export default function StairCalculator() {
  const [totalRise, setTotalRise] = useState(108);
  const [run, setRun] = useState(11);
  const [numSteps, setNumSteps] = useState(12);
  const [width, setWidth] = useState(36);

  const result = useMemo(() => {
    const risePerStep = (totalRise / numSteps).toFixed(4);
    const runPerStep = run / numSteps;
    const totalRun = run * (numSteps - 1);
    const concrete = ((totalRun * width * (totalRise / 12)) / 27).toFixed(2);
    return { risePerStep, runPerStep: runPerStep.toFixed(2), totalRun: totalRun.toFixed(2), concrete };
  }, [totalRise, run, numSteps, width]);

  const inputClass = "w-full bg-surface-container-highest border-none rounded-lg py-3 px-4 text-white mono focus:ring-1 focus:ring-primary-fixed transition-all text-lg outline-none";
  const labelClass = "block text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-bold mb-2";

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-primary-fixed mb-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Construction</span>
        </div>
        <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none mb-4">Stair Calculator</h2>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">Calculate rise, run, and materials for stairs.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClass}>Total Rise (inches)</label>
          <input type="number" value={totalRise} onChange={(e) => setTotalRise(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Total Run (inches)</label>
          <input type="number" value={run} onChange={(e) => setRun(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Number of Steps</label>
          <input type="number" value={numSteps} onChange={(e) => setNumSteps(Number(e.target.value))} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Stair Width (inches)</label>
          <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className={inputClass} />
        </div>

        <div className="bg-surface-container-low p-5 rounded-xl border border-white/5 mt-8">
          <h3 className="text-lg font-bold text-white mb-4">Results</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Rise per Step</span>
              <span className="text-white font-mono">{result.risePerStep} in</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Run per Step</span>
              <span className="text-white font-mono">{result.runPerStep} in</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Total Run</span>
              <span className="text-white font-mono">{result.totalRun} in</span>
            </div>
            <div className="border-t border-white/10 pt-3 mt-3 flex justify-between">
              <span className="text-neutral-400">Concrete Needed</span>
              <span className="text-primary-fixed font-mono text-xl">{result.concrete} cu yd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}